# orchestrator Modular Senior Profile Static Checks

These checks are documentary/dev-only. They validate the modular `orchestrator_profile` bundle and do not authorize runtime loading, materialization, target writes, productive-skill changes, template changes, GitHub writes, or target repository mutation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_MANIFEST_EXISTS` | Ensure the manifest exists. | `SENIOR_AGENT_PROFILE.md` exists and is short. | Manifest is absent or replaced by full behavior. |
| `PROFILE_MANIFEST_SHORT` | Prevent monolith resurrection. | Manifest contains status, purpose, kernel relation, module links, loading model, dev-only boundary, semantic relocation statement, authority statement, and lazy-load compatibility only. | Manifest contains the old 13 full sections or recombines behavior. |
| `PROFILE_PARTS_EXIST` | Ensure four-part modular shape. | Exactly four files exist under `profile/`: `01_IDENTITY_AND_BOUNDARY.md`, `02_DECISION_AND_READING.md`, `03_RISK_AND_GATES.md`, `04_HANDOFF_EVIDENCE_AND_OUTPUT.md`. | Any part is missing, renamed, or extra part exists. |
| `NO_PROFILE_PART_SPRAWL` | Forbid fifth part or helper files. | No extra file exists inside `profile/`. | A fifth behavior part, helper, scratch, or copied source file exists. |
| `PROFILE_PARTS_HAVE_MODULE_ID` | Require stable module identity. | Each part declares `module_id` in YAML metadata. | Any module lacks `module_id`. |
| `PROFILE_PARTS_HAVE_MODULE_TYPE` | Require one of four approved types. | Each part declares the correct `module_type`. | Module type is absent, wrong, or invents another type. |
| `PROFILE_PARTS_HAVE_AGENT_ID` | Bind part to canonical agent. | Each part declares `agent_id: orchestrator`. | Agent id is absent, generic, or wrong. |
| `PROFILE_PARTS_HAVE_PURPOSE` | Require specific purpose. | Each part has a orchestrator-specific purpose tied to `orchestrator_kernel`. | Purpose is blank, generic, or role-agnostic. |
| `PROFILE_PARTS_HAVE_LOAD_WHEN` | Require real activation triggers. | Each part declares concrete `load_when` triggers. | A part lacks `load_when` or uses only completeness language. |
| `PROFILE_PARTS_HAVE_DO_NOT_LOAD_WHEN` | Prevent load-all behavior. | Each part declares `do_not_load_when` that blocks loading by completeness. | A part lacks `do_not_load_when` or permits load-all for safety. |
| `PROFILE_PARTS_HAVE_DEPENDS_ON` | Require dependency trace. | Part 01 depends on none; parts 02, 03, and 04 depend on part 01. | Dependencies are missing, cyclic, or bypass identity/boundary. |
| `PROFILE_PARTS_HAVE_BLOCKS_FLAG` | Require triggered-but-unloaded block behavior. | `blocks_if_triggered_but_unloaded: true` appears in every module. | A triggered required module can be skipped. |
| `KERNEL_ANCHORS_PRESERVED` | Preserve kernel-derived behavior. | Modules preserve `orchestrator_kernel` anchors without raw kernel dump. | Kernel anchors disappear, become generic, or are copied wholesale. |
| `ROLE_BOUNDARY_PRESERVED` | Preserve canonical role authority. | The profile keeps `orchestrator` as routing controller and safe delegation judge. | The profile allows orchestrator to take over planning, proof design, package design, design contribution, implementation, validation, review, finalization, resync. |
| `HANDOFF_DISCIPLINE_PRESERVED` | Preserve incoming/outgoing handoff expectations. | Module 04 defines bounded handoff, valid output, blockers, and evidence-aware transfer. | Handoffs become implied, narrative, or transcript dumps. |
| `EVIDENCE_DISCIPLINE_PRESERVED` | Prevent status without proof. | Module 04 distinguishes claims, evidence, validation/review/closure signals, blockers, and residual risk. | Claims, silence, confidence, or absence of objection count as proof. |
| `STOP_BLOCK_PATTERNS_PRESERVED` | Preserve safe stop. | Module 03 defines explicit stop/block behavior and block codes for missing modules, gates, and dependencies. | Unsafe continuation, gate skipping, or soft blockers pass. |
| `ANTI_OVERREACH_PRESERVED` | Prevent seniority becoming authority. | Module 01 rejects role takeover and authority expansion. | Seniority grants new owner authority. |
| `ANTI_BLOAT_PRESERVED` | Preserve bounded reading and content. | Module 02 forbids broad scan, load-all, raw dumps, and profile bloat. | The profile encourages broad rediscovery or copies source material. |
| `EXCELLENT_PASS_PRESERVED` | Keep role-specific excellence bar. | Module 04 and validation expectations define role-specific Excellent Pass. | Excellent Pass is generic or weaker than the old profile. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Maintain dev-only isolation. | Files deny `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, and materializers. | Any file authorizes runtime or target output. |
| `NO_PROFILE_PART_MONOLITH` | Prevent recombined monoliths. | No module contains all 13 legacy sections or acts as the full profile alone. | A module recombines the complete profile. |
| `NO_WEAK_PROFILE_MANIFEST` | Prevent index-only manifest. | Manifest carries enough contract to locate modules and enforce lazy-load safety. | Manifest is just a weak link list without authority, load, and boundary statements. |
| `NO_BASE_AGENT_SOURCE` | Prevent final dependency on development baseline. | `reference/agents/` is not named as source final; if mentioned, only as temporary development parity baseline. | `reference/agents/` becomes final source of truth. |
| `NO_KERNEL_RAW_DUMP` | Avoid raw kernel copy. | Kernel anchors are distilled from approved senior profile semantics. | A module copies large kernel blocks. |

## Block Codes

The local validation must recognize and fail closed on these block codes when applicable:

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

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `orchestrator_profile`;
- productive skill mutation;
- template mutation;
- target repository reads or writes;
- GitHub remote writes;
- treating `reference/agents/` as final source.
