# Full-Flow Dev-Skill Dry-Run In-Memory Integration Implementation Decision

Status: documentary/dev-only/decision-only artifact.

This document decides whether the dev skill is mature enough to move toward a
future implementation plan for an integrated full-flow, dry-run-only,
in-memory-only package orchestration layer. It does not implement the flow,
create scripts, alter scripts, create a checker, alter the Validation Harness
Aggregator, alter contracts, alter templates, alter fixtures, touch the
productive skill, access a real Target, persist output, write GitHub, create a
commit, create a branch, or open a pull request.

## 1. Verdict

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_DECISION: READY`

Recommended decision:

`OPTION_C_THIN_PACKAGE_LEVEL_ORCHESTRATION_LAYER`

Recommended next phase, if separately requested:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_PLAN`

This verdict is decision-ready only. It does not authorize code changes, file
writes beyond this decision document, Target access, generated output,
materialized output, GitHub write, productive skill work, a checker, an
Aggregator change, or a tenth official check.

## 2. Executive Summary

This phase is documentary. It follows the audited implementation plan state and
answers whether a future dev-only/in-memory implementation path is mature
enough to plan at the package level.

The answer is yes, with a narrow boundary: the next useful step should be a
future implementation plan for a thin package-level orchestration layer over
the current dev-only in-memory composer. That future plan should define how to
represent the full 12-agent package, both canonical targets, explicit
templates, final source roots, no-write evidence, and non-authorization
evidence without creating a runtime materializer.

This document creates only:

- `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_DECISION.md`

It does not alter files beyond this document. The limits remain:

- dev-only;
- dry-run-only;
- in-memory-only;
- no-write;
- no real Target;
- no output persistence;
- no generated or materialized output;
- no GitHub write;
- no productive skill;
- no checker;
- no Aggregator change;
- no tenth official check;
- no agent-by-agent materialization.

## 3. Scope

Allowed scope for this phase:

- create this decision document only;
- analyze the already documented dev-skill materialization lab state;
- compare macro future implementation options;
- recommend the safest next phase shape;
- identify later candidate files without authorizing changes now;
- preserve all dry-run-only, in-memory-only, no-write boundaries.

Forbidden scope for this phase:

- implement full-flow integration;
- create scripts;
- alter scripts;
- create a checker;
- alter official checks;
- alter the Validation Harness Aggregator;
- add a tenth official check;
- alter contracts;
- alter fixtures;
- alter templates;
- alter kernels;
- alter Senior Agent Profiles;
- alter README, MANIFEST, `SKILL.md`, or `openai.yaml`;
- create generated output;
- create materialized output;
- create cache, snapshot, temp output, stdout capture, or persistent report;
- access, read, stat, list, write, repair, clean, or mutate a real Target;
- write GitHub;
- create a commit, branch, pull request, issue artifact, or release artifact;
- read, use as source, or mutate `skills/stnl_project_agent_specializer/`.

The productive skill remains outside scope. `__MACOSX` and `.DS_Store` are
ignored.

Files intentionally not altered:

- `scripts/materialization_lab/**`;
- `reference/materialization_lab/contracts/**`;
- `reference/materialization_lab/fixtures/**`;
- `reference/templates/**`;
- `reference/kernel_lab/**`;
- `reference/seniorization_lab/**`;
- `reference/agents/**`;
- `reference/MANIFEST.md`;
- `README.md`;
- `SKILL.md`;
- `openai.yaml`.

## 4. Current State

The current dev-skill state is mature enough for a future package-level
implementation plan, but not for implementation in this phase.

Established state:

- the dev-only in-memory composer exists;
- the composer is manual/local/dev-only;
- the composer is pure in-memory composition;
- the composer is dry-run-only and no-write;
- the composer remains outside the Aggregator;
- the composer is not a checker;
- the composer is not a renderer;
- the composer is not a writer;
- the composer is not a runtime materializer;
- the composer is not a Target Adapter;
- the composer is not an authorization-token issuer;
- the composer is not a persistent report generator;
- the implementation plan exists;
- the implementation plan audit is treated as `EXCELLENT PASS`;
- the Aggregator remains closed;
- the official materialization-lab gate remains exactly 9 checks;
- full-flow is defined as one integrated package of 12 agents, not 12
  separated efforts;
- no phase has granted implementation rights for this decision step.

Final source roots remain:

- `reference/kernel_lab/`;
- `reference/seniorization_lab/`;
- `reference/templates/`;
- `reference/materialization_lab/contracts/`.

`reference/agents/` may exist as historical/dev-only parity baseline only. It
must not become a final source.

The package matrix remains:

- 12 canonical agents x `copilot`;
- 12 canonical agents x `codex`;
- conceptual `.codex/config.toml`;
- conceptual `AGENTS.md`.

## 5. Decision Options

| Option | Description | Benefits | Risks | Decision | Justification |
| --- | --- | --- | --- | --- | --- |
| Option A - No implementation yet | Keep only documentation and planning; do not move toward implementation planning now. | Safest immediate boundary; no code risk; no Aggregator risk; lowest cost. | Stagnates the strategic full-flow validation path; does not convert audited planning into a testable package shape; leaves package orchestration unresolved. | Not recommended. | The current implementation plan and audit state are strong enough to decide the next planning step. Blocking all movement would be overly conservative. |
| Option B - Conservative composer extension | Later extend the current composer minimally to cover full-flow package evidence. | Reuses existing functions; preserves current no-write evidence vocabulary; low immediate conceptual cost. | Risks turning a single-request composer into a package runtime; increases coupling; may blur component responsibility; could pressure tests into package orchestration without a clear boundary. | Acceptable only as fallback. | Safe if tightly constrained, but less clean than a package layer because the composer already has a narrow composition role. |
| Option C - Thin package-level orchestration layer | Later plan a small in-memory package layer above the composer to represent the integrated 12-agent flow. | Best fit for package-level full-flow; separates orchestration from composition; keeps composer as component/precedent; preserves Aggregator boundary; easier to audit as no-write, no-target, no-output. | Could drift into runtime entrypoint, loader, scenario selector, or materializer if boundaries weaken; may require a future decision on whether a new file is acceptable. | Recommended. | It matches the strategic need: integrated package evidence without changing official gates or mutating the current composer into a runtime materializer. |
| Option D - Official validation/checker path | Later create a new checker or expand the Aggregator. | Would make the flow visible as an official gate eventually. | Creates or approaches a tenth check; alters Aggregator behavior; prematurely promotes an immature flow to official validation; conflicts with the closed Aggregator decision. | Blocked for now. | The project has repeatedly preserved the 9-check Aggregator. Official validation must remain a separate future decision. |

## 6. Decision Matrix

| Criterion | Option A | Option B | Option C | Option D |
| --- | --- | --- | --- | --- |
| Boundary safety | Strong | Medium | Strong | Blocked |
| Dev-only adherence | Strong | Strong | Strong | Medium |
| Dry-run-only adherence | Strong | Strong | Strong | Medium |
| In-memory-only adherence | Strong | Strong | Strong | Weak |
| No-write adherence | Strong | Strong | Strong | Weak |
| Full-flow integrated package preservation | Weak | Medium | Strong | Medium |
| Agent-by-agent materialization risk | Strong | Medium | Strong | Medium |
| Real Target risk | Strong | Medium | Strong | Weak |
| Persisted output risk | Strong | Medium | Strong | Weak |
| GitHub write risk | Strong | Strong | Strong | Weak |
| Productive skill risk | Strong | Strong | Strong | Weak |
| Runtime materializer risk | Strong | Medium | Medium | Weak |
| Checker/Aggregator child risk | Strong | Strong | Strong | Blocked |
| Future implementation effort | Strong | Medium | Medium | Weak |
| Auditability | Medium | Medium | Strong | Weak |
| Local read-only testability | Weak | Medium | Strong | Medium |
| Strategic validation alignment | Weak | Medium | Strong | Medium |

## 7. Recommended Decision

Recommended option:

`OPTION_C_THIN_PACKAGE_LEVEL_ORCHESTRATION_LAYER`

This option is superior because it treats full-flow as a package-level concern
instead of stretching the existing composer into a broader runtime shape. The
composer should remain a dev-only in-memory composition component and a
precedent for safety evidence. A future package layer can coordinate the 12
canonical agents, both canonical targets, target-level Codex artifacts,
explicit templates, source roots, no-write evidence, and non-authorization
evidence as one integrated result.

This recommendation allows a later phase to plan:

- a package identity;
- a package boundary;
- the 12-agent canonical matrix;
- the `12 x copilot` conceptual output matrix;
- the `12 x codex` conceptual output matrix;
- conceptual `.codex/config.toml`;
- conceptual `AGENTS.md`;
- source-chain summaries from allowed final roots;
- explicit template refs;
- conceptual render-context plan entries;
- conceptual target-output plan entries;
- package-level blocking;
- no-write evidence;
- non-authorization evidence.

This recommendation does not allow:

- implementation in this phase;
- code edits in this phase;
- script creation;
- checker creation;
- Aggregator changes;
- tenth official check;
- runtime materializer;
- writer;
- productive renderer;
- loader;
- scenario selector;
- real Target Adapter;
- real write authorization mechanism;
- approval token;
- approval registry;
- persistent report;
- generated output;
- materialized output;
- real Target access;
- GitHub write;
- productive skill mutation.

## 8. Future Implementation Boundary

The eventual next phase may only be an implementation plan for a package-level
in-memory orchestration layer. That plan must remain dev-only, dry-run-only,
in-memory-only, and no-write.

It may plan how a future package-level layer would hold:

- package-level identity and boundary metadata;
- explicit canonical agent list;
- target matrix entries;
- source refs from final source roots;
- explicit template refs;
- conceptual render-context refs;
- conceptual target-output refs;
- package blockers;
- no-write evidence;
- non-authorization evidence.

It must not authorize:

- runtime materializer;
- writer;
- renderer productive;
- loader real;
- scenario selector real;
- Target Adapter real;
- real write authorization mechanism;
- approval token;
- approval registry;
- persistent report;
- generated output;
- materialized output;
- GitHub write;
- productive skill mutation;
- Target real read/write;
- patch or diff application;
- commit;
- branch;
- pull request;
- checker;
- Aggregator change.

The composer remains a component/precedent for composition, safety evidence,
and blocking semantics. It must not become a runtime entrypoint or official
validation child.

## 9. Minimum Safe Future Scope

The minimum safe scope for the next phase is a plan for one package-level
orchestration boundary, not an implementation.

Required package scope:

- all 12 canonical agents together;
- canonical target matrix `12 x copilot`;
- canonical target matrix `12 x codex`;
- conceptual Codex artifact `.codex/config.toml`;
- conceptual Codex artifact `AGENTS.md`;
- package-level pass-or-block behavior;
- diagnostic rows allowed only inside one integrated result;
- no agent-by-agent phase split.

Required final sources:

- `reference/kernel_lab/`;
- `reference/seniorization_lab/`;
- `reference/templates/`;
- `reference/materialization_lab/contracts/`.

Required composer relationship:

- current composer as precedent/component only;
- no conversion of composer into runtime materializer;
- no conversion of composer test into official check;
- no Aggregator registration.

Required evidence:

- in-memory package result only;
- no-write evidence;
- non-authorization evidence;
- explicit template evidence;
- explicit final-source evidence;
- `reference/agents/` exclusion evidence;
- no Target real evidence;
- no output persistence evidence;
- no GitHub write evidence;
- no productive-skill evidence.

## 10. Files Potentially In Scope Later

No file below is authorized for change now. These are conservative candidates
only for a later phase if that phase explicitly scopes implementation work.

Potential existing files:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`;
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`.

Possible future new file:

- a small package-level in-memory orchestration module under
  `scripts/materialization_lab/`.

The possible new file is not authorized by this document. A later decision or
implementation plan must decide whether a separate package-level file is safer
than a conservative composer extension.

Potential later documentation files, only if separately requested:

- a future implementation document;
- a future implementation audit document.

No checker file is in scope later through this decision. Any checker or
Aggregator change requires a separate future decision.

## 11. Files Out of Scope

Out of scope in this phase and not authorized by this decision:

- `skills/stnl_project_agent_specializer/`;
- any productive skill file;
- Aggregator;
- official checks;
- contracts;
- fixtures;
- templates;
- kernels;
- Senior Profiles;
- README;
- MANIFEST;
- `SKILL.md`;
- `openai.yaml`;
- `reference/agents/` as final source;
- Target real;
- target-project `.github/**`;
- target-project `.codex/**`;
- target-project `AGENTS.md`;
- generated output;
- materialized output;
- snapshot;
- cache;
- temp output;
- stdout capture file;
- persistent report;
- GitHub artifact;
- commit;
- branch;
- pull request.

## 12. Required Gates Before Future Implementation

Before any future implementation work, all gates below must hold:

- a later phase explicitly requests implementation planning or implementation;
- this decision has passed a separate audit;
- the future scope remains dev-only;
- the future scope remains dry-run-only;
- the future scope remains in-memory-only;
- the future scope remains no-write;
- there is no real Target;
- there is no Target path argument;
- there is no host absolute path;
- there is no target read, stat, list, drift read, or write;
- there is no output persistence;
- there is no generated output;
- there is no materialized output;
- there is no GitHub write;
- there is no commit, branch, or pull request;
- there is no productive skill read-as-source or mutation;
- the Aggregator remains closed;
- the official check count remains 9;
- no checker is created;
- no tenth official check is created;
- full-flow remains one integrated package;
- all 12 canonical agents remain present;
- both `copilot` and `codex` target matrices remain present;
- `.codex/config.toml` remains conceptual only;
- `AGENTS.md` remains conceptual only;
- `reference/agents/` does not become a final source;
- templates are explicit;
- no template inference is used;
- no-write evidence is present;
- non-authorization evidence is present;
- contract gaps become separate future decisions.

## 13. Anti-Patterns

Blocked anti-patterns:

- agent-by-agent materialization;
- 12 microphases;
- one-template-at-a-time success;
- one-fixture-at-a-time success;
- fixture isolated as the primary proof;
- partial matrix as package success;
- template inference;
- fallback to nearby templates;
- fallback to historical snapshots;
- fallback to productive skill templates;
- `reference/agents/` as final source;
- deprecated base-agent source dependency;
- real Target path;
- host absolute path;
- target filesystem stat;
- target directory listing;
- target file content read;
- target drift calculation by filesystem access;
- stdout capture file;
- persistent report;
- cache output;
- snapshot output;
- temp output;
- generated output;
- materialized output;
- new checker;
- Aggregator expansion;
- tenth official check;
- converting the composer into runtime materializer;
- converting the composer test into official validation;
- converting a plan into implementation;
- touching the productive skill;
- GitHub write;
- commit, branch, or pull request automation.

## 14. Deferred Decisions

The following decisions are deferred and must not be resolved here:

- whether to create a separate package-level file;
- whether to extend the composer conservatively instead;
- exact package orchestration function names and shapes;
- exact test strategy for a future implementation;
- whether future tests should live only in the existing composer test file;
- whether a future implementation result document is needed;
- whether a future implementation audit artifact is needed;
- any policy for controlled validation in personal or study projects;
- any read-only project context policy;
- any future contract change;
- any future template change;
- any future fixture change;
- any future output/report policy;
- any future official validation path;
- any checker creation;
- any Aggregator expansion.

## 15. Expected Next Phase

If this decision is audited successfully and a later phase is explicitly
requested, the expected next phase is:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_PLAN`

That phase should be a plan for a package-level implementation boundary only.
It should not implement code. It should not create scripts. It should not
create a checker. It should not change the Aggregator. It should not create a
tenth official check. It should not touch the productive skill. It should not
access a real Target. It should not persist output. It should not write
GitHub.

## 16. Final Status

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_DECISION: READY`
