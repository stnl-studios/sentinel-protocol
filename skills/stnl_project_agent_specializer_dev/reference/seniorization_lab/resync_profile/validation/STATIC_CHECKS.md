# resync Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`resync_profile` module and do not authorize runtime loading, materialization,
target writes, productive-skill changes, template changes, or global contract
creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `resync_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `resync_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive resync-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what resync may and must not do. | Boundary is absent or allows upstream/downstream role takeover. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve resync kernel anchors. | Profile names finalizer/requested-resync entry, factual delta qualification, minimal sync, targeted reading, safe block, and no role takeover. | Anchors are missing or replaced by generic statements. |
| `DECISION_HEURISTICS_PRESENT` | Make resync judgment operational. | Profile gives resync-specific heuristics for accepting sync, blocking, preserving final state, classifying non-resync asks, and returning to orchestrator. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep sync targeted. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and resync-vs-execution/review/validation/planning reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior sync risk detection. | Profile lists resync-specific authorization, source, final-state, bloat, role-drift, runtime leakage, and evidence risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid sync handoff. | Profile defines minimum input/output, finalizer handoff consumption, sync source/target, traceability, and fact/decision/evidence/risk/blocker separation. | Handoff rules are absent or permit ambiguous sync. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent claims from replacing final evidence. | Profile distinguishes finalizer handoff, final decision, final artifact, source of truth, residual risks, blockers, and informal claims. | Evidence section accepts loose context, no-error status, or assumptions as final source. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits orchestration takeover, planning, validation design, package design, design, implementation, validation execution, review, finalization, and status changes. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/reference profiles, project-doc dumping, generic seniority, runtime instructions, broad changelogs, and whole-round summaries. | Profile invites long copies, general docs, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to resync. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, generated reports, fixtures, loaders, or materializers. | Any file authorizes or implies runtime materialization or target writes. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_ORCHESTRATOR_PROFILE_COPY` | Preserve resync-specific authorship. | Shape may align with `orchestrator_profile`, but content is resync-specific. | Resync profile copies orchestrator-specific routing language or scenarios as resync content. |
| `NO_PLANNER_PROFILE_COPY` | Preserve resync-specific authorship. | Shape may align with `planner_profile`, but content is resync-specific. | Resync profile copies planner-specific planning language or scenarios as resync content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to finalizer handoff, final facts, sync target, residual risks, blockers, and future context. | Seniority is described only in generic leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits resync from planning, validation design, package design, design, coding, validation, review, finalization, and orchestration. | Any downstream or upstream owner responsibility is assigned to resync. |
| `RESYNC_DISCIPLINE_PRESENT` | Preserve sync mission. | Profile centers authorized final-context synchronization and drift reduction. | Sync discipline is secondary or replaced by execution, review, validation, or docs maintenance. |
| `FINALIZER_HANDOFF_DISCIPLINE_PRESENT` | Preserve finalizer relationship. | Profile requires finalizer handoff or explicit authorization when applicable and states finalizer owns `resync: yes/no`. | Resync can self-authorize, decide `resync: yes/no`, or ignore missing finalizer input. |
| `CONTEXT_SYNC_BOUNDARY_PRESENT` | Keep context alignment narrow. | Profile limits output to final facts, decisions, residual risks, blockers, sync target, and future-context notes. | Sync becomes broad summary, changelog, project docs refresh, or whole-round narrative. |
| `FINAL_STATE_PRESERVATION_PRESENT` | Protect accepted closure meaning. | Profile requires faithful carry-forward of accepted final state without normative rewrite. | Profile permits reinterpretation, softening, or status drift. |
| `CLOSED_DECISION_PRESERVATION_PRESENT` | Protect closed decisions. | Profile preserves closed decisions unless explicit reopen authorization exists. | Profile invites reopening or rewriting decisions during sync. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve safe stop. | Profile requires block/ask behavior when handoff, authorization, source, target, evidence, or role boundary is insufficient. | Missing inputs can be guessed, buried as assumptions, or resolved through broad discovery. |
| `NO_PLANNING_TAKEOVER` | Preserve planner boundary. | Profile says resync does not plan or create `EXECUTION BRIEF`. | Resync is allowed to create cuts, plans, or planning artifacts. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design boundary. | Profile says resync does not create validation strategy or `VALIDATION PACK`. | Resync is allowed to define proof strategy or harness sufficiency. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design boundary. | Profile says resync does not create `EXECUTION PACKAGE` or package mechanics. | Resync is allowed to define package ids, owned paths, commands, or block-if rules. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits code, edits outside authorized documentary sync, bug fixes, and implementation corrections. | Resync is allowed to implement, patch, or fix product code. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve proof-execution boundary. | Profile prohibits running checks, judging proof, or declaring validation `PASS`. | Resync is allowed to validate or replace runner verdict. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic-review boundary. | Profile prohibits architecture, semantic, or risk review as reviewer. | Resync is allowed to decide correctness or architectural acceptability. |
| `NO_FINALIZER_TAKEOVER` | Preserve closure boundary. | Profile prohibits closure, terminal verdict changes, `DONE`, and deciding `resync: yes/no`. | Resync is allowed to finalize, close, or alter terminal status. |
| `NO_NEW_ROUND_DISGUISED_AS_RESYNC` | Preserve resync classification. | Profile classifies new change, correction, implementation, or scope decision as new round or orchestrator work. | Profile accepts new work as context sync. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says third created but not a partial pilot and does not propose partial validation or 4-to-12 strategy. | Module describes pilot, partial rollout, subset validation, or artificial subset demand. |
| `THIRD_CREATED_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the third-created-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `RESYNC_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references finalizer handoff, final state, factual sync, sync target, residual risks, blockers, context drift, and no role takeover. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `resync_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
