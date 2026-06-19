# Dry-run-only Materializer Prototype Test Hardening Implementation Decision

Status: documentary/dev-only/read-only decision artifact.

This document resolves the implementation-phase block found while attempting
to harden the dry-run-only materializer prototype tests. It does not implement
the fix, change tests, create a checker, alter the Aggregator, persist output,
access a real Target, write GitHub, mutate the productive skill, create a
commit, create a branch, or open a pull request.

## 1. Verdict

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION_DECISION: READY`

Decision:

`OPTION_A_AUTHORIZE_MINIMAL_PROTOTYPE_CLASSIFICATION_FIX: ACCEPT`

The next safe phase is:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION_RESUME`

This decision authorizes only a future, separately executed implementation
resume to make a minimal in-memory classification fix in the dev-only
prototype and complete the planned test hardening.

## 2. Executive Summary

The blocked hardening implementation exposed a narrow semantic classification
gap: natural-language approval strings such as `ready to write`,
`write unlocked`, and `approval granted` currently fall through to the generic
`BLOCKED_APPROVAL_POLICY_INVALID` path instead of the more precise
`BLOCKED_APPROVAL_POSITIVE_SEMANTICS` block required by the audited hardening
plan.

The safest resolution is to authorize a future minimal prototype fix limited to
normalizing and classifying positive approval semantics in memory. This keeps
the audited hardening objective intact, avoids relaxing tests, avoids removing
negative coverage, and does not require any runtime materializer, real Target
access, writer, renderer, loader, real Target Adapter, real Write Approval,
approval token, approval registry, signer, persistent report, checker,
Aggregator change, GitHub write, commit, branch, pull request, or productive
skill mutation.

## 3. Decision Context

Required immediately previous states:

- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN: READY`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION: PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_NEXT_CAPABILITY_DECISION: READY`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN: READY`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION: BLOCKED_NEEDS_DECISION`

The audited hardening plan requires direct and disguised positive approval
semantics to block with `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`, including:

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

## 4. Blocking Finding

The hardening implementation could not be completed only by changing tests.

Observed classification gap:

- `ready to write` currently classifies as `BLOCKED_APPROVAL_POLICY_INVALID`
- `write unlocked` currently classifies as `BLOCKED_APPROVAL_POLICY_INVALID`
- `approval granted` currently classifies as `BLOCKED_APPROVAL_POLICY_INVALID`

Required classification:

- `ready to write` must classify as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`
- `write unlocked` must classify as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`
- `approval granted` must classify as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`

This is a block-code precision issue in the dev-only prototype classification
logic. It is not a request for a real approval mechanism and does not require
any write capability.

## 5. Preserved Boundaries

This decision preserves these contracts without relaxing, replacing,
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

This decision also preserves:

- dev-only scope
- fixture-only scope
- model-only behavior
- in-memory-only result construction
- no Target real access
- no Target real read or write
- no filesystem stat, directory listing, or content read of a real Target
- no real writer
- no real renderer
- no runtime loader
- no runtime scenario selector
- no real Target Adapter
- no real Write Approval
- no approval token
- no approval registry
- no signer
- no persistent report
- no stdout capture persistence
- no cache, snapshot, temp output, generated artifact, or materialized output
- no GitHub write
- no commit, branch, pull request, or merge
- no productive-skill mutation
- no checker creation
- no Aggregator alteration
- no tenth Aggregator child check

## 6. Options Evaluated

Evaluated options:

- `OPTION_A_AUTHORIZE_MINIMAL_PROTOTYPE_CLASSIFICATION_FIX`
- `OPTION_B_RELAX_TEST_EXPECTATION_TO_ACCEPT_GENERIC_APPROVAL_POLICY_BLOCK`
- `OPTION_C_REMOVE_LANGUAGE_NATURAL_APPROVAL_CASES_FROM_REQUIRED_HARDENING`
- `OPTION_D_BLOCK_AND_REQUIRE_CONTRACT_REPLAN`

Decision criteria:

- boundary safety
- alignment with the audited hardening plan
- smallest possible future change
- no capability expansion
- auditability
- simplicity
- Aggregator isolation
- productive skill isolation
- absence of Target real access
- absence of persistence

## 7. Option A - Minimal Prototype Classification Fix

Recommendation: `ACCEPT`

Option A authorizes a future separate implementation resume to minimally alter
`scripts/materialization_lab/dry-run-only-materializer-prototype.mjs` so that
positive approval semantics with simple separators and natural-language spaces
are normalized before classification.

The future correction may classify these values as
`BLOCKED_APPROVAL_POSITIVE_SEMANTICS`:

- `ready to write`
- `write unlocked`
- `approval granted`
- equivalent simple separator variants of already-forbidden positive approval
  aliases

The future correction must preserve `BLOCKED_APPROVAL_POLICY_INVALID` for
invalid `approval_policy` values that are not positive write-approval
semantics.

Boundary risk: low, if implemented only as in-memory string normalization and
block-code classification inside the existing dev-only prototype.

Capability expansion risk: low, because the change blocks more precisely and
does not create any approval state, token, registry, signer, writer, Target
access, or write path.

Auditability: high, because the future diff should be small and localized.

## 8. Option B - Relax Test Expectation

Recommendation: `REJECT`

Option B would accept `BLOCKED_APPROVAL_POLICY_INVALID` for `ready to write`,
`write unlocked`, and `approval granted`.

This weakens the audited hardening plan by treating disguised positive
approval semantics as a generic policy-invalid case. It also makes later review
less precise because write-unlocking language would not be distinguished from
ordinary malformed approval policy values.

Boundary risk: low, but safety value is lower than Option A.

Plan alignment: poor.

## 9. Option C - Remove Natural-language Approval Cases

Recommendation: `REJECT`

Option C would remove `ready to write`, `write unlocked`, and
`approval granted` from required hardening coverage.

This creates an avoidable gap exactly where the audited plan asked for
negative evidence: disguised positive approval semantics. Removing these cases
would reduce coverage and preserve the current ambiguity.

Boundary risk: low, but hardening quality is lower than Option A.

Plan alignment: poor.

## 10. Option D - Require Contract Replan

Recommendation: `REJECT`

Option D would block continuation and require a new contract replan before any
prototype classification change.

A full contract replan is not necessary because the existing contracts already
forbid positive approval aliases, real write approval, token issuance,
approval registries, signers, writers, Target write release, GitHub write, and
productive skill mutation. The required future movement is a small
classification correction inside a previously authorized dev-only prototype,
not a contract expansion.

Boundary risk: low if rejected.

Overhead: high if accepted.

## 11. Decision Matrix

| Option | Boundary safety | Plan alignment | Change size | Capability expansion risk | Aggregator isolation | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| `OPTION_A_AUTHORIZE_MINIMAL_PROTOTYPE_CLASSIFICATION_FIX` | High | High | Small | Low | Preserved | `ACCEPT` |
| `OPTION_B_RELAX_TEST_EXPECTATION_TO_ACCEPT_GENERIC_APPROVAL_POLICY_BLOCK` | High | Low | Small | Low | Preserved | `REJECT` |
| `OPTION_C_REMOVE_LANGUAGE_NATURAL_APPROVAL_CASES_FROM_REQUIRED_HARDENING` | High | Low | Small | Low | Preserved | `REJECT` |
| `OPTION_D_BLOCK_AND_REQUIRE_CONTRACT_REPLAN` | High | Medium | Large documentation overhead | Low | Preserved | `REJECT` |

## 12. Decision Taken

`OPTION_A_AUTHORIZE_MINIMAL_PROTOTYPE_CLASSIFICATION_FIX` is accepted.

The future implementation resume may alter the existing dev-only prototype
only to classify natural-language positive approval semantics under
`BLOCKED_APPROVAL_POSITIVE_SEMANTICS`.

This decision does not implement the correction and does not implement tests.

## 13. Authorized Future Scope

For the future separate phase
`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION_RESUME`,
the following files may be changed only as needed:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`, only if indispensable for simple fixture-only helpers

Authorized future behavior:

- normalize positive approval semantics with simple separators and
  natural-language spaces
- classify `ready to write` as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`
- classify `write unlocked` as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`
- classify `approval granted` as `BLOCKED_APPROVAL_POSITIVE_SEMANTICS`
- preserve `BLOCKED_APPROVAL_POLICY_INVALID` for invalid approval policy values
  that are not positive write-approval semantics
- complete the audited test hardening with inert in-memory request values
- keep all results fixture-only, model-only, dev-only, in-memory-only, and
  still-no-write

## 14. Forbidden Future Scope

The future implementation resume remains forbidden from creating or using:

- new checker
- Aggregator change
- tenth Aggregator child check
- prototype test integration into the Aggregator
- Target real access
- Target real read or write
- filesystem stat of a real Target
- directory listing of a real Target
- file-content read of a real Target
- Target real path resolution
- real writer
- real renderer
- runtime loader
- runtime scenario selector
- real Target Adapter
- real Write Approval
- approval token
- approval registry
- signer
- persistent report
- JSON report persistence
- Markdown report persistence
- stdout capture persistence
- cache
- temp output
- snapshots or persisted golden files
- generated artifact
- materialized output
- report generator
- runtime materializer
- productive CLI
- productive runner
- `child_process`
- `exec`
- `spawn`
- `process.argv` as a CLI contract
- `fetch`
- `http`
- `https`
- `octokit`
- GitHub client
- git command
- GitHub write
- commit
- branch
- pull request
- productive skill mutation
- mutation of `skills/stnl_project_agent_specializer/`

Negative strings in tests remain allowed only as inert in-memory request values.

## 15. Expected Future Files

Expected future changed files for the separate resume phase:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`

Permitted only if indispensable and justified:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`

Expected unchanged files:

- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- all existing checker files
- `skills/stnl_project_agent_specializer/`
- productive target files
- GitHub and repository metadata surfaces

## 16. Validation Expectations

The future resume phase must run only local safe checks and must not persist
stdout, JSON, Markdown, cache, snapshot, temp, generated, or materialized
output.

Expected future checks:

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

Expected outcomes:

- prototype test passes
- 9 official checks pass
- Aggregator passes unchanged
- no new checker exists
- no tenth Aggregator child exists
- no persistent output exists

## 17. Audit Expectations

A later audit of the future resume phase must verify:

- this decision phase created only this documentary decision artifact
- this decision phase did not implement the correction
- this decision phase did not implement tests
- the future implementation diff is minimal and localized
- approval positive semantics are classified precisely
- generic invalid approval policy remains separately classified
- prototype remains dev-only, fixture-only, model-only, in-memory-only, and
  still-no-write
- Target real remains prohibited
- writer, renderer, loader, scenario selector, real Target Adapter, and real
  Write Approval remain prohibited
- approval token, approval registry, and signer remain prohibited
- persistent report remains prohibited
- GitHub write, commit, branch, and pull request remain prohibited
- productive skill remains untouched
- templates remain explicit
- planned-only operations remain preserved
- `APPROVAL_CONCEPTUALLY_ELIGIBLE` remains non-authorizing
- no-read/no-write evidence remains asserted
- non-authorization summary remains asserted
- Aggregator remains unchanged with exactly 9 official checks

## 18. Blocking Conditions

The future resume phase must block if resolving this issue would require:

- runtime materializer
- real Target access
- real Target read or write
- filesystem stat, directory listing, or file-content read against a real Target
- real writer
- real renderer
- runtime loader
- runtime scenario selector
- real Target Adapter
- real Write Approval
- approval token
- approval registry
- signer
- persistent report
- GitHub write
- commit, branch, pull request, or merge
- productive skill mutation
- new checker
- Aggregator alteration
- tenth Aggregator child check
- filesystem write outside the explicitly changed source files of the future
  phase
- Target filesystem read
- stdout capture persistence
- snapshots or persisted golden files
- relaxing the audited hardening plan without a separately documented
  justification

## 19. Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION_DECISION: EXCELLENT PASS`
may be declared by a later read-only audit only when:

- this document remains documentary/dev-only/read-only
- no prototype correction was implemented in this decision phase
- no tests were implemented in this decision phase
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
- the decision recommends a coherent path to resolve the approval block-code
  classification gap
- the decision preserves the audited hardening plan
- prototype test passes
- 9 official checks pass
- Aggregator passes unchanged
- the recommended next phase is safe and separate

## 20. Final Status

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION_DECISION: READY`

Recommended next phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_IMPLEMENTATION_RESUME`
