# Orchestrator Kernel Contracts

Status: experimental documentation index for `stnl_project_agent_specializer_dev`.

Nothing in this directory implements runtime loading, module execution, runtime-integrated check execution, runtime golden-test execution, final artifacts, or real materialization. The local harnesses here are read-only structural checks only.

Read in this order:

1. `CONTRACT.md` - kernel boundary and non-delegable routing safety.
2. `MINIMUM_SAFE_BUNDLE.md` - mandatory protections that cannot become optional.
3. `MODULE_INDEX.md` - catalog of known future modules and their limits.
4. `ACTIVATION_GATES.md` - eligibility gates and blocked-module mapping.
5. `EXPERIMENTAL_MATERIALIZATION.md` - isolated materialization boundary for `orchestrator` only.
6. `STATIC_CHECKS.md` - static-check contract, without execution.
7. `GOLDEN_TESTS.md` - exactly two critical golden-test contracts, with a local read-only golden-test harness.

Read-only local static harness: `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/check-static.mjs`.
Read-only local golden harness: `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/check-golden.mjs`.

The productive skill, productive templates, final target artifacts, `.github/**`, `.codex/**`, `AGENTS.md`, `sentinel.mjs`, and `scripts/sentinel-smoke.mjs` remain untouched by these contracts.
