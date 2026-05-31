# Validation Eval Designer Kernel Contracts

Status: `VALIDATION_EVAL_DESIGNER_KERNEL: UNDER_CONSTRUCTION`.

This directory is a documentation-focused, read-only kernel lab for the base
`validation-eval-designer` agent. It does not implement runtime loading,
materialization, target artifact generation, external fixtures, generated
reports, automatic promotion, or productive-skill behavior. Its golden harness
contains embedded negative text fixtures for read-only semantic checks.

## Source Alignment

- productive/base copy origin:
  `templates/agents/validation-eval-designer.agent.md`;
- integrated local dev snapshot and audit point:
  `reference/agents/validation-eval-designer.agent.md`;
- documentary kernel:
  `reference/validation_eval_designer_kernel/**`.

The local snapshot is mandatory after the literal copy. The productive template
is not a fallback reference during review.

## Included Files

Read in this order:

1. `contracts/CONTRACT.md` - identity, authority, statuses, handoffs, reading,
   and anti-role-drift contract.
2. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base agent.
3. `contracts/HARNESS_DECISION_GATES.md` - mandatory proof-strength and harness
   decision boundary.
4. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional proof-design
   bundle.
5. `validation/STATIC_CHECKS.md` - read-only structural harness contract.
6. `validation/GOLDEN_TESTS.md` - semantic scenarios covered by the read-only
   golden harness.
7. `validation/check-static.mjs` - read-only static harness.
8. `validation/check-golden.mjs` - read-only golden harness.

## Scope Limits

This kernel is specific to `validation-eval-designer`, role class
`proof-design`. It is not a family kernel and does not compress semantics with
`planner`, `validation-runner`, or `execution-package-designer`.

This directory does not authorize runtime, materialization, repo-target writes,
productive-skill changes, productive-template changes, a materializer, a
generic kernel, a shared planning layer, or final pass status.
