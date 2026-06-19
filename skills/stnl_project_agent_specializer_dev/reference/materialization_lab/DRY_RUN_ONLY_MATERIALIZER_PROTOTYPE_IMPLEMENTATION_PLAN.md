# Dry Run Only Materializer Prototype Implementation Plan

Status: documentary/dev-only/read-only planning artifact.

This document plans a possible future implementation of a dry-run-only
materializer prototype. It does not implement the prototype, create runtime
entrypoints, create scripts, create output artifacts, persist reports, read a
real Target, write a real Target, touch GitHub, mutate the productive skill, or
authorize materialization.

## 1. Verdict

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN: READY`

This verdict is valid only for a future, separately authorized, fixture-only,
in-memory-only, no-write prototype implementation plan. It does not authorize
implementation in this phase.

## 2. Executive Summary

The future prototype may be implemented only as a dev-only dry-run planning
surface over controlled fixture and documentary models under
`skills/stnl_project_agent_specializer_dev/`.

The future implementation must preserve all existing contracts, especially the
dry-run/write boundary, Dry-run Report Model, Materializer Interface, Target
Adapter, Write Approval Protocol, Fixture Boundary, Validation Harness
Aggregator, and Implementation Boundary contracts.

The future prototype must return only an in-memory conceptual result. It must
not create Markdown reports, JSON reports, stdout captures, generated files,
materialized outputs, patches, commits, branches, pull requests, approval
tokens, approval registries, runtime loaders, scenario selectors, renderers,
writers, real Target Adapters, real Write Approval implementations, or any
Target real read/write behavior.

## 3. Scope

Permitted scope for a future implementation phase:

- dev-only planning inside
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`,
  only if separately authorized by an implementation phase;
- documentary and fixture models inside
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/`;
- final source references from `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- fixture-only simulated inputs under
  `reference/materialization_lab/fixtures/`;
- in-memory-only conceptual result construction;
- local read-only validation through the existing 9 checks and the existing
  Aggregator Checker.

The future prototype must operate only over models, fixtures, contracts, and
documentary source references controlled by the dev skill. It must never use a
real Target as input or output.

## 4. Non-goals

This plan does not authorize:

- prototype implementation in this phase;
- runtime materializer;
- runtime renderer;
- runtime writer;
- runtime loader;
- runtime scenario selector;
- real Target Adapter;
- real Write Approval implementation;
- approval token;
- approval registry;
- persistent report;
- Target real read/write;
- filesystem stat against a real Target;
- directory listing against a real Target;
- file-content read from a real Target;
- generated files;
- materialized outputs;
- applied patches;
- mutation of `skills/stnl_project_agent_specializer/`;
- GitHub write;
- commit;
- branch;
- pull request;
- CLI;
- runner;
- expansion of the Aggregator Checker.

## 5. Preserved Contracts

The future implementation must preserve these contracts exactly:

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

No future implementation step may replace, relax, reinterpret, or bypass these
contracts to allow runtime execution, Target real access, persistence, GitHub
write, productive-skill mutation, or real materialization.

## 6. Implementation Boundary

A future implementation may proceed only after a separate implementation phase
explicitly authorizes a dev-only/read-only prototype category.

Boundary requirements:

- implementation must remain inside
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`;
- implementation must be fixture-only and model-only;
- result must be in-memory-only;
- no output file path may be accepted;
- no target project path may be accepted;
- no host absolute path may be accepted;
- no approval token may be accepted or issued;
- no write execution ID may be accepted or issued;
- no Git command may be required;
- no network or GitHub dependency may exist;
- no filesystem API may be used against a real Target;
- no persistence API may be used for reports, artifacts, caches, snapshots,
  generated files, or stdout captures.

The future implementation must fail closed when a request crosses any boundary.

## 7. Candidate Future Files

Candidate files for a later, separately authorized implementation phase:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`

These names are candidates only. They are not created by this plan.

Allowed characteristics for candidate files:

- dev-only/read-only;
- no external package dependency unless separately justified and audited;
- no CLI or runner behavior;
- no target path argument;
- no write-capable filesystem import;
- no report writer;
- no renderer;
- no writer;
- no runtime loader;
- no scenario selector runtime;
- no GitHub client;
- no Git commands;
- no dependency on `skills/stnl_project_agent_specializer/`;
- no final dependency on `reference/agents/`.

If any candidate file needs a different path or category, the
`IMPLEMENTATION_BOUNDARY_CONTRACT.md` must be updated and audited in a prior
documentary phase.

## 8. Forbidden Files and Forbidden Behaviors

Forbidden files and paths for future implementation:

- `skills/stnl_project_agent_specializer/`
- any real target project path;
- `.github/**` outside authorized fixture documents;
- `.codex/**` outside authorized fixture documents;
- `AGENTS.md` outside authorized fixture documents;
- any persistent report path;
- any generated output path;
- any materialized output path;
- any GitHub or PR artifact path.

Forbidden behaviors:

- reading a real Target;
- writing a real Target;
- filesystem stat against a real Target;
- directory listing against a real Target;
- file-content read from a real Target;
- persistent report generation;
- JSON report persistence;
- Markdown report persistence;
- stdout capture persistence;
- runtime materializer execution;
- renderer execution;
- writer execution;
- Target Adapter execution;
- Write Approval execution;
- loader runtime execution;
- scenario selector runtime execution;
- approval token issuance;
- approval registry creation;
- signer creation;
- generated file creation;
- materialized output creation;
- applied patch creation;
- commit creation;
- branch creation;
- pull request creation;
- GitHub write;
- productive skill mutation.

## 9. Conceptual Input Model

The future prototype may accept only a conceptual request equivalent to:

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

Allowed conceptual fields:

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

Required request rules:

- `dry_run_required: true`;
- `write_execution_policy: prohibits writing`;
- `target_read_policy: prohibits Target real read`;
- `target_write_policy: prohibits Target real write`;
- `persistent_report_policy: prohibits persistent report`;
- `approval_policy: conceptual/still-no-write only`;
- `template_refs: explicit only`;
- `source_roots` must not include `reference/agents/` as final source.

Forbidden request content:

- absolute host path;
- real Target path;
- approval token;
- write execution ID;
- mandatory runtime payload;
- generated file;
- materialized output.

The request model is not a JSON schema, runtime object contract, CLI argument
contract, or persisted input format.

## 10. Conceptual Output Model

The future prototype may return only a conceptual result equivalent to:

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

Forbidden output content:

- persisted file;
- mandatory JSON;
- mandatory runtime object;
- CLI stdout contract;
- approval token;
- write execution ID;
- Target real path;
- absolute host path;
- real file content;
- written file;
- generated file;
- materialized output;
- applied patch;
- commit hash;
- branch name;
- pull request URL.

The result must be returned in memory only and must be discarded after the
future invocation or test assertion.

## 11. Planned-only Operations

Allowed operation tokens:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

Forbidden operation tokens:

- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`

The future implementation must never convert:

- planned operation into executed operation;
- planned path into real path;
- path safety into write permission;
- managed notice into overwrite permission;
- simulated drift into real drift.

## 12. In-memory-only Result Policy

The future prototype result must be constructed and consumed in memory only.

Prohibited persistence:

- Markdown report;
- JSON report;
- dry-run report artifact;
- materializer result file;
- target adapter result file;
- write approval result file;
- cache;
- snapshot;
- temp output;
- stdout capture file;
- generated artifact;
- materialized output.

The Dry-run Report Model may be referenced conceptually, but it must not be
persisted and must not become a runtime payload requirement.

## 13. Fixture-only Policy

The future implementation may use fixtures only as controlled documentary
simulation inputs:

- project fixture cases;
- lazy-load fixture cases;
- blocked-case fixture cases;
- minimal expected-output fixture cases;
- simulated target state;
- simulated path cases;
- simulated drift and collision cases;
- expected conceptual output shapes.

Fixtures must not become:

- real Targets;
- final sources;
- runtime payloads;
- persistent reports;
- adapter results;
- write approval evidence;
- read authorization;
- write authorization;
- substitutes for contracts.

`reference/agents/` remains only a temporary development parity baseline and
must never become a final source.

## 14. No-read/no-write Evidence Requirements

Every future conceptual result must include evidence equivalent to:

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

This evidence is conceptual result evidence only. It does not permit a future
runtime to inspect a real Target to prove that nothing changed.

## 15. Write Approval Still-no-write Policy

Allowed conceptual approval states:

- `APPROVAL_NOT_REQUESTED`
- `APPROVAL_CONCEPTUALLY_ELIGIBLE`
- `APPROVAL_BLOCKED`
- `APPROVAL_OUT_OF_SCOPE`

`APPROVAL_CONCEPTUALLY_ELIGIBLE` means only that documentary preconditions
would be satisfied. It does not authorize writing.

Forbidden positive approval semantics, except as forbidden examples:

- `APPROVED`
- `WRITE_APPROVED`
- `APPROVAL_GRANTED`
- `READY_TO_WRITE`
- `WRITE_UNLOCKED`
- `EXECUTION_APPROVED`
- `MERGE_APPROVED`

No approval state may release a writer, Target write, GitHub write, commit,
branch, pull request, approval token, registry, signer, or materialization.

## 16. Dry-run Report Non-persistence Policy

The future prototype may build or reference only a conceptual Dry-run Report
Model. It must not create:

- persistent report;
- Markdown report;
- JSON report;
- CLI stdout report contract;
- report generator;
- report cache;
- report snapshot;
- report artifact.

The Aggregator Checker output must not be captured or transformed into a
Dry-run Report Model. Existing checks remain validation evidence only.

## 17. Validation Strategy

Acceptable local validation after a future implementation, without creating new
checkers in this plan:

1. Run the existing read-only checks individually:
   - `node scripts/materialization_lab/check-static.mjs`
   - `node scripts/materialization_lab/check-source-inventory.mjs`
   - `node scripts/materialization_lab/check-template-coverage.mjs`
   - `node scripts/materialization_lab/check-fixture-boundary.mjs`
   - `node scripts/materialization_lab/check-lazy-load-fixtures.mjs`
   - `node scripts/materialization_lab/check-project-scenarios.mjs`
   - `node scripts/materialization_lab/check-render-context.mjs`
   - `node scripts/materialization_lab/check-dry-run-plan.mjs`
   - `node scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
2. Run the existing Aggregator Checker:
   - `node scripts/materialization_lab/check-validation-harness-aggregator.mjs`
3. Add future prototype unit assertions only if separately authorized and only
   as in-memory fixture/model tests.

No new checker, runner, CLI, report generator, tenth Aggregator child check, or
runtime validator is authorized by this plan.

## 18. Future Implementation Sequence

A future implementation phase should proceed incrementally:

1. Reconfirm this plan and all preserved contracts.
2. Reconfirm that the Aggregator Checker still has exactly 9 child checks in
   the approved order.
3. Define a fixture-only request model in code without accepting CLI arguments,
   target paths, host absolute paths, approval tokens, or write IDs.
4. Define an in-memory result model in code without persistence or report
   output paths.
5. Implement request boundary validation as fail-closed logic over fixture and
   documentary fields only.
6. Implement contract-chain reference validation without executing checkers as
   runtime dependencies.
7. Implement source and template planning with final sources and explicit
   templates only.
8. Implement render-context planning without renderer execution.
9. Implement target-adapter planning without a real adapter or real filesystem
   access.
10. Implement planned output entries with planned-only operation tokens.
11. Implement dry-run/write-boundary evaluation without Target access.
12. Implement Write Approval Protocol evaluation as still-no-write only.
13. Build conceptual Dry-run Report Model compatibility in memory only.
14. Enforce result boundary by stripping or blocking prohibited result fields.
15. Run local read-only checks and record results in the phase report only, not
   as persisted runtime output.
16. Hand off to a read-only audit phase before any further capability is added.

## 19. Audit Requirements

A mandatory read-only audit must follow any future implementation phase.

The audit must verify:

- no Target real read path exists;
- no Target real write path exists;
- no filesystem stat against real Target exists;
- no directory listing against real Target exists;
- no file-content read from real Target exists;
- no write-capable filesystem API is imported or reachable for result/report
  persistence;
- no GitHub API/client/write path exists;
- no Git command dependency exists;
- no commit, branch, or pull request behavior exists;
- no productive skill mutation path exists;
- no dependency on `skills/stnl_project_agent_specializer/` exists;
- no final dependency on `reference/agents/` exists;
- no renderer, writer, loader, scenario selector, real Target Adapter, real
  Write Approval implementation, token issuer, registry, or signer exists;
- no persistent report, stdout capture, generated file, or materialized output
  is created;
- no Aggregator expansion or tenth check exists.

## 20. Blocking Conditions

The future implementation must block if any condition is present:

- request contains a real Target path;
- request contains an absolute host path;
- request contains an approval token;
- request contains a write execution ID;
- request requires persistent report;
- request requires runtime payload;
- request requires CLI or runner;
- request requires writer;
- request requires real renderer;
- request requires real Target Adapter;
- request requires real Write Approval;
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
- block code is unknown where validation requires known block-code ownership;
- implementation would require any file outside the authorized dev-only script
  path;
- implementation would require any write, report, Target, GitHub, productive
  skill, branch, commit, PR, or materialization behavior.

Blocked output entries must use `BLOCKED_PLANNED`.

## 21. Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN:
EXCELLENT PASS` may be declared by a later read-only audit only when:

- this plan exists and remains documentary/dev-only/read-only;
- no prototype was implemented by this planning phase;
- all preserved contracts remain unchanged in meaning;
- future candidate files are limited to dev-only/read-only fixture/model logic;
- future scope is fixture-only and in-memory-only;
- Target real read/write remains prohibited;
- filesystem stat, directory listing, and file-content reads against real
  Target remain prohibited;
- persistent report creation remains prohibited;
- Dry-run Report Model remains non-persistent;
- Materializer Interface remains conceptual;
- Target Adapter remains conceptual;
- Write Approval Protocol remains still-no-write;
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` remains non-authorizing;
- planned-only operation tokens remain the only allowed operations;
- executed operation tokens remain prohibited;
- final sources remain `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains prohibited as final source;
- templates remain explicit only;
- no renderer, writer, loader, scenario selector, real Target Adapter, real
  Write Approval, token issuer, registry, signer, GitHub write, commit, branch,
  pull request, applied patch, generated file, materialized output, or
  productive-skill mutation is authorized;
- the Aggregator Checker remains exactly 9 checks in the approved order;
- local materialization-lab checks pass.

## 22. Final Status

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN: READY`

Next recommended phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN_AUDIT`

This next phase must be read-only and must audit this plan before any prototype
implementation is considered.
