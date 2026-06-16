#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "../..");

const rel = (...parts) => parts.join("/");
const abs = (relativePath) => path.join(skillRoot, relativePath);

const failures = [];
const textCache = new Map();

const materializationContracts = [
  "TARGETS_CONTRACT.md",
  "TEMPLATES_AND_OUTPUTS_CONTRACT.md",
  "RENDERING_AND_COMPOSITION_CONTRACT.md",
  "DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
  "VALIDATION_HARNESS_CONTRACT.md",
  "IMPLEMENTATION_BOUNDARY_CONTRACT.md",
  "FIXTURE_BOUNDARY_CONTRACT.md",
];

const validationFiles = [
  "STATIC_CHECKS.md",
  "GOLDEN_SCENARIOS.md",
  "EXCELLENT_PASS_EXPECTATIONS.md",
];

const templates = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

const agents = [
  "orchestrator",
  "planner",
  "validation-eval-designer",
  "execution-package-designer",
  "designer",
  "coder-frontend",
  "coder-backend",
  "coder-ios",
  "validation-runner",
  "reviewer",
  "finalizer",
  "resync",
];

const profileByAgent = new Map([
  ["orchestrator", "orchestrator_profile"],
  ["planner", "planner_profile"],
  ["validation-eval-designer", "validation_eval_designer_profile"],
  ["execution-package-designer", "execution_package_designer_profile"],
  ["designer", "designer_profile"],
  ["coder-frontend", "coder_frontend_profile"],
  ["coder-backend", "coder_backend_profile"],
  ["coder-ios", "coder_ios_profile"],
  ["validation-runner", "validation_runner_profile"],
  ["reviewer", "reviewer_profile"],
  ["finalizer", "finalizer_profile"],
  ["resync", "resync_profile"],
]);

const commonPlaceholders = [
  "{{AGENT_ID}}",
  "{{AGENT_NAME}}",
  "{{AGENT_DESCRIPTION}}",
  "{{AGENT_BODY}}",
  "{{TARGET_ID}}",
  "{{GENERATED_NOTICE}}",
  "{{SOURCE_VERSION}}",
];

const copilotPlaceholders = [
  "{{AGENT_TOOLS}}",
  "{{AGENT_MODEL}}",
  "{{SPECIALIZATION_REVISION}}",
  "{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}",
  "{{READING_SCOPE_CLASS_BLOCK}}",
];

const codexPlaceholders = [
  "{{AGENT_MODEL}}",
  "{{MODEL_REASONING_EFFORT}}",
  "{{SANDBOX_MODE}}",
];

const plannedOperations = [
  "CREATE_PLANNED",
  "UPDATE_PLANNED",
  "UNCHANGED_PLANNED",
  "BLOCKED_PLANNED",
];

const validationStatuses = [
  "VALIDATION_PASS",
  "VALIDATION_BLOCKED",
  "VALIDATION_FAILED",
];

const blockCodesByContract = {
  "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md": [
    "BLOCKED_TEMPLATE_MISSING",
  ],
  "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md": [
    "BLOCKED_SOURCE_MISSING",
    "BLOCKED_TEMPLATE_MISSING",
    "BLOCKED_PLACEHOLDER_MISSING",
    "BLOCKED_UNSAFE_RENDER",
    "BLOCKED_COMPOSITION_CONFLICT",
  ],
  "reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md": [
    "BLOCKED_TARGET_ROOT_INVALID",
    "BLOCKED_PATH_UNSAFE",
    "BLOCKED_UNMANAGED_COLLISION",
    "BLOCKED_INVALID_MANAGED_NOTICE",
    "BLOCKED_DRY_RUN_REQUIRED",
    "BLOCKED_SOURCE_MISSING",
    "BLOCKED_TEMPLATE_MISSING",
    "BLOCKED_PLACEHOLDER_MISSING",
    "BLOCKED_UNSAFE_RENDER",
    "BLOCKED_COMPOSITION_CONFLICT",
  ],
  "reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md": [
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
    "BLOCKED_TARGET_FILE_MUTATION",
    "BLOCKED_MATRIX_INCOMPLETE",
    "BLOCKED_UNKNOWN_BLOCK_CODE",
  ],
  "reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md": [
    "BLOCKED_IMPLEMENTATION_SCOPE_INVALID",
    "BLOCKED_SCRIPT_PATH_UNAUTHORIZED",
    "BLOCKED_SCRIPT_WRITE_CAPABILITY",
    "BLOCKED_SCRIPT_TARGET_MUTATION",
    "BLOCKED_SCRIPT_PRODUCTIVE_MUTATION",
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ],
  "reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md": [
    "BLOCKED_FIXTURE_SCOPE_INVALID",
    "BLOCKED_FIXTURE_PATH_UNAUTHORIZED",
    "BLOCKED_FIXTURE_TARGET_REAL",
    "BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT",
    "BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED",
    "BLOCKED_FIXTURE_ESCAPES_DEV_SKILL",
  ],
};

const forbiddenAuthorizations = [
  "runtime materializer",
  "target read/write",
  "target real read/write",
  "target writes",
  "generated outputs",
  "generated final artifacts",
  "fixtures",
  "fixture creation",
  "paths outside the authorized fixture root",
  "persistent reports",
  "productive skill changes",
  "GitHub writes",
  "real materialization",
];

function recordFailure(message) {
  failures.push(message);
}

async function exists(relativePath) {
  try {
    await access(abs(relativePath));
    return true;
  } catch {
    return false;
  }
}

async function requireFile(relativePath) {
  if (!(await exists(relativePath))) {
    recordFailure(`missing required file: ${relativePath}`);
    return false;
  }
  return true;
}

async function readText(relativePath) {
  if (textCache.has(relativePath)) {
    return textCache.get(relativePath);
  }

  if (relativePath.includes("__MACOSX") || relativePath.endsWith(".DS_Store")) {
    recordFailure(`refusing ignored path: ${relativePath}`);
    return "";
  }

  try {
    const content = await readFile(abs(relativePath), "utf8");
    textCache.set(relativePath, content);
    return content;
  } catch (error) {
    recordFailure(`cannot read ${relativePath}: ${error.message}`);
    return "";
  }
}

function requireIncludes(content, relativePath, anchor, label = anchor) {
  if (!content.includes(anchor)) {
    recordFailure(`${relativePath} missing anchor: ${label}`);
  }
}

function requireAll(content, relativePath, anchors, groupLabel) {
  for (const anchor of anchors) {
    requireIncludes(content, relativePath, anchor, `${groupLabel}: ${anchor}`);
  }
}

function contractPath(fileName) {
  return rel("reference/materialization_lab/contracts", fileName);
}

function validationPath(fileName) {
  return rel("reference/materialization_lab/validation", fileName);
}

function hasForbiddenPositiveAuthorization(line, term) {
  const lowerLine = line.toLowerCase();
  const lowerTerm = term.toLowerCase();

  if (!lowerLine.includes("authoriz") || !lowerLine.includes(lowerTerm)) {
    return false;
  }

  const denialMarkers = [
    "does not authorize",
    "do not authorize",
    "does not grant",
    "not authorize",
    "non-authorization",
    "unauthoriz",
    "no ",
    "must not",
    "forbid",
    "forbids",
    "forbidden",
    "denies",
    "deny",
    "out of scope",
    "without",
    "future path",
    "future fixture",
    "later step",
    "later authorization",
    "separately authorized",
    "future outputs",
    "only inside",
    "remain prohibited",
    "outside the authorized fixture root",
  ];

  return !denialMarkers.some((marker) => lowerLine.includes(marker));
}

async function validateRequiredFiles() {
  await requireFile("reference/MANIFEST.md");

  for (const contract of materializationContracts) {
    await requireFile(contractPath(contract));
  }

  for (const validation of validationFiles) {
    await requireFile(validationPath(validation));
  }

  for (const template of templates) {
    await requireFile(template);
  }

  for (const agent of agents) {
    await requireFile(rel("reference/agents", `${agent}.agent.md`));
  }

  for (const [agent, profileDir] of profileByAgent.entries()) {
    await requireFile(
      rel("reference/seniorization_lab", profileDir, "SENIOR_AGENT_PROFILE.md"),
    );
    if (!agents.includes(agent)) {
      recordFailure(`profile map contains unknown agent: ${agent}`);
    }
  }
}

async function validateContractAnchors() {
  const targets = await readText(contractPath("TARGETS_CONTRACT.md"));
  requireAll(targets, contractPath("TARGETS_CONTRACT.md"), [
    "copilot",
    "codex",
    ".github/agents",
    ".codex/agents",
    ".codex/config.toml",
    "AGENTS.md",
  ], "target anchor");

  const templatesContract = await readText(
    contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
  );
  requireAll(templatesContract, contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"), [
    "copilot",
    "codex",
    ".github/agents",
    ".codex/agents",
    ".codex/config.toml",
    "AGENTS.md",
    "reference/templates/copilot/agent.md",
    "reference/templates/codex/agent.toml",
    "reference/templates/codex/config.toml",
    "reference/templates/codex/AGENTS.md",
    "BLOCKED_TEMPLATE_MISSING",
  ], "template/output anchor");

  const rendering = await readText(
    contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"),
  );
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), agents, "agent id");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), [
    "reference/agents/<agent>.agent.md",
    "reference/agents/<agent>.md",
    "reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md",
    "reference/templates/<target>/...",
    "reference/materialization_lab/contracts/TARGETS_CONTRACT.md",
    "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md",
  ], "composition source");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), commonPlaceholders, "common placeholder");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), copilotPlaceholders, "copilot placeholder");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), codexPlaceholders, "codex placeholder");

  const dryRun = await readText(contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"));
  requireAll(dryRun, contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"), plannedOperations, "planned operation");
  requireAll(dryRun, contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"), [
    ".github/agents/<agent>.agent.md",
    ".codex/agents/<agent>.toml",
    ".codex/config.toml",
    "AGENTS.md",
  ], "planned path");

  const validation = await readText(contractPath("VALIDATION_HARNESS_CONTRACT.md"));
  requireAll(validation, contractPath("VALIDATION_HARNESS_CONTRACT.md"), validationStatuses, "validation status");
  requireAll(validation, contractPath("VALIDATION_HARNESS_CONTRACT.md"), agents, "validation matrix agent");
  requireAll(validation, contractPath("VALIDATION_HARNESS_CONTRACT.md"), [
    "12 agents x `copilot`",
    "12 agents x `codex`",
    "`codex` config",
    "`codex` root instructions",
  ], "validation matrix");

  const implementation = await readText(
    contractPath("IMPLEMENTATION_BOUNDARY_CONTRACT.md"),
  );
  requireAll(implementation, contractPath("IMPLEMENTATION_BOUNDARY_CONTRACT.md"), [
    "static contract validator",
    "source inventory validator",
    "template coverage validator",
    "render-context planner",
    "dry-run output planner",
    "validation report generator",
    "skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/",
    "skills/stnl_project_agent_specializer_dev/reference/**",
    "skills/stnl_project_agent_specializer_dev/README.md",
    "skills/stnl_project_agent_specializer_dev/SKILL.md",
    "skills/stnl_project_agent_specializer_dev/openai.yaml",
  ], "implementation boundary");

  const fixture = await readText(contractPath("FIXTURE_BOUNDARY_CONTRACT.md"));
  requireAll(fixture, contractPath("FIXTURE_BOUNDARY_CONTRACT.md"), [
    "Status: documentary/dev-only contract.",
    "This task does not create fixtures",
    "may occur only in a later step",
    "skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/",
    "fixture read/write in this task",
    "use a real target project root",
    "write to a real target project",
    ".github/**",
    ".codex/**",
    "AGENTS.md",
    "paths outside the authorized fixture root remain prohibited",
    "accept only fixture paths that resolve",
    "target real read/write",
    "generated final artifacts",
    "persistent reports in this task",
  ], "fixture boundary");
}

async function validateTemplatePlaceholders() {
  const copilotTemplate = await readText("reference/templates/copilot/agent.md");
  requireAll(copilotTemplate, "reference/templates/copilot/agent.md", [
    ...commonPlaceholders,
    ...copilotPlaceholders,
  ], "template placeholder");

  const codexTemplate = await readText("reference/templates/codex/agent.toml");
  requireAll(codexTemplate, "reference/templates/codex/agent.toml", [
    ...commonPlaceholders,
    ...codexPlaceholders,
  ], "template placeholder");

  requireAll(codexTemplate, "reference/templates/codex/agent.toml", [
    "name =",
    "description =",
    "model =",
    "model_reasoning_effort =",
    "sandbox_mode =",
    "developer_instructions =",
  ], "codex required field");
}

async function validateBlockCodes() {
  for (const [relativePath, blockCodes] of Object.entries(blockCodesByContract)) {
    const content = await readText(relativePath);
    requireAll(content, relativePath, blockCodes, "block code");
  }

  const allKnownBlockCodes = new Set(Object.values(blockCodesByContract).flat());
  const validation = await readText(contractPath("VALIDATION_HARNESS_CONTRACT.md"));
  for (const blockCode of allKnownBlockCodes) {
    if (blockCode.startsWith("BLOCKED_") && !validation.includes(blockCode)) {
      const earlierContractsMention =
        blockCode.startsWith("BLOCKED_VALIDATION_") ||
        blockCode.startsWith("BLOCKED_PRODUCTIVE_") ||
        blockCode.startsWith("BLOCKED_TARGET_FILE_") ||
        blockCode.startsWith("BLOCKED_MATRIX_") ||
        blockCode.startsWith("BLOCKED_UNKNOWN_");
      if (earlierContractsMention) {
        recordFailure(
          `${contractPath("VALIDATION_HARNESS_CONTRACT.md")} missing validation block code: ${blockCode}`,
        );
      }
    }
  }
}

async function validateNonAuthorization() {
  const contractTexts = [];

  for (const contract of materializationContracts) {
    const relativePath = contractPath(contract);
    const content = await readText(relativePath);
    contractTexts.push([relativePath, content]);
  }

  const combined = contractTexts.map(([, content]) => content).join("\n");
  for (const term of forbiddenAuthorizations) {
    if (!combined.toLowerCase().includes(term.toLowerCase())) {
      recordFailure(`contracts do not mention forbidden authorization boundary: ${term}`);
    }
  }

  for (const [relativePath, content] of contractTexts) {
    const paragraphs = content.split(/\n\s*\n/);
    for (const [index, paragraph] of paragraphs.entries()) {
      const compactParagraph = paragraph.replace(/\s+/g, " ").trim();
      for (const term of forbiddenAuthorizations) {
        if (hasForbiddenPositiveAuthorization(compactParagraph, term)) {
          recordFailure(
            `${relativePath} paragraph ${index + 1} appears to authorize forbidden scope: ${term}`,
          );
        }
      }
    }
  }
}

async function validateStaticValidatorRegistration() {
  const manifest = await readText("reference/MANIFEST.md");
  requireAll(manifest, "reference/MANIFEST.md", [
    "scripts/materialization_lab/check-static.mjs",
    "static contract validator",
    "read-only",
  ], "static validator manifest registration");

  const staticChecks = await readText(validationPath("STATIC_CHECKS.md"));
  requireAll(staticChecks, validationPath("STATIC_CHECKS.md"), [
    "scripts/materialization_lab/check-static.mjs",
    "MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS",
    "read-only",
  ], "static validator checks registration");

  const expectations = await readText(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));
  requireAll(expectations, validationPath("EXCELLENT_PASS_EXPECTATIONS.md"), [
    "scripts/materialization_lab/check-static.mjs",
    "MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS",
    "read-only",
  ], "static validator expectation registration");
}

async function main() {
  await validateRequiredFiles();
  await validateContractAnchors();
  await validateTemplatePlaceholders();
  await validateBlockCodes();
  await validateNonAuthorization();
  await validateStaticValidatorRegistration();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_STATIC_CONTRACT_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
