# Seniorization Lab

Status: `DOCUMENTARY_DEV_ONLY`.

This lab contains the modular Senior Agent Profiles for the 12 canonical Sentinel agents. It is a documentary reference area for seniority overlays and validation contracts only. It is not a runtime, not a materializer, not a target output directory, and not a production agent pack.

## Modular Model

Each profile has a short `SENIOR_AGENT_PROFILE.md` manifest and exactly four behavior modules:

1. `01_IDENTITY_AND_BOUNDARY.md`
2. `02_DECISION_AND_READING.md`
3. `03_RISK_AND_GATES.md`
4. `04_HANDOFF_EVIDENCE_AND_OUTPUT.md`

The approved senior semantics moved from the old 13-section monolith into those modules. Lazy load is a safety contract: load activated modules only, require activated modules, and block if a triggered module was not loaded.

## Complete Profile Set

- `orchestrator_profile`: `orchestrator` over `orchestrator_kernel`
- `planner_profile`: `planner` over `planner_kernel`
- `validation_eval_designer_profile`: `validation-eval-designer` over `validation_eval_designer_kernel`
- `execution_package_designer_profile`: `execution-package-designer` over `execution_package_designer_kernel`
- `designer_profile`: `designer` over `designer_kernel`
- `coder_frontend_profile`: `coder-frontend` over `coder_frontend_kernel`
- `coder_backend_profile`: `coder-backend` over `coder_backend_kernel`
- `coder_ios_profile`: `coder-ios` over `coder_ios_kernel`
- `validation_runner_profile`: `validation-runner` over `validation_runner_kernel`
- `reviewer_profile`: `reviewer` over `reviewer_kernel`
- `finalizer_profile`: `finalizer` over `finalizer_kernel`
- `resync_profile`: `resync` over `resync_kernel`

The 12-profile set is the minimum integrated unit. A subset is not a pilot and cannot earn integrated Excellent Pass.

## Contracts

Global contracts live in `contracts/` and define the lab boundary, profile set, modularization shape, behavior module activation, future lazy-load protocol, minimum safety bundle, handoff chain, and integrated validation gates.

## Boundaries

This lab must not create or authorize target repository writes, runtime prompts, generated agents, materializers, `.github`, `.codex`, `AGENTS.md`, productive-skill mutation, template mutation, GitHub remote writes, or target repository reads/writes.

`reference/agents/`, if mentioned by surrounding dev documentation, is only a temporary development parity baseline. It is not the final source for modular senior profile behavior.
