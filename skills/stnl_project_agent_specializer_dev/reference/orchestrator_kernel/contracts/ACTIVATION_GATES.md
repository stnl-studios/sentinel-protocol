# Orchestrator Kernel Activation Gates

Status: experimental activation-gates contract.

This document defines the activation gates for the future experimental
`orchestrator kernel` inside `stnl_project_agent_specializer_dev`.

It is a documentation contract only. It does not implement a runtime loader,
module execution, experimental materialization, static checks, golden tests, or
real gate evaluation.

## Purpose

Activation gates decide whether a module cataloged in the module index may be
considered for a future request, repo state, target boundary, authority level,
and risk profile.

The module index lists known modules. Activation gates decide future eligibility
to consider those modules. A module listed in the index is still unavailable for
optional behavior unless the applicable gate allows consideration.

Activation gates do not grant authority. Authority must still come from the
human request, root/main session, canonical workflow, owner contract, target
runtime boundary, and explicit scope.

Activation gates do not replace the minimum safe bundle. No gate may weaken,
override, make optional, or bypass any non-optional protection in the bundle.

Activation gates do not replace canonical base agents. They may help decide
whether optional module behavior can be considered, but they cannot absorb
owner responsibilities, redefine owner gates, or supersede canonical base-agent
contracts.

Activation gates do not execute modules, materialize artifacts, validate
outputs, delete files, write final artifacts, or prove correctness by
themselves.

## Relationship To Existing Documents

`reference/orchestrator_kernel/contracts/CONTRACT.md` defines the kernel boundary and the
non-delegable routing and safety responsibilities that must remain active before
any optional module can matter.

`reference/orchestrator_kernel/contracts/MINIMUM_SAFE_BUNDLE.md` defines the mandatory
protection bundle that stays active when no optional module is present and when
optional modules are considered.

`reference/orchestrator_kernel/contracts/MODULE_INDEX.md` catalogs known future modules,
their required context, dependencies, conflicts, outputs, and fallback behavior.

This document sits after those documents. It defines how future eligibility is
classified without duplicating the kernel contract, the safe bundle, or the
module index.

## Gate Levels

### Gate 0 - Always-on

Gate 0 is the mandatory safety floor.

It includes the kernel contract, the minimum safe bundle, and all non-optional
protections needed for safe routing. Gate 0 is not an optional module, is not
cataloged optional behavior, and cannot be disabled.

Gate 0 applies even when the module index is missing, activation gates cannot be
evaluated, optional modules are absent, or all optional modules are blocked.

### Gate 1 - Auto-safe Candidate

Gate 1 is for small, low-risk modules that may become candidates for future
automatic consideration.

Gate 1 requires clear minimum context, clear authority boundaries, clear scope,
module-index presence, compatible status, no missing dependencies, and no
conflict with Gate 0 protections.

Gate 1 modules must never execute, write, materialize, delete, validate by
themselves, replace an owner, grant authority, or substitute for a canonical
base agent.

Gate 1 means candidate eligibility only. It does not mean current runtime
runtime auto-activation now.

### Gate 2 - Conditional

Gate 2 is for modules that require stronger context, a valid upstream signal,
specific owner or workflow authority, or a narrower precondition than Gate 1.

Gate 2 modules may be considered only when every required condition is present:
valid upstream output when required, explicit scope, sufficient authority,
available dependencies, compatible module status, and no unresolved conflict.

If any requirement is absent, stale, ambiguous, or outside authority, the module
must block, safe stop, or request the minimum missing context when requesting
context is authorized.

Gate 2 must never become an automatic execution path.

### Gate 3 - Stop/block

Gate 3 is for unavailable or unsafe experimental behavior.

Gate 3 applies to modules without sufficient contract, gates, checks, tests,
dependencies, authority, context, or compatibility. It also applies when module
requirements conflict, when dependencies are absent, or when the request is too
ambiguous to classify safely.

Gate 3 output must be a safe stop, explicit block, or narrower behavior allowed
by Gate 0. It must not trigger fallback execution, invented artifacts, inferred
module behavior, or experimental materialization.

## Evaluation Order

Future gate evaluation must follow this safe order:

1. Apply Gate 0 always.
2. Verify authority for the requested decision and possible next action.
3. Verify scope, including repo boundary, allowed paths, forbidden paths,
   target boundary, and requested work boundary.
4. Verify that the module exists in
   `reference/orchestrator_kernel/contracts/MODULE_INDEX.md`.
5. Verify the module status in the module index.
6. Verify required context for the module and decision type.
7. Verify dependencies.
8. Verify conflicts.
9. Classify the module into the applicable gate.
10. Choose the most restrictive behavior when doubt remains.

Evaluation is conservative. Any ambiguity in authority, scope, module identity,
status, context, dependency, or conflict must reduce behavior or block.

## Initial Module Mapping

This mapping is an experimental contract, not a runtime implementation.

| Module | Initial gate | Meaning |
| --- | --- | --- |
| `routing.basic` | Gate 1 candidate | Small routing-support candidate, but not auto-activatable in runtime by this contract. |
| `context.missing_info` | Gate 1 candidate | Missing-context classification candidate, but not auto-activatable in runtime by this contract. |
| `validation.boundary` | Gate 1 candidate | Lightweight boundary validation candidate, but not auto-activatable in runtime by this contract. |
| `routing.execution_package` | Gate 2 conditional | Requires valid upstream context, explicit scope, and stronger owner/workflow authority. |
| `materialization.experimental` | Gate 3 stop/block | Runtime/main-flow materialization remains blocked. The previous local materializer route is frozen; generated artifacts, generated reports, and target-repo writes are not active deliverables. |
| `checks.static` | Gate 3 stop/block | static-check contract and local read-only static-check harness exist, but runtime module activation and materialization remain blocked; checks do not grant authority or release materialization by themselves. |
| `tests.golden_critical` | Gate 3 stop/block | structural and semantic golden-test contracts exist for `GT-001`, `GT-002`, and `GT-SEM-001` through `GT-SEM-006`, and the local read-only golden-test harness exists, but real execution remains blocked until fixtures, expected outputs, runtime harness, and authorized execution rules exist; golden tests do not grant authority or release materialization by themselves. |

`safe_to_auto_activate` in the module index means only that a module may be a
future candidate. It does not mean automatic activation is available now.

## Criteria By Gate

### Gate 0 - Always-on Criteria

Minimum requirements:

- kernel contract is applicable
- minimum safe bundle is applicable
- current request, scope, and authority are interpreted through non-optional
  safety rules

Permitted signals:

- any request handled by the future kernel
- missing module index, missing gates, or unavailable optional modules
- ambiguous context that requires safe stop or minimum-context request

Blockers:

- attempt to disable kernel or safe-bundle protections
- attempt to make authority, scope, safe stop, or canonical base-agent respect
  optional
- request to bypass the main flow through experimental behavior

Fallback behavior:

- use mandatory kernel and safe-bundle behavior
- safe stop when no safe route exists
- request minimum context only when authorized

Expected output:

- minimum routing decision, minimum context request, narrower safe behavior, or
  explicit blocker

### Gate 1 - Auto-safe Candidate Criteria

Minimum requirements:

- module exists in the module index
- module status is compatible with future optional consideration
- required context is present and narrow
- authority boundary is explicit and sufficient for consideration
- scope is explicit and compatible
- dependencies are present
- no conflict with Gate 0, canonical owners, or requested boundary

Permitted signals:

- routing-level classification is needed
- missing context can be named without broad discovery
- scope or boundary constraints need lightweight classification
- module is marked as a future auto-safe candidate in the module index

Blockers:

- missing or ambiguous authority
- missing or ambiguous scope
- missing module-index entry
- missing dependency
- conflict with safe-bundle protection or canonical owner responsibility
- request requires execution, write, deletion, materialization, review,
  validation execution, closure, or owner replacement

Fallback behavior:

- reduce to Gate 0 behavior
- request minimum context when authorized
- safe stop with concrete blocker when the gap cannot be resolved safely

Expected output:

- candidate eligibility decision, narrowed routing support, named missing
  context, boundary status, or blocker

### Gate 2 - Conditional Criteria

Minimum requirements:

- all Gate 1 requirements that apply
- specific upstream output is present when required
- owner or workflow authority is strong enough for the conditional decision
- acceptance criteria, scope, and payload boundary are concrete when the module
  prepares a downstream handoff
- stale or invalid upstream handoffs have been rejected

Permitted signals:

- authorized planning output or equivalent upstream brief is available
- next safe owner appears to require execution-package design
- current authorized boundary permits conditional handoff preparation
- module dependencies and owner references are available

Blockers:

- missing plan, upstream output, scope, authority, owner reference, acceptance
  criteria, or payload boundary
- stale, invalid, or ambiguous upstream handoff
- request to execute directly
- request to write or materialize artifacts through the conditional module
- unresolved conflict with another module or Gate 0 protection

Fallback behavior:

- route back to planning when authorized
- request the minimum missing context when authorized
- safe stop with concrete blocker when requirements cannot be satisfied

Expected output:

- conditional eligibility decision, compact handoff payload boundary, route back
  to required upstream owner, minimum-context request, or blocker

### Gate 3 - Stop/block Criteria

Minimum requirements:

- a concrete blocker, unavailable status, missing dependency, conflict, missing
  contract, missing checks, missing tests, insufficient authority, or ambiguous
  context exists

Permitted signals:

- module is marked unavailable for the current authorized boundary
- materialization, executable static checks, or golden tests are requested
  before their required contracts, implementations, harnesses, authorization,
  or execution rules exist
- dependencies, checks, tests, harnesses, or expected outputs are absent
- conflict cannot be resolved into narrower Gate 0 behavior

Blockers:

- absent module-index entry
- missing activation gates or inability to evaluate them
- missing contract, dependency, checks, tests, harness, target boundary, or
  explicit write authority
- conflict with production skill, production templates, main flow, safe bundle,
  or canonical base-agent ownership

Fallback behavior:

- safe stop or explicit block
- narrower Gate 0 behavior only when it does not imply optional module use
- no inferred pass from missing checks or tests

Expected output:

- `BLOCKED`, `SAFE_STOP`, unavailable status, or narrower safe behavior with the
  concrete reason named

## Global Rules

- When in doubt, choose the most restrictive gate.
- A module absent from the module index is unavailable.
- A missing dependency blocks the module.
- A conflict between modules blocks or reduces behavior to the narrower safe
  behavior allowed by Gate 0.
- An activation signal is not authorization.
- `safe_to_auto_activate` does not mean current automatic activation.
- Gates cannot make any minimum-safe-bundle rule optional.
- Gates cannot replace canonical base agents or owner contracts.
- Gates cannot authorize writing to final artifacts.
- Gates cannot authorize execution, deletion, validation, closure, or review by
  themselves.
- Gates cannot activate runtime/main-flow experimental materialization. The
  current dev route is kernel-lab comparison only; any future materialization
  path must be rebuilt later under a new authorized contract.
- Gates cannot treat missing static checks as a pass.
- Gates cannot treat missing golden tests as regression proof.
- Gates cannot use optional behavior to alter the main Sentinel flow.

## Acceptance Criteria

This activation-gates contract answers the gate questions as follows:

- How to decide whether a module can be considered? Apply Gate 0, verify
  authority, scope, module-index presence, status, required context,
  dependencies, and conflicts, then classify conservatively.
- Which gates exist? Gate 0 always-on, Gate 1 auto-safe candidate, Gate 2
  conditional, and Gate 3 stop/block.
- Which modules enter which initial gate? The initial mapping is defined in
  this document and covers every module in the module index.
- What happens when there is ambiguity? The future evaluator must choose the
  most restrictive gate, reduce behavior, request minimum context when
  authorized, or safe stop.
- What happens when context, dependency, or authority is missing? The module
  blocks, reduces to Gate 0 behavior, requests minimum context when authorized,
  or safe stops with a concrete blocker.
- Why are gates not an authorization mechanism? Gates classify eligibility to
  consider optional modules; they do not grant human, root/main, owner, runtime,
  write, delete, execution, validation, closure, or materialization authority.
- Why do materialization, checks, and golden tests remain blocked?
  `checks.static` has a static-check contract and a local read-only static-check harness
  for CH-001 through CH-010, but runtime module activation, broader execution
  rules, and materialization authority still require authorized adoption.
  `tests.golden_critical` has structural and semantic golden-test contracts for
  `GT-001`, `GT-002`, and `GT-SEM-001` through `GT-SEM-006`, plus a local
  read-only golden-test harness, but real execution still requires fixtures,
  expected outputs, a runtime harness, explicit execution rules, and authorized
  adoption. Runtime/main-flow materialization is not active in this route;
  static checks or golden tests alone do not grant authority.

## Explicitly Out Of Scope

This contract does not implement:

- runtime loader
- experimental materialization
- static checks
- golden tests
- kernelization of the other agents
- complete Project Senior Profile
- changes to the main Sentinel flow
- production template changes
- smoke changes
- real gate execution

This document only defines the formal activation-gates contract for the future
experimental orchestrator kernel.
