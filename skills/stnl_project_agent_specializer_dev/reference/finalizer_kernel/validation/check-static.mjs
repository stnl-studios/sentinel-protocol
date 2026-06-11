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
import { fileURLToPath, pathToFileURL } from 'node:url';

const KERNEL_PREFIX =
  'skills/stnl_project_agent_specializer_dev/reference/finalizer_kernel';
const SNAPSHOT_AGENT =
  'skills/stnl_project_agent_specializer_dev/reference/agents/finalizer.agent.md';
const TEMPLATE_AGENT = 'templates/agents/finalizer.agent.md';

export const EXPECTED_FILES = Object.freeze([
  'README.md',
  'contracts/CONTRACT.md',
  'contracts/BEHAVIOR_PARITY_SPINE.md',
  'contracts/MINIMUM_SAFE_BUNDLE.md',
  'contracts/CLOSURE_GATES.md',
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
  'contracts/CLOSURE_GATES.md',
  'validation/STATIC_CHECKS.md',
  'validation/GOLDEN_TESTS.md',
]);

const EXPECTED_MJS = Object.freeze([
  'validation/check-static.mjs',
  'validation/check-golden.mjs',
]);

const IGNORED_NAMES = new Set(['__MACOSX', '.DS_Store']);

const scriptPath = fileURLToPath(import.meta.url);
const scriptRealPath = realpathSync.native(scriptPath);
const validationRoot = dirname(scriptRealPath);
const kernelRoot = realpathSync.native(resolve(validationRoot, '..'));
const repoRoot = findRepoRoot(kernelRoot);

function toPosix(path) {
  return path.split(sep).join('/');
}

function isInside(root, candidate) {
  const rel = relative(root, candidate);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

function findRepoRoot(startPath) {
  let cursor = realpathSync.native(startPath);
  for (;;) {
    const kernel = resolve(cursor, KERNEL_PREFIX);
    const snapshot = resolve(cursor, SNAPSHOT_AGENT);
    const template = resolve(cursor, TEMPLATE_AGENT);
    if (existsSync(kernel) && existsSync(snapshot) && existsSync(template)) {
      return realpathSync.native(cursor);
    }
    const parent = dirname(cursor);
    if (parent === cursor) {
      throw new Error(`Unable to locate repository root from ${startPath}`);
    }
    cursor = parent;
  }
}

function repoPath(relPath) {
  const absPath = resolve(repoRoot, relPath);
  if (!isInside(repoRoot, absPath)) {
    throw new Error(`${relPath} escapes repository root`);
  }
  return absPath;
}

function safeFile(absPath, root, label, errors) {
  try {
    const lst = lstatSync(absPath);
    if (lst.isSymbolicLink()) {
      errors.push(`${label} must not be a symlink`);
      return null;
    }
    const real = realpathSync.native(absPath);
    if (!isInside(root, real)) {
      errors.push(`${label} escapes expected root after realpath`);
      return null;
    }
    const st = statSync(real);
    if (!st.isFile()) {
      errors.push(`${label} must be a regular file`);
      return null;
    }
    return real;
  } catch (error) {
    errors.push(`${label} is not a safe readable file: ${error.message}`);
    return null;
  }
}

function readRepoText(relPath, errors) {
  const real = safeFile(repoPath(relPath), repoRoot, relPath, errors);
  return real ? readFileSync(real, 'utf8') : '';
}

function readRepoBuffer(relPath, errors) {
  const real = safeFile(repoPath(relPath), repoRoot, relPath, errors);
  return real ? readFileSync(real) : null;
}

function readKernelText(relPath, errors) {
  return readRepoText(`${KERNEL_PREFIX}/${relPath}`, errors);
}

function walkKernelFiles(absDir, root, errors, out = []) {
  for (const dirent of readdirSync(absDir, { withFileTypes: true })) {
    if (IGNORED_NAMES.has(dirent.name)) {
      continue;
    }

    const absPath = join(absDir, dirent.name);
    const relPath = toPosix(relative(root, absPath));
    const lst = lstatSync(absPath);
    if (lst.isSymbolicLink()) {
      errors.push(`symlink is forbidden inside finalizer_kernel: ${relPath}`);
      continue;
    }

    const real = realpathSync.native(absPath);
    if (!isInside(root, real)) {
      errors.push(`kernel entry escapes root after realpath: ${relPath}`);
      continue;
    }

    if (lst.isDirectory()) {
      walkKernelFiles(absPath, root, errors, out);
    } else if (lst.isFile()) {
      out.push(relPath);
    } else {
      errors.push(`unexpected non-file entry inside finalizer_kernel: ${relPath}`);
    }
  }
  return out;
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

function assertExactSet(actual, expected, label, errors) {
  const duplicateEntries = uniqueDuplicates(actual);
  if (duplicateEntries.length > 0) {
    errors.push(`${label} has duplicate entries: ${duplicateEntries.join(', ')}`);
  }

  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const missing = expected.filter((entry) => !actualSet.has(entry));
  const extra = actual.filter((entry) => !expectedSet.has(entry));

  if (missing.length > 0) {
    errors.push(`${label} missing entries: ${missing.join(', ')}`);
  }
  if (extra.length > 0) {
    errors.push(`${label} extra entries: ${extra.join(', ')}`);
  }
}

function headingMatch(line) {
  return /^(#{1,6})\s+(.+?)\s*$/.exec(line);
}

function extractSection(markdown, headingPattern) {
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

function parseFrontmatter(markdown, errors) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(markdown);
  if (!match) {
    errors.push('snapshot must start with YAML frontmatter');
    return new Map();
  }

  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (field) {
      fields.set(field[1], field[2].trim().replace(/^['"]|['"]$/g, ''));
    }
  }
  return fields;
}

function splitClaimUnits(text) {
  const units = [];
  let current = '';

  const flush = () => {
    if (current.trim()) {
      units.push(current.trim());
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
      units.push(line);
      continue;
    }
    if (/^(?:[-*]|\d+\.)\s+/.test(line)) {
      flush();
      current = line;
      continue;
    }
    current = current ? `${current} ${line}` : line;
  }
  flush();

  return units
    .flatMap((unit) => unit.split(/(?<=[.!?])\s+(?=[A-Z`])/))
    .map((unit) => unit.trim())
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
    /[;:]|\b(?:but|however|though|although|except that)\b|\band\s+(?=(?:this\s+kernel\s+|the\s+finalizer\s+|finalizer\s+)?(?:authoriz|may|can|could|allows?|permits?|creates?|updates?|edits?|performs?|executes?|runs?|implements?|fixes?|reissues?|declares?|means|uses?|searches?|promotes?))/gi;
  let match;
  while ((match = boundaryPattern.exec(prefix)) !== null) {
    boundary = match.index + match[0].length;
  }
  return boundary;
}

function nextBoundaryIndex(suffix) {
  const boundaryPattern =
    /[;:]|\b(?:but|however|though|although|except that)\b|\band\s+(?=(?:this\s+kernel\s+|the\s+finalizer\s+|finalizer\s+)?(?:authoriz|may|can|could|allows?|permits?|creates?|updates?|edits?|performs?|executes?|runs?|implements?|fixes?|reissues?|declares?|means|uses?|searches?|promotes?))/i;
  const match = boundaryPattern.exec(suffix);
  return match ? match.index : suffix.length;
}

function localClaimContext(unit, start, end) {
  const prefix = unit.slice(0, start);
  const suffix = unit.slice(end);
  const localStart = lastBoundaryIndex(prefix);
  const localEnd = end + nextBoundaryIndex(suffix);
  return unit.slice(localStart, localEnd).trim();
}

function isProhibitiveLocal(text) {
  return /\b(?:does not|do not|must not|shall not|should not|may not|cannot|can not|is not|are not|not|never|without|no|reject(?:s|ed)?|block(?:s|ed)?|blocked positive claim|fail if|fails? if|must fail|must be blocked|prohibit(?:s|ed)?|forbid(?:s|den)?|unauthori[sz]ed|invalid|outside scope|separate from|preserved, not reissued|not automatic|sem)\b|\bnon[- ](?:runtime|production|materialization)\b|\bdev-only\b/i.test(
    text,
  );
}

function hasAffirmativeAction(text) {
  return /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|may|can|could|creates?|writes?|generates?|executes?|runs?|performs?|implements?|fixes?|patches?|corrects?|substitutes?|replaces?|absorbs?|reruns?|replans?|redefines?|redesigns?|reissues?|declares?|means|uses?|searches?|adopts?|activates?|enables?|promotes?|is|are|becomes?)\b/i.test(
    text,
  );
}

const authorityRules = Object.freeze([
  ['runtime authority', /\bruntime(?:\s+(?:loader|loading|path|artifacts?|adoption|pass|harness))?\b/i],
  ['production authority', /\bproduction\b|\bprod(?:uction)?\s+path\b/i],
  ['materialization authority', /\bmateriali[sz]ation(?:\s+path)?\b/i],
  ['materializer authority', /\bmaterializer\b/i],
  ['GitHub write authority', /\bGitHub\b[\s\S]{0,80}\bwrite\b|\bwrite\b[\s\S]{0,80}\bGitHub\b/i],
  ['target repo write authority', /\btarget[- ]repo(?:sitory)?(?:\s+(?:write|writes?|artifacts?|path))?\b|\brepo alvo\b[\s\S]{0,80}\bescrita\b/i],
  ['generated report authority', /\bgenerated reports?\b/i],
  ['fixture authority', /\bfixtures?\b/i],
  ['target artifact authority', /\btarget artifacts?\b/i],
  ['productive skill authority', /\bproductive[- ]skill\b|\bskill produtiva\b/i],
  ['template mutation authority', /\btemplate mutation\b|\btemplates? can[oô]nicos\b|\bcanonical[- ]template\b/i],
  ['snapshot mutation authority', /\bsnapshot mutation\b|\bsnapshot\b[\s\S]{0,60}\bmutat/i],
]);

const directRules = Object.freeze([
  {
    family: 'resync-boundary',
    claimName: 'finalizer executes resync',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:executes?|performs?|runs?|does|implements?)\b[\s\S]{0,80}\bresync\b|\bresync\b[\s\S]{0,100}\b(?:executed|performed|run|done|implemented)\b[\s\S]{0,80}\bfinalizer\b/i,
  },
  {
    family: 'runner-boundary',
    claimName: 'finalizer substitutes validation-runner',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:substitutes?|replaces?|absorbs?|overrides?|acts as|serves as)\b[\s\S]{0,80}\b(?:validation[- ]runner|runner)\b/i,
  },
  {
    family: 'reviewer-boundary',
    claimName: 'finalizer substitutes reviewer',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:substitutes?|replaces?|absorbs?|overrides?|acts as|serves as)\b[\s\S]{0,80}\breviewer\b/i,
  },
  {
    family: 'implementation-boundary',
    claimName: 'finalizer implements or fixes',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:implements?|fixes?|patches?|corrects?|edits?\s+implementation|changes?\s+code)\b/i,
  },
  {
    family: 'validation-boundary',
    claimName: 'finalizer runs validation',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:runs?|reruns?|executes?|performs?)\b[\s\S]{0,80}\bvalidation\b/i,
  },
  {
    family: 'planning-boundary',
    claimName: 'finalizer replans or redefines cut',
    pattern: /\bfinalizer\b[\s\S]{0,120}\b(?:replans?|redefines?\s+the\s+cut|re[- ]cuts?)\b/i,
  },
  {
    family: 'proof-boundary',
    claimName: 'finalizer redesigns proof',
    pattern: /\bfinalizer\b[\s\S]{0,120}\b(?:redesigns?\s+proof|redesigns?\s+the\s+`?VALIDATION PACK`?)\b/i,
  },
  {
    family: 'package-boundary',
    claimName: 'finalizer reinterprets execution package',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:reinterpret(?:s|ed|ing)?|rewrite(?:s|ing)?|recompile(?:s|d|ing)?)\b[\s\S]{0,80}\b`?EXECUTION PACKAGE`?\b/i,
  },
  {
    family: 'runner-verdict',
    claimName: 'finalizer reissues runner verdict',
    pattern:
      /\bfinalizer\b[\s\S]{0,120}\b(?:emits?|reissues?|declares?)\b[\s\S]{0,80}\b(?:PASS|PARTIAL|FAIL|validation-owned\s+`?BLOCKED`?)\b/i,
  },
  {
    family: 'ready-pass',
    claimName: 'READY means validation PASS',
    pattern:
      /\bREADY\b[\s\S]{0,80}\b(?:means|equals|is|counts as|becomes)\b[\s\S]{0,60}\b(?:validation\s+)?PASS\b|\bPASS\b[\s\S]{0,80}\b(?:because|from)\b[\s\S]{0,60}\bREADY\b/i,
  },
  {
    family: 'done-inflation',
    claimName: 'DONE automatic by effort or green checks',
    pattern:
      /\bDONE\b[\s\S]{0,100}\b(?:automatic|effort|green checks?|runner\s+`?PASS`?|checks green)\b|\b(?:effort|green checks?|runner\s+`?PASS`?)\b[\s\S]{0,100}\b(?:automatic|creates?|grants?)\b[\s\S]{0,40}\bDONE\b/i,
  },
  {
    family: 'qa-inflation',
    claimName: 'QA checklist success invented',
    pattern:
      /\bQA\b[\s\S]{0,80}\b(?:success|passed)\b[\s\S]{0,80}\b(?:invented|without runner|without evidence)\b|\binvents?\b[\s\S]{0,80}\bQA checklist success\b/i,
  },
  {
    family: 'legacy-durable-docs',
    claimName: 'PLAN.md durable documentation',
    pattern:
      /\bPLAN\.md\b[\s\S]{0,100}\bdurable documentation\b|\bdurable documentation\b[\s\S]{0,100}\bPLAN\.md\b|\blegacy phase artifact\b[\s\S]{0,80}\bdurable/i,
  },
  {
    family: 'runtime-temp-search',
    claimName: 'broad runtime/temp handoff search',
    pattern:
      /\bsearch(?:es|ed|ing)?\b[\s\S]{0,120}\b(?:workspaceStorage|chat-session-resources|content\.txt|scratchpads?|runtime temporary files?)\b|\b(?:workspaceStorage|chat-session-resources|content\.txt|scratchpads?|runtime temporary files?)\b[\s\S]{0,120}\b(?:source of truth|handoffs?)\b/i,
  },
  {
    family: 'future-promotion',
    claimName: 'automatic future promotion',
    pattern:
      /\bautomatic future promotion\b|\bfuture kernels?\b[\s\S]{0,80}\b(?:automatically|auto-promot)/i,
  },
  {
    family: 'weak-closure',
    claimName: 'READY without closure ledger or decisions',
    pattern:
      /\bREADY\b[\s\S]{0,100}\bwithout\b[\s\S]{0,80}\b(?:closure ledger|DONE|resync)\b|\bclosure ledger\b[\s\S]{0,80}\boptional\b/i,
    positiveWithout: true,
  },
]);

function claimFromRule(rule, unit, match) {
  const local = localClaimContext(unit, match.index, match.end);
  const positiveWithout =
    rule.positiveWithout && /\b(?:may|can|could|is|are|be|being|emitted|emit)\b[\s\S]{0,80}\bwithout\b/i.test(local);
  if (isProhibitiveLocal(local) && !positiveWithout) {
    return null;
  }
  return {
    blocker: `FORBIDDEN_${rule.family.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`,
    family: rule.family,
    claimName: rule.claimName,
    excerpt: local,
  };
}

export function findForbiddenClaims(text, options = {}) {
  const source = options.source ?? 'inline';
  const claims = [];

  for (const unit of splitClaimUnits(text)) {
    for (const [claimName, objectPattern] of authorityRules) {
      for (const match of regexMatches(objectPattern, unit)) {
        const local = localClaimContext(unit, match.index, match.end);
        if (isProhibitiveLocal(local) || !hasAffirmativeAction(local)) {
          continue;
        }
        claims.push({
          blocker: 'FORBIDDEN_AUTHORITY_CLAIM',
          family: 'authority',
          claimName,
          excerpt: local,
          source,
        });
      }
    }

    for (const rule of directRules) {
      for (const match of regexMatches(rule.pattern, unit)) {
        const claim = claimFromRule(rule, unit, match);
        if (claim) {
          claims.push({ ...claim, source });
        }
      }
    }
  }

  return claims;
}

export function findForbiddenClaimsInGoldenTestsDoc(text) {
  const retained = [];
  let currentScenario = '';
  let currentSection = '';

  for (const line of text.split(/\r?\n/)) {
    const scenario = /^##\s+Golden Test (FNL-GT-\d{3})\b/.exec(line);
    if (scenario) {
      currentScenario = scenario[1];
      currentSection = '';
      retained.push(line);
      continue;
    }

    const section = /^###\s+(.+?)\s*$/.exec(line);
    if (section) {
      currentSection = section[1];
      retained.push(line);
      continue;
    }

    const isScenarioSpecimen =
      currentScenario &&
      (currentSection === 'Input shape' ||
        currentSection === 'Fail condition' ||
        currentSection === 'Expected blocker');
    if (!isScenarioSpecimen) {
      retained.push(line);
    }
  }

  return findForbiddenClaims(retained.join('\n'), { source: 'validation/GOLDEN_TESTS.md' });
}

function requirePattern(text, pattern, label, errors) {
  if (!pattern.test(text)) {
    errors.push(`missing ${label}`);
  }
}

function validateFilesystem(errors) {
  const rootLstat = lstatSync(kernelRoot);
  if (rootLstat.isSymbolicLink()) {
    errors.push('kernel root must not be a symlink');
  }
  if (!isInside(repoRoot, kernelRoot)) {
    errors.push('kernel root must remain inside repo');
  }
  if (!isInside(kernelRoot, scriptRealPath)) {
    errors.push('static script must remain inside kernel root');
  }

  const actualFiles = walkKernelFiles(kernelRoot, kernelRoot, errors).sort();
  assertExactSet(actualFiles, [...EXPECTED_FILES].sort(), 'kernel filesystem allowlist', errors);

  const caseDuplicates = uniqueDuplicates(actualFiles.map((entry) => entry.toLowerCase()));
  if (caseDuplicates.length > 0) {
    errors.push(`case-folded duplicate paths: ${caseDuplicates.join(', ')}`);
  }

  for (const relPath of actualFiles) {
    if (/\b(?:fixture|generated[-_ ]?report|runtime[-_ ]?loader|materializer|target[-_ ]?artifact)\b/i.test(relPath)) {
      errors.push(`disallowed generated/runtime artifact path: ${relPath}`);
    }
    if (/\.(?:mjs|js)$/i.test(relPath) && !EXPECTED_MJS.includes(relPath)) {
      errors.push(`unexpected JavaScript file: ${relPath}`);
    }
  }

  for (const relPath of EXPECTED_FILES) {
    safeFile(resolve(kernelRoot, relPath), kernelRoot, relPath, errors);
  }
}

function validateSnapshot(errors) {
  const template = readRepoBuffer(TEMPLATE_AGENT, errors);
  const snapshot = readRepoBuffer(SNAPSHOT_AGENT, errors);
  if (!template) {
    errors.push(`missing template ${TEMPLATE_AGENT}`);
  }
  if (!snapshot) {
    errors.push(`missing dev snapshot ${SNAPSHOT_AGENT}`);
  }
  if (template && snapshot && !template.equals(snapshot)) {
    errors.push('dev snapshot is not byte-for-byte equal to productive template');
  }

  const snapshotText = snapshot ? snapshot.toString('utf8') : '';
  const frontmatter = parseFrontmatter(snapshotText, errors);
  const expected = new Map([
    ['name', 'finalizer'],
    ['agent_version', '2026.5.1'],
    ['reading_scope_class', 'minimal-verification'],
  ]);
  for (const [field, value] of expected) {
    if (frontmatter.get(field) !== value) {
      errors.push(`snapshot frontmatter ${field} must be ${value}`);
    }
  }
}

function validateReadmeAllowlist(readme, errors) {
  const section = extractSection(readme, /^Included Files$/i);
  const entries = [];
  for (const line of section.split(/\r?\n/)) {
    const match = /^\s*(?:\d+\.|-)\s+`([^`]+)`/.exec(line);
    if (match) {
      entries.push(match[1]);
    }
  }
  if (entries.length === 0) {
    errors.push('README Included Files section has no parsed entries');
  }
  assertExactSet(entries, EXPECTED_FILES, 'README allowlist', errors);
  if (entries.length === EXPECTED_FILES.length) {
    for (let index = 0; index < EXPECTED_FILES.length; index += 1) {
      if (entries[index] !== EXPECTED_FILES[index]) {
        errors.push(`README allowlist order mismatch at ${index + 1}: expected ${EXPECTED_FILES[index]}, got ${entries[index]}`);
      }
    }
  }
}

function validateDocumentAnchors(docs, errors) {
  for (const relPath of MARKDOWN_FILES) {
    requirePattern(
      docs[relPath],
      /FINALIZER_KERNEL:\s*CLEAN_EXCELLENT_PASS/,
      `${relPath} clean pass status`,
      errors,
    );
  }

  validateReadmeAllowlist(docs['README.md'], errors);

  const contract = docs['contracts/CONTRACT.md'];
  const requiredSections = [
    /^Identity Contract$/i,
    /^Mission Contract$/i,
    /^Entry Contract$/i,
    /^Input Contract$/i,
    /^Evidence Contract$/i,
    /^Output Contract$/i,
    /^Status Contract$/i,
    /^DONE Contract$/i,
    /^Resync Decision Contract$/i,
    /^Slice Closure Contract$/i,
    /^QA Checklist Contract$/i,
    /^Residual Correction Pack Contract$/i,
    /^Boundary Contract$/i,
    /^Reading Contract$/i,
  ];
  for (const heading of requiredSections) {
    if (!extractSection(contract, heading)) {
      errors.push(`CONTRACT.md missing section ${heading}`);
    }
  }

  const allDocs = Object.values(docs).join('\n\n');
  const anchors = [
    ['name finalizer', /\bname:\s*finalizer\b/],
    ['role closure', /\brole class:\s*`?closure`?|\brole class `?closure`?/i],
    ['minimal verification', /\bminimal-verification\b/i],
    ['entry after runner', /after\s+`?validation-runner\.agent\.md`?/i],
    ['entry after reviewer', /after\s+`?reviewer\.agent\.md`?/i],
    ['execution-stage blockage', /execution-stage blockage/i],
    ['closure not execution validation review planning resync', /not execution[\s\S]{0,120}validation[\s\S]{0,120}review[\s\S]{0,120}planning|not an executor/i],
    ['READY BLOCKED statuses', /`READY`[\s\S]{0,80}`BLOCKED`|`BLOCKED`[\s\S]{0,80}`READY`/],
    ['READY not PASS', /READY[\s\S]{0,80}not[\s\S]{0,80}(?:runner\s+)?`?PASS`?/i],
    ['runner verdicts inputs', /PASS[\s\S]{0,80}PARTIAL[\s\S]{0,80}FAIL[\s\S]{0,80}(?:validation-owned\s+)?`?BLOCKED`[\s\S]{0,180}(?:inputs?|preserved)/i],
    ['DONE yes no', /DONE:\s*yes\/no/i],
    ['resync yes no', /resync:\s*yes\/no/i],
    ['closure ledger', /closure ledger/i],
    ['Feature CONTEXT', /Feature CONTEXT/],
    ['residual correction pack', /residual correction pack/i],
    ['qa checklist reconciliation', /qa_checklist\.md[\s\S]{0,160}(?:runner-backed|process gap)/i],
    ['slice closure record', /SL-001[\s\S]{0,120}concluida[\s\S]{0,80}parcial[\s\S]{0,80}bloqueada/i],
    ['runtime temp paths', /workspaceStorage[\s\S]{0,120}chat-session-resources[\s\S]{0,120}content\.txt[\s\S]{0,120}scratchpads/i],
    ['no implementation', /does not implement|must not:[\s\S]{0,120}implement|no implementation/i],
    ['no validation ownership', /does not[\s\S]{0,60}run validation|must not:[\s\S]{0,160}run or rerun validation/i],
    ['no runner replacement', /replace `?validation-runner\.agent\.md`?|does not[\s\S]{0,80}substitute review/i],
    ['no reviewer replacement', /replace `?reviewer\.agent\.md`?|reviewer substitution/i],
    ['no resync execution', /does not perform resync|does not execute resync|execute resync/i],
    ['PLAN.md prohibited', /PLAN\.md[\s\S]{0,120}not durable documentation|not use `?PLAN\.md`?/i],
    ['code fences scanned', /code fences[\s\S]{0,120}scanned by default|does not skip fenced blocks/i],
  ];

  for (const [label, pattern] of anchors) {
    requirePattern(allDocs, pattern, label, errors);
  }

  for (const [relPath, content] of Object.entries(docs)) {
    const claims =
      relPath === 'validation/GOLDEN_TESTS.md'
        ? findForbiddenClaimsInGoldenTestsDoc(content)
        : findForbiddenClaims(content, { source: relPath });
    if (claims.length > 0) {
      for (const claim of claims.slice(0, 12)) {
        errors.push(`${relPath} has forbidden ${claim.claimName}: ${claim.excerpt}`);
      }
      if (claims.length > 12) {
        errors.push(`${relPath} has ${claims.length - 12} additional forbidden claims`);
      }
    }
  }
}

function validateHarnessSource(errors) {
  const source = readFileSync(scriptRealPath, 'utf8');
  const golden = readKernelText('validation/check-golden.mjs', errors);
  const staticAnchors = [
    ['findForbiddenClaims export', /export function findForbiddenClaims/],
    ['golden scanner export', /export function findForbiddenClaimsInGoldenTestsDoc/],
    ['import guard', /pathToFileURL\(process\.argv\[1\]\)\.href/],
    ['ignored mac entries', /__MACOSX[\s\S]{0,40}\.DS_Store/],
    ['semantic families', /authorityRules[\s\S]{0,80}directRules/],
    ['local polarity', /isProhibitiveLocal[\s\S]{0,80}localClaimContext/],
    ['code fences not skipped', /splitClaimUnits/],
  ];
  const goldenAnchors = [
    ['static preflight', /runStaticChecks/],
    ['scenario matrix', /SCENARIOS/],
    ['FNL-GT-001', /FNL-GT-001/],
    ['FNL-GT-022', /FNL-GT-022/],
    ['negative mutations', /positiveMutationCases/],
    ['incomplete scenarios', /incompleteScenarioCases/],
    ['clean pass not forbidden', /FINALIZER_KERNEL:\s*CLEAN_EXCELLENT_PASS/],
  ];

  for (const [label, pattern] of staticAnchors) {
    requirePattern(source, pattern, `check-static source ${label}`, errors);
  }
  for (const [label, pattern] of goldenAnchors) {
    requirePattern(golden, pattern, `check-golden source ${label}`, errors);
  }
}

export function runStaticChecks(options = {}) {
  const errors = [];
  validateFilesystem(errors);
  validateSnapshot(errors);

  const docs = Object.fromEntries(
    MARKDOWN_FILES.map((relPath) => [relPath, readKernelText(relPath, errors)]),
  );
  validateDocumentAnchors(docs, errors);
  validateHarnessSource(errors);

  const result = {
    passed: errors.length === 0,
    errors,
  };

  if (!options.silent) {
    if (result.passed) {
      console.log('finalizer_kernel static check: PASS');
      console.log(`allowlist files: ${EXPECTED_FILES.length}`);
      console.log('snapshot parity: PASS');
      console.log('forbidden claim engine: PASS');
    } else {
      console.error('finalizer_kernel static check: FAIL');
      for (const error of errors) {
        console.error(`FAIL ${error}`);
      }
    }
  }

  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = runStaticChecks();
  process.exitCode = result.passed ? 0 : 1;
}
