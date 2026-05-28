# Orchestrator Kernel Experimental Materialization

Status: experimental materialization contract.

This document defines the contract for future isolated experimental
materialization of the `orchestrator` through the experimental orchestrator
kernel in `stnl_project_agent_specializer_dev`.

It is a documentation contract only. It does not implement a runtime loader,
does not write final artifacts, does not materialize a real agent, does not
change the installer, does not change smoke checks, and does not alter the main
Sentinel flow.

## Purpose

Experimental materialization is a future isolated path for testing whether the
orchestrator kernel, minimum safe bundle, module index, and activation gates can
support a narrower generated `orchestrator` artifact without changing the
production skill or target outputs.

This path applies initially only to `orchestrator`.

It does not replace the main flow. The current Sentinel materialization flow
remains canonical until a later phase explicitly defines, validates, and adopts
a compatible path.

It does not retire base agents. Canonical base agents remain the source of truth
for roles, ownership, gates, handoffs, status language, and protocol-fixed
protections.

It does not write final artifacts. This contract only defines the requirements that a later authorized implementation would have to satisfy.

It still depends on the documented static-check and critical golden-test
contracts plus future executable harnesses. Without those future harnesses, the
experimental path must remain blocked because there is no cheap proof that
isolation, canonicality, forbidden outputs, and expected blocking behavior are
preserved.

## Canonical Source And Experimental Boundary

The canonical base `orchestrator` remains:

- `templates/agents/orchestrator.agent.md`

The dev skill must not copy, modify, or replace that production base agent.

The experiment must operate only over the dev skill's experimental contracts:

- `reference/orchestrator_kernel/CONTRACT.md`
- `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
- `reference/orchestrator_kernel/MODULE_INDEX.md`
- `reference/orchestrator_kernel/ACTIVATION_GATES.md`
- `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- `reference/orchestrator_kernel/STATIC_CHECKS.md`
- `reference/orchestrator_kernel/GOLDEN_TESTS.md`

Any future experimental artifact must be isolated in an explicitly allowed
experimental path and explicitly marked as experimental.

Absence of the canonical base, template, kernel contract, module contract,
gate contract, context, or authorization must block. It must not trigger
speculative reconstruction, memory-based recreation, simplified replacement, or
fallback to a similar artifact.

## Future Minimum Inputs

Real experimental materialization may be considered only after
all of the following inputs exist and are explicitly available:

- kernel contract
- minimum safe bundle
- module index
- activation gates
- canonical base orchestrator available at `templates/agents/orchestrator.agent.md`
- explicit target runtime when applicable
- explicitly allowed experimental paths
- explicit authorization for experimental materialization
- static-check contract defined
- critical golden-test contract defined
- future executable static-check harness
- future executable golden-test harness
- experiment scope limited to `orchestrator`

Missing, ambiguous, stale, or unauthorized input blocks materialization.

## Future Permitted Outputs

Only a later authorized implementation may permit outputs, and only after the required inputs,
gates, checks, tests, authorization, and isolated execution path exist.

Potential future outputs are limited to:

- materialization decision report
- list of activated or considered modules
- isolated experimental `orchestrator` artifact
- experimental metadata:
  - base version/source
  - kernel contract source
  - safe bundle source
  - module index source
  - activation gates source
  - generation mode
  - experimental status
  - blocked/unavailable reasons

None of these outputs may be created as final artifacts by this contract.

## Prohibited Outputs

The experimental path must not create or modify:

- `.github/agents/orchestrator.agent.md`
- `.codex/agents/orchestrator.toml`
- `.codex/config.toml`
- `AGENTS.md`
- `templates/agents/orchestrator.agent.md`
- `sentinel.mjs`
- `scripts/sentinel-smoke.mjs`
- any materialization of all agents
- complete Project Senior Profile
- artifacts not explicitly marked as experimental

The experimental path must not write production target artifacts, production
templates, installer behavior, smoke behavior, or main-flow artifacts.

## Blocking Rules

Experimental materialization must block when any of the following is true:

- kernel contract is missing
- minimum safe bundle is missing
- module index is missing
- activation gates are missing
- canonical base orchestrator is missing
- explicit authorization is missing
- experimental target or path is ambiguous
- future executable static-check harness does not exist
- future executable golden-test harness does not exist
- the attempt includes all agents
- the attempt tries to overwrite or bypass the main flow
- the attempt writes a production final artifact

Blocking is the default when the path cannot prove that it is isolated,
authorized, limited to `orchestrator`, and covered by documented checks/tests
plus future executable harnesses.

## Relationship To Existing Documents

`reference/orchestrator_kernel/CONTRACT.md` defines the kernel boundary and the
non-delegable routing and safety responsibilities that future materialization
must not weaken.

`reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md` defines the mandatory
protection bundle that remains active before, during, and after any future
materialization decision.

`reference/orchestrator_kernel/MODULE_INDEX.md` catalogs
`materialization.experimental` as a blocked future module and records its
dependencies, conflicts, outputs, and fallback behavior.

`reference/orchestrator_kernel/ACTIVATION_GATES.md` classifies
`materialization.experimental` as Gate 3 stop/block until later authorized contracts provide
the documented checks/tests, future executable harnesses, authorization, and
execution path.

This document does not duplicate those contracts. It defines only the future
experimental materialization boundary.

## Why It Remains Isolated

Isolation exists to prevent the experiment from becoming a silent production
materializer.

The experimental path must remain separate from:

- production base agents
- production templates
- production target artifacts
- main Sentinel flow
- installer behavior
- smoke behavior
- materialization of agents other than `orchestrator`

Isolation also makes documented checks and golden tests meaningful once future
harnesses exist: they can verify that the experiment did not write forbidden
outputs, did not mutate canonical sources, and did not expand beyond the
authorized `orchestrator` scope.

## Acceptance Criteria

This contract answers the materialization-boundary questions as follows:

- What is experimental materialization? A future isolated path for producing an
  explicitly experimental `orchestrator` artifact from the orchestrator kernel
  contracts after later authorized contracts provide the missing executable harnesses,
  authorization, and execution path.
- Why is it isolated? To prevent changes to production templates, final target
  artifacts, installer behavior, smoke behavior, base agents, and the main
  Sentinel flow.
- Why does it not write final artifacts yet? This is only a documentation
  contract, and the required static checks, critical golden tests,
  authorization, and isolated execution path do not exist yet.
- Which inputs are mandatory in the future? The kernel contract, minimum safe
  bundle, module index, activation gates, canonical base orchestrator, explicit
  target runtime when applicable, allowed experimental paths, explicit
  authorization, documented static checks, documented critical golden tests,
  future executable harnesses, and scope limited to `orchestrator`.
- Which outputs may be permitted in the future? A materialization decision
  report, activated/considered module list, isolated experimental orchestrator
  artifact, and experimental metadata.
- Which outputs are prohibited? Production target artifacts, production
  templates, installer and smoke changes, all-agent materialization, complete
  Project Senior Profile, and any artifact not marked experimental.
- When must it block? It must block on missing contracts, missing base
  orchestrator, missing authorization, ambiguous target/path, absent checks or
  golden tests, all-agent scope, main-flow overwrite, or production final
  artifact writes.
- Why does it still depend on checks and golden tests? They are the future proof
  that isolation, blocked behavior, forbidden outputs, and expected generation
  boundaries are enforced.
- Why is it limited to `orchestrator`? The orchestrator kernel experiment is
  scoped to the routing controller only; kernelizing or materializing the other
  agents would expand ownership, role contracts, fixtures, and risk beyond this contract.

## Explicitly Out Of Scope

This contract does not implement:

- runtime loader
- final artifact writes
- real materialization
- static checks
- golden tests
- kernelization of the other agents
- complete Project Senior Profile
- main-flow changes
- production template changes
- smoke changes
- installer changes

This document only defines the formal contract for future isolated experimental
materialization of `orchestrator`.
