# Senior Profile Modularization Contract

Status: `DOCUMENTARY_DEV_ONLY`.

This contract authorizes the migration of the Senior Agent Profiles from the old monolithic 13-section document shape into exactly four behavior modules per profile plus a short manifest.

## Required Shape

Each of the 12 profiles must contain exactly four behavior parts under `profile/`:

1. `01_IDENTITY_AND_BOUNDARY.md`
2. `02_DECISION_AND_READING.md`
3. `03_RISK_AND_GATES.md`
4. `04_HANDOFF_EVIDENCE_AND_OUTPUT.md`

No fifth part is authorized without a future explicit contract update. Additional files inside `profile/` are not allowed.

## Manifest Rule

`SENIOR_AGENT_PROFILE.md` is now a short manifest only. It must contain status, purpose, kernel relationship, links/descriptions of the four parts, loading model, dev-only/non-runtime declaration, statement that full semantics live in modules, statement that agent authority was not expanded, and a short note of compatibility with future lazy load.

It must not contain the old 13 full sections, recombine all modular behavior, become a runtime prompt, or become a weak link-only index.

## Semantic Preservation

The migration must preserve approved semantics from the old profiles:

- Seniority Thesis;
- Canonical Role Boundary;
- Kernel-Derived Anchors;
- Decision Heuristics;
- Reading Budget;
- Risk Taxonomy;
- Stop / Block Patterns;
- Handoff Discipline;
- Evidence Discipline;
- Anti-Overreach Rules;
- Anti-Bloat Rules;
- Excellent Pass Expectations.

The content is redistributed by behavior responsibility, not copied randomly or compressed into generic text. Kernel anchors, boundaries, handoffs, stop/block patterns, evidence discipline, anti-overreach, anti-bloat, and Excellent Pass expectations must remain equal or stronger than before.

## Prohibitions

- no runtime target;
- no target repository read/write;
- no materializer;
- no runtime loader;
- no generated prompt;
- no `.github`, `.codex`, or `AGENTS.md`;
- no productive skill mutation;
- no template mutation;
- no GitHub remote write;
- no raw kernel copy;
- no base-agent reprint;
- no recombined monolith;
- no source-final dependency on `reference/agents/`.

`reference/agents/`, if mentioned anywhere in this lab, is only a temporary development parity baseline, not a final modular profile source.

## Relationship To Older Contracts

Older contracts that required the 13-section shape are superseded by this contract. They must be read as requiring a short manifest plus four behavior modules and validation of the modular structure. Any remaining 13-section requirement is obsolete and must be repaired before Excellent Pass.

## Future Compatibility

This contract prepares future materialization with strong lazy load, but it does not implement runtime selection, project-type selection, target rendering, prompt assembly, fixtures, generated outputs, or materializer scripts. Compatibility is documentary only.
