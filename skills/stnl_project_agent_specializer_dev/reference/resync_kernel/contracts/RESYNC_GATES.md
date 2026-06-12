# Resync Gates

Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.

This gate document is documentary/dev-only. It does not authorize runtime,
production, materialization, materializer, runtime loader, GitHub write, target
repo write, generated reports, fixtures, target artifacts, productive skill
activation, template mutation, snapshot mutation, or automatic future
promotion.

## Gate Name

The gate document is named `RESYNC_GATES.md` because the role owns factual sync
after a finalizer request. The gate is not a closure gate, validation gate,
review gate, planning gate, coding gate, runtime gate, production gate, or
materialization gate.

## Gate 1 - Finalizer Request

Pass only when there is an explicit resync request from `finalizer.agent.md`.
The request must include an already-identified factual delta and an impacted
shared target or bounded shared surface. Missing, implied, ambiguous,
wrong-owner, wrong-round, stale, or runtime-recovered handoff blocks.

## Gate 2 - Factual Delta Qualification

Pass only when the delta is already established by the round, useful outside
the feature, stable enough to state without guessing future direction, and
specific enough to attach to an existing shared source of truth.

Block if the delta is rationale, local detail, future intent, cleanup idea,
interpretation, recommendation, partial evidence, blocked proof, or speculative
expectation.

## Gate 3 - Shared Impact Classification

Classify the candidate delta as exactly one of:

- shared fact that should be synchronized;
- local feature detail that must stay local;
- normative or structural change that must not be absorbed silently.

Only the first bucket can proceed. The second bucket returns no sync or
`BLOCKED` as appropriate. The third bucket blocks or escalates because it asks
for a decision outside resync ownership.

## Gate 4 - Target Selection

Choose the smallest authoritative target that owns the stale fact. Prefer the
existing `docs/core/{CONTEXT,RULES,STATE,CONTRACTS,TESTING}.md` owner, then
`docs/TBDS.md` or `docs/INDEX.md` when those are the existing owners, then
`Feature CONTEXT` only when finalizer request or project flow explicitly
authorizes it.

Block when no allowed documentation target owns the fact, when ownership is
unclear or disputed, or when the only route would create a new canonical surface
without explicit project-specialization permission and clear ownership.

## Gate 5 - Minimal Edit

Apply the smallest edit that makes the shared target true again: edit the stale
statement directly or add one narrow factual note where the target already
expects such information. Do not rewrite adjacent sections for tone, carry
feature-local nuance into shared canon, add future work, or create a
documentation campaign.

## Gate 6 - Boundary Guard

Block immediately if the request asks resync to implement, re-plan, redesign
proof, run validation, judge validation, review architecture, close the round,
touch `DONE`, decide `resync: yes/no`, invent QA success, substitute another
agent, or use `PLAN.md` as durable docs. Resync must not search runtime temp
paths. Also block if resync would create runtime, production, materialization,
fixture, generated report, or target artifact paths.

## Gate 7 - Output Evidence

`READY` requires the applied shared target path, the synchronized factual delta,
why that target was the correct owner, and what related material was
intentionally left unsynchronized. `BLOCKED` requires the exact reason and the
missing decision, evidence, target owner, or boundary clarification.
