# Full-Flow Dev-Skill Dry-Run In-Memory Package Orchestration Implementation Plan

Status: documentary/dev-only/implementation-plan-only artifact.

This document is a macro implementation plan for a possible future thin
package-level orchestration layer in `stnl_project_agent_specializer_dev`.
It does not implement code, create scripts, alter scripts, create a checker,
alter the Validation Harness Aggregator, alter contracts, alter templates,
alter fixtures, touch the productive skill, access a real Target, persist
output, write GitHub, create commits, create branches, or open pull requests.

## 1. Verdict

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_PLAN: READY`

## 2. Executive Summary

This is a plan-only document. It describes how a later, separately authorized
implementation could represent the full-flow dev skill as one integrated
package-level, dry-run-only, in-memory-only result above the current composer.
It does not implement that layer now.

The plan follows the audited decision to pursue:

`OPTION_C_THIN_PACKAGE_LEVEL_ORCHESTRATION_LAYER`

The future layer should be thin and conservative. It should coordinate package
inputs and package-level in-memory evidence for the 12 canonical agents, both
canonical targets, explicit templates, final source roots, conceptual
render-context planning, conceptual target-output planning, no-write evidence,
and non-authorization evidence. It must not become a runtime materializer,
writer, renderer, loader, scenario selector, Target Adapter, Write Approval
surface, checker, Aggregator child, CLI contract, stdout contract, persistent
report generator, or target-aware command.

The preserved limits are:

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

- create only this document:
  `reference/materialization_lab/FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_PLAN.md`;
- document a macro implementation plan for a future package-level orchestration
  layer;
- use only the dev-skill materialization, kernel, seniorization, template, and
  contract context needed to make the plan coherent;
- preserve the current composer as component or precedent only;
- preserve the closed Validation Harness Aggregator boundary;
- preserve all no-write, no-real-Target, no-GitHub, and no-productive-skill
  boundaries.

Forbidden scope for this phase:

- implement package orchestration;
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
- alter Senior Profiles;
- alter README, MANIFEST, `SKILL.md`, or `openai.yaml`;
- create generated output;
- create materialized output;
- create cache, snapshot, temp output, stdout capture, or persistent report;
- access, read, stat, list, write, repair, clean, or mutate a real Target;
- write GitHub;
- create a commit, branch, pull request, issue artifact, or release artifact;
- read, use as source, or mutate `skills/stnl_project_agent_specializer/`.

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
- `openai.yaml`;
- any productive-skill file.

The productive skill is out of scope. `__MACOSX` and `.DS_Store` are ignored.

## 4. Current State

The current state is treated as already consolidated and not reopened by this
plan:

- the dev-only in-memory composer exists;
- the composer implementation and hardening are treated as passed;
- the full-flow integration plan, implementation plan, and decision are
  treated as ready and audited successfully;
- the latest decision recommends
  `OPTION_C_THIN_PACKAGE_LEVEL_ORCHESTRATION_LAYER`;
- the Aggregator remains closed with exactly 9 official checks;
- the full-flow package is defined as 12 canonical agents together, not 12
  separate materialization tracks;
- no current phase authorizes implementation.

The current composer remains:

- manual/local/dev-only;
- pure in-memory composition;
- dry-run-only;
- still-no-write;
- outside the Aggregator;
- outside the official checks;
- not a checker;
- not a renderer;
- not a writer;
- not a runtime materializer;
- not a Target Adapter real implementation;
- not a Write Approval real implementation;
- not an approval-token issuer;
- not a persistent report generator.

Final source roots remain:

- `reference/kernel_lab/`;
- `reference/seniorization_lab/`;
- `reference/templates/`;
- `reference/materialization_lab/contracts/`.

`reference/agents/` remains only a temporary historical/dev-only parity
baseline. It must not become a final source for package orchestration,
render-context planning, dry-run planning, target-output planning, template
selection, materialization, or full-flow implementation planning.

## 5. Package Orchestration Concept

The future package-level layer is a thin orchestration boundary above the
current composer. Its job is to represent the full-flow package as one
integrated in-memory result. It coordinates conceptual inputs, matrix coverage,
template references, source-chain evidence, planned render contexts,
target-output plan summaries, blockers, no-write evidence, and
non-authorization evidence.

The layer should be:

- thin orchestration layer;
- dev-only;
- dry-run-only;
- in-memory-only;
- no-write;
- package-level;
- manual/local;
- no real Target;
- no output persistence;
- no GitHub;
- outside the Aggregator;
- outside official checks;
- separate from runtime materialization.

The layer is not:

- runtime materializer;
- writer;
- productive renderer;
- real loader;
- real scenario selector;
- real Target Adapter;
- real Write Approval;
- approval token issuer;
- approval registry;
- persistent report generator;
- checker;
- Aggregator child;
- CLI contract;
- stdout contract;
- target-aware command.

Relationship with the composer:

- the composer may remain a component or precedent for source-chain
  composition, template refs, render-context plan refs, target-output plan refs,
  no-write evidence, non-authorization evidence, and unsafe-signal blockers;
- the composer must not be converted into the package runtime entrypoint;
- the package layer must not pressure the composer into renderer, writer,
  checker, report-generator, Target Adapter, or Write Approval responsibilities.

Relationship with package result:

- the package result is a conceptual in-memory summary only;
- the package result passes or blocks as one package;
- diagnostic rows may be keyed by agent and target, but they are evidence rows
  inside one integrated result, not separate agent phases.

## 6. Full-Flow Package Model

The future full-flow package must preserve all 12 canonical agents together:

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

Canonical agent-to-kernel mappings:

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

The minimum conceptual matrix is:

| Matrix | Required package coverage |
| --- | --- |
| `12 x copilot` | one conceptual `.github/agents/*.agent.md` planned artifact per canonical agent |
| `12 x codex` | one conceptual `.codex/agents/*.toml` planned artifact per canonical agent |
| `codex` target-level config | one conceptual `.codex/config.toml` planned artifact |
| `codex` root instructions | one conceptual `AGENTS.md` planned artifact |

`.codex/config.toml` and `AGENTS.md` are Codex target-level artifacts. They are
not agent kernels and must not be treated as extra agents.

Package pass/block rule:

- all 12 agents must be present;
- `copilot` and `codex` matrices must be complete;
- Codex target-level artifacts must be present as conceptual entries;
- a single unsafe required row blocks the package;
- partial matrix success must not be represented as package success.

The plan blocks:

- 12 separate phases;
- materialization agent by agent;
- implementation agent by agent;
- partial validation as the main proof;
- isolated fixture as the main proof;
- microphases;
- one-template-at-a-time success;
- one-fixture-at-a-time success.

## 7. Source and Template Model

Allowed final source roots:

- `reference/kernel_lab/`;
- `reference/seniorization_lab/`;
- `reference/templates/`;
- `reference/materialization_lab/contracts/`.

The future package source chain should remain:

`kernel_source + senior_profile_source + template_source + materialization_contract_sources`

`reference/agents/` remains excluded from final source use. The package result
should include evidence that:

- no final source ref starts with `reference/agents/`;
- no final template ref comes from `reference/agents/`;
- no `base_agent_source` field appears in render-context planning or
  target-output planning;
- historical snapshots and fixtures are not used as final source roots;
- productive skill templates are not used as fallback sources.

Canonical targets:

- `copilot`;
- `codex`.

Explicit templates:

- `reference/templates/copilot/agent.md`;
- `reference/templates/codex/agent.toml`;
- `reference/templates/codex/config.toml`;
- `reference/templates/codex/AGENTS.md`.

Conceptual output shapes, target-root-relative only:

- `copilot`: `.github/agents/*.agent.md`;
- `codex`: `.codex/agents/*.toml`;
- `codex`: `.codex/config.toml`;
- `codex`: `AGENTS.md`.

These outputs are:

- planned-only;
- conceptual-only;
- target-root-relative;
- in-memory evidence only;
- not generated files;
- not materialized files;
- not real Target paths;
- not authorization to create directories;
- not authorization to write files.

Template resolution must block when a template is missing, ambiguous, inferred,
nearby, snapshot-derived, productive-skill-derived, or dependent on
`reference/agents/`. No template may be inferred from output path, target
legacy term, nearby files, real project artifacts, productive skill files, or
historical snapshots.

## 8. Conceptual Components

The future implementation may use components like the ones below. Names are
conceptual and do not authorize code creation now.

### Package request boundary

Responsibility:

- validate that the request is package-level, not agent-level execution;
- confirm dev-only, dry-run-only, in-memory-only, and no-write intent;
- reject real Target, GitHub, productive skill, persistence, renderer, writer,
  loader, scenario selector, Target Adapter, and Write Approval signals.

Inputs permitted:

- conceptual package identity;
- canonical agent list;
- canonical target list;
- conceptual policy refs;
- in-memory request metadata.

Outputs conceptual:

- package boundary status;
- block codes and blockers;
- still-no-write boundary evidence.

Primary blockers:

- real Target path;
- host absolute path;
- target read/stat/list/write;
- GitHub write;
- productive skill signal;
- output persistence;
- runtime materializer signal.

It must not:

- read a Target;
- write files;
- create CLI or stdout contracts;
- issue approval tokens;
- create reports.

### Canonical package definition

Responsibility:

- define the integrated package of 12 canonical agents;
- bind each agent to its canonical kernel;
- keep Codex target-level artifacts separate from agents;
- enforce all-or-block package completeness.

Inputs permitted:

- canonical agent IDs;
- agent-to-kernel mapping;
- target IDs `copilot` and `codex`;
- target-level Codex artifact definitions.

Outputs conceptual:

- canonical package matrix;
- coverage summary;
- missing/duplicate/conflict blockers.

Primary blockers:

- missing canonical agent;
- duplicate agent identity;
- missing kernel mapping;
- reduced matrix;
- target-level artifact treated as an agent.

It must not:

- split the package into 12 phases;
- materialize one agent at a time;
- define partial success as package success.

### Source coverage collector

Responsibility:

- collect package-level coverage evidence from allowed final source roots;
- require kernel and Senior Profile coverage for every canonical agent;
- require materialization contract refs.

Inputs permitted:

- refs under `reference/kernel_lab/`;
- refs under `reference/seniorization_lab/`;
- refs under `reference/templates/`;
- refs under `reference/materialization_lab/contracts/`.

Outputs conceptual:

- source coverage summary;
- source gap list;
- final-source exclusion evidence for `reference/agents/`.

Primary blockers:

- source ref outside allowed roots;
- missing kernel coverage;
- missing Senior Profile coverage;
- missing contract ref;
- `reference/agents/` as final source;
- deprecated `base_agent_source`.

It must not:

- read or use the productive skill;
- use historical snapshots as final source;
- infer source files by naming convention.

### Source chain assembler

Responsibility:

- assemble the conceptual package source chain from explicit source refs;
- preserve kernel source and seniorization overlay separately;
- include contract refs as boundary evidence.

Inputs permitted:

- collected source coverage;
- canonical package definition;
- explicit contract refs.

Outputs conceptual:

- source chain summary;
- per-agent source-chain entries;
- package-level source-chain blockers.

Primary blockers:

- incomplete chain;
- conflicting source role;
- final dependency on `reference/agents/`;
- productive skill source;
- contract gap needing separate decision.

It must not:

- render content;
- create runtime payloads;
- choose one source over another when sources conflict silently.

### Template reference resolver

Responsibility:

- bind each conceptual target output role to one explicit template;
- preserve the four canonical templates as the only accepted template refs;
- block missing, ambiguous, inferred, nearby, productive, or snapshot templates.

Inputs permitted:

- explicit template refs under `reference/templates/`;
- canonical target IDs;
- conceptual output roles.

Outputs conceptual:

- template resolution summary;
- target-to-template bindings;
- template blockers.

Primary blockers:

- missing template;
- unknown template;
- template inference;
- template selected by output path;
- template selected from productive skill;
- template from `reference/agents/`.

It must not:

- create templates;
- mutate templates;
- backfill templates from the productive skill;
- infer template identity.

### Target matrix planner

Responsibility:

- plan `12 x copilot`;
- plan `12 x codex`;
- preserve target-root-relative conceptual output paths only;
- keep planned operations conceptual.

Inputs permitted:

- canonical package definition;
- template resolution summary;
- conceptual target IDs;
- planned-only operation vocabulary.

Outputs conceptual:

- target matrix summary;
- target-root-relative planned output entries;
- matrix completeness blockers.

Primary blockers:

- missing agent-target entry;
- real path or absolute path;
- traversal path;
- target read/stat/list/write;
- executed operation token;
- partial matrix passed as complete.

It must not:

- resolve real Target roots;
- stat directories;
- list files;
- read file contents;
- calculate real drift;
- write output.

### Codex target-level artifact planner

Responsibility:

- plan conceptual `.codex/config.toml`;
- plan conceptual `AGENTS.md`;
- keep target-level artifacts separate from agent artifacts.

Inputs permitted:

- Codex target identity;
- explicit `reference/templates/codex/config.toml`;
- explicit `reference/templates/codex/AGENTS.md`;
- materialization boundary contracts.

Outputs conceptual:

- Codex target-level artifact summary;
- template refs;
- target-root-relative conceptual paths.

Primary blockers:

- missing Codex target-level template;
- treating target-level artifacts as agents;
- generated or materialized output signal;
- real Target path.

It must not:

- create `.codex/`;
- create `AGENTS.md`;
- emit rendered content;
- write files.

### Render-context plan assembler

Responsibility:

- describe conceptual render-context entries without rendering;
- include source refs, template refs, placeholder expectations, escaping
  expectations, generated notice representation, and composition-conflict
  verdicts;
- represent Codex target-level artifacts as target-level template contexts.

Inputs permitted:

- source chain summary;
- template resolution summary;
- canonical package matrix;
- rendering and composition contract refs.

Outputs conceptual:

- render-context plan summary;
- package-level render blockers.

Primary blockers:

- missing source;
- missing template;
- missing placeholder;
- unsafe render expectation;
- composition conflict;
- renderer execution signal.

It must not:

- render final content;
- create renderer payloads;
- persist render contexts;
- apply templates to a real Target.

### Target-output plan assembler

Responsibility:

- assemble conceptual target-output plan summaries;
- use target-root-relative output shapes only;
- preserve planned-only operation vocabulary.

Inputs permitted:

- target matrix summary;
- Codex target-level artifact summary;
- dry-run/write-boundary contract refs.

Outputs conceptual:

- target-output plan summary;
- planned-only operation entries;
- target/output blockers.

Primary blockers:

- real Target root;
- host absolute path;
- path traversal;
- target filesystem stat;
- target directory listing;
- target file content read;
- executed operation token;
- persistent output signal.

It must not:

- create generated files;
- create materialized files;
- write reports;
- compute real drift from filesystem access.

### Package blocker collector

Responsibility:

- collect all package-level blockers;
- preserve fail-closed semantics;
- report package status as `PASS` only when all required coverage and safety
  evidence is complete.

Inputs permitted:

- boundary status;
- source blockers;
- template blockers;
- matrix blockers;
- render-context blockers;
- target-output blockers;
- no-write evidence status.

Outputs conceptual:

- package blockers;
- package status;
- package diagnostic summary.

Primary blockers:

- any unsafe row;
- absent no-write evidence;
- absent non-authorization evidence;
- contract gap;
- Aggregator expansion signal.

It must not:

- downgrade blockers to warnings;
- treat partial success as package success;
- trigger implementation.

### No-write evidence builder

Responsibility:

- produce exact boundary evidence that no reads, writes, persistence, GitHub,
  productive skill, approval token, patch, commit, branch, or pull request
  occurred.

Inputs permitted:

- package boundary result;
- package blocker summary;
- composer evidence precedent.

Outputs conceptual:

- no-write evidence block.

Primary blockers:

- missing evidence;
- inconsistent evidence;
- any attempted real access or write signal.

It must not:

- grant future write permission;
- issue approvals;
- create reports.

### Non-authorization evidence builder

Responsibility:

- declare that the package result authorizes no real materialization, Target
  access, writer, renderer, loader, scenario selector, Target Adapter, Write
  Approval, approval token, persistent report, generated output, materialized
  output, patch, GitHub write, productive skill mutation, commit, branch, or
  pull request.

Inputs permitted:

- package status;
- approval-state vocabulary limited to conceptual still-no-write states;
- no-write evidence.

Outputs conceptual:

- non-authorization summary.

Primary blockers:

- missing non-authorization summary;
- positive write approval semantics;
- approval token or signer signal;
- writer unlock signal.

It must not:

- authorize real writing;
- create approval registry;
- unlock Target access;
- create GitHub actions.

### Package result assembler

Responsibility:

- assemble one in-memory package-level result;
- include identity, boundary, matrix, source, templates, render context plan,
  target-output plan, blockers, no-write evidence, non-authorization evidence,
  and next audit expectation.

Inputs permitted:

- all conceptual summaries above.

Outputs conceptual:

- package-level in-memory result shape.

Primary blockers:

- missing mandatory section;
- forbidden output field;
- absolute host path;
- real Target path;
- persistent report path;
- branch, commit, PR, token, writer, renderer, or materializer signal.

It must not:

- become JSON schema;
- become CLI stdout contract;
- become persistent report;
- become runtime payload;
- become materializer, renderer, writer, Target Adapter, or Write Approval
  payload.

## 9. Package Result Shape

A safe future package result may include these conceptual top-level sections:

```text
full_flow_dev_skill_dry_run_in_memory_package_result
  result_identity
  phase_identity
  package_boundary
  canonical_agent_matrix
  target_matrix_summary
  codex_target_level_artifact_summary
  source_coverage_summary
  source_chain_summary
  template_resolution_summary
  render_context_plan_summary
  target_output_plan_summary
  package_blockers
  no_write_evidence
  non_authorization_evidence
  next_audit_expectation
```

This shape is conceptual and in-memory-only. It must not become:

- JSON schema official;
- CLI stdout contract;
- persistent report;
- Markdown report;
- runtime payload;
- materializer payload;
- renderer payload;
- writer output;
- Target Adapter result;
- Write Approval result;
- generated artifact;
- materialized output.

The package result must not contain:

- absolute host paths;
- real Target paths;
- filesystem stat results;
- real directory listings;
- real file contents;
- write IDs;
- branch names;
- commit hashes;
- pull request URLs;
- persistent report paths.

## 10. No-Write Evidence

Every future package-level result must include no-write evidence equivalent to:

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

These flags are boundary evidence only. They do not grant future permission to
write. If the future package layer cannot produce this evidence exactly and
consistently, the package result must block.

The no-write evidence must remain present for both `PASS` and `BLOCKED`
results. A clean result remains still-no-write.

## 11. Non-Authorization Evidence

Every future package-level result must state that it does not authorize:

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

This evidence must exist even when there are no blockers. Result status
`PASS` means only that the conceptual package evidence is coherent; it does not
mean real materialization is approved.

Positive write vocabulary remains forbidden, including `APPROVED`,
`WRITE_APPROVED`, `APPROVAL_GRANTED`, `READY_TO_WRITE`, `WRITE_UNLOCKED`,
`EXECUTION_APPROVED`, or `MERGE_APPROVED` when used to imply real write
permission.

## 12. Composer Boundary

The current composer files are:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`;
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`.

The future package layer may use the composer as:

- component or precedent of composition;
- source of no-write evidence patterns;
- source of non-authorization summary patterns;
- conceptual support for source chain composition;
- conceptual support for template refs;
- conceptual support for render context planning;
- conceptual support for target-output planning;
- precedent for unsafe-signal blockers;
- evidence that the composer remains outside the Aggregator and official
  checks.

The composer must not become:

- runtime materializer;
- package runtime entrypoint;
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

Implementation shape comparison for a future authorized phase:

| Option | Description | Benefits | Risks | Planning stance |
| --- | --- | --- | --- | --- |
| Conservative composer extension | Add only the minimum package-level functions to the existing composer. | Reuses existing no-write and blocker vocabulary. | Blurs composer responsibility and may turn the composer into package runtime. | Accept only if audit shows no boundary drift. |
| New thin package-level module | Create a separate package orchestration module under `scripts/materialization_lab/`. | Cleanly separates package orchestration from single-request composition. | Requires explicit future authorization for a new file. | Favored as the safest alignment with Option C if implementation is later authorized. |
| Hybrid minimum | Keep composer unchanged and add a very small wrapper-like package coordinator. | Preserves existing composer while limiting new surface. | Can still drift into runtime entrypoint if poorly scoped. | Acceptable only with strict no-runtime wording. |
| Do not implement | Stop after this plan and audit. | Safest immediate boundary. | Leaves package orchestration untested. | Valid if audit finds unresolved contract gaps. |

No option is authorized for implementation by this document.

## 13. Aggregator Boundary

The Validation Harness Aggregator remains closed with exactly 9 official child
checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

The aggregator wrapper may exist as a validation coordinator, but it is not a
tenth child check.

This plan does not create, recommend, or plan as official checks:

- `scripts/materialization_lab/check-dev-only-in-memory-composer.mjs`;
- `scripts/materialization_lab/check-in-memory-composer.mjs`;
- `scripts/materialization_lab/check-materialization-composer.mjs`;
- any package orchestration checker.

Any official validation path, checker creation, or Aggregator expansion must
be a separate future decision.

## 14. Files Potentially In Scope Later

No file below is authorized for change now. A later implementation phase would
need explicit authorization before touching anything.

Potential existing files:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`;
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`.

Potential new file, only if separately authorized:

- a small package-level in-memory orchestration module under
  `scripts/materialization_lab/`.

Potential future documentation, only if separately requested:

- future package orchestration implementation result document;
- future package orchestration implementation audit artifact.

No checker file is in scope through this plan.

## 15. Files Out of Scope

Out of scope and not authorized:

- `skills/stnl_project_agent_specializer/`;
- any productive skill file;
- Aggregator;
- official checks;
- contracts;
- fixtures;
- templates;
- kernels;
- Senior Profiles;
- `reference/agents/**` as final source;
- README;
- MANIFEST;
- `SKILL.md`;
- `openai.yaml`;
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

## 16. Future Test Strategy

No tests are created or altered by this plan. No checker is created. The
future test strategy may be planned only for a later separately authorized
implementation.

Useful future read-only/local/in-memory test categories:

- package matrix completeness;
- all 12 agents present;
- `copilot` matrix complete;
- `codex` matrix complete;
- Codex target-level artifacts present;
- source roots restricted to final allowed roots;
- `reference/agents/` blocked as final source;
- deprecated `base_agent_source` blocked;
- template refs explicit;
- template inference blocked;
- render-context plan summary remains conceptual;
- target-output plan summary remains target-root-relative and conceptual;
- package result shape remains in-memory;
- no-write evidence exactness;
- non-authorization evidence exactness;
- unsafe signal blockers;
- composer boundary preserved;
- Aggregator not altered.

Future tests must not generate:

- persistent report;
- stdout capture file;
- snapshot;
- golden output;
- temp output;
- generated output;
- materialized output.

Read-only commands that may remain useful after this document is created:

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

No command output should be captured into a file.

## 17. Implementation Gates

Before any future real implementation of this package-level layer, all gates
below must hold:

- a later phase explicitly authorizes implementation;
- this plan is audited successfully;
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
- contract gaps become future decisions.

## 18. Anti-Patterns and Blockers

Mandatory anti-patterns and blockers:

- agent by agent;
- 12 microphases;
- one-template-at-a-time success;
- one-fixture-at-a-time success;
- fixture isolated as primary proof;
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
- converting composer into runtime materializer;
- converting composer test into official validation;
- converting package orchestration into runtime entrypoint;
- converting plan into implementation;
- touching productive skill;
- GitHub write;
- commit, branch, or pull request automation.

Any of these signals must block a future package result or require a separate
future decision before work continues.

## 19. Deferred Decisions

Decisions deferred and not resolved by this plan:

- create or not create a separate package-level file;
- extend composer versus use separate layer;
- final function names;
- final internal payload shapes;
- exact test strategy;
- where future tests should live;
- future implementation result document;
- future implementation audit artifact;
- policy for controlled validation in personal or study projects;
- read-only project context policy;
- contract changes;
- template changes;
- fixture changes;
- output/report policy;
- official validation path;
- checker creation;
- Aggregator expansion.

If any deferred decision becomes necessary, the correct response is to stop
and create a separate explicit decision or plan, not to fold it into package
orchestration implementation by implication.

## 20. Expected Next Phase

The expected next phase is:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_PLAN_AUDIT`

This document does not generate the audit prompt.

Final boundary:

- implementation-plan-only;
- documentary/dev-only;
- no implementation;
- no scripts;
- no checker;
- no Aggregator change;
- no tenth official check;
- no Target real;
- no persistent or materialized output;
- no GitHub write;
- no commit, branch, or pull request;
- no productive skill.
