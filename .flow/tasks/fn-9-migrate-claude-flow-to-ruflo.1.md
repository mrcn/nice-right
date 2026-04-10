# fn-9-migrate-claude-flow-to-ruflo.1 Prep branch + cleanup claude-flow artifacts

## Description
Create migration branch and remove all claude-flow V3 artifacts from the project. This establishes a clean slate for ruflo init to run.

**Size:** M
**Files:**
- `.claude/agents/` — delete entirely (25+ agent .md files, git-tracked)
- `.claude/commands/` — delete entirely (~90 command .md files, git-tracked)
- `.claude/skills/` — delete entirely (32 skill .md files, git-tracked)
- `.claude/helpers/` — delete entirely (41 hook scripts, git-tracked)
- `.claude-flow/agents/store.json` — delete (leaked past gitignore)
- `.claude-flow/daemon-state.json` — delete (leaked past gitignore)
- `.hive/issues.jsonl` — delete (git-tracked)
- `.swarm/memory.db`, `.swarm/schema.sql` — delete (git-tracked)
- `.swarm/hnsw.index` — delete (untracked, 1.5MB)
- `.sisyphus/boulder.json`, `.sisyphus/plans/` — delete (git-tracked)
- `.mcp.json` — update command (not delete)
- `.gitignore` — add entries for `.swarm/`, `.hive/`, `.sisyphus/`

## Approach

1. `git checkout -b chore/ruflo-migration` from main (not from fix/copy-text-updates)
2. Back up `.claude/settings.json` and `.claude/testing-hooks.json` to `/tmp/` (not committed)
3. Run `npx @claude-flow/cli cleanup` (dry-run) to see what the CLI identifies — compare against this list
4. Run `npx @claude-flow/cli cleanup --force` (do NOT use `--keep-config` — we want to remove the claudeFlow blocks from settings.json, then manually restore project-specific parts from backup)
5. Manually `git rm -r` the tracked dirs not caught by cleanup: `.claude/agents/`, `.claude/commands/`, `.claude/skills/` (cleanup may not touch these)
6. Remove runtime dirs (untracked): `.claude-flow/`, `.hive/`, `.swarm/`, `.sisyphus/`
7. Update `.gitignore`: add `.swarm/`, `.hive/`, `.sisyphus/` entries
8. Stage and commit: `chore: remove claude-flow V3 artifacts`

## Key context

- `.claude/helpers/hook-handler.cjs` and `.claude/helpers/auto-memory-hook.mjs` are referenced by hooks in `.claude/settings.json`. Cleanup command should handle removing these hook entries, but verify settings.json has no dangling hook references after cleanup.
- `.claude/testing-hooks.json` and `.claude/settings.local.json` must NOT be deleted — preserve both.
- `.flow/` (flow-next) and `.opencode/` are separate tools — do not touch.
- The `cleanup` command identifies only ~4 artifacts. The rest must be removed manually via `git rm -r`.
## Acceptance
- [ ] Branch `chore/ruflo-migration` created from main
- [ ] `.claude/agents/`, `.claude/commands/`, `.claude/skills/`, `.claude/helpers/` all removed from git
- [ ] `.claude-flow/`, `.hive/`, `.swarm/`, `.sisyphus/` removed from disk
- [ ] `.claude/testing-hooks.json` still present and unchanged
- [ ] `.claude/settings.local.json` still present and unchanged
- [ ] `.flow/` directory still present (flow-next untouched)
- [ ] `.gitignore` updated with `.swarm/`, `.hive/`, `.sisyphus/`
- [ ] `git status` shows clean working tree after commit (no orphaned claude-flow files)
- [ ] No dangling hook references in `.claude/settings.json` pointing to deleted helper files
## Done summary
TBD

## Evidence
- Commits:
- Tests:
- PRs:
