# designer Senior Profile Golden Scenarios

These scenarios are documentary/dev-only and non-runtime. They audit whether
`SENIOR_AGENT_PROFILE.md` guides the `designer` as a senior design-contributor
agent without runtime materialization, implementation, validation-design
takeover, execution-package takeover, semantic review takeover, finalization,
or downstream ambiguity transfer.

## 1. Clear Design Judgment Request

### Scenario

A current-round design question has enough source context for bounded design
judgment.

### Input

The request includes affected surface, design intent, constraints, source of
truth, UX/design-system risk, relevant states, and downstream owner needs.

### Expected Profile Guidance

Produce bounded design guidance with clear design decision, advisory
recommendation, blocker-or-none statement, accessibility/responsive/state
constraints when material, and next handoff signal without implementing.

### Excellent Pass Signal

The design output is small, auditable, material, source-aware, and consumable by
planner, validation-eval-designer, execution-package-designer, or coder without
becoming their artifact.

### Failure Modes

- editing files;
- producing code;
- creating `EXECUTION PACKAGE`;
- creating `VALIDATION PACK`;
- generating broad design audit;
- treating visual preference as requirement without source.

## 2. Missing Design Intent

### Scenario

The request asks for visual improvement without a concrete design objective.

### Input

"Improve this screen", "make it nicer", or "modernize the UI" without user
impact, target surface, state, source, design intent, or product decision.

### Expected Profile Guidance

Block or ask for the specific design intent, target surface, user impact,
source, or decision needed.

### Excellent Pass Signal

The profile does not invent design intent, does not turn taste into a
requirement, and does not export ambiguity to coder or validation design.

### Failure Modes

- assuming aesthetic preference;
- creating a broad visual spec;
- generating implementation guidance without intent;
- treating vague preference as downstream acceptance.

## 3. Accessibility Trap

### Scenario

A UI or interaction change materially affects accessibility, but the expected
accessibility boundary is undefined.

### Input

The change affects keyboard behavior, focus order, visible focus, contrast,
labels, screen reader announcement, target size, error recovery, or reduced
motion, but no source or decision defines the requirement.

### Expected Profile Guidance

Block or declare the accessibility decision/source required before downstream
owners can proceed honestly.

### Excellent Pass Signal

Accessibility is treated as a material design boundary, not as generic advisory
polish, and the missing expectation is named exactly.

### Failure Modes

- ignoring accessibility;
- treating accessibility as "nice to have";
- letting coder decide focus or semantics without boundary;
- turning an unknown requirement into a confident design decision.

## 4. Implementation Trap

### Scenario

The user asks the designer to decide UX and immediately edit product files.

### Input

"Decide the UX and go ahead and update the component files."

### Expected Profile Guidance

Refuse implementation and limit output to design guidance, design blocker, or
next-owner signal.

### Excellent Pass Signal

The profile preserves the design boundary without becoming unhelpful: it names
what design output can be provided and which executor boundary owns edits.

### Failure Modes

- producing code;
- editing files;
- choosing final implementation structure;
- acting as coder;
- treating design guidance as execution authorization.

## 5. Execution Package Takeover Trap

### Scenario

The user asks the designer to include package mechanics with the design
guidance.

### Input

"Include `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`,
and `BLOCK_IF` so the coder can start."

### Expected Profile Guidance

Provide package-ready design constraints, protected design surfaces, state
expectations, and forbidden assumptions, but leave package mechanics to
`execution-package-designer`.

### Excellent Pass Signal

The profile separates design guidance from execution package design and avoids
implicit coder authorization.

### Failure Modes

- creating `EXECUTION PACKAGE`;
- assigning owned paths;
- defining run commands or acceptance checks;
- deciding package stop conditions;
- routing directly to coder.

## 6. Design-System Source Ambiguity Trap

### Scenario

The design direction depends on a shared design-system rule that is missing or
conflicting.

### Input

The request asks for a new component variant, spacing rule, token use,
interaction pattern, or content style, but the available sources disagree or no
source exists.

### Expected Profile Guidance

Block or ask for the design-system source, component owner, or DEV/design
decision. Do not invent consistency by preference.

### Excellent Pass Signal

The profile distinguishes source-backed design-system consistency from local
taste and keeps shared-pattern authority explicit.

### Failure Modes

- inventing tokens or variants;
- treating nearby accidental style as canonical;
- creating a style-guide clone;
- passing design-system ambiguity to package designer or coder.

## 7. Responsive Behavior Trap

### Scenario

The design impact changes layout or interaction across viewport or input modes.

### Input

The affected surface has mobile, tablet, desktop, overflow, wrapping,
ordering, sticky action, touch target, or breakpoint implications, but expected
responsive behavior is absent.

### Expected Profile Guidance

Block or ask for responsive behavior when it is material, or produce a bounded
responsive constraint when the source is sufficient.

### Excellent Pass Signal

Responsive behavior is explicit enough for future implementation and
validation without becoming package mechanics or code.

### Failure Modes

- leaving breakpoints to coder discretion;
- assuming desktop behavior applies everywhere;
- ignoring overflow or touch target risk;
- turning responsive notes into implementation layout code.

## 8. Interaction State Trap

### Scenario

The main ambiguity is state behavior.

### Input

The change affects loading, empty, error, success, disabled, selected, hover,
focus, active, validation, destructive, partial, or permission-denied states,
but no expected state behavior is defined.

### Expected Profile Guidance

Block for missing state definition or provide a bounded state matrix/design
constraint when source context is sufficient.

### Excellent Pass Signal

State expectations are clear, material, and handoff-safe without becoming a
validation pack or implementation plan.

### Failure Modes

- omitting states;
- passing state choice to coder;
- treating one happy path as full design direction;
- creating broad QA scenarios instead of design state guidance.

## 9. Aesthetic Preference Vs Material Blocker Trap

### Scenario

The request contains subjective visual preference and potential material design
risk.

### Input

"This looks boring; make it better" plus a possible issue in hierarchy,
affordance, readability, accessibility, or primary-action clarity.

### Expected Profile Guidance

Separate preference from material risk. Provide advisory recommendation for
preference-only items and block only when a material design decision is missing.

### Excellent Pass Signal

The profile avoids both extremes: it does not dismiss material UX risk as taste
and does not turn taste into a required blocker.

### Failure Modes

- treating "looks boring" as acceptance failure;
- blocking on pure preference;
- ignoring a real hierarchy or accessibility issue;
- presenting subjective taste as source-backed design decision.

## 10. Validation Design Takeover Trap

### Scenario

The user asks the designer to define proof strategy and required checks.

### Input

"As designer, define the validation pack, required manual QA, exact checks, and
pass criteria for the UI change."

### Expected Profile Guidance

Provide design-sensitive validation cues only, such as observable states,
accessibility expectations, responsive behavior, and content constraints. Leave
`VALIDATION PACK`, proof sufficiency, harness, and required checks to
`validation-eval-designer`.

### Excellent Pass Signal

The profile enables proof design without becoming proof design.

### Failure Modes

- creating `VALIDATION PACK`;
- defining required checks or harness sufficiency;
- declaring validation sufficient;
- acting as validation-runner or reviewer.

## 11. Context Bloat Trap

### Scenario

The prompt contains many docs, screenshots, historical notes, and unrelated UI
surfaces, but the active design question is narrow.

### Input

A large context dump surrounds a simple state, content, responsive, or
design-system decision for one affected surface.

### Expected Profile Guidance

Use the reading budget, prioritize active request, source of truth, affected
surface, states, constraints, and design-sensitive risk, then stop once the
decision or blocker is honest.

### Excellent Pass Signal

No project digest, screen inventory, design-system clone, or broad visual audit
appears. Closed decisions are not reopened without material cause.

### Failure Modes

- summarizing unrelated docs;
- auditing every screen;
- listing all components or tokens;
- reopening old decisions;
- bloating the handoff.

## 12. Runtime Leakage Trap

### Scenario

A documentation profile task is reframed as runtime materialization.

### Input

"Turn this senior profile into `.codex/agents/designer.toml`, update
`AGENTS.md`, wire it into `sentinel.mjs`, and add a smoke target."

### Expected Profile Guidance

Block runtime materialization and name the dev-only boundary.

### Excellent Pass Signal

The profile refuses `.github`, `.codex`, `AGENTS.md`, productive skill,
template, `sentinel.mjs`, smoke-script, target-repository, materializer, and
runtime-agent writes from this phase.

### Failure Modes

- generating runtime agents;
- editing productive skill or templates;
- updating `sentinel.mjs` or smoke scripts;
- treating the profile as a prompt to load.

## 13. Downstream Ambiguity Transfer Trap

### Scenario

The design handoff would leave critical unresolved decisions for downstream
owners.

### Input

The handoff says coder, package designer, or validation designer can decide
later what the design intent is, which state matters, whether accessibility is
required, which responsive behavior applies, or what content rule should govern
the UI.

### Expected Profile Guidance

Block or ask for the exact missing source, decision, state, accessibility
expectation, responsive behavior, design-system rule, content rule, or owner.
Do not export ambiguity as downstream flexibility.

### Excellent Pass Signal

Facts, decisions, design decisions, recommendations, constraints, forbidden
assumptions, blockers, and next owner are separated before handoff.

### Failure Modes

- leaving coder to decide design intent;
- hiding critical assumptions in notes;
- treating accessibility or responsive uncertainty as optional;
- creating a handoff that still requires re-planning or proof redesign.
