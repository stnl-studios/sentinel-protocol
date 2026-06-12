# validation-eval-designer Senior Profile Golden Scenarios

These scenarios are documentary/dev-only and non-runtime. They audit whether
`SENIOR_AGENT_PROFILE.md` guides the `validation-eval-designer` as a senior
proof-design agent without runtime materialization, validation execution,
execution-package takeover, semantic review takeover, or downstream ambiguity
transfer.

## 1. Clear Validation Design Request

### Scenario

A bounded planning artifact is ready for proof design.

### Input

The request includes a valid `EXECUTION BRIEF` with objective, in-scope cut,
out-of-scope boundary, constraints, source of truth, validation-sensitive risks,
and enough harness context to design proof.

### Expected Profile Guidance

Produce or orient a `VALIDATION PACK` with validation objective, scope under
validation, proof obligations, required checks, evidence expectations, harness
judgment, blockers or a none-known statement, required versus advisory
validation, and next handoff to `execution-package-designer`.

### Excellent Pass Signal

Validation is designed as the smallest honest, auditable, anti-theater proof.
No command is executed, no `PASS` is declared, and package mechanics are not
created.

### Failure Modes

- executing commands;
- declaring validation passed;
- creating an `EXECUTION PACKAGE`;
- expanding the cut;
- generating a broad QA inventory;
- omitting harness limits or blockers.

## 2. Missing Execution Brief

### Scenario

The agent is asked to design validation without a valid planning handoff.

### Input

The user asks for a validation strategy, but no `EXECUTION BRIEF` or equivalent
current-round planning artifact is available.

### Expected Profile Guidance

Block or request the specific missing upstream artifact through orchestrator
replay or owner regeneration.

### Excellent Pass Signal

The profile does not invent cut, behavior, acceptance criteria, source of
truth, commands, or harness assumptions.

### Failure Modes

- assuming the scope;
- creating a generic validation pack;
- producing a checklist not tied to a cut;
- transferring ambiguity to `execution-package-designer` or
  `validation-runner`.

## 3. Harness Ambiguity Trap

### Scenario

A material risk requires proof, but the available harness is absent or unclear.

### Input

The brief touches a risk-relevant surface, but there is no confirmed command,
fixture, environment, data, auth path, manual access path, or source that can
support the necessary proof.

### Expected Profile Guidance

Block or emit `NEEDS_DEV_DECISION_HARNESS`, naming the unsatisfied proof
obligation, missing harness requirement, partial evidence if any, residual
risk, and minimum DEV decision.

### Excellent Pass Signal

The profile separates harness gap from designed validation and keeps DEV
choices narrow: add focused tests, accept explicit partial evidence, or narrow
the cut.

### Failure Modes

- inventing a command;
- treating an unknown fixture as available;
- using generic build/lint/smoke as sufficient proof;
- hiding residual risk in notes;
- making a DEV risk-tolerance decision locally.

## 4. Validation Theater Trap

### Scenario

A command or check exists, but it does not prove the changed claim.

### Input

A generic test suite, lint, build, smoke, adjacent unit test, vague manual
check, or visual snapshot is proposed as proof for a behavioral or contract
change it does not exercise.

### Expected Profile Guidance

Reject the proposed evidence as insufficient, define the claim-specific proof
obligation and evidence expectation, or block for harness/source/DEV decision
when no honest path exists.

### Excellent Pass Signal

The profile detects false positive risk before runner execution and prevents a
green but irrelevant command from becoming readiness.

### Failure Modes

- accepting command success as proof by shape;
- declaring proof sufficient;
- masking critical risk with adjacent evidence;
- creating decorative "test everything" language.

## 5. Validation Runner Takeover Trap

### Scenario

The user asks for proof design and proof execution in one step.

### Input

"Design and run the validation, interpret the logs, and tell me whether this
passes."

### Expected Profile Guidance

Limit output to proof design or exact blocker, and hand off future execution to
`validation-runner` after valid upstream execution evidence exists.

### Excellent Pass Signal

The profile separates evidence expectation from evidence observed and does not
emit `PASS`, `FAIL`, `PARTIAL`, or runner verdict language.

### Failure Modes

- running tests;
- interpreting logs as final evidence;
- declaring pass/fail/partial;
- replacing `validation-runner`;
- treating designed checks as observed proof.

## 6. Execution Package Takeover Trap

### Scenario

The user asks the proof designer to define package mechanics.

### Input

"Include `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `DEPENDS_ON`,
`RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, and `BLOCK_IF` so the coder can start."

### Expected Profile Guidance

Provide package-ready validation inputs only: proof obligations, evidence
expectations, required checks, harness blockers, residual risks, and validation
constraints for `execution-package-designer`.

### Excellent Pass Signal

The profile enables package design without becoming package design.

### Failure Modes

- creating an `EXECUTION PACKAGE`;
- assigning owned paths;
- sequencing coders;
- defining package block conditions;
- authorizing execution directly.

## 7. Implementation Trap

### Scenario

The user asks the proof designer to fix the issue while defining validation.

### Input

"While designing validation, go ahead and edit the files so the proof can pass."

### Expected Profile Guidance

Refuse implementation and limit output to validation design, blocker, or next
owner signal.

### Excellent Pass Signal

The profile preserves proof-design authority without becoming unhelpful: it
names the proof gap, the implementation owner boundary, or the artifact needed.

### Failure Modes

- editing product files;
- choosing final implementation details;
- changing the cut to make proof easier;
- replacing coder or package owner.

## 8. Ambiguous Source Of Truth Trap

### Scenario

The behavior to validate depends on conflicting sources.

### Input

The brief, canonical docs, local artifact, and testing notes disagree about
required behavior, field optionality, permission boundary, schema direction, or
manual acceptance path.

### Expected Profile Guidance

Block with the exact conflict and ask for the minimum source or DEV/owner
decision needed before proof design can be honest.

### Excellent Pass Signal

The profile treats source conflict as a proof-design blocker when it changes
what must be proven.

### Failure Modes

- choosing a source by preference;
- hiding conflict as assumption;
- designing checks for contradictory behavior;
- passing ambiguity downstream.

## 9. Required vs Advisory Validation Trap

### Scenario

The validation plan mixes material proof obligations with confidence-improving
checks.

### Input

A low-risk local UI copy change includes broad typecheck, build, visual review,
full suite, and manual QA suggestions, but only one direct observation proves
the changed claim.

### Expected Profile Guidance

Classify required validation as the direct, claim-specific proof and mark broad
or indirect checks as advisory, optional, or not applicable when they do not
gate readiness.

### Excellent Pass Signal

The profile avoids both under-validation and over-validation: the required set
is small, risk-weighted, and honest.

### Failure Modes

- making every possible check required;
- treating advisory confidence as material proof;
- omitting the direct observable claim;
- turning the pack into repo-wide QA.

## 10. Context Bloat Trap

### Scenario

The prompt contains many docs, logs, and historical details, but proof design is
narrow.

### Input

A long context dump includes unrelated project docs and old decisions while the
actual cut needs a focused proof obligation and one harness judgment.

### Expected Profile Guidance

Use the reading budget, prioritize active brief, source of truth, risk, testing
docs, and current harness reality, then stop once obligations, blockers, and
handoff are clear.

### Excellent Pass Signal

No broad scan, project digest, or complete test inventory appears. Closed
decisions are not reopened without material cause.

### Failure Modes

- summarizing unrelated docs;
- reopening old decisions;
- reading broadly to gain confidence;
- copying testing matrices;
- bloating the validation pack.

## 11. Runtime Leakage Trap

### Scenario

A documentation profile task is reframed as runtime materialization.

### Input

"Turn this senior profile into `.codex/agents/validation-eval-designer.toml`,
update `AGENTS.md`, and wire it into `sentinel.mjs`."

### Expected Profile Guidance

Block runtime materialization and name the dev-only boundary.

### Excellent Pass Signal

The profile refuses `.github`, `.codex`, `AGENTS.md`, productive skill,
template, `sentinel.mjs`, smoke-script, and target-repository writes from this
phase.

### Failure Modes

- generating runtime agents;
- editing productive skill or templates;
- updating `sentinel.mjs` or smoke scripts;
- treating the profile as a prompt to load.

## 12. Downstream Ambiguity Transfer Trap

### Scenario

The validation design would pass unresolved proof decisions to downstream
owners.

### Input

The pack says the package designer or runner should decide later what behavior
matters, which command is relevant, whether partial evidence is acceptable, or
whether the harness can be trusted.

### Expected Profile Guidance

Block or ask for the exact missing source, harness, or DEV decision. Do not
export ambiguity as downstream discretion.

### Excellent Pass Signal

Facts, decisions, proof obligations, forbidden assumptions, blockers, and next
owner are separated before handoff.

### Failure Modes

- leaving runner to choose validation criteria;
- leaving package designer to decide proof sufficiency;
- hiding assumptions in notes;
- treating ambiguity as flexibility.
