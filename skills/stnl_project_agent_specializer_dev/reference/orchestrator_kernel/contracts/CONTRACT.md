# Orchestrator Kernel Contract

Status: experimental kernel contract.

This document defines the minimum contract for a future `orchestrator kernel` inside `stnl_project_agent_specializer_dev`. It is a design contract only. It does not implement kernel logic, module loading, activation gates, materialization, checks, or tests.

The companion minimum safe bundle is defined in `reference/orchestrator_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`.
The companion module index catalog is defined in `reference/orchestrator_kernel/contracts/MODULE_INDEX.md`.
The companion activation-gates contract is defined in `reference/orchestrator_kernel/contracts/ACTIVATION_GATES.md`.
The companion experimental-materialization contract is defined in `reference/orchestrator_kernel/contracts/EXPERIMENTAL_MATERIALIZATION.md`.
The companion static-checks contract is defined in `reference/orchestrator_kernel/validation/STATIC_CHECKS.md`.
The companion critical golden-tests contract is defined in `reference/orchestrator_kernel/validation/GOLDEN_TESTS.md`.

## What the orchestrator kernel is

The orchestrator kernel is the fixed, small, non-optional core of a future experimental orchestration model.

It exists to preserve the minimum behavior needed for Sentinel routing to remain safe when optional orchestration modules are absent, disabled, incomplete, or still under development.

The kernel is not a blind reduced copy of the current base `orchestrator`. It must be intentionally designed around irreducible routing and safety responsibilities, not mechanically trimmed from the full base agent.

The kernel does not replace the base agents. The canonical base agents remain the source of truth for their roles, gates, ownership, handoffs, and protocol-fixed protections.

The kernel does not retire the main flow. The existing Sentinel workflow remains canonical unless an authorized experimental contract explicitly defines, validates, and adopts a compatible experimental path.

The kernel is experimental. It may inform future materialization and routing design, but by itself it does not authorize any change to the production skill, templates, agents, targets, or workflow.

## Irremovable responsibilities

The kernel must always retain enough authority and context to:

- understand the human request at the routing level before any owner is selected
- decide whether the next safe action is to plan, route, validate, or stop
- respect the requested scope, repo boundaries, target runtime, owned paths, and explicit exclusions
- respect authority boundaries between human authorization, root/main session, orchestrator, owners, skills, and any future derived artifacts
- avoid inventing templates, base agents, paths, target files, module contents, or workflow contracts
- ask for missing context when the request, authority, repo state, or routing decision cannot be determined honestly
- prevent execution, materialization, deletion, routing, or fallback behavior without sufficient authorization
- consult the future module index before depending on optional orchestration modules
- respect future activation gates before enabling optional routing behavior, optional modules, or experimental materialization paths
- emit handoffs that are minimal, explicit, gate-oriented, and safe for the next owner or for root/main mediation
- preserve safe behavior when no optional modules are present
- preserve safe behavior when optional modules are unavailable, stale, rejected by activation gates, or incompatible with the current request
- block rather than continue when safe routing cannot be established

These responsibilities are kernel-level because delegating them away would allow optional modules to weaken the safety model.

## Kernel limits

The kernel must not:

- contain the whole base `orchestrator`
- become a compressed copy of every base orchestrator section
- carry deep knowledge of every base agent
- replace `planner`, `reviewer`, `finalizer`, `validation-eval-designer`, `execution-package-designer`, `validation-runner`, coders, `designer`, or `resync`
- implement work by itself
- validate implementation by itself
- review implementation by itself
- finalize closure by itself
- perform fallback execution when a required owner, module, gate, authorization, or artifact is missing
- materialize all agents by default
- decide the full specialized agent set without evidence and future module support
- depend on a complete Project Senior Profile
- assume files, templates, paths, agents, docs, configs, or target artifacts that are not present and authorized
- bypass canonical base agents because an optional module seems sufficient
- relax protocol-fixed protections from the base agents
- convert optional-module absence into local improvisation

The kernel should remain a routing and safety nucleus. Knowledge that is large, specialized, target-specific, stack-specific, project-specific, or role-specific should move to future modules unless it is required to keep the workflow safe when those modules are missing.

## Layer boundary

Future evolution may split the orchestration system into the following layers.

### Kernel

The kernel is mandatory and small. It owns irreducible routing safety: request understanding, scope and authority checks, decision to plan/route/validate/stop, closed failure on insufficient context, minimal handoff shape, and refusal to invent missing artifacts.

The kernel must be able to stop safely without any optional module.

### Minimum safe bundle

The minimum safe bundle is the future non-optional set of compact contracts and protections the kernel may rely on to remain safe. It should contain only protections that cannot be optional without weakening the system.

Optional modules may add capability, precision, or specialization, but they must not remove, override, or weaken the minimum safe bundle.

### Module index

The module index is the future registry of available optional orchestration modules, their names, ownership, purpose, expected inputs, outputs, dependencies, compatibility constraints, and activation requirements.

The kernel should consult the module index before referencing or invoking optional behavior. Absence from the module index means the kernel must not assume that module exists.

### Activation gates

Activation gates are the future eligibility rules for enabling optional modules or experimental behavior. They should decide whether a module may be used for the current request, repo state, target, authority level, and risk profile.

The kernel must respect activation gates before optional capability changes routing behavior.

### Optional modules

Optional modules may hold larger or more specialized knowledge, such as target-specific routing detail, stack-surface heuristics, expanded agent capability maps, materialization policy, or Project Senior Profile-derived context.

Optional modules must be additive. They cannot own the right to make unsafe execution safe, cannot bypass scope or authority checks, and cannot remove protections from the kernel or minimum safe bundle.

### Experimental materialization

Experimental materialization is a future layer that may write or update artifacts only after an authorized contract defines the required gates, checks, and tests.

This kernel contract does not authorize experimental materialization. Until that path is implemented and authorized, the kernel must treat materialization as unavailable.

## Kernel invariants

- Safety before token economy.
- Closed failure when context, authority, owner, path, gate, or module availability is insufficient.
- Routing before execution.
- Authorization before materialization, deletion, execution, or owner handoff.
- Base agents remain canonical.
- Experimental work does not alter the main flow.
- Optional modules can extend behavior but cannot remove safe-bundle protections.
- Missing optional modules must degrade to safe stop or narrower routing, not fallback execution.
- Handoffs must be minimal, explicit, and gate-oriented.
- The kernel must not invent absent paths, templates, modules, agents, docs, configs, or target artifacts.
- The kernel must preserve role ownership and must not absorb specialist roles.
- The kernel must prefer asking for context or blocking over overclaiming certainty.

## Acceptance Criteria

### Minimum knowledge required to remain safe

The orchestrator needs to know, at minimum:

- the human request and objective
- the active repo and relevant scope limits
- explicit prohibitions and allowed paths
- current authority level for routing, execution, materialization, deletion, and subagent use
- whether the next safe action is planning, routing, validation, or stop
- which canonical owner class is required, if one can be safely determined
- what context is missing when no safe owner decision can be made
- that base agents remain canonical and optional modules are not authoritative by default
- that future module use requires module-index presence and activation-gate approval

### What always stays in the kernel

The kernel always keeps:

- request understanding at routing level
- scope enforcement
- authority enforcement
- stop/block decisions
- minimum routing decision logic
- refusal to invent missing facts or artifacts
- minimum safe handoff shape
- future module-index consultation responsibility
- future activation-gate respect
- safe behavior without optional modules

### What should leave the kernel for future modules

The following should become future module responsibilities when implemented:

- deep per-agent capability descriptions
- detailed target-specific materialization rules
- full Project Senior Profile interpretation
- broad stack-surface heuristics
- detailed validation matrix construction
- specialized risk classifiers
- optional routing optimizations
- experimental materialization policy
- future artifact normalization
- static checks and golden-test fixtures

These may inform routing only after they are registered in the module index and allowed by activation gates.

### What cannot be delegated to optional modules

The kernel cannot delegate away:

- scope enforcement
- authority checks
- closed failure on missing context
- refusal to invent templates, files, paths, agents, or modules
- prevention of unauthorized execution or materialization
- base-agent canonicality
- minimum safe handoff obligations
- the decision to stop when no safe route exists
- respect for module index and activation gates

Optional modules may help the kernel decide more precisely, but they cannot own the protections that make routing safe.

### Behavior when context is missing

When required context is missing, the kernel must:

1. identify the missing context in concrete terms
2. decide whether the missing context blocks routing, execution, validation, materialization, or closure
3. request the minimum context needed from the human or from an authorized owner when that is allowed
4. stop with a clear blocker when the missing context cannot be obtained safely in the current authority boundary
5. avoid fallback execution, speculative routing, broad rediscovery, or artifact invention

The default is closed failure, not optimistic continuation.

## Explicitly Out Of Scope

This contract does not implement:

- minimum safe bundle
- module index
- activation gates
- experimental materialization
- static checks
- golden tests
- kernelization of the other agents
- complete Project Senior Profile
- changes to base agents
- changes to templates
- changes to the main Sentinel flow
- runtime behavior
- artifact generation logic

This document only defines the contract for the future `orchestrator kernel`.
