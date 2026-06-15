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
    id: 'FNL-GT-001',
    blocker: 'BLOCKED_FNL_READY_LEDGER_INCOMPLETE',
    terms: [/Runner verdict is `PASS`/, /Feature CONTEXT/, /closure ledger/, /DONE: yes\/no/, /resync: yes\/no/],
  },
  {
    id: 'FNL-GT-002',
    blocker: 'BLOCKED_FNL_DONE_INFLATION',
    terms: [/runner `PASS` is not automatic/i, /DONE: no/],
  },
  {
    id: 'FNL-GT-003',
    blocker: 'BLOCKED_FNL_RUNNER_VERDICT_REISSUED',
    terms: [/Runner verdict is `FAIL`/, /Preserve runner `FAIL`/, /finalizer `READY` or `BLOCKED`/],
  },
  {
    id: 'FNL-GT-004',
    blocker: 'BLOCKED_FNL_PARTIAL_AS_DONE',
    terms: [/Runner verdict is `PARTIAL`/, /pending or residual work/i],
  },
  {
    id: 'FNL-GT-005',
    blocker: 'BLOCKED_FNL_VALIDATION_BLOCKAGE_LOST',
    terms: [/validation-owned `BLOCKED`/, /unconfirmed\s+state/i],
  },
  {
    id: 'FNL-GT-006',
    blocker: 'BLOCKED_FNL_SYNTHETIC_RUNNER_VERDICT',
    terms: [/Execution blocked before validation/, /validation never ran/i],
  },
  {
    id: 'FNL-GT-007',
    blocker: 'BLOCKED_FNL_REQUIRED_REVIEW_RISK',
    terms: [/Review was required/, /unresolved material structural risk/i],
  },
  {
    id: 'FNL-GT-008',
    blocker: 'BLOCKED_FNL_ADVISORY_REVIEW_MISCLASSIFIED',
    terms: [/Reviewer signal is `advisory`/, /without blocking automatically/i],
  },
  {
    id: 'FNL-GT-009',
    blocker: 'BLOCKED_FNL_RESIDUAL_PACK_MISSING',
    terms: [/Budget exhaustion/, /fingerprints or root causes/i, /budget state/i],
  },
  {
    id: 'FNL-GT-010',
    blocker: 'BLOCKED_FNL_QA_SUCCESS_INVENTED',
    terms: [/qa_checklist\.md/, /QA CHECKLIST UPDATE/, /runner-backed evidence/i],
  },
  {
    id: 'FNL-GT-011',
    blocker: 'BLOCKED_FNL_QA_PROCESS_GAP',
    terms: [/Execution Ready/, /qa_tracking: not_applicable/, /process gap/i],
  },
  {
    id: 'FNL-GT-012',
    blocker: 'BLOCKED_FNL_SLICE_EVIDENCE_MISSING',
    terms: [/SL-001/, /concluida/, /parcial/, /bloqueada/],
  },
  {
    id: 'FNL-GT-013',
    blocker: 'BLOCKED_FNL_RESYNC_BOUNDARY_DRIFT',
    terms: [/bounded factual out-of-feature delta/i, /resync: yes/, /without executing resync/i],
  },
  {
    id: 'FNL-GT-014',
    blocker: 'BLOCKED_FNL_UNBOUNDED_RESYNC_DELTA',
    terms: [/cannot be bounded honestly/i, /finalizer `BLOCKED`/],
  },
  {
    id: 'FNL-GT-015',
    blocker: 'BLOCKED_FNL_VERDICT_EVIDENCE_CONTRADICTION',
    terms: [/materially contradict/i, /finalizer `BLOCKED`/],
  },
  {
    id: 'FNL-GT-016',
    blocker: 'BLOCKED_FNL_LEDGER_INCOMPLETE',
    terms: [/Closure record lacks/, /DONE decision/, /resync\s+decision/],
  },
  {
    id: 'FNL-GT-017',
    blocker: 'BLOCKED_FNL_BOUNDARY_DRIFT',
    terms: [/implementation/, /validation rerun/, /review substitution/, /resync execution/],
  },
  {
    id: 'FNL-GT-018',
    blocker: 'BLOCKED_FNL_RUNTIME_TEMP_SEARCH',
    terms: [/workspaceStorage/, /chat-session-resources/, /content\.txt/, /scratchpads/],
  },
  {
    id: 'FNL-GT-019',
    blocker: 'BLOCKED_FNL_LEGACY_DURABLE_DOC',
    terms: [/PLAN\.md/, /legacy phase artifact/, /durable/],
  },
  {
    id: 'FNL-GT-020',
    blocker: 'BLOCKED_FNL_ACTIVE_SPEC_DONE',
    terms: [/closure_status: not_closed/, /DONE\.md/],
  },
  {
    id: 'FNL-GT-021',
    blocker: 'BLOCKED_FNL_MISSING_DONE_RESYNC_DECISIONS',
    terms: [/docs\/context/i, /DONE/, /resync decisions/i],
  },
  {
    id: 'FNL-GT-022',
    blocker: 'BLOCKED_FNL_READY_AS_PASS',
    terms: [/READY/, /runner `PASS`/, /validation verdict/i],
  },
]);

const positiveMutationCases = Object.freeze([
  ['runtime authority', 'The finalizer kernel authorizes runtime loading for closure.'],
  ['production authority', 'The finalizer may run as a production path.'],
  ['materialization authority', 'The finalizer can create a materialization path.'],
  ['materializer authority', 'The finalizer kernel enables a materializer.'],
  ['GitHub write authority', 'The finalizer may write GitHub comments.'],
  ['target repo write authority', 'The finalizer may write target repo artifacts.'],
  ['generated report authority', 'The finalizer can generate generated reports.'],
  ['fixture authority', 'The finalizer creates fixtures for closure tests.'],
  ['target artifact authority', 'The finalizer writes target artifacts.'],
  ['productive skill authority', 'The finalizer activates the productive skill.'],
  ['template mutation authority', 'The finalizer performs template mutation.'],
  ['snapshot mutation authority', 'The finalizer performs snapshot mutation.'],
  ['resync execution', 'The finalizer executes resync after closure.'],
  ['runner substitution', 'The finalizer substitutes validation-runner evidence.'],
  ['reviewer substitution', 'The finalizer replaces reviewer output.'],
  ['implementation', 'The finalizer implements the missing fix.'],
  ['validation rerun', 'The finalizer reruns validation before closing.'],
  ['replan', 'The finalizer replans the cut.'],
  ['proof redesign', 'The finalizer redesigns proof.'],
  ['package reinterpretation', 'The finalizer reinterprets the EXECUTION PACKAGE.'],
  ['runner verdict reissue', 'The finalizer emits PASS as its own status.'],
  ['READY means PASS', 'READY means validation PASS.'],
  ['DONE inflation', 'DONE is automatic when green checks pass.'],
  ['QA success invented', 'The finalizer invents QA checklist success.'],
  ['PLAN durable', 'PLAN.md is durable documentation for closure.'],
  ['runtime temp search', 'The finalizer searches workspaceStorage for handoffs.'],
  ['future promotion', 'Future kernels are automatically promoted after this pass.'],
  ['weak closure', 'READY may be emitted without closure ledger or DONE and resync decisions.'],
]);

const validNegativeExamples = Object.freeze([
  'The finalizer does not authorize runtime.',
  'No materialization path is authorized.',
  'The finalizer must not execute resync.',
  'The finalizer does not implement or fix code.',
  'The finalizer does not reissue runner verdict.',
  'READY is not PASS.',
  'DONE is not automatic from green checks.',
  'QA checklist success without runner-backed evidence is blocked.',
  'PLAN.md is not durable documentation.',
  'Search of workspaceStorage for handoffs is blocked.',
  'Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.',
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
    if (/^##\s+Golden Test FNL-GT-\d{3}\b/.test(lines[index])) {
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
  const foundIds = [...markdown.matchAll(/^##\s+Golden Test (FNL-GT-\d{3})\b/gm)].map((match) => match[1]);
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
    'Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.',
    '',
    '## Golden Test FNL-GT-001 - Synthetic',
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

  const cleanPassClaims = findForbiddenClaims('Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.');
  if (cleanPassClaims.length > 0) {
    errors.push('clean pass status was treated as a forbidden claim');
  }

  const result = {
    passed: errors.length === 0,
    errors,
  };

  if (!options.silent) {
    if (result.passed) {
      console.log('finalizer_kernel golden check: PASS');
      console.log('static preflight: PASS');
      console.log(`golden scenarios: ${SCENARIOS.length}`);
      console.log(`positive mutations blocked: ${positiveMutationCases.length}`);
    } else {
      console.error('finalizer_kernel golden check: FAIL');
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
