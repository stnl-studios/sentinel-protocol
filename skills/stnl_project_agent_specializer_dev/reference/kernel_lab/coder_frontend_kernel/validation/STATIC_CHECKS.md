# Coder Front-End Static Checks

Status: `CLEAN_EXCELLENT_PASS`.

The static checks validate the minimum documentary structure of the
`coder-frontend` clean kernel lab dev pass. They do not execute agent runtime,
do not load a runtime agent, do not materialize anything, do not write target
repositories, do not write GitHub, and do not alter canonical templates.

This harness accepts `CLEAN_EXCELLENT_PASS` as the `coder-frontend` kernel
documentary status after the explicitly authorized promotion audit. Passing
these checks does not authorize runtime pass, materialization pass, target repo
pass, productive skill authorization, materializer authorization, GitHub
writes, target repo writes, generated reports, fixtures, or automatic future
promotion.

## Required Files

The harness requires exactly the current documentary bundle plus the four
validation files. Inside
`skills/stnl_project_agent_specializer_dev/reference/kernel_lab/coder_frontend_kernel/`,
the exact allowed file list is:

- `README.md`;
- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `contracts/FRONTEND_EXECUTION_GATES.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`;
- `validation/check-static.mjs`;
- `validation/check-golden.mjs`.

The harness fails on any regular file outside this allowlist, any symlink, any
non-regular file, or any directory outside the allowed `contracts/` and
`validation/` structure. `__MACOSX` and `.DS_Store` are ignored.

The local dev snapshot must remain byte-for-byte equal to
`templates/agents/coder-frontend.agent.md`.

## Prohibitions

The bundle and harness prohibit:

- runtime loader;
- materialization path;
- production use;
- target repository writes;
- GitHub writes;
- canonical template changes;
- generated reports;
- fixtures.

Every primary documentary file must declare `CLEAN_EXCELLENT_PASS`; stale
pre-promotion wording is rejected.

## Structural Anchors

The checks preserve these anchors in the correct documentary sources:

- `coder-frontend`;
- `agent_version: 2026.5.1`;
- `targeted-local`;
- `executor`;
- `EXECUTION PACKAGE`;
- `WORK_PACKAGE_ID`;
- `EXECUTION BRIEF`;
- `VALIDATION PACK`;
- `READY`;
- `BLOCKED`;
- `designer.agent.md`;
- `stnl_frontend_quality`.

## Static Rules

- Required files must exist and remain inside the repository after `realpath`
  resolution.
- `__MACOSX` and `.DS_Store` are ignored.
- The kernel directory must match the exact allowlist above.
- The dev snapshot must equal the canonical template byte-for-byte.
- Every primary documentary file must declare `CLEAN_EXCELLENT_PASS`.
- The kernel must not contain stale pre-promotion wording.
- The kernel directory must not contain fixture paths, generated report paths,
  runtime-loader paths, materializer paths, or materialization paths.
- Required anchors must be present in the expected contract, parity, gates, and
  bundle files.
- The invalid required-handoff shape must remain exact:

```text
STATUS: BLOCKED
REASON: required handoff missing or invalid
NEXT_OWNER: orchestrator
REQUEST: replay previous handoff or regenerate from owner
```

- Durable documentation exclusions must include `Feature CONTEXT`, `DONE`, ADR,
  `PLAN.md`, `core` docs, and `units` docs.
- `READY` without implementation evidence, changed paths or equivalent
  evidence, checks, and residual risk must remain invalid.
- Both validation documents must declare promotion-aware support while
  preserving no automatic future promotion.
