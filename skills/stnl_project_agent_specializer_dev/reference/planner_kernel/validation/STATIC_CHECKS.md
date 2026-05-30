# Planner Kernel Static Checks

Status: read-only executable structural support for the planner kernel lab.

The local harness is
`reference/planner_kernel/validation/check-static.mjs`. It uses only Node
built-ins, is read-only, keeps path containment inside the repository with
`realpath`, ignores `__MACOSX` and `.DS_Store`, prints one result line per
check, and exits `1` when any check fails.

All checks are blocking. Passing this harness does not execute agent runtime,
does not implement a materializer, does not create fixtures, does not produce
generated reports, does not write target-project artifacts, and does not
authorize automatic pass. Human final audit remains required.

The harness inspects only:

- local planner snapshot:
  `skills/stnl_project_agent_specializer_dev/reference/agents/planner.agent.md`;
- productive template for literal-copy comparison only:
  `templates/agents/planner.agent.md`;
- planner-kernel documentation:
  `skills/stnl_project_agent_specializer_dev/reference/planner_kernel/**`;
- manifest and global dev-skill docs declared for this kernel-lab route.

The script uses internal helpers for section extraction, repeated section
matching, phrase groups, allow and deny lists, proximity/polarity validation,
golden-test shape validation, path absence, and unexpected-file detection. The
helpers reduce false positives from loose token matches and false negatives from
equivalent wording.

## Implemented Checks

### PL-CH-001 - Required planner-kernel files exist

Validates every required planner-kernel file as a regular file through
repo-contained real paths.

### PL-CH-002 - Snapshot local exists and is listed

Validates that `reference/agents/planner.agent.md` exists, is listed as a clear
manifest path, and is described as the local dev snapshot and audit point.

### PL-CH-003 - Snapshot is literal copy of productive template

Compares `templates/agents/planner.agent.md` and
`reference/agents/planner.agent.md` byte-for-byte. The template is only the copy
origin and is not a fallback if the snapshot is absent.

### PL-CH-004 - Manifest lists exactly the planner bundle

Validates the manifest list for the planner snapshot, planner-kernel README,
three contracts, two validation docs, and two harnesses. Wildcards, fallback
entries, and undeclared planner-kernel files fail.

### PL-CH-005 - Global docs recognize planner without excellent pass

Validates global dev docs that mention `planner_kernel` as `NOT_EXCELLENT_PASS`,
under review, or requiring human final audit. Planner excellent/pass wording
fails.

### PL-CH-006 - Orchestrator frozen status preserved

Validates that global docs keep `orchestrator_kernel` frozen as
`CLEAN_EXCELLENT_PASS` and do not negate, reopen, downgrade, mark under review,
or make it alterable by the planner round.

### PL-CH-007 - Source chain is unambiguous

Validates source-alignment sections:

- `templates/agents/planner.agent.md` is productive/base origin;
- `reference/agents/planner.agent.md` is local dev snapshot and audit point;
- `reference/planner_kernel/**` is the documentary contract set;
- no fallback is allowed when the local snapshot is absent.

### PL-CH-008 - No planning_kernel exists

Validates real path absence for `planning_kernel`. Textual mentions are allowed
only with prohibitive polarity.

### PL-CH-009 - No planner excellent status declared prematurely

Validates planner-kernel docs do not declare a planner-kernel-specific
excellent/pass status. `NOT_EXCELLENT_PASS` remains allowed.

### PL-CH-010 - Planner-kernel allowlist is exact

Allows only:

- `README.md`;
- `contracts/CONTRACT.md`;
- `contracts/BEHAVIOR_PARITY_SPINE.md`;
- `contracts/MINIMUM_SAFE_BUNDLE.md`;
- `validation/STATIC_CHECKS.md`;
- `validation/GOLDEN_TESTS.md`;
- `validation/check-static.mjs`;
- `validation/check-golden.mjs`.

Any other `.mjs`, `.js`, `.cjs`, fixture, generated output, report, runtime, or
materializer surface fails.

### PL-CH-011 - Core invariants preserved by section

Validates the correct contract sections:

- `Identity`;
- `Mission`;
- `Output contract`;
- `Status contract`;
- `Reading contract`;
- `Relation contract`;
- `Completion contract`.

The sections must preserve `planner`, `planning`, `bounded-context`,
`EXECUTION BRIEF`, `READY`, `NEEDS_DEV_DECISION_BASE`, ephemeral/current-round
handoff, and return to orchestrator.

### PL-CH-012 - Role absorption prohibited by polarity

Validates dangerous downstream terms only in prohibitive or downstream-boundary
contexts:

- `VALIDATION PACK`;
- `EXECUTION PACKAGE`;
- `WORK_PACKAGE_ID`;
- `OWNED_PATHS`;
- `DO_NOT_TOUCH`;
- `RUN_COMMANDS`;
- `ACCEPTANCE_CHECKS`;
- `BLOCK_IF`;
- `PLAN.md`;
- `execution_brief.md`.

Permissive wording such as planner ownership, direct routing, execution
approval, or permission to emit/create/define those terms fails.

### PL-CH-013 - Operational axes preserved

Validates:

- `MODE=standard` keeps the safety floor;
- `MODE=strict` reduces inference and blocks earlier;
- `MODE=compact` is format compaction only, not safety compaction;
- `RUN=execute` does not authorize implementation;
- `RUN=plan` does not approve future execution;
- `HANDOFF_READY` is not a status or gate;
- compact return does not republish the full brief or narrate operations.

### PL-CH-014 - Guardrails remain metadata only

Validates the four guardrail names as metadata names only:

- `stnl_frontend_quality`;
- `stnl_backend_quality`;
- `stnl_backend_sql_quality`;
- `stnl_mobile_ios_swift_quality`.

Copying, summarizing, editing, replacing, treating them as agents, or using them
as proof of quality fails.

### PL-CH-015 - Validation docs align with executable harnesses

Validates validation docs describe read-only executable harnesses, Node
built-ins, path containment, no runtime, no materializer, no fixtures, no
generated reports, no automatic pass, all static checks `PL-CH-001` through
`PL-CH-023`, and all golden tests `PL-GT-001` through `PL-GT-020`.

### PL-CH-016 - Global docs list harnesses without automatic pass

Validates global docs and manifest list both planner harnesses as blocking
support and do not promote automatic pass or alter orchestrator status.

### PL-CH-017 - Reading contract preserved

Validates `bounded-context`, budget of at most 3 local artifacts, at most 1 live
artifact, expansion by at most 2 targeted artifacts, no broad discovery, no
read-more loop to avoid DEV decision, source-of-truth hierarchy, `File Purpose
Header`, scratchpads, runtime temp files, `workspaceStorage`,
`chat-session-resources`, `content.txt`, `spec_slices`, and `Planning Interface`
as information only.

### PL-CH-018 - Header-aware reading preserved

Validates header fields `read_when`, `do_not_use_for`,
`canonical_source_for`, `canonical_source_not_for`, and `token_policy`; validates
`spec_slices`; and validates that header metadata does not authorize execution,
acceptance, blockers, readiness, or missing decisions.

### PL-CH-019 - Source-of-truth hierarchy preserved

Validates resolved DEV/orchestrator framing first, canonical owner docs/project
context second, specific live implementation/contract/config evidence third,
and external dependency docs fourth. Choosing docs or code by preference fails.

### PL-CH-020 - Untrusted local sources prohibited

Validates scratchpads, runtime temp files, `workspaceStorage`,
`chat-session-resources`, and `content.txt` are not Sentinel source of truth.

### PL-CH-021 - Compact return anti-narration preserved

Validates compact return does not republish the full `EXECUTION BRIEF`, does not
narrate reading/searching/inspection/progress/tool usage, and does not remove
scope, blockers, risks, source-of-truth notes, guardrails, or validation-aware
notes.

### PL-CH-022 - Dangerous terms only in allowed sections

Validates dangerous downstream terms appear only in allowed contract sections
and only with safe prohibitive or downstream-boundary polarity.

### PL-CH-023 - Golden tests have required shape

Validates all golden tests `PL-GT-001` through `PL-GT-020` contain:

- `### Objective`;
- `### Input shape`;
- `### Expected behavior`;
- `### Fail condition`;
- `Expected blocker: BLOCKED_...`.

## Out Of Scope

- agent runtime execution;
- materializer creation;
- target-project writes;
- fixtures;
- generated reports;
- production skill changes;
- productive template changes;
- orchestrator-kernel edits;
- kernelization of other agents.
