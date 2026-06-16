# Senior Agent Profile Set Index

Status: `DOCUMENTARY_DEV_ONLY`.

This index catalogs the complete 12-profile modular set in the Seniorization Lab. It is not a loader, registry, runtime router, or materialization manifest.

## Complete Set

| order | profile | canonical role | documentary kernel | role class | primary senior ownership | primary artifact / signal | forbidden takeover |
|---:|---|---|---|---|---|---|---|
| 1 | `orchestrator_profile` | `orchestrator` | `orchestrator_kernel` | `router` | routing controller and safe delegation judge | route, block, or next-owner handoff | planning, proof design, package design, design contribution, implementation, validation, review, finalization, resync |
| 2 | `planner_profile` | `planner` | `planner_kernel` | `planning` | bounded cut planner and EXECUTION BRIEF owner | EXECUTION BRIEF | validation design, package design, implementation, validation execution, review, finalization, resync |
| 3 | `validation_eval_designer_profile` | `validation-eval-designer` | `validation_eval_designer_kernel` | `proof-design` | proof obligation and VALIDATION PACK designer | VALIDATION PACK | proof execution, package design, implementation, semantic review, finalization, resync |
| 4 | `execution_package_designer_profile` | `execution-package-designer` | `execution_package_designer_kernel` | `execution-package-design` | bounded execution package designer | EXECUTION PACKAGE | routing, implementation, validation execution, semantic review, finalization, resync |
| 5 | `designer_profile` | `designer` | `designer_kernel` | `design-contributor` | UX, product, interaction, accessibility, responsive, and visual-system contributor | bounded design guidance and design constraints | implementation, package design, validation design, semantic review, finalization, resync |
| 6 | `coder_frontend_profile` | `coder-frontend` | `coder_frontend_kernel` | `executor` | frontend executor under package constraints | frontend executor READY or BLOCKED handoff | replanning, package expansion, backend/iOS execution, validation, review, finalization, resync |
| 7 | `coder_backend_profile` | `coder-backend` | `coder_backend_kernel` | `executor` | backend executor under package constraints | backend executor READY or BLOCKED handoff | replanning, package expansion, frontend/iOS execution, validation, review, finalization, resync |
| 8 | `coder_ios_profile` | `coder-ios` | `coder_ios_kernel` | `executor` | native iOS executor under package constraints | iOS executor READY or BLOCKED handoff | replanning, package expansion, frontend/backend execution, validation, review, finalization, resync |
| 9 | `validation_runner_profile` | `validation-runner` | `validation_runner_kernel` | `proof-execution` | proof executor or audit judge against declared obligations | PASS, PARTIAL, FAIL, BLOCKED, or CORRECTION PACK | proof redesign, implementation, semantic review, finalization, resync |
| 10 | `reviewer_profile` | `reviewer` | `reviewer_kernel` | `semantic-review` | semantic and architectural risk reviewer | REVIEW_CLEAR, REVIEW_RISK, or CORRECTION PACK | implementation, validation execution, closure, resync |
| 11 | `finalizer_profile` | `finalizer` | `finalizer_kernel` | `closure` | closure owner according to earned evidence | terminal ledger with DONE yes/no and resync yes/no | implementation, validation execution, semantic review redo, resync execution |
| 12 | `resync_profile` | `resync` | `resync_kernel` | `sync` | authorized final context synchronization owner | final context sync note | reopening, replanning, execution, validation, review, finalization |

## Stable Profile Requirements

Each listed profile must contain exactly the required local bundle:

- `README.md`;
- short `SENIOR_AGENT_PROFILE.md` manifest;
- `profile/01_IDENTITY_AND_BOUNDARY.md`;
- `profile/02_DECISION_AND_READING.md`;
- `profile/03_RISK_AND_GATES.md`;
- `profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_SCENARIOS.md`;
- `validation/EXCELLENT_PASS_EXPECTATIONS.md`.

No additional file is allowed inside `profile/`. Any future additional profile behavior part requires explicit contract update.

## Integrated Modular Shape

All profiles must retain the same four behavior-module types while staying role-specific. Consistency means the same module responsibilities and metadata surface exist across the set. It does not mean copied content, generic claims, load-all behavior, or interchangeable role language.

Role specificity is mandatory. A profile passes only when its identity/boundary, decision/reading, risk/gates, handoff/evidence/output, and excellent-pass expectations are specific to its canonical role.

## Downstream Interpretation

This index may be used for read-only validation, audit, and discussion of the seniorization set. It must not be used as a routing table for runtime agents, a materialization manifest, prompt assembly source, target output list, or permission to create generated artifacts.
