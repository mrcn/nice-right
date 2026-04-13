# fn-12-claude-flow-complete-purge.1 Purge claude-flow config from tracked files

## Description
Remove all claude-flow dead config from the four tracked files that still reference it. Every Claude Code session currently fires broken hooks on start and stop — this eliminates them atomically in one commit.

**Size:** M  
**Files:** `.claude/settings.json`, `.mcp.json`, `CLAUDE.md`, `.gitignore`

## Approach

Edit `.claude/settings.json` — result is a valid JSON object with exactly these top-level keys: `permissions`, `attribution`, `env` (one key only):
- Remove `"hooks"` entire block (lines 2–158) — all handlers (`hook-handler.cjs`, `auto-memory-hook.mjs`) deleted in fn-9
- Remove `"statusLine"` block (lines 160–163) — `statusline.cjs` deleted
- Remove `"env.CLAUDE_FLOW_V3_ENABLED"` (line 182) and `"env.CLAUDE_FLOW_HOOKS_ENABLED"` (line 183)
- Remove entire `"claudeFlow"` block (lines 185–288)
- Keep: `"permissions"` (164–175), `"attribution"` (176–179), `"env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS"` (181)

Watch for trailing commas in the `env` block after removing keys — `jq` validation catches this.

Edit `.mcp.json` — remove 5 env vars from the ruflo server `env` block:
- Remove: `CLAUDE_FLOW_MODE`, `CLAUDE_FLOW_HOOKS_ENABLED`, `CLAUDE_FLOW_TOPOLOGY`, `CLAUDE_FLOW_MAX_AGENTS`, `CLAUDE_FLOW_MEMORY_BACKEND`
- Keep: `npm_config_update_notifier: "false"` and the command/args

Edit `CLAUDE.md` lines 176–177 — remove both the comment line AND the dead command:
- Line 176: `node .claude/helpers/auto-memory-hook.mjs import-all` (the command)
- Context: this is the third CLI example in the "Memory & Vector Search > CLI Commands" subsection; removing it leaves the other examples intact

Edit `.gitignore:10` — remove the `.claude-flow/` entry (directory will be deleted in task 2; gitignore entry is dead artifact).

Validate:
```bash
jq . .claude/settings.json > /dev/null && echo settings OK
node -e "require('./.mcp.json')" && echo mcp OK
```

Commit: `chore: purge remaining claude-flow config from settings.json, .mcp.json, CLAUDE.md, .gitignore`

## Acceptance
- [ ] `.claude/settings.json` has no `hooks` key
- [ ] `.claude/settings.json` has no `statusLine` key
- [ ] `.claude/settings.json` has no `claudeFlow` key
- [ ] `.claude/settings.json` env block has no `CLAUDE_FLOW_*` keys
- [ ] `.claude/settings.json` retains `permissions` and `attribution` blocks intact
- [ ] `.mcp.json` env block has no `CLAUDE_FLOW_*` keys
- [ ] `.mcp.json` retains the ruflo command, args, and `npm_config_update_notifier`
- [ ] `CLAUDE.md` lines 176–177 removed (no reference to `auto-memory-hook.mjs`)
- [ ] `.gitignore` has no `.claude-flow/` line
- [ ] `jq . .claude/settings.json` exits 0
- [ ] `node -e "require('./.mcp.json')"` exits 0
- [ ] Changes committed
## Done summary
Purged all remaining claude-flow config from tracked files: removed hooks/statusLine/claudeFlow blocks and CLAUDE_FLOW_* env vars from .claude/settings.json, removed CLAUDE_FLOW_* env vars from .mcp.json, removed dead auto-memory-hook.mjs example from CLAUDE.md, and removed .claude-flow/ from .gitignore.
## Evidence
- Commits: 73ff170981f449e50825469a486462bed2b75138
- Tests: npm test (vitest run — 4 tests passed), jq . .claude/settings.json, node -e "require('./.mcp.json')"
- PRs: