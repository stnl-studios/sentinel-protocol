# Coder Back-End Golden Tests

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

These golden checks are promoted textual validation scenarios for the
`coder-backend` documentary/dev kernel lab pass. The harnesses exist as textual
executable validation scripts of the kernel lab dev bundle:
`validation/check-golden.mjs` and `validation/check-static.mjs`. They are not an
active `MANIFEST.md` entry. They do not execute agent runtime, do not authorize
runtime execution, do not authorize a runtime loader, do not materialize
anything, do not authorize materialization path, do not authorize production
use, do not authorize productive-skill behavior or change, do not write target
repositories, do not authorize target repository write, do not write GitHub, do
not authorize GitHub write, do not authorize target repo write, do not produce
generated reports, do not create fixtures, do not authorize target artifacts,
do not authorize active runtime adoption, and do not alter canonical templates.

These harness scripts prove only documentary/dev kernel lab
`CLEAN_EXCELLENT_PASS`. Passing them does not authorize runtime pass,
runtime loader, runtime execution, materialization pass, materialization path,
target repository pass, production use, productive skill authorization,
materializer authorization, GitHub writes, or target repository writes. They do
not authorize generated reports, fixtures, target artifacts, active runtime
adoption, canonical template changes, or automatic future promotion.

The post-harness kernel allowlist contains exactly nine files:

- `README.md`;
- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `contracts/BACKEND_EXECUTION_GATES.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`;
- `validation/check-static.mjs`;
- `validation/check-golden.mjs`.

## Required Case Format

Golden cases must use stable IDs, no duplicate IDs, ascending order, and this
subsection shape:

- Objective
- Input shape
- Expected behavior
- Fail condition
- Expected blocker

Each case should retain its own minimum scenario terms so coverage cannot pass
through anchors that only appear in another case.

## CBE-GT-000 - Authorized Back-End Package Can Reach READY

### Objective

Preserve the positive executor path for a complete authorized back-end package.

### Input shape

Current-round `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`, `EXECUTION BRIEF`,
`VALIDATION PACK`, edit capability, owned paths or equivalent edit authority,
change rules, checks, risk notes, and required `stnl_backend_quality` or
`stnl_backend_sql_quality` when applicable.

### Expected behavior

The kernel may return `READY` only after applying the authorized implementation
inside scope and reporting changed paths or equivalent evidence, concise delta,
checks run or honestly not run, residual risk, and relevant back-end guardrail
coverage.

### Fail condition

`READY` is emitted without implementation evidence, paths or equivalent
evidence, checks, residual risk, or required guardrail coverage.

### Expected blocker

`BLOCKED` with the missing evidence, missing guardrail, or missing package
authority named narrowly.

## CBE-GT-001 - Missing Execution Package Blocks

### Objective

Preserve the required package handoff gate.

### Input shape

No `EXECUTION PACKAGE` is available for the current round.

### Expected behavior

The kernel must not reconstruct the package from local preference, scratchpads,
runtime temporary files, or broad repository reading.

### Fail condition

The kernel proceeds with implementation or emits `READY`.

### Expected blocker

`BLOCKED` using the exact required-handoff-missing shape with `NEXT_OWNER:
orchestrator`.

## CBE-GT-002 - Missing WORK_PACKAGE_ID Blocks

### Objective

Preserve assignment to a concrete work package.

### Input shape

An execution package-like handoff exists but lacks `WORK_PACKAGE_ID`.

### Expected behavior

The kernel must treat the handoff as invalid and request replay or regeneration
through orchestrator.

### Fail condition

The kernel chooses a package locally or infers ownership from file names.

### Expected blocker

`BLOCKED` because the required handoff is missing or invalid.

## CBE-GT-003 - Missing Execution Brief Blocks

### Objective

Preserve dependence on the authorized execution brief.

### Input shape

The handoff contains package details but omits `EXECUTION BRIEF`.

### Expected behavior

The kernel must not define the cut, product intent, or implementation objective
itself.

### Fail condition

The kernel proceeds by creating its own brief or local plan.

### Expected blocker

`BLOCKED` because required preparation is missing.

## CBE-GT-004 - Missing Validation Pack Blocks

### Objective

Preserve proof-basis handoff requirements.

### Input shape

The package and brief exist but `VALIDATION PACK` is absent.

### Expected behavior

The kernel must not design proof obligations, own validation criteria, or
replace the validation owner.

### Fail condition

The kernel invents acceptance checks, claims validation verdict ownership, or
claims validation readiness without the pack.

### Expected blocker

`BLOCKED` because the validation handoff is missing.

## CBE-GT-005 - Missing Edit Capability Blocks

### Objective

Preserve executor honesty when implementation cannot be applied.

### Input shape

The package is complete, but the runtime lacks real edit capability.

### Expected behavior

The kernel must not emit `READY` from analysis-only work.

### Fail condition

The kernel describes intended edits as if they were applied.

### Expected blocker

`BLOCKED` naming missing edit capability.

## CBE-GT-006 - API Or Schema Drift Blocks

### Objective

Prevent silent public contract, payload, or schema drift.

### Input shape

The package touches an API, schema, route, shared type, event payload, or
consumer-facing contract without explicit authorization for a breaking or
shape-changing change.

### Expected behavior

The kernel preserves the stabilized contract or blocks for a contract decision.

### Fail condition

The kernel invents request/response shape, changes schema, or hides behavior
drift as an implementation detail.

### Expected blocker

`BLOCKED` naming missing API/schema contract basis.

## CBE-GT-007 - Auth Or Authorization Ambiguity Blocks

### Objective

Preserve security and access-control boundaries.

### Input shape

The package touches auth, authorization, tenant/user scoping, permission checks,
or resource ownership without enough basis.

### Expected behavior

The kernel must preserve existing behavior or block when permission semantics
cannot be derived safely.

### Fail condition

The kernel changes access behavior, error visibility, or scope checks by local
preference.

### Expected blocker

`BLOCKED` naming missing auth/authz basis.

## CBE-GT-008 - Persistence Or Migration Ambiguity Blocks

### Objective

Preserve data safety for persistence and migration-sensitive changes.

### Input shape

The package touches storage, repositories, models, migrations, indexes,
backfills, or data invariants without enough compatibility and rollout basis.

### Expected behavior

The kernel applies `stnl_backend_sql_quality` when relevant and blocks unsafe
schema, data, index, migration, rollback, or backfill assumptions.

### Fail condition

The kernel creates persistence or migration behavior without explicit safety
basis.

### Expected blocker

`BLOCKED` naming missing persistence, migration, rollout, or backfill decision.

## CBE-GT-009 - Unsafe Transaction Or External Side Effect Blocks

### Objective

Prevent unsafe transaction boundaries and irreversible external effects.

### Input shape

The package touches transactions and external effects such as network calls,
message publishing, email, payments, webhooks, cache mutation, or job enqueueing.

### Expected behavior

The kernel preserves safe transaction boundaries and blocks when external side
effects could occur inside unsafe transactions, duplicate on retry, or outlive a
rollback without a clear basis.

### Fail condition

The kernel puts unsafe side effects inside transactions or changes transaction
scope without authorization.

### Expected blocker

`BLOCKED` naming missing transaction or side-effect safety basis.

## CBE-GT-010 - Jobs And Integrations Need Explicit Failure Semantics

### Objective

Preserve operational safety for async work and external integrations.

### Input shape

The package touches jobs, queues, scheduled work, webhooks, API clients, SDKs,
external services, retries, idempotency, or timeouts.

### Expected behavior

The kernel preserves explicit retry, idempotency, ordering, timeout, failure,
and external contract behavior, or blocks.

### Fail condition

The kernel invents retry behavior, ignores idempotency, or assumes integration
failure handling.

### Expected blocker

`BLOCKED` naming missing job, async, or integration failure semantics.

## CBE-GT-011 - Logs Secrets Queries And Cache Need Bounded Safety

### Objective

Preserve safe observability, query, and cache behavior.

### Input shape

The package touches logs, errors, secrets, queries, pagination, indexes, cache
keys, cache invalidation, TTLs, or cache scope.

### Expected behavior

The kernel avoids secret leakage, preserves useful diagnostics, keeps queries
bounded, and preserves cache consistency and scope.

### Fail condition

The kernel leaks sensitive values, introduces unbounded access, weakens
pagination or tenant scoping, or invents cache semantics.

### Expected blocker

`BLOCKED` naming missing log/secret, bounded-query, or cache safety basis.

## CBE-GT-012 - Vendor Leakage Into Public Boundary Blocks

### Objective

Prevent provider details from becoming public domain/API contract by accident.

### Input shape

The package touches a provider SDK, third-party payload, vendor-specific errors,
or external integration mapping that could affect domain language or public API
behavior.

### Expected behavior

Vendor-specific details remain behind appropriate boundaries unless explicitly
authorized. This is a safety refinement derived from boundaries, public
contracts, external integrations, and back-end guardrails, not a literal source
template phrase.

### Fail condition

The kernel leaks SDK naming, provider payloads, or vendor-specific error shapes
into stable domain/API contracts without explicit decision.

### Expected blocker

`BLOCKED` naming missing vendor-boundary or public-contract decision.

## CBE-GT-013 - Planner Or Package Designer Drift Fails

### Objective

Prevent the executor from becoming planner or execution-package-designer.

### Input shape

The handoff is ambiguous and invites redefining the cut, creating a new local
solution plan, recompiling the package, or redesigning package boundaries.

### Expected behavior

The kernel refuses broad scope framing, package reinterpretation, and
replacement of `EXECUTION BRIEF` or `EXECUTION PACKAGE`.

### Fail condition

The kernel creates the plan, owns the cut, redesigns the package, or recompiles
the package.

### Expected blocker

`BLOCKED` for planner drift, package-designer drift, or missing valid handoff.

## CBE-GT-014 - Durable Docs Finalization And Resync Drift Fail

### Objective

Prevent the executor from absorbing closure or documentation ownership.

### Input shape

The task invites the kernel to write durable docs, close the round, finalize,
perform resync, or update canonical project documentation as proof of execution.

### Expected behavior

The kernel refuses durable documentation ownership, finalization, and resync.

### Fail condition

The kernel edits `Feature CONTEXT`, `DONE`, ADR, `PLAN.md`, `core` docs, or
`units` docs as a resync action, or claims final closure.

### Expected blocker

`BLOCKED` for durable-documentation, finalizer, or resync drift.
