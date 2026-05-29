#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const kernelRoot = path.dirname(scriptPath);
const devSkillRoot = path.resolve(kernelRoot, "..", "..");
const realDevSkillRoot = fs.realpathSync.native(devSkillRoot);

const allowFlag = "--allow-experimental-materialization";
const defaultOutputDir = "reference/orchestrator_kernel/generated";
const generatedArtifact = "orchestrator.kernel.agent.md";
const generatedReport = "orchestrator.kernel.report.json";

const sourceFiles = {
  baseOrchestrator: "reference/agents/orchestrator.agent.md",
  kernelContract: "reference/orchestrator_kernel/CONTRACT.md",
  minimumSafeBundle: "reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md",
  moduleIndex: "reference/orchestrator_kernel/MODULE_INDEX.md",
  activationGates: "reference/orchestrator_kernel/ACTIVATION_GATES.md",
  materializationContract: "reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md",
};

const forbiddenOutputs = [
  ".github/agents/orchestrator.agent.md",
  ".codex/agents/orchestrator.toml",
  ".codex/config.toml",
  "AGENTS.md",
  "templates/agents/orchestrator.agent.md",
  "sentinel.mjs",
  "scripts/sentinel-smoke.mjs",
];

const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

function isInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function hasIgnoredPart(relativePath) {
  return relativePath
    .split(/[\\/]+/)
    .filter(Boolean)
    .some((part) => ignoredNames.has(part));
}

function toDevPath(relativePath) {
  if (hasIgnoredPart(relativePath)) {
    throw new Error(`ignored path is not a valid materialization input/output: ${relativePath}`);
  }

  const absolutePath = path.resolve(devSkillRoot, relativePath);
  if (!isInside(absolutePath, devSkillRoot)) {
    throw new Error(`path escapes dev skill: ${relativePath}`);
  }

  return absolutePath;
}

function realPathInsideDev(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realDevSkillRoot)) {
    throw new Error(`path escapes dev skill after realpath: ${absolutePath}`);
  }
  return realPath;
}

function readRequired(relativePath) {
  const absolutePath = toDevPath(relativePath);
  return fs.readFileSync(realPathInsideDev(absolutePath), "utf8");
}

function ensureAllowedOutput(relativePath) {
  if (!relativePath.startsWith(`${defaultOutputDir}/`)) {
    throw new Error(`output must stay under ${defaultOutputDir}: ${relativePath}`);
  }

  if (forbiddenOutputs.includes(relativePath)) {
    throw new Error(`forbidden output requested: ${relativePath}`);
  }

  const absolutePath = toDevPath(relativePath);
  const outputRoot = toDevPath(defaultOutputDir);
  if (!isInside(absolutePath, outputRoot)) {
    throw new Error(`output escapes generated path: ${relativePath}`);
  }

  return absolutePath;
}

function sha256(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

function extractFrontmatter(markdown) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(markdown);
  if (!match) return {};

  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    result[key] = value;
  }
  return result;
}

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^## ${escaped}\\s*$`, "m");
  const match = pattern.exec(markdown);
  if (!match) {
    throw new Error(`required heading missing: ## ${heading}`);
  }

  const start = match.index;
  const rest = markdown.slice(start);
  const next = rest.slice(match[0].length).search(/^##\s+/m);
  return next === -1 ? rest.trim() : rest.slice(0, match[0].length + next).trim();
}

function normalizeExtract(markdown, heading) {
  return section(markdown, heading)
    .replace(/^##\s+/, "### ")
    .trim();
}

function compactBulletCount(markdown) {
  return markdown.split(/\r?\n/).filter((line) => /^-\s+/.test(line.trim())).length;
}

function writeFileAtomic(relativePath, contents) {
  const absolutePath = ensureAllowedOutput(relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  const tempPath = `${absolutePath}.tmp-${process.pid}`;
  fs.writeFileSync(tempPath, contents, "utf8");
  fs.renameSync(tempPath, absolutePath);
}

function materialize() {
  const sources = Object.fromEntries(
    Object.entries(sourceFiles).map(([key, relativePath]) => [key, readRequired(relativePath)]),
  );
  const baseFrontmatter = extractFrontmatter(sources.baseOrchestrator);

  const artifact = [
    "---",
    "name: orchestrator-kernel-experimental",
    "description: Isolated experimental orchestrator-kernel artifact; not installable and not a final Sentinel artifact.",
    `agent_version: ${baseFrontmatter.agent_version || "unknown"}`,
    `base_agent_source: ${sourceFiles.baseOrchestrator}`,
    "generated_by: reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs",
    "experimental: true",
    "installable: false",
    "materialization_scope: orchestrator-only",
    "reading_scope_class: routing-minimal",
    "---",
    "",
    "# Orchestrator Kernel Agent — Experimental Artifact",
    "",
    "This file is generated only inside `skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/generated/`.",
    "It is not a production template, not an installed agent, not a target artifact, and not materialization authority for any other agent.",
    "",
    "## Source Boundary",
    "",
    `- Base source copy: \`${sourceFiles.baseOrchestrator}\`.`,
    `- Kernel contract: \`${sourceFiles.kernelContract}\`.`,
    `- Minimum safe bundle: \`${sourceFiles.minimumSafeBundle}\`.`,
    `- Module index: \`${sourceFiles.moduleIndex}\`.`,
    `- Activation gates: \`${sourceFiles.activationGates}\`.`,
    `- Materialization contract: \`${sourceFiles.materializationContract}\`.`,
    "- Forbidden: production templates, final artifacts, installer changes, smoke changes, all-agent materialization, and external fallback paths.",
    "",
    normalizeExtract(sources.baseOrchestrator, "Mission"),
    "",
    normalizeExtract(sources.kernelContract, "Irremovable responsibilities"),
    "",
    normalizeExtract(sources.kernelContract, "Kernel limits"),
    "",
    normalizeExtract(sources.minimumSafeBundle, "Mandatory Rules"),
    "",
    normalizeExtract(sources.activationGates, "Evaluation Order"),
    "",
    normalizeExtract(sources.activationGates, "Initial Module Mapping"),
    "",
    normalizeExtract(sources.baseOrchestrator, "Status it may emit"),
    "",
    normalizeExtract(sources.baseOrchestrator, "Anti-role-drift rules"),
    "",
    normalizeExtract(sources.baseOrchestrator, "Completion contract"),
    "",
    "## Experimental Output Contract",
    "",
    "- Return only routing-level status, owner, blocker, DEV decision, or material delta.",
    "- Do not perform implementation, validation, review, finalization, durable documentation, or fallback execution.",
    "- Do not activate optional modules unless their gate, dependencies, authority, and scope are satisfied.",
    "- Treat `materialization.experimental`, `checks.static`, and `tests.golden_critical` as non-authority for production writes.",
    "- Safe stop when authority, scope, source, module, gate, or target boundary is missing or ambiguous.",
    "",
  ].join("\n");

  const report = {
    status: "MATERIALIZED_EXPERIMENTAL",
    generated_at: new Date().toISOString(),
    output: `${defaultOutputDir}/${generatedArtifact}`,
    report: `${defaultOutputDir}/${generatedReport}`,
    scope: "orchestrator-only",
    installable: false,
    final_artifact: false,
    source_files: Object.fromEntries(
      Object.entries(sourceFiles).map(([key, relativePath]) => [
        key,
        {
          path: relativePath,
          sha256: sha256(sources[key]),
          bytes: Buffer.byteLength(sources[key], "utf8"),
          bullet_count: compactBulletCount(sources[key]),
        },
      ]),
    ),
    generated: {
      sha256: sha256(artifact),
      bytes: Buffer.byteLength(artifact, "utf8"),
      line_count: artifact.split(/\r?\n/).length,
    },
    comparison: {
      base_bytes: Buffer.byteLength(sources.baseOrchestrator, "utf8"),
      generated_bytes: Buffer.byteLength(artifact, "utf8"),
      generated_to_base_ratio: Number((Buffer.byteLength(artifact, "utf8") / Buffer.byteLength(sources.baseOrchestrator, "utf8")).toFixed(4)),
    },
    forbidden_outputs: forbiddenOutputs,
    allowed_output_root: defaultOutputDir,
  };

  writeFileAtomic(`${defaultOutputDir}/${generatedArtifact}`, artifact);
  writeFileAtomic(`${defaultOutputDir}/${generatedReport}`, `${JSON.stringify(report, null, 2)}\n`);

  return report;
}

function blockWithoutAuthorization() {
  return {
    status: "BLOCKED",
    blocker: "BLOCKED_EXPERIMENTAL_MATERIALIZATION_AUTHORIZATION_MISSING",
    required_flag: allowFlag,
    allowed_output_root: defaultOutputDir,
    scope: "orchestrator-only",
    writes_performed: false,
  };
}

if (!process.argv.includes(allowFlag)) {
  console.log(JSON.stringify(blockWithoutAuthorization(), null, 2));
  process.exit(2);
}

try {
  const report = materialize();
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(JSON.stringify({
    status: "BLOCKED",
    blocker: "BLOCKED_EXPERIMENTAL_MATERIALIZATION_FAILED_CLOSED",
    detail: error instanceof Error ? error.message : String(error),
    writes_performed: "partial writes may exist only under reference/orchestrator_kernel/generated",
  }, null, 2));
  process.exit(1);
}
