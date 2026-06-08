# Reviewer Kernel Golden Tests

Status: dev-only executable golden-test contract for
`REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS`.

This file documents the current dev-only golden validation harness for the
reviewer clean pass. `validation/check-golden.mjs` is part of the reviewer-kernel
allowlist and executes scenario, mutation, and scoped-scanner checks for this
document. These golden tests do not authorize runtime, materialization,
production, global docs updates, productive-skill changes, template changes,
GitHub writes, target-repository writes, generated reports, fixtures, or
automatic future promotion beyond this clean pass.

`check-golden.mjs` imports `findForbiddenClaims` and
`findForbiddenClaimsInGoldenTestsDoc` from `check-static.mjs`. Both scripts use
import guards so importing them for scanner reuse does not execute their main
check routine.

The harness is textual and heuristic. It validates structured Markdown and
semantic forbidden-claim families, but it does not claim complete NLP coverage.

## Harness Coverage

The document contains exactly 10 golden scenarios: `RV-GT-001` through
`RV-GT-010`.

Each scenario must contain these sections:

1. `Objective`
2. `Input shape`
3. `Expected behavior`
4. `Fail condition`
5. `Expected blocker`

The scenario checks verify required blocker IDs and expected text patterns for
each scenario. Mutation checks verify that forbidden affirmative claims return
structured matches with:

- `blocker`;
- `family`;
- `claimName`;
- `excerpt`.

Current mutation and scanner counts are fixed:

- `negativeMutations.length === 150`;
- `generalizedMutations.length === 60`;
- `allNegativeMutations.length === 210`;
- `contextualHeadingMutations.length === 7`;
- `normativeCases.length === 20`;
- `validNegativeExamples.length === 9`;
- `incompleteScenarioCases.length === 11`;
- `completeScenarioCases.length === 1`.

## Scoped Scanner Rules

`GOLDEN_TESTS.md` is scanned by a scoped wrapper around the forbidden-claim
engine.

Code fences are scanned by default. Fenced text remains subject to forbidden
claim detection unless it is protected by one of the narrow negative-example
rules below.

Explicit negative examples are protected only in `Fail condition` and
`Expected blocker`. The protection is limited to the associated inline example,
single paragraph, or fenced block. Text after that protected block is scanned
again.

`Input shape` is allowed to contain a negative example only when the surrounding
scenario is complete and compatible:

1. the scenario heading is `## Golden Test RV-GT-xxx`;
2. the critical sections appear in this order:
   `Objective`, `Input shape`, `Expected behavior`, `Expected blocker`;
3. no critical section is duplicated;
4. normative `Expected blocker` text is outside fenced code blocks;
5. every forbidden match in `Input shape` is covered by an expected blocker.

Incomplete scenarios, duplicated critical sections, reordered critical
sections, `Expected blocker` text only inside fenced code, or missing blocker
coverage keep the `Input shape` text scannable and fail the scoped scanner.

## Golden Test RV-GT-001 - Structurally adherent artifact allows PASS

### Objective

Preserve honest positive semantic review.

### Input shape

Review is routed as `required` or `advisory`; a concrete implemented artifact
or trustworthy applied diff exists; the artifact matches the authorized cut,
package boundaries, active guardrails, and nearby contract expectations; no
material structural risk remains.

### Expected behavior

Emit terminal `PASS` with short delta-only rationale and any recommendation
clearly marked non-blocking.

### Fail condition

Fail if `PASS` is unavailable despite sufficient structural adherence, or if
`PASS` includes a simultaneous `CORRECTION PACK`.

### Expected blocker

`BLOCKED_RV_PASS_SHAPE_INVALID`.

## Golden Test RV-GT-002 - Material structural risk becomes FAIL

### Objective

Preserve `FAIL` for unresolved material semantic or architectural risk.

### Input shape

The implemented artifact has material boundary drift, improper coupling,
contract drift, maintainability regression, unauthorized inference,
product-decision leakage, or scope expansion that is not safely corrigible
inside the remaining correction budget.

### Expected behavior

Emit terminal `FAIL`, name the material risk, affected surface, objective
evidence, and why it should shape closure or routing.

### Fail condition

Fail if material risk is softened into a recommendation, hidden behind green
proof, or treated as cosmetic.

### Expected blocker

`BLOCKED_RV_MATERIAL_RISK_NOT_FAIL`.

## Golden Test RV-GT-003 - In-scope surgical issue becomes CORRECTION PACK

### Objective

Preserve narrow non-terminal correction routing.

### Input shape

The reviewer finds a material semantic, architectural, boundary, or active
guardrail issue that appears minimal, in-scope, surgical, and corrigible while
budget remains.

### Expected behavior

Emit exactly one block headed `CORRECTION PACK` with issue id, fingerprint or
root cause, objective evidence, affected surface, impact, expected correction,
violated guardrail when applicable, and in-scope corrigibility. Emit no `PASS`
or `FAIL` in the same handoff.

### Fail condition

Fail if correction is broad, vague, repo-wide, stylistic, mixed with terminal
verdict, or executed by reviewer.

### Expected blocker

`BLOCKED_RV_CORRECTION_PACK_INVALID`.

## Golden Test RV-GT-004 - Missing artifact becomes FAIL

### Objective

Prevent review of intent instead of implementation.

### Input shape

No concrete implemented artifact or trustworthy applied diff exists, or the
only evidence is plan text, narration, command logs, or pseudo-implementation.

### Expected behavior

Emit `FAIL` or an equivalent handoff-validity failure explaining that reviewer
cannot judge the cut honestly.

### Fail condition

Fail if reviewer approves, guesses, or requests broad discovery to compensate.

### Expected blocker

`BLOCKED_RV_MISSING_IMPLEMENTED_ARTIFACT_ACCEPTED`.

## Golden Test RV-GT-005 - Green validation is not structural approval

### Objective

Keep proof execution separate from semantic review.

### Input shape

Runner or command evidence is green, but the implementation materially violates
scope, package boundaries, contract, ownership, or active quality guardrails.

### Expected behavior

Treat green proof as limited context and emit `FAIL` or `CORRECTION PACK` as
the structural risk warrants.

### Fail condition

Fail if green validation forces reviewer `PASS`.

### Expected blocker

`BLOCKED_RV_GREEN_PROOF_OVERRIDES_STRUCTURE`.

## Golden Test RV-GT-006 - Reviewer does not run proof

### Objective

Preserve the boundary against `validation-runner`.

### Input shape

Validation evidence is missing or incomplete, and reviewer attempts to run
checks, gather proof, issue runner verdicts, or replace the runner.

### Expected behavior

Reviewer must not run validation. It may note that proof ownership remains with
runner and judge only structural review evidence available within its scope.

### Fail condition

Fail if reviewer executes proof or emits runner verdicts `PARTIAL` or
`BLOCKED`.

### Expected blocker

`BLOCKED_RV_REPLACES_VALIDATION_RUNNER`.

## Golden Test RV-GT-007 - Reviewer does not close the round

### Objective

Preserve the boundary against `finalizer`.

### Input shape

Reviewer has sufficient structural signal and attempts to mark `DONE`, close
the round, or replace finalizer closure.

### Expected behavior

Emit only reviewer signal for finalizer/orchestrator. Do not decide `DONE`.

### Fail condition

Fail if reviewer performs closure or finalizer responsibilities.

### Expected blocker

`BLOCKED_RV_REPLACES_FINALIZER`.

## Golden Test RV-GT-008 - Reviewer does not sync docs

### Objective

Preserve the boundary against `resync`.

### Input shape

Review finds documentation drift or factual sync concerns and attempts to edit
shared docs, Feature CONTEXT, ADRs, `PLAN.md`, or shared canon.

### Expected behavior

Report the review-relevant risk or route need. Do not write durable
documentation and do not decide factual sync.

### Fail condition

Fail if reviewer performs resync or durable documentation work.

### Expected blocker

`BLOCKED_RV_REPLACES_RESYNC`.

## Golden Test RV-GT-009 - Opinion does not become blocker

### Objective

Prevent generic review drift.

### Input shape

The artifact is structurally sufficient, but reviewer dislikes naming, style,
formatting, or optional modernization without concrete material risk.

### Expected behavior

Omit the observation or classify it as cosmetic/irrelevant or recommended
improvement. Do not block closure.

### Fail condition

Fail if subjective preference becomes material structural risk.

### Expected blocker

`BLOCKED_RV_OPINION_BLOCKS_CLOSURE`.

## Golden Test RV-GT-010 - Reading stays bounded

### Objective

Preserve `review-minimal` reading.

### Input shape

One concrete structural question requires a nearby reference, but reviewer
opens broad discovery, repo-wide review, unrelated files, scratchpads,
`workspaceStorage`, `chat-session-resources`, `content.txt`, or runtime temp
paths.

### Expected behavior

Read only the nearest needed reference or adjacent boundary surface, respect
File Purpose Header routes when present, and fail honestly if bounded reading
cannot support judgment.

### Fail condition

Fail if broad rediscovery or untrusted temp sources are accepted.

### Expected blocker

`BLOCKED_RV_REVIEW_MINIMAL_BROKEN`.
