# Validation Eval Designer Harness Decision Gates

Status: `VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS`.

This pass is limited to the documentary, contractual, minimum-semantic dev
kernel lab with a hardened executable textual harness.

This file is a mandatory standalone contract. It protects the boundary between
honest proof readiness and a DEV-owned harness decision.

## Core Equation

`teste inexistente != sempre BLOCK`

`teste existente != sempre READY`

An absent test is not an automatic block for every low-risk cut. An existing
test is not proof unless it exercises the changed claim with trustworthy,
observable evidence.

## READY Gate

Emit `READY` only when:

- the valid `EXECUTION BRIEF` supports exact proof obligations;
- every material obligation has a sufficient, proportional, observable path;
- the harness is trustworthy enough for the risk;
- light validation is used only where the risk genuinely permits it;
- manual evidence has a named scenario, state, action, and observable result;
- no important regression is covered only by generic build, lint, smoke, or
  unrelated test success;
- later validation-runner execution will not require guessing.

## NEEDS_DEV_DECISION_HARNESS Gate

Emit `NEEDS_DEV_DECISION_HARNESS` when:

- the changed surface is critical and the harness is absent, fragile,
  misleading, disputed, or environment-blocked;
- automated proof would normally be required but cannot be produced honestly;
- only partial evidence exists and accepting residual risk belongs to DEV;
- speed, cost, environment setup, fixture investment, or test investment
  changes the accepted risk;
- narrowing the cut is the honest route to a provable slice;
- the later validation-runner would inherit ambiguous criteria because proof
  sufficiency cannot be stabilized honestly.

The handoff must name blocked artifact `VALIDATION PACK`, unsatisfied proof
obligation, insufficiency, partial evidence if any, residual risk, and the
minimum DEV decision.

## Anti-Theater Gate

Reject `READY` when evidence is theatrical:

- `npm test` passed but does not touch the changed area;
- lint passed but the changed claim is a business rule;
- build passed but does not cover the expected regression;
- generic smoke is used as proof of behavioral change;
- a manual check lacks an observable criterion;
- a visual snapshot lacks a defined scenario and state;
- an existing test is adjacent but does not prove the modified claim;
- a decorative checklist says "test everything".

## Light Validation Gate

Light validation may be accepted when:

- the cut is genuinely low risk;
- the changed claim is directly observable;
- no structural, contract, security, persistence, business-rule, migration,
  or shared-boundary risk is hidden;
- the chosen evidence can falsify the expected behavior;
- residual risk is visible and proportionate.

The absence of a test does not automatically block such a cut. The kernel still
must record why the lighter path is enough.

## Human Decision Gate

Ask DEV for a narrow decision when proof sufficiency cannot be decided by the
agent. Supported DEV choices are:

- add focused tests for the current cut;
- consciously accept partial evidence with visible residual risk;
- narrow the cut and request a regenerated `EXECUTION BRIEF`.

The kernel must not make a hidden risk-tolerance decision on DEV's behalf.

## Boundary Gate

Harness judgment is proof design only. It must not reopen planning, execute the
validation run, issue a verdict, create a `patch plan`, create a
`prompt final do coder`, or compile an `EXECUTION PACKAGE`.
