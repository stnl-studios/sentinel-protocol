# Dry Run Report Model Contract

Status: documentary/dev-only/read-only contract.

This contract defines the conceptual Dry-run Report Model for a future
materialization simulation inside `stnl_project_agent_specializer_dev`. It is
read-only, dev-only, and documentary. It is not a runtime payload, executable
schema, materializer interface, renderer output, writer adapter, loader result,
scenario selector, target adapter, checker, CLI contract, persistent report, or
authorization to read or write a real target project.

## Purpose

The Dry-run Report Model describes how a future dry-run may summarize planned
materialization intent without materializing anything. It gives reviewers a
single conceptual shape for source evidence, target intent, planned output
entries, validation gates, lazy-load traces, blocking state, no-write evidence,
and non-authorization evidence.

The model exists to make a future dry-run auditable before any later phase
separately authorizes runtime implementation. It does not implement that later
phase.

## Scope

This contract covers only the documentary shape and rules for a future dry-run
report model:

- required top-level sections;
- required and optional fields;
- forbidden and deprecated fields;
- planned operation vocabulary;
- source, target-intent, output-plan, gate-result, lazy-load, blocking,
  no-write, and non-authorization rules;
- persistence and determinism policy;
- relationship to fixtures, validation checks, and the Validation Harness
  Aggregator.

The model is allowed to reference existing materialization-lab contracts and
fixture documents as documentary evidence. It must not read a real target or
write a report file in this phase.

## Non-scope

This contract does not create or authorize:

- JSON schema execution;
- runtime payloads;
- materializer interfaces;
- target adapters;
- writer adapters;
- renderer outputs;
- loader results;
- runtime scenario selectors;
- persistent dry-run reports;
- Markdown or JSON report files;
- checkers;
- CLI flags or commands;
- target real read/write;
- GitHub writes;
- productive-skill mutation;
- changes to `skills/stnl_project_agent_specializer/`;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- use of `reference/agents/` as a final materialization source.

## Boundary Invariants

Every future Dry-run Report Model instance must preserve these invariants:

- `dev_only` is true.
- `read_only` is true.
- `no_target_read` is true.
- `no_target_write` is true.
- `no_github_write` is true.
- `no_productive_skill_mutation` is true.
- `no_runtime_materializer` is true.
- `no_renderer` is true.
- `no_writer` is true.
- `no_loader` is true.
- `no_scenario_selector` is true.
- `no_persistent_report` is true.

These fields are evidence of pre-materialization boundary, not runtime feature
flags. Setting any of them to false is outside this contract.

## Relationship To Existing Contracts

The Dry-run Report Model depends on the existing materialization-lab contracts
and does not replace any of them:

- `SOURCE_MODEL_CONTRACT.md` defines final source roles and forbids
  `reference/agents/` as a final source.
- `TARGETS_CONTRACT.md` defines canonical targets, legacy target-term
  normalization, and future output path shapes.
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md` defines explicit templates and missing
  template blocking.
- `RENDERING_AND_COMPOSITION_CONTRACT.md` defines deterministic render-context
  composition from explicit sources.
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` defines planned artifact entries,
  planned-only operations, path safety, managed-artifact, drift, and write
  boundary rules.
- `VALIDATION_HARNESS_CONTRACT.md` defines future validation layers, statuses,
  structured validation report expectations, and no-write enforcement.
- `FIXTURE_BOUNDARY_CONTRACT.md` defines fixture containment and distinguishes
  fixture strings from real target artifacts.
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md` defines the fixed stdout-only
  aggregator gate over the current 9 read-only checks.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` defines which dev-only script
  categories may exist in separately authorized phases.

This contract does not expand the Aggregator Checker, does not change the
final source model, and does not grant target read/write authorization.

## Dry-run Report Model Shape

The conceptual top-level shape is:

```text
dry_run_report
  report_identity
  report_boundary
  source_inventory_snapshot
  target_intent
  agent_plan_entries
  output_plan_entries
  gate_results
  lazy_load_trace
  blocking_summary
  no_write_evidence
  non_authorization_summary
```

The shape above is documentary. It is not a JSON schema, runtime object,
serialized payload, persistent report format, or CLI output contract.

## Required Top-level Sections

Every future Dry-run Report Model must include the following top-level
sections:

- `report_identity`
- `report_boundary`
- `source_inventory_snapshot`
- `target_intent`
- `agent_plan_entries`
- `output_plan_entries`
- `gate_results`
- `lazy_load_trace`
- `blocking_summary`
- `no_write_evidence`
- `non_authorization_summary`

No top-level section may hide target reads, target writes, GitHub writes,
productive-skill mutation, materializer execution, renderer output, writer
output, loader runtime state, scenario selection, or persistent report paths.

## Required Fields

`report_identity` must contain:

- `report_kind`
- `phase`
- `schema_version`
- `generated_by`
- `generated_at_policy`
- `persistence_policy`

Rules:

- `report_kind` must identify a dry-run report model, not a persistent report.
- `phase` must point to the conceptual dry-run report model phase.
- `schema_version` is documentary and must not imply an executable runtime
  schema.
- `generated_by` must not become runtime identity or authority.
- `generated_at_policy` must not require a real timestamp when deterministic
  fixtures or reviews need stable output.
- `persistence_policy` must state that no persistent report is written in this
  phase.

`report_boundary` must contain:

- `dev_only`
- `read_only`
- `no_target_read`
- `no_target_write`
- `no_github_write`
- `no_productive_skill_mutation`
- `no_runtime_materializer`
- `no_renderer`
- `no_writer`
- `no_loader`
- `no_scenario_selector`
- `no_persistent_report`

`source_inventory_snapshot` must distinguish:

- final source;
- supporting contract;
- temporary parity baseline;
- forbidden final source.

`target_intent` must contain:

- `canonical_target_id`
- `legacy_target_terms_normalized`
- `target_root_policy`
- `target_root_status`
- `target_root_read_policy`
- `planned_output_root_policy`

`agent_plan_entries` must contain one entry per planned agent decision. Each
entry must contain:

- `agent_id`
- `kernel_source`
- `senior_profile_source`
- `template_source`
- `rendering_contract_source`
- `target_contract_source`
- `template_contract_source`
- `source_model_contract_source`

`output_plan_entries` must contain one entry per planned output decision. Each
entry must contain:

- `target`
- `agent`
- `output_shape`
- `planned_path`
- `template_source`
- `kernel_source`
- `senior_profile_source`
- `operation`
- `managed_artifact`
- `existing_file_state`
- `drift_status`
- `blocking_status`
- `block_code`
- `write_status`

`gate_results` entries must contain:

- `gate_id`
- `gate_layer`
- `status`
- `block_code`
- `evidence`

`lazy_load_trace` entries must contain:

- `agent_id`
- `loaded_profile_modules`
- `load_reason`
- `missing_required_modules`
- `blocking_status`
- `block_code`

`blocking_summary` must contain:

- `blocked`
- `block_codes`
- `blocking_layers`
- `blocking_reasons`
- `first_blocking_gate`

`no_write_evidence` must contain:

- `target_write_attempted`
- `target_read_attempted`
- `files_written`
- `persistent_report_written`
- `git_command_used`
- `github_write_attempted`
- `productive_skill_mutation_attempted`

`non_authorization_summary` must state that the model authorizes none of the
forbidden runtime, target, write, GitHub, productive-skill, or persistence
behaviors listed by this contract.

## Optional Fields

Optional fields are allowed only when they remain documentary and do not weaken
required boundaries. Acceptable optional fields include:

- `contract_refs`
- `fixture_case_refs`
- `evidence_refs`
- `notes`
- `review_status`
- `determinism_notes`

Optional fields must not introduce real target paths, persistent report paths,
runtime identifiers, materializer outputs, writer outputs, renderer outputs,
loader state, scenario selector results, write approvals, or new block codes.

## Forbidden And Deprecated Fields

The following fields and values are forbidden:

- `base_agent_source`
- `reference/agents/` as final source
- `target_absolute_path`
- `target_real_path`
- `persistent_report_path`
- `runtime_payload`
- `writer_adapter`
- `renderer_output`
- `loader_result`
- `scenario_selector_result`
- `materializer_result`
- `materializer_execution_id`
- `write_execution_id`
- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`

Fields that hide real writes behind dry-run language are also forbidden,
including:

- `simulated_write_done`
- `dry_run_write_output`
- `materialized_path`
- `generated_file_path`
- `applied_patch`

Equivalent names with the same meaning are also forbidden. A future report
model must fail closed instead of normalizing those fields into accepted
planned-only language.

## Planned Operation Vocabulary

Only these operations are allowed, and only as planning vocabulary:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

These operations do not write, create, update, delete, repair, clean, format,
or persist anything.

These operations are forbidden:

- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`

Any executed operation token blocks the future report model as outside the
dry-run boundary.

## Source Rules

Final source rules are:

- `kernel_source` must point to `reference/kernel_lab/`.
- `senior_profile_source` must point to `reference/seniorization_lab/`.
- `template_source` must point to `reference/templates/`.
- contract source fields must point to
  `reference/materialization_lab/contracts/`.
- `reference/agents/` may appear only as a temporary development parity
  baseline or forbidden final source example.
- `reference/agents/` must never appear as final source.

The model must preserve the final source model:

`kernel_source + senior_profile_source + template_source + supporting materialization contracts`

No source may be inferred from output path, nearby files, legacy target terms,
productive skill files, or historical snapshots.

## Target Intent Rules

`target_intent` represents intent only. It must not prove or require real
target existence.

Rules:

- `canonical_target_id` must resolve through `TARGETS_CONTRACT.md`.
- `legacy_target_terms_normalized` may record documentary normalization such as
  `vscode` to `copilot`.
- `target_root_policy` must state that target roots are future intent only in
  this phase.
- `target_root_status` must not depend on reading a real target root.
- `target_root_read_policy` must prohibit real target reads.
- `planned_output_root_policy` must remain abstract and target-root-relative.
- No field may store an absolute host path or real target path.

## Output Plan Entry Rules

Each output plan entry is a planned artifact decision, not a written artifact.

Rules:

- `planned_path` must be target-root-relative and must follow the canonical
  output shapes from `TARGETS_CONTRACT.md` and
  `TEMPLATES_AND_OUTPUTS_CONTRACT.md`.
- `template_source` must be explicit.
- agent artifacts must include `kernel_source` and `senior_profile_source`.
- target-level Codex artifacts may use null documentary source fields only when
  the related contract allows target-level templates.
- `existing_file_state` and `drift_status` must not require real target reads
  in this phase.
- `write_status` must indicate no write performed.
- blocked entries must use `BLOCKED_PLANNED` and an existing block code.

## Gate Result Rules

`gate_results` represents conceptual or documentary validation state. It must
not execute a checker, store stdout from a real checker run as a persistent
report, or transform any checker into a report generator.

Rules:

- `gate_layer` must map to an existing contract layer or fixture validation
  layer.
- `status` must use statuses already defined by related contracts, such as
  `VALIDATION_PASS`, `VALIDATION_BLOCKED`, and `VALIDATION_FAILED` when
  representing validation-harness state.
- `block_code` must be null only when the gate is not blocked.
- `evidence` must cite documentary sources or fixture-local evidence, not a
  real target read.
- Aggregator stdout must remain outside persistent report storage.

## Lazy-load Trace Rules

Lazy-load is a safety contract, not an optimization.

The future model may include `lazy_load_trace` only to prove that required
Senior Agent Profile modules were loaded because a safety-relevant demand
required them. It must not implement a runtime loader, load all modules by
default, or treat missing traces as warnings.

Rules:

- `loaded_profile_modules` must name profile modules, not runtime files.
- `load_reason` must be tied to material decision, risk/gate, or
  handoff/evidence/output demand.
- `missing_required_modules` must block when a required module is absent.
- Load-all-by-completeness is invalid.
- Lazy-load fixture traces remain documentary fixture inputs.

## Blocking Summary Rules

`blocking_summary` must summarize real conceptual blockers without inventing
new block codes.

Rules:

- `blocked` is true when any required source, target intent, output plan,
  gate, lazy-load trace, no-write evidence, or non-authorization rule blocks.
- `block_codes` must contain only existing block codes declared by related
  contracts.
- `blocking_layers` must identify the responsible contract layer.
- `blocking_reasons` must be specific and auditable.
- `first_blocking_gate` must identify the first conceptual gate that blocks,
  when ordering is meaningful.

## No-write Evidence Rules

`no_write_evidence` must prove no real read or write occurred:

- `target_write_attempted` must be false.
- `target_read_attempted` must be false.
- `files_written` must be empty for target, generated output, persistent
  report, and productive skill surfaces.
- `persistent_report_written` must be false.
- `git_command_used` must be false for the report-producing process. Read-only
  human audit commands such as path-limited `git status` are not report-model
  evidence and must not become write authorization.
- `github_write_attempted` must be false.
- `productive_skill_mutation_attempted` must be false.

If a future process attempts a real target read, target write, persistent
report write, GitHub write, Git write, or productive-skill mutation, the model
must block and must not represent that action as a completed dry-run.

## Non-authorization Summary Rules

`non_authorization_summary` must explicitly state that the Dry-run Report Model
does not authorize:

- real materializer;
- target adapter;
- write approval;
- real renderer;
- real writer;
- runtime loader;
- runtime scenario selector;
- Target real read/write;
- persistent report;
- productive skill mutation;
- GitHub write.

The summary must be present even when every planned entry is otherwise
unblocked.

## Persistence Policy

This phase creates no persistent dry-run report. The report model may be
described in documentation only.

Forbidden persistence includes:

- report files;
- Markdown report output;
- JSON report output;
- caches;
- snapshots;
- temp outputs;
- target reports;
- dry-run report artifacts.

A future phase that wants persistent reports must update the implementation
boundary first and must still preserve no-target-read and no-target-write
rules unless a separate explicit authorization changes them.

## Determinism Policy

The report model must be deterministic from explicit documentary inputs:

- stable canonical agent ordering;
- stable canonical target ordering;
- stable output plan ordering by target and agent;
- explicit source paths only;
- no current-time requirement for fixture determinism;
- no host absolute paths;
- no environment-dependent target root reads;
- no stdout capture as persisted state;
- no hidden filesystem discovery outside the dev skill reference bundle.

`generated_at_policy` may describe how a future implementation handles time,
but it must not force nondeterministic timestamps into fixture expectations.

## Relationship To Fixtures

Existing fixtures may be used as documentary references for scenarios, inputs,
expected blocked behavior, simulated target paths, explicit template sources,
lazy-load traces, and minimal expected-output examples.

Fixtures must not become:

- a persisted complete report snapshot;
- a real target;
- a final source;
- a runtime payload;
- write authorization;
- a substitute for this contract.

This contract does not change fixtures and does not authorize fixture edits.

## Relationship To Validation Checks

The current 9 official checks remain unchanged:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

This contract does not transform any check into a report generator and does
not add a tenth child check.

## Relationship To Aggregator Checker

The Validation Harness Aggregator remains a zero-argument, stdout-only,
dev-only/read-only gate over the 9 official checks. It is registered at:

- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

The Aggregator Checker must continue emitting only:

- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`
- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`

It must not become:

- generic runner;
- JSON emitter;
- Markdown report emitter;
- persistent report writer;
- target-aware command;
- materializer entrypoint;
- report generator.

Aggregator output is not a Dry-run Report Model instance and cannot authorize
materialization, target read/write, GitHub write, or productive-skill mutation.

## Block Codes

This contract introduces no new block codes.

The Dry-run Report Model may reference existing block codes from related
contracts, including:

- `BLOCKED_TARGET_ROOT_INVALID`
- `BLOCKED_PATH_UNSAFE`
- `BLOCKED_UNMANAGED_COLLISION`
- `BLOCKED_INVALID_MANAGED_NOTICE`
- `BLOCKED_DRY_RUN_REQUIRED`
- `BLOCKED_SOURCE_MODEL_INVALID`
- `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`
- `BLOCKED_KERNEL_SOURCE_MISSING`
- `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`
- `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`
- `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`
- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`
- `BLOCKED_TEMPLATE_INFERRED`
- `BLOCKED_RUNTIME_MATERIALIZER_CREATED`
- `BLOCKED_GITHUB_WRITE`
- `BLOCKED_VALIDATION_WRITE_ATTEMPT`
- `BLOCKED_PRODUCTIVE_SKILL_MUTATION`
- `BLOCKED_TARGET_FILE_MUTATION`
- `BLOCKED_MATRIX_INCOMPLETE`
- `BLOCKED_UNKNOWN_BLOCK_CODE`

Fixture and Aggregator block codes remain owned by their existing contracts.
Unknown block codes must block through `BLOCKED_UNKNOWN_BLOCK_CODE` where the
validation harness contract applies.

If a future gap requires a new block code, that gap must be documented in the
owning contract before any implementation uses it. This contract recommends no
new block codes in this phase.

## Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_REPORT_MODEL_CONTRACT: PASS` requires:

- `DRY_RUN_REPORT_MODEL_CONTRACT.md` exists and is registered
  documentarily;
- the contract is documentary/dev-only/read-only;
- the contract does not authorize target real read/write;
- the contract does not authorize GitHub write;
- the contract does not authorize materializer, renderer, writer, loader, or
  scenario selector runtime;
- the contract does not authorize persistent reports;
- `reference/agents/` remains forbidden as final source;
- the final source model remains based on `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  materialization-lab contracts;
- lazy-load remains a safety contract;
- explicit templates remain required;
- executed operations remain forbidden;
- no-write evidence is required;
- non-authorization summary is required;
- the Aggregator Checker remains stdout-only and does not become a report
  generator;
- existing block codes are preserved and no new block code is introduced;
- fixtures remain documentary and do not become report snapshots or targets;
- validation checks remain unchanged and are not transformed into report
  generators.
