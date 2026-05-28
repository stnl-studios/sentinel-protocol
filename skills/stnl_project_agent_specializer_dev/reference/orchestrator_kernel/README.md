# Orchestrator Kernel Contracts

Status: experimental documentation index for `stnl_project_agent_specializer_dev`.

Nothing in this directory implements runtime loading, module execution, static-check execution, golden-test execution, harnesses, final artifacts, or real materialization.

Read in this order:

1. `CONTRACT.md` - Phase 1 kernel boundary and non-delegable routing safety.
2. `MINIMUM_SAFE_BUNDLE.md` - Phase 2 mandatory protections that cannot become optional.
3. `MODULE_INDEX.md` - Phase 3 catalog of known future modules and their limits.
4. `ACTIVATION_GATES.md` - Phase 4 eligibility gates and blocked-module mapping.
5. `EXPERIMENTAL_MATERIALIZATION.md` - Phase 5 isolated materialization boundary for `orchestrator` only.
6. `STATIC_CHECKS.md` - Phase 6 cheap structural check contract, without execution.
7. `GOLDEN_TESTS.md` - Phase 7 exactly two critical golden-test contracts, without harness.

Read-only local static harness: `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/check-static.mjs`.

The productive skill, productive templates, final target artifacts, `.github/**`, `.codex/**`, `AGENTS.md`, `sentinel.mjs`, and `scripts/sentinel-smoke.mjs` remain untouched by these contracts.
