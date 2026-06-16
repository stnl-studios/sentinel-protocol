# Source Model Contract

Status: documentary/dev-only contract.

This contract defines the source model for the future materialization rewrite
inside `stnl_project_agent_specializer_dev`. It is a documentary/dev-only
contract and is not a runtime materializer.

## Source Roles

- `reference/kernel_lab/` is the primary behavior source for future render,
  dry-run, and materialization planning.
- Each `kernel_source` points to a real kernel module bundle at
  `reference/kernel_lab/<agent>_kernel/`.
- `reference/seniorization_lab/` is the seniorization overlay over the kernel
  behavior source.
- `reference/templates/` defines the target output shape for each supported
  target.
- `reference/agents/` is a temporary development parity baseline.
- `reference/agents/` is not a final materialization source.
- `reference/agents/` may be removed after final validation of the dev skill.
- Deprecated field `base_agent_source`: deprecated as a materialization source
  and must not appear in final render context or final dry-run planned
  artifacts.
- `base_agent_parity_source`, if used, is dev-only parity validation metadata
  only and must never be a render, dry-run, or materialization dependency.

Future materialization source composition uses only:

- `kernel_source`
- `senior_profile_source`
- `template_source`
- `target_contract_source`
- `template_contract_source`
- `rendering_contract_source`

The final render context must not depend on `reference/agents/`. The dry-run
planned artifact must not depend on `reference/agents/`. A final dependency on
`reference/agents/` blocks.

Removal of `reference/agents/` must not break the final architecture after
kernel coverage is validated. This task does not remove `reference/agents/`.

## Kernel Coverage

The required kernel coverage is exactly 12 canonical agents:

| agent_id | kernel module | kernel_source |
| --- | --- | --- |
| `orchestrator` | `orchestrator_kernel` | `reference/kernel_lab/orchestrator_kernel/` |
| `planner` | `planner_kernel` | `reference/kernel_lab/planner_kernel/` |
| `validation-eval-designer` | `validation_eval_designer_kernel` | `reference/kernel_lab/validation_eval_designer_kernel/` |
| `execution-package-designer` | `execution_package_designer_kernel` | `reference/kernel_lab/execution_package_designer_kernel/` |
| `designer` | `designer_kernel` | `reference/kernel_lab/designer_kernel/` |
| `coder-frontend` | `coder_frontend_kernel` | `reference/kernel_lab/coder_frontend_kernel/` |
| `coder-backend` | `coder_backend_kernel` | `reference/kernel_lab/coder_backend_kernel/` |
| `coder-ios` | `coder_ios_kernel` | `reference/kernel_lab/coder_ios_kernel/` |
| `validation-runner` | `validation_runner_kernel` | `reference/kernel_lab/validation_runner_kernel/` |
| `reviewer` | `reviewer_kernel` | `reference/kernel_lab/reviewer_kernel/` |
| `finalizer` | `finalizer_kernel` | `reference/kernel_lab/finalizer_kernel/` |
| `resync` | `resync_kernel` | `reference/kernel_lab/resync_kernel/` |

The minimum kernel source bundle is derived from real files already present in
each kernel module. The common minimum bundle currently includes:

- `<kernel>/README.md`
- `<kernel>/contracts/CONTRACT.md`
- `<kernel>/contracts/MINIMUM_SAFE_BUNDLE.md`
- `<kernel>/contracts/BEHAVIOR_PARITY_SPINE.md`
- `<kernel>/validation/STATIC_CHECKS.md`
- `<kernel>/validation/GOLDEN_TESTS.md`

Kernel-specific gate contracts are part of the real bundle when present. No
mandatory kernel file may be invented by naming convention. If a kernel module
is absent or lacks the minimum real contractual documentation above, the source
model blocks with `BLOCKED_KERNEL_SOURCE_MISSING`. If the 12 kernels cannot be
mapped completely, the source model blocks with
`BLOCKED_KERNEL_COVERAGE_INCOMPLETE`.

## Base Agent Parity Baseline

`reference/agents/` remains allowed only as a temporary development parity
baseline while the dev skill is validated. It may be used only by separate
dev-only parity checks. It must not be used by final render context planning,
dry-run planned artifacts, or real materialization.

If a future implementation requires the temporary parity baseline as a final
source, it must block with `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`.
If a final context or planned artifact declares deprecated field `base_agent_source`,
it must block with `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`.

## Non-Authorization

This task does not authorize:

- target real read/write;
- fixtures;
- GitHub writes;
- productive skill changes;
- generated outputs;
- persistent reports;
- real materialization.

This task also does not authorize changes to
`skills/stnl_project_agent_specializer/`, target-project `.github/**`,
target-project `.codex/**`, or target-project `AGENTS.md`.

## Blocking Rules

Use these source-model block codes exactly:

- `BLOCKED_SOURCE_MODEL_INVALID`: source roles, source composition, or source
  precedence contradict this contract.
- `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`: final render, dry-run, or
  materialization depends on `reference/agents/`.
- `BLOCKED_KERNEL_SOURCE_MISSING`: a required kernel module or its real
  minimum documentation/contract bundle is missing.
- `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`: the 12 canonical agent to kernel
  module mappings are incomplete.
- `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`: the temporary
  development parity baseline is required as a final source.
- `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`: deprecated field `base_agent_source`
  is present in final render context or final dry-run planned artifact shape.

All source-model blocks are fail-closed. A blocked source model must not
proceed to render, dry-run planning, fixture generation, target read/write,
GitHub writes, generated outputs, persistent reports, productive skill
changes, or real materialization.
