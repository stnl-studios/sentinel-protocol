# Dry Run Only Materializer Prototype Contract

Status: documentary/dev-only/read-only contract.

This contract formalizes a future dry-run-only materializer prototype as a
conceptual boundary. It is not an implementation, executable interface,
runtime payload, TypeScript interface, JavaScript module, JSON schema, CLI,
runner, renderer, writer, loader, scenario selector, Target Adapter
implementation, Write Approval implementation, persistent report contract, or
authorization mechanism.

This contract creates no materializer runtime and grants no permission to read
or write a real Target.

## Purpose

The purpose of this contract is to define the permitted documentary contract
for a future dry-run-only materializer prototype.

The future prototype may only represent this conceptual chain:

```txt
validated dry-run request
-> contract-chain planning
-> source/template/render/target planning
-> planned-only output entries
-> conceptual dry-run report result
-> still-no-write boundary
```

It must not execute materialization, render files, write files, read a real
Target, execute a real Target Adapter, execute a real Write Approval Protocol,
issue tokens, persist reports, access GitHub, or mutate the productive skill.

## Scope

This contract covers only documentary/dev-only/read-only obligations for a
future dry-run-only materializer prototype:

- formal prototype responsibility;
- allowed conceptual lifecycle;
- conceptual input model;
- conceptual output model;
- conceptual module map;
- relationship to existing contracts;
- required blockers for unsafe or out-of-scope requests;
- final source and explicit template preservation;
- Materializer Interface, Target Adapter, and Write Approval Protocol
  preservation;
- Dry-run Report Model construction or reference without persistence;
- planned artifact handling without write execution;
- lazy-load preservation as a safety contract;
- no-read/no-write evidence;
- non-authorization summary;
- excellent-pass expectations.

## Non-scope

This contract does not create, permit, or imply:

- materializer implementation;
- executable prototype;
- executable interface;
- TypeScript interface;
- JavaScript module;
- JSON schema;
- runtime payload;
- CLI contract;
- runner contract;
- renderer contract real;
- writer contract real;
- Target writer;
- filesystem writer;
- loader contract;
- scenario selector contract;
- Target Adapter implementation;
- Write Approval implementation;
- persistent report contract;
- approval token;
- approval registry;
- persistent approval state;
- signer;
- Target real read/write;
- filesystem access to a real Target;
- GitHub write;
- commit;
- branch;
- pull request;
- applied patch;
- generated file;
- materialized output;
- mutation of `skills/stnl_project_agent_specializer/`.

## Boundary Invariants

The future prototype must remain dry-run-only, documentary, dev-only, and
read-only.

Required invariants:

- every accepted request must require dry-run;
- Target real read is prohibited;
- Target real write is prohibited;
- filesystem stat against a real Target is prohibited;
- directory listing against a real Target is prohibited;
- file-content read from a real Target is prohibited;
- writes, deletes, patches, and generated files are prohibited;
- persistent reports, caches, snapshots, temp outputs, stdout captures, and
  artifacts are prohibited;
- GitHub writes, commits, branches, and pull requests are prohibited;
- `reference/agents/` remains only a temporary development parity baseline and
  cannot become a final source;
- final sources remain `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- templates must be explicit;
- template inference is prohibited;
- lazy-load remains a safety contract, not an optimization;
- planned operations remain planned-only;
- approval evaluation remains still-no-write.

## Relationship To Existing Contracts

This contract is subordinate to and must preserve:

- `SOURCE_MODEL_CONTRACT.md`;
- `TARGETS_CONTRACT.md`;
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`;
- `RENDERING_AND_COMPOSITION_CONTRACT.md`;
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`;
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`;
- `MATERIALIZER_INTERFACE_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`;
- `VALIDATION_HARNESS_CONTRACT.md`;
- `FIXTURE_BOUNDARY_CONTRACT.md`;
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`;
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md`.

This contract does not replace, relax, amend, or expand any existing contract.
It does not alter source model, canonical targets, templates, rendering and
composition, dry-run/write boundary, Dry-run Report Model, Materializer
Interface, Target Adapter, Write Approval Protocol, validation harness, fixture
boundary, Aggregator boundary, or implementation boundary.

It creates no runtime authorization, write authorization, Target
authorization, or GitHub authorization.

## Prototype Responsibility

The future prototype responsibility is to receive a conceptual dry-run
materializer request and return a conceptual dry-run-only result that records
contract-chain planning, source/template/render/target planning, planned-only
output entries, still-no-write approval evaluation, and Dry-run Report Model
compatibility.

The future prototype must fail closed when the request asks for behavior
outside this contract. It must never compensate for missing evidence by
reading a real Target, inferring templates, executing a renderer, executing a
writer, executing a Target Adapter, or requesting real write approval.

## Prototype Lifecycle

The allowed lifecycle is contractual and conceptual:

1. `RECEIVE_DRY_RUN_REQUEST`
2. `VALIDATE_REQUEST_BOUNDARY`
3. `VALIDATE_CONTRACT_CHAIN`
4. `RESOLVE_FINAL_SOURCES`
5. `VALIDATE_EXPLICIT_TEMPLATES`
6. `BUILD_RENDER_CONTEXT_PLAN`
7. `BUILD_TARGET_ADAPTER_PLAN`
8. `BUILD_PLANNED_OUTPUT_ENTRIES`
9. `EVALUATE_DRY_RUN_AND_WRITE_BOUNDARY`
10. `EVALUATE_WRITE_APPROVAL_PROTOCOL_AS_STILL_NO_WRITE`
11. `BUILD_DRY_RUN_REPORT_MODEL`
12. `RETURN_DRY_RUN_ONLY_RESULT`

Lifecycle rules:

- every step is conceptual;
- no step reads a real Target;
- no step writes a real Target;
- no step executes a writer;
- no step executes a real renderer;
- no step executes a real Target Adapter;
- no step executes real write approval;
- no step emits an approval token;
- no step persists a report;
- no step applies a patch;
- no step creates a commit, branch, or pull request;
- no step triggers GitHub write;
- no step uses `reference/agents/` as final source;
- no step infers a template.

## Conceptual Input Model

The future prototype may accept only a conceptual input model equivalent to:

```txt
dry_run_materializer_request
  request_identity
  target_intent
  agent_selection
  source_policy
  template_policy
  render_context_policy
  target_adapter_policy
  dry_run_policy
  write_approval_policy
  report_model_policy
  boundary_policy
```

Candidate conceptual fields:

```txt
request_kind
phase
canonical_target_id
legacy_target_terms
agent_ids
source_roots
template_refs
contract_refs
target_adapter_request_ref
materializer_interface_request_ref
dry_run_required
write_execution_policy
target_read_policy
target_write_policy
persistent_report_policy
approval_policy
```

Input rules:

- `dry_run_required` must be `true`;
- `write_execution_policy` must prohibit writing;
- `target_read_policy` must prohibit Target real read;
- `target_write_policy` must prohibit Target real write;
- `persistent_report_policy` must prohibit persistent report creation in this
  phase;
- `approval_policy` must treat write approval as conceptual and still-no-write;
- `source_roots` must not include `reference/agents/` as a final source;
- `template_refs` must be explicit;
- `contract_refs` must point to existing contracts;
- the request must not contain an absolute host path;
- the request must not contain a real Target path;
- the request must not contain an approval token;
- the request must not contain a write execution ID;
- the request must not contain a mandatory runtime payload;
- the request must not contain a generated file or materialized output.

This is not a JSON schema and not a runtime object requirement.

## Conceptual Output Model

The future prototype may return only a conceptual output model equivalent to:

```txt
dry_run_materializer_result
  result_identity
  boundary_result
  contract_chain_result
  resolved_source_plan
  template_resolution_result
  render_context_plan
  target_adapter_plan
  output_plan_entries
  dry_run_boundary_result
  write_approval_protocol_result
  dry_run_report_model_ref
  blocking_summary
  no_read_no_write_evidence
  non_authorization_summary
```

Output rules:

- output is conceptual;
- output is not a persisted file;
- output is not mandatory JSON;
- output is not a mandatory runtime object;
- output is not a CLI stdout contract;
- output must not contain an approval token;
- output must not contain a write execution ID;
- output must not contain a real Target path;
- output must not contain an absolute host path;
- output must not contain real file content;
- output must not contain a written file;
- output must not contain a generated file;
- output must not contain materialized output;
- output must not contain an applied patch;
- output must not contain a commit hash;
- output must not contain a branch name;
- output must not contain a pull request URL.

## Conceptual Module Map

The future prototype may be described by these non-executable conceptual
modules only:

- `request-boundary-normalizer`;
- `contract-chain-verifier`;
- `source-plan-resolver`;
- `template-plan-verifier`;
- `render-context-planner`;
- `target-adapter-planner`;
- `planned-output-builder`;
- `dry-run-boundary-evaluator`;
- `write-approval-protocol-evaluator`;
- `dry-run-report-model-builder`;
- `result-boundary-enforcer`.

No file, code module, script, CLI, runner, executable interface, or runtime
adapter is created by this map.

## Request Boundary Normalizer

Responsibility: normalize the conceptual request and fail closed on forbidden
runtime, Target, approval, and generated-output fields.

Conceptual inputs:

- `dry_run_materializer_request`;
- boundary policy;
- known contract references.

Conceptual outputs:

- normalized dry-run request;
- boundary result;
- blocking summary when normalization fails.

Related contracts:

- `MATERIALIZER_INTERFACE_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`;
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.

Main blockers:

- real Target path;
- absolute host path;
- approval token;
- write execution ID;
- runtime payload requirement;
- generated or materialized output in request.

Forbidden behavior:

- resolving absolute host paths;
- reading Target filesystem metadata;
- listing directories;
- reading file contents;
- normalizing an unsafe request into a write-capable request.

Expected evidence:

- boundary normalization result;
- rejected forbidden fields;
- no-read/no-write evidence.

This module is not runtime because it defines documentary validation behavior
only. It does not write because it has no writer responsibility. It does not
read a real Target because all Target data must be conceptual, fixture-backed,
or documented.

## Contract Chain Verifier

Responsibility: verify that the request references the required documentary
contracts without executing checkers as runtime dependencies.

Conceptual inputs:

- normalized request;
- `contract_refs`.

Conceptual outputs:

- `contract_chain_result`;
- missing-contract blockers.

Related contracts:

- all contracts listed in `Relationship To Existing Contracts`;
- `VALIDATION_HARNESS_CONTRACT.md`;
- `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`.

Main blockers:

- missing required contract reference;
- request requiring a checker as runtime dependency;
- request requiring the Aggregator as runner or report generator.

Forbidden behavior:

- executing checkers to produce the materializer result;
- capturing checker stdout as a dry-run report;
- expanding the Aggregator;
- creating a tenth child check.

Expected evidence:

- contract-chain reference summary;
- checker non-dependency statement;
- Aggregator boundary statement.

This module is not runtime because it only describes documentary contract
references. It does not write and does not read a real Target.

## Source Plan Resolver

Responsibility: resolve the final source plan from final documentary source
roots and block any final dependency on `reference/agents/`.

Conceptual inputs:

- normalized request;
- `source_policy`;
- source roots.

Conceptual outputs:

- `resolved_source_plan`;
- source blockers.

Related contracts:

- `SOURCE_MODEL_CONTRACT.md`;
- `RENDERING_AND_COMPOSITION_CONTRACT.md`;
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`.

Main blockers:

- `reference/agents/` used as final source;
- source missing;
- deprecated `base_agent_source`;
- missing kernel source;
- incomplete kernel coverage;
- parity baseline required as final source.

Forbidden behavior:

- using productive skill files as final source;
- inferring missing source from nearby files;
- reading Target files to recover source.

Expected evidence:

- explicit source references;
- final-source root classification;
- `reference/agents/` exclusion statement.

This module is not runtime because it plans source references only. It does not
write and does not read a real Target.

## Template Plan Verifier

Responsibility: verify explicit template references, required placeholders,
and no template inference.

Conceptual inputs:

- `template_policy`;
- `template_refs`;
- source plan.

Conceptual outputs:

- `template_resolution_result`;
- template blockers.

Related contracts:

- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`;
- `RENDERING_AND_COMPOSITION_CONTRACT.md`.

Main blockers:

- missing template;
- inferred template;
- missing required placeholder;
- unsafe render;
- composition conflict.

Forbidden behavior:

- inferring a template by path, legacy target term, nearby file, or productive
  skill content;
- rendering a file;
- writing a rendered output.

Expected evidence:

- explicit template references;
- placeholder requirement summary;
- no-inference statement.

This module is not runtime because it only verifies the conceptual template
plan. It does not write and does not read a real Target.

## Render Context Planner

Responsibility: plan render-context inputs without executing a renderer or
producing rendered output.

Conceptual inputs:

- source plan;
- template resolution result;
- render context policy.

Conceptual outputs:

- `render_context_plan`;
- render blockers.

Related contracts:

- `RENDERING_AND_COMPOSITION_CONTRACT.md`;
- `SOURCE_MODEL_CONTRACT.md`;
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`.

Main blockers:

- missing source;
- missing template;
- missing placeholder;
- unsafe render;
- composition conflict.

Forbidden behavior:

- executing a renderer;
- persisting rendered output;
- reading a real Target to build context;
- using `reference/agents/` as final source.

Expected evidence:

- explicit source references;
- explicit template references;
- placeholder plan;
- composition blocker summary.

This module is not runtime because it creates only a conceptual render plan. It
does not write and does not read a real Target.

## Target Adapter Planner

Responsibility: plan target intent, target surfaces, target-root-relative
paths, simulated existing/drift state, path safety, and managed-artifact
evidence without a real Target Adapter.

Conceptual inputs:

- target intent;
- canonical target ID;
- target adapter policy;
- fixture or documentary simulated state.

Conceptual outputs:

- `target_adapter_plan`;
- target surface plan;
- target-root-relative planned paths;
- simulated state and drift classifications.

Related contracts:

- `TARGETS_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`;
- `FIXTURE_BOUNDARY_CONTRACT.md`.

Main blockers:

- invalid target root;
- unsafe path;
- unmanaged collision;
- invalid managed notice;
- real Target path;
- absolute host path;
- real drift requirement.

Forbidden behavior:

- executing a real Target Adapter;
- resolving absolute host paths;
- statting a real filesystem target;
- listing directories;
- reading file content;
- writing a Target file.

Expected evidence:

- target intent normalization;
- target surface plan;
- path safety result;
- managed artifact result;
- simulated existing/drift state;
- no-read/no-write evidence.

This module is not runtime because it plans target relationships only. It does
not write and does not read a real Target.

## Planned Output Builder

Responsibility: build planned-only output entries.

Conceptual inputs:

- render context plan;
- target adapter plan;
- dry-run policy.

Conceptual outputs:

- `output_plan_entries`.

Allowed operation vocabulary:

- `CREATE_PLANNED`;
- `UPDATE_PLANNED`;
- `UNCHANGED_PLANNED`;
- `BLOCKED_PLANNED`.

Related contracts:

- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`.

Main blockers:

- unsafe planned path;
- unmanaged collision;
- invalid managed notice;
- executed operation token;
- missing block code on blocked entry.

Forbidden behavior:

- `CREATE_EXECUTED`;
- `UPDATE_EXECUTED`;
- `DELETE_EXECUTED`;
- `WRITE_EXECUTED`;
- converting a planned operation into an executed operation;
- applying a patch;
- creating, updating, or deleting a file.

Expected evidence:

- planned operation entries;
- blocked entries as `BLOCKED_PLANNED`;
- exact existing block codes.

This module is not runtime because it creates only conceptual planned entries.
It does not write and does not read a real Target.

## Dry-run Boundary Evaluator

Responsibility: evaluate dry-run/write boundary, path safety,
managed-artifact policy, simulated drift, and blockers without filesystem
access to a real Target.

Conceptual inputs:

- target adapter plan;
- output plan entries;
- dry-run policy.

Conceptual outputs:

- `dry_run_boundary_result`;
- path safety result;
- managed artifact result;
- blocking summary.

Related contracts:

- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `FIXTURE_BOUNDARY_CONTRACT.md`.

Main blockers:

- dry-run not required;
- invalid target root;
- unsafe path;
- unmanaged collision;
- invalid managed notice;
- real drift requirement;
- operation executed.

Forbidden behavior:

- converting path safety into write permission;
- converting a managed notice into overwrite permission;
- converting simulated drift into real drift;
- filesystem stat;
- directory listing;
- file-content read;
- write execution.

Expected evidence:

- dry-run required result;
- planned-only status;
- path safety result;
- managed artifact result;
- no-read/no-write evidence.

This module is not runtime because it evaluates conceptual boundary evidence.
It does not write and does not read a real Target.

## Write Approval Protocol Evaluator

Responsibility: evaluate the Write Approval Protocol only as still-no-write
conceptual evidence.

Conceptual inputs:

- dry-run boundary result;
- output plan entries;
- report model policy;
- write approval policy.

Conceptual outputs:

- `write_approval_protocol_result`;
- conceptual approval state;
- non-authorization summary.

Allowed approval states:

- `APPROVAL_NOT_REQUESTED`;
- `APPROVAL_CONCEPTUALLY_ELIGIBLE`;
- `APPROVAL_BLOCKED`;
- `APPROVAL_OUT_OF_SCOPE`.

Related contracts:

- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`;
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`;
- `MATERIALIZER_INTERFACE_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`.

Main blockers:

- real write approval requested;
- approval token in request;
- approval registry requested;
- signer requested;
- approval state attempts to release writing;
- `BLOCKED_PLANNED` entry treated as eligible.

Forbidden behavior:

- token issuance;
- approval registry creation;
- persistent approval state;
- signer;
- real writer release;
- Target write release;
- GitHub write release.

Expected evidence:

- conceptual approval state;
- still-no-write statement;
- no token evidence;
- non-authorization summary.

`APPROVAL_CONCEPTUALLY_ELIGIBLE` means only that documentary preconditions
would be satisfied. It does not authorize writing.

Forbidden aliases remain prohibited except as forbidden examples:

- `APPROVED`;
- `WRITE_APPROVED`;
- `APPROVAL_GRANTED`;
- `READY_TO_WRITE`;
- `WRITE_UNLOCKED`;
- `EXECUTION_APPROVED`;
- `MERGE_APPROVED`.

This module is not runtime because it evaluates only conceptual approval
evidence. It does not write and does not read a real Target.

## Dry-run Report Model Builder

Responsibility: construct or reference a conceptual Dry-run Report Model
without persistence.

Conceptual inputs:

- contract-chain result;
- source plan;
- template resolution result;
- render context plan;
- target adapter plan;
- output plan entries;
- dry-run boundary result;
- write approval protocol result.

Conceptual outputs:

- `dry_run_report_model_ref`;
- conceptual `dry_run_report` compatibility summary.

Related contracts:

- `DRY_RUN_REPORT_MODEL_CONTRACT.md`;
- `MATERIALIZER_INTERFACE_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`.

Main blockers:

- persistent report requested;
- report artifact requested;
- JSON or Markdown report file requested;
- CLI stdout contract requested;
- missing no-write evidence;
- missing non-authorization summary.

Forbidden behavior:

- writing a Markdown report;
- writing a JSON report;
- writing a cache;
- writing stdout capture;
- creating any artifact;
- using the Aggregator as report generator.

Expected evidence:

- conceptual report model reference;
- dry-run report shape compatibility;
- persistence prohibited statement.

This module is not runtime because it only builds a conceptual reference or
in-memory planning result. It does not write and does not read a real Target.

## Result Boundary Enforcer

Responsibility: remove or block prohibited result fields and guarantee
no-read/no-write evidence plus non-authorization summary.

Conceptual inputs:

- draft conceptual result;
- boundary policy.

Conceptual outputs:

- `dry_run_materializer_result`;
- final boundary result;
- blocking summary.

Related contracts:

- `MATERIALIZER_INTERFACE_CONTRACT.md`;
- `TARGET_ADAPTER_CONTRACT.md`;
- `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`;
- `DRY_RUN_REPORT_MODEL_CONTRACT.md`;
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.

Main blockers:

- approval token in result;
- write execution ID in result;
- Target real path in result;
- absolute host path in result;
- real file content in result;
- generated file in result;
- materialized output in result;
- applied patch in result;
- commit, branch, or pull request data in result.

Forbidden behavior:

- returning write-capable evidence;
- converting conceptual output into a persisted artifact;
- hiding missing evidence by omitting the blocker.

Expected evidence:

- no-read/no-write evidence;
- non-authorization summary;
- final blocked status when required.

This module is not runtime because it describes the final conceptual boundary
only. It does not write and does not read a real Target.

## Source And Template Rules

The future prototype must require:

- final source model validity;
- kernels from `reference/kernel_lab/`;
- Senior Profiles from `reference/seniorization_lab/`;
- templates from `reference/templates/`;
- contracts from `reference/materialization_lab/contracts/`;
- `reference/agents/` prohibited as final source;
- explicit templates;
- no template inferred by path, target legacy term, nearby file, or productive
  skill.

It must block:

- `base_agent_source`;
- `reference/agents/` as final source;
- absent final source;
- missing explicit template;
- inferred template;
- missing required placeholder;
- unsafe render;
- composition conflict.

## Rendering And Composition Rules

The future prototype may plan:

- `render_context_plan`;
- explicit source references;
- explicit template references;
- placeholder requirements;
- composition blockers.

It must not:

- execute a real renderer;
- generate a rendered file;
- persist render output;
- infer a template;
- infer a source;
- use the productive skill as source;
- use `reference/agents/` as final source.

## Target Adapter Relationship

The future prototype must respect `TARGET_ADAPTER_CONTRACT.md`.

It may use Target Adapter semantics only as:

- conceptual target intent normalizer;
- conceptual target surface planner;
- target-root-relative path planner;
- simulated existing state classifier;
- simulated drift classifier;
- path safety evidence source;
- managed artifact evidence source.

It must not use Target Adapter as:

- real Target Adapter;
- filesystem adapter;
- real path resolver;
- Target reader;
- Target writer;
- real drift detector;
- Target real access layer.

## Write Approval Protocol Relationship

The future prototype must respect `WRITE_APPROVAL_PROTOCOL_CONTRACT.md`.

It may evaluate only:

- `APPROVAL_NOT_REQUESTED`;
- `APPROVAL_CONCEPTUALLY_ELIGIBLE`;
- `APPROVAL_BLOCKED`;
- `APPROVAL_OUT_OF_SCOPE`.

Rules:

- `APPROVAL_CONCEPTUALLY_ELIGIBLE` does not authorize writing;
- no state releases a writer;
- no state releases Target write;
- no state emits a token;
- no state creates an approval registry;
- no state creates a commit, branch, or pull request;
- no state releases GitHub write.

## Dry-run Report Model Relationship

The future prototype may construct or reference only a conceptual
`dry_run_report` compatible with:

```txt
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

It must not:

- persist a report;
- create a Markdown report;
- create a JSON report;
- create a CLI stdout contract;
- create a mandatory runtime payload;
- use the Aggregator as report generator;
- transform checkers into report generators.

## Planned Artifact/Path Safety/Managed Artifact Relationship

The future prototype must align with `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`.

It may plan:

- `output_plan_entries`;
- `planned_path_entries`;
- `path_safety_results`;
- `managed_artifact_results`;
- `simulated_existing_state`;
- `simulated_drift_state`.

Only these operation tokens are allowed:

- `CREATE_PLANNED`;
- `UPDATE_PLANNED`;
- `UNCHANGED_PLANNED`;
- `BLOCKED_PLANNED`.

These operation tokens are prohibited:

- `CREATE_EXECUTED`;
- `UPDATE_EXECUTED`;
- `DELETE_EXECUTED`;
- `WRITE_EXECUTED`.

It must not:

- convert a planned operation into an executed operation;
- convert a planned path into a real path;
- convert path safety into write permission;
- convert managed notice into overwrite permission;
- convert simulated drift into real drift;
- apply a patch;
- create a file;
- update a file;
- delete a file.

## Fixture Relationship

Fixtures may be used only as:

- simulated inputs;
- simulated target state;
- simulated path cases;
- simulated drift/collision cases;
- expected blocked behavior;
- expected conceptual outputs.

Fixtures must not become:

- a real Target;
- final source;
- runtime payload;
- persistent report;
- real adapter result;
- real write approval evidence;
- read authorization;
- write authorization;
- contract substitute.

This contract does not alter fixtures.

## Lazy-load Relationship

Lazy-load is a safety contract, not an optimization.

The future prototype must plan lazy-load trace when decisions require Senior
Agent Profile modules.

It must block:

- required module absent;
- generic `load_reason`;
- trace omitted when required;
- load-all used to hide absence of decision;
- lazy-load treated as optional optimization.

This contract does not implement a runtime loader.

## No-read/No-write Evidence

The future prototype result must include evidence equivalent to:

```txt
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

Human read-only commands, such as path-limited `git status`, may exist outside
the future result model during documentary development. They do not become
runtime evidence and do not authorize writing.

## Non-authorization Rules

The future prototype must include a non-authorization summary stating that it
does not authorize:

- real materializer;
- runtime materializer;
- real writer;
- Target writer;
- filesystem writer;
- real renderer;
- runtime loader;
- runtime scenario selector;
- real Target Adapter;
- real write approval;
- real approval token;
- approval registry;
- Target real read/write;
- real Target filesystem;
- persistent report;
- productive skill mutation;
- GitHub write;
- commit;
- branch;
- pull request;
- real materialization.

## Failure And Block Behavior

The future prototype must fail closed.

It must block when:

- request contains a real Target path;
- request contains an absolute host path;
- request contains an approval token;
- request contains a write execution ID;
- request requires persistent report;
- request requires runtime;
- request requires CLI or runner;
- request requires writer;
- request requires real renderer;
- request requires real Target Adapter;
- request requires real write approval;
- request uses `reference/agents/` as final source;
- final source is absent;
- explicit template is absent;
- template was inferred;
- required placeholder is absent;
- render context is unsafe;
- path safety fails;
- unmanaged collision exists;
- invalid managed notice exists;
- real drift is required;
- output plan contains an executed operation;
- write approval state attempts to release writing;
- no-read/no-write evidence is absent;
- non-authorization summary is absent;
- block code is unknown where the harness requires blocking.

When an output entry is involved, it must use `BLOCKED_PLANNED`.

No fallback execution is allowed. The future prototype must not attempt to fix
the request automatically, infer a template, read a real Target, or write a
real Target.

## Determinism Policy

The future prototype must be documentarily deterministic:

- same conceptual request plus same contracts yields same conceptual result;
- stable agent ordering;
- stable target ordering;
- stable output plan entry ordering;
- explicit source references;
- explicit template references;
- explicit contract references;
- no dependency on current time;
- no dependency on real filesystem state;
- no dependency on network;
- no dependency on GitHub;
- no token generation;
- no execution ID generation;
- no commit hash generation;
- no branch name generation;
- no pull request URL generation.

## Persistence Policy

The future prototype must create zero persistence.

It must not create:

- Markdown report;
- JSON report;
- report file;
- cache;
- snapshot;
- temp output;
- stdout capture file;
- dry-run report artifact;
- materializer result file;
- target adapter result file;
- write approval result file;
- generated artifact.

Any future persistence requires a separate phase, specific contract, audit, and
explicit authorization.

## Aggregator Boundary

The future prototype must not:

- execute checkers as runtime dependencies;
- transform checkers into report generators;
- persist stdout;
- call the Aggregator as materializer runner;
- call the Aggregator as prototype runner;
- expand the Aggregator;
- create a tenth check;
- replace the validation harness.

The Aggregator remains:

- zero-argument;
- stdout-only;
- dev-only/read-only;
- serial;
- stop-on-first-block;
- `shell: false`;
- without interactive stdin;
- fixed `cwd`;
- with timeout per child;
- without automatic retry;
- without JSON;
- without Markdown;
- without persistent report;
- without target path;
- without Target real read/write;
- without filesystem awareness;
- without approval awareness;
- without token, registry, or signer awareness;
- without Git commands;
- without GitHub write;
- without commit, branch, or pull request;
- without productive skill mutation;
- without runtime, materializer, renderer, writer, loader, selector, or adapter.

The official child checks remain exactly:

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

- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`;
- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`.

## Block Codes

This contract introduces no new block codes.

It preserves existing block codes, including:

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

Unknown block codes remain blocking through `BLOCKED_UNKNOWN_BLOCK_CODE` where
the validation harness requires known block-code ownership.

A new block code is not recommended in this phase. Any future recommendation
must explain why current codes do not cover the risk, identify the owning
contract, state whether the code is documentary only, identify future checker
needs, and describe the risk it resolves.

## Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT: PASS` requires:

- `DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md` exists;
- the contract is documentary/dev-only/read-only;
- the contract does not implement a prototype;
- the contract does not create a real materializer;
- the contract does not create executable runtime;
- the contract does not create CLI or runner;
- the contract does not create real writer, renderer, loader, or scenario
  selector;
- the contract does not create a real Target Adapter;
- the contract does not create real write approval;
- the contract does not create approval token, registry, or signer;
- the contract does not create persistent report;
- the contract does not authorize Target real read/write;
- the contract does not authorize real Target filesystem access;
- the contract does not authorize GitHub write;
- the contract does not authorize productive skill mutation;
- the contract does not authorize commit, branch, or pull request;
- final sources remain `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains prohibited as final source;
- explicit templates remain mandatory;
- planned-only operations remain preserved;
- executed operations remain prohibited;
- Dry-run Report Model remains non-persistent;
- Materializer Interface remains conceptual;
- Target Adapter remains conceptual;
- Write Approval Protocol remains still-no-write;
- lazy-load remains a safety contract;
- Aggregator Checker remains exactly 9 checks;
- no checker becomes a report generator;
- no-read/no-write evidence and non-authorization summary are mandatory;
- no new block code is created without strong justification;
- manifest and validation docs reflect this contract without overreach;
- local materialization-lab checks pass.
