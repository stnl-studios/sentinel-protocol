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
    name: 'promoted runtime claim',
    base: 'Status: `REVIEWER_KERNEL: INITIAL_DRAFT`.\nThis kernel is not runtime.',
    mutate: () => 'Reviewer authorizes runtime and production ready behavior.',
    expected: /runtime|production/i,
  },
  {
    name: 'correction pack mixed with pass',
    base: '`CORRECTION PACK` is mutually exclusive with `PASS` and `FAIL`.',
    mutate: () => '`CORRECTION PACK` may be emitted with `PASS` when useful.',
    expected: /PASS/i,
  },
  {
    name: 'reviewer replaces runner',
    base: 'Reviewer does not run validation and does not replace `validation-runner`.',
    mutate: () => 'Reviewer may run validation and replace `validation-runner`.',
    expected: /run validation|replace/i,
  },
  {
    name: 'reviewer edits code',
    base: 'Reviewer does not edit code or apply patches.',
    mutate: () => 'Reviewer can edit code and apply patches.',
    expected: /edit code|apply patches/i,
  },
  {
    name: 'reading broad discovery',
    base: 'Reviewer must not reopen discovery, scan repo-wide, or use runtime temp paths as Sentinel source of truth.',
    mutate: () => 'Reviewer may reopen discovery, scan repo-wide, and use runtime temp paths as Sentinel source of truth.',
    expected: /reopen discovery|runtime temp paths/i,
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
  return /\b(?:no|not|never|without|does not|do not|must not|cannot|can not|rejects?|blocks?|prohibits?|forbidden|unauthori[sz]ed|unsafe if|fail if|fail condition)\b/i.test(
    clause,
  );
}

function hasAffirmingVerb(clause) {
  return /\b(?:may|can|could|allows?|permits?|authori[sz](?:e|es|ed)|owns?|executes?|runs?|writes?|creates?|decides?|replaces?|implements?|promotes?)\b/i.test(
    clause,
  );
}

function catchesAffirmativeClaim(text, pattern) {
  return splitClauses(text).some(
    (clause) => pattern.test(clause) && hasAffirmingVerb(clause) && !hasLocalNegation(clause),
  );
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
  for (const mutation of negativeMutations) {
    const mutated = mutation.mutate(mutation.base);
    assert(mutated !== mutation.base, `${mutation.name} mutation must change text in memory`);
    assert(
      catchesAffirmativeClaim(mutated, mutation.expected),
      `${mutation.name} should be detected as an affirmative forbidden claim`,
    );
    assert(
      !catchesAffirmativeClaim(mutation.base, mutation.expected),
      `${mutation.name} base text should remain accepted as local negation`,
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
