# Reviewer Kernel

Status: `REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS`.

This is a documentary/dev-only clean pass for the base `reviewer` agent. It is
not runtime, not production, and has no materialization path, no runtime
loader, no materializer, no target artifact, no productive skill activation,
no GitHub write, no target repo write, and no template mutation. The validation
scripts in `validation/` are dev-only documentation checks, not runtime or
production entry points.

This directory records the clean semantic kernel shape for the
`semantic-review` role. It preserves the reviewer as a post-implementation,
pre-finalizer reviewer of the implemented artifact and resulting diff inside
the authorized cut. It does not prove behavior, implement fixes, close the
round, sync durable documentation, or write shared canon.

## Source Alignment

- productive/base copy origin:
  `templates/agents/reviewer.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/reviewer.agent.md`;
- documentary initial kernel bundle:
  `reference/reviewer_kernel/**`.

The local snapshot must remain byte-for-byte equal to the productive template
until a later explicitly authorized phase changes that relationship. The
productive template is only the copy origin and is not a fallback when the
snapshot is missing.

## Included Files

The current 9-file reviewer-kernel allowlist is read in this order:

1. `README.md` - status, source alignment, bundle, and scope limits.
2. `contracts/CONTRACT.md` - identity, entry, input, output, verdict,
   correction, reading, and boundary contract.
3. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base `reviewer`.
4. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional documentary
   bundle for the role.
5. `contracts/SEMANTIC_REVIEW_GATES.md` - entry, review, verdict, correction,
   and boundary gates for honest semantic review.
6. `validation/STATIC_CHECKS.md` - static validation contract for the dev-only
   harness.
7. `validation/GOLDEN_TESTS.md` - golden validation contract for the dev-only
   harness.
8. `validation/check-static.mjs` - executable static documentation checks and
   reusable forbidden-claim scanners.
9. `validation/check-golden.mjs` - executable golden documentation checks that
   import the static scanner.

No fixture, generated report, runtime loader, materializer, materialization
path, target artifact, productive-skill activation path, GitHub write path, or
target-repository write path is part of this promoted dev-only phase.

## Scope Limits

This kernel is specific to `reviewer`, role class `semantic-review`, reading
scope class `review-minimal`. It is not a generic reviewer, generic opinion
agent, proof executor, finalizer, resync owner, coder, fixer, planner,
execution-package designer, validation-pack designer, or materializer.

The reviewer enters after concrete implementation and before finalization. It
reviews the implemented artifact and resulting diff inside the authorized cut
for semantic risk, architectural risk, boundary drift, maintainability,
complexity, improper coupling, unauthorized inference, contract drift,
product-decision leakage, and scope expansion.

The reviewer emits short delta-only output. It may emit `PASS`, `FAIL`, or
exactly one formal `CORRECTION PACK` block. `CORRECTION PACK` is mutually
exclusive with `PASS` and `FAIL`.

This directory does not authorize runtime, materialization, repo-target writes,
productive-skill changes, productive-template changes, automatic future
promotion beyond this clean pass, status extension outside this dev-only
kernel-lab result, a materializer, a shared production path, or any runtime or
production harness.
