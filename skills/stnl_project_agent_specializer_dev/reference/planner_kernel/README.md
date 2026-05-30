# Planner Kernel Contracts

Status: experimental documentation index for the kernel-lab route in
`stnl_project_agent_specializer_dev`.

This directory is a documentation-only, read-only kernel lab for the base
`planner` agent. It does not implement runtime loading, module execution,
materialization, target artifact generation, local harnesses, fixtures,
generated reports, or production skill behavior.

Source alignment:

- productive/base origin: `templates/agents/planner.agent.md`;
- integrated dev snapshot: `reference/agents/planner.agent.md`;
- documentary kernel: `reference/planner_kernel/**`.

The planner snapshot is the local audit point for this dev kernel lab. The
productive template may be cited as the copy origin, but it is not a fallback
outside the manifest.

This is not a `planning_kernel`, family kernel, shared planning layer, or merged
planning-agent bundle. The current mapping is intentionally one base agent to
one future kernel:

`templates/agents/planner.agent.md -> reference/agents/planner.agent.md -> reference/planner_kernel/`

## Included files

Read in this order:

1. `contracts/CONTRACT.md` - planner-kernel identity, authority, handoff,
   reading, status, and role-drift contract.
2. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional contract set that
   keeps the planner acting as planner.
3. `contracts/BEHAVIOR_PARITY_SPINE.md` - behavior that must remain
   semantically aligned with the base `planner`.
4. `validation/STATIC_CHECKS.md` - desired read-only structural checks for this
   documentation bundle.
5. `validation/GOLDEN_TESTS.md` - desired semantic golden-test scenarios for
   future validation work.

## Scope limits

This directory does not authorize:

- changes to `templates/agents/planner.agent.md`;
- changes to `reference/agents/**` except the already authorized literal
  planner snapshot copy;
- changes to `reference/orchestrator_kernel/**`;
- changes to the productive skill or productive templates;
- changes to global README, SKILL, MANIFEST, installer, smoke, or runtime files;
- creation of `MODULE_INDEX.md`, `ACTIVATION_GATES.md`,
  `EXPERIMENTAL_MATERIALIZATION.md`, harness `.mjs` files, fixtures, or
  generated reports for `planner_kernel`;
- creation of any `planning_kernel`;
- creation of durable planning artifacts such as `PLAN.md` or
  `execution_brief.md`.

The productive/base planner remains the source of truth for the planner role
until a separately authorized contract changes that status. Inside this dev
bundle, review uses the local snapshot declared in `reference/MANIFEST.md`.
