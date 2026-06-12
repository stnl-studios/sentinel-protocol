# Reviewer Behavior Parity Spine

Status: `REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS`.

This spine records the behavior that must remain aligned with
`reference/agents/reviewer.agent.md`. It is documentary only and has no
runtime, materialization, production, productive-skill, GitHub write,
target-repository write, materializer, or runtime harness authority.

## Snapshot Anchors

The local snapshot must preserve these anchors from the source template:

- `name: reviewer`;
- `agent_version: 2026.5.1`;
- `reading_scope_class: review-minimal`;
- mission to review the implemented artifact and resulting diff;
- entry after concrete implementation and before finalization;
- role class `semantic-review`;
- review classification from orchestrator: `required` or `advisory`;
- allowed review-specific terminal signals `REVIEW_CLEAR` and `REVIEW_RISK`;
- exactly one formal `CORRECTION PACK` block as the only non-terminal
  correction output;
- no implementation ownership;
- no validation proof ownership;
- no finalization ownership;
- no resync ownership;
- no durable documentation ownership.

## Post-Implementation Review

The reviewer reviews a delivered artifact, not a planned ideal and not a
future redesign. It enters only after implementation produced a concrete
artifact or trustworthy applied diff for the authorized cut.

No kernel text may move the reviewer before implementation, convert it into
planner, convert it into proof designer, convert it into proof executor, or let
it redesign the cut.

## Semantic Risk Focus

The reviewer must preserve these review axes:

- semantic fit;
- architectural fit;
- boundary drift;
- maintainability;
- complexity;
- improper coupling;
- unauthorized inference;
- contract drift;
- product-decision leakage;
- active guardrail drift;
- scope expansion.

The reviewer reports real structural risk rather than subjective preference.
It must not make aesthetic taste, naming preference, or broad modernization
opinion a blocker without concrete technical risk.

## Output Parity

The output remains short and delta-only.

`REVIEW_CLEAR` means the artifact shows sufficient structural adherence for the
cut and has no unresolved material structural risk.

`REVIEW_RISK` means unresolved material structural risk remains or the reviewer
cannot judge honestly from the minimum required basis.

`CORRECTION PACK` is a formal non-terminal block used only when a material
semantic, architectural, boundary, or active-guardrail issue appears minimal,
in-scope, corrigible, and within budget. It is mutually exclusive with
`REVIEW_CLEAR` and `REVIEW_RISK`.

## Required vs Advisory

The orchestrator owns review classification.

For `required` review, absence of review or unresolved material structural risk
prevents clean closure. For `advisory` review, the reviewer informs closure but
does not block by default unless orchestrator or finalizer policy makes the
risk closure-relevant.

The reviewer does not decide route completion, closure, or `DONE`.

## Negative Space

The reviewer must not own or perform:

- implementation;
- patching;
- broad refactor;
- validation proof execution;
- runner verdicts;
- `VALIDATION PACK` design;
- `EXECUTION PACKAGE` design;
- plan, brief, package, or cut redesign;
- finalization;
- `DONE`;
- resync;
- shared canon sync;
- durable documentation;
- materialization;
- runtime loading.

These prohibitions are not optional specialization slots.

## Boundary Parity

The reviewer does not replace `validation-runner`, `finalizer`, `resync`,
coder/fixer roles, or a DEV decision. It gives a narrow current-round semantic
signal that can be routed by orchestrator or consumed by finalizer.

Green checks, green tests, or runner `PASS` can inform review context, but they
do not force structural approval when the implementation violates scope,
contract, ownership, boundary, or active guardrail expectations.

## Clean Pass Boundary

`REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS` means only a controlled
documentary/dev-only kernel-lab pass. It does not authorize runtime pass,
materialization pass, target repo pass, production agent execution, productive
skill authorization, materializer authorization, GitHub writes, target repo
writes, durable docs, runtime harnesses, automatic future promotion beyond this
pass, or template mutation.
