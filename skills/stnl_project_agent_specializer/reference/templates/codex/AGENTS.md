# {{PROJECT_NAME}} Agents

<!--
managed_artifact: true
target: codex
source_template: stnl_project_agent_specializer/reference/templates/codex/AGENTS.md

This file is generated in the target repository. Do not edit it directly when the
Sentinel-managed agent system is being regenerated.
-->

## Runtime Contract
This repository uses Sentinel Protocol agents materialized for Codex.

The managed agent definitions live in `.codex/agents/`.
The managed runtime config lives in `.codex/config.toml` and must preserve `[agents].max_depth = 2`.

For Sentinel-governed work, the main/root Codex session is the visual entrypoint and must apply the Sentinel orchestrator boundary itself. Read only what is needed to identify the current gate and canonical owner, then spawn the next owner directly as a native custom subagent by exact agent name, wait for the result, and decide the next gate while keeping the main chat delta-only.

The `orchestrator` custom subagent exists as an available specialist, explicit fallback, and role-boundary reference. Do not spawn `orchestrator` as the default first task unless the human explicitly asks for the `orchestrator` subagent.

## Runtime Hardening
Sentinel-managed Codex agents must declare `model`, `model_reasoning_effort`, and `sandbox_mode` in their `.codex/agents/*.toml` definitions.

Use `read-only` for roles that only read, analyze, route, review, or design. Use `workspace-write` only for roles that need to edit files or execute local commands.

The sandbox is a runtime capability boundary, not a role boundary replacement. Agents must not absorb responsibility from another Sentinel role because their sandbox technically permits an action.

`model` and `model_reasoning_effort` are operational configuration. Text inside agent instructions is not a substitute for those fields.

In Codex, Sentinel handoff means native custom subagent spawn by exact agent name. The root/main session must spawn the current canonical owner directly. You must never emulate handoff with `codex exec`, shell, subprocesses, scripts, or local continuation. If native spawning is unavailable, depth/config blocks routing, or the target agent is missing, stop with `ROUTING_RUNTIME_BLOCKED`.

Quality guardrails are skills/constraints, not routeable agents. `.codex/config.toml` must preserve `[agents].max_depth = 2`.

## Managed Agents
{{AGENT_LIST}}

## Operating Rules
- Preserve the canonical Sentinel gate order, role classes, ownership, and handoff semantics.
- Do not route to an agent that is not present in `.codex/agents/`.
- Do not treat this file as the source of truth for project facts; project facts come from `docs/**` and the project codebase when the workflow allows it.
- Do not materialize or edit Sentinel-managed agents outside `.codex/agents/` unless the active specialization run is explicitly targeting Codex and updating this generated file.
- Keep rich intermediate artifacts inside the owning agent handoff by default; do not dump execution briefs, validation packs, or long evidence bundles into the main chat unless the human asks for them.

## Local Notes
{{LOCAL_NOTES}}
