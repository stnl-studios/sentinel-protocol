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

## Negative Scenarios

### Missing Explicit Template

Input:

- requested target: `copilot`
- requested agent: any senior agent
- no explicit template exists for the requested target-agent pair

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

### Copilot Without Explicit Template

Input:

- requested target: `copilot`
- requested output shape: `.github/agents/*.agent.md`
- no explicit `copilot` template exists in the dev skill

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

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
