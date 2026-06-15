#!/usr/bin/env node
import { readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  findForbiddenClaims,
  findForbiddenClaimsInGoldenTestsDoc,
  runStaticChecks,
} from './check-static.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const scriptRealPath = realpathSync.native(scriptPath);
const validationRoot = dirname(scriptRealPath);
const goldenPath = resolve(validationRoot, 'GOLDEN_TESTS.md');

const REQUIRED_SECTIONS = Object.freeze([
  'Objective',
  'Input shape',
  'Expected behavior',
  'Fail condition',
  'Expected blocker',
]);

const SCENARIOS = Object.freeze([
  {
    id: 'RSY-GT-001',
    blocker: 'BLOCKED_RSY_READY_EVIDENCE_INCOMPLETE',
    terms: [/finalizer\.agent\.md/, /docs\/core\/CONTRACTS\.md/, /READY/, /applied\s+target/i],
  },
  {
    id: 'RSY-GT-002',
    blocker: 'BLOCKED_RSY_FINALIZER_REQUEST_MISSING',
    terms: [/Missing finalizer request/i, /finalizer decides `?resync:\s*yes\/no`?/i],
  },
  {
    id: 'RSY-GT-003',
    blocker: 'BLOCKED_RSY_DELTA_UNCLEAR',
    terms: [/Unclear factual delta/i, /delta is precise enough/i],
  },
  {
    id: 'RSY-GT-004',
    blocker: 'BLOCKED_RSY_TARGET_OWNER_UNCLEAR',
    terms: [/Unclear target owner/i, /multiple possible shared docs/i],
  },
  {
    id: 'RSY-GT-005',
    blocker: 'BLOCKED_RSY_FEATURE_LOCAL_DETAIL',
    terms: [/Feature-local detail stays local/i, /shared canonical docs/i],
  },
  {
    id: 'RSY-GT-006',
    blocker: 'BLOCKED_RSY_NORMATIVE_DRIFT',
    terms: [/Normative request escalates/i, /ADR/, /normative `?RULES`?/i],
  },
  {
    id: 'RSY-GT-007',
    blocker: 'BLOCKED_RSY_VALID_REPLAY_REJECTED',
    terms: [/orchestrator replays/i, /finalizer-owned resync request/i],
  },
  {
    id: 'RSY-GT-008',
    blocker: 'BLOCKED_RSY_HANDOFF_INCOMPLETE',
    terms: [/Handoff missing or incomplete/i, /factual delta/, /target surface/],
  },
  {
    id: 'RSY-GT-009',
    blocker: 'BLOCKED_RSY_DOC_SPRAWL',
    terms: [/Divergent durable docs/i, /smallest authoritative target/i],
  },
  {
    id: 'RSY-GT-010',
    blocker: 'BLOCKED_RSY_RUNTIME_TEMP_SOURCE',
    terms: [/workspaceStorage/, /chat-session-resources/, /content\.txt/, /scratchpads/],
  },
  {
    id: 'RSY-GT-011',
    blocker: 'BLOCKED_RSY_IMPLEMENTATION_DRIFT',
    terms: [/Implementation request blocks/i, /does not implement/i],
  },
  {
    id: 'RSY-GT-012',
    blocker: 'BLOCKED_RSY_FINALIZER_DRIFT',
    terms: [/Finalizer substitution blocks/i, /DONE/, /resync:\s*yes\/no/i],
  },
  {
    id: 'RSY-GT-013',
    blocker: 'BLOCKED_RSY_VALIDATION_DRIFT',
    terms: [/Validation-runner substitution blocks/i, /validation `?PASS`?/i],
  },
  {
    id: 'RSY-GT-014',
    blocker: 'BLOCKED_RSY_REVIEWER_DRIFT',
    terms: [/Reviewer substitution blocks/i, /architecture/, /structural risk/i],
  },
  {
    id: 'RSY-GT-015',
    blocker: 'BLOCKED_RSY_PLANNING_DRIFT',
    terms: [/Planner or proof redesign blocks/i, /VALIDATION PACK/],
  },
  {
    id: 'RSY-GT-016',
    blocker: 'BLOCKED_RSY_DONE_DRIFT',
    terms: [/DONE claim blocks/i, /milestone closure/i],
  },
  {
    id: 'RSY-GT-017',
    blocker: 'BLOCKED_RSY_PASS_DRIFT',
    terms: [/Validation PASS claim blocks/i, /READY[\s\S]{0,80}validation `?PASS`?/i],
  },
  {
    id: 'RSY-GT-018',
    blocker: 'BLOCKED_RSY_UNBOUNDED_SYNC',
    terms: [/Bounded resync proceeds/i, /general docs refresh/i],
  },
  {
    id: 'RSY-GT-019',
    blocker: 'BLOCKED_RSY_TARGET_NOT_ALLOWED',
    terms: [/allowed target set/i, /new canonical\s+surface/i],
  },
  {
    id: 'RSY-GT-020',
    blocker: 'BLOCKED_RSY_TEMP_DOC_DURABLE',
    terms: [/PLAN\.md/, /execution_brief\.md/, /validation_pack\.md/, /execution_package\.md/],
  },
  {
    id: 'RSY-GT-021',
    blocker: 'BLOCKED_RSY_CLEAN_PASS_FALSE_POSITIVE',
    terms: [/RESYNC_KERNEL:\s*CLEAN_EXCELLENT_PASS/, /forbidden-claim scanner/i],
  },
  {
    id: 'RSY-GT-022',
    blocker: 'BLOCKED_RSY_POLARITY_ENGINE',
    terms: [/Local polarity/i, /does not implement/, /may implement/],
  },
  {
    id: 'RSY-GT-023',
    blocker: 'BLOCKED_RSY_FENCED_CLAIM',
    terms: [/Code fences remain scanned/i, /materialization path/i],
  },
  {
    id: 'RSY-GT-024',
    blocker: 'BLOCKED_RSY_MUTATION_GAP',
    terms: [/Positive mutations remain blocked/i, /runtime authority/, /finalizer substitution/i],
  },
]);

const positiveMutationCases = Object.freeze([
  ['runtime authority', 'The resync kernel authorizes runtime loading for sync.'],
  ['production authority', 'The resync kernel may run as a production path.'],
  ['materialization authority', 'The resync kernel can create a materialization path.'],
  ['materializer authority', 'The resync kernel enables a materializer.'],
  ['GitHub write authority', 'The resync agent may write GitHub comments.'],
  ['target repo write authority', 'The resync agent may write target repo artifacts.'],
  ['generated report authority', 'The resync kernel generates generated reports.'],
  ['fixture authority', 'The resync kernel creates fixtures for sync tests.'],
  ['target artifact authority', 'The resync kernel writes target artifacts.'],
  ['productive skill authority', 'The resync pass activates the productive skill.'],
  ['template mutation authority', 'The resync agent performs template mutation.'],
  ['snapshot mutation authority', 'The resync agent performs snapshot mutation.'],
  ['finalizer decision', 'The resync agent decides resync: yes/no for the round.'],
  ['finalizer replacement', 'The resync agent replaces the finalizer and closes the round.'],
  ['DONE write', 'The resync agent touches DONE after sync.'],
  ['runner substitution', 'The resync agent substitutes validation-runner evidence.'],
  ['validation running', 'The resync agent runs validation and declares PASS.'],
  ['reviewer substitution', 'The resync agent replaces reviewer architecture review.'],
  ['planner substitution', 'The resync agent replans the feature scope.'],
  ['proof redesign', 'The resync agent redesigns the VALIDATION PACK.'],
  ['execution package rewrite', 'The resync agent rewrites the EXECUTION PACKAGE.'],
  ['implementation', 'The resync agent implements the missing fix.'],
  ['code correction', 'The resync agent corrects code so the fact becomes true.'],
  ['READY means PASS', 'READY means validation PASS for resync.'],
  ['QA success invented', 'The resync agent declares QA success after updating docs.'],
  ['PLAN durable', 'PLAN.md is durable documentation for resync.'],
  ['handoff durable', 'execution_package.md is canonical docs for resync.'],
  ['runtime temp source', 'The resync agent searches workspaceStorage for handoff evidence.'],
  ['content temp source', 'content.txt is source of truth for resync handoffs.'],
  ['doc campaign', 'The resync agent refreshes all docs as a documentation campaign.'],
  ['normative rewrite', 'The resync agent rewrites ADR and normative RULES by default.'],
  ['future promotion', 'Future kernels are automatically promoted after this pass.'],
  ['fenced materialization', '```text\nresync may create a materialization path\n```'],
]);

const validNegativeExamples = Object.freeze([
  'The resync kernel does not authorize runtime.',
  'No materialization path is authorized.',
  'The resync agent must not implement code.',
  'The resync agent does not decide resync: yes/no.',
  'The resync agent does not replace finalizer.',
  'The resync agent does not touch DONE.',
  'The resync agent does not run validation.',
  'The resync agent does not substitute validation-runner.',
  'The resync agent does not substitute reviewer.',
  'The resync agent does not replan the feature.',
  'READY is not validation PASS.',
  'PLAN.md is not durable documentation for resync.',
  'Search of workspaceStorage for handoffs is blocked.',
  'ADR and normative RULES are not default resync ownership.',
  'Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.',
]);

const incompleteScenarioCases = Object.freeze([
  ['missing Objective', ['Input shape', 'Expected behavior', 'Fail condition', 'Expected blocker']],
  ['missing Input shape', ['Objective', 'Expected behavior', 'Fail condition', 'Expected blocker']],
  ['missing Expected behavior', ['Objective', 'Input shape', 'Fail condition', 'Expected blocker']],
  ['missing Fail condition', ['Objective', 'Input shape', 'Expected behavior', 'Expected blocker']],
  ['missing Expected blocker', ['Objective', 'Input shape', 'Expected behavior', 'Fail condition']],
]);

function headingMatch(line) {
  return /^(#{1,6})\s+(.+?)\s*$/.exec(line);
}

function extractScenarioBlock(markdown, id) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^##\\s+Golden Test ${id}\\b`).test(line));
  if (start === -1) {
    return '';
  }
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+Golden Test RSY-GT-\d{3}\b/.test(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

function extractSubsection(block, heading) {
  const lines = block.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `### ${heading}`);
  if (start === -1) {
    return '';
  }
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = headingMatch(lines[index]);
    if (match && match[1].length <= 3) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n').trim();
}

function validateGoldenStructure(markdown) {
  const errors = [];
  const foundIds = [...markdown.matchAll(/^##\s+Golden Test (RSY-GT-\d{3})\b/gm)].map((match) => match[1]);
  const expectedIds = SCENARIOS.map((scenario) => scenario.id);

  if (foundIds.length !== expectedIds.length) {
    errors.push(`expected ${expectedIds.length} golden scenarios, found ${foundIds.length}`);
  }

  for (let index = 0; index < expectedIds.length; index += 1) {
    if (foundIds[index] !== expectedIds[index]) {
      errors.push(`scenario order mismatch at ${index + 1}: expected ${expectedIds[index]}, got ${foundIds[index] ?? '<missing>'}`);
    }
  }

  for (const scenario of SCENARIOS) {
    const block = extractScenarioBlock(markdown, scenario.id);
    if (!block) {
      errors.push(`missing scenario ${scenario.id}`);
      continue;
    }

    const sectionPositions = REQUIRED_SECTIONS.map((section) => block.indexOf(`### ${section}`));
    for (let index = 0; index < REQUIRED_SECTIONS.length; index += 1) {
      if (sectionPositions[index] === -1) {
        errors.push(`${scenario.id} missing ${REQUIRED_SECTIONS[index]}`);
      }
      if (index > 0 && sectionPositions[index] !== -1 && sectionPositions[index - 1] !== -1 && sectionPositions[index] < sectionPositions[index - 1]) {
        errors.push(`${scenario.id} section order invalid at ${REQUIRED_SECTIONS[index]}`);
      }
    }

    for (const section of REQUIRED_SECTIONS) {
      const subsection = extractSubsection(block, section);
      if (!subsection || subsection.replace(`### ${section}`, '').trim().length === 0) {
        errors.push(`${scenario.id} ${section} is empty`);
      }
    }

    if (!extractSubsection(block, 'Expected blocker').includes(scenario.blocker)) {
      errors.push(`${scenario.id} missing expected blocker ${scenario.blocker}`);
    }

    for (const term of scenario.terms) {
      if (!term.test(block)) {
        errors.push(`${scenario.id} missing term ${term}`);
      }
    }
  }

  const forbidden = findForbiddenClaimsInGoldenTestsDoc(markdown);
  if (forbidden.length > 0) {
    for (const claim of forbidden.slice(0, 10)) {
      errors.push(`GOLDEN_TESTS.md forbidden claim ${claim.claimName}: ${claim.excerpt}`);
    }
  }

  return errors;
}

function buildIncompleteScenario(sections) {
  return [
    '# Synthetic Golden Doc',
    '',
    'Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.',
    '',
    '## Golden Test RSY-GT-001 - Synthetic',
    '',
    ...sections.flatMap((section) => [
      `### ${section}`,
      '',
      section === 'Expected blocker' ? '`BLOCKED_SYNTHETIC`.' : 'Synthetic content.',
      '',
    ]),
  ].join('\n');
}

export function runGoldenChecks(options = {}) {
  const errors = [];
  const staticResult = runStaticChecks({ silent: true });
  if (!staticResult.passed) {
    errors.push(...staticResult.errors.map((error) => `static preflight: ${error}`));
  }

  const markdown = readFileSync(goldenPath, 'utf8');
  errors.push(...validateGoldenStructure(markdown));

  for (const [label, text] of positiveMutationCases) {
    const claims = findForbiddenClaims(text, { source: `positive mutation: ${label}` });
    if (claims.length === 0) {
      errors.push(`positive mutation was not blocked: ${label}`);
    }
  }

  for (const text of validNegativeExamples) {
    const claims = findForbiddenClaims(text, { source: 'valid negative example' });
    if (claims.length > 0) {
      errors.push(`valid negative example was blocked: ${text}`);
    }
  }

  for (const [label, sections] of incompleteScenarioCases) {
    const incompleteErrors = validateGoldenStructure(buildIncompleteScenario(sections));
    if (incompleteErrors.length === 0) {
      errors.push(`incomplete scenario case passed unexpectedly: ${label}`);
    }
  }

  const cleanPassClaims = findForbiddenClaims('Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.');
  if (cleanPassClaims.length > 0) {
    errors.push('clean pass status was treated as a forbidden claim');
  }

  const fencedClaims = findForbiddenClaims('```text\nresync may create a materialization path\n```');
  if (fencedClaims.length === 0) {
    errors.push('fenced positive materialization claim was not blocked');
  }

  const result = {
    passed: errors.length === 0,
    errors,
  };

  if (!options.silent) {
    if (result.passed) {
      console.log('resync_kernel golden check: PASS');
      console.log('static preflight: PASS');
      console.log(`golden scenarios: ${SCENARIOS.length}`);
      console.log(`positive mutations blocked: ${positiveMutationCases.length}`);
    } else {
      console.error('resync_kernel golden check: FAIL');
      for (const error of errors) {
        console.error(`FAIL ${error}`);
      }
    }
  }

  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = runGoldenChecks();
  process.exitCode = result.passed ? 0 : 1;
}
