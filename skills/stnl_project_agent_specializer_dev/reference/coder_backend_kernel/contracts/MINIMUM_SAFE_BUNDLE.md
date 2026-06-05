# Minimum Safe Bundle

Status: `CLEAN_EXCELLENT_PASS`.

Promotion state:

- `documentary promotion applied`;
- `documentary validation pass`;
- `contractual pass`;
- `minimum semantic pass`;
- `hardened textual executable harness pass`;
- `dev kernel lab only`;
- `non-runtime`;
- `non-production`;
- `no materialization path`.

The minimum safe bundle for this promoted kernel lab dev pass is intentionally
small and allowlist-bound. It is not an active `MANIFEST.md` entry. The textual
validation scripts exist only inside this dev kernel lab bundle and prove only
documentary/dev kernel lab `CLEAN_EXCELLENT_PASS`.

## Required Files

- `reference/agents/coder-backend.agent.md`;
- `reference/coder_backend_kernel/README.md`;
- `reference/coder_backend_kernel/contracts/CONTRACT.md`;
- `reference/coder_backend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/coder_backend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/coder_backend_kernel/contracts/BACKEND_EXECUTION_GATES.md`;
- `reference/coder_backend_kernel/validation/STATIC_CHECKS.md`;
- `reference/coder_backend_kernel/validation/GOLDEN_TESTS.md`;
- `reference/coder_backend_kernel/validation/check-static.mjs`;
- `reference/coder_backend_kernel/validation/check-golden.mjs`.

The kernel allowlist contains exactly nine files under
`reference/coder_backend_kernel/`: `README.md`, `contracts/CONTRACT.md`,
`contracts/BEHAVIOR_PARITY_SPINE.md`, `contracts/MINIMUM_SAFE_BUNDLE.md`,
`contracts/BACKEND_EXECUTION_GATES.md`, `validation/STATIC_CHECKS.md`,
`validation/GOLDEN_TESTS.md`, `validation/check-static.mjs`, and
`validation/check-golden.mjs`.

Only the files above are required or authorized in this phase. The harnesses
exist as textual executable validation scripts of the kernel lab dev bundle.
The scripts do not execute agent runtime, do not authorize runtime execution,
do not authorize a runtime loader, do not authorize materialization path, do not
authorize production use, do not authorize production readiness, do not
authorize productive-skill behavior or change, do not authorize target
repository write, do not authorize target repo write, do not authorize target
artifacts, do not authorize active runtime adoption, do not authorize GitHub
write, do not authorize canonical template change, do not produce generated
reports, do not create fixtures, and prove only documentary/dev kernel lab
`CLEAN_EXCELLENT_PASS`.

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

## Pass Boundary

The bundle may claim `CLEAN_EXCELLENT_PASS` only for documentary/dev kernel lab
scope. It must not claim runtime pass, materialization pass, target repository
pass, productive skill authorization, materializer authorization, GitHub writes,
target repository writes, automatic future promotion, active runtime adoption,
production use, or active `MANIFEST.md` status.

Executable checks as `check-static.mjs` and `check-golden.mjs` are part of the
promoted dev kernel lab bundle. Their existence proves only documentary/dev
kernel lab `CLEAN_EXCELLENT_PASS`; it does not authorize runtime,
materialization, production, productive skill use, GitHub write, target repo
write, generated reports, fixtures, target artifacts, active runtime adoption,
or canonical template changes.

## Ignore Rules

Validation and review must ignore `__MACOSX` and `.DS_Store`.
