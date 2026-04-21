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

Use `orchestrator` as the entry point for Sentinel-governed work unless the human request explicitly names a narrower agent or bypasses the workflow.

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
