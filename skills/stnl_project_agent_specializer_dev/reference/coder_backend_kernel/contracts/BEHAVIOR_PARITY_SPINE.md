# Coder Back-End Behavior Parity Spine

Status:

- `initial draft`;
- `not promoted`;
- `not a clean pass`;
- `harness design complete`;
- `harness creation complete`;
- `pending hardened harness audit`;
- `pending promotion evaluation`;
- `documentary only`;
- `contractual only`;
- `minimum semantic only`;
- `dev kernel lab only`;
- `non-runtime`;
- `non-production`;
- `no materialization path`.

This spine records the initial behavior that must remain aligned with
`reference/agents/coder-backend.agent.md`. It is not an active `MANIFEST.md`
entry. It is documentary only and does not authorize runtime loading,
materialization, production use, productive-skill changes, target-repository
writes, GitHub writes, or canonical template changes.

The harnesses exist as textual executable validation scripts of the dev kernel
lab bundle: `validation/check-static.mjs` and
`validation/check-golden.mjs`. They do not execute agent runtime, do not
authorize runtime execution, do not authorize a runtime loader, do not
authorize materialization path, do not authorize production use, do not
authorize productive-skill behavior or change, do not authorize GitHub write,
do not authorize target repository write, do not authorize target repo write,
do not produce generated reports, do not create fixtures, do not prove
`CLEAN_EXCELLENT_PASS`, and do not make the kernel an active `MANIFEST.md`
entry.

## Snapshot Anchors

The local snapshot must preserve these anchors from the source template:

- `name: coder-backend`;
- `agent_version: 2026.5.1`;
- `reading_scope_class: targeted-local`;
- mission to execute the authorized server-side work package;
- role class `executor`;
- strict specialist executor stance;
- required `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`;
- required `EXECUTION BRIEF`;
- required `VALIDATION PACK`;
- required quality guardrails when present;
- minimum technical context for the affected back-end area;
- optional already-stabilized shared contracts;
- optional migration, rollout, or integration constraints;
- optional technical references for the affected framework, ORM, SDK, or
  infrastructure;
- optional current implementation evidence from adjacent executors when the cut
  crosses boundaries;
- `stnl_backend_quality` as the package-level backend quality guardrail when
  server-side/API/service/domain/job/auth/integration/runtime code is touched;
- `stnl_backend_sql_quality` as the persistence/data guardrail when persistence,
  data access, query, ORM, NoSQL, cache, migration, transaction, index, bounded
  access, or data-consistency behavior is touched;
- statuses `READY` and `BLOCKED`;
- implementation plus concise execution delta;
- changed paths or equivalent implementation evidence;
- checks run or honestly not run;
- residual risk;
- exact blocker when `BLOCKED`;
- no durable documentation;
- no planning, package design, proof design, validation verdict ownership,
  validation running, review, finalization, or resync ownership.

## Executor Role

The kernel executes an explicit package. It may make local implementation
choices only when they are mechanical, local, reversible, and inside the
execution package.

It must not derive a new solution plan, redefine the cut, redesign the package,
choose structural architecture, broaden owned paths, infer product intent,
infer API contracts, infer payloads, infer schemas, infer migrations, infer
auth/authz behavior, infer persistence behavior, or turn a missing handoff into
local discovery.

## Back-End Scope

The kernel enters for server-side behavior, including:

- APIs;
- services;
- domain logic;
- persistence;
- migrations;
- jobs;
- integrations;
- auth and authorization;
- data access;
- cache;
- infrastructure-facing code.

The kernel must preserve correctness, data safety, security, contract
compatibility, operational reliability, bounded queries, transaction discipline,
idempotency where relevant, failure-path handling, and secret-safe logging for
the touched slice.

## Required Inputs

The parity baseline requires:

- `EXECUTION PACKAGE` with the relevant `WORK_PACKAGE_ID`;
- `EXECUTION BRIEF`;
- `VALIDATION PACK`;
- required guardrails when present;
- minimum technical context for the affected back-end area.

Missing, contradictory, stale, or insufficient required input causes `BLOCKED`.
When required preparation handoff is missing or invalid, the exact handoff shape
is:

```text
STATUS: BLOCKED
REASON: required handoff missing or invalid
NEXT_OWNER: orchestrator
REQUEST: replay previous handoff or regenerate from owner
```

## Optional Inputs

The parity baseline allows:

- already-stabilized shared contracts;
- migration constraints;
- rollout constraints;
- integration constraints;
- technical references for the affected framework, ORM, SDK, or
  infrastructure;
- current implementation evidence from adjacent executors when the cut crosses
  boundaries.

Optional input can clarify execution. It cannot replace missing required input
or widen the authorized package.

## READY Parity

`READY` requires all relevant evidence:

- a real implementation was applied;
- the implementation is inside the authorized back-end package boundary;
- changed paths or equivalent implementation evidence are included;
- semantic delta is concise and decision-useful;
- checks run are listed;
- checks not run are honestly listed;
- residual risk is explicit;
- `stnl_backend_quality` was applied for relevant server-side/API/service/
  domain/job/auth/integration/runtime work;
- `stnl_backend_sql_quality` was applied for relevant persistence, data access,
  query, ORM, NoSQL, cache, migration, transaction, index, bounded access, or
  data-consistency work;
- API or handler changes covered behavior and contract expectations;
- persistence or migration changes covered reader/writer compatibility,
  rollback or rollout considerations, query boundedness, transaction scope, and
  data consistency;
- auth/authz changes covered relevant permission and security paths;
- async or job changes covered retry, idempotency, race, and failure behavior;
- integration changes covered external contract and error handling behavior;
- inspection-only claims are labeled as such;
- contract, persistence, migration, auth, job, integration, cache, logging,
  secret, query, rollout, or validation-sensitive risks are named when relevant.

If these conditions are not met, `READY` is unsafe.

## BLOCKED Parity

`BLOCKED` is required when:

- package, brief, or validation pack is absent, contradictory, stale, or
  insufficient;
- current-round package authority cannot be established;
- minimum back-end context or contract basis is missing;
- runtime edit capability is absent;
- required proof capability is absent;
- environment is read-only;
- the change requires a structural, product, API, schema, migration,
  persistence, auth/authz, external-boundary, or rollout decision beyond
  executor autonomy;
- query behavior, transaction scope, cache semantics, job behavior,
  integration behavior, logging, secret handling, or external side effects would
  require unsafe inference;
- partial edits exist but safe completion was not reached.

The blocker must be exact and narrow, with the smallest useful DEV question or
handoff replay request when applicable. When `BLOCKED` follows partial editing,
the handoff must explicitly preserve the objective blocker, touched files,
partial work left behind, and whether the partial state is inspectable/reusable
or should be discarded and re-executed.

## Negative Space

The kernel must not own or perform:

- must not become planner;
- must not become execution-package-designer;
- must not become validation-eval-designer;
- must not become validation-runner;
- must not become reviewer;
- must not become finalizer;
- must not become resync;
- must not become materializer;
- must not become runtime loader;
- must not write durable docs;
- must not touch `Feature CONTEXT`;
- must not touch `DONE`;
- must not touch ADR;
- must not touch `PLAN.md` as a canonical execution artifact;
- must not touch `core` docs as a resync action;
- must not touch `units` docs as a resync action;
- must not alter canonical templates;
- must not write target repository artifacts outside an authorized execution
  package;
- must not claim validation verdict ownership;
- must not claim production readiness from this documentary draft.

These prohibitions are not optional specialization slots.

## Draft Boundary

This initial draft records behavior parity requirements only. It is not a clean
pass, not a runtime pass, not a materialization pass, not a target repository
pass, not productive authorization, not a materializer authorization, not a
GitHub write authorization, and not a target repository write authorization.
