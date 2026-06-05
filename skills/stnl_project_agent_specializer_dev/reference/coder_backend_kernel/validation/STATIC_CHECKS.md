# Coder Back-End Static Checks

Status:

- `initial draft`;
- `not promoted`;
- `not a clean pass`;
- `pending draft audit`;
- `harness design complete`;
- `harness creation complete`;
- `pending hardened harness audit`;
- `pending promotion evaluation`;
- `documentary only`;
- `contractual only`;
- `minimum semantic only`;
- `dev kernel lab only`;
- `non-runtime`;
- `non-production`;
- `no materialization path`.

These static checks are post-harness textual validation criteria for the
initial `coder-backend` documentary draft. The harnesses exist as textual
executable validation scripts of the kernel lab dev bundle:
`validation/check-static.mjs` and `validation/check-golden.mjs`. They are not an
active `MANIFEST.md` entry. They do not execute agent runtime, do not load a
runtime agent, do not authorize runtime execution, do not materialize anything,
do not authorize a materialization path, do not authorize production use, do not
authorize productive-skill behavior or change, do not write target repositories,
do not authorize target repository write, do not write GitHub, do not authorize
GitHub write, and do not alter canonical templates.

The existence of these harness scripts does not prove `CLEAN_EXCELLENT_PASS`.
The kernel remains `initial draft`, `not promoted`, and `not a clean pass`.
Promotion still depends on `HARDENED_HARNESS_AUDIT` and
`PROMOTION_EVALUATION`.

## Required Files

Inside `skills/stnl_project_agent_specializer_dev/reference/coder_backend_kernel/`,
the exact allowed file list is:

- `README.md`;
- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `contracts/BACKEND_EXECUTION_GATES.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`;
- `validation/check-static.mjs`;
- `validation/check-golden.mjs`.

The local dev snapshot must remain byte-for-byte equal to
`templates/agents/coder-backend.agent.md`.

## Prohibitions

The bundle prohibits:

- runtime loader;
- runtime execution;
- materialization path;
- production use;
- productive-skill authorization;
- target repository writes;
- GitHub writes;
- canonical template changes;
- generated reports;
- fixtures;
- active `MANIFEST.md` entry;
- `CLEAN_EXCELLENT_PASS`.

Every primary documentary file must declare initial-draft status, not-promoted
status, not-a-clean-pass status, pending audit/harness/promotion status,
documentary-only status, contractual-only status, minimum-semantic-only status,
dev-kernel-lab-only status, non-runtime status, non-production status, and no
materialization path.

## Structural Anchors

The future static checks should preserve these anchors in the correct
documentary sources:

- `coder-backend`;
- `agent_version: 2026.5.1`;
- `targeted-local`;
- `executor`;
- `EXECUTION PACKAGE`;
- `WORK_PACKAGE_ID`;
- `EXECUTION BRIEF`;
- `VALIDATION PACK`;
- `READY`;
- `BLOCKED`;
- `NEXT_OWNER: orchestrator`;
- `validation-runner.agent.md`;
- `stnl_backend_quality`;
- `stnl_backend_sql_quality`;
- no durable documentation;
- no planning;
- no package redesign;
- no validation verdict ownership;
- no finalization;
- no resync.

## Static Rules For Future Harness

- Required files must exist and remain inside the repository after `realpath`
  resolution.
- `__MACOSX` and `.DS_Store` must be ignored.
- The kernel directory must match the exact post-harness allowlist above.
- The dev snapshot must equal the canonical template byte-for-byte.
- The textual executable harness files may exist only as
  `validation/check-static.mjs` and `validation/check-golden.mjs` in this dev
  kernel lab bundle.
- The harness scripts must not authorize runtime execution, materialization
  path, production use, productive-skill change, GitHub write, target repository
  write, fixtures, generated reports, runtime loader, materializer, or target
  artifacts.
- Every primary documentary file must declare initial-draft, not-promoted, and
  not-clean-pass status.
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
- `BLOCKED` must remain the only valid handoff for missing or invalid required
  preparation.
