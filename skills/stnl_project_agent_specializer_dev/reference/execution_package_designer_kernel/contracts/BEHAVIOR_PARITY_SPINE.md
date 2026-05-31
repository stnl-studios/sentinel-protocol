# Execution Package Designer Behavior Parity Spine

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`.

This spine records the behavior that must remain semantically aligned with the
base `execution-package-designer` snapshot. It is not runtime code and does not
authorize automatic promotion.

## Irreducible Behavior

The kernel must preserve the package-design role exactly:

1. receive current-round `EXECUTION BRIEF` and `VALIDATION PACK`;
2. compile an ephemeral `EXECUTION PACKAGE`;
3. include `PRE_EXECUTION_READINESS`, `PACKAGE_SCOPE`, and one or more bounded
   `WORK_PACKAGE` entries;
4. make coder entry safe by naming `OWNED_PATHS`, `DO_NOT_TOUCH`,
   `CHANGE_RULES`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`,
   `REQUIRED_QUALITY_GUARDRAILS`, and `BLOCK_IF`;
5. map `ACCEPTANCE_CHECKS` to `VALIDATION PACK` obligations;
6. provide package facts for orchestrator routing and parallelization decisions
   without becoming the orchestrator;
7. return to orchestrator with `READY`, `BLOCKED`, or explicit handoff error
   states.

## Required Positive Behaviors

A faithful kernel can:

- preserve the authorized cut from the `EXECUTION BRIEF`;
- preserve proof obligations from the `VALIDATION PACK`;
- carry active stack quality guardrail names into package-level constraints;
- split implementation into 1..N bounded work packages when that makes coder
  ownership safer;
- name dependency order without deciding final sequencing;
- state when work packages are eligible for parallel execution, while leaving
  the actual decision to orchestrator;
- update the minimum correction boundary only when orchestrator routes a
  `CORRECTION PACK` and the current package cannot be safely reused;
- block when coders would need to infer scope, ownership, acceptance checks,
  contracts, architecture, auth, schema, persistence, or product behavior.

## Required Negative Behaviors

The kernel must not:

- become planner or rewrite the cut;
- become validation-eval-designer or redesign proof;
- become orchestrator or coordinate coders;
- become coder or implement;
- become validation-runner or execute checks;
- become reviewer or review implemented artifacts;
- become finalizer, resync, materializer, or durable documentation owner;
- create `execution_package.md`, `PLAN.md`, or any persisted stand-in for the
  handoff;
- turn the package into a long implementation plan or pseudo-code dump;
- must not use broad discovery when targeted-local reading cannot stabilize package
  boundaries.

## Field-Level Parity

The package remains valid only when each `WORK_PACKAGE_ID` has a concrete owner
candidate and explicit safety fields:

- `OWNER_CANDIDATE` must be a specialist executor class such as
  `coder-backend`, `coder-frontend`, or `coder-ios`;
- `OWNED_PATHS` defines the edit boundary and cannot be broad prose;
- `SEARCH_ANCHORS` and `EDIT_ANCHORS` reduce local reading without authorizing
  broad discovery;
- `DEPENDS_ON` prevents hidden dependency inversion;
- `DO_NOT_TOUCH` protects shared files, contracts, and external surfaces;
- `CHANGE_RULES` states constraints, not implementation prose;
- `PERMITTED_LOCAL_DECISIONS` allows only mechanical, local, reversible choices;
- `FORBIDDEN_INFERENCES` blocks product, contract, architecture, auth, schema,
  migration, persistence, and scope decisions;
- `REQUIRES_DEV_DECISION_IF` turns ambiguity into early blockage;
- `RUN_COMMANDS` stays cut-local and runnable when exposed by the project;
- `ACCEPTANCE_CHECKS` maps back to the `VALIDATION PACK`;
- `REQUIRED_QUALITY_GUARDRAILS` names active guardrail identifiers without
  copying guardrail bodies;
- `BLOCK_IF` prefers early blockage over scope expansion.

## Dangerous Drift Rejections

Reject as role drift any package design that:

- must not state `VALIDATION PASSED`, `TESTS PASSED`, or `IMPLEMENTATION VERIFIED`;
- emits runner verdicts or closes the round;
- chooses final sequencing, parallelization, retry, or stop/go decisions;
- routes directly to coder instead of returning to orchestrator;
- replaces the brief, pack, or orchestrator decision;
- invents acceptance checks not grounded in the validation pack;
- moves ambiguity into coder instructions instead of blocking.
