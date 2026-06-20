# Dev-only In-memory Composer Next Capability Decision

Status: documentary/dev-only/decision-only artifact.

This document decides the next safe capability after the audited
`DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER` implementation. It does not
implement test hardening, alter the composer, alter tests, create a checker,
alter the Aggregator, alter contracts, alter templates, alter fixtures, create
runtime behavior, create a renderer, create a writer, access a real Target,
persist a report, write GitHub, or touch `skills/stnl_project_agent_specializer/`.

## 1. Verdict

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_NEXT_CAPABILITY_DECISION: READY`

Decision:

`OPTION_A_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING: ACCEPT`

Recommended next phase:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN`

The next phase must remain plan-only, documentation-only, no implementation,
no script change, no checker, no Aggregator change, no Target real, no writer,
no renderer, no persistent report, no output materialization, and no
productive skill work.

## 2. Executive Summary

The safest next movement is to plan test hardening for the manual/local
dev-only in-memory composer before moving closer to fixture-backed scenarios
or broader documentation integration.

The composer already exists as a pure in-memory, dry-run-only, still-no-write
module with a manual/local test. Its current implementation and audit establish
the correct boundary. The next useful risk reduction is not a new capability,
not documentation promotion, and not a fixture-backed scenario. It is a narrow
test-hardening plan that can define additional manual/local coverage for
blocked inputs, forbidden output recursion, semantic aliasing, approval
positive semantics, path normalization, Aggregator isolation, and no-read/no-
write evidence.

This decision does not authorize hardening implementation. It authorizes only
the next documentary plan artifact.

## 3. Created File

Created artifact:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_NEXT_CAPABILITY_DECISION.md`

No other file is authorized by this phase.

## 4. Analyzed Scope

The decision considered only the dev skill materialization lab context and the
allowed read scope:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_PLAN.md`
- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_PLAN.md`
- `reference/materialization_lab/DEV_AGENT_MATERIALIZATION_NEXT_CAPABILITY_DECISION.md`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/MANIFEST.md`
- `reference/materialization_lab/contracts/`
- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

`reference/agents/` was not used as a final source. Existing `.DS_Store`
entries and any `__MACOSX` material remain ignored.

## 5. Current State Considered

The following state is treated as completed and audited:

- dry-run-only materializer prototype implementation: PASS
- dry-run-only materializer prototype implementation audit: EXCELLENT PASS
- dry-run-only materializer prototype test hardening implementation: PASS
- dry-run-only materializer prototype test hardening audit: EXCELLENT PASS
- dry-run-only materializer prototype documentation integration: PASS
- dry-run-only materializer prototype documentation integration audit:
  EXCELLENT PASS
- dev agent materialization next capability decision: READY
- dev-only in-memory composer plan: READY
- dev-only in-memory composer plan audit: EXCELLENT PASS
- dev-only in-memory composer implementation plan: READY
- dev-only in-memory composer implementation plan audit: EXCELLENT PASS
- dev-only in-memory composer implementation: PASS
- dev-only in-memory composer implementation audit: EXCELLENT PASS

The implemented composer exists in:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

The composer remains:

- manual/local/dev-only;
- pure functions only;
- in-memory-only;
- dry-run-only;
- still-no-write;
- outside the Aggregator;
- outside official checks;
- no Target real;
- no filesystem read/write/stat/list against a Target;
- no GitHub write;
- no persistent report;
- no renderer;
- no writer;
- no checker;
- no productive skill.

## 6. Options Evaluated

### Option A - Composer test hardening

Decision: `ACCEPT`

This option plans additional manual/local/dev-only coverage for the existing
composer before bringing it closer to fixture-backed or documentation-
registered usage.

Immediate utility is high because the existing composer has the correct shape
but naturally benefits from broader negative coverage and more systematic
boundary assertions. Boundary safety remains high because the next phase is
only a plan and a later implementation, if separately approved, may touch only
the manual/local test file and, if strictly necessary, minimal composer code.

This option creates no checker, no tenth official check, no Aggregator child,
no fixture, no template, no contract update, no runtime, no renderer, no
writer, no Target Adapter, no real Write Approval, and no productive-skill
coupling.

### Option B - Composer documentation integration

Decision: `DEFER`

This option would document the composer in README, MANIFEST, or static-check
documentation.

It has value because it could record the manual/local command and explicitly
state that the composer is not a checker and is outside the Aggregator.
However, it is premature before hardening coverage is planned. Publicly
integrating the composer now risks documentation bloat and may imply the
capability is more settled than its current test coverage proves.

### Option C - Fixture-backed composer scenario

Decision: `DEFER`

This option would simulate a closer end-to-end agent materialization scenario
through fixtures.

It has later value because it can validate composition behavior with a
controlled fixture. It is not the safest immediate step because it may overfit
to one agent, create fixture-pressure before generic test coverage is hardened,
and increase pressure toward Target real, materializer, renderer, or output
persistence semantics.

### Option D - Pause for manual dev-skill testing

Decision: `DEFER`

Manual observation remains useful, but pausing now leaves obvious hardening
coverage unplanned. The current state is strong enough for a documentary
hardening plan, and that plan is itself a low-risk way to slow the architecture
down before any implementation or fixture-backed step.

## 7. Decision Matrix

| Criterion | Option A Test Hardening | Option B Documentation | Option C Fixture-backed | Option D Pause |
| --- | --- | --- | --- | --- |
| Boundary safety | High | Medium-high | Medium | Highest |
| Immediate utility | High | Medium | Medium | Medium-low |
| Early runtime promotion risk | Low | Medium | Medium-high | None |
| Checker/Aggregator pressure | Low if explicit | Medium | Medium | None |
| Bloat risk | Low-medium | Medium | Medium | Low |
| Overfit risk | Low | Low | High | Low |
| Productive-skill coupling risk | Low | Low | Medium-low | Low |
| Implementation plan adherence | High | Medium-high | Medium | Medium |
| Script impact now | None | None | None | None |
| Contract impact now | None | None | None | None |
| Fixture impact now | None | None | Future pressure | None |
| Template impact now | None | None | Possible pressure | None |
| Documentation impact now | One decision, then one plan | Broad docs | Fixture docs likely | None |
| Aggregator impact | None | Possible pressure | Possible pressure | None |
| Auditability | High | Medium | Medium | High |
| Decision | `ACCEPT` | `DEFER` | `DEFER` | `DEFER` |

## 8. Chosen Option

Chosen option:

`OPTION_A_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING`

The accepted next phase is:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN`

The accepted option is planning-only. It does not authorize test changes,
composer changes, checker creation, Aggregator expansion, contracts, fixtures,
templates, runtime behavior, or productive skill work.

## 9. Justification

Test hardening is the best next capability because it directly protects the
composer boundaries already implemented:

- manual/local/dev-only execution;
- pure in-memory functions;
- dry-run-only and still-no-write result semantics;
- final source roots limited to kernel, seniorization, templates, and
  materialization contracts;
- `reference/agents/` blocked as final source;
- explicit templates only;
- Target real, filesystem read/write/stat/list, GitHub write, approval token,
  runtime payload, renderer, writer, persistent report, generated output, and
  productive skill surfaces blocked;
- no-read/no-write evidence preserved;
- non-authorization summary preserved;
- Aggregator isolation preserved.

The implementation plan already expected future test strategy, including
accepted and blocked request shapes, source boundary, explicit templates,
template inference blocking, render context without renderer, target/output
planning, Target real blocking, write-signal blocking, approval-token blocking,
runtime-payload blocking, generated-output blocking, in-memory output model,
no-read/no-write evidence, non-authorization summary, and Aggregator
unchanged.

Planning hardening now reduces ambiguity before either documentation
integration or fixture-backed scenarios make the composer more visible.

## 10. Rejected Or Deferred Options

`OPTION_B_DEV_ONLY_IN_MEMORY_COMPOSER_DOCUMENTATION_INTEGRATION` is deferred.
Documentation integration should happen after the composer test-hardening plan
and any separately authorized hardening implementation/audit establish that the
manual/local coverage is robust enough to document without overclaiming.

`OPTION_C_FIXTURE_BACKED_COMPOSER_SCENARIO` is deferred. It is useful later,
but not before the generic composer test boundary is hardened. Fixture-backed
work must not become a real Target path, fixture creator, generated output
path, snapshot generator, renderer, writer, materializer, or Aggregator child.

`OPTION_D_PAUSE_FOR_MANUAL_DEV_SKILL_TESTING` is deferred. Manual testing can
continue informally, but the next formal phase should be a hardening plan so
the manual test surface does not remain under-specified.

## 11. Allowed Scope Of The Next Phase

The next phase may create only:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN.md`

That plan may define how a later separate implementation phase could harden
only:

- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`

If strictly necessary, it may identify minimal future composer adjustments in:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`

The next phase itself must not alter either script.

The plan may define future coverage categories such as:

- table-driven negative cases;
- semantic aliasing of forbidden signals;
- casing and separator normalization;
- approval positive semantics;
- forbidden output field recursion;
- contract gap handling;
- source boundary edge cases;
- template explicitness edge cases;
- planned operation vocabulary;
- no-read/no-write evidence on blocked paths;
- non-authorization summary on blocked paths;
- Aggregator isolation.

## 12. Prohibited Scope Of The Next Phase

The next phase must not:

- implement hardening;
- alter the composer;
- alter the test;
- create a checker;
- create a tenth check;
- alter the Aggregator;
- alter contracts;
- create or alter fixtures;
- create or alter templates;
- alter README, MANIFEST, or STATIC_CHECKS;
- touch `skills/stnl_project_agent_specializer/`;
- create Target real;
- create a writer;
- create a renderer;
- create a loader runtime;
- create a Target Adapter real;
- create real Write Approval;
- emit approval token;
- create approval registry;
- create signer;
- create persistent report;
- create generated output;
- create materialized output;
- capture stdout in a file;
- generate logs, cache, snapshots, golden files, or temp outputs;
- write GitHub;
- create branch, commit, pull request, or merge.

## 13. Candidate Files For The Next Phase

Allowed new file:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN.md`

Read-only candidate inputs:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_NEXT_CAPABILITY_DECISION.md`
- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_PLAN.md`
- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_PLAN.md`
- `reference/materialization_lab/DEV_AGENT_MATERIALIZATION_NEXT_CAPABILITY_DECISION.md`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/MANIFEST.md`
- `reference/materialization_lab/contracts/`
- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

Forbidden files for the next phase include:

- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `reference/materialization_lab/contracts/*.md`
- `reference/materialization_lab/fixtures/**`
- `reference/templates/**`
- `reference/MANIFEST.md`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `skills/stnl_project_agent_specializer/**`

Those files may be read only where authorized by the next plan phase. They
must not be edited.

## 14. Relationship With Scripts

This decision creates no script and changes no script.

The next phase must also create no script and change no script. It may only
plan how a later implementation phase could harden the existing manual/local
test.

Any later implementation must keep the composer and its test:

- manual/local/dev-only;
- pure/in-memory where applicable;
- dry-run-only;
- still-no-write;
- outside the Aggregator;
- outside official checks;
- not checker files;
- not runtime commands;
- not persistent report generators.

## 15. Relationship With Contracts

This decision changes no contracts.

The existing contract chain remains sufficient for choosing test-hardening as
the next planning step. If the future hardening plan discovers a genuine
contract gap, it must record:

`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`

It must not update contracts in the same phase.

## 16. Relationship With Fixtures

This decision creates no fixtures and changes no fixtures.

Fixture-backed composer scenarios are deferred. Any future fixture-backed
work must remain under the authorized fixture root, documentary/dev-only, and
separately planned. It must not create real Target artifacts, complete rendered
snapshots, generated outputs, persistent reports, a renderer, a writer, a
runtime materializer, a scenario selector, or productive-skill coupling.

## 17. Relationship With Templates

This decision creates no templates and changes no templates.

Templates remain explicit refs only:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/config.toml`
- `reference/templates/codex/AGENTS.md`

Test hardening may later plan additional assertions around explicitness and
missing-template blocking, but it must not infer, create, backfill, mutate, or
render templates.

## 18. Relationship With Aggregator

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

This decision blocks:

- composer checker;
- composer test in the Aggregator;
- tenth check;
- Aggregator as composer runner;
- Aggregator as report generator;
- Aggregator edits.

The existing aggregator command may be run only as a read-only check of the
current baseline.

## 19. Relationship With Productive Skill

The productive skill remains out of scope:

`skills/stnl_project_agent_specializer/`

This decision does not inspect, alter, migrate, or plan writes to the
productive skill. The approved overall strategy remains:

1. mature the dev skill;
2. test the dev skill for a period;
3. correct discovered gaps;
4. approve behavior manually;
5. only then open a separate productive migration track.

No productive migration, productive write, productive template work, or
productive skill planning is authorized now.

## 20. Checks Executed

This decision phase permits only lightweight read-only checks and no stdout
capture to files.

Executed checks and observed results:

```text
git status --short
?? reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_NEXT_CAPABILITY_DECISION.md

node scripts/materialization_lab/dev-only-in-memory-composer.test.mjs
MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST: PASS

node scripts/materialization_lab/check-validation-harness-aggregator.mjs
MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS

node scripts/materialization_lab/check-static.mjs
MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS

git diff --check
PASS
```

These checks do not authorize a checker, Aggregator expansion, reports, logs,
cache, snapshots, temp outputs, Target access, GitHub writes, or productive
skill mutation.

## 21. Residual Risks

Residual risks:

- The phrase "test hardening" may be misread as permission to implement tests
  immediately; the next phase is only a plan.
- More test coverage may create pressure to register the composer test in the
  Aggregator; this remains blocked.
- Negative cases may reveal a contract gap; any such gap requires a separate
  decision and must not be patched in the hardening plan.
- Fixture-backed scenarios may still be attractive, but they should wait until
  manual/local test coverage is planned and audited.
- Documentation integration may be desirable, but broad documentation should
  wait until hardening coverage is more mature.
- Approval conceptual eligibility can still be misread as write permission;
  future hardening must keep positive approval semantics blocked or
  non-authorizing.

## 22. Recommended Next Phase

Recommended next phase:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN`

Required mode:

- plan-only;
- documentation-only;
- no implementation;
- no script change;
- no checker;
- no Aggregator change;
- no Target real;
- no filesystem read/write/stat/list against Target;
- no writer;
- no renderer;
- no loader runtime;
- no Target Adapter real;
- no Write Approval real;
- no approval token;
- no approval registry;
- no signer;
- no persistent report;
- no output materialization;
- no fixture creation;
- no template mutation;
- no contract mutation;
- no productive skill.

The next phase should create one plan document and stop.
