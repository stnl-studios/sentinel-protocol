# designer Senior Profile Static Checks

These static checks are documentary/dev-only and non-runtime. They validate the
local `designer_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes, or
global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `designer_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `designer_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive designer-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what `designer` may and must not do. | Boundary is absent or allows planning, package, implementation, validation, review, finalization, or resync takeover. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names optional design-contributor status, real UX impact, targeted-local reading, `READY`/`BLOCKED`, no durable docs, no pack ownership, no implementation, no validation running, and no resync/finalization. | Anchors are missing or replaced by generic design language. |
| `DECISION_HEURISTICS_PRESENT` | Make design judgment operational. | Profile gives heuristics for design decisions, blockers, sources, accessibility, responsive behavior, states, content, downstream inputs, and disguised-role refusal. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep design reading targeted. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, design-vs-implementation reading, and design-vs-review reading. | Reading rules are missing or encourage broad audit or implementation reconnaissance. |
| `RISK_TAXONOMY_PRESENT` | Support senior design-risk detection. | Profile lists design intent, product decision, UX/design-system source, accessibility, responsive, interaction, content, preference, role-drift, runtime leakage, and bloat risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid design handoff. | Profile defines minimum input/output, decision/recommendation/blocker shape, downstream owner preparation, and fact/decision/constraint/blocker separation. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent preference from replacing evidence. | Profile distinguishes design source, decision, preference, blocker, accessibility, responsive, content, design-system rule, and downstream authority. | Evidence section accepts aesthetic preference, silence, or assumptions as material decisions. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, replanning, validation pack creation, execution package creation, implementation, validation execution, review, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/reference profiles, project-doc dumping, visual inventories, style-guide clones, generic seniority, and runtime instructions. | Profile invites long copies, broad audits, inventories, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to `designer`. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, materializers, `sentinel.mjs`, or smoke scripts. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_ORCHESTRATOR_PROFILE_COPY` | Preserve designer-specific authorship. | Shape may align with `orchestrator_profile`, but content is design-contribution specific. | Profile copies orchestrator routing language or scenarios as designer content. |
| `NO_PLANNER_PROFILE_COPY` | Preserve designer-specific authorship. | Shape may align with `planner_profile`, but content is design-contribution specific. | Profile copies planner cut-framing language or scenarios as designer content. |
| `NO_VALIDATION_EVAL_DESIGNER_PROFILE_COPY` | Preserve designer-specific authorship. | Shape may align with `validation_eval_designer_profile`, but content is design-contribution specific. | Profile copies proof-design language or scenarios as designer content. |
| `NO_EXECUTION_PACKAGE_DESIGNER_PROFILE_COPY` | Preserve designer-specific authorship. | Shape may align with `execution_package_designer_profile`, but content is design-contribution specific. | Profile copies package-design fields or scenarios as designer content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to design intent, affected surface, UX, accessibility, responsiveness, states, design-system consistency, blockers, evidence, and handoff. | Seniority is described only in generic leadership or quality terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits designer from planning, proof design, package design, coding, validation execution, review, finalization, resync, and orchestration. | Any downstream or upstream role is assigned to designer. |
| `DESIGN_JUDGMENT_DISCIPLINE_PRESENT` | Preserve design-contribution mission. | Profile centers bounded design decisions, recommendations, blockers, and material UX/product-surface risk. | Design judgment is secondary, purely cosmetic, or merged with implementation. |
| `DESIGN_BOUNDARY_DISCIPLINE_PRESENT` | Keep design inside authorized cut. | Profile requires preserving scope, constraints, non-goals, negative space, and closed decisions. | Designer can change scope, replan, or reopen decisions without upstream authority. |
| `DESIGN_HANDOFF_DISCIPLINE_PRESENT` | Enable downstream consumption without takeover. | Handoff gives design constraints and cues for planner, validation-eval-designer, execution-package-designer, or coder without producing their artifacts. | Handoff becomes brief, validation pack, execution package, code, review, or closure. |
| `ACCESSIBILITY_DISCIPLINE_PRESENT` | Protect accessibility when material. | Profile names keyboard, focus, contrast, labels, screen reader, target size, error recovery, reduced motion, and semantic risks where relevant. | Accessibility is omitted, generic, or treated only as optional polish despite material impact. |
| `RESPONSIVE_BEHAVIOR_DISCIPLINE_PRESENT` | Protect responsive behavior when material. | Profile names layout, overflow, wrapping, ordering, viewport, breakpoint, input-mode, sticky behavior, and touch target risks where relevant. | Responsive behavior is left for coder or validation owner to guess. |
| `INTERACTION_STATE_DISCIPLINE_PRESENT` | Protect state behavior when material. | Profile covers loading, empty, error, success, disabled, hover, focus, active, selected, validation, destructive, and permission states when material. | State behavior is absent, vague, or delegated as downstream discretion. |
| `DESIGN_SYSTEM_DISCIPLINE_PRESENT` | Preserve source-backed consistency. | Profile blocks or asks when tokens, component rules, variants, patterns, or content style need a source. | Design-system consistency can be invented or reduced to preference. |
| `REQUIRED_VS_ADVISORY_DESIGN_DISCIPLINE_PRESENT` | Separate binding design from suggestions. | Profile distinguishes required decisions from advisory recommendations by downstream risk and material impact. | Suggestions become requirements without source, or blockers become optional preference. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve safe stop. | Profile requires block/ask behavior when design intent, source, state, accessibility, responsive, content, owner, or product decision is missing. | Missing inputs can be guessed, buried as assumptions, or passed downstream. |
| `NO_PLANNER_TAKEOVER` | Preserve planning boundary. | Profile says designer may inform planning but cannot create `EXECUTION BRIEF` or change the cut. | Designer replans, writes brief, chooses new cut, or owns scope. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design boundary. | Profile says designer may provide validation cues but cannot create `VALIDATION PACK` or proof strategy. | Designer defines required checks, harness sufficiency, or pack ownership. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design boundary. | Profile says designer may provide package-ready constraints but cannot define package fields. | Designer defines `WORK_PACKAGE_ID`, paths, commands, checks, dependencies, or `BLOCK_IF`. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits code, edits, commands, implementation steps, and final technical decisions. | Designer implements, edits files, or prescribes code-level solution. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve proof-execution boundary. | Profile prohibits executing commands, interpreting logs as final proof, and emitting runner verdicts. | Designer runs validation or declares pass/fail/partial. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic-review boundary. | Profile may flag review-sensitive design risk but cannot perform reviewer judgment. | Designer performs semantic review or substitutes reviewer approval. |
| `NO_FINALIZER_TAKEOVER` | Preserve closure boundary. | Profile cannot close the round, decide `DONE`, or perform resync. | Designer finalizes or treats design guidance as closure. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says fifth of 12 but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `FIFTH_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the fifth-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `DESIGNER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references `designer`, design intent, user surface, UX, accessibility, responsiveness, interaction states, content, design-system source, required/advisory design, and design handoff boundaries. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `designer_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
