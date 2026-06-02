# Designer Kernel

Status: `DRAFT_INITIAL_DESIGNER_KERNEL`.

This is the controlled initial draft for the documentary designer kernel. It is
not a promotion pass, not a runtime pass, not a materialization pass, and not a
productive-skill change.

The kernel preserves the irreducible designer mission: produce practical UX
direction for the current round when there is real UX impact, while remaining an
optional, targeted-local, design-contributor role.

## Scope

This bundle is limited to:

- the local dev snapshot at `reference/agents/designer.agent.md`;
- documentary contracts under `reference/designer_kernel/contracts/`;
- textual validation documentation and harnesses under
  `reference/designer_kernel/validation/`.

It does not alter frozen kernels, productive skill behavior, target repositories,
GitHub state, durable project documentation, materialization output, or global
kernel status.

## Core Invariants

- optional per round;
- enters only for real UX impact;
- role class: `design-contributor`;
- reading scope class: `targeted-local`;
- required vs advisory is decided by orchestrator for the current round;
- `READY` is deliberately difficult;
- `BLOCKED` is honest and narrow;
- no durable docs;
- no `VALIDATION PACK` ownership;
- no `EXECUTION PACKAGE` ownership;
- no implementation;
- no validation running;
- no resync/finalization.

## Bundle

- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/DESIGN_CONTRIBUTION_GATES.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`;
- `validation/check-static.mjs`;
- `validation/check-golden.mjs`.

## Current Limitation

This draft is intentionally not a final quality status. Passing the checks means
only that the initial documentary bundle preserves the required design role
shape well enough for the next audit round.
