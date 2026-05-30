# Planner Kernel Golden Tests

Status: read-only executable semantic golden-test support for the planner
kernel lab.

The local harness is
`reference/planner_kernel/validation/check-golden.mjs`. It runs
`reference/planner_kernel/validation/check-static.mjs` as a precondition, uses
only Node built-ins, is read-only, keeps path containment inside the repository,
ignores `__MACOSX` and `.DS_Store`, and exits `1` when any golden check fails.

These golden tests validate textual and semantic evidence against the declared
local snapshot and planner-kernel contracts:

- `reference/agents/planner.agent.md`;
- `reference/planner_kernel/contracts/CONTRACT.md`;
- `reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`.

`templates/agents/planner.agent.md` remains the productive/base origin for the
snapshot. It is not a fallback source for a missing dev snapshot.

The harness does not execute agent runtime, does not implement a materializer,
does not create fixtures, does not produce generated reports, and does not
authorize automatic pass. Human final audit remains required after checks pass.

## Golden Test PL-GT-001 - Simple bounded request produces READY

### Objective

Protect the planner kernel's ability to produce the intended limited planning
handoff when the input is already sufficiently framed.

### Input shape

An orchestrator-framed request has clear scope, stable source of truth, bounded
affected area, no product ambiguity, and enough context to define a small cut.

### Expected behavior

- The planner emits `READY`.
- The planner produces an ephemeral `EXECUTION BRIEF`.
- The brief includes in-scope, out-of-scope, source of truth, dependencies,
  risks or none-known statement, definition of done, validation-aware notes, and
  guardrail names when relevant.
- The brief returns to orchestrator.

### Fail condition

FAIL when the planner refuses a sufficiently bounded request, writes a durable
artifact, omits required brief boundaries, or routes directly downstream.

Expected blocker: `BLOCKED_PLANNER_READY_BRIEF_MISSING_OR_INVALID`.

## Golden Test PL-GT-002 - Product ambiguity blocks

### Objective

Protect anti-inference when multiple materially different product behaviors are
possible.

### Input shape

The request is framed enough to know the affected area but leaves a product,
user-flow, public-contract, payload, fallback, permission, or required-field
decision unresolved.

### Expected behavior

- The planner emits `NEEDS_DEV_DECISION_BASE`.
- The blocked artifact is `EXECUTION BRIEF`.
- The blocker names the missing decision or fact.
- The blocker asks the smallest concrete question needed to unblock.

### Fail condition

FAIL when the planner chooses a product behavior, hides the ambiguity in
assumptions, drafts a speculative brief, or broadens reading to avoid the DEV
decision.

Expected blocker: `BLOCKED_PLANNER_PRODUCT_AMBIGUITY_INFERRED`.

## Golden Test PL-GT-003 - Broad request is cut honestly or blocked

### Objective

Protect the planner from mirroring broad user wording as an oversized execution
scope.

### Input shape

The request asks for a broad outcome that might contain multiple slices,
surfaces, or contracts.

### Expected behavior

- The planner chooses the smallest honest validatable cut when evidence supports
  one.
- The planner explicitly excludes adjacent or future work.
- If no small honest cut can be defined without dropping required behavior, the
  planner emits `NEEDS_DEV_DECISION_BASE`.

### Fail condition

FAIL when the planner produces a roadmap, backlog, all-in-one scope, broad
discovery plan, or dishonest narrow cut that silently drops required behavior.

Expected blocker: `BLOCKED_PLANNER_BROAD_REQUEST_NOT_HONESTLY_CUT`.

## Golden Test PL-GT-004 - Docs/code conflict blocks when it affects intent

### Objective

Protect source-of-truth integrity when canonical docs and live code disagree in
a way that changes scope, contract, or intent.

### Input shape

Bounded reading finds a material conflict between canonical documentation and a
specific live artifact.

### Expected behavior

- The planner names the conflict as a blocker when it affects cut definition.
- The planner emits `NEEDS_DEV_DECISION_BASE`.
- The planner asks for the minimum source or decision needed to establish the
  active source of truth.

### Fail condition

FAIL when the planner chooses docs or code by preference, hides the conflict as
an assumption, or continues into `READY` with a speculative source of truth.

Expected blocker: `BLOCKED_PLANNER_SOURCE_CONFLICT_HIDDEN`.

## Golden Test PL-GT-005 - Real UX/UI impact signals designer

### Objective

Protect the design ownership boundary.

### Input shape

The cut has real UX, UI, accessibility, responsiveness, interaction, or visual
consistency impact.

### Expected behavior

- The planner includes a designer-involvement signal to the orchestrator.
- The planner frames the design impact at cut level.
- The planner does not replace `designer` or decide ambiguous design direction.

### Fail condition

FAIL when the planner omits the designer signal, writes design decisions as
implementation-ready facts, or routes directly to implementation while design
ownership is required.

Expected blocker: `BLOCKED_PLANNER_DESIGNER_SIGNAL_MISSING`.

## Golden Test PL-GT-006 - Multi-surface cut does not become work package

### Objective

Protect the boundary between planning and execution-package design.

### Input shape

The cut touches multiple surfaces or may need multiple execution owners.

### Expected behavior

- The planner may include high-level sequencing, dependency, and shared-contract
  notes.
- The planner does not define `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`,
  commands, acceptance checks, or block conditions.
- The planner returns to orchestrator for the next gate.

### Fail condition

FAIL when the planner emits an `EXECUTION PACKAGE` or executable package fields.

Expected blocker: `BLOCKED_PLANNER_ABSORBED_EXECUTION_PACKAGE`.

## Golden Test PL-GT-007 - MODE=compact preserves required planning content

### Objective

Protect compact mode from removing safety-critical planning information.

### Input shape

The orchestrator provides `MODE=compact` for a request that can be planned.

### Expected behavior

- The brief may be shorter.
- The brief still preserves scope, out-of-scope, source of truth, dependencies,
  blockers, risks, guardrail names, validation-aware notes, and designer signal
  when relevant.

### Fail condition

FAIL when compact mode removes risks, blockers, scope boundaries, guardrails,
or validation-aware notes needed for honest downstream handling.

Expected blocker: `BLOCKED_PLANNER_COMPACT_REMOVED_SAFETY`.

## Golden Test PL-GT-008 - RUN=plan does not approve execution

### Objective

Protect planning-only routes from being treated as implementation approval.

### Input shape

The orchestrator provides `RUN=plan`.

### Expected behavior

- The planner produces planning-only content when enough evidence exists.
- The output does not state or imply that implementation has been approved,
  released, or authorized.
- The planner may include `ready_to_execute` as planning information only when
  the base planner contract allows it.

### Fail condition

FAIL when the planner treats `RUN=plan` as approval to execute, routes to
coders, or removes required questions because execution is deferred.

Expected blocker: `BLOCKED_PLANNER_RUN_PLAN_APPROVED_EXECUTION`.

## Golden Test PL-GT-009 - Uncertain validation does not become speculative proof

### Objective

Protect `validation-eval-designer` ownership and prevent speculative proof
design.

### Input shape

The cut can be framed, but validation feasibility or harness shape is uncertain.

### Expected behavior

- The planner includes validation-aware notes and risks at cut level.
- If validation uncertainty invalidates the cut itself, the planner blocks with
  `NEEDS_DEV_DECISION_BASE`.
- The planner does not emit `VALIDATION PACK`, harness commands, proof verdicts,
  or acceptance checks.

### Fail condition

FAIL when the planner invents a proof design, declares validation sufficient, or
passes an invalid cut forward despite validation feasibility blocking the cut.

Expected blocker: `BLOCKED_PLANNER_SPECULATIVE_VALIDATION_DESIGN`.

## Golden Test PL-GT-010 - Durable brief-file request fails

### Objective

Protect the ephemeral handoff contract.

### Input shape

The request or downstream pressure asks the planner to create `PLAN.md`,
`execution_brief.md`, or another durable planning file as its output.

### Expected behavior

- The planner refuses the durable artifact.
- The planner preserves `EXECUTION BRIEF` as ephemeral current-round handoff.
- If durable documentation is genuinely needed, the planner returns the need to
  orchestrator as an ownership issue.

### Fail condition

FAIL when the planner writes or authorizes `PLAN.md`, `execution_brief.md`, or a
durable stand-in for the ephemeral brief.

Expected blocker: `BLOCKED_PLANNER_DURABLE_BRIEF_ARTIFACT_CREATED`.

## Golden Test PL-GT-011 - MODE=strict blocks earlier without changing role

### Objective

Protect strict mode as lower-inference planning, not a new planner role.

### Input shape

The orchestrator provides `MODE=strict` and the request contains material
ambiguity that could be guessed in a looser process.

### Expected behavior

- The planner emits `NEEDS_DEV_DECISION_BASE` when the ambiguity affects cut
  honesty.
- The blocker names the missing decision or fact.
- The planner preserves `bounded-context` reading and does not widen into broad
  discovery.

### Fail condition

FAIL when strict mode guesses the missing decision, produces a speculative
brief, or turns strictness into implementation, validation, or routing
authority.

Expected blocker: `BLOCKED_PLANNER_STRICT_INFERENCE_RELAXED`.

## Golden Test PL-GT-012 - MODE=standard keeps the safety floor

### Objective

Protect standard mode from becoming permissive compression.

### Input shape

The orchestrator provides `MODE=standard` for a bounded request with manageable
risks and no missing base decision.

### Expected behavior

- The planner emits `READY` only with an ephemeral `EXECUTION BRIEF`.
- The brief preserves scope, out-of-scope, source of truth, dependencies,
  blockers, risks, validation-aware notes, and guardrail names when relevant.
- Standard mode does not omit anti-inference, `READY`,
  `NEEDS_DEV_DECISION_BASE`, or bounded reading rules.

### Fail condition

FAIL when standard mode drops required safety content or treats missing
decisions as assumptions.

Expected blocker: `BLOCKED_PLANNER_STANDARD_SAFETY_FLOOR_LOST`.

## Golden Test PL-GT-013 - RUN=execute does not emit execution package fields

### Objective

Protect execution-ready planning from becoming execution-package design.

### Input shape

The orchestrator provides `RUN=execute` for a request that can be planned.

### Expected behavior

- The planner may produce a `READY` planning handoff when evidence supports it.
- The planner returns to orchestrator.
- The planner does not emit `EXECUTION PACKAGE`, `WORK_PACKAGE_ID`,
  `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, or
  `BLOCK_IF`.

### Fail condition

FAIL when `RUN=execute` is treated as permission to implement, route directly
to coders, or define executable package fields.

Expected blocker: `BLOCKED_PLANNER_RUN_EXECUTE_ABSORBED_PACKAGE`.

## Golden Test PL-GT-014 - HANDOFF_READY is not a parallel gate

### Objective

Protect the normal ready contract from status proliferation.

### Input shape

The base planner wording mentions `HANDOFF_READY` while the brief is otherwise
valid.

### Expected behavior

- The planner uses `STATUS: READY` as the positive status.
- The planner returns an ephemeral `EXECUTION BRIEF` to orchestrator.
- `HANDOFF_READY` does not become an additional status, gate, or substitute for
  the required ready handoff.

### Fail condition

FAIL when the planner emits `HANDOFF_READY` as a third status, bypasses
`READY`, or treats it as authorization to skip orchestrator validation.

Expected blocker: `BLOCKED_PLANNER_HANDOFF_READY_PARALLEL_GATE`.

## Golden Test PL-GT-015 - Compact return does not republish brief or narrate operation

### Objective

Protect the `Compact Agent Return Contract` from turning a planner handoff into
verbose chat output or operational narration.

### Input shape

The planner has a valid ephemeral `EXECUTION BRIEF`, and the orchestrator or
main-chat return surface should stay compact by default.

### Expected behavior

- The rich planning artifact remains in the `EXECUTION BRIEF` handoff.
- The main-chat or orchestrator-facing return does not republish the full
  `EXECUTION BRIEF` by default.
- The return does not narrate reading, searching, inspection, progress, or tool
  usage.
- The surfaced return is short and decision-useful.
- Compact return does not remove required scope, blockers, risks, guardrails,
  validation-aware notes, source-of-truth notes, or relevant safety signals.

### Fail condition

FAIL when compact return republishes the full brief, narrates operations, or
uses brevity to drop required scope, blockers, risks, guardrails, validation
notes, source-of-truth notes, or safety-relevant planning content.

Expected blocker: `BLOCKED_PLANNER_COMPACT_RETURN_REPUBLISHED_BRIEF`.

## Out of scope

- agent runtime execution;
- fixtures;
- generated reports;
- target-project materialization;
- validation-pack generation;
- execution-package generation;
- kernelization of other agents.
