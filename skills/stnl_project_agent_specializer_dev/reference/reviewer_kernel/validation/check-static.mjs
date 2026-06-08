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

const CLAIM_SPAN = 190;
const SOURCE_TRUST_SPAN = 150;
const TEMPLATE_FALLBACK_SPAN = 170;
const NEGATION_WINDOW = 110;

function term(name, pattern) {
  return Object.freeze({ name, pattern });
}

function terms(...items) {
  return Object.freeze(items.map(([name, pattern]) => term(name, pattern)));
}

const forbiddenFamilies = Object.freeze({
  subjects: terms(
    ['reviewer kernel', /\breviewer[-_ ]kernel\b|\bREVIEWER_KERNEL\b/i],
    ['semantic reviewer', /\bsemantic[- ]reviewer\b/i],
    ['reviewer', /\breviewer\b/i],
  ),
  authorityActions: terms(
    ['own', /\bowns?\b|\bowning\b|\bowners?\b|\bownership\b/i],
    ['authority', /\bauthorit(?:y|ies)\b|\bauthori[sz](?:e|es|ed|ing|ation)\b/i],
    ['jurisdiction', /\bjurisdiction\b/i],
    ['control', /\bcontrols?\b|\bcontrolled\b|\bcontrolling\b|\bcontrol\b/i],
    ['govern', /\bgoverns?\b|\bgoverned\b|\bgoverning\b|\bgovernance\b/i],
    ['manage', /\bmanages?\b|\bmanaged\b|\bmanaging\b|\bmanagement\b/i],
    ['administer', /\badministers?\b|\badministered\b|\badministering\b/i],
    ['supervise', /\bsupervises?\b|\bsupervised\b|\bsupervising\b/i],
    ['maintain', /\bmaintains?\b|\bmaintained\b|\bmaintaining\b|\bmaintenance\b/i],
    ['curate', /\bcurates?\b|\bcurated\b|\bcurating\b|\bcuration\b/i],
    ['preserve', /\bpreserves?\b|\bpreserved\b|\bpreserving\b/i],
    ['safeguard', /\bsafeguards?\b|\bsafeguarded\b|\bsafeguarding\b/i],
    ['steward', /\bstewards?\b|\bstewardship\b/i],
    ['custodian', /\bcustodians?\b|\bcustody\b/i],
    ['caretaker', /\bcaretakers?\b/i],
    ['guardian', /\bguardians?\b/i],
    ['keeper', /\bkeepers?\b/i],
    ['responsible', /\bresponsib(?:le|ility)\b/i],
    ['accountable', /\baccountab(?:le|ility)\b/i],
  ),
  executionActions: terms(
    ['run', /\bruns?\b|\brunning\b|\bran\b/i],
    ['execute', /\bexecutes?\b|\bexecuted\b|\bexecuting\b|\bexecution\b/i],
    ['write', /\bwrites?\b|\bwrote\b|\bwritten\b|\bwriting\b/i],
    ['create', /\bcreates?\b|\bcreated\b|\bcreating\b|\bcreation\b/i],
    ['generate', /\bgenerates?\b|\bgenerated\b|\bgenerating\b/i],
    ['edit', /\bedits?\b|\bedited\b|\bediting\b/i],
    ['patch', /\bpatch(?:es|ed|ing)?\b/i],
    ['apply', /\bappl(?:y|ies|ied|ying)\b/i],
    ['sync', /\bsyncs?\b|\bsynced\b|\bsyncing\b|\bresyncs?\b|\bresynced\b|\bresyncing\b/i],
    ['decide', /\bdecides?\b|\bdecided\b|\bdeciding\b/i],
    ['close', /\bcloses?\b|\bclosed\b|\bclosing\b/i],
    ['finalize', /\bfinali[sz](?:e|es|ed|ing|ation)\b/i],
    ['authorize', /\bauthori[sz](?:e|es|ed|ing|ation)\b/i],
    ['activate', /\bactivates?\b|\bactivated\b|\bactivating\b|\bactivation\b/i],
    ['enable', /\benables?\b|\benabled\b|\benabling\b/i],
    ['support', /\bsupports?\b|\bsupported\b|\bsupporting\b/i],
    ['replace', /\breplaces?\b|\breplaced\b|\breplacing\b|\breplacement\b/i],
    ['substitute', /\bsubstitutes?\b|\bsubstituted\b|\bsubstituting\b|\bsubstitute\b/i],
    ['restore', /\brestores?\b|\brestored\b|\brestoring\b|\brestore\b/i],
    ['recover', /\brecovers?\b|\brecovered\b|\brecovering\b|\brecovery\b/i],
    ['reconstruct', /\breconstructs?\b|\breconstructed\b|\breconstructing\b/i],
    ['regenerate', /\bregenerates?\b|\bregenerated\b|\bregenerating\b/i],
    ['supply', /\bsuppl(?:y|ies|ied|ying)\b/i],
    ['fill', /\bfills?\b|\bfilled\b|\bfilling\b/i],
    ['stand in', /\bstands?\s+in\b|\bstand[- ]in\b/i],
    ['emit', /\bemits?\b|\bemitted\b|\bemitting\b/i],
    ['promote', /\bpromotes?\b|\bpromoted\b|\bpromoting\b|\bpromotion\b|\bpromovido\b|\bpromocao\b|\bpromoção\b/i],
    ['redesign', /\bredesigns?\b|\bredesigned\b|\bredesigning\b|\bredesign-oriented\b/i],
    ['allow', /\ballows?\b|\ballowed\b|\ballowing\b|\bpermits?\b|\bpermitted\b|\bpermitting\b|\bmay\b|\bcan\b|\bcould\b|\bshould\b/i],
    ['serve as', /\bserves?\s+as\b|\bacts?\s+as\b|\bfunctions?\s+as\b|\bworks?\s+as\b|\boperates?\s+as\b|\bbecomes?\b/i],
  ),
  durableCanonObjects: terms(
    ['shared canon', /\bshared\s+canon\b/i],
    ['canonical docs', /\bcanonical\s+docs?\b/i],
    ['shared docs', /\bshared\s+docs?\b/i],
    ['Feature CONTEXT', /\bFeature\s+CONTEXT\b/i],
    ['ADR', /\bADRs?\b/i],
    ['PLAN.md', /\bPLAN\.md\b/i],
    ['durable docs', /\bdurable\s+(?:docs?|documentation)\b/i],
    ['factual sync', /\bfactual\s+sync\b/i],
    ['resync', /\bresync\b/i],
    ['sync docs', /\bsync\s+docs?\b/i],
  ),
  validationObjects: terms(
    ['validation-runner', /\bvalidation-runner\b/i],
    ['validation', /\bvalidation\b/i],
    ['proof', /\bproof\b/i],
    ['checks', /\bchecks?\b/i],
    ['runner verdict', /\brunner\s+verdicts?\b/i],
    ['PARTIAL', /\bPARTIAL\b/i],
    ['BLOCKED', /\bBLOCKED\b/i],
  ),
  finalizerObjects: terms(
    ['DONE', /\bDONE\b/i],
    ['closure', /\bclosure\b|\bround\s+closure\b/i],
    ['close the round', /\bclose\s+the\s+round\b/i],
    ['finalizer', /\bfinalizer\b/i],
    ['finalization', /\bfinali[sz]ation\b/i],
  ),
  coderFixerObjects: terms(
    ['code', /\bcode\b/i],
    ['patches', /\bpatches\b/i],
    ['correction pack', /\bCORRECTION\s+PACKs?\b|\bcorrection\s+packs?\b/i],
    ['broad refactor', /\bbroad[- ]refactor\b/i],
  ),
  designObjects: terms(
    ['EXECUTION PACKAGE', /\bEXECUTION\s+PACKAGE\b/i],
    ['cut', /\bcut\b/i],
    ['plan', /\bplan\b/i],
    ['brief', /\bbrief\b/i],
    ['validation design', /\bvalidation\s+design\b/i],
  ),
  untrustedSources: terms(
    ['scratchpads', /\bscratchpads?\b/i],
    ['workspaceStorage', /\bworkspaceStorage\b/i],
    ['chat-session-resources', /\bchat-session-resources\b/i],
    ['content.txt', /\bcontent\.txt\b/i],
    ['runtime temp paths', /\bruntime\s+temp\s+paths?\b|\bruntime\s+temporary\s+files?\b/i],
    ['temporary files', /\btemporary\s+files?\b/i],
  ),
  trustedClaims: terms(
    ['source of truth', /\bsource\s+of\s+truth\b/i],
    ['source', /\bsource\b/i],
    ['truth', /\btruth\b/i],
    ['canonical', /\bcanonical(?:\s+(?:source|truth|docs?))?\b/i],
    ['authoritative', /\bauthoritative(?:\s+(?:source|truth))?\b/i],
    ['trusted', /\btrusted(?:\s+source)?\b/i],
    ['accepted', /\baccepted(?:\s+(?:truth|authority|source\s+of\s+truth|source))?\b/i],
    ['valid', /\bvalid\s+source\b/i],
    ['approved', /\bapproved\s+source\b/i],
    ['verified', /\bverified(?:\s+source)?\b/i],
    ['reliable', /\breliable(?:\s+source)?\b/i],
    ['primary', /\bprimary(?:\s+source)?\b/i],
    ['reference', /\breference(?:\s+source)?\b/i],
  ),
  templateSources: terms(
    ['productive template', /\bproductive\s+templates?\b/i],
    ['canonical template', /\bcanonical\s+templates?\b/i],
    ['template', /\btemplates?\b/i],
  ),
  snapshotSources: terms(
    ['missing snapshot', /\bmissing\s+snapshot\b/i],
    ['reviewer snapshot', /\breviewer\s+snapshot\b/i],
    ['dev snapshot', /\bdev\s+snapshot\b/i],
    ['snapshot', /\bsnapshots?\b/i],
  ),
  fallbackClaims: terms(
    ['fallback', /\bfallback\b/i],
    ['backup', /\bbackup\b|\bbacks?\s+up\b/i],
    ['replace', /\breplaces?\b|\breplaced\b|\breplacing\b/i],
    ['restore', /\brestores?\b|\brestore\b|\brecover(?:s|y)?\b|\breconstructs?\b|\bregenerates?\b/i],
    ['supply', /\bsuppl(?:y|ies|ied)\b|\bfills?\b/i],
    ['substitute', /\bsubstitutes?\b|\bsubstitute\s+for\b|\bstand[- ]in\b|\bstands?\s+in\b/i],
  ),
  runtimeObjects: terms(['runtime', /\bruntime\b/i]),
  materializationObjects: terms(['materialization', /\bmateriali[sz]ation(?:\s+path)?\b/i]),
  materializerObjects: terms(['materializer', /\bmaterializer\b/i]),
  productionObjects: terms(['production', /\bproduction\b|\bproduction\s+adoption\b/i]),
  runtimeLoaderObjects: terms(['runtime loader', /\bruntime\s+loader\b/i]),
  productiveSkillObjects: terms(['productive skill', /\bproductive[- ]skill(?:\s+activation)?\b/i]),
  githubWriteObjects: terms(['GitHub write', /\bGitHub\s+writes?\b|\bwrite(?:s)?\s+to\s+GitHub\b/i]),
  targetRepoObjects: terms(['target repo', /\btarget[- ]repo(?:sitory)?\b|\btarget\s+repo\b/i]),
  targetArtifactObjects: terms(['target artifact', /\btarget\s+artifacts?\b|\btarget[- ]artifacts?\b/i]),
  fixtureObjects: terms(['fixture', /\bfixtures?\b/i]),
  generatedReportObjects: terms(['generated report', /\bgenerated\s+reports?\b/i]),
});

const allActionTerms = Object.freeze([
  ...forbiddenFamilies.authorityActions,
  ...forbiddenFamilies.executionActions,
]);

const authorizationActions = Object.freeze([
  ...forbiddenFamilies.authorityActions,
  ...forbiddenFamilies.executionActions.filter((item) =>
    /^(authorize|activate|enable|support|allow|promote|decide|finalize)$/.test(item.name),
  ),
]);

const creationActions = Object.freeze(
  forbiddenFamilies.executionActions.filter((item) => /^(create|generate|write|supply|fill)$/.test(item.name)),
);

const structuredForbiddenClaims = Object.freeze([
  {
    claimName: 'reviewer replaces resync',
    family: 'subject_action_object:durable-canon',
    blocker: 'BLOCKED_RV_REPLACES_RESYNC',
    subject: forbiddenFamilies.subjects,
    action: allActionTerms,
    object: forbiddenFamilies.durableCanonObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer replaces validation-runner',
    family: 'subject_action_object:validation-runner',
    blocker: 'BLOCKED_RV_REPLACES_VALIDATION_RUNNER',
    subject: forbiddenFamilies.subjects,
    action: allActionTerms,
    object: forbiddenFamilies.validationObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer replaces finalizer',
    family: 'subject_action_object:finalizer',
    blocker: 'BLOCKED_RV_REPLACES_FINALIZER',
    subject: forbiddenFamilies.subjects,
    action: allActionTerms,
    object: forbiddenFamilies.finalizerObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer replaces coder-fixer',
    family: 'subject_action_object:coder-fixer',
    blocker: 'BLOCKED_RV_REPLACES_CODER_FIXER',
    subject: forbiddenFamilies.subjects,
    action: allActionTerms,
    object: forbiddenFamilies.coderFixerObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer creates target artifacts',
    family: 'subject_action_object:target-artifact-creation',
    blocker: 'BLOCKED_RV_CREATES_TARGET_ARTIFACTS',
    subject: forbiddenFamilies.subjects,
    action: creationActions,
    object: forbiddenFamilies.targetArtifactObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer redesigns package',
    family: 'subject_action_object:execution-package-design',
    blocker: 'BLOCKED_RV_REDESIGNS_PACKAGE',
    subject: forbiddenFamilies.subjects,
    action: forbiddenFamilies.executionActions.filter((item) => item.name === 'redesign'),
    object: forbiddenFamilies.designObjects.filter((item) => item.name === 'EXECUTION PACKAGE'),
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer redesigns cut',
    family: 'subject_action_object:cut-design',
    blocker: 'BLOCKED_RV_REDESIGNS_CUT',
    subject: forbiddenFamilies.subjects,
    action: forbiddenFamilies.executionActions.filter((item) => item.name === 'redesign'),
    object: forbiddenFamilies.designObjects.filter((item) => item.name === 'cut'),
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer redesigns plan',
    family: 'subject_action_object:plan-design',
    blocker: 'BLOCKED_RV_REDESIGNS_PLAN',
    subject: forbiddenFamilies.subjects,
    action: forbiddenFamilies.executionActions.filter((item) => item.name === 'redesign'),
    object: forbiddenFamilies.designObjects.filter((item) => item.name === 'plan'),
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer redesigns brief',
    family: 'subject_action_object:brief-design',
    blocker: 'BLOCKED_RV_REDESIGNS_BRIEF',
    subject: forbiddenFamilies.subjects,
    action: forbiddenFamilies.executionActions.filter((item) => item.name === 'redesign'),
    object: forbiddenFamilies.designObjects.filter((item) => item.name === 'brief'),
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer redesigns validation design',
    family: 'subject_action_object:validation-design',
    blocker: 'BLOCKED_RV_REDESIGNS_VALIDATION_DESIGN',
    subject: forbiddenFamilies.subjects,
    action: forbiddenFamilies.executionActions.filter((item) => item.name === 'redesign'),
    object: forbiddenFamilies.designObjects.filter((item) => item.name === 'validation design'),
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes runtime',
    family: 'subject_action_object:runtime-authorization',
    blocker: 'BLOCKED_RV_RUNTIME_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.runtimeObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes materialization',
    family: 'subject_action_object:materialization-authorization',
    blocker: 'BLOCKED_RV_MATERIALIZATION_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.materializationObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes production',
    family: 'subject_action_object:production-authorization',
    blocker: 'BLOCKED_RV_PRODUCTION_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.productionObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes runtime loader',
    family: 'subject_action_object:runtime-loader-authorization',
    blocker: 'BLOCKED_RV_RUNTIME_LOADER_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.runtimeLoaderObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes materializer',
    family: 'subject_action_object:materializer-authorization',
    blocker: 'BLOCKED_RV_MATERIALIZER_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.materializerObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes productive skill',
    family: 'subject_action_object:productive-skill-authorization',
    blocker: 'BLOCKED_RV_PRODUCTIVE_SKILL_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.productiveSkillObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes GitHub write',
    family: 'subject_action_object:github-write-authorization',
    blocker: 'BLOCKED_RV_GITHUB_WRITE_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.githubWriteObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes target repo write',
    family: 'subject_action_object:target-repo-authorization',
    blocker: 'BLOCKED_RV_TARGET_REPO_WRITE_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.targetRepoObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes target artifact',
    family: 'subject_action_object:target-artifact-authorization',
    blocker: 'BLOCKED_RV_TARGET_ARTIFACT_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.targetArtifactObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes fixture',
    family: 'subject_action_object:fixture-authorization',
    blocker: 'BLOCKED_RV_FIXTURE_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.fixtureObjects,
    span: CLAIM_SPAN,
  },
  {
    claimName: 'reviewer authorizes generated report',
    family: 'subject_action_object:generated-report-authorization',
    blocker: 'BLOCKED_RV_GENERATED_REPORT_AUTHORIZATION',
    subject: forbiddenFamilies.subjects,
    action: authorizationActions,
    object: forbiddenFamilies.generatedReportObjects,
    span: CLAIM_SPAN,
  },
]);

const pairedForbiddenClaims = Object.freeze([
  {
    claimName: 'untrusted source of truth',
    family: 'untrusted_source:trusted-source-claim',
    blocker: 'BLOCKED_RV_UNTRUSTED_SOURCE_OF_TRUTH',
    left: forbiddenFamilies.untrustedSources,
    right: forbiddenFamilies.trustedClaims,
    span: SOURCE_TRUST_SPAN,
  },
  {
    claimName: 'productive template fallback',
    family: 'template_or_snapshot:fallback-recovery',
    blocker: 'BLOCKED_RV_PRODUCTIVE_TEMPLATE_FALLBACK',
    left: [...forbiddenFamilies.templateSources, ...forbiddenFamilies.snapshotSources],
    right: forbiddenFamilies.fallbackClaims,
    span: TEMPLATE_FALLBACK_SPAN,
  },
]);

const patternForbiddenClaims = Object.freeze([
  { claimName: 'automatic future promotion', family: 'status-promotion', blocker: 'BLOCKED_RV_STATUS_PROMOTION', pattern: /\bREVIEWER_KERNEL\b[\s\S]{0,120}\b(?:automatic\s+(?:future\s+)?promotion|future\s+promotion|promotes?\s+automatically|auto-promotes?)\b|\b(?:automatic\s+(?:future\s+)?promotion|future\s+promotion|promotes?\s+automatically|auto-promotes?)\b[\s\S]{0,120}\bREVIEWER_KERNEL\b/i },
  { claimName: 'promotion grants runtime authority', family: 'status-promotion', blocker: 'BLOCKED_RV_STATUS_PROMOTION', pattern: /\bREVIEWER_KERNEL\b[\s\S]{0,160}\b(?:promotion|promoted|promote|promotes|promovido|promocao|promoção)\b[\s\S]{0,160}\b(?:authori[sz]es?|grants?|enables?|allows?|permits?|activates?|creates?)\b[\s\S]{0,120}\b(?:runtime|production|materiali[sz]ation|productive\s+skill|github\s+writes?|target[-\s]repo\s+writes?)\b|\b(?:authori[sz]es?|grants?|enables?|allows?|permits?|activates?|creates?)\b[\s\S]{0,120}\b(?:runtime|production|materiali[sz]ation|productive\s+skill|github\s+writes?|target[-\s]repo\s+writes?)\b[\s\S]{0,160}\b(?:promotion|promoted|promote|promotes|promovido|promocao|promoção)\b[\s\S]{0,160}\bREVIEWER_KERNEL\b/i },
  { claimName: 'green proof overrides structure', family: 'output-shape', blocker: 'BLOCKED_RV_GREEN_PROOF_OVERRIDES_STRUCTURE', pattern: /\bgreen\s+(?:checks?|tests?|proof)\b[\s\S]{0,120}\b(?:allows?|forces?|is\s+enough|are\s+enough|sufficient|structural approval)\b|\bstructural approval\b[\s\S]{0,120}\bgreen\s+(?:checks?|tests?|proof)\b/i },
  { claimName: 'PASS without artifact or diff', family: 'output-shape', blocker: 'BLOCKED_RV_PASS_SHAPE_INVALID', pattern: /\bPASS\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted|emitted|available)\b[\s\S]{0,120}\b(?:without|absent|missing|no)\b[\s\S]{0,80}\b(?:artifact|diff)\b|\bPASS\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted|emitted|available)\b[\s\S]{0,120}\b(?:artifact|diff)\b[\s\S]{0,80}\b(?:absent|missing)\b/i },
  { claimName: 'PASS with unresolved material risk', family: 'output-shape', blocker: 'BLOCKED_RV_MATERIAL_RISK_NOT_FAIL', pattern: /\bPASS\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted|emitted)\b[\s\S]{0,120}\bunresolved\s+material\s+risk\b|\bunresolved\s+material\s+risk\b[\s\S]{0,120}\bPASS\b/i },
  { claimName: 'PASS with CORRECTION PACK', family: 'output-shape', blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID', pattern: /\bPASS\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted|emitted)\b[\s\S]{0,120}\bCORRECTION\s+PACK\b|\bCORRECTION\s+PACK\b[\s\S]{0,120}\b(?:may|can|could|should|allowed|permitted|emitted)\b[\s\S]{0,80}\bPASS\b/i },
  { claimName: 'FAIL for aesthetic preference', family: 'output-shape', blocker: 'BLOCKED_RV_OPINION_BLOCKS_CLOSURE', pattern: /\bFAIL\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted|used)\b[\s\S]{0,120}\baesthetic\s+preference\b|\baesthetic\s+preference\b[\s\S]{0,120}\b(?:may|can|could|should|allowed|permitted|used)\b[\s\S]{0,80}\bFAIL\b/i },
  { claimName: 'subjective preference blocks closure', family: 'output-shape', blocker: 'BLOCKED_RV_OPINION_BLOCKS_CLOSURE', pattern: /\bsubjective\s+style\s+preference\b[\s\S]{0,120}\b(?:may|can|could|should|becomes?)\b[\s\S]{0,80}\bblocker\b|\bblocker\b[\s\S]{0,120}\bsubjective\s+style\s+preference\b/i },
  { claimName: 'invalid CORRECTION PACK shape', family: 'output-shape', blocker: 'BLOCKED_RV_CORRECTION_PACK_INVALID', pattern: /\bCORRECTION\s+PACK\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted)\b[\s\S]{0,120}\b(?:broad|vague|repo-wide|redesign-oriented)\b|\b(?:broad|vague|repo-wide|redesign-oriented)\b[\s\S]{0,120}\b(?:may|can|could|should|allowed|permitted)\b[\s\S]{0,80}\bCORRECTION\s+PACK\b|\bmultiple\b[\s\S]{0,80}\bCORRECTION\s+PACK\b[\s\S]{0,80}\b(?:may|can|could|should|allowed|permitted|emitted)\b/i },
  { claimName: 'review-minimal broken', family: 'reading-scope', blocker: 'BLOCKED_RV_REVIEW_MINIMAL_BROKEN', pattern: /\breviewer\b[\s\S]{0,120}\b(?:reopen\s+broad\s+discovery|review\s+the\s+whole\s+repo)\b|\b(?:broad\s+discovery|whole\s+repo)\b[\s\S]{0,120}\breviewer\b/i },
]);

function splitClauses(text) {
  const clauses = [];
  let paragraph = '';
  let contextGuard = '';

  function flushParagraph() {
    const normalized = paragraph.trim();
    if (!normalized) {
      return;
    }
    for (const clause of normalized.split(/(?<=[.!?])\s+|[;|]\s+|\b(?:but|however|although|though|except that|then)\b/i)) {
      const clean = clause.trim();
      if (clean) {
        clauses.push(`${contextGuard}${clean}`);
      }
    }
    paragraph = '';
  }

  for (const line of text.replace(/\r/g, '').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    const heading = headingMatch(trimmed);
    if (heading) {
      flushParagraph();
      const headingText = heading[2].trim();
      contextGuard = '';
      clauses.push(headingText);
      continue;
    }
    const bullet = /^(?:[-*+]\s+|\d+\.\s+)/.test(trimmed);
    const normalized = trimmed.replace(/^(?:[-*+]\s+|\d+\.\s+)/, '').trim();
    if (bullet) {
      flushParagraph();
      paragraph = normalized;
      continue;
    }
    paragraph = paragraph ? `${paragraph} ${normalized}` : normalized;
    if (/\bunsafe\s+if\s+it:?\s*$/i.test(paragraph)) {
      flushParagraph();
      contextGuard = 'Markdown unsafe-if block: ';
    }
  }
  flushParagraph();
  return clauses;
}

function stripCaseLabel(clause) {
  return clause.replace(
    /^(?:reject case|fail if|unsafe if|expected blocker|prohibited case|block case|input shape|fail condition):\s*/i,
    '',
  );
}

function findTermHits(clause, family) {
  const hits = [];
  for (const item of family) {
    const match = item.pattern.exec(clause);
    if (match) {
      hits.push({ family: item.name, index: match.index, text: match[0] });
    }
  }
  return hits.sort((left, right) => left.index - right.index);
}

function spanWithin(hits, maxSpan) {
  const starts = hits.map((hit) => hit.index);
  return Math.max(...starts) - Math.min(...starts) <= maxSpan;
}

function hasLocalNegation(clause, relevantHits) {
  if (/^Markdown (?:Input shape|Expected behavior|Fail condition|Expected blocker|unsafe-if block): /i.test(clause)) {
    return true;
  }

  const search = stripCaseLabel(clause);
  const offset = clause.length - search.length;
  const negations = [
    ...search.matchAll(
      /\b(?:does\s+not|do\s+not|must\s+not|cannot|can\s+not|is\s+not|are\s+not|was\s+not|were\s+not|not\s+allowed|not\s+permitted|never|no|without|rather\s+than|not|isn't|aren't|won't|unauthori[sz]ed|não|nao|sem)\b/gi,
    ),
    ...search.matchAll(
      /\b(?:forbidden|prohibited|prohibits?|prohibition\s+on|rejects?|blocks?|fails?\s+if|validate(?:s)?\b[\s\S]{0,80}\bprohibit)\b/gi,
    ),
  ].map((match) => offset + match.index);

  return negations.some((negationIndex) => {
    const tail = clause.slice(negationIndex);
    const negatedListWithoutNewSubject =
      !/\b(?:reviewer|REVIEWER_KERNEL|reviewer[-_ ]kernel|semantic[- ]reviewer)\b/i.test(tail);
    return relevantHits.some(
      (hit) =>
        Math.abs(hit.index - negationIndex) <= NEGATION_WINDOW ||
        (negatedListWithoutNewSubject && hit.index >= negationIndex),
    );
  });
}

function structuredMatch(clause, claim) {
  const subjectHits = findTermHits(clause, claim.subject);
  const actionHits = findTermHits(clause, claim.action);
  const objectHits = findTermHits(clause, claim.object);
  for (const subject of subjectHits) {
    for (const action of actionHits) {
      for (const object of objectHits) {
        if (action.index === object.index) {
          continue;
        }
        const hits = [subject, action, object];
        const ordered =
          (subject.index <= action.index && action.index <= object.index) ||
          (object.index <= action.index && action.index <= subject.index);
        if (ordered && spanWithin(hits, claim.span) && !hasLocalNegation(clause, hits)) {
          return { hits };
        }
      }
    }
  }
  return null;
}

function pairedMatch(clause, claim) {
  const leftHits = findTermHits(clause, claim.left);
  const rightHits = findTermHits(clause, claim.right);
  for (const left of leftHits) {
    for (const right of rightHits) {
      const hits = [left, right];
      if (spanWithin(hits, claim.span) && !hasLocalNegation(clause, hits)) {
        return { hits };
      }
    }
  }
  return null;
}

function patternMatch(clause, claim) {
  const match = claim.pattern.exec(clause);
  if (!match) {
    return null;
  }
  const hits = [{ family: claim.family, index: match.index, text: match[0] }];
  return hasLocalNegation(clause, hits) ? null : { hits };
}

function matchToResult(claim, clause) {
  return {
    matched: true,
    blocker: claim.blocker,
    claimName: claim.claimName,
    family: claim.family,
    excerpt: clause,
  };
}

export function findForbiddenClaims(text) {
  const matches = [];
  for (const clause of splitClauses(text)) {
    for (const claim of structuredForbiddenClaims) {
      if (structuredMatch(clause, claim)) {
        matches.push(matchToResult(claim, clause));
      }
    }
    for (const claim of pairedForbiddenClaims) {
      if (pairedMatch(clause, claim)) {
        matches.push(matchToResult(claim, clause));
      }
    }
    for (const claim of patternForbiddenClaims) {
      if (patternMatch(clause, claim)) {
        matches.push(matchToResult(claim, clause));
      }
    }
  }
  return matches;
}

const GOLDEN_NEGATIVE_EXAMPLE_SECTIONS = new Set(['Fail condition', 'Expected blocker']);
const REQUIRED_GOLDEN_SCENARIO_SECTIONS = Object.freeze([
  'Objective',
  'Input shape',
  'Expected behavior',
  'Expected blocker',
]);

function normalizeGoldenSectionName(text) {
  return text.trim().replace(/\s+/g, ' ');
}

function isGoldenNegativeExampleLine(text) {
  return /^(?:Fail condition|Expected blocker):\s*\S/i.test(text.trim());
}

function isGoldenNegativeExampleMarker(text) {
  return /^(?:Fail condition|Expected blocker):\s*$/i.test(text.trim());
}

function normalizeGoldenBlockText(text) {
  return text
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
}

function collectGoldenScenarios(text) {
  const scenarios = [];
  let scenario = null;
  let childSection = '';
  let inFence = false;

  for (const line of text.replace(/\r/g, '').split('\n')) {
    const heading = headingMatch(line.trim());
    if (heading && heading[1].length === 2 && /^Golden Test RV-GT-\d+\b/i.test(heading[2])) {
      scenario = {
        sections: new Map(),
        sectionOrder: [],
        duplicateSections: new Set(),
      };
      scenarios.push(scenario);
      childSection = '';
      inFence = false;
      continue;
    }
    if (!scenario) {
      continue;
    }
    if (heading && heading[1].length === 3) {
      childSection = normalizeGoldenSectionName(heading[2]);
      if (scenario.sections.has(childSection)) {
        scenario.duplicateSections.add(childSection);
      } else {
        scenario.sectionOrder.push(childSection);
      }
      scenario.sections.set(childSection, { text: '', normativeText: '' });
      inFence = false;
      continue;
    }
    if (heading && heading[1].length <= 2) {
      scenario = null;
      childSection = '';
      inFence = false;
      continue;
    }
    if (childSection) {
      const section = scenario.sections.get(childSection) ?? { text: '', normativeText: '' };
      const startsFence = /^```/.test(line.trim());
      const nextText = section.text ? `${section.text}\n${line}` : line;
      const nextNormativeText =
        inFence || startsFence
          ? section.normativeText
          : section.normativeText
            ? `${section.normativeText}\n${line}`
            : line;
      scenario.sections.set(childSection, {
        text: nextText,
        normativeText: nextNormativeText,
      });
      if (startsFence) {
        inFence = !inFence;
      }
    }
  }

  return scenarios;
}

function hasRequiredGoldenScenarioShape(scenario) {
  let previousIndex = -1;
  for (const section of REQUIRED_GOLDEN_SCENARIO_SECTIONS) {
    if (!scenario.sections.has(section) || scenario.duplicateSections.has(section)) {
      return false;
    }
    const index = scenario.sectionOrder.indexOf(section);
    if (index <= previousIndex) {
      return false;
    }
    previousIndex = index;
  }
  return true;
}

function findAllowedGoldenScenarioInputExamples(text) {
  const allowed = new Set();
  for (const scenario of collectGoldenScenarios(text)) {
    if (!hasRequiredGoldenScenarioShape(scenario)) {
      continue;
    }
    const inputShape = normalizeGoldenBlockText(scenario.sections.get('Input shape')?.text ?? '');
    const expectedBlockerText = scenario.sections.get('Expected blocker')?.normativeText ?? '';
    const expectedBlockers = new Set(
      [...expectedBlockerText.matchAll(/\bBLOCKED_RV_[A-Z0-9_]+\b/g)].map((match) => match[0]),
    );
    if (!inputShape || expectedBlockers.size === 0) {
      continue;
    }
    const inputMatches = findForbiddenClaims(inputShape);
    if (inputMatches.length > 0 && inputMatches.every((match) => expectedBlockers.has(match.blocker))) {
      allowed.add(inputShape);
    }
  }
  return allowed;
}

export function findForbiddenClaimsInGoldenTestsDoc(text) {
  const matches = [];
  const allowedGoldenScenarioInputExamples = findAllowedGoldenScenarioInputExamples(text);
  let sectionName = '';
  let paragraph = '';
  let fenceText = '';
  let inFence = false;
  let negativeSectionExampleAvailable = false;
  let pendingNegativeExample = false;

  function scanParagraph(label, candidate, section) {
    const normalized = candidate.trim();
    if (!normalized) {
      return;
    }
    const protectedBySection = GOLDEN_NEGATIVE_EXAMPLE_SECTIONS.has(section) && negativeSectionExampleAvailable;
    const protectedByInline = pendingNegativeExample || isGoldenNegativeExampleLine(normalized);
    if (protectedBySection || protectedByInline) {
      if (protectedBySection) {
        negativeSectionExampleAvailable = false;
      }
      if (pendingNegativeExample) {
        pendingNegativeExample = false;
      }
      return;
    }
    if (section === 'Input shape' && allowedGoldenScenarioInputExamples.has(normalized)) {
      return;
    }
    for (const match of findForbiddenClaims(normalized)) {
      matches.push({ ...match, excerpt: `${label}: ${match.excerpt}` });
    }
  }

  function flushParagraph() {
    scanParagraph(sectionName || 'document', paragraph, sectionName);
    paragraph = '';
  }

  for (const line of text.replace(/\r/g, '').split('\n')) {
    const trimmed = line.trim();
    if (/^```/.test(trimmed)) {
      if (inFence) {
        scanParagraph(sectionName || 'fence', fenceText, sectionName);
        fenceText = '';
        inFence = false;
      } else {
        flushParagraph();
        inFence = true;
      }
      continue;
    }
    if (inFence) {
      fenceText = fenceText ? `${fenceText}\n${line}` : line;
      continue;
    }
    const heading = headingMatch(trimmed);
    if (heading) {
      flushParagraph();
      const headingText = normalizeGoldenSectionName(heading[2]);
      scanParagraph('heading', headingText, '');
      sectionName = heading[1].length === 3 ? headingText : '';
      negativeSectionExampleAvailable = GOLDEN_NEGATIVE_EXAMPLE_SECTIONS.has(sectionName);
      pendingNegativeExample = false;
      continue;
    }
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (isGoldenNegativeExampleMarker(trimmed)) {
      flushParagraph();
      pendingNegativeExample = true;
      continue;
    }
    paragraph = paragraph ? `${paragraph} ${trimmed}` : trimmed;
  }
  if (inFence) {
    scanParagraph(sectionName || 'fence', fenceText, sectionName);
  } else {
    flushParagraph();
  }
  return matches;
}

function findAffirmativeClaims(text, label) {
  for (const match of findForbiddenClaims(text)) {
    assert(Boolean(match.blocker), `${label} prohibited claim (${match.claimName}) must include semantic blocker`);
    assert(Boolean(match.family), `${label} prohibited claim (${match.claimName}) must include semantic family`);
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

function checkDocumentStatus(docs) {
  for (const [relPath, text] of docs) {
    assert(
      /REVIEWER_KERNEL:\s*CLEAN_EXCELLENT_PASS/.test(text),
      `${relPath} must preserve REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS`,
    );
    const matches =
      relPath === 'validation/GOLDEN_TESTS.md'
        ? findForbiddenClaimsInGoldenTestsDoc(text)
        : findForbiddenClaims(text);
    for (const match of matches) {
      assert(Boolean(match.blocker), `${relPath} prohibited claim (${match.claimName}) must include semantic blocker`);
      assert(Boolean(match.family), `${relPath} prohibited claim (${match.claimName}) must include semantic family`);
      assert(Boolean(match.excerpt), `${relPath} prohibited claim (${match.claimName}) must include useful excerpt`);
      fail(`${relPath} has non-negated prohibited claim ${match.blocker} (${match.claimName}): ${match.excerpt}`);
    }
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

function isMainModule() {
  return Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
}

if (isMainModule()) {
  main();
}
