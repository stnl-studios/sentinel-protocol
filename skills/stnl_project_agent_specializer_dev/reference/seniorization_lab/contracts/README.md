# Seniorization Lab Contracts

Status: `DOCUMENTARY_DEV_ONLY`.

This directory defines global contracts for the 12 Senior Agent Profiles under
`skills/stnl_project_agent_specializer_dev/reference/seniorization_lab/`.

These contracts are documentary reference material only. They do not create a
runtime, do not materialize agents, do not replace canonical base agents, do not
replace documentary kernels, and do not authorize writes to target repositories,
`.github`, `.codex`, `AGENTS.md`, templates, `sentinel.mjs`, smoke scripts, or
production skill paths.

## Purpose

The contracts close the global alignment layer that is shared by all 12 Senior
Agent Profiles.

They answer system-level questions that should not be duplicated independently
inside each profile:

- what the seniorization lab is and is not;
- which 12 profiles belong to the complete set;
- how the profiles relate to canonical base agents and documentary kernels;
- what minimum safety bundle remains non-optional;
- how handoffs move through the full profile chain;
- what gates are required before the integrated profile set can earn an
  excellent pass.

## Contract Set

| file | purpose |
|---|---|
| `CONTRACT.md` | Global seniorization-lab boundary and interpretation contract. |
| `MINIMUM_SAFE_BUNDLE.md` | Non-optional safety rules shared by all profiles. |
| `PROFILE_SET_INDEX.md` | Catalog of the 12 profiles, their canonical anchors, primary artifacts, and boundaries. |
| `HANDOFF_CHAIN_CONTRACT.md` | Integrated handoff sequence and blocking rules across the 12 profiles. |
| `INTEGRATED_VALIDATION_GATES.md` | Gates required for an integrated dry-run excellent pass. |

## Interpretation Order

When there is apparent tension between documents, use the stricter safe reading
in this order:

1. explicit human/project instruction for the current task;
2. canonical base agent contract;
3. corresponding documentary kernel contract;
4. this shared seniorization-lab contract set;
5. local Senior Agent Profile;
6. local profile validation files.

These contracts cannot grant extra authority. They can only constrain,
normalize, or block unsafe interpretation.

## Non-Goals

This directory is not:

- a materializer;
- a runtime loader;
- a prompt template library;
- a target repository output;
- a generated agent pack;
- a replacement for `reference/agents/*.agent.md`;
- a replacement for `reference/kernel_lab/*_kernel/**`;
- a shortcut for testing fewer than all 12 profiles.
