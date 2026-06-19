# Dry-run-only Materializer Prototype Test Hardening Plan

Status: documentary/dev-only/read-only planning artifact.

This document plans future test hardening for the audited dry-run-only
materializer prototype. It does not implement tests, create a checker, alter
the Aggregator, persist runtime output, access a real Target, write GitHub, or
mutate the productive skill.

## 1. Verdict

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN: READY`

The safe next step is a later, separately authorized test-hardening
implementation phase limited to focused in-memory assertions for the existing
dev-only prototype test.

This plan is documentary only. It does not authorize implementation during this
phase.

## 2. Executive Summary

The audited prototype already proves the minimum dry-run-only boundary:
fixture-only request model, in-memory result, no Target real access, no writes,
no GitHub action, no productive-skill mutation, explicit templates, planned-only
operations, still-no-write approval semantics, no-read/no-write evidence, and
non-authorization summary.

Future hardening should add focused negative cases and explicit result-shape
assertions around request shape, source roots, contract refs, template refs,
disguised positive approval semantics, path traversal, host path variants,
invalid operation tokens, required output sections, no-read/no-write evidence,
and non-authorization summary.

The hardening must remain a direct local prototype test. It must not become a
checker, runner, CLI, report generator, runtime materializer, Target-aware
validator, or Aggregator child.

## 3. Planning Context

This plan follows these consolidated states:

- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN: READY`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION: PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_NEXT_CAPABILITY_DECISION: READY`

The previous decision accepted `OPTION_A_TEST_HARDENING` and deferred or
rejected all broader options:

- `OPTION_B_DOCUMENTATION_INTEGRATION`: `DEFER`
- `OPTION_C_SEPARATE_PROTOTYPE_CHECKER`: `DEFER`
- `OPTION_D_FREEZE_AS_DEV_BASELINE`: `DEFER`
- `OPTION_E_OTHER_SAFE_OPTION`: `REJECT`

The expected artifact for this phase is:

- `reference/materialization_lab/DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN.md`

## 4. Current Prototype Test Baseline

The current audited prototype files are:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`

The baseline remains:

- dev-only
- fixture-only
- model-only
- in-memory-only
- dry-run-only
- no-write
- no-target-real
- no-GitHub
- no productive-skill mutation

The current prototype test already covers:

- happy path
- `dry_run_required: false`
- invalid `write_execution_policy`
- invalid `target_read_policy`
- invalid `target_write_policy`
- invalid `persistent_report_policy`
- direct positive approval semantics
- final `reference/agents/` source
- missing `template_refs`
- inferred template signal
- absolute host path
- real Target path
- approval token
- write execution ID
- executed operation token
- generated file signal
- mandatory runtime payload signal
- no-read/no-write evidence
- non-authorization summary
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` as non-authorizing

## 5. Preserved Boundaries

Future hardening must preserve these contracts without relaxing, replacing,
reinterpreting, or bypassing them:

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

The future test hardening must preserve these boundaries:

- no runtime materializer
- no Target real access
- no Target real read or write
- no filesystem stat, directory listing, or file-content read against Target real
- no persistent report
- no stdout capture persistence
- no cache, snapshot, temp output, generated artifact, or materialized output
- no GitHub write
- no commit, branch, pull request, or merge
- no productive-skill mutation
- no writer, renderer, runtime loader, or runtime scenario selector
- no real Target Adapter
- no real Write Approval
- no approval token, approval registry, or signer
- no final dependency on `reference/agents/`
- explicit templates only
- planned-only operations only
- Aggregator unchanged with exactly 9 official checks

## 6. Non-goals

This phase and the later hardening implementation must not:

- implement tests during this planning phase
- create `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`
- create any other checker
- alter `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- add a tenth Aggregator child check
- integrate the prototype test into the Aggregator
- create a runner, CLI, report generator, runtime materializer, writer,
  renderer, loader, scenario selector, real Target Adapter, or real Write
  Approval
- read or write any real Target
- persist JSON, Markdown, stdout, cache, snapshot, temp, generated, or
  materialized output
- mutate `skills/stnl_project_agent_specializer/`
- perform GitHub write, commit, branch, pull request, merge, or applied patch
  behavior in the target surface

## 7. Test Hardening Boundary

Future tests may harden only the dev-only prototype behavior already present in
the dev skill. They may use conceptual in-memory request objects and in-memory
results only.

Allowed positive cases are limited to:

- current fixture happy path
- optional target variants only if they remain conceptual, fixture-only,
  explicit-template, planned-only, in-memory, and no-write
- optional allowed planned operation variants:
  `CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`, and
  `BLOCKED_PLANNED`
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` only as a still-no-write, non-authorizing
  conceptual state

Allowed negative cases are limited to boundary-critical request and result
shapes that can be expressed without filesystem access.

The future test may add small in-memory helpers, table-driven negative cases,
and explicit assertions over block codes, evidence fields, and
non-authorization fields.

The future test must not inspect a real target path. Path strings used in
negative tests are inert request values only.

## 8. Prioritized Hardening Areas

Priority 1:

- request shape
- source roots
- contract refs
- template refs
- approval semantics
- path safety
- planned operation tokens

Priority 2:

- output shape assertions
- no-read/no-write evidence assertions across pass and blocked results
- non-authorization summary assertions across pass and blocked results

Priority 3:

- small positive variants for allowed planned operations
- helper deduplication only when it reduces repeated assertion noise

Out of scope:

- exhaustive contract line-by-line reimplementation
- combinatorial matrices across every field and every invalid value
- snapshots or golden files
- stdout contract testing
- checker behavior
- Aggregator behavior
- Target filesystem behavior

## 9. Request Shape Test Plan

Future negative tests should verify fail-closed behavior for:

- `request` is `null`
- `request` is `undefined`
- `request` is a string
- `request` is an array
- missing `request_kind`
- invalid `request_kind`
- invalid `canonical_target_id`
- missing `agent_ids`
- empty `agent_ids`
- non-array `agent_ids`
- missing `phase`, if the future contract requires it
- unexpected `phase`, if the future contract requires it

Expected assertion strategy:

- assert blocked status
- assert a boundary block code such as `BLOCKED_REQUEST_MODEL_INVALID`,
  `BLOCKED_REQUEST_KIND_INVALID`, `BLOCKED_TARGET_ROOT_INVALID`, or
  `BLOCKED_SOURCE_MODEL_INVALID`
- assert no-read/no-write evidence after every blocked result
- assert non-authorization summary after every blocked result

The future tests should not require request parsing, schema libraries, or a
runtime payload validator.

## 10. Source Roots Test Plan

Future negative tests should verify fail-closed behavior for:

- missing `source_roots`
- empty `source_roots`
- non-array `source_roots`
- unknown source root
- source root without trailing slash when strict normalization is required by
  the future contract
- `reference/agents`
- `reference/agents/`
- `reference/agents/foo`
- `skills/stnl_project_agent_specializer/`
- path traversal in `source_roots`
- absolute path in `source_roots`

Expected assertion strategy:

- assert `BLOCKED_SOURCE_MODEL_INVALID` for missing, empty, non-array, unknown,
  or malformed source roots
- assert `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY` for any final
  `reference/agents` dependency
- assert `BLOCKED_PATH_UNSAFE` for traversal, absolute host paths, productive
  skill paths, or target-real path indicators
- assert that passing results use only final documentary roots:
  `reference/kernel_lab/`, `reference/seniorization_lab/`,
  `reference/templates/`, and `reference/materialization_lab/contracts/`

The future tests must not list or stat these roots as filesystem targets.

## 11. Contract Refs Test Plan

Future negative tests should verify fail-closed behavior for:

- missing `contract_refs`
- non-array `contract_refs`
- empty `contract_refs`
- required contract missing from `contract_refs`
- absolute path in `contract_refs`
- path traversal in `contract_refs`
- contract ref pointing to the productive skill
- unknown contract replacing a required contract

Expected assertion strategy:

- assert `BLOCKED_CONTRACT_CHAIN_INVALID` when the contract chain is missing,
  incomplete, non-array, empty, or replaced
- assert `BLOCKED_PATH_UNSAFE` when any contract ref contains an absolute host
  path, traversal, productive-skill path, or target-real path indicator
- assert that the future passing result preserves the full required contract
  set without treating unknown refs as substitutes

The tests must not read contract file contents dynamically. The fixture model
may hold the conceptual refs already present in memory.

## 12. Template Refs Test Plan

Future negative tests should verify fail-closed behavior for:

- missing `template_refs`
- non-array `template_refs`
- empty `template_refs`
- unknown template ref
- template ref outside `reference/templates/`
- template ref with absolute path
- template ref with path traversal
- template inferred by path
- template inferred by nearby file
- template inferred by legacy target
- template inferred by implicit convention

Expected assertion strategy:

- assert `BLOCKED_TEMPLATE_MISSING` for absent, empty, non-array, unknown, or
  out-of-inventory template refs
- assert `BLOCKED_PATH_UNSAFE` for absolute path or traversal values
- assert `BLOCKED_TEMPLATE_INFERRED` for all inference signals
- assert that passing results expose only explicit refs under
  `reference/templates/`

The future tests must not read templates or infer template availability from
the filesystem.

## 13. Approval Semantics Test Plan

Future negative tests should block direct and disguised positive approval
semantics, including:

- `APPROVED`
- `WRITE_APPROVED`
- `APPROVAL_GRANTED`
- `READY_TO_WRITE`
- `WRITE_UNLOCKED`
- `EXECUTION_APPROVED`
- `MERGE_APPROVED`
- `approved`
- `write-approved`
- `ready to write`
- `write unlocked`
- `approval granted`

Expected assertion strategy:

- assert `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`
- assert `write_approval_protocol_result.write_authorized === false`
- assert `write_approval_protocol_result.approval_token_issued === false`
- assert `write_approval_protocol_result.approval_registry_created === false`
- assert `write_approval_protocol_result.signer_created === false`
- assert `write_approval_protocol_result.real_write_approval_created === false`

The future positive assertion must preserve:

- `APPROVAL_CONCEPTUALLY_ELIGIBLE` does not authorize writing
- `approval_conceptually_eligible_authorizes_write === false`

## 14. Path Safety Test Plan

Future negative tests should block inert request strings representing:

- `/tmp/*`
- `/Users/*`
- `file://*`
- `C:\*`
- `..\*`
- `../*`
- `target_real_path`
- `target_absolute_path`
- `skills/stnl_project_agent_specializer/`
- `.codex` real output path as `generated_file`
- `.github` real output path as `generated_file`
- `AGENTS.md` real output path as `generated_file`

Expected assertion strategy:

- assert `BLOCKED_PATH_UNSAFE` for absolute host paths, traversal, target-real
  indicators, productive-skill paths, and target-absolute indicators
- assert `BLOCKED_GENERATED_OUTPUT_REQUESTED` for generated or materialized
  output signals
- assert that planned paths in passing `output_plan_entries` are conceptual
  target-root-relative paths only
- assert that planned paths are not converted into real destinations

The future tests may use path-like strings only as inert values. They must not
resolve, stat, read, list, create, or write those paths.

## 15. Planned Operation Test Plan

Future negative tests should block:

- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`
- `SOMETHING_EXECUTED`
- `CREATE_REAL`
- `WRITE_REAL`
- `DELETE_REAL`
- invalid `planned_operation`
- missing `planned_operation`

Future positive tests may preserve:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

Expected assertion strategy:

- assert `BLOCKED_EXECUTED_OPERATION_FORBIDDEN` for `*_EXECUTED` tokens
- assert `BLOCKED_PLANNED_OPERATION_INVALID` for missing or invalid non-planned
  tokens
- assert every passing output entry uses an allowed planned operation
- assert no result includes executed operation tokens

## 16. Output Shape Assertion Plan

Future tests should assert that every result contains these top-level sections:

- `result_identity`
- `boundary_result`
- `contract_chain_result`
- `resolved_source_plan`
- `template_resolution_result`
- `render_context_plan`
- `target_adapter_plan`
- `output_plan_entries`
- `dry_run_boundary_result`
- `write_approval_protocol_result`
- `dry_run_report_model_ref`
- `blocking_summary`
- `no_read_no_write_evidence`
- `non_authorization_summary`

Future tests should assert that results do not contain:

- `persistent_report_path`
- `approval_token`
- `write_execution_id`
- `commit_hash`
- `branch_name`
- `pull_request_url`
- absolute host path
- Target real path
- real file content
- generated file real
- materialized output real

Expected assertion strategy:

- use explicit property assertions for required top-level sections
- use a small in-memory recursive scan only for forbidden field names and
  forbidden path/value tokens
- avoid snapshots and full-result golden files
- avoid asserting irrelevant internal ordering except where array order is a
  declared contract field

## 17. No-read/no-write Evidence Assertion Plan

Future tests should assert this exact evidence for pass and blocked results:

- `target_read_attempted: false`
- `target_write_attempted: false`
- `filesystem_stat_attempted: false`
- `directory_listing_attempted: false`
- `file_content_read_attempted: false`
- `files_written: []`
- `persistent_report_written: false`
- `github_write_attempted: false`
- `productive_skill_mutation_attempted: false`
- `approval_token_issued: false`
- `write_executed: false`
- `patch_applied: false`
- `commit_created: false`
- `branch_created: false`
- `pull_request_created: false`

Expected assertion strategy:

- centralize one in-memory assertion helper for this evidence object
- call it for every positive result and every blocked result
- keep the helper local to `dry-run-only-materializer-prototype.test.mjs`
- do not persist evidence as a report

## 18. Non-authorization Summary Assertion Plan

Future tests should assert this non-authorization summary for pass and blocked
results:

- `materialization_authorized: false`
- `target_read_authorized: false`
- `target_write_authorized: false`
- `filesystem_access_to_target_authorized: false`
- `github_write_authorized: false`
- `productive_skill_mutation_authorized: false`
- `writer_created: false`
- `renderer_created: false`
- `loader_created: false`
- `scenario_selector_created: false`
- `target_adapter_created: false`
- `write_approval_created: false`
- `approval_state_authorizes_write: false`
- `approval_conceptually_eligible_authorizes_write: false`

Expected assertion strategy:

- centralize one in-memory assertion helper for this summary
- assert that `APPROVAL_CONCEPTUALLY_ELIGIBLE` remains non-authorizing
- assert that blocked results use a blocked or out-of-scope approval state
  without creating write authorization
- do not create a Write Approval implementation, token, registry, or signer

## 19. Anti-bloat Rules

Future hardening must:

- prioritize boundary-critical cases
- avoid a combinatorial matrix across every field and every invalid value
- avoid duplicating every contract line as a test
- avoid tests that depend on irrelevant internal ordering
- avoid snapshots
- avoid persisted golden files
- avoid large fixtures
- avoid complex parsers
- avoid stdout contract tests
- avoid a new checker

The recommended implementation style is:

- small in-memory helpers
- table-driven assertions for named negative cases
- explicit assertions over status, block codes, evidence, and
  non-authorization fields
- no filesystem access
- no Target real path usage except inert negative strings
- no persistence

## 20. Forbidden Test Behaviors

Future tests must not:

- read or write Target real
- stat Target real
- list Target real directories
- read Target real file content
- create, write, or delete files
- create reports, caches, snapshots, temp outputs, generated artifacts, or
  materialized outputs
- capture stdout to a file
- invoke Git or GitHub writes
- commit, branch, pull request, merge, or apply patches
- mutate `skills/stnl_project_agent_specializer/`
- import a real writer, renderer, runtime loader, runtime scenario selector,
  Target Adapter, Write Approval, approval registry, token issuer, or signer
- use network or external services
- add the prototype test to the Aggregator
- alter the official 9-check Aggregator list or order

## 21. Candidate Future Files

Files allowed for a later, separately authorized test-hardening implementation:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`

Optional only if justified by simple in-memory fixture-model helpers:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`

Files forbidden for this plan and for the later test-hardening implementation:

- `skills/stnl_project_agent_specializer/`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`
- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`
- `scripts/materialization_lab/check-render-context.mjs`
- `scripts/materialization_lab/check-dry-run-plan.mjs`
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
- `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`
- any real Target path
- any persistent report, cache, snapshot, temp output, generated artifact, or
  materialized output

## 22. Validation Expectations

After this planning artifact is created, local validation must remain limited
to existing safe checks:

- `node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- `node scripts/materialization_lab/check-static.mjs`
- `node scripts/materialization_lab/check-source-inventory.mjs`
- `node scripts/materialization_lab/check-template-coverage.mjs`
- `node scripts/materialization_lab/check-fixture-boundary.mjs`
- `node scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `node scripts/materialization_lab/check-project-scenarios.mjs`
- `node scripts/materialization_lab/check-render-context.mjs`
- `node scripts/materialization_lab/check-dry-run-plan.mjs`
- `node scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
- `node scripts/materialization_lab/check-validation-harness-aggregator.mjs`

For the later implementation phase, validation must confirm:

- the prototype test remains direct local test execution only
- no checker was created
- Aggregator remains unchanged
- no tenth Aggregator child exists
- no persistent output exists
- no Target real access exists
- no GitHub, commit, branch, or pull request behavior exists
- no productive-skill mutation exists

## 23. Audit Expectations

A later read-only audit must verify:

- this planning phase created at most one documentary artifact
- no tests were implemented in this phase
- no checker was created
- Aggregator was not altered
- no tenth Aggregator child was introduced
- prototype remains dev-only, fixture-only, model-only, in-memory-only, and
  no-write
- Target real remains prohibited
- writer, renderer, loader, scenario selector, real Target Adapter, and real
  Write Approval remain prohibited
- approval token, approval registry, and signer remain prohibited
- persistent report remains prohibited
- GitHub write, commit, branch, and pull request remain prohibited
- productive skill remains untouched
- `reference/agents/` remains prohibited as final source
- templates remain explicit
- planned-only operations remain preserved
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` remains still-no-write
- no-read/no-write evidence and non-authorization summary are asserted
- current prototype test passes
- 9 official checks pass
- Aggregator passes unchanged

## 24. Blocking Conditions

This plan or the later hardening implementation must block if it would require:

- implementing tests during this planning phase
- creating a checker
- altering the Aggregator
- adding a tenth Aggregator child check
- Target real access
- Target real read or write
- filesystem stat, directory listing, or file-content read against Target real
- writer real
- renderer real
- loader runtime real
- scenario selector runtime real
- Target Adapter real
- Write Approval real
- approval token
- approval registry
- signer
- persistent report
- stdout capture persistence
- cache, snapshot, temp output, generated artifact, or materialized output
- GitHub write
- commit, branch, pull request, or merge
- productive-skill mutation
- `reference/agents/` as final source
- inferred template
- filesystem write
- transforming the prototype test into a runner, CLI, stdout contract, or
  productive materializer
- recommending snapshots or persisted golden files
- guessing a document location without a clear pattern

## 25. Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN:
EXCELLENT PASS` may be declared by a later read-only audit only when:

- this document remains documentary/dev-only/read-only
- no test was implemented by this planning phase
- no checker was created
- Aggregator was not altered
- no tenth Aggregator child exists
- prototype remains dev-only, fixture-only, model-only, in-memory-only, and
  no-write
- Target real remains prohibited
- writer, renderer, loader, adapter, and approval real remain prohibited
- persistent report remains prohibited
- GitHub write, commit, branch, and pull request remain prohibited
- productive skill remains untouched
- `reference/agents/` remains prohibited as final source
- templates remain explicit only
- planned-only operations remain preserved
- Write Approval remains still-no-write
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` does not authorize writing
- the plan defines clear future cases for request shape, source roots, contract
  refs, template refs, approval semantics, path safety, planned operations,
  output shape, no-read/no-write evidence, and non-authorization summary
- the plan prevents bloat and combinatorial explosion
- prototype test passes
- 9 official checks pass
- Aggregator passes unchanged
- the recommended next phase is safe, separate, and read-only

## 26. Final Status

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN: READY`

Recommended next phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN_AUDIT`

The next phase must be read-only. It must audit this planning artifact and must
not implement tests, create a checker, alter the Aggregator, access Target real,
persist output, write GitHub, commit, branch, open a pull request, or mutate the
productive skill.
