#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { findForbiddenClaims, findForbiddenClaimsInGoldenTestsDoc } from './check-static.mjs';
import {
  existsSync,
  lstatSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KERNEL_PREFIX =
  'skills/stnl_project_agent_specializer_dev/reference/reviewer_kernel';
const SNAPSHOT_AGENT =
  'skills/stnl_project_agent_specializer_dev/reference/agents/reviewer.agent.md';
const TEMPLATE_AGENT = 'templates/agents/reviewer.agent.md';

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = dirname(realpathSync.native(scriptPath));
const kernelRoot = realpathSync.native(resolve(validationRoot, '..'));
const repoRoot = findRepoRoot(kernelRoot);
const staticHarness = resolve(validationRoot, 'check-static.mjs');

const errors = [];

const scenarios = Object.freeze([
  {
    id: 'RV-GT-001',
    blocker: 'BLOCKED_RV_PASS_SHAPE_INVALID',
    sections: {
      Objective: [/positive semantic review|honest positive/i],
      'Input shape': [/required.*advisory|advisory.*required/i, /concrete implemented artifact|trustworthy applied diff/i, /no\s+material structural risk remains/i],
      'Expected behavior': [/PASS/i, /short delta-only rationale|non-blocking/i],
      'Fail condition': [/PASS.*unavailable/i, /simultaneous `?CORRECTION PACK`?/i],
    },
  },
  {
    id: 'RV-GT-002',
    blocker: 'BLOCKED_RV_MATERIAL_RISK_NOT_FAIL',
    sections: {
      Objective: [/FAIL/i, /material semantic or architectural risk/i],
      'Input shape': [/boundary drift/i, /improper coupling/i, /contract drift/i, /scope expansion/i],
      'Expected behavior': [/FAIL/i, /material risk/i, /objective evidence|evidence/i],
      'Fail condition': [/softened into a recommendation/i, /green proof|green/i, /cosmetic/i],
    },
  },
  {
    id: 'RV-GT-003',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    sections: {
      Objective: [/non-terminal correction routing/i],
      'Input shape': [/minimal/i, /in-scope/i, /surgical/i, /corrigible/i],
      'Expected behavior': [/exactly one block headed `?CORRECTION PACK`?/i, /issue id|issue_id/i, /expected correction/i],
      'Fail condition': [/broad/i, /vague/i, /repo-wide/i, /mixed with terminal\s+verdict|terminal\s+verdict/i, /executed by reviewer/i],
    },
  },
  {
    id: 'RV-GT-004',
    blocker: 'BLOCKED_RV_MISSING_IMPLEMENTED_ARTIFACT_ACCEPTED',
    sections: {
      Objective: [/Prevent review of intent/i],
      'Input shape': [/No concrete implemented artifact|no concrete implemented artifact/i, /plan text/i, /pseudo-implementation/i],
      'Expected behavior': [/FAIL/i, /cannot judge/i],
      'Fail condition': [/approves/i, /guesses/i, /broad discovery/i],
    },
  },
  {
    id: 'RV-GT-005',
    blocker: 'BLOCKED_RV_GREEN_PROOF_OVERRIDES_STRUCTURE',
    sections: {
      Objective: [/proof execution separate|separate from semantic review/i],
      'Input shape': [/green/i, /violates/i, /scope/i, /contract/i],
      'Expected behavior': [/limited context/i, /FAIL|CORRECTION PACK/i],
      'Fail condition': [/green validation forces reviewer `?PASS`?/i],
    },
  },
  {
    id: 'RV-GT-006',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    sections: {
      Objective: [/validation-runner/i],
      'Input shape': [/attempts to run\s+checks/i, /gather proof/i, /runner verdicts/i],
      'Expected behavior': [/must not run validation/i, /proof ownership remains with\s+runner/i],
      'Fail condition': [/executes proof/i, /PARTIAL/i, /BLOCKED/i],
    },
  },
  {
    id: 'RV-GT-007',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    sections: {
      Objective: [/finalizer/i],
      'Input shape': [/mark `?DONE`?/i, /close\s+the round/i, /replace finalizer/i],
      'Expected behavior': [/only reviewer signal/i, /Do not decide `?DONE`?/i],
      'Fail condition': [/closure/i, /finalizer responsibilities/i],
    },
  },
  {
    id: 'RV-GT-008',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    sections: {
      Objective: [/resync/i],
      'Input shape': [/Feature CONTEXT/i, /ADRs/i, /PLAN\.md/i, /shared canon/i],
      'Expected behavior': [/Do not write durable\s+documentation/i, /do not decide factual sync/i],
      'Fail condition': [/performs resync/i, /durable documentation work/i],
    },
  },
  {
    id: 'RV-GT-009',
    blocker: 'BLOCKED_RV_OPINION_BLOCKS_CLOSURE',
    sections: {
      Objective: [/generic review drift/i],
      'Input shape': [/naming/i, /style/i, /formatting/i, /optional modernization/i],
      'Expected behavior': [/cosmetic\/irrelevant|recommended improvement/i, /Do not block closure/i],
      'Fail condition': [/subjective preference becomes material structural risk/i],
    },
  },
  {
    id: 'RV-GT-010',
    blocker: 'BLOCKED_RV_REVIEW_MINIMAL_BROKEN',
    sections: {
      Objective: [/review-minimal/i],
      'Input shape': [/broad discovery/i, /repo-wide review/i, /scratchpads/i, /workspaceStorage/i, /chat-session-resources/i, /content\.txt/i, /runtime temp\s+paths/i],
      'Expected behavior': [/nearest needed reference/i, /File Purpose Header/i, /fail honestly/i],
      'Fail condition': [/broad rediscovery/i, /untrusted temp sources/i],
    },
  },
]);

const negativeMutations = Object.freeze([
  {
    name: 'reviewer may run validation instead of validation-runner',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    base: 'Reviewer does not run validation instead of `validation-runner`.',
    mutated: 'Reviewer may run validation instead of `validation-runner`.',
    expected: /(?:run validation.*validation-runner|validation-runner.*run validation)/i,
  },
  {
    name: 'reviewer should run validation',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    base: 'Reviewer must not run validation.',
    mutated: 'Reviewer should run validation.',
    expected: /run validation/i,
  },
  {
    name: 'reviewer may emit PARTIAL',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    base: 'Reviewer must not emit `PARTIAL`; that verdict is owned by validation-runner.',
    mutated: 'Reviewer may emit `PARTIAL` as a validation verdict.',
    expected: /PARTIAL/i,
  },
  {
    name: 'reviewer is allowed to emit PARTIAL',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    base: 'Reviewer must not emit `PARTIAL`; that verdict is owned by validation-runner.',
    mutated: 'Reviewer is allowed to emit `PARTIAL`.',
    expected: /PARTIAL/i,
  },
  {
    name: 'reviewer may emit BLOCKED',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    base: 'Reviewer must not emit `BLOCKED`; that verdict is owned by validation-runner.',
    mutated: 'Reviewer may emit `BLOCKED` as a validation verdict.',
    expected: /BLOCKED/i,
  },
  {
    name: 'green tests are enough for structural approval',
    blocker: 'BLOCKED_RV_GREEN_PROOF_OVERRIDES_STRUCTURE',
    base: 'Green tests do not allow structural approval when material semantic risk remains.',
    mutated: 'Green tests allow structural approval when material semantic risk remains.',
    expected: /(?:green tests.*structural approval|structural approval.*green tests)/i,
  },
  {
    name: 'reviewer may decide DONE',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer does not decide `DONE`; finalizer owns closure.',
    mutated: 'Reviewer may decide `DONE` after semantic review.',
    expected: /DONE/i,
  },
  {
    name: 'reviewer may close the round',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer does not close the round; finalizer owns closure.',
    mutated: 'Reviewer may close the round after PASS.',
    expected: /close the round/i,
  },
  {
    name: 'reviewer should close the round',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer does not close the round; finalizer owns closure.',
    mutated: 'Reviewer should close the round.',
    expected: /close the round/i,
  },
  {
    name: 'reviewer is allowed to close the round',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer is not allowed to close the round; finalizer owns closure.',
    mutated: 'Reviewer is allowed to close the round.',
    expected: /close the round/i,
  },
  {
    name: 'reviewer is permitted to close the round',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer is not permitted to close the round; finalizer owns closure.',
    mutated: 'Reviewer is permitted to close the round.',
    expected: /close the round/i,
  },
  {
    name: 'reviewer is responsible for round closure',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer is not responsible for round closure; finalizer owns closure.',
    mutated: 'Reviewer is responsible for round closure.',
    expected: /round closure/i,
  },
  {
    name: 'reviewer has authority to close the round',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    base: 'Reviewer does not have authority to close the round; finalizer owns closure.',
    mutated: 'Reviewer has authority to close the round.',
    expected: /close the round/i,
  },
  {
    name: 'reviewer may write Feature CONTEXT',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not write Feature CONTEXT during semantic review.',
    mutated: 'Reviewer may write Feature CONTEXT during semantic review.',
    expected: /Feature CONTEXT/i,
  },
  {
    name: 'reviewer is responsible for Feature CONTEXT updates',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not responsible for Feature CONTEXT updates during semantic review.',
    mutated: 'Reviewer is responsible for Feature CONTEXT updates.',
    expected: /Feature CONTEXT updates/i,
  },
  {
    name: 'reviewer is responsible to update Feature CONTEXT',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not responsible to update Feature CONTEXT during semantic review.',
    mutated: 'Reviewer is responsible to update Feature CONTEXT.',
    expected: /Feature CONTEXT/i,
  },
  {
    name: 'reviewer is accountable to update Feature CONTEXT',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not accountable to update Feature CONTEXT during semantic review.',
    mutated: 'Reviewer is accountable to update Feature CONTEXT.',
    expected: /Feature CONTEXT/i,
  },
  {
    name: 'reviewer may write ADRs',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not write ADRs during semantic review.',
    mutated: 'Reviewer may write ADRs during semantic review.',
    expected: /ADRs/i,
  },
  {
    name: 'reviewer may write PLAN.md',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not write `PLAN.md` during semantic review.',
    mutated: 'Reviewer may write `PLAN.md` during semantic review.',
    expected: /PLAN\.md/i,
  },
  {
    name: 'reviewer may write shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not write shared canon during semantic review.',
    mutated: 'Reviewer may write shared canon during semantic review.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has authority to write shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have authority to write shared canon during semantic review.',
    mutated: 'Reviewer has authority to write shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has authority over shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have authority over shared canon during semantic review.',
    mutated: 'Reviewer has authority over shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has authority for shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have authority for shared canon during semantic review.',
    mutated: 'Reviewer has authority for shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has authority regarding shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have authority regarding shared canon during semantic review.',
    mutated: 'Reviewer has authority regarding shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has authority about shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have authority about shared canon during semantic review.',
    mutated: 'Reviewer has authority about shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has jurisdiction over shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have jurisdiction over shared canon during semantic review.',
    mutated: 'Reviewer has jurisdiction over shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has jurisdiction regarding shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have jurisdiction regarding shared canon during semantic review.',
    mutated: 'Reviewer has jurisdiction regarding shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has jurisdiction about shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have jurisdiction about shared canon during semantic review.',
    mutated: 'Reviewer has jurisdiction about shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has authority around shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have authority around shared canon during semantic review.',
    mutated: 'Reviewer has authority around shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer has control over shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have control over shared canon during semantic review.',
    mutated: 'Reviewer has control over shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer controls shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not control shared canon during semantic review.',
    mutated: 'Reviewer controls shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer governs shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not govern shared canon during semantic review.',
    mutated: 'Reviewer governs shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer manages shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not manage shared canon during semantic review.',
    mutated: 'Reviewer manages shared canon.',
    expected: /shared canon/i,
  },
  {
    name: 'reviewer supervises shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not supervise shared canon during semantic review.',
    mutated: 'Reviewer supervises shared canon.',
    expected: /(?:Reviewer.*supervises.*shared canon|shared canon.*supervises.*Reviewer)/i,
  },
  {
    name: 'reviewer administers shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not administer shared canon during semantic review.',
    mutated: 'Reviewer administers shared canon.',
    expected: /(?:Reviewer.*administers.*shared canon|shared canon.*administers.*Reviewer)/i,
  },
  {
    name: 'reviewer maintains shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not maintain shared canon during semantic review.',
    mutated: 'Reviewer maintains shared canon.',
    expected: /(?:Reviewer.*maintains.*shared canon|shared canon.*maintains.*Reviewer)/i,
  },
  {
    name: 'reviewer is steward of shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not steward of shared canon during semantic review.',
    mutated: 'Reviewer is steward of shared canon.',
    expected: /(?:Reviewer.*steward.*shared canon|shared canon.*steward.*Reviewer)/i,
  },
  {
    name: 'reviewer is owner of shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not owner of shared canon during semantic review.',
    mutated: 'Reviewer is owner of shared canon.',
    expected: /(?:Reviewer.*owner.*shared canon|shared canon.*owner.*Reviewer)/i,
  },
  {
    name: 'reviewer has stewardship over shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have stewardship over shared canon during semantic review.',
    mutated: 'Reviewer has stewardship over shared canon.',
    expected: /(?:Reviewer.*stewardship.*shared canon|shared canon.*stewardship.*Reviewer)/i,
  },
  {
    name: 'reviewer has ownership over shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have ownership over shared canon during semantic review.',
    mutated: 'Reviewer has ownership over shared canon.',
    expected: /(?:Reviewer.*ownership.*shared canon|shared canon.*ownership.*Reviewer)/i,
  },
  {
    name: 'reviewer is custodian of shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not custodian of shared canon during semantic review.',
    mutated: 'Reviewer is custodian of shared canon.',
    expected: /(?:Reviewer.*custodian.*shared canon|shared canon.*custodian.*Reviewer)/i,
  },
  {
    name: 'reviewer has custody over shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not have custody over shared canon during semantic review.',
    mutated: 'Reviewer has custody over shared canon.',
    expected: /(?:Reviewer.*custody.*shared canon|shared canon.*custody.*Reviewer)/i,
  },
  {
    name: 'reviewer is caretaker of shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not caretaker of shared canon during semantic review.',
    mutated: 'Reviewer is caretaker of shared canon.',
    expected: /(?:Reviewer.*caretaker.*shared canon|shared canon.*caretaker.*Reviewer)/i,
  },
  {
    name: 'reviewer is responsible owner of shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not responsible owner of shared canon during semantic review.',
    mutated: 'Reviewer is responsible owner of shared canon.',
    expected: /(?:Reviewer.*responsible owner.*shared canon|shared canon.*responsible owner.*Reviewer)/i,
  },
  {
    name: 'reviewer is source owner for shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not source owner for shared canon during semantic review.',
    mutated: 'Reviewer is source owner for shared canon.',
    expected: /(?:Reviewer.*source owner.*shared canon|shared canon.*source owner.*Reviewer)/i,
  },
  {
    name: 'reviewer is doc owner for shared canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer is not doc owner for shared canon during semantic review.',
    mutated: 'Reviewer is doc owner for shared canon.',
    expected: /(?:Reviewer.*doc owner.*shared canon|shared canon.*doc owner.*Reviewer)/i,
  },
  {
    name: 'reviewer may sync docs',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    base: 'Reviewer does not sync docs during semantic review.',
    mutated: 'Reviewer may sync docs during semantic review.',
    expected: /sync docs/i,
  },
  {
    name: 'reviewer may edit code',
    blocker: 'BLOCKED_RV_REPLACES_CODER_FIXER',
    base: 'Reviewer does not edit code during semantic review.',
    mutated: 'Reviewer may edit code during semantic review.',
    expected: /edit code/i,
  },
  {
    name: 'reviewer may apply patches',
    blocker: 'BLOCKED_RV_REPLACES_CODER_FIXER',
    base: 'Reviewer does not apply patches during semantic review.',
    mutated: 'Reviewer may apply patches during semantic review.',
    expected: /apply patches/i,
  },
  {
    name: 'reviewer is permitted to apply patches',
    blocker: 'BLOCKED_RV_REPLACES_CODER_FIXER',
    base: 'Reviewer is not permitted to apply patches during semantic review.',
    mutated: 'Reviewer is permitted to apply patches.',
    expected: /apply patches/i,
  },
  {
    name: 'reviewer may execute correction packs',
    blocker: 'BLOCKED_RV_REPLACES_CODER_FIXER',
    base: 'Reviewer does not execute correction packs; it only routes them.',
    mutated: 'Reviewer may execute correction packs after review.',
    expected: /execute correction packs/i,
  },
  {
    name: 'reviewer may broad-refactor',
    blocker: 'BLOCKED_RV_REPLACES_CODER_FIXER',
    base: 'Reviewer must not broad-refactor the implementation.',
    mutated: 'Reviewer may broad-refactor the implementation.',
    expected: /broad[- ]refactor/i,
  },
  {
    name: 'reviewer may create target artifacts',
    blocker: 'BLOCKED_RV_CREATES_TARGET_ARTIFACTS',
    base: 'Reviewer does not create target artifacts.',
    mutated: 'Reviewer may create target artifacts.',
    expected: /target artifacts/i,
  },
  {
    name: 'reviewer may redesign EXECUTION PACKAGE',
    blocker: 'BLOCKED_RV_REDESIGNS_PACKAGE',
    base: 'Reviewer does not redesign `EXECUTION PACKAGE`.',
    mutated: 'Reviewer may redesign `EXECUTION PACKAGE`.',
    expected: /EXECUTION PACKAGE/i,
  },
  {
    name: 'reviewer may redesign the cut',
    blocker: 'BLOCKED_RV_REDESIGNS_CUT',
    base: 'Reviewer does not redesign the cut.',
    mutated: 'Reviewer may redesign the cut.',
    expected: /redesign the cut/i,
  },
  {
    name: 'reviewer may redesign the plan',
    blocker: 'BLOCKED_RV_REDESIGNS_PLAN',
    base: 'Reviewer does not redesign the plan.',
    mutated: 'Reviewer may redesign the plan.',
    expected: /redesign the plan/i,
  },
  {
    name: 'reviewer may redesign the brief',
    blocker: 'BLOCKED_RV_REDESIGNS_BRIEF',
    base: 'Reviewer does not redesign the brief.',
    mutated: 'Reviewer may redesign the brief.',
    expected: /redesign the brief/i,
  },
  {
    name: 'reviewer may redesign validation design',
    blocker: 'BLOCKED_RV_REDESIGNS_VALIDATION_DESIGN',
    base: 'Reviewer does not redesign validation design.',
    mutated: 'Reviewer may redesign validation design.',
    expected: /validation design/i,
  },
  {
    name: 'reviewer may reopen broad discovery',
    blocker: 'BLOCKED_RV_REVIEW_MINIMAL_BROKEN',
    base: 'Reviewer must not reopen broad discovery.',
    mutated: 'Reviewer may reopen broad discovery.',
    expected: /broad discovery/i,
  },
  {
    name: 'reviewer may review the whole repo by default',
    blocker: 'BLOCKED_RV_REVIEW_MINIMAL_BROKEN',
    base: 'Reviewer must not review the whole repo by default.',
    mutated: 'Reviewer may review the whole repo by default.',
    expected: /whole repo/i,
  },
  {
    name: 'subjective style preference may be blocker without concrete risk',
    blocker: 'BLOCKED_RV_OPINION_BLOCKS_CLOSURE',
    base: 'Subjective style preference must not be a blocker absent concrete risk.',
    mutated: 'Subjective style preference may be a blocker absent concrete risk.',
    expected: /(?:subjective style preference.*blocker|blocker.*subjective style preference)/i,
  },
  {
    name: 'PASS may be emitted without artifact or diff',
    blocker: 'BLOCKED_RV_PASS_SHAPE_INVALID',
    base: '`PASS` must not be emitted when artifact or diff is absent.',
    mutated: '`PASS` may be emitted when artifact or diff is absent.',
    expected: /(?:PASS.*(?:artifact|diff)|(?:artifact|diff).*PASS)/i,
  },
  {
    name: 'PASS may be emitted with unresolved material risk',
    blocker: 'BLOCKED_RV_MATERIAL_RISK_NOT_FAIL',
    base: '`PASS` must not be emitted with unresolved material risk.',
    mutated: '`PASS` may be emitted with unresolved material risk.',
    expected: /(?:PASS.*unresolved material risk|unresolved material risk.*PASS)/i,
  },
  {
    name: 'PASS may be emitted with CORRECTION PACK',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    base: '`PASS` is not emitted with `CORRECTION PACK`.',
    mutated: '`PASS` may be emitted with `CORRECTION PACK`.',
    expected: /(?:PASS.*CORRECTION PACK|CORRECTION PACK.*PASS)/i,
  },
  {
    name: 'FAIL may be used for aesthetic preference alone',
    blocker: 'BLOCKED_RV_OPINION_BLOCKS_CLOSURE',
    base: '`FAIL` must not be used for aesthetic preference alone.',
    mutated: '`FAIL` may be used for aesthetic preference alone.',
    expected: /(?:FAIL.*aesthetic preference|aesthetic preference.*FAIL)/i,
  },
  {
    name: 'CORRECTION PACK may be broad',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    base: '`CORRECTION PACK` must not be broad.',
    mutated: '`CORRECTION PACK` may be broad.',
    expected: /(?:CORRECTION PACK.*broad|broad.*CORRECTION PACK)/i,
  },
  {
    name: 'CORRECTION PACK may be vague',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    base: '`CORRECTION PACK` must not be vague.',
    mutated: '`CORRECTION PACK` may be vague.',
    expected: /(?:CORRECTION PACK.*vague|vague.*CORRECTION PACK)/i,
  },
  {
    name: 'CORRECTION PACK may be repo-wide',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    base: '`CORRECTION PACK` must not be repo-wide.',
    mutated: '`CORRECTION PACK` may be repo-wide.',
    expected: /(?:CORRECTION PACK.*repo-wide|repo-wide.*CORRECTION PACK)/i,
  },
  {
    name: 'CORRECTION PACK may be redesign-oriented',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    base: '`CORRECTION PACK` must not be redesign-oriented.',
    mutated: '`CORRECTION PACK` may be redesign-oriented.',
    expected: /(?:CORRECTION PACK.*redesign-oriented|redesign-oriented.*CORRECTION PACK)/i,
  },
  {
    name: 'multiple CORRECTION PACK blocks may be emitted',
    blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID',
    base: 'Multiple `CORRECTION PACK` instances must not be emitted.',
    mutated: 'Multiple `CORRECTION PACK` instances may be emitted.',
    expected: /(?:Multiple.*CORRECTION PACK|CORRECTION PACK.*Multiple)/i,
  },
  {
    name: 'reviewer authorizes runtime',
    blocker: 'BLOCKED_RV_RUNTIME_AUTHORIZATION',
    base: 'Reviewer does not authorize runtime.',
    mutated: 'Reviewer authorizes runtime.',
    expected: /runtime/i,
  },
  {
    name: 'reviewer authorizes materialization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    base: 'Reviewer does not authorize materialization.',
    mutated: 'Reviewer authorizes materialization.',
    expected: /materialization/i,
  },
  {
    name: 'reviewer has authority for materialization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    base: 'Reviewer does not have authority for materialization.',
    mutated: 'Reviewer has authority for materialization.',
    expected: /materialization/i,
  },
  {
    name: 'reviewer should authorize materialization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    base: 'Reviewer must not authorize materialization.',
    mutated: 'Reviewer should authorize materialization.',
    expected: /materialization/i,
  },
  {
    name: 'reviewer authorizes production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Reviewer does not authorize production.',
    mutated: 'Reviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'reviewer is responsible for production adoption',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Reviewer is not responsible for production adoption.',
    mutated: 'Reviewer is responsible for production adoption.',
    expected: /production adoption/i,
  },
  {
    name: 'reviewer has authority over production adoption',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Reviewer does not have authority over production adoption.',
    mutated: 'Reviewer has authority over production adoption.',
    expected: /production adoption/i,
  },
  {
    name: 'reviewer authorizes productive skill',
    blocker: 'BLOCKED_RV_PRODUCTIVE_SKILL_AUTHORIZATION',
    base: 'Reviewer does not authorize productive skill.',
    mutated: 'Reviewer authorizes productive skill.',
    expected: /productive skill/i,
  },
  {
    name: 'reviewer authorizes materializer',
    blocker: 'BLOCKED_RV_MATERIALIZER_AUTHORIZATION',
    base: 'Reviewer does not authorize materializer.',
    mutated: 'Reviewer authorizes materializer.',
    expected: /materializer/i,
  },
  {
    name: 'reviewer authorizes runtime loader',
    blocker: 'BLOCKED_RV_RUNTIME_LOADER_AUTHORIZATION',
    base: 'Reviewer does not authorize runtime loader.',
    mutated: 'Reviewer authorizes runtime loader.',
    expected: /runtime loader/i,
  },
  {
    name: 'reviewer authorizes fixture',
    blocker: 'BLOCKED_RV_FIXTURE_AUTHORIZATION',
    base: 'Reviewer does not authorize fixture creation.',
    mutated: 'Reviewer authorizes fixture creation.',
    expected: /fixture/i,
  },
  {
    name: 'reviewer authorizes generated report',
    blocker: 'BLOCKED_RV_GENERATED_REPORT_AUTHORIZATION',
    base: 'Reviewer does not authorize generated report creation.',
    mutated: 'Reviewer authorizes generated report creation.',
    expected: /generated report/i,
  },
  {
    name: 'reviewer authorizes target artifact',
    blocker: 'BLOCKED_RV_TARGET_ARTIFACT_AUTHORIZATION',
    base: 'Reviewer does not authorize target artifact creation.',
    mutated: 'Reviewer authorizes target artifact creation.',
    expected: /target artifact/i,
  },
  {
    name: 'REVIEWER_KERNEL auto-promotes future status',
    blocker: 'BLOCKED_RV_STATUS_PROMOTION',
    base: '`REVIEWER_KERNEL` does not authorize automatic future promotion.',
    mutated: '`REVIEWER_KERNEL` authorizes automatic future promotion.',
    expected: /automatic future promotion/i,
  },
  {
    name: 'productive template may be fallback when snapshot missing',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not be fallback when snapshot is missing.',
    mutated: 'The productive template is allowed as fallback when snapshot is missing.',
    expected: /(?:productive template.*(?:fallback|snapshot)|(?:fallback|snapshot).*productive template)/i,
  },
  {
    name: 'template can be used as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not be used as fallback.',
    mutated: 'Template can be used as fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template serves as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not serve as fallback.',
    mutated: 'Template serves as fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template acts as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not act as fallback.',
    mutated: 'Template acts as fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template is fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not be fallback.',
    mutated: 'Template is fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template is the fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not be the fallback.',
    mutated: 'Template is the fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template becomes fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not become fallback.',
    mutated: 'Template becomes fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template operates as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not operate as fallback.',
    mutated: 'Template operates as fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'productive template serves as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not serve as fallback.',
    mutated: 'Productive template serves as fallback.',
    expected: /(?:Productive template.*fallback|fallback.*Productive template)/i,
  },
  {
    name: 'productive template acts as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not act as fallback.',
    mutated: 'Productive template acts as fallback.',
    expected: /(?:Productive template.*fallback|fallback.*Productive template)/i,
  },
  {
    name: 'productive template is fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not be fallback.',
    mutated: 'Productive template is fallback.',
    expected: /(?:Productive template.*fallback|fallback.*Productive template)/i,
  },
  {
    name: 'productive template becomes fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not become fallback.',
    mutated: 'Productive template becomes fallback.',
    expected: /(?:Productive template.*fallback|fallback.*Productive template)/i,
  },
  {
    name: 'template functions as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not function as fallback.',
    mutated: 'Template functions as fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'template works as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not work as fallback.',
    mutated: 'Template works as fallback.',
    expected: /(?:Template.*fallback|fallback.*Template)/i,
  },
  {
    name: 'productive template functions as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not function as fallback.',
    mutated: 'Productive template functions as fallback.',
    expected: /(?:Productive template.*fallback|fallback.*Productive template)/i,
  },
  {
    name: 'productive template works as fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not work as fallback.',
    mutated: 'Productive template works as fallback.',
    expected: /(?:Productive template.*fallback|fallback.*Productive template)/i,
  },
  {
    name: 'template backs up missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not back up missing snapshot.',
    mutated: 'Template backs up missing snapshot.',
    expected: /(?:Template.*backs up missing snapshot|backs up missing snapshot.*Template)/i,
  },
  {
    name: 'template replaces missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not replace missing snapshot.',
    mutated: 'Template replaces missing snapshot.',
    expected: /(?:Template.*replaces missing snapshot|replaces missing snapshot.*Template)/i,
  },
  {
    name: 'template is backup fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not be backup fallback.',
    mutated: 'Template is backup fallback.',
    expected: /(?:Template.*backup fallback|backup fallback.*Template)/i,
  },
  {
    name: 'productive template backs up missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not back up missing snapshot.',
    mutated: 'Productive template backs up missing snapshot.',
    expected: /(?:Productive template.*backs up missing snapshot|backs up missing snapshot.*Productive template)/i,
  },
  {
    name: 'productive template replaces missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not replace missing snapshot.',
    mutated: 'Productive template replaces missing snapshot.',
    expected: /(?:Productive template.*replaces missing snapshot|replaces missing snapshot.*Productive template)/i,
  },
  {
    name: 'productive template is backup fallback',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not be backup fallback.',
    mutated: 'Productive template is backup fallback.',
    expected: /(?:Productive template.*backup fallback|backup fallback.*Productive template)/i,
  },
  {
    name: 'template restores missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not restore missing snapshot.',
    mutated: 'Template restores missing snapshot.',
    expected: /(?:Template.*restores missing snapshot|restores missing snapshot.*Template)/i,
  },
  {
    name: 'template supplies missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not supply missing snapshot.',
    mutated: 'Template supplies missing snapshot.',
    expected: /(?:Template.*supplies missing snapshot|supplies missing snapshot.*Template)/i,
  },
  {
    name: 'template substitutes missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not substitute missing snapshot.',
    mutated: 'Template substitutes missing snapshot.',
    expected: /(?:Template.*substitutes missing snapshot|substitutes missing snapshot.*Template)/i,
  },
  {
    name: 'template is substitute for missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Template must not be substitute for missing snapshot.',
    mutated: 'Template is substitute for missing snapshot.',
    expected: /(?:Template.*substitute for missing snapshot|substitute for missing snapshot.*Template)/i,
  },
  {
    name: 'productive template restores missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not restore missing snapshot.',
    mutated: 'Productive template restores missing snapshot.',
    expected: /(?:Productive template.*restores missing snapshot|restores missing snapshot.*Productive template)/i,
  },
  {
    name: 'productive template supplies missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not supply missing snapshot.',
    mutated: 'Productive template supplies missing snapshot.',
    expected: /(?:Productive template.*supplies missing snapshot|supplies missing snapshot.*Productive template)/i,
  },
  {
    name: 'productive template substitutes missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not substitute missing snapshot.',
    mutated: 'Productive template substitutes missing snapshot.',
    expected: /(?:Productive template.*substitutes missing snapshot|substitutes missing snapshot.*Productive template)/i,
  },
  {
    name: 'productive template is substitute for missing snapshot',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not be substitute for missing snapshot.',
    mutated: 'Productive template is substitute for missing snapshot.',
    expected: /(?:Productive template.*substitute for missing snapshot|substitute for missing snapshot.*Productive template)/i,
  },
  {
    name: 'scratchpads may be source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not be source of truth.',
    mutated: 'Scratchpads are permitted as source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads serve as source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not serve as source of truth.',
    mutated: 'Scratchpads serve as source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads serve as Sentinel source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not serve as Sentinel source of truth.',
    mutated: 'Scratchpads serve as Sentinel source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads act as source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not act as source of truth.',
    mutated: 'Scratchpads act as source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads act as Sentinel source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not act as Sentinel source of truth.',
    mutated: 'Scratchpads act as Sentinel source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads serve as canonical source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not serve as canonical source.',
    mutated: 'Scratchpads serve as canonical source.',
    expected: /(?:Scratchpads.*canonical source|canonical source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads act as canonical source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not act as canonical source.',
    mutated: 'Scratchpads act as canonical source.',
    expected: /(?:Scratchpads.*canonical source|canonical source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are canonical source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not canonical source.',
    mutated: 'Scratchpads are canonical source.',
    expected: /(?:Scratchpads.*canonical source|canonical source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are a canonical source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not a canonical source.',
    mutated: 'Scratchpads are a canonical source.',
    expected: /(?:Scratchpads.*canonical source|canonical source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are canonical truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not canonical truth.',
    mutated: 'Scratchpads are canonical truth.',
    expected: /(?:Scratchpads.*canonical truth|canonical truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are the source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not the source of truth.',
    mutated: 'Scratchpads are the source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are canonical',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not canonical.',
    mutated: 'Scratchpads are canonical.',
    expected: /(?:Scratchpads.*canonical|canonical.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are authoritative source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not authoritative source.',
    mutated: 'Scratchpads are authoritative source.',
    expected: /(?:Scratchpads.*authoritative source|authoritative source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are authoritative truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not authoritative truth.',
    mutated: 'Scratchpads are authoritative truth.',
    expected: /(?:Scratchpads.*authoritative truth|authoritative truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are trusted source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not trusted source.',
    mutated: 'Scratchpads are trusted source.',
    expected: /(?:Scratchpads.*trusted source|trusted source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are accepted source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not accepted source of truth.',
    mutated: 'Scratchpads are accepted source of truth.',
    expected: /(?:Scratchpads.*accepted source of truth|accepted source of truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are authoritative',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not authoritative.',
    mutated: 'Scratchpads are authoritative.',
    expected: /(?:Scratchpads.*authoritative|authoritative.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are trusted',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not trusted.',
    mutated: 'Scratchpads are trusted.',
    expected: /(?:Scratchpads.*trusted|trusted.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are accepted truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not accepted truth.',
    mutated: 'Scratchpads are accepted truth.',
    expected: /(?:Scratchpads.*accepted truth|accepted truth.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are valid source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not valid source.',
    mutated: 'Scratchpads are valid source.',
    expected: /(?:Scratchpads.*valid source|valid source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are approved source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not approved source.',
    mutated: 'Scratchpads are approved source.',
    expected: /(?:Scratchpads.*approved source|approved source.*Scratchpads)/i,
  },
  {
    name: 'scratchpads are accepted authority',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads are not accepted authority.',
    mutated: 'Scratchpads are accepted authority.',
    expected: /(?:Scratchpads.*accepted authority|accepted authority.*Scratchpads)/i,
  },
  {
    name: 'workspaceStorage may be source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: '`workspaceStorage` must not be source of truth.',
    mutated: '`workspaceStorage` may be source of truth.',
    expected: /(?:workspaceStorage.*source of truth|source of truth.*workspaceStorage)/i,
  },
  {
    name: 'chat-session-resources may be source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: '`chat-session-resources` must not be source of truth.',
    mutated: '`chat-session-resources` may be source of truth.',
    expected: /(?:chat-session-resources.*source of truth|source of truth.*chat-session-resources)/i,
  },
  {
    name: 'content.txt may be source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: '`content.txt` must not be source of truth.',
    mutated: '`content.txt` may be source of truth.',
    expected: /(?:content\.txt.*source of truth|source of truth.*content\.txt)/i,
  },
  {
    name: 'runtime temp paths may be source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Runtime temp paths must not be source of truth.',
    mutated: 'Runtime temp paths may be source of truth.',
    expected: /(?:runtime temp paths.*source of truth|source of truth.*runtime temp paths)/i,
  },
  {
    name: 'runtime temp paths serve as source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Runtime temp paths must not serve as source of truth.',
    mutated: 'Runtime temp paths serve as source of truth.',
    expected: /(?:runtime temp paths.*source of truth|source of truth.*runtime temp paths)/i,
  },
  {
    name: 'runtime temp paths act as source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Runtime temp paths must not act as source of truth.',
    mutated: 'Runtime temp paths act as source of truth.',
    expected: /(?:runtime temp paths.*source of truth|source of truth.*runtime temp paths)/i,
  },
  {
    name: 'input shape reviewer authorizes production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Input shape: Reviewer does not authorize production.',
    mutated: 'Input shape: Reviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'expected blocker reviewer authorizes materialization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    base: 'Expected blocker: Reviewer does not authorize materialization.',
    mutated: 'Expected blocker: Reviewer authorizes materialization.',
    expected: /materialization/i,
  },
  {
    name: 'fail condition scratchpads serve as source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Fail condition: Scratchpads must not serve as source of truth.',
    mutated: 'Fail condition: Scratchpads serve as source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'reject case reviewer authorizes production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Reviewer does not authorize production.',
    mutated: 'Reject case: Reviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'block case reviewer authorizes production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Reviewer does not authorize production.',
    mutated: 'Block case: Reviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'unsafe if reviewer authorizes production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    base: 'Reviewer does not authorize production.',
    mutated: 'Unsafe if: Reviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'fail if scratchpads serve as source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not serve as source of truth.',
    mutated: 'Fail if: Scratchpads serve as source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'prohibited case reviewer authorizes materialization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    base: 'Reviewer does not authorize materialization.',
    mutated: 'Prohibited case: Reviewer authorizes materialization.',
    expected: /materialization/i,
  },
]);

const generalizedMutationGroups = Object.freeze([
  {
    family: 'reviewer authority/control/ownership + durable canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    expected: /(?:shared canon|canonical docs|shared docs|Feature CONTEXT|ADR|PLAN\.md|durable docs|factual sync|resync)/i,
    cases: [
      ['reviewer owns shared canon', 'Reviewer does not own shared canon.', 'Reviewer owns shared canon.'],
      ['reviewer custody over canonical docs', 'Reviewer does not have custody over canonical docs.', 'Reviewer has custody over canonical docs.'],
      ['semantic reviewer governs shared docs', 'Semantic reviewer does not govern shared docs.', 'Semantic reviewer governs shared docs.'],
      ['kernel administers Feature CONTEXT', '`REVIEWER_KERNEL` does not administer Feature CONTEXT.', '`REVIEWER_KERNEL` administers Feature CONTEXT.'],
      ['reviewer preserves ADR', 'Reviewer does not preserve ADR.', 'Reviewer preserves ADR.'],
      ['reviewer curates PLAN.md', 'Reviewer does not curate PLAN.md.', 'Reviewer curates PLAN.md.'],
      ['reviewer safeguards durable docs', 'Reviewer does not safeguard durable docs.', 'Reviewer safeguards durable docs.'],
      ['reviewer accountable for factual sync', 'Reviewer is not accountable for factual sync.', 'Reviewer is accountable for factual sync.'],
      ['reviewer controls resync', 'Reviewer does not control resync.', 'Reviewer controls resync.'],
      ['reviewer stewardship over shared canon', 'Reviewer does not have stewardship over shared canon.', 'Reviewer has stewardship over shared canon.'],
    ],
  },
  {
    family: 'untrusted source + trusted-source claim',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    expected: /(?:scratchpads?|workspaceStorage|chat-session-resources|content\.txt|runtime temp paths?|runtime temporary files?|temporary files?)/i,
    cases: [
      ['scratchpads verified source', 'Scratchpads are not verified source.', 'Scratchpads are verified source.'],
      ['workspaceStorage reliable source', '`workspaceStorage` is not reliable source.', '`workspaceStorage` is reliable source.'],
      ['chat session primary source', '`chat-session-resources` are not primary source.', '`chat-session-resources` are primary source.'],
      ['content accepted source', '`content.txt` is not accepted source.', '`content.txt` is accepted source.'],
      ['runtime temp paths canonical', 'Runtime temp paths are not canonical.', 'Runtime temp paths are canonical.'],
      ['temporary files source of truth', 'Temporary files are not source of truth.', 'Temporary files are source of truth.'],
      ['scratchpads approved source', 'Scratchpads are not approved source.', 'Scratchpads are approved source.'],
      ['workspaceStorage reference source', '`workspaceStorage` is not reference source.', '`workspaceStorage` is reference source.'],
      ['content authoritative truth', '`content.txt` is not authoritative truth.', '`content.txt` is authoritative truth.'],
      ['runtime temporary files trusted', 'Runtime temporary files are not trusted.', 'Runtime temporary files are trusted.'],
    ],
  },
  {
    family: 'template/productive template + snapshot fallback/recovery',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    expected: /(?:template|snapshot|fallback|backup|restore|recover|regenerate|fills|stands in|replaces)/i,
    cases: [
      ['template restores missing snapshot', 'Template must not restore missing snapshot.', 'Template restores missing snapshot.'],
      ['productive template recovers dev snapshot', 'Productive template must not recover dev snapshot.', 'Productive template recovers dev snapshot.'],
      ['canonical template regenerates reviewer snapshot', 'Canonical template must not regenerate reviewer snapshot.', 'Canonical template regenerates reviewer snapshot.'],
      ['template fills missing snapshot', 'Template must not fill missing snapshot.', 'Template fills missing snapshot.'],
      ['productive template stands in', 'Productive template must not stand in for missing snapshot.', 'Productive template stands in for missing snapshot.'],
      ['template backs up dev snapshot', 'Template must not back up dev snapshot.', 'Template backs up dev snapshot.'],
      ['canonical template replaces reviewer snapshot', 'Canonical template must not replace reviewer snapshot.', 'Canonical template replaces reviewer snapshot.'],
      ['productive template is fallback', 'Productive template is not fallback.', 'Productive template is fallback.'],
      ['template becomes backup', 'Template must not become backup.', 'Template becomes backup.'],
      ['reviewer snapshot becomes fallback', 'Reviewer snapshot is not fallback.', 'Reviewer snapshot becomes fallback.'],
    ],
  },
  {
    family: 'reviewer/kernel + runtime/prod/materialization/artifact authorization',
    blocker: null,
    expected: /(?:runtime|production|materialization|materializer|runtime loader|target artifact|generated report|fixture|GitHub write|target repo)/i,
    cases: [
      ['reviewer authorizes runtime', 'Reviewer does not authorize runtime.', 'Reviewer authorizes runtime.', 'BLOCKED_RV_RUNTIME_AUTHORIZATION'],
      ['semantic reviewer enables production', 'Semantic reviewer does not enable production.', 'Semantic reviewer enables production.', 'BLOCKED_RV_PRODUCTION_AUTHORIZATION'],
      ['kernel activates materialization', '`REVIEWER_KERNEL` does not activate materialization.', '`REVIEWER_KERNEL` activates materialization.', 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION'],
      ['reviewer authority over materializer', 'Reviewer does not have authority over materializer.', 'Reviewer has authority over materializer.', 'BLOCKED_RV_MATERIALIZER_AUTHORIZATION'],
      ['reviewer supports runtime loader', 'Reviewer does not support runtime loader.', 'Reviewer supports runtime loader.', 'BLOCKED_RV_RUNTIME_LOADER_AUTHORIZATION'],
      ['reviewer authorizes target artifact', 'Reviewer does not authorize target artifact.', 'Reviewer authorizes target artifact.', 'BLOCKED_RV_TARGET_ARTIFACT_AUTHORIZATION'],
      ['reviewer enables generated report', 'Reviewer does not enable generated report.', 'Reviewer enables generated report.', 'BLOCKED_RV_GENERATED_REPORT_AUTHORIZATION'],
      ['reviewer authorizes fixture', 'Reviewer does not authorize fixture.', 'Reviewer authorizes fixture.', 'BLOCKED_RV_FIXTURE_AUTHORIZATION'],
      ['reviewer authorizes GitHub write', 'Reviewer does not authorize GitHub write.', 'Reviewer authorizes GitHub write.', 'BLOCKED_RV_GITHUB_WRITE_AUTHORIZATION'],
      ['reviewer controls target repo', 'Reviewer does not control target repo.', 'Reviewer controls target repo.', 'BLOCKED_RV_TARGET_REPO_WRITE_AUTHORIZATION'],
    ],
  },
  {
    family: 'heading variations',
    blocker: null,
    expected: /(?:shared canon|source of truth|missing snapshot|production|materialization)/i,
    cases: [
      ['heading reviewer owns canon', '### Reviewer does not own shared canon', '### Reviewer owns shared canon', 'BLOCKED_RV_REPLACES_RESYNC'],
      ['heading scratchpads truth', '### Scratchpads are not source of truth', '### Scratchpads are source of truth', 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH'],
      ['heading template restores snapshot', '### Template must not restore missing snapshot', '### Template restores missing snapshot', 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK'],
      ['heading reviewer production', '### Reviewer does not authorize production', '### Reviewer authorizes production', 'BLOCKED_RV_PRODUCTION_AUTHORIZATION'],
      ['heading kernel materialization', '### REVIEWER_KERNEL does not enable materialization', '### REVIEWER_KERNEL enables materialization', 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION'],
    ],
  },
  {
    family: 'bullet variations',
    blocker: null,
    expected: /(?:shared canon|trusted source|fallback|runtime|DONE)/i,
    cases: [
      ['bullet reviewer governs canon', '- Reviewer does not govern shared canon.', '- Reviewer governs shared canon.', 'BLOCKED_RV_REPLACES_RESYNC'],
      ['bullet temp trusted', '- Temporary files are not trusted source.', '- Temporary files are trusted source.', 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH'],
      ['bullet template fallback', '- Productive template is not fallback.', '- Productive template is fallback.', 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK'],
      ['bullet runtime authorization', '- Reviewer does not authorize runtime.', '- Reviewer authorizes runtime.', 'BLOCKED_RV_RUNTIME_AUTHORIZATION'],
      ['bullet done decision', '- Reviewer does not decide DONE.', '- Reviewer decides DONE.', 'BLOCKED_RV_REPLACES_FINALIZER'],
    ],
  },
  {
    family: 'deceptive inline labels',
    blocker: null,
    expected: /(?:production|materialization|source of truth|fallback|shared canon)/i,
    cases: [
      ['reject case production', 'Reviewer does not authorize production.', 'Reject case: Reviewer authorizes production.', 'BLOCKED_RV_PRODUCTION_AUTHORIZATION'],
      ['fail if materialization', 'Reviewer does not authorize materialization.', 'Fail if: Reviewer authorizes materialization.', 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION'],
      ['unsafe if source truth', 'Scratchpads are not source of truth.', 'Unsafe if: Scratchpads are source of truth.', 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH'],
      ['expected blocker fallback', 'Template is not fallback.', 'Expected blocker: Template is fallback.', 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK'],
      ['prohibited case canon', 'Reviewer does not own shared canon.', 'Prohibited case: Reviewer owns shared canon.', 'BLOCKED_RV_REPLACES_RESYNC'],
    ],
  },
  {
    family: 'distant negation then affirmative claim',
    blocker: null,
    expected: /(?:runs proof|source of truth|restores missing snapshot|enables production|controls shared canon)/i,
    cases: [
      ['distant validation proof', 'Reviewer does not run validation.', 'Reviewer does not run validation. Reviewer runs proof.', 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER'],
      ['distant scratchpads truth', 'Scratchpads are not canonical.', 'Scratchpads are not canonical. Scratchpads are source of truth.', 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH'],
      ['distant template recovery', 'Template is not fallback.', 'Template is not fallback. Template restores missing snapshot.', 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK'],
      ['distant production auth', 'Reviewer does not authorize runtime.', 'Reviewer does not authorize runtime. Reviewer enables production.', 'BLOCKED_RV_PRODUCTION_AUTHORIZATION'],
      ['distant canon control', 'Reviewer must not write shared canon.', 'Reviewer must not write shared canon. Reviewer controls shared canon.', 'BLOCKED_RV_REPLACES_RESYNC'],
    ],
  },
]);

const expectedClaimsByBlocker = Object.freeze(
  new Map([
    [
      'BLOCKED_RV_REPLACES_RESYNC',
      {
        expectedFamily: 'subject_action_object:durable-canon',
        expectedClaimName: 'reviewer replaces resync',
      },
    ],
    [
      'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
      {
        expectedFamily: 'untrusted_source:trusted-source-claim',
        expectedClaimName: 'untrusted source of truth',
      },
    ],
    [
      'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
      {
        expectedFamily: 'template_or_snapshot:fallback-recovery',
        expectedClaimName: 'productive template fallback',
      },
    ],
    [
      'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
      {
        expectedFamily: 'subject_action_object:validation-runner',
        expectedClaimName: 'reviewer replaces validation-runner',
      },
    ],
    [
      'BLOCKED_RV_REPLACES_FINALIZER',
      {
        expectedFamily: 'subject_action_object:finalizer',
        expectedClaimName: 'reviewer replaces finalizer',
      },
    ],
    [
      'BLOCKED_RV_REPLACES_CODER_FIXER',
      {
        expectedFamily: 'subject_action_object:coder-fixer',
        expectedClaimName: 'reviewer replaces coder-fixer',
      },
    ],
    [
      'BLOCKED_RV_CREATES_TARGET_ARTIFACTS',
      {
        expectedFamily: 'subject_action_object:target-artifact-creation',
        expectedClaimName: 'reviewer creates target artifacts',
      },
    ],
    [
      'BLOCKED_RV_REDESIGNS_PACKAGE',
      {
        expectedFamily: 'subject_action_object:execution-package-design',
        expectedClaimName: 'reviewer redesigns package',
      },
    ],
    [
      'BLOCKED_RV_REDESIGNS_CUT',
      {
        expectedFamily: 'subject_action_object:cut-design',
        expectedClaimName: 'reviewer redesigns cut',
      },
    ],
    [
      'BLOCKED_RV_REDESIGNS_PLAN',
      {
        expectedFamily: 'subject_action_object:plan-design',
        expectedClaimName: 'reviewer redesigns plan',
      },
    ],
    [
      'BLOCKED_RV_REDESIGNS_BRIEF',
      {
        expectedFamily: 'subject_action_object:brief-design',
        expectedClaimName: 'reviewer redesigns brief',
      },
    ],
    [
      'BLOCKED_RV_REDESIGNS_VALIDATION_DESIGN',
      {
        expectedFamily: 'subject_action_object:validation-design',
        expectedClaimName: 'reviewer redesigns validation design',
      },
    ],
    [
      'BLOCKED_RV_RUNTIME_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:runtime-authorization',
        expectedClaimName: 'reviewer authorizes runtime',
      },
    ],
    [
      'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:materialization-authorization',
        expectedClaimName: 'reviewer authorizes materialization',
      },
    ],
    [
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:production-authorization',
        expectedClaimName: 'reviewer authorizes production',
      },
    ],
    [
      'BLOCKED_RV_MATERIALIZER_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:materializer-authorization',
        expectedClaimName: 'reviewer authorizes materializer',
      },
    ],
    [
      'BLOCKED_RV_RUNTIME_LOADER_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:runtime-loader-authorization',
        expectedClaimName: 'reviewer authorizes runtime loader',
      },
    ],
    [
      'BLOCKED_RV_PRODUCTIVE_SKILL_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:productive-skill-authorization',
        expectedClaimName: 'reviewer authorizes productive skill',
      },
    ],
    [
      'BLOCKED_RV_FIXTURE_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:fixture-authorization',
        expectedClaimName: 'reviewer authorizes fixture',
      },
    ],
    [
      'BLOCKED_RV_GENERATED_REPORT_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:generated-report-authorization',
        expectedClaimName: 'reviewer authorizes generated report',
      },
    ],
    [
      'BLOCKED_RV_TARGET_ARTIFACT_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:target-artifact-authorization',
        expectedClaimName: 'reviewer authorizes target artifact',
      },
    ],
    [
      'BLOCKED_RV_GITHUB_WRITE_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:github-write-authorization',
        expectedClaimName: 'reviewer authorizes GitHub write',
      },
    ],
    [
      'BLOCKED_RV_TARGET_REPO_WRITE_AUTHORIZATION',
      {
        expectedFamily: 'subject_action_object:target-repo-authorization',
        expectedClaimName: 'reviewer authorizes target repo write',
      },
    ],
    [
      'BLOCKED_RV_STATUS_PROMOTION',
      {
        expectedFamily: 'status-promotion',
        expectedClaimName: 'automatic future promotion',
      },
    ],
    [
      'BLOCKED_RV_GREEN_PROOF_OVERRIDES_STRUCTURE',
      {
        expectedFamily: 'output-shape',
        expectedClaimName: 'green proof overrides structure',
      },
    ],
    [
      'BLOCKED_RV_PASS_SHAPE_INVALID',
      {
        expectedFamily: 'output-shape',
        expectedClaimName: 'PASS without artifact or diff',
      },
    ],
    [
      'BLOCKED_RV_MATERIAL_RISK_NOT_FAIL',
      {
        expectedFamily: 'output-shape',
        expectedClaimName: 'PASS with unresolved material risk',
      },
    ],
    ['BLOCKED_RV_CORRECTION_PACK_INVALID', { expectedFamily: 'output-shape' }],
    ['BLOCKED_RV_OPINION_BLOCKS_CLOSURE', { expectedFamily: 'output-shape' }],
    [
      'BLOCKED_RV_REVIEW_MINIMAL_BROKEN',
      {
        expectedFamily: 'reading-scope',
        expectedClaimName: 'review-minimal broken',
      },
    ],
  ]),
);

const generalizedMutations = Object.freeze(
  generalizedMutationGroups.flatMap((group) =>
    group.cases.map(([name, base, mutated, blocker = group.blocker]) => ({
      name: `${group.family}: ${name}`,
      blocker,
      base,
      mutated,
      expected: group.expected,
      expectedFamily: expectedClaimsByBlocker.get(blocker)?.expectedFamily,
      expectedClaimName: expectedClaimsByBlocker.get(blocker)?.expectedClaimName,
    })),
  ),
);

const allNegativeMutations = Object.freeze([...negativeMutations, ...generalizedMutations]);

const contextualHeadingMutations = Object.freeze([
  {
    name: 'contextual markdown heading input shape production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    mutated: '### Input shape\nReviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'contextual markdown heading expected behavior materialization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    mutated: '### Expected behavior\nReviewer enables materialization.',
    expected: /materialization/i,
  },
  {
    name: 'contextual markdown heading fail condition source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    mutated: '### Fail condition\nScratchpads are source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
  },
  {
    name: 'contextual markdown heading expected blocker snapshot restore',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    mutated: '### Expected blocker\nTemplate restores missing snapshot.',
    expected: /(?:Template.*restores missing snapshot|restores missing snapshot.*Template)/i,
  },
  {
    name: 'contextual plain label input shape production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    mutated: 'Input shape:\nReviewer authorizes production.',
    expected: /production/i,
  },
  {
    name: 'contextual plain label expected blocker production',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    mutated: 'Expected blocker:\nReviewer enables production.',
    expected: /production/i,
  },
  {
    name: 'contextual plain label fail condition trusted source',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    mutated: 'Fail condition:\nScratchpads are trusted source.',
    expected: /(?:Scratchpads.*trusted source|trusted source.*Scratchpads)/i,
  },
]);

function fail(message) {
  errors.push(message);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function isInside(root, candidate) {
  const rel = relative(root, candidate);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

function findRepoRoot(startPath) {
  let cursor = realpathSync.native(startPath);
  for (;;) {
    if (
      existsSync(resolve(cursor, KERNEL_PREFIX)) &&
      existsSync(resolve(cursor, SNAPSHOT_AGENT)) &&
      existsSync(resolve(cursor, TEMPLATE_AGENT))
    ) {
      return realpathSync.native(cursor);
    }
    const parent = dirname(cursor);
    if (parent === cursor) {
      throw new Error(`Unable to locate repository root from ${startPath}`);
    }
    cursor = parent;
  }
}

function safeReadRepoText(relPath) {
  const absPath = resolve(repoRoot, relPath);
  try {
    assert(isInside(repoRoot, absPath), `${relPath} escapes repo root before realpath`);
    const lst = lstatSync(absPath);
    assert(!lst.isSymbolicLink(), `${relPath} must not be a symlink`);
    const real = realpathSync.native(absPath);
    assert(isInside(repoRoot, real), `${relPath} escapes repo root after realpath`);
    const st = statSync(real);
    assert(st.isFile(), `${relPath} must be a regular file`);
    return readFileSync(real, 'utf8');
  } catch (error) {
    fail(`${relPath} is not a safe readable file: ${error.message}`);
    return '';
  }
}

function headingMatch(line) {
  return /^(#{1,6})\s+(.+?)\s*$/.exec(line);
}

function extractSection(markdown, headingPattern, label) {
  const lines = markdown.split(/\r?\n/);
  let start = -1;
  let level = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const match = headingMatch(lines[index]);
    if (match && headingPattern.test(match[2])) {
      start = index;
      level = match[1].length;
      break;
    }
  }

  if (start === -1) {
    fail(`Missing section ${label}`);
    return '';
  }

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = headingMatch(lines[index]);
    if (match && match[1].length <= level) {
      end = index;
      break;
    }
  }

  return lines.slice(start, end).join('\n');
}

function requirePatterns(text, patterns, label) {
  for (const pattern of patterns) {
    assert(pattern.test(text), `${label} missing ${pattern}`);
  }
}

function checkStaticHarnessPasses() {
  const result = spawnSync(process.execPath, [staticHarness], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
  assert(result.status === 0, `check-static.mjs must pass before golden checks. stdout=${result.stdout} stderr=${result.stderr}`);
}

function checkGoldenDoc() {
  assert(scenarios.length === 10, `expected exactly 10 golden scenarios, found ${scenarios.length}`);
  const doc = safeReadRepoText(`${KERNEL_PREFIX}/validation/GOLDEN_TESTS.md`);
  const seen = new Set();

  for (const scenario of scenarios) {
    assert(!seen.has(scenario.id), `duplicate scenario ${scenario.id}`);
    seen.add(scenario.id);
    const section = extractSection(doc, new RegExp(`Golden Test ${scenario.id}\\b`, 'i'), scenario.id);
    assert(new RegExp(`\\b${scenario.blocker}\\b`).test(section), `${scenario.id} missing expected blocker ${scenario.blocker}`);
    for (const [heading, patterns] of Object.entries(scenario.sections)) {
      const child = extractSection(section, new RegExp(`^${heading}$`, 'i'), `${scenario.id} ${heading}`);
      requirePatterns(child, patterns, `${scenario.id} ${heading}`);
    }
  }
}

function inferExpectedClaimName(mutation) {
  if (mutation.expectedClaimName) {
    return mutation.expectedClaimName;
  }
  if (mutation.blocker === 'BLOCKED_RV_CORRECTION_PACK_INVALID') {
    return /\bPASS\b/i.test(mutation.mutated) && /\bCORRECTION\s+PACK\b/i.test(mutation.mutated)
      ? 'PASS with CORRECTION PACK'
      : 'invalid CORRECTION PACK shape';
  }
  if (mutation.blocker === 'BLOCKED_RV_OPINION_BLOCKS_CLOSURE') {
    return /\bsubjective\s+style\s+preference\b/i.test(mutation.mutated)
      ? 'subjective preference blocks closure'
      : 'FAIL for aesthetic preference';
  }
  return expectedClaimsByBlocker.get(mutation.blocker)?.expectedClaimName;
}

function expectedMutationShape(mutation) {
  const defaults = expectedClaimsByBlocker.get(mutation.blocker) ?? {};
  return {
    expectedFamily: mutation.expectedFamily ?? defaults.expectedFamily,
    expectedClaimName: inferExpectedClaimName(mutation),
  };
}

function matchExpectedMutation(match, mutation) {
  const { expectedFamily, expectedClaimName } = expectedMutationShape(mutation);
  return (
    match.blocker === mutation.blocker &&
    (!expectedFamily || match.family === expectedFamily) &&
    (!expectedClaimName || match.claimName === expectedClaimName)
  );
}

function formatMatches(matches) {
  return matches
    .map((match) => `${match.blocker}/${match.family}/${match.claimName}`)
    .join(', ');
}

function assertMutationDetection(mutation) {
  const mutated = mutation.mutated;
  const { expectedFamily, expectedClaimName } = expectedMutationShape(mutation);
  assert(Boolean(mutation.blocker), `${mutation.name} mutation must declare semantic blocker`);
  assert(Boolean(expectedFamily), `${mutation.name} mutation must declare expected semantic family`);
  assert(mutated !== mutation.base, `${mutation.name} mutation must change text in memory`);
  const mutatedMatches = findForbiddenClaims(mutated);
  const expectedMatch = mutatedMatches.find((match) => matchExpectedMutation(match, mutation));
  assert(
    Boolean(expectedMatch),
    `${mutation.name} should trigger ${mutation.blocker}/${expectedFamily}${
      expectedClaimName ? `/${expectedClaimName}` : ''
    } through affirmative forbidden-claim detection. actual=${formatMatches(mutatedMatches)}`,
  );
  if (expectedMatch) {
    assert(
      expectedMatch.blocker === mutation.blocker,
      `${mutation.name} detected blocker ${expectedMatch.blocker} but expected ${mutation.blocker}`,
    );
    assert(
      expectedMatch.family === expectedFamily,
      `${mutation.name} detected family ${expectedMatch.family} but expected ${expectedFamily}`,
    );
    if (expectedClaimName) {
      assert(
        expectedMatch.claimName === expectedClaimName,
        `${mutation.name} detected claim ${expectedMatch.claimName} but expected ${expectedClaimName}`,
      );
    }
    assert(Boolean(expectedMatch.excerpt), `${mutation.name} must return a useful excerpt`);
    assert(
      mutation.expected.test(expectedMatch.excerpt),
      `${mutation.name} excerpt must contain the prohibited action for ${mutation.blocker}`,
    );
  }
}

function checkInMemoryNegativeMutations() {
  assert(negativeMutations.length === 150, `expected exactly 150 negative mutations, found ${negativeMutations.length}`);
  assert(
    generalizedMutations.length === 60,
    `expected exactly 60 generalized negative mutations, found ${generalizedMutations.length}`,
  );
  assert(
    allNegativeMutations.length === 210,
    `expected exactly 210 total negative mutations, found ${allNegativeMutations.length}`,
  );

  for (const mutation of allNegativeMutations) {
    assertMutationDetection(mutation);
    const baseMatches = findForbiddenClaims(mutation.base);
    assert(
      !baseMatches.some((match) => matchExpectedMutation(match, mutation)),
      `${mutation.name} base text should remain accepted as local negation for ${mutation.blocker}`,
    );
  }

  assert(
    contextualHeadingMutations.length === 7,
    `expected exactly 7 contextual heading mutations, found ${contextualHeadingMutations.length}`,
  );
  for (const mutation of contextualHeadingMutations) {
    assertMutationDetection({ base: '', ...mutation });
  }
}

function goldenDocFragment(body) {
  return `# Reviewer Kernel Golden Tests

Status: planned textual golden-test contract for
\`REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS\`.

${body}
`;
}

function syntheticGoldenScenario(sections, id = 'RV-GT-999') {
  return goldenDocFragment(`## Golden Test ${id} Synthetic

${sections}`);
}

function checkGoldenScenarioCompletenessScanner() {
  const incompleteScenarioCases = [
    [
      'minimal escaped input with expected blocker',
      `### Input shape
Reviewer attempts to authorize production.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      'RV-GT-998',
    ],
    [
      'missing objective',
      `### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'missing expected behavior',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'missing expected blocker',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'incompatible expected blocker',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.

### Expected blocker
BLOCKED_RV_REPLACES_FINALIZER`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'one compatible and one incompatible input match',
      `### Objective
Confirm invalid reviewer actions are rejected.

### Input shape
Reviewer attempts to authorize production.
Reviewer decides DONE.

### Expected behavior
The scenario must be blocked.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_REPLACES_FINALIZER',
    ],
    [
      'duplicate expected blocker rejects later compatible blocker',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.

### Expected blocker
BLOCKED_RV_REPLACES_FINALIZER

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      'RV-GT-997',
    ],
    [
      'expected blocker before input shape',
      `### Objective
Confirm invalid reviewer action is rejected.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION

### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      'RV-GT-996',
    ],
    [
      'expected blocker inside fenced code',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.

### Expected blocker
\`\`\`
BLOCKED_RV_PRODUCTION_AUTHORIZATION
\`\`\``,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      'RV-GT-995',
    ],
    [
      'duplicate input shape',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Input shape
Reviewer attempts to decide DONE.

### Expected behavior
The scenario must be blocked.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      'RV-GT-994',
    ],
    [
      'expected behavior before input shape',
      `### Objective
Confirm invalid reviewer action is rejected.

### Expected behavior
The scenario must be blocked.

### Input shape
Reviewer attempts to authorize production.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
      'RV-GT-993',
    ],
  ];
  assert(
    incompleteScenarioCases.length === 11,
    `expected exactly 11 incomplete scenario scanner cases, found ${incompleteScenarioCases.length}`,
  );
  for (const [name, sections, expectedBlocker, id] of incompleteScenarioCases) {
    const matches = findForbiddenClaimsInGoldenTestsDoc(syntheticGoldenScenario(sections, id));
    assert(
      matches.some((match) => match.blocker === expectedBlocker),
      `${name} should fail scoped GOLDEN_TESTS.md Input shape completeness scanning. actual=${formatMatches(matches)}`,
    );
  }

  const completeScenarioCases = [
    [
      'complete compatible input shape example',
      `### Objective
Confirm invalid reviewer action is rejected.

### Input shape
Reviewer attempts to authorize production.

### Expected behavior
The scenario must be blocked.

### Expected blocker
BLOCKED_RV_PRODUCTION_AUTHORIZATION`,
    ],
  ];
  assert(
    completeScenarioCases.length === 1,
    `expected exactly 1 complete scenario scanner case, found ${completeScenarioCases.length}`,
  );
  for (const [name, sections] of completeScenarioCases) {
    const matches = findForbiddenClaimsInGoldenTestsDoc(syntheticGoldenScenario(sections));
    assert(matches.length === 0, `${name} should remain allowed as a complete negative example. actual=${formatMatches(matches)}`);
  }
}

function checkGoldenTestsScopedScanner() {
  const normativeCases = [
    ['normative reviewer proof', 'Reviewer runs proof.', 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER'],
    ['normative DONE decision', 'Reviewer decides DONE.', 'BLOCKED_RV_REPLACES_FINALIZER'],
    ['normative production authorization', 'Reviewer authorizes production.', 'BLOCKED_RV_PRODUCTION_AUTHORIZATION'],
    ['normative scratchpads truth', 'Scratchpads are source of truth.', 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH'],
    ['normative template restore', 'Template restores missing snapshot.', 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK'],
    [
      'input shape remains scanned',
      '### Input shape\nReviewer authorizes production.',
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'expected behavior remains scanned',
      '### Expected behavior\nScratchpads are source of truth.',
      'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    ],
    [
      'input attempt authorize production remains scanned',
      '### Input shape\nReviewer attempts to authorize production.',
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'input attempt enable materialization remains scanned',
      '### Input shape\nReviewer attempts to enable materialization.',
      'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    ],
    [
      'input attempt decide DONE remains scanned',
      '### Input shape\nReviewer attempts to decide DONE.',
      'BLOCKED_RV_REPLACES_FINALIZER',
    ],
    [
      'input attempt run proof remains scanned',
      '### Input shape\nReviewer attempts to run proof.',
      'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    ],
    [
      'inline input attempt authorize production remains scanned',
      'Input shape:\nReviewer attempts to authorize production.',
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'inline input attempt decide DONE remains scanned',
      'Input shape:\nReviewer attempts to decide DONE.',
      'BLOCKED_RV_REPLACES_FINALIZER',
    ],
    [
      'isolated fenced production remains scanned',
      '```\nReviewer authorizes production.\n```',
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'isolated fenced scratchpad truth remains scanned',
      '```\nScratchpads are source of truth.\n```',
      'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    ],
    [
      'isolated fenced template restore remains scanned',
      '```\nTemplate restores missing snapshot.\n```',
      'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    ],
    [
      'input fenced production remains scanned',
      '### Input shape\n```\nReviewer authorizes production.\n```',
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'expected behavior fenced materialization remains scanned',
      '### Expected behavior\n```\nReviewer enables materialization.\n```',
      'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    ],
    [
      'input fenced attempt authorize production remains scanned',
      '### Input shape\n```\nReviewer attempts to authorize production.\n```',
      'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    ],
    [
      'heading fail condition protects only first paragraph',
      '### Fail condition\nReviewer runs proof.\n\nReviewer decides DONE.',
      'BLOCKED_RV_REPLACES_FINALIZER',
    ],
  ];
  assert(normativeCases.length === 20, `expected exactly 20 scoped scanner forbidden cases, found ${normativeCases.length}`);
  for (const [name, body, expectedBlocker] of normativeCases) {
    const matches = findForbiddenClaimsInGoldenTestsDoc(goldenDocFragment(body));
    assert(
      matches.some((match) => match.blocker === expectedBlocker),
      `${name} should fail scoped GOLDEN_TESTS.md affirmative-claim scanning. actual=${formatMatches(matches)}`,
    );
  }

  const validNegativeExamples = [
    ['fail condition proof', 'Fail condition: Reviewer runs proof.'],
    ['expected blocker DONE', 'Expected blocker: Reviewer decides DONE.'],
    ['fail condition source truth', 'Fail condition: Scratchpads are source of truth.'],
    ['expected blocker template restore', 'Expected blocker: Template restores missing snapshot.'],
    ['fail condition block proof', '### Fail condition\nReviewer runs proof.'],
    ['expected blocker block DONE', '### Expected blocker\nReviewer decides DONE.'],
    ['fail condition fenced proof', 'Fail condition:\n```\nReviewer runs proof.\n```'],
    ['expected blocker fenced DONE', 'Expected blocker:\n```\nReviewer decides DONE.\n```'],
    ['expected blocker fenced template restore', 'Expected blocker:\n```\nTemplate restores missing snapshot.\n```'],
  ];
  assert(
    validNegativeExamples.length === 9,
    `expected exactly 9 scoped scanner negative examples, found ${validNegativeExamples.length}`,
  );
  for (const [name, body] of validNegativeExamples) {
    const matches = findForbiddenClaimsInGoldenTestsDoc(goldenDocFragment(body));
    assert(matches.length === 0, `${name} should remain a valid negative example. actual=${formatMatches(matches)}`);
  }

  const followingNormativeLine = findForbiddenClaimsInGoldenTestsDoc(
    goldenDocFragment('Fail condition: Reviewer runs proof.\n\nReviewer decides DONE.'),
  );
  assert(
    followingNormativeLine.some((match) => match.blocker === 'BLOCKED_RV_REPLACES_FINALIZER'),
    `line after inline Fail condition should still be scanned. actual=${formatMatches(followingNormativeLine)}`,
  );
}

function main() {
  checkStaticHarnessPasses();
  checkGoldenDoc();
  checkInMemoryNegativeMutations();
  checkGoldenScenarioCompletenessScanner();
  checkGoldenTestsScopedScanner();

  if (errors.length > 0) {
    console.error('FAIL reviewer_kernel golden checks');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('PASS reviewer_kernel golden checks');
}

function isMainModule() {
  return Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
}

if (isMainModule()) {
  main();
}
