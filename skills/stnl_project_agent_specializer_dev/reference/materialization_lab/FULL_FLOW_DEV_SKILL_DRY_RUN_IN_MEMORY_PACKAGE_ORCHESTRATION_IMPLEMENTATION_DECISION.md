# Full-Flow Dev-Skill Dry-Run In-Memory Package Orchestration Implementation Decision

Status: documentary/dev-only/decision-only artifact.

This document decides whether the dev skill is mature enough for a future
dev-only, dry-run-only, in-memory-only, no-write package-level orchestration
implementation phase. It does not implement code, create scripts, alter scripts,
create a checker, alter the Validation Harness Aggregator, alter contracts,
alter templates, alter fixtures, touch the productive skill, access a real
Target, persist output, write GitHub, create a commit, create a branch, or open
a pull request.

## 1. Verdict

The project is mature enough to proceed to a future, separately requested
implementation phase for a thin package-level orchestration layer, provided that
all gates in this decision remain binding and the future phase stays dev-only,
dry-run-only, in-memory-only, and no-write.

Recommended decision:

`OPTION_C_NEW_THIN_PACKAGE_LEVEL_MODULE`

This recommendation aligns with the previously audited
`OPTION_C_THIN_PACKAGE_LEVEL_ORCHESTRATION_LAYER`, while narrowing the future
implementation shape to a small package-level module under
`scripts/materialization_lab/` only if that new file is explicitly requested in
the later phase.

MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_DECISION: READY

## 2. Executive Summary

This phase is documentary. It exists after the successful audit of the
package-orchestration implementation plan and decides whether a later
implementation phase is safe enough to consider.

This phase does not implement package orchestration. It changes no files other
than this decision document. It does not alter scripts, tests, contracts,
fixtures, templates, kernels, Senior Profiles, the Aggregator, the manifest, the
README, `SKILL.md`, `openai.yaml`, generated output, materialized output, cache,
snapshot, temp output, GitHub state, or the productive skill.

The recommended option is `OPTION_C_NEW_THIN_PACKAGE_LEVEL_MODULE`: a future
small dev-only package-level module, separate from the existing composer, that
would assemble one integrated in-memory package result for all 12 canonical
agents and both canonical targets. This is preferred because it keeps the
current composer as a component and precedent instead of turning it into a
runtime materializer or package runtime.

The preserved limits are:

- dev-only;
- dry-run-only;
- in-memory-only;
- no-write;
- no real Target;
- no persisted or materialized output;
- no GitHub write;
- no productive skill read, use, or mutation;
- no checker;
- no Aggregator change;
- no tenth official check;
- no agent-by-agent materialization.

## 3. Scope

Allowed scope for this phase:

- create only
  `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_DECISION.md`;
- decide whether the future package-level implementation path is mature enough;
- compare macro technical options;
- define future gates, file boundaries, risks, and deferred decisions;
- use only context inside `stnl_project_agent_specializer_dev`;
- ignore `__MACOSX` and `.DS_Store`.

Forbidden scope for this phase:

- implement package orchestration;
- create scripts;
- alter scripts;
- create a package-level module;
- create a checker;
- create a tenth check;
- alter the Validation Harness Aggregator;
- alter contracts;
- alter fixtures;
- alter templates;
- alter kernels;
- alter Senior Profiles;
- alter README, MANIFEST, `SKILL.md`, or `openai.yaml`;
- access a real Target;
- generate or persist output;
- write GitHub;
- create a commit, branch, or pull request;
- read, use as source, or mutate the productive skill at
  `skills/stnl_project_agent_specializer/`.

File created by this phase:

- `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_DECISION.md`

Files not altered by this phase:

- all scripts;
- all tests;
- all contracts;
- all fixtures;
- all templates;
- all kernels;
- all Senior Profiles;
- README;
- MANIFEST;
- `SKILL.md`;
- `openai.yaml`;
- Aggregator;
- productive skill files.

The productive skill remains outside scope.

## 4. Current State

The current state is mature enough for a future implementation phase only
because the prior phases established a narrow, audited boundary:

- the package orchestration implementation plan exists;
- the package orchestration implementation plan audit is treated as
  `EXCELLENT PASS`;
- the current composer exists as a dev-only, dry-run-only, in-memory-only,
  no-write component;
- the composer remains outside the Aggregator;
- the composer is not a checker;
- the Aggregator remains closed;
- the official materialization-lab gate remains exactly 9 checks;
- the full-flow is one integrated package of 12 canonical agents, not 12
  independent agent executions;
- `reference/agents/` may exist only as historical/dev-only parity baseline and
  is not a final source;
- no authorization exists in this phase for real implementation, real Target
  access, output persistence, GitHub write, productive skill work, checker
  creation, Aggregator change, or a tenth official check.

The 12 canonical agents remain:

1. `orchestrator`
2. `planner`
3. `validation-eval-designer`
4. `execution-package-designer`
5. `designer`
6. `coder-frontend`
7. `coder-backend`
8. `coder-ios`
9. `validation-runner`
10. `reviewer`
11. `finalizer`
12. `resync`

The minimum conceptual package matrix remains:

| Matrix | Required package coverage |
| --- | --- |
| `12 x copilot` | one conceptual `.github/agents/*.agent.md` planned artifact per canonical agent |
| `12 x codex` | one conceptual `.codex/agents/*.toml` planned artifact per canonical agent |
| Codex target-level config | one conceptual `.codex/config.toml` planned artifact |
| Codex root instructions | one conceptual `AGENTS.md` planned artifact |

`.codex/config.toml` and `AGENTS.md` are target-level conceptual artifacts, not
extra agents.

The closed official Aggregator child checks remain exactly:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

The Aggregator wrapper may coordinate these checks, but it is not a tenth child
check.

## 5. Decision Options

| Option | Description | Benefits | Risks | Decision | Justification |
| --- | --- | --- | --- | --- | --- |
| Option A - No implementation yet | Keep only documentation and planning. Do not proceed to an implementation phase. | Maximum immediate boundary safety; no code surface; no Aggregator risk; lowest cost. | Stagnates the full-flow validation path; leaves the audited package plan untested as a package shape; delays practical evidence. | Not recommended. | The audited plan is mature enough for a later constrained implementation phase. Blocking all movement is safer in the narrowest sense, but weaker strategically. |
| Option B - Conservative composer extension | Later add minimal package-level behavior to the existing composer. | Reuses existing functions, no-write evidence vocabulary, and current test patterns; avoids a new file. | Blurs composer responsibility; may turn the composer into a package runtime; increases coupling; can pressure existing composer tests into broader orchestration coverage. | Fallback only. | Safe only if the future phase proves the composer can remain a component. It is less clear than a separate thin layer. |
| Option C - New thin package-level module | Later create a small in-memory module under `scripts/materialization_lab/` for package-level orchestration. | Clean separation of responsibilities; aligns with `OPTION_C_THIN_PACKAGE_LEVEL_ORCHESTRATION_LAYER`; represents the integrated 12-agent package directly; easier to audit and test as no-write; preserves the composer as precedent/component. | Requires explicit later permission for a new file; could drift into runtime entrypoint, loader, scenario selector, or materializer if gates weaken; adds new surface that must stay small. | Recommended. | Best balance of package-level clarity, boundary safety, auditability, and future local in-memory testability without touching official validation. |
| Option D - Hybrid minimum | Preserve the composer almost intact and add only an extremely thin package coordinator. | Balances reuse and separation; can avoid over-expanding the composer; may minimize code volume. | Responsibility boundary can become ambiguous; wrapper could quietly become runtime; harder to explain whether package behavior lives in the composer or coordinator. | Acceptable only if Option C is narrowed further. | It is close to Option C, but weaker because hybrid ownership makes future review and failure attribution less clear. |
| Option E - Official checker/Aggregator path | Implement the package flow as an official checker or expand the Aggregator. | Would eventually make package orchestration visible in official validation. | Creates or approaches a tenth check; changes Aggregator behavior; promotes an immature dev-only flow too early; conflicts with the closed 9-check boundary. | Blocked now. | Any checker, official validation path, or Aggregator expansion must be a separate future decision. |

## 6. Decision Matrix

Qualitative values mean:

- `Strong`: the option satisfies the criterion with low boundary risk.
- `Medium`: the option can satisfy the criterion with tight constraints.
- `Weak`: the option has meaningful drift or ambiguity risk.
- `Blocked`: the option violates a binding boundary for this phase.

| Criterion | Option A | Option B | Option C | Option D | Option E |
| --- | --- | --- | --- | --- | --- |
| Boundary safety | Strong | Medium | Strong | Medium | Blocked |
| Dev-only adherence | Strong | Medium | Strong | Strong | Weak |
| Dry-run-only adherence | Strong | Medium | Strong | Strong | Weak |
| In-memory-only adherence | Strong | Medium | Strong | Strong | Weak |
| No-write adherence | Strong | Medium | Strong | Strong | Weak |
| Full-flow integrated preservation | Weak | Medium | Strong | Strong | Medium |
| Agent-by-agent materialization resistance | Medium | Medium | Strong | Medium | Medium |
| Real Target risk control | Strong | Medium | Strong | Strong | Weak |
| Persisted/materialized output risk control | Strong | Medium | Strong | Strong | Weak |
| GitHub write risk control | Strong | Strong | Strong | Strong | Weak |
| Productive skill risk control | Strong | Medium | Strong | Strong | Weak |
| Runtime materializer drift resistance | Strong | Weak | Strong | Medium | Weak |
| Runtime entrypoint drift resistance | Strong | Medium | Strong | Medium | Weak |
| Loader/scenario selector drift resistance | Strong | Medium | Strong | Medium | Weak |
| Checker/Aggregator child resistance | Strong | Strong | Strong | Strong | Blocked |
| Tenth check resistance | Strong | Strong | Strong | Strong | Blocked |
| Responsibility clarity | Medium | Weak | Strong | Medium | Weak |
| Future implementation effort | Strong | Medium | Medium | Medium | Weak |
| Auditability | Strong | Medium | Strong | Medium | Weak |
| Local read-only/in-memory testability | Weak | Medium | Strong | Strong | Medium |
| Strategic controlled-validation fit | Weak | Medium | Strong | Strong | Weak |

## 7. Recommended Decision

Recommended option:

`OPTION_C_NEW_THIN_PACKAGE_LEVEL_MODULE`

This option is superior because the problem is package-level, not
single-composition-level. The existing composer should remain a dev-only,
in-memory, dry-run-only component and precedent. A separate thin package module
can represent the integrated 12-agent package, both target matrices, target-level
Codex artifacts, final source roots, explicit templates, no-write evidence,
non-authorization evidence, and blockers without overloading the composer.

What this decision permits in a future phase:

- a separately requested implementation phase;
- a small package-level in-memory orchestration module under
  `scripts/materialization_lab/`, if explicitly requested then;
- reuse of the current composer only as component or precedent;
- package-level in-memory result assembly;
- local read-only/in-memory tests scoped to that future phase;
- package-level blockers for unsafe signals;
- no-write evidence and non-authorization evidence.

What this decision does not permit:

- implementation in this phase;
- script changes in this phase;
- checker creation;
- Aggregator changes;
- a tenth official check;
- real Target access;
- target filesystem reads, stats, listings, drift checks, or writes;
- output persistence;
- generated output;
- materialized output;
- GitHub write;
- commit, branch, or pull request;
- productive skill read, use as source, or mutation;
- runtime materializer behavior;
- productive runtime entrypoint behavior.

If the later implementation phase cannot preserve these boundaries, it should
stop and produce a separate decision rather than continue.

## 8. Future Implementation Boundary

The eventual next implementation phase may implement a package-level in-memory
layer only if explicitly requested. That layer must remain:

- dev-only;
- dry-run-only;
- in-memory-only;
- no-write;
- outside the Aggregator;
- outside official checks;
- package-level, not agent-by-agent;
- conceptual, not Target-aware;
- local/read-only in its own validation behavior.

The future phase must not authorize:

- runtime materializer;
- writer;
- productive renderer;
- real loader;
- real scenario selector;
- real Target Adapter;
- real Write Approval path;
- approval token;
- approval registry;
- persistent report;
- generated output;
- materialized output;
- GitHub write;
- productive skill mutation;
- checker;
- Aggregator change;
- tenth check.

The future package-level result must be an in-memory conceptual object only. It
must not become a CLI contract, stdout contract, persisted report, generated
artifact, materialized artifact, or real project operation.

## 9. Minimum Safe Future Scope

The minimum safe scope for the next implementation phase is one package-level
in-memory orchestration layer that can produce a single package result for the
complete dev skill flow.

Required package coverage:

- all 12 canonical agents together;
- target matrix `12 x copilot`;
- target matrix `12 x codex`;
- conceptual `.codex/config.toml`;
- conceptual `AGENTS.md`;
- package-level pass-or-block behavior;
- no partial package success;
- no agent-by-agent materialization.

Required final source roots:

- `reference/kernel_lab/`;
- `reference/seniorization_lab/`;
- `reference/templates/`;
- `reference/materialization_lab/contracts/`.

Required source exclusions:

- `reference/agents/` must not become a final source;
- productive skill files must not be read or used as fallback source;
- templates must be explicit;
- template inference must be absent.

Required future evidence:

- package-level result in memory;
- no-write evidence;
- non-authorization evidence;
- unsafe signal blockers;
- matrix completeness blockers;
- target-level Codex artifact separation;
- no real Target evidence;
- no output persistence evidence;
- no GitHub write evidence;
- Aggregator unchanged evidence;
- official check count still 9 evidence.

The current composer may be referenced only as component, precedent, or provider
of already-established no-write patterns. It must not become the package runtime,
runtime materializer, official checker, Aggregator child, writer, renderer, real
loader, real scenario selector, or Target adapter.

## 10. Files Potentially In Scope Later

If a later phase explicitly requests implementation, the minimal file scope could
include:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`;
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`;
- a possible new thin package-level in-memory module under
  `scripts/materialization_lab/`.

This decision recommends the new module direction, but it does not create or
authorize creation now. The later phase must name the file and keep it small,
dev-only, dry-run-only, in-memory-only, no-write, non-Target, non-GitHub, and
outside the Aggregator.

No checker is in scope through this decision.

## 11. Files Out of Scope

The following remain out of scope:

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
- `reference/agents/**` as final source;
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
- GitHub artifacts;
- commit;
- branch;
- pull request.

## 12. Required Gates Before Future Implementation

All gates below must pass before any future implementation work:

- a later phase explicitly requests implementation;
- this decision is audited successfully;
- dev-only is confirmed;
- dry-run-only is confirmed;
- in-memory-only is confirmed;
- no-write is confirmed;
- no real Target is present;
- no Target path argument is accepted;
- no host absolute path is accepted;
- no target read/stat/list/drift/write is attempted;
- no output persistence is introduced;
- no generated output is introduced;
- no materialized output is introduced;
- no GitHub write is introduced;
- no commit, branch, or PR action is introduced;
- no productive skill is read, used, or mutated;
- Aggregator remains closed;
- official check count remains 9;
- no checker is created;
- no tenth check is created;
- full-flow remains one integrated package;
- all 12 canonical agents are present;
- `copilot` and `codex` are present;
- conceptual `.codex/config.toml` is present;
- conceptual `AGENTS.md` is present;
- `reference/agents/` does not become final source;
- templates are explicit;
- template inference is absent;
- no-write evidence is present;
- non-authorization evidence is present;
- gaps in contracts become future decisions.

## 13. Anti-Patterns

The following are blocked anti-patterns:

- agent by agent;
- 12 microphases;
- isolated fixture as primary proof;
- partial result as package success;
- one-template-at-a-time success;
- one-fixture-at-a-time success;
- template inference;
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
- checker creation;
- Aggregator expansion;
- tenth official check;
- converting the composer into runtime materializer;
- converting package orchestration into a productive runtime entrypoint;
- converting this plan or decision into implementation;
- touching the productive skill;
- using `reference/agents/` as final source;
- GitHub write;
- commit, branch, or pull request automation.

Any of these signals must block a future package result or require a separate
future decision before work continues.

## 14. Deferred Decisions

The following decisions are deferred and must not be resolved here:

- final name of the eventual package-level module;
- separate module versus composer extension;
- final function names;
- final internal payload shapes;
- exact test strategy;
- where future tests should live;
- eventual implementation result document;
- eventual implementation audit artifact;
- policy for controlled validation in personal or study projects;
- read-only project context policy;
- any contract change;
- any template change;
- any fixture change;
- output/report policy;
- official validation path;
- checker creation;
- Aggregator expansion.

## 15. Expected Next Phase

If work continues, the likely next phase is:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION`

That phase would be the first phase that could implement code, but only if
explicitly requested and only under the boundaries in this decision. It must
continue to forbid:

- real Target;
- persisted or materialized output;
- GitHub write;
- productive skill work;
- checker creation;
- Aggregator change;
- tenth check;
- runtime materializer;
- writer;
- productive renderer;
- real loader;
- real scenario selector;
- real Target Adapter;
- real Write Approval path;
- approval token;
- approval registry;
- persistent report;
- commit;
- branch;
- pull request.

This document does not generate the prompt for that phase.

## 16. Final Status

Recommended decision:

`OPTION_C_NEW_THIN_PACKAGE_LEVEL_MODULE`

Next likely phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION`

Preserved boundaries:

- no implementation in this phase;
- no scripts changed;
- no checker;
- no Aggregator change;
- no tenth official check;
- no real Target;
- no persisted or materialized output;
- no GitHub write;
- no commit, branch, or pull request;
- no productive skill.

MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_DECISION: READY
