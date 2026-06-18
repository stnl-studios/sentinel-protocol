# Write Approval Protocol Contract

Status: documentary/dev-only/read-only contract.

This contract defines a future conceptual Write Approval Protocol boundary
inside `stnl_project_agent_specializer_dev`. It is not a write approval
implementation, executable approval gate, approval token issuer, approval
registry, approval database, TypeScript interface, JavaScript module, JSON
schema, runtime payload, CLI contract, runner contract, Target writer,
filesystem writer, materializer implementation, Target Adapter implementation,
renderer contract, writer contract, loader contract, scenario selector
contract, persistent report contract, or authorization to read or write a real
Target.

The protocol described here is only the conceptual boundary between:

```text
validated dry-run result
-> approval precondition review
-> conceptual approval state
-> still-no-write boundary
```

It does not grant real write approval. It does not execute a write. It does
not issue a real approval token. It does not persist approval state. It does
not create a writer. It does not trigger a materializer. It does not access a
real Target. It does not access GitHub. It does not alter
`skills/stnl_project_agent_specializer/`.

## Purpose

The Write Approval Protocol Contract defines how a later approval review may
conceptually represent whether a validated dry-run result satisfies the
documentary preconditions for future human review.

It exists to make the future approval boundary auditable before any runtime
code, signer, token, approval registry, writer, materializer, Target Adapter,
Target real read/write, GitHub write, persistent report, branch, commit, or
pull request is separately authorized. It gives reviewers a stable
documentary contract for preconditions, evidence requirements, approval-state
vocabulary, blocked request rules, still-no-write evidence, and
non-authorization evidence.

## Scope

This contract covers only documentary/dev-only/read-only rules for a future
conceptual Write Approval Protocol:

- conceptual request sections;
- conceptual result sections;
- conceptual approval-state vocabulary;
- accepted and blocked approval request rules;
- required preconditions for conceptual eligibility;
- required evidence bundle;
- relationship to the Dry-run Report Model, Materializer Interface, Target
  Adapter, planned artifacts, path safety, managed artifacts, final sources,
  explicit templates, validation harness, fixture boundary, Aggregator, and
  implementation boundary;
- no-read/no-write evidence;
- human approval boundary;
- non-authorization rules;
- failure, block, determinism, persistence, and excellent-pass expectations.

The contract may be cited by later planning and audit phases. It does not
create a callable surface and does not authorize a write.

## Non-scope

This contract does not create or authorize:

- real write approval;
- real write authorization;
- real approval token;
- approval registry;
- approval database;
- real signer;
- real reviewer identity binding;
- persistent approval state;
- executable write gate;
- real writer;
- Target writer;
- filesystem writer;
- materializer implementation;
- Target Adapter implementation;
- executable adapter;
- TypeScript interface;
- JavaScript module;
- JSON schema;
- runtime payload;
- CLI command, CLI flags, or CLI stdout contract;
- runner;
- real renderer;
- runtime loader;
- runtime scenario selector;
- persistent report;
- Target real read/write;
- filesystem stat against a real Target;
- directory listing of a real Target;
- real Target file content read;
- GitHub write;
- commit, branch, or pull request;
- mutation of `skills/stnl_project_agent_specializer/`;
- real creation of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- materialized output, generated file, patch application, or write result.

## Boundary Invariants

Any future approval review that claims compatibility with this contract must
preserve these invariants:

- `dev_only` is true.
- `read_only` is true.
- `dry_run_required` is true.
- `still_no_write` is true.
- `approval_requested` may exist only as conceptual intent.
- `approval_scope` is documentary and is not a real write scope.
- `target_read_attempted` is false.
- `target_write_attempted` is false.
- `filesystem_stat_attempted` is false.
- `directory_listing_attempted` is false.
- `file_content_read_attempted` is false.
- `persistent_report_written` is false.
- `github_write_attempted` is false.
- `productive_skill_mutation_attempted` is false.
- `approval_token_issued` is false.
- `write_executed` is false.
- `patch_applied` is false.
- `commit_created` is false.
- `branch_created` is false.
- `pull_request_created` is false.
- source roots are final-source roots, not `reference/agents/`.
- templates are explicit.
- output plan entries are planned-only.
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
  shape, no-write evidence, non-authorization summary, and the
  no-persistent-report boundary.
- `MATERIALIZER_INTERFACE_CONTRACT.md`: owns the conceptual Materializer
  Interface boundary from validated intent to dry-run-only planning, planned
  output entries, and Dry-run Report Model compatibility.
- `TARGET_ADAPTER_CONTRACT.md`: owns the conceptual Target Adapter boundary
  from canonical target intent to target surface description,
  target-root-relative output planning, simulated target state, path safety,
  managed-artifact compatibility, and planned-artifact compatibility.
- `VALIDATION_HARNESS_CONTRACT.md`: owns future validation layers, statuses,
  no-write enforcement, matrix completeness, and validation block behavior.
- `FIXTURE_BOUNDARY_CONTRACT.md`: owns fixture containment, fixture path
  safety, and the distinction between fixture-local strings and real Target
  artifacts.
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`: owns the current fixed 9-check
  Aggregator boundary, order, statuses, stdout-only policy, and zero-argument
  policy.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md`: owns the separately authorized
  dev-only script boundary and continues to forbid write approval
  implementation in this phase.

This contract does not alter final source roots, canonical target IDs, legacy
target normalization, output shapes, explicit template requirements, render
composition, dry-run/write boundary, Dry-run Report Model, Materializer
Interface, Target Adapter, validation harness, fixture boundary, Aggregator
behavior, implementation boundary, or runtime authorization.

## Protocol Responsibility

The future Write Approval Protocol would be responsible only for representing
a documentary review boundary:

- receive a conceptual write approval request;
- verify that dry-run evidence exists before any conceptual eligibility;
- verify that the existing contract chain is referenced;
- verify source and explicit template evidence;
- verify Materializer Interface evidence;
- verify Target Adapter evidence;
- verify planned artifact evidence;
- verify path safety and managed-artifact evidence;
- verify no-read/no-write evidence;
- classify a conceptual approval state;
- return a conceptual approval result with blocking and non-authorization
  evidence.

It must not decide, perform, or imply real write authorization.

## Protocol Lifecycle

A future compatible lifecycle may use these conceptual steps:

1. `RECEIVE_APPROVAL_REQUEST`
2. `VERIFY_DRY_RUN_REQUIRED`
3. `VERIFY_CONTRACT_CHAIN`
4. `VERIFY_SOURCE_AND_TEMPLATE_EVIDENCE`
5. `VERIFY_TARGET_ADAPTER_EVIDENCE`
6. `VERIFY_PLANNED_ARTIFACT_EVIDENCE`
7. `VERIFY_PATH_SAFETY_AND_MANAGED_ARTIFACTS`
8. `VERIFY_NO_READ_NO_WRITE_EVIDENCE`
9. `CLASSIFY_APPROVAL_STATE`
10. `RETURN_CONCEPTUAL_APPROVAL_RESULT`

Lifecycle rules:

- every step is documentary/conceptual;
- no step authorizes real writing;
- no step reads a real Target;
- no step writes a real Target;
- no step issues a real approval token;
- no step persists approval state;
- no step executes a writer;
- no step executes a materializer;
- no step executes a Target Adapter;
- no step executes a renderer, loader, or scenario selector;
- no step calls the Aggregator as a report generator;
- no step creates a GitHub write;
- no step creates a commit, branch, or pull request;
- no step creates `.github/**`, `.codex/**`, or `AGENTS.md` outside
  authorized fixtures;
- no step changes `skills/stnl_project_agent_specializer/`.

## Conceptual Input Model

The minimum conceptual request shape is:

```text
write_approval_request
  request_identity
  dry_run_evidence
  source_evidence
  template_evidence
  target_adapter_evidence
  planned_artifact_evidence
  path_safety_evidence
  managed_artifact_evidence
  no_read_no_write_evidence
  boundary_policy
```

Candidate fields include:

- `request_kind`
- `phase`
- `approval_requested`
- `approval_scope`
- `canonical_target_id`
- `agent_ids`
- `dry_run_report_model_ref`
- `materializer_interface_result_ref`
- `target_adapter_result_ref`
- `output_plan_entries_ref`
- `gate_results_ref`
- `blocking_summary_ref`
- `source_inventory_ref`
- `template_refs`
- `planned_operation_refs`
- `path_safety_results_ref`
- `managed_artifact_results_ref`
- `no_read_no_write_evidence_ref`
- `non_authorization_summary_ref`
- `human_review_policy`
- `write_execution_policy`

Field rules:

- `approval_requested` may exist only as conceptual intent.
- `approval_scope` must be documentary and must not become a real write
  scope.
- `dry_run_report_model_ref` must point to conceptual evidence, not a
  mandatory persistent report.
- `materializer_interface_result_ref` must be conceptual.
- `target_adapter_result_ref` must be conceptual.
- `output_plan_entries_ref` must contain only planned-only operations.
- `gate_results_ref` must not require checker execution in this phase.
- `blocking_summary_ref` must have no blockers for any non-blocked conceptual
  eligibility result.
- `source_inventory_ref` must identify final sources, not
  `reference/agents/` as final source.
- `template_refs` must be explicit and point under `reference/templates/`.
- `planned_operation_refs` must not contain executed operation tokens.
- `path_safety_results_ref` must not contain absolute host paths or real
  Target paths.
- `managed_artifact_results_ref` must not become overwrite permission.
- `no_read_no_write_evidence_ref` must confirm false for Target read/write
  and real filesystem access.
- `non_authorization_summary_ref` must be present.
- `human_review_policy` must be documentary, not a real signer.
- `write_execution_policy` must declare real writing prohibited in this
  phase.

## Conceptual Output Model

The minimum conceptual result shape is:

```text
write_approval_result
  result_identity
  boundary_result
  approval_state
  approval_preconditions
  evidence_summary
  blocking_summary
  still_no_write_evidence
  non_authorization_summary
```

Result rules:

- output is conceptual;
- output is not a persisted file;
- output is not mandatory JSON;
- output is not a runtime object;
- output is not a CLI stdout contract;
- output does not contain a real approval token;
- output does not contain real signer identity;
- output does not contain write execution ID;
- output does not contain real Target path;
- output does not contain a written file;
- output does not contain applied patch;
- output does not contain commit hash;
- output does not contain branch name;
- output does not contain pull request URL.

## Approval State Vocabulary

Allowed conceptual approval states are:

- `APPROVAL_NOT_REQUESTED`
- `APPROVAL_CONCEPTUALLY_ELIGIBLE`
- `APPROVAL_BLOCKED`
- `APPROVAL_OUT_OF_SCOPE`

State rules:

- `APPROVAL_NOT_REQUESTED` means no conceptual approval review was requested.
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` means only that documentary preconditions
  would be satisfied.
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` does not authorize writing.
- `APPROVAL_BLOCKED` means at least one required precondition or evidence item
  is missing, invalid, unsafe, blocked, or out of boundary.
- `APPROVAL_OUT_OF_SCOPE` means the request asks for behavior this contract
  does not cover.
- no state may mean real write approval;
- no state may generate a real token;
- no state may unlock a writer;
- no state may unlock Target write;
- no state may unlock commit, branch, pull request, or GitHub write.

Forbidden states and aliases include:

- `APPROVED`
- `WRITE_APPROVED`
- `APPROVAL_GRANTED`
- `READY_TO_WRITE`
- `WRITE_UNLOCKED`
- `EXECUTION_APPROVED`
- `MERGE_APPROVED`

The names above may appear only as forbidden examples.

## Accepted Approval Requests

The protocol accepts only conceptual/documentary approval requests that:

- reference dry-run evidence;
- reference Dry-run Report Model evidence;
- reference Materializer Interface evidence;
- reference Target Adapter evidence;
- reference planned output entries;
- use an explicit final source model;
- use explicit templates;
- use target intent, not a real Target;
- use planned operations only;
- have no blockers in `blocking_summary`;
- preserve path safety;
- preserve managed-artifact policy;
- preserve no-read/no-write evidence;
- preserve non-authorization summary;
- declare `write_execution_policy` as prohibited;
- declare `human_review_policy` as documentary;
- do not request a real token;
- do not request real execution;
- do not request Target write.

Accepted requests remain no-write requests. Acceptance by this contract means
the request can be classified conceptually, not that it can execute.

## Blocked Approval Requests

The protocol blocks approval requests that attempt to:

- request real write approval;
- request Target real write;
- request Target real read;
- request real writer;
- request Target writer;
- request filesystem writer;
- request materializer implementation;
- request Target Adapter implementation;
- request real renderer;
- request runtime loader;
- request runtime scenario selector;
- request persistent report;
- request real approval token;
- request real signer;
- request approval registry;
- request persistent approval state;
- request CLI or runner;
- request GitHub write;
- request commit, branch, or pull request;
- request applied patch;
- request materialized output;
- request generated file;
- request operation execution;
- request an operation ending in `_EXECUTED`;
- use `reference/agents/` as final source;
- omit explicit template evidence;
- ignore existing blockers;
- approve with `BLOCKED_PLANNED`;
- approve unsafe path;
- approve unmanaged collision;
- approve invalid managed notice;
- approve real Target path;
- approve host absolute path;
- approve real drift;
- approve without no-read/no-write evidence;
- approve without non-authorization summary.

## Allowed Conceptual Outputs

Allowed outputs are limited to conceptual sections:

- `approval_state`
- `approval_preconditions`
- `evidence_summary`
- `blocking_summary`
- `still_no_write_evidence`
- `non_authorization_summary`

Allowed states are limited to:

- `APPROVAL_NOT_REQUESTED`
- `APPROVAL_CONCEPTUALLY_ELIGIBLE`
- `APPROVAL_BLOCKED`
- `APPROVAL_OUT_OF_SCOPE`

These outputs are documentary evidence only and must not be used as a runtime
authorization surface.

## Forbidden Outputs

The protocol must not produce:

- `APPROVED`
- `WRITE_APPROVED`
- `APPROVAL_GRANTED`
- `READY_TO_WRITE`
- `WRITE_UNLOCKED`
- `EXECUTION_APPROVED`
- `approval_token`
- `approval_signature`
- `signer_identity`
- `approval_registry_entry`
- `approval_persisted_path`
- `write_execution_id`
- `writer_result`
- `target_writer_result`
- `filesystem_writer_result`
- `materializer_result`
- `target_adapter_result_real`
- `renderer_output`
- `loader_result`
- `scenario_selector_result`
- `persistent_report_path`
- `target_absolute_path`
- `target_real_path`
- `host_absolute_path`
- `materialized_file`
- `generated_file`
- `applied_patch`
- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`
- `github_write_result`
- `commit_hash`
- `branch_name`
- `pull_request_url`

Semantic equivalents that hide real write authorization behind dry-run or
conceptual approval language are also forbidden.

## Required Preconditions

For any `APPROVAL_CONCEPTUALLY_ELIGIBLE` result, all documentary
preconditions must be satisfied:

- dry-run evidence is mandatory;
- Dry-run Report Model evidence is compatible;
- Materializer Interface result evidence is conceptual;
- Target Adapter result evidence is conceptual;
- canonical target evidence is valid;
- final source model evidence is valid;
- `reference/agents/` is not used as final source;
- templates are explicit;
- output plan uses only planned-only operations;
- path safety passes;
- managed-artifact policy passes;
- no unmanaged collision exists;
- no invalid managed notice exists;
- no unsafe path exists;
- no blockers exist in `blocking_summary`;
- no-read/no-write evidence is present and intact;
- non-authorization summary is present;
- persistent report remains prohibited;
- Target real read/write remains prohibited;
- GitHub write remains prohibited;
- commit, branch, and pull request remain prohibited.

Even if all preconditions are satisfied, the result still does not authorize
real writing.

## Required Evidence Bundle

The minimum conceptual evidence bundle is:

```text
write_approval_evidence_bundle
  dry_run_report_model_evidence
  materializer_interface_evidence
  target_adapter_evidence
  source_model_evidence
  template_evidence
  planned_artifact_evidence
  path_safety_evidence
  managed_artifact_evidence
  gate_result_evidence
  no_read_no_write_evidence
  non_authorization_evidence
```

Evidence rules:

- evidence bundle is conceptual/documentary;
- evidence bundle is not a persistent report;
- evidence bundle is not mandatory JSON;
- evidence bundle is not CLI output;
- evidence bundle is not runtime payload;
- evidence bundle must not contain a real Target path;
- evidence bundle must not contain real file content;
- evidence bundle must not contain approval token;
- evidence bundle must not contain write result.

## Dry-run Report Model Relationship

The protocol may depend conceptually on Dry-run Report Model evidence:

- `report_boundary`
- `source_inventory_snapshot`
- `target_intent`
- `agent_plan_entries`
- `output_plan_entries`
- `gate_results`
- `blocking_summary`
- `no_write_evidence`
- `non_authorization_summary`

This dependency does not mean:

- persisting a Dry-run Report;
- serializing JSON;
- creating CLI output;
- creating runtime payload;
- executing a materializer;
- reading a real Target;
- writing a real Target.

The Dry-run Report Model remains no-persistent-report evidence.

## Materializer Interface Relationship

The protocol may depend conceptually on Materializer Interface evidence:

- `materializer_interface_result`
- `boundary_result`
- `normalized_target_intent`
- `resolved_source_plan`
- `render_context_plan`
- `output_plan_entries`
- `gate_results`
- `blocking_summary`
- `no_write_evidence`
- `non_authorization_summary`

This dependency does not mean:

- executing a real Materializer Interface;
- creating a materializer;
- triggering a writer;
- releasing runtime behavior;
- approving real writing;
- persisting a result.

The Materializer Interface remains a conceptual dry-run-only boundary.

## Target Adapter Relationship

The protocol may depend conceptually on Target Adapter evidence:

- `target_adapter_result`
- `canonical_target`
- `normalized_legacy_terms`
- `target_surface_plan`
- `planned_output_roots`
- `planned_path_entries`
- `simulated_existing_state`
- `simulated_drift_state`
- `path_safety_results`
- `managed_artifact_results`
- `no_read_no_write_evidence`
- `non_authorization_summary`

This dependency does not mean:

- executing a real Target Adapter;
- reading a real Target;
- writing a real Target;
- resolving absolute host paths;
- calculating real drift;
- approving real writing.

The Target Adapter remains a conceptual dry-run-only boundary.

## Planned Artifact Relationship

The protocol aligns with `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.

For any conceptual eligibility:

- planned entries must exist when applicable;
- operations must be planned-only;
- `CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`, and
  `BLOCKED_PLANNED` remain the only planned operation vocabulary;
- `BLOCKED_PLANNED` cannot be approved conceptually as eligible;
- path safety must pass;
- managed-artifact policy must pass;
- unmanaged collision must block;
- invalid managed notice must block;
- unsafe path must block;
- missing dry-run must block.

The protocol must not:

- convert a planned operation into an executed operation;
- convert a planned path into a real path;
- convert path safety into write permission;
- convert managed notice into real overwrite authorization;
- convert simulated/documentary drift into real drift;
- apply a patch;
- create a file;
- update a file;
- delete a file.

## Path Safety And Managed Artifact Relationship

Conceptual approval eligibility requires the same path and managed-artifact
boundaries as the dry-run/write boundary:

- planned paths are target-root-relative only;
- absolute host paths are forbidden;
- real Target paths are forbidden;
- traversal paths are forbidden;
- manual-file collisions block;
- unmanaged collisions block;
- invalid managed notices block;
- managed notices are compatibility evidence, not overwrite permission.

No path-safety result can authorize Target real read/write.

## Source And Template Relationship

The protocol requires final source and explicit template evidence:

- source model final is valid;
- `reference/agents/` is prohibited as final source;
- kernels come from `reference/kernel_lab/`;
- Senior Profiles come from `reference/seniorization_lab/`;
- templates come from `reference/templates/`;
- contracts come from `reference/materialization_lab/contracts/`;
- templates are explicit;
- no template is inferred by path, target legacy term, nearby file, or
  productive skill.

The protocol blocks:

- `base_agent_source`;
- `reference/agents/` as final source;
- missing source;
- missing template;
- inferred template;
- missing required placeholder;
- unsafe render;
- composition conflict.

## Drift And Existing-state Relationship

The protocol may review only drift and existing-state evidence that is already
simulated/documentary under the dry-run/write-boundary and Target Adapter
contracts.

It must block:

- real drift calculation;
- filesystem stat against a real Target;
- directory listing of a real Target;
- real file content read;
- real Target path evidence;
- unmanaged collision;
- unsafe path;
- invalid managed notice;
- `BLOCKED_PLANNED` entries.

Simulated or fixture-local drift evidence does not become permission to read,
overwrite, or delete real files.

## No-read/No-write Evidence Relationship

Any conceptual result must preserve evidence equivalent to:

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

Human read-only audit commands, such as path-limited `git status`, may exist
outside the conceptual result model. They do not become runtime evidence and
do not authorize writing.

## Human Approval Boundary

Any human approval language in this phase is only documentary/conceptual.

The protocol creates:

- no real signer;
- no real identity binding;
- no secret;
- no token;
- no approval registry;
- no persistent approval state;
- no writer unlock;
- no Target write unlock;
- no commit, branch, or pull request;
- no GitHub write.

If a future phase needs real human approval, that phase must be separately
authorized after this contract and its audit.

## Non-authorization Rules

This Write Approval Protocol Contract does not authorize:

- real write approval;
- real write authorization;
- real approval token;
- approval registry;
- real signer;
- Target writer;
- filesystem writer;
- real writer;
- real materializer;
- real Target Adapter;
- real renderer;
- runtime loader;
- runtime scenario selector;
- Target real read/write;
- persistent report;
- productive skill mutation;
- GitHub write;
- commit;
- branch;
- pull request.

No phrase in this contract may be interpreted as permission to execute a
write. Conceptual eligibility remains a still-no-write state.

## Failure And Block Behavior

The protocol must fail closed. It must return `APPROVAL_BLOCKED` or
`APPROVAL_OUT_OF_SCOPE` when:

- dry-run evidence is missing;
- required contract-chain evidence is missing;
- final source evidence is invalid;
- `reference/agents/` is used as final source;
- template evidence is missing or inferred;
- Materializer Interface evidence is missing or non-conceptual;
- Target Adapter evidence is missing or non-conceptual;
- planned artifact evidence is missing;
- an output plan contains an executed operation token;
- path safety fails;
- managed-artifact policy fails;
- unmanaged collision is present;
- invalid managed notice is present;
- drift is real rather than simulated/documentary;
- any blocker exists in `blocking_summary`;
- no-read/no-write evidence is absent or inconsistent;
- non-authorization summary is absent;
- the request asks for token, signer, registry, writer, materializer, Target
  Adapter implementation, Target real read/write, persistent report, GitHub
  write, commit, branch, pull request, patch, generated file, or materialized
  output.

Unknown approval states, unknown execution outputs, and unknown block codes
remain blocking.

## Determinism Policy

The protocol is deterministic as documentation:

- the same conceptual request and evidence bundle must classify to the same
  conceptual approval state;
- classification must not depend on wall-clock time;
- classification must not depend on real filesystem state;
- classification must not depend on directory order;
- classification must not depend on network or GitHub state;
- classification must not depend on real signer identity;
- no runtime random token, execution ID, branch name, commit hash, or pull
  request URL may be generated.

Determinism here is a review property, not runtime execution behavior.

## Persistence Policy

The protocol creates no persistence:

- no approval result file;
- no approval registry;
- no approval database;
- no approval token storage;
- no persistent approval state;
- no persistent report;
- no stdout capture file;
- no cache;
- no snapshot;
- no temp output;
- no generated artifact.

Any future persistence must be separately authorized by a later phase and must
not be inferred from this contract.

## Aggregator Boundary

The Validation Harness Aggregator remains unchanged:

- it coordinates exactly the 9 current read-only checks;
- it keeps the official order documented by
  `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`;
- it remains zero-argument;
- it remains stdout-only;
- it does not become a write approval validator;
- it does not become a report generator;
- it does not persist output;
- it does not accept target paths;
- it does not execute a materializer, renderer, writer, loader, scenario
  selector, Target Adapter, or approval gate;
- it does not create GitHub writes, commits, branches, or pull requests.

This contract introduces no tenth child check and no Aggregator policy change.

## Block Codes

This contract preserves existing block codes and recommends no new block codes
in this phase.

Relevant existing block codes include:

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

Approval-specific failures should map to existing codes when the failure is
already owned by an existing contract. A future new block code may be proposed
only if a real gap is documented with:

- why existing codes do not cover it;
- which contract owns it;
- whether it is documentary only;
- whether a future checker would be required;
- which risk it resolves.

The initial recommendation is to create no new block codes in this phase.

## Excellent Pass Expectations

`MATERIALIZATION_WRITE_APPROVAL_PROTOCOL: PASS` requires:

- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md` exists;
- the contract is documentary/dev-only/read-only;
- the contract does not create real write approval;
- the contract does not authorize real writing;
- the contract does not issue a real approval token;
- the contract does not create approval registry;
- the contract does not create persistent approval state;
- the contract does not create real signer;
- the contract does not create real writer;
- the contract does not create Target writer;
- the contract does not create filesystem writer;
- the contract does not create real materializer;
- the contract does not create real Target Adapter;
- the contract does not create CLI or runner;
- the contract does not create persistent report;
- the contract does not authorize Target real read/write;
- the contract does not authorize real Target filesystem access;
- the contract does not authorize GitHub write;
- the contract does not authorize productive skill mutation;
- the contract does not authorize commit, branch, or pull request;
- final source remains based on `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains forbidden as final source;
- explicit templates remain mandatory;
- planned-only operations remain preserved;
- executed operations remain forbidden;
- Dry-run Report Model remains non-persistent;
- Materializer Interface remains conceptual;
- Target Adapter remains conceptual;
- Aggregator Checker remains fixed at exactly 9 checks;
- no checker becomes a report generator;
- no-read/no-write evidence and non-authorization summary are mandatory;
- approval states do not authorize real writing;
- no new block code is created without strong justification;
- documentary indexes and validation expectations reflect the new contract
  without runtime overreach;
- relevant local Materialization Lab checks pass.

Passing this contract recommends a separate
`MATERIALIZATION_WRITE_APPROVAL_PROTOCOL_AUDIT` phase. It does not authorize
that audit to write, and it does not generate an audit prompt.
