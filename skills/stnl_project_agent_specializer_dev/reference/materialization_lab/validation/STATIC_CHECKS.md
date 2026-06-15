# Static Checks

These checks validate only the documentary/dev-only materialization target
contract. Passing them does not authorize runtime materialization or writes to
target projects.

## Required Files

Confirm the five materialization lab files exist:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`

## Contract Anchors

Confirm `contracts/TARGETS_CONTRACT.md` contains all required anchors:

- `copilot`
- `codex`
- `.github/agents`
- `.codex/agents`
- `.codex/config.toml`
- `AGENTS.md`

## Blocking Boundaries

Confirm the materialization lab does not authorize:

- writes to any target project;
- changes to `.github/**`, `.codex/**`, or `AGENTS.md` in a target project;
- changes to `skills/stnl_project_agent_specializer/`;
- changes to the productive skill;
- changes to productive templates.

## Legacy Rewrite Guard

Confirm the contract blocks blind/global replacement of legacy terms and
preserves historical references unless a separately scoped and justified
migration authorizes a specific edit.
