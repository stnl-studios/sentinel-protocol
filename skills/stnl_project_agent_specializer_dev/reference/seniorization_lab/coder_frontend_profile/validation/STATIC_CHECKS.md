# coder-frontend Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`coder_frontend_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes, or
global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `coder_frontend_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `coder_frontend_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive `coder-frontend`-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what `coder-frontend` may and must not do. | Boundary is absent or allows non-front-end ownership. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names package authority, `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `DEPENDS_ON`, `BLOCK_IF`, UI quality, evidence, and role boundaries. | Anchors are missing or replaced by generic execution statements. |
| `DECISION_HEURISTICS_PRESENT` | Make front-end execution judgment operational. | Profile gives specific heuristics for accepting, blocking, limiting, implementing, and handing off front-end work. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep executor reading bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and execution-vs-planning reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior risk detection. | Profile lists package, path, UI, state, accessibility, responsive, contract, evidence, role, and runtime leakage risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid executor handoff. | Profile defines minimum input/output, package consumption, evidence, limitations, blockers, and handoff to `validation-runner`. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent visual confidence from replacing proof. | Profile distinguishes applied change, local evidence, not-run checks, limitations, and final validation authority. | Evidence section accepts "looks fine", absence of error, or command intent as success. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, planning, validation design, package design, design ownership, backend, iOS, validation execution, review, finalization, and resync takeover. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/prior profiles, project-doc dumping, generic seniority, runtime instructions, refactor plans, and design specs. | Profile invites long copies, general docs, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to `coder-frontend`. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, or materializers. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_PRIOR_PROFILE_COPY` | Preserve agent-specific authorship. | Shape may align with prior profiles, but content is `coder-frontend`-specific. | Profile copies orchestrator or planner routing/planning language as frontend content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to package-bound front-end implementation, UI quality, evidence, blockers, and handoff. | Seniority is described only in generic engineering terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits validation design, package design, design ownership, backend, iOS, validation execution, review, finalization, resync, and orchestration. | Any downstream role is assigned to `coder-frontend`. |
| `FRONTEND_EXECUTION_DISCIPLINE_PRESENT` | Preserve executor mission. | Profile centers web/browser UI implementation inside an authorized package. | Front-end execution discipline is secondary or replaced by planning/design/backend work. |
| `EXECUTION_PACKAGE_REQUIRED_PRESENT` | Preserve package gate. | Profile requires valid `EXECUTION PACKAGE` and `WORK_PACKAGE_ID` before execution. | Coder may execute from direct request, stale handoff, or implied permission. |
| `OWNED_PATHS_DISCIPLINE_PRESENT` | Preserve edit authority. | Profile treats `OWNED_PATHS` as binding and blocks on absent, broad, or conflicting ownership. | Profile allows path expansion or ambiguous ownership. |
| `DO_NOT_TOUCH_DISCIPLINE_PRESENT` | Preserve protected paths. | Profile blocks when needed edits conflict with `DO_NOT_TOUCH`. | Profile allows reinterpretation or bypass of protected paths. |
| `DEPENDS_ON_DISCIPLINE_PRESENT` | Preserve dependency ordering. | Profile blocks on unresolved dependencies that affect implementation safety. | Profile allows execution despite material unresolved dependencies. |
| `BLOCK_IF_DISCIPLINE_PRESENT` | Preserve explicit block conditions. | Profile treats true or unverifiable `BLOCK_IF` as a blocker. | Profile treats block conditions as advisory. |
| `ACCESSIBILITY_RESPONSIVENESS_AWARENESS_PRESENT` | Preserve UI quality anchors. | Profile includes semantic, focus, keyboard, assistive, layout, overflow, breakpoint, and responsive awareness. | Accessibility or responsive behavior is absent or superficial. |
| `UI_CONTRACT_DISCIPLINE_PRESENT` | Preserve local UI contracts. | Profile requires existing component, state, route, data-flow, design-system, and shared UI contracts to be preserved. | Profile allows contract changes by preference or local convenience. |
| `NO_BACKEND_API_SCHEMA_AUTH_PERSISTENCE_TAKEOVER` | Prevent backend authority drift. | Profile prohibits inventing or implementing backend/API/schema/auth/permission/persistence semantics. | Profile allows backend contract invention or edits outside frontend authority. |
| `NO_IOS_NATIVE_TAKEOVER` | Prevent native scope drift. | Profile prohibits native iOS/Swift/SwiftUI/UIKit implementation. | Profile treats native mobile work as frontend execution. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve validation ownership. | Profile reports local evidence but does not run or own validation verdict. | Profile claims final validation success or replaces `validation-runner`. |
| `NO_REVIEWER_FINALIZER_RESYNC_TAKEOVER` | Preserve downstream closure boundaries. | Profile prohibits semantic review, finalization, closure ledger, durable docs, and resync ownership. | Profile performs or authorizes review, closure, or resync. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve honest stop behavior. | Profile requires `BLOCKED` for missing package, unsafe inference, path conflict, capability gap, or partial edits without safe completion. | Missing inputs can be guessed, buried as limitations, or passed downstream. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says one of 12 but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `ONE_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the one-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `CODER_FRONTEND_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references front-end execution, browser UI, components, state, accessibility, responsiveness, UI contracts, and package evidence. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `coder_frontend_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
