# Minimum Safe Bundle

Status: initial draft, not promoted, not a clean pass.

The minimum safe bundle for this initial documentary draft is intentionally
small and allowlist-bound.

## Required Files

- `reference/agents/coder-frontend.agent.md`;
- `reference/coder_frontend_kernel/README.md`;
- `reference/coder_frontend_kernel/contracts/CONTRACT.md`;
- `reference/coder_frontend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/coder_frontend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/coder_frontend_kernel/contracts/FRONTEND_EXECUTION_GATES.md`.

No validation directory, harness, fixture, generated report, runtime loader,
materialization path, production artifact, or target-repository artifact is
required or authorized for this draft.

## Snapshot Requirement

`reference/agents/coder-frontend.agent.md` must match
`templates/agents/coder-frontend.agent.md` byte-for-byte.

## Required Documentary Coverage

The bundle must explicitly preserve:

- role class `executor`;
- reading scope class `targeted-local`;
- execution-only ownership of authorized front-end, web, or client-side work
  packages;
- required `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`;
- required `EXECUTION BRIEF`;
- required `VALIDATION PACK`;
- required guardrails when present;
- minimum technical frontend context;
- optional `designer` direction;
- optional stabilized shared contracts;
- optional local framework, design system, routing, state, analytics,
  localization, and testing conventions;
- optional adjacent executor evidence;
- outputs covering implementation, concise delta, paths or evidence, checks
  run or not run, residual risk, and exact blocker when blocked;
- statuses `READY` and `BLOCKED`;
- stop conditions for missing or unsafe package, brief, pack, context,
  contract, capability, environment, structural decision, product decision, UX
  decision, routing, permission, feature flag, localization, analytics, and UI
  contract uncertainty;
- anti-role-drift boundaries against planner, designer,
  validation-eval-designer, execution-package-designer, validation-runner,
  reviewer, finalizer, and resync.

## Draft Boundary

The bundle must not authorize runtime loading, materialization, production use,
target repository writes, GitHub writes, productive-skill changes, canonical
template changes, materializer behavior, validation harnesses, generated
reports, runtime loader work, or target-repository artifacts.

## Ignore Rules

Validation and review must ignore `__MACOSX` and `.DS_Store`.
