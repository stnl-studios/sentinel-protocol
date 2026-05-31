# Execution Package Designer Kernel Static Checks

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`.

The local harness is
`reference/execution_package_designer_kernel/validation/check-static.mjs`. It
uses only Node built-ins, is read-only, keeps path containment inside the
repository, ignores `__MACOSX` and `.DS_Store`, and exits `1` when any static
check fails.

The checks validate textual and structural evidence only. They do not execute
agent runtime, do not create fixtures, do not produce generated reports, do not
materialize target artifacts, and do not authorize promotion.

## Static Checks

### EPD-CH-001 - Required source, snapshot, and kernel files present

Validates the productive/base copy origin, local dev snapshot, and all
allowlisted kernel documentation and harness files are present as regular files
inside repository containment.

### EPD-CH-002 - Snapshot matches productive copy origin

Validates `reference/agents/execution-package-designer.agent.md` is a
byte-for-byte copy of `templates/agents/execution-package-designer.agent.md`.
The template is not a fallback during review.

### EPD-CH-003 - Manifest lists snapshot and exact bundle

Validates `reference/MANIFEST.md` lists the execution-package-designer snapshot
and the complete kernel file set.

### EPD-CH-004 - Global docs record draft status without promotion

Validates README, SKILL, MANIFEST, and kernel lab docs record
`EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT` while preserving the three frozen predecessor passes and rejecting
premature final-pass wording.

### EPD-CH-005 - Kernel allowlist contains exactly nine files

Validates the kernel directory contains exactly the declared README, four
contract docs, two validation docs, and two harnesses.

### EPD-CH-006 - Identity, handoffs, status, and package fields preserved

Validates kernel docs preserve the base identity, role class, version, reading
class, `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE`, statuses,
package readiness, and key work-package fields.

### EPD-CH-007 - Package readiness gates are explicit

Validates `PACKAGE_READINESS_GATES.md` defines `READY`, `BLOCKED`, handoff
error, parallelization eligibility, anti-theater package, and human decision
gates.

### EPD-CH-008 - Responsibility-boundary drift remains prohibited

Validates the kernel blocks drift into planner, validation-eval-designer,
orchestrator, coder, validation-runner, reviewer, finalizer, resync,
materializer, and durable documentation ownership.

### EPD-CH-009 - Draft bundle contains no stale or premature status

Validates the kernel docs carry the draft-ready-for-audit status and do not
claim `CLEAN_EXCELLENT_PASS`, runtime pass, materialization pass, target pass,
or production authorization.

### EPD-CH-010 - Dangerous literals remain deny-listed with safe polarity

Validates dangerous literals such as `VALIDATION PASSED`, `TESTS PASSED`,
`IMPLEMENTATION VERIFIED`, `PLAN.md`, `execution_package.md`,
`HANDOFF_READY`, direct coder routing, and broad discovery appear only in
prohibitive, blocking, or downstream-boundary context.

### EPD-CH-011 - Golden documentation declares twelve blocking scenarios

Validates all golden tests `EPD-GT-001` through `EPD-GT-012` exist and keep the
required shape.

### EPD-CH-012 - Golden harness declares negative fixture classes

Validates the golden harness includes negative fixture classes for weak ready
packages, coordinator/coder drift, and persistence/runtime drift.

## Out Of Scope

- agent runtime execution;
- materializer creation;
- target-project writes;
- fixtures outside embedded text fixtures;
- generated reports;
- production skill changes;
- productive template changes;
- frozen predecessor-kernel edits;
- automatic promotion.
