#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  lstatSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
    name: 'REVIEWER_KERNEL is CLEAN_EXCELLENT_PASS',
    blocker: 'BLOCKED_RV_STATUS_PROMOTION',
    base: '`REVIEWER_KERNEL` is not `CLEAN_EXCELLENT_PASS`.',
    mutated: '`REVIEWER_KERNEL` is `CLEAN_EXCELLENT_PASS`.',
    expected: /CLEAN_EXCELLENT_PASS/i,
  },
  {
    name: 'productive template may be fallback when snapshot missing',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    base: 'Productive template must not be fallback when snapshot is missing.',
    mutated: 'The productive template is allowed as fallback when snapshot is missing.',
    expected: /(?:productive template.*(?:fallback|snapshot)|(?:fallback|snapshot).*productive template)/i,
  },
  {
    name: 'scratchpads may be source of truth',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    base: 'Scratchpads must not be source of truth.',
    mutated: 'Scratchpads are permitted as source of truth.',
    expected: /(?:Scratchpads.*source of truth|source of truth.*Scratchpads)/i,
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

function splitClauses(text) {
  return text
    .replace(/\r/g, '')
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+|\b(?:but|however|although|though|except that)\b/i)
    .map((clause) => clause.trim())
    .filter(Boolean);
}

function hasLocalNegation(clause) {
  return /\b(?:does not|do not|must not|cannot|can not|is not|are not|never|no|without|forbidden|prohibited|rejects?|blocks?|unsafe if|fail if|not|was not|were not|isn't|aren't|won't|prohibits?|prohibition on|unauthori[sz]ed|fail condition|input shape|expected blocker|não|nao|sem)\b/i.test(
    clause,
  );
}

function hasAffirmingVerb(clause) {
  return /\b(?:may|can|could|should|allows?|permits?|authori[sz](?:e|es|ed)|owns?|executes?|runs?|writes?|creates?|generates?|decides?|replaces?|implements?|materiali[sz]es?|promotes?|activates?|emits?|emitted)\b|\b(?:is|are|be)\s+(?:allowed|permitted|authori[sz]ed)\s+(?:to|as)\b|\b(?:has|have|with)\s+authority\s+to\b|\b(?:is|are)\s+responsible\s+for\b|\bowns\s+responsibility\s+for\b|\bhas\s+responsibility\s+for\b|\b(?:is|are)\s+accountable\s+for\b/i.test(
    clause,
  );
}

function hasAffirmingStatus(clause) {
  return /\b(?:status|ready|active|enabled|pass|approved|available|supported|CLEAN_EXCELLENT_PASS)\b/i.test(clause);
}

function hasForbiddenStandaloneClaim(clause, claim) {
  return Boolean(claim.standalone) && claim.pattern.test(clause);
}

function hasContradictoryClaim(clause, claim) {
  return (
    claim.pattern.test(clause) &&
    hasLocalNegation(clause) &&
    (/\b(?:may|can|could|should)\b/i.test(clause) ||
      /\b(?:is|are|be)\s+(?:allowed|permitted|authori[sz]ed)\s+(?:to|as)\b/i.test(clause))
  );
}

function findForbiddenClaims(text, claims) {
  const matches = [];
  for (const clause of splitClauses(text)) {
    for (const claim of claims) {
      const matched = claim.pattern.test(clause);
      const nonNegated =
        matched &&
        !hasLocalNegation(clause) &&
        (hasAffirmingVerb(clause) || hasAffirmingStatus(clause) || hasForbiddenStandaloneClaim(clause, claim));
      if (nonNegated || hasContradictoryClaim(clause, claim)) {
        matches.push({
          matched: true,
          blocker: claim.blocker,
          excerpt: clause,
          claimName: claim.name,
        });
      }
    }
  }
  return matches;
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

function checkInMemoryNegativeMutations() {
  assert(negativeMutations.length >= 49, `expected at least 49 negative mutations, found ${negativeMutations.length}`);
  const mutationClaims = negativeMutations.map((mutation) => ({
    name: mutation.name,
    blocker: mutation.blocker,
    pattern: mutation.expected,
  }));

  for (const mutation of negativeMutations) {
    const mutated = mutation.mutated;
    assert(Boolean(mutation.blocker), `${mutation.name} mutation must declare semantic blocker`);
    assert(mutated !== mutation.base, `${mutation.name} mutation must change text in memory`);
    const mutatedMatches = findForbiddenClaims(mutated, mutationClaims);
    const expectedMatch = mutatedMatches.find((match) => match.claimName === mutation.name);
    assert(
      Boolean(expectedMatch),
      `${mutation.name} should trigger ${mutation.blocker} through affirmative forbidden-claim detection`,
    );
    if (expectedMatch) {
      assert(
        expectedMatch.blocker === mutation.blocker,
        `${mutation.name} detected blocker ${expectedMatch.blocker} but expected ${mutation.blocker}`,
      );
      assert(Boolean(expectedMatch.excerpt), `${mutation.name} must return a useful excerpt`);
      assert(
        mutation.expected.test(expectedMatch.excerpt),
        `${mutation.name} excerpt must contain the prohibited action for ${mutation.blocker}`,
      );
    }
    const baseMatches = findForbiddenClaims(mutation.base, mutationClaims);
    assert(
      !baseMatches.some((match) => match.claimName === mutation.name),
      `${mutation.name} base text should remain accepted as local negation for ${mutation.blocker}`,
    );
  }
}

function main() {
  checkStaticHarnessPasses();
  checkGoldenDoc();
  checkInMemoryNegativeMutations();

  if (errors.length > 0) {
    console.error('FAIL reviewer_kernel golden checks');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('PASS reviewer_kernel golden checks');
}

main();
