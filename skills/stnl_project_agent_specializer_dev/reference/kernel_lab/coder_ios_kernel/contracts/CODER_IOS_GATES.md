# coder_ios_kernel Gates

Status: `CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS`.

## Gate CIOS-GATE-001 - Snapshot Parity

The dev snapshot must be a byte-for-byte copy of
`templates/agents/coder-ios.agent.md`. Its frontmatter must keep `name:
coder-ios`, `agent_version: 2026.5.1`, and `reading_scope_class:
targeted-local`.

## Gate CIOS-GATE-002 - Native iOS Entry

The kernel must require a clear native iOS Swift app surface before execution.
It blocks when there is no real iOS project surface or when the work belongs to
traditional web/browser frontend, backend/server, planning, design, validation,
review, closure, or resync ownership.

## Gate CIOS-GATE-003 - Current-Round Handoffs

The kernel requires `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`, `EXECUTION
BRIEF`, `VALIDATION PACK`, required guardrails when present, and minimum
affected iOS context. Missing or invalid handoff produces `BLOCKED` and asks
the orchestrator to replay or regenerate from the owner.

## Gate CIOS-GATE-004 - Package Ownership

Package fields such as `OWNED_PATHS`, `DO_NOT_TOUCH`, `CHANGE_RULES`,
`RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, and `BLOCK_IF` are binding. The kernel
must not widen scope, choose structural architecture, recompile the package, or
touch shared files outside `OWNED_PATHS` without explicit package authority.

## Gate CIOS-GATE-005 - SwiftUI-First iOS Discipline

Swift and SwiftUI are the default implementation path. UIKit interop is
allowed only when existing touched code or material cut need supports it.
Navigation, lifecycle, concurrency, persistence, networking, dependency
wiring, accessibility when UI is touched, and iOS-focused tests remain part of
safe execution when relevant.

## Gate CIOS-GATE-006 - Guardrail Application

`stnl_mobile_ios_swift_quality` is active for native iOS Swift, SwiftUI, UIKit
interop, navigation, state ownership, concurrency, lifecycle cleanup, forms,
networking, persistence, platform conventions, or iOS testability. The kernel
must not call unrelated guardrails by reflex.

## Gate CIOS-GATE-007 - Terminal Evidence

`READY` requires applied diff evidence, changed paths or equivalent file-level
evidence, checks run or honestly not run, residual risk, and native behavior
covered. If edits are partial and safe completion was not reached, `BLOCKED`
is required.

## Gate CIOS-GATE-008 - Role Boundary

The kernel does not become planner, designer, execution-package-designer,
validation-runner, reviewer, finalizer, resync, coder-frontend, coder-backend,
runtime owner, materializer, GitHub writer, target-repo writer, or productive
skill updater.

## Gate CIOS-GATE-009 - Dev-Only Promotion

Any clean pass is limited to the kernel lab dev documentation and textual
harness. It does not authorize runtime, prod, materialization, target artifacts,
fixtures, generated reports, GitHub write, target repo write, productive skill
changes, template changes, installer/smoke changes, `.github/**`, `.codex/**`,
or `AGENTS.md`.
