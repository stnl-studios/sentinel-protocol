# Excellent Pass Expectations

The verdict `MATERIALIZATION_TARGETS_CONTRACT: EXCELLENT PASS` may be declared
only when all criteria below are satisfied.

The verdict `MATERIALIZATION_TEMPLATES_AND_OUTPUTS_CONTRACT: EXCELLENT PASS`
may be declared only when the template and output criteria below are also
satisfied.

## Required Criteria

- The six materialization lab files exist in
  `reference/materialization_lab/`.
- `TARGETS_CONTRACT.md` declares `copilot` and `codex` as the only canonical
  target IDs for the new version.
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- Legacy runtime target terms `vscode`, `VS Code`, `VS Code/GitHub`, and
  `GitHub Agents` normalize to `copilot` only in target-runtime context.
- Historical references in audits, profiles, and old contracts are protected
  from automatic rewrite.
- Future output paths are declared for `copilot` and `codex`.
- The expected output shapes are declared: `copilot`
  `.github/agents/*.agent.md`, `codex` `.codex/agents/*.toml`, `codex`
  `.codex/config.toml`, and `codex` `AGENTS.md`.
- The explicit dev-skill templates currently present are inventoried:
  `reference/templates/codex/AGENTS.md` and
  `reference/templates/codex/config.toml`.
- Missing explicit templates are recorded for `copilot`
  `.github/agents/*.agent.md` and `codex` `.codex/agents/*.toml`.
- The contract explicitly denies runtime materialization, target-repository
  writes, productive-skill changes, productive-template changes, GitHub writes,
  and blind global replacement of legacy terms.
- Any target without an explicit template blocks with
  `BLOCKED_TEMPLATE_MISSING`.
- Any target-agent pair or output shape without an explicit template blocks
  with `BLOCKED_TEMPLATE_MISSING`.
- No template is inferred from output path, legacy name, productive-skill
  template, existing target-project artifact, or naming symmetry.
- Productive templates are allowed only as read-only conceptual reference in
  this phase and never as automatic write sources.
- `openai.yaml` describes targets as `copilot` or `codex`.
- `reference/MANIFEST.md` records `reference/materialization_lab/` as a
  dev-only contract area, not a final runtime materializer.
- No file under `skills/stnl_project_agent_specializer/` is changed.

## Failure Conditions

Do not declare `MATERIALIZATION_TARGETS_CONTRACT: EXCELLENT PASS` if any check
depends on inferred templates, target writes, productive-skill edits, broad
legacy-term replacement, or undocumented assumptions.

Do not declare
`MATERIALIZATION_TEMPLATES_AND_OUTPUTS_CONTRACT: EXCELLENT PASS` if any check
depends on inferred templates, automatic productive-template reuse,
target-project writes, runtime scripts, productive-skill edits, or undocumented
assumptions.
