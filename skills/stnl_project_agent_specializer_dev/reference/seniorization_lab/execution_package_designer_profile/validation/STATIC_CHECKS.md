# execution-package-designer Senior Profile Static Checks

These static checks are documentary/dev-only and non-runtime. They validate the
local `execution_package_designer_profile` module and do not authorize runtime
loading, materialization, target writes, productive-skill changes, template
changes, or global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `execution_package_designer_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `execution_package_designer_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive execution-package-designer-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what `execution-package-designer` may and must not do. | Boundary is absent or allows planning, proof design, implementation, validation execution, review, finalization, resync, or coordination takeover. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names package design after planning/proof design, ephemeral `EXECUTION PACKAGE`, package readiness, owner-safe fields, and no downstream role takeover. | Anchors are missing or replaced by generic package language. |
| `DECISION_HEURISTICS_PRESENT` | Make package-design judgment operational. | Profile gives heuristics for packages, blockers, fields, owner candidates, command/check reality, dependency handling, and refusal of disguised roles. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep package design targeted. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and package-design-vs-implementation/proof reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior package-risk detection. | Profile lists package, ownership, path, command, acceptance, blocker, authorization, role-drift, runtime leakage, and bloat risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid package handoff. | Profile defines minimum input/output, package shape, blocker shape, coder handoff, and fact/decision/package/blocker separation. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent package fields from replacing evidence. | Profile distinguishes source-backed fields, real commands, proof-derived checks, verified paths, real dependencies, and authorization. | Evidence section accepts assumptions, command wishes, or coder discretion as evidence. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, replanning, validation pack creation, proof sufficiency decisions, design resolution, implementation, execution, review, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/reference profiles, project-doc dumping, repo/test inventory, generic seniority, and runtime instructions. | Profile invites long copies, general docs, complete inventories, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to execution-package-designer. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, materializers, `sentinel.mjs`, or smoke scripts. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_ORCHESTRATOR_PROFILE_COPY` | Preserve package-specific authorship. | Shape may align with `orchestrator_profile`, but content is package-design specific. | Profile copies orchestrator routing language or scenarios as package-designer content. |
| `NO_PLANNER_PROFILE_COPY` | Preserve package-specific authorship. | Shape may align with `planner_profile`, but content is package-design specific. | Profile copies planner cut-framing language or scenarios as package-designer content. |
| `NO_VALIDATION_EVAL_DESIGNER_PROFILE_COPY` | Preserve package-specific authorship. | Shape may align with `validation_eval_designer_profile`, but content is package-design specific. | Profile copies proof-design language or scenarios as package-designer content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to `EXECUTION PACKAGE`, package boundary, ownership, dependencies, commands, acceptance checks, blockers, and coder handoff. | Seniority is described only in generic leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits package designer from planning, proof design, design ownership, coding, validation execution, review, finalization, resync, and orchestration. | Any downstream or upstream role is assigned to package designer. |
| `EXECUTION_PACKAGE_DISCIPLINE_PRESENT` | Preserve canonical package artifact. | Profile treats `EXECUTION PACKAGE` as ephemeral, current-round, package-design handoff when applicable. | Package is absent, durable by default, oversized, or treated as implementation authorization. |
| `PACKAGE_BOUNDARY_DISCIPLINE_PRESENT` | Preserve safe package scope. | Profile requires approved scope, non-goals, objective, package fields, owner candidate, and stop conditions before coder entry. | Package boundary is vague, broad, or left for coder to discover. |
| `OWNED_PATHS_DISCIPLINE_PRESENT` | Preserve edit-authority boundary. | Profile requires `OWNED_PATHS` to be source-backed, narrow, and owner-safe. | `OWNED_PATHS` can be guessed, broad prose, or deferred to coder discovery. |
| `DO_NOT_TOUCH_DISCIPLINE_PRESENT` | Protect non-package surfaces. | Profile requires `DO_NOT_TOUCH` when shared files, contracts, docs, generated assets, or owners need protection. | Protected surfaces can be omitted or treated as optional. |
| `DEPENDS_ON_DISCIPLINE_PRESENT` | Preserve dependency and sequence facts. | Profile requires known dependencies to be explicit and traceable. | Dependencies can be omitted, guessed, or hidden inside prose. |
| `RUN_COMMANDS_DISCIPLINE_PRESENT` | Prevent command invention. | Profile requires `RUN_COMMANDS` to be real, source-backed, and package-local when present. | Commands can be invented, generic, or copied without source. |
| `ACCEPTANCE_CHECKS_DISCIPLINE_PRESENT` | Preserve proof mapping. | Profile requires `ACCEPTANCE_CHECKS` to map to `VALIDATION PACK` obligations. | Acceptance checks can be invented, generic, or disconnected from proof design. |
| `BLOCK_IF_DISCIPLINE_PRESENT` | Preserve early blockage. | Profile requires concrete `BLOCK_IF` conditions for material package risks. | Stop conditions are missing, vague, or delegated to coder judgment. |
| `CODER_HANDOFF_DISCIPLINE_PRESENT` | Enable bounded execution without direct routing. | Profile prepares coder-ready package facts and returns to orchestrator, not directly to coders. | Handoff routes directly to coder, coordinates coders, or passes ambiguous decisions downstream. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve safe stop. | Profile requires block/ask behavior when brief, pack, source, owner, path, command, dependency, proof mapping, or authorization is missing. | Missing inputs can be guessed, buried as assumptions, or passed downstream. |
| `NO_PLANNER_TAKEOVER` | Preserve planning boundary. | Profile says it preserves the planner cut and returns scope conflicts upstream. | Profile replans, rewrites scope, or chooses new cuts. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design artifact boundary. | Profile says it consumes but never creates or redesigns `VALIDATION PACK`. | Profile creates validation pack, proof strategy, harness sufficiency, or validation bar. |
| `NO_VALIDATION_EVAL_DESIGNER_TAKEOVER` | Preserve proof-design authority. | Profile maps existing proof obligations but never decides proof sufficiency. | Profile invents proof obligations or decides validation sufficiency. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits code, edits, pseudo-code dumps, implementation steps, and final technical decisions. | Profile is allowed to implement, edit, or prescribe code-level solution. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve proof-execution boundary. | Profile prohibits executing commands, interpreting logs as final proof, and emitting runner verdicts. | Profile is allowed to run validation or declare pass/fail/partial. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic-review boundary. | Profile may preserve review-sensitive constraints but cannot perform reviewer judgment. | Profile performs semantic review or substitutes reviewer approval. |
| `NO_FINALIZER_TAKEOVER` | Preserve closure boundary. | Profile cannot close the round, decide `DONE`, or perform resync. | Profile finalizes or treats package readiness as closure. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says fourth of 12 but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `FOURTH_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the fourth-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `EXECUTION_PACKAGE_DESIGNER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE`, work package fields, ownership, package blockers, and coder handoff boundaries. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `execution_package_designer_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
