# Reviewer Kernel Static Checks

Status: planned textual static-check contract for
`REVIEWER_KERNEL: INITIAL_DRAFT`.

This file documents intended static checks for the reviewer draft. It is not an
executable harness. No `check-static.mjs` exists or is authorized in this
phase. Passing these documented expectations manually would not authorize
runtime, materialization, production, global docs updates, productive-skill
changes, template changes, generated reports, fixtures, automatic promotion, or
`CLEAN_EXCELLENT_PASS`.

The planned static checks inspect only:

- local reviewer snapshot:
  `skills/stnl_project_agent_specializer_dev/reference/agents/reviewer.agent.md`;
- productive template for literal-copy comparison only:
  `templates/agents/reviewer.agent.md`;
- reviewer-kernel documentation:
  `skills/stnl_project_agent_specializer_dev/reference/reviewer_kernel/**`.

The productive template is only a copy origin for the snapshot comparison. It
is not a fallback source for missing reviewer-kernel documentation.

## Planned Checks

### RV-CH-001 - Required reviewer-kernel files exist

Validate that the initial seven Markdown files exist and that no executable
harness files are required for this phase.

### RV-CH-002 - Snapshot local exists

Validate that `reference/agents/reviewer.agent.md` exists as the local dev
snapshot and audit point.

### RV-CH-003 - Snapshot is literal copy of productive template

Compare `templates/agents/reviewer.agent.md` and
`reference/agents/reviewer.agent.md` byte-for-byte.

### RV-CH-004 - Status remains initial draft

Validate all reviewer-kernel docs use `REVIEWER_KERNEL: INITIAL_DRAFT` and do
not claim `CLEAN_EXCELLENT_PASS`, promotion, runtime, production, materializer,
materialization path, executable harness, target artifact, productive-skill
activation, template mutation, GitHub write, or target-repo write authority.

### RV-CH-005 - Identity and role preserved

Validate the docs preserve `reviewer`, `semantic-review`, `review-minimal`,
agent version `2026.5.1`, and post-implementation pre-finalizer placement.

### RV-CH-006 - Review target preserved

Validate the docs require review of implemented artifact and resulting diff
inside the authorized cut.

### RV-CH-007 - Material semantic review axes preserved

Validate the docs preserve semantic risk, architectural risk, boundary drift,
maintainability, complexity, improper coupling, unauthorized inference,
contract drift, product-decision leakage, active guardrail drift, and scope
expansion.

### RV-CH-008 - Proof ownership prohibited

Validate the docs keep proof, check execution, evidence gathering, and runner
verdicts with `validation-runner`, not reviewer.

### RV-CH-009 - Implementation ownership prohibited

Validate the docs prohibit implementation, code editing, patching, correction
execution, broad refactor, and cut redesign by reviewer.

### RV-CH-010 - Closure and resync ownership prohibited

Validate the docs prohibit reviewer from deciding `DONE`, closing the round,
performing resync, deciding factual sync, or writing shared canon.

### RV-CH-011 - Output shape preserved

Validate the docs allow only `PASS`, `FAIL`, or exactly one formal
`CORRECTION PACK` block, and require `CORRECTION PACK` to be mutually exclusive
with terminal verdicts.

### RV-CH-012 - PASS and FAIL semantics preserved

Validate `PASS` requires sufficient structural adherence and no unresolved
material structural risk, while `FAIL` requires unresolved material structural
risk or honest inability to judge.

### RV-CH-013 - Correction pack gate preserved

Validate `CORRECTION PACK` is allowed only for minimal, in-scope, surgical,
corrigible issues while budget remains and is routeable by orchestrator rather
than executed by reviewer.

### RV-CH-014 - Reading remains review-minimal

Validate the docs preserve bounded reading order, nearest-reference expansion
only for one concrete structural question, File Purpose Header awareness, and
prohibition on scratchpads, `workspaceStorage`, `chat-session-resources`,
`content.txt`, and runtime temp paths as Sentinel source of truth.

### RV-CH-015 - Generic opinion review prohibited

Validate the docs reject repo-wide review, broad rediscovery, aesthetic
preference as blocker, generic modernization review, and non-material findings
inflated into structural risk.

### RV-CH-016 - Unexpected files remain absent

Validate `reviewer_kernel` contains only the authorized Markdown files for this
phase and no `.mjs`, `.js`, `.cjs`, fixture, generated output, report, runtime,
loader, materializer, or materialization path.
