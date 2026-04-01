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

function resetInstalledSkillDir(skillDir) {
    fs.rmSync(skillDir, { recursive: true, force: true });
}

function getBundleManifest(skillName) {
    return SKILL_BUNDLE_MANIFESTS[skillName] ?? [];
}

function getSkillBundleSourcePath(skillName, relativePath) {
    if (skillName !== "stnl_project_context") {
        throw new Error(`Bundle não suportado para a skill: ${skillName}`);
    }

    return path.join(ROOT, "templates", "docs", relativePath);
}

function getSkillBundleTargetRoot(installedSkillDir) {
    return path.join(installedSkillDir, "reference", "docs");
}

function prepareSkillBundle(skillName, installedSkillDir) {
    const manifest = getBundleManifest(skillName);

    if (manifest.length === 0) {
        return [];
    }

    const bundleRoot = getSkillBundleTargetRoot(installedSkillDir);
    fs.rmSync(bundleRoot, { recursive: true, force: true });
    ensureDir(bundleRoot);

    for (const relativePath of manifest) {
        const sourcePath = getSkillBundleSourcePath(skillName, relativePath);

        if (!exists(sourcePath)) {
            throw new Error(`Path do bundle não encontrado: ${sourcePath}`);
        }

        const destPath = path.join(bundleRoot, relativePath);
        ensureDir(path.dirname(destPath));
        fs.copyFileSync(sourcePath, destPath);
    }

    return manifest;
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

            resetInstalledSkillDir(targetSkillDir);
            copyDirectory(sourceSkillDir, targetSkillDir);
            console.log(`  skill: ${skill} OK`);

            const manifest = prepareSkillBundle(skill, targetSkillDir);

            if (manifest.length > 0) {
                console.log(`  bundle: ${skill}/reference/docs OK (${manifest.length} arquivos)`);
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
        const bundleManifest = getBundleManifest(skill);
        const bundleRoot = getSkillBundleTargetRoot(installedSkillDir);
        const missingBundleFiles = [];

        if (skillExists && bundleManifest.length > 0) {
            for (const relativePath of bundleManifest) {
                const installedPath = path.join(bundleRoot, relativePath);
                if (!exists(installedPath)) {
                    missingBundleFiles.push(relativePath);
                }
            }
        }

        report.skills.push({
            name: skill,
            exists: skillExists,
            status: skillExists ? "OK" : "MISSING",
            bundleRoot,
            bundleExpected: bundleManifest,
            bundlePrepared: skillExists && bundleManifest.length > 0 && missingBundleFiles.length === 0,
            missingBundleFiles,
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

            if (skillReport.bundleExpected.length > 0) {
                console.log(
                    `  bundle: ${path.relative(report.target, skillReport.bundleRoot)} ${skillReport.bundlePrepared ? "OK" : "MISSING"}`
                );
                console.log(`  bundle paths: ${skillReport.bundleExpected.join(", ")}`);

                if (skillReport.missingBundleFiles.length > 0) {
                    hasIssue = true;
                    console.log(`  missing: ${skillReport.missingBundleFiles.join(", ")}`);
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
