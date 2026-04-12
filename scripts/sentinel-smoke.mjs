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
