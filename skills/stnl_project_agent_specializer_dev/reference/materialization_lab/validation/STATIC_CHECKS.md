# Static Checks

These checks validate only the documentary/dev-only materialization target,
template, output, rendering, and composition contracts. Passing them does not
authorize runtime materialization or writes to target projects.

## Required Files

Confirm the seven materialization lab files exist:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`

Confirm the four explicit canonical templates exist:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

## Contract Anchors

Confirm `contracts/TARGETS_CONTRACT.md` contains all required anchors:

- `copilot`
- `codex`
- `.github/agents`
- `.codex/agents`
- `.codex/config.toml`
- `AGENTS.md`

Confirm `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` contains all required
anchors:

- `copilot`
- `codex`
- `.github/agents`
- `.codex/agents`
- `.codex/config.toml`
- `AGENTS.md`
- `BLOCKED_TEMPLATE_MISSING`

Confirm `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` records explicit template
coverage for:

- `reference/templates/copilot/agent.md` covering `.github/agents/*.agent.md`
- `reference/templates/codex/agent.toml` covering `.codex/agents/*.toml`
- `reference/templates/codex/config.toml` covering `.codex/config.toml`
- `reference/templates/codex/AGENTS.md` covering `AGENTS.md`

Confirm the contract does not list `copilot` `.github/agents/*.agent.md` or
`codex` `.codex/agents/*.toml` as currently missing.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` contains all 12
canonical agent IDs:

- `orchestrator`
- `planner`
- `validation-eval-designer`
- `execution-package-designer`
- `designer`
- `coder-frontend`
- `coder-backend`
- `coder-ios`
- `validation-runner`
- `reviewer`
- `finalizer`
- `resync`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` contains all five
rendering/composition block codes:

- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` declares the explicit
composition sources:

- `reference/agents/<agent>.agent.md`
- `reference/agents/<agent>.md` as the logical base-agent source slot
- `reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md`
- `reference/templates/<target>/...`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`

## Template Placeholder Checks

Confirm `reference/templates/copilot/agent.md` contains all required
placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`
- `{{AGENT_TOOLS}}`
- `{{AGENT_MODEL}}`
- `{{SPECIALIZATION_REVISION}}`
- `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- `{{READING_SCOPE_CLASS_BLOCK}}`

Confirm `reference/templates/codex/agent.toml` contains all required
placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`
- `{{AGENT_MODEL}}`
- `{{MODEL_REASONING_EFFORT}}`
- `{{SANDBOX_MODE}}`

Confirm both explicit agent templates document the placeholders, preserve the
agent body/instructions as a placeholder, and do not mention `vscode` as a
canonical target.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` lists the common
required placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` lists the
target-specific placeholders for `copilot`:

- `{{AGENT_TOOLS}}`
- `{{AGENT_MODEL}}`
- `{{SPECIALIZATION_REVISION}}`
- `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- `{{READING_SCOPE_CLASS_BLOCK}}`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` lists the
target-specific placeholders for `codex`:

- `{{AGENT_MODEL}}`
- `{{MODEL_REASONING_EFFORT}}`
- `{{SANDBOX_MODE}}`

Confirm both explicit agent templates and
`contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` state that they do not
authorize runtime materialization, runtime scripts, target-project writes,
GitHub writes, or writes to `.github/**`, `.codex/**`, or `AGENTS.md`.

## Rendering Safety Checks

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` requires:

- Copilot frontmatter to be YAML-safe;
- Copilot block placeholders to render valid YAML or a valid empty string;
- Codex output to be TOML-safe;
- `{{AGENT_BODY}}` in Codex to be emitted by a TOML-aware renderer as a valid
  TOML string value;
- unsafe generated notices or unsafe placeholder values to block with
  `BLOCKED_UNSAFE_RENDER`;
- conflicts between base agent and Senior Agent Profile to block with
  `BLOCKED_COMPOSITION_CONFLICT`.

## Template Inference Guard

Confirm `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` states that templates
must not be inferred from output path, legacy naming, the productive skill, or
existing target-project artifacts.

## Blocking Boundaries

Confirm the materialization lab does not authorize:

- writes to any target project;
- changes to `.github/**`, `.codex/**`, or `AGENTS.md` in a target project;
- changes to `skills/stnl_project_agent_specializer/`;
- changes to the productive skill;
- changes to productive templates;
- inferred templates;
- inferred senior profiles;
- generated outputs;
- runtime scripts.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` does not authorize
runtime scripts or target writes.

## Legacy Rewrite Guard

Confirm the contract blocks blind/global replacement of legacy terms and
preserves historical references unless a separately scoped and justified
migration authorizes a specific edit.
