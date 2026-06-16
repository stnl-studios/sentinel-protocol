# Runtime Lazy Load Contract

Status: `DOCUMENTARY_DEV_ONLY`.

This contract defines the future protocol for strong lazy loading of modular Senior Agent Profiles. It does not implement a runtime, loader, materializer, prompt assembler, target selector, or generated output.

Lazy load is not optimization. Lazy load is part of the safety contract of the agent.

## Future Protocol

A future runtime or materializer must follow this protocol:

1. Intake.
2. Classify demand.
3. Load mandatory base.
4. Match activation triggers.
5. Load required modules.
6. Decide/act.
7. Emit loaded-module trace.
8. Block if required module was not loaded.

## Mandatory Base

The entrypoint is always active. `01_IDENTITY_AND_BOUNDARY` is mandatory for non-trivial profile work. Trivial inventory, path listing, or metadata-only checks may avoid loading behavior modules if no behavior judgment is made.

## Module Requirements

- `01_IDENTITY_AND_BOUNDARY` is required for non-trivial work.
- `02_DECISION_AND_READING` is required for non-trivial decision, route, scope, sufficiency, reading priority, sequencing, proceed-versus-block, or stop decisions.
- `03_RISK_AND_GATES` is required for risk, gate, ambiguity, blocker, missing authority, evidence conflict, or boundary conflict.
- `04_HANDOFF_EVIDENCE_AND_OUTPUT` is required for handoff, evidence consolidation, material output, status declaration, correction pack, closure signal, or control transfer.

## Safety Rules

- A module exists only if it has a trigger.
- A triggered module is mandatory.
- A non-triggered module must not be loaded by completeness.
- Material decision must leave a loaded-module trace.
- If a mandatory activated module was not loaded, block.
- If a gate was activated and the gates module was not loaded, block.
- If material output occurs without the handoff/evidence/output module, block.
- If a loader loads all modules by default for safety, block.

## Future Project Selection Compatibility

The modular shape is compatible with future project-type selection without implementing it here:

- Backend-only;
- Frontend-only;
- iOS-only;
- Fullstack BE + FE;
- Fullstack BE + iOS;
- Fullstack BE + FE + iOS.

Future `resync` should remain materialized when the future materialization layer is authorized, but its invocation still depends on the flow and demand. This contract does not implement selection or materialization.

## Handoff Chain Compatibility

The future loader must preserve this integrated chain without treating it as load-all authorization:

```text
orchestrator
-> planner
-> validation-eval-designer
-> execution-package-designer
-> designer when real UX is present
-> coder-backend / coder-frontend / coder-ios as the surface requires
-> validation-runner
-> reviewer
-> finalizer
-> resync when authorized by flow
```

Each agent enters only by valid handoff, correct owner, minimum context, and activated gate.

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
