# Behavior Module Activation Contract

Status: `DOCUMENTARY_DEV_ONLY`.

This contract defines how modular Senior Agent Profile behavior modules declare metadata, activate, depend on one another, and block when activated but unloaded. It is not a runtime loader implementation.

## Required Module Metadata

Every behavior module must start with YAML metadata containing exactly these documentary fields:

```yaml
module_id:
module_type:
agent_id:
purpose:
load_when:
do_not_load_when:
depends_on:
blocks_if_triggered_but_unloaded:
```

Rules:

- `module_id` must be unique and stable.
- `module_type` must be one of `01_IDENTITY_AND_BOUNDARY`, `02_DECISION_AND_READING`, `03_RISK_AND_GATES`, or `04_HANDOFF_EVIDENCE_AND_OUTPUT`.
- `agent_id` must match the canonical agent id.
- `purpose` must be specific to that agent and module.
- `load_when` must contain real activation triggers.
- `do_not_load_when` must explicitly prevent loading by completeness.
- `depends_on` must declare module dependencies.
- `blocks_if_triggered_but_unloaded` must be `true` for every required module when triggered.

## Dependencies

- `01_IDENTITY_AND_BOUNDARY` depends on no other profile module.
- `02_DECISION_AND_READING` depends on `01_IDENTITY_AND_BOUNDARY`.
- `03_RISK_AND_GATES` depends on `01_IDENTITY_AND_BOUNDARY`.
- `04_HANDOFF_EVIDENCE_AND_OUTPUT` depends on `01_IDENTITY_AND_BOUNDARY`.

A missing dependency blocks with `BLOCKED_PROFILE_PART_DEPENDENCY_MISSING`.

## Activation Rules

A module is activated only when its `load_when` trigger matches the demand. A module not activated must not be loaded merely because the profile exists or because a loader wants completeness. Load-all by default is a contract violation.

If a module is activated and not loaded, the correct behavior is `BLOCKED_REQUIRED_MODULE_NOT_LOADED`.

If a behavior module lacks `load_when`, block with `BLOCKED_BEHAVIOR_MODULE_WITHOUT_LOAD_WHEN`. If it lacks `do_not_load_when`, block with `BLOCKED_BEHAVIOR_MODULE_WITHOUT_DO_NOT_LOAD_WHEN`.

## Mandatory Gate Rule

If a risk, ambiguity, blocker, gate, missing authority, evidence conflict, or boundary conflict is active, `03_RISK_AND_GATES` is mandatory. A triggered gate without this module blocks with `BLOCKED_TRIGGERED_GATE_NOT_LOADED` or `BLOCKED_RISK_DECISION_WITHOUT_GATES_MODULE`.

## Decision Rule

If a non-trivial decision about route, scope, sufficiency, sequencing, reading priority, or proceed-versus-block is active, `02_DECISION_AND_READING` is mandatory. A decision made without it blocks with `BLOCKED_AGENT_DECIDED_WITHOUT_DECISION_MODULE`.

## Output Rule

If a profile consumes handoff, produces handoff, emits status, declares READY/BLOCKED/PASS/RISK/DONE, emits a correction pack, consolidates evidence, or passes control to another role, `04_HANDOFF_EVIDENCE_AND_OUTPUT` is mandatory. Material output without it blocks with `BLOCKED_OUTPUT_WITHOUT_HANDOFF_EVIDENCE_MODULE`.

## Trace Rule

A future loader must emit a loaded-module trace for material decisions and outputs. Missing trace blocks with `BLOCKED_LAZY_LOAD_TRACE_MISSING`.

## Recombination Rule

Modules must remain selective behavior parts. Recombining all parts into one module or re-growing the manifest into a monolith blocks with `BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH` or `BLOCKED_WEAK_PROFILE_MANIFEST`.

## Kernel Anchor Rule

Kernel anchors must be preserved without raw kernel copy. Loss of a material kernel anchor blocks with `BLOCKED_KERNEL_ANCHOR_LOSS`.

## Block Codes

- `BLOCKED_REQUIRED_MODULE_NOT_LOADED`
- `BLOCKED_TRIGGERED_GATE_NOT_LOADED`
- `BLOCKED_LAZY_LOAD_TRACE_MISSING`
- `BLOCKED_PROFILE_PART_DEPENDENCY_MISSING`
- `BLOCKED_BEHAVIOR_MODULE_WITHOUT_LOAD_WHEN`
- `BLOCKED_BEHAVIOR_MODULE_WITHOUT_DO_NOT_LOAD_WHEN`
- `BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT`
- `BLOCKED_AGENT_DECIDED_WITHOUT_DECISION_MODULE`
- `BLOCKED_OUTPUT_WITHOUT_HANDOFF_EVIDENCE_MODULE`
- `BLOCKED_RISK_DECISION_WITHOUT_GATES_MODULE`
- `BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH`
- `BLOCKED_WEAK_PROFILE_MANIFEST`
- `BLOCKED_KERNEL_ANCHOR_LOSS`
