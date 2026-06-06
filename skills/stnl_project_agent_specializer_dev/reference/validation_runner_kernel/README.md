# Validation Runner Kernel Initial Draft

Status: `VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, has
`no executable harness yet`, is `dev kernel lab only`, is `non-runtime`, is
`non-production`, and has `no materialization path`.

This directory is the initial documentary draft for the base
`validation-runner` agent. It does not implement runtime loading,
materialization, target artifact generation, fixtures, generated reports,
automatic promotion, productive-skill behavior, or executable validation
harness files.

## Source Alignment

- productive/base copy origin:
  `templates/agents/validation-runner.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/validation-runner.agent.md`;
- documentary kernel draft:
  `reference/validation_runner_kernel/**`.

The local snapshot must remain byte-for-byte equal to the productive template
until a later authorized phase changes that relationship. This draft does not
change the template and does not make the snapshot a promoted source.

## Included Files

Read in this order:

1. `contracts/CONTRACT.md` - identity, entry, input, output, verdict,
   correction, checklist, reading, and boundary contract.
2. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base `validation-runner`.
3. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional proof-execution
   bundle for the role.
4. `contracts/PROOF_EXECUTION_GATES.md` - entry, evidence, verdict, and
   correction gates for honest post-implementation proof.
5. `validation/STATIC_CHECKS.md` - future static-check design; no `.mjs`
   exists in this phase.
6. `validation/GOLDEN_TESTS.md` - future golden-test design; no `.mjs` exists
   in this phase.

## Scope Limits

This kernel is specific to `validation-runner`, role class
`proof-execution`. It is not a generic validation kernel and does not compress
semantics with `validation-eval-designer`, `execution-package-designer`, any
coder, `reviewer`, `finalizer`, or `orchestrator`.

The draft preserves post-implementation proof execution only. It consumes the
current-round `VALIDATION PACK`, validates only against concrete
implementation, requires a valid executor `READY` handoff with applied-change
evidence, emits only the terminal verdicts `PASS`, `PARTIAL`, `FAIL`, or
`BLOCKED`, or emits exactly one non-terminal `CORRECTION PACK` block that is
mutually exclusive with terminal verdicts.

This directory does not authorize runtime, materialization, repo-target
writes, productive-skill changes, productive-template changes, kernel
promotion, a materializer, or a shared production path.
