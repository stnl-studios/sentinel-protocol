# Coder Front-End Static Checks

Status: read-only structural support for the initial draft. This support is
blocking documentary validation only. It does not promote the kernel, does not
authorize automatic promotion, and does not change the status from `initial draft, not promoted, not a clean pass`.

The static checks validate the minimum documentary structure of the
`coder-frontend` kernel draft. They do not execute agent runtime, do not load a
runtime agent, do not materialize anything, do not write target repositories,
do not write GitHub, and do not alter canonical templates.

## Required Files

The harness requires exactly the current documentary draft bundle plus the four
validation files:

- `reference/agents/coder-frontend.agent.md`;
- `reference/coder_frontend_kernel/README.md`;
- `reference/coder_frontend_kernel/contracts/CONTRACT.md`;
- `reference/coder_frontend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/coder_frontend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`;
- `reference/coder_frontend_kernel/contracts/FRONTEND_EXECUTION_GATES.md`;
- `reference/coder_frontend_kernel/validation/STATIC_CHECKS.md`;
- `reference/coder_frontend_kernel/validation/GOLDEN_TESTS.md`;
- `reference/coder_frontend_kernel/validation/check-static.mjs`;
- `reference/coder_frontend_kernel/validation/check-golden.mjs`.

The local dev snapshot must remain byte-for-byte equal to
`templates/agents/coder-frontend.agent.md`.

## Prohibitions

The draft bundle and harness prohibit:

- runtime loader;
- materialization path;
- production use;
- target repository writes;
- GitHub writes;
- canonical template changes;
- generated reports;
- fixtures.

The clean-pass marker assembled as `CLEAN` + `_EXCELLENT` + `_PASS` is
prohibited in this kernel while it remains a draft.

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
- The dev snapshot must equal the canonical template byte-for-byte.
- The draft kernel must not contain the clean-pass marker.
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
- Both validation documents must declare read-only support and no promotion.
