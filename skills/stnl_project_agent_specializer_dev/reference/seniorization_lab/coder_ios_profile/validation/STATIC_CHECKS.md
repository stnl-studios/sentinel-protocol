# coder-ios Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`coder_ios_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes,
materializer changes, GitHub writes, smoke-script changes, or global contract
creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `coder_ios_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `coder_ios_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, agent execution, or materialization. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive `coder-ios`-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what `coder-ios` may and must not do. | Boundary is absent or allows planning, package design, validation, review, finalization, resync, web frontend, backend, or design takeover. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names package authority, `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `DEPENDS_ON`, `BLOCK_IF`, Swift/SwiftUI-first discipline, conditional UIKit interop, iOS guardrail use, evidence, and role boundaries. | Anchors are missing or replaced by generic execution statements. |
| `DECISION_HEURISTICS_PRESENT` | Make native iOS execution judgment operational. | Profile gives specific heuristics for accepting, blocking, reading, editing, reporting, and handing off iOS work. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep executor reading bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and execution-vs-planning/package/proof/review reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior iOS risk detection. | Profile lists package, path, platform, SwiftUI/UIKit, lifecycle, navigation, state, concurrency, persistence, permissions, accessibility, command, evidence, role, and runtime risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid executor handoff. | Profile defines minimum input/output, package consumption, touched paths, changed behavior, evidence, commands, blockers, residual risks, and handoff to `validation-runner`. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent intention from replacing implementation evidence. | Profile distinguishes applied implementation, commands run, commands not run, inspection confidence, final validation, review, closure, blockers, and limitations. | Evidence section accepts "should compile", no visible error, code edit, or command intent as validation. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, planning, proof design, package design, design ownership, frontend, backend, validation execution, review, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major upstream/downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/prior profiles, project-doc dumping, generic seniority, complete iOS manual bloat, protocol manual bloat, and runtime instructions. | Profile invites long copies, general docs, runtime instructions, or broad manuals. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to `coder-ios`. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, materializers, runtime loaders, `sentinel.mjs`, or smoke scripts. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_PRIOR_PROFILE_COPY` | Preserve agent-specific authorship. | Shape may align with prior profiles, but content is `coder-ios`-specific. | Profile copies backend, frontend, planner, orchestrator, designer, or package-designer content as iOS content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to native iOS package execution, Swift/SwiftUI, platform boundaries, blockers, evidence, and handoff. | Seniority is described only in generic judgment or leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits validation design, package design, design ownership, frontend/backend implementation, validation execution, review, finalization, resync, and orchestration. | Any downstream or upstream role is assigned to `coder-ios`. |
| `IOS_EXECUTION_DISCIPLINE_PRESENT` | Preserve executor mission. | Profile centers authorized native iOS implementation inside an approved package. | iOS execution is secondary, generic, or mixed with planning/review. |
| `EXECUTION_PACKAGE_REQUIRED` | Preserve package gate. | Profile requires valid current-round `EXECUTION PACKAGE` and `WORK_PACKAGE_ID` before execution. | Execution can proceed without a valid package, stale handoff, or explicit approval. |
| `PACKAGE_BOUNDARY_PRESENT` | Preserve package authority. | Profile treats package fields as binding constraints and blocks when safe work exceeds them. | Package fields are optional, locally rewritten, or treated as suggestions. |
| `OWNED_PATHS_DISCIPLINE_PRESENT` | Preserve edit authority. | Profile requires edits to stay inside `OWNED_PATHS` or explicit package authority. | Profile permits path expansion or ambiguous ownership by executor judgment. |
| `DO_NOT_TOUCH_DISCIPLINE_PRESENT` | Preserve protected paths. | Profile blocks when needed edits conflict with `DO_NOT_TOUCH`. | Profile allows reinterpretation, bypass, relocation, or workaround of protected paths. |
| `DEPENDS_ON_DISCIPLINE_PRESENT` | Preserve dependency ordering. | Profile blocks on unresolved dependencies that affect safe implementation. | Profile allows execution despite material unresolved dependencies. |
| `BLOCK_IF_DISCIPLINE_PRESENT` | Preserve explicit blockers. | Profile treats true or unverifiable `BLOCK_IF` as a blocker. | Profile treats block conditions as advisory or locally overridable. |
| `IOS_PLATFORM_BOUNDARY_PRESENT` | Preserve Apple-platform constraints. | Profile covers iOS target, lifecycle, scene, navigation, capabilities, entitlements, signing, schemes, simulator, project settings, and platform conventions. | Platform constraints are absent, superficial, or left for validation-runner to resolve. |
| `SWIFT_SWIFTUI_UIKIT_AWARENESS_PRESENT` | Preserve native implementation shape. | Profile keeps Swift/SwiftUI as default and UIKit interop conditional on repo evidence or package need. | Profile is generic mobile, UIKit-heavy by preference, or lacks Swift/SwiftUI boundary. |
| `APPLIED_CHANGE_EVIDENCE_PRESENT` | Preserve validation-eligible executor output. | Profile requires touched paths or equivalent evidence, changed behavior, commands run/not run, blockers, limitations, and residual risks. | Handoff can be narrative, evidence-free, intention-only, or finalization-like. |
| `VALIDATION_RUNNER_HANDOFF_PRESENT` | Preserve downstream handoff. | Profile prepares evidence for `validation-runner` without issuing a validation verdict. | Profile omits next owner, declares validation pass, or asks runner to resolve upstream ambiguity. |
| `NO_PLANNING_TAKEOVER` | Preserve planner boundary. | Profile prohibits defining the round cut, objective, or execution brief. | `coder-ios` is allowed to plan or reframe the cut. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design boundary. | Profile says `coder-ios` consumes but never creates or rewrites `VALIDATION PACK`. | `coder-ios` is allowed to design proof strategy or validation sufficiency. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design boundary. | Profile says `coder-ios` consumes but never creates, repairs, recompiles, or reinterprets `EXECUTION PACKAGE`. | `coder-ios` is allowed to define package mechanics or choose owned paths. |
| `NO_DESIGNER_TAKEOVER` | Preserve design ownership. | Profile prohibits resolving UX, interaction, visual, accessibility tradeoff, product, or IA decisions not supplied by upstream source. | `coder-ios` invents design/product decisions by preference. |
| `NO_FRONTEND_TAKEOVER` | Preserve web frontend boundary. | Profile prohibits implementing traditional web/browser frontend work. | `coder-ios` absorbs React, HTML, CSS, browser routing, or web component work. |
| `NO_BACKEND_TAKEOVER` | Preserve backend boundary. | Profile prohibits backend/API/schema/auth/payload/persistence/server behavior invention or implementation. | `coder-ios` invents or edits backend contracts outside package authority. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve validation ownership. | Profile reports local evidence but does not execute or own formal validation verdict. | Profile claims final validation success, `PASS`, or replaces `validation-runner`. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic-review boundary. | Profile may name review-sensitive risk but cannot perform review or approval. | Profile issues architecture review verdicts or correction packs. |
| `NO_FINALIZER_TAKEOVER` | Preserve closure boundary. | Profile cannot close the round, decide `DONE`, or perform closure ledger. | Profile finalizes, marks done, or treats executor readiness as closure. |
| `NO_RESYNC_TAKEOVER` | Preserve sync boundary. | Profile does not perform resync or durable documentation sync. | Profile updates shared docs, decides resync, or substitutes `resync`. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says it is part of 12-profile construction but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `CODER_IOS_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references native iOS, Swift, SwiftUI, UIKit interop, Apple platform boundaries, lifecycle, navigation, state, concurrency, persistence, permissions, accessibility, performance, iOS tests, and package evidence. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `coder_ios_profile`;
- productive skill mutation;
- template mutation;
- `sentinel.mjs` or smoke-script mutation;
- global contract creation;
- profiles for other agents.
