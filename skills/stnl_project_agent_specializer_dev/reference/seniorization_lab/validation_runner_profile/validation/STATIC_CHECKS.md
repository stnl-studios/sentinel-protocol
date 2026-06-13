# validation-runner Senior Profile Static Checks

These static checks are documentary/dev-only and non-runtime. They validate the
local `validation_runner_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes, or
global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `validation_runner_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `validation_runner_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive validation-runner-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what `validation-runner` may and must not do. | Boundary is absent or allows proof design, package design, implementation, review, closure, resync, or routing takeover. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names post-implementation proof execution, valid executor `READY`, `VALIDATION PACK`, terminal verdicts, correction exclusivity, QA handoff, and no runtime path. | Anchors are missing or replaced by generic validation language. |
| `DECISION_HEURISTICS_PRESENT` | Make proof-execution judgment operational. | Profile gives heuristics for execution, `PASS`, `FAIL`, `BLOCKED`, `PARTIAL`, `NOT_RUN`, correction, blockers, evidence rejection, and owner handoff. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep validation bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and validation-vs-implementation reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior validation risk detection. | Profile lists validation theater, evidence, harness, pack, package, scope, role-drift, runtime leakage, and terminal-status risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid runner handoff. | Profile defines minimum input/output, commands/checks considered, executed/not-run declarations, verdict, blocker, correction pack, residual risk, and fact/evidence/verdict separation. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent claims from replacing proof. | Profile distinguishes plan, command availability, execution, logs, interpretation, proof, failure, blocker, claim, and review. | Evidence section accepts informal claims, absent error, or unrelated output as proof. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits planning, validation strategy design, pack creation, package creation, design, implementation, review, finalization, resync, and routing takeover. | Overreach rules are missing or omit major upstream/downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/reference profiles, project-doc dumping, log inventories, generic seniority, and runtime instructions. | Profile invites long copies, general docs, broad inventories, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to validation-runner. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, materializers, `sentinel.mjs`, or smoke scripts. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_PREVIOUS_PROFILE_COPY` | Preserve validation-runner-specific authorship. | Shape may align with previous profiles, but content is proof-execution specific. | Profile copies previous profile language or scenarios as validation-runner content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to proof execution, obligation mapping, evidence, verdict, blocker, correction, and handoff discipline. | Seniority is described only in generic leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits runner from acting as validation-eval-designer, package designer, coder, reviewer, finalizer, resync, or orchestrator. | Any downstream or upstream role is assigned to runner. |
| `VALIDATION_EXECUTION_DISCIPLINE_PRESENT` | Preserve runner mission. | Profile centers execution or audit of validation against concrete implementation and valid proof artifacts. | Proof execution is secondary, optional, or merged with proof design. |
| `OBLIGATION_TO_EVIDENCE_MAPPING_PRESENT` | Require traceable proof. | Profile requires mapping each obligation to command/check/evidence/interpretation/verdict. | Verdict can be declared without obligation mapping. |
| `NO_VALIDATION_THEATER` | Reject false confidence. | Profile explicitly rejects generic green output, raw logs, absent error, claims, and unrelated checks as proof. | Generic activity can count as validation. |
| `NO_PASS_WITHOUT_EVIDENCE` | Protect verdict integrity. | Profile says `PASS` requires material evidence for critical obligations. | `PASS` can rest on confidence, inference, or missing checks. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits edits, fixes, patches, and implementation decisions. | Runner may implement or correct code. |
| `NO_CORRECTION_IMPLEMENTATION` | Keep correction handoff separate from fixing. | Profile allows correction pack only as evidence-backed handoff, not local repair. | Runner can apply the correction. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design authority. | Profile consumes but never creates or redesigns `VALIDATION PACK`. | Runner invents proof strategy or rewrites pack. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design authority. | Profile uses package evidence only to understand executed scope. | Runner creates package mechanics or work packages. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic-review boundary. | Profile may signal review need but cannot perform reviewer judgment. | Runner performs semantic review or approval. |
| `NO_FINALIZER_TAKEOVER` | Preserve closure boundary. | Profile cannot close the round, decide `DONE`, update docs, or perform resync. | Runner finalizes or writes durable closure artifacts. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve safe stop. | Profile requires block/ask behavior when pack, scope, command, evidence, authorization, harness, environment, or source is missing. | Missing inputs can be guessed, hidden, or passed downstream. |
| `CORRECTION_PACK_DISCIPLINE_PRESENT` | Preserve formal correction loop. | Profile defines formal, compact, evidence-backed `CORRECTION PACK` that is mutually exclusive with terminal verdicts. | Correction is narrative, generic, mixed with verdict, or implemented locally. |
| `NINTH_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the ninth-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `VALIDATION_RUNNER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references `VALIDATION PACK`, valid executor `READY`, concrete implementation, executed checks, evidence mapping, verdicts, `CORRECTION PACK`, QA handoff, blockers, and reviewer/finalizer boundaries. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `validation_runner_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
