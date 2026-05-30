# Orchestrator Kernel Contracts

Status: experimental documentation index for the kernel-lab route in
`stnl_project_agent_specializer_dev`.

Nothing in this directory implements runtime loading, module execution,
runtime-integrated check execution, runtime golden-test execution, final
artifacts, generated artifacts, or real materialization. The local harnesses are
read-only structural and semantic checks only.

The previous standalone materialization route is frozen. Current work is
base-agent vs kernel-agent validation, starting with `orchestrator`.

Read in this order:

1. `CONTRACT.md` - kernel boundary and non-delegable routing safety.
2. `MINIMUM_SAFE_BUNDLE.md` - mandatory protections that cannot become optional.
3. `BEHAVIOR_PARITY_SPINE.md` - compact base-orchestrator behavior contracts
   required for kernel-lab parity.
4. `MODULE_INDEX.md` - catalog of known future modules and their limits.
5. `ACTIVATION_GATES.md` - eligibility gates and blocked-module mapping.
6. `EXPERIMENTAL_MATERIALIZATION.md` - freeze record for the previous
   standalone materialization route.
7. `STATIC_CHECKS.md` - read-only structural checks for the current docs.
8. `GOLDEN_TESTS.md` - structural and semantic golden-test contracts.

Read-only local static harness: `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/check-static.mjs`.
Read-only local golden harness: `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/check-golden.mjs`.

The productive skill, productive templates, final target artifacts, `.github/**`, `.codex/**`, `AGENTS.md`, `sentinel.mjs`, and `scripts/sentinel-smoke.mjs` remain untouched by these contracts.
