# Migrate claude-flow to ruflo

## Overview

Remove stale claude-flow V3 project config and re-initialize with ruflo (the renamed successor). ruflo IS claude-flow — same codebase, v3.5.78 vs current v3.5.40 pinned in `.mcp.json`. ruflo is already installed globally at `/usr/local/bin/ruflo v3.5.78`. This is a rebrand/version-update + project config refresh, not a functional rewrite.

**Scope: project-level only** — no changes to global `~/.claude/` or `~/.claude.json` (ruflo MCP already registered globally).

**Branch**: `chore/ruflo-migration` (do NOT pollute `fix/copy-text-updates`)

## What stays

- `.flow/` — flow-next plugin (gmickel-claude-marketplace), actively used
- `.opencode/` — separate AI tool, unrelated
- `.claude/testing-hooks.json` — project-specific testing rules (build-must-pass, tests-must-pass)
- `.claude/settings.local.json` — flow-next flowctl permissions
- `.husky/pre-commit` — runs `npm test`, unrelated
- `CLAUDE.md` behavioral rules section ("Behavioral Rules Always Enforced", file org, DDD, security, build)

## What gets removed

- `.claude/agents/` (25+ files) — claude-flow boilerplate, ruflo init regenerates
- `.claude/commands/` (~90 files) — claude-flow boilerplate, ruflo init regenerates
- `.claude/skills/` (32 files) — claude-flow boilerplate, ruflo init regenerates
- `.claude/helpers/` (41 scripts) — claude-flow hook handlers, ruflo init regenerates
- `.claude-flow/` runtime dir — gitignored except 2 leaked files (`agents/store.json`, `daemon-state.json`)
- `.hive/issues.jsonl` — tracked, remove
- `.swarm/` (`memory.db`, `schema.sql`, `hnsw.index`) — tracked/untracked, remove
- `.sisyphus/` (`boulder.json`, `plans/`) — tracked, remove
- `.claude/settings.json` claude-flow blocks — hooks, claudeFlow config, env vars, permissions

## Quick commands

```bash
# Verify ruflo is installed globally
ruflo --version

# Run dry-run cleanup first
npx @claude-flow/cli cleanup

# After migration: verify health
ruflo doctor --fix

# Verify MCP server responds
claude mcp list
```

## Acceptance

- [ ] `ruflo --version` prints 3.5.78 (or latest)
- [ ] `.mcp.json` points to `ruflo mcp start` (not `@claude-flow/cli@3.5.40`)
- [ ] `ruflo doctor` passes without errors
- [ ] No references to `@claude-flow/cli` or `npx @claude-flow` remain in tracked files (except historical gitignore)
- [ ] `.claude/settings.json` has ruflo hooks, not claude-flow hooks
- [ ] `CLAUDE.md` project behavioral rules preserved; claude-flow V3 boilerplate sections replaced with ruflo equivalents
- [ ] `.claude/testing-hooks.json` and `settings.local.json` preserved intact
- [ ] `.flow/` (flow-next) still functional
- [ ] Build still passes: `npm run build`
- [ ] Git history clean: migration isolated on `chore/ruflo-migration` branch

## References

- https://github.com/ruvnet/ruflo — source of truth for ruflo init behavior
- `/usr/local/bin/ruflo` — already installed globally (v3.5.78)
- `/Users/marcin/Code/nice-right/.claude/settings.json` — 296 lines, needs selective cleanup (preserve project hooks, remove claudeFlow block)
- `/Users/marcin/Code/nice-right/CLAUDE.md` — 189 lines, mostly boilerplate
- Practice-scout finding: `npx @claude-flow/cli cleanup --force --keep-config` is the safest starting point
