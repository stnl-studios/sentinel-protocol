# Dev-only In-memory Composer Implementation Plan

Status: documentary/dev-only/implementation-plan-only artifact.

This document defines how a later phase may implement the
`DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER` capability inside
`stnl_project_agent_specializer_dev`. It does not implement the composer, create
a script, create a test, create a checker, alter contracts, alter templates,
alter fixtures, alter the Aggregator, create a runtime materializer, create a
renderer, create a writer, access a real Target, write GitHub, or touch
`skills/stnl_project_agent_specializer/`.

## 1. Verdict

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_PLAN: READY`

This phase is complete as an implementation-plan-only, documentation-only,
read-mostly phase. The only created artifact is this plan.

## 2. Executive Summary

The future composer should be implemented as a minimal pure in-memory module
that accepts only conceptual/documentary refs and returns one coherent
`planned_agent_materialization_model`.

The implementation must remain manual/local, dev-only, in-memory-only,
dry-run-only, and still-no-write. It must compose the already approved
materialization-lab concepts: final source chain refs, explicit template refs,
render context refs, conceptual target/output refs, dry-run boundary evidence,
no-read/no-write evidence, and non-authorization summary.

The future composer is not a renderer, writer, runtime materializer, Target
Adapter, Write Approval implementation, approval-token issuer, checker,
Aggregator child, CLI contract, persistent report generator, fixture creator,
or productive-skill migration path.

## 3. Future Implementation Objective

The future implementation objective is to create a narrow manual/local module
that can answer this question:

```text
Given a conceptual agent materialization request, which final sources,
explicit templates, render-context refs, and target/output-plan refs compose a
safe in-memory planned agent materialization model, while preserving no Target
real access and no write authorization?
```

The useful output is the in-memory
`planned_agent_materialization_model`, together with boundary result,
blocking summary, no-read/no-write evidence, and non-authorization summary.

The future implementation should move one step beyond the current
dry-run-only materializer prototype by making the composition center explicit,
without creating rendering execution, write execution, report persistence, or
runtime behavior.

## 4. Future Implementation Non-goals

The future implementation must not:

- implement real materialization;
- create or execute a renderer;
- create or execute a writer;
- create or execute a runtime materializer;
- create a loader, scenario selector, Target Adapter, or real Write Approval;
- issue approval tokens, signatures, registry entries, or persistent approval
  state;
- read a real Target;
- stat, list, or read target filesystem content;
- write files, directories, patches, diffs, reports, logs, caches, snapshots,
  temp outputs, generated outputs, or materialized outputs;
- create a CLI contract or use `process.argv`;
- use stdout as the result contract;
- write GitHub, create a branch, create a commit, open a pull request, or
  publish anything;
- touch `skills/stnl_project_agent_specializer/`;
- use `reference/agents/` as final source;
- infer templates;
- alter contracts, templates, fixtures, scripts, checks, or the Aggregator.

## 5. Candidate Files For Future Implementation

A later separately authorized implementation phase may consider at most these
files:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

These files are not created in this phase.

If created later, both files must remain:

- manual/local/dev-only;
- in-memory-only;
- dry-run-only;
- still-no-write;
- outside the Aggregator;
- outside official checks;
- not checker files;
- not runtime commands;
- not productive materialization commands;
- not persistent report generators.

The future implementation file may export pure functions only. The future test
file may exercise the pure functions only and must not become an Aggregator
child.

## 6. Explicitly Prohibited Files

This phase and the immediate future composer implementation must not create or
alter:

- `scripts/materialization_lab/check-dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/check-in-memory-composer.mjs`
- `scripts/materialization_lab/check-materialization-composer.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `reference/materialization_lab/contracts/*.md`
- `reference/materialization_lab/fixtures/**`
- `reference/templates/**`
- `skills/stnl_project_agent_specializer/**`

The future implementation must also prohibit any persisted file related to:

- reports;
- logs;
- stdout captures;
- cache;
- snapshots;
- temp outputs;
- generated outputs;
- materialized outputs.

Any desire for a checker, contract update, fixture update, template update, or
Aggregator update requires a separate decision before implementation.

## 7. Current Prototype Reuse Strategy

The future composer should reuse the current dry-run-only materializer
prototype only as a safe model boundary reference, not as runtime behavior.

Reusable concepts from
`scripts/materialization_lab/dry-run-only-materializer-prototype.mjs` and
`scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
include:

- allowed planned operation vocabulary;
- forbidden executed operation vocabulary;
- final source root allowlist;
- explicit template ref allowlist;
- materialization contract refs;
- request boundary validation pattern;
- no-read/no-write evidence shape;
- non-authorization summary shape;
- blocking summary shape;
- dry-run boundary result shape;
- still-no-write approval result shape.

The future composer should not reuse the prototype as a CLI, runner,
Aggregator child, Target reader, renderer, writer, persistent report generator,
or productive materializer.

## 8. Minimal Proposed Composer Structure

The future implementation should be a pure ESM module that exports candidate
functions conceptually equivalent to:

```text
composeDevOnlyInMemoryMaterialization(request)
validateComposerRequestBoundary(request)
composeSourceChain(request)
composeTemplateRefs(request)
composeRenderContext(request)
composeTargetOutputPlan(request)
buildPlannedAgentMaterializationModel(parts)
buildNoReadNoWriteEvidence()
buildNonAuthorizationSummary()
```

These names are candidates only and are not a mandatory final API.

The module must not import or use:

- `fs`
- `fs/promises`
- `child_process`
- `http`
- `https`
- `fetch`
- Octokit
- any GitHub client
- write-capable runtime helpers

The module must not use `process.argv`, must not parse CLI arguments, and must
not treat stdout as the result contract. It should return plain in-memory
objects to the caller.

## 9. Future Input Model

The future composer may accept only conceptual/documentary refs such as:

- `request_identity`
- `target_agent_id`
- `target_kind`
- `source_refs`
- `kernel_module_refs`
- `senior_profile_refs`
- `template_refs`
- `render_context_plan_ref`
- `target_output_plan_ref`
- `dry_run_boundary_ref`
- `write_approval_boundary_ref`
- `contract_refs`

Allowed refs must remain inside the dev skill's documentary model and must be
interpreted as references, not as runtime paths to read during composition.

The future composer must block any input containing:

- `target_real_path`
- `host_absolute_path`
- `filesystem_read_target`
- `filesystem_write_target`
- `filesystem_stat_request`
- `directory_listing_request`
- `file_content_read_request`
- `github_write_target`
- `approval_token`
- `approval_signature`
- `approval_registry`
- `persisted_report_path`
- `generated_output_real_path`
- `runtime_command_payload`
- `cli_execution_payload`
- `renderer_payload`
- `writer_payload`
- `target_adapter_payload`
- `write_approval_real_payload`
- `productive_skill_path`
- `reference_agents_final_source`
- `inferred_template_request`

Semantic equivalents must also block even when renamed.

## 10. Future Output Model

The future composer may return only an in-memory result shaped by sections
equivalent to:

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

The `planned_agent_materialization_model` should identify the composed
conceptual request, canonical target, target agent, final source refs,
explicit template refs, render-context plan refs, conceptual output plan refs,
dry-run boundary refs, and non-authorization evidence.

The future composer must block output containing:

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
- `CREATE_EXECUTED`
- `UPDATE_EXECUTED`
- `DELETE_EXECUTED`
- `WRITE_EXECUTED`
- commit hash
- branch name
- pull request URL
- GitHub write result

The result must not be a persisted file, mandatory JSON schema, CLI stdout
contract, patch, diff, rendered artifact, or write authorization.

## 11. Boundary Validation Model

Boundary validation must run before any composition step. The future composer
should fail closed when the request:

- is not an in-memory conceptual object;
- omits required conceptual identity or boundary refs;
- declares a real Target path or host absolute path;
- requests filesystem stat, directory listing, file content read, or write;
- requests GitHub write;
- includes runtime, CLI, renderer, writer, Target Adapter, or real Write
  Approval payloads;
- includes approval token, signature, registry, signer, or persisted approval
  state;
- includes persistent report, generated output, materialized output, patch, or
  diff fields;
- uses `reference/agents/` as final source;
- references `skills/stnl_project_agent_specializer/`;
- requests inferred template behavior;
- contains executed operation tokens.

Boundary validation should use existing block code categories from the current
contracts and prototype. If no existing block code cleanly applies, the future
implementation must return `CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION` and stop
without adding codes, contracts, scripts, or checkers in the same phase.

## 12. Source Chain Composition Model

The future composer may compose only final source refs from:

- `reference/kernel_lab/`
- `reference/seniorization_lab/`
- `reference/templates/`
- `reference/materialization_lab/contracts/`

The source chain should remain conceptually:

```text
kernel_source
+ senior_profile_source
+ template_source
+ materialization_contract_sources
```

The composer may organize source refs into
`source_chain_composition`, but it must not:

- read source files at runtime;
- invent kernel modules;
- infer Senior Agent Profiles;
- use deprecated `base_agent_source`;
- require `reference/agents/` as final source;
- use historical snapshots as final sources;
- infer sources from output paths, nearby files, or productive skill files.

## 13. Template Ref Composition Model

Templates must be explicit.

The future composer may accept only explicit template refs already registered
under `reference/templates/`, currently:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/config.toml`
- `reference/templates/codex/AGENTS.md`

The composer may attach explicit template refs to
`template_ref_composition`. It must block:

- template inference;
- implicit template fallback;
- template selection by output path;
- template selection by target-agent naming;
- template selection by legacy agent names;
- template selection from `reference/agents/`;
- template selection from the productive skill;
- template selection from nearby files;
- template creation or template mutation.

Any missing template remains a block, not a reason to infer or create one.

## 14. Render Context Composition Model Without Renderer

The future implementation must preserve this distinction:

```text
render_context_composition != rendering_execution
```

The composer may organize refs and expectations for:

- target agent;
- canonical target;
- kernel source;
- Senior Agent Profile;
- explicit template source;
- target contract;
- template/output contract;
- rendering/composition contract;
- placeholder coverage expectation;
- escaping expectation;
- composition conflict expectation.

The composer must not:

- execute a renderer;
- render final content;
- persist rendered content;
- apply a template to a real Target;
- generate final files;
- write `AGENTS.md`;
- write `.github/**`;
- write `.codex/**`.

If a future implementation cannot keep render-context composition separate
from rendering execution, it must block and require a separate decision.

## 15. Target/output Plan Composition Model Without Real Target

The future composer may model target/output planning only as conceptual,
target-root-relative intent.

Allowed concepts:

- conceptual target kind;
- canonical target id;
- conceptual output role;
- target-root-relative conceptual path;
- planned output entry;
- `CREATE_PLANNED`;
- `UPDATE_PLANNED`;
- `UNCHANGED_PLANNED`;
- `BLOCKED_PLANNED`.

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

The future composer must not calculate drift by reading a target filesystem.
Any existing-state or drift reference must remain simulated/documentary and
must be already authorized by existing contracts or fixtures.

## 16. No-read/no-write Evidence Implementation Model

Every future composer result must include in-memory no-read/no-write evidence
equivalent to:

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

This evidence must be built directly by pure functions and returned in memory.
It must not be written to a report file, stdout capture, log, cache, snapshot,
or temp output.

## 17. Non-authorization Summary Implementation Model

Every future composer result must include a non-authorization summary stating
that the result authorizes none of:

- real materialization;
- real Target read/write;
- filesystem access against a real Target;
- writer creation;
- renderer creation;
- loader creation;
- scenario selector creation;
- real Target Adapter creation;
- real Write Approval creation;
- approval token, approval registry, approval signature, or signer creation;
- persistent report;
- generated output;
- materialized output;
- patch or diff application;
- GitHub write;
- productive skill mutation;
- commit, branch, or pull request.

Even a conceptual approval-eligible state remains still-no-write and must not
authorize execution.

## 18. Blocking Model Without New Automatic Block Codes

The future implementation should reuse existing block code categories owned by
the current contracts and prototype.

Relevant blocking categories include:

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
- approval token signal;
- runtime payload signal;
- generated output signal;
- persistent report signal;
- productive skill mutation signal;
- GitHub write signal;
- checker or Aggregator expansion signal.

No new block code should be created automatically. If the future composer
needs a new block code or a new owning contract, it must return:

`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`

and stop until a separate documentary decision authorizes the contract work.

## 19. Future Test Strategy, Manual/local/dev-only

A later implementation phase may create:

- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

That file is not created in this phase. If created later, it must remain:

- manual/local/dev-only;
- in-memory-only;
- dry-run-only;
- still-no-write;
- not an official checker;
- not an Aggregator child;
- not a tenth check;
- not a stdout capture producer;
- not a snapshot producer;
- not a golden file producer;
- not a temp-output writer.

The future test should validate at least:

- accepted request shape;
- blocked request shape;
- source boundary;
- `reference/agents/` blocked as final source;
- explicit templates;
- template inference blocked;
- render context without renderer;
- conceptual target/output plan;
- Target real blocked;
- write signals blocked;
- approval token blocked;
- runtime payload blocked;
- generated output blocked;
- in-memory output model;
- no-read/no-write evidence;
- non-authorization summary;
- Aggregator unchanged.

The test should run by direct local Node invocation only and must not write
reports, logs, stdout captures, caches, snapshots, temp outputs, generated
outputs, or materialized outputs.

## 20. Relationship With Scripts

No script is created or altered by this phase.

The future implementation may create only the two candidate files listed in
section 5 after a separate implementation phase is authorized. Existing scripts
remain unchanged, including:

- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`
- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`
- `scripts/materialization_lab/check-render-context.mjs`
- `scripts/materialization_lab/check-dry-run-plan.mjs`
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`

The future composer must not become a generic runner, productive CLI, runtime
materializer, report generator, checker, or Aggregator coordinator.

## 21. Relationship With Contracts

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

This implementation plan identifies no contract change required before a
minimal composer implementation. If a future implementation finds an objective
contractual gap, it must record:

`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`

and must not implement the contract update in the composer implementation
phase.

## 22. Relationship With Aggregator

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

The future composer implementation must block:

- tenth check;
- new checker;
- composer checker;
- composer test in the Aggregator;
- Aggregator edits;
- Aggregator use as composer runner;
- Aggregator use as report generator.

## 23. Relationship With Fixtures

No fixture is created or altered by this phase.

The future composer implementation should not require new fixtures for the
minimal pure module. If fixture-backed composer coverage becomes necessary
later, it requires a separate planned and authorized phase.

Fixtures must remain documentary/dev-only and under the authorized fixture
root. They must not become real Targets, generated outputs, rendered outputs,
persistent reports, or materialized files.

## 24. Relationship With Templates

No template is created or altered by this phase.

The future composer must treat templates only as explicit refs under
`reference/templates/`. Template presence does not authorize rendering,
generated output, target write, productive-skill write, or GitHub write.

If the future composer receives a request for a missing template, it must
block. It must not create, infer, backfill, repair, or mutate templates.

## 25. Relationship With Productive Skill

The productive skill remains fully out of scope:

`skills/stnl_project_agent_specializer/`

The future implementation must not inspect, alter, migrate, or plan writes to
the productive skill.

The approved strategy remains:

1. mature the dev skill;
2. test the dev skill for a period;
3. correct discovered gaps;
4. approve behavior manually;
5. only then open a separate productive migration track.

No productive migration and no productive write are planned now.

## 26. Expected Checks In Future Implementation

A future implementation phase should complete only after running at least:

```text
git diff --check
node scripts/materialization_lab/dev-only-in-memory-composer.test.mjs
node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs
node scripts/materialization_lab/check-validation-harness-aggregator.mjs
node scripts/materialization_lab/check-static.mjs
```

The composer test command is listed only for the future implementation phase
where the test file is separately authorized and created. It is not a checker,
not an official Aggregator child, and not a tenth check.

The future implementation checks must not capture stdout to a file, generate
reports, write logs, create caches, create snapshots, create temp outputs, or
persist generated artifacts.

## 27. Future Acceptance Criteria

A future implementation may be accepted only if it proves:

- capability remains dev-only, manual/local, in-memory-only, dry-run-only, and
  still-no-write;
- implementation exports pure functions and returns in-memory objects;
- no forbidden runtime or write-capable imports are used;
- no `process.argv` or CLI contract exists;
- input model accepts only conceptual refs and blocks real Target, filesystem,
  GitHub, approval token, runtime, renderer, writer, Target Adapter, Write
  Approval real, generated output, persistent report, and productive skill
  surfaces;
- output model includes `planned_agent_materialization_model`;
- output model includes no-read/no-write evidence and non-authorization
  summary;
- final sources remain limited to `reference/kernel_lab/`,
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
- no contract, fixture, template, script outside the candidate set, or
  productive skill file is changed.

## 28. Future Audit Criteria

The audit of the future implementation should verify:

- only authorized candidate implementation/test files were created;
- no checker file was created;
- no Aggregator child was added;
- no contract, fixture, template, or productive skill file changed;
- exported functions are pure and in-memory;
- implementation does not import write-capable or network-capable modules;
- implementation does not use `process.argv`;
- accepted input and blocked input behavior match this plan;
- output contains only allowed in-memory sections;
- forbidden output fields and execution tokens are blocked;
- source chain uses final source roots only;
- `reference/agents/` is blocked as final source;
- template refs are explicit;
- render-context composition does not execute rendering;
- target/output plan composition does not access a real Target;
- no-read/no-write evidence is present and false for all real access/write
  attempts;
- non-authorization summary is present;
- any new block-code need is reported as
  `CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`.

## 29. Residual Risks

Residual risks:

- The term "composer" may be misread as permission to render or materialize.
- A pure in-memory module may create pressure for CLI behavior or stdout
  contracts.
- Target-root-relative planned paths may be mistaken for real Target paths.
- Conceptual approval eligibility may be misread as real write approval.
- Future test coverage may create pressure for a checker or Aggregator child.
- Fixture-backed examples may tempt use of `reference/agents/` as final
  source.
- A missing block code may tempt local invention instead of a separate
  contract decision.

These risks are controlled by keeping the next implementation manual/local,
pure, in-memory-only, dry-run-only, still-no-write, and outside the Aggregator.

## 30. Recommended Next Phase

Recommended next phase:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_PLAN_AUDIT`

Required mode:

- read-only;
- audit-only;
- no-write;
- no-fix;
- no-patch;
- no-implementation.

The audit should validate this plan only. It must not implement the composer,
create scripts, create tests, create checkers, alter the Aggregator, alter
contracts, alter templates, alter fixtures, touch the productive skill, or
create any persistent output.
