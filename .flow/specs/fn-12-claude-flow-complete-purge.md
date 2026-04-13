# claude-flow: complete purge

## Overview

Finish what fn-9 started. The ruflo migration removed the `.claude/helpers/` scripts and the runtime agent dirs, but left dead config in three tracked files. Every Claude Code session currently fires broken hooks (non-blocking but noisy). This epic purges all remaining claude-flow artifacts from tracked files and disk.

## Scope

**In scope:**
- `.claude/settings.json` — remove all hooks (every handler file deleted), `statusLine`, `claudeFlow` block, `CLAUDE_FLOW_*` env vars
- `.mcp.json` — remove 5 `CLAUDE_FLOW_*` env vars; keep command + `npm_config_update_notifier`
- `CLAUDE.md` lines 176–177 — remove dead comment + `auto-memory-hook.mjs import-all` command
- `.gitignore:10` — remove `.claude-flow/` entry (directory deleted, entry is dead artifact)
- `.claude-flow/` runtime dir on disk — delete (gitignored, safe)
- `.flow/fn-9-*` migration files — close epic in flowctl; optionally delete files

**Out of scope:**
- Global `~/.claude/settings.json` (no claude-flow hooks there — confirmed by docs-scout)
- Global claude-flow MCP registration (separate concern)
- ruflo configuration or permissions (keep everything that isn't explicitly claude-flow)
- `.gitignore` lines 11–12 (`.swarm/`, `.hive/`) — ruflo may regenerate these dirs; leave

## Approach

Task 1: all tracked file edits in one commit. Task 2: disk cleanup + flowctl bookkeeping (separate commit for tracked `.flow/fn-9-*` deletions).

Validate JSON after edits with `jq . .claude/settings.json > /dev/null`.

**What to keep in settings.json:**
- `permissions` block (lines 164–175): valid ruflo allow/deny rules including `Bash(node .claude/*)`
- `attribution` block (lines 176–179): ruflo co-author
- `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` (line 181): generic Claude Code feature flag

**What to remove from settings.json:**
- `hooks` entire block (lines 2–158): all reference `hook-handler.cjs` or `auto-memory-hook.mjs` — both deleted
- `statusLine` block (lines 160–163): references `statusline.cjs` — deleted
- `env.CLAUDE_FLOW_V3_ENABLED` (line 182)
- `env.CLAUDE_FLOW_HOOKS_ENABLED` (line 183)
- `claudeFlow` object (lines 185–288): 104 lines of stale config

## Quick commands

```bash
# Validate JSON after edits
jq . .claude/settings.json > /dev/null && echo OK
node -e "require('./.mcp.json')" && echo OK

# Verify MCP still works after env var removal
npx ruflo@latest mcp status 2>/dev/null || echo "check manually"

# Confirm .claude-flow/ deleted
ls .claude-flow/ 2>&1 | grep "No such"
```

## Risks

- Keeping `Bash(node .claude/*)` in permissions.allow is correct — ruflo may regenerate `.claude/helpers/` at runtime (gitignored, expected)
- If ruflo reads `CLAUDE_FLOW_*` env vars internally: low risk (other projects don't set these and ruflo works); verify via MCP health check after removal
- Deleting fn-9 epic file: fn-13 declares a dependency on fn-9; close (not delete) fn-9 to avoid broken dependency resolution

## Acceptance

- [ ] `.claude/settings.json` contains no `hooks`, `statusLine`, `claudeFlow` keys
- [ ] `.claude/settings.json` env block has no `CLAUDE_FLOW_*` keys
- [ ] `.mcp.json` env block has no `CLAUDE_FLOW_*` keys
- [ ] `CLAUDE.md` has no reference to `auto-memory-hook.mjs`
- [ ] `.gitignore` has no `.claude-flow/` entry
- [ ] Both JSON files are valid (`jq` exits 0)
- [ ] ruflo MCP server responds after env var removal (verify `npx ruflo@latest mcp status` or check tools load)
- [ ] `.claude-flow/` does not exist on disk
- [ ] No hook errors on next Claude Code session start/stop
- [ ] fn-9 epic closed (not deleted) in flowctl

## Dependencies

- fn-9-migrate-claude-flow-to-ruflo (predecessor — this epic completes its unmet acceptance criteria)
