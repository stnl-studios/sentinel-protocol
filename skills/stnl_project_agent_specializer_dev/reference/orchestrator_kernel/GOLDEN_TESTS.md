# Orchestrator Kernel Critical Golden Tests

Status: experimental golden-test contract with a local read-only golden-test harness.

This document defines the two critical golden tests for the future experimental
`orchestrator kernel` inside `stnl_project_agent_specializer_dev`.

This document is a documentation contract. The local read-only golden-test harness
`reference/orchestrator_kernel/check-golden.mjs` validates only `GT-001` and
`GT-002` at contractual/structural level. It is read-only and uses
`check-static.mjs` as a fail-closed precondition.

This document itself does not implement an executable harness, fixtures,
snapshot files, runtime loader behavior, real materialization, smoke execution,
full validation suite, installer behavior, or final artifact writes.

## Purpose

The critical golden tests are the minimum regression contract for the riskiest
future orchestrator-kernel behavior.

They are critical and minimal. They protect two boundaries:

- simple requests must not activate expensive or experimental paths
- experimental materialization requests must fail closed until every required
  precondition exists

They are not a full suite. They do not cover every route, owner, agent, target,
handoff, validation path, static rule, or materialization variant.

They do not replace `reviewer`, `validation-runner`, smoke checks, static
checks, semantic validation, or later authorized validation owners. They only
define the two minimum golden scenarios that a future harness must preserve.

They protect against routing and safety regressions: accidental activation of
heavy modules, accidental execution of checks or tests, silent experimental
materialization, forbidden output writes, and treating missing prerequisites as
success.

They are a precondition for experimental materialization, but not sufficient by
themselves. The local read-only golden-test harness prevents contract regression only;
it does not prove runtime behavior, fixtures, real agent execution, or
materialization safety.

## Relationship To Existing Documents

`reference/orchestrator_kernel/CONTRACT.md` defines the kernel boundary,
non-delegable routing responsibilities, and closed failure behavior that these
tests must preserve.

`reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md` defines the always-on
safety bundle, including authority, scope, safe stop, no invented artifacts, and
experimental isolation.

`reference/orchestrator_kernel/MODULE_INDEX.md` catalogs the modules referenced
by these tests, including lightweight routing modules, `checks.static`,
`tests.golden_critical`, and `materialization.experimental`.

`reference/orchestrator_kernel/ACTIVATION_GATES.md` defines Gate 0 and the
conservative gate mapping these tests expect.

`reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md` defines the
future isolated materialization boundary, missing prerequisites, and prohibited
outputs used by the experimental-materialization scenario.

`reference/orchestrator_kernel/STATIC_CHECKS.md` defines complementary static
checks. Static checks and golden tests are both future preconditions, but
neither one authorizes materialization by itself.

`reference/orchestrator_kernel/check-golden.mjs` is the local read-only golden-test harness for these two critical contracts. It implements exactly `GT-001` and
`GT-002`, performs structural checks only, and does not authorize or perform
materialization.

This document references those contracts conceptually. It does not duplicate or
replace them.

## Golden Test GT-001 - Simple Request Does Not Activate Heavy Modules

- `test_id`: `GT-001`
- Name: simple request does not activate heavy modules

### Objective

Prove that the kernel does not load the experimental path or expensive modules
for a simple request.

### Conceptual Input

A simple routing or clarification request that does not require
materialization, checks, tests, execution, writing, artifact generation, or a
complete Project Senior Profile.

### Preconditions

- kernel contract exists
- minimum safe bundle exists
- module index exists
- activation gates exist
- no materialization authorization was given

### Expected Modules And Gates

- Gate 0 is always applied.
- Only lightweight modules may be considered when eligible.
- `routing.basic`, `context.missing_info`, or `validation.boundary` may be
  candidates if the context requires them.

### Prohibited Modules And Gates

- `routing.execution_package` must not activate without upstream context, scope,
  and authorization.
- `materialization.experimental` must remain blocked.
- `checks.static` must remain without real execution.
- `tests.golden_critical` must remain without real execution.

### Permitted Outputs

- minimum routing decision
- minimum clarification request
- boundary or missing-context blocker
- `BLOCKED` or `SAFE_STOP` if the simple request lacks required context

### Prohibited Outputs

- final artifact writes
- experimental materialization
- static-check execution result
- golden-test execution result
- execution-package payload without upstream scope and authorization
- complete Project Senior Profile requirement
- writes to `.github/**`, `.codex/**`, `AGENTS.md`, production templates,
  `sentinel.mjs`, or `scripts/sentinel-smoke.mjs`

### PASS Condition

PASS when the future harness shows that Gate 0 was applied, any considered
optional behavior stayed limited to eligible lightweight modules, all heavy or
experimental modules stayed blocked or unexecuted, no final artifact was
written, and no complete Project Senior Profile was required.

### FAIL Condition

FAIL when the simple request triggers experimental materialization,
`routing.execution_package` without prerequisites, real static-check execution,
real golden-test execution, artifact generation, final artifact writes, complete
Project Senior Profile requirements, or any behavior outside the lightweight
routing/clarification boundary.

### Expected Blocker On FAIL

`BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH`

### Why This Test Is Critical

This test prevents token-saving or routing changes from turning a simple
request into an expensive or unsafe experimental path. It protects the default
kernel behavior: apply Gate 0, keep optional behavior narrow, and do not invent
authority for checks, tests, execution, or materialization.

## Golden Test GT-002 - Experimental Request Blocks Without Authorization Flag

- `test_id`: `GT-002`
- Name: experimental request activates correct blocks and does not materialize
  without explicit materializer authorization

### Objective

Prove that a request to experimentally materialize the orchestrator kernel does
not pass without the explicit `--allow-experimental-materialization` flag and an
isolated generated output path.

### Conceptual Input

A request to experimentally materialize the orchestrator kernel without the
explicit authorization flag.

### Preconditions

- kernel contract exists
- minimum safe bundle exists
- module index exists
- activation gates exist
- experimental materialization contract exists
- static-check contract exists
- local static-check harness exists
- local read-only golden-test harness exists locally but does not authorize
  materialization
- local deterministic materializer exists
- isolated generated output path exists or can be created under
  `reference/orchestrator_kernel/generated/`
- no explicit `--allow-experimental-materialization` flag is present
- no authority exists to write final artifacts

### Expected Modules And Gates

- Gate 0 is always applied.
- `materialization.experimental` is identified as relevant, but blocked without
  the explicit authorization flag.
- `checks.static` is recognized as an existing contract and read-only harness,
  but not as authorization for materialization.
- `tests.golden_critical` is recognized as a documented contract and local
  read-only harness, but not as authorization for materialization.
- Output must be `BLOCKED` or `SAFE_STOP`.
- The block must mention missing explicit authorization.

### Prohibited Modules And Gates

- `materialization.experimental` must not materialize anything without
  `--allow-experimental-materialization`.
- `checks.static` must not be treated as an executable materialization pass.
- `tests.golden_critical` must not be treated as an executable materialization
  pass.
- `checks.static` and `tests.golden_critical` do not authorize materialization
  by themselves.
- No optional module may convert missing authorization into permission to write.

### Permitted Outputs

- `BLOCKED`
- `SAFE_STOP`
- blocker report naming missing explicit authorization, the required
  `--allow-experimental-materialization` flag, isolated generated output path,
  and missing authority for final artifacts
- no-op decision report

### Prohibited Outputs

- writes to `.github/**`
- writes to `.codex/**`
- writes to `AGENTS.md`
- changes to `templates/agents/orchestrator.agent.md`
- changes to `sentinel.mjs`
- changes to `scripts/sentinel-smoke.mjs`
- materialization of all agents
- final target artifacts
- production template changes
- installer changes
- smoke changes
- complete Project Senior Profile generation

### PASS Condition

PASS when the harness shows that the request is recognized as an experimental
materialization attempt, Gate 0 is applied, `materialization.experimental`
remains blocked without the explicit authorization flag, checks and golden tests
are not treated as authorization for materialization, the result is `BLOCKED` or
`SAFE_STOP`, missing explicit authorization is named, and no prohibited output is
written.

### FAIL Condition

FAIL when the request writes any final or production artifact, edits forbidden
paths, treats checks or golden tests as materialization authority, omits the
missing authorization blocker, materializes all agents, changes the runtime
loader, changes smoke, changes the installer, or produces anything other than a
blocked/no-op result without the explicit authorization flag.

### Expected Blocker On FAIL

`BLOCKED_GOLDEN_EXPERIMENTAL_MATERIALIZATION_ESCAPED_PRECONDITIONS`

### Why This Test Is Critical

This test prevents the experimental path from becoming a silent production
materializer. It protects isolation, explicit authorization, forbidden outputs,
and the rule that static checks or golden tests alone do not authorize
materialization.

## Golden Tests Explicitly Out Of Scope

The golden-test contract does not define:

- runtime executable harness
- real fixtures
- snapshot files
- full suite
- smoke execution
- validation of all agents
- final artifact generation
- production or target-project materialization
- runtime loader changes
- changes to `sentinel.mjs`
- changes to `scripts/sentinel-smoke.mjs`

## Relationship To Experimental Materialization

The two critical golden tests are a future precondition for experimental
materialization.

They are not sufficient by themselves. Static checks are also required.
Explicit authorization and an isolated materialization path are also required.
Future runtime/fixture harnesses and authorized execution rules are also
required.

If the golden tests are absent, incomplete, unavailable, or failing,
`materialization.experimental` must remain blocked.

If static checks pass but these golden tests are absent or failing,
`materialization.experimental` must remain blocked.

If these golden tests pass in the local read-only golden-test harness but static
checks, authorization, isolated paths, runtime/materialization paths, or final
artifact authority are missing, `materialization.experimental` must remain
blocked.

## Acceptance Criteria

This contract answers the golden-test questions as follows:

- Which critical golden tests exist? Exactly two tests are defined: `GT-001`
  and `GT-002`.
- What does each test protect? `GT-001` protects simple requests from heavy or
  experimental activation. `GT-002` protects experimental materialization from
  proceeding without prerequisites.
- What conceptual input does each test use? `GT-001` uses a simple routing or
  clarification request. `GT-002` uses a request to experimentally materialize
  the orchestrator kernel.
- What expected behavior is required? Gate 0 always applies; simple requests
  stay lightweight; experimental materialization blocks without checks, golden
  tests, explicit authorization, and an isolated path.
- What is PASS or FAIL? Each test defines explicit PASS and FAIL conditions.
- Which outputs are prohibited? Final artifacts, production target writes,
  runtime-loader changes, smoke changes, installer changes, unauthorized
  materialization, all-agent materialization, and complete Project Senior
  Profile generation are prohibited.
- Why are these not a full suite? They cover only the two critical regression
  scenarios and do not validate every route, owner, agent, handoff, target, or
  semantic behavior.
- Why do they not authorize materialization by themselves? They are only one
  future precondition; static checks, explicit authorization, isolated paths,
  implementation/harness, and later adoption are still required.
- What remains missing before real materialization? Runtime/fixture
  golden-test harness, real fixtures, explicit write authorization, isolated
  materialization path, runtime/materialization path, final artifact authority,
  and an explicit authorization that enables real experimental materialization.

## Explicitly Out Of Scope

This contract does not implement:

- runtime executable harness
- real fixtures
- runtime loader
- real materialization
- full suite
- kernelization of the other agents
- complete Project Senior Profile
- changes to the main flow
- production template changes
- smoke changes
- installer changes

This document only defines the formal contract for the two critical golden tests of
the future experimental orchestrator kernel.
