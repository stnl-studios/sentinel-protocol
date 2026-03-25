#!/usr/bin/env node
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;
const HOME = os.homedir();

const command = process.argv[2];

const SOURCE_DIR = path.join(ROOT, ".agents", "skills");

const TARGETS = [
    path.join(HOME, ".agents", "skills"),
    path.join(HOME, ".github", "skills"),
    path.join(HOME, ".gemini", "antigravity", "skills"),
];

function exists(targetPath) {
    return fs.existsSync(targetPath);
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
    ensureDir(dest);

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            ensureDir(path.dirname(destPath));
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function listSkillFolders(dir) {
    if (!exists(dir)) return [];

    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
}

function runInitOrUpdate() {
    if (!exists(SOURCE_DIR)) {
        console.error(`Fonte não encontrada: ${SOURCE_DIR}`);
        process.exit(1);
    }

    const skills = listSkillFolders(SOURCE_DIR);

    console.log(`Fonte: ${SOURCE_DIR}`);
    console.log(`Skills encontradas: ${skills.length}`);

    for (const skill of skills) {
        console.log(`- ${skill}`);
    }

    for (const target of TARGETS) {
        console.log(`\nCopiando para: ${target}`);
        copyDir(SOURCE_DIR, target);
        console.log("OK");
    }

    console.log("\nConcluído.");
}

function runDoctor() {
    console.log(`Raiz do repo: ${ROOT}`);
    console.log(`Home do usuário: ${HOME}`);
    console.log(`Fonte: ${SOURCE_DIR} ${exists(SOURCE_DIR) ? "OK" : "NÃO ENCONTRADA"}`);

    const skills = listSkillFolders(SOURCE_DIR);
    console.log(`Skills na fonte: ${skills.length}`);

    for (const skill of skills) {
        console.log(`- ${skill}`);
    }

    console.log("");

    for (const target of TARGETS) {
        console.log(`${target} ${exists(target) ? "OK" : "AUSENTE"}`);
    }
}

switch (command) {
    case "init":
    case "update":
        runInitOrUpdate();
        break;

    case "doctor":
        runDoctor();
        break;

    default:
        console.log("Uso:");
        console.log("  node sentinel.mjs init");
        console.log("  node sentinel.mjs update");
        console.log("  node sentinel.mjs doctor");
        process.exit(1);
}