#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");

const failures = [];
const textCache = new Map();

const expectedScriptPath =
  "scripts/materialization_lab/check-render-context.mjs";

const previousScripts = [
  "scripts/materialization_lab/check-static.mjs",
  "scripts/materialization_lab/check-source-inventory.mjs",
  "scripts/materialization_lab/check-template-coverage.mjs",
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

const kernelByAgent = new Map([
  ["orchestrator", "orchestrator_kernel"],
  ["planner", "planner_kernel"],
  ["validation-eval-designer", "validation_eval_designer_kernel"],
  ["execution-package-designer", "execution_package_designer_kernel"],
  ["designer", "designer_kernel"],
  ["coder-frontend", "coder_frontend_kernel"],
  ["coder-backend", "coder_backend_kernel"],
  ["coder-ios", "coder_ios_kernel"],
  ["validation-runner", "validation_runner_kernel"],
  ["reviewer", "reviewer_kernel"],
  ["finalizer", "finalizer_kernel"],
  ["resync", "resync_kernel"],
]);

const targets = [
  {
    id: "copilot",
    template: "reference/templates/copilot/agent.md",
    escapingMode: "yaml-safe",
    specificPlaceholders: [
      "{{AGENT_TOOLS}}",
      "{{AGENT_MODEL}}",
      "{{SPECIALIZATION_REVISION}}",
      "{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}",
      "{{READING_SCOPE_CLASS_BLOCK}}",
    ],
  },
  {
    id: "codex",
    template: "reference/templates/codex/agent.toml",
    escapingMode: "toml-safe",
    specificPlaceholders: [
      "{{AGENT_MODEL}}",
      "{{MODEL_REASONING_EFFORT}}",
      "{{SANDBOX_MODE}}",
    ],
  },
];

const commonPlaceholders = [
  "{{AGENT_ID}}",
  "{{AGENT_NAME}}",
  "{{AGENT_DESCRIPTION}}",
  "{{AGENT_BODY}}",
  "{{TARGET_ID}}",
  "{{GENERATED_NOTICE}}",
  "{{SOURCE_VERSION}}",
];

const renderContextFields = [
  "agent_id",
  "target_id",
  "kernel_source",
  "senior_profile_source",
  "template_source",
  "target_contract_source",
  "template_contract_source",
  "rendering_contract_source",
  "required_placeholder_values",
  "target_specific_placeholder_values",
  "escaping_mode",
  "safety_verdict",
  "source_version_input",
  "generated_notice_representation",
  "composition_conflict_verdict",
];

const renderingBlockCodes = [
  "BLOCKED_SOURCE_MODEL_INVALID",
  "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  "BLOCKED_KERNEL_SOURCE_MISSING",
  "BLOCKED_KERNEL_COVERAGE_INCOMPLETE",
  "BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE",
  "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
  "BLOCKED_SOURCE_MISSING",
  "BLOCKED_TEMPLATE_MISSING",
  "BLOCKED_PLACEHOLDER_MISSING",
  "BLOCKED_UNSAFE_RENDER",
  "BLOCKED_COMPOSITION_CONFLICT",
];

function recordFailure(message) {
  failures.push(message);
}

function isIgnoredName(name) {
  return name === "__MACOSX" || name === ".DS_Store";
}

function rel(...parts) {
  return parts.join("/");
}

function abs(relativePath) {
  const normalized = path.normalize(relativePath);
  if (
    path.isAbsolute(normalized) ||
    normalized === ".." ||
    normalized.startsWith(`..${path.sep}`)
  ) {
    throw new Error(`path escapes dev skill root: ${relativePath}`);
  }

  const absolutePath = path.resolve(skillRoot, normalized);
  const relativeToRoot = path.relative(skillRoot, absolutePath);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    throw new Error(`path escapes dev skill root: ${relativePath}`);
  }
  return absolutePath;
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
  if (relativePath.split(/[\\/]/).some(isIgnoredName)) {
    return false;
  }

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

  if (relativePath.split(/[\\/]/).some(isIgnoredName)) {
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

async function readTopLevel(relativePath) {
  try {
    const entries = await readdir(abs(relativePath), { withFileTypes: true });
    return entries.filter((entry) => !isIgnoredName(entry.name));
  } catch (error) {
    recordFailure(`cannot read directory ${relativePath}: ${error.message}`);
    return [];
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

function expectedProfileDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_profile`;
}

function expectedKernelDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_kernel`;
}

const deprecatedBaseAgentSourceField = "base_agent_source";

async function validateNoTargetArgument() {
  const extraArgs = process.argv.slice(2);
  if (extraArgs.length > 0) {
    recordFailure(
      "target project paths or extra arguments are not accepted by this render-context checker",
    );
  }
}

async function validateScriptBoundary() {
  const expectedAbs = abs(expectedScriptPath);
  if (path.relative(expectedAbs, scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }

  for (const previousScript of previousScripts) {
    await requireFile(previousScript);
  }
  await requireFile(expectedScriptPath);
}

async function validateCanonicalAgentIds() {
  for (const agent of agents) {
    const expectedKernel = expectedKernelDir(agent);
    const actualKernel = kernelByAgent.get(agent);
    if (actualKernel !== expectedKernel) {
      recordFailure(
        `kernel mapping mismatch for ${agent}: expected ${expectedKernel}, got ${actualKernel}`,
      );
    }
    await requireFile(rel("reference/kernel_lab", actualKernel));

    const expectedProfile = expectedProfileDir(agent);
    const actualProfile = profileByAgent.get(agent);
    if (actualProfile !== expectedProfile) {
      recordFailure(
        `profile mapping mismatch for ${agent}: expected ${expectedProfile}, got ${actualProfile}`,
      );
    }
    await requireFile(
      rel("reference/seniorization_lab", actualProfile, "SENIOR_AGENT_PROFILE.md"),
    );
  }
}

async function validateCanonicalTargets() {
  const targetIds = targets.map((target) => target.id);
  const targetEntries = await readTopLevel("reference/templates");
  const expectedTargetDirs = new Set(targetIds);

  for (const entry of targetEntries) {
    if (!entry.isDirectory()) {
      recordFailure(`reference/templates contains non-directory item: ${entry.name}`);
      continue;
    }

    if (!expectedTargetDirs.has(entry.name)) {
      recordFailure(`reference/templates contains unexpected target: ${entry.name}`);
    }
  }

  const targetsContract = await readText(contractPath("TARGETS_CONTRACT.md"));
  const templatesContract = await readText(
    contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
  );
  for (const targetId of targetIds) {
    requireIncludes(
      targetsContract,
      contractPath("TARGETS_CONTRACT.md"),
      `- \`${targetId}\``,
      `canonical target: ${targetId}`,
    );
    requireIncludes(
      templatesContract,
      contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
      `- \`${targetId}\``,
      `template contract target: ${targetId}`,
    );
  }
}

async function validateRequiredSources() {
  await requireFile("reference/MANIFEST.md");
  await requireFile(contractPath("SOURCE_MODEL_CONTRACT.md"));
  await requireFile(contractPath("TARGETS_CONTRACT.md"));
  await requireFile(contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"));
  await requireFile(contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"));
  await requireFile(contractPath("FIXTURE_BOUNDARY_CONTRACT.md"));
  await requireFile(validationPath("STATIC_CHECKS.md"));
  await requireFile(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));

  for (const target of targets) {
    await requireFile(target.template);
  }
}

function buildPlaceholderValues(agentId, target) {
  const commonValues = {
    "{{AGENT_ID}}": agentId,
    "{{AGENT_NAME}}": agentId,
    "{{AGENT_DESCRIPTION}}": `render-context check description for ${agentId}`,
    "{{AGENT_BODY}}": "abstract body value; not rendered or written",
    "{{TARGET_ID}}": target.id,
    "{{GENERATED_NOTICE}}": "abstract generated notice representation",
    "{{SOURCE_VERSION}}": "abstract-source-version",
  };

  if (target.id === "copilot") {
    return {
      commonValues,
      targetValues: {
        "{{AGENT_TOOLS}}": "- read",
        "{{AGENT_MODEL}}": "abstract-model",
        "{{SPECIALIZATION_REVISION}}": "1",
        "{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}":
          agentId === "orchestrator" ? "agents:\n  - planner" : "",
        "{{READING_SCOPE_CLASS_BLOCK}}": "reading_scope_class: standard",
      },
    };
  }

  return {
    commonValues,
    targetValues: {
      "{{AGENT_MODEL}}": "abstract-model",
      "{{MODEL_REASONING_EFFORT}}": "medium",
      "{{SANDBOX_MODE}}": "workspace-write",
    },
  };
}

function buildRenderContext(agentId, target) {
  const { commonValues, targetValues } = buildPlaceholderValues(agentId, target);

  return {
    agent_id: agentId,
    target_id: target.id,
    kernel_source: rel("reference/kernel_lab", kernelByAgent.get(agentId)),
    senior_profile_source: rel(
      "reference/seniorization_lab",
      profileByAgent.get(agentId),
      "SENIOR_AGENT_PROFILE.md",
    ),
    template_source: target.template,
    target_contract_source: contractPath("TARGETS_CONTRACT.md"),
    template_contract_source: contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
    rendering_contract_source: contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"),
    required_placeholder_values: commonValues,
    target_specific_placeholder_values: targetValues,
    escaping_mode: target.escapingMode,
    safety_verdict: "SAFE_RENDER_CONTEXT_PLANNED",
    source_version_input: commonValues["{{SOURCE_VERSION}}"],
    generated_notice_representation: commonValues["{{GENERATED_NOTICE}}"],
    composition_conflict_verdict: "NO_STATIC_COMPOSITION_CONFLICT_DETECTED",
  };
}

async function validateTemplatePlaceholders() {
  for (const target of targets) {
    const content = await readText(target.template);
    requireAll(
      content,
      target.template,
      [...commonPlaceholders, ...target.specificPlaceholders],
      `${target.id} template placeholder`,
    );
  }
}

async function validateRenderingContractAnchors() {
  const relativePath = contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md");
  const content = await readText(relativePath);

  requireAll(content, relativePath, agents, "canonical agent id");
  requireAll(content, relativePath, [
    "reference/kernel_lab/<agent>_kernel/",
    "reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md",
    "reference/templates/<target>/...",
    "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    "reference/materialization_lab/contracts/TARGETS_CONTRACT.md",
    "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md",
    "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md",
    "primary behavior source",
    "temporary development parity baseline",
  ], "render context source");
  requireAll(content, relativePath, commonPlaceholders, "common placeholder");
  for (const target of targets) {
    requireAll(
      content,
      relativePath,
      target.specificPlaceholders,
      `${target.id} placeholder`,
    );
  }
  requireAll(content, relativePath, [
    "YAML-safe",
    "valid empty string",
    "TOML-safe",
    "TOML-aware renderer",
  ], "render safety mode");
  requireAll(content, relativePath, renderingBlockCodes, "rendering block code");
}

async function validateRenderContexts() {
  const contexts = [];

  for (const agent of agents) {
    for (const target of targets) {
      const context = buildRenderContext(agent, target);
      contexts.push(context);

      for (const field of renderContextFields) {
        if (!(field in context)) {
          recordFailure(`${agent}+${target.id} render context missing field: ${field}`);
        }
      }

      if (deprecatedBaseAgentSourceField in context) {
        recordFailure(
          `${agent}+${target.id} render context contains deprecated field: ${deprecatedBaseAgentSourceField}`,
        );
      }

      const expectedKernelSource = rel("reference/kernel_lab", kernelByAgent.get(agent));
      if (context.kernel_source !== expectedKernelSource) {
        recordFailure(
          `${agent}+${target.id} kernel_source mismatch: expected ${expectedKernelSource}, got ${context.kernel_source}`,
        );
      }

      for (const sourceField of [
        "kernel_source",
        "senior_profile_source",
        "template_source",
        "target_contract_source",
        "template_contract_source",
        "rendering_contract_source",
      ]) {
        await requireFile(context[sourceField]);
      }

      if (context.escaping_mode !== target.escapingMode) {
        recordFailure(
          `${agent}+${target.id} expected ${target.escapingMode} escaping mode, got ${context.escaping_mode}`,
        );
      }

      const template = await readText(context.template_source);
      for (const placeholder of commonPlaceholders) {
        if (!(placeholder in context.required_placeholder_values)) {
          recordFailure(
            `${agent}+${target.id} missing common placeholder value: ${placeholder}`,
          );
        }
        requireIncludes(
          template,
          context.template_source,
          placeholder,
          `${agent}+${target.id} template common placeholder: ${placeholder}`,
        );
      }

      for (const placeholder of target.specificPlaceholders) {
        if (!(placeholder in context.target_specific_placeholder_values)) {
          recordFailure(
            `${agent}+${target.id} missing target-specific placeholder value: ${placeholder}`,
          );
        }
        requireIncludes(
          template,
          context.template_source,
          placeholder,
          `${agent}+${target.id} template target placeholder: ${placeholder}`,
        );
      }

      if (target.id === "copilot") {
        const orchestratorAgentsBlock =
          context.target_specific_placeholder_values[
            "{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}"
          ];
        if (agent === "orchestrator" && !orchestratorAgentsBlock.trim()) {
          recordFailure(
            "orchestrator+copilot requires a non-empty {{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}} value",
          );
        }
        if (agent !== "orchestrator" && orchestratorAgentsBlock !== "") {
          recordFailure(
            `${agent}+copilot must permit {{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}} as an empty valid string`,
          );
        }
      }
    }
  }

  const expectedContextCount = agents.length * targets.length;
  if (contexts.length !== expectedContextCount) {
    recordFailure(
      `render context matrix incomplete: expected ${expectedContextCount}, got ${contexts.length}`,
    );
  }
}

async function validateBlockCodesRecognized() {
  const rendering = await readText(contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"));
  const staticChecks = await readText(validationPath("STATIC_CHECKS.md"));
  const expectations = await readText(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));

  for (const blockCode of renderingBlockCodes) {
    requireIncludes(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), blockCode, "rendering block code");
    requireIncludes(staticChecks, validationPath("STATIC_CHECKS.md"), blockCode, "static check block code");
    requireIncludes(expectations, validationPath("EXCELLENT_PASS_EXPECTATIONS.md"), blockCode, "excellent pass block code");
  }
}

async function validateFixtureBoundaryNonAuthorization() {
  const relativePath = contractPath("FIXTURE_BOUNDARY_CONTRACT.md");
  const content = await readText(relativePath);

  requireAll(content, relativePath, [
    "current phase creates only the",
    "complete positive fixtures",
    "complete negative fixtures",
    "runtime fixtures",
    "target real read/write",
    "write to a real target project",
    "generated final artifacts",
    "persistent reports in this phase",
    "real materialization",
  ], "fixture boundary non-authorization");
}

async function validateRegistrationDocs() {
  const manifest = await readText("reference/MANIFEST.md");
  requireAll(manifest, "reference/MANIFEST.md", [
    expectedScriptPath,
    "render-context planner/checker",
    "read-only",
  ], "render-context checker manifest registration");

  const staticChecks = await readText(validationPath("STATIC_CHECKS.md"));
  requireAll(staticChecks, validationPath("STATIC_CHECKS.md"), [
    expectedScriptPath,
    "render-context planner/checker",
    "read-only",
    "MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS",
  ], "render-context checker static-check registration");

  const expectations = await readText(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));
  requireAll(expectations, validationPath("EXCELLENT_PASS_EXPECTATIONS.md"), [
    expectedScriptPath,
    "render-context planner/checker",
    "read-only",
    "MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS",
  ], "render-context checker expectation registration");
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateRequiredSources();
  await validateCanonicalAgentIds();
  await validateCanonicalTargets();
  await validateTemplatePlaceholders();
  await validateRenderingContractAnchors();
  await validateRenderContexts();
  await validateBlockCodesRecognized();
  await validateFixtureBoundaryNonAuthorization();
  await validateRegistrationDocs();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_RENDER_CONTEXT_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
