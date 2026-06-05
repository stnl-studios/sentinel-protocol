# Back-End Execution Gates

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

These gates define promoted documentary checks for the `coder-backend` kernel.
They are not an active `MANIFEST.md` entry, not a runtime implementation, not a
runtime validation harness, not a materialization path, not a production path,
and not productive-skill behavior.

The harnesses exist as textual executable validation scripts of the dev kernel
lab bundle: `validation/check-static.mjs` and
`validation/check-golden.mjs`. They do not execute agent runtime, do not
authorize runtime execution, do not authorize a runtime loader, do not
authorize materialization path, do not authorize production use, do not
authorize productive-skill behavior or change, do not authorize GitHub write,
do not authorize target repository write, do not authorize target repo write,
do not produce generated reports, do not create fixtures, do not authorize
target artifacts, do not authorize active runtime adoption, do not authorize
canonical template changes, prove only documentary/dev kernel lab
`CLEAN_EXCELLENT_PASS`, and do not make the kernel an active `MANIFEST.md`
entry.

## Package Authority Gate

Pass only when the current round provides an `EXECUTION PACKAGE` with the
assigned `WORK_PACKAGE_ID`, plus `EXECUTION BRIEF` and `VALIDATION PACK`.

The package must define enough executable boundary to apply the back-end cut,
including owned paths or equivalent edit authority, change rules, checks, and
block conditions when relevant.

Fail when the package, brief, or pack is missing, contradictory, stale,
insufficient, not current-round authorized, or would require reconstruction from
temporary runtime files.

## API And Schema Contract Drift Gate

Pass when request and response contracts, public API behavior, schemas, shared
types, event payloads, database shape, migrations, and downstream consumers are
understood enough to preserve stabilized contracts or apply only explicitly
authorized changes.

Fail when implementation would invent payloads, infer schema changes, silently
break compatibility, change public behavior without authorization, or hide API/
schema contract drift inside a local implementation detail.

## Auth And Authorization Gate

Pass when authentication, authorization, tenant/user scoping, permission checks,
resource ownership, audit implications, and failure behavior touched by the cut
are explicit in the package or clearly preserved by local contracts.

Fail when the change could alter access control, privilege boundaries, error
visibility, account isolation, or security behavior without a safe basis.

## Persistence Gate

Pass when repositories, models, storage APIs, data invariants, read/write paths,
consistency assumptions, indexes, and data lifecycle implications are understood
for the touched persistence slice.

Fail when safe completion would require inventing persistence behavior, changing
data invariants, widening data access, or relying on unbounded reads.

## Migration Gate

Pass when schema or data migration work has explicit basis for compatibility,
reversibility or rollback posture, lock risk, idempotency, backfill needs,
deployment ordering, and reader/writer compatibility.

Fail when a migration, schema change, destructive data operation, backfill,
rollout sequence, or irreversible change is required but not authorized.

## Transaction Gate

Pass when transaction boundaries, lock duration, isolation expectations, retry
behavior, side effects, and failure paths are explicit or safely preserved by
existing local patterns.

Fail when the implementation would put unsafe external side effects inside
transactions, extend transaction scope without basis, rely on ambiguous locking,
or hide partial failure risk.

## Jobs And Async Gate

Pass when jobs, queues, scheduled work, background tasks, retries, idempotency,
ordering, concurrency, deduplication, timeout behavior, and partial failure
paths touched by the cut are understood and covered.

Fail when async behavior or job execution semantics would need executor
invention, unapproved retry changes, unsafe non-idempotent work, or unclear
failure recovery.

## Integration Gate

Pass when external service contracts, SDK behavior, webhooks, API clients,
network failure modes, rate limits, retries, idempotency keys, timeout behavior,
and external data mapping are explicit enough to preserve integration safety.

Fail when integration behavior, external boundary changes, vendor-specific
behavior, or third-party contract assumptions would be inferred without package
authority.

## Logs And Secrets Gate

Pass when logging, metrics, tracing, audit output, errors, and diagnostics
preserve useful evidence without exposing credentials, tokens, secrets, personal
data, sensitive payloads, or authorization details.

Fail when a change could leak secrets, increase sensitive log exposure, suppress
necessary failure evidence, or make security-sensitive errors ambiguous.

## Bounded Queries Gate

Pass when queries, scans, pagination, filters, limits, joins, eager loading,
N+1 risks, indexes, and access scope are bounded and compatible with production
data size.

Fail when the cut would introduce unbounded access, broad scans, accidental
cross-tenant reads, fragile sorting/pagination, or query behavior that cannot be
validated from the package and local anchors.

## Cache Gate

Pass when cache keys, invalidation, TTLs, consistency expectations, stale reads,
permission scope, stampede behavior, and fallback behavior touched by the cut
are explicit or safely preserved.

Fail when cache semantics would require unsafe inference, expose data across
scopes, hide contract drift, or make persistence behavior inconsistent.

## Rollout And Backfill Gate

Pass when rollout, feature gates, compatibility windows, backfills, migration
ordering, operational runbooks, and fallback posture are explicit when
applicable.

Fail when production-sensitive rollout or backfill sequencing is needed but the
package does not authorize or define it.

## External Side Effects Inside Transactions Gate

Pass when external effects such as network calls, message publishing, email,
payments, webhooks, cache mutation, or job enqueueing are outside unsafe
transaction scopes or are explicitly safe, idempotent, and failure-aware.

Fail when side effects occur inside transactions without a clear safety basis,
could happen before rollback, could be duplicated on retry, or could produce an
irreversible external state mismatch.

## Vendor Leakage Boundary Gate

Pass when vendor-specific implementation details remain behind appropriate
boundaries and do not leak into domain language, public API contracts, stable
schemas, or cross-service integration surfaces unless explicitly authorized.

This is a safety refinement derived from boundaries, public contracts, external
integration concerns, and back-end guardrails. It is not asserted as a literal
phrase from the source template.

Fail when SDK naming, provider-specific error shapes, vendor payloads, or
third-party operational details become public domain/API behavior without an
explicit contract decision.

## Back-End Quality Guardrail Gate

Pass when `stnl_backend_quality` is applied as the binding structural guardrail
for packages touching server-side/API/service/domain/job/auth/integration/
runtime code.

Fail when safe completion would require violating `stnl_backend_quality`,
editing or restating the skill content, calling unrelated guardrails by reflex,
or expanding scope beyond the authorized package.

## Back-End SQL And Data Guardrail Gate

Pass when `stnl_backend_sql_quality` is applied as the binding structural
guardrail for packages touching persistence, data access, query, ORM, NoSQL,
cache, migration, transaction, index, bounded access, or data-consistency
behavior.

Fail when safe completion would require violating `stnl_backend_sql_quality`,
weakening query safety, ignoring transaction or migration risk, or expanding
scope beyond the authorized package.

## Evidence And Checks Handoff Gate

Pass when the final handoff includes:

- terminal status `READY` or `BLOCKED`;
- changed paths or equivalent implementation evidence;
- concise semantic delta;
- checks run;
- checks not run and why;
- residual risk;
- inspection-only confidence clearly labeled;
- exact blocker when `BLOCKED`;
- validation-runner notes for contract, auth/authz, persistence, migration,
  transaction, job, integration, log/secret, bounded-query, cache,
  rollout/backfill, external-side-effect, vendor-leakage, or proof-sensitive
  risks.

The handoff must show relevant validation by change type: API or handler
contract behavior for API changes, persistence and migration safety for schema
or repository changes, authorization paths for auth changes, retry/idempotency
or failure-path behavior for async/job changes, and integration boundaries for
external system changes.

When required preparation handoff is missing or invalid, pass only if the
handoff shape is exactly:

```text
STATUS: BLOCKED
REASON: required handoff missing or invalid
NEXT_OWNER: orchestrator
REQUEST: replay previous handoff or regenerate from owner
```

Fail when the response is only progress narration, command logs, an implicit
status, a partial diff without safe completion, a validation verdict of record,
or a completion claim without implementation evidence.

## Drift Gates

Reject any kernel behavior that attempts to:

- become planner;
- become validation-eval-designer;
- become execution-package-designer;
- become validation-runner;
- become reviewer;
- become finalizer;
- become resync;
- perform durable documentation ownership;
- touch `Feature CONTEXT`;
- touch `DONE`;
- touch ADR;
- touch `PLAN.md` as a canonical execution artifact;
- touch `core` docs as a resync action;
- touch `units` docs as a resync action;
- alter canonical templates;
- write target repository artifacts from this documentary pass;
- introduce runtime loading;
- introduce materialization;
- claim production use;
- claim runtime, materialization, production, or target repository pass beyond
  the documentary/dev kernel lab `CLEAN_EXCELLENT_PASS` boundary.
