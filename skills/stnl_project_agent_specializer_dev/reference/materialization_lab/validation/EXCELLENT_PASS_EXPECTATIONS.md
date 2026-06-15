# Excellent Pass Expectations

The verdict `MATERIALIZATION_TARGETS_CONTRACT: EXCELLENT PASS` may be declared
only when all criteria below are satisfied.

## Required Criteria

- The five materialization lab files exist in
  `reference/materialization_lab/`.
- `TARGETS_CONTRACT.md` declares `copilot` and `codex` as the only canonical
  target IDs for the new version.
- Legacy runtime target terms `vscode`, `VS Code`, `VS Code/GitHub`, and
  `GitHub Agents` normalize to `copilot` only in target-runtime context.
- Historical references in audits, profiles, and old contracts are protected
  from automatic rewrite.
- Future output paths are declared for `copilot` and `codex`.
- The contract explicitly denies runtime materialization, target-repository
  writes, productive-skill changes, productive-template changes, GitHub writes,
  and blind global replacement of legacy terms.
- Any target without an explicit template blocks with
  `BLOCKED_TEMPLATE_MISSING`.
- `openai.yaml` describes targets as `copilot` or `codex`.
- `reference/MANIFEST.md` records `reference/materialization_lab/` as a
  dev-only contract area, not a final runtime materializer.
- No file under `skills/stnl_project_agent_specializer/` is changed.

## Failure Conditions

Do not declare `MATERIALIZATION_TARGETS_CONTRACT: EXCELLENT PASS` if any check
depends on inferred templates, target writes, productive-skill edits, broad
legacy-term replacement, or undocumented assumptions.
