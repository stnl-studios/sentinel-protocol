import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
    ROOT,
    SOURCE_DIR,
    SKILL_BUNDLE_MANIFESTS,
    SKILL_INSTALL_MANIFESTS,
    getTargets,
    inspectTarget,
    isIgnoredEntry,
    listSkillFolders,
} from "../sentinel.mjs";

const REQUIRED_BUNDLE_PATHS = [
    ["stnl_project_foundation", "reference/docs", "core/CONTEXT.md"],
    ["stnl_project_foundation", "reference/docs", "decisions/ADR-template.md"],
    ["stnl_project_foundation", "reference/docs", "reference/DESIGN_SYSTEM.md"],
    ["stnl_project_agent_specializer", "reference/agents", "reviewer.agent.md"],
    ["stnl_project_agent_specializer", "reference/agents", "coder-ios.agent.md"],
    ["stnl_project_agent_specializer", "reference/agents", "execution-package-designer.agent.md"],
    ["stnl_project_agent_specializer", "reference/docs", "workflow/EXECUTION-LIFECYCLE.md"],
    ["stnl_project_agent_specializer", "reference/docs", "agents/AGENT-CONTRACT-SHAPE.md"],
    ["stnl_project_agent_specializer", "reference/docs", "agents/AGENT-SPECIALIZATION-QUALITY-GATE.md"],
    ["stnl_project_agent_specializer", "reference/templates", "codex/AGENTS.md"],
    ["stnl_project_context", "reference/docs", "core/TESTING.md"],
];

const OWNED_SOURCE_ROOTS = [
    ["stnl_project_foundation", path.join("reference", "docs"), "core"],
    ["stnl_project_foundation", path.join("reference", "docs"), path.join("units", "_unit-template")],
    ["stnl_project_foundation", path.join("reference", "docs"), path.join("features", "_feature-template")],
    ["stnl_project_foundation", path.join("reference", "docs"), "decisions"],
    ["stnl_project_foundation", path.join("reference", "docs"), "reference"],
    ["stnl_project_agent_specializer", path.join("reference", "agents"), ""],
    ["stnl_project_agent_specializer", path.join("reference", "docs"), "agents"],
    ["stnl_project_agent_specializer", path.join("reference", "docs"), "workflow"],
    ["stnl_project_agent_specializer", path.join("reference", "templates"), "codex"],
    ["stnl_project_context", path.join("reference", "docs"), "core"],
    ["stnl_project_context", path.join("reference", "docs"), path.join("units", "_unit-template")],
    ["stnl_project_context", path.join("reference", "docs"), path.join("features", "_feature-template")],
];

const SMOKE_FIXTURE_REPO_NAME = "sentinel-smoke-fixture";
const SMOKE_MATERIALIZATION_DATE = "20260412";

const CONTROLLED_CONTEXT_DOC_SPECS = [
    {
        sourcePath: "INDEX.md",
        targetPath: path.join("docs", "INDEX.md"),
        requiredSnippets: [
            "# Índice de Documentação",
            "## Objetivo",
            "## Precedência documental",
        ],
    },
    {
        sourcePath: "TBDS.md",
        targetPath: path.join("docs", "TBDS.md"),
        requiredSnippets: [
            "# TBDs",
            "## Objetivo",
            "## Status válidos",
        ],
    },
    {
        sourcePath: path.join("core", "CONTEXT.md"),
        targetPath: path.join("docs", "core", "CONTEXT.md"),
        requiredSnippets: [
            "# Core Context",
            "## Objetivo",
            "## Referências",
        ],
    },
    {
        sourcePath: path.join("core", "CONTRACTS.md"),
        targetPath: path.join("docs", "core", "CONTRACTS.md"),
        requiredSnippets: [
            "# Core Contracts",
            "## Objetivo",
            "## Referências",
        ],
    },
    {
        sourcePath: path.join("core", "RULES.md"),
        targetPath: path.join("docs", "core", "RULES.md"),
        requiredSnippets: [
            "# Core Rules",
            "## Objetivo",
            "## Referências",
        ],
    },
    {
        sourcePath: path.join("core", "STATE.md"),
        targetPath: path.join("docs", "core", "STATE.md"),
        requiredSnippets: [
            "# Core State",
            "## Objetivo",
            "## Referências",
        ],
    },
    {
        sourcePath: path.join("core", "TESTING.md"),
        targetPath: path.join("docs", "core", "TESTING.md"),
        requiredSnippets: [
            "# Core Testing",
            "## Objetivo",
            "## Referências",
        ],
    },
];

const AGENT_REFERENCE_DOC_SPECS = [
    {
        relativePath: path.join("reference", "docs", "agents", "AGENT-CONTRACT-SHAPE.md"),
        requiredSnippets: [
            "# Shape Canonico de Contrato de Agent Base",
            "## Metadata canonica parseavel",
            "## Shape esperado para agent especializado",
        ],
    },
    {
        relativePath: path.join("reference", "docs", "agents", "AGENT-SPECIALIZATION-QUALITY-GATE.md"),
        requiredSnippets: [
            "# Quality Gate Canonico de Especializacao de Agents",
            "## Checks obrigatorios",
            "### 3. Cross-reference / handoff consistency check",
            "execution-package-designer",
            "todo` nao entra por default em `coder-backend`, `coder-frontend`, `coder-ios` ou `validation-runner`",
            "Model-policy compatibility check",
        ],
    },
    {
        relativePath: path.join("reference", "docs", "workflow", "EXECUTION-LIFECYCLE.md"),
        requiredSnippets: [
            "# Execution Lifecycle Canonico",
            "## Ordem do fluxo",
            "## Contrato do pacote de execução",
            "execution-package-designer -> orchestrator -> coder(s)",
            "## Regra de closure",
        ],
    },
    {
        relativePath: path.join("reference", "docs", "workflow", "STATUS-GATES.md"),
        requiredSnippets: [
            "# Status e Gates Canônicos",
            "## Status de decisão e gates",
            "## Status de validação e fechamento",
        ],
    },
];

const CONTROLLED_AGENT_TOOLSETS = {
    "orchestrator.agent.md": ["read", "search", "agent"],
    "planner.agent.md": ["read", "search"],
    "validation-eval-designer.agent.md": ["read", "search"],
    "execution-package-designer.agent.md": ["read", "search"],
    "validation-runner.agent.md": ["read", "search", "execute"],
    "finalizer.agent.md": ["read", "search", "edit", "todo"],
    "reviewer.agent.md": ["read", "search"],
    "coder-backend.agent.md": ["read", "search", "edit", "execute"],
    "coder-frontend.agent.md": ["read", "search", "edit", "execute"],
    "coder-ios.agent.md": ["read", "search", "edit", "execute"],
    "designer.agent.md": ["read", "search"],
};

const REQUIRED_CONTROLLED_AGENT_FILES = [
    "orchestrator.agent.md",
    "planner.agent.md",
    "validation-eval-designer.agent.md",
    "execution-package-designer.agent.md",
    "coder-backend.agent.md",
    "coder-frontend.agent.md",
    "coder-ios.agent.md",
    "validation-runner.agent.md",
    "reviewer.agent.md",
    "finalizer.agent.md",
];

const BACKEND_ONLY_SPECIALIZED_AGENT_FILES = [
    "orchestrator.agent.md",
    "planner.agent.md",
    "validation-eval-designer.agent.md",
    "execution-package-designer.agent.md",
    "coder-backend.agent.md",
    "validation-runner.agent.md",
    "finalizer.agent.md",
];

const REQUIRED_AGENT_BODY_SNIPPETS = [
    "## Mission",
    "## Handoff",
    "## Reading contract",
];

const CODEX_AGENTS_TEMPLATE_RELATIVE_PATH = path.join("reference", "templates", "codex", "AGENTS.md");
const REQUIRED_CODEX_TOML_KEYS = [
    "name",
    "description",
    "developer_instructions",
];

const CONTROLLED_FIXTURE_FILES = {
    "package.json": JSON.stringify({
        name: SMOKE_FIXTURE_REPO_NAME,
        private: true,
        version: "0.0.0",
        type: "module",
    }, null, 2) + "\n",
    [path.join("src", "backend", "health.ts")]: [
        "export function getHealthStatus() {",
        "    return { status: \"ok\", surface: \"backend\" };",
        "}",
        "",
    ].join("\n"),
    [path.join("src", "frontend", "App.tsx")]: [
        "export function App() {",
        "    return <main>sentinel smoke fixture</main>;",
        "}",
        "",
    ].join("\n"),
    [path.join("ios", "App", "App.swift")]: [
        "import SwiftUI",
        "",
        "@main",
        "struct SmokeFixtureApp: App {",
        "    var body: some Scene {",
        "        WindowGroup {",
        "            Text(\"sentinel smoke fixture\")",
        "        }",
        "    }",
        "}",
        "",
    ].join("\n"),
};

function getBundle(skillName, targetRoot) {
    const bundle = (SKILL_BUNDLE_MANIFESTS[skillName] ?? []).find(
        (entry) => entry.targetRoot === targetRoot
    );

    assert(bundle, `Bundle não encontrado: ${skillName}/${targetRoot}`);
    return bundle;
}

function listRelativeFiles(rootDir) {
    if (!fs.existsSync(rootDir)) {
        return [];
    }

    const files = [];

    function walk(currentDir) {
        for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
            if (isIgnoredEntry(entry.name)) {
                continue;
            }

            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walk(fullPath);
                continue;
            }

            files.push(path.relative(rootDir, fullPath));
        }
    }

    walk(rootDir);
    return files.sort();
}

function assertRequiredBundleCoverage() {
    for (const [skillName, targetRoot, relativePath] of REQUIRED_BUNDLE_PATHS) {
        const bundle = getBundle(skillName, targetRoot);
        assert(
            bundle.files.includes(relativePath),
            `Manifest do bundle ${skillName}/${targetRoot} não inclui ${relativePath}`
        );
        assert(
            fs.existsSync(path.join(ROOT, bundle.sourceRoot, relativePath)),
            `Artifact canônico ausente na source of truth: ${bundle.sourceRoot}/${relativePath}`
        );
    }
}

function assertOwnedRootsAreFullyBundled() {
    for (const [skillName, targetRoot, ownedSubdir] of OWNED_SOURCE_ROOTS) {
        const bundle = getBundle(skillName, targetRoot);
        const ownedRoot = path.join(ROOT, bundle.sourceRoot, ownedSubdir);
        const prefix = ownedSubdir ? `${ownedSubdir}${path.sep}` : "";
        const expectedFiles = listRelativeFiles(ownedRoot).map((relativePath) => `${prefix}${relativePath}`);
        const missingFiles = expectedFiles.filter((relativePath) => !bundle.files.includes(relativePath));

        assert.equal(
            missingFiles.length,
            0,
            `Bundle ${skillName}/${targetRoot} deixou artifacts canônicos de fora: ${missingFiles.join(", ")}`
        );
    }
}

function assertExplicitRootEntries() {
    const projectDocSkills = ["stnl_project_foundation", "stnl_project_context"];

    for (const skillName of projectDocSkills) {
        const projectDocsBundle = getBundle(skillName, path.join("reference", "docs"));

        for (const relativePath of ["INDEX.md", "TBDS.md"]) {
            assert(
                projectDocsBundle.files.includes(relativePath),
                `Manifest do ${skillName} não inclui ${relativePath}`
            );
        }
    }
}

function assertInstallManifests() {
    for (const skillName of ["stnl_project_foundation", "stnl_project_context", "stnl_project_agent_specializer", "stnl_spec_manager"]) {
        const installManifest = SKILL_INSTALL_MANIFESTS[skillName];
        assert(installManifest, `Install manifest ausente para ${skillName}`);
        assert.deepEqual(
            installManifest,
            ["SKILL.md", "openai.yaml"],
            `Install manifest inesperado para ${skillName}`
        );
    }
}

function runSentinel(command, env) {
    const result = spawnSync(process.execPath, [path.join(ROOT, "sentinel.mjs"), command], {
        cwd: ROOT,
        env,
        encoding: "utf8",
    });

    assert.equal(
        result.status,
        0,
        [
            `Comando falhou: node sentinel.mjs ${command}`,
            result.stdout.trim(),
            result.stderr.trim(),
        ].filter(Boolean).join("\n")
    );

    return result;
}

function assertInstalledArtifactsMatchSources(targetHome) {
    const skills = listSkillFolders(SOURCE_DIR);
    const targets = getTargets(targetHome);

    for (const target of targets) {
        const report = inspectTarget(target, skills);
        assert(report.exists, `Target não foi criado: ${target}`);

        for (const skillReport of report.skills) {
            assert(skillReport.exists, `Skill não foi instalada em ${target}: ${skillReport.name}`);
            assert(
                skillReport.installPrepared,
                `Package incompleto em ${target}/${skillReport.name}: ${skillReport.missingInstallFiles.join(", ")}`
            );

            for (const bundleReport of skillReport.bundleReports) {
                assert(
                    bundleReport.prepared,
                    `Bundle incompleto em ${target}/${skillReport.name}/${bundleReport.targetRoot}: ${bundleReport.missingFiles.join(", ")}`
                );
            }
        }

        for (const [skillName, manifestEntries] of Object.entries(SKILL_INSTALL_MANIFESTS)) {
            for (const relativePath of manifestEntries) {
                const sourcePath = path.join(SOURCE_DIR, skillName, relativePath);
                const installedPath = path.join(target, skillName, relativePath);
                assert.equal(
                    fs.readFileSync(installedPath, "utf8"),
                    fs.readFileSync(sourcePath, "utf8"),
                    `Artifact instalado divergiu da source of truth: ${skillName}/${relativePath}`
                );
            }
        }

        for (const [skillName, bundles] of Object.entries(SKILL_BUNDLE_MANIFESTS)) {
            for (const bundle of bundles) {
                for (const relativePath of bundle.files) {
                    const sourcePath = path.join(ROOT, bundle.sourceRoot, relativePath);
                    const installedPath = path.join(target, skillName, bundle.targetRoot, relativePath);
                    assert.equal(
                        fs.readFileSync(installedPath, "utf8"),
                        fs.readFileSync(sourcePath, "utf8"),
                        `Bundle materializado divergiu da source of truth: ${skillName}/${bundle.targetRoot}/${relativePath}`
                    );
                }
            }
        }
    }
}

function assertDoctorOutput(output) {
    for (const skillName of listSkillFolders(SOURCE_DIR)) {
        assert(
            output.includes(`skill: ${skillName} OK`),
            `Doctor não reportou a skill esperada: ${skillName}`
        );
    }

    for (const requiredLine of [
        "Target:",
        "bundle: stnl_project_foundation/reference/docs OK",
        "bundle: stnl_project_agent_specializer/reference/agents OK",
        "bundle: stnl_project_agent_specializer/reference/docs OK",
        "bundle: stnl_project_agent_specializer/reference/templates OK",
        "bundle: stnl_project_context/reference/docs OK",
    ]) {
        assert(
            output.includes(requiredLine),
            `Doctor não reportou a linha esperada: ${requiredLine}`
        );
    }
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(targetPath, content) {
    ensureDir(path.dirname(targetPath));
    fs.writeFileSync(targetPath, content);
}

function findInstalledSkillRoot(targetHome, skillName) {
    const installedSkillRoot = getTargets(targetHome)
        .map((target) => path.join(target, skillName))
        .find((candidate) => fs.existsSync(candidate));

    assert(installedSkillRoot, `Skill instalada não encontrada em HOME temporário: ${skillName}`);
    return installedSkillRoot;
}

function getControlledAgentFiles(installedSkillRoot) {
    const controlledAgents = [...REQUIRED_CONTROLLED_AGENT_FILES];
    const optionalDesignerPath = path.join(installedSkillRoot, "reference", "agents", "designer.agent.md");

    if (fs.existsSync(optionalDesignerPath)) {
        controlledAgents.push("designer.agent.md");
    }

    return controlledAgents;
}

function splitFrontmatter(content, label) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    assert(match, `Frontmatter YAML ausente ou inválido em ${label}`);
    return { frontmatter: match[1], body: match[2] };
}

function normalizeYamlScalar(value) {
    const trimmed = value.trim();

    if (
        (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }

    if (trimmed === "true") {
        return true;
    }

    if (trimmed === "false") {
        return false;
    }

    if (/^-?\d+$/.test(trimmed)) {
        return Number(trimmed);
    }

    return trimmed;
}

function parseFrontmatter(content, label) {
    const { frontmatter, body } = splitFrontmatter(content, label);
    const parsed = {};
    let currentArrayKey = null;

    for (const line of frontmatter.split("\n")) {
        if (!line.trim()) {
            continue;
        }

        const arrayItemMatch = line.match(/^\s*-\s*(.+)$/);
        if (arrayItemMatch) {
            assert(currentArrayKey, `Item de lista sem chave anterior em ${label}`);
            parsed[currentArrayKey].push(normalizeYamlScalar(arrayItemMatch[1]));
            continue;
        }

        const keyValueMatch = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
        assert(keyValueMatch, `Linha de frontmatter não parseável em ${label}: ${line}`);

        const [, key, rawValue = ""] = keyValueMatch;
        if (rawValue === "") {
            parsed[key] = [];
            currentArrayKey = key;
            continue;
        }

        parsed[key] = normalizeYamlScalar(rawValue);
        currentArrayKey = null;
    }

    return { data: parsed, body };
}

function formatYamlScalar(value) {
    if (typeof value === "boolean" || typeof value === "number") {
        return String(value);
    }

    return JSON.stringify(String(value));
}

function renderFrontmatter(data) {
    const lines = ["---"];

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            lines.push(`${key}:`);
            for (const item of value) {
                lines.push(`  - ${formatYamlScalar(item)}`);
            }
            continue;
        }

        lines.push(`${key}: ${formatYamlScalar(value)}`);
    }

    lines.push("---", "");
    return lines.join("\n");
}

function parseTomlScalar(rawValue, label) {
    const value = rawValue.trim();

    if (value.startsWith("\"")) {
        return JSON.parse(value);
    }

    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    if (/^-?\d+$/.test(value)) {
        return Number(value);
    }

    assert.fail(`Valor TOML não parseável em ${label}: ${rawValue}`);
}

function parseToml(content, label) {
    const parsed = {};
    const lines = content.split(/\r?\n/);

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
            continue;
        }

        assert(!trimmed.startsWith("["), `Seção TOML inesperada em ${label}: ${line}`);

        const keyValueMatch = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*=\s*(.*)$/);
        assert(keyValueMatch, `Linha TOML não parseável em ${label}: ${line}`);

        const [, key, rawValue] = keyValueMatch;
        assert(!Object.hasOwn(parsed, key), `Chave TOML duplicada em ${label}: ${key}`);

        if (rawValue.trim() === "'''") {
            const block = [];
            index += 1;

            for (; index < lines.length; index += 1) {
                if (lines[index] === "'''") {
                    break;
                }

                block.push(lines[index]);
            }

            assert(index < lines.length, `String literal TOML sem fechamento em ${label}: ${key}`);
            parsed[key] = block.join("\n");
            continue;
        }

        parsed[key] = parseTomlScalar(rawValue, label);
    }

    return parsed;
}

function renderTomlScalar(value) {
    return JSON.stringify(String(value));
}

function renderCodexAgentToml(data, label) {
    assert(!data.developer_instructions.includes("'''"), `developer_instructions incompatível com literal TOML: ${label}`);

    return [
        `name = ${renderTomlScalar(data.name)}`,
        `description = ${renderTomlScalar(data.description)}`,
        "developer_instructions = '''",
        data.developer_instructions.trim(),
        "'''",
        "",
    ].join("\n");
}

function assertFileHasRequiredShape(filePath, requiredSnippets) {
    assert(fs.existsSync(filePath), `Artifact esperado não existe: ${filePath}`);

    const content = fs.readFileSync(filePath, "utf8");
    assert(content.trim().length > 0, `Artifact foi materializado vazio: ${filePath}`);

    for (const snippet of requiredSnippets) {
        assert(
            content.includes(snippet),
            `Artifact ${filePath} não contém o marcador esperado: ${snippet}`
        );
    }

    return content;
}

function assertContentIncludesAll(content, snippets, label) {
    for (const snippet of snippets) {
        assert(
            content.includes(snippet),
            `${label} não contém o invariante esperado: ${snippet}`
        );
    }
}

function createControlledFixtureRepo(repoRoot) {
    ensureDir(repoRoot);

    for (const [relativePath, content] of Object.entries(CONTROLLED_FIXTURE_FILES)) {
        writeFile(path.join(repoRoot, relativePath), content);
    }
}

function materializeControlledContextDocs(skillRoot, repoRoot) {
    for (const spec of CONTROLLED_CONTEXT_DOC_SPECS) {
        const sourcePath = path.join(skillRoot, "reference", "docs", spec.sourcePath);
        const content = fs.readFileSync(sourcePath, "utf8")
            .replaceAll("<project-name>", SMOKE_FIXTURE_REPO_NAME)
            .replaceAll("YYYYMMDD", SMOKE_MATERIALIZATION_DATE)
            .replace("REPO SHAPE: single-unit | multi-unit | TBD", "REPO SHAPE: single-unit");

        writeFile(path.join(repoRoot, spec.targetPath), content);
    }
}

function buildSpecializedFrontmatter(baseFrontmatter, fileName, controlledAgentFiles) {
    const agentName = fileName.replace(/\.agent\.md$/, "");
    const frontmatter = {
        name: agentName,
        description: baseFrontmatter.description,
        target: "vscode",
        tools: CONTROLLED_AGENT_TOOLSETS[fileName],
        base_agent_version: String(baseFrontmatter.agent_version),
        specialization_revision: 1,
        managed_artifact: true,
    };

    if (baseFrontmatter.reading_scope_class) {
        frontmatter.reading_scope_class = baseFrontmatter.reading_scope_class;
    }

    if (fileName === "orchestrator.agent.md") {
        frontmatter.agents = controlledAgentFiles
            .filter((entry) => entry !== "orchestrator.agent.md")
            .map((entry) => entry.replace(/\.agent\.md$/, ""));
    }

    return frontmatter;
}

function getCodexAgentsTemplatePath(agentSkillRoot) {
    const installedTemplatePath = path.join(agentSkillRoot, CODEX_AGENTS_TEMPLATE_RELATIVE_PATH);

    assert(
        fs.existsSync(installedTemplatePath),
        `Template AGENTS.md do target codex não instalado no bundle da skill: ${installedTemplatePath}`
    );

    return installedTemplatePath;
}

function materializeControlledAgents(skillRoot, repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const { data: baseFrontmatter, body } = parseFrontmatter(sourceContent, sourcePath);
        const specializedFrontmatter = buildSpecializedFrontmatter(
            baseFrontmatter,
            fileName,
            controlledAgentFiles
        );

        writeFile(
            path.join(repoRoot, ".github", "agents", fileName),
            renderFrontmatter(specializedFrontmatter) + body
        );
    }
}

function renderBackendOnlySpecializedBody(body, fileName) {
    const localSpecialization = [
        "## Project specialization",
        "- Fixture specialization: backend-only Node.js/TypeScript service.",
        "- Canonical implementation surface: `src/backend/**`.",
        "- Canonical lightweight proof: focused backend checks or explicit harness limitation from `docs/core/TESTING.md`.",
        "- Frontend, iOS and design agents are intentionally not materialized for this fixture.",
        "",
    ].join("\n");

    assert(body.includes("## Mission"), `Base agent sem ## Mission para especialização realista: ${fileName}`);
    return body.replace("## Mission", `${localSpecialization}## Mission`);
}

function materializeBackendOnlySpecializedAgents(skillRoot, repoRoot) {
    for (const fileName of BACKEND_ONLY_SPECIALIZED_AGENT_FILES) {
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const { data: baseFrontmatter, body } = parseFrontmatter(sourceContent, sourcePath);
        const specializedFrontmatter = buildSpecializedFrontmatter(
            baseFrontmatter,
            fileName,
            BACKEND_ONLY_SPECIALIZED_AGENT_FILES
        );

        specializedFrontmatter.specialization_revision = 2;

        writeFile(
            path.join(repoRoot, ".github", "agents", fileName),
            renderFrontmatter(specializedFrontmatter) + renderBackendOnlySpecializedBody(body, fileName)
        );
    }
}

function materializeCompactedWeakBackendOnlyAgents(skillRoot, repoRoot) {
    for (const fileName of BACKEND_ONLY_SPECIALIZED_AGENT_FILES) {
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const { data: baseFrontmatter } = parseFrontmatter(sourceContent, sourcePath);
        const specializedFrontmatter = buildSpecializedFrontmatter(
            baseFrontmatter,
            fileName,
            BACKEND_ONLY_SPECIALIZED_AGENT_FILES
        );

        specializedFrontmatter.specialization_revision = 2;

        writeFile(
            path.join(repoRoot, ".github", "agents", fileName),
            renderFrontmatter(specializedFrontmatter) + [
                "## Mission",
                "Backend-only specialized agent with compact operational guidance.",
                "",
                "## Reading contract",
                "Read local backend docs and paths as needed.",
                "",
                "## Handoff",
                "Return a concise final status for downstream agents.",
                "",
            ].join("\n")
        );
    }
}

function buildCodexAgentList(agentNames) {
    return agentNames
        .map((agentName) => `- \`${agentName}\` -> \`.codex/agents/${agentName}.toml\``)
        .join("\n");
}

function renderCodexAgentsIndex(template, agentNames) {
    return template
        .replaceAll("{{PROJECT_NAME}}", SMOKE_FIXTURE_REPO_NAME)
        .replace("{{AGENT_LIST}}", buildCodexAgentList(agentNames))
        .replace("{{LOCAL_NOTES}}", "- Smoke fixture for controlled Codex materialization.");
}

function materializeControlledCodexAgents(skillRoot, repoRoot, controlledAgentFiles) {
    const agentNames = controlledAgentFiles.map((fileName) => fileName.replace(/\.agent\.md$/, ""));

    for (const fileName of controlledAgentFiles) {
        const agentName = fileName.replace(/\.agent\.md$/, "");
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const { data: baseFrontmatter, body } = parseFrontmatter(sourceContent, sourcePath);
        const tomlContent = renderCodexAgentToml({
            name: agentName,
            description: baseFrontmatter.description,
            developer_instructions: body,
        }, sourcePath);

        writeFile(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), tomlContent);
    }

    const templatePath = getCodexAgentsTemplatePath(skillRoot);
    const template = fs.readFileSync(templatePath, "utf8");
    writeFile(path.join(repoRoot, "AGENTS.md"), renderCodexAgentsIndex(template, agentNames));
}

function assertControlledContextMaterialization(repoRoot) {
    for (const spec of CONTROLLED_CONTEXT_DOC_SPECS) {
        const filePath = path.join(repoRoot, spec.targetPath);
        const content = assertFileHasRequiredShape(filePath, spec.requiredSnippets);

        if (filePath.endsWith(path.join("core", "CONTEXT.md"))) {
            assert(
                content.includes(`PROJECT: ${SMOKE_FIXTURE_REPO_NAME}`),
                `Core context não recebeu o nome da fixture: ${filePath}`
            );
            assert(
                content.includes("REPO SHAPE: single-unit"),
                `Core context não registrou repo shape controlado: ${filePath}`
            );
        }

        if (/CONTEXT\.md$|CONTRACTS\.md$|RULES\.md$|STATE\.md$|TESTING\.md$/.test(filePath)) {
            assert(
                content.includes(`LAST UPDATED: ${SMOKE_MATERIALIZATION_DATE}`),
                `Doc materializado sem data controlada: ${filePath}`
            );
        }
    }
}

function assertControlledReferenceDocs(skillRoot) {
    for (const spec of AGENT_REFERENCE_DOC_SPECS) {
        assertFileHasRequiredShape(path.join(skillRoot, spec.relativePath), spec.requiredSnippets);
    }
}

function assertControlledAgentMaterialization(skillRoot, repoRoot, controlledAgentFiles) {
    const materializedAgentNames = controlledAgentFiles.map((entry) => entry.replace(/\.agent\.md$/, ""));

    for (const fileName of controlledAgentFiles) {
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const materializedPath = path.join(repoRoot, ".github", "agents", fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const materializedContent = assertFileHasRequiredShape(materializedPath, REQUIRED_AGENT_BODY_SNIPPETS);
        const { data: sourceFrontmatter } = parseFrontmatter(sourceContent, sourcePath);
        const { data: materializedFrontmatter } = parseFrontmatter(materializedContent, materializedPath);

        assert(materializedFrontmatter.name, `Agent especializado sem name: ${materializedPath}`);
        assert(materializedFrontmatter.description, `Agent especializado sem description: ${materializedPath}`);
        assert.equal(
            materializedFrontmatter.target,
            "vscode",
            `Agent especializado sem target canônico: ${materializedPath}`
        );
        assert.deepEqual(
            materializedFrontmatter.tools,
            CONTROLLED_AGENT_TOOLSETS[fileName],
            `Tools inesperadas no specialized controlado: ${materializedPath}`
        );
        assert.equal(
            materializedFrontmatter.base_agent_version,
            String(sourceFrontmatter.agent_version),
            `base_agent_version divergente do base agent: ${materializedPath}`
        );
        assert.equal(
            materializedFrontmatter.specialization_revision,
            1,
            `specialization_revision inválida: ${materializedPath}`
        );
        assert.equal(
            materializedFrontmatter.managed_artifact,
            true,
            `managed_artifact ausente no specialized: ${materializedPath}`
        );
        assert.equal(
            materializedFrontmatter.reading_scope_class,
            sourceFrontmatter.reading_scope_class,
            `reading_scope_class divergente do contrato base: ${materializedPath}`
        );
        assert(
            !("agent_version" in materializedFrontmatter),
            `Campo legado agent_version vazou para o specialized: ${materializedPath}`
        );
        assert(
            !materializedContent.includes("\n## Tools\n"),
            `## Tools residual não deveria existir no specialized controlado: ${materializedPath}`
        );

        const expectedAllowedKeys = new Set([
            "name",
            "description",
            "target",
            "tools",
            "base_agent_version",
            "specialization_revision",
            "managed_artifact",
            "reading_scope_class",
        ]);

        if (fileName === "orchestrator.agent.md") {
            expectedAllowedKeys.add("agents");
            assert.deepEqual(
                materializedFrontmatter.agents,
                materializedAgentNames.filter((name) => name !== "orchestrator"),
                `orchestrator.agents não bate com o conjunto materializado: ${materializedPath}`
            );
        } else {
            assert(
                !("agents" in materializedFrontmatter),
                `Campo agents só pode existir no orchestrator: ${materializedPath}`
            );
        }

        const unexpectedKeys = Object.keys(materializedFrontmatter).filter((key) => !expectedAllowedKeys.has(key));
        assert.equal(
            unexpectedKeys.length,
            0,
            `Frontmatter especializado contém campos não canônicos: ${materializedPath} -> ${unexpectedKeys.join(", ")}`
        );
    }
}

function assertExecutionPackageFlowCoherence(skillRoot, repoRoot, controlledAgentFiles) {
    assert(
        controlledAgentFiles.includes("execution-package-designer.agent.md"),
        "Conjunto controlado não inclui execution-package-designer.agent.md"
    );

    const packageDesignerPath = path.join(skillRoot, "reference", "agents", "execution-package-designer.agent.md");
    const packageDesignerContent = assertFileHasRequiredShape(packageDesignerPath, [
        "# Execution Package Designer Agent",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "OWNED_PATHS",
        "BLOCK_IF",
        "does not coordinate",
    ]);

    assert(
        packageDesignerContent.includes("role class: `execution-package-design`"),
        "execution-package-designer não declara role class canônica"
    );

    const orchestratorPath = path.join(repoRoot, ".github", "agents", "orchestrator.agent.md");
    const orchestratorContent = fs.readFileSync(orchestratorPath, "utf8");
    const { data: orchestratorFrontmatter } = parseFrontmatter(orchestratorContent, orchestratorPath);

    for (const requiredAgent of [
        "planner",
        "validation-eval-designer",
        "execution-package-designer",
        "coder-backend",
        "coder-frontend",
        "coder-ios",
        "validation-runner",
        "reviewer",
        "finalizer",
    ]) {
        assert(
            orchestratorFrontmatter.agents.includes(requiredAgent),
            `orchestrator.agents não contém ${requiredAgent}`
        );
    }

    const packageIndex = orchestratorFrontmatter.agents.indexOf("execution-package-designer");
    const firstCoderIndex = Math.min(
        orchestratorFrontmatter.agents.indexOf("coder-backend"),
        orchestratorFrontmatter.agents.indexOf("coder-frontend"),
        orchestratorFrontmatter.agents.indexOf("coder-ios")
    );
    const runnerIndex = orchestratorFrontmatter.agents.indexOf("validation-runner");

    assert(packageIndex >= 0, "execution-package-designer ausente do orchestrator.agents");
    assert(
        packageIndex < firstCoderIndex,
        "execution-package-designer deve aparecer antes dos coders no conjunto controlado"
    );
    assert(
        firstCoderIndex < runnerIndex,
        "coders devem aparecer antes do validation-runner no conjunto controlado"
    );

    const agentContents = new Map(
        controlledAgentFiles.map((fileName) => [
            fileName,
            fs.readFileSync(path.join(skillRoot, "reference", "agents", fileName), "utf8"),
        ])
    );

    assert(
        agentContents.get("orchestrator.agent.md").includes("execution-package-designer.agent.md"),
        "orchestrator base não referencia o novo handoff canônico"
    );
    assert(
        agentContents.get("validation-eval-designer.agent.md").includes("execution-package-designer.agent.md"),
        "validation-eval-designer não encaminha READY para package design"
    );

    for (const coderFile of ["coder-backend.agent.md", "coder-frontend.agent.md", "coder-ios.agent.md"]) {
        const content = agentContents.get(coderFile);
        assert(content.includes("EXECUTION PACKAGE"), `${coderFile} não consome EXECUTION PACKAGE`);
        assert(content.includes("WORK_PACKAGE_ID"), `${coderFile} não exige WORK_PACKAGE_ID`);
        assert(content.includes("do not redefine the cut"), `${coderFile} não bloqueia redefinição do cut`);
        assert(content.includes("do not rewrite, recompile, or reinterpret the `EXECUTION PACKAGE`"), `${coderFile} não bloqueia recompilação do pacote`);
        assert(
            !CONTROLLED_AGENT_TOOLSETS[coderFile].includes("todo"),
            `${coderFile} não deve receber todo por default`
        );
    }

    assert(
        !CONTROLLED_AGENT_TOOLSETS["validation-runner.agent.md"].includes("todo"),
        "validation-runner não deve receber todo por default"
    );
    assert(
        !CONTROLLED_AGENT_TOOLSETS["designer.agent.md"].includes("todo"),
        "designer não deve receber todo por default"
    );

    const skillContent = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
    assert(
        skillContent.includes([
            "agents:",
            "  - planner",
            "  - validation-eval-designer",
            "  - execution-package-designer",
            "  - coder-backend",
            "  - validation-runner",
        ].join("\n")),
        "Exemplo vscode da skill não preserva a ordem canônica planner -> validation-eval-designer -> execution-package-designer -> coder -> validation-runner"
    );
}

function assertProtocolHardeningInReferenceAgents(skillRoot) {
    const agentContents = new Map(
        REQUIRED_CONTROLLED_AGENT_FILES.map((fileName) => [
            fileName,
            fs.readFileSync(path.join(skillRoot, "reference", "agents", fileName), "utf8"),
        ])
    );

    for (const coderFile of ["coder-backend.agent.md", "coder-frontend.agent.md", "coder-ios.agent.md"]) {
        assertContentIncludesAll(agentContents.get(coderFile), [
            "No other terminal handoff is valid.",
            "`Terminal handoff contract`",
            "`Partial-edit blocking`",
            "A handoff without an explicit terminal status is invalid.",
            "`Invalid terminal forms`",
            "partial edits without safe completion",
            "never uses progress, logs, partial diff narration, or implicit terminal state as final handoff",
        ], `${coderFile} terminal contract`);
    }

    assertContentIncludesAll(agentContents.get("orchestrator.agent.md"), [
        "EXECUTOR_HANDOFF_INVALID",
        "absent handoff",
        "implicit terminal state",
        "intermediate progress update",
        "valid executor `READY`",
        "do not treat a missing, implicit, ambiguous, intermediate, narrative, or evidence-free executor handoff as operational success",
    ], "orchestrator consumer-side rejection");

    assertContentIncludesAll(agentContents.get("validation-runner.agent.md"), [
        "valid executor `READY` handoff",
        "`Entry evidence gate`",
        "not a validation target",
        "Preserve that the runner could not honestly enter because the executor handoff was invalid",
    ], "validation-runner artifact gate");

    assertContentIncludesAll(agentContents.get("finalizer.agent.md"), [
        "closure ledger",
        "`DONE: yes/no`",
        "`DONE: yes` or `DONE: no`",
        "`resync: yes/no`",
        "`resync: yes` or `resync: no`",
        "does not mean the runner verdict was `PASS`",
        "`Invalid closure forms`",
    ], "finalizer explicit closure");
}

function assertProtocolHardeningInCanonicalRefs(skillRoot) {
    const skillContent = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
    assertContentIncludesAll(skillContent, [
        "nenhum `target` (`vscode` ou `codex`) pode relaxar executor `READY/BLOCKED`",
        "Blocos protocol-fixed non-compressible",
        "não podem ser resumidos, removidos, enfraquecidos, reescritos do zero prático",
        "executor terminal handoff contract",
        "executor partial-edit blocking",
        "executor invalid terminal forms",
        "orchestrator consumer-side rejection",
        "validation-runner entry evidence gate",
        "finalizer closure ledger",
        "separação explícita entre status terminal do finalizer (`READY`/`BLOCKED`) e verdict do runner (`PASS`/`PARTIAL`/`FAIL`/`BLOCKED`)",
        "a skill deve bloquear a materialização antes de escrever",
        "Validar só frontmatter, shape, `model`, tools, ausência de TODO ou referências a agents ausentes não basta",
        "terminal handoff de executor nunca pode ser implícito",
        "EXECUTOR_HANDOFF_INVALID",
        "finalizer` só pode fechar `READY` com closure ledger explícito",
        "`DONE` yes/no com racional",
        "resync yes/no com racional",
    ], "stnl_project_agent_specializer anti-drift");

    const qualityGateContent = fs.readFileSync(
        path.join(skillRoot, "reference", "docs", "agents", "AGENT-SPECIALIZATION-QUALITY-GATE.md"),
        "utf8"
    );
    assertContentIncludesAll(qualityGateContent, [
        "EXECUTOR_HANDOFF_INVALID",
        "terminal handoff explícito com exatamente `READY` ou `BLOCKED`",
        "protocol-fixed blocks sao non-compressible",
        "executor terminal handoff contract, partial-edit blocking, invalid terminal forms",
        "artifact final materializado sem bloco protocol-fixed aplicavel ao papel",
        "executor podendo terminar sem status terminal claro `READY` ou `BLOCKED`",
        "validation-runner` só entra com artifact validável de executor `READY` válido",
        "finalizer` não confunde status próprio (`READY`/`BLOCKED`) com verdict do runner",
        "finalizer READY` sem `DONE` yes/no explícito ou sem resync yes/no explícito",
    ], "agent specialization quality gate hardening");

    const lifecycleContent = fs.readFileSync(
        path.join(skillRoot, "reference", "docs", "workflow", "EXECUTION-LIFECYCLE.md"),
        "utf8"
    );
    assertContentIncludesAll(lifecycleContent, [
        "EXECUTOR_HANDOFF_INVALID",
        "não entra no `validation-runner`",
        "somente quando houver executor `READY` válido",
        "`finalizer` emite apenas `READY` ou `BLOCKED`",
        "`finalizer READY` exige closure ledger explícito",
    ], "execution lifecycle hardening");
}

function assertProtocolHardeningInMaterializedAgents(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const content = fs.readFileSync(path.join(repoRoot, ".github", "agents", fileName), "utf8");

        if (["coder-backend.agent.md", "coder-frontend.agent.md", "coder-ios.agent.md"].includes(fileName)) {
            assertContentIncludesAll(content, [
                "No other terminal handoff is valid.",
                "`Terminal handoff contract`",
                "`Partial-edit blocking`",
                "`Invalid terminal forms`",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "orchestrator.agent.md") {
            assertContentIncludesAll(content, [
                "EXECUTOR_HANDOFF_INVALID",
                "valid executor `READY`",
                "do not treat a missing, implicit, ambiguous, intermediate, narrative, or evidence-free executor handoff as operational success",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "validation-runner.agent.md") {
            assertContentIncludesAll(content, [
                "valid executor `READY` handoff",
                "`Entry evidence gate`",
                "not a validation target",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "finalizer.agent.md") {
            assertContentIncludesAll(content, [
                "closure ledger",
                "`DONE: yes/no`",
                "`DONE: yes` or `DONE: no`",
                "`resync: yes/no`",
                "`resync: yes` or `resync: no`",
                "`Invalid closure forms`",
            ], `${fileName} vscode hardening`);
        }
    }
}

function assertProtocolHardeningInCodexAgents(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const agentName = fileName.replace(/\.agent\.md$/, "");
        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);
        const instructions = parsed.developer_instructions;

        if (["coder-backend", "coder-frontend", "coder-ios"].includes(agentName)) {
            assertContentIncludesAll(instructions, [
                "No other terminal handoff is valid.",
                "`Terminal handoff contract`",
                "`Partial-edit blocking`",
                "`Invalid terminal forms`",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "orchestrator") {
            assertContentIncludesAll(instructions, [
                "EXECUTOR_HANDOFF_INVALID",
                "valid executor `READY`",
                "do not treat a missing, implicit, ambiguous, intermediate, narrative, or evidence-free executor handoff as operational success",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "validation-runner") {
            assertContentIncludesAll(instructions, [
                "valid executor `READY` handoff",
                "`Entry evidence gate`",
                "not a validation target",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "finalizer") {
            assertContentIncludesAll(instructions, [
                "closure ledger",
                "`DONE: yes/no`",
                "`DONE: yes` or `DONE: no`",
                "`resync: yes/no`",
                "`resync: yes` or `resync: no`",
                "`Invalid closure forms`",
            ], `${agentName} codex hardening`);
        }
    }
}

function assertBackendOnlySpecializedMaterialization(repoRoot) {
    const agentsRoot = path.join(repoRoot, ".github", "agents");
    const materializedFiles = listRelativeFiles(agentsRoot)
        .filter((entry) => entry.endsWith(".agent.md"))
        .sort();

    assert.deepEqual(
        materializedFiles,
        [...BACKEND_ONLY_SPECIALIZED_AGENT_FILES].sort(),
        `Especialização backend-only materializou conjunto inesperado: ${agentsRoot}`
    );

    for (const fileName of BACKEND_ONLY_SPECIALIZED_AGENT_FILES) {
        const materializedPath = path.join(agentsRoot, fileName);
        const content = assertFileHasRequiredShape(materializedPath, [
            "## Project specialization",
            "backend-only Node.js/TypeScript service",
            "## Mission",
            "## Reading contract",
            "## Handoff",
        ]);
        const { data: materializedFrontmatter } = parseFrontmatter(content, materializedPath);

        assert.equal(
            materializedFrontmatter.specialization_revision,
            2,
            `Especialização backend-only deve simular revision 2: ${materializedPath}`
        );
    }

    assertProtocolHardeningInMaterializedAgents(repoRoot, BACKEND_ONLY_SPECIALIZED_AGENT_FILES);
}

function assertProtocolHardeningRejectsCompactedBackendOnlyMaterialization(skillRoot) {
    const weakRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-weak-backend-"));

    try {
        createControlledFixtureRepo(weakRepoRoot);
        materializeCompactedWeakBackendOnlyAgents(skillRoot, weakRepoRoot);

        assert.throws(
            () => assertProtocolHardeningInMaterializedAgents(weakRepoRoot, BACKEND_ONLY_SPECIALIZED_AGENT_FILES),
            /não contém o invariante esperado/,
            "Validação protocol-fixed deveria rejeitar materialização compactada sem hardenings"
        );
    } finally {
        fs.rmSync(weakRepoRoot, { recursive: true, force: true });
    }
}

function assertControlledCodexAgentMaterialization(repoRoot, controlledAgentFiles) {
    const codexAgentsRoot = path.join(repoRoot, ".codex", "agents");
    const expectedAgentNames = controlledAgentFiles
        .map((entry) => entry.replace(/\.agent\.md$/, ""))
        .sort();
    const materializedTomls = listRelativeFiles(codexAgentsRoot).filter((entry) => entry.endsWith(".toml"));
    const materializedAgentNames = materializedTomls
        .map((entry) => entry.replace(/\.toml$/, ""))
        .sort();

    assert.deepEqual(
        materializedAgentNames,
        expectedAgentNames,
        `Conjunto codex materializado diverge do conjunto controlado: ${codexAgentsRoot}`
    );

    for (const relativePath of materializedTomls) {
        const materializedPath = path.join(codexAgentsRoot, relativePath);
        const content = assertFileHasRequiredShape(materializedPath, []);
        const parsed = parseToml(content, materializedPath);

        assert.deepEqual(
            Object.keys(parsed).sort(),
            [...REQUIRED_CODEX_TOML_KEYS].sort(),
            `Agent codex controlado deve manter somente o shape mínimo obrigatório: ${materializedPath}`
        );

        for (const key of REQUIRED_CODEX_TOML_KEYS) {
            assert(
                typeof parsed[key] === "string" && parsed[key].trim().length > 0,
                `Agent codex sem ${key} obrigatório: ${materializedPath}`
            );
        }
    }
}

function assertControlledCodexAgentsIndex(repoRoot, controlledAgentFiles) {
    const agentsIndexPath = path.join(repoRoot, "AGENTS.md");
    const expectedAgentNames = controlledAgentFiles
        .map((entry) => entry.replace(/\.agent\.md$/, ""))
        .sort();
    const content = assertFileHasRequiredShape(agentsIndexPath, [
        `# ${SMOKE_FIXTURE_REPO_NAME} Agents`,
        "## Runtime Contract",
        "## Managed Agents",
        ".codex/agents/",
    ]);
    const linkedAgentNames = [...content.matchAll(/\.codex\/agents\/([A-Za-z0-9_-]+)\.toml/g)]
        .map((match) => match[1])
        .sort();

    assert(
        content.split(/\r?\n/).length <= 80,
        `AGENTS.md codex ficou longo demais para shape plausível curto: ${agentsIndexPath}`
    );
    assert(
        !content.includes("{{"),
        `AGENTS.md codex manteve placeholder não resolvido: ${agentsIndexPath}`
    );
    assert.deepEqual(
        [...new Set(linkedAgentNames)].sort(),
        expectedAgentNames,
        `AGENTS.md codex não reflete o conjunto real de TOMLs: ${agentsIndexPath}`
    );
}

function assertNoOperationalArtifactsInSentinelRoot() {
    for (const relativePath of [
        "AGENTS.md",
        path.join(".codex", "agents"),
        path.join(".github", "agents"),
    ]) {
        assert(
            !fs.existsSync(path.join(ROOT, relativePath)),
            `Artifact operacional não deve existir no repo Sentinel: ${relativePath}`
        );
    }
}

function runControlledMaterializationSmoke(targetHome) {
    const contextSkillRoot = findInstalledSkillRoot(targetHome, "stnl_project_context");
    const agentSkillRoot = findInstalledSkillRoot(targetHome, "stnl_project_agent_specializer");
    const controlledAgentFiles = getControlledAgentFiles(agentSkillRoot);
    const vscodeRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-vscode-"));
    const backendOnlyRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-backend-only-"));
    const codexRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-codex-"));

    try {
        createControlledFixtureRepo(vscodeRepoRoot);
        materializeControlledContextDocs(contextSkillRoot, vscodeRepoRoot);
        materializeControlledAgents(agentSkillRoot, vscodeRepoRoot, controlledAgentFiles);

        assertControlledContextMaterialization(vscodeRepoRoot);
        assertControlledReferenceDocs(agentSkillRoot);
        assertProtocolHardeningInReferenceAgents(agentSkillRoot);
        assertProtocolHardeningInCanonicalRefs(agentSkillRoot);
        assertControlledAgentMaterialization(agentSkillRoot, vscodeRepoRoot, controlledAgentFiles);
        assertExecutionPackageFlowCoherence(agentSkillRoot, vscodeRepoRoot, controlledAgentFiles);
        assertProtocolHardeningInMaterializedAgents(vscodeRepoRoot, controlledAgentFiles);

        createControlledFixtureRepo(backendOnlyRepoRoot);
        materializeControlledContextDocs(contextSkillRoot, backendOnlyRepoRoot);
        materializeBackendOnlySpecializedAgents(agentSkillRoot, backendOnlyRepoRoot);
        assertBackendOnlySpecializedMaterialization(backendOnlyRepoRoot);
        assertProtocolHardeningRejectsCompactedBackendOnlyMaterialization(agentSkillRoot);

        createControlledFixtureRepo(codexRepoRoot);
        materializeControlledCodexAgents(agentSkillRoot, codexRepoRoot, controlledAgentFiles);

        assertControlledCodexAgentMaterialization(codexRepoRoot, controlledAgentFiles);
        assertControlledCodexAgentsIndex(codexRepoRoot, controlledAgentFiles);
        assertProtocolHardeningInCodexAgents(codexRepoRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(vscodeRepoRoot, { recursive: true, force: true });
        fs.rmSync(backendOnlyRepoRoot, { recursive: true, force: true });
        fs.rmSync(codexRepoRoot, { recursive: true, force: true });
    }
}

async function runSentinelSmoke() {
    console.log("Smoke Sentinel: manifests canônicos");
    assertInstallManifests();
    assertRequiredBundleCoverage();
    assertOwnedRootsAreFullyBundled();
    assertExplicitRootEntries();
    assertNoOperationalArtifactsInSentinelRoot();

    console.log("Smoke Sentinel: init/update/doctor em HOME temporário");
    const tempHome = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-smoke-"));

    try {
        const env = { ...process.env, HOME: tempHome };
        runSentinel("init", env);
        runSentinel("update", env);
        const doctor = runSentinel("doctor", env);

        assertInstalledArtifactsMatchSources(tempHome);
        assertDoctorOutput(doctor.stdout);
        console.log("Smoke Sentinel: materialização controlada");
        runControlledMaterializationSmoke(tempHome);
        assertNoOperationalArtifactsInSentinelRoot();
    } finally {
        fs.rmSync(tempHome, { recursive: true, force: true });
    }

    console.log("Smoke Sentinel: OK");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        await runSentinelSmoke();
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

export { runSentinelSmoke };
