# Coder Back-End Static Checks

Status:

- `initial draft`;
- `not promoted`;
- `not a clean pass`;
- `pending draft audit`;
- `pending harness design`;
- `pending harness creation`;
- `pending promotion evaluation`;
- `documentary only`;
- `contractual only`;
- `minimum semantic only`;
- `dev kernel lab only`;
- `non-runtime`;
- `non-production`;
- `no materialization path`.

These static checks are textual pre-harness criteria for the initial
`coder-backend` documentary draft. They are not an active `MANIFEST.md` entry.
They do not execute agent runtime, do not load a runtime agent, do not
materialize anything, do not write target repositories, do not write GitHub, and
do not alter canonical templates.

There is no `validation/check-static.mjs` in this phase. There is also no
`validation/check-golden.mjs` in this phase. Executable static and golden
checks belong to future harness design and harness creation phases. This phase
does not prove `CLEAN_EXCELLENT_PASS`; it only prepares criteria for later draft
audit, harness design, harness creation, and promotion evaluation.

## Required Files

Inside `skills/stnl_project_agent_specializer_dev/reference/coder_backend_kernel/`,
the exact allowed file list is:

- `README.md`;
- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `contracts/BACKEND_EXECUTION_GATES.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`.

The local dev snapshot must remain byte-for-byte equal to
`templates/agents/coder-backend.agent.md`.

## Prohibitions

The bundle prohibits:

- `validation/check-static.mjs`;
- `validation/check-golden.mjs`;
- runtime loader;
- materialization path;
- production use;
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
- The kernel directory must match the exact initial-draft allowlist above.
- The dev snapshot must equal the canonical template byte-for-byte.
- No executable harness file may exist in this phase.
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
