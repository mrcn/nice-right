#!/usr/bin/env python3
"""Read-only GA4 and Search Console data pull using KeePass OAuth attachments.

The script never writes credential material. KEEPESS_PASSWORD is read from the
process environment and all Google access tokens remain in memory.
"""
from __future__ import annotations

import argparse
import json
import os
import secrets
import ssl
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, timedelta
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from typing import Any

try:
    import certifi
except ImportError:  # pragma: no cover - environment diagnostic
    certifi = None

try:
    from pykeepass import PyKeePass
except ImportError as exc:  # pragma: no cover - environment diagnostic
    raise SystemExit("pykeepass is required; install it outside the repository") from exc


TLS_CONTEXT = ssl.create_default_context(cafile=certifi.where()) if certifi else ssl.create_default_context()

DEFAULT_DB = Path.home() / "UXOXOxyz" / "Passwords.kdbx"
DEFAULT_GROUP = "Google Analytics MCP"
OAUTH_TITLE = "GA MCP OAuth Desktop client"
DEFAULT_ADC_TITLES = (
    "GA/GSC MCP ADC marcin.uxa@gmail.com",
    "GA/GSC MCP ADC uxoxo.xyz@gmail.com",
)
TOKEN_URI = "https://oauth2.googleapis.com/token"
GA_ADMIN_URI = "https://analyticsadmin.googleapis.com/v1beta/accountSummaries"
GA_DATA_URI = "https://analyticsdata.googleapis.com/v1beta"
GSC_URI = "https://www.googleapis.com/webmasters/v3"
USER_AGENT = "nice-right-google-readonly/1.0"
GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"
GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"


class ApiError(RuntimeError):
    def __init__(self, status: int, payload: Any):
        self.status = status
        self.payload = payload
        super().__init__(self.reason)

    @property
    def reason(self) -> str:
        if isinstance(self.payload, dict):
            error = self.payload.get("error", self.payload)
            if isinstance(error, dict):
                status = error.get("status")
                message = error.get("message")
                if status and message:
                    return f"{status}: {message}"
                if status:
                    return str(status)
                if message:
                    return str(message)
        return "Google API request failed"


def json_attachment(entry: Any) -> dict[str, Any]:
    attachments = list(entry.attachments or [])
    for attachment in attachments:
        raw = getattr(attachment, "data", b"")
        if not isinstance(raw, bytes):
            raw = bytes(raw)
        try:
            value = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            continue
        if isinstance(value, dict):
            return value
    raise RuntimeError(f"no JSON attachment found for {entry.title}")


def load_group() -> tuple[Any, Any]:
    password = os.environ.get("KEEPESS_PASSWORD", "")
    if not password:
        raise RuntimeError("KEEPESS_PASSWORD is required; it is never accepted as a CLI argument")
    db = Path(os.environ.get("KEEPESS_DB", str(DEFAULT_DB))).expanduser()
    if not db.is_file():
        raise RuntimeError(f"KeePass database not found: {db}")
    try:
        kp = PyKeePass(str(db), password=password)
    except Exception as exc:
        raise RuntimeError("could not open KeePass database") from exc
    group_name = os.environ.get("KEEPESS_GROUP", DEFAULT_GROUP)
    group = kp.find_groups(name=group_name, first=True)
    if group is None:
        raise RuntimeError(f"KeePass group not found: {group_name}")
    return kp, group


def find_entry(group: Any, title: str) -> Any:
    for entry in group.entries or []:
        if entry.title == title:
            return entry
    raise RuntimeError(f"KeePass entry not found: {title}")


def oauth_client(group: Any) -> dict[str, str]:
    value = json_attachment(find_entry(group, OAUTH_TITLE))
    root = value.get("installed") or value.get("web") or {}
    client_id = root.get("client_id")
    client_secret = root.get("client_secret")
    token_uri = root.get("token_uri") or TOKEN_URI
    if not client_id or not client_secret:
        raise RuntimeError("OAuth desktop attachment is missing client credentials")
    return {"client_id": str(client_id), "client_secret": str(client_secret), "token_uri": str(token_uri)}


def post_form(url: str, values: dict[str, str]) -> dict[str, Any]:
    body = urllib.parse.urlencode(values).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded", "User-Agent": USER_AGENT},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30, context=TLS_CONTEXT) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        try:
            payload = json.loads(exc.read().decode("utf-8"))
        except Exception:
            payload = {}
        raise ApiError(exc.code, payload) from exc
    except (urllib.error.URLError, TimeoutError) as exc:
        raise RuntimeError(f"network error: {exc.reason if hasattr(exc, 'reason') else exc}") from exc


def refresh_access_token(adc: dict[str, Any], client: dict[str, str]) -> dict[str, Any]:
    if adc.get("type") != "authorized_user":
        raise RuntimeError(f"unsupported credential type: {adc.get('type', 'missing')}")
    for field in ("client_id", "client_secret", "refresh_token"):
        if not adc.get(field):
            raise RuntimeError(f"ADC attachment is missing {field}")
    if adc["client_id"] != client["client_id"] or adc["client_secret"] != client["client_secret"]:
        raise RuntimeError("ADC and OAuth desktop attachments use different client credentials")
    token = post_form(
        client["token_uri"],
        {
            "client_id": str(adc["client_id"]),
            "client_secret": str(adc["client_secret"]),
            "refresh_token": str(adc["refresh_token"]),
            "grant_type": "refresh_token",
        },
    )
    if not token.get("access_token"):
        raise RuntimeError("token response did not contain an access token")
    scopes = str(token.get("scope", "")).split()
    return {"access_token": str(token["access_token"]), "expires_in": token.get("expires_in"), "scopes": scopes}


def api_json(url: str, access_token: str, payload: dict[str, Any] | None = None) -> dict[str, Any]:
    body = None
    headers = {"Authorization": f"Bearer {access_token}", "User-Agent": USER_AGENT}
    method = "GET"
    if payload is not None:
        body = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"
        method = "POST"
    request = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=45, context=TLS_CONTEXT) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        try:
            response_payload = json.loads(exc.read().decode("utf-8"))
        except Exception:
            response_payload = {}
        raise ApiError(exc.code, response_payload) from exc
    except (urllib.error.URLError, TimeoutError) as exc:
        raise RuntimeError(f"network error: {exc.reason if hasattr(exc, 'reason') else exc}") from exc


def error_result(exc: Exception) -> dict[str, Any]:
    if isinstance(exc, ApiError):
        return {"status": "error", "http_status": exc.status, "reason": exc.reason}
    return {"status": "error", "reason": str(exc)}


def discover_ga4(access_token: str, args: argparse.Namespace) -> dict[str, Any]:
    try:
        payload = api_json(f"{GA_ADMIN_URI}?pageSize=200", access_token)
        properties: list[dict[str, Any]] = []
        for account in payload.get("accountSummaries", []):
            account_name = str(account.get("displayName", ""))
            for prop in account.get("propertySummaries", []):
                resource = str(prop.get("property", ""))
                property_id = resource.rsplit("/", 1)[-1]
                if not property_id.isdigit():
                    continue
                properties.append(
                    {
                        "account": account_name,
                        "property_id": property_id,
                        "display_name": prop.get("displayName"),
                        "property_type": prop.get("propertyType"),
                    }
                )
        result: dict[str, Any] = {
            "status": "ok",
            "account_count": len(payload.get("accountSummaries", [])),
            "property_count": len(properties),
            "properties": properties,
        }
        if not args.skip_reports:
            reports = []
            for prop in properties[: args.max_properties]:
                reports.append(run_ga4_report(access_token, prop, args))
            result["reports"] = reports
        return result
    except Exception as exc:
        return error_result(exc)


def run_ga4_report(access_token: str, prop: dict[str, Any], args: argparse.Namespace) -> dict[str, Any]:
    property_id = prop["property_id"]
    endpoint = f"{GA_DATA_URI}/properties/{urllib.parse.quote(property_id, safe='')}:runReport"
    payload = {
        "dateRanges": [{"startDate": args.start_date, "endDate": args.end_date}],
        "dimensions": [{"name": "date"}],
        "metrics": [
            {"name": "totalUsers"},
            {"name": "sessions"},
            {"name": "eventCount"},
        ],
        "limit": "1",
    }
    try:
        response = api_json(endpoint, access_token, payload)
        rows = response.get("rows", [])
        return {
            "status": "ok",
            "property_id": property_id,
            "display_name": prop.get("display_name"),
            "date_range": [args.start_date, args.end_date],
            "row_count": response.get("rowCount", len(rows)),
            "metric_headers": [x.get("name") for x in response.get("metricHeaders", [])],
            "sample_row": rows[0] if rows else None,
        }
    except Exception as exc:
        return {"property_id": property_id, "display_name": prop.get("display_name"), **error_result(exc)}


def default_start_date() -> str:
    return (date.today() - timedelta(days=28)).isoformat()


class OAuthCallbackHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        params = urllib.parse.parse_qs(urllib.parse.urlsplit(self.path).query)
        expected_state = getattr(self.server, "expected_state", "")
        state = params.get("state", [""])[0]
        if state != expected_state:
            self.server.oauth_result = {"error": "oauth state mismatch"}
        elif params.get("error"):
            self.server.oauth_result = {"error": params["error"][0]}
        elif not params.get("code"):
            self.server.oauth_result = {"error": "authorization response did not contain a code"}
        else:
            self.server.oauth_result = {"code": params["code"][0]}
        body = b"Authorization received. You may close this tab."
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, _format: str, *_args: Any) -> None:
        return


def authorize_gsc(adc: dict[str, Any], client: dict[str, str], timeout_seconds: int) -> tuple[dict[str, Any], dict[str, Any]]:
    state = secrets.token_urlsafe(24)
    server = HTTPServer(("127.0.0.1", 0), OAuthCallbackHandler)
    server.expected_state = state
    server.oauth_result = None
    redirect_uri = f"http://localhost:{server.server_port}/"
    query = urllib.parse.urlencode(
        {
            "client_id": client["client_id"],
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": f"{GA_SCOPE} {GSC_SCOPE}",
            "access_type": "offline",
            "include_granted_scopes": "true",
            "prompt": "consent",
            "login_hint": str(adc.get("account", "")),
            "state": state,
        }
    )
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{query}"
    opened = subprocess.run(
        ["open", "-a", "Brave Browser", auth_url],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if opened.returncode != 0:
        server.server_close()
        raise RuntimeError("could not open Brave Browser for Google authorization")
    deadline = time.monotonic() + timeout_seconds
    while server.oauth_result is None and time.monotonic() < deadline:
        server.timeout = 1
        server.handle_request()
    result = server.oauth_result
    server.server_close()
    if result is None:
        raise RuntimeError("timed out waiting for the Brave authorization callback")
    if result.get("error"):
        raise RuntimeError(str(result["error"]))
    token = post_form(
        client["token_uri"],
        {
            "client_id": client["client_id"],
            "client_secret": client["client_secret"],
            "code": str(result["code"]),
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        },
    )
    if not token.get("access_token") or not token.get("refresh_token"):
        raise RuntimeError("authorization response did not contain both access and refresh tokens")
    return token, {"redirect_uri": redirect_uri, "scopes": str(token.get("scope", "")).split(), "browser": "Brave Browser"}


def new_adc_from_authorization(adc: dict[str, Any], client: dict[str, str], token: dict[str, Any]) -> dict[str, Any]:
    return {
        "type": "authorized_user",
        "account": adc.get("account", ""),
        "client_id": client["client_id"],
        "client_secret": client["client_secret"],
        "refresh_token": token["refresh_token"],
        "universe_domain": "googleapis.com",
    }


def safe_filename(value: str) -> str:
    return "".join(char if char.isalnum() or char in "._-" else "_" for char in value)


def save_gsc_adc(title: str, filename: str, adc: dict[str, Any]) -> None:
    db = Path(os.environ.get("KEEPESS_DB", str(DEFAULT_DB))).expanduser()
    held = subprocess.run(["lsof", "-t", str(db)], capture_output=True, text=True, check=False)
    if held.stdout.strip():
        raise RuntimeError("KeePass database is open by another process; refusing to overwrite it")
    kp, group = load_group()
    if any(entry.title == title for entry in (group.entries or [])):
        raise RuntimeError(f"refusing to overwrite existing KeePass entry: {title}")
    entry = kp.add_entry(
        group,
        title,
        str(adc.get("account", "")),
        "stored-in-attachment",
        notes="Read-only GA4 + Search Console OAuth ADC; credential is stored only in the attached JSON.",
    )
    binary_id = kp.add_binary(json.dumps(adc, indent=2, sort_keys=True).encode("utf-8"))
    entry.add_attachment(binary_id, filename)
    kp.save()


def discover_gsc(access_token: str, args: argparse.Namespace) -> dict[str, Any]:
    try:
        payload = api_json(f"{GSC_URI}/sites", access_token)
        sites = [
            {"site_url": item.get("siteUrl"), "permission_level": item.get("permissionLevel")}
            for item in payload.get("siteEntry", [])
        ]
        result: dict[str, Any] = {"status": "ok", "site_count": len(sites), "sites": sites}
        if not args.skip_queries:
            queries = []
            for site in sites[: args.max_sites]:
                queries.append(run_gsc_query(access_token, site["site_url"], args))
            result["queries"] = queries
        return result
    except Exception as exc:
        return error_result(exc)


def run_gsc_query(access_token: str, site_url: str, args: argparse.Namespace) -> dict[str, Any]:
    encoded_site = urllib.parse.quote(str(site_url), safe="")
    endpoint = f"{GSC_URI}/sites/{encoded_site}/searchAnalytics/query"
    payload = {
        "startDate": args.gsc_start_date,
        "endDate": args.gsc_end_date,
        "dimensions": ["query"],
        "rowLimit": 5,
        "dataState": "all",
    }
    try:
        response = api_json(endpoint, access_token, payload)
        return {
            "status": "ok",
            "site_url": site_url,
            "date_range": [args.gsc_start_date, args.gsc_end_date],
            "row_count": len(response.get("rows", [])),
            "rows": response.get("rows", []),
        }
    except Exception as exc:
        return {"site_url": site_url, **error_result(exc)}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Read-only GA4 and Search Console pull from KeePass OAuth attachments")
    parser.add_argument("--identity", action="append", dest="identities", help="KeePass ADC entry title; repeatable")
    parser.add_argument("--max-properties", type=int, default=25)
    parser.add_argument("--max-sites", type=int, default=25)
    parser.add_argument("--start-date", default="28daysAgo")
    parser.add_argument("--end-date", default="today")
    parser.add_argument("--gsc-start-date", default=default_start_date())
    parser.add_argument("--gsc-end-date", default=date.today().isoformat())
    parser.add_argument("--skip-reports", action="store_true")
    parser.add_argument("--skip-queries", action="store_true")
    parser.add_argument("--authorize-gsc", action="store_true", help="authorize one identity in Brave for GA4 + GSC scopes")
    parser.add_argument("--save-gsc-entry", action="store_true", help="save the newly authorized ADC as a new KeePass attachment")
    parser.add_argument("--oauth-timeout", type=int, default=300)
    return parser.parse_args()


def run(args: argparse.Namespace) -> dict[str, Any]:
    _, group = load_group()
    client = oauth_client(group)
    titles = tuple(args.identities or DEFAULT_ADC_TITLES)
    result: dict[str, Any] = {
        "tool": "google_readonly",
        "group": os.environ.get("KEEPESS_GROUP", DEFAULT_GROUP),
        "oauth_client": {"status": "loaded", "token_uri": client["token_uri"]},
        "identities": [],
        "secrets_printed": False,
    }
    for title in titles:
        identity: dict[str, Any] = {"entry": title, "credential_type": "authorized_user"}
        try:
            source_entry = find_entry(group, title)
            adc = json_attachment(source_entry)
            account = str(adc.get("account") or source_entry.username or title)
            adc_for_authorization = {**adc, "account": account}
            if args.authorize_gsc:
                auth_token, auth_meta = authorize_gsc(adc_for_authorization, client, args.oauth_timeout)
                authorized_adc = new_adc_from_authorization(adc_for_authorization, client, auth_token)
                identity["authorization"] = {"status": "ok", **auth_meta}
                if args.save_gsc_entry:
                    saved_title = f"GA/GSC MCP ADC {account}"
                    saved_filename = f"application_default_credentials-ga-gsc-{safe_filename(account)}.json"
                    try:
                        save_gsc_adc(saved_title, saved_filename, authorized_adc)
                        identity["authorization"]["persistence"] = {"status": "saved", "entry": saved_title, "attachment": saved_filename}
                    except Exception as save_exc:
                        identity["authorization"]["persistence"] = {"status": "error", **error_result(save_exc)}
                token = refresh_access_token(authorized_adc, client)
            else:
                token = refresh_access_token(adc, client)
            identity["token"] = {
                "status": "ok",
                "expires_in": token.get("expires_in"),
                "scopes": token.get("scopes", []),
            }
            identity["ga4"] = discover_ga4(token["access_token"], args)
            identity["gsc"] = discover_gsc(token["access_token"], args)
        except Exception as exc:
            identity["token"] = error_result(exc)
        result["identities"].append(identity)
    return result


def main() -> int:
    try:
        result = run(parse_args())
    except Exception as exc:
        result = {"status": "error", **error_result(exc), "secrets_printed": False}
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0 if result.get("identities") and all(i.get("token", {}).get("status") == "ok" for i in result["identities"]) else 1


if __name__ == "__main__":
    raise SystemExit(main())
