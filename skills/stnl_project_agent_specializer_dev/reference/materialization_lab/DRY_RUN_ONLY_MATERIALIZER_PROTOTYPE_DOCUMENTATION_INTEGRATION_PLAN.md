# Dry-run-only Materializer Prototype Documentation Integration Plan

This document is a documentary/dev-only/read-only planning artifact for the
safe documentation integration of the audited dry-run-only materializer
prototype implementation.

It does not implement the documentation integration. It does not change
`README.md`, `STATIC_CHECKS.md`, `MANIFEST.md`, contracts, validation docs, or
scripts. It creates no checker, no Aggregator child, no runtime materializer,
no writer, no renderer, no loader, no Target Adapter, no Write Approval
implementation, no persistent report, no Target real access, and no productive
skill mutation.

## 1. Verdict

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_DOCUMENTATION_INTEGRATION_PLAN: READY`

Recommended next phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_DOCUMENTATION_INTEGRATION_PLAN_AUDIT`

The next phase must be read-only.

## 2. Executive Summary

The audited prototype can be integrated into the Materialization Lab
documentation only as a dev-only, fixture-only, model-only, in-memory-only,
dry-run-only, still-no-write prototype implementation reference.

The future documentation integration should clarify that the prototype exists
to exercise the already approved conceptual boundary in a local/manual test
without promoting the prototype into any productive path. It must document the
manual command as local/dev-only:

```txt
node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs
```

That command must not be documented as an Aggregator child, official checker,
runtime runner, materializer command, CLI, write approval gate, or target
materialization path.

The recommended future implementation surface is limited to:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/MANIFEST.md`

Contracts should not be changed unless a separate future decision identifies a
small objective contractual gap. No such gap is required by this plan.

## 3. Documentation Context

The existing Materialization Lab documentation already records:

- a documentary/dev-only/read-only contract layer;
- the Dry-run Report Model as conceptual and non-persistent;
- the Materializer Interface as conceptual and dry-run-only;
- the Target Adapter as conceptual and not a real adapter;
- the Write Approval Protocol as conceptual and still-no-write;
- the Validation Harness Aggregator as a fixed 9-check dev-only/read-only
  gate;
- the dry-run-only materializer prototype contract as a conceptual boundary;
- the implementation boundary for separately authorized dev-only/read-only
  scripts.

The missing integration is not contractual. The gap is documentary: future
agents need a short, precise explanation of the audited prototype
implementation and test so they do not promote it into runtime, checker,
Aggregator, approval, writer, or Target real behavior.

## 4. Current Audited Prototype Baseline

The documentation integration must preserve this current baseline:

- dev-only;
- fixture-only;
- model-only;
- in-memory-only;
- dry-run-only;
- still-no-write;
- no Target real access;
- no persistence;
- no GitHub write;
- no productive-skill mutation;
- not a checker;
- not an Aggregator child;
- not a runtime materializer;
- not a writer;
- not a renderer;
- not a loader;
- not a real Target Adapter;
- not a real Write Approval implementation.

The audited hardening baseline to mention by category is:

- request shape hardening;
- source roots hardening;
- contract refs hardening;
- template refs hardening;
- path safety hardening;
- planned operations hardening;
- approval positive semantics hardening;
- output shape assertions;
- no-read/no-write evidence assertions;
- non-authorization summary assertions.

The future documentation may mention the normalized approval-positive examples:

- `ready to write` blocks as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`;
- `write unlocked` blocks as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`;
- `approval granted` blocks as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`;
- invalid non-positive `approval_policy` values remain
  `BLOCKED_APPROVAL_POLICY_INVALID`.

## 5. Preserved Boundaries

The future documentation integration must preserve every existing contract:

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

The future documentation must not relax, replace, reinterpret, or bypass any
contract to allow runtime behavior, Target real access, persistence, GitHub
write, productive-skill mutation, real materialization, writer behavior,
renderer behavior, loader behavior, scenario selector behavior, real Target
Adapter behavior, real Write Approval behavior, approval token behavior,
approval registry behavior, signer behavior, commit, branch, pull request, or
Aggregator expansion.

## 6. Non-goals

This plan does not authorize:

- implementing the documentation integration in this phase;
- changing README, MANIFEST, contracts, validation docs, or scripts in this
  phase;
- creating a prototype checker;
- creating `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`;
- adding a tenth Aggregator check;
- integrating the prototype test into the Aggregator;
- changing `scripts/materialization_lab/check-validation-harness-aggregator.mjs`;
- changing any prototype source or test script;
- changing `skills/stnl_project_agent_specializer/`;
- reading or writing a real Target;
- persisting stdout, Markdown, JSON, cache, temp output, snapshot, report, or
  generated artifact;
- creating a branch, commit, pull request, merge, approval token, signer, or
  approval registry.

## 7. Documentation Integration Goals

The future integration should:

- document what the audited prototype implementation is;
- document why it exists;
- document the manual/local test command;
- document that the test stays outside the Aggregator;
- document that the prototype is not a checker;
- document that the prototype is not runtime;
- document still-no-write and no Target real access;
- document approval positive semantics as blocked;
- document no-read/no-write evidence as conceptual in-memory evidence;
- document the non-authorization summary as conceptual in-memory evidence;
- avoid duplicating contract text;
- avoid turning the README into a runtime manual;
- leave all official checker and Aggregator boundaries unchanged.

## 8. Candidate Documents

Candidate future updates:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/MANIFEST.md`

Optional future mention, only if the implementation phase finds a clear
existing pattern and a narrow need:

- `reference/materialization_lab/validation/README.md`

Contract documents are not candidates for this integration unless a separate
future decision declares:

`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`

## 9. README Integration Plan

Future allowed content in `reference/materialization_lab/README.md`:

- a short subsection near the existing dry-run-only prototype boundary;
- one or two paragraphs explaining the audited prototype implementation as a
  local/dev-only embodiment of the conceptual boundary;
- the manual command:

```txt
node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs
```

- a compact boundary list stating dev-only, fixture-only, model-only,
  in-memory-only, dry-run-only, still-no-write, no Target real access, no
  persistence, no GitHub write, and no productive-skill mutation;
- a compact negative list stating not runtime, not checker, not Aggregator
  child, not writer, not renderer, not loader, not Target Adapter, and not
  Write Approval implementation;
- a short sentence that approval-positive language is blocked and does not
  authorize writing;
- a short sentence that no-read/no-write evidence and non-authorization summary
  are conceptual in-memory evidence only.

Future prohibited content in `reference/materialization_lab/README.md`:

- runtime usage instructions;
- target path arguments;
- Target real read/write examples;
- materialization examples;
- persistent report examples;
- approval token or approval registry examples;
- GitHub write or commit examples;
- wording that makes the manual test an official checker;
- wording that makes the manual test an Aggregator child;
- long duplication of contract sections or every hardening test case.

## 10. STATIC_CHECKS Integration Plan

Future allowed content in
`reference/materialization_lab/validation/STATIC_CHECKS.md`:

- a short note in the Aggregator/static-check area clarifying that the audited
  prototype test is local/manual/dev-only;
- a statement that the official Aggregator remains exactly the current 9
  read-only checks;
- a statement that there is no
  `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`;
- a statement that the prototype test is not a tenth check;
- a statement that the prototype test must not be added to the Aggregator in
  this documentation integration track.

Future prohibited content in
`reference/materialization_lab/validation/STATIC_CHECKS.md`:

- adding the prototype test to the official child-check list;
- adding a tenth expected verdict;
- adding a new checker file;
- describing the prototype test as a static check;
- requiring the Aggregator to execute the prototype test;
- describing the Aggregator as a prototype runner, materializer runner, report
  generator, approval validator, or runtime gate.

## 11. MANIFEST Integration Plan

Future allowed content in `reference/MANIFEST.md` if the current manifest
pattern supports it:

- a short entry for the audited prototype implementation script as dev-only,
  fixture-only, model-only, in-memory-only, and dry-run-only;
- a short entry for the manual test script as local/dev-only and outside the
  official Aggregator;
- a short entry for this planning artifact and any later audited
  documentation integration artifact, if the manifest pattern accepts phase
  planning documents;
- explicit wording that these are reference/dev-only artifacts and not runtime
  materialization paths.

Future prohibited content in `reference/MANIFEST.md`:

- registering the prototype as active runtime;
- registering the prototype as an official checker;
- registering the prototype as an Aggregator child;
- registering any new checker path;
- registering any target output, generated artifact, or persistent report;
- implying the productive skill is changed or authorized.

If the future implementer cannot identify a clear manifest pattern for this
kind of entry, the future implementation should not update `MANIFEST.md` and
should request a separate decision instead of inventing a template.

## 12. Contract Documents Policy

Default recommendation:

- do not alter contracts for this documentation integration;
- do not duplicate contract text in README;
- do not use README text to rewrite a contract;
- do not relax any contract;
- do not create a new contract;
- link or refer to existing contracts instead.

The current need is documentary integration of the audited prototype
implementation and test, not a contract change.

Only a separately decided future phase may alter a contract. That phase must
identify a small objective gap, the owning contract, the exact boundary impact,
and the reason existing contracts are insufficient.

## 13. Prototype Test Documentation Policy

The future documentation must state that the prototype test:

- is direct/local/dev-only;
- uses in-memory assertions;
- does not read a real Target;
- does not write a real Target;
- does not persist output;
- does not create a report;
- is not a checker;
- is not an Aggregator child;
- is not a runner;
- is not a CLI.

The hardening should be documented by categories, not by a long case table:

- request shape;
- source roots;
- contract refs;
- template refs;
- approval semantics;
- path safety;
- planned operations;
- output shape;
- no-read/no-write evidence;
- non-authorization summary.

The manual command may be shown once. It should not be repeated across multiple
documents unless needed for index clarity.

## 14. Aggregator Documentation Policy

The future documentation must preserve that the Validation Harness Aggregator
is fixed at exactly the current 9 official child checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

The future documentation must state explicitly:

- the prototype test is not executed by the Aggregator;
- the prototype test is not the tenth check;
- the Aggregator does not depend on the prototype;
- the prototype does not alter the validation harness aggregator.

No Aggregator integration should be recommended in this track.

## 15. Approval Semantics Documentation Policy

The future documentation should mention approval semantics only as
still-no-write conceptual evidence:

- positive approval language does not authorize writing;
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` is conceptual and still-no-write;
- `ready to write`, `write unlocked`, and `approval granted` block as
  `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`;
- invalid non-positive approval policy values remain
  `BLOCKED_APPROVAL_POLICY_INVALID`;
- there is no approval token;
- there is no approval registry;
- there is no signer;
- there is no real Write Approval implementation.

The future documentation must not describe any real approval release,
write-unlock mechanism, token issuance, registry, signer, or productive write
approval path.

## 16. No-read/no-write Evidence Documentation Policy

The future documentation should mention that the prototype keeps conceptual
in-memory evidence equivalent to:

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
write_executed: false
patch_applied: false
commit_created: false
branch_created: false
pull_request_created: false
```

This evidence must not be documented as a persisted report, runtime audit log,
checker output, Aggregator output, or target evidence gathered from a real
filesystem.

## 17. Non-authorization Summary Documentation Policy

The future documentation should mention that the prototype keeps a conceptual
in-memory non-authorization summary equivalent to:

```txt
materialization_authorized: false
target_read_authorized: false
target_write_authorized: false
github_write_authorized: false
productive_skill_mutation_authorized: false
writer_created: false
renderer_created: false
loader_created: false
target_adapter_created: false
write_approval_created: false
approval_state_authorizes_write: false
approval_conceptually_eligible_authorizes_write: false
```

This summary must not be documented as permission, authorization, operational
status, runtime readiness, checker status, or Aggregator status.

## 18. Anti-bloat Rules

The future integration should prefer:

- short sections;
- contract references instead of contract duplication;
- one compact boundary list;
- one compact non-goal list;
- one manual test command;
- categorized hardening coverage;
- explicit no-runtime/no-checker/no-Aggregator statements.

The future integration should avoid:

- a large README expansion;
- literal duplication of contracts;
- listing every test case;
- long block-code matrices;
- runtime manuals;
- Target real manuals;
- writer or approval implementation documentation;
- persistent report documentation;
- checker documentation without a checker;
- Aggregator expansion documentation.

## 19. Forbidden Documentation Claims

Future documentation must block any claim that:

- the prototype materializes files;
- the prototype writes Target files;
- the prototype reads a real Target;
- the prototype calculates real drift;
- the prototype persists a report;
- the prototype emits an approval token;
- the prototype executes real Write Approval;
- the prototype is an official checker;
- the prototype is the tenth check;
- the prototype runs in the Aggregator;
- the prototype is runtime;
- the prototype is a writer;
- the prototype is a renderer;
- the prototype is a real Target Adapter;
- the prototype can touch `skills/stnl_project_agent_specializer/`;
- `reference/agents/` is a final source;
- templates can be inferred;
- positive approval language can release writing.

## 20. Expected Future File Changes

The future documentation integration phase may update only:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/MANIFEST.md`

Optional only with clear pattern and narrow need:

- `reference/materialization_lab/validation/README.md`

The future phase should not alter scripts.

The future phase should not alter contracts unless a separate decision marks a
small objective gap as `CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`.

## 21. Forbidden Future File Changes

This documentation integration track must not alter:

- `skills/stnl_project_agent_specializer/`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
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

It must not create:

- `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`

## 22. Validation Expectations

After this plan is created, local validation should run only existing safe
checks:

```txt
node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs
node scripts/materialization_lab/check-static.mjs
node scripts/materialization_lab/check-source-inventory.mjs
node scripts/materialization_lab/check-template-coverage.mjs
node scripts/materialization_lab/check-fixture-boundary.mjs
node scripts/materialization_lab/check-lazy-load-fixtures.mjs
node scripts/materialization_lab/check-project-scenarios.mjs
node scripts/materialization_lab/check-render-context.mjs
node scripts/materialization_lab/check-dry-run-plan.mjs
node scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs
node scripts/materialization_lab/check-validation-harness-aggregator.mjs
```

The checks must be run without persisting stdout, reports, caches, snapshots,
temp outputs, or generated artifacts.

The expected passing result is:

- prototype test passes;
- all 9 official checks pass;
- the Aggregator passes;
- no checker is created;
- no Aggregator child is added;
- no script is changed.

## 23. Audit Expectations

The next read-only audit should verify:

- this plan is the only created artifact for this phase;
- no documentation integration was implemented in this phase;
- no README, STATIC_CHECKS, MANIFEST, contract, validation doc, or script was
  changed in this phase;
- the plan preserves dev-only, fixture-only, model-only, in-memory-only,
  dry-run-only, still-no-write, no Target real access, no persistence, no
  GitHub write, and no productive-skill mutation boundaries;
- the plan forbids runtime, checker, Aggregator child, writer, renderer,
  loader, Target Adapter, and Write Approval promotion;
- the plan keeps the official Aggregator at exactly 9 checks;
- the plan recommends only narrow future documentation changes;
- local checks pass.

## 24. Blocking Conditions

Declare:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_DOCUMENTATION_INTEGRATION_PLAN: BLOCKED`

if this or any future implementation of this plan would require:

- implementing documentation integration in this phase;
- changing scripts in this phase;
- changing the Aggregator;
- creating a checker;
- creating a tenth check;
- Target real access;
- writer, renderer, loader, runtime scenario selector, real Target Adapter, or
  real Write Approval behavior;
- approval token, approval registry, or signer;
- persistent report, stdout capture file, cache, snapshot, temp output, or
  generated artifact;
- GitHub write;
- commit, branch, pull request, or merge;
- productive-skill mutation;
- `reference/agents/` as final source;
- inferred templates;
- filesystem write;
- Target filesystem read;
- documenting the prototype as runtime, checker, Aggregator child, or write
  authorization;
- contract alteration without a separate decision;
- inventing a documentation-artifact pattern;
- failing local checks.

## 25. Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_DOCUMENTATION_INTEGRATION_PLAN: EXCELLENT PASS`
may be declared by a later read-only audit only when:

- this plan exists as documentary/dev-only/read-only planning only;
- the plan is path-limited to
  `skills/stnl_project_agent_specializer_dev/`;
- no integration documentation was implemented in this phase;
- no scripts were altered;
- no checker was created;
- no Aggregator change was made;
- no tenth check was created;
- the prototype remains dev-only, fixture-only, model-only, in-memory-only,
  dry-run-only, and still-no-write;
- Target real access remains prohibited;
- writer, renderer, loader, Target Adapter, and Write Approval real behavior
  remain prohibited;
- persistent report, GitHub write, commit, branch, pull request, and
  productive-skill mutation remain prohibited;
- `reference/agents/` remains prohibited as final source;
- templates remain explicit;
- planned-only operations remain preserved;
- approval positive semantics remain blocked;
- the plan defines candidate documents;
- the plan defines allowed and forbidden content per document;
- the plan protects the Aggregator from expansion;
- the plan protects against a new checker;
- the plan avoids documentation bloat;
- the prototype test passes;
- all 9 official checks pass;
- the Aggregator passes;
- the recommended next phase is read-only audit.

## 26. Final Status

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_DOCUMENTATION_INTEGRATION_PLAN: READY`

Recommended next phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_DOCUMENTATION_INTEGRATION_PLAN_AUDIT`

The recommended next phase is read-only and must not implement the
documentation integration.
