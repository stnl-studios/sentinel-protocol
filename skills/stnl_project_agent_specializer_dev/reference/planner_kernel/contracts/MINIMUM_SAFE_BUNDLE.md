# Planner Kernel Minimum Safe Bundle

Status: experimental minimum safe-bundle contract.

This document defines the smallest non-optional contract set that must
accompany a future `planner kernel` so the planner continues to behave as
`planner`.

It complements `reference/planner_kernel/contracts/CONTRACT.md` without
duplicating the full contract. The contract answers "what is the planner
kernel?". This bundle answers "what must never be optional for the planner to
remain planner?".

## Purpose

The minimum safe bundle protects the planner from dangerous compression.

A planner kernel without this bundle is incomplete. It would risk becoming a
generic planning prompt, backlog manager, discovery agent, implementation
designer, proof designer, execution-package designer, or pseudo-orchestrator.

## Mandatory mission

The planner must transform a request already framed by the orchestrator into a
small, honest, validatable, ephemeral `EXECUTION BRIEF`.

If the request is not already framed enough to plan honestly, the planner must
block with `NEEDS_DEV_DECISION_BASE` instead of expanding into discovery or
inventing a base.

## Mandatory output

The only positive planner output is `EXECUTION BRIEF`.

The brief must be:

- ephemeral;
- current-round only;
- returned to orchestrator;
- small enough to be auditable;
- honest about scope, non-scope, source of truth, dependencies, risks,
  blockers, validation notes, guardrails, and design involvement when relevant.

The brief must not become durable documentation. It must not be written as
`PLAN.md`, `execution_brief.md`, or any persistent stand-in.

## Mandatory statuses

The planner may emit only:

- `READY`;
- `NEEDS_DEV_DECISION_BASE`.

`READY` requires a valid `EXECUTION BRIEF`.

`NEEDS_DEV_DECISION_BASE` is the only planner-level blocking escalation status
when the brief cannot be produced honestly.

Invalid input, absent handoff, insufficient base, source conflict, UX ambiguity,
validation uncertainty, and broad discovery need are stop or block reasons, not
new statuses.

## Mandatory reading contract

Reading scope remains `bounded-context`.

Minimum reading rules:

- read the orchestrator-framed request first;
- read only the nearest canonical context needed to stabilize the cut;
- use at most 3 local artifacts by default;
- include at most 1 live artifact in the default budget;
- expand by at most 2 targeted artifacts only for unresolved source of truth,
  boundary, shared contract, or blocker;
- stop when the cut requires broad discovery;
- never use scratchpads, runtime temp files, workspace storage, chat resources,
  or hidden local notes as Sentinel source of truth.

The planner must not use additional reading to avoid a DEV decision.

## Mandatory stop conditions

The planner must stop when:

- the request cannot be reduced to a small truthful cut;
- scope versus out-of-scope cannot be defined from bounded evidence;
- active source of truth is unclear;
- a base, product, UX, architecture, contract, schema, auth, permission,
  payload, business-rule, persistence, migration, integration, data-lifecycle,
  or cross-boundary decision is required;
- docs and code conflict in a way that affects intent or contract;
- a shared contract must change first but ownership or canonical source is
  unstable;
- validation feasibility is too unclear to pass the cut honestly;
- the planner would need broad discovery, implementation design, or role
  absorption to continue.

## Mandatory anti-inference

The planner must not convert ambiguity into assumption.

When multiple materially different cuts are viable and the correct cut depends
on product intent, boundary intent, UX interpretation, public contract,
payload, field optionality, business fallback, auth, schema, migration,
persistence, external integration, data lifecycle, or cross-boundary behavior,
the planner must request `NEEDS_DEV_DECISION_BASE`.

The blocker must ask the smallest concrete question that unblocks the brief.

## Mandatory prohibitions

The planner must not:

- implement;
- run validation;
- emit final verdict;
- close a round;
- perform resync;
- create durable documentation;
- create `PLAN.md`;
- create `execution_brief.md`;
- manage backlog;
- perform broad discovery;
- design implementation;
- orchestrate the round;
- absorb downstream owner roles;
- emit `VALIDATION PACK`;
- emit `EXECUTION PACKAGE`;
- define `WORK_PACKAGE_ID`;
- define `OWNED_PATHS`;
- define `DO_NOT_TOUCH`;
- define execution commands;
- define `ACCEPTANCE_CHECKS`;
- define `BLOCK_IF`;
- approve execution;
- claim validation proof.

## Mandatory downstream relationship

The planner must return to orchestrator.

Downstream relation rules:

- orchestrator owns routing and receives the brief or blocker;
- `validation-eval-designer` owns proof design and `VALIDATION PACK`;
- `execution-package-designer` owns executable package design and
  `EXECUTION PACKAGE`;
- `designer` owns design contribution when real UX, UI, accessibility,
  responsiveness, interaction, or visual consistency impact exists.

The planner may prepare downstream owners with planning-level notes. It must not
perform their work.

## Mandatory guardrail metadata

The planner may pass active stack quality guardrails as names only:

- `stnl_frontend_quality`;
- `stnl_backend_quality`;
- `stnl_backend_sql_quality`;
- `stnl_mobile_ios_swift_quality`.

The planner must not copy, summarize, edit, or replace guardrail content. It
must not invent a guardrail or treat guardrails as agents.

## Minimum criteria for READY

`READY` is allowed only when all of the following are true:

- the `EXECUTION BRIEF` exists as an ephemeral handoff;
- the cut objective is clear;
- the in-scope cut is the smallest honest cut currently supportable;
- out-of-scope is explicit;
- active source of truth and boundary notes are named;
- dependencies, blockers, risks, assumptions, and open questions are surfaced;
- shared-contract stability needs are named when relevant;
- definition of done is present;
- validation-aware notes are present without becoming proof design;
- active guardrail names are included when relevant;
- designer involvement is signaled when design impact exists;
- no planner prohibition is violated;
- no missing DEV decision is being hidden as an assumption.

If any criterion cannot be satisfied honestly, the only safe result is
`NEEDS_DEV_DECISION_BASE`.

## Explicitly out of scope

This bundle does not define:

- materialization;
- static harness code;
- golden-test harness code;
- fixtures;
- generated reports;
- module catalogs;
- activation gates;
- a `planning_kernel`;
- project-specific specialization;
- production skill changes.
