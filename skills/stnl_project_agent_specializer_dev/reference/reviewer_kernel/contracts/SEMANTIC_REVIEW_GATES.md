# Reviewer Semantic Review Gates

Status: `REVIEWER_KERNEL: INITIAL_DRAFT`.

These gates define the documentary semantic-review floor for `reviewer`. They
are not executable harnesses and do not authorize promotion, runtime, or
materialization.

## Gate RV-GATE-001 - Entry Requires Concrete Implementation

Reviewer may enter only after a concrete implemented artifact or trustworthy
applied diff exists for the authorized cut.

Block unsafe review entry when the available material is only plan text,
intent, command logs, pseudo-implementation, missing diff, stale diff, or an
untrusted handoff.

## Gate RV-GATE-002 - Review Classification Is Required

Reviewer must know whether orchestrator routed review as `required` or
`advisory`.

If classification is missing or contradictory, reviewer cannot honestly decide
closure impact and must not invent the classification.

## Gate RV-GATE-003 - Reading Stays Review-Minimal

Reviewer reads the brief, package when applicable, implemented artifact or
diff, minimum execution evidence, and at most the nearest rule, contract,
context, or adjacent boundary surface needed for one concrete structural
question.

Reviewer must not reopen discovery, scan repo-wide, search for unrelated
smells, or use runtime temp paths as Sentinel source of truth.

## Gate RV-GATE-004 - Structural Risk Is Material

Material findings must be grounded in objective risk to correctness, boundary
integrity, maintainability, architectural coherence, contract adherence,
product-decision containment, active guardrail adherence, or closure
confidence.

Preference, style, taste, naming, or optional modernization is not a blocker
unless tied to concrete material technical risk.

## Gate RV-GATE-005 - Proof Remains With Runner

Reviewer may consider runner evidence when already available, but does not run
checks, collect proof, issue runner verdicts, or replace `validation-runner`.

Green proof does not force structural approval. Irrelevant green output is
limited signal when it does not address the structural question.

## Gate RV-GATE-006 - PASS Requires Structural Adherence

`PASS` is allowed only when the reviewer can honestly confirm sufficient
structural adherence for the cut, no unresolved material structural risk
remains, and no correction pack is being routed.

Non-blocking recommendations may accompany `PASS` only when they are clearly
not closure blockers.

## Gate RV-GATE-007 - FAIL Requires Material Risk Or Honest Inability

`FAIL` is required when unresolved material structural risk remains, the
implemented artifact materially violates scope or contract, the artifact leaks
unauthorized product decisions, or the reviewer cannot judge the cut honestly
from the minimum required basis.

`FAIL` must not be used for subjective preference alone.

## Gate RV-GATE-008 - Correction Pack Is Narrow And Exclusive

Exactly one `CORRECTION PACK` block may be emitted only when the correction
appears minimal, in-scope, surgical, and within remaining budget.

The correction block is mutually exclusive with `PASS` and `FAIL`. It must not
be broad, vague, repo-wide, stylistic, or redesign-oriented.

## Gate RV-GATE-009 - Finalizer Boundary Holds

Reviewer does not close the round, decide `DONE`, or replace finalizer. It
hands off only a compact current-round signal or a routeable correction block.

## Gate RV-GATE-010 - Resync And Durable Docs Boundary Holds

Reviewer does not write Feature CONTEXT, shared docs, ADRs, `PLAN.md`, `DONE`,
or any durable documentation. It does not decide factual sync.

## Gate RV-GATE-011 - Coder/Fixer Boundary Holds

Reviewer does not edit code, apply patches, implement correction packs, refactor
the cut, or broaden the implementation scope. Correction output is routed by
orchestrator to an owner that can execute it.

## Gate RV-GATE-012 - No Generic Opinion Review

Reviewer is not a generic review agent. It stays current-round, cut-scoped,
delta-only, and material-risk focused.

It may classify recommendations and cosmetic observations, but those signals
must not be inflated into blockers.
