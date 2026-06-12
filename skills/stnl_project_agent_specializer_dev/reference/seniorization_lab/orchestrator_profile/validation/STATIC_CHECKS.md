# orchestrator Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`orchestrator_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes, or
global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `orchestrator_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `orchestrator_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only/documentary. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive orchestrator-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what orchestrator may and must not do. | Boundary is absent or allows downstream work. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names routing safety, authority, safe stop, no invention, no execution, handoff auditability, and protocol sequence. | Anchors are missing or replaced by generic statements. |
| `DECISION_HEURISTICS_PRESENT` | Make routing operational. | Profile gives specific routing heuristics for all canonical downstream agents and block cases. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep router lightweight. | Profile defines first reads, conditional reads, stop points, and anti-broad-scan rules. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior risk detection. | Profile lists orchestrator-specific routing, handoff, evidence, loop, scope, leakage, and role risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve routeable handoffs. | Profile defines minimum input/output, next owner, reason, blockers, traceability, and anti-bloat handoff rules. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent status from replacing proof. | Profile distinguishes claim from evidence and routes to runner/reviewer/finalizer as needed. | Evidence section accepts informal claims or no-error status. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits replacing every downstream owner class. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base, project-doc dumping, generic seniority, and runtime instructions. | Profile invites long copies, general docs, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to orchestrator. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, or materializers. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to orchestrator routing, authority, gates, handoffs, evidence, and blockers. | Seniority is described only in generic leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits orchestrator from planning, proof design, packaging, design, coding, running validation, reviewing, finalizing, or resyncing. | Any downstream role is assigned to orchestrator. |
| `ROUTING_DISCIPLINE_PRESENT` | Preserve router mission. | Profile centers gate, owner, reason, status, and blocker decisions. | Routing discipline is secondary or absent. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve closed failure. | Profile requires block/ask behavior when inputs, evidence, authority, or artifacts are missing. | Missing inputs can be guessed or bypassed. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says first of 12 but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `FIRST_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the first-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `ORCHESTRATOR_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references orchestrator-specific gates, route owners, handoff artifacts, evidence boundaries, and anti-role-drift. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `orchestrator_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
