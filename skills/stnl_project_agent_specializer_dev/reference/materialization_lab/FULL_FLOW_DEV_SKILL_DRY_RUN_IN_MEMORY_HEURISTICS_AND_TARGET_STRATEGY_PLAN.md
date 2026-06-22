# Full-Flow Dev-Skill Dry-Run In-Memory Heuristics And Target Strategy Plan

## Status

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_HEURISTICS_AND_TARGET_STRATEGY_DOCUMENTARY_PLAN: READY`

This document is documentation-only, dev-only, reference-only, non-runtime,
non-CLI, non-schema, non-checker, non-Aggregator child, non-authorizing,
no-write, no Target real, no GitHub, outside the productive skill, and not a
materialization-readiness audit.

It consolidates macro heuristics and target strategy before any broad
materialization-readiness audit.

## Scope

This plan is limited to the dev skill materialization lab and describes future
heuristics for the already validated in-memory package flow:

```text
package orchestrator -> review layer -> package dry-run materializer
```

It covers only documentary strategy for:

- global materialization heuristics;
- Copilot target strategy;
- Codex target strategy;
- agent-level artifacts;
- target-level artifacts;
- anti-bloat and deduplication;
- ownership and managed-artifact boundaries;
- conflict, overwrite, and idempotency strategy;
- prerequisites for future audits and sandbox/dev-only materialization.

## Non-goals

This document does not authorize or define:

- real materialization;
- real Target access;
- GitHub access;
- productive-skill access;
- renderer implementation;
- writer implementation;
- loader implementation;
- Target Adapter implementation;
- Write Approval implementation;
- runtime;
- CLI;
- official schema;
- stdout contract;
- persisted output outside this document;
- persisted report;
- patch or diff application;
- branch;
- commit;
- pull request;
- Aggregator change;
- new checker;
- tenth check.

## Current validated baseline

The last approved milestone is:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_INTEGRATION_EVIDENCE_DOCUMENTS_COHERENCE_AUDIT: EXCELLENT PASS`

The validated in-memory baseline confirms:

- one integrated package with exactly 12 canonical agents;
- conceptual `12 x copilot` matrix;
- conceptual `12 x codex` matrix;
- `.codex/config.toml` as a Codex target-level artifact;
- `AGENTS.md` as a Codex target-level artifact;
- `REVIEW_PASS` without materialization authorization;
- `DRY_RUN_PASS` without write authorization;
- no-write evidence;
- non-authorization evidence;
- absence of real Target access;
- absence of GitHub access;
- absence of productive-skill access;
- Aggregator closed at exactly 9 child checks.

The canonical agents remain exactly:

1. orchestrator
2. planner
3. validation-eval-designer
4. execution-package-designer
5. designer
6. coder-frontend
7. coder-backend
8. coder-ios
9. validation-runner
10. reviewer
11. finalizer
12. resync

## What current validation proves

The current validation proves that the dev-local in-memory pipeline can preserve
package completeness, target matrix shape, no-write evidence, and
non-authorization evidence across the current lab flow.

It proves that `.codex/config.toml` and `AGENTS.md` are target-level artifacts,
not agents, and cannot increase the canonical agent count above 12.

It also proves that pass-like verdicts remain non-operational:

- `REVIEW_PASS` does not authorize materialization.
- `DRY_RUN_PASS` does not authorize writing.
- No pass-like verdict authorizes real Target access, GitHub access,
  productive-skill access, or real materialization.

## What current validation does not prove

The current validation does not prove that a future renderer is correct, that a
writer is safe, that Target Adapter behavior is ready, or that Write Approval
exists.

It does not prove real target drift, managed notice parsing, overwrite safety,
idempotent writes, conflict resolution, target-root validation, symlink safety,
or final output content quality.

It does not prove that the current lab implementation should become final
architecture. The lab is evidence and prototyping only.

## Durable invariants

The following invariants must survive any future rewrite:

- package-level reasoning over exactly 12 canonical agents;
- no agent-by-agent materialization as primary proof;
- `12 x copilot` conceptual agent artifacts at
  `.github/agents/<agent>.agent.md`;
- `12 x codex` conceptual agent artifacts at `.codex/agents/<agent>.toml`;
- `.codex/config.toml` as target-level, not agent-level;
- `AGENTS.md` as target-level, not agent-level;
- explicit templates only:
  - `reference/templates/copilot/agent.md`;
  - `reference/templates/codex/agent.toml`;
  - `reference/templates/codex/config.toml`;
  - `reference/templates/codex/AGENTS.md`;
- no template inference from path shape, naming symmetry, target files, or the
  productive skill;
- no-write evidence remains mandatory;
- non-authorization evidence remains mandatory;
- missing, softened, renamed, contradictory, or positive authorization evidence
  blocks;
- Aggregator remains closed at exactly 9 child checks unless separately
  authorized in a future phase.

## Disposable lab implementation boundary

The current dev skill implementation is laboratory code, evidence, and
prototype scaffolding.

Future target-specific implementation may discard the current lab code if the
durable invariants remain preserved. The current local mappers, smoke scripts,
dry-run materializer implementation details, in-memory object shapes, and
string-level guardrails are not automatically final architecture.

The lab proves useful constraints. It does not mandate final renderer, writer,
loader, Target Adapter, Write Approval, runtime, CLI, schema, or stdout design.

## Global materialization heuristics

Future materialization strategy must separate four concerns before any output is
considered:

- instruction content: durable behavior guidance for an agent or target;
- routing content: target-specific activation, placement, and discovery rules;
- metadata: source references, template identity, target identity, artifact
  identity, and ownership markers;
- policy: write boundaries, managed-artifact rules, conflict behavior, and
  authorization requirements.

Global content should be centralized when it applies identically to all agents
or all targets. Agent-specific content should exist only when it materially
changes the behavior or responsibility of one canonical agent. Target-specific
content should exist only when the target format, file location, or consumer
semantics require it.

Minimum-content strategy:

- put shared policy once at target level when the target supports it;
- put only role-specific instructions in agent artifacts;
- avoid copying full global policy into all 12 agents;
- avoid using target-level artifacts as hidden extra agents;
- require explicit source and template provenance for every future artifact;
- fail closed when a source, template, placeholder, ownership state, or conflict
  is ambiguous.

## Copilot target strategy

Copilot strategy remains agent-artifact centered.

Expected conceptual shape:

- `.github/agents/<agent>.agent.md` for each of the 12 canonical agents.

Copilot agent artifacts should carry the minimum content needed for that
agent's role, routing expectations, and template/source provenance. Shared
global behavior should not be repeated across all 12 files unless the target has
no safe target-level equivalent and repetition is explicitly justified.

Copilot target strategy must block if:

- an agent is missing;
- an extra agent appears;
- an artifact path is not target-root-relative;
- a required template is missing or inferred;
- a target-level artifact is counted as an agent;
- a manual or unmanaged collision would be overwritten.

## Codex target strategy

Codex strategy has both agent-level and target-level artifacts.

Expected conceptual shapes:

- `.codex/agents/<agent>.toml` for each of the 12 canonical agents;
- `.codex/config.toml` as a target-level artifact;
- `AGENTS.md` as a target-level artifact.

`.codex/config.toml` should hold target-level configuration and routing that
belongs to the Codex target, not per-agent behavioral duplication.

`AGENTS.md` should hold target-level root instructions that apply across the
Codex target. It must not become a thirteenth agent or a dumping ground for
content that belongs in explicit agent artifacts.

Codex strategy must prevent duplication between:

- `.codex/config.toml` and `.codex/agents/*.toml`;
- `AGENTS.md` and `.codex/agents/*.toml`;
- `.codex/config.toml` and `AGENTS.md`.

## Agent-level artifact strategy

Agent-level artifacts belong to one canonical agent and one target family.

They should contain:

- agent identity;
- target identity;
- role-specific instruction content;
- routing metadata needed by that target;
- source/template provenance;
- managed-artifact notice in future materialized form;
- no unrelated target-level policy unless required by the target format.

They should not contain:

- full duplicated global policy;
- target-wide configuration;
- unrelated agent instructions;
- content copied from a productive skill;
- inferred templates;
- write authorization language.

## Target-level artifact strategy

Target-level artifacts belong to the target as a whole.

For the current canonical model, target-level artifacts are:

- `.codex/config.toml`;
- `AGENTS.md`.

They may coordinate target-level behavior, root instructions, discovery, or
shared policy. They must not be counted in the 12-agent canonical matrix and
must not create hidden agent identities.

Future target-level artifacts require separate documentary authorization before
being added to the canonical model.

## Anti-bloat and deduplication strategy

Future materialization must prefer one authoritative location per concern.

Deduplication rules:

- global behavior belongs in target-level artifacts when the target supports it;
- repeated per-agent content must be justified by target format needs;
- agent artifacts should reference their role and source identity without
  embedding every shared rule;
- target-level Codex artifacts must not both carry the same policy unless one is
  a concise pointer and the other is the authoritative location;
- template output must be reviewed for repeated boilerplate across all 12
  agents before any readiness audit;
- bloat prevention is a quality gate, not an after-the-fact cleanup.

## Ownership and managed artifact strategy

Future materialized artifacts must have declarative ownership.

A managed artifact is governed by a valid Sentinel managed notice that ties the
artifact to an explicit template, target, and source model. Managed status must
not be inferred from path shape alone.

Ownership states should be treated conceptually as:

- planned managed artifact;
- existing valid managed artifact;
- existing unmanaged/manual artifact;
- existing artifact with invalid, ambiguous, contradictory, or unverifiable
  managed notice;
- absent artifact.

Only valid managed artifacts may be candidates for automatic future update, and
only inside a separately authorized write phase.

## Conflict and overwrite strategy

Future behavior must fail closed on unsafe conflict.

Expected conflict handling:

- absent artifact may become `CREATE_PLANNED` in a dry-run plan;
- existing valid managed artifact that differs may become `UPDATE_PLANNED`;
- existing valid managed artifact that matches may become `UNCHANGED_PLANNED`;
- unmanaged collision must become `BLOCKED_PLANNED`;
- invalid managed notice must become `BLOCKED_PLANNED`;
- ambiguous ownership must become `BLOCKED_PLANNED`;
- overwrite without valid managed ownership and explicit approval remains
  blocked.

No future pass-like verdict may convert conflict into permission to overwrite.

## Idempotency strategy

Future idempotency must mean that the same explicit inputs produce the same
planned artifact inventory and the same rendered content decisions, without
creating churn.

Before any write-capable phase exists, idempotency must be proven conceptually
or by future snapshots/golden output in a separately authorized validation
phase.

Expected idempotency criteria:

- stable canonical agent ordering;
- stable target artifact ordering;
- stable target-root-relative paths;
- stable template selection;
- stable source provenance;
- stable managed notice content;
- no timestamp, machine path, environment, or Target-real leakage in generated
  content;
- repeated dry-run over unchanged inputs yields `UNCHANGED_PLANNED` semantics.

## Future renderer boundaries

A future renderer may be considered only after target strategy and content
placement are stable.

Renderer planning must remain separate from writer behavior. A renderer may
produce renderable content in memory, but that would still not imply Target
access, file creation, overwrite permission, GitHub access, or productive-skill
access.

Renderer readiness must require explicit templates, explicit placeholders,
source coverage, target strategy, anti-bloat review, and conflict-safe dry-run
planning.

## Future Target Adapter boundaries

A future Target Adapter may be considered only after target-root strategy,
path-safety expectations, managed-artifact rules, and conflict behavior are
documented and audited.

Target Adapter responsibility should be limited to target boundary concerns,
such as safe target-root-relative path interpretation and existing artifact
state modeling in a separately authorized phase.

It must not own rendering, writing, approval, policy invention, template
selection, or GitHub behavior.

## Future Write Approval boundaries

A future Write Approval mechanism must be a separate authorization surface.

It must not be inferred from:

- `REVIEW_PASS`;
- `DRY_RUN_PASS`;
- Aggregator pass;
- snapshot pass;
- golden output pass;
- lack of blockers;
- managed notice presence;
- target strategy approval.

Write Approval, if ever authorized, must be explicit, narrow, auditable, and
downstream of dry-run review. This document does not design or implement it.

## Future sandbox/dev-only materialization prerequisites

Before any dev-only/sandbox materialization is discussed, the project should
have:

- this heuristics and target strategy plan reviewed;
- explicit decision that sandbox materialization remains outside real Target,
  GitHub, and productive skill;
- renderer boundary documented separately;
- Target Adapter boundary documented separately;
- Write Approval boundary documented separately;
- conflict and overwrite policy audited;
- managed artifact notice strategy audited;
- idempotency expectations audited;
- snapshot or golden-output validation plan authorized separately;
- no ambiguity between target-root-relative conceptual paths and real Target
  paths;
- explicit denial that sandbox success authorizes real materialization.

## Readiness audit prerequisites

A broad materialization-readiness audit should not occur until the following
documentary prerequisites exist:

- approved target strategy for Copilot and Codex;
- approved separation of agent-level and target-level artifacts;
- approved anti-bloat and deduplication strategy;
- approved ownership and managed-artifact strategy;
- approved conflict and overwrite strategy;
- approved idempotency strategy;
- explicit list of durable invariants versus disposable lab implementation;
- explicit boundaries for future renderer, Target Adapter, and Write Approval;
- explicit decision that Aggregator remains at exactly 9 child checks unless a
  separate phase authorizes otherwise.

## Explicitly blocked paths

The following paths remain blocked by this phase:

- real materialization;
- real Target;
- GitHub;
- productive skill;
- real renderer;
- writer;
- loader;
- Target Adapter implementation;
- Write Approval implementation;
- runtime;
- CLI;
- official schema;
- stdout contract;
- persisted output outside this document;
- persisted report;
- patch or diff;
- branch;
- commit;
- pull request;
- Aggregator change;
- new checker;
- tenth check;
- adding this document to the Aggregator;
- treating this document as a checker;
- treating this document as an Aggregator child.

## Recommended next phase

Recommended next phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_HEURISTICS_AND_TARGET_STRATEGY_DOCUMENTARY_PLAN_REVIEW`

The next phase should be read-only, documentation-only, dev-only, no-write,
non-runtime, non-CLI, non-schema, non-checker, non-Aggregator child,
non-authorizing, no Target real, no GitHub, no productive skill, and not a
materialization-readiness audit.

Its purpose should be to review this plan for coherence before any separate
readiness-audit planning.

## Blockers

No blocker is recorded in this documentary phase.

If future work finds that any required template is missing, ambiguous, or
inferred, the next phase must block instead of inventing template behavior.

## Warnings

The current lab implementation is intentionally disposable. Future work should
avoid promoting lab code shape, smoke mappers, or in-memory object structures
into final architecture without a separate design decision.

The current evidence is strong for pipeline, invariants, and safety boundaries,
but still insufficient for real materialization readiness.

The Aggregator is not changed by this phase. It remains closed at exactly 9
child checks. This document is not a checker, not a tenth check, and not an
Aggregator child.
