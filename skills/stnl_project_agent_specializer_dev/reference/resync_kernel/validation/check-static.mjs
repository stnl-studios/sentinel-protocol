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
  'skills/stnl_project_agent_specializer_dev/reference/resync_kernel';
const SNAPSHOT_AGENT =
  'skills/stnl_project_agent_specializer_dev/reference/agents/resync.agent.md';
const TEMPLATE_AGENT = 'templates/agents/resync.agent.md';

const GLOBAL_DOCS = Object.freeze([
  'skills/stnl_project_agent_specializer_dev/README.md',
  'skills/stnl_project_agent_specializer_dev/SKILL.md',
  'skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md',
  'skills/stnl_project_agent_specializer_dev/reference/kernel_lab/README.md',
]);

export const EXPECTED_FILES = Object.freeze([
  'README.md',
  'contracts/CONTRACT.md',
  'contracts/BEHAVIOR_PARITY_SPINE.md',
  'contracts/MINIMUM_SAFE_BUNDLE.md',
  'contracts/RESYNC_GATES.md',
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
  'contracts/RESYNC_GATES.md',
  'validation/STATIC_CHECKS.md',
  'validation/GOLDEN_TESTS.md',
]);

const EXPECTED_MJS = Object.freeze([
  'validation/check-static.mjs',
  'validation/check-golden.mjs',
]);

const PROMOTED_KERNELS = Object.freeze([
  'orchestrator_kernel',
  'planner_kernel',
  'validation_eval_designer_kernel',
  'execution_package_designer_kernel',
  'designer_kernel',
  'coder_frontend_kernel',
  'coder_backend_kernel',
  'coder_ios_kernel',
  'validation_runner_kernel',
  'reviewer_kernel',
  'finalizer_kernel',
  'resync_kernel',
]);

const IGNORED_NAMES = new Set(['__MACOSX', '.DS_Store']);
const BUILDING_STATUS = 'RESYNC_KERNEL: BUILDING';
const CLEAN_STATUS = 'RESYNC_KERNEL: CLEAN_EXCELLENT_PASS';
const expectedStatus =
  process.env.RESYNC_KERNEL_STATUS_MODE === 'building' ? BUILDING_STATUS : CLEAN_STATUS;

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
      errors.push(`symlink is forbidden inside resync_kernel: ${relPath}`);
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
      errors.push(`unexpected non-file entry inside resync_kernel: ${relPath}`);
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
    /[;:]|\b(?:but|however|though|although|except that)\b|\band\s+(?=(?:this\s+kernel\s+|the\s+resync\s+|resync\s+)?(?:authoriz|may|can|could|allows?|permits?|creates?|updates?|edits?|performs?|executes?|runs?|implements?|fixes?|reissues?|declares?|decides?|means|uses?|searches?|promotes?|closes?|touches?|substitutes?|replaces?))/gi;
  let match;
  while ((match = boundaryPattern.exec(prefix)) !== null) {
    boundary = match.index + match[0].length;
  }
  return boundary;
}

function nextBoundaryIndex(suffix) {
  const boundaryPattern =
    /[;:]|\b(?:but|however|though|although|except that)\b|\band\s+(?=(?:this\s+kernel\s+|the\s+resync\s+|resync\s+)?(?:authoriz|may|can|could|allows?|permits?|creates?|updates?|edits?|performs?|executes?|runs?|implements?|fixes?|reissues?|declares?|decides?|means|uses?|searches?|promotes?|closes?|touches?|substitutes?|replaces?))/i;
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
  const normalized = text.replace(/\byes\/no\b/gi, 'yes_or_no');
  return /\b(?:does not|do not|must not|shall not|should not|may not|cannot|can not|is not|are not|not|never|without|no|reject(?:s|ed)?|block(?:s|ed)?|blocked positive claim|fail if|fails? if|must fail|must be blocked|prohibit(?:s|ed|ion)?|forbid(?:s|den)?|unauthori[sz]ed|invalid|outside scope|separate from|read-only|non-default|sem)\b|\bnon[- ](?:runtime|production|materialization)\b|\bdev-only\b/i.test(
    normalized,
  );
}

function hasAffirmativeAction(text) {
  return /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|may|can|could|creates?|writes?|generates?|executes?|runs?|performs?|implements?|fixes?|patches?|corrects?|substitutes?|replaces?|absorbs?|reruns?|replans?|redefines?|redesigns?|reviews?|judges?|reissues?|declares?|decides?|means|uses?|searches?|adopts?|activates?|enables?|promotes?|closes?|touches?|is|are|becomes?)\b/i.test(
    text,
  );
}

const authorityRules = Object.freeze([
  ['runtime authority', /\bruntime(?:\s+(?:loader|loading|path|artifacts?|adoption|pass|harness|temporary files?))?\b/i],
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
    family: 'finalizer-decision',
    claimName: 'resync decides whether resync is needed',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:decides?|determines?|sets?|chooses?)\b[\s\S]{0,80}\bresync:\s*yes\/no\b|\bresync\b[\s\S]{0,120}\b(?:decides?|determines?)\b[\s\S]{0,80}\bwhether\s+resync\s+is\s+needed\b/i,
  },
  {
    family: 'finalizer-boundary',
    claimName: 'resync replaces finalizer or closes round',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:substitutes?|replaces?|absorbs?|acts as|serves as)\b[\s\S]{0,80}\bfinalizer\b|\bresync\b[\s\S]{0,120}\b(?:closes?|finalizes?|completes?)\b[\s\S]{0,80}\bround\b/i,
  },
  {
    family: 'done-boundary',
    claimName: 'resync touches DONE',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:touches?|writes?|creates?|updates?|decides?|marks?|sets?)\b[\s\S]{0,80}\bDONE\b|\bDONE\b[\s\S]{0,80}\b(?:owned|decided|created|updated|marked)\b[\s\S]{0,80}\bresync\b/i,
  },
  {
    family: 'runner-boundary',
    claimName: 'resync substitutes validation-runner',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:substitutes?|replaces?|absorbs?|overrides?|acts as|serves as|reruns?|runs?|judges?)\b[\s\S]{0,80}\b(?:validation[- ]runner|runner|validation)\b/i,
  },
  {
    family: 'reviewer-boundary',
    claimName: 'resync substitutes reviewer',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:substitutes?|replaces?|absorbs?|overrides?|acts as|serves as|reviews?|judges?)\b[\s\S]{0,80}\b(?:reviewer|architecture review|semantic review|material review risk)\b/i,
  },
  {
    family: 'planner-boundary',
    claimName: 'resync replans or redefines scope',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:replans?|plans?|redefines?\s+the\s+feature|redefines?\s+scope|re[- ]cuts?|rewrites?\s+the\s+`?EXECUTION BRIEF`?)\b/i,
  },
  {
    family: 'coder-boundary',
    claimName: 'resync implements or fixes code',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:implements?|fixes?|patches?|corrects?\s+code|edits?\s+implementation|changes?\s+code)\b/i,
  },
  {
    family: 'proof-boundary',
    claimName: 'resync redesigns proof',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:redesigns?\s+proof|redesigns?\s+the\s+`?VALIDATION PACK`?|rewrites?\s+the\s+`?VALIDATION PACK`?)\b/i,
  },
  {
    family: 'execution-package-boundary',
    claimName: 'resync substitutes execution-package design',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:reinterpret(?:s|ed|ing)?|rewrite(?:s|ing)?|recompile(?:s|d|ing)?)\b[\s\S]{0,80}\b`?EXECUTION PACKAGE`?\b/i,
  },
  {
    family: 'ready-pass',
    claimName: 'READY means validation PASS',
    pattern:
      /\bREADY\b[\s\S]{0,80}\b(?:means|equals|is|counts as|becomes)\b[\s\S]{0,60}\b(?:validation\s+)?PASS\b|\bPASS\b[\s\S]{0,80}\b(?:because|from)\b[\s\S]{0,60}\bREADY\b/i,
  },
  {
    family: 'qa-inflation',
    claimName: 'QA or validation success invented',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:declares?|invents?|creates?)\b[\s\S]{0,80}\b(?:QA success|validation\s+PASS)\b|\bQA\b[\s\S]{0,80}\b(?:success|passed)\b[\s\S]{0,80}\b(?:from|because of)\b[\s\S]{0,80}\bresync\b/i,
  },
  {
    family: 'legacy-durable-docs',
    claimName: 'temporary docs become durable documentation',
    pattern:
      /\b(?:PLAN\.md|execution_brief\.md|validation_pack\.md|execution_package\.md|legacy phase artifact|scratchpads?|generated reports?)\b[\s\S]{0,120}\b(?:durable documentation|source of truth|canonical docs?)\b|\bdurable documentation\b[\s\S]{0,120}\b(?:PLAN\.md|execution_brief\.md|validation_pack\.md|execution_package\.md|scratchpads?|generated reports?)\b/i,
  },
  {
    family: 'runtime-temp-search',
    claimName: 'runtime temp path source of truth',
    pattern:
      /\bsearch(?:es|ed|ing)?\b[\s\S]{0,120}\b(?:workspaceStorage|chat-session-resources|content\.txt|scratchpads?|runtime temporary files?)\b|\b(?:workspaceStorage|chat-session-resources|content\.txt|scratchpads?|runtime temporary files?)\b[\s\S]{0,120}\b(?:source of truth|handoffs?|evidence)\b/i,
  },
  {
    family: 'doc-sprawl',
    claimName: 'resync broad documentation campaign',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:refreshes?|updates?|rewrites?|syncs?)\b[\s\S]{0,80}\b(?:all docs|broader docs tree|general documentation|documentation campaign|multiple independent sync surfaces)\b/i,
  },
  {
    family: 'normative-drift',
    claimName: 'resync rewrites ADR or normative RULES by default',
    pattern:
      /\bresync\b[\s\S]{0,120}\b(?:rewrites?|updates?|edits?|changes?)\b[\s\S]{0,80}\b(?:ADR|normative\s+`?RULES`?|policy|architecture)\b/i,
  },
  {
    family: 'future-promotion',
    claimName: 'automatic future promotion',
    pattern:
      /\bautomatic future promotion\b|\bfuture kernels?\b[\s\S]{0,80}\b(?:automatically|auto-promot)/i,
  },
]);

function claimFromRule(rule, unit, match) {
  const local = localClaimContext(unit, match.index, match.end);
  if (isProhibitiveLocal(local)) {
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
    const scenario = /^##\s+Golden Test (RSY-GT-\d{3})\b/.exec(line);
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
    ['name', 'resync'],
    ['agent_version', '2026.5.1'],
    ['reading_scope_class', 'targeted-local'],
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
      new RegExp(`^Status: \`${expectedStatus.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\`\\.`, 'm'),
      `${relPath} expected local status ${expectedStatus}`,
      errors,
    );
    const forbiddenStatus = expectedStatus === CLEAN_STATUS ? BUILDING_STATUS : CLEAN_STATUS;
    const forbiddenStatusLine = new RegExp(`^Status: \`${forbiddenStatus.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\`\\.`, 'm');
    if (forbiddenStatusLine.test(docs[relPath])) {
      errors.push(`${relPath} contains forbidden status line for this mode: ${forbiddenStatus}`);
    }
  }

  validateReadmeAllowlist(docs['README.md'], errors);

  const contract = docs['contracts/CONTRACT.md'];
  const requiredSections = [
    /^Identity Contract$/i,
    /^Mission Contract$/i,
    /^Entry Contract$/i,
    /^Finalizer Relationship Contract$/i,
    /^Input Contract$/i,
    /^Evidence Contract$/i,
    /^Durable Documentation Contract$/i,
    /^Output Contract$/i,
    /^Status Contract$/i,
    /^Boundary Contract$/i,
    /^Reading Contract$/i,
    /^Escalation Contract$/i,
  ];
  for (const heading of requiredSections) {
    if (!extractSection(contract, heading)) {
      errors.push(`CONTRACT.md missing section ${heading}`);
    }
  }

  const allDocs = Object.values(docs).join('\n\n');
  const anchors = [
    ['name resync', /\bname:\s*resync\b/],
    ['agent version', /\bagent_version:\s*2026\.5\.1\b/],
    ['role sync', /\brole class:\s*`?sync`?|\brole class `?sync`?/i],
    ['targeted local', /\btargeted-local\b/i],
    ['finalizer only entry', /enters only when `?finalizer\.agent\.md`? requests it|finalizer-only entry/i],
    ['finalizer decides resync', /finalizer decides `?resync:\s*yes\/no`?/i],
    ['resync consumes finalizer delta', /finalizer-supplied factual delta|consume[s]? the finalizer-supplied factual delta/i],
    ['READY BLOCKED statuses', /`READY`[\s\S]{0,80}`BLOCKED`|`BLOCKED`[\s\S]{0,80}`READY`/],
    ['READY evidence', /READY[\s\S]{0,160}actual minimum factual sync edit|READY[\s\S]{0,160}applied shared target path/i],
    ['BLOCKED conditions', /BLOCKED[\s\S]{0,120}delta[\s\S]{0,80}target[\s\S]{0,80}evidence/i],
    ['factual delta qualification', /already established by the round[\s\S]{0,120}useful outside the feature[\s\S]{0,120}stable enough/i],
    ['shared local normative buckets', /shared fact that should be synchronized[\s\S]{0,120}local feature detail[\s\S]{0,120}normative or structural change/i],
    ['allowed durable docs', /docs\/core\/\{CONTEXT,RULES,STATE,CONTRACTS,TESTING\}\.md[\s\S]{0,120}docs\/TBDS\.md[\s\S]{0,120}docs\/INDEX\.md/i],
    ['Feature CONTEXT read-only', /Feature CONTEXT[\s\S]{0,120}read-only/i],
    ['ADR and RULES non-default', /ADR[\s\S]{0,120}normative `?RULES`?[\s\S]{0,120}not default|non-default/i],
    ['valid handoffs', /finalizer-owned[\s\S]{0,160}orchestrator-replayed/i],
    ['invalid handoffs', /Missing[\s\S]{0,80}implicit[\s\S]{0,80}ambiguous[\s\S]{0,80}stale/i],
    ['runtime temp paths', /workspaceStorage[\s\S]{0,120}chat-session-resources[\s\S]{0,120}content\.txt[\s\S]{0,120}scratchpads/i],
    ['PLAN.md prohibited', /PLAN\.md[\s\S]{0,180}not durable documentation|not durable documentation[\s\S]{0,180}PLAN\.md|PLAN\.md[\s\S]{0,180}are not durable/i],
    ['no implementation', /does not implement|must not:[\s\S]{0,120}implement/i],
    ['no validation ownership', /does not[\s\S]{0,80}(?:run|judge) validation|must not:[\s\S]{0,180}run, rerun, redefine, or judge validation/i],
    ['no runner replacement', /substitute `?validation-runner\.agent\.md`?|validation-runner substitution/i],
    ['no reviewer replacement', /substitute `?reviewer\.agent\.md`?|reviewer substitution/i],
    ['no planner coder drift', /substitute `?planner\.agent\.md`?[\s\S]{0,120}coders|planner or proof redesign blocks/i],
    ['no finalizer replacement', /replace `?finalizer\.agent\.md`?|finalizer substitution/i],
    ['no DONE', /touch `?DONE`?|does not decide `?DONE`?/i],
    ['no QA success invention', /invent QA success|QA success invention/i],
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

function manifestListsResync(manifestText) {
  return (
    manifestText.includes('reference/agents/resync.agent.md') &&
    manifestText.includes('reference/resync_kernel/README.md') &&
    manifestText.includes('reference/resync_kernel/validation/check-static.mjs') &&
    manifestText.includes('reference/resync_kernel/validation/check-golden.mjs')
  );
}

function validateGlobalDocs(errors) {
  const docs = Object.fromEntries(
    GLOBAL_DOCS.map((relPath) => [relPath, readRepoText(relPath, errors)]),
  );
  const manifestText = docs['skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md'];
  if (!manifestListsResync(manifestText)) {
    return;
  }

  const staleCurrentCountPatterns = [
    [/\b(?:eleven|onze)\b/i, 'eleven/onze promoted kernels'],
    [/\bAll\s+ten\s+passes\b/i, 'All ten passes'],
    [/\bthe\s+ten\s+frozen\s+pass\s+statuses\b/i, 'the ten frozen pass statuses'],
    [/\bthere\s+are\s+ten\s+(?:frozen|prepared|promoted)\s+kernels\b/i, 'there are ten promoted kernels'],
    [/\bHá\s+dez\s+kernels\b/i, 'Ha dez kernels'],
    [/\bdez\s+kernels\s+(?:congelados|preparados|promovidos)/i, 'dez kernels promoted'],
    [/\bnine\s+(?:frozen|prepared|promoted)\s+kernels\b/i, 'nine promoted kernels'],
    [/\beight\s+(?:frozen|prepared|promoted)\s+kernels\b/i, 'eight promoted kernels'],
    [/\bseven\s+(?:frozen|prepared|promoted)\s+kernels\b/i, 'seven promoted kernels'],
    [/\bnove\s+kernels\s+(?:congelados|preparados|promovidos)/i, 'nove promoted kernels'],
    [/\boito\s+kernels\s+(?:congelados|preparados|promovidos)/i, 'oito promoted kernels'],
    [/\bsete\s+kernels\s+(?:congelados|preparados|promovidos)/i, 'sete promoted kernels'],
  ];

  for (const [relPath, text] of Object.entries(docs)) {
    if (!/twelve|doze/i.test(text)) {
      errors.push(`${relPath} must declare the current prepared-kernel count as twelve/doze after coder_ios promotion`);
    }
    if (!text.includes('resync_kernel')) {
      errors.push(`${relPath} must list resync_kernel after resync promotion`);
    }
    if (!text.includes('coder_ios_kernel')) {
      errors.push(`${relPath} must list coder_ios_kernel after coder_ios promotion`);
    }
    if (!/CODER_IOS_KERNEL:\s*CLEAN_EXCELLENT_PASS/.test(text)) {
      errors.push(`${relPath} must declare CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS after coder_ios promotion`);
    }
    for (const [pattern, label] of staleCurrentCountPatterns) {
      if (pattern.test(text)) {
        errors.push(`${relPath} contains stale current-count claim: ${label}`);
      }
    }
  }

  for (const kernel of PROMOTED_KERNELS) {
    if (!manifestText.includes(kernel)) {
      errors.push(`MANIFEST.md must mention promoted kernel ${kernel}`);
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
    ['status mode', /RESYNC_KERNEL_STATUS_MODE/],
    ['global docs twelve enforcement', /manifestListsResync[\s\S]{0,220}twelve|doze/i],
    ['global docs stale eleven enforcement', /eleven\/onze promoted kernels/i],
  ];
  const goldenAnchors = [
    ['static preflight', /runStaticChecks/],
    ['scenario matrix', /SCENARIOS/],
    ['RSY-GT-001', /RSY-GT-001/],
    ['RSY-GT-024', /RSY-GT-024/],
    ['positive mutations', /positiveMutationCases/],
    ['incomplete scenarios', /incompleteScenarioCases/],
    ['clean pass not forbidden', /RESYNC_KERNEL:\s*CLEAN_EXCELLENT_PASS/],
    ['local polarity examples', /validNegativeExamples/],
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
  validateGlobalDocs(errors);
  validateHarnessSource(errors);

  const result = {
    passed: errors.length === 0,
    errors,
    expectedStatus,
  };

  if (!options.silent) {
    if (result.passed) {
      console.log('resync_kernel static check: PASS');
      console.log(`status mode: ${expectedStatus}`);
      console.log(`allowlist files: ${EXPECTED_FILES.length}`);
      console.log('snapshot parity: PASS');
      console.log('forbidden claim engine: PASS');
    } else {
      console.error('resync_kernel static check: FAIL');
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
