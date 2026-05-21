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
The managed runtime config lives in `.codex/config.toml` and must preserve `[agents].max_depth = 1`.

For Sentinel-governed work, the main/root Codex session is the human-visible workspace entrypoint. It must not spawn custom subagents automatically. Custom subagents may be spawned only when the human explicitly requests a custom agent by exact name, such as `Use orchestrator`, `Use planner`, `Use coder-frontend`, `Use validation-runner`, or another materialized `.codex/agents/*.toml` name.

When a custom subagent is explicitly authorized, the handoff must use Codex native custom-agent spawning, but it must not depend on full-history fork inheritance. The routing payload sent to a subagent must be a minimal, task-scoped routing payload: task, repo, SPEC path when applicable, mode, objective, active decisions, and an instruction to read applicable `AGENTS.md`, developer instructions, Sentinel docs/templates, and allowed repository docs/codebase. The durable Sentinel instructions must come from `AGENTS.md`, the materialized `.codex/agents/*.toml`, Sentinel source templates/docs, and repository documentation/codebase allowed by the active workflow.

The `orchestrator` custom subagent is the Sentinel routing controller when explicitly invoked. The orchestrator owns gate routing and specialist handoffs, while preserving role boundaries and never absorbing implementation, validation, review, package design, or finalization responsibilities.

## Explicit Subagent Invocation Contract
Skill/workflow requests are not subagent authorization. `Use stnl_spec_manager`, `Use stnl_project_context`, or `Use stnl_project_agent_specializer` means run that skill/workflow from root/main unless the human also explicitly requests a custom subagent by exact agent name.

When the human explicitly requests `Use orchestrator`, root/main may spawn `orchestrator` and must use Codex Parent-Mediated Routing Contract: `orchestrator` returns a compact `ROUTE_PACKET`; root/main spawns the named owner as a sibling/root-level native custom subagent; root/main returns to `orchestrator` for the next routing decision.

Without explicit subagent authorization, do not spawn `orchestrator`, `planner`, `validation-eval-designer`, `execution-package-designer`, `coder-backend`, `coder-frontend`, `coder-ios`, `validation-runner`, `reviewer`, `finalizer`, or `resync`.

If a requested task cannot be performed safely without a custom subagent and none was explicitly authorized, stop with `SUBAGENT_AUTH_REQUIRED`: include the needed agent, short reason, and the minimum prompt preserving objective/context so the human can rerun with `Use <agent>`.

## Codex Parent-Mediated Routing Contract
When `orchestrator` is explicitly requested, Sentinel routing is parent-mediated. The orchestrator must return a compact ROUTE_PACKET naming the next canonical owner. The orchestrator must not spawn downstream Sentinel owners directly. The root/main session then spawns the named owner as a native custom subagent by exact custom agent name, waits for its compact result, and must return to orchestrator for the next routing decision.

This preserves the Codex primary visual layer and avoids nested owner threads while keeping orchestrator-owned gate routing. root/main must not choose owners on its own except from a valid ROUTE_PACKET, explicit human request for a specific custom agent by exact name, or documented recovery/blocking behavior. Direct root-to-owner spawning is not the default Sentinel-governed path. A root/main owner spawn is valid only after a valid ROUTE_PACKET or an explicit custom-agent request by exact name.

`ROUTE_PACKET` shape: `STATUS: ROUTE_READY | BLOCKED | TERMINAL`, `CURRENT_GATE`, `NEXT_OWNER`, `REASON`, `PAYLOAD`, and `BLOCKER` only when real. It must be compact, must not include full artifacts, full contracts, SPEC/checklist/logs/diffs, and should return path plus compact summary when rich artifacts are needed.

## Runtime Hardening
Sentinel-managed Codex agents must declare `model`, `model_reasoning_effort`, and `sandbox_mode` in their `.codex/agents/*.toml` definitions.
Use `read-only` for roles that only read, analyze, route, review, or design. Use `workspace-write` only for roles that need to edit files or execute local commands.

The sandbox is a runtime capability boundary, not a role boundary replacement. Agents must not absorb responsibility from another Sentinel role because their sandbox technically permits an action.

`model` and `model_reasoning_effort` are operational configuration. Text inside agent instructions is not a substitute for those fields.

In Codex, Sentinel handoff means native custom subagent spawn by exact agent name after explicit human authorization. When `Use orchestrator` is explicit, the orchestrator is the route decision owner, not the downstream owner spawn executor. The orchestrator must return a compact ROUTE_PACKET and must not spawn downstream Sentinel owners directly. Refusing a full-history fork is not itself a routing failure if Codex still creates a native agent thread for the requested custom subagent.

A prompt-emulated handoff is forbidden: do not call the orchestrator "without fork" by pasting the full Sentinel contract into a normal prompt, do not claim that such prompt replay preserves native handoff, and do not continue locally as another Sentinel role. You must never emulate handoff with `codex exec`, shell, subprocesses, scripts, local CLI calls, or local continuation. If explicit subagent authorization exists but native custom-agent spawning cannot create the requested agent thread, stop with `ROUTING_RUNTIME_BLOCKED`. If root/main cannot spawn the owner named in a valid `ROUTE_PACKET`, depth/config blocks routing, or the target owner agent is missing, stop with `ROUTING_RUNTIME_BLOCKED`. The block must include attempted owner, current gate, missing runtime capability or config, and minimum DEV action needed.

Quality guardrails are skills/constraints, not routeable agents. `.codex/config.toml` must preserve `[agents].max_depth = 1`. This permits explicitly authorized direct subagents of root/main, including `orchestrator` and owners named by a valid `ROUTE_PACKET`, while blocking nested owner threads below `orchestrator` or any non-orchestrator agent.

## Compact Agent Return Contract
Subagent returns must be compact and gate-oriented: return only the minimum needed for the parent to decide the next gate.

Default return shape:
- `STATUS: DONE | BLOCKED | PARTIAL | FAILED`
- `OWNER: <agent-name>`
- `GATE: <current gate or next gate>`
- `FILES_CHANGED: <paths or none>`
- `NEXT_OWNER: <agent-name or none>`
- `VALIDATIONS: <command: pass/fail/not-run + short reason>`
- `BLOCKER: <only if real blocker>`
- `NOTES: <max 3 short bullets>`

Do not repeat the full Sentinel contract, the full user prompt, or long reasoning. Do not paste full SPEC, checklist, logs, or diffs. Do not paste complete artifacts into chat when they were written to files; return artifact path plus compact summary.

Expand only on blocker, failure, critical validation evidence, or explicit human request. Keep the main chat focused on routing/status deltas.

## Managed Agents
{{AGENT_LIST}}
## Operating Rules
- Preserve the canonical Sentinel gate order, role classes, ownership, and handoff semantics.
- Do not route to an agent that is not present in `.codex/agents/`.
- Do not treat this file as the source of truth for project facts; project facts come from `docs/**` and the project codebase when the workflow allows it.
- Do not materialize or edit Sentinel-managed agents outside `.codex/agents/` unless the active specialization run is explicitly targeting Codex and updating this generated file.
- Keep rich intermediate artifacts inside the owning agent handoff by default; do not dump execution briefs, validation packs, or long evidence bundles into the main chat unless the human asks for them.

## Local Notes
Local Notes must stay compact and stable. They may include target repo shape, docs entrypoints, command/gap notes, and local constraints, but must not duplicate the Sentinel contract, SPEC contents, checklists, logs, diffs, or large artifacts.
{{LOCAL_NOTES}}
