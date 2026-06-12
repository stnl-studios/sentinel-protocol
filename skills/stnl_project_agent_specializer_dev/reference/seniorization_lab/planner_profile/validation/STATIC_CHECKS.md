# planner Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`planner_profile` module and do not authorize runtime loading, materialization,
target writes, productive-skill changes, template changes, or global contract
creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `planner_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `planner_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive planner-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what planner may and must not do. | Boundary is absent or allows downstream work. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve planner kernel anchors. | Profile names bounded planning, ephemeral `EXECUTION BRIEF`, scope boundary, anti-inference, no implementation, no validation pack, and no execution package. | Anchors are missing or replaced by generic statements. |
| `DECISION_HEURISTICS_PRESENT` | Make planning judgment operational. | Profile gives planner-specific heuristics for briefs, blockers, DEV decisions, design signals, validation notes, package dependencies, and scope changes. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep planner bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and planning-vs-implementation reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior planning risk detection. | Profile lists planner-specific scope, source, dependency, downstream ambiguity, overreach, bloat, and runtime leakage risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid planning handoff. | Profile defines minimum input/output, `EXECUTION BRIEF` shape, blocker shape, handoff to validation design, and fact/decision/blocker separation. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent assumption from replacing evidence. | Profile distinguishes DEV decisions, source of truth, artifacts, blockers, risks, and hypotheses. | Evidence section accepts informal claims or silence as approval. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, validation design, package design, design resolution, implementation, validation execution, review, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/orchestrator profile, project-doc dumping, generic seniority, and runtime instructions. | Profile invites long copies, general docs, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to planner. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, or materializers. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_ORCHESTRATOR_PROFILE_COPY` | Preserve planner-specific authorship. | Shape may align with `orchestrator_profile`, but content is planner-specific. | Planner profile copies orchestrator-specific routing language or scenarios as planner content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to cut framing, scope, `EXECUTION BRIEF`, blockers, reading budget, and downstream handoff. | Seniority is described only in generic leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits planner from validation design, package design, design ownership, coding, validation, review, finalization, resync, and orchestration. | Any downstream role is assigned to planner. |
| `PLANNING_DISCIPLINE_PRESENT` | Preserve planner mission. | Profile centers accepted demand to small honest cut and planning handoff. | Planning discipline is secondary or replaced by implementation, proof, or package content. |
| `EXECUTION_BRIEF_DISCIPLINE_PRESENT` | Preserve canonical planner artifact. | Profile treats `EXECUTION BRIEF` as bounded, auditable, and ephemeral when required. | Brief is absent, durable by default, oversized, or treated as execution authorization. |
| `SCOPE_BOUNDARY_PRESENT` | Preserve cut boundary. | Profile explicitly requires in-scope, out-of-scope, non-goals, constraints, and negative space. | Scope boundary is missing, implicit, or left for downstream owners. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve anti-inference. | Profile requires block/ask behavior when objective, scope, source, artifact, or decision is missing. | Missing inputs can be guessed, buried as assumptions, or passed downstream. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design boundary. | Profile says planner prepares validation-aware notes but never creates `VALIDATION PACK`. | Planner is allowed to define proof strategy, harness commands, or validation sufficiency. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design boundary. | Profile says planner may name dependencies but never creates package mechanics. | Planner is allowed to define package ids, owned paths, commands, acceptance checks, or block-if rules. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits code, edits, implementation steps, and final technical decisions. | Planner is allowed to implement, edit, or specify code-level solution details. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says second of 12 but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `SECOND_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the second-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `PLANNER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references planner-specific cut framing, `EXECUTION BRIEF`, bounded reading, validation-aware notes, package-shaping limits, and `NEEDS_DEV_DECISION_BASE` behavior. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `planner_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
