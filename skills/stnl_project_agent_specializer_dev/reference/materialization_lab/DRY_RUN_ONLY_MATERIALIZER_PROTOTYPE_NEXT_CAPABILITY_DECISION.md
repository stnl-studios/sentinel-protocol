# Dry Run Only Materializer Prototype Next Capability Decision

Status: documentary/dev-only/read-only decision artifact.

This document decides the next safe movement for the recently implemented and
audited dry-run-only materializer prototype. It does not implement a new
capability, create a checker, alter the Aggregator, persist a runtime report,
read or write a real Target, touch GitHub, mutate the productive skill, create
a commit, create a branch, or open a pull request.

## 1. Verdict

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_NEXT_CAPABILITY_DECISION: READY`

The next recommended capability is:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN`

This recommendation authorizes only a future documentary planning phase unless
that future phase is separately and explicitly authorized. It does not
authorize test implementation in this decision phase.

## 2. Executive Summary

The safest next movement is to plan focused hardening of the prototype tests,
not to integrate the prototype as an official runtime surface, not to add a
new checker, and not to expand the Aggregator.

The current prototype already demonstrates the minimum dry-run-only shape. The
highest-value next step is to document a future test-hardening plan for more
negative request-shape cases, invalid source roots, incomplete contract refs,
invalid template refs, disguised positive approval semantics, path traversal,
invalid operation tokens, output-shape assertions, no-read/no-write evidence,
and non-authorization summary assertions.

Documentation integration is useful but should follow stronger test evidence.
A separate prototype checker is deferred because it risks bloat and pressure to
become a tenth Aggregator child check. Freezing the prototype as a dev baseline
is safe but lower utility than first planning targeted test hardening. No other
safe option is recommended.

## 3. Decision Context

Required immediately previous states:

- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN: READY`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_PLAN_AUDIT: EXCELLENT PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION: PASS`
- `MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION_AUDIT: EXCELLENT PASS`

The current phase is:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_NEXT_CAPABILITY_DECISION`

This phase is documentary and decision-only. It must not add runtime behavior,
new checkers, Aggregator children, target access, report persistence, GitHub
write behavior, or productive skill mutation.

## 4. Current Baseline

The audited implementation created and validated these dev-only prototype
files:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`

The prototype baseline is fixture-only, model-only, in-memory-only,
dry-run-only, no-write, no-target-real, no-GitHub, and no productive skill
mutation.

The current test file covers a happy path plus core blocked paths for dry-run
required, write policy, Target read/write policy, persistent report policy,
positive approval semantics, final `reference/agents/` dependency, missing or
inferred templates, unsafe real paths, approval token, write execution ID,
executed operation token, generated output, mandatory runtime payload,
no-read/no-write evidence, and still-no-write approval state.

The current Aggregator remains the official 9-check gate and is not connected
to the prototype test.

## 5. Preserved Boundaries

This decision preserves:

- dev-only
- fixture-only
- model-only
- in-memory-only
- no-write
- no-target-real
- no-GitHub
- no productive skill mutation
- no runtime materializer
- no renderer
- no writer
- no loader runtime
- no scenario selector runtime
- no real Target Adapter
- no real Write Approval
- no approval token
- no approval registry
- no signer
- no persistent report
- no generated artifact
- no materialized output
- no commit, branch, pull request, or merge
- no Aggregator alteration
- no tenth Aggregator child check

Preserved contracts:

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

## 6. Options Evaluated

Evaluated options:

- `OPTION_A_TEST_HARDENING`
- `OPTION_B_DOCUMENTATION_INTEGRATION`
- `OPTION_C_SEPARATE_PROTOTYPE_CHECKER`
- `OPTION_D_FREEZE_AS_DEV_BASELINE`
- `OPTION_E_OTHER_SAFE_OPTION`

Decision criteria:

- boundary safety
- low overengineering risk
- utility for the next step
- auditability
- Aggregator isolation
- productive skill isolation
- absence of Target real access
- absence of persistence
- fixture-only and in-memory-only compatibility

## 7. Option A - Test Hardening

Recommendation: `ACCEPT`

Objective:

Plan a future, separately authorized hardening pass for
`dry-run-only-materializer-prototype.test.mjs`.

Benefit:

This improves confidence that the already implemented prototype fails closed
across boundary-sensitive request variants without adding a checker, runtime
runner, Target access, or persistence.

Boundary risk:

Low if the future phase remains test-only, fixture-only, model-only,
in-memory-only, and does not add filesystem access or runtime output.

Bloat risk:

Low to medium. The future plan must keep cases focused on contract boundaries
and avoid duplicating every contract as test code.

Runtime-conversion risk:

Low if the test file imports only the prototype and fixture model and never
becomes a CLI, runner, smoke harness, report generator, or Aggregator child.

Aggregator risk:

Low if the prototype test remains outside
`check-validation-harness-aggregator.mjs` and outside the official 9-check
list.

Target-real risk:

Low. Test data must remain conceptual request objects only.

Persistence risk:

Low. Tests must not write stdout captures, JSON reports, Markdown reports,
caches, snapshots, temp outputs, generated artifacts, or materialized outputs.

Files probably affected in a later authorized implementation phase:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- possibly `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs` only for fixture-model helper cases

Files expected for the immediate next planning phase:

- `reference/materialization_lab/DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN.md`

Future validations needed:

- prototype test passes
- 9 official checks pass
- Aggregator passes unchanged
- no new checker exists
- no Aggregator child list change exists
- no persistent output exists

Future audit needed:

- audit that new tests are boundary-hardening only
- audit that no runtime behavior or Target access was introduced
- audit that no official checker or Aggregator integration was added

Justification:

The current implementation has a useful baseline but still benefits from more
negative evidence around request shape, source roots, contract refs, template
refs, disguised positive approval, path traversal, invalid operation tokens,
result shape, no-read/no-write evidence, and non-authorization summary. This is
the strongest next step because it increases safety evidence while staying
isolated from runtime and Aggregator concerns.

## 8. Option B - Documentation Integration

Recommendation: `DEFER`

Objective:

Plan a future integration of the prototype baseline into Materialization Lab
documentation such as `README.md`, `reference/MANIFEST.md`, validation docs, or
contracts.

Benefit:

This would make the implemented prototype more discoverable and reduce
confusion about its current dev-only status.

Boundary risk:

Medium. Documentation integration could accidentally describe the prototype as
an official materializer, runtime contract, or production path unless tightly
worded.

Bloat risk:

Medium. Multiple docs could repeat the same non-authorization language.

Runtime-conversion risk:

Medium if documentation implies the prototype is a runtime entrypoint,
materializer runner, or validation requirement.

Aggregator risk:

Low to medium. Documentation must not imply Aggregator inclusion or a tenth
check.

Target-real risk:

Low if docs preserve no-target-real wording.

Persistence risk:

Low if docs preserve no persistent report wording.

Files probably affected in a later authorized phase:

- `reference/materialization_lab/README.md`
- `reference/MANIFEST.md`
- possibly `reference/materialization_lab/validation/STATIC_CHECKS.md`
- possibly `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- possibly `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`

Future validations needed:

- 9 official checks pass
- Aggregator passes unchanged
- documentation contains no runtime authorization
- documentation contains no Target real or persistence authorization

Future audit needed:

- audit wording for non-authorization
- audit that contracts are not relaxed or reinterpreted
- audit that the prototype is not documented as official runtime materializer

Justification:

Documentation integration is safe only after stronger prototype test evidence.
It is useful but more likely than test hardening to cause semantic drift if it
touches broad reference documents too early.

## 9. Option C - Separate Prototype Checker

Recommendation: `DEFER`

Objective:

Plan a future separate checker such as
`scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`.

Benefit:

A separated checker could provide a crisp pass/fail surface for prototype
boundary behavior without relying on direct test command knowledge.

Boundary risk:

Medium to high. A checker can easily become a runner, stdout contract, report
generator, or pseudo-runtime.

Bloat risk:

High for the current moment. The existing prototype test already provides a
direct validation surface.

Runtime-conversion risk:

Medium to high unless the future checker is carefully constrained to
zero-argument, read-only, no-target, no-report behavior.

Aggregator risk:

High. The primary risk is pressure to add it as a tenth Aggregator child check,
which is explicitly forbidden for this decision and not recommended as the
next move.

Target-real risk:

Low to medium depending on whether the checker is designed to accept paths.
Any target path argument must remain forbidden.

Persistence risk:

Medium. Checker design often invites persistent reports or stdout capture; both
remain prohibited.

Files probably affected in a later authorized phase:

- `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`
- possibly `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
- possibly validation documentation, only if separately authorized

Future validations needed:

- checker blocks all arguments
- checker is stdout-only
- checker has no write-capable persistence behavior
- checker is not added to the Aggregator
- prototype test still passes independently
- 9 official checks and Aggregator pass unchanged

Future audit needed:

- audit that checker is not a materializer runner
- audit that checker is not a persistent report generator
- audit that checker is not an Aggregator child

Justification:

This may become useful later, but it is not the safest next capability. The
current need is stronger direct test coverage, not another executable surface.

## 10. Option D - Freeze as Dev Baseline

Recommendation: `DEFER`

Objective:

Freeze the current prototype as a dev-only baseline and move to another
Materialization Lab front without evolving this prototype now.

Benefit:

This has the lowest immediate change footprint and reduces overengineering
risk.

Boundary risk:

Very low. Freezing does not add Target access, persistence, runtime behavior,
or Aggregator integration.

Bloat risk:

Very low.

Runtime-conversion risk:

Very low if the freeze explicitly says dev-only and non-production.

Aggregator risk:

Very low.

Target-real risk:

Very low.

Persistence risk:

Very low.

Files probably affected in a later authorized phase:

- possibly one baseline freeze plan document under `reference/materialization_lab/`

Future validations needed:

- prototype test passes
- 9 official checks pass
- Aggregator passes unchanged
- no prototype files changed

Future audit needed:

- audit that freeze language does not authorize productive use
- audit that baseline does not imply Target real integration

Justification:

Freezing is safe, but it leaves obvious boundary-test gaps unplanned. It is
better as a fallback after a test-hardening plan or if the lab intentionally
pauses the prototype.

## 11. Option E - Other Safe Option

Recommendation: `REJECT`

Objective:

Consider another safe documentary/dev-only/read-only option.

Benefit:

No stronger alternative was identified.

Boundary risk:

Unknown options are higher-risk than the listed controlled paths unless they
are separately justified.

Bloat risk:

Medium to high because an undefined option can expand scope.

Runtime-conversion risk:

Unknown.

Aggregator risk:

Unknown.

Target-real risk:

Unknown.

Persistence risk:

Unknown.

Files probably affected in a later authorized phase:

- none identified

Future validations needed:

- not applicable

Future audit needed:

- not applicable

Justification:

No alternative beats focused test-hardening planning on safety, usefulness, and
auditability.

## 12. Decision Matrix

| Option | Boundary safety | Utility | Bloat risk | Runtime risk | Aggregator risk | Target real risk | Persistence risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `OPTION_A_TEST_HARDENING` | High | High | Low/Medium | Low | Low | Low | Low | `ACCEPT` |
| `OPTION_B_DOCUMENTATION_INTEGRATION` | Medium/High | Medium | Medium | Medium | Low/Medium | Low | Low | `DEFER` |
| `OPTION_C_SEPARATE_PROTOTYPE_CHECKER` | Medium | Medium | High | Medium/High | High | Low/Medium | Medium | `DEFER` |
| `OPTION_D_FREEZE_AS_DEV_BASELINE` | Very High | Medium/Low | Very Low | Very Low | Very Low | Very Low | Very Low | `DEFER` |
| `OPTION_E_OTHER_SAFE_OPTION` | Unknown | Unknown | Medium/High | Unknown | Unknown | Unknown | Unknown | `REJECT` |

## 13. Recommended Next Capability

Recommended next phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN`

Allowed shape of that next phase:

- documentary planning only unless separately authorized otherwise
- no test implementation unless a later implementation phase explicitly allows it
- no checker creation
- no Aggregator alteration
- no Target real access
- no persistent report
- no GitHub write
- no productive skill mutation

Suggested future hardening topics:

- invalid top-level request shapes
- empty or malformed `agent_ids`
- invalid `canonical_target_id`
- invalid and incomplete `source_roots`
- incomplete `contract_refs`
- invalid `template_refs`
- disguised positive approval semantics
- path traversal and host path variants
- invalid planned operation tokens
- output shape assertions
- no-read/no-write evidence assertions
- non-authorization summary assertions

## 14. Rejected/Deferred Options

Deferred:

- `OPTION_B_DOCUMENTATION_INTEGRATION`
- `OPTION_C_SEPARATE_PROTOTYPE_CHECKER`
- `OPTION_D_FREEZE_AS_DEV_BASELINE`

Rejected:

- `OPTION_E_OTHER_SAFE_OPTION`

Documentation integration is deferred until stronger test-hardening evidence
exists. A separate checker is deferred because it adds another executable
surface and may pressure Aggregator expansion. Baseline freeze is deferred
because a focused test-hardening plan provides more safety value before any
freeze or broader documentation integration.

## 15. Required Boundaries for Next Phase

The next phase must preserve:

- dev-only
- fixture-only
- model-only
- in-memory-only
- no-write
- no-target-real
- no-GitHub
- no productive skill mutation
- explicit templates only
- final sources from `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`
- `reference/agents/` prohibited as final source
- planned-only operation tokens
- Write Approval still-no-write
- Dry-run Report Model non-persistence
- Aggregator unchanged with exactly 9 official checks

## 16. Forbidden Behaviors for Next Phase

The next phase must not authorize:

- Target real read
- Target real write
- filesystem stat against Target real
- directory listing against Target real
- file-content read from Target real
- writer real
- renderer real
- loader runtime
- scenario selector runtime
- real Target Adapter
- real Write Approval
- approval token
- approval registry
- signer
- persistent report
- stdout capture persistence
- generated artifact
- materialized output
- applied patch
- GitHub write
- commit
- branch
- pull request
- productive skill mutation
- Aggregator alteration
- tenth Aggregator child check
- new checker in the planning phase
- runtime materializer
- materializer runner

## 17. Expected Files for Next Phase

Expected immediate next-phase artifact:

- `reference/materialization_lab/DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN.md`

Possible files for a later, separately authorized test-hardening implementation
phase:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`
- possibly `scripts/materialization_lab/dry-run-only-materializer-prototype.fixture-model.mjs`

Forbidden next-phase file changes:

- `skills/stnl_project_agent_specializer/`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `scripts/materialization_lab/check-dry-run-only-materializer-prototype.mjs`
- any real Target path
- any persistent report, cache, snapshot, temp output, generated artifact, or
  materialized output

## 18. Validation Expectations

For this decision phase:

- prototype test must pass
- 9 official checks must pass
- Aggregator must pass unchanged
- no new checker may exist
- no Aggregator child list may change
- no persistent output may be created

For the recommended next planning phase:

- the plan must define focused test-hardening scope
- the plan must keep tests fixture-only, model-only, in-memory-only, and
  no-write
- the plan must not authorize implementation unless a later phase explicitly
  allows it

For a later implementation phase, if separately authorized:

- the prototype test must continue to be a direct local test, not an Aggregator
  child
- added cases must not require real filesystem Target access
- assertions must include no-read/no-write evidence and non-authorization
  evidence

## 19. Audit Expectations

Future audit of the recommended next phase must verify:

- no runtime capability was introduced
- no checker was created by the planning phase
- no Aggregator change was made
- no tenth child check was introduced
- no real Target was read or written
- no filesystem stat, directory listing, or file-content read against Target
  real was introduced
- no persistent report, cache, snapshot, stdout capture, temp output, generated
  artifact, or materialized output was created
- no GitHub write, commit, branch, pull request, or merge occurred
- no productive skill mutation occurred
- boundaries and contracts remain preserved

## 20. Blocking Conditions

This decision or its recommended next phase must block if it would require:

- Target real access
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
- GitHub write
- commit, branch, or pull request
- productive skill mutation
- `reference/agents/` as final source
- inferred template
- filesystem write outside the explicitly authorized decision artifact
- Target filesystem read
- stdout capture persistence
- Aggregator alteration
- tenth Aggregator child check
- new implementation in this decision phase
- new checker in this decision phase
- runtime materializer behavior

## 21. Excellent Pass Expectations

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_NEXT_CAPABILITY_DECISION:
EXCELLENT PASS` may be declared by a later audit only when:

- this document remains documentary/dev-only/read-only
- exactly one decision artifact was created by this phase
- no new capability was implemented
- no new checker was created
- Aggregator was not altered
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
- Write Approval remains still-no-write
- prototype test passes
- 9 official checks pass
- Aggregator passes unchanged
- recommended next phase is safe and separate

## 22. Final Status

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_NEXT_CAPABILITY_DECISION: READY`

Next recommended phase:

`MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST_HARDENING_PLAN`

This next phase must be separately authorized and must begin as planning. It
must not automatically expand runtime behavior, create a checker, alter the
Aggregator, persist output, touch Target real, write GitHub, or mutate the
productive skill.
