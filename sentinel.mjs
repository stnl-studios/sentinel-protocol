#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const HOME = os.homedir();
const SOURCE_DIR = path.join(ROOT, "skills");
const COMMAND = process.argv[2];

const IGNORED_ENTRY_NAMES = new Set([
    ".DS_Store",
    ".gitkeep",
    "__MACOSX",
]);

function getTargets(homeDir = HOME) {
    return [
        path.join(homeDir, ".agents", "skills"),
        path.join(homeDir, ".github", "skills"),
        path.join(homeDir, ".gemini", "antigravity", "skills"),
    ];
}

const SKILL_BUNDLE_MANIFESTS = {
    stnl_project_foundation: [
        {
            sourceRoot: path.join("templates", "docs"),
            targetRoot: path.join("reference", "docs"),
            files: [
                "INDEX.md",
                "TBDS.md",
                "core/CONTEXT.md",
                "core/CONTRACTS.md",
                "core/RULES.md",
                "core/STATE.md",
                "core/TESTING.md",
                "units/_unit-template/CONTEXT.md",
                "units/_unit-template/CONTRACTS.md",
                "units/_unit-template/RULES.md",
                "units/_unit-template/STATE.md",
                "units/_unit-template/TESTING.md",
                "units/_unit-template/UI_KIT.md",
                "features/_feature-template/CONTEXT.md",
                "features/_feature-template/done/DONE-TEMPLATE.md",
                "decisions/ADR-template.md",
                "decisions/INDEX.md",
                "reference/DESIGN_SYSTEM.md",
            ],
        },
    ],
    stnl_project_context: [
        {
            sourceRoot: path.join("templates", "docs"),
            targetRoot: path.join("reference", "docs"),
            files: [
                "INDEX.md",
                "TBDS.md",
                "core/CONTEXT.md",
                "core/CONTRACTS.md",
                "core/RULES.md",
                "core/STATE.md",
                "core/TESTING.md",
                "units/_unit-template/CONTEXT.md",
                "units/_unit-template/CONTRACTS.md",
                "units/_unit-template/RULES.md",
                "units/_unit-template/STATE.md",
                "units/_unit-template/TESTING.md",
                "units/_unit-template/UI_KIT.md",
                "features/_feature-template/CONTEXT.md",
                "features/_feature-template/done/DONE-TEMPLATE.md",
            ],
        },
    ],
    stnl_project_agent_specializer: [
        {
            sourceRoot: path.join("templates", "agents"),
            targetRoot: path.join("reference", "agents"),
            files: [
                "coder-backend.agent.md",
                "coder-frontend.agent.md",
                "coder-ios.agent.md",
                "designer.agent.md",
                "execution-package-designer.agent.md",
                "finalizer.agent.md",
                "orchestrator.agent.md",
                "planner.agent.md",
                "reviewer.agent.md",
                "resync.agent.md",
                "validation-eval-designer.agent.md",
                "validation-runner.agent.md",
            ],
        },
        {
            sourceRoot: path.join("templates", "docs"),
            targetRoot: path.join("reference", "docs"),
            files: [
                "agents/AGENT-CONTRACT-SHAPE.md",
                "agents/AGENT-SPECIALIZATION-QUALITY-GATE.md",
                "workflow/EXECUTION-LIFECYCLE.md",
                "workflow/STATUS-GATES.md",
            ],
        },
        {
            sourceRoot: path.join("skills", "stnl_project_agent_specializer", "reference", "templates"),
            targetRoot: path.join("reference", "templates"),
            files: [
                "codex/AGENTS.md",
            ],
        },
    ],
    stnl_spec_manager: [
        {
            sourceRoot: path.join("skills", "stnl_spec_manager", "reference", "templates"),
            targetRoot: path.join("reference", "templates"),
            files: [
                "assumptions.md",
                "decision_log.md",
                "feature_spec.md",
                "open_questions.md",
                "qa_checklist.md",
                "readiness_report.md",
                "session_summary.md",
                "spec_slices.md",
            ],
        },
    ],
};

const SKILL_INSTALL_MANIFESTS = {
    stnl_project_foundation: [
        "SKILL.md",
        "openai.yaml",
        path.join("reference", "MANIFEST.md"),
    ],
    stnl_project_context: [
        "SKILL.md",
        "openai.yaml",
        path.join("reference", "MANIFEST.md"),
    ],
    stnl_project_agent_specializer: [
        "SKILL.md",
        "openai.yaml",
        path.join("reference", "MANIFEST.md"),
    ],
    stnl_spec_manager: [
        "SKILL.md",
        "openai.yaml",
        path.join("reference", "MANIFEST.md"),
    ],
};

const REFERENCE_MANIFEST_PATH = path.join("reference", "MANIFEST.md");
const REFERENCE_MANIFEST_GLOB_PATTERN = /[*?[\]{}]/;

function exists(targetPath) {
    return fs.existsSync(targetPath);
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function isIgnoredEntry(name) {
    return IGNORED_ENTRY_NAMES.has(name) || name.startsWith("._");
}

function listSkillFolders(dirPath) {
    if (!exists(dirPath)) {
        return [];
    }

    return fs
        .readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !isIgnoredEntry(entry.name))
        .map((entry) => entry.name)
        .sort();
}

function copyDirectory(srcDir, destDir) {
    ensureDir(destDir);

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });

    for (const entry of entries) {
        if (isIgnoredEntry(entry.name)) {
            continue;
        }

        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
            continue;
        }

        ensureDir(path.dirname(destPath));
        fs.copyFileSync(srcPath, destPath);
    }
}

function copyManifestEntries(srcRoot, destRoot, relativePaths) {
    for (const relativePath of relativePaths) {
        const sourcePath = path.join(srcRoot, relativePath);

        if (!exists(sourcePath)) {
            throw new Error(`Path do manifest não encontrado: ${sourcePath}`);
        }

        const destPath = path.join(destRoot, relativePath);
        ensureDir(path.dirname(destPath));
        fs.copyFileSync(sourcePath, destPath);
    }
}

function resetInstalledSkillDir(skillDir) {
    fs.rmSync(skillDir, { recursive: true, force: true });
}

function getSkillBundles(skillName) {
    return SKILL_BUNDLE_MANIFESTS[skillName] ?? [];
}

function getSkillInstallManifest(skillName) {
    return SKILL_INSTALL_MANIFESTS[skillName] ?? null;
}

function toManifestPath(relativePath) {
    return relativePath.split(path.sep).join("/");
}

function parseReferenceManifest(content, manifestPath) {
    const entries = [];

    for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^\s*-\s+`([^`]+)`\s*$/);
        if (!match) {
            continue;
        }

        const entry = match[1].trim();

        if (!entry.startsWith("reference/")) {
            throw new Error(`Manifest de referência inválido em ${manifestPath}: path fora de reference/**: ${entry}`);
        }

        if (path.isAbsolute(entry) || entry.includes("..")) {
            throw new Error(`Manifest de referência inválido em ${manifestPath}: path não permitido: ${entry}`);
        }

        if (REFERENCE_MANIFEST_GLOB_PATTERN.test(entry)) {
            throw new Error(`Manifest de referência inválido em ${manifestPath}: glob proibido: ${entry}`);
        }

        entries.push(entry);
    }

    const duplicates = entries.filter((entry, index) => entries.indexOf(entry) !== index);
    if (duplicates.length > 0) {
        throw new Error(`Manifest de referência inválido em ${manifestPath}: entradas duplicadas: ${[...new Set(duplicates)].join(", ")}`);
    }

    if (entries.length === 0) {
        throw new Error(`Manifest de referência inválido em ${manifestPath}: nenhuma entrada de reference/** listada.`);
    }

    return entries.sort();
}

function readReferenceManifest(manifestPath) {
    if (!exists(manifestPath)) {
        throw new Error(`Manifest de referência ausente: ${manifestPath}`);
    }

    return parseReferenceManifest(fs.readFileSync(manifestPath, "utf8"), manifestPath);
}

function getExpectedReferenceManifestEntries(skillName) {
    return getSkillBundles(skillName)
        .flatMap((bundle) => bundle.files.map((relativePath) => (
            toManifestPath(path.join(bundle.targetRoot, relativePath))
        )))
        .sort();
}

function validateReferenceManifestConsistency(skillName, skillRoot, options = {}) {
    const { checkFiles = true } = options;
    const manifestPath = path.join(skillRoot, REFERENCE_MANIFEST_PATH);
    const actual = readReferenceManifest(manifestPath);
    const expected = getExpectedReferenceManifestEntries(skillName);

    const missing = expected.filter((entry) => !actual.includes(entry));
    const extra = actual.filter((entry) => !expected.includes(entry));

    if (missing.length > 0 || extra.length > 0) {
        throw new Error([
            `Manifest de referência inconsistente para ${skillName}: ${manifestPath}`,
            missing.length > 0 ? `faltando: ${missing.join(", ")}` : "",
            extra.length > 0 ? `extra: ${extra.join(", ")}` : "",
        ].filter(Boolean).join("\n"));
    }

    const missingFiles = checkFiles
        ? actual.filter((entry) => !exists(path.join(skillRoot, entry)))
        : [];

    return {
        manifestPath,
        entries: actual,
        consistent: true,
        prepared: missingFiles.length === 0,
        missingFiles,
    };
}

function prepareSkillBundles(skillName, installedSkillDir) {
    const bundles = getSkillBundles(skillName);

    for (const bundle of bundles) {
        const bundleRoot = path.join(installedSkillDir, bundle.targetRoot);
        fs.rmSync(bundleRoot, { recursive: true, force: true });
        ensureDir(bundleRoot);

        copyManifestEntries(
            path.join(ROOT, bundle.sourceRoot),
            bundleRoot,
            bundle.files
        );
    }

    return bundles.map((bundle) => ({
        ...bundle,
        bundleRoot: path.join(installedSkillDir, bundle.targetRoot),
    }));
}

function installSkills() {
    if (!exists(SOURCE_DIR)) {
        throw new Error(`Fonte não encontrada: ${SOURCE_DIR}`);
    }

    const skills = listSkillFolders(SOURCE_DIR);

    console.log(`Raiz do repo: ${ROOT}`);
    console.log(`Source dir: ${SOURCE_DIR}`);
    console.log(`Skills encontradas: ${skills.length}`);

    for (const skill of skills) {
        console.log(`- ${skill}`);
    }

    for (const target of getTargets()) {
        console.log(`\nTarget: ${target}`);
        ensureDir(target);

        for (const skill of skills) {
            const sourceSkillDir = path.join(SOURCE_DIR, skill);
            const targetSkillDir = path.join(target, skill);
            const installManifest = getSkillInstallManifest(skill);

            resetInstalledSkillDir(targetSkillDir);
            if (installManifest) {
                ensureDir(targetSkillDir);
                copyManifestEntries(sourceSkillDir, targetSkillDir, installManifest);
                console.log(`  skill: ${skill} OK (${installManifest.length} arquivos canônicos)`);
            } else {
                copyDirectory(sourceSkillDir, targetSkillDir);
                console.log(`  skill: ${skill} OK`);
            }

            const bundles = prepareSkillBundles(skill, targetSkillDir);

            for (const bundle of bundles) {
                console.log(
                    `  bundle: ${skill}/${path.relative(targetSkillDir, bundle.bundleRoot)} OK (${bundle.files.length} arquivos)`
                );
            }
        }
    }
}

function inspectTarget(target, skills) {
    const targetExists = exists(target);
    const report = {
        target,
        exists: targetExists,
        status: targetExists ? "OK" : "SKIPPED",
        skills: [],
    };

    if (!targetExists) {
        return report;
    }

    for (const skill of skills) {
        const installedSkillDir = path.join(target, skill);
        const skillExists = exists(installedSkillDir);
        const installManifest = getSkillInstallManifest(skill);
        const bundleSpecs = getSkillBundles(skill);
        const missingInstallFiles = [];
        const bundleReports = [];

        if (skillExists && installManifest) {
            for (const relativePath of installManifest) {
                const installedPath = path.join(installedSkillDir, relativePath);
                if (!exists(installedPath)) {
                    missingInstallFiles.push(relativePath);
                }
            }
        }

        if (skillExists && bundleSpecs.length > 0) {
            for (const bundle of bundleSpecs) {
                const bundleRoot = path.join(installedSkillDir, bundle.targetRoot);
                const missingBundleFiles = [];

                for (const relativePath of bundle.files) {
                    const installedPath = path.join(bundleRoot, relativePath);
                    if (!exists(installedPath)) {
                        missingBundleFiles.push(relativePath);
                    }
                }

                bundleReports.push({
                    targetRoot: bundle.targetRoot,
                    bundleRoot,
                    expected: bundle.files,
                    prepared: missingBundleFiles.length === 0,
                    missingFiles: missingBundleFiles,
                });
            }
        }

        let referenceManifestReport = null;
        if (skillExists && bundleSpecs.length > 0) {
            try {
                referenceManifestReport = validateReferenceManifestConsistency(skill, installedSkillDir);
            } catch (error) {
                referenceManifestReport = {
                    manifestPath: path.join(installedSkillDir, REFERENCE_MANIFEST_PATH),
                    entries: [],
                    consistent: false,
                    prepared: false,
                    missingFiles: [error.message],
                };
            }
        }

        report.skills.push({
            name: skill,
            exists: skillExists,
            status: skillExists ? "OK" : "MISSING",
            installExpected: installManifest ?? [],
            installPrepared: !installManifest || (skillExists && missingInstallFiles.length === 0),
            missingInstallFiles,
            bundleReports,
            referenceManifestReport,
        });
    }

    return report;
}

function runDoctor() {
    const sourceExists = exists(SOURCE_DIR);
    const skills = listSkillFolders(SOURCE_DIR);
    let hasIssue = false;

    console.log(`Raiz do repo: ${ROOT}`);
    console.log(`Source dir: ${SOURCE_DIR} ${sourceExists ? "OK" : "MISSING"}`);
    console.log(`Skills encontradas: ${skills.length}`);

    for (const skill of skills) {
        console.log(`- ${skill}`);
    }

    console.log("");

    for (const skill of skills) {
        const sourceSkillDir = path.join(SOURCE_DIR, skill);
        const bundleSpecs = getSkillBundles(skill);

        if (bundleSpecs.length === 0) {
            continue;
        }

        try {
            validateReferenceManifestConsistency(skill, sourceSkillDir, { checkFiles: false });
            console.log(`Source manifest: ${skill}/${REFERENCE_MANIFEST_PATH} OK`);
        } catch (error) {
            hasIssue = true;
            console.log(`Source manifest: ${skill}/${REFERENCE_MANIFEST_PATH} MISSING`);
            console.log(`  missing: ${error.message}`);
        }
    }

    console.log("");

    for (const target of getTargets()) {
        const report = inspectTarget(target, skills);
        console.log(`Target: ${report.target} ${report.status}`);

        if (!report.exists) {
            console.log("");
            continue;
        }

        for (const skillReport of report.skills) {
            console.log(`  skill: ${skillReport.name} ${skillReport.status}`);

            if (!skillReport.exists) {
                hasIssue = true;
                continue;
            }

            if (skillReport.installExpected.length > 0) {
                console.log(
                    `  package: ${skillReport.installPrepared ? "OK" : "MISSING"}`
                );
                console.log(`  package paths: ${skillReport.installExpected.join(", ")}`);

                if (skillReport.missingInstallFiles.length > 0) {
                    hasIssue = true;
                    console.log(`  missing package files: ${skillReport.missingInstallFiles.join(", ")}`);
                }
            }

            for (const bundleReport of skillReport.bundleReports) {
                console.log(
                    `  bundle: ${path.relative(report.target, bundleReport.bundleRoot)} ${bundleReport.prepared ? "OK" : "MISSING"}`
                );
                console.log(`  bundle paths: ${bundleReport.expected.join(", ")}`);

                if (bundleReport.missingFiles.length > 0) {
                    hasIssue = true;
                    console.log(`  missing: ${bundleReport.missingFiles.join(", ")}`);
                }
            }

            if (skillReport.referenceManifestReport) {
                const manifestReport = skillReport.referenceManifestReport;
                console.log(
                    `  reference manifest: ${path.relative(path.join(report.target, skillReport.name), manifestReport.manifestPath)} ${manifestReport.consistent && manifestReport.prepared ? "OK" : "MISSING"}`
                );
                console.log(`  reference manifest paths: ${manifestReport.entries.join(", ")}`);

                if (!manifestReport.consistent || !manifestReport.prepared) {
                    hasIssue = true;
                    console.log(`  missing reference manifest files: ${manifestReport.missingFiles.join(", ")}`);
                }
            }
        }

        console.log("");
    }

    if (!sourceExists) {
        hasIssue = true;
    }

    if (hasIssue) {
        process.exitCode = 1;
    }
}

function printUsage() {
    console.log("Uso:");
    console.log("  node sentinel.mjs init");
    console.log("  node sentinel.mjs update");
    console.log("  node sentinel.mjs doctor");
    console.log("  node sentinel.mjs smoke");
}

function isDirectRun() {
    return process.argv[1] && path.resolve(process.argv[1]) === __filename;
}

function runSmokeCommand() {
    const result = spawnSync(process.execPath, [path.join(ROOT, "scripts", "sentinel-smoke.mjs")], {
        cwd: ROOT,
        stdio: "inherit",
    });

    if (result.status !== 0) {
        throw new Error("Smoke do Sentinel falhou.");
    }
}

async function main(command = COMMAND) {
    switch (command) {
        case "init":
        case "update":
            installSkills();
            break;
        case "doctor":
            runDoctor();
            break;
        case "smoke":
            runSmokeCommand();
            break;
        default:
            printUsage();
            process.exitCode = 1;
    }
}

if (isDirectRun()) {
    main().catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}

export {
    HOME,
    ROOT,
    SOURCE_DIR,
    SKILL_BUNDLE_MANIFESTS,
    SKILL_INSTALL_MANIFESTS,
    exists,
    getSkillBundles,
    getSkillInstallManifest,
    getExpectedReferenceManifestEntries,
    getTargets,
    inspectTarget,
    isIgnoredEntry,
    listSkillFolders,
    main,
    parseReferenceManifest,
    runDoctor,
    installSkills,
    validateReferenceManifestConsistency,
};
