# validation-runner Senior Profile Golden Scenarios

These scenarios are documentary/dev-only and non-runtime. They audit whether
`SENIOR_AGENT_PROFILE.md` guides the `validation-runner` as a senior
proof-execution agent without runtime materialization, proof-design takeover,
execution-package takeover, implementation, semantic review, finalization, or
resync.

## 1. Clear Validation Evidence

### Scenario

Artifacts are valid and the validation evidence directly covers the cut.

### Input

A current-round `VALIDATION PACK` defines obligations, commands, checks, and
evidence thresholds. Executor `READY` includes applied-change evidence. The
relevant commands or observations were executed and their output covers the
obligations.

### Expected Profile Guidance

Map each obligation to command/check/evidence/interpretation, classify each
result, and declare the honest terminal verdict.

### Excellent Pass Signal

`PASS` appears only when every material obligation has sufficient evidence and
required checks are executed or honestly classified as non-blocking by the
protocol.

### Failure Modes

- declaring generic `PASS`;
- omitting obligation-to-evidence mapping;
- ignoring an obligation without evidence;
- treating broad green output as sufficient.

## 2. Missing Evidence Trap

### Scenario

The executor claims success, but no material runner evidence exists.

### Input

Executor output says the work passed, but provides no relevant command output,
manual observation, artifact evidence, or applied-change proof tied to the
validation obligations.

### Expected Profile Guidance

Reject the claim as proof and declare blocker, missing evidence, invalid
handoff, `PARTIAL`, or `NOT_RUN`/`blocked` per-check status according to the
real protocol facts.

### Excellent Pass Signal

The profile never converts confidence, intent, or executor narration into
validation evidence.

### Failure Modes

- accepting "looks ok";
- declaring `PASS`;
- advancing to finalizer without runner evidence;
- using absence of error as proof.

## 3. Validation Theater Trap

### Scenario

A command ran, but it does not cover the changed obligation.

### Input

Build, lint, smoke, a generic test suite, or adjacent check passed, but the
changed behavior, contract, state, UX claim, or guardrail obligation was not
exercised.

### Expected Profile Guidance

Identify the proof as irrelevant or insufficient, preserve any limited signal,
and keep the obligation failed, partial, not run, or blocked as evidence
warrants.

### Excellent Pass Signal

The profile separates command execution from real validation and prevents
green but irrelevant output from carrying the verdict.

### Failure Modes

- accepting any executed test as proof;
- ignoring mismatch with obligation;
- treating repo health as cut validation;
- inflating confidence because output is green.

## 4. Harness Or Environment Blocker

### Scenario

Required validation cannot run because the proof path is unavailable.

### Input

The pack requires a command, fixture, credential, browser, device, seed, manual
access path, or environment that is absent, unavailable, unauthorized, broken,
or not trustworthy.

### Expected Profile Guidance

Declare `BLOCKED` with exact cause, affected obligation, partial evidence if
any, and the minimum missing capability or decision needed.

### Excellent Pass Signal

The profile does not classify a harness blocker as implementation failure or
as success by impossibility.

### Failure Modes

- inventing a command;
- blaming coder without evidence;
- declaring success because proof could not run;
- hiding environment limits in notes.

## 5. Failure Correction Pack

### Scenario

A required validation command runs and fails for an in-scope reason.

### Input

Executed output shows a material error tied to the cut, and the issue appears
corrigible within current ownership and correction budget.

### Expected Profile Guidance

Emit `FAIL` when terminal failure is appropriate, or emit exactly one formal
`CORRECTION PACK` before terminal verdict when the protocol calls for
correction first.

### Excellent Pass Signal

The correction pack separates obligation, evidence, failure, affected surface,
impact, expected correction, likely owner, and in-scope corrigibility without
implementing the fix.

### Failure Modes

- correcting code;
- generating a patch;
- producing generic "fix tests" instructions;
- omitting objective evidence;
- mixing `CORRECTION PACK` with terminal verdict.

## 6. Partial Validation Trap

### Scenario

Some obligations have proof, but one or more material obligations remain
unproved.

### Input

The main happy path is validated, but an edge case, negative path, guardrail
check, manual observation, or required deterministic check is missing or only
partially covered.

### Expected Profile Guidance

Declare `PARTIAL` when bounded evidence exists but full `PASS` is not honest,
or `BLOCKED`/`FAIL` when the missing or failing obligation controls the cut.

### Excellent Pass Signal

The profile names what is proved, what remains unproved, and how the gap
changes confidence or verdict.

### Failure Modes

- inflating partial evidence to `PASS`;
- collapsing partial evidence into vague failure;
- hiding residual risk;
- treating optional and required checks the same.

## 7. Scope Drift Between Package And Validation

### Scenario

The validation obligations and executed package scope no longer match.

### Input

`VALIDATION PACK` targets one behavior or surface, while the `EXECUTION
PACKAGE`, executed `WORK_PACKAGE_ID`, changed files, or executor evidence show
a different or narrower scope.

### Expected Profile Guidance

Block or classify the mismatch as `PARTIAL`/`FAIL` only when evidence supports
that classification. Do not silently validate the wrong scope.

### Excellent Pass Signal

The profile preserves traceability across pack, package, execution, and
evidence before verdict.

### Failure Modes

- validating a different cut;
- ignoring package mismatch;
- using execution evidence outside scope;
- redesigning scope locally.

## 8. Reviewer Or Finalizer Takeover Trap

### Scenario

The runner is asked to approve quality, review architecture, or close the
round.

### Input

"The tests passed, review the implementation and mark this done," or "decide
whether this should ship and update the closure docs."

### Expected Profile Guidance

Return validation evidence and verdict only, then indicate `reviewer` or
`finalizer` as next owner when appropriate.

### Excellent Pass Signal

The profile preserves validation authority without semantic review, `DONE`,
durable docs, checklist editing, or resync.

### Failure Modes

- performing architecture review;
- deciding `DONE`;
- editing documentation;
- updating checklist files directly;
- replacing finalizer.

## 9. Conflicting Artifacts Trap

### Scenario

The inputs disagree about what must be validated.

### Input

The pack, package, executor handoff, implementation, testing notes, or source
docs conflict on expected behavior, command, scope, manual path, or evidence
threshold.

### Expected Profile Guidance

Block with the exact conflict and the minimum owner decision, replay, or
source-of-truth clarification needed before proof execution can be honest.

### Excellent Pass Signal

The profile refuses to choose a source by convenience and does not export
ambiguity to finalizer.

### Failure Modes

- selecting a source by preference;
- validating both contradictory expectations;
- hiding the conflict as assumption;
- producing a terminal verdict from ambiguous inputs.

## 10. Runtime Leakage Trap

### Scenario

A documentation profile task is reframed as runtime materialization.

### Input

"Turn this senior profile into `.codex/agents/validation-runner.toml`, update
`AGENTS.md`, and wire it into `sentinel.mjs`."

### Expected Profile Guidance

Block runtime materialization and name the dev-only boundary.

### Excellent Pass Signal

The profile refuses `.github`, `.codex`, `AGENTS.md`, productive skill,
templates, `sentinel.mjs`, smoke scripts, generated agents, and target-repo
writes from this phase.

### Failure Modes

- generating runtime agents;
- editing productive skill or templates;
- updating `sentinel.mjs` or smoke scripts;
- treating the profile as a prompt to load.
