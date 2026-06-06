# Validation Runner Kernel Initial Draft

Status: `VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, is
`dev kernel lab only`, is `non-runtime`, is `non-production`, and has
`no materialization path`.

The textual executable harness now exists as
`validation/check-static.mjs` and `validation/check-golden.mjs`. Harness pass
does not promote the kernel, does not authorize `CLEAN_EXCELLENT_PASS`, and
does not create a runtime, materialization, production, global-docs, template,
or productive-skill path.

This directory is the initial documentary draft for the base
`validation-runner` agent plus its read-only textual harness. It does not
implement runtime loading, materialization, target artifact generation,
fixtures, generated reports, automatic promotion, or productive-skill
behavior.

## Source Alignment

- productive/base copy origin:
  `templates/agents/validation-runner.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/validation-runner.agent.md`;
- documentary kernel draft and harness:
  `reference/validation_runner_kernel/**`.

The local snapshot must remain byte-for-byte equal to the productive template
until a later explicitly authorized phase changes that relationship. This
draft does not change the template and does not make the snapshot a promoted
source.

## Included Files

The 9-file post-harness bundle is read in this order:

1. `README.md` - status, source alignment, bundle, and scope limits.
2. `contracts/CONTRACT.md` - identity, entry, input, output, verdict,
   correction, checklist, reading, and boundary contract.
3. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base `validation-runner`.
4. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional proof-execution
   bundle for the role.
5. `contracts/PROOF_EXECUTION_GATES.md` - entry, evidence, verdict, and
   correction gates for honest post-implementation proof.
6. `validation/STATIC_CHECKS.md` - current textual static harness contract.
7. `validation/GOLDEN_TESTS.md` - current textual golden harness contract.
8. `validation/check-static.mjs` - read-only static harness script.
9. `validation/check-golden.mjs` - read-only golden harness script.

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
writes, global docs updates, productive-skill changes, productive-template
changes, kernel promotion, a materializer, or a shared production path. It is
sem runtime/materialization/prod for this phase.
