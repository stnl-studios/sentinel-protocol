#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const HOME = os.homedir();
const SOURCE_DIR = path.join(ROOT, "skills");
const COMMAND = process.argv[2];

const TARGETS = [
    path.join(HOME, ".agents", "skills"),
    path.join(HOME, ".github", "skills"),
    path.join(HOME, ".gemini", "antigravity", "skills"),
];

const IGNORED_ENTRY_NAMES = new Set([
    ".DS_Store",
    ".gitkeep",
    "__MACOSX",
]);

const SKILL_BUNDLE_MANIFESTS = {
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
                "designer.agent.md",
                "finalizer.agent.md",
                "orchestrator.agent.md",
                "planner.agent.md",
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
                "workflow/STATUS-GATES.md",
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
    stnl_project_context: [
        "SKILL.md",
        "openai.yaml",
    ],
    stnl_project_agent_specializer: [
        "SKILL.md",
        "openai.yaml",
    ],
    stnl_spec_manager: [
        "SKILL.md",
        "openai.yaml",
    ],
};

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

    for (const target of TARGETS) {
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

        report.skills.push({
            name: skill,
            exists: skillExists,
            status: skillExists ? "OK" : "MISSING",
            installExpected: installManifest ?? [],
            installPrepared: !installManifest || (skillExists && missingInstallFiles.length === 0),
            missingInstallFiles,
            bundleReports,
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

    for (const target of TARGETS) {
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
}

try {
    switch (COMMAND) {
        case "init":
        case "update":
            installSkills();
            break;
        case "doctor":
            runDoctor();
            break;
        default:
            printUsage();
            process.exitCode = 1;
    }
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}
