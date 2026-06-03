# Minimum Safe Bundle

Status: `CLEAN_EXCELLENT_PASS`.

The minimum safe bundle for this clean kernel lab dev pass is intentionally
small and allowlist-bound.

## Required Files

- `reference/agents/designer.agent.md`;
- `reference/designer_kernel/README.md`;
- `reference/designer_kernel/contracts/CONTRACT.md`;
- `reference/designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/designer_kernel/contracts/DESIGN_CONTRIBUTION_GATES.md`;
- `reference/designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/designer_kernel/validation/STATIC_CHECKS.md`;
- `reference/designer_kernel/validation/GOLDEN_TESTS.md`;
- `reference/designer_kernel/validation/check-static.mjs`;
- `reference/designer_kernel/validation/check-golden.mjs`.

No other designer kernel files are required for this draft.

## Snapshot Requirement

`reference/agents/designer.agent.md` must match
`templates/agents/designer.agent.md` byte-for-byte.

## Required Documentary Coverage

The bundle must explicitly preserve:

- optional per round;
- real UX impact;
- design-contributor;
- targeted-local;
- required vs advisory decided by orchestrator;
- `READY` difficult;
- `BLOCKED` honest;
- no durable docs;
- no `VALIDATION PACK` ownership;
- no `EXECUTION PACKAGE` ownership;
- no implementation;
- no validation running;
- no resync/finalization.

## Pass Boundary

The bundle may claim `CLEAN_EXCELLENT_PASS` only as a kernel lab dev
documentary, contractual, minimum semantic, hardened executable textual harness
pass with final human audit authorization.

The bundle must not authorize runtime pass, materialization pass, target repo
pass, production agent execution, productive skill authorization, materializer
authorization, GitHub writes, target repo writes, implementation, validation
running, durable docs, `VALIDATION PACK` ownership, `EXECUTION PACKAGE`
ownership, or resync/finalization.

## Ignore Rules

Validation must ignore `__MACOSX` and `.DS_Store`.
