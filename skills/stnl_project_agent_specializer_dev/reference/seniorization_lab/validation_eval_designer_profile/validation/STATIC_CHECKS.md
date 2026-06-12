# validation-eval-designer Senior Profile Static Checks

These static checks are documentary/dev-only and non-runtime. They validate the
local `validation_eval_designer_profile` module and do not authorize runtime
loading, materialization, target writes, productive-skill changes, template
changes, or global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `validation_eval_designer_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `validation_eval_designer_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive validation-eval-designer-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what `validation-eval-designer` may and must not do. | Boundary is absent or allows execution, review, package, planning, or implementation work. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve kernel semantic anchors. | Profile names proof design before package design, validation design not execution, `VALIDATION PACK`, `NEEDS_DEV_DECISION_HARNESS`, anti-theater, and harness gates. | Anchors are missing or replaced by generic validation language. |
| `DECISION_HEURISTICS_PRESENT` | Make proof-design judgment operational. | Profile gives heuristics for packs, blockers, source truth, testability, harness, DEV decisions, proof types, theater, and handoff. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep proof design bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and proof-design-vs-implementation reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior proof-design risk detection. | Profile lists validation-theater, harness, source, testability, role-drift, runtime leakage, and downstream ambiguity risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid validation-design handoff. | Profile defines minimum input/output, `VALIDATION PACK` shape, blocker shape, handoff to package design, and fact/decision/proof/blocker separation. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent designed proof from replacing evidence. | Profile distinguishes evidence expectation, observed evidence, source truth, testability, harness, and runner verdict. | Evidence section accepts informal claims, invented commands, or designed checks as proof. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, replanning, package design, design resolution, implementation, validation execution, review, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/orchestrator/planner profile, project-doc dumping, test inventory, generic seniority, and runtime instructions. | Profile invites long copies, general docs, complete test matrices, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to validation-eval-designer. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, or materializers. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_ORCHESTRATOR_PROFILE_COPY` | Preserve validation-specific authorship. | Shape may align with `orchestrator_profile`, but content is proof-design specific. | Profile copies orchestrator routing language or scenarios as validation-eval-designer content. |
| `NO_PLANNER_PROFILE_COPY` | Preserve validation-specific authorship. | Shape may align with `planner_profile`, but content is proof-design specific. | Profile copies planner cut-framing language or scenarios as validation-eval-designer content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to `VALIDATION PACK`, proof obligations, harness, anti-theater, blockers, evidence expectations, and handoff. | Seniority is described only in generic leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits validation-eval-designer from planning, package design, design ownership, coding, validation execution, review, finalization, resync, and orchestration. | Any downstream role is assigned to validation-eval-designer. |
| `VALIDATION_DESIGN_DISCIPLINE_PRESENT` | Preserve proof-design mission. | Profile centers pre-execution validation design and separates it from observed proof. | Validation design is secondary or merged with runner execution. |
| `VALIDATION_PACK_DISCIPLINE_PRESENT` | Preserve canonical proof-design artifact. | Profile treats `VALIDATION PACK` as ephemeral, current-round, proof-design handoff when applicable. | Pack is absent, durable by default, oversized, or treated as runner output. |
| `PROOF_OBLIGATION_DISCIPLINE_PRESENT` | Require claim-specific proof design. | Profile derives proof obligations before commands and ties them to behavior, contract, state, UX, risk, or guardrail claims. | Commands or checklists appear before obligations or are not tied to the cut. |
| `HARNESS_DECISION_DISCIPLINE_PRESENT` | Preserve DEV-owned harness boundary. | Profile defines when to use `NEEDS_DEV_DECISION_HARNESS` and the allowed DEV choices. | Harness gaps are hidden, guessed through, or converted into automatic ready/block rules. |
| `ANTI_VALIDATION_THEATER_PRESENT` | Reject false-positive proof. | Profile explicitly rejects generic command success, vague manual checks, adjacent irrelevant tests, and decorative checklists. | Theater is missing or generic checks can count as proof without claim mapping. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve safe stop. | Profile requires block/ask behavior when brief, source, testability, harness, decision, or evidence basis is missing. | Missing inputs can be guessed, buried as assumptions, or passed downstream. |
| `NO_PLANNER_TAKEOVER` | Preserve planning boundary. | Profile says it preserves the planner cut and returns conflicts upstream. | Profile replans, rewrites scope, or chooses new cuts. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design boundary. | Profile says it provides package-ready proof inputs but never creates package mechanics. | Profile defines work package ids, owned paths, package sequencing, or `BLOCK_IF`. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits code, edits, implementation steps, and final technical decisions. | Profile is allowed to implement, edit, or prescribe code-level solution. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve proof-execution boundary. | Profile prohibits executing commands, interpreting logs as final proof, and emitting runner verdicts. | Profile is allowed to run validation or declare pass/fail/partial. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic-review boundary. | Profile may signal review need but cannot perform reviewer judgment. | Profile performs semantic review or substitutes reviewer approval. |
| `NO_FINALIZER_TAKEOVER` | Preserve closure boundary. | Profile cannot close the round, decide `DONE`, or perform resync. | Profile finalizes or treats designed validation as closure. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says third of 12 but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `THIRD_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the third-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `VALIDATION_EVAL_DESIGNER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references `EXECUTION BRIEF`, `VALIDATION PACK`, proof obligations, harness trust, `NEEDS_DEV_DECISION_HARNESS`, anti-theater, and runner/package/review boundaries. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `validation_eval_designer_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
