# Orchestrator Kernel Module Index

Status: experimental module catalog.

This document defines the initial module index for the future experimental
`orchestrator kernel` inside `stnl_project_agent_specializer_dev`.

It is a catalog of modules, not the full content or operational implementation
of those modules. It records which modules are known, what each one is for,
which context each one requires, what output each one may produce, and which
limits apply before any future activation or use.

The module index does not activate modules by itself. Activation gates are not
defined here. The activation-gates contract is specified in
`reference/orchestrator_kernel/ACTIVATION_GATES.md`.

A module absent from this index must be treated as unavailable. Absence means
the kernel cannot assume the module exists, cannot reconstruct it from memory,
and cannot use similar behavior as a fallback.

This index does not replace the minimum safe bundle or the kernel contract. It
does not grant authority, does not authorize writes, and does not weaken any
non-optional safety rule.

## Relationship To Existing Documents

`reference/orchestrator_kernel/CONTRACT.md` defines the experimental kernel
boundary: what stays in the kernel, what must not be delegated, and how future
layers relate.

`reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md` defines the mandatory
protection bundle that remains active even when no optional module is present.

This module index sits below those documents. It only names optional or future
modules and their catalog-level constraints. It must be interpreted through the
kernel contract and the minimum safe bundle, not used as a substitute for either.

## Entry Schema

Each module entry must include the following fields:

- `module_id`: Stable module identifier used by the future kernel or loader.
- `status`: Catalog status for the module. This is descriptive only and is not
  an activation decision.
- `purpose`: The narrow reason the module exists.
- `activation_signals`: Informational signals that may later help activation
  gates decide whether the module is relevant. These are not executable gates in
  this contract.
- `required_context`: Minimum context that must be present before the module can
  be considered by future gates.
- `outputs`: Outputs the module may produce if future gates allow it.
- `dependencies`: Other modules, contracts, gates, references, or authorities
  that must exist for the module to operate safely.
- `conflicts`: Modules, states, authorities, or scope conditions that make the
  module unsafe or require a narrower behavior.
- `safe_to_auto_activate`: Whether the module may ever be considered for future
  automatic activation. This field is not an activation gate.
- `token_cost_hint`: Catalog-level hint for expected prompt/token cost.
- `fallback_behavior`: What must happen when the module, required context, or a
  dependency is absent.
- `out_of_scope`: Behaviors this module must not perform.

Markdown is the source format for this catalog. No JSON or YAML representation is defined here.

## Global Rules

- No module may weaken, override, replace, or make conditional the minimum safe
  bundle.
- No module may replace canonical base agents or absorb their owner
  responsibilities.
- No module may activate experimental materialization by itself.
- No module may be used if it is not listed in this index.
- Missing dependencies must block the module or reduce behavior to the narrower
  safe behavior allowed by the kernel and minimum safe bundle.
- Conflict between modules must result in safe stop or the more restrictive
  behavior.
- The index does not grant authority.
- The index does not authorize writing to final artifacts.
- `activation_signals` are informational signals, not executable gates in this catalog.
- The kernel must treat stale, incomplete, or ambiguous module-index information
  as insufficient for optional behavior.
- Optional module output cannot make unauthorized execution, materialization,
  deletion, routing, validation, or closure safe.

## Initial Modules

### `routing.basic`

- `module_id`: `routing.basic`
- `status`: `cataloged_for_future_optional_use`
- `purpose`: Represent minimal safe routing support beyond the irreducible
  kernel decision. It may help identify the next safe routing-level action while
  keeping the module small.
- `activation_signals`:
  - request needs routing-level classification
  - current scope, gate, and authority are explicit
  - no deeper owner-specific reasoning is needed
  - future activation gates mark basic routing support as eligible
- `required_context`:
  - human request and objective
  - active repo boundary
  - allowed and forbidden paths when provided
  - current gate or authorized boundary when relevant
  - authority boundary for route, stop, or request-context decisions
  - canonical owner set available from the base-agent references when an owner
    must be named
- `outputs`:
  - next safe routing-level action: plan, route, validate, request context, or
    stop
  - candidate canonical owner class when safe
  - compact reason for the route
  - blocker when no safe route exists
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - future activation gates before any activation
  - canonical base-agent availability when naming an owner
- `conflicts`:
  - missing authority or scope
  - missing canonical owner reference when an owner must be selected
  - request requires execution, materialization, validation design, validation
    execution, review, closure, or resync work instead of routing
- `safe_to_auto_activate`: Candidate for future auto-safe activation only after
  gates exist. It is not auto-activatable in this catalog.
- `token_cost_hint`: `low`
- `fallback_behavior`: Use kernel minimum routing if sufficient; otherwise safe
  stop with the concrete missing context, authority, owner, or scope blocker.
- `out_of_scope`:
  - replacing owners
  - executing work
  - producing implementation plans
  - materializing artifacts
  - validating or reviewing implementation
  - relaxing safe-bundle rules

### `context.missing_info`

- `module_id`: `context.missing_info`
- `status`: `cataloged_for_future_optional_use`
- `purpose`: Represent explicit detection and reporting of missing context that
  blocks safe routing, owner selection, execution, validation, materialization,
  or closure.
- `activation_signals`:
  - the request lacks concrete scope, authority, phase, target, owner, artifact,
    path, or required evidence
  - routing would require speculation
  - future activation gates allow missing-context classification
- `required_context`:
  - current request
  - known scope and authority limits
  - required decision type
  - minimum safe bundle missing-context rules
  - available canonical references relevant to the decision
- `outputs`:
  - named missing context
  - whether the missing context blocks routing, execution, validation,
    materialization, deletion, closure, or owner selection
  - minimum next question or blocker
  - safe-stop status when the gap cannot be resolved in the current boundary
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - future activation gates before any activation
- `conflicts`:
  - broad discovery as a substitute for explicit missing context
  - speculative inference of unavailable artifacts, paths, modules, or owners
  - using hidden assumptions as context
- `safe_to_auto_activate`: Candidate for future auto-safe activation only after
  gates exist. It is not auto-activatable in this catalog.
- `token_cost_hint`: `low`
- `fallback_behavior`: Safe stop or ask for the minimum missing context when
  asking is authorized.
- `out_of_scope`:
  - broad repo discovery
  - speculative reconstruction
  - creating missing docs or artifacts
  - deciding owner work
  - bypassing authority checks

### `routing.execution_package`

- `module_id`: `routing.execution_package`
- `status`: `cataloged_for_future_optional_use`
- `purpose`: Represent preparation of a handoff toward execution-package design
  only when scope and authorization are sufficient.
- `activation_signals`:
  - the next safe owner appears to be `execution-package-designer`
  - planning output or an equivalent authorized brief is available
  - implementation scope, constraints, and acceptance criteria are concrete
  - future activation gates allow handoff preparation
- `required_context`:
  - authorized request or upstream owner output
  - concrete scope and phase
  - owner authority for execution-package design
  - boundaries for allowed and forbidden files
  - known blockers or open questions
  - current target/runtime constraints when relevant
- `outputs`:
  - compact handoff payload for execution-package design
  - reason the route is eligible
  - blockers that prevent execution-package design
  - payload boundary stating what is and is not included
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - `routing.basic`
  - future activation gates before any activation
  - canonical `execution-package-designer` owner contract when owner routing is
    required
- `conflicts`:
  - missing plan, scope, authorization, owner, or acceptance criteria
  - request to execute directly
  - request to materialize artifacts
  - stale or invalid upstream handoff
- `safe_to_auto_activate`: No. It requires future gates and sufficient upstream
  authority; it must not become an automatic execution path.
- `token_cost_hint`: `medium`
- `fallback_behavior`: Route to planning, request minimum context when
  authorized, or safe stop with a concrete blocker.
- `out_of_scope`:
  - executing work
  - materializing files
  - designing full validation
  - replacing planner or execution-package-designer
  - inventing missing acceptance criteria

### `validation.boundary`

- `module_id`: `validation.boundary`
- `status`: `cataloged_for_future_optional_use`
- `purpose`: Represent lightweight validation of scope, authority, paths, and
  phase before optional routing or future experimental behavior proceeds.
- `activation_signals`:
  - request includes explicit allowed or forbidden paths
  - request is phase-bounded
  - operation may cross authority or target boundaries
  - future activation gates allow boundary validation
- `required_context`:
  - requested boundary
  - allowed paths and forbidden paths
  - repo root and target boundary when relevant
  - authority level for the requested action
  - intended next action
- `outputs`:
  - boundary status: pass, narrower behavior required, or stop
  - concrete boundary blocker
  - list of relevant scope constraints for a future handoff
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - future activation gates before any activation
- `conflicts`:
  - ambiguous repo root
  - absent path authority
  - request to edit forbidden paths
  - request to continue beyond the requested boundary
  - attempt to convert this module into a full validation suite
- `safe_to_auto_activate`: Candidate for future auto-safe activation only after
  gates exist. It is not auto-activatable in this catalog.
- `token_cost_hint`: `low`
- `fallback_behavior`: Apply kernel and safe-bundle boundary rules directly; if
  the boundary cannot be proven safe, stop.
- `out_of_scope`:
  - full static checking
  - test execution
  - semantic review
  - implementation validation
  - granting write or execution authority

### `materialization.experimental`

- `module_id`: `materialization.experimental`
- `status`: `frozen_no_active_materializer`
- `purpose`: Record that standalone experimental materialization for the
  orchestrator kernel is frozen. The boundary note exists at
  `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`, but no local
  materializer, generated artifact, generated report, runtime/main-flow
  materialization, or target-repo materialization is active.
- `activation_signals`:
  - none executable as materialization
  - request asks to recreate the frozen standalone materializer
  - request asks for generated artifacts or generated reports
  - request asks for target-repo materialization from this dev area
- `required_context`:
  - freeze document
  - kernel-lab route
  - copied base orchestrator when comparison work is requested
  - explicit confirmation that the requested work remains documentation-only
- `outputs`:
  - none as final artifacts
  - blocker or documentation-only comparison guidance
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - materialization freeze document
  - kernel lab README
  - static and golden structural support when checking documentation drift
- `conflicts`:
  - production skill or production template writes
  - final target artifact writes
  - main-flow replacement
  - standalone materializer recreation
  - generated artifact or generated report creation
  - attempt to materialize all agents
  - attempt to use materialization as fallback routing
- `safe_to_auto_activate`: No.
- `token_cost_hint`: `high`
- `fallback_behavior`: Treat as unavailable and safe stop if materialization,
  generated artifacts, or target writes are required.
- `out_of_scope`:
  - real materialization implementation
  - standalone materializer implementation
  - overwriting the main flow
  - writing production templates
  - writing final target artifacts
  - creating generated artifacts as an active deliverable
  - replacing existing materialization behavior
  - bypassing checks, tests, or authority

### `checks.static`

- `module_id`: `checks.static`
- `status`: `local_read_only_static_check_harness_available_no_materialization_authority`
- `purpose`: Represent cheap static checks for the experimental orchestrator
  kernel and its module contracts. The static-check contract exists at
  `reference/orchestrator_kernel/STATIC_CHECKS.md`, and the local read-only static-check harness exists at `reference/orchestrator_kernel/check-static.mjs`, but
  there is still no runtime loader integration, runtime golden-test execution,
  runtime-integrated materialization path, or authority to release production materialization.
- `activation_signals`:
  - local read-only static-check harness exists for CH-001 through CH-010
  - static-check contract exists
  - activation gates allow static checking
  - candidate artifacts or contracts are present in authorized paths
- `required_context`:
  - static-check contract
  - local read-only static-check harness before local static-check execution
  - authorized paths to inspect
  - expected module-index and kernel-document shape
  - explicit check target
- `outputs`:
  - local structural pass/fail findings with concrete file references
  - no materialization decision or authority
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - module index
  - activation gates
  - static-check contract
  - local read-only static-check harness for CH-001 through CH-008
  - golden-test contract and local read-only golden-test harness
    before local structural golden checks
  - future runtime/fixture golden-test harness before materialization can be
    considered
- `conflicts`:
  - broad filesystem scan outside authorized paths
  - checks that mutate files
  - checks that decide semantic acceptance alone
  - checks used as materialization authority
- `safe_to_auto_activate`: No. The local harness may be run directly as a
  read-only document/structure check, but runtime module activation and
  materialization remain unavailable without later authorization and adoption.
- `token_cost_hint`: `low`
- `fallback_behavior`: Treat unavailable, absent, or failing checks as blocked;
  do not infer pass from the absence of checks.
- `out_of_scope`:
  - runtime-integrated check execution
  - running checks as gates
  - fixing files
  - creating a full validation suite
  - authorizing materialization
  - replacing the documented critical golden tests

### `tests.golden_critical`

- `module_id`: `tests.golden_critical`
- `status`: `local_read_only_harness_available_no_materialization_authority`
- `purpose`: Represent the exactly two critical golden tests for the
  experimental orchestrator kernel path. The golden-test contract exists at
  `reference/orchestrator_kernel/GOLDEN_TESTS.md`, and the local read-only golden-test harness exists at
  `reference/orchestrator_kernel/check-golden.mjs`, but there are still no real
  fixtures, no runtime execution, and no materialization authority.
- `activation_signals`:
  - none executable as runtime behavior
  - golden-test contract exists
  - local read-only golden-test harness exists
  - future test fixtures, expected outputs, and runtime harness exist
  - activation gates allow golden-test evaluation
  - kernel behavior change requires critical regression proof
- `required_context`:
  - golden-test contract
  - exactly two defined critical scenarios, not a full suite
  - local read-only golden-test harness for `GT-001` and `GT-002`
  - future expected outputs
  - authorized test location
  - future runnable test harness
- `outputs`:
  - local structural pass/fail result for `GT-001` and `GT-002`
  - future runtime critical golden-test pass/fail result only after an authorized runtime harness defines and authorizes it
- `dependencies`:
  - kernel contract
  - minimum safe bundle
  - module index
  - activation gates
  - golden-test contract
  - local read-only golden-test harness
  - static checks before materialization can be considered
  - future runnable test harness
  - explicit authorization and isolated materialization path before any
    materialization can be considered
- `conflicts`:
  - creating a full suite in place of two critical tests
  - test fixtures that encode unauthorized materialization
  - tests that bless main-flow changes without adoption
  - missing expected output or harness
  - treating golden tests as materialization authority by themselves
- `safe_to_auto_activate`: No.
- `token_cost_hint`: `medium`
- `fallback_behavior`: Treat golden tests as structurally checkable only by the
  local read-only harness; do not claim runtime regression proof or
  materialization readiness without a future harness and explicit
  authorization.
- `out_of_scope`:
  - implementing runtime tests
  - defining a full test suite
  - implementing a runtime/fixture harness
  - authorizing runtime behavior
  - authorizing materialization by themselves
  - replacing semantic review or validation-runner responsibilities

## Acceptance Criteria

This module index answers the catalog questions as follows:

- Which initial modules exist? The initial catalog contains `routing.basic`,
  `context.missing_info`, `routing.execution_package`,
  `validation.boundary`, `materialization.experimental`, `checks.static`, and
  `tests.golden_critical`.
- What is each module for? Each entry defines a narrow `purpose`.
- What context does each module require? Each entry defines `required_context`.
- What output may each module produce? Each entry defines `outputs`.
- Which modules are unavailable until authorized implementation? `materialization.experimental`
  is frozen and unavailable for runtime/main-flow use, standalone script use,
  generated artifacts, generated reports, or target-repo materialization.
  `checks.static` has a static-check contract and a local read-only static-check harness, but no runtime loader integration and no authority to release
  production materialization.
  `tests.golden_critical` has a golden-test contract for exactly two critical tests and a local read-only golden-test harness, but no
  runtime/fixture executable harness. All other cataloged modules still require
  future runtime activation support before activation.
- What happens when a module, dependency, or context is absent? The module must
  block, reduce to narrower safe behavior allowed by the kernel and safe bundle,
  request minimum context when authorized, or safe stop with a concrete blocker.
- Why is the index not an authorization mechanism? The index is only a catalog.
  It does not grant authority, does not evaluate activation gates, does not
  authorize writes, and cannot override the kernel contract, minimum safe bundle,
  human request, canonical owners, or target/runtime boundaries.

## Explicitly Out Of Scope

This catalog does not implement:

- activation gates
- runtime loader
- runtime/main-flow experimental materialization
- static checks
- golden tests
- kernelization of the other agents
- complete Project Senior Profile
- changes to the main flow
- production template changes
- smoke changes

This document only defines the formal module index catalog for the future experimental
orchestrator kernel.
