# Senior Agent Profile Set Index

Status: `DOCUMENTARY_DEV_ONLY`.

This index catalogs the complete 12-profile set in the Seniorization Lab. It is
not a loader, registry, runtime router, or materialization manifest.

The index exists to keep the global profile set auditable as a complete system.
A profile absent from this index is outside the approved seniorization set until
an authorized later contract updates this document and the corresponding
validation gates.

## Complete Set

| order | profile | canonical role | documentary kernel | primary senior ownership | primary artifact / signal | forbidden takeover |
|---:|---|---|---|---|---|---|
| 1 | `orchestrator_profile` | `orchestrator` | `orchestrator_kernel` | routing and safe delegation judgment | route, block, or next-owner handoff | planning, packaging, implementation, validation, review, finalization, resync |
| 2 | `planner_profile` | `planner` | `planner_kernel` | bounded planning cut | `EXECUTION BRIEF` | validation design, package design, implementation, review, finalization, resync |
| 3 | `validation_eval_designer_profile` | `validation-eval-designer` | `validation_eval_designer_kernel` | future proof design | `VALIDATION PACK` | proof execution, package design, implementation, review, finalization, resync |
| 4 | `execution_package_designer_profile` | `execution-package-designer` | `execution_package_designer_kernel` | bounded execution package design | `EXECUTION PACKAGE` | implementation, validation execution, review, finalization, resync |
| 5 | `designer_profile` | `designer` | `designer_kernel` | UX/product/design contribution within scope | design guidance / design constraints | implementation, package design, validation design, review, finalization, resync |
| 6 | `coder_frontend_profile` | `coder-frontend` | `coder_frontend_kernel` | frontend execution under package constraints | frontend executor handoff, `READY` or `BLOCKED` | replanning, package expansion, backend/iOS work, review, finalization, resync |
| 7 | `coder_backend_profile` | `coder-backend` | `coder_backend_kernel` | backend execution under package constraints | backend executor handoff, `READY` or `BLOCKED` | replanning, package expansion, frontend/iOS work, review, finalization, resync |
| 8 | `coder_ios_profile` | `coder-ios` | `coder_ios_kernel` | native iOS execution under package constraints | iOS executor handoff, `READY` or `BLOCKED` | replanning, package expansion, frontend/backend work, review, finalization, resync |
| 9 | `validation_runner_profile` | `validation-runner` | `validation_runner_kernel` | proof execution or audit against obligations | `PASS`, `PARTIAL`, `FAIL`, `BLOCKED`, or `CORRECTION PACK` | proof redesign, implementation, semantic review, finalization, resync |
| 10 | `reviewer_profile` | `reviewer` | `reviewer_kernel` | semantic review and material risk judgment | `REVIEW_CLEAR`, `REVIEW_RISK`, or `CORRECTION PACK` | implementation, validation execution, closure, resync |
| 11 | `finalizer_profile` | `finalizer` | `finalizer_kernel` | closure according to earned evidence | terminal ledger, `DONE` or non-terminal status, `resync: yes/no` | implementation, validation, review redo, resync execution |
| 12 | `resync_profile` | `resync` | `resync_kernel` | authorized final context synchronization | final context sync note | reopening, replanning, execution, validation, review, finalization |

## Stable Profile Requirements

Each listed profile must contain exactly the required local bundle:

- `README.md`
- `SENIOR_AGENT_PROFILE.md`
- `validation/STATIC_CHECKS.md`
- `validation/GOLDEN_SCENARIOS.md`
- `validation/EXCELLENT_PASS_EXPECTATIONS.md`

Additional local files are not forbidden by this index, but any additional file
must remain documentary/dev-only, must not create runtime behavior, and must not
change role authority without an explicit contract update.

## Integrated Profile Shape

All profiles must retain a consistent senior profile shape while staying
role-specific.

Consistency means the same sections and validation surface exist across the set.
It does not mean copied content, generic claims, or interchangeable role
language.

Role specificity is mandatory. A profile passes only when its seniority thesis,
risk taxonomy, stop/block behavior, handoff discipline, evidence discipline, and
excellent-pass expectations are specific to its canonical role.

## Downstream Interpretation

This index may be used for read-only validation, audit, and discussion of the
seniorization set.

It must not be used as:

- a routing table for runtime agents;
- a manifest for agent materialization;
- a prompt assembly source;
- a target output list;
- permission to create generated artifacts.

