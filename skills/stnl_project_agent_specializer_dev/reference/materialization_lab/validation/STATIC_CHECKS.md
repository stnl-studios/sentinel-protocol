# Static Checks

These checks validate only the documentary/dev-only materialization target,
template, and output contracts. Passing them does not authorize runtime
materialization or writes to target projects.

## Required Files

Confirm the six materialization lab files exist:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
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

Confirm both explicit agent templates state that they do not authorize runtime
materialization, runtime scripts, target-project writes, GitHub writes, or
writes to `.github/**`, `.codex/**`, or `AGENTS.md`.

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
- runtime scripts.

## Legacy Rewrite Guard

Confirm the contract blocks blind/global replacement of legacy terms and
preserves historical references unless a separately scoped and justified
migration authorizes a specific edit.
