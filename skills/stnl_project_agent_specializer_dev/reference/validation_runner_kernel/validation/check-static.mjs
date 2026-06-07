#!/usr/bin/env node
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

const PROMOTED_KERNELS = Object.freeze([
  'orchestrator_kernel',
  'planner_kernel',
  'validation_eval_designer_kernel',
  'execution_package_designer_kernel',
  'designer_kernel',
  'coder_frontend_kernel',
  'coder_backend_kernel',
  'validation_runner_kernel',
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
  [/\binitial draft\b/i, 'stale initial draft status'],
  [/\bnot promoted\b/i, 'stale not promoted status'],
  [/\bnot CLEAN_EXCELLENT_PASS\b/i, 'stale not CLEAN_EXCELLENT_PASS status'],
  [/\bnão foi promovido\b/i, 'stale Portuguese not-promoted status'],
  [/\bnao foi promovido\b/i, 'stale Portuguese not-promoted status'],
]);

const FORBIDDEN_PASS_CONTRADICTION_PATTERNS = Object.freeze([
  [/`?PASS`?\s+does\s+not\s+require\s+direct proof/i, 'PASS does not require direct proof'],
  [/`?PASS`?\s+can\s+pass\s+without\s+direct proof/i, 'PASS can pass without direct proof'],
  [/`?PASS`?\s+may\s+pass\s+without\s+direct proof/i, 'PASS may pass without direct proof'],
  [/`?PASS`?\s+may\s+be\s+based\s+on\s+inferred evidence/i, 'PASS may be based on inferred evidence'],
  [/`?PASS`?\s+may\s+rest\s+on\s+inferred evidence/i, 'PASS may rest on inferred evidence'],
  [
    /`?PASS`?\s+may\s+rest\s+on\s+green output unrelated to the cut/i,
    'PASS may rest on green output unrelated to the cut',
  ],
  [/`?PASS`?\s+may\s+rest\s+on\s+invalid executor readiness/i, 'PASS may rest on invalid executor readiness'],
  [/`?PASS`?\s+may\s+rest\s+on\s+missing required checks/i, 'PASS may rest on missing required checks'],
  [/`?PASS`?\s+can\s+rest\s+on\s+missing required checks/i, 'PASS can rest on missing required checks'],
  [
    /`?PASS`?\s+may\s+be\s+justified\s+by\s+generic green output/i,
    'PASS may be justified by generic green output',
  ],
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
    label: 'runtime authorization',
    trigger:
      /\b(authoriz(?:e|es|ed)[^.]*runtime|runtime loader|runtime loading|runtime artifacts?|runtime path|may\s+create[^.]*runtime)\b/i,
    target: /\bruntime(?:\s+(?:loader|loading|artifacts?|path))?\b/i,
  },
  {
    label: 'production authorization',
    trigger: /\b(authoriz(?:e|es|ed)[^.]*production|production path|prod path)\b/i,
    target: /\bproduction|prod path\b/i,
  },
  {
    label: 'materialization authorization',
    trigger:
      /\b(authoriz(?:e|es|ed)[^.]*materiali[sz]ation|materiali[sz]ation path|materializer|may\s+create[^.]*materiali[sz]ation)\b/i,
    target: /\bmateriali[sz]ation(?:\s+path)?\b|\bmaterializer\b/i,
  },
  {
    label: 'fixture artifact authorization',
    trigger: /\b(authoriz(?:e|es|ed)[^.]*fixtures?|create fixtures?|fixture artifact)\b/i,
    target: /\bfixtures?|fixture artifact\b/i,
  },
  {
    label: 'generated report authorization',
    trigger: /\b(authoriz(?:e|es|ed)[^.]*generated reports?|generated reports?)\b/i,
    target: /\bgenerated reports?\b/i,
  },
  {
    label: 'target artifact authorization',
    trigger:
      /\b(?:(?:may|can|could)\s+(?:create|generate|write)[^.]*target artifacts?|(?:allows?|permits?|authoriz(?:e|es|ed))[^.]*target artifacts?(?:\s+generation)?|target artifact generation)\b/i,
    target: /\btarget artifacts?(?:\s+generation)?\b/i,
  },
  {
    label: 'productive skill/template update authorization',
    trigger:
      /\b(authoriz(?:e|es|ed)[^.]*productive-skill|productive-skill changes?|productive skill update|productive-template changes?|productive template update|template changes?)\b/i,
    target: /\bproductive[- ]skill|productive[- ]template|template changes?\b/i,
  },
  {
    label: 'global docs update authorization',
    trigger: /\b(authoriz(?:e|es|ed)[^.]*global docs|global docs updates?|may\s+update[^.]*global docs)\b/i,
    target: /\bglobal docs(?: updates?)?\b/i,
  },
  {
    label: 'proof redesign authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:redesign(?:\s+the)?\s+`?VALIDATION PACK`?|proof redesign)\b/i,
    target: /\bredesign(?:\s+the)?\s+`?VALIDATION PACK`?|\bproof redesign\b/i,
  },
  {
    label: 'code correction authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:correct code|code correction|code fixing)\b/i,
    target: /\bcorrect code|code correction|code fixing\b/i,
  },
  {
    label: 'architecture review authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:review architecture|architecture review|judge architecture)\b/i,
    target: /\breview architecture|architecture review|judge architecture\b/i,
  },
  {
    label: 'closure authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:close the round|create `?DONE`?|closure)\b/i,
    target: /\bclose the round|create `?DONE`?|\bclosure\b/i,
  },
  {
    label: 'resync authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:perform resync|execute resync|resync)\b/i,
    target: /\bperform resync|execute resync|\bresync\b/i,
  },
  {
    label: 'durable docs authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:edit durable documentation|write durable documentation|durable docs?)\b/i,
    target: /\bedit durable documentation|write durable documentation|durable docs?\b/i,
  },
  {
    label: 'qa checklist edit authorization',
    trigger: /\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed))[^.]*\b(?:edit\s+`?qa_checklist\.md`?|checklist edit)\b/i,
    target: /\bedit\s+`?qa_checklist\.md`?|\bchecklist edit\b/i,
  },
  {
    label: 'docs/core/TESTING.md expansion authorization',
    trigger:
      /docs\/core\/TESTING\.md[^.]*\b(?:may|can|could|allows?|permits?|authoriz(?:e|es|ed)|expand|replace|substitute)[^.]*\b(?:beyond the cut|outside the cut|VALIDATION PACK|validation)\b/i,
    target: /docs\/core\/TESTING\.md|beyond the cut|outside the cut|VALIDATION PACK/i,
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

function cloneRegex(pattern, forceGlobal = false) {
  const flags = new Set(pattern.flags);
  if (forceGlobal) {
    flags.add('g');
  } else {
    flags.delete('g');
  }
  return new RegExp(pattern.source, [...flags].join(''));
}

function regexMatches(pattern, text) {
  const matcher = cloneRegex(pattern, true);
  const matches = [];
  let match;
  while ((match = matcher.exec(text)) !== null) {
    matches.push({
      text: match[0],
      index: match.index,
      end: match.index + match[0].length,
    });
    if (match[0].length === 0) {
      matcher.lastIndex += 1;
    }
  }
  return matches;
}

function lastBoundaryIndex(prefix) {
  let boundary = 0;
  const boundaryPattern =
    /[;:]|\b(?:but|however|though|although|except that)\b|\band\s+(?=(?:this\s+harness\s+|the\s+runner\s+|the\s+kernel\s+)?(?:authoriz|may|can|could|allows?|permits?|creates?|updates?|edits?|performs?|reviews?|corrects?|closes?|redesigns?))/gi;
  let match;
  while ((match = boundaryPattern.exec(prefix)) !== null) {
    boundary = match.index + match[0].length;
  }
  return boundary;
}

function nextBoundaryIndex(suffix) {
  const boundaryPattern =
    /[;:]|\b(?:but|however|though|although|except that)\b|\band\s+(?=(?:this\s+harness\s+|the\s+runner\s+|the\s+kernel\s+)?(?:authoriz|may|can|could|allows?|permits?|creates?|updates?|edits?|performs?|reviews?|corrects?|closes?|redesigns?))/i;
  const match = boundaryPattern.exec(suffix);
  return match ? match.index : suffix.length;
}

function localClaimContext(sentence, start, end) {
  const prefix = sentence.slice(0, start);
  const suffix = sentence.slice(end);
  const localStart = lastBoundaryIndex(prefix);
  const localEnd = end + nextBoundaryIndex(suffix);
  return sentence.slice(localStart, localEnd).trim();
}

function sanitizeNegationText(text) {
  return text
    .replace(/`BLOCKED`/gi, '`TERMINAL_BLOCKED`')
    .replace(/\bnot\s+only\b/gi, 'not-only')
    .replace(/\bnot\s+applicable\b/gi, 'not-applicable');
}

function isProhibitiveLocal(sentence) {
  const local = sanitizeNegationText(sentence);
  return /\b(does not|do not|must not|shall not|should not|may not|cannot|can not|is not|are not|not|never|without|reject|rejects|rejected|block(?:s|ed)?(?=\s+(?:when|if|unless|or|and|the|validation|proof|condition))|prohibit|prohibits|prohibited|forbid|forbids|forbidden|unauthori[sz]|limited to|only for|read only|sem|no)\b|\bnon[- ](?:runtime|production|proof)\b/i.test(
    local,
  );
}

function classifyLocalClaim(text, anchor) {
  const pattern = anchor.pattern ?? anchor;
  const reject = anchor.reject;
  const result = {
    matched: false,
    affirmative: false,
    prohibitive: false,
    contradictory: false,
    contradictorySentence: '',
  };

  for (const sentence of sentences(text)) {
    const matches = regexMatches(pattern, sentence);
    if (matches.length === 0) {
      continue;
    }

    let sentenceAffirmative = false;
    let sentenceProhibitive = false;

    for (const match of matches) {
      result.matched = true;
      const local = localClaimContext(sentence, match.index, match.end);
      const rejected = reject ? reject.test(sentence) || reject.test(local) : false;
      const prohibited = rejected || isProhibitiveLocal(local);

      if (prohibited) {
        result.prohibitive = true;
        sentenceProhibitive = true;
      } else {
        result.affirmative = true;
        sentenceAffirmative = true;
      }
    }

    if (sentenceAffirmative && sentenceProhibitive) {
      result.contradictory = true;
      result.contradictorySentence = sentence;
    }
  }

  return result;
}

function hasLocalProhibition(text, anchor) {
  const claim = classifyLocalClaim(text, anchor);
  return claim.prohibitive && !claim.contradictory;
}

function hasPositiveAnchor(text, anchor) {
  const polarity = anchor.polarity ?? 'presence';
  if (polarity === 'affirmative') {
    const claim = classifyLocalClaim(text, anchor);
    return claim.affirmative && !claim.contradictory;
  }
  if (polarity === 'prohibitive') {
    return hasLocalProhibition(text, anchor);
  }

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
  const claim = anchor.polarity ? classifyLocalClaim(sectionText, anchor) : null;
  if (claim?.contradictory) {
    fail(`${context} has contradictory local claim for positive anchor ${label}: ${claim.contradictorySentence}`);
    return;
  }
  if (!hasPositiveAnchor(sectionText, anchor)) {
    fail(`${context} missing required positive anchor: ${label}`);
  }
}

function requireNegative(sectionText, anchor, context) {
  const label = anchor.label ?? String(anchor.pattern);
  const claim = classifyLocalClaim(sectionText, anchor);
  if (claim.contradictory) {
    fail(`${context} has contradictory local claim for prohibitive anchor ${label}: ${claim.contradictorySentence}`);
    return;
  }
  if (!hasLocalProhibition(sectionText, anchor)) {
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

function isRejectedPassContradictionExample(sentence, match) {
  const suffix = sentence.slice(match.end);
  return /^`?\s*(?:fails?|must fail|should fail|is rejected|must be rejected|is forbidden|is prohibited)\b/i.test(
    suffix,
  );
}

function forbiddenPassContradictionClaim(sentence) {
  for (const [pattern, label] of FORBIDDEN_PASS_CONTRADICTION_PATTERNS) {
    for (const match of regexMatches(pattern, sentence)) {
      if (!isRejectedPassContradictionExample(sentence, match)) {
        return label;
      }
    }
  }

  return null;
}

function hasForbiddenPassContradiction(text) {
  return sentences(text).some((sentence) => forbiddenPassContradictionClaim(sentence));
}

function validateNoPassContradictions(docs) {
  for (const [relPath, content] of Object.entries(docs)) {
    for (const sentence of sentences(content)) {
      const label = forbiddenPassContradictionClaim(sentence);
      if (label) {
        fail(`${relPath} contains forbidden direct-proof contradiction (${label}): ${sentence}`);
      }
    }
  }
}

function validatePromotionRuntimeClaims(docs) {
  for (const [relPath, content] of Object.entries(docs)) {
    for (const sentence of sentences(content)) {
      for (const rule of AUTHORIZATION_PATTERNS) {
        const forbidden = forbiddenAuthorizationClaim(sentence, rule);
        if (forbidden === 'contradictory') {
          fail(`${relPath} has contradictory ${rule.label} claim: ${sentence}`);
          continue;
        }
        if (forbidden === 'affirmative') {
          fail(`${relPath} has non-prohibitive ${rule.label} claim: ${sentence}`);
        }
      }
    }
  }
}

function forbiddenAuthorizationClaim(sentence, rule) {
  if (!rule.trigger.test(sentence)) {
    return false;
  }
  const claim = classifyLocalClaim(sentence, { pattern: rule.target });
  if (claim.contradictory) {
    return 'contradictory';
  }
  if (!claim.prohibitive || claim.affirmative) {
    return 'affirmative';
  }
  return false;
}

function validateGlobalDocsCoherent() {
  for (const relPath of GLOBAL_DOCS) {
    const buffer = readRepoBuffer(relPath);
    const content = buffer ? buffer.toString('utf8') : '';
    const context = `global doc ${relPath}`;

    assert(/\b(?:eight|oito)\b/i.test(content), `${context} must state the eight promoted kernels`);
    assert(!/\b(?:all\s+seven|seven\s+frozen\s+pass|seven\s+passes|sete\s+kernels|sete\s+passes)\b/i.test(content), `${context} contains stale seven-kernel status`);

    for (const kernel of PROMOTED_KERNELS) {
      assert(content.includes(kernel), `${context} missing promoted kernel ${kernel}`);
    }

    assert(
      /VALIDATION_RUNNER_KERNEL:\s*CLEAN_EXCELLENT_PASS/.test(content),
      `${context} missing validation runner clean pass status`,
    );
    assert(/dev kernel lab|kernel lab dev/i.test(content), `${context} missing dev kernel lab limit`);
    assert(/document(?:ary|al)|documental/i.test(content), `${context} missing documentary promotion scope`);
    assert(/runtime/i.test(content), `${context} missing runtime prohibition`);
    assert(/materiali[sz]ation|materialização/i.test(content), `${context} missing materialization prohibition`);
    assert(/materializer/i.test(content), `${context} missing materializer prohibition`);
    assert(/GitHub/i.test(content), `${context} missing GitHub write prohibition`);
    assert(/repo alvo|target repo|target-repository/i.test(content), `${context} missing target repo prohibition`);
    assert(/productive-skill|skill produtiva/i.test(content), `${context} missing productive skill prohibition`);
    assert(/template mutation|canonical-template|templates canônicos/i.test(content), `${context} missing template mutation prohibition`);
    assert(/target artifacts?/i.test(content), `${context} missing target artifact prohibition`);
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
    ['PASS contradiction scan', /FORBIDDEN_PASS_CONTRADICTION_PATTERNS/],
    ['global docs coherence', /validateGlobalDocsCoherent|GLOBAL_DOCS/],
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

const validationPackConsumedAnchor = Object.freeze({
  label: 'VALIDATION PACK consumed',
  pattern: /consumes?\s+the\s+current-round\s+`?VALIDATION PACK`?|strict\s+(?:`?VALIDATION PACK`?\s+consumption|consumption\s+of\s+the\s+current-round\s+`?VALIDATION PACK`?)/i,
  polarity: 'affirmative',
});

const validationPackPresentAnchor = Object.freeze({
  label: 'VALIDATION PACK present',
  pattern: /current-round\s+`?VALIDATION PACK`?\s+(?:exists|is present)|`?VALIDATION PACK`?\s+is\s+present|current-round\s+`?VALIDATION PACK`?/i,
  polarity: 'affirmative',
});

const readyAppliedEvidenceAnchor = Object.freeze({
  label: 'READY applied-change evidence',
  pattern: /valid\s+(?:terminal\s+)?(?:executor\s+)?`?READY`?[\s\S]{0,120}applied-change\s+evidence|`?READY`?\s+includes\s+applied-change\s+evidence|`?READY`?\s+handoff\s+with\s+applied-change\s+evidence/i,
  polarity: 'affirmative',
});

const passDirectProofAnchor = Object.freeze({
  label: 'PASS requires direct proof',
  pattern: /`?PASS`?\s+requires\s+direct proof|`?PASS`?\s+only\s+when[\s\S]{0,80}direct(?:ly)?\s+proved|`?PASS`?\s+[\s\S]{0,40}direct proof/i,
  reject: /`?PASS`?[\s\S]{0,40}does not require direct proof|`?PASS`?[\s\S]{0,80}without direct proof/i,
  polarity: 'affirmative',
});

const docsTestingCutLimitAnchor = Object.freeze({
  label: 'docs/core/TESTING.md cut limit',
  pattern:
    /(?:docs\/core\/TESTING\.md[\s\S]{0,180}(?:limited to|only for)[\s\S]{0,160}canonical commands[\s\S]{0,160}manual\s+paths[\s\S]{0,160}prerequisites[\s\S]{0,160}harness limits|only[\s\S]{0,80}docs\/core\/TESTING\.md[\s\S]{0,180}canonical commands[\s\S]{0,160}manual\s+paths[\s\S]{0,160}prerequisites[\s\S]{0,160}harness limits)/i,
  polarity: 'prohibitive',
});

const statusAnchors = Object.freeze([
  { label: 'CLEAN_EXCELLENT_PASS status', pattern: /VALIDATION_RUNNER_KERNEL:\s*CLEAN_EXCELLENT_PASS/i },
  { label: 'documentary promotion applied', pattern: /documentary promotion applied/i },
  { label: 'documentary validation pass', pattern: /documentary validation pass/i },
  { label: 'contractual pass', pattern: /contractual pass/i },
  { label: 'minimum semantic pass', pattern: /minimum semantic pass/i },
  { label: 'hardened textual executable harness pass', pattern: /hardened textual executable harness pass/i },
  { label: 'dev kernel lab only', pattern: /dev kernel lab only/i },
  { label: 'non-runtime', pattern: /non-runtime/i },
  { label: 'non-production', pattern: /non-production/i },
  { label: 'no materialization path', pattern: /no materialization path/i },
  { label: 'no runtime loader', pattern: /no runtime loader/i },
  { label: 'no materializer', pattern: /no materializer/i },
  { label: 'no target artifact', pattern: /no target artifact/i },
  { label: 'no productive skill activation', pattern: /no productive skill activation/i },
  { label: 'no template mutation', pattern: /no template mutation/i },
  { label: 'harness textual exists', pattern: /textual executable harness now exists|harness textual exists/i },
  { label: 'harness no external status extension', pattern: /harness pass does not authorize status extension|does not extend `?CLEAN_EXCELLENT_PASS`? outside/i },
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
      { label: 'no target artifact', pattern: /target artifact/i },
      { label: 'no fixture', pattern: /fixtures/i },
      { label: 'no generated report', pattern: /generated reports/i },
      { label: 'no global docs', pattern: /global-docs|global docs/i },
      { label: 'no productive skill', pattern: /productive-skill|productive skill/i },
      { label: 'no template path', pattern: /template/i },
      { label: 'no automatic future promotion', pattern: /automatic future promotion|status extension outside/i },
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
      validationPackConsumedAnchor,
      readyAppliedEvidenceAnchor,
      { label: 'terminal verdicts', pattern: /PASS[\s\S]{0,80}PARTIAL[\s\S]{0,80}FAIL[\s\S]{0,80}BLOCKED/ },
      { label: 'sem runtime/materialization/prod', pattern: /sem runtime\/materialization\/prod/i },
    ],
    requiredNegative: [
      { label: 'no global docs', pattern: /global docs/i },
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materialization', pattern: /materialization/i },
      { label: 'no production', pattern: /production|prod/i },
      { label: 'no repo-target writes', pattern: /repo-target writes/i },
      { label: 'no global docs', pattern: /global docs updates/i },
      { label: 'no productive skill update', pattern: /productive-skill changes/i },
      { label: 'no productive template update', pattern: /productive-template changes/i },
      { label: 'no automatic future promotion', pattern: /automatic future promotion|status extension outside the dev kernel lab/i },
      { label: 'no materializer', pattern: /materializer/i },
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
      validationPackPresentAnchor,
      readyAppliedEvidenceAnchor,
    ],
    requiredNegative: [],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Input Contract$/i,
    requiredPositive: [
      readyAppliedEvidenceAnchor,
      validationPackPresentAnchor,
      docsTestingCutLimitAnchor,
      { label: 'canonical commands', pattern: /canonical commands/i },
      { label: 'manual paths', pattern: /manual paths/i },
      { label: 'prerequisites', pattern: /prerequisites/i },
      { label: 'harness limits', pattern: /harness limits/i },
    ],
    requiredNegative: [
      { label: 'no proof redesign', pattern: /proof redesign/i },
      { label: 'docs/core/TESTING not outside pack', pattern: /only for[\s\S]{0,160}canonical commands/i },
    ],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^VALIDATION PACK Contract$/i,
    requiredPositive: [
      { label: 'strict proof contract', pattern: /`?VALIDATION PACK`?\s+is\s+the\s+strict proof contract/i, polarity: 'affirmative' },
    ],
    requiredNegative: [
      { label: 'no proof redesign', pattern: /redesign/i },
      { label: 'no proof broadening', pattern: /broaden/i },
      { label: 'no proof narrowing', pattern: /narrow/i },
      { label: 'no proof replacement', pattern: /replace/i },
      { label: 'no proof weakening', pattern: /weaken/i },
      { label: 'no silent proof reduction', pattern: /silently reduce/i },
      { label: 'no criteria invention', pattern: /invent criteria|criteria/i },
    ],
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
      passDirectProofAnchor,
      { label: 'PASS PARTIAL FAIL BLOCKED', pattern: /PASS[\s\S]{0,80}PARTIAL[\s\S]{0,80}FAIL[\s\S]{0,80}BLOCKED/ },
      { label: 'FAIL disproven', pattern: /FAIL[\s\S]{0,80}behavior or contract[\s\S]{0,80}disproven/i },
      { label: 'BLOCKED infeasible absent invalid prevented', pattern: /BLOCKED[\s\S]{0,160}infeasible[\s\S]{0,80}absent[\s\S]{0,80}invalid[\s\S]{0,80}prevented/i },
    ],
    requiredNegative: [
      { label: 'PASS cannot rest on invalid proof', pattern: /PASS[\s\S]{0,120}cannot/i },
      { label: 'no invalid READY as PASS proof', pattern: /invalid executor readiness/i },
      { label: 'no inferred evidence as direct proof', pattern: /inferred evidence/i },
      { label: 'no unrelated green as proof', pattern: /green output unrelated to the cut/i },
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
      { label: 'no proof redesign', pattern: /redesign(?:ing)? `?VALIDATION PACK`?|proof redesign/i },
      { label: 'no criteria invention', pattern: /invent criteria|criteria invention/i },
      { label: 'no silent proof reduction', pattern: /silently reduce proof|silent proof reduction/i },
      { label: 'no code correction', pattern: /correct(?:ing)? code|code correction/i },
      { label: 'no architecture review', pattern: /review(?:ing)? architecture|architecture review/i },
      { label: 'no closure', pattern: /clos(?:e|ing) the round/i },
      { label: 'no resync', pattern: /execut(?:e|ing) resync|perform(?:ing)? resync|resync/i },
      { label: 'no durable docs', pattern: /edit(?:ing)? durable documentation|write durable documentation/i },
      { label: 'no invalid READY validation', pattern: /validate an invalid executor `?READY`?|invalid executor `?READY`?/i },
      { label: 'no inferred evidence as direct proof', pattern: /accept inferred evidence as direct proof|inferred evidence/i },
      { label: 'no correction pack as verdict', pattern: /treat `?CORRECTION PACK`? as a verdict/i },
      { label: 'no correction verdict mix', pattern: /mix `?CORRECTION PACK`?[\s\S]{0,80}`?PASS`?/i },
      { label: 'no irrelevant green as proof', pattern: /generic green output as proof|green output as proof/i },
      { label: 'no runtime authorization', pattern: /runtime/i },
      { label: 'no materialization authorization', pattern: /materialization/i },
      { label: 'no production authorization', pattern: /production/i },
    ],
  },
  {
    file: 'contracts/CONTRACT.md',
    section: /^Reading Contract$/i,
    requiredPositive: [
      { label: 'header-aware reading', pattern: /header-aware reading/i },
      { label: 'File Purpose Header metadata', pattern: /File Purpose Header metadata/i },
      { label: 'runtime temp paths prohibited', pattern: /runtime temp paths[\s\S]{0,80}source of truth/i },
      docsTestingCutLimitAnchor,
    ],
    requiredNegative: [
      { label: 'runtime temp paths not source of truth', pattern: /runtime temp paths|runtime temporary files/i },
      { label: 'docs/core/TESTING limited to cut support', pattern: /only[\s\S]{0,120}docs\/core\/TESTING\.md|only[\s\S]{0,160}canonical commands/i },
    ],
  },
  {
    file: 'contracts/BEHAVIOR_PARITY_SPINE.md',
    section: /^Non-Reducible Semantics$/i,
    requiredPositive: [
      { label: 'non-reducible semantics', pattern: /non-reducible semantics/i },
      { label: 'correction exclusivity', pattern: /correction exclusivity/i },
      validationPackConsumedAnchor,
      readyAppliedEvidenceAnchor,
      passDirectProofAnchor,
      { label: 'irrelevant green output non-proof', pattern: /irrelevant green output[\s\S]{0,40}non-proof/i },
    ],
    requiredNegative: [
      { label: 'no checklist edit', pattern: /without editing checklists/i },
      { label: 'irrelevant green non-proof', pattern: /irrelevant green output[\s\S]{0,40}non-proof/i },
    ],
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
      { label: 'harness no external status extension', pattern: /harness pass does\s+not authorize status extension|does\s+not extend `?CLEAN_EXCELLENT_PASS`? outside/i },
    ],
    requiredNegative: [
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materializer', pattern: /materializer/i },
      { label: 'no global docs', pattern: /global docs/i },
      { label: 'no extra executable files', pattern: /extra executable files/i },
      { label: 'no materialization path', pattern: /materialization path/i },
      { label: 'no productive template update', pattern: /productive template update/i },
      { label: 'no productive skill update', pattern: /productive skill update/i },
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
      validationPackConsumedAnchor,
      readyAppliedEvidenceAnchor,
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
    requiredNegative: [
      { label: 'no proof redesign', pattern: /redesigning proof/i },
    ],
  },
  {
    file: 'contracts/MINIMUM_SAFE_BUNDLE.md',
    section: /^Minimum Boundary Set$/i,
    requiredPositive: [
      { label: 'minimum boundary set', pattern: /minimum boundary set/i },
      { label: 'runtime loader', pattern: /runtime loader/i },
      { label: 'materialization path', pattern: /materialization path/i },
      { label: 'global docs updates', pattern: /global docs updates/i },
      { label: 'automatic future promotion boundary', pattern: /automatic future promotion|status extension outside the\s+dev kernel lab/i },
    ],
    requiredNegative: [
      { label: 'no runtime', pattern: /runtime/i },
      { label: 'no materializer', pattern: /materializer/i },
      { label: 'no global docs', pattern: /global docs/i },
      { label: 'no materialization path', pattern: /materialization path/i },
      { label: 'no productive template update', pattern: /productive template changes/i },
      { label: 'no productive skill update', pattern: /productive skill changes/i },
      { label: 'no target artifact', pattern: /target artifact generation/i },
      { label: 'no fixture', pattern: /fixtures/i },
      { label: 'no generated report', pattern: /generated reports/i },
      { label: 'no automatic future promotion', pattern: /automatic future promotion|status extension outside the\s+dev kernel lab/i },
    ],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 1 - Current-Round Proof Contract$/i,
    requiredPositive: [
      { label: 'Gate 1 current-round proof contract', pattern: /Gate 1 current-round proof contract/i },
      validationPackPresentAnchor,
    ],
    requiredNegative: [
      { label: 'no proof redesign', pattern: /redesign/i },
      { label: 'no criteria invention', pattern: /invent/i },
    ],
  },
  {
    file: 'contracts/PROOF_EXECUTION_GATES.md',
    section: /^Gate 2 - Valid Executor READY$/i,
    requiredPositive: [
      { label: 'Gate 2 valid executor READY', pattern: /Gate 2 valid executor `?READY`?/i },
      readyAppliedEvidenceAnchor,
    ],
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
    requiredPositive: [
      { label: 'Gate 5 direct proof threshold', pattern: /Gate 5 direct proof threshold/i },
      { label: 'PASS direct evidence', pattern: /direct evidence for `?PASS`?/i, polarity: 'affirmative' },
    ],
    requiredNegative: [{ label: 'inference cannot satisfy proof', pattern: /cannot satisfy direct proof/i }],
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
      { label: 'docs globais coerentes', pattern: /docs globais coerentes/i },
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
      docsTestingCutLimitAnchor,
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
  const passRequires = passDirectProofAnchor;

  assert(
    hasPositiveAnchor('PASS requires direct proof.', passRequires),
    'local negation self-test failed: positive direct-proof anchor did not pass',
  );
  assert(
    !hasPositiveAnchor('PASS does not require direct proof.', passRequires),
    'local negation self-test failed: negated direct-proof anchor passed',
  );

  const forbiddenPassCases = [
    'PASS does not require direct proof.',
    'PASS can pass without direct proof.',
    'PASS may pass without direct proof.',
    'PASS may be based on inferred evidence.',
    'PASS may rest on inferred evidence.',
    'PASS may rest on green output unrelated to the cut.',
    'PASS may rest on invalid executor readiness.',
    'PASS may rest on missing required checks.',
    'PASS can rest on missing required checks.',
    'PASS may be justified by generic green output.',
  ];

  const permittedPassCases = [
    'PASS requires direct proof.',
    'PASS cannot rest on inferred evidence.',
    'PASS cannot rest on invalid executor readiness.',
    'PASS cannot rest on missing required checks.',
    'PASS cannot rest on green output unrelated to the cut.',
    'Generic green output cannot justify PASS.',
    'Irrelevant green output cannot justify PASS.',
    'Example enforced by the harness: `PASS does not require direct proof` fails.',
  ];

  for (const sentence of forbiddenPassCases) {
    assert(
      hasForbiddenPassContradiction(sentence),
      `direct-proof contradiction self-test failed: forbidden sentence passed: ${sentence}`,
    );
  }

  for (const sentence of permittedPassCases) {
    assert(
      !hasForbiddenPassContradiction(sentence),
      `direct-proof contradiction self-test failed: permitted sentence failed: ${sentence}`,
    );
  }

  const affirmativeCases = [
    [
      'validation pack consumption',
      validationPackConsumedAnchor,
      'The runner consumes the current-round VALIDATION PACK.',
      'The runner does not consume VALIDATION PACK.',
    ],
    [
      'READY applied evidence',
      readyAppliedEvidenceAnchor,
      'The runner requires valid READY with applied-change evidence.',
      'The runner does not require valid READY with applied-change evidence.',
    ],
    [
      'PASS direct proof',
      passDirectProofAnchor,
      'PASS requires direct proof.',
      'PASS does not require direct proof.',
    ],
  ];

  for (const [label, anchor, positive, negative] of affirmativeCases) {
    assert(hasPositiveAnchor(positive, anchor), `local polarity self-test failed: positive ${label} did not pass`);
    assert(!hasPositiveAnchor(negative, anchor), `local polarity self-test failed: negated ${label} passed`);
  }

  const prohibitiveCases = [
    [
      'proof redesign',
      { pattern: /redesign(?:\s+the)?\s+`?VALIDATION PACK`?|proof redesign/i },
      'The runner must not redesign the VALIDATION PACK.',
      'The runner may redesign the VALIDATION PACK.',
    ],
    [
      'code correction',
      { pattern: /correct code|code correction/i },
      'The runner must not correct code.',
      'The runner may correct code.',
    ],
    [
      'architecture review',
      { pattern: /review architecture|architecture review/i },
      'The runner must not review architecture.',
      'The runner may review architecture.',
    ],
    [
      'closure',
      { pattern: /close the round/i },
      'The runner must not close the round.',
      'The runner may close the round.',
    ],
    [
      'resync',
      { pattern: /perform resync|resync/i },
      'The runner must not perform resync.',
      'The runner may perform resync.',
    ],
    [
      'durable docs',
      { pattern: /edit durable documentation|durable docs?/i },
      'The runner must not edit durable documentation.',
      'The runner may edit durable documentation.',
    ],
    [
      'runtime authorization',
      { pattern: /runtime/i },
      'The harness does not authorize runtime.',
      'The harness authorizes runtime.',
    ],
    [
      'materialization authorization',
      { pattern: /materialization/i },
      'The harness does not authorize materialization.',
      'The harness authorizes materialization.',
    ],
    [
      'production authorization',
      { pattern: /production/i },
      'The harness does not authorize production.',
      'The harness authorizes production.',
    ],
    [
      'docs/core/TESTING cut limit',
      docsTestingCutLimitAnchor,
      'docs/core/TESTING.md is limited to canonical commands, manual paths, prerequisites, and harness limits for the cut.',
      'docs/core/TESTING.md may expand validation beyond the cut.',
    ],
  ];

  for (const [label, anchor, positive, negative] of prohibitiveCases) {
    assert(hasLocalProhibition(positive, anchor), `local polarity self-test failed: prohibitive ${label} did not pass`);
    assert(!hasLocalProhibition(negative, anchor), `local polarity self-test failed: permissive ${label} passed`);
  }

  const authRule = (label) => AUTHORIZATION_PATTERNS.find((rule) => rule.label === label);
  const authorizationCases = [
    ['runtime authorization', 'The harness does not authorize runtime.', false],
    ['runtime authorization', 'The harness does not block and authorizes runtime.', true],
    ['runtime authorization', 'The harness does not authorize runtime, but this harness authorizes runtime.', true],
    ['runtime authorization', 'sem runtime.', false],
    ['runtime authorization', 'The harness authorizes runtime.', true],
    ['materialization authorization', 'The harness authorizes materialization.', true],
    ['production authorization', 'The harness authorizes production.', true],
    ['materialization authorization', 'The runner may create materialization path.', true],
    ['global docs update authorization', 'The runner may update global docs.', true],
    ['qa checklist edit authorization', 'The runner may edit qa_checklist.md.', true],
    ['target artifact authorization', 'The runner may create target artifact.', true],
    ['target artifact authorization', 'The runner may create target artifacts.', true],
    ['target artifact authorization', 'The runner may generate target artifacts.', true],
    ['target artifact authorization', 'The runner may write target artifacts.', true],
    ['target artifact authorization', 'The runner can create target artifacts.', true],
    ['target artifact authorization', 'The runner must not create target artifacts.', false],
    ['target artifact authorization', 'The runner does not authorize target artifact generation.', false],
    ['target artifact authorization', 'The bundle must not authorize target artifact generation.', false],
  ];

  for (const [ruleLabel, sentence, shouldFail] of authorizationCases) {
    const rule = authRule(ruleLabel);
    assert(rule !== undefined, `local authorization self-test missing rule ${ruleLabel}`);
    const failed = Boolean(forbiddenAuthorizationClaim(sentence, rule));
    assert(
      failed === shouldFail,
      `local authorization self-test failed for ${ruleLabel}: ${sentence}`,
    );
  }
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
  validateNoPassContradictions(docs);
  validatePromotionRuntimeClaims(docs);
  validateAnchorMatrix(docs);
  validateHarnessSources();
  validateGlobalDocsCoherent();

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
  console.log('global docs status: coherent');
}

main();
