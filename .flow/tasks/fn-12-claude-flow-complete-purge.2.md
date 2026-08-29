# fn-12-claude-flow-complete-purge.2 Delete .claude-flow/ runtime and close fn-9 migration

## Description
Local disk cleanup and flowctl bookkeeping after fn-12.1 is committed. Removes the claude-flow runtime directory from disk and closes out the fn-9 migration epic.

**Size:** S  
**Files:** `.claude-flow/` (disk only, gitignored), `.flow/fn-9-*` files (tracked — commit their deletion)

## Approach

Delete the runtime directory (gitignored, not tracked):
```bash
rm -rf .claude-flow/
```

Remove fn-9 migration task/spec/checkpoint files from `.flow/` — these are tracked; commit their deletion:
- `.flow/tasks/fn-9-migrate-claude-flow-to-ruflo.1.md`
- `.flow/tasks/fn-9-migrate-claude-flow-to-ruflo.1.json`
- `.flow/tasks/fn-9-migrate-claude-flow-to-ruflo.2.md`
- `.flow/tasks/fn-9-migrate-claude-flow-to-ruflo.2.json`
- `.flow/specs/fn-9-migrate-claude-flow-to-ruflo.md`
- `.flow/.checkpoint-fn-9-migrate-claude-flow-to-ruflo.json`

**Important:** Close fn-9 epic via flowctl — do NOT delete the epic JSON file itself, as fn-13 declares a dependency on fn-9 and flowctl may resolve it by reading that file:
```bash
$FLOWCTL epic close fn-9-migrate-claude-flow-to-ruflo --json
```

Verify MCP health after fn-12.1's env var removals:
```bash
npx ruflo@latest mcp status 2>/dev/null
# or open a new Claude Code session and verify ruflo tools load
```

Commit: `chore: delete .flow/fn-9 migration files, close fn-9 epic`

## Acceptance
- [ ] `.claude-flow/` does not exist on disk
- [ ] fn-9 migration task/spec/checkpoint files are deleted while the fn-9 epic JSON remains and is `done`
- [ ] Ruflo MCP server responds
- [ ] No project hook errors are possible from missing helper files
- [ ] `grep -R "CLAUDE_FLOW\|claude-flow\|auto-memory-hook\|hook-handler\|statusline" .claude .mcp.json` returns no matches
- [ ] Completion is recorded through flowctl
## Done summary
Verified the Ruflo migration cleanup: no .claude-flow runtime, no fn-9 task/spec/checkpoint files, Ruflo MCP responded, and no orphan hook references remain.
## Evidence
- Commits:
- Tests:
- PRs: