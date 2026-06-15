# Templates And Outputs Contract

Status: documentary/dev-only contract.

This contract defines the explicit template and output-shape boundary for the
future senior-agent materialization rewrite of
`stnl_project_agent_specializer_dev`. It is not a runtime materializer and does
not authorize target-repository writes.

## Canonical Targets

The canonical target IDs for the new version are:

- `copilot`
- `codex`

No other target ID is canonical for this rewrite layer.

## Expected Output Shapes

The expected future output shapes are:

- `copilot`: `.github/agents/*.agent.md`
- `codex`: `.codex/agents/*.toml`
- `codex`: `.codex/config.toml`
- `codex`: `AGENTS.md`

These paths are output shapes only. They do not authorize materialization,
creation, update, or deletion of target-project files during this phase.

## Explicit Templates Present Today

The dev skill currently contains these explicit templates under
`reference/templates/`:

- `reference/templates/codex/AGENTS.md`
  - target: `codex`
  - output shape covered: `AGENTS.md`
- `reference/templates/codex/config.toml`
  - target: `codex`
  - output shape covered: `.codex/config.toml`

No explicit template was found for `copilot` output. No explicit template was
found for `codex` agent TOML output.

## Explicit Templates Still Missing

The following expected output shapes do not currently have explicit templates
in the dev skill:

- `copilot`: `.github/agents/*.agent.md`
- `codex`: `.codex/agents/*.toml`

Future materialization for any missing template must block before writing.

## Blocking Rule

Templates must be explicit. Any target, target-agent pair, or output shape
without an explicit template must block with:

`BLOCKED_TEMPLATE_MISSING`

The block applies before any target-project write, generated artifact write,
normalization, repair, delete, or cleanup.

## No Template Inference

No template may be inferred from:

- output path;
- legacy target names;
- legacy output names;
- `vscode`, `VS Code`, or `VS Code/GitHub` terminology;
- the productive `skills/stnl_project_agent_specializer/` skill;
- existing target-project artifacts;
- nearby files or naming symmetry.

The future materializer must fail closed when the template source is missing,
ambiguous, or only implied by naming.

## Productive Skill References

Templates from the productive `skills/stnl_project_agent_specializer/` skill
may be read only as conceptual reference during this dev-only phase. They must
never be used as an automatic source for writing, generating, repairing, or
backfilling templates in the dev skill or in a target project.

## Explicit Non-Authorization

This contract does not authorize:

- real materialization;
- runtime scripts;
- writes to any target project;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in any
  target project;
- changes to `skills/stnl_project_agent_specializer/`;
- changes to productive templates;
- GitHub writes;
- broad or blind replacement of `vscode`, `VS Code`, or `VS Code/GitHub`;
- inferring templates from output paths, legacy names, or productive-skill
  files.
