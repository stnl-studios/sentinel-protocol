# Seniorization Lab Integrated Validation Gates

Status: `DOCUMENTARY_DEV_ONLY`.

This document defines the gates required before the 12 modular Senior Agent Profiles can earn an integrated excellent pass.

The gates are for read-only documentary validation. They do not create test runners, runtime harnesses, target artifacts, materializers, production outputs, GitHub writes, or target repository writes.

## Verdict Language

Allowed integrated verdicts:

- `SENIOR_PROFILE_MODULARIZATION_AUDIT: EXCELLENT PASS`
- `SENIOR_PROFILE_MODULARIZATION_AUDIT: PASS_WITH_NOTES`
- `SENIOR_PROFILE_MODULARIZATION_AUDIT: BLOCKED`

`EXCELLENT PASS` means the full 12-profile set and shared contracts are present, coherent, role-specific, modular, non-runtime, and read-only validated.

`PASS_WITH_NOTES` means there is no material blocker, but an expected contract, report, or alignment artifact is missing or incomplete.

`BLOCKED` means at least one material blocker exists.

## Gate 1 - Complete Structure

Pass requires:

- 12 expected profile directories exist;
- each profile has `README.md`, short `SENIOR_AGENT_PROFILE.md`, `profile/`, exactly four behavior modules, and three validation files;
- `contracts/` exists;
- old and new global contracts exist;
- `reference/seniorization_lab/README.md` exists.

## Gate 2 - Modular Profile Shape

Pass requires each `SENIOR_AGENT_PROFILE.md` to be a short manifest and each profile to contain exactly four modules:

1. `01_IDENTITY_AND_BOUNDARY.md`
2. `02_DECISION_AND_READING.md`
3. `03_RISK_AND_GATES.md`
4. `04_HANDOFF_EVIDENCE_AND_OUTPUT.md`

Fail if the manifest still contains the old 13 full sections, if a profile has fewer or more than four behavior parts, or if behavior is recombined as a monolith.

## Gate 3 - Module Metadata

Pass requires every module to declare `module_id`, `module_type`, `agent_id`, `purpose`, `load_when`, `do_not_load_when`, `depends_on`, and `blocks_if_triggered_but_unloaded`.

Fail on missing metadata, generic purpose, missing activation triggers, missing anti-load-all condition, dependency bypass, or triggered-but-unloaded behavior not blocking.

## Gate 4 - Documentary / Dev-Only Boundary

Pass requires every profile, module, validation file, and global contract to preserve non-runtime documentary framing. Fail on positive authorization to materialize agents, generate target artifacts, write `.github`, write `.codex`, write `AGENTS.md`, mutate production templates, mutate production skill paths, mutate `sentinel.mjs`, mutate smoke scripts, create runtime loader/materializer behavior, write GitHub remote state, or read/write real target repositories.

Occurrences of sensitive terms may pass only when used as negations, traps, forbidden actions, compatibility notes, or boundary checks.

## Gate 5 - Canonicality

Pass requires every profile to remain derived from and subordinate to its canonical base agent, corresponding documentary kernel, this shared contract set, and explicit project/human instruction.

Fail if a profile claims to replace a base agent, replace a kernel, become a materialized prompt, become runtime source of truth, or use `reference/agents/` as final source rather than temporary development parity baseline.

## Gate 6 - Role Boundary

Pass requires each profile to preserve its primary role and reject takeover of other roles. Fail if any profile grants itself another profile's primary authority or allows stage skipping without explicit upstream evidence and authorization.

## Gate 7 - Lazy-Load Safety

Pass requires real activation triggers, real `do_not_load_when` constraints, dependency enforcement, loaded-module trace expectation for future material decisions, and blockers for activated modules that are not loaded.

Fail on lazy-load theater, load-all by default, decision without decision module, risk/gate without gates module, material output without handoff/evidence/output module, weak manifest, or monolith recombination.

## Gate 8 - Handoff Coherence

Pass requires the integrated handoff chain to remain coherent from orchestrator to resync, with valid upstream/downstream expectations, artifact vocabulary consistency, block behavior for missing handoffs, evidence-aware transfer, no transcript dump substitute, and no hidden assumptions.

## Gate 9 - Local Validation Coverage

Pass requires each profile to contain updated static checks, golden scenarios, and excellent-pass expectations for modular shape, metadata, load triggers, boundaries, anchors, gates, stop/block patterns, handoff discipline, evidence discipline, anti-overreach, anti-bloat, Excellent Pass, runtime leakage, no raw kernel dump, no source final dependency on `reference/agents/`, and required block codes.

## Gate 10 - Integrated Dry-Run

Pass requires a synthetic end-to-end demand that can exercise the 12 profiles without executing real agents or writing runtime artifacts. The dry-run must prove the chain can preserve role boundaries, lazy-load triggers, gate blocking, handoff/evidence discipline, validation, review, closure, and resync authorization without calling all profiles by default.

## Gate 11 - Evidence And Report

Pass requires a final validation report or task report that records audited scope, files inspected, contracts present, profile set present, structural results, boundary results, lazy-load results, handoff-chain result, blockers, notes, and final verdict.

## Excellent Pass Rule

Integrated excellent pass requires all gates above to pass with no material blockers.
