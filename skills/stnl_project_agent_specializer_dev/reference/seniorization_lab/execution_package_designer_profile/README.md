# execution_package_designer_profile

Module: `execution_package_designer_profile`

Target agent: `execution-package-designer`

Role class: `execution-package-design`

This directory contains the documentary, dev-only modular Senior Agent Profile for `execution-package-designer`. It is the 4 profile in the required 12-profile set and is not a partial pilot, target runtime, materialized prompt, or production source.

## Canonical Relationship

- Canonical role: `execution-package-designer`.
- Documentary kernel: `execution_package_designer_kernel`.
- Senior ownership: bounded execution package designer.
- Primary artifact or signal: EXECUTION PACKAGE.
- Forbidden takeover: routing, implementation, validation execution, semantic review, finalization, resync.

The profile preserves the canonical role and kernel anchors, but the complete senior semantics now live in four behavior modules instead of one monolithic 13-section file. `SENIOR_AGENT_PROFILE.md` is intentionally only a short manifest.

## Files

- `SENIOR_AGENT_PROFILE.md`: short manifest with status, purpose, kernel relationship, module links, loading model, dev-only boundary, authority statement, and future lazy-load compatibility.
- `profile/01_IDENTITY_AND_BOUNDARY.md`: identity, role boundary, kernel-derived anchors, and anti-overreach.
- `profile/02_DECISION_AND_READING.md`: decision heuristics, reading budget, and anti-bloat.
- `profile/03_RISK_AND_GATES.md`: risk taxonomy, gate activation, and stop/block patterns.
- `profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`: handoff, evidence discipline, output validity, and Excellent Pass expectations.
- `validation/STATIC_CHECKS.md`: local static checks for modular shape, metadata, boundaries, anchors, gates, handoffs, evidence, and no runtime leakage.
- `validation/GOLDEN_SCENARIOS.md`: local documentary scenarios for role behavior, lazy-load triggers, blockers, edge cases, and output discipline.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md`: local quality bar for future audit of this modular profile.

## Loading Contract

Lazy load is part of the safety contract. Future consumers must not load every module by default for completeness. A module is loaded only when its documented `load_when` triggers are active, and an activated required module that is not loaded must block with the applicable block code.

## Dev-Only Boundary

This directory must not create or authorize runtime behavior, target repository writes, `.github`, `.codex`, `AGENTS.md`, materializers, generated agents, productive-skill mutation, template mutation, GitHub remote writes, or source final dependency on `reference/agents/`.
