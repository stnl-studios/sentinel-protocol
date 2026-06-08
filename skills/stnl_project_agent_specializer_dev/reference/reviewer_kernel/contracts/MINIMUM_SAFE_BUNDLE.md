# Reviewer Minimum Safe Bundle

Status: `REVIEWER_KERNEL: INITIAL_DRAFT`.

This is the smallest non-optional documentary bundle that keeps `reviewer`
acting as semantic reviewer in this initial draft. It is not a runtime bundle,
materializer, fixture set, generated report, production skill path, runtime
harness, or production harness. The validation scripts in `validation/` are
dev-only documentation checks.

## Mandatory Source Chain

- productive/base copy origin:
  `templates/agents/reviewer.agent.md`;
- local dev snapshot:
  `reference/agents/reviewer.agent.md`;
- kernel contracts:
  `reference/reviewer_kernel/**`.

The local snapshot is the audit point. The productive template is only the copy
origin and is not a fallback when the snapshot is missing.

## Mandatory Files

The minimum safe draft bundle requires:

1. `README.md` for status, source alignment, bundle, and scope limits.
2. `CONTRACT.md` for identity, authority, inputs, outputs, verdicts,
   correction, reading, and role boundaries.
3. `BEHAVIOR_PARITY_SPINE.md` for irreducible base-agent behavior.
4. `SEMANTIC_REVIEW_GATES.md` for entry, review, verdict, correction, and
   boundary gates.
5. `MINIMUM_SAFE_BUNDLE.md` for this non-optional file set.
6. `STATIC_CHECKS.md` for static validation expectations.
7. `GOLDEN_TESTS.md` for golden validation expectations.
8. `check-static.mjs` for executable dev-only static documentation checks and
   reusable forbidden-claim scanners.
9. `check-golden.mjs` for executable dev-only golden documentation checks that
   import the static scanner.

No unexpected `.js`, `.cjs`, executable fixture, generated report, runtime
loader, materializer, materialization path, target artifact, productive-skill
activation path, GitHub write path, target-repository write path, or global
integration file belongs to this draft phase.

## Mandatory Semantic Floor

A safe reviewer draft must preserve:

- `reviewer` identity;
- `semantic-review` role class;
- `review-minimal` reading;
- entry after concrete implementation and before finalizer;
- review target of implemented artifact and resulting diff;
- current-round authorized-cut boundary;
- material risk review axes: semantic risk, architectural risk, boundary drift,
  maintainability, complexity, improper coupling, unauthorized inference,
  contract drift, product-decision leakage, and scope expansion;
- no behavior proof;
- no implementation;
- no correction execution;
- no refactor;
- no plan, brief, package, or cut redesign;
- no durable documentation;
- no finalization;
- no resync;
- short delta-only output;
- `PASS`, `FAIL`, or exactly one formal `CORRECTION PACK`;
- mutual exclusion between `CORRECTION PACK` and terminal verdicts.

## Mandatory Negative Space

This bundle is unsafe if it:

- permits reviewer to execute validation in place of `validation-runner`;
- permits green tests to become automatic structural approval;
- permits reviewer to decide `DONE`;
- permits reviewer to write shared canon or sync docs;
- permits reviewer to edit code or apply patches;
- permits broad patch packs, broad refactors, or architecture redesign as
  correction output;
- permits repo-wide review or broad discovery by default;
- permits subjective preference as a blocker without concrete technical risk;
- treats `INITIAL_DRAFT` as `CLEAN_EXCELLENT_PASS`;
- creates runtime harnesses, production harnesses, fixtures, generated reports,
  runtime loading, materializer paths, target artifacts, global docs updates,
  template changes, productive-skill changes, GitHub writes, or target repo
  writes.

## Minimum Validation Story

At this phase, validation is dev-only and documentation-scoped.
`STATIC_CHECKS.md` and `GOLDEN_TESTS.md` describe the checks and scenario
coverage executed by `check-static.mjs` and `check-golden.mjs`. Those scripts
do not promote the kernel and do not authorize runtime, materialization,
production, productive-skill changes, GitHub writes, or target repo writes.
