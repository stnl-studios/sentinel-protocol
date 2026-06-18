# Materializer Interface Contract

Status: documentary/dev-only/read-only contract.

This contract defines a future dry-run-only Materializer Interface as a
conceptual boundary inside `stnl_project_agent_specializer_dev`. It is not a
materializer implementation, executable interface, TypeScript interface,
JavaScript module, JSON schema, runtime payload, CLI contract, runner contract,
target adapter contract, write approval protocol, renderer contract, writer
contract, loader contract, scenario selector contract, persistent report
contract, or authorization to read or write a real Target.

The interface described here is only the conceptual boundary between:

```text
validated materialization intent
-> dry-run-only planning
-> conceptual planned output entries
-> conceptual dry-run report model
```

It does not execute materialization. It does not render files. It does not
write files. It does not read a real Target. It does not decide write approval.
It does not access GitHub. It does not alter
`skills/stnl_project_agent_specializer/`.

## Purpose

The Materializer Interface Contract defines what a later dry-run-only
interface may conceptually receive, normalize, plan, block, and return before
any implementation exists.

It exists to make the future boundary auditable before runtime code, target
adapters, writers, renderers, loaders, scenario selectors, persistent reports,
or write approval are separately authorized. It gives reviewers a stable
documentary contract for accepted inputs, blocked inputs, allowed conceptual
outputs, forbidden outputs, no-write evidence, non-authorization evidence, and
compatibility with the existing Dry-run Report Model.

## Scope

This contract covers only documentary/dev-only/read-only rules for a future
dry-run-only Materializer Interface:

- conceptual request sections;
- conceptual result sections;
- accepted and blocked input rules;
- allowed and forbidden output rules;
- relationship to source, target, template, render-context, dry-run,
  report-model, fixture, validation, Aggregator, and implementation-boundary
  contracts;
- lifecycle vocabulary for future planning;
- block behavior, determinism, persistence, lazy-load, no-write evidence, and
  non-authorization requirements.

The contract may be cited by later planning and audit phases. It does not
create a callable surface.

## Non-scope

This contract does not create or authorize:

- materializer implementation;
- executable interface;
- TypeScript interface;
- JavaScript module;
- JSON schema;
- runtime payload;
- CLI command, CLI flags, or CLI stdout contract;
- runner;
- target adapter;
- write approval;
- real renderer;
- real writer;
- runtime loader;
- runtime scenario selector;
- persistent report;
- Target real read/write;
- GitHub write;
- commit, branch, or pull request;
- mutation of `skills/stnl_project_agent_specializer/`;
- real creation of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- materialized output, generated file, patch application, or write result.

## Boundary Invariants

Any future interface that claims compatibility with this contract must preserve
these invariants:

- `dry_run_required` is true.
- `dev_only` is true.
- `read_only` is true.
- `target_read_attempted` is false.
- `target_write_attempted` is false.
- `persistent_report_written` is false.
- `github_write_attempted` is false.
- `productive_skill_mutation_attempted` is false.
- source roots are final-source roots, not `reference/agents/`.
- templates are explicit.
- operations are planned-only.
- executed operation tokens are forbidden.
- lazy-load is a safety contract, not an optimization.
- the Validation Harness Aggregator remains a fixed 9-check stdout-only gate.

These invariants are documentary boundary evidence. They are not runtime
feature flags that may be switched off.

## Relationship To Existing Contracts

This contract depends on and does not replace these existing contracts:

- `SOURCE_MODEL_CONTRACT.md`: owns final source roles, kernel source
  requirements, Senior Agent Profile source requirements, template source
  requirements, and the prohibition on `reference/agents/` as final source.
- `TARGETS_CONTRACT.md`: owns canonical target IDs, legacy target-term
  normalization, and future target-root-relative output path shapes.
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`: owns explicit template requirements and
  `BLOCKED_TEMPLATE_MISSING` behavior.
- `RENDERING_AND_COMPOSITION_CONTRACT.md`: owns deterministic render-context
  composition from explicit kernel, Senior Agent Profile, template, target,
  template/output, and rendering contracts.
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`: owns planned artifact entries,
  planned-only operations, path safety, managed-artifact policy, drift policy,
  and write-boundary blocking.
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`: owns the conceptual `dry_run_report`
  shape and the no-persistent-report boundary.
- `VALIDATION_HARNESS_CONTRACT.md`: owns future validation layers, statuses,
  no-write enforcement, matrix completeness, and validation block behavior.
- `FIXTURE_BOUNDARY_CONTRACT.md`: owns fixture containment, fixture path
  safety, and the distinction between fixture-local strings and real target
  artifacts.
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`: owns the current fixed
  9-check Aggregator boundary, order, statuses, stdout-only policy, and
  zero-argument policy.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md`: owns the separately authorized
  dev-only script boundary and continues to forbid runtime materializer
  interface implementation in this phase.

This contract does not alter final source roots, canonical targets, explicit
templates, render composition, dry-run/write boundary, dry-run report model,
validation harness, fixture boundary, Aggregator behavior, implementation
boundary, or runtime authorization.

## Interface Responsibility

The future Materializer Interface would be responsible only for representing a
dry-run-only boundary:

- receive validated or pre-validated materialization intent;
- normalize target intent without reading a real Target;
- resolve final-source plans from documentary sources;
- plan render-context composition without rendering;
- plan output entries without writing;
- represent conceptual gate results without executing checkers;
- build or reference a conceptual Dry-run Report Model without persistence;
- return a conceptual result that includes blocking and non-authorization
  evidence.

It must not decide, perform, or imply real materialization.

## Interface Lifecycle

A future compatible lifecycle may use these conceptual steps:

1. `RECEIVE_INTENT`
2. `NORMALIZE_TARGET_INTENT`
3. `RESOLVE_FINAL_SOURCES`
4. `COMPOSE_RENDER_CONTEXT_PLAN`
5. `BUILD_OUTPUT_PLAN`
6. `EVALUATE_GATES`
7. `BUILD_DRY_RUN_REPORT_MODEL`
8. `RETURN_CONCEPTUAL_RESULT`

Lifecycle rules:

- every step is documentary/conceptual;
- no step reads a real Target;
- no step writes a real Target;
- no step persists a report;
- no step executes a renderer, writer, loader, scenario selector, target
  adapter, materializer, or runtime planner;
- no step calls the Aggregator as a report generator;
- no step creates an adapter;
- no step creates `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- no step changes `skills/stnl_project_agent_specializer/`.

## Conceptual Input Model

The minimum conceptual request shape is:

```text
materializer_interface_request
  request_identity
  requested_target
  requested_agents
  source_policy
  template_policy
  dry_run_policy
  validation_policy
  report_model_policy
  boundary_policy
```

Candidate fields include:

- `request_kind`
- `phase`
- `canonical_target_id`
- `legacy_target_terms`
- `agent_ids`
- `source_roots`
- `template_refs`
- `contract_refs`
- `dry_run_required`
- `target_read_policy`
- `target_write_policy`
- `persistent_report_policy`
- `write_approval_policy`

Field rules:

- `dry_run_required` must be true.
- `target_read_policy` must prohibit Target real read.
- `target_write_policy` must prohibit Target real write.
- `persistent_report_policy` must prohibit persistent report output in this
  phase.
- `write_approval_policy` must declare write approval out of scope.
- `source_roots` must not include `reference/agents/` as final source.
- `template_refs` must be explicit and point under `reference/templates/`.
- `contract_refs` must point to existing documentary contracts.
- request identity must not become runtime identity or materializer execution
  authority.
- no request field may contain an absolute host path or real Target path.

## Conceptual Output Model

The minimum conceptual result shape is:

```text
materializer_interface_result
  result_identity
  boundary_result
  normalized_target_intent
  resolved_source_plan
  render_context_plan
  output_plan_entries
  gate_results
  dry_run_report_model_ref
  blocking_summary
  no_write_evidence
  non_authorization_summary
```

Result rules:

- output is conceptual;
- output is not a persisted file;
- output is not mandatory JSON;
- output is not a mandatory runtime object;
- output is not a CLI stdout contract;
- output must not contain a Target real absolute path;
- output must not contain a materialized file;
- output must not contain a patch applied to any filesystem;
- output must not contain a write result;
- output must not contain a materializer execution id.

## Accepted Inputs

The future interface may accept only conceptual/documentary inputs that:

- declare a valid canonical target;
- use target intent, not a real Target;
- declare known canonical agent IDs;
- use final sources explicitly;
- use explicit templates;
- require dry-run;
- prohibit Target real read/write;
- prohibit persistent report;
- prohibit GitHub write;
- prohibit mutation of `skills/stnl_project_agent_specializer/`;
- reference existing contracts;
- preserve lazy-load as a safety contract;
- preserve no-write evidence;
- preserve non-authorization summary.

Accepted final sources remain:

- `reference/kernel_lab/`
- `reference/seniorization_lab/`
- `reference/templates/`
- `reference/materialization_lab/contracts/`

`reference/agents/` may appear only as temporary development parity baseline
or as a forbidden final-source example.

## Blocked Inputs

The future interface must block inputs that attempt to:

- use `reference/agents/` as final source;
- omit an explicit template;
- infer a template by path, target legacy term, nearby file, or productive
  skill;
- pass a Target real absolute path;
- request Target real read;
- request Target real write;
- request persistent report;
- request real materializer;
- request real renderer;
- request real writer;
- request runtime loader;
- request runtime scenario selector;
- request target adapter;
- request write approval;
- request GitHub write;
- request mutation of `skills/stnl_project_agent_specializer/`;
- request real creation of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- request executed operation;
- request applied patch;
- request materialized output;
- request commit, branch, or pull request.

Equivalent requests that hide execution behind dry-run language must also
block.

## Allowed Conceptual Outputs

Only these conceptual outputs are allowed:

- `normalized_target_intent`
- `resolved_source_plan`
- `render_context_plan`
- `output_plan_entries`
- `gate_results`
- `lazy_load_trace`
- `dry_run_report_model_ref`
- `blocking_summary`
- `no_write_evidence`
- `non_authorization_summary`

Allowed operation vocabulary is limited to:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

These operations are planned-only and write nothing.

## Forbidden Outputs

The following outputs are forbidden:

- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`
- `materialized_file`
- `generated_file`
- `applied_patch`
- `target_absolute_path`
- `target_real_path`
- `persistent_report_path`
- `runtime_payload`
- `materializer_result`
- `materializer_execution_id`
- `renderer_output`
- `writer_output`
- `writer_adapter`
- `loader_result`
- `scenario_selector_result`
- `target_adapter_result`
- `write_approval_result`
- `github_write_result`
- `commit_hash`
- `branch_name`
- `pull_request_url`

Semantic equivalents are forbidden even when renamed. A future interface must
fail closed rather than accepting output fields that disguise real execution as
dry-run evidence.

## Source Rules

Final-source rules are inherited from `SOURCE_MODEL_CONTRACT.md`:

- `kernel_source` must point under `reference/kernel_lab/`.
- `senior_profile_source` must point under `reference/seniorization_lab/`.
- `template_source` must point under `reference/templates/`.
- contract source fields must point under
  `reference/materialization_lab/contracts/`.
- `reference/agents/` must never be a final source.
- deprecated field `base_agent_source` must not appear in final request,
  render context, output plan, or report model shapes.
- `base_agent_parity_source`, if present in a separate parity context, remains
  dev-only parity metadata and must not drive materialization planning.

No source may be inferred from target path, legacy target terms, historical
audit text, productive skill files, or fixture snapshots.

## Target Intent Rules

Target intent is intent only. It must not prove, inspect, mutate, or depend on
a real Target.

Rules:

- `canonical_target_id` must be one of the canonical targets owned by
  `TARGETS_CONTRACT.md`.
- legacy terms may be normalized only as documentary target intent, for
  example `vscode` to `copilot`.
- target-root policy must be no-real-read in this phase.
- target-write policy must be no-real-write in this phase.
- planned paths must remain target-root-relative.
- absolute host paths and real Target paths are forbidden.
- `.github/**`, `.codex/**`, and `AGENTS.md` remain output shapes or
  fixture-local strings only, not real write destinations.

## Render Context Relationship

The future interface may only plan render-context composition. It may represent
which explicit sources would be used by a later renderer, but it must not
execute rendering.

It must not:

- execute a real renderer;
- generate rendered files;
- persist render output;
- infer templates;
- replace explicit templates;
- load final source from `reference/agents/`;
- read a real Target to calculate real drift.

The render context plan must remain compatible with
`RENDERING_AND_COMPOSITION_CONTRACT.md`.

## Dry-run Report Model Relationship

The future interface may conceptually build or reference a Dry-run Report Model
that is compatible with `DRY_RUN_REPORT_MODEL_CONTRACT.md`.

That does not mean:

- persisting a report;
- serializing JSON;
- defining CLI output;
- creating a runtime payload;
- executing a materializer;
- reading a real Target;
- writing a real Target.

The conceptual result must be compatible with this shape:

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

The Materializer Interface result is not itself a persistent dry-run report.

## Planned Artifact Relationship

The future interface may produce `output_plan_entries` only as planned
artifact decisions aligned with `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.

Allowed operations are:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

Forbidden operations are:

- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`

Planned entries must not include materialized file contents, generated files,
applied patches, write ids, persistent report paths, or Target real paths.

## Gate And Validation Relationship

The future interface may represent conceptual `gate_results` and
`blocking_summary`. It must not execute validation checkers.

It must not:

- run checkers;
- transform checkers into report generators;
- persist stdout;
- call the Aggregator as a runtime dependency;
- expand the Aggregator;
- create a tenth check;
- replace the validation harness.

Validation status vocabulary and validation block behavior remain owned by
`VALIDATION_HARNESS_CONTRACT.md`.

## Lazy-load Relationship

Lazy-load is a safety contract, not an optimization.

The future interface must require a conceptual lazy-load trace when a decision
demands Senior Agent Profile modules beyond the identity/boundary module.

The interface must block when:

- a required module is absent;
- `load_reason` is too generic to tie to a material decision, risk/gate, or
  handoff/evidence/output demand;
- trace is omitted when needed;
- load-all is used to hide missing decision logic;
- lazy-load is treated as optional optimization.

The interface must not implement a runtime loader.

## No-write Evidence Relationship

Any conceptual result must preserve these no-write evidence values:

```text
target_write_attempted: false
target_read_attempted: false
files_written: []
persistent_report_written: false
git_command_used: false
github_write_attempted: false
productive_skill_mutation_attempted: false
```

Human read-only audit commands outside the model, such as path-limited
`git status`, may exist during review. They are not runtime evidence and do
not authorize write behavior.

## Non-authorization Rules

The Materializer Interface Contract does not authorize:

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
- GitHub write;
- commit;
- branch;
- pull request.

The non-authorization summary must be present in every conceptual result, even
when there are no blockers.

## Failure And Block Behavior

The future interface must fail closed. When any required input, source,
template, target intent, render context plan, output plan entry, gate result,
lazy-load trace, no-write evidence, or non-authorization rule is invalid, the
conceptual result must:

- set the related planned operation to `BLOCKED_PLANNED` when an output entry
  exists;
- use an existing block code owned by the relevant contract;
- identify the responsible layer;
- avoid partial execution;
- avoid fallback to inferred templates, productive skill files, or
  `reference/agents/`;
- avoid target read/write while blocked.

Unknown block codes remain blocking through `BLOCKED_UNKNOWN_BLOCK_CODE` where
the validation harness contract applies.

## Determinism Policy

Conceptual results must be deterministic from explicit documentary inputs:

- stable canonical agent ordering;
- stable canonical target ordering;
- stable planned output ordering;
- explicit source paths;
- explicit template references;
- explicit contract references;
- no current-time requirement;
- no host absolute paths;
- no filesystem discovery outside the dev skill reference bundle;
- no real Target read;
- no persisted stdout as state.

Any future timestamp policy must be deterministic or optional in fixture and
audit contexts.

## Persistence Policy

This contract creates no persistent report and no output path.

Forbidden persistence includes:

- Markdown reports;
- JSON reports;
- report files;
- caches;
- snapshots;
- temp outputs;
- target reports;
- dry-run report artifacts;
- materializer result files.

A later phase that wants persistence must update the relevant implementation
and report-model boundaries before any implementation writes output.

## Aggregator Boundary

The Validation Harness Aggregator remains unchanged. It coordinates exactly
the current 9 read-only child checks in this order:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

Expected Aggregator verdicts remain:

- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`
- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`

This contract does not add a tenth child check, does not transform the
Aggregator into a report generator, does not change stdout-only behavior, and
does not make the Aggregator a runtime dependency of a materializer interface.

## Block Codes

This contract introduces no new block codes.

The future interface may reference existing block codes owned by related
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

No new block code is recommended in this phase. If a future gap requires one,
the proposal must document:

- why current block codes do not cover the gap;
- which contract owns the new code;
- whether the code is documentary only;
- whether a future checker would be required;
- which risk the code resolves.

## Excellent Pass Expectations

`MATERIALIZATION_MATERIALIZER_INTERFACE_CONTRACT: PASS` requires:

- `MATERIALIZER_INTERFACE_CONTRACT.md` exists;
- the contract is documentary/dev-only/read-only;
- the contract does not implement a materializer;
- the contract does not create an executable interface;
- the contract does not create CLI, runner, target adapter, write approval,
  renderer, writer, loader, scenario selector, persistent report, or Target
  real read/write authorization;
- the final source model remains based on `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains forbidden as final source;
- explicit templates remain required;
- planned-only operations remain preserved;
- executed operations remain forbidden;
- the Dry-run Report Model remains conceptual and non-persistent;
- the Aggregator Checker remains a fixed 9-check stdout-only gate;
- no checker becomes a report generator;
- lazy-load remains a safety contract;
- no-write evidence and non-authorization summary are mandatory;
- no new block code is created without strong justification;
- no GitHub write, productive-skill mutation, commit, branch, or pull request
  is authorized.
