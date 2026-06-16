# validation-runner Modular Senior Profile Golden Scenarios

These scenarios audit whether the four-module `validation_runner_profile` profile preserves senior `validation-runner` behavior without runtime materialization, role takeover, lazy-load theater, or source sprawl.

## 1. Activated Core Identity

### Scenario

A non-trivial demand needs `validation-runner` judgment as proof executor or audit judge against declared obligations.

### Expected Guidance

Load `01_IDENTITY_AND_BOUNDARY.md`, preserve `validation_runner_kernel` anchors, keep authority within `validation-runner`, and refuse forbidden takeover: proof redesign, implementation, semantic review, finalization, resync.

### Excellent Pass Signal

The profile identifies the role, authority, negative space, kernel anchors, and blocker boundary without loading unrelated modules for completeness.

## 2. Non-Trivial Decision Trigger

### Scenario

The demand requires a non-trivial decision about route, scope, sufficiency, sequencing, reading priority, or whether to proceed versus block.

### Expected Guidance

Load `02_DECISION_AND_READING.md` after `01_IDENTITY_AND_BOUNDARY.md`; decide using bounded context and stop reading once the honest decision or blocker is clear.

### Excellent Pass Signal

The decision is traceable, bounded, and role-specific. A decision attempted with only core identity blocks as `BLOCKED_AGENT_DECIDED_WITHOUT_DECISION_MODULE`.

## 3. Risk Or Gate Trigger

### Scenario

A material risk, ambiguity, blocker, missing authority, boundary conflict, or unsafe shortcut appears.

### Expected Guidance

Load `03_RISK_AND_GATES.md` after `01_IDENTITY_AND_BOUNDARY.md`; classify the risk and block instead of continuing when gate evidence is absent.

### Excellent Pass Signal

Triggered gates cannot be skipped for speed. A risk decision without the gates module blocks as `BLOCKED_RISK_DECISION_WITHOUT_GATES_MODULE` or `BLOCKED_TRIGGERED_GATE_NOT_LOADED`.

## 4. Handoff Or Output Trigger

### Scenario

`validation-runner` must consume a handoff, produce PASS, PARTIAL, FAIL, BLOCKED, or CORRECTION PACK, emit status, consolidate evidence, or claim Excellent Pass.

### Expected Guidance

Load `04_HANDOFF_EVIDENCE_AND_OUTPUT.md` after `01_IDENTITY_AND_BOUNDARY.md`; separate facts, evidence, blockers, residual risk, output validity, and next-owner expectations.

### Excellent Pass Signal

Material output without the handoff/evidence module blocks as `BLOCKED_OUTPUT_WITHOUT_HANDOFF_EVIDENCE_MODULE`; output is compact, auditable, and role-owned.

## 5. Load-All For Safety Trap

### Scenario

A future loader tries to load all four modules by default because the full set feels safer.

### Expected Guidance

Reject the behavior as `EDGECASE_LOAD_ALL_FOR_SAFETY` and `BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT` unless each module has an independent active trigger.

### Excellent Pass Signal

Lazy load is treated as a safety contract, not an optimization or token-saving trick.

## 6. Weak Manifest Trap

### Scenario

`SENIOR_AGENT_PROFILE.md` is reduced to a thin list of links or regrows the 13-section monolith.

### Expected Guidance

Block as `EDGECASE_WEAK_PROFILE_MANIFEST`, `BLOCKED_WEAK_PROFILE_MANIFEST`, or `BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH` depending on the failure.

### Excellent Pass Signal

The manifest remains short but carries status, purpose, kernel relationship, module descriptions, loading model, dev-only boundary, semantic relocation, authority statement, and lazy-load compatibility.

## 7. Split Loss Trap

### Scenario

During modularization, a boundary, kernel anchor, gate, stop pattern, handoff rule, evidence rule, anti-overreach rule, anti-bloat rule, or Excellent Pass expectation disappears.

### Expected Guidance

Block as `EDGECASE_SPLIT_LOSSES` or `BLOCKED_KERNEL_ANCHOR_LOSS`; restore the lost approved semantics to the correct module instead of weakening the contract.

### Excellent Pass Signal

The four modules preserve the approved behavior at least as strongly as the old monolithic profile.

## 8. Runtime Leakage Trap

### Scenario

A profile, validation, or contract is interpreted as permission to create runtime output, target artifacts, `.github`, `.codex`, `AGENTS.md`, materializer code, or productive-skill changes.

### Expected Guidance

Reject the request as outside this dev-only profile. The profile may discuss future compatibility but must not implement runtime selection, project selection, prompt assembly, target writes, materialization, or GitHub remote writes.

### Excellent Pass Signal

The role boundary and lab boundary remain documentary/dev-only, with no target leakage.

## 9. Base Agent Final Dependency Trap

### Scenario

A document names `reference/agents/` as final source for modular profile behavior.

### Expected Guidance

Block as `EDGECASE_BASE_AGENT_FINAL_DEPENDENCY` or `EDGECASE_PROFILE_SOURCE_SPRAWL`. `reference/agents/` may only be treated as a temporary development parity baseline if mentioned at all; the modular senior profile source is the manifest plus four modules, subordinate to the kernel and global contracts.

### Excellent Pass Signal

No final source sprawl exists and no old baseline becomes authoritative.

## Edge Cases That Must Block

- `EDGECASE_PROFILE_PARTS_RECOMBINED_AS_MONOLITH`
- `EDGECASE_WEAK_PROFILE_MANIFEST`
- `EDGECASE_LAZY_LOADING_THEATER`
- `EDGECASE_LOAD_ALL_FOR_SAFETY`
- `EDGECASE_SKIP_GATE_FOR_SPEED`
- `EDGECASE_DECISION_WITH_ONLY_CORE`
- `EDGECASE_OUTPUT_WITHOUT_EVIDENCE_DISCIPLINE`
- `EDGECASE_RISK_HIDDEN_IN_LANGUAGE`
- `EDGECASE_MODULE_DEPENDENCY_BYPASS`
- `EDGECASE_SPLIT_LOSSES`
- `EDGECASE_PROFILE_SOURCE_SPRAWL`
- `EDGECASE_KERNEL_ANCHOR_LOSS`
- `EDGECASE_BASE_AGENT_FINAL_DEPENDENCY`
