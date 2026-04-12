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
    ["stnl_project_agent_specializer", "reference/agents", "reviewer.agent.md"],
    ["stnl_project_agent_specializer", "reference/agents", "coder-ios.agent.md"],
    ["stnl_project_agent_specializer", "reference/docs", "workflow/EXECUTION-LIFECYCLE.md"],
    ["stnl_project_agent_specializer", "reference/docs", "agents/AGENT-CONTRACT-SHAPE.md"],
    ["stnl_project_agent_specializer", "reference/docs", "agents/AGENT-SPECIALIZATION-QUALITY-GATE.md"],
    ["stnl_project_context", "reference/docs", "core/TESTING.md"],
];

const OWNED_SOURCE_ROOTS = [
    ["stnl_project_agent_specializer", path.join("reference", "agents"), ""],
    ["stnl_project_agent_specializer", path.join("reference", "docs"), "agents"],
    ["stnl_project_agent_specializer", path.join("reference", "docs"), "workflow"],
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
        ],
    },
    {
        relativePath: path.join("reference", "docs", "workflow", "EXECUTION-LIFECYCLE.md"),
        requiredSnippets: [
            "# Execution Lifecycle Canonico",
            "## Ordem do fluxo",
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
    "validation-runner.agent.md": ["read", "search", "execute", "todo"],
    "finalizer.agent.md": ["read", "search", "edit", "todo"],
    "reviewer.agent.md": ["read", "search"],
    "coder-backend.agent.md": ["read", "search", "edit", "execute", "todo"],
    "coder-frontend.agent.md": ["read", "search", "edit", "execute", "todo"],
    "coder-ios.agent.md": ["read", "search", "edit", "execute", "todo"],
    "designer.agent.md": ["read", "search", "todo"],
};

const REQUIRED_CONTROLLED_AGENT_FILES = [
    "orchestrator.agent.md",
    "planner.agent.md",
    "validation-eval-designer.agent.md",
    "validation-runner.agent.md",
    "finalizer.agent.md",
    "reviewer.agent.md",
    "coder-backend.agent.md",
    "coder-frontend.agent.md",
    "coder-ios.agent.md",
];

const REQUIRED_AGENT_BODY_SNIPPETS = [
    "## Mission",
    "## Handoff",
    "## Reading contract",
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
    const projectContextBundle = getBundle("stnl_project_context", path.join("reference", "docs"));

    for (const relativePath of ["INDEX.md", "TBDS.md"]) {
        assert(
            projectContextBundle.files.includes(relativePath),
            `Manifest do stnl_project_context não inclui ${relativePath}`
        );
    }
}

function assertInstallManifests() {
    for (const skillName of ["stnl_project_context", "stnl_project_agent_specializer", "stnl_spec_manager"]) {
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
        "bundle: stnl_project_agent_specializer/reference/agents OK",
        "bundle: stnl_project_agent_specializer/reference/docs OK",
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

function runControlledMaterializationSmoke(targetHome) {
    const contextSkillRoot = findInstalledSkillRoot(targetHome, "stnl_project_context");
    const agentSkillRoot = findInstalledSkillRoot(targetHome, "stnl_project_agent_specializer");
    const controlledAgentFiles = getControlledAgentFiles(agentSkillRoot);
    const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-fixture-"));

    try {
        createControlledFixtureRepo(repoRoot);
        materializeControlledContextDocs(contextSkillRoot, repoRoot);
        materializeControlledAgents(agentSkillRoot, repoRoot, controlledAgentFiles);

        assertControlledContextMaterialization(repoRoot);
        assertControlledReferenceDocs(agentSkillRoot);
        assertControlledAgentMaterialization(agentSkillRoot, repoRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(repoRoot, { recursive: true, force: true });
    }
}

async function runSentinelSmoke() {
    console.log("Smoke Sentinel: manifests canônicos");
    assertInstallManifests();
    assertRequiredBundleCoverage();
    assertOwnedRootsAreFullyBundled();
    assertExplicitRootEntries();

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
