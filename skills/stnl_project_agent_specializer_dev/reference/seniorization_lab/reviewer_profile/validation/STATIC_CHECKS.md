# reviewer Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`reviewer_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes, or
global contract creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `reviewer_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `reviewer_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, or agent execution. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive reviewer-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what reviewer may and must not do. | Boundary is absent or allows implementation, proof, closure, resync, or planning takeover. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve reviewer kernel anchors. | Profile names artifact/diff review, `review-minimal`, material risk, `REVIEW_CLEAR`, `REVIEW_RISK`, `CORRECTION PACK`, no proof, no implementation, no closure, no resync. | Anchors are missing or replaced by generic review statements. |
| `DECISION_HEURISTICS_PRESENT` | Make review judgment operational. | Profile gives reviewer-specific heuristics for review entry, block, clear/risk signal, correction pack, materiality, evidence gaps, scope, validation theater, and handoff. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep review bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and review-vs-implementation reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior review risk detection. | Profile lists reviewer-specific artifact, evidence, scope, package, contract, security, data, migration, UX, performance, materiality, runtime leakage, and role-takeover risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid review handoff. | Profile defines minimum input/output, `REVIEW_CLEAR`, `REVIEW_RISK`, `CORRECTION PACK`, blocker, required fix, advisory, non-issue, and finalizer/correction handoff. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent claim from replacing evidence. | Profile distinguishes artifact, diff, validation output, informal claim, source of truth, evidence gap, and runner/finalizer ownership. | Evidence section accepts claims, absence of error, or preference as proof. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, planning, validation design, package design, design resolution, implementation, validation execution, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major upstream/downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/other profiles, project-doc dumping, generic seniority, total audits, and runtime instructions. | Profile invites long copies, general docs, runtime details, or checklist bloat. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to reviewer. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, or materializers. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_EXISTING_PROFILE_COPY` | Preserve reviewer-specific authorship. | Shape may align with existing profiles, but content is reviewer-specific. | Reviewer profile copies agent-specific language or scenarios from other profiles as reviewer content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to artifact review, materiality, evidence, verdict boundaries, correction loop, and role containment. | Seniority is described only in generic leadership or quality terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits reviewer from implementation, validation execution, finalization, resync, package design, and planning. | Any downstream or upstream role is assigned to reviewer. |
| `REVIEW_DISCIPLINE_PRESENT` | Preserve reviewer mission. | Profile centers current-round semantic review of delivered artifact and diff. | Review is secondary or replaced by implementation, proof, planning, or closure. |
| `SEMANTIC_REVIEW_PRESENT` | Preserve semantic and structural focus. | Profile names semantic fit, architectural fit, boundary drift, maintainability, contract drift, unauthorized inference, product leakage, and active guardrail drift. | Review becomes style-only, generic QA, or proof execution. |
| `MATERIALITY_DISCIPLINE_PRESENT` | Preserve severity judgment. | Profile distinguishes material risk from recommendation, cosmetic note, and non-issue. | Preferences or optional improvements can become blockers without material risk. |
| `PASS_FAIL_DISCIPLINE_PRESENT` | Preserve validation verdict boundary. | Profile states reviewer uses `REVIEW_CLEAR`/`REVIEW_RISK`/`CORRECTION PACK` and treats `PASS`/`FAIL` as runner verdicts unless future canonical contract changes. | Reviewer emits runner `PASS`/`FAIL` as its own verdict or confuses review with validation proof. |
| `BLOCKER_REQUIRED_FIX_ADVISORY_DISTINCTION_PRESENT` | Preserve finding classes. | Profile defines blocker, required fix, advisory, and non-issue with materiality criteria. | Finding classes are absent or interchangeable. |
| `REVIEWABLE_ARTIFACT_DISCIPLINE_PRESENT` | Prevent review of intent. | Profile requires artifact, diff, reviewable summary, or trustworthy current-round evidence. | Review can approve plan text, intent, narration, or untrusted claim. |
| `EVIDENCE_AWARE_REVIEW_PRESENT` | Keep evidence traceable. | Profile requires distinction between claims, validation output, artifact, source, logs, and missing evidence. | Review can rely on "looks ok", no error, or informal proof. |
| `SCOPE_PACKAGE_ALIGNMENT_PRESENT` | Preserve cut boundary. | Profile checks approved scope, execution package, `OWNED_PATHS`, `DO_NOT_TOUCH`, and active guardrails when applicable. | Scope/package mismatch is ignored or treated as cosmetic. |
| `CORRECTION_LOOP_COMPATIBILITY_PRESENT` | Preserve routeable correction. | Profile uses one compact `CORRECTION PACK` for in-scope surgical issues and does not execute it. | Correction requests are broad, vague, repeated, terminal-signal mixed, or implemented by reviewer. |
| `NO_IMPLEMENTATION_TAKEOVER` | Preserve executor boundary. | Profile prohibits edits, patches, fixes, and refactors by reviewer. | Reviewer is allowed to correct its own findings. |
| `NO_VALIDATION_EXECUTION_TAKEOVER` | Preserve runner boundary. | Profile prohibits running checks, gathering proof, and issuing runner verdicts. | Reviewer can replace `validation-runner`. |
| `NO_FINALIZATION_TAKEOVER` | Preserve closure boundary. | Profile prohibits closure, `DONE`, final ledger, and completion declaration. | Reviewer can close the round or replace `finalizer`. |
| `NO_RESYNC_TAKEOVER` | Preserve sync boundary. | Profile prohibits writing shared docs, Feature CONTEXT, ADRs, `PLAN.md`, and factual sync decisions. | Reviewer can perform or decide resync. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says part of 12-profile construction but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `REVIEWER_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references `review-minimal`, artifact/diff review, `REVIEW_CLEAR`, `REVIEW_RISK`, `CORRECTION PACK`, material structural risk, required/advisory classification, and no proof/closure/resync ownership. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `reviewer_profile`;
- productive skill mutation;
- template mutation;
- global contract creation;
- profiles for other agents.
