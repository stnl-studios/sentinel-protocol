# Orchestrator Kernel Experimental Materialization

Status: experimental isolated materialization contract with a local deterministic materializer.

This document defines the allowed experimental path for materializing only the
`orchestrator` kernel inside `stnl_project_agent_specializer_dev`.

The path is intentionally narrow. It writes only generated experimental files
under `reference/orchestrator_kernel/generated/` inside the dev skill. It does
not write final artifacts, does not change the installer, does not change smoke
checks, does not alter the main Sentinel flow, and does not materialize any
agent other than the experimental orchestrator-kernel artifact.

## Purpose

Experimental materialization tests whether the orchestrator kernel, minimum safe
bundle, module index, and activation gates can produce a narrower generated
`orchestrator` artifact without changing production skill files, production
templates, target artifacts, or the main workflow.

This path applies only to `orchestrator`.

It does not replace the main flow. The current Sentinel materialization flow
remains canonical unless a later authorized contract explicitly adopts a
compatible path.

It does not retire base agents. Canonical base agents remain the source of truth
for roles, ownership, gates, handoffs, status language, and protocol-fixed
protections.

It does not write final artifacts. The generated artifact is experimental,
non-installable, and isolated in the dev skill.

## Implemented Local Path

The local deterministic materializer is:

- `reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs`

The local generated-artifact checker is:

- `reference/orchestrator_kernel/check-materialized.mjs`

The materializer requires explicit authorization through:

- `--allow-experimental-materialization`

Without that flag, the materializer must return `BLOCKED`, perform no writes,
and name the missing authorization blocker.

With that flag, the materializer may write only:

- `reference/orchestrator_kernel/generated/orchestrator.kernel.agent.md`
- `reference/orchestrator_kernel/generated/orchestrator.kernel.report.json`

The generated artifact must remain explicitly experimental, non-installable,
limited to `orchestrator-only`, and marked as not a production template, not an
installed agent, and not a target artifact.

## Canonical Source And Experimental Boundary

The production canonical base `orchestrator` remains:

- `templates/agents/orchestrator.agent.md`

The dev skill carries an isolated copy for this experiment only:

- `reference/agents/orchestrator.agent.md`

The materializer must read only the dev-skill copy and dev-skill contracts. It
must not fallback to `templates/**`, `skills/stnl_project_agent_specializer/**`,
`~/.agents/**`, production target artifacts, or any external filesystem source.

The copied base orchestrator is an input source for the isolated experiment. It
must not be exposed as an installed artifact or emitted as a final materialized
agent.

The experiment operates only over these dev-skill inputs:

- `reference/agents/orchestrator.agent.md`
- `reference/orchestrator_kernel/CONTRACT.md`
- `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
- `reference/orchestrator_kernel/MODULE_INDEX.md`
- `reference/orchestrator_kernel/ACTIVATION_GATES.md`
- `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- `reference/orchestrator_kernel/STATIC_CHECKS.md`
- `reference/orchestrator_kernel/GOLDEN_TESTS.md`

Absence of the copied base orchestrator, kernel contract, module contract, gate
contract, context, allowed output path, or explicit authorization must block. It
must not trigger speculative reconstruction, memory-based recreation, simplified
replacement, or fallback to a similar artifact.

## Minimum Inputs

Experimental materialization may run only when all of the following inputs exist
inside the dev skill and are explicitly available:

- copied base orchestrator at `reference/agents/orchestrator.agent.md`
- kernel contract
- minimum safe bundle
- module index
- activation gates
- experimental materialization contract
- static-check contract and local static-check harness
- critical golden-test contract and local golden-test harness
- local deterministic materializer
- generated-artifact checker
- explicitly allowed generated output paths
- explicit authorization flag
- experiment scope limited to `orchestrator`

Missing, ambiguous, stale, or unauthorized input blocks materialization.

## Permitted Outputs

Permitted experimental outputs are limited to:

- `reference/orchestrator_kernel/generated/orchestrator.kernel.agent.md`
- `reference/orchestrator_kernel/generated/orchestrator.kernel.report.json`
- compact stdout/stderr status from the materializer or generated-artifact checker

The report may include:

- materialization status
- list of source files
- source hashes and byte counts
- generated artifact hash and byte count
- base-vs-generated comparison metrics
- allowed output root
- forbidden output list
- experimental status
- blocked/unavailable reasons when applicable

None of these outputs are final Sentinel artifacts.

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

- copied base orchestrator is missing
- kernel contract is missing
- minimum safe bundle is missing
- module index is missing
- activation gates are missing
- explicit authorization flag is missing
- generated output path is ambiguous or outside `reference/orchestrator_kernel/generated/`
- static-check harness is missing or failing
- golden-test harness is missing or failing
- generated-artifact checker is missing
- the attempt includes all agents
- the attempt tries to overwrite or bypass the main flow
- the attempt writes a production final artifact
- the attempt falls back to `templates/**`, production skill files, `~/.agents/**`, or external filesystem sources

Blocking is the default when the path cannot prove that it is isolated,
authorized, limited to `orchestrator`, and covered by the documented checks.

## Relationship To Existing Documents

`reference/orchestrator_kernel/CONTRACT.md` defines the kernel boundary and the
non-delegable routing and safety responsibilities that materialization must not
weaken.

`reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md` defines the mandatory
protection bundle that remains active before, during, and after any
materialization decision.

`reference/orchestrator_kernel/MODULE_INDEX.md` catalogs
`materialization.experimental` as non-auto-activatable. The local materializer is
an explicit dev-skill harness, not runtime module auto-activation.

`reference/orchestrator_kernel/ACTIVATION_GATES.md` keeps
`materialization.experimental` in Gate 3 for runtime/main-flow behavior. The
local materializer may run only through explicit command authorization and the
isolated generated output path.

`reference/orchestrator_kernel/STATIC_CHECKS.md` defines structural checks.
`reference/orchestrator_kernel/GOLDEN_TESTS.md` defines critical no-escape tests.
Passing either one by itself is not materialization authority.

## Why It Remains Isolated

Isolation prevents the experiment from becoming a silent production materializer.

The experimental path remains separate from:

- production base agents
- production templates
- production target artifacts
- main Sentinel flow
- installer behavior
- smoke behavior
- materialization of agents other than `orchestrator`

Isolation also makes checks meaningful: they can verify that the experiment did
not write forbidden outputs, did not mutate canonical sources, and did not expand
beyond the authorized `orchestrator` scope.

## Acceptance Criteria

This contract answers the materialization-boundary questions as follows:

- What is experimental materialization? A local deterministic path for producing
  an explicitly experimental, non-installable `orchestrator` kernel artifact
  inside the dev skill.
- Why is it isolated? To prevent changes to production templates, final target
  artifacts, installer behavior, smoke behavior, base agents, and the main
  Sentinel flow.
- Why does it not write final artifacts? Generated output is restricted to
  `reference/orchestrator_kernel/generated/` and is explicitly marked
  experimental and non-installable.
- Which inputs are mandatory? The copied base orchestrator, kernel contract,
  minimum safe bundle, module index, activation gates, materialization contract,
  static/golden contracts and harnesses, local materializer, generated-artifact
  checker, allowed output paths, explicit authorization flag, and scope limited
  to `orchestrator`.
- Which outputs are permitted? The generated experimental orchestrator-kernel
  artifact and JSON report under the generated path, plus compact command status.
- Which outputs are prohibited? Production target artifacts, production
  templates, installer and smoke changes, all-agent materialization, complete
  Project Senior Profile, and any artifact not marked experimental.
- When must it block? It must block on missing source, missing contracts,
  missing authorization flag, ambiguous generated path, failing checks, all-agent
  scope, main-flow overwrite, external fallback, or production final artifact
  writes.
- Why does it still depend on checks and golden tests? They are the cheap proof
  that isolation, blocked behavior, forbidden outputs, and expected generation
  boundaries are enforced.
- Why is it limited to `orchestrator`? The orchestrator kernel experiment is
  scoped to the routing controller only; kernelizing or materializing the other
  agents would expand ownership, role contracts, fixtures, and risk beyond this
  contract.

## Explicitly Out Of Scope

This contract does not implement:

- runtime loader
- final artifact writes
- installer integration
- smoke integration
- materialization of all agents
- production adoption
- semantic acceptance of the generated artifact
- complete Project Senior Profile
- target-project materialization
- mutation of production templates
- mutation of production skill files
