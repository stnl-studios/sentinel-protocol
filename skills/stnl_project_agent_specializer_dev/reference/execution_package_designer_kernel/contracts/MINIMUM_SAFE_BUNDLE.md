# Execution Package Designer Minimum Safe Bundle

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`.

This is the smallest non-optional documentary bundle that keeps
`execution-package-designer` acting as execution-package designer. It is not a
runtime bundle, materializer, fixture set, generated report, or production
skill path.

## Mandatory Source Chain

- productive/base copy origin:
  `templates/agents/execution-package-designer.agent.md`;
- local dev snapshot:
  `reference/agents/execution-package-designer.agent.md`;
- kernel contracts:
  `reference/execution_package_designer_kernel/**`.

The local snapshot is the audit point. The productive template is only the copy
origin and is not a fallback when the snapshot is missing.

## Mandatory Contracts

The minimum safe bundle requires:

1. `CONTRACT.md` for identity, authority, inputs, outputs, statuses, reading,
   handoff, and role boundaries.
2. `BEHAVIOR_PARITY_SPINE.md` for irreducible base-agent behavior.
3. `PACKAGE_READINESS_GATES.md` for `READY` versus `BLOCKED` and safe coder
   handoff gates.
4. `MINIMUM_SAFE_BUNDLE.md` for this non-optional file set.
5. `STATIC_CHECKS.md` and `GOLDEN_TESTS.md` for read-only validation contracts.
6. `check-static.mjs` and `check-golden.mjs` for executable textual support.

## Mandatory Semantic Floor

A safe kernel must preserve:

- `execution-package-designer` identity;
- `execution-package-design` role class;
- `targeted-local` reading;
- required `EXECUTION BRIEF` and `VALIDATION PACK` inputs;
- ephemeral `EXECUTION PACKAGE` output;
- package readiness before coder entry;
- bounded `WORK_PACKAGE` entries;
- `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`,
  `REQUIRED_QUALITY_GUARDRAILS`, and `BLOCK_IF`;
- `READY`, `BLOCKED`, `HANDOFF_MISSING`, `HANDOFF_INVALID`,
  `REQUEST_REPLAY_FROM_ORCHESTRATOR`, and `REQUEST_REGEN_FROM_OWNER` statuses;
- orchestrator as the only coordinator;
- prohibition on implementation, validation execution, review, finalization,
  resync, durable documentation, and materialization.

## Mandatory Negative Space

This bundle is unsafe if it:

- must not become a shared planning kernel;
- removes the local snapshot requirement;
- uses `templates/**`, the productive skill, external filesystem, or target repo
  as fallback during review;
- must not permit broad discovery as a substitute for weak handoffs;
- permits coders to infer ownership or proof obligations;
- must not treat `HANDOFF_READY` as a substitute for `STATUS: READY`;
- claims `CLEAN_EXCELLENT_PASS` before a separately authorized human audit;
- must not create `execution_package.md`, `PLAN.md`, generated reports, fixtures,
  runtime loading, or materializer paths.
