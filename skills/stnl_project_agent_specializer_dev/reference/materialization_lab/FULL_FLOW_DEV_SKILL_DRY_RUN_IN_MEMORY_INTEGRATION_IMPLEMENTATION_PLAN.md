# Full-Flow Dev-Skill Dry-Run In-Memory Integration Implementation Plan

Status: documentary/dev-only/implementation-plan-only artifact.

This document is a macro implementation plan for a possible later
full-flow dry-run/in-memory integration inside
`stnl_project_agent_specializer_dev`. It does not implement the full flow,
create scripts, alter scripts, create a checker, alter the Validation Harness
Aggregator, alter contracts, alter templates, alter fixtures, touch the
productive skill, access a real Target, write GitHub, create commits, create
branches, or open pull requests.

## 1. Verdict

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_PLAN: READY`

## 2. Executive Summary

This is a documentary implementation plan only. It describes how a future,
separately scoped implementation could evaluate the dev skill as a complete
package in a safe, local, qualitative, personal/study context.

The future implementation must remain:

- dev-only;
- dry-run-only;
- in-memory-only;
- no-write;
- no persistent report;
- no real Target read;
- no real Target write;
- no GitHub write;
- no productive-skill mutation.

The plan does not build the full-flow capability now. It only defines a safe
shape for a later implementation phase that could compose source evidence,
template references, conceptual render context, conceptual target output plans,
package-level dry-run result evidence, no-write evidence, and
non-authorization evidence.

The future validation premise is narrow: use
`stnl_project_agent_specializer_dev` in a personal or study setting to assess
qualitatively whether the complete package is coherent. That premise must not
be interpreted as permission for real materialization, a writer, a productive
renderer, a runtime materializer, a real Target Adapter, Write Approval,
approval tokens, persistent reports, generated output, materialized output, or
GitHub writes.

## 3. Scope

Allowed scope for this phase:

- create only
  `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_PLAN.md`;
- document a macro future implementation plan;
- use only permitted dev-skill sources;
- cite current composer behavior conceptually;
- preserve the Aggregator as exactly the current 9 official child checks;
- preserve all no-write, no-real-Target, no-GitHub, and no-productive-skill
  boundaries.

Forbidden scope for this phase:

- implement full-flow integration;
- create scripts;
- alter scripts;
- create a checker;
- alter the Aggregator;
- add a tenth official check;
- alter contracts;
- alter templates;
- alter fixtures;
- alter README, MANIFEST, `SKILL.md`, or `openai.yaml`;
- create generated output;
- create materialized output;
- create or capture a persistent report;
- access a real Target;
- read, stat, list, write, repair, delete, or clean any real Target files;
- write GitHub;
- create a commit, branch, or pull request;
- read, use as source, or mutate
  `skills/stnl_project_agent_specializer/`.

Files intentionally not altered:

- `scripts/materialization_lab/**`;
- `reference/materialization_lab/contracts/**`;
- `reference/materialization_lab/fixtures/**`;
- `reference/templates/**`;
- `reference/kernel_lab/**`;
- `reference/seniorization_lab/**`;
- `README.md`;
- `MANIFEST*`;
- `SKILL.md`;
- `openai.yaml`;
- any productive-skill file.

`__MACOSX` and `.DS_Store` remain ignored for discovery and validation.

## 4. Source Model

The future implementation must use the following final source roots only:

- `reference/kernel_lab/`
- `reference/seniorization_lab/`
- `reference/templates/`
- `reference/materialization_lab/contracts/`

Kernel sources are the primary behavior sources. Senior Agent Profiles are
overlays that sharpen behavior without replacing or weakening kernel
contracts. Templates define only target output shapes. Materialization-lab
contracts define the safety, source, target, rendering, dry-run, report,
adapter, interface, validation, Aggregator, and implementation boundaries.

The 12 canonical agent-to-kernel mappings must remain explicit:

| Agent | Kernel |
| --- | --- |
| `orchestrator` | `orchestrator_kernel` |
| `planner` | `planner_kernel` |
| `validation-eval-designer` | `validation_eval_designer_kernel` |
| `execution-package-designer` | `execution_package_designer_kernel` |
| `designer` | `designer_kernel` |
| `coder-frontend` | `coder_frontend_kernel` |
| `coder-backend` | `coder_backend_kernel` |
| `coder-ios` | `coder_ios_kernel` |
| `validation-runner` | `validation_runner_kernel` |
| `reviewer` | `reviewer_kernel` |
| `finalizer` | `finalizer_kernel` |
| `resync` | `resync_kernel` |

`reference/agents/` may exist as historical/dev-only parity baseline, but it
must not be used as a final source for:

- render context;
- dry-run planning;
- target-output planning;
- template selection;
- materialization;
- full-flow implementation planning.

Any future approach that depends on `reference/agents/` as a final source must
block. Deprecated `base_agent_source` must not appear in final render context
or final planned artifact shapes. Optional parity metadata, if ever used in a
separate dev-only validation layer, must remain outside the full-flow source
chain.

## 5. Full-Flow Package Model

Full-flow means one integrated package-level evaluation, not execution
agent-by-agent. The package includes all 12 canonical agents, both canonical
targets, explicit templates, source contracts, render-context planning,
target-output planning, no-write evidence, and non-authorization evidence.

The minimum package matrix is:

| Matrix | Required entries |
| --- | --- |
| `12 agents x copilot` | one conceptual `.github/agents/*.agent.md` planned artifact per canonical agent |
| `12 agents x codex` | one conceptual `.codex/agents/*.toml` planned artifact per canonical agent |
| `codex` target-level config | one conceptual `.codex/config.toml` planned artifact |
| `codex` root instructions | one conceptual `AGENTS.md` planned artifact |

The matrix must pass or block as a package. Partial subsets may support
diagnosis, but must not become the main proof. The future implementation must
block any design that turns the package into:

- 12 separated phases;
- materialization per agent;
- validation partial as the primary path;
- isolated fixture as the main proof;
- microphases.

Canonical targets:

- `copilot`
- `codex`

Explicit templates:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/config.toml`
- `reference/templates/codex/AGENTS.md`

Conceptual output shapes, target-root-relative only:

- `copilot`: `.github/agents/*.agent.md`
- `codex`: `.codex/agents/*.toml`
- `codex`: `.codex/config.toml`
- `codex`: `AGENTS.md`

These outputs are planned/conceptual only. They are not generated files,
materialized files, real target paths, or permission to create directories.

Template selection must be explicit. A future implementation must not infer a
template from output path, target legacy term, nearby file, real project
artifact, productive skill file, or historical snapshot. Missing template
evidence blocks before render context, output planning, or any write-related
decision.

## 6. Conceptual Component Shape

A later implementation may introduce a small in-memory package layer, only if a
future phase explicitly scopes code changes. The component names below are
conceptual and do not authorize creation now.

Conceptual source loading:

- validate that the future request is package-level, not per-agent execution;
- load or reference only explicit dev-skill sources from the allowed roots;
- require the complete 12-agent kernel mapping;
- require Senior Agent Profile evidence for each canonical agent;
- require the explicit template set for `copilot` and `codex`;
- require the listed materialization-lab contracts as boundary evidence;
- block if `reference/agents/` or `base_agent_source` becomes a final source.

Conceptual source chain assembly:

- assemble `kernel_source + senior_profile_source + template_source +
  materialization_contract_sources`;
- preserve agent ID and kernel module identity separately;
- keep target-level Codex artifacts distinct from agent-behavior artifacts;
- fail closed when source coverage is incomplete or conflicting.

Conceptual template resolution:

- resolve templates only from `reference/templates/`;
- bind `copilot` agents to `reference/templates/copilot/agent.md`;
- bind `codex` agents to `reference/templates/codex/agent.toml`;
- bind Codex config to `reference/templates/codex/config.toml`;
- bind Codex root instructions to `reference/templates/codex/AGENTS.md`;
- block missing, ambiguous, inferred, nearby, productive, or snapshot-derived
  templates.

Conceptual render context planning:

- plan one render-context entry for each agent-target pair;
- include source refs, target refs, template refs, placeholder requirements,
  escaping mode, generated notice representation, and composition-conflict
  verdicts;
- represent target-level Codex artifacts as target-level template contexts,
  not as agent kernels;
- never produce rendered output or renderer payload.

Conceptual target output planning:

- produce package-level target-root-relative planned paths only;
- include the 12 `copilot` agent output shapes, 12 `codex` agent output
  shapes, `.codex/config.toml`, and `AGENTS.md`;
- use planned-only operations such as `CREATE_PLANNED`,
  `UPDATE_PLANNED`, `UNCHANGED_PLANNED`, or `BLOCKED_PLANNED`;
- never resolve absolute paths, stat a real Target, list directories, read file
  contents, or calculate real drift.

Conceptual dry-run package result assembly:

- assemble a single package-level result with identity, boundary result,
  source chain, template refs, render-context plan, target-output plan,
  package matrix summary, blocking summary, no-write evidence, and
  non-authorization evidence;
- keep the result in memory only;
- avoid defining a CLI stdout contract, JSON schema, runtime payload, or
  persistent report format.

No-write evidence:

- include explicit no-read/no-write flags for target access, filesystem access,
  GitHub, productive skill mutation, patch/diff application, and git actions;
- keep human read-only audit commands outside the conceptual runtime evidence.

Non-authorization evidence:

- state directly that the package result does not authorize materialization,
  Target read/write, writer, renderer, loader, scenario selector, Target
  Adapter, Write Approval, approval token, persistent report, generated output,
  materialized output, patch/diff application, GitHub write, productive skill
  mutation, commit, branch, or pull request.

## 7. Composer Usage Boundary

The current composer exists at:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

It may be referenced conceptually for these already-existing boundaries:

- composition of source chains;
- composition of template refs;
- composition of render context;
- composition of target output plan;
- construction of no-write evidence;
- construction of non-authorization summary;
- blocking of unsafe signals;
- isolation from the Aggregator and official child checks.

In a later implementation, the composer may be used only as dev-only,
in-memory, dry-run-only composition precedent. It must not become:

- runtime materializer;
- writer;
- productive renderer;
- checker;
- Aggregator child;
- Target Adapter real;
- Write Approval real;
- approval token issuer;
- approval registry;
- persistent report generator;
- CLI contract;
- stdout contract;
- target-aware command.

If full-flow package evaluation needs orchestration above the current
single-request composer shape, that orchestration must remain an in-memory
package composition layer and must not retrofit the composer into a runtime
entrypoint.

## 8. Dry-Run Result Shape

The future result shape is conceptual and package-level. A safe minimum shape
could include:

```text
full_flow_dev_skill_dry_run_in_memory_package_result
  result_identity
  package_boundary
  canonical_agent_matrix
  target_matrix
  source_chain_summary
  template_resolution_summary
  render_context_plan_summary
  target_output_plan_summary
  package_blocking_summary
  no_write_evidence
  non_authorization_summary
  next_audit_expectation
```

This shape must not become:

- CLI stdout contract;
- JSON schema;
- runtime payload;
- materializer payload;
- renderer output;
- writer output;
- Target Adapter result;
- Write Approval result;
- persistent dry-run report;
- Markdown report;
- generated artifact;
- materialized output.

The result may summarize planned package entries, but it must not contain
absolute host paths, real Target paths, filesystem stat results, real directory
listings, real file content, write IDs, branch names, commit hashes, pull
request URLs, or persistent report paths.

## 9. No-Write Evidence

Every future package-level conceptual result must include no-read/no-write
evidence equivalent to:

```text
target_read_attempted: false
target_write_attempted: false
filesystem_stat_attempted: false
directory_listing_attempted: false
file_content_read_attempted: false
files_written: []
persistent_report_written: false
github_write_attempted: false
productive_skill_mutation_attempted: false
approval_token_issued: false
write_executed: false
patch_applied: false
commit_created: false
branch_created: false
pull_request_created: false
```

These flags are boundary evidence only. They do not grant permission for later
write behavior. If a future request or implementation path cannot produce this
evidence consistently, the package result must block.

## 10. Non-Authorization Evidence

Every future package-level conceptual result must declare that it does not
authorize:

- materialization real;
- Target read/write real;
- filesystem access against Target real;
- writer;
- renderer;
- loader;
- scenario selector;
- Target Adapter real;
- Write Approval real;
- approval token;
- approval registry;
- approval signature;
- signer;
- persistent report;
- generated output;
- materialized output;
- patch/diff application;
- GitHub write;
- productive skill mutation;
- commit;
- branch;
- pull request.

This evidence must be present even when the package has no blockers. A clean
conceptual result remains a still-no-write result.

## 11. Unsafe Behavior Blockers

A future implementation must block if any of these behaviors appears:

- real Target root, path, stat, directory listing, file content read, drift
  read, or write;
- persisted output, generated output, materialized output, temp output, cache,
  snapshot, stdout capture file, log file, JSON report, or Markdown report;
- GitHub write, GitHub client, pull request URL, branch name, commit hash, or
  commit/branch/PR creation signal;
- productive skill read-as-source, template backfill, migration, or mutation;
- Aggregator expansion;
- tenth official child check;
- creation or recommendation of
  `scripts/materialization_lab/check-dev-only-in-memory-composer.mjs`;
- creation or recommendation of
  `scripts/materialization_lab/check-in-memory-composer.mjs`;
- creation or recommendation of
  `scripts/materialization_lab/check-materialization-composer.mjs`;
- agent-by-agent execution as the main path;
- isolated fixture as the main proof;
- partial validation as package success;
- template inference by output path, target term, nearby file, real artifact,
  productive skill, or historical snapshot;
- `reference/agents/` as final source;
- deprecated `base_agent_source` in final render or planned artifact shapes;
- positive write-permission vocabulary that suggests real writes are unlocked;
- approval token, approval registry, signer, or persistent approval state.

The correct response to any blocker is fail-closed documentation and a
separate future decision, not a workaround.

## 12. Allowed Future Implementation Files

This section lists conservative candidates for a later implementation phase
only. It does not authorize altering them now.

Potential future code files, if separately scoped:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

Potential future documentation file, if a later implementation needs to record
its result:

- `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION.md`

Potential future audit file, if the next audit phase passes and a later audit
artifact is explicitly requested:

- `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_AUDIT.md`

Any additional future file requires a separate explicit decision before it is
created or edited. A future implementation should prefer extending the
existing dev-only in-memory composer test coverage over creating new official
checks, and it must preserve the Aggregator boundary.

## 13. Forbidden Files and Directories

Forbidden to alter or use as source in this phase:

- `skills/stnl_project_agent_specializer/`
- any productive skill file;
- any real Target project;
- any target-project `.github/**`;
- any target-project `.codex/**`;
- any target-project `AGENTS.md`;
- GitHub issues, branches, commits, pull requests, checks, or releases.

Forbidden to alter in this phase:

- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`;
- `scripts/materialization_lab/check-static.mjs`;
- `scripts/materialization_lab/check-source-inventory.mjs`;
- `scripts/materialization_lab/check-template-coverage.mjs`;
- `scripts/materialization_lab/check-fixture-boundary.mjs`;
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`;
- `scripts/materialization_lab/check-project-scenarios.mjs`;
- `scripts/materialization_lab/check-render-context.mjs`;
- `scripts/materialization_lab/check-dry-run-plan.mjs`;
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`;
- `reference/materialization_lab/contracts/**`;
- `reference/materialization_lab/fixtures/**`;
- `reference/templates/**`;
- `reference/kernel_lab/**`;
- `reference/seniorization_lab/**`;
- `reference/agents/**`;
- `README.md`;
- `MANIFEST*`;
- `SKILL.md`;
- `openai.yaml`;
- any productive templates;
- any historical audit unless a future phase explicitly scopes it.

Forbidden to create in this phase:

- any script;
- any checker;
- any tenth Aggregator child check;
- any report file;
- any generated output;
- any materialized output;
- any snapshot;
- any cache;
- any temp output;
- any GitHub artifact.

## 14. Future Test Strategy

A later implementation may run or extend read-only local tests only after that
implementation is separately scoped. No checker is created by this plan.

Useful future validation categories:

- package matrix completeness: all 12 canonical agents represented for
  `copilot` and `codex`;
- target-level Codex artifacts represented exactly as `.codex/config.toml` and
  `AGENTS.md`;
- final source roots restricted to `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` blocked as final source;
- explicit template refs required;
- target-root-relative conceptual paths only;
- no-read/no-write evidence exactness;
- non-authorization summary exactness;
- unsafe signal blocking;
- composer isolation from Aggregator and official checks.

Read-only local commands that may remain useful in a later validation pass:

- `node scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`
- `node scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `node scripts/materialization_lab/check-static.mjs`
- `node scripts/materialization_lab/check-source-inventory.mjs`
- `node scripts/materialization_lab/check-template-coverage.mjs`
- `node scripts/materialization_lab/check-fixture-boundary.mjs`
- `node scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `node scripts/materialization_lab/check-project-scenarios.mjs`
- `node scripts/materialization_lab/check-render-context.mjs`
- `node scripts/materialization_lab/check-dry-run-plan.mjs`
- `node scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
- `git diff --check`
- `git status --short`
- `git diff --stat`
- `git diff --name-status`

The future test strategy must preserve:

- Aggregator closed at exactly 9 official child checks;
- no tenth official check;
- no stdout capture into a file;
- no persistent report;
- no target path argument;
- no real Target read/write;
- no GitHub write;
- no generated output.

Any need for additional validation beyond these boundaries must be recorded as
a separate future decision, not folded into this phase.

## 15. Implementation Gates

Before any later implementation starts:

- confirm the work is inside
  `skills/stnl_project_agent_specializer_dev/`;
- confirm the productive skill is not read, used as source, or mutated;
- confirm the requested phase explicitly authorizes code changes;
- confirm no script creation is requested unless separately scoped;
- confirm no Aggregator change is requested;
- confirm no tenth official check is requested;
- confirm no Target real path is accepted;
- confirm no GitHub write is requested;
- confirm no persistent report is requested.

Full-flow package gates:

- all 12 canonical agents must be present;
- both `copilot` and `codex` target matrices must be present;
- Codex target-level `.codex/config.toml` and `AGENTS.md` must be present as
  conceptual planned artifacts;
- package evaluation must pass or block as an integrated unit;
- partial subsets must be diagnostic only.

Source gates:

- final sources must come only from the allowed final source roots;
- each agent must map to its explicit kernel;
- each agent must map to its Senior Agent Profile;
- every template must be explicit;
- materialization contracts must be present as boundary evidence;
- `reference/agents/` as final source blocks.

Safety gates:

- no real Target read/write;
- no filesystem stat/list/read against real Target;
- no absolute host path;
- no generated or materialized output;
- no persistent report;
- no writer;
- no renderer;
- no loader;
- no scenario selector;
- no real Target Adapter;
- no Write Approval real;
- no approval token, registry, signature, or signer;
- no GitHub write;
- no productive skill mutation;
- no commit, branch, or pull request.

## 16. Non-Goals

This phase does not:

- implement full-flow integration;
- execute the dev skill as a package;
- materialize agents;
- render files;
- write files;
- read a real Target;
- write a real Target;
- create scripts;
- alter scripts;
- create a checker;
- alter official checks;
- alter the Aggregator;
- add a tenth check;
- alter contracts;
- alter templates;
- alter fixtures;
- alter README, MANIFEST, `SKILL.md`, or `openai.yaml`;
- alter the productive skill;
- use the productive skill as source;
- create persistent reports;
- create stdout capture files;
- create generated output;
- create materialized output;
- apply patches/diffs to a Target;
- write GitHub;
- create commits;
- create branches;
- create pull requests;
- generate the next audit prompt.

## 17. Risks and Decisions Deferred

Risk: package-level planning could drift into agent-by-agent execution.

Deferred decision: if later implementation needs diagnostic subsets, define
them as support-only and preserve one integrated package result as the main
unit.

Risk: the current composer may be treated as a runtime materializer.

Deferred decision: if full-flow orchestration needs new code, decide whether it
is a thin in-memory package layer or a conservative extension of the existing
composer test surface. Do not convert the composer into a runtime entrypoint.

Risk: future validation may want a persistent report.

Deferred decision: create a separate report-model implementation phase only
after updating the implementation boundary. This plan does not authorize
persistence.

Risk: real project evaluation may be interpreted as real Target access.

Deferred decision: if a later personal/study validation needs project context,
define a separate read-only, no-write, no-real-Target-adapter policy first.
This plan does not authorize Target filesystem access.

Risk: Aggregator expansion may be proposed to make the new flow official.

Deferred decision: treat any Aggregator expansion or tenth check as a separate
future decision. This plan keeps the Aggregator closed.

Risk: `reference/agents/` may be convenient as fallback source.

Deferred decision: do not add a fallback. If final source coverage is
incomplete, block and decide separately how to close the source gap.

Risk: contract gaps may appear while designing package-level evidence.

Deferred decision: record the gap and decide separately whether a contract
update is needed. Do not work around missing contracts through code,
templates, fixtures, or reports.

## 18. Expected Next Phase

The expected next phase is:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_IMPLEMENTATION_PLAN_AUDIT`

This document does not generate the audit prompt.
