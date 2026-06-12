# execution-package-designer Senior Profile Golden Scenarios

These scenarios are documentary/dev-only and non-runtime. They audit whether
`SENIOR_AGENT_PROFILE.md` guides the `execution-package-designer` as a senior
package-design agent without runtime materialization, implementation,
validation-design takeover, validation execution, review, finalization, or
downstream ambiguity transfer.

## 1. Clear Execution Package Request

### Scenario

A bounded planning artifact and proof-design artifact are ready for package
design.

### Input

The request includes valid current-round `EXECUTION BRIEF` and `VALIDATION
PACK` artifacts with scope, proof obligations, constraints, source of truth,
non-goals, package-sensitive risks, and enough local anchors to define safe
owner and path boundaries.

### Expected Profile Guidance

Produce or orient a small, owner-safe, auditable `EXECUTION PACKAGE` with
package objective, approved scope, `WORK_PACKAGE_ID`, owner candidate,
`OWNED_PATHS`, `DEPENDS_ON`, `DO_NOT_TOUCH`, `RUN_COMMANDS`,
`ACCEPTANCE_CHECKS`, `BLOCK_IF`, proof linkage, blockers or none-known
statement, and handoff back to orchestrator.

### Excellent Pass Signal

Package boundary, owner, fields, blockers, proof linkage, dependency facts, and
coder handoff are clear without implementation, command execution, proof
redesign, re-planning, or package bloat.

### Failure Modes

- implementing code;
- executing commands;
- redesigning validation;
- re-planning the cut;
- creating a broad package;
- routing directly to coder instead of returning to orchestrator.

## 2. Missing Validation Pack

### Scenario

The agent is asked to create an `EXECUTION PACKAGE` without proof-design input.

### Input

The request has an `EXECUTION BRIEF` or informal scope, but no `VALIDATION
PACK` or equivalent valid proof-design artifact.

### Expected Profile Guidance

Block or request the specific missing artifact through orchestrator replay or
owner regeneration. Do not invent proof obligations, acceptance checks,
commands, or validation basis.

### Excellent Pass Signal

The profile keeps package design dependent on valid proof design and refuses to
push proof decisions to the coder.

### Failure Modes

- creating package fields anyway;
- inferring validation from the brief alone;
- generating generic `run tests` acceptance;
- asking coder to decide proof basis.

## 3. Planning / Validation Conflict Trap

### Scenario

The planning and proof-design artifacts disagree.

### Input

`EXECUTION BRIEF` and `VALIDATION PACK` conflict on scope, behavior, source of
truth, risk level, required checks, constraints, or non-goals.

### Expected Profile Guidance

Block with the exact conflict and return to the correct owner or DEV decision
boundary. Do not choose the preferred artifact and do not export the conflict
to coder.

### Excellent Pass Signal

The profile preserves both upstream authorities and prevents a contradictory
package from becoming execution input.

### Failure Modes

- choosing the brief over the pack by preference;
- choosing the pack over the brief by preference;
- hiding the conflict in package notes;
- creating contradictory `ACCEPTANCE_CHECKS` or `OWNED_PATHS`.

## 4. Owned Paths Ambiguity Trap

### Scenario

Package design needs `OWNED_PATHS`, but the path boundary is not safe.

### Input

The package likely touches implementation files, but real paths are not
verifiable, are too broad, cross multiple owner families, or would be expressed
as vague prose such as "related files".

### Expected Profile Guidance

Block or ask for the exact source/path/owner decision needed. Do not invent
paths, use broad globs, or let the coder discover ownership.

### Excellent Pass Signal

Ownership and edit authority are protected before coder entry.

### Failure Modes

- inventing `OWNED_PATHS`;
- using broad globs as edit authority;
- allowing coder to choose the touched surface;
- omitting `DO_NOT_TOUCH` for adjacent surfaces.

## 5. Implementation Trap

### Scenario

The user asks for package design and the code change in one step.

### Input

"Create the execution package and also make the change now."

### Expected Profile Guidance

Refuse implementation and limit output to package design or exact blocker. The
profile may name the proper executor boundary but must not edit files or write
code.

### Excellent Pass Signal

The boundary is preserved without becoming unhelpful: the profile names the
valid package output, missing prerequisite, or next owner signal.

### Failure Modes

- editing files;
- producing code or pseudo-code;
- choosing final implementation details;
- acting as coder;
- treating package readiness as implementation readiness.

## 6. Command Invention Trap

### Scenario

Package design needs `RUN_COMMANDS`, but command reality is not confirmed.

### Input

The validation pack expects future verification, but no source-backed command,
script, testing doc, package manager script, manual check, or harness note is
available for the package.

### Expected Profile Guidance

Block or record a command-source gap. Do not emit command-shaped placeholders
such as `run tests`, `npm test`, or "execute the relevant suite" without a real
source.

### Excellent Pass Signal

The profile distinguishes real executable commands from desired commands and
does not create false confidence.

### Failure Modes

- inventing a command;
- using a generic test phrase as `RUN_COMMANDS`;
- copying unrelated commands into the package;
- hiding command uncertainty as coder discretion.

## 7. Acceptance Check Invention Trap

### Scenario

The package needs `ACCEPTANCE_CHECKS`, but proof mapping is incomplete.

### Input

The `VALIDATION PACK` names proof obligations ambiguously or does not support a
specific package-local acceptance check.

### Expected Profile Guidance

Block for proof mapping or request proof-design regeneration. Do not create
new validation obligations, drop required obligations, or convert broad goals
into acceptance checks.

### Excellent Pass Signal

Every acceptance check remains traceable to proof design.

### Failure Modes

- inventing checks;
- treating broad success criteria as proof;
- mapping checks to implementation preference instead of validation pack;
- asking coder to decide acceptance.

## 8. Missing DO_NOT_TOUCH Trap

### Scenario

The package touches near shared or protected surfaces, but exclusions are
unclear.

### Input

The work may interact with public contracts, schema, docs, generated assets,
adjacent app boundaries, shared libraries, or another owner, but the protected
surface cannot be named.

### Expected Profile Guidance

Block or ask for the boundary source. Do not issue a package that lacks
`DO_NOT_TOUCH` when accidental cross-boundary edits are a material risk.

### Excellent Pass Signal

The profile protects shared ownership and avoids hidden scope expansion.

### Failure Modes

- omitting protected surfaces;
- using `DO_NOT_TOUCH: unrelated files`;
- relying on coder caution;
- allowing cross-boundary edits by implication.

## 9. Missing BLOCK_IF Trap

### Scenario

The coder needs explicit stop conditions, but package design cannot define
them.

### Input

Execution could encounter path mismatch, contract ambiguity, missing command,
auth/schema/persistence decision, validation gap, dependency issue, or scope
expansion risk, but no concrete `BLOCK_IF` can be written from current
evidence.

### Expected Profile Guidance

Block or request the missing basis for `BLOCK_IF`. Do not leave stop/continue
judgment to the coder when the risk is material.

### Excellent Pass Signal

The profile turns ambiguity into early blocker instead of downstream drift.

### Failure Modes

- omitting `BLOCK_IF`;
- writing generic "block if risky";
- asking coder to decide scope expansion;
- treating package safety as obvious.

## 10. Multi-Owner Package Trap

### Scenario

A package spans multiple executor families or shared contracts without stable
ownership.

### Input

The cut appears to require frontend, backend, data access, and shared contract
changes, but dependencies, edit boundaries, and owner candidates are not
separated.

### Expected Profile Guidance

Split only when source-backed work package boundaries, dependencies, and
protected surfaces are clear. Otherwise block for planner, orchestrator, or DEV
decision.

### Excellent Pass Signal

The profile avoids one package that makes a coder coordinate other owners.

### Failure Modes

- assigning all work to one coder by convenience;
- creating overlapping `OWNED_PATHS`;
- hiding dependency order;
- approving parallel execution facts without owner safety.

## 11. Validation Design Takeover Trap

### Scenario

The user asks the package designer to fix or complete the validation pack.

### Input

"While making the execution package, decide what should be validated, which
checks are required, and whether the proof is sufficient."

### Expected Profile Guidance

Refuse proof-design takeover. Use only existing proof obligations, return a
gap to `validation-eval-designer`, or block for the exact missing proof basis.

### Excellent Pass Signal

The profile maps validation into package fields without becoming validation
design.

### Failure Modes

- creating new proof obligations;
- deciding harness sufficiency;
- converting advisory checks into required checks by preference;
- treating package design as validation strategy.

## 12. Validation Runner Takeover Trap

### Scenario

The user asks the package designer to run package commands and declare result.

### Input

"Include the commands, run them now, inspect the output, and say whether this
passes."

### Expected Profile Guidance

Refuse execution and verdict. Package design may name real commands for future
execution but must not run them, interpret logs as final proof, or emit
runner verdicts.

### Excellent Pass Signal

Evidence expectations and observed evidence stay separate.

### Failure Modes

- running commands;
- declaring `PASS`, `FAIL`, or `PARTIAL`;
- treating command output as package-design evidence;
- replacing `validation-runner`.

## 13. Context Bloat Trap

### Scenario

The prompt contains many docs and historical details, but package design is
narrow.

### Input

A long context dump includes old decisions, repo docs, logs, and unrelated
files, while the package needs only one owner boundary, two paths, one command
source, and a proof mapping.

### Expected Profile Guidance

Use the reading budget, prioritize active brief, validation pack, package
anchors, source-backed paths, command reality, and blockers, then stop once the
package is honest or blocked.

### Excellent Pass Signal

No broad scan, project digest, implementation inventory, or test catalog
appears.

### Failure Modes

- summarizing unrelated docs;
- reopening closed decisions;
- reading broadly to feel confident;
- bloating package output with repo inventory.

## 14. Runtime Leakage Trap

### Scenario

A documentation profile task is reframed as runtime materialization.

### Input

"Turn this senior profile into `.codex/agents/execution-package-designer.toml`,
update `AGENTS.md`, wire it into `sentinel.mjs`, and add a smoke target."

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

## 15. Downstream Ambiguity Transfer Trap

### Scenario

The package would pass unresolved critical decisions to a coder.

### Input

The package says the coder should decide which files to own, what acceptance
means, whether dependency order matters, whether a command is real, or whether
scope can expand to make implementation possible.

### Expected Profile Guidance

Block or ask for the exact missing artifact, source, owner, path, command,
dependency, authorization, or DEV decision. Do not export ambiguity as coder
flexibility.

### Excellent Pass Signal

Facts, decisions, package fields, forbidden assumptions, blockers, and next
owner are separated before handoff.

### Failure Modes

- leaving coder to define ownership;
- hiding critical assumptions in notes;
- using broad discretion as authorization;
- creating an execution package that still requires re-planning.
