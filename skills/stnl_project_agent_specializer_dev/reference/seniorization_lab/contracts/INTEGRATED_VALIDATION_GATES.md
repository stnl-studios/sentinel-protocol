# Seniorization Lab Integrated Validation Gates

Status: `DOCUMENTARY_DEV_ONLY`.

This document defines the gates required before the 12 Senior Agent Profiles can
earn an integrated excellent pass.

The gates are for read-only documentary validation. They do not create test
runners, runtime harnesses, target artifacts, materializers, or production
outputs.

## Verdict Language

Allowed integrated verdicts:

- `SENIOR_AGENT_PROFILE_INTEGRATED_VALIDATION: EXCELLENT PASS`
- `SENIOR_AGENT_PROFILE_INTEGRATED_VALIDATION: PASS_WITH_NOTES`
- `SENIOR_AGENT_PROFILE_INTEGRATED_VALIDATION: FAIL`

`EXCELLENT PASS` means the full 12-profile set and the shared contracts are
present, coherent, role-specific, non-runtime, and dry-run validated.

`PASS_WITH_NOTES` means there is no material blocker, but an expected contract,
report, or alignment artifact is missing or incomplete.

`FAIL` means at least one material blocker exists.

## Gate 1 — Complete Structure

Pass requires:

- 12 expected profile directories exist;
- 60 required local profile files exist;
- `contracts/` exists;
- `contracts/README.md` exists;
- `contracts/CONTRACT.md` exists;
- `contracts/MINIMUM_SAFE_BUNDLE.md` exists;
- `contracts/PROFILE_SET_INDEX.md` exists;
- `contracts/HANDOFF_CHAIN_CONTRACT.md` exists;
- `contracts/INTEGRATED_VALIDATION_GATES.md` exists.

## Gate 2 — Profile Shape

Pass requires each `SENIOR_AGENT_PROFILE.md` to contain the 13 required
sections:

1. Profile Status
2. Seniority Thesis
3. Canonical Role Boundary
4. Kernel-Derived Anchors
5. Decision Heuristics
6. Reading Budget
7. Risk Taxonomy
8. Stop / Block Patterns
9. Handoff Discipline
10. Evidence Discipline
11. Anti-Overreach Rules
12. Anti-Bloat Rules
13. Excellent Pass Expectations

## Gate 3 — Documentary / Dev-Only Boundary

Pass requires every profile, validation file, and global contract to preserve
non-runtime documentary framing.

Fail on any positive authorization to:

- materialize agents;
- generate target artifacts;
- write `.github`, `.codex`, or `AGENTS.md`;
- mutate production templates;
- mutate production skill paths;
- mutate `sentinel.mjs` or `scripts/sentinel-smoke.mjs`;
- create runtime loader or materializer behavior.

Occurrences of sensitive terms may pass only when they are used as negations,
traps, forbidden actions, or boundary checks.

## Gate 4 — Canonicality

Pass requires every profile to remain derived from and subordinate to:

- its canonical base agent;
- its corresponding documentary kernel;
- this shared contract set;
- explicit project/human instruction.

Fail if a profile claims to replace a base agent, replace a kernel, become a
materialized prompt, or become a runtime source of truth.

## Gate 5 — Role Boundary

Pass requires each profile to preserve its primary role and reject takeover of
other roles.

Fail if any profile grants itself another profile's primary authority or allows
stage skipping without explicit upstream evidence and authorization.

## Gate 6 — Handoff Coherence

Pass requires the integrated handoff chain to be coherent from orchestrator to
resync.

The chain must demonstrate:

- valid upstream/downstream expectations;
- artifact vocabulary consistency;
- block behavior for missing handoffs;
- evidence-aware transfer;
- no broad transcript dumping as a substitute for handoff discipline;
- no hidden assumptions.

## Gate 7 — Local Validation Coverage

Pass requires each profile to contain:

- static checks that cover structure, dev-only framing, canonical anchors,
  role boundary, no runtime leakage, no productive mutation, no template
  mutation, no role takeover, and role-specific risks;
- golden scenarios that cover happy path, missing input/source/handoff,
  overreach traps, evidence traps when applicable, bloat/broad-scan traps, and
  runtime leakage traps;
- excellent-pass expectations that define a meaningful local excellent pass.

## Gate 8 — Integrated Dry-Run

Pass requires a synthetic end-to-end demand that exercises all 12 profiles
without executing real agents or writing runtime artifacts.

The dry-run must prove that:

- orchestrator routes without doing owner work;
- planner cuts scope without designing validation or packages;
- validation-eval-designer defines proof obligations without running proof;
- execution-package-designer creates executable package boundaries without
  implementing;
- designer contributes bounded design judgment without implementation takeover;
- frontend/backend/iOS coders execute only authorized package slices;
- validation-runner proves obligations without fixing or reviewing;
- reviewer judges semantic risk without implementation or closure takeover;
- finalizer closes only according to earned evidence;
- resync synchronizes only authorized final facts.

## Gate 9 — Evidence And Report

Pass requires a final integrated validation report that records:

- audited scope;
- files inspected;
- contracts present;
- profile set present;
- structural results;
- boundary results;
- handoff-chain result;
- dry-run result;
- blockers;
- notes;
- final verdict.

## Excellent Pass Rule

Integrated excellent pass requires all gates above to pass with no material
blockers.

If the only remaining issue is absent historical registration of a previous
check, the validator may create a new documentary integrated report instead of
modifying prior audit history, provided the user authorized documentary local
writes.

