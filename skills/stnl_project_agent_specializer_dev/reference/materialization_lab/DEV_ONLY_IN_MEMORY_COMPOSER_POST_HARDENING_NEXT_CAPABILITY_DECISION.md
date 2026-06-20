# Dev-only In-memory Composer Post-hardening Next Capability Decision

Status: documentary/dev-only/decision-only artifact.

This document decides the next safe capability after the approved dev-only
in-memory composer implementation and approved composer test hardening. It
does not implement the next phase, alter the composer, alter tests, create a
checker, alter the Aggregator, alter contracts, alter fixtures, alter
templates, create a runtime materializer, create a renderer, create a writer,
access a real Target, persist output, write GitHub, or touch
`skills/stnl_project_agent_specializer/`.

## 1. Verdict

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_POST_HARDENING_NEXT_CAPABILITY_DECISION: READY`

Decision:

`OPTION_B_FIXTURE_BACKED_COMPOSER_SCENARIO: ACCEPT_AS_MACRO_FULL_FLOW_PLAN`

Recommended next phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_PLAN`

The recommended next phase must be plan-only. It should plan a full-flow
dev-skill dry-run/in-memory integration path for all agents at once, without
materializing outputs, writing to real projects, touching the productive skill,
writing GitHub, creating an Aggregator check, or promoting the composer into a
runtime materializer.

## 2. Executive Summary

The composer implementation and its test hardening are treated as completed
and approved. No objective gap was identified that requires reopening the
composer, reopening the hardened test, expanding the Aggregator, or starting
another narrow hardening loop.

The strategic next movement should not be documentation integration as a small
standalone phase, an isolated fixture scenario, one-agent materialization, or a
pause for manual testing. The useful next capability is a macro planning phase
that connects the approved dev-only in-memory composer to a future controlled
full-flow validation of the dev skill package.

That future validation goal is practical and qualitative: use the dev skill
against personal or study projects in a controlled environment to assess
whether the full set of agents, senior profiles, templates, contracts, and
materialization flow is good in practice. This still does not authorize the
productive skill, official rollout, GitHub writes, commits, branches, pull
requests, real Target mutation, a productive writer, or unrestricted
filesystem writes.

## 3. Scope

This decision considered only the dev-skill materialization lab context:

- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_PLAN.md`
- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_NEXT_CAPABILITY_DECISION.md`
- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_PLAN.md`
- `reference/materialization_lab/DEV_ONLY_IN_MEMORY_COMPOSER_PLAN.md`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/MANIFEST.md`
- `reference/materialization_lab/contracts/`
- `scripts/materialization_lab/dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

Existing `.DS_Store` entries and any `__MACOSX` material are ignored.

This decision did not read, use, plan, migrate, or alter the productive skill
at `skills/stnl_project_agent_specializer/`.

## 4. Current State

The following state is treated as completed and approved:

- `MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION: PASS`
- `MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_IMPLEMENTATION: PASS`
- `MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST_HARDENING_IMPLEMENTATION_AUDIT: EXCELLENT PASS`

The composer remains:

- manual/local/dev-only;
- pure in-memory composition;
- dry-run-only;
- still-no-write;
- outside the Aggregator;
- outside the official 9 checks;
- not a checker;
- not a renderer;
- not a writer;
- not a runtime materializer;
- not a Target Adapter real;
- not a Write Approval real implementation;
- not an approval-token issuer;
- not a persistent report generator;
- not a GitHub writer;
- not productive-skill work.

The Aggregator remains closed with exactly 9 official checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

No tenth check is recommended.

## 5. Strategic Premise

The next useful direction is not agent-by-agent materialization testing.

The future strategic goal is to make the dev skill testable against real
personal or study projects in a controlled way, so the full package can be
evaluated in practice:

- the complete agent set;
- Senior Agent Profiles;
- templates;
- materialization contracts;
- source, render, dry-run, target/output, and approval boundaries;
- the full materialization flow as a coherent package.

In this document, "real projects" means only:

- personal projects;
- study projects;
- controlled environment;
- use of the dev skill;
- qualitative practical validation;
- evaluation of the complete agent package.

It does not mean:

- productive skill;
- official rollout;
- GitHub write;
- automatic commit;
- automatic branch;
- automatic pull request;
- unrestricted filesystem mutation;
- productive Target;
- productive writer;
- productive materializer.

## 6. Decision Criteria

The next capability should:

- preserve dev-only/no-write boundaries;
- avoid reopening approved composer implementation or approved test hardening;
- avoid infinite hardening loops unless an objective gap exists;
- avoid microphases that do not move toward validating the full dev skill flow;
- avoid one-agent or agent-by-agent materialization planning;
- avoid isolated fixture work that overfits to a small scenario;
- avoid promoting documentation integration into a standalone blocking step;
- preserve the closed 9-check Aggregator;
- keep the productive skill out of scope;
- prepare a future controlled path toward practical validation in personal or
  study projects;
- remain dry-run/in-memory/no-write until a separate future decision changes
  that boundary.

## 7. Options Evaluated

### OPTION_A_COMPOSER_DOCUMENTATION_INTEGRATION

Decision: `DEFER_AS_STANDALONE_PHASE`

Documentation integration is useful, but it is too small to be the next main
phase. It could record the manual/local composer boundary, the hardened test
expectations, and the fact that the composer remains outside the Aggregator.

As an isolated next phase, however, it would delay the real objective: testing
the dev skill flow as a complete package. Documentation should be included
only where needed inside the future macro full-flow plan, not promoted into a
separate microphase.

### OPTION_B_FIXTURE_BACKED_COMPOSER_SCENARIO

Decision: `ACCEPT_AS_MACRO_FULL_FLOW_PLAN`

This is the option most aligned with practical validation, but only if it is
expanded.

It must not become:

- one small fixture scenario;
- an agent-unique materialization case;
- isolated fixture implementation;
- golden output generation;
- snapshot generation;
- rendered output creation;
- real Target write;
- GitHub write;
- Aggregator expansion;
- productive-skill work.

The accepted interpretation is a future macro planning phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_PLAN`

That phase should plan a dry-run/in-memory full-flow integration path for all
agents at once. It may use the fixture-backed idea as a controlled model for
full-flow validation, but it must remain plan-only, no-write, no-output-
materialization, and no productive-skill work.

### OPTION_C_PAUSE_FOR_MANUAL_DEV_SKILL_TESTING

Decision: `DEFER`

Manual testing against personal or study projects is the eventual practical
goal, but pausing now is premature. The dev skill does not yet have a
full-flow dry-run/in-memory integration plan that explains how the complete
package should be exercised safely.

Manual testing should come after the future full-flow plan defines the safety
boundary, scope, evidence model, and no-write constraints for controlled
personal or study project validation.

### OPTION_D_MINOR_HARDENING_IF_OBJECTIVE_GAP_EXISTS

Decision: `REJECT_NO_OBJECTIVE_GAP_IDENTIFIED`

Minor hardening should be selected only if there is a concrete gap in the
approved composer or hardened test boundary.

No such gap was identified for this decision. The current approved state is
sufficient to move from narrow composer hardening toward a macro full-flow
planning phase. Continuing to harden without a specific gap would create an
unbounded hardening loop and would not materially advance practical validation
of the dev skill package.

## 8. Recommended Option

Recommended option:

`OPTION_B_FIXTURE_BACKED_COMPOSER_SCENARIO`

Required expansion:

`OPTION_B` must be converted into a macro full-flow planning phase. It must
not be implemented as a small scenario, an agent-specific materialization
exercise, or an isolated fixture task.

The useful interpretation is:

- cover all agents together;
- plan the full dev-skill flow;
- remain dry-run-only;
- remain in-memory-only;
- remain no-write;
- avoid real Target mutation;
- avoid output materialization;
- avoid GitHub writes;
- avoid productive skill work;
- prepare for later controlled validation in personal or study projects.

## 9. Recommended Next Phase

Recommended next phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_PLAN`

The future phase should create a plan, not implementation. It should define
how the dev skill can be exercised as a full dry-run/in-memory flow across the
complete agent set.

The future plan may cover:

- full-flow dev skill orchestration at the conceptual/in-memory level;
- all canonical agents in one integrated scope;
- use of approved kernel, seniorization, template, and materialization lab
  refs;
- composer placement inside the full flow;
- fixture-backed evidence as a controlled model, without creating snapshots or
  materialized outputs;
- no-write evidence and non-authorization evidence;
- safety boundaries for future personal or study project validation;
- minimal documentation needed inside the macro plan;
- criteria for a later decision before any controlled project-facing test.

The future plan must not implement:

- runtime materializer;
- renderer;
- writer;
- Target Adapter real;
- Write Approval real;
- approval token;
- approval registry;
- persistent report;
- output snapshot;
- generated output;
- materialized output;
- GitHub write;
- branch, commit, or pull request;
- productive-skill mutation.

## 10. Explicit Non-Goals

This decision does not authorize:

- implementation of the recommended next phase;
- composer changes;
- composer test changes;
- script changes;
- Aggregator changes;
- checker creation;
- tenth official check;
- contract changes;
- fixture changes;
- template changes;
- README changes;
- MANIFEST changes;
- STATIC_CHECKS changes;
- productive-skill reads, migration, mutation, or use;
- Target real creation;
- writer creation;
- productive renderer creation;
- runtime materializer creation;
- Target Adapter real creation;
- Write Approval real creation;
- approval token emission;
- approval registry creation;
- persistent report creation;
- snapshot generation;
- golden output generation;
- temp output generation;
- materialized output generation;
- GitHub write;
- commit, branch, or pull request.

## 11. Safety Boundaries

The recommended next phase must preserve these boundaries:

- dev skill only;
- plan-only until separately authorized;
- dry-run-only;
- in-memory-only;
- no real Target read/write/stat/list;
- no target-project mutation;
- no output persistence;
- no stdout capture as report;
- no cache, snapshot, golden, temp, generated, or materialized output;
- no GitHub write;
- no productive skill;
- no productive templates;
- no `reference/agents/` as final materialization source;
- explicit templates only;
- target-root-relative conceptual paths only;
- no host absolute paths;
- no approval token, signer, registry, or persistent approval state;
- Aggregator remains exactly 9 official checks.

Forbidden checker names remain forbidden:

- `scripts/materialization_lab/check-dev-only-in-memory-composer.mjs`
- `scripts/materialization_lab/check-in-memory-composer.mjs`
- `scripts/materialization_lab/check-materialization-composer.mjs`

## 12. Why This Is Not Productive Skill Work

This decision is confined to `stnl_project_agent_specializer_dev` and the
materialization lab decision chain. It does not read or alter the productive
skill at `skills/stnl_project_agent_specializer/`.

The recommended future phase is also dev-only. Its purpose is to plan how to
evaluate the dev skill package safely before any productive promotion exists.
It creates no official rollout path, productive materializer, productive
writer, production Target access, GitHub publication flow, branch automation,
commit automation, or pull request automation.

Any future productive-skill work would require a separate explicit decision
after controlled dev-skill validation produces enough evidence.

## 13. Why This Avoids Microphases

The recommendation avoids microphases by rejecting:

- documentation integration as a standalone next step;
- a tiny composer fixture case;
- agent-by-agent materialization testing;
- one-agent proof points;
- minor hardening without a concrete gap.

The next phase should instead plan the full flow once, across all agents,
while preserving dry-run/in-memory/no-write boundaries. This gives the dev
skill a path toward practical package-level evaluation without fragmenting the
work into small steps that do not validate the actual end-to-end experience.

## 14. Future Phase Boundary

The recommended future phase may plan:

- full-flow dev skill integration;
- all-agent composition in one scope;
- evaluation of the complete package of agents, senior profiles, templates,
  contracts, and materialization flow;
- fixture-backed conceptual evidence where useful;
- preparation for later controlled personal or study project validation;
- documentation needed to make the full-flow plan auditable;
- safety limits that prevent premature real writes.

The recommended future phase may not:

- implement the flow;
- execute against a real project;
- write to a target project;
- create rendered artifacts;
- create snapshots or golden outputs;
- create a persistent report;
- mutate filesystem content outside the single authorized future artifact;
- change Aggregator membership;
- create a checker;
- touch the productive skill;
- write GitHub.

After that future plan, a separate decision would be required before any
controlled dry-run experiment involving personal or study project context.

## 15. Validation / Checks

This phase is documentation-only. Validation for this decision is scoped to:

- confirming the new artifact is the only intended file change;
- preserving the closed 9-check Aggregator boundary;
- preserving the dev-only/no-write/no-GitHub/no-productive-skill boundary;
- verifying that no scripts, checks, contracts, fixtures, templates, README,
  MANIFEST, or STATIC_CHECKS files were altered.

Read-only checks executed for this decision:

- `node scripts/materialization_lab/dev-only-in-memory-composer.test.mjs`
  returned `MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST: PASS`.
- `node scripts/materialization_lab/check-validation-harness-aggregator.mjs`
  returned `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`.
- `git diff --check` passed with no whitespace errors.
- `git status --short` showed only this new decision artifact as untracked.
- `git diff --stat` produced no tracked-file diff.
- `git diff --name-status` produced no tracked-file diff.

No validation output should be persisted outside this document.

## 16. Final Status

`MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_POST_HARDENING_NEXT_CAPABILITY_DECISION: READY`

Recommended option:

`OPTION_B_FIXTURE_BACKED_COMPOSER_SCENARIO`

Recommended next phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_INTEGRATION_PLAN`

Final boundary:

- decision-only;
- dev-only;
- post-hardening;
- macro full-flow planning recommended;
- no implementation;
- no composer change;
- no test change;
- no Aggregator change;
- no checker creation;
- no contracts/templates/fixtures changes;
- no productive skill;
- no Target real;
- no writer;
- no renderer;
- no runtime materializer;
- no GitHub write.
