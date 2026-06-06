# Validation Runner Behavior Parity Spine

Status: `VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, is
`dev kernel lab only`, is `non-runtime`, is `non-production`, and has
`no materialization path`.

The textual executable harness now exists for this dev kernel lab draft.
Harness pass does not promote the kernel and does not authorize runtime,
materialization, production, global docs updates, productive-skill changes, or
template changes.

This spine records the irreducible behavior that the initial documentary draft
must preserve from `templates/agents/validation-runner.agent.md`.

## Non-Reducible Semantics

The non-reducible semantics are:

- role class `proof-execution`;
- post-implementation entry only;
- strict consumption of the current-round `VALIDATION PACK`;
- validation only against concrete implementation;
- mandatory valid executor `READY` with applied-change evidence;
- terminal verdict set limited to `PASS`, `PARTIAL`, `FAIL`, and `BLOCKED`;
- `CORRECTION PACK` as a formal non-terminal block;
- correction exclusivity between `CORRECTION PACK` and every terminal verdict;
- compact `QA CHECKLIST UPDATE` handoff data without editing checklists;
- `FAIL` as disproven behavior or contract;
- `BLOCKED` as infeasible, absent, invalid, or prevented proof;
- `PASS` only when critical obligations are directly proved;
- irrelevant green output as non-proof;
- `minimal-verification` reading.

## Required Entry Behavior

The runner starts from proof obligations already designed upstream. It may not
enter on a plan, promise, partial narration, pseudo-implementation, invalid
executor handoff, or generic command log.

The runner validates the actual implemented artifact. If no concrete artifact
exists, or if executor `READY` lacks applied-change evidence, the runner cannot
honestly validate and must preserve the handoff problem.

## Required Evidence Behavior

For each obligation, the runner must classify the result from direct evidence:

- proved;
- partially proved;
- failed;
- blocked;
- not applicable when the pack explicitly makes it so.

Evidence may be automated, manual, or hybrid, but must be current-round,
observable, and tied to the pack obligation. Inference can be recorded as
inference but cannot become proof.

## Required Verdict Behavior

Verdict strength must match evidence strength.

`PASS` is allowed only when the required obligations, especially critical
behavior, contract, state, UX, or guardrail obligations, have direct proof.

`PARTIAL` is allowed only when the proved portion and the residual gap are both
explicit and bounded.

`FAIL` is required when evidence disproves the behavior or contract being
validated.

`BLOCKED` is required when proof cannot be executed, obtained, trusted, or
interpreted honestly.

## Required Correction Behavior

When an in-scope corrigible issue should go back through the correction loop
and budget remains, the runner emits exactly one formal `CORRECTION PACK`
block to `orchestrator` instead of a terminal verdict.

The block must carry objective evidence and a concrete expected correction. It
must not become architecture review, replanning, broad refactor request, or a
replacement for coder ownership.

## Required Boundary Behavior

Role boundaries must stay explicit:

- `validation-eval-designer` owns proof design and `VALIDATION PACK`;
- `execution-package-designer` owns `EXECUTION PACKAGE`;
- coders own implementation and correction execution;
- `reviewer` owns semantic review when routed;
- finalizer boundary: `finalizer` owns durable closure and checklist
  reconciliation;
- reviewer boundary: `reviewer` owns semantic review, not proof execution;
- validation-eval-designer boundary: `validation-eval-designer` owns proof
  design, not proof execution;
- `orchestrator` owns routing, gates, and correction-loop decisions.

The runner does not promote this kernel, produce runtime artifacts, create a
materialization path, or update global documentation in this phase. Boundary
status is sem runtime, sem materialization, and sem global docs update.
