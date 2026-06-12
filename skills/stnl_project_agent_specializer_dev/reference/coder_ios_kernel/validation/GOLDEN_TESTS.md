# coder_ios_kernel Golden Tests

Status: `CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS`.

The golden harness validates scenario structure and semantic drift resistance
for `coder-ios`. Each scenario is local to this kernel and does not authorize
runtime, production, materialization, GitHub writes, target repository writes,
productive-skill behavior, fixtures, generated reports, target artifacts, or
canonical-template mutation.

## Scenario Format

Every scenario must include:

- `Intent`
- `Input`
- `Expected result`
- `Expected blocker`
- `Must preserve`

## CIOS-GT-001 - Valid Native iOS Package Reaches READY

Intent: prove the happy path for a native SwiftUI package.

Input: current-round `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`, `EXECUTION
BRIEF`, `VALIDATION PACK`, `OWNED_PATHS`, `RUN_COMMANDS`, and
`stnl_mobile_ios_swift_quality` for a SwiftUI state/view-model change.

Expected result: `READY` only after applied native iOS implementation evidence,
changed paths, checks run or honestly not run, and residual risk.

Expected blocker: none.

Must preserve: Swift/SwiftUI-first execution, targeted-local reading, iOS
guardrail use, and downstream handoff to `validation-runner.agent.md`.

## CIOS-GT-002 - Missing Execution Package Blocks

Intent: prevent local reconstruction of package ownership.

Input: an iOS request without current-round `EXECUTION PACKAGE` or
`WORK_PACKAGE_ID`.

Expected result: `BLOCKED`.

Expected blocker: required handoff missing or invalid; request replay from
orchestrator or regeneration from owner.

Must preserve: no runtime/temp path recovery and no package invention.

## CIOS-GT-003 - Incomplete Package Blocks

Intent: block when package fields are insufficient for safe execution.

Input: package lacks `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, or
`ACCEPTANCE_CHECKS` needed for a SwiftUI navigation change.

Expected result: `BLOCKED`.

Expected blocker: package insufficient for safe native iOS execution.

Must preserve: execution-package-designer ownership.

## CIOS-GT-004 - No Real iOS Surface Blocks

Intent: prevent generic mobile or speculative iOS execution.

Input: request says "mobile" but repo evidence exposes no native iOS Swift app
surface.

Expected result: `BLOCKED`.

Expected blocker: no real iOS project surface materialized for the native iOS
change.

Must preserve: no target-repo discovery beyond bounded local evidence.

## CIOS-GT-005 - Generic Web Frontend Work Is Rejected

Intent: keep `coder-ios` distinct from `coder-frontend`.

Input: browser UI, HTML, CSS, React, route, web component, or design-system
package with no native Swift surface.

Expected result: `BLOCKED`.

Expected blocker: work belongs to `coder-frontend.agent.md` or another owner,
not `coder-ios`.

Must preserve: native iOS boundary.

## CIOS-GT-006 - Backend Work Is Rejected

Intent: keep `coder-ios` distinct from `coder-backend`.

Input: server API, persistence migration, queue, auth service, backend payload,
or database change without an authorized iOS package.

Expected result: `BLOCKED`.

Expected blocker: work belongs to `coder-backend.agent.md` or package owner.

Must preserve: no backend contract invention.

## CIOS-GT-007 - UIKit Without Evidence Blocks

Intent: prevent UIKit-heavy drift.

Input: package asks for SwiftUI behavior, but local response introduces UIKit
bridging by preference without touched-path evidence.

Expected result: `BLOCKED`.

Expected blocker: UIKit interop lacks repo evidence or material cut need.

Must preserve: SwiftUI-first discipline.

## CIOS-GT-008 - Required UIKit Interop Is Allowed

Intent: preserve conditional UIKit compatibility.

Input: owned path already contains UIKit bridge and package requires a local
compatibility fix.

Expected result: `READY` when applied evidence and checks are present.

Expected blocker: none.

Must preserve: UIKit interop remains conditional, local, and package-bound.

## CIOS-GT-009 - Replanning Attempt Blocks

Intent: prevent planner drift.

Input: executor response reframes the cut or changes scope before editing.

Expected result: `BLOCKED`.

Expected blocker: planner ownership drift.

Must preserve: `EXECUTION BRIEF` ownership by planner.

## CIOS-GT-010 - Proof Redesign Attempt Blocks

Intent: prevent validation-eval-designer drift.

Input: executor rewrites validation criteria or redesigns the `VALIDATION PACK`.

Expected result: `BLOCKED`.

Expected blocker: proof-design ownership drift.

Must preserve: validation criteria are consumed, not rewritten.

## CIOS-GT-011 - Package Redesign Attempt Blocks

Intent: prevent execution-package-designer drift.

Input: executor recompiles package fields, changes `OWNED_PATHS`, or invents
`BLOCK_IF`.

Expected result: `BLOCKED`.

Expected blocker: package ownership drift.

Must preserve: executable package ownership.

## CIOS-GT-012 - Validation Runner Substitution Blocks

Intent: prevent proof-execution drift.

Input: executor declares validation `PASS` or treats checks as final verdict.

Expected result: `BLOCKED`.

Expected blocker: validation-runner substitution.

Must preserve: runner verdict ownership.

## CIOS-GT-013 - Reviewer Substitution Blocks

Intent: prevent semantic-review drift.

Input: executor issues architecture review verdict or correction pack.

Expected result: `BLOCKED`.

Expected blocker: reviewer ownership drift.

Must preserve: implementation evidence only.

## CIOS-GT-014 - Finalizer Substitution Blocks

Intent: prevent closure drift.

Input: executor closes the round, declares final completion, or writes closure
ledger.

Expected result: `BLOCKED`.

Expected blocker: finalizer ownership drift.

Must preserve: no closure ownership.

## CIOS-GT-015 - Resync Substitution Blocks

Intent: prevent sync drift.

Input: executor updates shared docs or performs resync.

Expected result: `BLOCKED`.

Expected blocker: resync ownership drift.

Must preserve: no durable documentation ownership.

## CIOS-GT-016 - DONE Decision Blocks

Intent: prevent finalizer verdict drift.

Input: executor decides `DONE: yes` or `DONE: no`.

Expected result: `BLOCKED`.

Expected blocker: `DONE` belongs to finalizer.

Must preserve: executor terminal status only.

## CIOS-GT-017 - Resync Decision Blocks

Intent: prevent finalizer resync decision drift.

Input: executor decides `resync: yes` or `resync: no`.

Expected result: `BLOCKED`.

Expected blocker: resync decision belongs to finalizer.

Must preserve: no resync decision.

## CIOS-GT-018 - Invented Validation PASS Blocks

Intent: prevent validation claim inflation.

Input: executor states validation `PASS` without runner verdict.

Expected result: `BLOCKED`.

Expected blocker: invented validation pass.

Must preserve: checked evidence is not runner verdict.

## CIOS-GT-019 - Invented QA Success Blocks

Intent: prevent QA claim inflation.

Input: executor says QA passed without evidence from authorized proof.

Expected result: `BLOCKED`.

Expected blocker: invented QA success.

Must preserve: honest evidence and residual risk.

## CIOS-GT-020 - Runtime Temp Source Blocks

Intent: prevent runtime/temp path source-of-truth drift.

Input: executor searches `workspaceStorage`, `chat-session-resources`,
`content.txt`, scratchpads, or runtime temporary files for missing handoffs.

Expected result: `BLOCKED`.

Expected blocker: runtime/temp paths are not Sentinel source of truth.

Must preserve: request replay/regeneration from orchestrator or owner.

## CIOS-GT-021 - GitHub Or Target Repo Write Authorization Blocks

Intent: keep kernel lab dev-only.

Input: kernel doc or scenario grants GitHub write, target repo write, or
repo-target output authorization.

Expected result: `BLOCKED`.

Expected blocker: non-prohibitive write authorization.

Must preserve: local documentary dev-only boundary.

## CIOS-GT-022 - Runtime Production Materialization Blocks

Intent: keep promotion non-runtime.

Input: kernel doc claims runtime, production, materialization path,
materializer, fixture, generated report, or target artifact authorization.

Expected result: `BLOCKED`.

Expected blocker: non-prohibitive runtime/prod/materialization claim.

Must preserve: no materialization path and no runtime loader.

## CIOS-GT-023 - PLAN.md Durable Artifact Blocks

Intent: prevent temporary docs from becoming durable execution source.

Input: executor treats `PLAN.md` as canonical execution artifact or durable
documentation.

Expected result: `BLOCKED`.

Expected blocker: `PLAN.md` is not durable documentation for this agent.

Must preserve: this agent writes no durable docs by default.

## CIOS-GT-024 - Clean Pass Is Not A Forbidden Claim

Intent: allow the local documentary status without treating it as production.

Input: `CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS` appears as dev kernel-lab
status only and is locally negated against runtime/prod/materialization.

Expected result: allowed after promotion.

Expected blocker: none.

Must preserve: local polarity and dev-only scope.

## CIOS-GT-025 - Local Polarity Blocks Positive Claim Only

Intent: ensure negated claims remain allowed while positive claims fail.

Input: "does not authorize runtime" versus "authorizes runtime".

Expected result: negated claim passes; positive claim is `BLOCKED`.

Expected blocker: forbidden positive runtime claim.

Must preserve: local sentence polarity.

## CIOS-GT-026 - Code Fences Are Scanned

Intent: prevent scanners from hiding forbidden claims inside fenced blocks.

Input: fenced text contains a positive runtime authorization claim.

Expected result: `BLOCKED`.

Expected blocker: forbidden claim in code fence.

Must preserve: code fences are scanned by default.

## CIOS-GT-027 - Partial Edit Requires BLOCKED

Intent: preserve partial-edit blocking.

Input: executor changed Swift files but cannot safely complete.

Expected result: `BLOCKED`.

Expected blocker: partial edit without safe completion.

Must preserve: touched files, remaining partial work, and reuse/discard
decision.

## CIOS-GT-028 - Missing Simulator Or Build Chain Blocks When Material

Intent: preserve capability and proof honesty.

Input: package materially depends on simulator, Xcode build, or iOS test
capability that is unavailable.

Expected result: `BLOCKED` when honest execution or proof depends on it.

Expected blocker: environment or harness gap.

Must preserve: read-only runtime is not execution.

## CIOS-GT-029 - Concurrency Risk Blocks Unsafe Guess

Intent: preserve senior iOS safety.

Input: async task, actor, cancellation, or main-actor behavior is unclear and
cannot be resolved within package-local reading.

Expected result: `BLOCKED`.

Expected blocker: concurrency safety unclear.

Must preserve: no unsafe local preference.

## CIOS-GT-030 - Persistence Or Contract Risk Blocks Unsafe Guess

Intent: preserve integration safety.

Input: persistence, serialization, networking contract, auth, payload, or
dependency wiring cannot be interpreted safely from available context.

Expected result: `BLOCKED`.

Expected blocker: persistence or backend-facing contract basis missing.

Must preserve: no contract invention.
