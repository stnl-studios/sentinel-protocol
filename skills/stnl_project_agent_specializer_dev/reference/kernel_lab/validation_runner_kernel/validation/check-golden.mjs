#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const validationDir = dirname(scriptPath);
const kernelRoot = realpathSync.native(resolve(validationDir, '..'));
const repoRoot = realpathSync.native(resolve(kernelRoot, '..', '..', '..', '..', '..'));
const staticHarness = resolve(validationDir, 'check-static.mjs');
const goldenDoc = resolve(validationDir, 'GOLDEN_TESTS.md');

const errors = [];

const CROSS_CUT_NEGATIVES = Object.freeze([
  ['proof inflation', /proof inflation/i],
  ['invalid READY', /invalid\s+`?READY`?/i],
  ['irrelevant green output', /irrelevant green output/i],
  ['correction/verdict mix', /correction\/verdict mix/i],
  ['proof redesign', /proof redesign/i],
  ['correction/review drift', /correction\/review drift/i],
  ['closure/resync/durable docs drift', /closure\/resync\/durable docs drift/i],
  ['checklist edit', /checklist edit/i],
  ['temp paths', /temp paths/i],
  ['header-aware reading removal', /header-aware reading removal/i],
  ['docs/core/TESTING.md expansion beyond the cut', /docs\/core\/TESTING\.md[\s\S]{0,80}expansion beyond the cut/i],
]);

const FORBIDDEN_CROSS_CUT_CLAIMS = Object.freeze([
  [
    'docs/core/TESTING.md expansion beyond the cut',
    /docs\/core\/TESTING\.md[^.]*\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed)|expand|replace|substitute)[^.]*\b(?:beyond the cut|outside the cut|VALIDATION PACK|validation)\b/i,
  ],
  ['docs/core/TESTING.md proof outside VALIDATION PACK', /docs\/core\/TESTING\.md[^.]*\b(?:authoriz(?:e|es|ed)|permits?|allows?)[^.]*\b(?:proof|commands?)[^.]*\boutside[^.]*VALIDATION PACK/i],
  ['docs/core/TESTING.md replaces VALIDATION PACK', /docs\/core\/TESTING\.md[^.]*\b(?:replace|replaces|substitute|substitutes)[^.]*VALIDATION PACK/i],
  ['temp paths source of truth', /\btemp paths?[^.]*\b(?:source of truth|authoritative|primary source)\b|\b(?:source of truth|authoritative|primary source)[^.]*temp paths?\b/i],
  ['header-aware reading weakened', /header-aware reading[^.]*\b(?:removed|optional|weakened|not required|may be skipped)\b/i],
  ['QA CHECKLIST UPDATE edits checklist', /QA CHECKLIST UPDATE[^.]*\b(?:edits?|updates?|writes?)[^.]*`?qa_checklist\.md`?|checklist edit[^.]*\b(?:accepted|allowed|authorized)\b/i],
  ['proof inflation accepted', /proof inflation[^.]*\b(?:accepted|allowed|authorized)\b|inflated to `?PASS`?[^.]*\b(?:accepted|allowed|authorized)\b/i],
  ['invalid READY accepted', /invalid\s+`?READY`?[^.]*\b(?:validated|accepted|allowed|authorized)\b/i],
  ['irrelevant green accepted', /irrelevant green(?: output)?[^.]*\b(?:justifies|proves|validates|allows)[^.]*`?PASS`?/i],
  ['correction/verdict mix accepted', /correction\/verdict mix[^.]*\b(?:accepted|allowed|authorized)\b|CORRECTION PACK[^.]*\b(?:mixed|combined)[^.]*`?(?:PASS|PARTIAL|FAIL|BLOCKED)`?/i],
  ['proof redesign accepted', /proof redesign[^.]*\b(?:accepted|allowed|authorized)\b|redesign[^.]*VALIDATION PACK[^.]*\b(?:accepted|allowed|authorized)\b/i],
  ['correction/review drift accepted', /correction\/review drift[^.]*\b(?:accepted|allowed|authorized)\b|architecture review[^.]*\b(?:accepted|allowed|authorized)\b/i],
  ['closure/resync/durable docs drift accepted', /closure\/resync\/durable docs drift[^.]*\b(?:accepted|allowed|authorized)\b|(?:closure|resync|durable documentation)[^.]*\b(?:accepted|allowed|authorized)\b/i],
]);

const SCENARIOS = Object.freeze([
  {
    id: 'VR-GT-001',
    title: 'Direct proof allows PASS',
    expectedBlocker: 'BLOCKED_VR_PASS_WITHOUT_DIRECT_PROOF',
    required: {
      Objective: [/positive proof execution/i],
      'Input shape': [/VALIDATION PACK/, /READY[\s\S]{0,80}applied-change evidence/i, /directly prove/i],
      'Expected behavior': [/terminal `?PASS`?/i, /evidence per obligation/i, /QA CHECKLIST UPDATE/],
      'Fail condition': [/PASS[\s\S]{0,80}lacks direct/i],
    },
  },
  {
    id: 'VR-GT-002',
    title: 'Incomplete proof becomes PARTIAL',
    expectedBlocker: 'BLOCKED_VR_PARTIAL_INFLATED_OR_COLLAPSED',
    required: {
      Objective: [/partial validation/i],
      'Input shape': [/directly proved/i, /unproved/i, /blocked/i],
      'Expected behavior': [/terminal `?PARTIAL`?/i, /residual risk/i],
      'Fail condition': [/inflated to `?PASS`?/i, /ungrounded/i],
    },
  },
  {
    id: 'VR-GT-003',
    title: 'Disproven behavior becomes FAIL',
    expectedBlocker: 'BLOCKED_VR_FAIL_NOT_EMITTED_FOR_DISPROOF',
    required: {
      Objective: [/FAIL[\s\S]{0,80}disproven/i],
      'Input shape': [/violates a required pack obligation/i],
      'Expected behavior': [/terminal `?FAIL`?/i, /CORRECTION PACK/i],
      'Fail condition': [/softened into `?PARTIAL`?/i, /generic green output/i],
    },
  },
  {
    id: 'VR-GT-004',
    title: 'Missing proof becomes BLOCKED',
    expectedBlocker: 'BLOCKED_VR_MISSING_PROOF_ACCEPTED',
    required: {
      Objective: [/BLOCKED[\s\S]{0,80}infeasible[\s\S]{0,80}absent[\s\S]{0,80}invalid[\s\S]{0,80}prevented/i],
      'Input shape': [/fixtures/i, /invalid executor readiness/i, /prevent honest\s+proof execution/i],
      'Expected behavior': [/terminal `?BLOCKED`?/i, /minimum fact needed/i],
      'Fail condition': [/assumed success/i, /inferred proof/i, /reduced validation threshold/i],
    },
  },
  {
    id: 'VR-GT-005',
    title: 'Invalid executor READY is not validated',
    expectedBlocker: 'BLOCKED_VR_INVALID_EXECUTOR_READY_VALIDATED',
    required: {
      Objective: [/executor entry gate/i],
      'Input shape': [/READY[\s\S]{0,80}no applied-change evidence/i, /pseudo-implementation/i],
      'Expected behavior': [/Reject validation entry/i, /Do not\s+validate invalid `?READY`?/i],
      'Fail condition': [/validates the invalid executor output/i, /synthetic\s+verdict/i],
    },
  },
  {
    id: 'VR-GT-006',
    title: 'Correction pack is non-terminal and exclusive',
    expectedBlocker: 'BLOCKED_VR_CORRECTION_PACK_MIXED_WITH_VERDICT',
    required: {
      Objective: [/correction-loop handoff/i],
      'Input shape': [/corrigible issue/i, /correction budget/i],
      'Expected behavior': [/CORRECTION PACK/i, /Emit no terminal verdict/i],
      'Fail condition': [/treated as a verdict/i, /mixed with `?PASS`?/i],
    },
  },
  {
    id: 'VR-GT-007',
    title: 'Irrelevant green output is not proof',
    expectedBlocker: 'BLOCKED_VR_IRRELEVANT_GREEN_ACCEPTED',
    required: {
      Objective: [/validation theater/i],
      'Input shape': [/green[\s\S]{0,80}does not touch/i],
      'Expected behavior': [/limited or irrelevant signal/i, /unproved/i],
      'Fail condition': [/generic green output justifies `?PASS`?/i],
    },
  },
  {
    id: 'VR-GT-008',
    title: 'Runner does not redesign proof',
    expectedBlocker: 'BLOCKED_VR_VALIDATION_PACK_REDESIGNED',
    required: {
      Objective: [/separate from proof design/i],
      'Input shape': [/vague/i, /invented criteria/i],
      'Expected behavior': [/Do not rewrite the `?VALIDATION PACK`?/i, /do not\s+redesign proof/i],
      'Fail condition': [/proof redesign is accepted/i],
    },
  },
  {
    id: 'VR-GT-009',
    title: 'Runner does not correct or review architecture',
    expectedBlocker: 'BLOCKED_VR_RUNNER_ROLE_DRIFT',
    required: {
      Objective: [/separate from implementation and semantic review/i],
      'Input shape': [/patch code/i, /judge architecture/i, /replace `?reviewer`?/i],
      'Expected behavior': [/does not\s+correct code/i, /does not\s+review architecture/i],
      'Fail condition': [/code correction/i, /correction\/review drift/i, /architecture review/i],
    },
  },
  {
    id: 'VR-GT-010',
    title: 'Runner does not close, resync, or write durable docs',
    expectedBlocker: 'BLOCKED_VR_FINALIZER_OR_RESYNC_DRIFT',
    required: {
      Objective: [/finalizer-owned closure/i],
      'Input shape': [/durable documentation/i, /checklist files/i, /resync/i],
      'Expected behavior': [/Reject closure\/resync\/durable docs drift/i, /checklist handoff data/i],
      'Fail condition': [/checklist edit/i, /closure/i, /durable\s+documentation/i, /resync/i],
    },
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

function safeReadFile(absPath, root, label) {
  try {
    assert(existsSync(absPath), `${label} must exist`);
    const lst = lstatSync(absPath);
    assert(!lst.isSymbolicLink(), `${label} must not be a symlink`);
    const real = realpathSync.native(absPath);
    assert(isInside(root, real), `${label} escapes expected root`);
    const st = statSync(real);
    assert(st.isFile(), `${label} must be a regular file`);
    return readFileSync(real, 'utf8');
  } catch (error) {
    fail(`${label} is not readable as a safe file: ${error.message}`);
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

function requirePatterns(text, patterns, context) {
  for (const pattern of patterns) {
    assert(pattern.test(text), `${context} missing ${pattern}`);
  }
}

function sentences(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n|(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function isProhibitiveLocal(text) {
  return /\b(does not|do not|must not|cannot|can not|not|never|without|reject|rejects|block|blocks|prohibit|prohibits|prohibited|forbid|forbidden|unauthori[sz]|limited to|only for|sem|no)\b/i.test(
    text.replace(/\bnot\s+only\b/gi, 'not-only'),
  );
}

function hasForbiddenAffirmativeClaim(sentence, pattern) {
  if (!pattern.test(sentence)) {
    return false;
  }

  const clauses = sentence
    .split(/\b(?:but|however|though|although|except that)\b|;/i)
    .map((clause) => clause.trim())
    .filter(Boolean);

  if (clauses.some((clause) => pattern.test(clause) && !isProhibitiveLocal(clause))) {
    return true;
  }

  return !isProhibitiveLocal(sentence);
}

function runStaticFirst() {
  const result = spawnSync(process.execPath, [staticHarness], {
    cwd: repoRoot,
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    fail(
      [
        'check-static preflight failed',
        result.stdout.trim(),
        result.stderr.trim(),
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }
}

function validateCrossCutBoundaries(markdown) {
  const section = extractSection(markdown, /^Cross-Cut Boundaries$/i, 'Cross-Cut Boundaries');
  requirePatterns(
    section,
    [
      /docs\/core\/TESTING\.md[\s\S]{0,160}canonical commands[\s\S]{0,160}manual\s+paths[\s\S]{0,160}prerequisites[\s\S]{0,160}harness limits/i,
      /VALIDATION PACK[\s\S]{0,120}principal proof contract|principal proof contract[\s\S]{0,120}VALIDATION PACK/i,
      /Runtime temp paths[\s\S]{0,80}prohibited/i,
      /Header-aware reading[\s\S]{0,80}File Purpose Header metadata/i,
      /QA CHECKLIST UPDATE[\s\S]{0,80}handoff data/i,
      /does not edit\s+`?qa_checklist\.md`?/i,
    ],
    'Cross-Cut Boundaries',
  );

  for (const [label, pattern] of CROSS_CUT_NEGATIVES) {
    assert(pattern.test(section), `Cross-Cut Boundaries missing negative drift class: ${label}`);
  }

  for (const sentence of sentences(section)) {
    for (const [label, pattern] of FORBIDDEN_CROSS_CUT_CLAIMS) {
      assert(
        !hasForbiddenAffirmativeClaim(sentence, pattern),
        `Cross-Cut Boundaries contains forbidden ${label} claim: ${sentence}`,
      );
    }
  }
}

function validateScenario(markdown, scenario) {
  const section = extractSection(
    markdown,
    new RegExp(`^Golden Test ${scenario.id} - ${scenario.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
    scenario.id,
  );

  for (const [subheading, patterns] of Object.entries(scenario.required)) {
    const subsection = extractSection(section, new RegExp(`^${subheading}$`, 'i'), `${scenario.id} ${subheading}`);
    requirePatterns(subsection, patterns, `${scenario.id} ${subheading}`);
  }

  const blockerSection = extractSection(section, /^Expected blocker$/i, `${scenario.id} Expected blocker`);
  assert(blockerSection.includes(scenario.expectedBlocker), `${scenario.id} missing expected blocker ${scenario.expectedBlocker}`);
}

function validateScenarioIds(markdown) {
  const found = [];
  const idPattern = /^## Golden Test (VR-GT-\d{3}) - /gm;
  let match;
  while ((match = idPattern.exec(markdown)) !== null) {
    found.push(match[1]);
  }
  const expected = SCENARIOS.map((scenario) => scenario.id);
  assert(JSON.stringify(found) === JSON.stringify(expected), `Golden scenario ID order mismatch: ${found.join(', ')}`);
}

function main() {
  runStaticFirst();

  const markdown = safeReadFile(goldenDoc, kernelRoot, 'validation/GOLDEN_TESTS.md');
  validateCrossCutBoundaries(markdown);
  validateScenarioIds(markdown);

  for (const scenario of SCENARIOS) {
    validateScenario(markdown, scenario);
  }

  if (errors.length > 0) {
    console.error('check-golden: FAIL');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('check-golden: PASS');
  console.log('static preflight: PASS');
  console.log(`golden scenarios: ${SCENARIOS.length}`);
}

main();
