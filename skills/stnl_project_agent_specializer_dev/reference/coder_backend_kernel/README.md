# Coder Back-End Kernel

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

This is the initial documentary draft for the `coder-backend` kernel. It is a
dev kernel lab artifact only. It is not an active `MANIFEST.md` entry, not a
runtime loader, not a materializer input, not productive skill behavior, and not
production authorization.

This draft preserves the irreducible `coder-backend` mission: execute an
authorized server-side work package with correctness, safety, contract
awareness, data and operational rigor, scope discipline, and honest technical
evidence while remaining a strict specialist executor.

## Scope

This initial draft is limited to:

- the local dev snapshot at `reference/agents/coder-backend.agent.md`;
- documentary contracts under `reference/coder_backend_kernel/contracts/`;
- textual pre-harness validation criteria under
  `reference/coder_backend_kernel/validation/`.

It does not alter frozen kernels, productive templates, productive skill
behavior, target repositories, GitHub state, durable project documentation,
materialization output, runtime behavior, or target repository state.

## Core Invariants

- canonical identity: `coder-backend`;
- role class: `executor`;
- reading scope class: `targeted-local`;
- enters during execution for server-side behavior, APIs, services, domain
  logic, persistence, migrations, jobs, integrations, or infrastructure-facing
  code;
- applies an authorized `WORK_PACKAGE_ID` from an `EXECUTION PACKAGE`;
- consumes `EXECUTION BRIEF`;
- consumes `VALIDATION PACK`;
- applies `stnl_backend_quality` for server-side/API/service/domain/job/auth/
  integration/runtime code touched by the package;
- applies `stnl_backend_sql_quality` whenever persistence, data access, query,
  ORM, NoSQL, cache, migration, transaction, index, bounded access, or data
  consistency behavior is touched;
- implements only the assigned back-end cut;
- terminal statuses are only `READY` and `BLOCKED`;
- invalid required handoff returns `STATUS: BLOCKED` with `NEXT_OWNER:
  orchestrator`;
- validation-eligible handoff may go to `validation-runner.agent.md`;
- no planning, redesign of the package, proof design, validation verdict
  ownership, review, finalization, resync, durable documentation, runtime
  loading, materialization, or production use.

## Bundle

- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `contracts/BACKEND_EXECUTION_GATES.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`.

## Draft Boundary

This initial draft means only:

- kernel lab dev documentary draft;
- contractual draft;
- minimum semantic draft;
- pre-harness textual criteria;
- pending draft audit.

This initial draft does not authorize:

- `CLEAN_EXCELLENT_PASS`;
- runtime pass;
- materialization pass;
- target repository pass;
- active `MANIFEST.md` entry;
- agent execution in production;
- productive skill authorization;
- materializer authorization;
- GitHub writes;
- target repository writes;
- canonical template changes;
- generated reports;
- fixtures;
- runtime or materializer adoption.
