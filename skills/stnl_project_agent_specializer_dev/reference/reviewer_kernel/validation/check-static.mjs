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

const KERNEL_PREFIX =
  'skills/stnl_project_agent_specializer_dev/reference/reviewer_kernel';
const SNAPSHOT_AGENT =
  'skills/stnl_project_agent_specializer_dev/reference/agents/reviewer.agent.md';
const TEMPLATE_AGENT = 'templates/agents/reviewer.agent.md';

const EXPECTED_FILES = Object.freeze([
  'README.md',
  'contracts/CONTRACT.md',
  'contracts/BEHAVIOR_PARITY_SPINE.md',
  'contracts/MINIMUM_SAFE_BUNDLE.md',
  'contracts/SEMANTIC_REVIEW_GATES.md',
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
  'contracts/SEMANTIC_REVIEW_GATES.md',
  'validation/STATIC_CHECKS.md',
  'validation/GOLDEN_TESTS.md',
]);

const IGNORED_NAMES = new Set(['__MACOSX', '.DS_Store']);
const errors = [];

const scriptPath = fileURLToPath(import.meta.url);
const scriptRealPath = realpathSync.native(scriptPath);
const validationRoot = dirname(scriptRealPath);
const kernelRoot = realpathSync.native(resolve(validationRoot, '..'));
const repoRoot = findRepoRoot(kernelRoot);

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

function findRepoRoot(startPath) {
  let cursor = realpathSync.native(startPath);
  for (;;) {
    const reviewerKernel = resolve(cursor, KERNEL_PREFIX);
    const snapshot = resolve(cursor, SNAPSHOT_AGENT);
    const template = resolve(cursor, TEMPLATE_AGENT);
    if (existsSync(reviewerKernel) && existsSync(snapshot) && existsSync(template)) {
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
  assert(isInside(repoRoot, absPath), `${relPath} escapes repo root before realpath`);
  return absPath;
}

function safeFile(absPath, root, label) {
  try {
    const lst = lstatSync(absPath);
    assert(!lst.isSymbolicLink(), `${label} must not be a symlink`);
    const real = realpathSync.native(absPath);
    assert(isInside(root, real), `${label} escapes expected root after realpath`);
    const st = statSync(real);
    assert(st.isFile(), `${label} must be a regular file`);
    return real;
  } catch (error) {
    fail(`${label} is not a safe readable file: ${error.message}`);
    return null;
  }
}

function readRepoText(relPath) {
  const real = safeFile(repoPath(relPath), repoRoot, relPath);
  return real ? readFileSync(real, 'utf8') : '';
}

function readRepoBuffer(relPath) {
  const real = safeFile(repoPath(relPath), repoRoot, relPath);
  return real ? readFileSync(real) : null;
}

function readKernelText(relPath) {
  return readRepoText(`${KERNEL_PREFIX}/${relPath}`);
}

function walkKernelFiles(absDir, root, out = []) {
  for (const dirent of readdirSync(absDir, { withFileTypes: true })) {
    if (IGNORED_NAMES.has(dirent.name)) {
      continue;
    }
    const absPath = join(absDir, dirent.name);
    const relPath = toPosix(relative(root, absPath));
    const lst = lstatSync(absPath);
    assert(!lst.isSymbolicLink(), `symlink is forbidden inside reviewer_kernel: ${relPath}`);
    const real = realpathSync.native(absPath);
    assert(isInside(root, real), `kernel entry escapes root after realpath: ${relPath}`);
    if (lst.isDirectory()) {
      walkKernelFiles(absPath, root, out);
    } else if (lst.isFile()) {
      out.push(relPath);
    } else {
      fail(`unexpected non-file entry inside reviewer_kernel: ${relPath}`);
    }
  }
  return out;
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
    fail(`Missing section: ${label}`);
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

function requirePatterns(text, requirements, label) {
  for (const [name, pattern] of requirements) {
    assert(pattern.test(text), `${label} missing ${name}`);
  }
}

function normalizeFrontmatterValue(value) {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function parseFrontmatter(markdown, label) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(markdown);
  assert(Boolean(match), `${label} must start with YAML frontmatter`);
  const frontmatter = new Map();
  if (!match) {
    return frontmatter;
  }
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (field) {
      frontmatter.set(field[1], normalizeFrontmatterValue(field[2]));
    }
  }
  return frontmatter;
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

function findAffirmativeClaims(text, claims, label) {
  for (const match of findForbiddenClaims(text, claims)) {
    assert(Boolean(match.blocker), `${label} prohibited claim (${match.claimName}) must include semantic blocker`);
    assert(Boolean(match.excerpt), `${label} prohibited claim (${match.claimName}) must include useful excerpt`);
    fail(`${label} has non-negated prohibited claim ${match.blocker} (${match.claimName}): ${match.excerpt}`);
  }
}

function requireIds(text, prefix, first, last, label) {
  for (let index = first; index <= last; index += 1) {
    const id = `${prefix}${String(index).padStart(3, '0')}`;
    assert(new RegExp(`\\b${id}\\b`).test(text), `${label} missing ${id}`);
  }
}

function checkPathAndAllowlist() {
  assert(isInside(repoRoot, kernelRoot), 'reviewer_kernel root must be inside repo root');
  assert(kernelRoot === realpathSync.native(repoPath(KERNEL_PREFIX)), 'kernel root mismatch');
  assert(validationRoot === realpathSync.native(resolve(kernelRoot, 'validation')), 'validation root mismatch');

  const found = walkKernelFiles(kernelRoot, kernelRoot).sort();
  const expected = [...EXPECTED_FILES].sort();
  assert(
    JSON.stringify(found) === JSON.stringify(expected),
    `reviewer_kernel file allowlist mismatch. expected=${expected.join(', ')} found=${found.join(', ')}`,
  );

  for (const relPath of found) {
    if (relPath.endsWith('.js') || relPath.endsWith('.cjs')) {
      fail(`unexpected executable extension inside reviewer_kernel: ${relPath}`);
    }
    if (
      /(?:^|\/)(?:fixtures?|reports?|generated|runtime|loader|materializer|materialization|target-artifacts?)(?:\/|$)/i.test(
        relPath,
      )
    ) {
      fail(`forbidden artifact path inside reviewer_kernel: ${relPath}`);
    }
  }
}

function checkSnapshotParity() {
  const template = readRepoBuffer(TEMPLATE_AGENT);
  const snapshot = readRepoBuffer(SNAPSHOT_AGENT);
  assert(Boolean(snapshot), 'reviewer snapshot must exist and be readable');
  assert(Boolean(template), 'reviewer template must exist and be readable for byte comparison');
  if (template && snapshot) {
    assert(template.equals(snapshot), 'reviewer snapshot diverges from productive template byte-for-byte');
  }

  const frontmatter = parseFrontmatter(readRepoText(SNAPSHOT_AGENT), SNAPSHOT_AGENT);
  assert(frontmatter.get('name') === 'reviewer', 'snapshot frontmatter name must be reviewer');
  assert(frontmatter.get('agent_version') === '2026.5.1', 'snapshot agent_version must be 2026.5.1');
  assert(
    frontmatter.get('reading_scope_class') === 'review-minimal',
    'snapshot reading_scope_class must be review-minimal',
  );
}

const forbiddenDocumentClaims = Object.freeze([
  { name: 'CLEAN_EXCELLENT_PASS', blocker: 'BLOCKED_RV_STATUS_PROMOTION', pattern: /\bCLEAN_EXCELLENT_PASS\b/i, standalone: true },
  { name: 'promotion', blocker: 'BLOCKED_RV_STATUS_PROMOTION', pattern: /\b(?:promotion|promoted|promote|promotes|promovido|promocao|promoção)\b/i },
  { name: 'runtime', blocker: 'BLOCKED_RV_RUNTIME_AUTHORIZATION', pattern: /\bruntime\b/i },
  { name: 'runtime loader', blocker: 'BLOCKED_RV_RUNTIME_LOADER_AUTHORIZATION', pattern: /\bruntime loader\b/i },
  { name: 'materialization', blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION', pattern: /\bmateriali[sz]ation(?: path)?\b/i },
  { name: 'materializer', blocker: 'BLOCKED_RV_MATERIALIZER_AUTHORIZATION', pattern: /\bmaterializer\b/i },
  { name: 'production', blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION', pattern: /\bproduction\b/i },
  { name: 'productive skill activation', blocker: 'BLOCKED_RV_PRODUCTIVE_SKILL_AUTHORIZATION', pattern: /\bproductive[- ]skill activation\b/i },
  { name: 'GitHub write', blocker: 'BLOCKED_RV_GITHUB_WRITE_AUTHORIZATION', pattern: /\bGitHub writes?\b|\bwrite(?:s)? to GitHub\b/i },
  { name: 'target repo write', blocker: 'BLOCKED_RV_TARGET_REPO_WRITE_AUTHORIZATION', pattern: /\btarget[- ]repo(?:sitory)? writes?\b|\bwrite(?:s)? to target[- ]repo/i },
  { name: 'target artifact', blocker: 'BLOCKED_RV_TARGET_ARTIFACT_AUTHORIZATION', pattern: /\btarget artifacts?\b/i },
  { name: 'fixture', blocker: 'BLOCKED_RV_FIXTURE_AUTHORIZATION', pattern: /\bfixtures?\b/i },
  { name: 'generated report', blocker: 'BLOCKED_RV_GENERATED_REPORT_AUTHORIZATION', pattern: /\bgenerated reports?\b/i },
]);

function checkDocumentStatus(docs) {
  for (const [relPath, text] of docs) {
    assert(
      /REVIEWER_KERNEL:\s*INITIAL_DRAFT/.test(text),
      `${relPath} must preserve REVIEWER_KERNEL: INITIAL_DRAFT`,
    );
    findAffirmativeClaims(text, forbiddenDocumentClaims, relPath);
  }
}

function checkSectionAwareAnchors(docs) {
  const readme = docs.get('README.md') ?? '';
  const contract = docs.get('contracts/CONTRACT.md') ?? '';
  const spine = docs.get('contracts/BEHAVIOR_PARITY_SPINE.md') ?? '';
  const gates = docs.get('contracts/SEMANTIC_REVIEW_GATES.md') ?? '';

  const identity = extractSection(contract, /^Identity$/i, 'CONTRACT Identity');
  requirePatterns(
    identity,
    [
      ['reviewer identity', /\breviewer\b/i],
      ['agent version', /\b2026\.5\.1\b/],
      ['semantic-review role', /\bsemantic-review\b/i],
      ['review-minimal reading', /\breview-minimal\b/i],
      ['post-implementation placement', /\bafter concrete implementation\b/i],
      ['pre-finalizer placement', /\bbefore `?finalizer`?\b/i],
      ['implemented artifact target', /\bimplemented artifact\b/i],
      ['resulting diff target', /\bresulting diff\b/i],
    ],
    'CONTRACT Identity',
  );

  const entry = extractSection(contract, /^Entry Contract$/i, 'CONTRACT Entry Contract');
  requirePatterns(
    entry,
    [
      ['concrete artifact or trustworthy diff', /\bconcrete artifact\b|\btrustworthy applied diff\b/i],
      ['required/advisory classification', /\brequired\b[\s\S]*\badvisory\b|\badvisory\b[\s\S]*\brequired\b/i],
      ['minimum evidence', /\bminimum evidence\b/i],
    ],
    'CONTRACT Entry Contract',
  );

  const output = extractSection(contract, /^Output Contract$/i, 'CONTRACT Output Contract');
  requirePatterns(
    output,
    [
      ['short delta-only', /\bshort\b[\s\S]*\bdelta-only\b/i],
      ['PASS terminal output', /\bPASS\b/],
      ['FAIL terminal output', /\bFAIL\b/],
      ['exactly one CORRECTION PACK', /\bexactly one\b[\s\S]*\bCORRECTION PACK\b/i],
      ['mutual exclusion', /\bmutually exclusive\b[\s\S]*\bPASS\b[\s\S]*\bFAIL\b/i],
      ['PASS structural adherence', /\bPASS\b[\s\S]*\bstructural adherence\b/i],
      ['FAIL material risk', /\bFAIL\b[\s\S]*\bmaterial\b[\s\S]*\brisk\b/i],
    ],
    'CONTRACT Output Contract',
  );

  const correction = extractSection(contract, /^Correction Contract$/i, 'CONTRACT Correction Contract');
  requirePatterns(
    correction,
    [
      ['minimal in-scope corrigible budget', /\bminimal\b[\s\S]*\bin-scope\b[\s\S]*\bcorrigible\b[\s\S]*\bbudget\b/i],
      ['route not execute', /\bdoes not execute\b[\s\S]*\brout/i],
      ['exact heading', /\bheading must be exactly `?CORRECTION PACK`?/i],
    ],
    'CONTRACT Correction Contract',
  );

  const scopeLimits = extractSection(readme, /^Scope Limits$/i, 'README Scope Limits');
  requirePatterns(
    scopeLimits,
    [
      ['reviewer', /\breviewer\b/i],
      ['semantic-review', /\bsemantic-review\b/i],
      ['review-minimal', /\breview-minimal\b/i],
      ['post implementation pre finalizer', /\bafter concrete implementation\b[\s\S]*\bbefore finalization\b/i],
      ['required advisory output', /\bmay emit\b[\s\S]*\bPASS\b[\s\S]*\bFAIL\b[\s\S]*\bCORRECTION PACK\b/i],
    ],
    'README Scope Limits',
  );

  const spineOutput = extractSection(spine, /^Output Parity$/i, 'BEHAVIOR_PARITY_SPINE Output Parity');
  requirePatterns(
    spineOutput,
    [
      ['short delta-only', /\bshort\b[\s\S]*\bdelta-only\b/i],
      ['PASS', /\bPASS\b/],
      ['FAIL', /\bFAIL\b/],
      ['CORRECTION PACK exclusive', /\bCORRECTION PACK\b[\s\S]*\bmutually exclusive\b/i],
    ],
    'BEHAVIOR_PARITY_SPINE Output Parity',
  );

  const gate8 = extractSection(gates, /RV-GATE-008/i, 'RV-GATE-008');
  requirePatterns(
    gate8,
    [
      ['exactly one correction pack', /\bExactly one\b[\s\S]*\bCORRECTION PACK\b/i],
      ['minimal in-scope surgical budget', /\bminimal\b[\s\S]*\bin-scope\b[\s\S]*\bsurgical\b[\s\S]*\bbudget\b/i],
      ['exclusive with PASS FAIL', /\bmutually exclusive\b[\s\S]*\bPASS\b[\s\S]*\bFAIL\b/i],
    ],
    'RV-GATE-008',
  );
}

function checkOutputContract(docs) {
  const contract = docs.get('contracts/CONTRACT.md') ?? '';
  const output = extractSection(contract, /^Output Contract$/i, 'CONTRACT Output Contract');
  const correction = extractSection(contract, /^Correction Contract$/i, 'CONTRACT Correction Contract');
  requirePatterns(
    output,
    [
      ['allowed terminal outputs only PASS FAIL', /Allowed terminal outputs:[\s\S]*-\s+`?PASS`?[\s\S]*-\s+`?FAIL`?/i],
      ['allowed non terminal exactly one correction pack', /Allowed non-terminal output:[\s\S]*exactly one[\s\S]*CORRECTION PACK/i],
      ['correction mutually exclusive', /CORRECTION PACK[\s\S]*mutually exclusive[\s\S]*PASS[\s\S]*FAIL/i],
      ['PASS requires adherence and no unresolved material risk', /PASS[\s\S]*structural adherence[\s\S]*no unresolved\s+material structural risk/i],
      ['FAIL requires material risk drift inference scope or inability', /FAIL[\s\S]*(?:material structural risk|boundary|contract drift|unauthorized inference|scope expansion|inability to judge)/i],
    ],
    'Output contract',
  );
  requirePatterns(
    correction,
    [
      ['correction pack limited gate', /CORRECTION PACK[\s\S]*minimal[\s\S]*in-scope[\s\S]*corrigible[\s\S]*budget/i],
      ['reviewer routes but does not execute', /does not execute[\s\S]*routeable/i],
    ],
    'Correction contract',
  );
}

function checkBoundaryContract(docs) {
  const readme = docs.get('README.md') ?? '';
  const contract = docs.get('contracts/CONTRACT.md') ?? '';
  const spine = docs.get('contracts/BEHAVIOR_PARITY_SPINE.md') ?? '';
  const gates = docs.get('contracts/SEMANTIC_REVIEW_GATES.md') ?? '';
  const boundary = extractSection(contract, /^Boundary Contract$/i, 'CONTRACT Boundary Contract');
  const negative = extractSection(spine, /^Negative Space$/i, 'BEHAVIOR_PARITY_SPINE Negative Space');
  const boundaryParity = extractSection(spine, /^Boundary Parity$/i, 'BEHAVIOR_PARITY_SPINE Boundary Parity');
  const gateText = `${extractSection(gates, /RV-GATE-005/i, 'RV-GATE-005')}
${extractSection(gates, /RV-GATE-009/i, 'RV-GATE-009')}
${extractSection(gates, /RV-GATE-010/i, 'RV-GATE-010')}
${extractSection(gates, /RV-GATE-011/i, 'RV-GATE-011')}
${extractSection(gates, /RV-GATE-012/i, 'RV-GATE-012')}`;
  const combined = `${boundary}\n${negative}\n${boundaryParity}\n${gateText}\n${readme}`;

  requirePatterns(
    combined,
    [
      ['does not replace validation-runner', /does not (?:run validation instead of|replace)\s+`?validation-runner`?/i],
      ['does not replace finalizer', /does not (?:close the round|replace finalizer|replace closure|decide `?DONE`?)/i],
      ['does not replace resync', /does not (?:sync shared docs|performing resync|write shared canon|decide factual sync)/i],
      ['does not replace coder fixer', /does not (?:edit code|implement(?: its own)? correction pack|apply patches|patching)/i],
      ['planner boundary', /plan, brief, package, or cut redesign|redesign the plan|planner/i],
      ['execution package designer boundary', /EXECUTION PACKAGE design|redesign the package|execution-package designer/i],
      ['validation pack designer boundary', /VALIDATION PACK design|proof designer|validation-pack designer/i],
      ['not generic opinion reviewer', /generic review agent|generic opinion|repo-wide|aesthetic preference/i],
      ['does not execute validation', /does not run validation|does not execute validation|validation proof execution/i],
      ['does not collect proof', /proof, check execution, evidence|proof ownership/i],
      ['no runner PARTIAL BLOCKED verdict ownership', /verdicts `?PASS`?,\s*`?PARTIAL`?,\s*`?FAIL`?,\s*and `?BLOCKED`?/i],
      ['green tests not automatic structural approval', /green (?:checks|tests|proof)[\s\S]*do not force structural approval|does not transform green tests/i],
      ['does not decide DONE', /does not decide `?DONE`?/i],
      ['does not close round', /does not close the round/i],
      ['does not write durable docs', /does not write Feature CONTEXT|does not write shared canon|durable documentation/i],
      ['does not broad refactor', /broad refactor/i],
      ['does not redesign cut/package', /redesign(?:s)? (?:the )?(?:plan|brief|package|cut)|cut redesign/i],
      ['does not broad discovery', /repo-wide|broad discovery|broad rediscovery/i],
      ['preference not blocker', /aesthetic preference|subjective preference|style, taste, naming/i],
    ],
    'Boundary contract',
  );
}

function checkReadingContract(docs) {
  const contract = docs.get('contracts/CONTRACT.md') ?? '';
  const gates = docs.get('contracts/SEMANTIC_REVIEW_GATES.md') ?? '';
  const reading = extractSection(contract, /^Reading Contract$/i, 'CONTRACT Reading Contract');
  const gate3 = extractSection(gates, /RV-GATE-003/i, 'RV-GATE-003');
  const combined = `${reading}\n${gate3}`;
  requirePatterns(
    combined,
    [
      ['review-minimal', /\breview-minimal\b/i],
      ['EXECUTION BRIEF first', /read `?EXECUTION BRIEF`? first/i],
      ['EXECUTION PACKAGE when package boundaries shaped work', /EXECUTION PACKAGE[\s\S]*package boundaries shaped/i],
      ['implemented artifact or applied diff', /implemented artifact or applied diff/i],
      ['minimum execution evidence', /minimum execution evidence/i],
      ['at most one nearest reference', /at most (?:the )?nearest|one nearest rule/i],
      ['one concrete structural question', /one concrete structural question/i],
      ['File Purpose Header awareness', /File Purpose Header/i],
      ['honest fail when bounded reading insufficient', /cannot support honest semantic review[\s\S]*FAIL/i],
      ['reject broad discovery', /must not reopen discovery|broad rediscovery|repo-wide/i],
      ['reject scratchpads', /scratchpads/i],
      ['reject workspaceStorage', /workspaceStorage/i],
      ['reject chat-session-resources', /chat-session-resources/i],
      ['reject content.txt', /content\.txt/i],
      ['reject runtime temp paths', /runtime temp paths|runtime temporary files/i],
      ['source of truth prohibition', /source of truth/i],
    ],
    'Reading contract',
  );
}

function checkIds(docs) {
  const gates = docs.get('contracts/SEMANTIC_REVIEW_GATES.md') ?? '';
  const staticChecks = docs.get('validation/STATIC_CHECKS.md') ?? '';
  const goldenTests = docs.get('validation/GOLDEN_TESTS.md') ?? '';
  requireIds(gates, 'RV-GATE-', 1, 12, 'semantic gates');
  requireIds(staticChecks, 'RV-CH-', 1, 16, 'static checks');
  requireIds(goldenTests, 'RV-GT-', 1, 10, 'golden tests');
}

function main() {
  checkPathAndAllowlist();
  checkSnapshotParity();

  const docs = new Map(MARKDOWN_FILES.map((relPath) => [relPath, readKernelText(relPath)]));
  checkDocumentStatus(docs);
  checkSectionAwareAnchors(docs);
  checkOutputContract(docs);
  checkBoundaryContract(docs);
  checkReadingContract(docs);
  checkIds(docs);

  if (errors.length > 0) {
    console.error('FAIL reviewer_kernel static checks');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('PASS reviewer_kernel static checks');
}

main();
