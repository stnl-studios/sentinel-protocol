# Orchestrator Kernel Minimum Safe Bundle

Status: experimental contract for Phase 2.

This document defines the minimum safe bundle that must always accompany the future experimental `orchestrator kernel` in `stnl_project_agent_specializer_dev`.

It complements `reference/orchestrator_kernel/CONTRACT.md` without duplicating the full kernel contract. The kernel contract defines the kernel boundary. This document defines the non-optional protection bundle that keeps that boundary safe when no optional orchestration module is active.

The Phase 3 module index catalog is defined in `reference/orchestrator_kernel/MODULE_INDEX.md`.
The Phase 4 activation-gates contract is defined in `reference/orchestrator_kernel/ACTIVATION_GATES.md`.

## Purpose

The minimum safe bundle is mandatory.

It always travels with the orchestrator kernel. A kernel without this bundle is incomplete and must not be treated as a safe routing layer.

The bundle exists to prevent dangerous token economy. Safety-critical rules cannot be removed, compressed away, deferred to optional modules, or replaced by optimistic assumptions just to make a prompt smaller.

Optional modules may add precision, richer routing, target-specific knowledge, agent-specific knowledge, or future experimental behavior. They must never remove, override, weaken, or make conditional any rule in this bundle.

## Mandatory Rules

### Authority

- Human authorization, root/main authority, orchestrator authority, owner authority, skill authority, and generated artifact authority must remain distinct.
- The kernel must not execute, materialize, delete, route to a specialist, invoke experimental behavior, or continue into a downstream phase unless the current authority boundary is sufficient.
- If authorization is ambiguous, absent, stale, or insufficient for the requested action, the safe result is stop/block, not local improvisation.
- Optional modules cannot grant authority that the kernel, human request, runtime, or canonical workflow has not granted.

### Scope

- The kernel must enforce explicit allowed paths, forbidden paths, repo boundaries, target runtime boundaries, and requested phase boundaries.
- Scope restrictions from the human request are hard constraints.
- The kernel must not expand scope because an optional module has broader knowledge or because a shortcut appears cheaper.
- If scope cannot be determined concretely, the kernel must stop or request the minimum missing context.

### Safe Stop

- Closed failure is mandatory when safe routing cannot be established.
- The kernel must stop when context, authority, owner, gate, module availability, target, path, or artifact identity is insufficient for an honest decision.
- Stop/block output must name the concrete blocker and the minimum next action needed to unblock safely.
- Safe stop cannot be moved to an optional module.

### Missing Context

- Missing context must be named explicitly.
- The kernel may ask for the minimum context needed only when asking is allowed by the current authority boundary.
- The kernel must not compensate for missing context with broad rediscovery, speculative routing, inferred artifacts, invented paths, or hidden assumptions.
- When missing context affects execution, materialization, validation, deletion, closure, or owner selection, the kernel must block until the missing context is supplied or an authorized owner can supply it.

### No Invented Templates, Paths, Or Artifacts

- The kernel must never invent templates, base agents, paths, docs, configs, target artifacts, module names, module contents, generated files, handoff files, or workflow contracts.
- The kernel may use only references that are present, authorized, and discoverable through the allowed contract for the current phase.
- Absence of a reference means absence, not permission to reconstruct it from memory or similarity.
- Optional modules cannot make guessed artifacts acceptable.

### No Execution Without Sufficient Authorization

- Routing authority is not execution authority.
- Skill/workflow use is not automatic subagent authorization.
- Read authority is not write, delete, materialization, shell execution, or handoff authority.
- If the requested step requires stronger authority than currently available, the kernel must stop with a concrete authorization blocker.

### No Override Of The Main Flow

- The experimental kernel cannot replace, bypass, or silently alter the main Sentinel workflow.
- The current base agents and main flow remain canonical unless a future phase explicitly defines, validates, and adopts a compatible experimental path.
- The kernel must not use optional modules as a backdoor to change gate ownership, role ownership, handoff semantics, or closure rules.

### Base Agents Remain Canonical

- Canonical base agents remain the source of truth for roles, ownership, gates, handoffs, status language, and protocol-fixed protections.
- The kernel may route among canonical owner classes, but it must not absorb specialist responsibilities.
- Optional modules may summarize or index base-agent knowledge, but they cannot supersede the base agents.
- If a base-agent reference required for a decision is unavailable, the kernel must block rather than invent the missing role contract.

### Minimum Routing

- The kernel may decide only the next safe routing-level action: plan, route, validate, stop, or request minimum context.
- The routing decision must identify the canonical owner class or state why no safe owner can be selected.
- Minimum routing must include objective, current gate or phase, relevant scope limits, authority constraints, and blocker when present.
- The kernel must not perform the owner's work in order to avoid a handoff.

### Minimum Safe Handoff

- Handoff must be compact, explicit, gate-oriented, and sufficient for the next authorized owner or root/main mediation.
- Handoff must not include full contracts, full docs, broad transcript dumps, invented artifact paths, or hidden assumptions.
- The handoff must state status, next owner when safe, reason, payload boundaries, and blocker when real.
- If no safe owner can be selected, the handoff becomes a blocker report.

### Isolated Experimental Materialization

- Experimental materialization is unavailable until a later phase defines its contract, gates, checks, and tests.
- The kernel must not write or update final target artifacts through the experimental path unless that future path exists and is authorized.
- Experimental artifacts, if later introduced, must remain isolated from the production skill, production templates, main flow, and unrelated repo paths.
- Optional modules cannot use materialization as fallback when routing, authority, gates, or references are incomplete.

### Missing Or Incomplete Module Index And Gates

- If the module index is absent, incomplete, stale, or does not list a module, the kernel must treat that module as unavailable.
- If activation gates are absent, incomplete, stale, or cannot be evaluated, the kernel must not activate optional behavior.
- Missing module index or gates must degrade to safe stop, narrower routing, or base behavior allowed by the kernel and this bundle.
- Missing module index or gates must never degrade to guessed module behavior, fallback execution, or experimental materialization.

## What Belongs In The Bundle

The minimum safe bundle contains only compact protections that must be present even when every optional module is absent:

- global guardrails for authority, scope, canonicality, and experimental isolation
- stop/block criteria for insufficient context, authority, owner, path, module, gate, target, or artifact certainty
- safe fallback rules: ask for minimum context when authorized, otherwise block
- authority rules distinguishing human, root/main, orchestrator, owner, skill, and generated artifact authority
- anti-guessing rules against invented templates, paths, artifacts, modules, docs, configs, contracts, or base agents
- isolation rules for experimental materialization and dev-only kernel work
- minimum decision and routing format: status, gate or phase, next safe action, owner when safe, reason, payload boundary, blocker
- minimum conditions to proceed or block
- behavior when module index or activation gates are missing, incomplete, stale, or incompatible
- preservation of canonical base agents as the source of role and workflow truth

## What Does Not Belong In The Bundle

The bundle must stay small. It must not become a compressed copy of the full orchestration system.

The following must remain outside the minimum safe bundle:

- complete documentation of all agents
- deep knowledge of each agent
- complete Project Senior Profile
- extensive heuristics
- long examples
- golden tests
- static checks
- experimental materializer
- detailed activation gates
- complete module index
- target-specific materialization policy
- generated artifact normalization rules
- full validation matrix design
- broad stack or surface heuristics

These may be future modules, checks, tests, or contracts. They are not part of the irreducible safety bundle.

## Relationship To The Kernel Contract

`reference/orchestrator_kernel/CONTRACT.md` defines the experimental orchestrator kernel boundary: what the kernel is, what it must retain, what it must not absorb, and how future layers relate.

This document defines the mandatory compact protection set that the kernel relies on to remain safe inside that boundary.

The contract answers "what is the kernel?". The minimum safe bundle answers "what can never become optional around the kernel?".

If the two documents appear to conflict, the stricter safety interpretation wins until a future phase explicitly updates both documents.

## Phase 2 Acceptance Criteria

The minimum safe bundle answers the required safety questions as follows:

- What can never be optional? Authority enforcement, scope enforcement, safe stop, missing-context handling, anti-guessing rules, no unauthorized execution, no main-flow override, base-agent canonicality, minimum routing, minimum handoff, experimental isolation, and missing-module/gate behavior.
- What protects the kernel when no optional module is activated? This bundle plus the kernel contract preserve closed failure, minimum routing, canonical base-agent respect, and refusal to invent or execute without authority.
- What prevents dangerous token economy? Safety rules are mandatory, compact, and non-delegable; they cannot be removed or weakened to save tokens.
- What prevents the orchestrator from inventing context? The anti-guessing rules, missing-context rules, module-index rules, activation-gate rules, and base-agent canonicality rules require present, authorized evidence or a blocker.
- What forces safe stop? The stop/block criteria require closed failure whenever safe routing, context, authority, owner, gate, module availability, target, path, or artifact identity is insufficient.
- Which protections cannot move to optional modules? Authority, scope, safe stop, missing-context handling, anti-guessing, no unauthorized execution, no main-flow override, base-agent canonicality, minimum routing, minimum handoff, experimental isolation, and missing-module/gate behavior.

## Explicitly Out Of Scope For Phase 2

This phase does not implement:

- module index
- activation gates
- experimental materialization
- static checks
- golden tests
- kernelization of the other agents
- complete Project Senior Profile
- changes to the main Sentinel flow
- runtime behavior
- production skill changes
- template changes
- target artifact generation

Phase 2 only defines the formal minimum safe bundle for the future experimental orchestrator kernel.
