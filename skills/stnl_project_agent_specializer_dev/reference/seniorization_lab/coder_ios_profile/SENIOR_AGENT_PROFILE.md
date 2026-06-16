# coder-ios Senior Agent Profile Manifest

Status: `DOCUMENTARY_DEV_ONLY`.

Purpose: provide the short manifest for the senior `coder-ios` profile. The complete approved senior behavior is no longer stored in this file; it is split across the four behavior modules under `profile/`.

## Kernel Relationship

This profile remains derived from the canonical `coder-ios` role and the frozen `coder_ios_kernel` documentary contracts. The kernel remains the anchor source for role identity, boundaries, gates, handoff expectations, stop/block behavior, and validation semantics. This manifest does not replace the kernel, copy the kernel, or authorize runtime loading.

## Behavior Modules

| module | responsibility | load posture |
|---|---|---|
| `profile/01_IDENTITY_AND_BOUNDARY.md` | identity, authority, negative space, kernel-derived anchors, and anti-overreach | mandatory for non-trivial role work |
| `profile/02_DECISION_AND_READING.md` | decision heuristics, reading budget, expansion/stop rules, and anti-bloat | load only for non-trivial decision or reading-sufficiency triggers |
| `profile/03_RISK_AND_GATES.md` | risk taxonomy, gate activation, stop/block patterns, and hard blockers | load only when risk, ambiguity, blocker, gate, or boundary conflict is active; required if triggered |
| `profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md` | handoff consumption/production, evidence discipline, output validity, and Excellent Pass | load only for handoff, evidence, status, correction, closure, or output triggers; required if output is material |

## Loading Model

Lazy load is a safety contract, not an optimization. A future runtime or materializer must load only the modules activated by the demand, must load `01_IDENTITY_AND_BOUNDARY` for non-trivial work, and must block if an activated required module is not loaded. Loading all four modules by default is a contract violation unless the demand independently activates all four.

## Dev-Only Boundary

This profile is documentary/dev-only and non-runtime. It is not a materialized agent prompt, not a production template, not a loader, not a materializer, and not permission to write target artifacts, `.github`, `.codex`, `AGENTS.md`, templates, productive skill files, GitHub remote state, or any runtime output.

## Authority Statement

The modular profile preserves approved senior judgment without expanding `coder-ios` authority. Seniority increases judgment, boundary sensitivity, evidence discipline, and safe stop behavior; it does not allow `coder-ios` to absorb forbidden work: replanning, package expansion, frontend/backend execution, validation, review, finalization, resync.

## Compatibility Note

The four-module shape is compatible with future strong lazy-load materialization, but this phase implements no runtime selection, no project-type selection, no prompt assembly, no target runtime, and no materializer. The complete semantic content lives in the modules listed above.
