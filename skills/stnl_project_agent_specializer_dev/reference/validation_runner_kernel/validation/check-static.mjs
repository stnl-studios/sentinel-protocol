#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_FILES = Object.freeze([
  'README.md',
  'contracts/CONTRACT.md',
  'contracts/BEHAVIOR_PARITY_SPINE.md',
  'contracts/MINIMUM_SAFE_BUNDLE.md',
  'contracts/PROOF_EXECUTION_GATES.md',
  'validation/STATIC_CHECKS.md',
  'validation/GOLDEN_TESTS.md',
  'validation/check-static.mjs',
  'validation/check-golden.mjs',
]);

const MARKDOWN_FILES = Object.freeze([
  'README.md',
  'contracts/CONTRACT.md',
  'contracts/BEHAVIOR_PARITY_SPINE.md',
  'contracts/MINIMUM_SAFE_BUNDLE.md',
  'contracts/PROOF_EXECUTION_GATES.md',
  'validation/STATIC_CHECKS.md',
  'validation/GOLDEN_TESTS.md',
]);

const EXPECTED_MJS = Object.freeze([
  'validation/check-static.mjs',
  'validation/check-golden.mjs',
]);

const GLOBAL_DOCS = Object.freeze([
  'skills/stnl_project_agent_specializer_dev/README.md',
  'skills/stnl_project_agent_specializer_dev/SKILL.md',
  'skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md',
  'skills/stnl_project_agent_specializer_dev/reference/kernel_lab/README.md',
]);

const TEMPLATE_AGENT = 'templates/agents/validation-runner.agent.md';
const SNAPSHOT_AGENT =
  'skills/stnl_project_agent_specializer_dev/reference/agents/validation-runner.agent.md';

const STALE_CLAIM_PATTERNS = Object.freeze([
  [/no executable harness yet/i, 'stale no executable harness yet claim'],
  [/there is no\s+`?validation\/check-static\.mjs`?/i, 'stale missing check-static claim'],
  [/there is no\s+`?validation\/check-golden\.mjs`?/i, 'stale missing check-golden claim'],
  [/\bfuture only\b/i, 'stale future-only claim'],
  [/future static-check design/i, 'stale future static-check design claim'],
  [/future golden-test design/i, 'stale future golden-test design claim'],
  [/does not implement[\s\S]{0,120}harness/i, 'stale does-not-implement-harness claim'],
  [/without executable harness support/i, 'stale without-harness-support claim'],
  [/future checks only/i, 'stale future-checks-only claim'],
  [/future semantic scenarios only/i, 'stale future-scenarios-only claim'],
  [/no executable `.mjs` file is part/i, 'stale no executable mjs claim'],
]);

const DENIED_PATH_PATTERNS = Object.freeze([
  [/fixture/i, 'fixture path'],
  [/generated[-_ ]?report/i, 'generated report path'],
  [/runtime[-_ ]?loader/i, 'runtime loader path'],
  [/materiali[sz]ation[-_ ]?path/i, 'materialization path'],
  [/materializer/i, 'materializer path'],
  [/target[-_ ]?artifact/i, 'target artifact path'],
]);

const AUTHORIZATION_PATTERNS = Object.freeze([
  {
    label: 'kernel promotion',
    pattern: /\b(promotes?|promoted|promotion)\b/i,
    allowed:
      /\bnot promoted\b|does not[^.]*promote|do not[^.]*promote|must not[^.]*promote|not promote|reject|block|prohibit|drift scan|drift|does not make[^.]*promoted|kernel promotion\b[^.]*does not authorize|automatic promotion\b[^.]*does not|not[^.]*promotion/i,
  },
  {
    label: 'CLEAN_EXCELLENT_PASS accepted status',
    pattern: /\bCLEAN_EXCELLENT_PASS\b/i,
    allowed:
      /\bnot CLEAN_EXCELLENT_PASS\b|does not authorize\s+`?CLEAN_EXCELLENT_PASS`?|`?CLEAN_EXCELLENT_PASS`?[^.]*does not authorize|reject|block|prohibit/i,
  },
  {
    label: 'runtime authorization',
    pattern:
      /\b(authoriz(?:e|es|ed)[^.]*runtime|runtime loader|runtime loading|runtime artifacts?|runtime path)\b/i,
    allowed: /does not|do not|must not|not authorize|non-runtime|without|reject|block|prohibit|sem/i,
  },
  {
    label: 'production authorization',
    pattern: /\b(authoriz(?:e|es|ed)[^.]*production|production path|prod path)\b/i,
    allowed: /does not|do not|must not|not authorize|non-production|without|reject|block|prohibit|sem/i,
  },
  {
    label: 'materialization authorization',
    pattern:
      /\b(authoriz(?:e|es|ed)[^.]*materialization|materialization path|materializer|materialization, production)\b/i,
    allowed: /does not|do not|must not|not authorize|no materialization path|without|reject|block|prohibit|sem/i,
  },
  {
    label: 'fixture artifact authorization',
    pattern: /\b(authoriz(?:e|es|ed)[^.]*fixtures?|create fixtures?|fixture artifact)\b/i,
    allowed: /does not|do not|must not|not authorize|without|reject|block|prohibit/i,
  },
  {
    label: 'generated report authorization',
    pattern: /\b(authoriz(?:e|es|ed)[^.]*generated reports?|generated reports?)\b/i,
    allowed: /does not|do not|must not|not authorize|without|reject|block|prohibit/i,
  },
  {
    label: 'target artifact authorization',
    pattern: /\b(authoriz(?:e|es|ed)[^.]*target artifact|target artifact generation)\b/i,
    allowed: /does not|do not|must not|not authorize|without|reject|block|prohibit/i,
  },
  {
    label: 'productive skill/template update authorization',
    pattern:
      /\b(authoriz(?:e|es|ed)[^.]*productive-skill|productive-skill changes?|productive skill update|productive-template changes?|productive template update|template changes?)\b/i,
    allowed: /does not|do not|must not|not authorize|without|reject|block|prohibit/i,
  },
  {
    label: 'global docs update authorization',
    pattern: /\b(authoriz(?:e|es|ed)[^.]*global docs|global docs updates?)\b/i,
    allowed: /does not|do not|must not|not authorize|without|reject|block|prohibit|sem/i,
  },
]);

const errors = [];

const scriptPath = fileURLToPath(import.meta.url);
const validationDir = dirname(scriptPath);
const kernelRootCandidate = resolve(validationDir, '..');
const kernelRoot = realpathSync.native(kernelRootCandidate);
const repoRoot = realpathSync.native(resolve(kernelRoot, '..', '..', '..', '..'));

function fail(message) {
  errors.push(message);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function toPosix(path) {
  return path.split(sep).join('/');
}

function isInside(root, candidate) {
  const rel = relative(root, candidate);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

function assertInside(root, candidate, label) {
  assert(isInside(root, candidate), `${label} escapes expected root: ${candidate}`);
}

function safeStatFile(absPath, root, label) {
  try {
    const lst = lstatSync(absPath);
    assert(!lst.isSymbolicLink(), `${label} must not be a symlink`);
    const real = realpathSync.native(absPath);
    assertInside(root, real, label);
    const st = statSync(real);
    assert(st.isFile(), `${label} must be a regular file`);
    return { real, st };
  } catch (error) {
    fail(`${label} is not readable as a safe file: ${error.message}`);
    return null;
  }
}

function readKernelText(relPath) {
  const absPath = resolve(kernelRoot, relPath);
  const safe = safeStatFile(absPath, kernelRoot, relPath);
  if (!safe) {
    return '';
  }
  return readFileSync(safe.real, 'utf8');
}

function readRepoBuffer(relPath) {
  const absPath = resolve(repoRoot, relPath);
  const safe = safeStatFile(absPath, repoRoot, relPath);
  if (!safe) {
    return null;
  }
  return readFileSync(safe.real);
}

function walkKernel(dir) {
  const found = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === '__MACOSX' || entry.name === '.DS_Store') {
      continue;
    }

    const absPath = join(dir, entry.name);
    const lst = lstatSync(absPath);
    if (lst.isSymbolicLink()) {
      fail(`Symlink is not allowed in kernel bundle: ${toPosix(relative(kernelRoot, absPath))}`);
      continue;
    }

    const real = realpathSync.native(absPath);
    assertInside(kernelRoot, real, `walk path ${absPath}`);

    if (lst.isDirectory()) {
      found.push(...walkKernel(absPath));
      continue;
    }

    if (!lst.isFile()) {
      fail(`Non-regular filesystem entry is not allowed: ${toPosix(relative(kernelRoot, absPath))}`);
      continue;
    }

    const relPath = toPosix(relative(kernelRoot, absPath));
    found.push(relPath);
  }

  return found;
}

function uniqueDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  return [...duplicates];
}

function assertExactOrderedArray(actual, expected, label) {
  const duplicateEntries = uniqueDuplicates(actual);
  assert(duplicateEntries.length === 0, `${label} has duplicate entries: ${duplicateEntries.join(', ')}`);

  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const missing = expected.filter((entry) => !actualSet.has(entry));
  const extra = actual.filter((entry) => !expectedSet.has(entry));

  assert(missing.length === 0, `${label} missing entries: ${missing.join(', ')}`);
  assert(extra.length === 0, `${label} extra entries: ${extra.join(', ')}`);

  if (actual.length === expected.length) {
    for (let index = 0; index < expected.length; index += 1) {
      if (actual[index] !== expected[index]) {
        fail(`${label} order mismatch at ${index + 1}: expected ${expected[index]}, got ${actual[index]}`);
      }
    }
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

function extractPreamble(markdown) {
  const lines = markdown.split(/\r?\n/);
  const firstH2 = lines.findIndex((line) => /^##\s+/.test(line));
  return lines.slice(0, firstH2 === -1 ? lines.length : firstH2).join('\n');
}

function sentences(text) {
  const blocks = [];
  let current = '';

  const flush = () => {
    if (current.trim()) {
      blocks.push(current.trim());
    }
    current = '';
  };

  for (const rawLine of text.replace(/\r/g, '').split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }

    if (/^#{1,6}\s+/.test(line)) {
      flush();
      blocks.push(line);
      continue;
    }

    const listItem = /^(?:[-*]|\d+\.)\s+(.+)$/.exec(line);
    if (listItem) {
      flush();
      current = listItem[1];
      continue;
    }

    current = current ? `${current} ${line}` : line;
  }
  flush();

  return blocks
    .flatMap((block) => block.split(/(?<=[.!?])\s+/))
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function isProhibitiveLocal(sentence) {
  return /\b(does not|do not|must not|cannot|not|never|without|reject|rejects|rejected|block|blocks|blocked|prohibit|prohibited|forbid|forbidden|unauthoriz|limited to|sem|no)\b|non[- ]/i.test(
    sentence,
  );
}

function hasLocalProhibition(text, pattern) {
  for (const sentence of sentences(text)) {
    if (pattern.test(sentence) && isProhibitiveLocal(sentence)) {
      return true;
    }
  }
  return false;
}

function hasPositiveAnchor(text, anchor) {
  const pattern = anchor.pattern ?? anchor;
  const reject = anchor.reject;
  for (const sentence of sentences(text)) {
    if (pattern.test(sentence) && !(reject && reject.test(sentence))) {
      return true;
    }
  }
  return false;
}

function requirePositive(sectionText, anchor, context) {
  const label = anchor.label ?? String(anchor.pattern ?? anchor);
  if (!hasPositiveAnchor(sectionText, anchor)) {
    fail(`${context} missing required positive anchor: ${label}`);
  }
}

function requireNegative(sectionText, anchor, context) {
  const label = anchor.label ?? String(anchor.pattern);
  if (!hasLocalProhibition(sectionText, anchor.pattern)) {
    fail(`${context} missing required local prohibitive anchor: ${label}`);
  }
}

function validateReadmeBundleSection(readmeText) {
  const bundleSection = extractSection(readmeText, /^(Included Files|Bundle)$/i, 'README bundle');
  const entries = [];

  for (const line of bundleSection.split(/\r?\n/)) {
    const match = /^\s*(?:\d+\.|-)\s+`([^`]+)`/.exec(line);
    if (match) {
      entries.push(match[1]);
    }
  }

  assert(entries.length > 0, 'README bundle section has no parsed file entries');
  assertExactOrderedArray(entries, EXPECTED_FILES, 'README bundle section');
}

function validateNoStaleClaims(docs) {
  for (const [relPath, content] of Object.entries(docs)) {
    for (const [pattern, label] of STALE_CLAIM_PATTERNS) {
      if (pattern.test(content)) {
        fail(`${relPath} contains ${label}`);
      }
    }
  }
}

function validatePromotionRuntimeClaims(docs) {
  for (const [relPath, content] of Object.entries(docs)) {
    for (const sentence of sentences(content)) {
      for (const rule of AUTHORIZATION_PATTERNS) {
        if (rule.pattern.test(sentence) && !rule.allowed.test(sentence)) {
          fail(`${relPath} has non-prohibitive ${rule.label} claim: ${sentence}`);
        }
      }
    }
  }
}

function validateGlobalDocsClean() {
  try {
    const status = execFileSync('git', ['status', '--short', '--', ...GLOBAL_DOCS], {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    assert(status.trim() === '', `forbidden global docs are modified:\n${status.trim()}`);
  } catch (error) {
    fail(`Unable to verify forbidden global docs with git status: ${error.message}`);
  }
}

function validateSnapshotParity() {
  const template = readRepoBuffer(TEMPLATE_AGENT);
  const snapshot = readRepoBuffer(SNAPSHOT_AGENT);
  assert(template !== null, `missing canonical template ${TEMPLATE_AGENT}`);
  assert(snapshot !== null, `missing dev snapshot ${SNAPSHOT_AGENT}`);
  if (template && snapshot) {
    assert(template.equals(snapshot), 'dev snapshot is not byte-for-byte equal to canonical template');
  }
}

function validateFilesystemBundle() {
  const kernelLstat = lstatSync(kernelRootCandidate);
  assert(!kernelLstat.isSymbolicLink(), 'kernel root candidate must not be a symlink');
  assertInside(repoRoot, kernelRoot, 'kernel root');
  assertInside(kernelRoot, realpathSync.native(scriptPath), 'current harness script');

  const actualFiles = walkKernel(kernelRoot).sort();
  const expectedSorted = [...EXPECTED_FILES].sort();
  assertExactOrderedArray(actualFiles, expectedSorted, 'kernel filesystem allowlist');

  const caseKeys = actualFiles.map((entry) => entry.toLowerCase());
  const caseDuplicates = uniqueDuplicates(caseKeys);
  assert(caseDuplicates.length === 0, `case-folded duplicate paths: ${caseDuplicates.join(', ')}`);

  for (const relPath of actualFiles) {
    for (const [pattern, label] of DENIED_PATH_PATTERNS) {
      assert(!pattern.test(relPath), `disallowed ${label}: ${relPath}`);
    }

    const isScript = /\.(?:mjs|js)$/i.test(relPath);
    if (isScript && !EXPECTED_MJS.includes(relPath)) {
      fail(`unexpected JavaScript harness file: ${relPath}`);
    }
  }

  for (const relPath of EXPECTED_FILES) {
    safeStatFile(resolve(kernelRoot, relPath), kernelRoot, relPath);
  }
}

function validateHarnessSources() {
  const staticSource = readFileSync(scriptPath, 'utf8');
  const goldenSource = readKernelText('validation/check-golden.mjs');

  const staticRequired = [
    ['allowlist', /EXPECTED_FILES/],
    ['matrix by file and section', /ANCHOR_MATRIX/],
    ['local negation', /hasLocalProhibition|isProhibitiveLocal/],
    ['bundle by section', /validateReadmeBundleSection/],
    ['stale claim scan', /STALE_CLAIM_PATTERNS/],
    ['forbidden global docs', /GLOBAL_DOCS/],
  ];

  const goldenRequired = [
    ['static preflight', /runStaticFirst/],
    ['scenario matrix', /SCENARIOS/],
    ['VR-GT-001', /VR-GT-001/],
    ['VR-GT-010', /VR-GT-010/],
    ['expected blockers', /expectedBlocker/],
    ['proof inflation negative', /proof inflation/],
    ['invalid READY negative', /invalid `?READY`?/i],
    ['irrelevant green negative', /irrelevant green/],
    ['correction verdict mix negative', /correction\/verdict mix/],
    ['proof redesign negative', /proof redesign/],
    ['correction review drift negative', /correction\/review drift/],
    ['closure resync durable docs drift negative', /closure\/resync\/durable docs drift/],
    ['checklist edit negative', /checklist edit/],
    ['temp paths negative', /temp paths/],
    ['header-aware reading negative', /header-aware reading/],
    ['docs/core/TESTING cut limit negative', /docs\/core\/TESTING\.md/],
  ];

  for (const [label, pattern] of staticRequired) {
    assert(pattern.test(staticSource), `check-static source missing ${label}`);
  }

  for (const [label, pattern] of goldenRequired) {
    assert(pattern.test(goldenSource), `check-golden source missing ${label}`);
  }
}

const statusAnchors = Object.freeze([
  { label: 'initial draft', pattern: /initial draft/i },
  { label: 'not promoted', pattern: /not promoted/i },
  { label: 'not CLEAN_EXCELLENT_PASS', pattern: /not CLEAN_EXCELLENT_PASS/i },
  { label: 'dev kernel lab only', pattern: /dev kernel lab only/i },
  { label: 'non-runtime', pattern: /non-runtime/i },
  { label: 'non-production', pattern: /non-production/i },
  { label: 'no materialization path', pattern: /no materialization path/i },
  { label: 'harness textual exists', pattern: /textual executable harness now exists|harness textual exists/i },
  { label: 'harness does not promote', pattern: /harness pass does not promote/i },
]);

const ANCHOR_MATRIX = Object.freeze([
  {
    file: 'README.md',
    section: '__preamble__',
    requiredPositive: statusAnchors,
    requiredNegative: [
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materialization', pattern: /materialization/i },
      { label: 'no production', pattern: /production|prod/i },
    ],
  },
  {
    file: 'README.md',
    section: /^Included Files$/i,
    requiredPositive: [
      { label: '9-file bundle', pattern: /9-file post-harness bundle/i },
      { label: 'check-static listed', pattern: /validation\/check-static\.mjs/i },
      { label: 'check-golden listed', pattern: /validation\/check-golden\.mjs/i },
    ],
    requiredNegative: [],
  },
  {
    file: 'README.md',
    section: /^Scope Limits$/i,
    requiredPositive: [
      { label: 'proof-execution', pattern: /proof-execution/i },
      { label: 'VALIDATION PACK', pattern: /VALIDATION PACK/ },
      { label: 'READY applied evidence', pattern: /READY[\s\S]{0,120}applied-change evidence/i },
      { label: 'terminal verdicts', pattern: /PASS[\s\S]{0,80}PARTIAL[\s\S]{0,80}FAIL[\s\S]{0,80}BLOCKED/ },
      { label: 'sem runtime/materialization/prod', pattern: /sem runtime\/materialization\/prod/i },
    ],
    requiredNegative: [
      { label: 'no global docs', pattern: /global docs/i },
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materialization', pattern: /materialization/i },
      { label: 'no production', pattern: /production|prod/i },
    ],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Identity$/i,
    requiredPositive: [
      { label: 'validation-runner', pattern: /validation-runner/i },
      { label: '2026.5.1', pattern: /2026\.5\.1/ },
      { label: 'proof-execution', pattern: /proof-execution/i },
      { label: 'minimal-verification', pattern: /minimal-verification/i },
      { label: 'post implementation', pattern: /post-implementation|pós-implementação/i },
      { label: 'VALIDATION PACK', pattern: /VALIDATION PACK/ },
      { label: 'READY applied evidence', pattern: /READY[\s\S]{0,120}applied-change evidence/i },
    ],
    requiredNegative: [],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Input Contract$/i,
    requiredPositive: [
      { label: 'docs/core/TESTING.md', pattern: /docs\/core\/TESTING\.md/ },
      { label: 'canonical commands', pattern: /canonical commands/i },
      { label: 'manual paths', pattern: /manual paths/i },
      { label: 'prerequisites', pattern: /prerequisites/i },
      { label: 'harness limits', pattern: /harness limits/i },
    ],
    requiredNegative: [{ label: 'no proof redesign', pattern: /proof redesign/i }],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Proof Execution Contract$/i,
    requiredPositive: [
      { label: 'required optional not_applicable blocked_by_harness', pattern: /required[\s\S]{0,80}optional[\s\S]{0,80}not_applicable[\s\S]{0,80}blocked_by_harness/ },
      { label: 'direct evidence', pattern: /direct current-round execution|direct proof/i },
      { label: 'irrelevant green non-proof', pattern: /irrelevant green output[\s\S]{0,120}cannot justify `PASS`/i },
    ],
    requiredNegative: [{ label: 'green irrelevant not proof', pattern: /irrelevant green|generic command success/i }],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Verdict Contract$/i,
    requiredPositive: [
      {
        label: 'PASS requires direct proof',
        pattern: /`?PASS`? requires direct proof/i,
        reject: /`?PASS`? does not require direct proof/i,
      },
      { label: 'PASS PARTIAL FAIL BLOCKED', pattern: /PASS[\s\S]{0,80}PARTIAL[\s\S]{0,80}FAIL[\s\S]{0,80}BLOCKED/ },
      { label: 'FAIL disproven', pattern: /FAIL[\s\S]{0,80}behavior or contract[\s\S]{0,80}disproven/i },
      { label: 'BLOCKED infeasible absent invalid prevented', pattern: /BLOCKED[\s\S]{0,160}infeasible[\s\S]{0,80}absent[\s\S]{0,80}invalid[\s\S]{0,80}prevented/i },
    ],
    requiredNegative: [
      { label: 'PASS cannot rest on invalid proof', pattern: /PASS[\s\S]{0,120}cannot/i },
    ],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Correction Contract$/i,
    requiredPositive: [
      { label: 'CORRECTION PACK non-terminal', pattern: /CORRECTION PACK[\s\S]{0,120}non-terminal/i },
      { label: 'CORRECTION PACK mutually exclusive', pattern: /CORRECTION PACK[\s\S]{0,160}mutually exclusive/i },
    ],
    requiredNegative: [{ label: 'not terminal verdict', pattern: /terminal verdict|PASS|PARTIAL|FAIL|BLOCKED/i }],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^QA Checklist Contract$/i,
    requiredPositive: [
      { label: 'QA CHECKLIST UPDATE', pattern: /QA CHECKLIST UPDATE/ },
      { label: 'does not edit qa_checklist', pattern: /does not edit `?qa_checklist\.md`?/i },
    ],
    requiredNegative: [{ label: 'no checklist edit', pattern: /edit `?qa_checklist\.md`?/i }],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Prohibitions$/i,
    requiredPositive: [
      { label: 'no proof redesign', pattern: /redesign(?:ing)? `?VALIDATION PACK`?|proof redesign/i },
      { label: 'no code correction', pattern: /correct(?:ing)? code/i },
      { label: 'no architecture review', pattern: /review(?:ing)? architecture/i },
      { label: 'no closure', pattern: /clos(?:e|ing) the round/i },
      { label: 'no resync', pattern: /execut(?:e|ing) resync/i },
      { label: 'no durable docs', pattern: /edit(?:ing)? durable documentation/i },
    ],
    requiredNegative: [
      { label: 'no runtime/materialization/prod', pattern: /runtime|materialization|production/i },
    ],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Reading Contract$/i,
    requiredPositive: [
      { label: 'header-aware reading', pattern: /header-aware reading/i },
      { label: 'File Purpose Header metadata', pattern: /File Purpose Header metadata/i },
      { label: 'runtime temp paths prohibited', pattern: /runtime temp paths[\s\S]{0,80}source of truth/i },
      { label: 'docs/core/TESTING slice', pattern: /docs\/core\/TESTING\.md[\s\S]{0,160}canonical commands[\s\S]{0,120}manual paths[\s\S]{0,120}prerequisites[\s\S]{0,120}harness limits/i },
    ],
    requiredNegative: [{ label: 'runtime temp paths not source of truth', pattern: /runtime temp paths|runtime temporary files/i }],
  },
  {
    file: 'contracts/BEHAVIOR_PARITY_SPINE.md',
    section: /^Non-Reducible Semantics$/i,
    requiredPositive: [
      { label: 'non-reducible semantics', pattern: /non-reducible semantics/i },
      { label: 'correction exclusivity', pattern: /correction exclusivity/i },
      { label: 'PASS direct proof', pattern: /PASS[\s\S]{0,80}directly proved/i },
      { label: 'irrelevant green output non-proof', pattern: /irrelevant green output[\s\S]{0,40}non-proof/i },
    ],
    requiredNegative: [],
  },
  {
    file: 'contracts/BEHAVIOR_PARITY_SPINE.md',
    section: /^Required Boundary Behavior$/i,
    requiredPositive: [
      { label: 'role boundaries', pattern: /Role boundaries/i },
      { label: 'finalizer boundary', pattern: /finalizer boundary/i },
      { label: 'reviewer boundary', pattern: /reviewer boundary/i },
      { label: 'validation-eval-designer boundary', pattern: /validation-eval-designer boundary/i },
      { label: 'sem runtime', pattern: /sem runtime/i },
      { label: 'sem materialization', pattern: /sem materialization/i },
      { label: 'sem global docs update', pattern: /sem global docs update/i },
    ],
    requiredNegative: [
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materialization', pattern: /materialization/i },
      { label: 'no global docs', pattern: /global documentation|global docs/i },
    ],
  },
  {
    file: 'contracts/MINIMUM_SAFE_BUNDLE.md',
    section: /^Required Bundle Facts$/i,
    requiredPositive: [
      { label: '9-file post-harness bundle', pattern: /9-file post-harness bundle/i },
      { label: 'snapshot parity', pattern: /snapshot parity/i },
      { label: 'check-static', pattern: /validation\/check-static\.mjs/i },
      { label: 'check-golden', pattern: /validation\/check-golden\.mjs/i },
      { label: 'harness textual exists', pattern: /Harness textual exists|textual executable harness now exists/i },
      { label: 'harness does not promote', pattern: /harness pass does\s+not promote/i },
    ],
    requiredNegative: [
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materializer', pattern: /materializer/i },
      { label: 'no global docs', pattern: /global docs/i },
    ],
  },
  {
    file: 'contracts/MINIMUM_SAFE_BUNDLE.md',
    section: /^Minimum Identity Set$/i,
    requiredPositive: [
      { label: 'minimum identity set', pattern: /minimum identity set/i },
      { label: 'validation-runner', pattern: /validation-runner/i },
      { label: 'proof-execution', pattern: /proof-execution/i },
      { label: 'minimal-verification', pattern: /minimal-verification/i },
      { label: 'VALIDATION PACK', pattern: /VALIDATION PACK/ },
      { label: 'READY applied-change evidence', pattern: /READY[\s\S]{0,120}applied-change evidence/i },
    ],
    requiredNegative: [],
  },
  {
    file: 'contracts/MINIMUM_SAFE_BUNDLE.md',
    section: /^Minimum Evidence Set$/i,
    requiredPositive: [
      { label: 'minimum evidence set', pattern: /minimum evidence set/i },
      { label: 'direct evidence', pattern: /direct evidence/i },
      { label: 'irrelevant green', pattern: /irrelevant\s+green/i },
      { label: 'PASS rejection', pattern: /not enough for\s+`PASS`/i },
    ],
    requiredNegative: [{ label: 'reject proof inflation', pattern: /proof inflation|not enough for\s+`PASS`/i }],
  },
  {
    file: 'contracts/MINIMUM_SAFE_BUNDLE.md',
    section: /^Minimum Blocking Set$/i,
    requiredPositive: [
      { label: 'minimum blocking set', pattern: /minimum blocking set/i },
      { label: 'VALIDATION PACK missing', pattern: /VALIDATION PACK[\s\S]{0,120}missing/i },
      { label: 'READY missing', pattern: /READY[\s\S]{0,80}missing/i },
      { label: 'no concrete implementation', pattern: /no concrete implementation/i },
    ],
    requiredNegative: [{ label: 'no proof redesign', pattern: /redesigning proof|criteria invention|silent proof reduction/i }],
  },
  {
    file: 'contracts/MINIMUM_SAFE_BUNDLE.md',
    section: /^Minimum Boundary Set$/i,
    requiredPositive: [
      { label: 'minimum boundary set', pattern: /minimum boundary set/i },
      { label: 'runtime loader', pattern: /runtime loader/i },
      { label: 'materialization path', pattern: /materialization path/i },
      { label: 'global docs updates', pattern: /global docs updates/i },
      { label: 'kernel promotion', pattern: /kernel promotion/i },
    ],
    requiredNegative: [
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materializer', pattern: /materializer/i },
      { label: 'no global docs', pattern: /global docs/i },
    ],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 1 - Current-Round Proof Contract$/i,
    requiredPositive: [{ label: 'Gate 1 current-round proof contract', pattern: /Gate 1 current-round proof contract/i }],
    requiredNegative: [{ label: 'no redesign criteria invention', pattern: /redesign|invent/i }],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 2 - Valid Executor READY$/i,
    requiredPositive: [{ label: 'Gate 2 valid executor READY', pattern: /Gate 2 valid executor `?READY`?/i }],
    requiredNegative: [{ label: 'invalid READY not validated', pattern: /invalid readiness|READY without applied evidence/i }],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 3 - Concrete Implementation$/i,
    requiredPositive: [{ label: 'Gate 3 concrete implementation', pattern: /Gate 3 concrete implementation/i }],
    requiredNegative: [{ label: 'plan promise rejected', pattern: /plan|promise|unverifiable/i }],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 4 - Obligation-by-Obligation Evidence$/i,
    requiredPositive: [{ label: 'Gate 4 obligation-by-obligation evidence', pattern: /Gate 4 obligation-by-obligation evidence/i }],
    requiredNegative: [{ label: 'green irrelevant rejected', pattern: /generic green output|adjacent checks/i }],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 5 - Direct Proof Threshold$/i,
    requiredPositive: [{ label: 'Gate 5 direct proof threshold', pattern: /Gate 5 direct proof threshold/i }],
    requiredNegative: [{ label: 'inference cannot satisfy proof', pattern: /Inference|stale logs|intent|unscoped success/i }],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 6 - Verdict Selection$/i,
    requiredPositive: [
      { label: 'Gate 6 verdict selection', pattern: /Gate 6 verdict selection/i },
      { label: 'PASS PARTIAL FAIL BLOCKED', pattern: /PASS[\s\S]{0,80}PARTIAL[\s\S]{0,80}FAIL[\s\S]{0,80}BLOCKED/ },
    ],
    requiredNegative: [],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 7 - Correction Exclusivity$/i,
    requiredPositive: [
      { label: 'Gate 7 correction exclusivity', pattern: /Gate 7 correction exclusivity/i },
      { label: 'CORRECTION PACK', pattern: /CORRECTION PACK/i },
    ],
    requiredNegative: [{ label: 'no terminal verdict mix', pattern: /PASS|PARTIAL|FAIL|BLOCKED|architecture review|code fixing|replanning/i }],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 8 - Finalizer Handoff Evidence$/i,
    requiredPositive: [
      { label: 'Gate 8 finalizer handoff evidence', pattern: /Gate 8 finalizer handoff evidence/i },
      { label: 'QA CHECKLIST UPDATE', pattern: /QA CHECKLIST UPDATE/i },
    ],
    requiredNegative: [
      { label: 'no durable docs', pattern: /durable documentation/i },
      { label: 'no checklist edit', pattern: /checklist files|qa_checklist\.md/i },
      { label: 'no closure', pattern: /close the round|DONE/i },
      { label: 'no resync', pattern: /resync/i },
    ],
  },
  {
    file: 'validation/STATIC_CHECKS.md',
    section: /^Blocking Checks$/i,
    requiredPositive: [
      { label: 'checks bloqueantes', pattern: /checks bloqueantes/i },
      { label: 'allowlist exact', pattern: /exact allowlist|allowlist validation/i },
      { label: 'bundle by section', pattern: /bundle by section/i },
      { label: 'anchors by file', pattern: /anchors by file and section/i },
      { label: 'local negation', pattern: /negação local|local prohibitive/i },
      { label: 'stale claim scan', pattern: /stale-claim scan|stale claim/i },
      { label: 'docs globais proibidos', pattern: /docs globais proibidos/i },
    ],
    requiredNegative: [],
  },
  {
    file: 'validation/STATIC_CHECKS.md',
    section: /^Exact Allowlist$/i,
    requiredPositive: [
      { label: 'allowlist exata', pattern: /allowlist exata/i },
      { label: 'check-static', pattern: /validation\/check-static\.mjs/i },
      { label: 'check-golden', pattern: /validation\/check-golden\.mjs/i },
      { label: 'ignored __MACOSX .DS_Store', pattern: /__MACOSX[\s\S]{0,80}\.DS_Store/i },
    ],
    requiredNegative: [{ label: 'no other js mjs', pattern: /\.js|\.mjs/i }],
  },
  {
    file: 'validation/STATIC_CHECKS.md',
    section: /^Section Anchors$/i,
    requiredPositive: [
      { label: 'matrix owner file/section', pattern: /owner\s+file\/section|file\/section/i },
      { label: 'no paths.some substitute', pattern: /does not use a `paths\.some\(\.\.\.\)` substitute/i },
      { label: 'positive local affirmative', pattern: /Positive anchors[\s\S]{0,120}local affirmative/i },
      { label: 'prohibitive local', pattern: /Prohibitive anchors[\s\S]{0,120}local prohibitive/i },
      { label: 'contradiction local fails', pattern: /Contradiction local fails/i },
    ],
    requiredNegative: [],
  },
  {
    file: 'validation/STATIC_CHECKS.md',
    section: /^Negative Mutations$/i,
    requiredPositive: [
      { label: 'mutacoes negativas', pattern: /mutações negativas/i },
      { label: 'harness does not promote', pattern: /promotes the kernel|harness pass promotes/i },
      { label: 'runtime loader', pattern: /runtime loader/i },
      { label: 'materialization path', pattern: /materialization path/i },
      { label: 'fixture artifact', pattern: /fixture artifact/i },
      { label: 'generated report', pattern: /generated report/i },
      { label: 'PASS requires direct proof example', pattern: /PASS requires direct proof/i },
      { label: 'PASS does not require direct proof example', pattern: /PASS does not require direct proof/i },
    ],
    requiredNegative: [
      { label: 'reject stale claims', pattern: /stale claims/i },
      { label: 'reject promotion', pattern: /promotes the kernel|CLEAN_EXCELLENT_PASS/i },
      { label: 'reject runtime', pattern: /runtime loader/i },
      { label: 'reject materialization', pattern: /materialization path|materializer/i },
      { label: 'reject global docs', pattern: /global docs update/i },
    ],
  },
  {
    file: 'validation/GOLDEN_TESTS.md',
    section: /^Cross-Cut Boundaries$/i,
    requiredPositive: [
      { label: 'docs/core/TESTING.md cut limit', pattern: /docs\/core\/TESTING\.md[\s\S]{0,120}canonical commands[\s\S]{0,120}manual[\s\S]{0,120}prerequisites[\s\S]{0,120}harness limits/i },
      { label: 'runtime temp paths prohibited', pattern: /Runtime temp paths[\s\S]{0,80}prohibited/i },
      { label: 'header-aware reading', pattern: /Header-aware reading[\s\S]{0,80}File Purpose Header metadata/i },
      { label: 'QA CHECKLIST UPDATE handoff data', pattern: /QA CHECKLIST UPDATE[\s\S]{0,80}handoff data/i },
      { label: 'negative drift classes', pattern: /proof inflation[\s\S]{0,120}invalid `?READY`?[\s\S]{0,120}irrelevant green/i },
    ],
    requiredNegative: [
      { label: 'no runtime temp paths as source', pattern: /Runtime temp paths/i },
      { label: 'no checklist edit', pattern: /edit\s+`?qa_checklist\.md`?/i },
    ],
  },
]);

function validateAnchorMatrix(docs) {
  for (const matrixItem of ANCHOR_MATRIX) {
    const markdown = docs[matrixItem.file];
    assert(markdown !== undefined, `anchor matrix file missing from docs: ${matrixItem.file}`);
    if (!markdown) {
      continue;
    }

    const sectionText =
      matrixItem.section === '__preamble__'
        ? extractPreamble(markdown)
        : extractSection(markdown, matrixItem.section, `${matrixItem.file} ${matrixItem.section}`);
    const context = `${matrixItem.file} ${String(matrixItem.section)}`;

    for (const anchor of matrixItem.requiredPositive) {
      requirePositive(sectionText, anchor, context);
    }
    for (const anchor of matrixItem.requiredNegative) {
      requireNegative(sectionText, anchor, context);
    }
  }
}

function runLocalNegationSelfTest() {
  const passRequires = {
    pattern: /PASS requires direct proof/i,
    reject: /PASS does not require direct proof/i,
  };

  assert(
    hasPositiveAnchor('PASS requires direct proof.', passRequires),
    'local negation self-test failed: positive direct-proof anchor did not pass',
  );
  assert(
    !hasPositiveAnchor('PASS does not require direct proof.', passRequires),
    'local negation self-test failed: negated direct-proof anchor passed',
  );
}

function main() {
  runLocalNegationSelfTest();
  validateFilesystemBundle();
  validateSnapshotParity();

  const docs = {};
  for (const relPath of MARKDOWN_FILES) {
    docs[relPath] = readKernelText(relPath);
  }

  validateReadmeBundleSection(docs['README.md']);
  validateNoStaleClaims(docs);
  validatePromotionRuntimeClaims(docs);
  validateAnchorMatrix(docs);
  validateHarnessSources();
  validateGlobalDocsClean();

  if (errors.length > 0) {
    console.error('check-static: FAIL');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('check-static: PASS');
  console.log(`allowlist files: ${EXPECTED_FILES.length}`);
  console.log('snapshot parity: PASS');
  console.log('global docs status: clean');
}

main();
