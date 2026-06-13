# finalizer Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`finalizer_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes, or
global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `finalizer_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `finalizer_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, target agents, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive finalizer-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what finalizer may and must not do. | Boundary is absent or allows execution, validation, review, planning, package design, coding, or resync execution. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve finalizer kernel anchors. | Profile names terminal closure, runner verdict preservation, reviewer signal preservation, correction pack preservation, `DONE`, resync, closure ledger, QA evidence, and no runtime path. | Anchors are missing or replaced by generic closure language. |
| `DECISION_HEURISTICS_PRESENT` | Make closure judgment operational. | Profile gives finalizer-specific heuristics for `READY`, `BLOCKED`, runner `PARTIAL`/`FAIL`/`BLOCKED`, evidence sufficiency, residual risk, follow-up, resync, and owner return. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep finalizer minimal-verification. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and closure-vs-execution reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior closure risk detection. | Profile lists finalizer-specific false closure, fake QA, status confusion, residual risk, role takeover, runtime leakage, and traceability risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid closure handoff. | Profile defines minimum input/output, closure ledger, evidence summary, QA, review, correction, residual risks, blockers, follow-ups, and resync declaration. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent claim from replacing evidence. | Profile distinguishes claim, executor result, runner verdict, validation evidence, reviewer judgment, residual risk, blocker, follow-up, and final status. | Evidence section accepts informal claims, silence, or absence of errors as proof. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, planning, validation design, execution package, design, implementation, validation execution, review, resync execution, and out-of-scope profile/kernel edits. | Overreach rules are missing or omit major upstream/downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/prior profiles, project-doc dumping, runtime instructions, and report bloat. | Profile invites long copies, general docs, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to finalizer. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, runtime loaders, or materializers. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_PRIOR_PROFILE_COPY` | Preserve finalizer-specific authorship. | Shape may align with prior profiles, but content is finalizer-specific. | Finalizer profile copies prior-agent content as substantive finalizer guidance. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to closure ledger, evidence, runner verdicts, review signal, QA, correction state, residual risk, `DONE`, and resync. | Seniority is described only in generic judgment or leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits finalizer from planning, proof design, execution-package design, design, coding, validation execution, review, correction execution, resync, and orchestration. | Any downstream or upstream role is assigned to finalizer. |
| `FINALIZATION_DISCIPLINE_PRESENT` | Preserve finalizer mission. | Profile centers terminal round consolidation and honest closure. | Finalization is secondary or replaced by validation, review, implementation, or planning. |
| `TERMINAL_STATUS_DISCIPLINE_PRESENT` | Preserve status separation. | Profile states finalizer emits `READY` or `BLOCKED`, while runner verdicts remain preserved inputs. | Profile lets finalizer emit runner verdicts or treats `READY` as `PASS`. |
| `EVIDENCE_BASED_CLOSURE_PRESENT` | Require earned closure. | Profile requires real executor, runner, reviewer, correction, QA, artifact, and DEV decision evidence where applicable. | Profile allows closure from optimism, silence, effort, or incomplete logs. |
| `NO_FAKE_READY_OR_PASS` | Prevent closure theater. | Profile rejects clean `READY`, validation `PASS`, QA success, and `DONE` without sufficient evidence. | Profile permits fake green status or smooths negative evidence. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve proof execution boundary. | Profile prohibits running/rerunning tests and replacing runner verdict. | Finalizer may execute validation or reinterpret proof as runner. |
| `NO_REVIEWER_TAKEOVER` | Preserve semantic review boundary. | Profile prohibits substitute technical review and preserves required/advisory reviewer signal. | Finalizer may approve architecture, replace reviewer, or ignore missing required review. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits code, fixes, patches, and correction execution. | Finalizer may implement or patch residual issues. |
| `NO_RESYNC_EXECUTION` | Preserve sync boundary. | Profile may request resync only with bounded factual delta and must not execute it. | Finalizer may edit shared canonical docs directly or perform resync. |
| `RESIDUAL_RISK_DISCIPLINE_PRESENT` | Preserve known limitations. | Profile requires residual risks, partial proof, failure, blockers, and correction residue to remain visible. | Residual risks can be omitted, softened, or hidden as success. |
| `BLOCKING_BEHAVIOR_PRESENT` | Preserve honest stop behavior. | Profile requires `BLOCKED` when closure would require guessing or role takeover. | Missing evidence can be guessed, buried as assumptions, or passed as clean closure. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says it is part of 12-profile construction and not a pilot or subset strategy. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `FINALIZER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references closure ledger, runner verdict preservation, `DONE`, resync, QA checklist, reviewer signal, residual correction pack, slice closure, and `Feature CONTEXT`. | Content could apply unchanged to any agent. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `finalizer_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents;
- `resync_profile` creation.
