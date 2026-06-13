# coder-backend Senior Profile Static Checks

These static checks are documentary/dev-only. They validate the local
`coder_backend_profile` module and do not authorize runtime loading,
materialization, target writes, productive-skill changes, template changes,
materializer changes, GitHub writes, smoke-script changes, or global contract
creation.

| Check | Intent | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| `PROFILE_FILE_EXISTS` | Ensure the profile artifact exists. | `SENIOR_AGENT_PROFILE.md` exists in `coder_backend_profile`. | Profile file is absent or placed outside the module. |
| `README_FILE_EXISTS` | Ensure module orientation exists. | `README.md` exists in `coder_backend_profile`. | README is absent or placed outside the module. |
| `VALIDATION_FILES_EXIST` | Ensure validation support exists. | `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and `validation/EXCELLENT_PASS_EXPECTATIONS.md` exist. | Any validation file is missing or outside `validation/`. |
| `DEV_ONLY_DECLARATION_PRESENT` | Prevent production interpretation. | README and profile explicitly say dev-only or documentary/dev-only. | Dev-only status is missing, vague, or contradicted. |
| `NON_RUNTIME_DECLARATION_PRESENT` | Prevent runtime prompt adoption. | README and profile explicitly say non-runtime and not a materialized prompt. | The module implies runtime use, prompt loading, agent execution, or materialization. |
| `REQUIRED_SECTIONS_PRESENT` | Preserve approved profile shape. | Profile contains sections 1 through 13 with approved headings. | Any required section is missing, renamed beyond recognition, or merged away. |
| `NO_EMPTY_REQUIRED_SECTIONS` | Avoid placeholder profile. | Each required section contains substantive coder-backend-specific content. | Any required section is empty, placeholder, or generic filler. |
| `CANONICAL_ROLE_BOUNDARY_PRESENT` | Preserve base-agent role limits. | Profile states what coder-backend may and must not do. | Boundary is absent or allows upstream/downstream work. |
| `KERNEL_DERIVED_ANCHORS_PRESENT` | Preserve backend kernel anchors. | Profile names package execution, targeted-local reading, contract safety, data/auth risk, blocker behavior, and executor evidence. | Anchors are missing or replaced by generic statements. |
| `DECISION_HEURISTICS_PRESENT` | Make backend execution judgment operational. | Profile gives backend-specific heuristics for executing, blocking, preserving contracts, reporting package insufficiency, and producing evidence. | Heuristics are absent, vague, or expand authority. |
| `READING_BUDGET_PRESENT` | Keep executor reading bounded. | Profile defines first reads, conditional reads, stop points, anti-broad-scan rules, and execution-vs-planning reading. | Reading rules are missing or encourage broad discovery. |
| `RISK_TAXONOMY_PRESENT` | Support senior backend risk detection. | Profile lists backend-specific package, contract, auth, data, migration, job, integration, runtime, evidence, and role risks. | Risk section is missing or generic. |
| `STOP_BLOCK_PATTERNS_PRESENT` | Make blockers auditable. | Profile defines concrete stop/block patterns with condition, reason, and expected output. | Blocks are absent, abstract, or lack expected output. |
| `HANDOFF_DISCIPLINE_PRESENT` | Preserve valid executor handoff. | Profile defines minimum input/output, package consumption, validation-pack consumption, changed files, commands, evidence, blockers, and residual risks. | Handoff rules are absent or permit ambiguous transfer. |
| `EVIDENCE_DISCIPLINE_PRESENT` | Prevent intention from replacing implementation evidence. | Profile distinguishes applied implementation, commands run, local tests, validation verdict, review, blockers, and limitations. | Evidence section accepts informal claims, no-error status, or descriptive output as execution. |
| `ANTI_OVERREACH_RULES_PRESENT` | Prevent role takeover. | Profile explicitly prohibits routing, planning, proof design, package design, design, frontend/iOS work, validation, review, finalization, resync, and materialization takeover. | Overreach rules are missing or omit major upstream/downstream roles. |
| `ANTI_BLOAT_RULES_PRESENT` | Keep profile compact. | Profile prohibits copying kernel/base/reference profiles, project-doc dumping, generic seniority, backend manual bloat, and runtime instructions. | Profile invites long copies, general docs, or runtime details. |
| `EXCELLENT_PASS_EXPECTATIONS_PRESENT` | Define audit target. | Profile and validation expectations state excellent-pass criteria. | Excellent-pass criteria are missing or not local to coder-backend. |
| `NO_RUNTIME_TARGET_LEAKAGE` | Preserve dev-only isolation. | No file instructs writing `.github`, `.codex`, `AGENTS.md`, target artifacts, runtime prompts, generated agents, materializers, `sentinel.mjs`, or smoke scripts. | Any file authorizes or implies runtime materialization. |
| `NO_PRODUCTIVE_SKILL_MUTATION` | Protect productive skill. | Module does not require or describe edits to productive skill files. | Content asks to mutate productive skill or use it as output target. |
| `NO_TEMPLATE_MUTATION` | Protect canonical templates. | Module does not require or describe template edits. | Content asks to mutate canonical templates. |
| `NO_LONG_KERNEL_COPY` | Avoid kernel reprint. | Kernel anchors are summarized compactly and operationally. | Profile copies long kernel blocks or becomes a kernel duplicate. |
| `NO_BASE_AGENT_REPRINT` | Avoid base-agent reprint. | Base role is distilled rather than reproduced. | Profile reprints large base-agent sections. |
| `NO_ORCHESTRATOR_PROFILE_COPY` | Preserve coder-backend authorship. | Shape may align with `orchestrator_profile`, but content is backend-executor-specific. | Profile copies orchestrator-specific routing language or scenarios as backend content. |
| `NO_PLANNER_PROFILE_COPY` | Preserve coder-backend authorship. | Shape may align with `planner_profile`, but content is backend-executor-specific. | Profile copies planner-specific cut-framing language or scenarios as backend content. |
| `NO_GENERIC_SENIORITY_ONLY` | Ensure specificity. | Seniority thesis is tied to backend package execution, contracts, data, auth, blockers, evidence, and handoff. | Seniority is described only in generic judgment or leadership terms. |
| `NO_DOWNSTREAM_ROLE_TAKEOVER` | Preserve owner boundaries. | Profile prohibits validation design, package design, design, frontend/iOS work, validation execution, review, finalization, and resync ownership. | Any downstream role is assigned to coder-backend. |
| `BACKEND_EXECUTION_DISCIPLINE_PRESENT` | Preserve executor mission. | Profile centers authorized backend implementation under package constraints. | Backend execution is secondary, generic, or mixed with planning/review. |
| `EXECUTION_PACKAGE_REQUIRED_PRESENT` | Preserve package authority. | Profile requires valid current-round `EXECUTION PACKAGE` and `WORK_PACKAGE_ID` before execution. | Execution can proceed without a valid package. |
| `PACKAGE_BOUNDARY_DISCIPLINE_PRESENT` | Preserve package scope. | Profile treats package fields as binding constraints and blocks when safe work exceeds them. | Package fields are optional or locally rewritten. |
| `OWNED_PATHS_DISCIPLINE_PRESENT` | Prevent unauthorized edits. | Profile requires edits to stay inside `OWNED_PATHS` or equivalent explicit authority. | Profile permits path expansion by executor judgment. |
| `DO_NOT_TOUCH_DISCIPLINE_PRESENT` | Preserve negative path boundary. | Profile requires blocking on do-not-touch conflict. | Profile permits bypassing or working around do-not-touch. |
| `BLOCK_IF_DISCIPLINE_PRESENT` | Preserve explicit blockers. | Profile requires obeying `BLOCK_IF` conditions. | Profile permits ignoring or reinterpreting `BLOCK_IF`. |
| `API_CONTRACT_DISCIPLINE_PRESENT` | Preserve public behavior. | Profile blocks or preserves contracts when API route/request/response/error behavior is ambiguous. | Profile permits inventing or changing API contract without authority. |
| `SCHEMA_PAYLOAD_DISCIPLINE_PRESENT` | Preserve data shape and payload safety. | Profile blocks when schema, payload, field, validation, or serialization facts are absent. | Profile permits field or payload invention. |
| `AUTH_AUTHZ_DISCIPLINE_PRESENT` | Preserve security boundaries. | Profile blocks on ambiguous role, permission, guard, ownership, tenant/user scope, audit, or access behavior. | Profile allows auth/authz decisions by local preference. |
| `PERSISTENCE_MIGRATION_DISCIPLINE_PRESENT` | Preserve data and rollout safety. | Profile covers persistence behavior, migration path, indexes, backfill, rollback, reader/writer compatibility, and transaction risk. | Persistence or migration can be inferred without source or package authority. |
| `INTEGRATION_JOB_DISCIPLINE_PRESENT` | Preserve operational behavior. | Profile covers jobs, queues, events, webhooks, SDKs, retries, idempotency, timeouts, ordering, and integration failure behavior. | Job or integration behavior can be invented by executor. |
| `EVIDENCE_HANDOFF_PRESENT` | Preserve validation-eligible output. | Profile requires changed paths/evidence, delta, checks run/not-run, limitations, blockers, risks, and runner notes. | Handoff can be narrative, evidence-free, or finalization-like. |
| `NO_VALIDATION_PACK_TAKEOVER` | Preserve proof-design boundary. | Profile says coder-backend consumes but never creates or rewrites `VALIDATION PACK`. | Coder-backend is allowed to design proof strategy or validation sufficiency. |
| `NO_EXECUTION_PACKAGE_TAKEOVER` | Preserve package-design boundary. | Profile says coder-backend consumes but never creates, repairs, or reinterprets `EXECUTION PACKAGE`. | Coder-backend is allowed to define package mechanics. |
| `NO_PLANNING_TAKEOVER` | Preserve planner boundary. | Profile prohibits defining the round cut, objective, or plan. | Coder-backend is allowed to plan or reframe the cut. |
| `NO_FRONTEND_IOS_TAKEOVER` | Preserve platform boundaries. | Profile prohibits frontend or iOS implementation outside package authority. | Coder-backend is allowed to absorb frontend/iOS work by convenience. |
| `NO_VALIDATION_RUNNER_TAKEOVER` | Preserve validation execution boundary. | Profile prohibits formal validation verdict ownership. | Coder-backend can declare final validation or runner verdict. |
| `NO_REVIEWER_FINALIZER_RESYNC_TAKEOVER` | Preserve downstream terminal boundaries. | Profile prohibits semantic review, final closure, and resync ownership. | Coder-backend can approve, close, mark done, or sync docs. |
| `NO_PARTIAL_PILOT_LANGUAGE` | Avoid subset strategy. | Module says part of 12-profile construction but not a partial pilot. | Module describes pilot, partial rollout, subset validation, or 4-to-12 strategy. |
| `ONE_OF_12_BUT_NOT_PILOT_DECLARATION_PRESENT` | Preserve phase framing. | README and profile include the one-of-12-not-pilot declaration. | Declaration is missing or contradicted. |
| `CONTRACTS_NOT_CREATED_BY_THIS_MODULE` | Keep global contracts out. | README states global contracts are outside this module and not created here. | Module creates, defines, or implies global contracts as local deliverables. |
| `CODER_BACKEND_SPECIFICITY_PRESENT` | Avoid agent-agnostic profile. | Content references backend APIs, services, auth, persistence, migrations, jobs, integrations, runtime behavior, data, guardrails, and package execution. | Content could apply unchanged to any agent. |

## Out Of Scope

- runtime checks;
- executable validation harness creation;
- materializer creation;
- writes outside `coder_backend_profile`;
- productive skill mutation;
- template mutation;
- `sentinel.mjs` or smoke-script mutation;
- global contract creation;
- profiles for other agents.
