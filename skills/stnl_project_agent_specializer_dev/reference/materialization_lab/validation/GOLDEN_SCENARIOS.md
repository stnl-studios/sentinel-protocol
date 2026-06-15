# Golden Scenarios

These scenarios define the minimum behavior expected from a future
materialization target resolver. They are documentary/dev-only scenarios and do
not authorize writing target artifacts.

## Positive Scenarios

### Normalize Legacy `vscode`

Input:

- requested target: `vscode`
- context: target runtime selection

Expected result:

- canonical target: `copilot`
- no target write is performed during this contract phase

### Preserve `codex`

Input:

- requested target: `codex`
- context: target runtime selection

Expected result:

- canonical target: `codex`
- future expected paths remain `.codex/agents/*.toml`,
  `.codex/config.toml`, and `AGENTS.md`
- no target write is performed during this contract phase

### Target With Explicit Template

Input:

- requested target: `codex`
- requested output shape: `AGENTS.md`
- explicit template: `reference/templates/codex/AGENTS.md`

Expected result:

- template source is accepted as explicit
- output shape is recognized as `codex`: `AGENTS.md`
- no target write is performed during this contract phase

### Resolve `copilot` Agent Template

Input:

- requested target: `copilot`
- requested output shape: `.github/agents/*.agent.md`
- explicit template: `reference/templates/copilot/agent.md`

Expected result:

- template source is accepted as explicit
- output shape is recognized as `copilot`: `.github/agents/*.agent.md`
- required placeholders are present before rendering
- no target write is performed during this contract phase

### Resolve `codex` Agent TOML Template

Input:

- requested target: `codex`
- requested output shape: `.codex/agents/*.toml`
- explicit template: `reference/templates/codex/agent.toml`

Expected result:

- template source is accepted as explicit
- output shape is recognized as `codex`: `.codex/agents/*.toml`
- required TOML fields and placeholders are present before rendering
- no target write is performed during this contract phase

## Negative Scenarios

### Missing Explicit Template

Input:

- requested target: `copilot`
- requested agent: any senior agent
- no explicit template exists for the requested target-agent pair

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

### Unknown Target Without Explicit Template

Input:

- requested target: any non-canonical target
- requested output shape: any output shape
- no explicit template exists in the dev skill for that target/output pair

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

### Required Placeholder Missing

Input:

- requested target: `copilot` or `codex`
- requested output shape has an explicit dev-skill template
- the explicit template is missing a required placeholder such as
  `{{AGENT_BODY}}`, `{{AGENT_ID}}`, or `{{TARGET_ID}}`

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`
- explain that the explicit template is structurally incomplete

### Productive Template Reuse Attempt

Input:

- requested target: `copilot` or `codex`
- requested output shape has no explicit dev-skill template
- implementation attempts to reuse a productive
  `skills/stnl_project_agent_specializer/` template automatically

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`
- explain that productive templates may be read only as conceptual reference
  in this phase, never as an automatic source of writing

### Infer Template By Path

Input:

- requested output path: `.github/agents/planner.agent.md` or
  `.codex/agents/planner.toml`
- no explicit template is declared for the corresponding output shape

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`
- explain that output paths do not imply template availability

### Productive Skill Mutation

Input:

- request asks to change `skills/stnl_project_agent_specializer/`

Expected result:

- block the change
- explain that this contract phase is dev-only and does not authorize
  productive-skill edits

### Blind Global Legacy Replacement

Input:

- request asks for a global replacement of `VS Code`, `VS Code/GitHub`, or
  `vscode`

Expected result:

- block the change
- normalize only runtime target-selection terms through the canonical target
  resolver
- preserve historical references in audits, profiles, and old contracts unless
  separately authorized and justified
