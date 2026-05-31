# Execution Package Designer Kernel Static Checks

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: HARDENED_FOR_FINAL_AUDIT`.

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

### EPD-CH-004 - Global docs record hardened status without promotion

Validates README, SKILL, MANIFEST, and kernel lab docs record
`EXECUTION_PACKAGE_DESIGNER_KERNEL: HARDENED_FOR_FINAL_AUDIT` while preserving the three frozen predecessor passes and rejecting
premature final-pass wording.

### EPD-CH-005 - Kernel allowlist contains exactly nine files

Validates the kernel directory contains exactly the declared README, four
contract docs, two validation docs, and two harnesses.

### EPD-CH-006 - Contract sections preserve identity, handoffs, status, and package fields

Validates the principal contract sections preserve the base identity, role
class, version, reading class, inputs, output, statuses, package readiness, and
key work-package fields.

### EPD-CH-007 - Package readiness gates are explicit

Validates `PACKAGE_READINESS_GATES.md` defines `READY`, `BLOCKED`, handoff
error, parallelization eligibility, anti-theater package, and human decision
gates.

### EPD-CH-008 - Responsibility-boundary drift remains prohibited

Validates the kernel blocks drift into planner, validation-eval-designer,
orchestrator, coder, validation-runner, reviewer, finalizer, resync,
materializer, and durable documentation ownership.

### EPD-CH-009 - Hardened bundle contains no stale or premature status

Validates the kernel docs carry `HARDENED_FOR_FINAL_AUDIT`, do not regress to
the earlier draft status, and do not claim `CLEAN_EXCELLENT_PASS`, runtime pass,
materialization pass, target pass, or production authorization.

### EPD-CH-010 - Principal contract deny-list and recovery envelope are explicit

Validates principal contract sections deny runner verdicts, `PLAN.md`,
`execution_package.md`, direct coder routing, and broad discovery; define the
full recovery envelope; state that `STATUS: BLOCKED` does not replace detailed
signals; and enforce `HANDOFF_READY != READY`.

### EPD-CH-011 - Golden documentation declares eighteen local scenarios

Validates all golden tests `EPD-GT-001` through `EPD-GT-018` exist, keep the
required shape, and include their own local blocker evidence.

### EPD-CH-012 - Golden harness declares isolated negative fixture classes

Validates the golden harness includes isolated package-field omissions,
recovery-envelope omissions, requested drift classes, handoff integrity
classes, proof mapping, broad discovery, `HANDOFF_READY`, and replay/regeneration
recovery.

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
