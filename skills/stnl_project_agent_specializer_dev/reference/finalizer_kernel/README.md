# Finalizer Kernel

Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.

This is a documentary/dev-only clean pass for the base `finalizer` agent. It is
not runtime, not production, and has no materialization path, no runtime loader,
no materializer, no target artifact, no generated report, no fixture, no
productive skill activation, no GitHub write, no target repo write, no template
mutation, and no snapshot mutation beyond the literal dev snapshot authorized
for this kernel lab round. The validation scripts in `validation/` are dev-only
documentation checks, not runtime or production entry points.

This directory records the clean semantic kernel shape for the `closure` role.
It preserves the finalizer as the owner of round consolidation after execution
and validation, after reviewer input when review was routed, or after an
explicit execution-stage blockage before validation could honestly run. It does
not implement, fix, run validation, substitute review, plan, re-cut scope, or
execute resync.

## Source Alignment

- productive/base copy origin:
  `templates/agents/finalizer.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/finalizer.agent.md`;
- documentary finalizer kernel bundle:
  `reference/finalizer_kernel/**`.

The local snapshot must remain byte-for-byte equal to the productive template
until a later explicitly authorized phase changes that relationship. The
productive template is only the copy origin and is not a fallback when the
snapshot is missing.

## Included Files

The current 9-file finalizer-kernel allowlist is read in this order:

1. `README.md` - status, source alignment, bundle, role, and scope limits.
2. `contracts/CONTRACT.md` - identity, mission, entry, input, evidence, output,
   status, DONE, resync, slice, QA, residual, boundary, and reading contracts.
3. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base `finalizer`.
4. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional documentary
   bundle for the role.
5. `contracts/CLOSURE_GATES.md` - closure gates for honest finalization.
6. `validation/STATIC_CHECKS.md` - static validation contract for the dev-only
   harness.
7. `validation/GOLDEN_TESTS.md` - golden validation contract for the dev-only
   harness.
8. `validation/check-static.mjs` - executable static documentation checks and
   reusable forbidden-claim scanners.
9. `validation/check-golden.mjs` - executable golden documentation checks that
   run the static harness as preflight.

No fixture, generated report, runtime loader, materializer, materialization
path, target artifact, productive-skill activation path, GitHub write path, or
target-repository write path is part of this promoted dev-only phase.

## Scope Limits

This kernel is specific to `finalizer`, role class `closure`, reading scope
class `minimal-verification`. It is not an executor, proof runner, semantic
reviewer, planner, proof designer, execution-package designer, resync executor,
runtime loader, materializer, target writer, or productive skill path.

The finalizer enters after `validation-runner.agent.md`, and after
`reviewer.agent.md` when review was routed for the round. It may enter directly
from the orchestrator only when execution blocked before validation could
honestly run. Its job is consolidation: preserve the runner-owned verdict when
it exists, preserve execution-stage blockage when the runner never entered,
preserve reviewer signal when present, preserve residual correction pack
evidence when present, update the minimum honest `Feature CONTEXT`, decide
`DONE: yes/no`, decide `resync: yes/no`, record the closure ledger, reconcile
`qa_checklist.md` only from runner-backed evidence or report a process gap, and
produce the post-slice closure record when slice-scoped.

The finalizer may emit only `READY` or `BLOCKED`. Those are finalization
statuses, not validation verdicts. `READY` means closure was honestly
consolidated; it is not runner `PASS`. `PASS`, `PARTIAL`, `FAIL`, and
validation-owned `BLOCKED` belong to `validation-runner.agent.md` and are
consumed as preserved inputs, not reissued as finalizer statuses.

This directory does not authorize runtime, materialization, production,
repo-target writes, GitHub writes, generated reports, fixtures, target
artifacts, active runtime adoption, productive-skill changes, productive
template changes, snapshot mutation, automatic future promotion beyond this
clean pass, status extension outside this dev-only kernel-lab result, a
materializer, a shared production path, or any runtime or production harness.
