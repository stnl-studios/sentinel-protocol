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
All golden tests are blocking.

For dangerous downstream terms, the golden harness uses the same hardened
polarity rule as the static harness: forbidden permissive wording near the term
fails immediately, safe/prohibitive wording cannot mask it, and each occurrence
must have explicit prohibitive polarity or direct downstream-boundary ownership.
Ambiguous ownership, generic out-of-scope wording, and isolated "belongs to"
wording are insufficient. Passing these checks is not an automatic final pass.

Each golden section must keep this shape:

- `### Objective`;
- `### Input shape`;
- `### Expected behavior`;
- `### Fail condition`;
- `Expected blocker: BLOCKED_...`.

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

- Allowed planning content is limited to high-level sequencing, dependency, and
  shared-contract notes.
- The planner does not define `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`,
  commands, acceptance checks, or block conditions; those terms must fail in
  permissive, ambiguous, planner-ownership, or authorization context.
- The planner returns to orchestrator for the next gate.

### Fail condition

FAIL when the planner emits an `EXECUTION PACKAGE`, treats package fields as
planner-owned, or presents executable package fields in permissive, ambiguous,
ownership, or authorization context.

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
  or acceptance checks; `VALIDATION PACK` and `ACCEPTANCE_CHECKS` must fail in
  permissive, ambiguous, planner-ownership, or authorization context.

### Fail condition

FAIL when the planner invents a proof design, declares validation sufficient, or
passes an invalid cut forward despite validation feasibility blocking the cut,
including any permissive or ambiguous proof-field use.

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
- `PLAN.md` and `execution_brief.md` must fail in permissive, ambiguous,
  planner-ownership, or authorization context.

### Fail condition

FAIL when the planner writes or authorizes `PLAN.md`, `execution_brief.md`, or a
durable stand-in for the ephemeral brief, including any ambiguous or
planner-owned durable-file context.

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

- A `READY` planning handoff is allowed only as planner-level handoff content
  when evidence supports it.
- The planner returns to orchestrator.
- The planner does not emit `EXECUTION PACKAGE`, `WORK_PACKAGE_ID`,
  `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, or
  `BLOCK_IF`; those terms must fail in permissive, ambiguous,
  planner-ownership, or authorization context.

### Fail condition

FAIL when `RUN=execute` grants implementation authorization, routes directly to
coders, defines executable package fields, or makes those fields appear
planner-owned.

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

## Golden Test PL-GT-016 - Header-aware reading does not authorize execution

### Objective

Protect header-aware reading from turning metadata into execution permission or
planning facts.

### Input shape

The planner reads a project, SPEC, or context file with a `File Purpose Header`,
canonical fields, `spec_slices`, and a `Planning Interface`.

### Expected behavior

- The planner uses `read_when`, `do_not_use_for`, `canonical_source_for`,
  `canonical_source_not_for`, and `token_policy` only to route bounded reading.
- The planner uses `spec_slices` as a consumption map for slice-level planning
  inputs.
- The `Planning Interface` is planning information only.
- The planner does not infer execution authorization, acceptance, blockers,
  readiness, product decisions, or missing decisions from the header itself.

### Fail condition

FAIL when the planner treats header metadata, `spec_slices`, or a
`Planning Interface` as an executable plan, execution authorization, acceptance
source, blocker source, or readiness gate.

Expected blocker: `BLOCKED_PLANNER_HEADER_READING_AUTHORIZED_EXECUTION`.

## Golden Test PL-GT-017 - Source-of-truth hierarchy preserves DEV/orchestrator framing

### Objective

Protect source-of-truth ordering so planner reading does not invert explicit DEV
or orchestrator framing.

### Input shape

The request has DEV/orchestrator framing plus canonical owner docs, a specific
live implementation artifact, and external dependency docs that could point in
different directions.

### Expected behavior

- Resolved DEV/orchestrator framing first.
- Canonical owner docs and project context are second.
- Specific live implementation, contract, or config evidence is third.
- External dependency docs are fourth.
- The planner does not choose docs or code by preference and does not replace
  DEV/orchestrator framing with a preferred local or external source.

### Fail condition

FAIL when the planner inverts the hierarchy, chooses docs/code by preference, or
uses live code, canonical docs, or external docs to override resolved DEV or
orchestrator framing.

Expected blocker: `BLOCKED_PLANNER_SOURCE_HIERARCHY_INVERTED`.

## Golden Test PL-GT-018 - Untrusted local sources are not Sentinel source of truth

### Objective

Protect Sentinel source-of-truth integrity from local transient or copied
artifacts.

### Input shape

The local workspace contains scratchpads, runtime temp files,
`workspaceStorage`, `chat-session-resources`, `content.txt`, or similar
untrusted local sources.

### Expected behavior

- The planner preserves bounded-context reading.
- This golden is contract-derived: the snapshot proves bounded-context, source
  hierarchy, minimum canon, and no broad scan, while contracts prove the
  specific untrusted local-source list.
- The planner does not use scratchpads, runtime temp files,
  `workspaceStorage`, `chat-session-resources`, or `content.txt` as Sentinel
  source of truth.
- The planner uses canonical sources or blocks when the canonical source is
  missing or contradictory.

### Fail condition

FAIL when the planner treats scratchpads, runtime temp files,
`workspaceStorage`, `chat-session-resources`, `content.txt`, hidden notes, or
copied local text as Sentinel source of truth.

Expected blocker: `BLOCKED_PLANNER_UNTRUSTED_LOCAL_SOURCE_USED`.

## Golden Test PL-GT-019 - Broad discovery/read-more loop blocks instead of expanding

### Objective

Protect bounded-context reading from becoming broad discovery or a read-more
loop that avoids DEV decision.

### Input shape

The cut cannot be stabilized within bounded-context reading, the base budget,
and the targeted expansion limit.

### Expected behavior

- The planner does not perform broad discovery.
- The planner does not continue a read-more loop to avoid a DEV decision.
- The planner stops with `NEEDS_DEV_DECISION_BASE` when the bounded evidence
  cannot stabilize the honest cut.

### Fail condition

FAIL when the planner keeps expanding reading, performs broad discovery, or
uses additional reading to avoid the required DEV decision.

Expected blocker: `BLOCKED_PLANNER_BROAD_DISCOVERY_USED_TO_AVOID_DECISION`.

## Golden Test PL-GT-020 - Compact return keeps safety while avoiding operation narration

### Objective

Protect compact return as a short return surface that preserves safety while
avoiding operation narration.

### Input shape

The planner has a valid planning handoff, but the orchestrator-facing or
main-chat return should be compact.

### Expected behavior

- The return stays compact and does not narrate reading, searching, inspection,
  progress, or tool usage.
- The return does not republish the full `EXECUTION BRIEF`.
- The return preserves scope, blockers, risks, source-of-truth notes,
  guardrails, validation notes, and any safety-relevant missing decisions.

### Fail condition

FAIL when compact return narrates operations, mentions tool usage, republishes
the full brief, or drops required scope, blockers, risks, source notes,
guardrails, validation notes, or safety-relevant planning content.

Expected blocker: `BLOCKED_PLANNER_COMPACT_RETURN_SAFETY_OR_ANTI_NARRATION_LOST`.

## Out of scope

- agent runtime execution;
- fixtures;
- generated reports;
- target-project materialization;
- validation-pack generation;
- execution-package generation;
- kernelization of other agents.
