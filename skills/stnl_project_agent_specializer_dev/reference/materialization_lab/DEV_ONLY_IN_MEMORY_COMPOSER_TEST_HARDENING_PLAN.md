# Dev-only In-memory Composer Test Hardening Plan

Status: documentary/dev-only/read-only planning artifact.

This document plans future hardening for the manual/local/dev-only in-memory
composer test. It does not implement hardening, change scripts, create a
checker, alter the Aggregator, alter contracts, alter fixtures, alter
templates, persist output, access a real Target, write GitHub, or touch the
productive skill.

## 1. Verdict

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN: READY`

The safe next step is a later, separately authorized test-hardening
implementation phase limited to the existing manual/local/dev-only composer
test surface.

This phase is plan-only and documentation-only. It authorizes no code change.

## 2. Executive Summary

The audited composer already exists as a pure in-memory, dry-run-only,
still-no-write module with a manual/local test:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

Future hardening should strengthen assertions around boundary behavior without
turning the test into an official checker. The future test should remain a
direct local Node.js test, outside the Aggregator and outside the productive
skill. It should use in-memory payloads only, assert exact no-read/no-write
evidence and non-authorization summaries on pass and blocked paths, and expand
negative coverage for source/template boundaries, semantic aliases, approval
positive semantics, forbidden output recursion, contract gaps, render/write
signals, Target/GitHub/write signals, and Aggregator isolation.

The central answer is: harden the composer test by adding table-driven
in-memory assertions over already declared boundaries, while preserving the
test as manual/local/dev-only, non-checker, non-Aggregator, no-Target-real,
no-renderer, no-writer, no-persistence, no-GitHub, and no-productive-skill.

## 3. Future Hardening Objective

The future implementation should make the manual composer test harder to
accidentally weaken by proving that:

- happy path behavior remains accepted;
- result shape remains complete;
- every accepted and blocked result stays in-memory-only, dry-run-only, and
  still-no-write;
- no-read/no-write evidence is exact on happy and blocked paths;
- non-authorization summary is exact on happy and blocked paths;
- forbidden request signals block even when disguised by nesting, casing, or
  separator variation;
- accepted results contain no forbidden output fields at any depth;
- unknown contract gaps return
  `CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`;
- the test remains outside the Aggregator and does not create checker pressure.

## 4. Future Hardening Non-goals

The future hardening must not:

- create a checker;
- create a tenth official check;
- add the composer test to the Aggregator;
- alter the Aggregator;
- alter contracts;
- alter fixtures;
- alter templates;
- alter README, MANIFEST, or STATIC_CHECKS documents;
- create a runtime materializer;
- create a renderer;
- create a writer;
- create a loader or scenario selector;
- create a Target Adapter real;
- create a Write Approval real;
- emit approval token, approval signature, registry entry, signer, or approval
  registry;
- read, stat, list, create, or write files against a real Target;
- persist stdout, reports, logs, cache, snapshots, golden files, temp outputs,
  generated outputs, or materialized outputs;
- perform GitHub writes, commits, branches, pull requests, or merges;
- apply patches or diffs to a target surface;
- touch `skills/stnl_project_agent_specializer/`;
- use `reference/agents/` as a final source.

## 5. Future File Allowed For Alteration

A later separately authorized implementation may alter only:

- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

Only if strictly necessary to expose testable behavior or correct an objective
gap, the future phase may propose a minimal adjustment in:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`

That exception must remain narrow, justified by a concrete testability or
boundary gap, and must not add runtime, CLI, persistence, Target, renderer,
writer, checker, Aggregator, contract, fixture, template, GitHub, or
productive-skill behavior.

## 6. Files Prohibited

This plan and the future hardening must not change:

- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `reference/materialization_lab/contracts/*.md`
- `reference/materialization_lab/fixtures/**`
- `reference/templates/**`
- `reference/MANIFEST.md`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `skills/stnl_project_agent_specializer/**`

The future hardening must not create:

- `scripts/materialization_lab/check-dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/check-in-memory-composer.mjs`
- `scripts/materialization_lab/check-materialization-composer.mjs`

## 7. Coverage Categories To Harden

Future coverage should include at minimum:

- happy path remains accepted;
- complete top-level result shape;
- exact no-read/no-write evidence on happy path;
- exact no-read/no-write evidence on blocked paths;
- exact non-authorization summary on happy path;
- exact non-authorization summary on blocked paths;
- valid source refs;
- missing, empty, unknown, out-of-root, historical, and inferred source refs;
- `reference/agents/` in `source_refs` and nested anywhere;
- productive skill refs in `source_refs` and nested anywhere;
- `base_agent_source`;
- `kernel_module_refs` outside `reference/kernel_lab/`;
- `senior_profile_refs` outside `reference/seniorization_lab/`;
- missing, empty, incomplete, or unknown `contract_refs`;
- missing, empty, out-of-root, inferred, nearby, productive, or
  `reference/agents/` template refs;
- renderer payload, rendered content, renderer output, and apply-template
  signals;
- writer payload, writer output, patch payload, diff payload, and write
  execution signals;
- Target real path, host absolute path, traversal path, file URL, HTTP/HTTPS
  URL, filesystem read/write/stat/list, target file content read, directory
  creation, and file creation;
- GitHub write target, GitHub result, pull request URL, commit hash, and branch
  name;
- approval token, signature, registry, registry entry, signer, and positive
  approval semantics;
- persistent report path, stdout capture path, log/cache/snapshot/golden/temp
  output path;
- generated output, materialized output, runtime command payload, CLI payload,
  Target Adapter real payload, Write Approval real payload, executed operation
  tokens, unknown contract gap signals, forbidden output field recursion, and
  Aggregator isolation.

## 8. Table-driven Strategy

The future test should use table-driven negative cases where repeated boundary
assertions would otherwise obscure intent. Each table row should be an
in-memory case with fields similar to:

```txt
case_name
override_payload
expected_block_code
expected_blocked_status
expected_no_read_no_write_evidence
expected_non_authorization
```

Recommended helper boundaries:

- `assertPassingResult(result, case_name)`
- `assertBlockedResult(result, expected_block_code, case_name)`
- `assertExactNoReadNoWriteEvidence(result, case_name)`
- `assertExactNonAuthorizationSummary(result, case_name)`
- `assertNoForbiddenOutputFields(result, case_name)`

The table should avoid excessive duplication, but it must not collapse distinct
boundary categories so far that source, template, approval, Target, renderer,
writer, persistence, GitHub, and contract-gap failures become hard to audit.

## 9. Semantic Aliasing Of Forbidden Signals

Future cases must prove that forbidden signals block under semantic aliases,
including:

- field names;
- path segments;
- nested object paths;
- textual values;
- aliases embedded in otherwise ordinary strings.

Coverage should include aliases for:

- approval positive semantics;
- GitHub write;
- Target real;
- filesystem read/write/stat/list;
- renderer;
- writer;
- persistent report;
- generated output;
- materialized output;
- `reference/agents/`;
- productive skill;
- template inference.

Aliases must be inert test payloads only. They must not become imports, API
calls, command execution, filesystem access, stdout capture, or persisted
artifacts.

## 10. Casing And Separator Normalization

Future hardening should cover equivalent forbidden terms written as:

- `snake_case`;
- `kebab-case`;
- `camelCase`;
- `PascalCase`;
- space-separated text;
- upper-case;
- lower-case;
- mixed-case;
- path-like nested aliases;
- textual value aliases.

The goal is to verify the composer blocks the semantic signal, not merely one
literal spelling.

## 11. Positive Approval Semantics

Future tests must cover positive approval terms such as:

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

Every case must remain blocked or non-authorizing:

- blocked when submitted as a positive write approval signal;
- still-no-write in all outcomes;
- no approval token;
- no approval signature;
- no approval registry;
- no signer;
- no write authorization;
- no conceptual eligibility that authorizes writing.

The accepted happy path may remain conceptually approval-eligible only as a
non-authorizing state.

## 12. Forbidden Output Field Recursion

Future tests must recursively scan accepted results and fail if any forbidden
output field appears at any depth. The forbidden set should include:

- `materialized_file`
- `generated_file`
- `renderer_output`
- `writer_output`
- `target_absolute_path`
- `target_real_path`
- `host_absolute_path`
- `persistent_report_path`
- `approval_token`
- `approval_signature`
- `approval_registry_entry`
- `write_execution_id`
- `materializer_execution_id`
- `commit_hash`
- `branch_name`
- `pull_request_url`
- `github_write_result`

If a request contains these signals, the result must block with the appropriate
boundary code. If an accepted result contains any equivalent field, the test
must fail.

## 13. Contract Gap Handling

Future negative cases must cover:

- `unmapped_contract_gap`
- `unknown_boundary_gap`
- `unknown_boundary_surface`
- `requires_new_contract`
- `new_contract_required`
- `contract_update_needed`
- `contract_update_needs_separate_decision`

Each case must return:

```txt
CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION
```

The future implementation must not alter contracts, add contracts, add block
codes, or silently map unknown gaps in the same phase.

## 14. Source Boundary Edge Cases

Future hardening should cover:

- valid source refs under the currently allowed documentary roots;
- missing `source_refs`;
- empty `source_refs`;
- non-array `source_refs`;
- refs outside allowed roots;
- `reference/agents/` in `source_refs`;
- `reference/agents/` nested in any field;
- productive skill refs in `source_refs`;
- productive skill refs nested in any field;
- historical snapshots as final source;
- nearby file or inferred source signals;
- `base_agent_source`;
- `kernel_module_refs` outside `reference/kernel_lab/`;
- `senior_profile_refs` outside `reference/seniorization_lab/`.

Expected outcomes:

- invalid source model cases block with `BLOCKED_SOURCE_MODEL_INVALID` or a
  more specific existing block code;
- `reference/agents/` final dependency blocks with
  `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`;
- productive skill refs block with `BLOCKED_PRODUCTIVE_SKILL_MUTATION`;
- path or URL hazards block with `BLOCKED_PATH_UNSAFE` or the existing
  equivalent code.

## 15. Template Explicitness Edge Cases

Future hardening should cover:

- valid explicit templates from the current allowlist;
- missing `template_refs`;
- empty `template_refs`;
- non-array `template_refs`;
- template outside `reference/templates/`;
- template in `reference/agents/`;
- template in the productive skill;
- template inference by path;
- template inference by `target_agent`;
- implicit fallback;
- nearby template source.

Expected outcomes:

- absent, empty, malformed, unknown, or out-of-allowlist template refs block
  with `BLOCKED_TEMPLATE_MISSING`;
- inferred template signals block with `BLOCKED_TEMPLATE_INFERRED`;
- `reference/agents/` template sources block with
  `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`;
- productive skill template sources block with
  `BLOCKED_PRODUCTIVE_SKILL_MUTATION`.

The future test must not read templates from disk or infer template
availability from the filesystem.

## 16. Planned Operation Vocabulary

Future positive cases should preserve only planned operations:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

Future negative cases should block:

- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`
- any `*_EXECUTED` token;
- invalid real-write tokens such as `CREATE_REAL`, `WRITE_REAL`, or
  `DELETE_REAL`;
- missing or malformed operation values.

Expected outcomes:

- executed operation tokens block with `BLOCKED_EXECUTED_OPERATION_FORBIDDEN`;
- invalid non-planned tokens block with `BLOCKED_PLANNED_OPERATION_INVALID`;
- accepted results contain no executed operation tokens.

## 17. Render Context Without Renderer

Future hardening should assert render-context composition remains conceptual
only:

- render context refs may be conceptual;
- renderer payloads block;
- rendered content blocks;
- renderer output blocks;
- rendering execution blocks;
- applying templates to a real Target blocks.

The future test must not create a renderer, invoke rendering, persist rendered
content, or apply a template to a target path.

## 18. Target/output Without Real Target

Future hardening should assert target/output planning remains conceptual:

- target output refs are conceptual only;
- planned paths are target-root-relative conceptual strings only;
- real Target paths block;
- host absolute paths block;
- traversal paths block;
- file URLs block;
- HTTP/HTTPS URLs block;
- target file content read blocks;
- filesystem read/write/stat/list blocks;
- directory and file creation signals block;
- GitHub write surfaces block;
- generated and materialized output paths block.

The future test may use path-like strings only as inert input values. It must
not resolve, stat, read, list, create, or write any path.

## 19. No-read/no-write Evidence In Blocked Paths

Future hardening must assert exact evidence on every blocked result:

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

This exact evidence must also remain asserted on happy path results.

## 20. Non-authorization Summary In Blocked Paths

Future hardening must assert the non-authorization summary on every blocked
result and happy path result. The summary must keep every authorization and
created-capability flag false, including:

- materialization authorization;
- Target read/write authorization;
- filesystem access to target authorization;
- GitHub write authorization;
- productive skill mutation authorization;
- writer creation;
- renderer creation;
- loader creation;
- scenario selector creation;
- target adapter creation;
- Write Approval creation;
- approval token, registry, signature, and signer creation;
- persistent report authorization;
- generated and materialized content authorization;
- patch/diff application authorization;
- commit, branch, and pull request authorization;
- approval state authorizing write;
- conceptual eligibility authorizing write.

The summary must continue to list the blocked capabilities as
non-authorized, not merely omit them.

## 21. Aggregator Isolation

Future hardening must confirm that:

- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs` is not
  called by `scripts/materialization_lab/check-validation-harness-aggregator.mjs`;
- the Aggregator child allowlist remains exactly the current 9 official
  read-only checks;
- no composer checker file exists;
- the composer test remains manual/local/dev-only;
- the composer test is not an official checker;
- the composer test is not a tenth Aggregator check.

The future implementation must not create:

- `scripts/materialization_lab/check-dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/check-in-memory-composer.mjs`
- `scripts/materialization_lab/check-materialization-composer.mjs`

## 22. Forbidden Imports And APIs In The Future Test

The future test may use:

- `node:assert/strict`

The future test must not import or call:

- `fs`
- `fs/promises`
- `child_process`
- `process.argv`
- `fetch`
- `http`
- `https`
- Octokit
- any GitHub client
- snapshot writers
- golden file writers
- stdout capture
- report file writers
- cache writers
- temp output writers

Textual mentions of forbidden signals are allowed only as inert test payloads.

## 23. Anti-snapshot, Golden, And Temp Output Strategy

Future hardening must keep every assertion in-memory:

- no snapshots;
- no golden files;
- no generated fixtures;
- no temp files;
- no log files;
- no cache directories;
- no persistent JSON or Markdown reports;
- no stdout capture to file;
- no materialized output;
- no rendered output persistence.

When broad result assertions are needed, the future test should use explicit
property assertions and recursive in-memory scans rather than persisted
expected-output artifacts.

## 24. Relationship With Composer

The composer remains the implementation under test. Future hardening should
exercise its existing pure functions through in-memory request objects and
in-memory result objects.

The composer must remain:

- manual/local/dev-only;
- pure-function oriented;
- in-memory-only;
- dry-run-only;
- still-no-write;
- no Target real;
- no filesystem read/write/stat/list against Target;
- no GitHub write;
- no persistent report;
- no approval token;
- no Write Approval real;
- no writer;
- no renderer;
- no checker;
- outside the Aggregator;
- outside the productive skill.

## 25. Relationship With Scripts

Future implementation may only strengthen the manual test file and, only if
strictly necessary, minimally adjust the composer module. It must not:

- alter checkers;
- create a new checker;
- alter the Aggregator;
- add CLI behavior;
- capture stdout to file;
- persist reports, logs, cache, snapshots, golden files, or temp outputs;
- create runtime, renderer, writer, loader, Target Adapter, or Write Approval
  scripts.

Future implementation checks should run:

```txt
node --check scripts/materialization_lab/dev-only-in-memory-composer.mjs
node --check scripts/materialization_lab/dev-only-in-memory-composer.test.mjs
node scripts/materialization_lab/dev-only-in-memory-composer.test.mjs
node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs
node scripts/materialization_lab/check-validation-harness-aggregator.mjs
node scripts/materialization_lab/check-static.mjs
git diff --check
```

These commands must not capture stdout in a file, generate reports, or create
logs.

## 26. Relationship With Contracts

Contracts remain read-only inputs and preserved boundaries. Future hardening
must not:

- add a contract;
- alter a contract;
- reinterpret unknown gaps as automatically handled;
- add new official checker semantics through a contract change;
- weaken no-write, no-target-real, no-GitHub, no-approval-token, no-renderer,
  no-writer, or no-Aggregator boundaries.

Unknown contract or boundary signals must block with
`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION` and require a separate future
decision.

## 27. Relationship With Fixtures

Fixtures remain out of scope for this hardening. Future test payloads must be
local in-memory objects, not fixture-generated inputs.

The future hardening must not:

- create fixtures;
- alter fixtures;
- create snapshots;
- update expected outputs;
- promote fixture paths into real Targets;
- read fixture contents as runtime source.

## 28. Relationship With Templates

Templates remain explicit documentary refs only. Future hardening should assert
the explicit template allowlist behavior, but must not:

- create templates;
- alter templates;
- infer templates from target agent, output path, nearby files, productive
  skill files, or `reference/agents/`;
- read template contents from disk as part of the test.

## 29. Relationship With Aggregator

The Aggregator remains the separately authorized read-only gate over exactly 9
official checks. Future hardening must preserve:

- no composer test in the Aggregator;
- no composer checker;
- no tenth check;
- no Aggregator edits;
- no Aggregator report generation;
- no Aggregator use as a runtime runner.

Any desire to include composer hardening in an official gate must be recorded
as a separate future decision, not implemented in the hardening phase.

## 30. Relationship With Productive Skill

The productive skill remains fully out of scope:

- no reading from `skills/stnl_project_agent_specializer/` as final source;
- no writing to `skills/stnl_project_agent_specializer/`;
- no template inference from the productive skill;
- no mutation signal accepted against the productive skill;
- no generated or materialized output in the productive skill.

Productive skill refs in input payloads must block as inert negative test
values.

## 31. Future Implementation Acceptance Criteria

The future hardening implementation is acceptable only if:

- it changes only `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`,
  except for a narrowly justified minimal composer adjustment if objectively
  required;
- it remains manual/local/dev-only;
- it remains outside the Aggregator;
- it creates no checker and no tenth official check;
- it adds table-driven negative coverage for the categories in this plan;
- it asserts happy path result shape;
- it asserts exact no-read/no-write evidence for pass and blocked results;
- it asserts exact non-authorization summary for pass and blocked results;
- it asserts positive approval semantics are blocking or non-authorizing;
- it asserts forbidden output field recursion;
- it asserts contract gaps return
  `CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`;
- it uses no forbidden imports or APIs;
- it creates no snapshots, golden files, reports, logs, cache, temp outputs,
  generated outputs, materialized outputs, commits, branches, pull requests,
  or patches;
- all expected future checks pass without stdout capture or persisted reports.

## 32. Future Implementation Audit Criteria

A future audit should verify:

- only allowed files changed;
- no productive skill file changed;
- no contract, fixture, template, README, MANIFEST, or STATIC_CHECKS file
  changed;
- no checker file was created;
- no Aggregator child was added;
- Aggregator remains exactly 9 official checks;
- the composer test is still manual/local/dev-only;
- no forbidden imports or APIs were introduced;
- table-driven cases cover required negative categories without losing
  boundary clarity;
- no-read/no-write evidence is exact on pass and blocked paths;
- non-authorization summary is exact on pass and blocked paths;
- forbidden output recursion is checked;
- semantic aliasing and normalization are covered;
- contract gaps require a separate decision;
- all requested future checks pass;
- no persistent output, temp output, report, cache, snapshot, golden file, log,
  branch, commit, PR, GitHub write, target write, renderer, writer, Target
  Adapter, Write Approval, approval token, registry, signer, or materialized
  output was introduced.

## 33. Residual Risks

Residual risks:

- broad table-driven cases may become hard to audit if helper abstraction hides
  boundaries;
- positive approval phrases may be mistaken for permission unless asserted
  repeatedly as non-authorizing;
- target-root-relative conceptual paths may be confused with real Target paths;
- recursive forbidden-field scanning may miss value aliases unless key and
  value checks remain explicit;
- future pressure may try to promote the manual test into a checker or
  Aggregator child;
- contract gap handling may be overfit to current string spellings unless
  normalization is covered.

These risks are controlled by keeping future hardening manual/local/dev-only,
in-memory-only, dry-run-only, still-no-write, table-driven, explicit, and
outside the Aggregator.

## 34. Recommended Next Phase

Recommended next phase:

```txt
MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN_AUDIT
```

Required mode:

```txt
read-only
audit-only
no-write
no-fix
no-patch
no-implementation
```

The audit should inspect only whether this plan is complete, scoped, and
consistent with the manual/local/dev-only, pure-function, in-memory-only,
dry-run-only, still-no-write, no-Target-real, no-filesystem-target-access,
no-GitHub-write, no-persistent-report, no-rendered-output-persistence,
no-approval-token, no-Write-Approval-real, no-writer, no-renderer, no-checker,
no-Aggregator-expansion, and no-productive-skill boundaries.
