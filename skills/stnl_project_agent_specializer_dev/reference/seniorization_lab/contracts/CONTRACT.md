# Seniorization Lab Contract

Status: `DOCUMENTARY_DEV_ONLY`.

This document defines the global contract for the Seniorization Lab under
`skills/stnl_project_agent_specializer_dev/reference/seniorization_lab/`.

It is a design and validation contract only. It does not implement runtime
logic, module loading, prompt materialization, target artifact generation,
GitHub agent generation, Codex agent generation, VS Code agent generation,
subagent execution, shell execution, or production skill mutation.

## Scope

This contract applies to the 12 Senior Agent Profiles:

1. `orchestrator_profile`
2. `planner_profile`
3. `validation_eval_designer_profile`
4. `execution_package_designer_profile`
5. `designer_profile`
6. `coder_frontend_profile`
7. `coder_backend_profile`
8. `coder_ios_profile`
9. `validation_runner_profile`
10. `reviewer_profile`
11. `finalizer_profile`
12. `resync_profile`

The complete set is required for integrated validation. A subset is incomplete
and must not be treated as a pilot, production-ready pack, materialization set,
or evidence that the seniorization system is finished.

## Canonicality

Canonical base agents remain the source of truth for role identity, ownership,
workflow authority, handoff semantics, and operational boundaries.

Documentary kernels remain the source of derived kernel-level contracts and
validation anchors for each role.

Senior Agent Profiles add seniority judgment, sharper boundaries, risk
taxonomy, stop/block behavior, evidence discipline, and excellent-pass criteria.
They do not supersede base agents or kernels.

If a Senior Agent Profile conflicts with its canonical base agent, documentary
kernel, or this shared contract set, the stricter safe reading wins until an
authorized later contract explicitly updates the involved documents.

## Lab Boundary

The Seniorization Lab is allowed to contain documentary/dev-only profile and
validation material.

It may contain:

- global contracts for the 12-profile set;
- local profile descriptions;
- local profile static checks;
- local profile golden scenarios;
- local excellent-pass expectations;
- integrated read-only validation reports.

It must not contain or authorize:

- materialized agents;
- target repo artifacts;
- `.github` outputs;
- `.codex` outputs;
- `AGENTS.md` outputs;
- VS Code agent files;
- GitHub Agent files;
- Codex runtime files;
- prompt templates for production use;
- materializer code;
- runtime loader code;
- mutations to `sentinel.mjs`;
- mutations to `scripts/sentinel-smoke.mjs`;
- production skill mutation.

## Authority Rules

- Human/project instruction controls whether a task may read, write, validate,
  or stop.
- A profile cannot grant itself write authority, execution authority,
  materialization authority, routing authority beyond its role, or closure
  authority beyond its canonical boundary.
- A downstream profile cannot repair missing upstream authority by inference.
- A profile may block when required handoff, evidence, source, authority, or
  scope is absent.
- Read-only validation may inspect profile documents and emit a report, but it
  cannot become runtime execution.

## Role Ownership

Each profile owns only senior judgment for its canonical role.

No profile may absorb another profile's primary duty:

- `orchestrator` routes; it does not plan, package, design, code, validate,
  review, finalize, or resync.
- `planner` cuts and frames work; it does not design validation, package
  execution, implement, validate, review, finalize, or resync.
- `validation-eval-designer` designs proof obligations; it does not run proof,
  package execution, implement, review, finalize, or resync.
- `execution-package-designer` creates bounded executable packages; it does not
  implement, run validation, review, finalize, or resync.
- `designer` contributes product/UX/design judgment; it does not implement,
  package, validate, review, finalize, or resync.
- `coder-frontend`, `coder-backend`, and `coder-ios` execute only their owned
  package slice; they do not replan, redesign validation, broaden packages,
  review, finalize, or resync.
- `validation-runner` executes or audits proof; it does not fix, semantically
  review, finalize, or resync.
- `reviewer` judges semantic correctness and risk; it does not implement, run
  proof, finalize, or resync.
- `finalizer` closes according to earned evidence; it does not implement, run
  proof, review again, or perform resync.
- `resync` synchronizes authorized final context; it does not reopen, replan,
  execute, validate, review, or finalize the round.

## Required Profile Shape

Each profile must retain the 13-section shape:

1. Profile Status
2. Seniority Thesis
3. Canonical Role Boundary
4. Kernel-Derived Anchors
5. Decision Heuristics
6. Reading Budget
7. Risk Taxonomy
8. Stop / Block Patterns
9. Handoff Discipline
10. Evidence Discipline
11. Anti-Overreach Rules
12. Anti-Bloat Rules
13. Excellent Pass Expectations

Each profile must also retain:

- `README.md`
- `SENIOR_AGENT_PROFILE.md`
- `validation/STATIC_CHECKS.md`
- `validation/GOLDEN_SCENARIOS.md`
- `validation/EXCELLENT_PASS_EXPECTATIONS.md`

## Completion Rule

The Seniorization Lab can earn integrated excellent pass only when:

- all 12 profiles are present;
- all 60 local required files are present;
- this `contracts/` directory is present;
- global contracts are internally coherent;
- no runtime/materialization leak exists;
- the handoff chain can be simulated end-to-end without role takeover;
- local profile validations remain role-specific and documentary/dev-only;
- the final integrated validation report records scope, evidence, blockers, and
  verdict.

