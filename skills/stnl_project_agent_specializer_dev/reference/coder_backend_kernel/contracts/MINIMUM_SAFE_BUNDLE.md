# Minimum Safe Bundle

Status:

- `initial draft`;
- `not promoted`;
- `not a clean pass`;
- `pending draft audit`;
- `pending harness design`;
- `pending harness creation`;
- `pending promotion evaluation`;
- `documentary only`;
- `contractual only`;
- `minimum semantic only`;
- `dev kernel lab only`;
- `non-runtime`;
- `non-production`;
- `no materialization path`.

The minimum safe bundle for this initial kernel lab dev draft is intentionally
small and allowlist-bound. It is not an active `MANIFEST.md` entry.

## Required Files

- `reference/agents/coder-backend.agent.md`;
- `reference/coder_backend_kernel/README.md`;
- `reference/coder_backend_kernel/contracts/CONTRACT.md`;
- `reference/coder_backend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/coder_backend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/coder_backend_kernel/contracts/BACKEND_EXECUTION_GATES.md`;
- `reference/coder_backend_kernel/validation/STATIC_CHECKS.md`;
- `reference/coder_backend_kernel/validation/GOLDEN_TESTS.md`.

Only the documentary files above are required or authorized in this phase. No
validation script, fixture, generated report, runtime loader, materialization
path, production artifact, target-repository artifact, runtime execution,
materializer, production use, target repository write, GitHub write, canonical
template change, or productive-skill change is authorized by this draft.

## Snapshot Requirement

`reference/agents/coder-backend.agent.md` must match
`templates/agents/coder-backend.agent.md` byte-for-byte.

## Required Documentary Coverage

The bundle must explicitly preserve:

- role class `executor`;
- reading scope class `targeted-local`;
- execution-only ownership of authorized server-side work packages;
- required `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`;
- required `EXECUTION BRIEF`;
- required `VALIDATION PACK`;
- required guardrails when present;
- minimum technical back-end context;
- optional stabilized shared contracts;
- optional migration, rollout, or integration constraints;
- optional technical references for affected framework, ORM, SDK, or
  infrastructure;
- optional adjacent executor evidence;
- `stnl_backend_quality` named explicitly as the package-level back-end quality
  guardrail when server-side/API/service/domain/job/auth/integration/runtime
  code is touched;
- `stnl_backend_sql_quality` named explicitly as the package-level persistence
  and data guardrail when persistence, data access, query, ORM, NoSQL, cache,
  migration, transaction, index, bounded access, or data-consistency behavior is
  touched;
- validation expectations by change type: API or handler contract behavior,
  persistence path and migration safety, authorization paths, async/job retry
  and idempotency, integration boundaries, logging and secret handling, bounded
  queries, cache semantics, and rollout/backfill when applicable;
- exact required-preparation missing or invalid handoff shape with
  `STATUS: BLOCKED`, `REASON: required handoff missing or invalid`,
  `NEXT_OWNER: orchestrator`, and `REQUEST: replay previous handoff or
  regenerate from owner`;
- partial-edit `BLOCKED` requirements covering objective blocker, touched files,
  partial work left behind, and whether the partial state is inspectable/reusable
  or should be discarded and re-executed;
- outputs covering implementation, concise delta, paths or evidence, checks run
  or not run, residual risk, and exact blocker when blocked;
- statuses `READY` and `BLOCKED`;
- validation-eligible handoff to `validation-runner.agent.md`;
- stop conditions for missing or unsafe package, brief, pack, context,
  contract, capability, environment, structural decision, product decision, API
  decision, schema decision, migration decision, persistence decision, auth/authz
  decision, external dependency decision, rollout decision, query uncertainty,
  transaction uncertainty, cache uncertainty, job uncertainty, integration
  uncertainty, logging uncertainty, secret handling uncertainty, and unsafe
  external side effects;
- anti-role-drift boundaries against planner, validation-eval-designer,
  execution-package-designer, validation-runner, reviewer, finalizer, and
  resync;
- durable-documentation exclusions: `Feature CONTEXT`, `DONE`, ADR, `PLAN.md`
  as a canonical execution artifact, `core` docs as a resync action, and `units`
  docs as a resync action.

## Draft Boundary

The bundle may claim only initial draft status. It must not claim
`CLEAN_EXCELLENT_PASS`, runtime pass, materialization pass, target repository
pass, productive skill authorization, materializer authorization, GitHub writes,
target repository writes, automatic promotion, or active `MANIFEST.md` status.

Checks executable as `check-static.mjs` or `check-golden.mjs` are not part of
this bundle. Harness design and harness creation belong to future phases.

## Ignore Rules

Validation and review must ignore `__MACOSX` and `.DS_Store`.
