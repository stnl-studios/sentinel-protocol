# Seniorization Lab Contract

Status: `DOCUMENTARY_DEV_ONLY`.

This document defines the global contract for the modular Seniorization Lab under `skills/stnl_project_agent_specializer_dev/reference/seniorization_lab/`.

It is a design and validation contract only. It does not implement runtime logic, module loading, prompt materialization, target artifact generation, GitHub agent generation, Codex agent generation, VS Code agent generation, subagent execution, shell execution, GitHub remote writes, target repository reads/writes, or production skill mutation.

## Scope

This contract applies to the 12 Senior Agent Profiles:

1. `orchestrator_profile`
2. `planner_profile`
3. `validation_eval_designer_profile`
4. `execution_package_designer_profile`
5. `designer_profile`
6. `coder_frontend_profile`
7. `coder_backend_profile`
8. `coder_ios_profile`
9. `validation_runner_profile`
10. `reviewer_profile`
11. `finalizer_profile`
12. `resync_profile`

The complete set is required for integrated validation. A subset is incomplete and must not be treated as a pilot, production-ready pack, materialization set, or evidence that the seniorization system is finished.

## Canonicality

Canonical base agents remain the source of truth for role identity, ownership, workflow authority, handoff semantics, and operational boundaries. Documentary kernels remain the source of derived kernel-level contracts and validation anchors for each role.

Senior Agent Profiles add seniority judgment, sharper boundaries, risk taxonomy, stop/block behavior, evidence discipline, excellent-pass criteria, and future lazy-load safety. They do not supersede base agents or kernels.

If a Senior Agent Profile conflicts with its canonical base agent, documentary kernel, or this shared contract set, the stricter safe reading wins until an authorized later contract explicitly updates the involved documents.

## Lab Boundary

The Seniorization Lab is allowed to contain documentary/dev-only profile, module, validation, and contract material. It must not contain or authorize materialized agents, target repo artifacts, `.github` outputs, `.codex` outputs, `AGENTS.md` outputs, VS Code agent files, GitHub Agent files, Codex runtime files, prompt templates for production use, materializer code, runtime loader code, mutations to `sentinel.mjs`, mutations to `scripts/sentinel-smoke.mjs`, production skill mutation, or GitHub remote writes.

## Authority Rules

- Human/project instruction controls whether a task may read, write, validate, or stop.
- A profile cannot grant itself write authority, execution authority, materialization authority, routing authority beyond its role, or closure authority beyond its canonical boundary.
- A downstream profile cannot repair missing upstream authority by inference.
- A profile may block when required module, handoff, evidence, source, authority, or scope is absent.
- Read-only validation may inspect profile documents and emit a report, but it cannot become runtime execution.

## Role Ownership

Each profile owns only senior judgment for its canonical role. No profile may absorb another profile's primary duty:

- `orchestrator`: routing controller and safe delegation judge; it must not absorb planning, proof design, package design, design contribution, implementation, validation, review, finalization, resync.
- `planner`: bounded cut planner and EXECUTION BRIEF owner; it must not absorb validation design, package design, implementation, validation execution, review, finalization, resync.
- `validation-eval-designer`: proof obligation and VALIDATION PACK designer; it must not absorb proof execution, package design, implementation, semantic review, finalization, resync.
- `execution-package-designer`: bounded execution package designer; it must not absorb routing, implementation, validation execution, semantic review, finalization, resync.
- `designer`: UX, product, interaction, accessibility, responsive, and visual-system contributor; it must not absorb implementation, package design, validation design, semantic review, finalization, resync.
- `coder-frontend`: frontend executor under package constraints; it must not absorb replanning, package expansion, backend/iOS execution, validation, review, finalization, resync.
- `coder-backend`: backend executor under package constraints; it must not absorb replanning, package expansion, frontend/iOS execution, validation, review, finalization, resync.
- `coder-ios`: native iOS executor under package constraints; it must not absorb replanning, package expansion, frontend/backend execution, validation, review, finalization, resync.
- `validation-runner`: proof executor or audit judge against declared obligations; it must not absorb proof redesign, implementation, semantic review, finalization, resync.
- `reviewer`: semantic and architectural risk reviewer; it must not absorb implementation, validation execution, closure, resync.
- `finalizer`: closure owner according to earned evidence; it must not absorb implementation, validation execution, semantic review redo, resync execution.
- `resync`: authorized final context synchronization owner; it must not absorb reopening, replanning, execution, validation, review, finalization.

## Required Modular Profile Shape

Each profile must use exactly this local bundle:

```text
<agent>_profile/
  README.md
  SENIOR_AGENT_PROFILE.md
  profile/
    01_IDENTITY_AND_BOUNDARY.md
    02_DECISION_AND_READING.md
    03_RISK_AND_GATES.md
    04_HANDOFF_EVIDENCE_AND_OUTPUT.md
  validation/
    STATIC_CHECKS.md
    GOLDEN_SCENARIOS.md
    EXCELLENT_PASS_EXPECTATIONS.md
```

`SENIOR_AGENT_PROFILE.md` is a short manifest, not the old 13-section profile. The complete approved semantics moved to the four behavior modules. No fifth part is authorized. No module may recombine all behavior as a monolith. No module may be generic filler or placeholder.

## Completion Rule

The Seniorization Lab can earn integrated excellent pass only when all 12 profiles are present, all four behavior modules exist for each profile, module metadata is complete, manifests are short, shared contracts are internally coherent, no runtime/materialization leak exists, the handoff chain can be simulated end-to-end without role takeover, local validations are updated for modular shape, and the final validation records scope, evidence, blockers, and verdict.
