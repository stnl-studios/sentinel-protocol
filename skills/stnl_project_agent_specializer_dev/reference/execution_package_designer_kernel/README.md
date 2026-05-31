# Execution Package Designer Kernel Contracts

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`.

This status means the documentary draft and read-only textual harnesses exist
for audit. It is not a `CLEAN_EXCELLENT_PASS`, not a runtime pass, not a
materialization pass, and not authorization for target-repository writes,
productive-skill changes, or a materializer.

This directory is a documentation-focused, read-only kernel lab for the base
`execution-package-designer` agent. It preserves the agent that compiles an
ephemeral `EXECUTION PACKAGE` from the current-round `EXECUTION BRIEF` and
`VALIDATION PACK` so specialist coders can execute bounded work without
re-planning.

## Source Alignment

- productive/base copy origin:
  `templates/agents/execution-package-designer.agent.md`;
- integrated local dev snapshot and audit point:
  `reference/agents/execution-package-designer.agent.md`;
- documentary kernel:
  `reference/execution_package_designer_kernel/**`.

The local snapshot is mandatory after the literal copy. The productive template
is not a fallback reference during review.

## Included Files

Read in this order:

1. `contracts/CONTRACT.md` - identity, authority, statuses, handoffs, reading,
   and anti-role-drift contract.
2. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base agent.
3. `contracts/PACKAGE_READINESS_GATES.md` - mandatory gate set for safe coder
   handoff readiness.
4. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional package-design
   bundle.
5. `validation/STATIC_CHECKS.md` - read-only structural harness contract.
6. `validation/GOLDEN_TESTS.md` - semantic scenarios covered by the read-only
   golden harness.
7. `validation/check-static.mjs` - read-only static harness.
8. `validation/check-golden.mjs` - read-only golden harness.

## Scope Limits

This kernel is specific to `execution-package-designer`, role class
`execution-package-design`. It is not a family kernel, not a generic planning
kernel, and does not compress semantics with `planner`,
`validation-eval-designer`, `orchestrator`, coder agents, or
`validation-runner`.

This directory does not authorize runtime, materialization, repo-target writes,
productive-skill changes, productive-template changes, a materializer, a shared
planning layer, or automatic promotion.
