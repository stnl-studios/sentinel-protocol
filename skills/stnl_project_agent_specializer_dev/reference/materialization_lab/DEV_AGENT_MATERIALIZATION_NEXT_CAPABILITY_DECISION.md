# Dev Agent Materialization Next Capability Decision

Status: documentary/dev-only/read-only decision artifact.

This document decides the next safe capability for the Materialization Lab
after the audited dry-run-only materializer prototype, its test hardening, and
its documentation integration. It does not implement a new capability, create a
script, create a checker, alter the Aggregator, persist output, access a real
Target, write GitHub, mutate the productive skill, create a commit, create a
branch, or open a pull request.

## 1. Verdict

`MATERIALIZATION_DEV_AGENT_MATERIALIZATION_NEXT_CAPABILITY_DECISION: READY`

Decision:

`OPTION_A_DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER: ACCEPT`

The next safe phase is:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_PLAN`

The next phase must be a plan, not implementation. It must remain
documentary/dev-only/read-only and must not create a composer script, planner
script, test, checker, fixture, template, target adapter, writer, approval
flow, persistent report, generated output, or materialized output.

## 2. Executive Summary

The safest useful movement is to plan a dev-only in-memory materialization
composer. The composer direction is closer to controlled materialization than
the current prototype because it can define how final sources, explicit
templates, render context, target/output plan, no-read/no-write evidence, and
non-authorization summary would be composed into a single in-memory planned
agent materialization model.

This decision does not authorize implementation. The recommended next phase is
only a plan that defines the exact boundary for a possible future composer.
That plan must keep the productive skill out of scope, preserve still-no-write,
avoid real Target access, avoid final rendered content persistence, avoid
GitHub write, avoid Aggregator expansion, and leave all current contracts and
scripts unchanged.

The dry-run output planner option is safe but lower value because the current
prototype already creates planned-only output entries and target/output plan
evidence. A fixture-backed single-agent scenario is useful later, but it risks
overfitting before the generic in-memory composition boundary is planned. Not
advancing is not required because the current contracts, fixture layer,
templates, source model, prototype test, and Aggregator baseline are sufficient
for a plan-only next step.

## 3. Analyzed Scope

Analyzed scope was limited to:

- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/`
- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/contracts/`
- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/validation/`
- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`
- `skills/stnl_project_agent_specializer_dev/reference/kernel_lab/`
- `skills/stnl_project_agent_specializer_dev/reference/seniorization_lab/`
- `skills/stnl_project_agent_specializer_dev/reference/templates/`
- `skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md`
- `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`

`reference/agents/` was not used as a final source. Existing `.DS_Store`
entries were ignored.

Read-only baseline commands executed:

```txt
node scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs
node scripts/materialization_lab/check-validation-harness-aggregator.mjs
```

Observed verdicts:

```txt
MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST: PASS
MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS
```

## 4. Current State Considered

The current prototype is consolidated as:

- dev-only
- reference-only
- manual/local
- fixture-only
- model-only
- in-memory-only
- dry-run-only
- still-no-write
- outside the Aggregator
- outside official checks
- no new checker
- no tenth check
- no real Target
- no real Write Approval
- no GitHub write
- no productive skill mutation

The prototype already returns in-memory sections for:

- source plan
- template resolution
- render context plan
- target adapter plan
- planned output entries
- dry-run boundary result
- write approval protocol result as still-no-write
- dry-run report model reference
- blocking summary
- no-read/no-write evidence
- non-authorization summary

The next movement should therefore not repeat the current dry-run plan shape.
It should plan how a future dev-only capability may compose a more coherent
in-memory materialization model from the final source chain and explicit
templates, while still avoiding rendered output persistence and write paths.

## 5. Options Evaluated

### Option A - Dev-only in-memory materialization composer

Decision: `ACCEPT`

This option plans a future in-memory composer that would build a structured
planned agent materialization model from final sources, explicit templates,
render context, target/output plan, no-read/no-write evidence, and
non-authorization summary.

Boundary safety: high if the next phase is plan-only and any later
implementation remains manual/local/dev-only, in-memory-only, dry-run-only,
and still-no-write.

Proximity to real materialization in dev: high. It moves from output-entry
planning toward controlled composition of an agent materialization model
without writing files.

Early runtime promotion risk: medium unless explicitly constrained. The next
plan must forbid CLI behavior, runtime loader behavior, target adapter
execution, persistent reports, generated files, and materialized output.

Bloat risk: medium. The next plan must avoid creating a broad generic
framework and should define the smallest useful composer boundary.

Productive-skill coupling risk: low if final sources remain only
`reference/kernel_lab/`, `reference/seniorization_lab/`, `reference/templates/`,
and materialization contracts, with `reference/agents/` forbidden as final
source and `skills/stnl_project_agent_specializer/` out of scope.

Documentary ambiguity risk: low to medium. The plan must distinguish
composition model from final rendering, script output, persistent report, and
write authorization.

Contract adherence: high. Existing contracts already cover source model,
templates, rendering/composition, dry-run boundary, report model, materializer
interface, target adapter, write approval, prototype, validation, fixture, and
implementation boundaries.

Prototype reuse: high. The current prototype already contains the safe
boundary sections that a future composer plan can refine.

New contract need: no contract change is authorized. The next plan may note a
separate future decision only if it discovers an objective gap.

Future script need: not for the next phase. A later implementation phase may
evaluate a manual/local/dev-only script only after plan and audit.

Future checker need: explicitly blocked for the next phase. Any future checker
requires a separate decision and must start outside the Aggregator unless
separately approved.

Fixture need: no new fixture in the next phase. Future fixture use should be
evaluated after the generic composer boundary is planned.

Aggregator impact: none. Aggregator remains exactly the current 9 checks.

Auditability: high if the next phase produces a narrow plan with accepted and
forbidden surfaces.

### Option B - Dev-only dry-run output planner

Decision: `DEFER`

This option would deepen the planned file/output model without composing
closer-to-final in-memory agent content.

Boundary safety: very high.

Proximity to real materialization in dev: medium. It improves output planning
but does not address the next missing composition layer between final sources,
explicit templates, render context, and planned agent model.

Early runtime promotion risk: low.

Bloat risk: low.

Productive-skill coupling risk: low.

Documentary ambiguity risk: low.

Contract adherence: high.

Prototype reuse: medium to high, but the current prototype already has
planned output entries, target-root-relative conceptual paths, source refs,
template refs, no-read/no-write evidence, and non-authorization summary.

New contract need: none currently identified.

Future script need: not for the next phase.

Future checker need: blocked unless separately decided.

Fixture need: none for a plan.

Aggregator impact: none.

Auditability: high.

Reason deferred: it is safe, but it advances less than Option A because the
prototype already covers the minimum dry-run output-plan shape. It can remain
a fallback if the composer plan finds that composition is still too ambiguous.

### Option C - Dev-only fixture-backed agent materialization scenario

Decision: `DEFER`

This option would simulate one canonical agent end to end through fixtures
without persisting output.

Boundary safety: medium to high if fixture-only and in-memory-only.

Proximity to real materialization in dev: medium to high for one agent, but
lower for the generic materialization boundary.

Early runtime promotion risk: medium because an end-to-end scenario may be
misread as a materializer path.

Bloat risk: medium. It may require new fixture shape decisions and
scenario-specific assertions before the generic composer boundary is stable.

Productive-skill coupling risk: low if constrained, but higher than Option A
if a single fixture tempts parity with historical `reference/agents/`.

Documentary ambiguity risk: medium.

Contract adherence: likely high, but fixture use must stay within
`FIXTURE_BOUNDARY_CONTRACT.md`.

Prototype reuse: medium.

New contract need: no contract change is authorized. Fixture-specific gaps
would require separate decision.

Future script need: not for the next phase.

Future checker need: blocked unless separately decided.

Fixture need: likely yes later, but not in this phase.

Aggregator impact: none in this decision.

Auditability: medium. A single-agent scenario is easy to inspect, but can
overfit before the generic composition model is planned.

Reason deferred: useful after the composer boundary exists, not before.

### Option D - Do not advance capability yet

Decision: `REJECT`

Boundary safety: highest.

Proximity to real materialization in dev: none.

Early runtime promotion risk: none.

Bloat risk: none.

Productive-skill coupling risk: none.

Documentary ambiguity risk: low, but it leaves the next step undecided despite
adequate baseline evidence.

Contract adherence: high.

Prototype reuse: none.

New contract need: none currently identified.

Future script need: none.

Future checker need: none.

Fixture need: none.

Aggregator impact: none.

Auditability: high.

Reason rejected: the current state is strong enough for a plan-only next phase.
No structural gap was found that requires stopping before a documentary plan.

## 6. Decision Matrix

| Criterion | Option A Composer | Option B Planner | Option C Fixture Scenario | Option D Stop |
| --- | --- | --- | --- | --- |
| Boundary safety | High with explicit constraints | Very high | Medium-high | Highest |
| Proximity to dev materialization | High | Medium | Medium-high, narrow | None |
| Early runtime risk | Medium, controllable by plan | Low | Medium | None |
| Bloat risk | Medium | Low | Medium | None |
| Productive-skill coupling risk | Low | Low | Low-medium | None |
| Documentary ambiguity risk | Low-medium | Low | Medium | Low |
| Existing contract adherence | High | High | High with fixture care | High |
| Prototype reuse | High | Medium-high | Medium | None |
| New contract needed now | No | No | No | No |
| Future script needed now | No | No | No | No |
| Future checker needed now | No | No | No | No |
| New fixture needed now | No | No | No | No |
| Aggregator impact | None | None | None | None |
| Auditability | High | High | Medium | High |
| Decision | `ACCEPT` | `DEFER` | `DEFER` | `REJECT` |

## 7. Chosen Option

Chosen option:

`OPTION_A_DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER`

The accepted next phase is:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_PLAN`

This next phase must define the documentary boundary for a future composer
only. It must not create or modify scripts, checkers, tests, fixtures,
templates, contracts, generated files, materialized outputs, persistent
reports, target adapters, writers, approval flows, Aggregator membership, or
the productive skill.

## 8. Justification

Option A is the best next step because it moves the lab one controlled step
closer to agent materialization while preserving every current safety boundary.
The current prototype already covers planned output entries and no-write
evidence; the next missing capability is the composition boundary that explains
how final source modules, senior profiles, explicit templates, render context,
and conceptual output plan would become one in-memory planned agent
materialization model.

The composer direction is safe only because the next step is a plan. The plan
must keep final rendered content, actual target files, real target state,
approval tokens, write authorization, and persistent reports out of scope. If
the plan discovers that composition cannot be separated from real rendering or
template execution safely, it must block and recommend falling back to a
dry-run output planner decision.

## 9. Rejected Or Deferred Options

`OPTION_B_DEV_ONLY_DRY_RUN_OUTPUT_PLANNER` is deferred. It remains safe, but
it would mostly deepen behavior already represented by the current prototype:
planned entries, target-root-relative conceptual paths, explicit template
refs, source refs, no-read/no-write evidence, and non-authorization summary.

`OPTION_C_DEV_ONLY_FIXTURE_BACKED_AGENT_MATERIALIZATION_SCENARIO` is deferred.
It may be useful after the generic composer boundary is planned, but choosing a
single canonical fixture now risks overfitting and may be misread as an
end-to-end materialization path.

`OPTION_D_DO_NOT_ADVANCE_CAPABILITY_YET` is rejected. The current audited
state is sufficient for a plan-only next phase, and no blocker was found that
requires freezing the lab before planning the next capability.

## 10. Allowed Scope Of The Next Phase

The next phase may:

- create one plan document under `reference/materialization_lab/`;
- define the conceptual input and output boundaries for a future in-memory
  composer;
- define how the composer plan would use final source chain evidence;
- define how explicit template refs participate without template inference;
- define a render-context composition model without executing a renderer;
- define a target/output plan model without real Target access;
- define required no-read/no-write evidence;
- define required non-authorization summary;
- define accepted and blocked request/result shapes for a possible later
  implementation;
- define audit expectations for a later plan audit;
- state that any implementation requires a separate future phase.

## 11. Prohibited Scope Of The Next Phase

The next phase must not:

- implement a composer;
- implement a planner;
- create or modify scripts;
- create or modify tests;
- create a checker;
- add a tenth Aggregator check;
- alter `check-validation-harness-aggregator.mjs`;
- alter contracts;
- create fixtures;
- create templates;
- infer templates;
- use `reference/agents/` as final source;
- access a real Target;
- create a Target Adapter;
- create Write Approval;
- create approval token, registry, signer, or persisted approval state;
- create a writer;
- create a renderer;
- create a loader or scenario selector;
- create a runtime materializer;
- persist reports, logs, stdout captures, caches, snapshots, temp outputs, or
  generated artifacts;
- materialize `.github/**`, `.codex/**`, or `AGENTS.md`;
- write GitHub;
- create branch, commit, pull request, or merge;
- touch `skills/stnl_project_agent_specializer/`.

## 12. Candidate Files For The Next Phase

Allowed new file for the next phase:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_PLAN.md`

Read-only inputs for the next phase:

- `reference/materialization_lab/DEV_AGENT_MATERIALIZATION_NEXT_CAPABILITY_DECISION.md`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md`
- `reference/materialization_lab/contracts/MATERIALIZER_INTERFACE_CONTRACT.md`
- `reference/materialization_lab/contracts/TARGET_ADAPTER_CONTRACT.md`
- `reference/materialization_lab/contracts/WRITE_APPROVAL_PROTOCOL_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
- `reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`
- `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/materialization_lab/fixtures/`
- `reference/kernel_lab/`
- `reference/seniorization_lab/`
- `reference/templates/`
- `reference/MANIFEST.md`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

The next phase may mention possible later implementation candidates only as
non-authorized future subjects. It must not create or edit them.

## 13. Contract Relationship

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

No new contract is authorized by this decision. If the next plan finds a
genuine contract gap, it must record:

`CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION`

and must not implement the contract change.

## 14. Script Relationship

All current scripts remain unchanged:

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

The next phase must be plan-only and must not add a composer script. If a
future implementation is later approved, it must remain manual/local/dev-only,
in-memory-only, dry-run-only, and outside the Aggregator unless a separate
future decision says otherwise.

## 15. Aggregator Relationship

The Aggregator remains closed with exactly the current 9 official checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

No tenth check is authorized. No new checker is authorized. No Aggregator
change is authorized. If future validation is needed for a later composer
implementation, it must begin as manual/local/dev-only and outside the
Aggregator, or require a separate decision before any checker discussion.

## 16. Productive Skill Relationship

The productive skill remains fully out of scope:

- `skills/stnl_project_agent_specializer/`

This decision does not inspect, alter, migrate, or plan writes to the
productive skill. The approved overall strategy remains:

1. mature the dev skill;
2. test the dev skill for a period;
3. correct discovered gaps;
4. approve behavior manually;
5. only then open a separate productive migration track.

No productive migration is authorized here.

## 17. Residual Risks

Residual risks:

- The term "composer" may be misread as renderer or materializer unless the
  next plan defines a strict in-memory conceptual boundary.
- A closer-to-final in-memory model may create pressure for a script before the
  plan/audit sequence is complete.
- Template participation may be confused with template rendering. The next
  plan must require explicit refs and prohibit persisted rendered content.
- Output-plan concepts may be confused with real Target paths. The next plan
  must keep target-root-relative conceptual paths and no Target real access.
- A future validation desire may create pressure for a checker. The next phase
  must keep checker creation blocked.
- Fixture-backed examples may tempt use of `reference/agents/` as parity
  source. The next plan must preserve final-source rules.

## 18. Recommended Next Phase

Recommended next phase:

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_PLAN`

Required phase mode:

- decision-following
- plan-only
- documentation-only
- read-mostly
- no implementation
- no script
- no checker
- no Aggregator change
- no runtime
- no writer
- no productive skill

The next phase should produce one plan document and stop. Any implementation,
audit, checker discussion, contract change, fixture addition, or productive
migration must be separately authorized later.
