# Seniorization Lab Contracts

Status: `DOCUMENTARY_DEV_ONLY`.

This directory defines global contracts for the 12 modular Senior Agent Profiles under `skills/stnl_project_agent_specializer_dev/reference/seniorization_lab/`.

These contracts are documentary reference material only. They do not create a runtime, do not materialize agents, do not replace canonical base agents, do not replace documentary kernels, and do not authorize writes to target repositories, `.github`, `.codex`, `AGENTS.md`, templates, `sentinel.mjs`, smoke scripts, GitHub remote state, or production skill paths.

## Purpose

The contracts close the global alignment layer shared by all 12 modular Senior Agent Profiles. They define the approved four-part profile shape, lazy-load safety rules, profile set index, minimum safety bundle, handoff chain, and integrated validation gates.

## Contract Set

| file | purpose |
|---|---|
| `CONTRACT.md` | Global seniorization-lab boundary and interpretation contract for modular profiles. |
| `SENIOR_PROFILE_MODULARIZATION_CONTRACT.md` | Required four-part profile shape and migration contract from monolith to modules. |
| `BEHAVIOR_MODULE_ACTIVATION_CONTRACT.md` | Module metadata, activation, dependency, triggered-but-unloaded, and load-all blocking rules. |
| `RUNTIME_LAZY_LOAD_CONTRACT.md` | Future lazy-load protocol contract; documentary only, no implementation. |
| `MINIMUM_SAFE_BUNDLE.md` | Non-optional safety rules shared by all profiles. |
| `PROFILE_SET_INDEX.md` | Catalog of the 12 modular profiles, their canonical anchors, primary artifacts, and boundaries. |
| `HANDOFF_CHAIN_CONTRACT.md` | Integrated handoff sequence and blocking rules across the 12 profiles. |
| `INTEGRATED_VALIDATION_GATES.md` | Gates required for an integrated modular dry-run excellent pass. |

## Interpretation Order

When there is apparent tension between documents, use the stricter safe reading in this order:

1. explicit human/project instruction for the current task;
2. canonical base agent contract;
3. corresponding documentary kernel contract;
4. this shared seniorization-lab contract set;
5. local Senior Agent Profile manifest and behavior modules;
6. local profile validation files.

These contracts cannot grant extra authority. They can only constrain, normalize, or block unsafe interpretation.

## Non-Goals

This directory is not a materializer, runtime loader, prompt template library, target repository output, generated agent pack, replacement for kernels, or permission to use `reference/agents/` as a final source. `reference/agents/`, if mentioned, remains only a temporary development parity baseline.
