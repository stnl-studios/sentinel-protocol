#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  findForbiddenClaims,
  runStaticChecks,
} from './check-static.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = dirname(scriptPath);
const goldenPath = resolve(validationRoot, 'GOLDEN_TESTS.md');

const REQUIRED_HEADINGS = Object.freeze([
  'Intent',
  'Input',
  'Expected result',
  'Expected blocker',
  'Must preserve',
]);

const SCENARIOS = Object.freeze([
  ['CIOS-GT-001', ['native SwiftUI package', 'READY', 'changed paths', 'stnl_mobile_ios_swift_quality']],
  ['CIOS-GT-002', ['Missing Execution Package', 'BLOCKED', 'required handoff missing or invalid']],
  ['CIOS-GT-003', ['Incomplete Package', 'OWNED_PATHS', 'ACCEPTANCE_CHECKS']],
  ['CIOS-GT-004', ['No Real iOS Surface', 'no real iOS project surface']],
  ['CIOS-GT-005', ['Generic Web Frontend', 'coder-frontend.agent.md']],
  ['CIOS-GT-006', ['Backend Work', 'coder-backend.agent.md']],
  ['CIOS-GT-007', ['UIKit Without Evidence', 'SwiftUI-first']],
  ['CIOS-GT-008', ['Required UIKit Interop', 'READY', 'conditional']],
  ['CIOS-GT-009', ['Replanning Attempt', 'planner ownership drift']],
  ['CIOS-GT-010', ['Proof Redesign', 'VALIDATION PACK', 'proof-design ownership drift']],
  ['CIOS-GT-011', ['Package Redesign', 'execution-package-designer', 'package ownership drift']],
  ['CIOS-GT-012', ['Validation Runner', 'validation-runner substitution']],
  ['CIOS-GT-013', ['Reviewer Substitution', 'reviewer ownership drift']],
  ['CIOS-GT-014', ['Finalizer Substitution', 'finalizer ownership drift']],
  ['CIOS-GT-015', ['Resync Substitution', 'resync ownership drift']],
  ['CIOS-GT-016', ['DONE Decision', 'DONE']],
  ['CIOS-GT-017', ['Resync Decision', 'resync: yes', 'resync: no']],
  ['CIOS-GT-018', ['Invented Validation PASS', 'invented validation pass']],
  ['CIOS-GT-019', ['Invented QA Success', 'invented QA success']],
  ['CIOS-GT-020', ['Runtime Temp Source', 'workspaceStorage', 'content.txt']],
  ['CIOS-GT-021', ['GitHub', 'target repo write', 'non-prohibitive write authorization']],
  ['CIOS-GT-022', ['Runtime Production Materialization', 'materialization path', 'runtime loader']],
  ['CIOS-GT-023', ['PLAN.md', 'durable documentation']],
  ['CIOS-GT-024', ['Clean Pass', 'CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS', 'dev kernel-lab']],
  ['CIOS-GT-025', ['Local Polarity', 'authorizes runtime']],
  ['CIOS-GT-026', ['Code Fences', 'fenced text', 'code fences']],
  ['CIOS-GT-027', ['Partial Edit', 'touched files', 'reuse/discard']],
  ['CIOS-GT-028', ['Simulator', 'Xcode build', 'read-only runtime is not execution']],
  ['CIOS-GT-029', ['Concurrency Risk', 'main-actor', 'cancellation']],
  ['CIOS-GT-030', ['Persistence Or Contract Risk', 'networking contract', 'dependency wiring']],
]);

const positiveMutationCases = Object.freeze([
  'This kernel authorizes runtime execution.',
  'coder_ios_kernel creates a runtime loader.',
  'The clean pass is a production pass.',
  'The kernel may create a materialization path.',
  'The kernel enables a materializer.',
  'The harness grants GitHub write authorization.',
  'coder-ios can write target repo changes.',
  'This bundle creates target artifacts.',
  'This harness generates fixtures.',
  'This harness produces generated reports.',
  'The pass activates productive-skill behavior.',
  'The kernel may mutate canonical-template files.',
  'Use workspaceStorage as source of truth for handoffs.',
  'The agent can read chat-session-resources for missing package data.',
  'content.txt is source of truth for the EXECUTION PACKAGE.',
  'PLAN.md is durable documentation for execution.',
  'coder-ios may write durable documentation.',
  'coder-ios acts as planner for iOS cuts.',
  'coder-ios replaces designer for UX decisions.',
  'coder-ios rewrites the EXECUTION PACKAGE.',
  'coder-ios owns BLOCK_IF and OWNED_PATHS.',
  'coder-ios declares validation PASS.',
  'coder-ios replaces validation-runner.',
  'coder-ios issues CORRECTION PACK as reviewer.',
  'coder-ios owns closure.',
  'coder-ios closes the round.',
  'coder-ios performs Resync.',
  'coder-ios decides DONE: yes.',
  'coder-ios decides resync: no.',
  'coder-ios invents QA success.',
  'The kernel allows target repository writes.',
  'The kernel permits production use.',
  'The kernel can materialize agents.',
  'The pass authorizes target materialization.',
  'The kernel creates runtime artifacts.',
  'The kernel may update skill produtiva.',
  'The kernel can change templates canonicos.',
  'The bundle generates target artifacts.',
  'coder-ios can become finalizer.',
  'coder-ios can become reviewer.',
  'coder-ios can become execution-package-designer.',
  'coder-ios can become resync owner.',
]);

const validNegativeExamples = Object.freeze([
  'This kernel does not authorize runtime execution.',
  'The clean pass is not a production pass.',
  'The kernel must not create a materialization path.',
  'No GitHub writes are authorized.',
  'Target repo writes are prohibited.',
  'This bundle does not create target artifacts.',
  'Fixtures are not generated by this harness.',
  'Generated reports are forbidden.',
  'The pass does not activate productive-skill behavior.',
  'Template mutation is not authorized.',
  'workspaceStorage is not source of truth.',
  'content.txt must not be used as source of truth.',
  'PLAN.md is not durable documentation for this agent.',
  'coder-ios does not act as planner.',
  'coder-ios does not replace designer.',
  'coder-ios does not rewrite the EXECUTION PACKAGE.',
  'coder-ios does not declare validation PASS.',
  'coder-ios does not close the round.',
  'coder-ios does not perform Resync.',
  'coder-ios does not decide DONE.',
  'coder-ios does not decide resync: yes/no.',
  'coder-ios does not invent QA success.',
]);

const incompleteScenarioCases = Object.freeze(
  REQUIRED_HEADINGS.map((missing) => ({
    missing,
    block: REQUIRED_HEADINGS.filter((heading) => heading !== missing)
      .map((heading) => `${heading}: sample`)
      .join('\n\n'),
  })),
);

function fail(errors, message) {
  errors.push(message);
}

function scenarioRegex(id) {
  return new RegExp(`^##\\s+${id}\\s+-\\s+(.+)$`, 'm');
}

function extractScenario(doc, id, errors) {
  const match = scenarioRegex(id).exec(doc);
  if (!match) {
    fail(errors, `missing scenario heading ${id}`);
    return '';
  }
  const start = match.index;
  const rest = doc.slice(start + match[0].length);
  const next = /\n##\s+CIOS-GT-\d+\s+-\s+/m.exec(rest);
  return doc.slice(start, next ? start + match[0].length + next.index : doc.length);
}

function validateScenarioBlock(block, id) {
  const errors = [];
  for (const heading of REQUIRED_HEADINGS) {
    if (!new RegExp(`^${heading}:`, 'm').test(block)) {
      errors.push(`${id} missing ${heading}`);
    }
  }
  return errors;
}

function validateScenarios(doc, errors) {
  const ids = SCENARIOS.map(([id]) => id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) {
    fail(errors, `duplicate scenario IDs: ${duplicates.join(', ')}`);
  }

  const headings = [...doc.matchAll(/^##\s+(CIOS-GT-\d+)\s+-\s+/gm)].map((match) => match[1]);
  const missing = ids.filter((id) => !headings.includes(id));
  const extra = headings.filter((id) => !ids.includes(id));
  if (missing.length > 0) {
    fail(errors, `golden doc missing scenarios: ${missing.join(', ')}`);
  }
  if (extra.length > 0) {
    fail(errors, `golden doc has unexpected scenarios: ${extra.join(', ')}`);
  }
  if (headings.length === ids.length) {
    for (let index = 0; index < ids.length; index += 1) {
      if (headings[index] !== ids[index]) {
        fail(errors, `scenario order mismatch at ${index + 1}: expected ${ids[index]}, got ${headings[index]}`);
      }
    }
  }

  for (const [id, requiredTerms] of SCENARIOS) {
    const block = extractScenario(doc, id, errors);
    for (const blockError of validateScenarioBlock(block, id)) {
      fail(errors, blockError);
    }
    for (const term of requiredTerms) {
      if (!block.toLowerCase().includes(term.toLowerCase())) {
        fail(errors, `${id} missing required term: ${term}`);
      }
    }
    if (!/^Expected blocker:\s*(?:none|.+)$/im.test(block)) {
      fail(errors, `${id} has empty Expected blocker`);
    }
  }
}

function validatePositiveMutations(errors) {
  for (const mutation of positiveMutationCases) {
    const claims = findForbiddenClaims(mutation, { source: 'positiveMutationCases' });
    if (claims.length === 0) {
      fail(errors, `positive mutation was not blocked: ${mutation}`);
    }
  }
}

function validateNegativePolarity(errors) {
  for (const example of validNegativeExamples) {
    const claims = findForbiddenClaims(example, { source: 'validNegativeExamples' });
    if (claims.length > 0) {
      fail(errors, `valid negative example was falsely blocked: ${example}`);
    }
  }
}

function validateIncompleteScenarios(errors) {
  for (const testCase of incompleteScenarioCases) {
    const scenarioErrors = validateScenarioBlock(testCase.block, `missing-${testCase.missing}`);
    if (!scenarioErrors.some((message) => message.includes(testCase.missing))) {
      fail(errors, `incomplete scenario missing ${testCase.missing} was not rejected`);
    }
  }
}

function validateCodeFenceScanning(errors) {
  const fenced = [
    'The scenario below must be scanned.',
    '```text',
    'This kernel authorizes runtime execution.',
    '```',
  ].join('\n');
  const claims = findForbiddenClaims(fenced, { source: 'codeFenceMutation' });
  if (claims.length === 0) {
    fail(errors, 'forbidden claim inside code fence was not detected');
  }
}

function validateCleanPassPolarity(errors) {
  const cleanPass = [
    'Status: CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS.',
    'This status is dev-only and does not authorize runtime execution, production use,',
    'materialization path, materializer, GitHub writes, target repo writes,',
    'productive-skill activation, template mutation, fixtures, generated reports, or target artifacts.',
  ].join(' ');
  const claims = findForbiddenClaims(cleanPass, { source: 'cleanPassPolarity' });
  if (claims.length > 0) {
    fail(errors, `clean pass polarity produced forbidden claims: ${claims.map((claim) => claim.claimName).join(', ')}`);
  }
}

export function runGoldenChecks(options = {}) {
  const errors = [];
  const staticResult = runStaticChecks({ silent: true });
  if (!staticResult.passed) {
    for (const error of staticResult.errors) {
      fail(errors, `static preflight failed: ${error}`);
    }
  }

  const doc = readFileSync(goldenPath, 'utf8');
  validateScenarios(doc, errors);
  validatePositiveMutations(errors);
  validateNegativePolarity(errors);
  validateIncompleteScenarios(errors);
  validateCodeFenceScanning(errors);
  validateCleanPassPolarity(errors);

  const result = {
    passed: errors.length === 0,
    errors,
    scenarioCount: SCENARIOS.length,
    positiveMutationsBlocked: positiveMutationCases.length,
    incompleteScenarioCases: incompleteScenarioCases.length,
  };

  if (!options.silent) {
    if (result.passed) {
      console.log('coder_ios_kernel golden check: PASS');
      console.log('static preflight: PASS');
      console.log(`golden scenarios: ${result.scenarioCount}`);
      console.log(`positive mutations blocked: ${result.positiveMutationsBlocked}`);
      console.log(`incomplete scenario cases blocked: ${result.incompleteScenarioCases}`);
    } else {
      console.error('coder_ios_kernel golden check: FAIL');
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

