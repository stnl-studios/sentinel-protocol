# Target Adapter Contract

Status: documentary/dev-only/read-only contract.

This contract defines a future conceptual Target Adapter boundary inside
`stnl_project_agent_specializer_dev`. It is not a Target Adapter
implementation, executable adapter, TypeScript interface, JavaScript module,
JSON schema, runtime payload, CLI contract, runner contract, filesystem
abstraction, path resolver, Target reader, Target writer, drift detector,
materializer implementation, renderer contract, writer contract, loader
contract, scenario selector contract, write approval protocol, persistent
report contract, or authorization to read or write a real Target.

The adapter described here is only the conceptual boundary between:

```text
canonical target intent
-> target surface description
-> target-root-relative output planning
-> dry-run-only planned artifact compatibility
```

It does not execute an adapter. It does not read a real Target. It does not
write a real Target. It does not resolve absolute host paths. It does not
calculate real drift from target files. It does not decide write approval. It
does not materialize outputs. It does not access GitHub. It does not alter
`skills/stnl_project_agent_specializer/`.

## Purpose

The Target Adapter Contract defines what a later dry-run-only Target Adapter
may conceptually receive, normalize, describe, plan, classify, block, and
return before any implementation exists.

It exists to make the future target boundary auditable before runtime code,
filesystem adapters, path resolvers, target readers, target writers, drift
detectors, materializers, renderers, loaders, scenario selectors, persistent
reports, or write approval are separately authorized. It gives reviewers a
stable documentary contract for canonical target intent, target surfaces,
target-root-relative planned outputs, fixture-only simulated target state,
path safety, no-read/no-write evidence, non-authorization evidence, and
compatibility with the Materializer Interface and Dry-run Report Model.

## Scope

This contract covers only documentary/dev-only/read-only rules for a future
dry-run-only conceptual Target Adapter:

- canonical target intent handling;
- legacy target-term normalization as documentation only;
- target surface description without real Target reads;
- target root policy without absolute host path resolution;
- target-root-relative planned output roots;
- planned path classification without filesystem stat;
- simulated existing and drift state from authorized fixtures or contracts;
- planned artifact compatibility with the dry-run/write boundary;
- accepted and blocked input rules;
- allowed and forbidden output rules;
- no-read/no-write evidence and non-authorization requirements;
- relationship to source, target, template, render-context, dry-run,
  report-model, materializer-interface, fixture, validation, Aggregator, and
  implementation-boundary contracts;
- block behavior, determinism, persistence, and excellent-pass expectations.

The contract may be cited by later planning and audit phases. It does not
create a callable surface.

## Non-scope

This contract does not create or authorize:

- Target Adapter implementation;
- executable adapter;
- TypeScript interface;
- JavaScript module;
- JSON schema;
- runtime payload;
- CLI command, CLI flags, or CLI stdout contract;
- runner;
- filesystem adapter;
- path resolver;
- Target reader;
- Target writer;
- real drift detector;
- materializer implementation;
- real renderer;
- real writer;
- runtime loader;
- runtime scenario selector;
- write approval;
- persistent report;
- Target real read/write;
- filesystem stat against a real Target;
- directory listing of a real Target;
- GitHub write;
- commit, branch, or pull request;
- mutation of `skills/stnl_project_agent_specializer/`;
- real creation of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- materialized output, generated file, patch application, or write result.

## Boundary Invariants

Any future adapter that claims compatibility with this contract must preserve
these invariants:

- `dev_only` is true.
- `read_only` is true.
- `dry_run_only` is true.
- `target_read_attempted` is false.
- `target_write_attempted` is false.
- `filesystem_stat_attempted` is false.
- `directory_listing_attempted` is false.
- `file_content_read_attempted` is false.
- `persistent_report_written` is false.
- `github_write_attempted` is false.
- `productive_skill_mutation_attempted` is false.
- canonical target IDs remain owned by `TARGETS_CONTRACT.md`.
- target intent is not a real Target.
- target surfaces are descriptions only.
- planned paths are target-root-relative.
- absolute host paths are forbidden.
- existing and drift state are simulated/documentary only.
- operations are planned-only.
- executed operation tokens are forbidden.
- the Validation Harness Aggregator remains a fixed 9-check stdout-only gate.

These invariants are documentary boundary evidence. They are not runtime
feature flags that may be switched off.

## Relationship To Existing Contracts

This contract depends on and does not replace these existing contracts:

- `SOURCE_MODEL_CONTRACT.md`: owns final source roles and the prohibition on
  `reference/agents/` as final source.
- `TARGETS_CONTRACT.md`: owns canonical target IDs, legacy target-term
  normalization, and future target-root-relative output path shapes.
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`: owns explicit template requirements,
  output shapes, and `BLOCKED_TEMPLATE_MISSING` behavior.
- `RENDERING_AND_COMPOSITION_CONTRACT.md`: owns deterministic render-context
  composition from explicit kernel, Senior Agent Profile, template, target,
  template/output, and rendering contracts.
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`: owns planned artifact entries,
  planned-only operations, path safety, managed-artifact policy, drift policy,
  and write-boundary blocking.
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`: owns the conceptual `dry_run_report`
  shape and the no-persistent-report boundary.
- `MATERIALIZER_INTERFACE_CONTRACT.md`: owns the conceptual Materializer
  Interface boundary from validated intent to dry-run-only planning, planned
  output entries, and Dry-run Report Model compatibility.
- `VALIDATION_HARNESS_CONTRACT.md`: owns future validation layers, statuses,
  no-write enforcement, matrix completeness, and validation block behavior.
- `FIXTURE_BOUNDARY_CONTRACT.md`: owns fixture containment, fixture path
  safety, and the distinction between fixture-local strings and real target
  artifacts.
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`: owns the current fixed
  9-check Aggregator boundary, order, statuses, stdout-only policy, and
  zero-argument policy.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md`: owns the separately authorized
  dev-only script boundary and continues to forbid Target Adapter
  implementation in this phase.

This contract does not alter final source roots, canonical target IDs, legacy
target normalization, output shapes, explicit template requirements, render
composition, dry-run/write boundary, Dry-run Report Model, Materializer
Interface, validation harness, fixture boundary, Aggregator behavior,
implementation boundary, or runtime authorization.

## Adapter Responsibility

The future Target Adapter would be responsible only for representing a
dry-run-only target boundary:

- receive canonical target intent;
- normalize legacy target terms without reading a real Target;
- validate canonical target IDs against `TARGETS_CONTRACT.md`;
- describe target surfaces as conceptual output surfaces;
- describe target-root policy without resolving absolute host paths;
- plan target-root-relative output roots;
- classify planned output paths without filesystem stat;
- classify simulated existing state from authorized fixtures or contracts;
- classify simulated drift state from authorized fixtures or contracts;
- evaluate path safety against the dry-run/write boundary;
- represent managed-artifact compatibility;
- return a conceptual result that includes blocking and non-authorization
  evidence.

It must not decide, perform, or imply real Target access or real
materialization.

## Adapter Lifecycle

A future compatible lifecycle may use these conceptual steps:

1. `RECEIVE_TARGET_INTENT`
2. `NORMALIZE_LEGACY_TARGET_TERMS`
3. `VALIDATE_CANONICAL_TARGET_ID`
4. `DESCRIBE_TARGET_SURFACES`
5. `PLAN_TARGET_ROOT_RELATIVE_OUTPUTS`
6. `CLASSIFY_SIMULATED_EXISTING_STATE`
7. `CLASSIFY_SIMULATED_DRIFT_STATE`
8. `EVALUATE_PATH_SAFETY`
9. `RETURN_CONCEPTUAL_TARGET_ADAPTER_RESULT`

Lifecycle rules:

- every step is documentary/conceptual;
- no step reads a real Target;
- no step writes a real Target;
- no step resolves an absolute host path;
- no step verifies real filesystem state;
- no step calculates drift by reading a real Target;
- no step persists a report;
- no step executes a materializer, renderer, writer, loader, scenario
  selector, adapter, filesystem adapter, path resolver, reader, or writer;
- no step calls the Aggregator as a report generator;
- no step creates write approval;
- no step creates `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- no step changes `skills/stnl_project_agent_specializer/`.

## Conceptual Input Model

The minimum conceptual request shape is:

```text
target_adapter_request
  request_identity
  target_intent
  target_policy
  output_surface_policy
  path_policy
  existing_state_policy
  drift_policy
  boundary_policy
```

Candidate fields include:

- `request_kind`
- `phase`
- `canonical_target_id`
- `legacy_target_terms`
- `target_root_policy`
- `target_root_read_policy`
- `target_root_write_policy`
- `planned_output_root_policy`
- `output_shapes_requested`
- `simulated_target_state_refs`
- `fixture_case_refs`
- `path_safety_policy`
- `managed_artifact_policy`
- `drift_policy`

Field rules:

- `canonical_target_id` must be validated against `TARGETS_CONTRACT.md`.
- `legacy_target_terms` may be normalized only documentary/conceptually.
- `target_root_policy` must be intent-only.
- `target_root_read_policy` must prohibit Target real read.
- `target_root_write_policy` must prohibit Target real write.
- `planned_output_root_policy` must be target-root-relative.
- `output_shapes_requested` must follow `TARGETS_CONTRACT.md` and
  `TEMPLATES_AND_OUTPUTS_CONTRACT.md`.
- `simulated_target_state_refs` may point only to authorized fixtures or
  documentary contracts.
- `fixture_case_refs` must not become a real Target.
- `path_safety_policy` must follow `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.
- `managed_artifact_policy` must follow
  `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.
- `drift_policy` must not depend on reading a real Target.
- no request field may contain an absolute host path or real Target path.

## Conceptual Output Model

The minimum conceptual result shape is:

```text
target_adapter_result
  result_identity
  boundary_result
  canonical_target
  normalized_legacy_terms
  target_surface_plan
  planned_output_roots
  planned_path_entries
  simulated_existing_state
  simulated_drift_state
  path_safety_results
  managed_artifact_results
  blocking_summary
  no_read_no_write_evidence
  non_authorization_summary
```

Result rules:

- output is conceptual;
- output is not a persisted file;
- output is not mandatory JSON;
- output is not a mandatory runtime object;
- output is not a CLI stdout contract;
- output must not contain an absolute host path;
- output must not contain a Target real path;
- output must not contain filesystem stat results;
- output must not contain file content read from a Target;
- output must not contain a materialized file;
- output must not contain a generated file;
- output must not contain a patch applied to any filesystem;
- output must not contain a write result;
- output must not contain an adapter execution id.

## Accepted Inputs

The future adapter may accept only conceptual/documentary inputs that:

- declare a valid canonical target;
- use target intent, not a real Target;
- normalize legacy target terms only documentary/conceptually;
- declare known output shapes;
- use target-root-relative planned output roots;
- use simulated target state only from authorized fixtures or documentation;
- require no-target-read;
- require no-target-write;
- prohibit absolute host paths;
- prohibit persistent report;
- prohibit GitHub write;
- prohibit mutation of `skills/stnl_project_agent_specializer/`;
- preserve path safety;
- preserve managed-artifact policy;
- preserve planned-only operations;
- preserve no-read/no-write evidence;
- preserve non-authorization summary.

## Blocked Inputs

The future adapter must block inputs that attempt to:

- pass a real Target absolute path;
- pass a host absolute path;
- request Target real read;
- request Target real write;
- request filesystem stat against a real Target;
- request drift calculation by reading a real Target;
- request real directory listing of a Target;
- request real creation of `.github/**`;
- request real creation of `.codex/**`;
- request real creation of `AGENTS.md`;
- request Target Adapter implementation;
- request filesystem adapter;
- request real path resolver;
- request real Target reader;
- request real Target writer;
- request real materializer;
- request real renderer;
- request real writer;
- request runtime loader;
- request runtime scenario selector;
- request write approval;
- request persistent report;
- request GitHub write;
- request mutation of `skills/stnl_project_agent_specializer/`;
- request executed operation;
- request applied patch;
- request materialized output;
- request commit, branch, or pull request;
- use a fixture path as a real Target;
- use a simulated target path as a real absolute host path;
- infer target by real directory inspection;
- infer template by real path inspection;
- use `reference/agents/` as final source.

Equivalent requests that hide Target real read/write behind dry-run language
must also block.

## Allowed Conceptual Outputs

Only these conceptual outputs are allowed:

- `canonical_target`
- `normalized_legacy_terms`
- `target_surface_plan`
- `planned_output_roots`
- `planned_path_entries`
- `simulated_existing_state`
- `simulated_drift_state`
- `path_safety_results`
- `managed_artifact_results`
- `blocking_summary`
- `no_read_no_write_evidence`
- `non_authorization_summary`

Allowed operation vocabulary is limited to planned artifacts:

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
- `target_absolute_path`
- `target_real_path`
- `host_absolute_path`
- `filesystem_stat_result`
- `real_directory_listing`
- `existing_file_contents`
- `real_drift_result`
- `materialized_file`
- `generated_file`
- `applied_patch`
- `persistent_report_path`
- `runtime_payload`
- `target_adapter_result_real`
- `target_adapter_execution_id`
- `filesystem_adapter_result`
- `path_resolver_result`
- `reader_result`
- `writer_output`
- `materializer_result`
- `renderer_output`
- `loader_result`
- `scenario_selector_result`
- `write_approval_result`
- `github_write_result`
- `commit_hash`
- `branch_name`
- `pull_request_url`

Semantic equivalents are forbidden even when renamed. A future adapter must
fail closed rather than accepting output fields that disguise real Target
read/write as dry-run evidence.

## Canonical Target Rules

Canonical target rules are inherited from `TARGETS_CONTRACT.md`:

- the only canonical target IDs are `copilot` and `codex`;
- every target intent must resolve to one of those IDs or block before any
  planned output decision;
- this contract cannot create new canonical targets;
- this contract cannot deprecate or rename existing canonical targets;
- this contract cannot prove existence of a real Target;
- this contract cannot read target directories;
- this contract cannot create real outputs.

## Legacy Target-Term Normalization

Legacy target-term normalization remains documentary only.

When used in target-runtime context, the following terms normalize to
`copilot` as owned by `TARGETS_CONTRACT.md`:

- `vscode`
- `VS Code`
- `VS Code/GitHub`
- `GitHub Agents`

The normalization must not rewrite historical audits, frozen profiles, old
contracts, productive skill files, or unrelated references unless a separate
authorized migration scopes that edit. The normalization must not infer a real
target path or choose a template by filesystem inspection.

## Target Surface Rules

Target surfaces are conceptual descriptions of supported output shapes, not
real directories.

Allowed target surface descriptions are:

- `copilot_agent_surface`: `.github/agents/*.agent.md`
- `codex_agent_surface`: `.codex/agents/*.toml`
- `codex_config_surface`: `.codex/config.toml`
- `codex_root_instructions_surface`: `AGENTS.md`

Rules:

- surfaces must be derived from `TARGETS_CONTRACT.md` and
  `TEMPLATES_AND_OUTPUTS_CONTRACT.md`;
- surfaces do not prove real directory existence;
- surfaces do not authorize directory creation;
- surfaces do not authorize file creation;
- surfaces must not be expanded by nearby target files or naming symmetry;
- surfaces may appear as fixture-local strings only inside the authorized
  fixture boundary.

## Target Root Policy

Target root policy is intent-only in this phase.

Rules:

- a conceptual target root may be described only as target intent;
- no absolute host path may be accepted or returned;
- no real path may be resolved;
- no filesystem stat may prove target root existence;
- no directory listing may prove target root contents;
- no symlink or canonical path resolution may run against a real Target;
- invalid target-root intent blocks through existing dry-run/write-boundary
  block behavior such as `BLOCKED_TARGET_ROOT_INVALID` when applicable.

## Target Path Policy

Target paths are planned path strings only.

Rules:

- planned target paths must be target-root-relative;
- planned target paths must follow canonical output shapes;
- host absolute paths are prohibited;
- Target real paths are prohibited;
- path traversal is prohibited;
- paths outside canonical target surfaces are prohibited;
- fixture simulated paths must not become real paths;
- `.github/**`, `.codex/**`, and `AGENTS.md` are only output shapes or
  fixture-local strings in this phase.

Unsafe planned paths block with `BLOCKED_PATH_UNSAFE` where the
dry-run/write-boundary contract applies.

## Planned Output Root Policy

Planned output roots are conceptual roots relative to target intent:

- `copilot`: `.github/agents/`
- `codex`: `.codex/agents/`
- `codex`: `.codex/`
- `codex`: target root for `AGENTS.md`

Rules:

- planned output roots are not real directories;
- planned output roots do not authorize mkdir, write, repair, cleanup, or
  delete;
- planned output roots must not be represented as host absolute paths;
- planned output roots must align with explicit templates and output shapes;
- missing or unsupported output shapes remain blocked before any output
  decision.

## Simulated Target State And Fixture Relationship

Simulated target state may come only from documentary fixtures or contracts.

Allowed simulated state sources include:

- authorized `FIXTURE.md` cases under
  `reference/materialization_lab/fixtures/`;
- fixture-local simulated target paths;
- fixture-local existing state examples;
- fixture-local drift cases;
- fixture-local collision cases;
- fixture-local managed-artifact examples;
- fixture-local expected blocked behavior;
- documentary contract examples.

Fixtures must not become:

- a real Target;
- a real filesystem;
- a final source;
- a runtime payload;
- a real adapter result;
- a persistent report;
- read authorization;
- write authorization;
- substitute for this contract.

This contract does not change fixtures and does not authorize fixture edits.

## Existing-file And Drift Policy

Existing-file and drift classifications are simulated/documentary in this
phase.

Rules:

- `existing_file_state` is simulated/documentary only;
- `drift_status` is simulated/documentary only;
- no classification may depend on Target real read;
- no classification may depend on real filesystem stat;
- no classification may depend on reading real file contents;
- simulated existing and drift state may come only from authorized fixtures or
  documentary contracts.

The following real-state tokens are forbidden:

- `REAL_FILE_EXISTS`
- `REAL_FILE_MISSING`
- `REAL_CONTENT_DIFF`
- `REAL_DRIFT_DETECTED`
- `REAL_FILESYSTEM_STATE`

If a future request needs real existing-file or drift classification, it is
outside this contract and must block before any Target access.

## Managed Artifact Relationship

Managed-artifact compatibility remains owned by
`DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.

The conceptual adapter may represent:

- whether a planned output entry expects a Sentinel managed notice;
- whether a fixture-local simulated existing artifact is managed;
- whether a fixture-local simulated existing artifact has an invalid managed
  notice;
- whether a fixture-local simulated existing artifact would collide as
  unmanaged.

It must not overwrite a file, read a real managed notice, infer managed state
from path shape alone, or approve writing over a manual file. Unmanaged
collision and invalid managed notice behavior remains blocking through
`BLOCKED_UNMANAGED_COLLISION` and `BLOCKED_INVALID_MANAGED_NOTICE`.

## Path Safety Relationship

Path safety remains owned by `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` and
`FIXTURE_BOUNDARY_CONTRACT.md`.

The conceptual adapter may represent path safety results for target-root-
relative planned paths and fixture-local simulated paths. It must not:

- resolve real absolute paths;
- follow symlinks;
- inspect real filesystem state;
- accept traversal paths;
- accept paths outside canonical output surfaces;
- use fixture paths as real target paths.

Managed artifact notice remains required when applicable. Unmanaged collision,
invalid managed notice, invalid target root, unsafe path, and missing dry-run
plan behavior remain fail-closed.

## Materializer Interface Relationship

The Materializer Interface may, in a future conceptual phase, depend on a
Target Adapter result for:

- canonical target validation;
- target surface plan;
- planned output roots;
- planned path entries;
- simulated existing state;
- simulated drift state;
- path safety results;
- managed artifact results.

That does not mean:

- executing a Target Adapter;
- reading a real Target;
- writing a real Target;
- resolving an absolute path;
- calculating real drift;
- approving writes;
- persisting a report;
- materializing output.

The Materializer Interface remains conceptual and dry-run-only under
`MATERIALIZER_INTERFACE_CONTRACT.md`.

## Dry-run Report Model Relationship

A conceptual Target Adapter result may feed these Dry-run Report Model
sections:

- `target_intent`
- `output_plan_entries`
- `blocking_summary`
- `no_write_evidence`
- `non_authorization_summary`

That does not mean:

- persisting a Dry-run Report;
- serializing JSON;
- defining CLI output;
- creating a runtime payload;
- executing a materializer;
- reading a real Target;
- writing a real Target.

The Target Adapter result is not itself a persistent dry-run report.

## Planned Artifact Relationship

The conceptual adapter may represent planned artifact compatibility aligned
with `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`:

- `planned_path_entries`
- `path_safety_results`
- `managed_artifact_results`
- `simulated_existing_state`
- `simulated_drift_state`

It must not:

- verify a real file;
- read real content;
- calculate real drift;
- create a file;
- update a file;
- delete a file;
- apply a patch;
- persist output.

Planned entries must preserve only planned operations:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

## No-read/No-write Evidence

Any conceptual result must preserve these no-read/no-write evidence values:

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
```

Human read-only audit commands outside the model, such as path-limited
`git status`, may exist during review. They are not runtime evidence and do
not authorize write behavior.

## Non-authorization Rules

The Target Adapter Contract does not authorize:

- Target Adapter implementation;
- filesystem adapter;
- path resolver;
- Target reader;
- Target writer;
- real drift detector;
- real materializer;
- real renderer;
- real writer;
- runtime loader;
- runtime scenario selector;
- write approval;
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

The future adapter must fail closed. When any required input, target intent,
target surface, planned output root, planned path entry, simulated state,
path-safety result, managed-artifact result, no-read/no-write evidence, or
non-authorization rule is invalid, the conceptual result must:

- set the related planned operation to `BLOCKED_PLANNED` when an output entry
  exists;
- use an existing block code owned by the relevant contract;
- identify the responsible layer;
- avoid partial execution;
- avoid fallback to inferred templates, productive skill files, real Target
  files, or `reference/agents/`;
- avoid Target read/write while blocked.

Unknown block codes remain blocking through `BLOCKED_UNKNOWN_BLOCK_CODE` where
the validation harness contract applies.

## Determinism Policy

Conceptual results must be deterministic from explicit documentary inputs:

- stable canonical target ordering;
- stable target surface ordering;
- stable planned output root ordering;
- stable planned path ordering;
- explicit output shapes;
- explicit fixture references;
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
- target adapter result files;
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
does not make the Aggregator a runtime dependency of a Target Adapter.

## Block Codes

This contract introduces no new block codes.

The future adapter may reference existing block codes owned by related
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

`MATERIALIZATION_TARGET_ADAPTER_CONTRACT: PASS` requires:

- `TARGET_ADAPTER_CONTRACT.md` exists;
- the contract is documentary/dev-only/read-only;
- the contract does not implement a Target Adapter;
- the contract does not create an executable adapter;
- the contract does not create CLI, runner, filesystem adapter, path resolver,
  Target reader, Target writer, real drift detector, materializer, renderer,
  writer, loader, scenario selector, write approval, persistent report, or
  Target real read/write authorization;
- the final source model remains based on `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains forbidden as final source;
- target intent remains separated from any real Target;
- planned paths remain target-root-relative;
- simulated target state remains restricted to authorized fixtures or
  documentary contracts;
- existing and drift state remain simulated/documentary;
- planned-only operations remain preserved;
- executed operations remain forbidden;
- the Dry-run Report Model remains non-persistent;
- the Materializer Interface remains conceptual;
- the Aggregator Checker remains a fixed 9-check stdout-only gate;
- no checker becomes a report generator;
- no-read/no-write evidence and non-authorization summary are mandatory;
- no new block code is created without strong justification;
- no GitHub write, productive-skill mutation, commit, branch, or pull request
  is authorized.
