# Planner Kernel Static Checks

Status: desired read-only structural support for the planner kernel lab.

These checks are documentation contracts only. They do not implement a runtime
loader, materializer, target-project writer, generated artifact producer,
installer change, smoke change, or authorization gate.

Future checks should inspect only the planner-kernel documentation area and the
declared canonical source needed for parity:

- `templates/agents/planner.agent.md`;
- `skills/stnl_project_agent_specializer_dev/reference/planner_kernel/**`.

They should ignore `__MACOSX` and `.DS_Store`.

## Required checks

### PL-CH-001 - Required planner-kernel files exist

Required files:

- `reference/planner_kernel/README.md`;
- `reference/planner_kernel/contracts/CONTRACT.md`;
- `reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/planner_kernel/validation/STATIC_CHECKS.md`;
- `reference/planner_kernel/validation/GOLDEN_TESTS.md`.

The check must not require `MODULE_INDEX.md`, `ACTIVATION_GATES.md`,
`EXPERIMENTAL_MATERIALIZATION.md`, harness `.mjs` files, fixtures, generated
reports, or any `planning_kernel`.

### PL-CH-002 - Canonical source is explicit and present

The planner kernel must declare `templates/agents/planner.agent.md` as the
canonical source and the file must exist.

The check must not use fallback paths, copied external files, productive skill
references, broad globs, or reconstructed planner content when the canonical
source is missing.

### PL-CH-003 - Identity and role class are preserved

The contracts must preserve:

- identity `planner`;
- role class `planning`;
- reading scope `bounded-context`;
- workflow position after orchestrator framing and before
  `validation-eval-designer`;
- return to orchestrator.

### PL-CH-004 - Output remains EXECUTION BRIEF

The contracts must preserve `EXECUTION BRIEF` as the planner-owned output.

The check should fail if the planner kernel authorizes `VALIDATION PACK`,
`EXECUTION PACKAGE`, final verdict, route packet, backlog artifact, durable plan,
or another positive output.

### PL-CH-005 - Planner statuses stay limited

The contracts must allow only:

- `READY`;
- `NEEDS_DEV_DECISION_BASE`.

Invalid input, absent handoff, insufficient base, source conflict, broad
discovery need, UX ambiguity, and validation uncertainty must remain stop or
block reasons rather than additional statuses.

### PL-CH-006 - Brief remains ephemeral

The contracts must state that `EXECUTION BRIEF` is an ephemeral current-round
handoff, not a durable file, SPEC, backlog, plan, or source of truth.

### PL-CH-007 - Durable planning artifacts are prohibited

The contracts must prohibit creation of:

- `PLAN.md`;
- `execution_brief.md`;
- durable documentation by the planner;
- persistent stand-ins for the ephemeral handoff.

### PL-CH-008 - Reading contract remains bounded

The contracts must preserve:

- bounded-context reading;
- base budget of at most 3 local artifacts;
- at most 1 live artifact inside that base budget;
- maximum expansion of 2 additional targeted artifacts;
- expansion only for source of truth, shared contract, boundary, or blocker;
- stop when broad discovery is required.

### PL-CH-009 - Broad discovery is rejected

The contracts must prohibit use of broad discovery, repo-wide scan, "read more"
loops, or implementation inspection by default to avoid a DEV decision.

### PL-CH-010 - Anti-implementation is explicit

The contracts must prohibit implementation, implementation design detailed
enough to substitute for an executor, local refactor/query/algorithm design,
execution approval, and execution commands.

### PL-CH-011 - Validation-pack ownership is preserved

The contracts must prohibit the planner from emitting `VALIDATION PACK`,
designing proof, running validation, or claiming validation sufficiency.

### PL-CH-012 - Execution-package ownership is preserved

The contracts must prohibit the planner from emitting `EXECUTION PACKAGE`.

The planner may include high-level sequencing or package-shaping notes only
when they remain planning-level and return to orchestrator.

### PL-CH-013 - Work-package fields are prohibited

The contracts must prohibit the planner from defining:

- `WORK_PACKAGE_ID`;
- `OWNED_PATHS`;
- `DO_NOT_TOUCH`;
- `RUN_COMMANDS`;
- `ACCEPTANCE_CHECKS`;
- `BLOCK_IF`.

### PL-CH-014 - Guardrails remain metadata

The contracts must allow only these guardrail names as metadata:

- `stnl_frontend_quality`;
- `stnl_backend_quality`;
- `stnl_backend_sql_quality`;
- `stnl_mobile_ios_swift_quality`.

The contracts must prohibit copying guardrail content, editing guardrail
content, inventing guardrails, or treating guardrails as agents.

### PL-CH-015 - Orchestrator relation is preserved

The contracts must require planner input to be already framed by orchestrator
and planner output to return to orchestrator.

The planner must not decide final routing or bypass orchestrator ownership.

### PL-CH-016 - Designer signal is preserved

The contracts must require a signal to orchestrator when the cut has real UX,
UI, accessibility, responsiveness, interaction, or visual consistency impact.

The contracts must also prohibit the planner from replacing `designer`.

### PL-CH-017 - No planning-kernel artifact exists

The planner kernel route must not create or require any `planning_kernel` path,
contract, harness, fixture, or generated report.

The only route under validation is one base agent to one kernel:

`templates/agents/planner.agent.md -> reference/planner_kernel/`

## Out of scope

- runnable static-check implementation;
- generated reports;
- fixtures;
- materialization checks;
- target-project writes;
- production skill changes;
- global manifest rewrites;
- orchestrator-kernel edits;
- kernelization of other agents.
