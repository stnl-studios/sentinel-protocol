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
  'skills/stnl_project_agent_specializer_dev/reference/kernel_lab/coder_ios_kernel';
const SNAPSHOT_AGENT =
  'skills/stnl_project_agent_specializer_dev/reference/agents/coder-ios.agent.md';
const TEMPLATE_AGENT = 'templates/agents/coder-ios.agent.md';

const BUILDING_STATUS = 'CODER_IOS_KERNEL: BUILDING';
const CLEAN_STATUS = 'CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS';
const expectedStatus =
  process.env.CODER_IOS_KERNEL_STATUS_MODE === 'building' ? BUILDING_STATUS : CLEAN_STATUS;

export const EXPECTED_FILES = Object.freeze([
  'README.md',
  'contracts/CONTRACT.md',
  'contracts/BEHAVIOR_PARITY_SPINE.md',
  'contracts/MINIMUM_SAFE_BUNDLE.md',
  'contracts/CODER_IOS_GATES.md',
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
  'contracts/CODER_IOS_GATES.md',
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
  'reviewer_kernel',
  'finalizer_kernel',
  'resync_kernel',
  'coder_ios_kernel',
]);

const FUTURE_KERNEL_PATTERNS = Object.freeze([
  /project_senior_profile_kernel[\s\S]{0,160}(?:CLEAN_EXCELLENT_PASS|frozen|prepared|promoted)/i,
  /agent_contract_shape_kernel[\s\S]{0,160}(?:CLEAN_EXCELLENT_PASS|frozen|prepared|promoted)/i,
  /status_gates_kernel[\s\S]{0,160}(?:CLEAN_EXCELLENT_PASS|frozen|prepared|promoted)/i,
  /project_context_kernel[\s\S]{0,160}(?:CLEAN_EXCELLENT_PASS|frozen|prepared|promoted)/i,
  /spec_manager_kernel[\s\S]{0,160}(?:CLEAN_EXCELLENT_PASS|frozen|prepared|promoted)/i,
]);

const IGNORED_NAMES = new Set(['__MACOSX', '.DS_Store']);

const scriptPath = fileURLToPath(import.meta.url);
const scriptRealPath = realpathSync.native(scriptPath);
const validationRoot = dirname(scriptRealPath);
const kernelRoot = realpathSync.native(resolve(validationRoot, '..'));
const repoRoot = realpathSync.native(resolve(kernelRoot, '..', '..', '..', '..', '..'));

function toPosix(path) {
  return path.split(sep).join('/');
}

function isInside(root, candidate) {
  const rel = relative(root, candidate);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
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
      errors.push(`${label} escapes expected root`);
      return null;
    }
    const st = statSync(real);
    if (!st.isFile()) {
      errors.push(`${label} must be a regular file`);
      return null;
    }
    return real;
  } catch (error) {
    errors.push(`${label} is not readable as a safe file: ${error.message}`);
    return null;
  }
}

function readRepoBuffer(relPath, errors) {
  const absPath = repoPath(relPath);
  const real = safeFile(absPath, repoRoot, relPath, errors);
  return real ? readFileSync(real) : null;
}

function readRepoText(relPath, errors) {
  const buffer = readRepoBuffer(relPath, errors);
  return buffer ? buffer.toString('utf8') : '';
}

function readKernelText(relPath, errors) {
  const absPath = resolve(kernelRoot, relPath);
  const real = safeFile(absPath, kernelRoot, relPath, errors);
  return real ? readFileSync(real, 'utf8') : '';
}

function walkKernelFiles(dir, errors) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_NAMES.has(entry.name)) {
      continue;
    }
    const absPath = join(dir, entry.name);
    const lst = lstatSync(absPath);
    const relPath = toPosix(relative(kernelRoot, absPath));

    if (lst.isSymbolicLink()) {
      errors.push(`symlink is not allowed in kernel bundle: ${relPath}`);
      continue;
    }
    const real = realpathSync.native(absPath);
    if (!isInside(kernelRoot, real)) {
      errors.push(`walk path escapes kernel root: ${relPath}`);
      continue;
    }
    if (lst.isDirectory()) {
      found.push(...walkKernelFiles(absPath, errors));
      continue;
    }
    if (!lst.isFile()) {
      errors.push(`non-regular filesystem entry is not allowed: ${relPath}`);
      continue;
    }
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

function assertExactSet(actual, expected, label, errors) {
  const duplicates = uniqueDuplicates(actual);
  if (duplicates.length > 0) {
    errors.push(`${label} has duplicate entries: ${duplicates.join(', ')}`);
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

function parseFrontmatter(markdown, errors) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(markdown);
  if (!match) {
    errors.push('snapshot frontmatter block is missing');
    return new Map();
  }
  const entries = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([A-Za-z0-9_-]+):\s*(.+?)\s*$/.exec(line);
    if (field) {
      entries.set(field[1], field[2].replace(/^"(.*)"$/, '$1'));
    }
  }
  return entries;
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

function splitClaimUnits(text) {
  const units = [];
  let paragraph = '';
  let listIntroPrefix = '';
  const flush = () => {
    if (paragraph.trim()) {
      units.push(paragraph.trim());
    }
    paragraph = '';
  };

  for (const rawLine of text.replace(/\r/g, '').split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }
    if (/^```/.test(line) || /^#{1,6}\s+/.test(line)) {
      flush();
      listIntroPrefix = '';
      units.push(line);
      continue;
    }
    if (/\b(?:must not|does not|do not|invalid|forbidden|prohibited|rejected)\b[^.]*:\s*$/i.test(line)) {
      flush();
      listIntroPrefix = line.replace(/:\s*$/, '');
      units.push(line);
      continue;
    }
    const list = /^(?:[-*]|\d+\.)\s+(.+)$/.exec(line);
    const normalizedLine = list ? `${listIntroPrefix ? `${listIntroPrefix} ` : ''}${list[1]}` : line;
    paragraph = paragraph ? `${paragraph} ${normalizedLine}` : normalizedLine;
  }
  flush();

  return units
    .flatMap((unit) => unit.split(/(?<=[.!?;])\s+/))
    .map((unit) => unit.trim())
    .filter(Boolean);
}

function regexMatches(pattern, text) {
  const flags = new Set(pattern.flags);
  flags.add('g');
  const matcher = new RegExp(pattern.source, [...flags].join(''));
  const matches = [];
  let match;
  while ((match = matcher.exec(text)) !== null) {
    matches.push({ text: match[0], index: match.index, end: match.index + match[0].length });
    if (match[0].length === 0) {
      matcher.lastIndex += 1;
    }
  }
  return matches;
}

function lastBoundaryIndex(prefix) {
  let boundary = 0;
  const pattern =
    /[;:]|\b(?:but|however|although|except|unless)\b|\band\s+(?=(?:it|the\s+kernel|the\s+harness|this\s+pass|coder-ios|coder_ios_kernel)?\s*(?:authori[sz]|may|can|could|allows?|permits?|creates?|writes?|performs?|declares?|decides?|replaces?|materiali[sz]))/gi;
  let match;
  while ((match = pattern.exec(prefix)) !== null) {
    boundary = match.index + match[0].length;
  }
  return boundary;
}

function nextBoundaryIndex(suffix) {
  const pattern =
    /[;:]|\b(?:but|however|although|except|unless)\b|\band\s+(?=(?:it|the\s+kernel|the\s+harness|this\s+pass|coder-ios|coder_ios_kernel)?\s*(?:authori[sz]|may|can|could|allows?|permits?|creates?|writes?|performs?|declares?|decides?|replaces?|materiali[sz]))/i;
  const match = pattern.exec(suffix);
  return match ? match.index : suffix.length;
}

function localClaimContext(unit, start, end) {
  const prefix = unit.slice(0, start);
  const suffix = unit.slice(end);
  return unit.slice(lastBoundaryIndex(prefix), end + nextBoundaryIndex(suffix)).trim();
}

function sanitizeNegationText(text) {
  return text
    .replace(/`BLOCKED`/gi, '`TERMINAL_BLOCKED`')
    .replace(/\bnot\s+only\b/gi, 'not-only')
    .replace(/\bnot\s+applicable\b/gi, 'not-applicable');
}

function isProhibitiveLocal(text) {
  const local = sanitizeNegationText(text);
  return /\b(?:does not|do not|must not|should not|may not|cannot|can not|is not|are not|not|never|without|invalid|forbidden|prohibit(?:s|ed)?|reject(?:s|ed)?|block(?:s|ed)?|unauthori[sz]ed|no|non[- ](?:runtime|production)|dev-only|only)\b/i.test(
    local,
  );
}

const forbiddenClaimRules = Object.freeze([
  {
    claimName: 'runtime authorization',
    target: /\bruntime(?:\s+(?:execution|loader|loading|path|temporary files?|temp paths?|artifacts?|adoption))?\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|becomes?|is|may|can|could|active runtime adoption|runtime pass)\b/i,
  },
  {
    claimName: 'production authorization',
    target: /\b(?:production|prod(?:uction)? pass|prod path)\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|becomes?|is|may|can|could|production pass)\b/i,
  },
  {
    claimName: 'materialization authorization',
    target: /\b(?:materiali[sz]ation(?:\s+path)?|materializer|materialize(?:s|d)?|target materialization)\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|becomes?|is|may|can|could|materiali[sz]es?)\b/i,
  },
  {
    claimName: 'GitHub write authorization',
    target: /\bGitHub\s+writes?\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|may|can|could|writes?)\b/i,
  },
  {
    claimName: 'target repo write authorization',
    target: /\b(?:(?:target[- ]repo(?:sitory)?|target repository|repo alvo|repo-target)(?:\s+(?:writes?|changes?))?|writes?\s+(?:to\s+)?(?:target[- ]repo(?:sitory)?|target repository|repo alvo|repo-target))\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|may|can|could|writes?)\b/i,
  },
  {
    claimName: 'productive skill authorization',
    target: /\b(?:productive[- ]skill|skill produtiva)\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|activates?|updates?|changes?|may|can|could)\b/i,
  },
  {
    claimName: 'template mutation authorization',
    target: /\b(?:canonical[- ]template|templates? can[oô]nicos|template mutation|template changes?)\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|enables?|mutates?|updates?|changes?|may|can|could)\b/i,
  },
  {
    claimName: 'target artifact authorization',
    target: /\btarget artifacts?\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|produces?|generates?|enables?|may|can|could)\b/i,
  },
  {
    claimName: 'fixture or generated report authorization',
    target: /\b(?:fixtures?|generated reports?)\b/i,
    trigger: /\b(?:authori[sz](?:e|es|ed|ation)|allows?|permits?|grants?|creates?|produces?|generates?|enables?|may|can|could)\b/i,
  },
  {
    claimName: 'runtime temp source of truth',
    target: /\b(?:workspaceStorage|chat-session-resources|content\.txt|scratchpads?|runtime temporary files?|runtime\/temp paths?)\b/i,
    trigger: /\b(?:source of truth|recover(?:s|ed)?|read(?:s)?|search(?:es)?|uses?|may|can|could)\b/i,
  },
  {
    claimName: 'PLAN durable documentation',
    target: /\bPLAN\.md\b/i,
    trigger: /\b(?:durable documentation|canonical execution artifact|source of truth|may|can|could|becomes?|is)\b/i,
  },
  {
    claimName: 'durable docs ownership',
    target: /\b(?:durable docs?|durable documentation|Feature CONTEXT|core docs|units docs|ADR)\b/i,
    trigger: /\b(?:writes?|edits?|updates?|owns?|authori[sz](?:e|es|ed|ation)|may|can|could)\b/i,
  },
  {
    claimName: 'planner drift',
    target: /\b(?:planner|replan(?:s|ning)?|redefine(?:s)? the cut|execution brief)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|rewrites?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'designer drift',
    target: /\b(?:designer|UX|IA|visual consistency|information architecture)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|decides?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'execution-package-designer drift',
    target: /\b(?:execution-package-designer|EXECUTION PACKAGE|package fields?|BLOCK_IF|OWNED_PATHS)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|rewrites?|recompiles?|reinterprets?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'validation-runner drift',
    target: /\b(?:validation-runner|validation `?PASS`?|runner verdict|proof execution)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|declares?|decides?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'reviewer drift',
    target: /\b(?:reviewer|architecture review|semantic review|CORRECTION PACK)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|declares?|issues?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'finalizer drift',
    target: /\b(?:finalizer|closure|close(?:s)? the round|closure ledger)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|declares?|decides?|closes?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'resync drift',
    target: /\b(?:resync|Resync)\b/i,
    trigger: /\b(?:acts? as|becomes?|replaces?|owns?|performs?|executes?|decides?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
    subject: /\b(?:coder-ios|coder_ios_kernel|the kernel|this kernel|executor|this agent)\b/i,
  },
  {
    claimName: 'DONE decision drift',
    target: /\bDONE:\s*(?:yes|no)|\bDONE\b/i,
    trigger: /\b(?:declares?|decides?|owns?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
  },
  {
    claimName: 'QA success invention',
    target: /\bQA\s+(?:success|passed|pass)\b/i,
    trigger: /\b(?:invents?|declares?|decides?|may|can|could|authori[sz](?:e|es|ed|ation))\b/i,
  },
]);

function isForbiddenClaim(rule, unit) {
  if (!rule.trigger.test(unit)) {
    return false;
  }
  if (rule.subject && !rule.subject.test(unit)) {
    return false;
  }
  const matches = regexMatches(rule.target, unit);
  for (const match of matches) {
    const local = localClaimContext(unit, match.index, match.end);
    if (!isProhibitiveLocal(local)) {
      return true;
    }
  }
  return false;
}

export function findForbiddenClaims(text, options = {}) {
  const source = options.source ?? '<text>';
  const claims = [];
  for (const unit of splitClaimUnits(text)) {
    for (const rule of forbiddenClaimRules) {
      if (isForbiddenClaim(rule, unit)) {
        claims.push({
          source,
          claimName: rule.claimName,
          excerpt: unit.length > 220 ? `${unit.slice(0, 217)}...` : unit,
        });
      }
    }
  }
  return claims;
}

export function findForbiddenClaimsInGoldenTestsDoc(text) {
  const chunks = text.split(/^##\s+(CIOS-GT-\d+[\s\S]*?)$/gm);
  const claims = [];
  if (chunks[0]) {
    claims.push(...findForbiddenClaims(chunks[0], { source: 'GOLDEN_TESTS preamble' }));
  }
  for (let index = 1; index < chunks.length; index += 2) {
    const heading = chunks[index];
    const body = chunks[index + 1] ?? '';
    const block = `## ${heading}${body}`;
    const isRejectedScenario =
      /Expected result:\s*`?BLOCKED`?/i.test(block) ||
      /positive claim is `?BLOCKED`?/i.test(block) ||
      /Expected blocker:\s*(?!none\b)/i.test(block);
    if (!isRejectedScenario) {
      claims.push(...findForbiddenClaims(block, { source: heading.trim() }));
    }
  }
  return claims;
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

  const actualFiles = walkKernelFiles(kernelRoot, errors).sort();
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
    errors.push(`missing canonical template ${TEMPLATE_AGENT}`);
  }
  if (!snapshot) {
    errors.push(`missing dev snapshot ${SNAPSHOT_AGENT}`);
  }
  if (template && snapshot && !template.equals(snapshot)) {
    errors.push('dev snapshot is not byte-for-byte equal to canonical template');
  }

  const frontmatter = parseFrontmatter(snapshot ? snapshot.toString('utf8') : '', errors);
  const expected = new Map([
    ['name', 'coder-ios'],
    ['agent_version', '2026.5.1'],
    ['reading_scope_class', 'targeted-local'],
  ]);
  for (const [field, value] of expected) {
    if (frontmatter.get(field) !== value) {
      errors.push(`snapshot frontmatter ${field} must be ${value}`);
    }
  }
}

function validateStatusLines(docs, errors) {
  const escapedExpected = expectedStatus.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const forbiddenStatus = expectedStatus === CLEAN_STATUS ? BUILDING_STATUS : CLEAN_STATUS;
  const escapedForbidden = forbiddenStatus.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const [relPath, text] of Object.entries(docs)) {
    requirePattern(text, new RegExp(`^Status: \`${escapedExpected}\`\\.`, 'm'), `${relPath} status ${expectedStatus}`, errors);
    if (new RegExp(`^Status: \`${escapedForbidden}\`\\.`, 'm').test(text)) {
      errors.push(`${relPath} contains forbidden status line for this mode: ${forbiddenStatus}`);
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
  validateReadmeAllowlist(docs['README.md'], errors);

  const allDocs = Object.values(docs).join('\n\n');
  const required = [
    ['coder-ios name', /\bcoder-ios\b/],
    ['agent version', /2026\.5\.1/],
    ['role executor', /\brole class:?\s*`?executor`?|\brole class `?executor`?/i],
    ['targeted-local reading', /\btargeted-local\b/i],
    ['native iOS surface', /native iOS/i],
    ['Swift default', /\bSwift\b/],
    ['SwiftUI default', /\bSwiftUI\b[\s\S]{0,120}\bdefault|default[\s\S]{0,120}\bSwiftUI\b/i],
    ['UIKit conditional', /UIKit interop[\s\S]{0,160}(?:conditional|only when|secondary compatibility)/i],
    ['EXECUTION PACKAGE', /EXECUTION PACKAGE/],
    ['WORK_PACKAGE_ID', /WORK_PACKAGE_ID/],
    ['EXECUTION BRIEF', /EXECUTION BRIEF/],
    ['VALIDATION PACK', /VALIDATION PACK/],
    ['REQUIRED_QUALITY_GUARDRAILS', /REQUIRED_QUALITY_GUARDRAILS/],
    ['stnl_mobile_ios_swift_quality', /stnl_mobile_ios_swift_quality/],
    ['READY and BLOCKED', /`READY`[\s\S]{0,80}`BLOCKED`|`BLOCKED`[\s\S]{0,80}`READY`/],
    ['changed paths evidence', /changed paths|applied implementation evidence|applied-change evidence/i],
    ['checks run or not run', /checks run or honestly not run/i],
    ['residual risk', /residual risk/i],
    ['partial edit blocking', /partial edit|partial editing/i],
    ['handoff missing shape', /STATUS:\s*BLOCKED[\s\S]{0,160}REQUEST:\s*replay previous handoff or regenerate from owner/i],
    ['orchestrator relationship', /orchestrator\.agent\.md/i],
    ['planner relationship', /planner\.agent\.md/i],
    ['execution package designer relationship', /execution-package-designer\.agent\.md/i],
    ['validation runner relationship', /validation-runner\.agent\.md/i],
    ['reviewer relationship', /reviewer\.agent\.md/i],
    ['finalizer relationship', /finalizer\.agent\.md/i],
    ['resync relationship', /resync\.agent\.md/i],
    ['designer optional input', /designer\.agent\.md[\s\S]{0,160}(?:UX|interaction|accessibility|visual consistency|information architecture)/i],
    ['coder frontend boundary', /coder-frontend\.agent\.md/i],
    ['coder backend boundary', /coder-backend\.agent\.md/i],
    ['runtime temp paths', /workspaceStorage[\s\S]{0,120}chat-session-resources[\s\S]{0,120}content\.txt[\s\S]{0,120}scratchpads?/i],
    ['PLAN.md durable ban', /PLAN\.md[\s\S]{0,180}(?:not durable|canonical execution artifact)/i],
    ['dev only', /dev-only|dev kernel-lab|kernel lab dev/i],
    ['no materialization path', /no materialization path|not.*materialization path/i],
    ['code fences scanned', /code fences[\s\S]{0,120}scanned by default|scanner preserves fenced blocks/i],
  ];

  for (const [label, pattern] of required) {
    requirePattern(allDocs, pattern, label, errors);
  }

  const sections = [
    ['CONTRACT Identity', docs['contracts/CONTRACT.md'], /^Identity Contract$/i],
    ['CONTRACT Mission', docs['contracts/CONTRACT.md'], /^Mission Contract$/i],
    ['CONTRACT Entry', docs['contracts/CONTRACT.md'], /^Entry Contract$/i],
    ['CONTRACT Input', docs['contracts/CONTRACT.md'], /^Input Contract$/i],
    ['CONTRACT Output', docs['contracts/CONTRACT.md'], /^Output Contract$/i],
    ['CONTRACT Status', docs['contracts/CONTRACT.md'], /^Status Contract$/i],
    ['CONTRACT Boundary', docs['contracts/CONTRACT.md'], /^Boundary Contract$/i],
    ['CONTRACT Reading', docs['contracts/CONTRACT.md'], /^Reading Contract$/i],
    ['GATES CIOS-GATE-001', docs['contracts/CODER_IOS_GATES.md'], /^Gate CIOS-GATE-001/i],
    ['GATES CIOS-GATE-009', docs['contracts/CODER_IOS_GATES.md'], /^Gate CIOS-GATE-009/i],
  ];
  for (const [label, text, heading] of sections) {
    if (!extractSection(text, heading)) {
      errors.push(`missing section ${label}`);
    }
  }

  for (const [relPath, content] of Object.entries(docs)) {
    const claims =
      relPath === 'validation/GOLDEN_TESTS.md'
        ? findForbiddenClaimsInGoldenTestsDoc(content)
        : findForbiddenClaims(content, { source: relPath });
    for (const claim of claims.slice(0, 20)) {
      errors.push(`${relPath} has forbidden ${claim.claimName}: ${claim.excerpt}`);
    }
    if (claims.length > 20) {
      errors.push(`${relPath} has ${claims.length - 20} additional forbidden claims`);
    }
  }
}

function validateGlobalDocs(errors) {
  if (expectedStatus !== CLEAN_STATUS) {
    return;
  }

  const staleCurrentCountPatterns = [
    [/\b(?:eleven|onze)\b/i, 'eleven/onze'],
    [/\b(?:all\s+ten|ten\s+frozen\s+pass|ten\s+passes|ten\s+prepared|ten\s+promoted|dez\s+kernels|dez\s+passes)\b/i, 'ten/dez'],
    [/\b(?:nine|nove)\b/i, 'nine/nove'],
    [/\b(?:eight|oito)\b/i, 'eight/oito'],
    [/\b(?:all\s+seven|seven\s+frozen\s+pass|seven\s+passes|sete\s+kernels|sete\s+passes)\b/i, 'seven/sete'],
  ];

  for (const relPath of GLOBAL_DOCS) {
    const text = readRepoText(relPath, errors);
    if (!/\b(?:twelve|doze)\b/i.test(text)) {
      errors.push(`${relPath} must declare current promoted-kernel count as twelve/doze`);
    }
    for (const [pattern, label] of staleCurrentCountPatterns) {
      if (pattern.test(text)) {
        errors.push(`${relPath} contains stale current-count claim: ${label}`);
      }
    }
    for (const kernel of PROMOTED_KERNELS) {
      if (!text.includes(kernel)) {
        errors.push(`${relPath} missing promoted kernel ${kernel}`);
      }
    }
    if (!/CODER_IOS_KERNEL:\s*CLEAN_EXCELLENT_PASS/.test(text)) {
      errors.push(`${relPath} missing coder iOS clean pass status`);
    }
    if (!/runtime/i.test(text) || !/materiali[sz]ation|materialização/i.test(text)) {
      errors.push(`${relPath} missing runtime/materialization prohibition`);
    }
    if (!/GitHub/i.test(text) || !/repo alvo|target repo|target-repository/i.test(text)) {
      errors.push(`${relPath} missing GitHub/target repo prohibition`);
    }
    for (const pattern of FUTURE_KERNEL_PATTERNS) {
      if (pattern.test(text)) {
        errors.push(`${relPath} promotes a future kernel unexpectedly`);
      }
    }
  }
}

function validateHarnessSource(errors) {
  const source = readFileSync(scriptRealPath, 'utf8');
  const golden = readKernelText('validation/check-golden.mjs', errors);
  const staticAnchors = [
    ['import guard', /pathToFileURL\(process\.argv\[1\]\)\.href/],
    ['ignored mac entries', /__MACOSX[\s\S]{0,80}\.DS_Store/],
    ['allowlist', /EXPECTED_FILES/],
    ['semantic families', /forbiddenClaimRules/],
    ['local polarity', /isProhibitiveLocal[\s\S]{0,160}localClaimContext/],
    ['code fences scanned', /splitClaimUnits/],
    ['global docs twelve enforcement', /twelve\|doze/],
    ['stale eleven enforcement', /eleven\|onze/],
    ['future kernel guard', /FUTURE_KERNEL_PATTERNS/],
  ];
  const goldenAnchors = [
    ['static preflight', /runStaticChecks/],
    ['scenario matrix', /SCENARIOS/],
    ['thirty scenarios', /CIOS-GT-030/],
    ['positive mutations', /positiveMutationCases/],
    ['incomplete scenarios', /incompleteScenarioCases/],
    ['local polarity examples', /validNegativeExamples/],
    ['clean pass not forbidden', /CODER_IOS_KERNEL:\s*CLEAN_EXCELLENT_PASS/],
    ['code fence mutation', /```text/],
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
  validateStatusLines(docs, errors);
  validateDocumentAnchors(docs, errors);
  validateGlobalDocs(errors);
  validateHarnessSource(errors);

  const result = { passed: errors.length === 0, errors, expectedStatus };
  if (!options.silent) {
    if (result.passed) {
      console.log('coder_ios_kernel static check: PASS');
      console.log(`status mode: ${expectedStatus}`);
      console.log(`allowlist files: ${EXPECTED_FILES.length}`);
      console.log('snapshot parity: PASS');
      console.log('forbidden claim engine: PASS');
    } else {
      console.error('coder_ios_kernel static check: FAIL');
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
