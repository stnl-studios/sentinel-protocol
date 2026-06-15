# Golden Scenarios

These scenarios define the minimum behavior expected from a future
materialization target resolver and future render-context composer. They are
documentary/dev-only scenarios and do not authorize writing target artifacts.

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

### Compose `planner` Render Context For `copilot`

Input:

- requested agent: `planner`
- requested target: `copilot`
- base agent: `reference/agents/planner.agent.md`
- senior profile:
  `reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md`
- explicit template: `reference/templates/copilot/agent.md`

Expected result:

- a deterministic render context is produced for `planner+copilot`
- common placeholders and Copilot-specific placeholders are populated from
  explicit sources
- YAML-safe render requirements are checked
- no `.github/**` output is written during this contract phase

### Compose `reviewer` Render Context For `codex`

Input:

- requested agent: `reviewer`
- requested target: `codex`
- base agent: `reference/agents/reviewer.agent.md`
- senior profile:
  `reference/seniorization_lab/reviewer_profile/SENIOR_AGENT_PROFILE.md`
- explicit template: `reference/templates/codex/agent.toml`

Expected result:

- a deterministic render context is produced for `reviewer+codex`
- common placeholders and Codex-specific placeholders are populated from
  explicit sources
- TOML-safe render requirements are checked
- `{{AGENT_BODY}}` is represented as a TOML-aware string value in the render
  context plan
- no `.codex/**` output and no `AGENTS.md` output are written during this
  contract phase

### Compose `orchestrator` Copilot Agents Block

Input:

- requested agent: `orchestrator`
- requested target: `copilot`
- explicit template: `reference/templates/copilot/agent.md`

Expected result:

- render context requires `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- the block renders valid YAML or blocks before writing
- non-orchestrator agents may render the same placeholder as a valid empty
  string for its target location
- no target write is performed during this contract phase

### Plan `planner` Copilot Artifact Without Writing

Input:

- requested agent: `planner`
- requested target: `copilot`
- explicit template: `reference/templates/copilot/agent.md`
- planned path: `.github/agents/planner.agent.md`

Expected result:

- dry-run output plan contains one planned artifact entry
- `target_id` is `copilot`
- `agent_id` is `planner`
- `planned_path` is `.github/agents/planner.agent.md`
- operation is `CREATE_PLANNED`, `UPDATE_PLANNED`, or
  `UNCHANGED_PLANNED` according to drift state
- no `.github/**` output is written during this contract phase

### Plan `reviewer` Codex Agent Without Writing

Input:

- requested agent: `reviewer`
- requested target: `codex`
- explicit template: `reference/templates/codex/agent.toml`
- planned path: `.codex/agents/reviewer.toml`

Expected result:

- dry-run output plan contains one planned artifact entry
- `target_id` is `codex`
- `agent_id` is `reviewer`
- `planned_path` is `.codex/agents/reviewer.toml`
- operation is `CREATE_PLANNED`, `UPDATE_PLANNED`, or
  `UNCHANGED_PLANNED` according to drift state
- no `.codex/**` output and no `AGENTS.md` output are written during this
  contract phase

### Plan Codex Config Without Writing

Input:

- requested target: `codex`
- requested output shape: `.codex/config.toml`
- explicit template: `reference/templates/codex/config.toml`

Expected result:

- dry-run output plan contains a planned artifact entry for
  `.codex/config.toml`
- operation is planned only
- no `.codex/config.toml` output is written during this contract phase

### Plan Codex Root Instructions Without Writing

Input:

- requested target: `codex`
- requested output shape: `AGENTS.md`
- explicit template: `reference/templates/codex/AGENTS.md`

Expected result:

- dry-run output plan contains a planned artifact entry for `AGENTS.md`
- operation is planned only
- no `AGENTS.md` output is written during this contract phase

## Negative Scenarios

### Missing Explicit Template

Input:

- requested target: `copilot`
- requested agent: any senior agent
- no explicit template exists for the requested target-agent pair

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

### Missing Base Agent Source

Input:

- requested target: `copilot`
- requested agent: a canonical agent ID
- matching `reference/agents/<agent>.agent.md` is absent

Expected result:

- block before composing render context
- return `BLOCKED_SOURCE_MISSING`

### Missing Senior Profile Source

Input:

- requested target: `codex`
- requested agent: a canonical agent ID
- matching
  `reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md` is
  absent

Expected result:

- block before composing render context
- return `BLOCKED_SOURCE_MISSING`

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
- return `BLOCKED_PLACEHOLDER_MISSING`
- explain that the explicit template is structurally incomplete

### TOML Unsafe Body

Input:

- requested target: `codex`
- requested agent: `reviewer`
- composed `{{AGENT_BODY}}` cannot be represented as a safe TOML string value

Expected result:

- block before writing
- return `BLOCKED_UNSAFE_RENDER`
- explain that Codex output must be TOML-safe

### Base Agent And Senior Profile Conflict

Input:

- requested target: `copilot` or `codex`
- requested agent: any canonical agent ID
- base agent and Senior Agent Profile conflict on role class, mission,
  handoff, status semantics, or other protocol-significant behavior

Expected result:

- block before writing
- return `BLOCKED_COMPOSITION_CONFLICT`
- explain that seniorization cannot erase or contradict the base-agent
  contract

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

### Invalid Target Root

Input:

- requested target: `codex`
- target project root is missing, not a directory, inaccessible, or otherwise
  invalid for safe path resolution

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_TARGET_ROOT_INVALID`

### Path Traversal Destination

Input:

- requested target: `copilot`
- requested agent: `planner`
- planned path resolves to `../.github/agents/planner.agent.md` or another
  destination outside the target project root

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_PATH_UNSAFE`

### Existing Manual File Collision

Input:

- requested target: `codex`
- requested agent: `reviewer`
- planned path `.codex/agents/reviewer.toml` already exists without a valid
  Sentinel managed notice

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_UNMANAGED_COLLISION`

### Invalid Managed Notice

Input:

- requested target: `codex`
- requested output shape: `AGENTS.md`
- existing `AGENTS.md` contains a malformed, contradictory, ambiguous, or
  unverifiable managed notice

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_INVALID_MANAGED_NOTICE`

### Write Without Approved Dry Run

Input:

- implementation attempts to create, update, delete, repair, clean, or mutate
  any target artifact before an approved dry-run output plan exists

Expected result:

- block before writing
- return `BLOCKED_DRY_RUN_REQUIRED`
