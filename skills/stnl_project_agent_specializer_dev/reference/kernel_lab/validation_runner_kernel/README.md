# Validation Runner Kernel

Status: `VALIDATION_RUNNER_KERNEL: CLEAN_EXCELLENT_PASS`.

Documentary promotion applied. This status is a documentary validation pass,
contractual pass, minimum semantic pass, and hardened textual executable
harness pass for the dev kernel lab only. It is `dev kernel lab only`,
`non-runtime`, `non-production`, and has `no materialization path`,
`no runtime loader`, `no materializer`, `no target artifact`,
`no productive skill activation`, and `no template mutation`.

The textual executable harness now exists as
`validation/check-static.mjs` and `validation/check-golden.mjs`. Harness pass
does not create a runtime, materialization, production, global-docs, template,
or productive-skill path, and does not extend `CLEAN_EXCELLENT_PASS` outside
the dev kernel lab.

This directory is the documentary kernel lab bundle for the base
`validation-runner` agent plus its read-only textual harness. It does not
implement runtime loading, materialization, target artifact generation,
fixtures, generated reports, automatic future promotion, or productive-skill
behavior.

## Source Alignment

- productive/base copy origin:
  `templates/agents/validation-runner.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/validation-runner.agent.md`;
- documentary kernel bundle and harness:
  `reference/kernel_lab/validation_runner_kernel/**`.

The local snapshot must remain byte-for-byte equal to the productive template
until a later explicitly authorized phase changes that relationship. This
documentary promotion does not change the template and does not make the
snapshot a runtime, materialization, production, or target artifact source.

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

The documentary kernel preserves post-implementation proof execution only. It
consumes the current-round `VALIDATION PACK`, validates only against concrete
implementation, requires a valid executor `READY` handoff with applied-change
evidence, emits only the terminal verdicts `PASS`, `PARTIAL`, `FAIL`, or
`BLOCKED`, or emits exactly one non-terminal `CORRECTION PACK` block that is
mutually exclusive with terminal verdicts.

This directory does not authorize runtime, materialization, repo-target
writes, global docs updates, productive-skill changes, productive-template
changes, automatic future promotion, status extension outside the dev kernel
lab, a materializer, or a shared production path. It is sem
runtime/materialization/prod for this phase.
