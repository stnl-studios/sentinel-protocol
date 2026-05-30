# Planner Kernel Static Checks

Status: read-only executable structural support for the planner kernel lab.

The local harness is
`reference/planner_kernel/validation/check-static.mjs`. It uses only Node
built-ins, is read-only, keeps path containment inside the repository, ignores
`__MACOSX` and `.DS_Store`, and exits `1` when any check fails.

The harness inspects only:

- local planner snapshot:
  `skills/stnl_project_agent_specializer_dev/reference/agents/planner.agent.md`;
- productive template for literal-copy comparison only:
  `templates/agents/planner.agent.md`;
- planner-kernel documentation:
  `skills/stnl_project_agent_specializer_dev/reference/planner_kernel/**`;
- manifest and global dev-skill docs declared for this kernel-lab route.

It does not execute agent runtime, does not implement a materializer, does not
write target-project artifacts, does not create fixtures, does not produce
generated reports, and does not authorize automatic pass. The planner status
continues to require human final audit after the checks pass.

## Implemented checks

### PL-CH-001 - Required planner-kernel files exist

Required files:

- `reference/planner_kernel/README.md`;
- `reference/planner_kernel/contracts/CONTRACT.md`;
- `reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/planner_kernel/validation/STATIC_CHECKS.md`;
- `reference/planner_kernel/validation/GOLDEN_TESTS.md`;
- `reference/planner_kernel/validation/check-static.mjs`;
- `reference/planner_kernel/validation/check-golden.mjs`.

### PL-CH-002 - Snapshot local exists and is listed

`reference/agents/planner.agent.md` must exist and be listed in
`reference/MANIFEST.md`.

### PL-CH-003 - Snapshot is literal copy of productive template

`templates/agents/planner.agent.md` and
`reference/agents/planner.agent.md` must be byte-for-byte identical.

The productive template is used only for this literal-copy check. It is not a
fallback if the local snapshot is absent.

### PL-CH-004 - Manifest lists planner kernel bundle

`reference/MANIFEST.md` must list the planner snapshot, the six planner-kernel
documentation files, and the two harnesses.

### PL-CH-005 - Global docs recognize planner without excellent pass

`README.md`, `SKILL.md`, and `reference/kernel_lab/README.md` must recognize
`planner_kernel` as under review or not excellent pass. They must not declare a
planner excellent pass.

### PL-CH-006 - Orchestrator frozen status preserved

Global docs must keep `orchestrator_kernel` frozen as `CLEAN_EXCELLENT_PASS`
and must not imply a planner round can alter that result.

### PL-CH-007 - Source chain is unambiguous

Planner docs must identify:

- `templates/agents/planner.agent.md` as productive/base origin;
- `reference/agents/planner.agent.md` as local dev snapshot and audit point;
- `reference/planner_kernel/**` as documentary contract set;
- no fallback to the productive template when the snapshot is missing.

### PL-CH-008 - No planning_kernel exists

No real path or file named `planning_kernel` may exist. Textual mentions are
allowed only as prohibitions.

### PL-CH-009 - No planner excellent status declared prematurely

Planner-kernel docs must not contain any planner-kernel-specific status token
that combines the planner-kernel prefix with excellent/pass wording.

### PL-CH-010 - No unauthorized runtime/materialization surfaces

`planner_kernel` must not contain runtime, materializer, fixture, generated, or
report surfaces. The only `.mjs` harnesses allowed under the planner kernel are
`validation/check-static.mjs` and `validation/check-golden.mjs`.

### PL-CH-011 - Core invariants preserved

Contracts must preserve:

- `planner`;
- `planning`;
- `bounded-context`;
- `EXECUTION BRIEF`;
- `READY`;
- `NEEDS_DEV_DECISION_BASE`;
- ephemeral/current-round handoff;
- return to orchestrator.

### PL-CH-012 - Role absorption prohibited

Contracts must prohibit absorption of:

- implementation;
- validation or running validation;
- final verdict;
- round closure;
- resync;
- durable documentation;
- `PLAN.md`;
- `execution_brief.md`;
- backlog management;
- discovery engine;
- implementation designer;
- pseudo-orchestrator;
- `VALIDATION PACK`;
- `EXECUTION PACKAGE`;
- `WORK_PACKAGE_ID`;
- `OWNED_PATHS`;
- `DO_NOT_TOUCH`;
- `RUN_COMMANDS`;
- `ACCEPTANCE_CHECKS`;
- `BLOCK_IF`.

### PL-CH-013 - Operational axes preserved

Contracts and golden docs must preserve:

- `MODE=standard`;
- `MODE=strict`;
- `MODE=compact`;
- `RUN=execute`;
- `RUN=plan`;
- `HANDOFF_READY`;
- compact return.

### PL-CH-014 - Guardrails remain metadata

Contracts may carry these guardrail names only as metadata:

- `stnl_frontend_quality`;
- `stnl_backend_quality`;
- `stnl_backend_sql_quality`;
- `stnl_mobile_ios_swift_quality`.

Contracts must prohibit copying guardrail content, editing guardrail content,
inventing guardrails, or treating guardrails as agents.

### PL-CH-015 - Validation docs align with executable harnesses

`STATIC_CHECKS.md` and `GOLDEN_TESTS.md` must recognize the read-only
executable harnesses `check-static.mjs` and `check-golden.mjs`. They must not
claim agent runtime execution, materializer behavior, fixtures, or generated
reports.

### PL-CH-016 - Global docs list harnesses without automatic pass

`README.md`, `SKILL.md`, `reference/MANIFEST.md`, and
`reference/kernel_lab/README.md` must list or recognize
`reference/planner_kernel/validation/check-static.mjs` and
`reference/planner_kernel/validation/check-golden.mjs` without promoting an
automatic pass.

### PL-CH-017 - Reading contract preserved

Contracts must preserve:

- `bounded-context`;
- budget of at most 3 local artifacts;
- at most 1 live artifact inside that budget;
- expansion by at most 2 additional targeted artifacts;
- no broad discovery;
- no "read more" loop to avoid DEV decision.

## Out of scope

- agent runtime execution;
- materializer creation;
- target-project writes;
- fixtures;
- generated reports;
- production skill changes;
- productive template changes;
- orchestrator-kernel edits;
- kernelization of other agents.
