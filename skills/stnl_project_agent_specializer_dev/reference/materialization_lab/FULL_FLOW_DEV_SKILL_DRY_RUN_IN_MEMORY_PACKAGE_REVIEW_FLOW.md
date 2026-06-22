# Full-Flow Dev-Skill Dry-Run In-Memory Package Review Flow

Status:
MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_REVIEW_FLOW_DOCUMENTATION

This document is dev-only, documentation-only, reference-only, non-runtime,
non-CLI, non-schema, non-checker, non-Aggregator child, non-authorizing,
no-write, no-Target-real, no-GitHub, and outside the productive skill.

It records the current package-level flow:

`orchestrator -> smoke/manual mapper -> review layer`

It does not create a new operational contract.

## Status

This document is a narrow dev-only/reference-only description of the current
Materialization Lab package-level review flow.

It is not a checker, not a tenth check, not an Aggregator child, not a runtime,
not a CLI, not an official schema, not a writer, not a loader, not a renderer,
not a Target Adapter, and not a Write Approval.

Smoke manual/local não é checker.
Mapper local não é schema oficial.
Review layer não autoriza escrita.
REVIEW_PASS não é aprovação de materialização.
Aggregator permanece fechado em exatamente 9 checks.
Nenhum Target real, GitHub ou skill produtiva é acessado.
Este documento não autoriza materialização real.

## Purpose

The purpose of this document is to consolidate the current understanding of
the package-level flow that connects the standalone in-memory package
orchestrator to the standalone in-memory package result review layer through a
manual/local smoke bridge.

The flow remains documentation-only from this file's perspective. The document
explains the current boundary and does not add a new gate, new command, new
schema, new public contract, or new authorization.

## Flow Overview

Current package-level flow:

```text
package orchestrator result
  -> manual/local smoke mapper
  -> review layer boundary input
  -> review verdict
```

The package orchestrator produces an integrated in-memory package result for
the full 12-agent package. The manual/local smoke validates that this package
result can be mapped into the review layer boundary input. The review layer
then evaluates the in-memory boundary input and emits a non-authorizing
verdict.

## Component Roles

Package orchestrator:

- produces one integrated in-memory package result for the 12 canonical agents;
- keeps the package result conceptual and package-level;
- does not access a real Target, GitHub, or the productive skill.

Smoke manual/local:

- validates the bridge between the package orchestrator and the review layer;
- runs as a manual/local/dev-only smoke;
- is not named as a `check-*` script;
- is not registered in the Aggregator.

Mapper local:

- converts orchestrator package result fields from `snake_case` to the
  `camelCase` boundary input expected by the reviewer;
- exists only inside the smoke;
- is in-memory, local, non-exported, and not an official schema.

Review layer:

- reviews the in-memory package-level boundary input;
- checks package completeness, boundary safety, no-write evidence, and
  non-authorization evidence;
- emits a verdict that never authorizes writing or materialization.

## Package-Level Guarantees

The current flow preserves full-flow as one integrated package for the 12
canonical agents. It does not materialize agent by agent.

It does not treat agent-by-agent review as the primary proof. The package must
remain complete as a package-level result, and a partial package is not a
successful result.

Codex `.codex/config.toml` and `AGENTS.md` remain target-level artifacts. They
are not counted as canonical agents and are not used to inflate the 12-agent
package matrix.

## Review Verdict Semantics

`REVIEW_PASS` means only that the in-memory package appears complete and
boundary-safe according to the current review layer's input expectations.

`REVIEW_PASS` does not authorize writing, real materialization, real Target
access, GitHub access, productive-skill access, Aggregator changes, checker
creation, or a tenth check.

The verdict must preserve:

```text
writeAuthorizationDenied: true
```

Any verdict shape that implies writing is allowed is outside this flow.

## Manual Smoke Scope

The smoke is manual/local/dev-only. It is a narrow bridge validation between
the package orchestrator and the review layer.

It does not start with `check-`. It is not registered in the Aggregator. It has
no official stdout contract. It is not an official gate.

Its role is to confirm the current in-memory bridge:

```text
orchestrator package result -> local mapper -> reviewer input
```

The smoke does not create a persistent report, snapshot, cache, captured stdout
artifact, materialized output, Target write, GitHub artifact, branch, commit,
or pull request.

## Mapper Boundary

The mapper is local, in-memory, non-exported, and without official schema
status.

It exists only because the package orchestrator exposes a package result using
`snake_case` fields while the review layer expects a boundary input using
`camelCase` fields.

The mapper is not a loader, runtime, official schema, API contract, or public
contract. It does not create a reusable integration surface and does not
authorize any filesystem, Target, GitHub, or productive-skill access.

## Aggregator Boundary

The Validation Harness Aggregator remains closed with exactly 9 child checks.

The smoke is not a child check. The review layer is not a child check. This
document does not authorize registering either one in the Aggregator.

The Aggregator boundary remains unchanged by this documentation-only phase.

## No-Write And Non-Authorization Evidence

No-write evidence and non-authorization evidence remain mandatory for this
flow.

Missing, contradictory, softened, or positive authorization evidence must block
`REVIEW_PASS`.

There is no fallback to filesystem inspection, real Target access, GitHub
access, productive-skill access, runtime discovery, loader behavior, or writer
behavior.

The current flow must continue to reject any signal that implies Target reads,
Target writes, filesystem stats or listings against a Target, persistent
reports, generated output, materialized output, GitHub writes, productive-skill
mutation, Aggregator changes, checker creation, or tenth-check creation.

## Explicit Non-Goals

This document does not authorize:

- checker;
- tenth check;
- Aggregator change;
- runtime;
- CLI;
- stdout contract;
- official schema;
- loader;
- renderer;
- writer;
- Target Adapter;
- Write Approval;
- real Target;
- GitHub;
- productive skill;
- materialized output;
- persistent report;
- snapshot;
- cache;
- real materialization.

It also does not authorize branch creation, commit creation, pull request
creation, persistent stdout capture, generated file output, patch application,
approval token issuance, approval registry creation, approval signature
creation, signer creation, or productive-template mutation.

## Readiness Boundary

This document helps close the package-level in-memory validation understanding
for the current Materialization Lab flow.

It does not start materialization readiness automatically. Any future
materialization-readiness track must be decided separately, with its own scope,
authorization boundary, and audit path.

This document remains only a reference for the current package-level
orchestrator-to-review flow.

## Next-Step Boundary

Any next step requires a separate phase.

The likely next decision is to evaluate readiness for planning materialization
while still avoiding real Target writes, real Target reads, GitHub access,
productive-skill access, runtime creation, CLI creation, official schema
creation, and materialized output.

No next step is implied or started by this document.
