# Dev-only In-memory Composer Plan

Status: documentary/dev-only/plan-only decision-following artifact.

This document defines the plan for a possible future dev-only in-memory
materialization composer inside `stnl_project_agent_specializer_dev`. It does
not implement the composer, create a script, create a test, create a checker,
alter contracts, alter templates, alter fixtures, alter the Aggregator, create
a runtime materializer, create a renderer, create a writer, access a real
Target, write GitHub, or touch `skills/stnl_project_agent_specializer/`.

## 1. Identity Of The Future Capability

Capability name:

`DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER`

The future capability, if separately approved after this plan and audit, is
only:

- dev-only;
- manual/local;
- in-memory-only;
- dry-run-only;
- still-no-write;
- conceptual-composition-only;
- outside the Aggregator;
- outside official checks;
- outside the productive skill.

It is not:

- runtime materializer;
- official checker;
- Aggregator child;
- writer;
- renderer;
- loader runtime;
- real Target Adapter;
- real Write Approval;
- approval token issuer;
- approval registry;
- signer;
- persistent report generator;
- GitHub writer;
- productive-skill mutation path.

## 2. Objective

The composer objective is to define how a later dev-only capability may compose
existing conceptual materialization evidence into one coherent in-memory
planned agent materialization model.

The useful gap is not another dry-run output entry planner. The current
prototype already covers source planning, template resolution, render-context
planning, target-adapter planning, planned output entries, dry-run boundary
result, still-no-write Write Approval Protocol result, Dry-run Report Model
reference, blocking summary, no-read/no-write evidence, and non-authorization
summary.

The future composer should organize those elements into a single
`planned_agent_materialization_model` without executing rendering, writing, or
Target access.

## 3. Non-goals

This plan does not authorize:

- composer implementation;
- script creation or script modification;
- test creation or test modification;
- checker creation;
- tenth Aggregator check;
- fixture creation;
- template creation;
- contract changes;
- runtime loader, renderer, writer, Target Adapter, or Write Approval;
- persistent report, stdout capture, cache, snapshot, temp output, generated
  output, patch, diff, or materialized file;
- real Target path, real Target read, filesystem stat, directory listing, file
  content read, or real Target write;
- GitHub write, branch, commit, pull request, or merge;
- productive-skill migration or mutation.

## 4. Mandatory Boundaries

The future composer must preserve these boundaries:

- final sources are only `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` is forbidden as final source;
- `skills/stnl_project_agent_specializer/` is out of scope;
- templates must be explicit and under `reference/templates/`;
- target/output planning is conceptual and target-root-relative only;
- no absolute host path or real Target path may be accepted or returned;
- render context composition is not rendering execution;
- Write Approval remains conceptual and still-no-write;
- no persistent report or generated output may be produced;
- no checker or Aggregator child may be created;
- `__MACOSX` and `.DS_Store` are ignored.

## 5. Allowed Conceptual Inputs

A future composer may model only conceptual/documentary inputs such as:

- materialization request identity;
- target agent ID;
- target kind or canonical target ID;
- final source refs;
- kernel module refs;
- Senior Agent Profile refs;
- explicit template refs;
- render context plan refs;
- target/output plan refs;
- dry-run boundary refs;
- write approval boundary refs;
- no-read/no-write evidence refs;
- non-authorization refs;
- existing materialization-lab contract refs.

All refs must remain documentary references inside the dev skill reference
bundle or conceptual refs already represented by the current prototype.

## 6. Prohibited Inputs

The future composer must block inputs that include or request:

- Target real path;
- host absolute path;
- filesystem read target;
- filesystem write target;
- filesystem stat or directory listing against a real Target;
- GitHub repo write target;
- approval token;
- approval registry, signer, or persistent approval state;
- persisted report path;
- generated output path real;
- runtime command payload;
- CLI execution payload;
- writer, renderer, loader, scenario selector, Target Adapter, or real Write
  Approval implementation;
- `reference/agents/` as final source;
- inferred templates;
- template fallback by path, target-agent naming, legacy agent, nearby file,
  productive skill file, or historical snapshot.

## 7. Conceptual In-memory Output Model

The future composer may return only an in-memory conceptual result shaped by
sections such as:

```text
composer_result_identity
composition_boundary_result
source_chain_composition
template_ref_composition
render_context_composition
target_output_plan_composition
planned_agent_materialization_model
dry_run_boundary_result
write_approval_non_authorization_result
no_read_no_write_evidence
blocking_summary
non_authorization_summary
audit_expectation_summary
```

`planned_agent_materialization_model` is the intended composition center. It
may describe which canonical agent, target, final sources, explicit templates,
render-context plan, conceptual target/output plan, dry-run boundary, and
non-authorization evidence belong together.

This model is not:

- a rendered file;
- a persisted output;
- a persistent report;
- a patch;
- an applicable diff;
- a Target write;
- write authorization;
- materialization execution;
- runtime payload;
- CLI stdout contract.

## 8. Prohibited Output

The future composer must not return or create:

- `materialized_file`;
- `generated_file`;
- `renderer_output`;
- `writer_output`;
- `target_absolute_path`;
- `target_real_path`;
- `host_absolute_path`;
- `persistent_report_path`;
- `approval_token`;
- `approval_signature`;
- `approval_registry_entry`;
- `write_execution_id`;
- `materializer_execution_id`;
- `CREATE_EXECUTED`, `UPDATE_EXECUTED`, `DELETE_EXECUTED`, or
  `WRITE_EXECUTED`;
- commit hash, branch name, pull request URL, or GitHub write result.

Semantic equivalents are also forbidden even if renamed.

## 9. Source Chain Model

The future composer must preserve this final source chain:

```text
kernel_source
+ senior_profile_source
+ template_source
+ materialization_contract_sources
```

Allowed final source roots remain:

- `reference/kernel_lab/`
- `reference/seniorization_lab/`
- `reference/templates/`
- `reference/materialization_lab/contracts/`

The composer may organize source-chain evidence, but it must not:

- invent kernel modules;
- invent Senior Profiles;
- use deprecated `base_agent_source`;
- require `reference/agents/` as final source;
- infer sources from output paths, historical snapshots, productive skill
  files, or nearby files.

## 10. Template Ref Model

Templates must be explicit.

Currently allowed explicit template refs are:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/config.toml`
- `reference/templates/codex/AGENTS.md`

The future composer may attach these refs to a planned model. It must not
infer templates from:

- target path;
- target-agent naming;
- legacy target terms;
- productive skill templates;
- `reference/agents/`;
- existing target files;
- nearby files or naming symmetry.

Any new template or template source requires a separate future decision.

## 11. Render Context Composition Model

The future composer may plan or organize render-context references. It may
associate an agent, target, kernel source, Senior Agent Profile, explicit
template, target contract, template contract, rendering contract, placeholder
coverage expectation, escaping expectation, and composition conflict verdict.

This is composition modeling, not rendering execution.

The future composer must not:

- execute a renderer;
- render final content;
- persist rendered content;
- apply a template to a real Target;
- create output materialized content;
- write `AGENTS.md`;
- write `.github/**`;
- write `.codex/**`.

If a future implementation cannot maintain this distinction, it must block and
request a separate decision instead of creating a renderer.

## 12. Target/output Plan Conceptual Model

The future composer may model target/output planning only as conceptual,
target-root-relative intent.

Allowed concepts:

- conceptual target kind;
- canonical target ID;
- conceptual output role;
- target-root-relative conceptual path;
- planned output entry;
- planned operation vocabulary:
  `CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`,
  `BLOCKED_PLANNED`;
- simulated/documentary existing-state or drift refs only when already
  authorized by contracts or fixtures.

Blocked concepts:

- absolute real path;
- real target root;
- filesystem stat;
- directory listing;
- file content read;
- filesystem write;
- directory creation;
- file creation;
- patch application;
- persistent report;
- materialized output.

## 13. No-read/no-write Evidence Model

Every future composer result must include no-read/no-write evidence equivalent
to:

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

This evidence is an in-memory conceptual boundary record. It is not a
persistent report and not authorization to write.

## 14. Non-authorization Summary Model

Every future composer result must include a non-authorization summary stating
that the result authorizes none of:

- real materialization;
- real Target read/write;
- filesystem access to a real Target;
- writer creation;
- renderer creation;
- loader creation;
- scenario selector creation;
- real Target Adapter creation;
- real Write Approval creation;
- approval token, approval registry, or signer creation;
- persistent report;
- GitHub write;
- productive skill mutation;
- commit, branch, or pull request.

Even `APPROVAL_CONCEPTUALLY_ELIGIBLE` remains still-no-write and must not
authorize execution.

## 15. Blocking Model

The future composer should use existing block codes owned by existing
contracts. It must not create new block codes automatically.

Conceptual blocking categories include:

- source boundary violation;
- `reference/agents/` final-source attempt;
- missing source;
- incomplete kernel coverage;
- deprecated source field;
- template missing;
- template inference attempt;
- placeholder missing;
- unsafe render-context signal;
- composition conflict;
- Target real access attempt;
- unsafe path or real path attempt;
- write attempt;
- approval positive semantics;
- runtime payload signal;
- generated output signal;
- persistent report signal;
- productive skill mutation signal;
- GitHub write signal;
- checker or Aggregator expansion signal.

If a future implementation needs a new block code, it must record
`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION` and stop. It must not alter
contracts, scripts, or the Aggregator in the same phase.

## 16. Relationship With The Current Prototype

The current dry-run-only materializer prototype remains the lower-level
dev-only fixture/model exercise. It already covers:

- source plan;
- template resolution;
- render context plan;
- target adapter plan;
- planned output entries;
- dry-run boundary result;
- Write Approval Protocol result as still-no-write;
- Dry-run Report Model reference;
- blocking summary;
- no-read/no-write evidence;
- non-authorization summary.

The future composer should not replace the prototype and should not promote it
to runtime. It should compose these already modeled sections into a coherent
`planned_agent_materialization_model` for later audit, still entirely
in-memory and no-write.

## 17. Relationship With Contracts

All existing contracts remain unchanged:

- `SOURCE_MODEL_CONTRACT.md`
- `TARGETS_CONTRACT.md`
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `RENDERING_AND_COMPOSITION_CONTRACT.md`
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`
- `MATERIALIZER_INTERFACE_CONTRACT.md`
- `TARGET_ADAPTER_CONTRACT.md`
- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`
- `DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md`
- `VALIDATION_HARNESS_CONTRACT.md`
- `FIXTURE_BOUNDARY_CONTRACT.md`
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md`

This plan found no objective contract change required for planning the
composer boundary. Any later contractual gap must be recorded as
`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION` and handled in a separate phase.

## 18. Relationship With Scripts

No script is created or altered by this plan.

Existing scripts remain read-only in this phase, including:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

A later implementation phase may consider a manual/local/dev-only in-memory
script only after this plan and its audit pass. That possible future script is
not authorized here and must remain outside the Aggregator unless separately
decided.

## 19. Relationship With Aggregator

The Aggregator remains closed with exactly these 9 official checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

This plan blocks:

- tenth check;
- new checker;
- composer checker;
- composer test in the Aggregator;
- Aggregator edits;
- Aggregator as composer runner;
- Aggregator as report generator.

## 20. Relationship With Fixtures

This plan creates no fixtures.

Fixture-backed composer scenarios are deferred until after this plan and its
audit. If a future composer implementation needs fixture coverage, that must be
a separately planned and authorized phase. Fixtures must remain under the
authorized fixture root and must not become real Targets, generated outputs, or
persistent reports.

## 21. Relationship With Templates

This plan creates no templates and changes no templates.

Templates remain explicit source references only. Template presence does not
authorize rendering, file generation, target writes, productive-skill changes,
or GitHub writes.

If a future composer requires a template not already registered under
`reference/templates/`, it must block and request a separate decision instead
of inferring or creating the template.

## 22. Relationship With The Productive Skill

The productive skill remains fully out of scope:

`skills/stnl_project_agent_specializer/`

This plan preserves the approved strategy:

1. mature the dev skill;
2. test the dev skill for a period;
3. correct discovered gaps;
4. approve behavior manually;
5. only then open a separate productive migration track.

No productive migration, productive write, productive template update, or
productive skill inspection is authorized by this plan.

## 23. Acceptance Criteria For Future Implementation

A future implementation phase may be accepted only if it proves all of the
following without persistent output:

- capability remains dev-only, manual/local, in-memory-only, dry-run-only, and
  still-no-write;
- input model accepts only conceptual refs and rejects real Target, runtime,
  write, persistent report, approval token, GitHub, and productive-skill
  surfaces;
- output model includes `planned_agent_materialization_model` and mandatory
  no-read/no-write plus non-authorization evidence;
- final sources remain `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains forbidden as final source;
- templates are explicit and no fallback inference exists;
- render-context composition remains separate from rendering execution;
- target/output planning remains target-root-relative and conceptual only;
- Write Approval remains still-no-write and emits no token;
- no persistent report, cache, snapshot, temp output, stdout capture, patch,
  diff, generated output, or materialized file is created;
- no checker, tenth Aggregator check, or Aggregator edit is introduced;
- no contract, fixture, template, or productive skill file is changed unless a
  separate prior decision authorizes that exact change.

## 24. Audit Criteria For This Plan

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_PLAN_AUDIT` should be read-only,
audit-only, no-write, no-fix, no-patch, and no-implementation.

The audit should verify that this plan:

- creates only this documentary plan file;
- follows the accepted `OPTION_A_DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER`;
- preserves dev-only, manual/local, in-memory-only, dry-run-only, and
  still-no-write boundaries;
- defines allowed inputs, prohibited inputs, conceptual output, and prohibited
  output;
- keeps final sources limited to the allowed source roots;
- blocks `reference/agents/`, real Target, GitHub, and productive skill
  surfaces;
- preserves explicit template requirements;
- distinguishes render-context composition from rendering execution;
- keeps target/output planning conceptual and target-root-relative;
- requires no-read/no-write evidence and non-authorization summary;
- introduces no new contract, script, checker, fixture, template, Aggregator
  child, renderer, writer, Target Adapter, Write Approval, approval token,
  persistent report, generated output, or materialized output.

## 25. Recommended Next Phase

Recommended next phase:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_PLAN_AUDIT`

Required mode:

- read-only;
- audit-only;
- no-write;
- no-fix;
- no-patch;
- no-implementation.
