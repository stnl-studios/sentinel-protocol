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
    getExpectedReferenceManifestEntries,
    getTargets,
    inspectTarget,
    isIgnoredEntry,
    listInstalledStaleSkills,
    listSkillFolders,
    parseReferenceManifest,
} from "../sentinel.mjs";

const QUALITY_GUARDRAIL_SKILLS = [
    "stnl_frontend_quality",
    "stnl_backend_quality",
    "stnl_backend_sql_quality",
    "stnl_mobile_ios_swift_quality",
];

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
    ["stnl_project_agent_specializer", "reference/templates", "codex/config.toml"],
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
const COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS = [
    "Compact Agent Return Contract",
    "return only the minimum needed for the parent to decide the next gate",
    "Do not repeat the full Sentinel contract",
    "Do not paste full SPEC, checklist, logs, or diffs",
    "return artifact path plus compact summary",
    "Expand only on blocker, failure, critical validation evidence, or explicit human request",
    "main chat focused on routing/status deltas",
];
const COMPACT_AGENT_RETURN_FORBIDDEN_SNIPPETS = [
    "paste the full artifact into the chat",
    "include full logs when validation passed",
    "repeat the full Sentinel contract in the return",
    "return raw intermediate output",
];
const CLOSED_SPEC_DETAILED_EVIDENCE_FORBIDDEN_SNIPPETS = [
    "cd web && npm run lint",
    "cd web && npm run build",
    "cd web && npm test",
    "cd functions && npm run test:rules",
    "--watch=false",
    "--browsers=ChromeHeadless",
    "106/106",
];
const CODEX_PARENT_MEDIATED_ROUTING_SNIPPETS = [
    "Codex Parent-Mediated Routing Contract",
    "When the human explicitly requests `Use orchestrator`",
    "orchestrator must return a compact ROUTE_PACKET",
    "orchestrator must not spawn downstream Sentinel owners directly",
    "root/main session then spawns the named owner",
    "root/main must not choose owners on its own except from a valid ROUTE_PACKET",
    "preserves the Codex primary visual layer",
    "avoids nested owner threads",
    "return to orchestrator for the next routing decision",
];
const CODEX_PARENT_MEDIATED_ROUTING_FORBIDDEN_SNIPPETS = [
    "orchestrator may then spawn the current canonical owner directly",
    "orchestrator spawns the current canonical owner",
    "orchestrator may spawn downstream owners",
    "root/main chooses the current canonical owner directly",
    "root/main -> owner direct",
    "default first Sentinel subagent is `orchestrator`",
    "must request `orchestrator` as the default first Sentinel subagent",
    "must request the `orchestrator` custom subagent by exact name",
    "default first Sentinel subagent for Codex",
    "automatically delegate by description",
    "automatic delegation by description",
];
const CODEX_EXPLICIT_SUBAGENT_INVOCATION_SNIPPETS = [
    "Explicit Subagent Invocation Contract",
    "must not spawn custom subagents automatically",
    "Skill/workflow requests are not subagent authorization",
    "`Use stnl_spec_manager`",
    "`Use orchestrator`",
    "SUBAGENT_AUTH_REQUIRED",
];

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

const SPEC_TEMPLATE_HEADER_REQUIRED_SNIPPETS = [
    "## File Purpose Header",
    "- do_not_use_for:",
    "- canonical_source_for:",
    "- canonical_source_not_for:",
    "- update_owner:",
    "- downstream_consumers:",
    "- token_policy:",
    "- related_files:",
];

const SPEC_TEMPLATE_HEADER_SPECS = [
    {
        relativePath: "feature_spec.md",
        requiredSnippets: [
            "Canonical business and product contract",
            "do_not_use_for: Execution sequence, file editing plan, owned paths, validation commands, temporary notes, or work packages.",
            "canonical_source_not_for: Detailed open questions, temporary assumptions, session history, or the slice consumption map.",
        ],
    },
    {
        relativePath: "spec_slices.md",
        requiredSnippets: [
            "Canonical consumption map for an active SPEC",
            "do_not_use_for: Execution authorization, execution plans, file paths, commands, work packages, validation packs, or closure decisions.",
            "canonical_source_not_for: Business acceptance, final product decisions, detailed questions, implementation sequencing, validation commands, or post-execution closure.",
        ],
    },
    {
        relativePath: "open_questions.md",
        requiredSnippets: [
            "Canonical register of material uncertainty",
            "do_not_use_for: Final accepted scope, resolved product decisions, implementation direction, or closure evidence.",
            "canonical_source_for: `Q-*` items",
        ],
    },
    {
        relativePath: "assumptions.md",
        requiredSnippets: [
            "Canonical register of provisional assumptions",
            "do_not_use_for: Final decisions, closure evidence, execution plans, or accepted product behavior.",
            "canonical_source_for: `A-*` assumptions",
        ],
    },
    {
        relativePath: "decision_log.md",
        requiredSnippets: [
            "Canonical register of decisions",
            "do_not_use_for: Open questions, speculative implementation, temporary assumptions, execution plans, or validation commands.",
            "canonical_source_for: `D-*` decisions",
        ],
    },
    {
        relativePath: "readiness_report.md",
        requiredSnippets: [
            "Working assessment of SPEC maturity",
            "do_not_use_for: Implementation steps, execution plans, final closure summary, file paths, commands, or work packages.",
            "canonical_source_for: Readiness status",
        ],
    },
    {
        relativePath: "session_summary.md",
        requiredSnippets: [
            "Append-only working log of SPEC maturation sessions",
            "do_not_use_for: Canonical final scope, accepted behavior, execution plans, file paths, commands, validation proof, or closure evidence.",
            "canonical_source_for: Session-by-session working history",
        ],
    },
    {
        relativePath: "qa_checklist.md",
        requiredSnippets: [
            "Working checklist for SPEC quality",
            "do_not_use_for: Accepted behavior, closure evidence, execution plans, file paths, commands, or work packages.",
            "canonical_source_for: SPEC quality checks",
        ],
    },
];

const DOC_TEMPLATE_HEADER_REQUIRED_SNIPPETS = [
    "## File Purpose Header",
    "- do_not_use_for:",
    "- canonical_source_for:",
    "- canonical_source_not_for:",
    "- token_policy:",
];

const DOC_TEMPLATE_HEADER_PATHS = [
    "INDEX.md",
    "TBDS.md",
    path.join("core", "CONTEXT.md"),
    path.join("core", "CONTRACTS.md"),
    path.join("core", "RULES.md"),
    path.join("core", "STATE.md"),
    path.join("core", "TESTING.md"),
    path.join("units", "_unit-template", "CONTEXT.md"),
    path.join("units", "_unit-template", "CONTRACTS.md"),
    path.join("units", "_unit-template", "RULES.md"),
    path.join("units", "_unit-template", "STATE.md"),
    path.join("units", "_unit-template", "TESTING.md"),
    path.join("units", "_unit-template", "UI_KIT.md"),
    path.join("features", "_feature-template", "CONTEXT.md"),
    path.join("features", "_feature-template", "done", "DONE-TEMPLATE.md"),
    path.join("decisions", "ADR-template.md"),
    path.join("decisions", "INDEX.md"),
    path.join("reference", "DESIGN_SYSTEM.md"),
    path.join("agents", "AGENT-CONTRACT-SHAPE.md"),
    path.join("agents", "AGENT-SPECIALIZATION-QUALITY-GATE.md"),
    path.join("workflow", "EXECUTION-LIFECYCLE.md"),
    path.join("workflow", "STATUS-GATES.md"),
];

const DOC_TEMPLATE_CRITICAL_SNIPPETS = [
    {
        relativePath: "INDEX.md",
        requiredSnippets: [
            "sem substituir os docs factuais",
            "`docs/INDEX.md` não substitui nenhum desses documentos",
        ],
    },
    {
        relativePath: path.join("core", "TESTING.md"),
        requiredSnippets: [
            "não substitui o `VALIDATION PACK` cut-scoped",
            "não vira checklist rígido",
        ],
    },
    {
        relativePath: path.join("features", "_feature-template", "done", "DONE-TEMPLATE.md"),
        requiredSnippets: [
            "work packages ou substituto de `Feature CONTEXT`",
            "`DONE` não substitui `Feature CONTEXT`",
        ],
    },
    {
        relativePath: path.join("agents", "AGENT-CONTRACT-SHAPE.md"),
        requiredSnippets: [
            "Criar SPEC, planejar execução, autorizar subagents, rodar comandos ou substituir base agents.",
            "O `EXECUTION PACKAGE` nao substitui o orchestrator.",
        ],
    },
    {
        relativePath: path.join("agents", "AGENT-SPECIALIZATION-QUALITY-GATE.md"),
        requiredSnippets: [
            "Planejar implementação de produto, autorizar execução, rodar comandos ou substituir contrato de agent base.",
            "AGENTS.md` e cada `.codex/agents/*.toml` contem `Compact Agent Return Contract`",
        ],
    },
    {
        relativePath: path.join("workflow", "EXECUTION-LIFECYCLE.md"),
        requiredSnippets: [
            "Autorizar execução sem gates, criar work packages concretos, comandos, SPEC ou validação factual do repo.",
            "`execution-package-designer` compila `EXECUTION PACKAGE`",
        ],
    },
    {
        relativePath: path.join("workflow", "STATUS-GATES.md"),
        requiredSnippets: [
            "autorização de execução, comandos, work packages ou fatos do projeto.",
            "não substitui a proof pós-execução",
        ],
    },
];

const BASE_HEADER_AWARE_AGENT_FILES = [
    "orchestrator.agent.md",
    "planner.agent.md",
    "execution-package-designer.agent.md",
    "validation-eval-designer.agent.md",
    "validation-runner.agent.md",
    "reviewer.agent.md",
    "finalizer.agent.md",
];

const HEADER_AWARE_AGENT_COMMON_SNIPPETS = [
    "### Header-aware reading",
    "`File Purpose Header`",
    "`read_when`",
    "`do_not_use_for`",
    "`canonical_source_for`",
    "`canonical_source_not_for`",
    "`token_policy`",
    "legacy reading",
];

const HEADER_AWARE_AGENT_CRITICAL_SNIPPETS = {
    "orchestrator.agent.md": [
        "it never replaces canonical exact content",
        "SPEC header/`Planning Interface` never authorizes execution, validation, or closure",
    ],
    "planner.agent.md": [
        "`Planning Interface` as planning information only, never as an executable plan or execution authorization",
        "exact scope, decisions, acceptance, blockers, and readiness still require canonical content",
    ],
    "execution-package-designer.agent.md": [
        "Headers may route reading, but they must not fill `OWNED_PATHS`, commands, work packages, acceptance checks, or block conditions",
        "they never authorize a package when the SPEC or slice is blocked or deferred for planning",
    ],
    "validation-eval-designer.agent.md": [
        "Header is not acceptance, DoD, readiness, or proof evidence",
        "`Planning Interface` never authorizes execution, validation, or closure",
    ],
    "validation-runner.agent.md": [
        "never extract commands/proof criteria from non-canonical files",
        "SPEC header or `Planning Interface` never authorizes commands, execution, proof obligations, verdict changes, or closure",
    ],
    "reviewer.agent.md": [
        "Do not approve or reject from the header alone",
        "confirm quality, consistency, package adherence, and guardrail fit against canonical content",
    ],
    "finalizer.agent.md": [
        "Headers do not replace canonical evidence",
        "`spec_slices.md` is not post-execution closure source",
        "canonical close requires only `feature_spec.md`",
    ],
};

const AGENT_REFERENCE_DOC_SPECS = [
    {
        relativePath: path.join("reference", "docs", "agents", "AGENT-CONTRACT-SHAPE.md"),
        requiredSnippets: [
            "# Shape Canonico de Contrato de Agent Base",
            "## Metadata canonica parseavel",
            "## Shape esperado para agent especializado",
            "Explicit Subagent Invocation Contract",
            "Skill/workflow request nao e autorizacao de custom subagent",
            "SUBAGENT_AUTH_REQUIRED",
            ...COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS,
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
            "model_reasoning_effort",
            "Consistency without legacy propagation",
            "Stack quality guardrail propagation check",
            "Do not copy fragile, duplicated, insecure, accidental, or legacy project patterns into new code just because they exist.",
            "artifact final materializado",
            "Explicit Subagent Invocation Contract",
            "Use stnl_spec_manager",
            "SUBAGENT_AUTH_REQUIRED",
            ...COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS,
        ],
    },
    {
        relativePath: path.join("reference", "docs", "workflow", "EXECUTION-LIFECYCLE.md"),
        requiredSnippets: [
            "# Execution Lifecycle Canonico",
            "## Ordem do fluxo",
            "## Contrato do pacote de execução",
            "execution-package-designer -> orchestrator -> coder(s)",
            "REQUIRED_QUALITY_GUARDRAILS",
            "## Contrato das stack quality guardrails",
            "## Contrato do correction loop",
            "Toda rodada terminal passa obrigatoriamente pelo `finalizer`",
            "## Regra de closure",
        ],
    },
    {
        relativePath: path.join("reference", "docs", "workflow", "STATUS-GATES.md"),
        requiredSnippets: [
            "# Status e Gates Canônicos",
            "## Status de decisão e gates",
            "## Regra de stack quality guardrails",
            "REQUIRED_QUALITY_GUARDRAILS",
            "## Regra de correction loop",
            "todos exigem passagem terminal pelo `finalizer`",
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
const LEGACY_CONSISTENCY_HEADING_FIXTURE_FILE = "coder-backend.agent.md";

const REQUIRED_AGENT_BODY_SNIPPETS = [
    "## Mission",
    "## Handoff",
    "## Reading contract",
    "## Consistency without legacy propagation",
];

const CONSISTENCY_WITHOUT_LEGACY_PROPAGATION_SNIPPETS = [
    "## Consistency without legacy propagation",
    "Do not copy fragile, duplicated, insecure, accidental, or legacy project patterns into new code just because they exist.",
    "This policy does not authorize broad refactors",
];
const CONSISTENCY_POLICY_CANONICAL_HEADING = "## Consistency without legacy propagation";
const CONSISTENCY_POLICY_LEGACY_MARKER = "Consistency without legacy propagation:";
const LEGACY_REVIEWER_STATUS_MARKER = "LEGACY_REVIEWER_READY_BLOCKED_STATUS_MARKER";
const STATUS_CONTRACT_BY_AGENT = {
    "reviewer": ["PASS", "FAIL"],
    "coder-backend": ["READY", "BLOCKED"],
    "coder-frontend": ["READY", "BLOCKED"],
    "coder-ios": ["READY", "BLOCKED"],
    "validation-runner": ["PASS", "PARTIAL", "FAIL", "BLOCKED"],
};

const CODEX_AGENTS_TEMPLATE_RELATIVE_PATH = path.join("reference", "templates", "codex", "AGENTS.md");
const CODEX_CONFIG_TEMPLATE_RELATIVE_PATH = path.join("reference", "templates", "codex", "config.toml");
const BASE_AGENT_TEMPLATE_CHAR_LIMIT = 28000;
const VSCODE_AGENT_MARKDOWN_CHAR_LIMIT = 30000;
const CONTROLLED_ALLOWED_MODELS = [
    "sentinel-strong-model",
    "sentinel-economy-model",
];
const SENTINEL_CODEX_TOML_KEYS = [
    "name",
    "description",
    "model",
    "model_reasoning_effort",
    "sandbox_mode",
    "developer_instructions",
];
const OPERATIONAL_EFFORT_FRONTMATTER_KEYS = [
    "reasoning_effort",
    "thinking_effort",
    "model_reasoning_effort",
];
const EXPECTED_CODEX_AGENT_SANDBOX_MODE = {
    "orchestrator": "read-only",
    "planner": "read-only",
    "validation-eval-designer": "read-only",
    "execution-package-designer": "read-only",
    "reviewer": "read-only",
    "designer": "read-only",
    "coder-backend": "workspace-write",
    "coder-frontend": "workspace-write",
    "coder-ios": "workspace-write",
    "validation-runner": "workspace-write",
    "finalizer": "workspace-write",
    "resync": "workspace-write",
};
const EXPECTED_CODEX_AGENT_REASONING_EFFORT = {
    "orchestrator": "high",
    "planner": "high",
    "validation-eval-designer": "high",
    "execution-package-designer": "high",
    "reviewer": "high",
    "designer": "medium",
    "coder-backend": "medium",
    "coder-frontend": "medium",
    "coder-ios": "medium",
    "validation-runner": "low",
    "finalizer": "low",
    "resync": "low",
};

const EXTERNAL_MEMORY_HARD_BANS = [
    ["Persistent factual", " memory"].join(""),
    ["memories", "/repo"].join(""),
    ["repo", "/memories"].join(""),
    ["shared session factual", " memory"].join(""),
];

const EXTERNAL_MEMORY_SOFT_BANS = [
    ["durable", " memory"].join(""),
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
            ["SKILL.md", "openai.yaml", path.join("reference", "MANIFEST.md")],
            `Install manifest inesperado para ${skillName}`
        );
    }
}

function assertReferenceManifests() {
    for (const [skillName, bundles] of Object.entries(SKILL_BUNDLE_MANIFESTS)) {
        assert(bundles.length > 0, `Skill sem bundle inesperada no manifesto de bundles: ${skillName}`);

        const manifestPath = path.join(SOURCE_DIR, skillName, "reference", "MANIFEST.md");
        assert(fs.existsSync(manifestPath), `reference/MANIFEST.md ausente para ${skillName}`);

        const entries = parseReferenceManifest(fs.readFileSync(manifestPath, "utf8"), manifestPath);
        const expectedEntries = getExpectedReferenceManifestEntries(skillName);

        assert.deepEqual(
            entries,
            expectedEntries,
            `reference/MANIFEST.md diverge do bundle declarado para ${skillName}`
        );

        for (const entry of entries) {
            assert(!entry.includes("*"), `Manifest ${skillName} contem glob proibido: ${entry}`);
        }

        const skillContent = fs.readFileSync(path.join(SOURCE_DIR, skillName, "SKILL.md"), "utf8");
        assertContentIncludesAll(skillContent, [
            "reference/MANIFEST.md",
            "BLOCKED_REFERENCE_BUNDLE_MISSING",
            "busca ampla",
            "glob",
            "templates/**",
            "skills/**",
            "~/.agents/**",
            "filesystem externo",
        ], `${skillName}/SKILL.md`);
    }
}

function assertSpecManagerContract() {
    const specManagerRoot = path.join(SOURCE_DIR, "stnl_spec_manager");
    const skillContent = fs.readFileSync(path.join(specManagerRoot, "SKILL.md"), "utf8");
    const specManagerReadmeContent = fs.readFileSync(path.join(specManagerRoot, "README.md"), "utf8");
    const manifestContent = fs.readFileSync(path.join(specManagerRoot, "reference", "MANIFEST.md"), "utf8");
    const specSlicesContent = fs.readFileSync(
        path.join(specManagerRoot, "reference", "templates", "spec_slices.md"),
        "utf8"
    );
    const readinessContent = fs.readFileSync(
        path.join(specManagerRoot, "reference", "templates", "readiness_report.md"),
        "utf8"
    );
    const featureSpecContent = fs.readFileSync(
        path.join(specManagerRoot, "reference", "templates", "feature_spec.md"),
        "utf8"
    );
    const openQuestionsContent = fs.readFileSync(
        path.join(specManagerRoot, "reference", "templates", "open_questions.md"),
        "utf8"
    );
    const assumptionsContent = fs.readFileSync(
        path.join(specManagerRoot, "reference", "templates", "assumptions.md"),
        "utf8"
    );
    const decisionLogContent = fs.readFileSync(
        path.join(specManagerRoot, "reference", "templates", "decision_log.md"),
        "utf8"
    );
    const specClosePromptContent = fs.readFileSync(
        path.join(ROOT, "templates", "prompts", "spec-close.md"),
        "utf8"
    );
    const specPlanningInterfacePromptPath = path.join(ROOT, "templates", "prompts", "spec-planning-interface.md");
    const specPlanningInterfacePromptContent = fs.readFileSync(
        specPlanningInterfacePromptPath,
        "utf8"
    );
    const promptReadmeContent = fs.readFileSync(
        path.join(ROOT, "templates", "prompts", "README.md"),
        "utf8"
    );
    const orchestratorSliceContent = fs.readFileSync(
        path.join(ROOT, "templates", "prompts", "orchestrator-slice.md"),
        "utf8"
    );
    const orchestratorNextSliceContent = fs.readFileSync(
        path.join(ROOT, "templates", "prompts", "orchestrator-next-slice.md"),
        "utf8"
    );

    assertSpecTemplateHeaders(specManagerRoot);

    assertContentIncludesAll(skillContent, [
        "tratar a SPEC como contrato durável de intenção, escopo, comportamento, decisões, aceite, riscos, readiness e cortes consumíveis",
        "nunca transformar a SPEC em plano técnico, plano de arquivos, pacote executável ou fechamento pós-execução",
        "SPEC não é plano técnico.",
        "SPEC é o contrato durável",
        "`spec_slices.md`: mapa canônico de consumo da SPEC ativa; deve existir em toda SPEC ativa e conter ao menos `SL-001`",
        "`spec_slices.md` é obrigatório em toda SPEC ativa.",
        "`spec_slices.md` é o mapa canônico de consumo da SPEC ativa, não apenas um arquivo de split",
        "toda SPEC ativa deve ter ao menos `SL-001`",
        "`SL-001` existe mesmo em SPEC de slice único",
        "`spec_slices.md` pode informar planejamento posterior, mas não autoriza execução",
        "`Planning Interface` vive dentro de `spec_slices.md`. Ela pode ser enriquecida por `MODE=PLANNING_INTERFACE`, mas continua atrasada, não operacional e subordinada à SPEC ativa.",
        "## MODE=PLANNING_INTERFACE",
        "`MODE=PLANNING_INTERFACE`",
        "`PLANNING_INTERFACE` é etapa de enriquecimento da SPEC ativa, não etapa de execução",
        "`MODE=NEW` não existe como modo público",
        "`new SPEC creation -> PLANNING_INTERFACE -> orchestrator`",
        "`new SPEC creation -> RESUME -> PLANNING_INTERFACE -> orchestrator`",
        "atualizar principalmente `spec_slices.md`",
        "se `spec_slices.md` já existir com `Planning Interface > does_not_define` incompleto, sincronizar apenas os itens proibidos ausentes do template atual",
        "`final owned paths`, `final commands` e `final validation pack`",
        "não criar execution plan",
        "não criar work packages",
        "não definir owned paths finais",
        "não definir comandos finais",
        "não criar validation pack final",
        "`Planning Interface` informa o planejamento, mas não autoriza execução",
        "manter `Planning Interface` presente e em estado `deferred`",
        "`Planning Interface` não define:",
        "arquivos a editar",
        "`OWNED_PATHS`",
        "work packages",
        "plano de validação executável",
        "`planning_intent`",
        "`planning_inputs_required`",
        "`planning_focus`",
        "`likely_implementation_surfaces`",
        "nunca paths finais, owned paths, package boundaries, edit anchors ou autorização de ownership",
        "`validation_focus`",
        "nunca comandos, suites finais, scripts, validation pack final ou matriz executável",
        "`anti_drift_constraints`",
        "`handoff_notes_for_planner`",
        "não escolher agente, não chamar `orchestrator`, não rotear automaticamente",
        "`planning_notes`",
        "`implementation_surface_hints`",
        "`validation_hints`",
        "`risks_for_planner`",
        "`downstream_handoff_expectations`",
        "não montar execution package, work package ou instrução de chamada",
        "`ARTIFACTS UPDATED`",
        "`PLANNING_INTERFACE STATUS`",
        "`NEXT STEP`",
        "a limpeza pós-close canônico deve remover todos os demais arquivos da pasta da SPEC, incluindo `open_questions.md`, `assumptions.md`, `decision_log.md`, `readiness_report.md`, `session_summary.md`, `spec_slices.md`, `qa_checklist.md`, `validation_pack.md` ou equivalentes",
        "SPEC fechada continua compacta e não retém `spec_slices.md` depois do close flow canônico",
    ], "stnl_spec_manager/SKILL.md planning interface and active SPEC bundle contract");

    assertContentIncludesAll(manifestContent, [
        "`spec_slices.md` is mandatory for every active SPEC. It is the canonical consumption map for the active SPEC, not only a split file.",
        "Single-slice SPECs still have `spec_slices.md` and `SL-001`",
        "`Planning Interface` lives in `spec_slices.md` as a bridge from SPEC to later planning.",
        "It may be enriched through `MODE=PLANNING_INTERFACE`",
        "`MODE=PLANNING_INTERFACE` acts only on an existing active SPEC",
        "Public modes are only `MODE=RESUME`, `MODE=PLANNING_INTERFACE`, and `MODE=CLOSE`; `MODE=NEW` is not a public mode.",
        "`likely_implementation_surfaces` uses semantic hints, never final paths, owned paths, or ownership authorization",
        "`validation_focus` names acceptance or validation focus, never commands or a final validation pack",
        "`handoff_notes_for_planner` gives short planner-facing notes without choosing an agent or calling orchestrator",
        "must not generate an execution plan, work packages, final owned paths, final commands, or a final validation pack",
        "informs planning, does not authorize execution",
        "Generated SPEC files in the required bundle, including `session_summary.md`, include a `File Purpose Header`",
        "The header includes `token_policy`, but it does not replace canonical content",
        "Older projects without `File Purpose Header` remain compatible; absence of the header in legacy material is not an error.",
        "Closed SPECs remain compact",
        "only `feature_spec.md` remains in the SPEC folder",
        "`spec_slices.md` is not retained in the closed bundle",
    ], "stnl_spec_manager/reference/MANIFEST.md active SPEC and header compatibility contract");

    assertContentIncludesAll(skillContent, [
        "`SL-001`, `SL-002`, `SL-003`, sequencial e zero-padded com três dígitos",
        "`### SL-001 — [Short slice title]`",
        "`dependencies: [SL-001, SL-002]`",
        "`S-001`, `Slice 1`, `SLICE - 001`, `S1`, `slice-1`",
        "não normalizar silenciosamente",
        "Readiness Gate universal",
        "pergunta bloqueante aberta",
        "`Q-001`, `Q-002`, `Q-003`",
        "`D-001`, `D-002`, `D-003`",
        "`AC-001`, `AC-002`, `AC-003`",
        "`R-001`, `R-002`, `R-003`",
        "`C-001`, `C-002`, `C-003`",
    ], "stnl_spec_manager/SKILL.md slice identity contract");

    assertContentIncludesAll(skillContent, [
        "quando `MODE=CLOSE` resultar em `closed` ou `closed_with_residuals`, a pasta da SPEC deve terminar contendo somente `feature_spec.md`",
        "`closed_with_residuals` significa SPEC fechada com resíduos, limites ou validações pendentes resumidos dentro de `feature_spec.md`; não autoriza manter arquivos auxiliares",
        "absorver dos artefatos auxiliares apenas a informação final e durável necessária para entendimento futuro da SPEC encerrada",
        "se algum auxiliar ainda for necessário para entender a SPEC, a SPEC não está pronta para fechamento canônico e o resultado deve ser `not_closed`",
        "instruções locais ou de prompt não podem enfraquecer a limpeza canônica de `MODE=CLOSE`",
        "`STATUS: BLOCKED_CLOSE_CONTRACT_OVERRIDE`",
        "se o DEV confirmar que deseja manter auxiliares, o resultado deve ser `not_closed`",
        "nunca transportar para `feature_spec.md` fechado resíduo técnico como plano de implementação",
        "em `feature_spec.md` fechado, evidências de fechamento devem ser categorias compactas e duráveis",
        "categorias compactas permitidas incluem validação automatizada local web",
        "consolidar `evidence_used` por categoria compacta de evidência",
        "logs, checklist granular, contagens detalhadas e comandos pertencem aos artefatos auxiliares enquanto a SPEC estiver ativa",
        "`__MACOSX` e `.DS_Store`",
    ], "stnl_spec_manager/SKILL.md canonical close cleanup contract");

    assertContentExcludesAll(
        skillContent,
        CLOSED_SPEC_DETAILED_EVIDENCE_FORBIDDEN_SNIPPETS,
        "stnl_spec_manager/SKILL.md closed SPEC evidence contract"
    );

    assert(
        !skillContent.includes("manter apenas os que ainda carregarem valor real"),
        "stnl_spec_manager/SKILL.md não pode permitir retenção de auxiliares em closed_with_residuals"
    );

    assert(
        !skillContent.includes("valor residual único"),
        "stnl_spec_manager/SKILL.md não deve usar valor residual único como justificativa de retenção pós-close"
    );

    assertContentIncludesAll(specSlicesContent, [
        "## File Purpose Header",
        "- read_when: A downstream agent needs slice boundaries, readiness labels, dependencies by slice ID, or the Planning Interface state.",
        "## Slice Model",
        "split_required: pending | no | yes",
        "slice_model: pending | single_slice | multi_slice",
        "single-slice does not mean no slice; it means SL-001 represents the whole approved consumption boundary.",
        "## Slice Identity Contract",
        "canonical_id_format: `SL-001`, `SL-002`, `SL-003`, sequential and zero-padded with three digits",
        "recommended_heading: `### SL-001 — [Short slice title]`",
        "id_field_required: every slice must include `id: SL-001`",
        "dependencies_must_use: canonical slice IDs only",
        "prohibited_slice_identifiers: `S-001`, `Slice 1`, `SLICE - 001`, `S1`, `slice-1`, title-only references",
        "id_stability: once assigned, a slice ID must not be renumbered or reused",
        "migration_rule: when labels are inconsistent, do not normalize silently; create a migration plan or ask for human confirmation when traceability could change",
        "## Planning Interface",
        "status: deferred",
        "allowed_status_values: deferred | partial | active | blocked",
        "Planning constraints must not be generated before readiness is stable.",
        "do_not_use_for: Execution authorization, execution plans, file paths, commands, work packages, validation packs, or closure decisions.",
        "does_not_authorize: execution",
        "planning_intent:",
        "planning_inputs_required:",
        "planning_focus:",
        "likely_implementation_surfaces:",
        "never final path, owned path, package boundary, edit anchor, or ownership authorization",
        "validation_focus:",
        "never command, script, suite list, executable matrix, or final validation pack",
        "anti_drift_constraints:",
        "handoff_notes_for_planner:",
        "do not choose an agent, call orchestrator, route automatically",
        "does_not_define:",
        "execution plan",
        "file paths",
        "commands",
        "work packages",
        "owned paths",
        "final owned paths",
        "final commands",
        "final validation pack",
        "does_not_replace:",
        "`planner`",
        "`execution-package-designer`",
        "`validation-eval-designer`",
        "`finalizer`",
        "## Slice Dependency Overview",
        "SL-001 depends_on: []",
        "### SL-001 — Pending approved consumption boundary",
        "id: SL-001",
        "planning_status: blocked_for_planning",
        "planning_notes:",
        "implementation_surface_hints:",
        "not final paths, owned paths, mandatory modules, or ownership authorization",
        "validation_hints:",
        "not commands, scripts, suites, or final validation pack",
        "risks_for_planner:",
        "downstream_handoff_expectations:",
        "do not assemble an execution package, work package, or agent call",
        "can_be_planned_independently: no",
        "parallelization_hint: unknown",
    ], "spec_slices.md active SPEC consumption map contract");

    assertContentExcludesAll(specSlicesContent, [
        "deferred Planning Interface state",
        "## Post-Slice Closure Contract",
        "final_slice_status_values",
        "applies_after_execution: yes",
    ], "spec_slices.md active SPEC consumption map forbidden closure contract");

    assertContentIncludesAll(readinessContent, [
        "`Execution Ready` is prohibited while any open question has `blocking: yes`.",
        "Slice references must use canonical stable IDs only: `SL-001`, `SL-002`, `SL-003`.",
        "Do not use `S-001`, `Slice 1`, `SLICE - 001`, `S1`, `slice-1`, or title-only references as slice IDs.",
        "### SL-001 — [Short slice title]",
        "id: SL-001",
    ], "readiness_report.md slice identity contract");

    assertContentIncludesAll(featureSpecContent, [
        "Use canonical stable IDs for questions (`Q-001`), decisions (`D-001`), acceptance criteria (`AC-001`), slices (`SL-001`), risks (`R-001`), and constraints (`C-001`).",
        "#### C-001 — [Constraint title]",
        "- id: C-001",
        "### AC-001 — [Acceptance criterion title]",
        "- id: AC-001",
        "### R-001 — [Risk title]",
        "- id: R-001",
    ], "feature_spec.md canonical ID contract");

    assertContentIncludesAll(featureSpecContent, [
        "When `closure_status` is `closed` or `closed_with_residuals`, the SPEC folder must contain only `feature_spec.md`",
        "`closed_with_residuals` records known residual product, scope, or validation limits inside this file; it does not retain auxiliary files.",
        "do not include implementation plans, session history, validation commands, checklist trails, or maturity logs",
        "Closure evidence in this file must be compact evidence categories",
        "not exact validation commands, logs, operational paths, detailed suite counts, granular checklists, or technical validation trails",
        "Detailed evidence belongs in auxiliary working artifacts while the SPEC is active, not in the closed canonical artifact.",
        "Compact evidence category 1",
        "local automated web validation passed: lint, build, and unit/component tests",
        "local rules validation passed for the relevant scenarios",
        "final manual smoke confirmed OK, static/documental validation completed, or known validation limits preserved",
        "canonical_close_folder_state",
        "must be `feature_spec.md only`",
        "For `closed` or `closed_with_residuals`, set this section to `not_applicable_closed` and do not list retained auxiliary artifacts.",
    ], "feature_spec.md canonical close cleanup contract");

    assertContentExcludesAll(
        featureSpecContent,
        CLOSED_SPEC_DETAILED_EVIDENCE_FORBIDDEN_SNIPPETS,
        "feature_spec.md closed SPEC evidence contract"
    );

    assertContentIncludesAll(readinessContent, [
        "If `MODE=CLOSE` produces `closed` or `closed_with_residuals`, this file is a working artifact and must be removed",
        "If this file is still needed to understand the SPEC, the honest closure result is `not_closed`.",
    ], "readiness_report.md canonical close cleanup contract");

    assertContentIncludesAll(specClosePromptContent, [
        "Se fechar como `closed` ou `closed_with_residuals`, compacte o conteúdo durável necessário no `feature_spec.md` e limpe a pasta da SPEC para ficar somente com `feature_spec.md`",
        "Consolide evidências por categoria compacta; não registre comandos detalhados",
        "`closed_with_residuals` registra limites conhecidos dentro do `feature_spec.md`; não preserva auxiliares",
        "Se algum auxiliar ainda for necessário para entender a SPEC, retorne `not_closed`.",
        "bloqueie com `BLOCKED_CLOSE_CONTRACT_OVERRIDE`",
    ], "spec-close.md canonical close cleanup prompt");

    assertContentExcludesAll(
        specClosePromptContent,
        CLOSED_SPEC_DETAILED_EVIDENCE_FORBIDDEN_SNIPPETS,
        "spec-close.md closed SPEC evidence contract"
    );

    assert(fs.existsSync(specPlanningInterfacePromptPath), "spec-planning-interface.md deve existir");

    assertContentIncludesAll(promptReadmeContent, [
        "spec-planning-interface.md",
        "Modos públicos explícitos de SPEC são somente `MODE=RESUME`, `MODE=PLANNING_INTERFACE` e `MODE=CLOSE`; `MODE=NEW` não existe como modo público.",
        "`new SPEC creation -> PLANNING_INTERFACE -> orchestrator`",
        "`new SPEC creation -> RESUME -> PLANNING_INTERFACE -> orchestrator`",
        "`PLANNING_INTERFACE` é etapa de enriquecimento da SPEC ativa, não etapa de execução",
    ], "templates/prompts/README.md planning interface launcher contract");

    assertContentIncludesAll(specPlanningInterfacePromptContent, [
        "MODE=PLANNING_INTERFACE",
        "SPEC alvo obrigatório e explícito:",
        "atualizar principalmente `spec_slices.md`",
        "se `Planning Interface > does_not_define` já existir em `spec_slices.md`, sincronizar apenas os itens proibidos ausentes do template atual",
        "`final owned paths`, `final commands` e `final validation pack`",
        "inputs confirmados ainda necessários para planejamento preciso",
        "superfícies prováveis como hints semânticos, sem paths finais ou owned paths",
        "foco de validação esperado, sem comandos ou validation pack final",
        "notas curtas para o planner, sem escolher agente ou chamar orchestrator",
        "não gerar execution plan",
        "não criar work packages",
        "não definir owned paths finais",
        "não definir comandos finais",
        "não criar validation pack final",
    ], "spec-planning-interface.md launcher contract");

    const planningInterfaceContractContent = [
        skillContent,
        specManagerReadmeContent,
        manifestContent,
        promptReadmeContent,
        specPlanningInterfacePromptContent,
        specSlicesContent,
    ].join("\n");

    assertContentExcludesAll(planningInterfaceContractContent, [
        "`NEW -> PLANNING_INTERFACE -> orchestrator`",
        "`NEW -> RESUME -> PLANNING_INTERFACE -> orchestrator`",
        "Fluxos esperados: `NEW -> PLANNING_INTERFACE -> orchestrator`",
        "fluxo: `NEW -> PLANNING_INTERFACE -> orchestrator`",
        "fluxo: `NEW -> RESUME -> PLANNING_INTERFACE -> orchestrator`",
        "## MODE=NEW",
    ], "Planning Interface public mode hardening contract");

    assert(
        !/modos expl[ií]citos suportados:[^\n]*MODE=NEW/.test(planningInterfaceContractContent),
        "Planning Interface não deve documentar MODE=NEW como modo público suportado"
    );

    assert(
        !/public modes are[^\n]*MODE=NEW[^\n]*(supported|allowed)/i.test(planningInterfaceContractContent),
        "Planning Interface não deve declarar MODE=NEW como public mode suportado"
    );

    assertContentIncludesAll(openQuestionsContent, [
        "### Q-001 — [Generic question title]",
        "- id: Q-001",
        "- evidence:",
        "- why_it_matters:",
        "- suggested_options:",
        "C) Other: describe expected behavior",
        "- default: none",
        "- do_not_assume: yes",
        "`Execution Ready` is prohibited while any question with `status: OPEN` and `blocking: yes` remains",
    ], "open_questions.md sparse intake and blocking gate contract");

    assertContentIncludesAll(assumptionsContent, [
        "Any `ACTIVE` assumption with `must_be_confirmed_by: before execution ready` blocks `Execution Ready`",
        "Any material assumption about product behavior, data, permission, persistence, validation, or error handling must also be represented in `open_questions.md`",
        "related_questions: [Q-001, Q-002]",
        "must_be_confirmed_by: <before structured | before execution ready | before implementation | optional>",
        "product | data | permission | persistence | validation | error_handling",
    ], "assumptions.md execution readiness and material assumptions contract");

    assertContentIncludesAll(decisionLogContent, [
        "### D-001 — [Decision title]",
        "- id: D-001",
        "If a direction is still speculative",
    ], "decision_log.md canonical ID contract");

    assertContentIncludesAll(orchestratorSliceContent, [
        "Slice ID canônico:",
        "<SL-00X>",
    ], "orchestrator-slice prompt slice identity contract");

    assertContentIncludesAll(orchestratorNextSliceContent, [
        "ID canônico `SL-001`, `SL-002`, `SL-003`",
    ], "orchestrator-next-slice prompt slice identity contract");

    assert(
        !/^###\s+(?:S-\d+|Slice\s+\d+|SLICE\s*-\s*\d+|S\d+|slice-\d+)\b/im.test(specSlicesContent),
        "spec_slices.md não pode usar heading normativo com identificador legado como S-001, Slice 1, SLICE - 001, S1 ou slice-1"
    );
}

function runSentinel(command, env, args = []) {
    const result = spawnSync(process.execPath, [path.join(ROOT, "sentinel.mjs"), command, ...args], {
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

function runSentinelExpectFailure(command, env, args = []) {
    const result = spawnSync(process.execPath, [path.join(ROOT, "sentinel.mjs"), command, ...args], {
        cwd: ROOT,
        env,
        encoding: "utf8",
    });

    assert.notEqual(
        result.status,
        0,
        `Comando deveria falhar: node sentinel.mjs ${command} ${args.join(" ")}`
    );

    return result;
}

function assertSourceOnlyDoctorFailsForMissingSourceFile() {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-source-only-"));
    const missingRelativePath = path.join("templates", "agents", "reviewer.agent.md");

    try {
        fs.copyFileSync(path.join(ROOT, "sentinel.mjs"), path.join(tempRoot, "sentinel.mjs"));
        fs.cpSync(path.join(ROOT, "skills"), path.join(tempRoot, "skills"), { recursive: true });
        fs.cpSync(path.join(ROOT, "templates"), path.join(tempRoot, "templates"), { recursive: true });
        fs.rmSync(path.join(tempRoot, missingRelativePath));

        const result = spawnSync(
            process.execPath,
            [fs.realpathSync(path.join(tempRoot, "sentinel.mjs")), "doctor", "--source-only"],
            {
                cwd: tempRoot,
                env: { ...process.env, HOME: tempRoot },
                encoding: "utf8",
            }
        );

        assert.notEqual(
            result.status,
            0,
            "doctor --source-only deveria falhar quando um arquivo fonte obrigatório está ausente"
        );
        assert(
            result.stdout.includes(`missing source file: ${missingRelativePath}`),
            `doctor --source-only não reportou o arquivo fonte ausente: ${missingRelativePath}`
        );
    } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
    }
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

            if (skillReport.bundleReports.length > 0) {
                assert(
                    skillReport.referenceManifestReport?.consistent,
                    `reference/MANIFEST.md inconsistente em ${target}/${skillReport.name}`
                );
                assert(
                    skillReport.referenceManifestReport?.prepared,
                    `reference/MANIFEST.md aponta arquivos ausentes em ${target}/${skillReport.name}: ${skillReport.referenceManifestReport?.missingFiles.join(", ")}`
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

        assertAgentFrontmatterNamesMatchBasenames(
            path.join(target, "stnl_project_agent_specializer", "reference", "agents"),
            "stnl_project_agent_specializer/reference/agents instalado"
        );
        assertNoExternalMemoryTermsInTree(
            path.join(target, "stnl_project_agent_specializer", "reference", "agents"),
            "stnl_project_agent_specializer/reference/agents instalado"
        );
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
        "reference manifest: reference/MANIFEST.md OK",
    ]) {
        assert(
            output.includes(requiredLine),
            `Doctor não reportou a linha esperada: ${requiredLine}`
        );
    }
}

function assertQualityGuardrailSourceDefinitions() {
    for (const skillName of QUALITY_GUARDRAIL_SKILLS) {
        const skillRoot = path.join(SOURCE_DIR, skillName);
        const skillContent = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
        const openaiContent = fs.readFileSync(path.join(skillRoot, "openai.yaml"), "utf8");

        assert(skillContent.includes("quality guardrail"), `${skillName}/SKILL.md não declara quality guardrail`);
        assert(openaiContent.includes(`name: "${skillName}"`), `${skillName}/openai.yaml não preserva name`);
        assert(openaiContent.includes('display_name: "STNL '), `${skillName}/openai.yaml não usa display_name com prefixo STNL`);
    }
}

function assertQualityGuardrailsInDocs(docRoot, label) {
    const lifecycleContent = fs.readFileSync(path.join(docRoot, "workflow", "EXECUTION-LIFECYCLE.md"), "utf8");
    const statusGatesContent = fs.readFileSync(path.join(docRoot, "workflow", "STATUS-GATES.md"), "utf8");
    const qualityGateContent = fs.readFileSync(path.join(docRoot, "agents", "AGENT-SPECIALIZATION-QUALITY-GATE.md"), "utf8");

    for (const [content, contentLabel] of [
        [lifecycleContent, `${label}/workflow/EXECUTION-LIFECYCLE.md`],
        [statusGatesContent, `${label}/workflow/STATUS-GATES.md`],
        [qualityGateContent, `${label}/agents/AGENT-SPECIALIZATION-QUALITY-GATE.md`],
    ]) {
        assertContentIncludesAll(content, QUALITY_GUARDRAIL_SKILLS, contentLabel);
    }

    assert(
        qualityGateContent.includes("### 14c. Stack quality guardrail propagation check"),
        `${label}/agents/AGENT-SPECIALIZATION-QUALITY-GATE.md não contém seção canônica de propagação das quality guardrails`
    );
}

function assertQualityGuardrailPropagationInAgentSet(agentRoot, label) {
    const requiredByAgent = {
        "orchestrator.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "planner.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "validation-eval-designer.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "execution-package-designer.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "validation-runner.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "reviewer.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "finalizer.agent.md": QUALITY_GUARDRAIL_SKILLS,
        "coder-backend.agent.md": ["stnl_backend_quality", "stnl_backend_sql_quality"],
        "coder-frontend.agent.md": ["stnl_frontend_quality"],
        "coder-ios.agent.md": ["stnl_mobile_ios_swift_quality"],
    };

    for (const [fileName, requiredSkills] of Object.entries(requiredByAgent)) {
        const content = fs.readFileSync(path.join(agentRoot, fileName), "utf8");
        assertContentIncludesAll(content, requiredSkills, `${label}/${fileName}`);
    }
}

function assertQualityGuardrailPropagationInCodexAgentSet(repoRoot, controlledAgentFiles) {
    const requiredByAgent = {
        "orchestrator": QUALITY_GUARDRAIL_SKILLS,
        "planner": QUALITY_GUARDRAIL_SKILLS,
        "validation-eval-designer": QUALITY_GUARDRAIL_SKILLS,
        "execution-package-designer": QUALITY_GUARDRAIL_SKILLS,
        "validation-runner": QUALITY_GUARDRAIL_SKILLS,
        "reviewer": QUALITY_GUARDRAIL_SKILLS,
        "finalizer": QUALITY_GUARDRAIL_SKILLS,
        "coder-backend": ["stnl_backend_quality", "stnl_backend_sql_quality"],
        "coder-frontend": ["stnl_frontend_quality"],
        "coder-ios": ["stnl_mobile_ios_swift_quality"],
    };

    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const requiredSkills = requiredByAgent[agentName];

        if (!requiredSkills) {
            continue;
        }

        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);

        assertContentIncludesAll(parsed.developer_instructions, requiredSkills, `codex/${agentName}`);
    }
}

function assertRound1AntiInferenceHardeningInAgentSet(agentRoot, label) {
    const requiredByAgent = {
        "planner.agent.md": [
            "Do not convert ambiguous product behavior into an assumption.",
            "NEEDS_DEV_DECISION_BASE",
            "required or optional field choice",
            "conflict between SPEC, docs, and code",
            "When blocking, ask the smallest concrete question",
        ],
        "execution-package-designer.agent.md": [
            "PERMITTED_LOCAL_DECISIONS",
            "FORBIDDEN_INFERENCES",
            "REQUIRES_DEV_DECISION_IF",
            "mechanical, local, reversible decisions inside `OWNED_PATHS`",
            "the SPEC omits expected behavior",
        ],
        "coder-backend.agent.md": [
            "`Local implementation autonomy`",
            "local implementation decisions are allowed only when they are mechanical, local, reversible, and inside the execution package",
            "`Forbidden inference boundary`",
            "`Blocked handoff shape`",
            "PERMITTED_LOCAL_DECISIONS",
        ],
        "coder-frontend.agent.md": [
            "`Local implementation autonomy`",
            "local implementation decisions are allowed only when they are mechanical, local, reversible, and inside the execution package",
            "`Forbidden inference boundary`",
            "`Blocked handoff shape`",
            "FORBIDDEN_INFERENCES",
        ],
        "coder-ios.agent.md": [
            "`Local implementation autonomy`",
            "local implementation decisions are allowed only when they are mechanical, local, reversible, and inside the execution package",
            "`Forbidden inference boundary`",
            "`Blocked handoff shape`",
            "REQUIRES_DEV_DECISION_IF",
        ],
        "reviewer.agent.md": [
            "Anti-inference review",
            "unauthorized inference",
            "product-decision leakage",
            "passes tests but violates the SPEC",
            "Do not make reviewer routing mandatory globally",
        ],
    };

    for (const [fileName, requiredSnippets] of Object.entries(requiredByAgent)) {
        const content = fs.readFileSync(path.join(agentRoot, fileName), "utf8");
        assertContentIncludesAll(content, requiredSnippets, `${label}/${fileName} round 1 anti-inference hardening`);
    }
}

function assertRound1AntiInferenceHardeningInCodexAgents(repoRoot, controlledAgentFiles) {
    const requiredByAgent = {
        "planner": [
            "Do not convert ambiguous product behavior into an assumption.",
            "NEEDS_DEV_DECISION_BASE",
            "required or optional field choice",
            "conflict between SPEC, docs, and code",
            "When blocking, ask the smallest concrete question",
        ],
        "execution-package-designer": [
            "PERMITTED_LOCAL_DECISIONS",
            "FORBIDDEN_INFERENCES",
            "REQUIRES_DEV_DECISION_IF",
            "mechanical, local, reversible decisions inside `OWNED_PATHS`",
            "the SPEC omits expected behavior",
        ],
        "coder-backend": [
            "`Local implementation autonomy`",
            "local implementation decisions are allowed only when they are mechanical, local, reversible, and inside the execution package",
            "`Forbidden inference boundary`",
            "`Blocked handoff shape`",
            "PERMITTED_LOCAL_DECISIONS",
        ],
        "coder-frontend": [
            "`Local implementation autonomy`",
            "local implementation decisions are allowed only when they are mechanical, local, reversible, and inside the execution package",
            "`Forbidden inference boundary`",
            "`Blocked handoff shape`",
            "FORBIDDEN_INFERENCES",
        ],
        "coder-ios": [
            "`Local implementation autonomy`",
            "local implementation decisions are allowed only when they are mechanical, local, reversible, and inside the execution package",
            "`Forbidden inference boundary`",
            "`Blocked handoff shape`",
            "REQUIRES_DEV_DECISION_IF",
        ],
        "reviewer": [
            "Anti-inference review",
            "unauthorized inference",
            "product-decision leakage",
            "passes tests but violates the SPEC",
            "Do not make reviewer routing mandatory globally",
        ],
    };

    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const requiredSnippets = requiredByAgent[agentName];

        if (!requiredSnippets) {
            continue;
        }

        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);

        assertContentIncludesAll(
            parsed.developer_instructions,
            requiredSnippets,
            `codex/${agentName} round 1 anti-inference hardening`
        );
    }
}

function assertRound2OperationalAxesInAgentSet(agentRoot, label) {
    const requiredByAgent = {
        "orchestrator.agent.md": [
            "defaults `MODE=standard`, `FLOW=supervised`, `RUN=execute` preserve current flow",
            "MODE_COMPACT_REJECTED",
            "`MODE=compact`: format-only",
            "`MODE=strict`: requires reviewer plus stronger proof",
            "`FLOW=supervised`: no approval between every handoff",
            "`FLOW=autonomous`: safe cycles, no product/contract/schema/auth decisions",
            "`RUN=plan`: stops at execution-package-designer; no coder/final completion/slice completion",
        ],
        "planner.agent.md": [
            "`MODE=compact`: shorter `EXECUTION BRIEF`",
            "`MODE=strict`: reduce inference",
            "`RUN=plan`: plan only",
            "`ready_to_execute: yes|no`",
        ],
        "validation-eval-designer.agent.md": [
            "`MODE=compact`: keep the `VALIDATION PACK` shorter",
            "weak proof still blocks real risk",
            "`MODE=strict`: require stronger evidence",
        ],
        "execution-package-designer.agent.md": [
            "`MODE=compact` produces a shorter package",
            "`OBJECTIVE`",
            "`RUN=plan` produces only a proposed/preparatory package",
            "it does not authorize coder entry",
        ],
        "validation-runner.agent.md": [
            "`MODE=compact`: risk-proportional evidence",
            "no weak proof for real risk",
            "`FLOW=autonomous`: correction loops stop for DEV",
        ],
        "reviewer.agent.md": [
            "Reviewer remains optional in `MODE=standard`",
            "In `MODE=strict`, review is mandatory",
            "public contract",
            "schema/migration",
        ],
        "finalizer.agent.md": [
            "`RUN=plan` is non-terminal planning/preparation",
            "do not declare a slice complete",
            "`MODE=compact` changes closure brevity only",
            "`MODE=strict` requires complete evidence",
            "`FLOW=autonomous` may finalize canonical cycles",
        ],
    };

    for (const [fileName, requiredSnippets] of Object.entries(requiredByAgent)) {
        const content = fs.readFileSync(path.join(agentRoot, fileName), "utf8");
        assertContentIncludesAll(content, requiredSnippets, `${label}/${fileName} round 2 operational axes`);
    }
}

function assertRound2OperationalAxesInCodexAgents(repoRoot, controlledAgentFiles) {
    const requiredByAgent = {
        "orchestrator": [
            "defaults `MODE=standard`, `FLOW=supervised`, `RUN=execute` preserve current flow",
            "MODE_COMPACT_REJECTED",
            "`MODE=compact`: format-only",
            "`MODE=strict`: requires reviewer plus stronger proof",
            "`FLOW=supervised`: no approval between every handoff",
            "`FLOW=autonomous`: safe cycles, no product/contract/schema/auth decisions",
            "`RUN=plan`: stops at execution-package-designer; no coder/final completion/slice completion",
        ],
        "planner": [
            "`MODE=compact`: shorter `EXECUTION BRIEF`",
            "`MODE=strict`: reduce inference",
            "`RUN=plan`: plan only",
            "`ready_to_execute: yes|no`",
        ],
        "validation-eval-designer": [
            "`MODE=compact`: keep the `VALIDATION PACK` shorter",
            "weak proof still blocks real risk",
            "`MODE=strict`: require stronger evidence",
        ],
        "execution-package-designer": [
            "`MODE=compact` produces a shorter package",
            "`OBJECTIVE`",
            "`RUN=plan` produces only a proposed/preparatory package",
            "it does not authorize coder entry",
        ],
        "validation-runner": [
            "`MODE=compact`: risk-proportional evidence",
            "no weak proof for real risk",
            "`FLOW=autonomous`: correction loops stop for DEV",
        ],
        "reviewer": [
            "Reviewer remains optional in `MODE=standard`",
            "In `MODE=strict`, review is mandatory",
            "public contract",
            "schema/migration",
        ],
        "finalizer": [
            "`RUN=plan` is non-terminal planning/preparation",
            "do not declare a slice complete",
            "`MODE=compact` changes closure brevity only",
            "`MODE=strict` requires complete evidence",
            "`FLOW=autonomous` may finalize canonical cycles",
        ],
    };

    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const requiredSnippets = requiredByAgent[agentName];

        if (!requiredSnippets) {
            continue;
        }

        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);

        assertContentIncludesAll(
            parsed.developer_instructions,
            requiredSnippets,
            `codex/${agentName} round 2 operational axes`
        );
    }
}

const ROUND3_ORCHESTRATOR_LADDER_SNIPPETS = [
    "## Decision ladder",
    "1. Detect `RUN`.",
    "2. Detect `MODE`.",
    "3. Detect `FLOW`.",
    "4. Apply defaults: `MODE=standard`, `FLOW=supervised`, `RUN=execute`.",
    "5. Identify the current gate.",
    "6. Check the required artifact for that gate.",
    "7. Check handoff validity.",
    "8. Route to the owning agent.",
    "9. Stop if DEV decision is needed.",
    "10. Never perform downstream work locally.",
    "`MODE=compact`: format-only; shorter artifacts and chat, same gates, safety, blockers, proof requirements, and handoff validity.",
    "`MODE=strict`: requires reviewer plus stronger proof",
    "`FLOW=supervised`: no approval between every handoff",
    "`FLOW=autonomous`: safe cycles, no product/contract/schema/auth decisions",
    "`RUN=plan`: stops at execution-package-designer; no coder/final completion/slice completion",
    "do not call coders",
    "do not let `finalizer.agent.md` conclude a slice",
    "never implements, never closes durable documentation, never absorbs `stnl_project_context`, and never replaces planner, validation design, execution package design, runner, reviewer, finalizer, or resync",
];

function assertRound3OrchestratorLadderInAgentSet(agentRoot, label) {
    const content = fs.readFileSync(path.join(agentRoot, "orchestrator.agent.md"), "utf8");
    assertContentIncludesAll(content, ROUND3_ORCHESTRATOR_LADDER_SNIPPETS, `${label}/orchestrator round 3 decision ladder`);
}

function assertRound3OrchestratorLadderInCodexAgents(repoRoot) {
    const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", "orchestrator.toml"), "utf8");
    const parsed = parseToml(content, "orchestrator.toml");

    assertContentIncludesAll(
        parsed.developer_instructions,
        ROUND3_ORCHESTRATOR_LADDER_SNIPPETS,
        "codex/orchestrator round 3 decision ladder"
    );
}

function assertInstalledQualityGuardrailSkills(targetHome) {
    const targets = getTargets(targetHome);

    for (const target of targets) {
        for (const skillName of QUALITY_GUARDRAIL_SKILLS) {
            const installedSkillRoot = path.join(target, skillName);
            assert(fs.existsSync(path.join(installedSkillRoot, "SKILL.md")), `Quality guardrail ausente em ${target}: ${skillName}`);
            assert(fs.existsSync(path.join(installedSkillRoot, "openai.yaml")), `openai.yaml ausente em ${target}: ${skillName}`);
        }
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

function canonicalAgentIdFromFileName(fileName) {
    const agentId = fileName.replace(/\.agent\.md$/, "");

    assert.notEqual(agentId, fileName, `Nome de arquivo de agent inválido: ${fileName}`);
    assert(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(agentId),
        `ID lógico de agent deve ser kebab-case canônico: ${fileName}`
    );

    return agentId;
}

function assertAgentFrontmatterNamesMatchBasenames(agentsRoot, label) {
    assert(fs.existsSync(agentsRoot), `Diretório de agents ausente para validação de identidade: ${agentsRoot}`);

    const agentFiles = listRelativeFiles(agentsRoot).filter((relativePath) => relativePath.endsWith(".agent.md"));
    assert(agentFiles.length > 0, `Nenhum agent encontrado para validação de identidade em ${agentsRoot}`);

    for (const fileName of agentFiles) {
        assert.equal(
            path.basename(fileName),
            fileName,
            `Agent aninhado inesperado em ${label}: ${fileName}`
        );

        const agentId = canonicalAgentIdFromFileName(fileName);
        const agentPath = path.join(agentsRoot, fileName);
        const { data: frontmatter } = parseFrontmatter(fs.readFileSync(agentPath, "utf8"), agentPath);

        assert.equal(
            frontmatter.name,
            agentId,
            `${label}/${fileName} tem frontmatter.name inválido: esperado ${agentId}; recebido ${frontmatter.name}. O campo name deve ser o ID canônico em kebab-case, nunca display name humanizado.`
        );
        assert(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.name),
            `${label}/${fileName} tem frontmatter.name humanizado ou fora de kebab-case: ${frontmatter.name}`
        );
    }
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

function getControlledModelForAgent(agentName) {
    if ([
        "orchestrator",
        "planner",
        "validation-eval-designer",
        "execution-package-designer",
        "reviewer",
    ].includes(agentName)) {
        return CONTROLLED_ALLOWED_MODELS[0];
    }

    return CONTROLLED_ALLOWED_MODELS.at(-1);
}

function assertValidControlledModel(model, label) {
    assert(
        CONTROLLED_ALLOWED_MODELS.includes(model),
        `${label} materializou model fora de allowed_models controlado: ${model}`
    );
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
    const developerInstructions = normalizeProtocolFixedConsistencyHeading(data.developer_instructions);
    assert(!developerInstructions.includes("'''"), `developer_instructions incompatível com literal TOML: ${label}`);

    return [
        "# Sentinel managed artifact: true",
        `name = ${renderTomlScalar(data.name)}`,
        `description = ${renderTomlScalar(data.description)}`,
        `model = ${renderTomlScalar(data.model)}`,
        `model_reasoning_effort = ${renderTomlScalar(data.model_reasoning_effort)}`,
        `sandbox_mode = ${renderTomlScalar(data.sandbox_mode)}`,
        "developer_instructions = '''",
        developerInstructions.trim(),
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

function assertContentExcludesAll(content, snippets, label) {
    for (const snippet of snippets) {
        assert(
            !content.includes(snippet),
            `${label} contém o invariante proibido: ${snippet}`
        );
    }
}

function assertContentIncludesAny(content, snippets, label) {
    assert(
        snippets.some((snippet) => content.includes(snippet)),
        `${label} não contém nenhum dos invariantes esperados: ${snippets.join(" | ")}`
    );
}

function assertFilePurposeHeaderFields(content, label, requiredSnippets = DOC_TEMPLATE_HEADER_REQUIRED_SNIPPETS) {
    assertContentIncludesAll(content, requiredSnippets, `${label} File Purpose Header`);
}

function assertSpecTemplateHeaders(specManagerRoot) {
    const templatesRoot = path.join(specManagerRoot, "reference", "templates");

    for (const spec of SPEC_TEMPLATE_HEADER_SPECS) {
        const content = fs.readFileSync(path.join(templatesRoot, spec.relativePath), "utf8");
        assertFilePurposeHeaderFields(
            content,
            `stnl_spec_manager/reference/templates/${spec.relativePath}`,
            SPEC_TEMPLATE_HEADER_REQUIRED_SNIPPETS
        );
        assertContentIncludesAll(
            content,
            spec.requiredSnippets,
            `stnl_spec_manager/reference/templates/${spec.relativePath} header contract`
        );
    }
}

function assertDocumentationTemplateHeaders(docRoot, label, relativePaths = DOC_TEMPLATE_HEADER_PATHS) {
    for (const relativePath of relativePaths) {
        const content = fs.readFileSync(path.join(docRoot, relativePath), "utf8");
        assertFilePurposeHeaderFields(content, `${label}/${relativePath}`);
    }
}

function assertDocumentationTemplateCriticalSnippets(docRoot, label) {
    for (const spec of DOC_TEMPLATE_CRITICAL_SNIPPETS) {
        const content = fs.readFileSync(path.join(docRoot, spec.relativePath), "utf8");
        assertContentIncludesAll(content, spec.requiredSnippets, `${label}/${spec.relativePath} header critical contract`);
    }
}

function assertHeaderAwareReadingContent(content, label) {
    assertContentIncludesAll(content, HEADER_AWARE_AGENT_COMMON_SNIPPETS, `${label} header-aware reading`);
    assertContentIncludesAny(content, [
        "No header means legacy reading, never error.",
        "no header means legacy reading, never error.",
        "If no header exists, continue with normal legacy reading and never treat absence as an error.",
    ], `${label} legacy header fallback`);
}

function assertHeaderAwareReadingInAgentSet(agentRoot, label, agentFiles = BASE_HEADER_AWARE_AGENT_FILES) {
    for (const fileName of agentFiles) {
        const content = fs.readFileSync(path.join(agentRoot, fileName), "utf8");
        assertHeaderAwareReadingContent(content, `${label}/${fileName}`);
        assertContentIncludesAll(
            content,
            HEADER_AWARE_AGENT_CRITICAL_SNIPPETS[fileName] ?? [],
            `${label}/${fileName} header-aware critical contract`
        );
    }
}

function assertHeaderAwareReadingInCodexAgents(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        if (!BASE_HEADER_AWARE_AGENT_FILES.includes(fileName)) {
            continue;
        }

        const agentName = canonicalAgentIdFromFileName(fileName);
        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);

        assertHeaderAwareReadingContent(parsed.developer_instructions, `codex/${agentName}`);
        assertContentIncludesAll(
            parsed.developer_instructions,
            HEADER_AWARE_AGENT_CRITICAL_SNIPPETS[fileName] ?? [],
            `codex/${agentName} header-aware critical contract`
        );
    }
}

function assertCanonicalDesignerRoleClassInDocs(docRoot, label) {
    const checkedDocs = [
        path.join("agents", "AGENT-CONTRACT-SHAPE.md"),
        path.join("agents", "AGENT-SPECIALIZATION-QUALITY-GATE.md"),
    ];

    for (const relativePath of checkedDocs) {
        const content = fs.readFileSync(path.join(docRoot, relativePath), "utf8");
        const contentLabel = `${label}/${relativePath}`;

        assertContentIncludesAll(content, [
            "- `executor`: `coder-backend`, `coder-frontend`, `coder-ios`",
            "- `design-contributor`: `designer`",
        ], contentLabel);
        assertContentExcludesAll(content, [
            ["- `executor`: `coder-backend`, `coder-frontend`, `coder-ios`, ", "`designer`"].join(""),
            ["`executor`: `coder-backend`, `coder-frontend`, `coder-ios`, ", "`designer`"].join(""),
        ], contentLabel);
    }
}

function countOccurrences(content, snippet) {
    return content.split(snippet).length - 1;
}

function assertSingleConsistencyPolicyBlock(content, label) {
    assertContentIncludesAll(content, CONSISTENCY_WITHOUT_LEGACY_PROPAGATION_SNIPPETS, label);
    assert.equal(
        countOccurrences(content, CONSISTENCY_POLICY_CANONICAL_HEADING),
        1,
        `${label} deve conter exatamente um bloco Consistency without legacy propagation`
    );
    assert(
        !new RegExp(`^\\s*${escapeRegExp(CONSISTENCY_POLICY_LEGACY_MARKER)}\\s*$`, "m").test(content),
        `${label} não pode conter marcador legado com dois-pontos`
    );
}

function extractMarkdownSection(content, heading, label) {
    const start = content.indexOf(heading);
    assert(start >= 0, `${label} sem seção esperada: ${heading}`);

    const nextHeading = content.indexOf("\n## ", start + heading.length);
    const end = nextHeading >= 0 ? nextHeading + 1 : content.length;
    return content.slice(start, end);
}

function extractStatusContract(content, label) {
    const statusSection = extractMarkdownSection(content, "## Status it may emit", label);
    return [...statusSection.matchAll(/^\s*-\s+`([^`]+)`\s*$/gm)].map((match) => match[1]);
}

function assertStatusContract(content, agentName, label) {
    const expectedStatuses = STATUS_CONTRACT_BY_AGENT[agentName];

    if (!expectedStatuses) {
        return;
    }

    assert.deepEqual(
        extractStatusContract(content, label),
        expectedStatuses,
        `${label} preservou status incorreto para ${agentName}`
    );
}

function assertVscodeStatusContracts(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);

        if (!STATUS_CONTRACT_BY_AGENT[agentName]) {
            continue;
        }

        const content = fs.readFileSync(path.join(repoRoot, ".github", "agents", fileName), "utf8");
        assertStatusContract(content, agentName, `vscode/${fileName}`);
    }
}

function assertCodexStatusContracts(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);

        if (!STATUS_CONTRACT_BY_AGENT[agentName]) {
            continue;
        }

        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);
        assertStatusContract(parsed.developer_instructions, agentName, `codex/${agentName}`);
    }
}

function stripConsistencyPolicyBlock(content, label) {
    const heading = CONSISTENCY_POLICY_CANONICAL_HEADING;
    const start = content.indexOf(heading);
    assert(start >= 0, `Fixture negativa sem bloco de consistência para remover: ${label}`);

    const nextHeading = content.indexOf("\n## ", start + heading.length);
    const end = nextHeading >= 0 ? nextHeading + 1 : content.length;
    return content.slice(0, start) + content.slice(end);
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeProtocolFixedConsistencyHeading(content) {
    const lineBreak = content.includes("\r\n") ? "\r\n" : "\n";
    const lines = content.split(/\r?\n/);
    const hasCanonicalHeading = lines.some((line) => line.trim() === CONSISTENCY_POLICY_CANONICAL_HEADING);
    let repairedLegacyHeading = false;

    const normalizedLines = [];

    for (const line of lines) {
        if (line.trim() !== CONSISTENCY_POLICY_LEGACY_MARKER) {
            normalizedLines.push(line);
            continue;
        }

        if (!hasCanonicalHeading && !repairedLegacyHeading) {
            normalizedLines.push(CONSISTENCY_POLICY_CANONICAL_HEADING);
            repairedLegacyHeading = true;
        }
    }

    return normalizedLines.join(lineBreak);
}

function withLegacyConsistencyHeadingFixture(content) {
    assert(
        content.includes(CONSISTENCY_POLICY_CANONICAL_HEADING),
        "Fixture de variante legada não encontrou heading canônico para substituir"
    );

    return content.replace(CONSISTENCY_POLICY_CANONICAL_HEADING, CONSISTENCY_POLICY_LEGACY_MARKER);
}

function assertNoExternalMemoryTermsInText(content, label) {
    for (const bannedTerm of EXTERNAL_MEMORY_HARD_BANS) {
        assert(
            !content.includes(bannedTerm),
            `${label} contém termo proibido de memória externa: ${bannedTerm}`
        );
    }

    for (const bannedTerm of EXTERNAL_MEMORY_SOFT_BANS) {
        assert(
            !content.includes(bannedTerm),
            `${label} contém vocabulário ambíguo; use durable documentation: ${bannedTerm}`
        );
    }
}

function assertNoExternalMemoryTermsInTree(rootDir, label) {
    for (const relativePath of listRelativeFiles(rootDir)) {
        const filePath = path.join(rootDir, relativePath);
        assertNoExternalMemoryTermsInText(fs.readFileSync(filePath, "utf8"), `${label}/${relativePath}`);
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
    const agentName = canonicalAgentIdFromFileName(fileName);
    const frontmatter = {
        name: agentName,
        description: baseFrontmatter.description,
        target: "vscode",
        tools: CONTROLLED_AGENT_TOOLSETS[fileName],
        model: getControlledModelForAgent(agentName),
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
            .map((entry) => canonicalAgentIdFromFileName(entry));
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

function getCodexConfigTemplatePath(agentSkillRoot) {
    const installedTemplatePath = path.join(agentSkillRoot, CODEX_CONFIG_TEMPLATE_RELATIVE_PATH);

    assert(
        fs.existsSync(installedTemplatePath),
        `Template config.toml do target codex não instalado no bundle da skill: ${installedTemplatePath}`
    );

    return installedTemplatePath;
}

function readControlledAgentSourceContent(skillRoot, fileName, options = {}) {
    const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
    const sourceContent = fs.readFileSync(sourcePath, "utf8");

    if (options.legacyConsistencyHeadingFile === fileName) {
        return withLegacyConsistencyHeadingFixture(sourceContent);
    }

    return sourceContent;
}

function materializeControlledAgents(skillRoot, repoRoot, controlledAgentFiles, options = {}) {
    for (const fileName of controlledAgentFiles) {
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = readControlledAgentSourceContent(skillRoot, fileName, options);
        const { data: baseFrontmatter, body } = parseFrontmatter(sourceContent, sourcePath);
        const normalizedBody = fitControlledVscodeFixtureBody(
            normalizeProtocolFixedConsistencyHeading(body),
            fileName
        );
        const specializedFrontmatter = buildSpecializedFrontmatter(
            baseFrontmatter,
            fileName,
            controlledAgentFiles
        );

        writeFile(
            path.join(repoRoot, ".github", "agents", fileName),
            renderFrontmatter(specializedFrontmatter) + normalizedBody
        );
    }
}

function rebuildManagedVscodeAgentsFromCanonical(skillRoot, repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const materializedPath = path.join(repoRoot, ".github", "agents", fileName);

        if (fs.existsSync(materializedPath)) {
            const existingContent = fs.readFileSync(materializedPath, "utf8");
            const { data: existingFrontmatter } = parseFrontmatter(existingContent, materializedPath);
            assert.equal(
                existingFrontmatter.managed_artifact,
                true,
                `Fixture de update gerenciado VS Code recebeu artifact sem managed_artifact: true: ${materializedPath}`
            );
        }

        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const { data: baseFrontmatter, body } = parseFrontmatter(sourceContent, sourcePath);
        const normalizedBody = fitControlledVscodeFixtureBody(
            normalizeProtocolFixedConsistencyHeading(body),
            fileName
        );
        const specializedFrontmatter = buildSpecializedFrontmatter(
            baseFrontmatter,
            fileName,
            controlledAgentFiles
        );

        specializedFrontmatter.specialization_revision = 2;

        writeFile(
            materializedPath,
            renderFrontmatter(specializedFrontmatter) + normalizedBody
        );
    }
}

function fitControlledVscodeFixtureBody(body, fileName) {
    if (fileName !== "orchestrator.agent.md") {
        return body;
    }

    return stripMarkdownSection(
        stripMarkdownSection(body, "## Specialization boundaries"),
        "## Project-specializable part"
    );
}

function fitBackendOnlyVscodeFixtureBody(body, fileName) {
    const fittedBody = fitControlledVscodeFixtureBody(body, fileName);

    if (fittedBody.includes("## Project-specializable part")) {
        return stripMarkdownSection(fittedBody, "## Project-specializable part");
    }

    return fittedBody;
}

function stripMarkdownSection(content, heading) {
    const start = content.indexOf(heading);
    assert(start >= 0, `Fixture sem seção esperada para remover: ${heading}`);

    const nextHeading = content.indexOf("\n## ", start + heading.length);
    const end = nextHeading >= 0 ? nextHeading + 1 : content.length;
    return content.slice(0, start) + content.slice(end);
}

function renderBackendOnlySpecializedBody(body, fileName) {
    const localSpecialization = [
        "## Project specialization",
        "backend-only Node.js/TypeScript service.",
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
        const normalizedBody = fitBackendOnlyVscodeFixtureBody(
            normalizeProtocolFixedConsistencyHeading(body),
            fileName
        );
        const specializedFrontmatter = buildSpecializedFrontmatter(
            baseFrontmatter,
            fileName,
            BACKEND_ONLY_SPECIALIZED_AGENT_FILES
        );

        specializedFrontmatter.specialization_revision = 2;

        writeFile(
            path.join(repoRoot, ".github", "agents", fileName),
            renderFrontmatter(specializedFrontmatter) + renderBackendOnlySpecializedBody(normalizedBody, fileName)
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

function withCodexRoutingRuntimeHardening(agentName, body) {
    const hardening = agentName === "orchestrator"
        ? [
            "## Codex routing runtime",
            "Coordinate the local Sentinel workflow when explicitly invoked as the `orchestrator` custom subagent for Codex.",
            "For Codex, the main/root session is the human-visible workspace entrypoint and must not spawn this `orchestrator` automatically.",
            "Skill/workflow requests are not subagent authorization; `Use stnl_spec_manager` runs in root/main unless the human also explicitly requests a custom subagent by exact agent name.",
            "When the human explicitly requests `Use orchestrator`, this orchestrator owns gate routing and decides the current canonical owner by exact custom agent name.",
            "The root/main session should send only a minimal, task-scoped routing payload.",
            "Do not require full-history fork inheritance.",
            "Read the durable Sentinel contract from `AGENTS.md`, your own developer instructions, and the allowed repository docs/codebase.",
            "Never accept a full Sentinel contract pasted into a normal prompt as a substitute for native custom-agent spawning.",
            "Codex Parent-Mediated Routing Contract.",
            "The orchestrator must return a compact ROUTE_PACKET naming the next canonical owner.",
            "The orchestrator must not spawn downstream Sentinel owners directly.",
            "The root/main session then spawns the named owner as a native custom subagent by exact custom agent name.",
            "The root/main must not choose owners on its own except from a valid ROUTE_PACKET.",
            "This preserves the Codex primary visual layer and avoids nested owner threads.",
            "After the owner returns compactly, root/main must return to orchestrator for the next routing decision.",
            "ROUTE_PACKET shape: STATUS, CURRENT_GATE, NEXT_OWNER, REASON, PAYLOAD, and BLOCKER only when real.",
            "ROUTE_PACKET must be compact and must not include full artifacts, full contracts, SPEC/checklist/logs/diffs, or broad transcript history.",
            "Use native Codex custom subagent spawning by exact custom agent name for Sentinel handoff when explicitly authorized from root/main after ROUTE_PACKET.",
            "A refused full-history fork is not itself failure when Codex still creates a native requested agent thread.",
            "Wait for the owner result from root/main before deciding the next gate.",
            "You must never use full-contract prompt replay, `codex exec`, `codex`, shell/subprocess/script/local continuation, or local role absorption to simulate handoff.",
            "You must never use `codex exec`, shell/subprocess/script/local continuation, or local role absorption to simulate handoff.",
            "Never absorb downstream Sentinel roles locally.",
            "If native custom-agent spawning cannot create an explicitly requested agent thread, root/main cannot spawn the owner named in a valid ROUTE_PACKET, depth/config blocks routing, or the named custom agent is unavailable, stop with `ROUTING_RUNTIME_BLOCKED`.",
            "`ROUTING_RUNTIME_BLOCKED` must include attempted owner, current gate, missing runtime capability or config, and minimum DEV action needed.",
        ]
        : [
            "## Codex routing runtime",
            "You must not spawn downstream Sentinel agents.",
            "You must not call `codex exec` for handoff.",
            "You must not use shell/subprocess/script to perform handoff.",
            "You must return owned artifact/status/formal handoff signal to root/main for parent-mediated orchestrator routing.",
            "\"handoff to X\" means a formal signal for root/main-mediated orchestrator routing, not direct spawning.",
        ];

    const compactReturnContract = [
        "## Compact Agent Return Contract",
        "Subagent returns must be compact and gate-oriented: return only the minimum needed for the parent to decide the next gate.",
        "Default return shape: `STATUS`, `OWNER`, `GATE`, `FILES_CHANGED`, `NEXT_OWNER`, `VALIDATIONS`, `BLOCKER` only when real, and `NOTES` with max 3 short bullets.",
        "Do not repeat the full Sentinel contract.",
        "Do not paste full SPEC, checklist, logs, or diffs.",
        "Do not paste complete artifacts into chat when they were written to files; return artifact path plus compact summary.",
        "Expand only on blocker, failure, critical validation evidence, or explicit human request.",
        "Keep the main chat focused on routing/status deltas.",
    ];

    return `${hardening.join("\n")}\n\n${compactReturnContract.join("\n")}\n\n${body}`;
}

function materializeControlledCodexAgents(skillRoot, repoRoot, controlledAgentFiles, options = {}) {
    const agentNames = controlledAgentFiles.map((fileName) => canonicalAgentIdFromFileName(fileName));

    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const sandboxMode = EXPECTED_CODEX_AGENT_SANDBOX_MODE[agentName];
        const modelReasoningEffort = EXPECTED_CODEX_AGENT_REASONING_EFFORT[agentName];
        assert(sandboxMode, `Sandbox Codex esperado não mapeado para agent controlado: ${agentName}`);
        assert(modelReasoningEffort, `Effort Codex esperado não mapeado para agent controlado: ${agentName}`);

        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const sourceContent = readControlledAgentSourceContent(skillRoot, fileName, options);
        const { data: baseFrontmatter, body } = parseFrontmatter(sourceContent, sourcePath);
        const normalizedBody = withCodexRoutingRuntimeHardening(
            agentName,
            normalizeProtocolFixedConsistencyHeading(body)
        );
        const tomlContent = renderCodexAgentToml({
            name: agentName,
            description: baseFrontmatter.description,
            model: getControlledModelForAgent(agentName),
            model_reasoning_effort: modelReasoningEffort,
            sandbox_mode: sandboxMode,
            developer_instructions: normalizedBody,
        }, sourcePath);

        writeFile(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), tomlContent);
    }

    const templatePath = getCodexAgentsTemplatePath(skillRoot);
    const template = fs.readFileSync(templatePath, "utf8");
    writeFile(path.join(repoRoot, "AGENTS.md"), renderCodexAgentsIndex(template, agentNames));

    const configTemplatePath = getCodexConfigTemplatePath(skillRoot);
    const configTemplate = fs.readFileSync(configTemplatePath, "utf8");
    writeFile(path.join(repoRoot, ".codex", "config.toml"), configTemplate);
}

function rebuildManagedCodexAgentsFromCanonical(skillRoot, repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const materializedPath = path.join(repoRoot, ".codex", "agents", `${agentName}.toml`);

        if (!fs.existsSync(materializedPath)) {
            continue;
        }

        const existingContent = fs.readFileSync(materializedPath, "utf8");
        assert(
            existingContent.startsWith("# Sentinel managed artifact: true\n"),
            `Fixture de update gerenciado Codex recebeu artifact sem header gerenciado: ${materializedPath}`
        );
    }

    materializeControlledCodexAgents(skillRoot, repoRoot, controlledAgentFiles);
}

function assertControlledContextMaterialization(repoRoot) {
    for (const spec of CONTROLLED_CONTEXT_DOC_SPECS) {
        const filePath = path.join(repoRoot, spec.targetPath);
        const content = assertFileHasRequiredShape(filePath, spec.requiredSnippets);
        assertFilePurposeHeaderFields(content, `context doc materializado ${spec.targetPath}`);

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
        const content = assertFileHasRequiredShape(path.join(skillRoot, spec.relativePath), spec.requiredSnippets);
        assertFilePurposeHeaderFields(content, `reference doc instalado ${spec.relativePath}`);
    }
}

function assertVscodeOperationalIdentity(materializedAgentRecords) {
    const frontmatterNames = new Set(materializedAgentRecords.map(({ frontmatter }) => frontmatter.name));
    const orchestratorRecord = materializedAgentRecords.find(({ agentId }) => agentId === "orchestrator");

    assert(orchestratorRecord, "orchestrator materializado ausente da validação de identidade operacional");
    assert.equal(
        frontmatterNames.size,
        materializedAgentRecords.length,
        "Identidade operacional duplicada em agents materializados vscode"
    );

    for (const { agentId, fileName, frontmatter, materializedPath } of materializedAgentRecords) {
        assert.equal(
            frontmatter.name,
            agentId,
            `Identidade operacional inválida em ${materializedPath}: frontmatter.name deve ser exatamente ${agentId}, sem display name humanizado`
        );
        assert(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.name),
            `frontmatter.name humanizado ou fora de kebab-case no agent ${fileName}: ${frontmatter.name}`
        );
    }

    assert(Array.isArray(orchestratorRecord.frontmatter.agents), "orchestrator.agents deve ser lista em vscode");

    if (orchestratorRecord.frontmatter.agents.length > 0) {
        assert(
            orchestratorRecord.frontmatter.tools.includes("agent"),
            "orchestrator com agents deve incluir a tool agent"
        );
    }

    for (const referencedAgent of orchestratorRecord.frontmatter.agents) {
        assert(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(referencedAgent),
            `orchestrator.agents contém referência humanizada ou fora de kebab-case: ${referencedAgent}`
        );
        assert.notEqual(
            referencedAgent,
            "orchestrator",
            "orchestrator.agents não deve referenciar o próprio orchestrator"
        );
        assert(
            frontmatterNames.has(referencedAgent),
            `orchestrator.agents referencia agent sem frontmatter.name materializado correspondente: ${referencedAgent}`
        );
    }
}

function collectVscodeOperationalIdentityRecords(repoRoot, agentFiles) {
    return agentFiles.map((fileName) => {
        const agentId = canonicalAgentIdFromFileName(fileName);
        const materializedPath = path.join(repoRoot, ".github", "agents", fileName);
        const content = fs.readFileSync(materializedPath, "utf8");
        const { data: frontmatter } = parseFrontmatter(content, materializedPath);

        return {
            agentId,
            fileName,
            frontmatter,
            materializedPath,
        };
    });
}

function assertControlledAgentMaterialization(skillRoot, repoRoot, controlledAgentFiles) {
    const materializedAgentNames = controlledAgentFiles.map((entry) => canonicalAgentIdFromFileName(entry));
    const materializedAgentRecords = [];

    for (const fileName of controlledAgentFiles) {
        const sourcePath = path.join(skillRoot, "reference", "agents", fileName);
        const materializedPath = path.join(repoRoot, ".github", "agents", fileName);
        const agentId = canonicalAgentIdFromFileName(fileName);
        const sourceContent = fs.readFileSync(sourcePath, "utf8");
        const materializedContent = assertFileHasRequiredShape(materializedPath, REQUIRED_AGENT_BODY_SNIPPETS);
        assertNoExternalMemoryTermsInText(sourceContent, `reference agent ${fileName}`);
        assertNoExternalMemoryTermsInText(materializedContent, `vscode agent materializado ${fileName}`);
        const { data: sourceFrontmatter } = parseFrontmatter(sourceContent, sourcePath);
        const { data: materializedFrontmatter } = parseFrontmatter(materializedContent, materializedPath);
        materializedAgentRecords.push({
            agentId,
            fileName,
            frontmatter: materializedFrontmatter,
            materializedPath,
        });

        assert(materializedFrontmatter.name, `Agent especializado sem name: ${materializedPath}`);
        assert(materializedFrontmatter.description, `Agent especializado sem description: ${materializedPath}`);
        assert.equal(
            materializedFrontmatter.target,
            "vscode",
            `Agent especializado sem target canônico: ${materializedPath}`
        );
        assertValidControlledModel(
            materializedFrontmatter.model,
            `vscode agent ${materializedPath}`
        );
        for (const effortKey of OPERATIONAL_EFFORT_FRONTMATTER_KEYS) {
            assert(
                !Object.hasOwn(materializedFrontmatter, effortKey),
                `Agent VS Code/GitHub não deve serializar effort operacional no frontmatter (${effortKey}): ${materializedPath}`
            );
        }
        assert(
            materializedContent.length <= VSCODE_AGENT_MARKDOWN_CHAR_LIMIT,
            `Agent VS Code/GitHub excede ${VSCODE_AGENT_MARKDOWN_CHAR_LIMIT} caracteres: ${materializedPath}`
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
            "model",
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

    assertVscodeOperationalIdentity(materializedAgentRecords);
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
        "REQUIRED_QUALITY_GUARDRAILS",
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
        assert(content.includes("Stack quality guardrail use"), `${coderFile} não aplica stack quality guardrails`);
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
    const referenceAgentsRoot = path.join(skillRoot, "reference", "agents");
    const referenceAgentFiles = listRelativeFiles(referenceAgentsRoot)
        .filter((entry) => entry.endsWith(".agent.md"))
        .sort();
    const agentContents = new Map(
        referenceAgentFiles.map((fileName) => [
            fileName,
            fs.readFileSync(path.join(referenceAgentsRoot, fileName), "utf8"),
        ])
    );

    for (const [fileName, content] of agentContents.entries()) {
        assertSingleConsistencyPolicyBlock(content, `${fileName} reference consistency policy`);
        assert(
            content.includes("Compact Agent Return Contract"),
            `${fileName} reference sem Compact Agent Return Contract`
        );
    }

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
        "invalid preparation handoff",
        "intermediate progress update",
        "valid executor `READY`",
        "Activate stack quality guardrails as downstream constraints",
        "CORRECTION PACK",
        "each slice or round has at most 2 automatic correction rounds",
        "the same `fingerprint` or `root_cause` may receive at most 1 automatic correction attempt",
        "It may reuse the current `EXECUTION PACKAGE` only when the correction clearly remains in the same `WORK_PACKAGE_ID`",
        "If the correction changes boundary, ownership, `DO_NOT_TOUCH`, expected validation, relevant risk, probable files/surfaces, or execution scope",
        "Automatic correction cannot bypass package design",
        "do not treat a missing, implicit, ambiguous, intermediate, narrative, or evidence-free executor handoff as operational success",
        "Every terminal round outcome must pass through `finalizer.agent.md`",
    ], "orchestrator consumer-side rejection");

    assertContentIncludesAll(agentContents.get("planner.agent.md"), [
        "Stack quality guardrail detection",
        "Do not rewrite the guardrail content",
        "do not treat guardrails as agents",
        "NEEDS_DEV_DECISION_BASE",
        "exactly the missing decision or fact needed to unblock the `EXECUTION BRIEF`",
    ], "planner stack quality guardrail detection");

    assertContentIncludesAll(agentContents.get("validation-eval-designer.agent.md"), [
        "Stack quality guardrail proof design",
        "convert only cut-relevant guardrail implications",
        "Do not paste full guardrails or add unrelated ones by reflex",
        "separates pre-execution proof design from post-execution validation",
        "Do not label weak proof as clean readiness",
    ], "validation-eval-designer stack quality guardrail proof design");

    assertContentIncludesAll(agentContents.get("execution-package-designer.agent.md"), [
        "PRE_EXECUTION_READINESS",
        "APPLICABLE_QUALITY_GUARDRAILS",
        "NON_APPLICABLE_QUALITY_GUARDRAILS",
        "MUST_NOT_CHANGE",
        "does not run tests against new code",
        "orchestrator-routed `CORRECTION PACK`",
        "Do not transfer ambiguity to coder",
    ], "execution-package-designer pre-execution readiness");

    assertContentIncludesAll(agentContents.get("validation-runner.agent.md"), [
        "valid executor `READY` handoff",
        "`Entry evidence gate`",
        "not a validation target",
        "Stack quality guardrail checks",
        "emit exactly one `CORRECTION PACK` block to the orchestrator before terminal closure",
        "The block heading must be exactly `CORRECTION PACK`",
        "Do not emit a narrative correction request outside `CORRECTION PACK`",
        "When emitting `CORRECTION PACK`, do not emit `PASS`, `PARTIAL`, `FAIL`, or `BLOCKED` in the same handoff",
        "Preserve that the runner could not honestly enter because the executor handoff was invalid",
    ], "validation-runner artifact gate");

    assertContentIncludesAll(agentContents.get("reviewer.agent.md"), [
        "Stack quality guardrail review",
        "Do not invoke unrelated guardrails by reflex",
        "return exactly one formal `CORRECTION PACK` block to `orchestrator.agent.md`",
        "The block heading must be exactly `CORRECTION PACK`",
        "When emitting `CORRECTION PACK`, do not emit `PASS` or `FAIL` in the same handoff",
        "material structural risk",
    ], "reviewer stack quality guardrail review");

    assertContentIncludesAll(agentContents.get("finalizer.agent.md"), [
        "closure ledger",
        "`DONE: yes/no`",
        "`DONE: yes` or `DONE: no`",
        "`resync: yes/no`",
        "`resync: yes` or `resync: no`",
        "does not mean the runner verdict was `PASS`",
        "Stack quality guardrail closure",
        "`Invalid closure forms`",
        "residual correction pack",
        "correction budget exhaustion",
    ], "finalizer explicit closure");
}

function assertProtocolHardeningInTemplateAgents() {
    const templateAgentsRoot = path.join(ROOT, "templates", "agents");
    const templateAgentFiles = listRelativeFiles(templateAgentsRoot)
        .filter((entry) => entry.endsWith(".agent.md"))
        .sort();

    assert(templateAgentFiles.length > 0, "Nenhum template agent encontrado para validar policy protocol-fixed");

    for (const fileName of templateAgentFiles) {
        const content = fs.readFileSync(path.join(templateAgentsRoot, fileName), "utf8");
        assertSingleConsistencyPolicyBlock(content, `${fileName} template consistency policy`);
        assert(
            content.includes("Compact Agent Return Contract"),
            `${fileName} template sem Compact Agent Return Contract`
        );
    }

    const designerContent = fs.readFileSync(path.join(templateAgentsRoot, "designer.agent.md"), "utf8");
    assertContentIncludesAll(designerContent, [
        "role class: `design-contributor`",
    ], "templates/agents/designer.agent.md role class");
    assertContentExcludesAll(designerContent, [
        "role class: `executor`",
        "role class: executor",
        "executor-class specialist",
    ], "templates/agents/designer.agent.md role class drift");
}

function assertBaseAgentTemplateSizeLimit() {
    const templateAgentsRoot = path.join(ROOT, "templates", "agents");
    const oversizedAgents = listRelativeFiles(templateAgentsRoot)
        .filter((entry) => entry.endsWith(".agent.md"))
        .sort()
        .map((relativePath) => {
            const templatePath = path.join(templateAgentsRoot, relativePath);
            return {
                relativePath: path.join("templates", "agents", relativePath),
                size: fs.readFileSync(templatePath, "utf8").length,
            };
        })
        .filter((entry) => entry.size > BASE_AGENT_TEMPLATE_CHAR_LIMIT);

    assert.equal(
        oversizedAgents.length,
        0,
        [
            `Base agent template excede ${BASE_AGENT_TEMPLATE_CHAR_LIMIT} caracteres:`,
            ...oversizedAgents.map((entry) => `${entry.relativePath}: ${entry.size}`),
        ].join("\n")
    );
}

function assertCorrectionLoopPolicyInTemplateDocs() {
    const lifecycleContent = fs.readFileSync(
        path.join(ROOT, "templates", "docs", "workflow", "EXECUTION-LIFECYCLE.md"),
        "utf8"
    );
    const statusGatesContent = fs.readFileSync(
        path.join(ROOT, "templates", "docs", "workflow", "STATUS-GATES.md"),
        "utf8"
    );

    assertContentIncludesAll(lifecycleContent, [
        "Problemas corrigíveis dentro do escopo aprovado devem voltar ao `orchestrator` antes de virarem fechamento terminal",
        "marcador literal `CORRECTION PACK`",
        "não podem emitir verdict/status terminal no mesmo handoff",
        "cada slice/rodada pode ter no máximo 2 correction rounds automáticos",
        "mesmo `WORK_PACKAGE_ID`, mesmos boundaries, mesmo ownership",
        "Se a correção alterar boundary, ownership, `DO_NOT_TOUCH`, validação esperada, risco relevante",
        "Correção automática não pode virar bypass do package design",
        "Correction round é correção mínima, não replanejamento, redesign ou refactor amplo",
        "valida se o handoff está pronto para execução",
    ], "templates/docs/workflow/EXECUTION-LIFECYCLE.md correction loop");

    assertContentIncludesAll(statusGatesContent, [
        "bloco formal `CORRECTION PACK`",
        "nem handoff que combine `CORRECTION PACK` com verdict/status terminal",
        "O `orchestrator` decide se o `CORRECTION PACK` é corrigível automaticamente dentro do escopo",
        "O `EXECUTION PACKAGE` vigente só pode ser reutilizado quando a correção permanecer no mesmo `WORK_PACKAGE_ID`",
        "Se a correção alterar boundary, ownership, `DO_NOT_TOUCH`, validação esperada, risco relevante",
        "correção automática não pode virar bypass do package design",
        "refactor amplo",
        "preservando correction pack residual e evidência",
        "Esse gate valida handoff/readiness, não roda teste de código novo",
    ], "templates/docs/workflow/STATUS-GATES.md correction loop");
}

function assertProtocolHardeningInCanonicalRefs(skillRoot) {
    const skillContent = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
    assertContentIncludesAll(skillContent, [
        "- `design-contributor`: `designer`",
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
        "Contrato operacional de `model` e effort",
        "nunca entregar agent gerenciado sem `model`",
        "`model_reasoning_effort` é obrigatório",
        "Consistency without legacy propagation",
        "Seguir o padrão do projeto não significa copiar dívida técnica",
        "Do not copy fragile, duplicated, insecure, accidental, or legacy project patterns into new code just because they exist.",
        "a propagação protocol-fixed deve ser validada comparando template/base agent canônico, `reference/agents/*.agent.md` instalado e artifact final materializado do target",
        "Agents materializados são artifacts gerenciados, não documentos locais autoritativos do contrato Sentinel.",
        "reconstruir o artifact final a partir do template/base agent canônico atual listado em `reference/MANIFEST.md`",
        "bump de `base_agent_version`, `specialization_revision`, `model` ou metadata nunca é update suficiente quando o corpo canônico mudou",
        "nunca entregar artifact híbrido com contrato antigo e contrato novo misturados",
        "REQUIRED_QUALITY_GUARDRAILS",
        "stnl_frontend_quality",
        "stnl_backend_sql_quality",
        ...COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS,
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
        "todo artifact gerenciado materializa `model`",
        "Consistency without legacy propagation check",
        "Managed artifact canonical rebuild check",
        "reviewer` materializado usa somente `PASS` e `FAIL` como status do papel",
        "update de artifact gerenciado que altera apenas metadata",
        "Stack quality guardrail propagation check",
        "frases sentinela de consistencia presentes no template/base ou reference agent mas ausentes de `developer_instructions` em Codex",
        "compactacao ou normalizacao remove bloco protocol-fixed para caber no limite de 30.000 caracteres",
        ...COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS,
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
        "REQUIRED_QUALITY_GUARDRAILS",
        "## Contrato das stack quality guardrails",
        "Toda rodada terminal passa obrigatoriamente pelo `finalizer`",
        "`finalizer READY` exige closure ledger explícito",
    ], "execution lifecycle hardening");
}

function assertProtocolHardeningInMaterializedAgents(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const content = fs.readFileSync(path.join(repoRoot, ".github", "agents", fileName), "utf8");

        assertSingleConsistencyPolicyBlock(content, `${fileName} vscode consistency policy`);

        if (["coder-backend.agent.md", "coder-frontend.agent.md", "coder-ios.agent.md"].includes(fileName)) {
            assertContentIncludesAll(content, [
                "No other terminal handoff is valid.",
                "`Terminal handoff contract`",
                "`Partial-edit blocking`",
                "`Invalid terminal forms`",
                "Stack quality guardrail use",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "orchestrator.agent.md") {
            assertContentIncludesAll(content, [
                "EXECUTOR_HANDOFF_INVALID",
                "valid executor `READY`",
                "Activate stack quality guardrails as downstream constraints",
                "do not treat a missing, implicit, ambiguous, intermediate, narrative, or evidence-free executor handoff as operational success",
                "Every terminal round outcome must pass through `finalizer.agent.md`",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "planner.agent.md") {
            assertContentIncludesAll(content, [
                "Stack quality guardrail detection",
                "Do not rewrite the guardrail content",
                "do not treat guardrails as agents",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "validation-eval-designer.agent.md") {
            assertContentIncludesAll(content, [
                "Stack quality guardrail proof design",
                "convert only cut-relevant guardrail implications",
                "Do not paste full guardrails or add unrelated ones by reflex",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "validation-runner.agent.md") {
            assertContentIncludesAll(content, [
                "valid executor `READY` handoff",
                "`Entry evidence gate`",
                "not a validation target",
                "Stack quality guardrail checks",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "reviewer.agent.md") {
            assertContentIncludesAll(content, [
                "Stack quality guardrail review",
                "Do not invoke unrelated guardrails by reflex",
                "material structural risk",
            ], `${fileName} vscode hardening`);
        }

        if (fileName === "finalizer.agent.md") {
            assertContentIncludesAll(content, [
                "closure ledger",
                "`DONE: yes/no`",
                "`DONE: yes` or `DONE: no`",
                "`resync: yes/no`",
                "`resync: yes` or `resync: no`",
                "Stack quality guardrail closure",
                "`Invalid closure forms`",
            ], `${fileName} vscode hardening`);
        }
    }
}

function assertProtocolHardeningInCodexAgents(repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const content = fs.readFileSync(path.join(repoRoot, ".codex", "agents", `${agentName}.toml`), "utf8");
        const parsed = parseToml(content, `${agentName}.toml`);
        const instructions = parsed.developer_instructions;

        assertSingleConsistencyPolicyBlock(instructions, `${agentName} codex developer_instructions consistency policy`);
        assertContentIncludesAll(
            instructions,
            COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS,
            `${agentName} codex compact return contract`
        );
        assertContentExcludesAll(
            instructions,
            COMPACT_AGENT_RETURN_FORBIDDEN_SNIPPETS,
            `${agentName} codex compact return forbidden regressions`
        );

        if (agentName === "orchestrator") {
            assertContentIncludesAll(instructions, [
                "main/root session is the human-visible workspace entrypoint",
                "must not spawn this `orchestrator` automatically",
                "Skill/workflow requests are not subagent authorization",
                "`Use stnl_spec_manager`",
                "When the human explicitly requests `Use orchestrator`",
                "minimal, task-scoped routing payload",
                "Do not require full-history fork inheritance.",
                "durable Sentinel contract from `AGENTS.md`",
                "Never accept a full Sentinel contract pasted into a normal prompt",
                "Codex Parent-Mediated Routing Contract",
                "owns gate routing and decides the current canonical owner by exact custom agent name",
                "orchestrator must return a compact ROUTE_PACKET",
                "orchestrator must not spawn downstream Sentinel owners directly",
                "root/main session then spawns the named owner",
                "root/main must not choose owners on its own except from a valid ROUTE_PACKET",
                "preserves the Codex primary visual layer",
                "avoids nested owner threads",
                "return to orchestrator for the next routing decision",
                "native Codex custom subagent spawning",
                "exact custom agent name",
                "refused full-history fork is not itself failure",
                "native requested agent thread",
                "Wait for the owner result from root/main",
                "full-contract prompt replay",
                "never use `codex exec`",
                "shell/subprocess/script/local continuation",
                "If native custom-agent spawning cannot create an explicitly requested agent thread",
                "root/main cannot spawn the owner named in a valid ROUTE_PACKET",
                "Never absorb downstream Sentinel roles locally.",
                "ROUTING_RUNTIME_BLOCKED",
            ], `${agentName} codex routing runtime hardening`);
            assertContentExcludesAll(instructions, [
                "If explicitly invoked as a custom subagent",
                "not the default visual entrypoint",
                "default first Sentinel subagent for Codex",
                "must request this `orchestrator` as the default first Sentinel subagent",
                "Do not claim that invoking `orchestrator` as a subagent is the default UI path.",
                "pass the full contract in the prompt",
                "preserves native handoff by name",
                "call the orchestrator without fork and pass the full contract",
                "full-history fork is required",
                "continue locally as orchestrator",
                "local continuation as orchestrator",
                ...CODEX_PARENT_MEDIATED_ROUTING_FORBIDDEN_SNIPPETS,
            ], `${agentName} codex routing runtime default entrypoint regression`);
        } else {
            assertContentIncludesAll(instructions, [
                "must not spawn downstream Sentinel agents",
                "must not call `codex exec` for handoff",
                "must not use shell/subprocess/script to perform handoff",
                "return owned artifact/status/formal handoff signal to root/main for parent-mediated orchestrator routing",
                "\"handoff to X\" means a formal signal for root/main-mediated orchestrator routing, not direct spawning",
            ], `${agentName} codex routing runtime hardening`);
        }

        if (["coder-backend", "coder-frontend", "coder-ios"].includes(agentName)) {
            assertContentIncludesAll(instructions, [
                "No other terminal handoff is valid.",
                "`Terminal handoff contract`",
                "`Partial-edit blocking`",
                "`Invalid terminal forms`",
                "Stack quality guardrail use",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "orchestrator") {
            assertContentIncludesAll(instructions, [
                "EXECUTOR_HANDOFF_INVALID",
                "valid executor `READY`",
                "Activate stack quality guardrails as downstream constraints",
                "do not treat a missing, implicit, ambiguous, intermediate, narrative, or evidence-free executor handoff as operational success",
                "Every terminal round outcome must pass through `finalizer.agent.md`",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "planner") {
            assertContentIncludesAll(instructions, [
                "Stack quality guardrail detection",
                "Do not rewrite the guardrail content",
                "do not treat guardrails as agents",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "validation-eval-designer") {
            assertContentIncludesAll(instructions, [
                "Stack quality guardrail proof design",
                "convert only cut-relevant guardrail implications",
                "Do not paste full guardrails or add unrelated ones by reflex",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "validation-runner") {
            assertContentIncludesAll(instructions, [
                "valid executor `READY` handoff",
                "`Entry evidence gate`",
                "not a validation target",
                "Stack quality guardrail checks",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "reviewer") {
            assertContentIncludesAll(instructions, [
                "Stack quality guardrail review",
                "Do not invoke unrelated guardrails by reflex",
                "material structural risk",
            ], `${agentName} codex hardening`);
        }

        if (agentName === "finalizer") {
            assertContentIncludesAll(instructions, [
                "closure ledger",
                "`DONE: yes/no`",
                "`DONE: yes` or `DONE: no`",
                "`resync: yes/no`",
                "`resync: yes` or `resync: no`",
                "Stack quality guardrail closure",
                "`Invalid closure forms`",
            ], `${agentName} codex hardening`);
        }
    }
}

function assertConsistencyPolicyPropagationToVscodeAgents(skillRoot, repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const templatePath = path.join(ROOT, "templates", "agents", fileName);
        const referencePath = path.join(skillRoot, "reference", "agents", fileName);
        const materializedPath = path.join(repoRoot, ".github", "agents", fileName);
        const templateContent = fs.readFileSync(templatePath, "utf8");
        const referenceContent = fs.readFileSync(referencePath, "utf8");
        const materializedContent = fs.readFileSync(materializedPath, "utf8");

        assertSingleConsistencyPolicyBlock(templateContent, `${fileName} template consistency policy`);
        assertSingleConsistencyPolicyBlock(referenceContent, `${fileName} reference consistency policy`);
        assertSingleConsistencyPolicyBlock(materializedContent, `${fileName} vscode materialized consistency policy`);
    }
}

function assertConsistencyPolicyPropagationToCodexAgents(skillRoot, repoRoot, controlledAgentFiles) {
    for (const fileName of controlledAgentFiles) {
        const agentName = canonicalAgentIdFromFileName(fileName);
        const templatePath = path.join(ROOT, "templates", "agents", fileName);
        const referencePath = path.join(skillRoot, "reference", "agents", fileName);
        const materializedPath = path.join(repoRoot, ".codex", "agents", `${agentName}.toml`);
        const templateContent = fs.readFileSync(templatePath, "utf8");
        const referenceContent = fs.readFileSync(referencePath, "utf8");
        const materializedContent = fs.readFileSync(materializedPath, "utf8");
        const parsed = parseToml(materializedContent, materializedPath);

        assertSingleConsistencyPolicyBlock(templateContent, `${fileName} template consistency policy`);
        assertSingleConsistencyPolicyBlock(referenceContent, `${fileName} reference consistency policy`);
        assertSingleConsistencyPolicyBlock(
            parsed.developer_instructions,
            `${agentName} codex developer_instructions consistency policy`
        );
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
        assertValidControlledModel(
            materializedFrontmatter.model,
            `backend-only vscode agent ${materializedPath}`
        );
        for (const effortKey of OPERATIONAL_EFFORT_FRONTMATTER_KEYS) {
            assert(
                !Object.hasOwn(materializedFrontmatter, effortKey),
                `Backend-only VS Code/GitHub não deve serializar effort operacional no frontmatter (${effortKey}): ${materializedPath}`
            );
        }
        assert(
            content.length <= VSCODE_AGENT_MARKDOWN_CHAR_LIMIT,
            `Backend-only VS Code/GitHub excede ${VSCODE_AGENT_MARKDOWN_CHAR_LIMIT} caracteres: ${materializedPath}`
        );
    }

    assertVscodeOperationalIdentity(
        collectVscodeOperationalIdentityRecords(repoRoot, BACKEND_ONLY_SPECIALIZED_AGENT_FILES)
    );
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

function assertConsistencyPolicyRejectsVscodeMaterializationDrift(skillRoot, controlledAgentFiles) {
    const weakRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-vscode-no-consistency-"));

    try {
        createControlledFixtureRepo(weakRepoRoot);
        materializeControlledAgents(skillRoot, weakRepoRoot, controlledAgentFiles);

        const driftFileName = "coder-backend.agent.md";
        const driftPath = path.join(weakRepoRoot, ".github", "agents", driftFileName);
        const driftContent = fs.readFileSync(driftPath, "utf8");
        writeFile(driftPath, stripConsistencyPolicyBlock(driftContent, driftPath));

        assert.throws(
            () => assertConsistencyPolicyPropagationToVscodeAgents(skillRoot, weakRepoRoot, controlledAgentFiles),
            /não contém o invariante esperado/,
            "Validação protocol-fixed deveria rejeitar VS Code/GitHub final sem Consistency without legacy propagation"
        );
    } finally {
        fs.rmSync(weakRepoRoot, { recursive: true, force: true });
    }
}

function assertConsistencyPolicyRejectsCodexMaterializationDrift(skillRoot, controlledAgentFiles) {
    const weakRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-codex-no-consistency-"));

    try {
        createControlledFixtureRepo(weakRepoRoot);
        materializeControlledCodexAgents(skillRoot, weakRepoRoot, controlledAgentFiles);

        const driftAgentName = "coder-backend";
        const driftPath = path.join(weakRepoRoot, ".codex", "agents", `${driftAgentName}.toml`);
        const driftContent = fs.readFileSync(driftPath, "utf8");
        const parsed = parseToml(driftContent, driftPath);
        writeFile(driftPath, renderCodexAgentToml({
            ...parsed,
            developer_instructions: stripConsistencyPolicyBlock(parsed.developer_instructions, driftPath),
        }, driftPath));

        assert.throws(
            () => assertConsistencyPolicyPropagationToCodexAgents(skillRoot, weakRepoRoot, controlledAgentFiles),
            /não contém o invariante esperado/,
            "Validação protocol-fixed deveria rejeitar Codex final sem Consistency without legacy propagation em developer_instructions"
        );
    } finally {
        fs.rmSync(weakRepoRoot, { recursive: true, force: true });
    }
}

function assertConsistencyPolicyRepairsLegacyVscodeMaterialization(skillRoot, controlledAgentFiles) {
    const repairedRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-vscode-legacy-consistency-"));

    try {
        createControlledFixtureRepo(repairedRepoRoot);
        materializeControlledAgents(skillRoot, repairedRepoRoot, controlledAgentFiles, {
            legacyConsistencyHeadingFile: LEGACY_CONSISTENCY_HEADING_FIXTURE_FILE,
        });

        const repairedPath = path.join(repairedRepoRoot, ".github", "agents", LEGACY_CONSISTENCY_HEADING_FIXTURE_FILE);
        const repairedContent = fs.readFileSync(repairedPath, "utf8");

        assertSingleConsistencyPolicyBlock(
            repairedContent,
            `${LEGACY_CONSISTENCY_HEADING_FIXTURE_FILE} vscode legacy consistency repair`
        );
        assertConsistencyPolicyPropagationToVscodeAgents(skillRoot, repairedRepoRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(repairedRepoRoot, { recursive: true, force: true });
    }
}

function assertConsistencyPolicyRepairsLegacyCodexMaterialization(skillRoot, controlledAgentFiles) {
    const repairedRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-materialization-codex-legacy-consistency-"));

    try {
        createControlledFixtureRepo(repairedRepoRoot);
        materializeControlledCodexAgents(skillRoot, repairedRepoRoot, controlledAgentFiles, {
            legacyConsistencyHeadingFile: LEGACY_CONSISTENCY_HEADING_FIXTURE_FILE,
        });

        const agentName = canonicalAgentIdFromFileName(LEGACY_CONSISTENCY_HEADING_FIXTURE_FILE);
        const repairedPath = path.join(repairedRepoRoot, ".codex", "agents", `${agentName}.toml`);
        const repairedContent = fs.readFileSync(repairedPath, "utf8");
        const parsed = parseToml(repairedContent, repairedPath);

        assertSingleConsistencyPolicyBlock(
            parsed.developer_instructions,
            `${agentName} codex legacy consistency repair`
        );
        assertConsistencyPolicyPropagationToCodexAgents(skillRoot, repairedRepoRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(repairedRepoRoot, { recursive: true, force: true });
    }
}

function buildLegacyReviewerBody() {
    return [
        "# Reviewer Agent",
        "",
        "## Mission",
        "Legacy reviewer body kept from an older managed artifact.",
        "",
        "## Status it may emit",
        "- `READY`",
        "- `BLOCKED`",
        "",
        "This stale body mentions newer `PASS` and `FAIL` language elsewhere, making it a hybrid.",
        LEGACY_REVIEWER_STATUS_MARKER,
        "",
        "## Handoff",
        "Legacy handoff text.",
        "",
        "## Reading contract",
        "Legacy reading contract.",
        "",
        "## Consistency without legacy propagation",
        "Do not copy fragile, duplicated, insecure, accidental, or legacy project patterns into new code just because they exist.",
        "",
        "This policy does not authorize broad refactors.",
        "",
    ].join("\n");
}

function writeLegacyManagedVscodeReviewer(repoRoot) {
    const frontmatter = {
        name: "reviewer",
        description: "Legacy managed reviewer fixture.",
        target: "vscode",
        tools: CONTROLLED_AGENT_TOOLSETS["reviewer.agent.md"],
        model: getControlledModelForAgent("reviewer"),
        base_agent_version: "2026.5.0",
        specialization_revision: 1,
        managed_artifact: true,
        reading_scope_class: "review-minimal",
    };

    writeFile(
        path.join(repoRoot, ".github", "agents", "reviewer.agent.md"),
        renderFrontmatter(frontmatter) + buildLegacyReviewerBody()
    );
}

function writeLegacyManagedCodexReviewer(repoRoot) {
    writeFile(
        path.join(repoRoot, ".codex", "agents", "reviewer.toml"),
        renderCodexAgentToml({
            name: "reviewer",
            description: "Legacy managed reviewer fixture.",
            model: getControlledModelForAgent("reviewer"),
            model_reasoning_effort: EXPECTED_CODEX_AGENT_REASONING_EFFORT.reviewer,
            sandbox_mode: EXPECTED_CODEX_AGENT_SANDBOX_MODE.reviewer,
            developer_instructions: buildLegacyReviewerBody(),
        }, "legacy-reviewer.toml")
    );
}

function assertManagedVscodeUpdateRebuildsLegacyReviewer(skillRoot, controlledAgentFiles) {
    const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-managed-update-vscode-"));

    try {
        createControlledFixtureRepo(repoRoot);
        materializeControlledAgents(skillRoot, repoRoot, controlledAgentFiles);
        writeLegacyManagedVscodeReviewer(repoRoot);

        const stalePath = path.join(repoRoot, ".github", "agents", "reviewer.agent.md");
        assert(
            fs.readFileSync(stalePath, "utf8").includes(LEGACY_REVIEWER_STATUS_MARKER),
            "Fixture VS Code deveria começar com reviewer gerenciado legado"
        );

        rebuildManagedVscodeAgentsFromCanonical(skillRoot, repoRoot, controlledAgentFiles);

        const rebuiltContent = fs.readFileSync(stalePath, "utf8");
        const { data: frontmatter } = parseFrontmatter(rebuiltContent, stalePath);
        assert.equal(frontmatter.base_agent_version, "2026.5.1", "reviewer VS Code não atualizou base_agent_version para 2026.5.1");
        assert.equal(frontmatter.specialization_revision, 2, "reviewer VS Code gerenciado não incrementou specialization_revision no update");
        assert(!rebuiltContent.includes(LEGACY_REVIEWER_STATUS_MARKER), "reviewer VS Code preservou corpo legado apos update gerenciado");
        assertVscodeStatusContracts(repoRoot, controlledAgentFiles);
        assertConsistencyPolicyPropagationToVscodeAgents(skillRoot, repoRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(repoRoot, { recursive: true, force: true });
    }
}

function assertManagedCodexUpdateRebuildsLegacyReviewer(skillRoot, controlledAgentFiles) {
    const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-managed-update-codex-"));

    try {
        createControlledFixtureRepo(repoRoot);
        materializeControlledCodexAgents(skillRoot, repoRoot, controlledAgentFiles);
        writeLegacyManagedCodexReviewer(repoRoot);

        const stalePath = path.join(repoRoot, ".codex", "agents", "reviewer.toml");
        assert(
            fs.readFileSync(stalePath, "utf8").includes(LEGACY_REVIEWER_STATUS_MARKER),
            "Fixture Codex deveria começar com reviewer gerenciado legado"
        );

        rebuildManagedCodexAgentsFromCanonical(skillRoot, repoRoot, controlledAgentFiles);

        const rebuiltContent = fs.readFileSync(stalePath, "utf8");
        const parsed = parseToml(rebuiltContent, stalePath);
        assert(!parsed.developer_instructions.includes(LEGACY_REVIEWER_STATUS_MARKER), "reviewer Codex preservou corpo legado apos update gerenciado");
        assertCodexStatusContracts(repoRoot, controlledAgentFiles);
        assertConsistencyPolicyPropagationToCodexAgents(skillRoot, repoRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(repoRoot, { recursive: true, force: true });
    }
}

function assertControlledCodexAgentMaterialization(repoRoot, controlledAgentFiles) {
    const codexAgentsRoot = path.join(repoRoot, ".codex", "agents");
    const expectedAgentNames = controlledAgentFiles
        .map((entry) => canonicalAgentIdFromFileName(entry))
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
        assertNoExternalMemoryTermsInText(content, `codex agent materializado ${relativePath}`);
        const parsed = parseToml(content, materializedPath);
        const agentName = relativePath.replace(/\.toml$/, "");
        const expectedSandboxMode = EXPECTED_CODEX_AGENT_SANDBOX_MODE[agentName];
        const expectedReasoningEffort = EXPECTED_CODEX_AGENT_REASONING_EFFORT[agentName];

        assert.deepEqual(
            Object.keys(parsed).sort(),
            [...SENTINEL_CODEX_TOML_KEYS].sort(),
            `Agent codex controlado deve manter o shape Sentinel esperado: ${materializedPath}`
        );

        for (const key of SENTINEL_CODEX_TOML_KEYS) {
            assert(
                typeof parsed[key] === "string" && parsed[key].trim().length > 0,
                `Agent codex sem ${key} obrigatório: ${materializedPath}`
            );
        }

        assert(
            content.startsWith("# Sentinel managed artifact: true\n"),
            `Agent codex gerenciado deve usar comentario/header seguro, não campo runtime desconhecido: ${materializedPath}`
        );
        assertValidControlledModel(
            parsed.model,
            `codex agent ${materializedPath}`
        );
        assert(expectedReasoningEffort, `Effort Codex esperado não mapeado para agent materializado: ${agentName}`);
        assert.equal(
            parsed.model_reasoning_effort,
            expectedReasoningEffort,
            `Agent codex com model_reasoning_effort divergente: ${materializedPath}`
        );
        assert(expectedSandboxMode, `Sandbox Codex esperado não mapeado para agent materializado: ${agentName}`);
        assert.equal(
            parsed.sandbox_mode,
            expectedSandboxMode,
            `Agent codex com sandbox_mode divergente: ${materializedPath}`
        );
        assert.notEqual(
            parsed.sandbox_mode,
            "danger-full-access",
            `Agent codex não pode usar danger-full-access: ${materializedPath}`
        );
        assert(
            !Object.hasOwn(parsed, "tools"),
            `Agent codex não deve serializar tools no TOML: ${materializedPath}`
        );
        for (const forbiddenKey of ["reasoning_effort", "thinking_effort"]) {
            assert(
                !Object.hasOwn(parsed, forbiddenKey),
                `Agent codex não deve inventar campo operacional de effort (${forbiddenKey}): ${materializedPath}`
            );
        }
        assert(
            !content.includes("danger-full-access"),
            `Agent codex contém danger-full-access no TOML: ${materializedPath}`
        );
    }
}

function assertControlledCodexRuntimeConfig(repoRoot) {
    const configPath = path.join(repoRoot, ".codex", "config.toml");
    assertFileHasRequiredShape(configPath, [
        "# Sentinel managed artifact: true",
        "# target: codex",
        "# source_template: stnl_project_agent_specializer/reference/templates/codex/config.toml",
        "[agents]",
        "max_threads = 6",
        "max_depth = 1",
    ]);

    const content = fs.readFileSync(configPath, "utf8");
    assert(
        !content.includes("max_depth = 2") && !content.includes("max_depth = 3") && !content.includes("max_depth = 4"),
        `Config Codex controlada deve preservar max_depth = 1 e bloquear profundidade 2+: ${configPath}`
    );
}

function assertCodexSourceTemplates() {
    const configTemplatePath = path.join(
        ROOT,
        "skills",
        "stnl_project_agent_specializer",
        "reference",
        "templates",
        "codex",
        "config.toml"
    );
    const agentsTemplatePath = path.join(
        ROOT,
        "skills",
        "stnl_project_agent_specializer",
        "reference",
        "templates",
        "codex",
        "AGENTS.md"
    );
    const configContent = assertFileHasRequiredShape(configTemplatePath, [
        "[agents]",
        "max_threads = 6",
        "max_depth = 1",
    ]);
    assert(
        !configContent.includes("max_depth = 2"),
        `Template Codex config não deve exigir max_depth = 2: ${configTemplatePath}`
    );
    const agentsContent = assertFileHasRequiredShape(agentsTemplatePath, [
        "## File Purpose Header",
        "do_not_use_for: Project facts, SPEC content, execution authorization, work packages, validation evidence, or agent role exactness.",
        "canonical_source_not_for: Individual agent duties, project documentation, Sentinel source contracts, implementation plans, or validation results.",
        "open the target agent TOML for role-specific accuracy",
        "[agents].max_depth = 1",
        ...CODEX_EXPLICIT_SUBAGENT_INVOCATION_SNIPPETS,
        "Codex Parent-Mediated Routing Contract",
        "ROUTE_PACKET",
        "orchestrator must not spawn downstream Sentinel owners directly",
        "root/main session then spawns the named owner",
        "blocking nested owner threads below `orchestrator`",
        "## Local Notes",
        "Local Notes must stay compact and stable.",
        "{{LOCAL_NOTES}}",
    ]);
    assertFilePurposeHeaderFields(agentsContent, "Codex AGENTS.md source template");
    assertContentExcludesAll(agentsContent, [
        "[agents].max_depth = 2",
        "max_depth = 2",
        ...CODEX_PARENT_MEDIATED_ROUTING_FORBIDDEN_SNIPPETS,
    ], "Codex AGENTS.md source template");
}

function assertControlledCodexAgentsIndex(repoRoot, controlledAgentFiles) {
    const agentsIndexPath = path.join(repoRoot, "AGENTS.md");
    const expectedAgentNames = controlledAgentFiles
        .map((entry) => canonicalAgentIdFromFileName(entry))
        .sort();
    const content = assertFileHasRequiredShape(agentsIndexPath, [
        `# ${SMOKE_FIXTURE_REPO_NAME} Agents`,
        "## File Purpose Header",
        "do_not_use_for: Project facts, SPEC content, execution authorization, work packages, validation evidence, or agent role exactness.",
        "canonical_source_not_for: Individual agent duties, project documentation, Sentinel source contracts, implementation plans, or validation results.",
        "open the target agent TOML for role-specific accuracy",
        "## Runtime Contract",
        "## Runtime Hardening",
        "## Managed Agents",
        ".codex/agents/",
        ".codex/config.toml",
        "main/root Codex session is the human-visible workspace entrypoint",
        ...CODEX_EXPLICIT_SUBAGENT_INVOCATION_SNIPPETS,
        "must not depend on full-history fork",
        "minimal, task-scoped routing payload",
        "durable Sentinel instructions must come from",
        "AGENTS.md",
        ".codex/agents/*.toml",
        "Refusing a full-history fork is not itself a routing failure if Codex still creates a native agent thread for the requested custom subagent",
        "prompt-emulated handoff is forbidden",
        "do not call the orchestrator \"without fork\" by pasting the full Sentinel contract",
        "do not claim that such prompt replay preserves native handoff",
        "If explicit subagent authorization exists but native custom-agent spawning cannot create the requested agent thread, stop with `ROUTING_RUNTIME_BLOCKED`",
        "orchestrator` custom subagent is the Sentinel routing controller when explicitly invoked",
        ...CODEX_PARENT_MEDIATED_ROUTING_SNIPPETS,
        "ROUTE_PACKET",
        "STATUS: ROUTE_READY | BLOCKED | TERMINAL",
        "If root/main cannot spawn the owner named in a valid `ROUTE_PACKET`",
        "Direct root-to-owner spawning is not the default Sentinel-governed path",
        "native custom subagent spawn",
        "exact agent name",
        "never emulate handoff with `codex exec`",
        "ROUTING_RUNTIME_BLOCKED",
        "max_depth = 1",
        "blocking nested owner threads below `orchestrator`",
        "## Local Notes",
        "Local Notes must stay compact and stable.",
        "Smoke fixture for controlled Codex materialization.",
        "`model`",
        "`model_reasoning_effort`",
        "`sandbox_mode`",
        "`read-only`",
        "`workspace-write`",
        ...COMPACT_AGENT_RETURN_CONTRACT_SNIPPETS,
    ]);
    assertFilePurposeHeaderFields(content, "AGENTS.md codex materializado");
    assertContentIncludesAll(content, [
        "The `orchestrator` custom subagent is the Sentinel routing controller when explicitly invoked.",
        "Skill/workflow requests are not subagent authorization.",
        "If a requested task cannot be performed safely without a custom subagent and none was explicitly authorized, stop with `SUBAGENT_AUTH_REQUIRED`",
        "The orchestrator must return a compact ROUTE_PACKET naming the next canonical owner.",
        "The orchestrator must not spawn downstream Sentinel owners directly.",
        "The root/main session then spawns the named owner as a native custom subagent by exact custom agent name",
        "Direct root-to-owner spawning is not the default Sentinel-governed path.",
    ], "AGENTS.md codex orchestrator-first contract");
    assertContentExcludesAll(content, [
        "spawn the next owner directly",
        "Do not spawn `orchestrator` as the default first task",
        "The root/main session must spawn the current canonical owner directly.",
        "apply the Sentinel orchestrator boundary itself",
        "passar o contrato completo no prompt",
        "pass the full contract in the prompt",
        "preserva o handoff nativo por nome",
        "preserves native handoff by name",
        "max_depth = 2",
        "call the orchestrator without fork and pass the full contract",
        "full-history fork is required",
        "continue locally as orchestrator",
        "local continuation as orchestrator",
        "For Sentinel-governed work, the main/root Codex session is the human-visible workspace entrypoint, but the default first Sentinel subagent is `orchestrator`",
        "`Use stnl_spec_manager` authorizes `orchestrator`",
        "Skill/workflow requests authorize subagents",
        "spawn custom subagents automatically by description",
        ...CODEX_PARENT_MEDIATED_ROUTING_FORBIDDEN_SNIPPETS,
        ...COMPACT_AGENT_RETURN_FORBIDDEN_SNIPPETS,
    ], "AGENTS.md codex must not default to direct root-to-owner routing");
    const linkedAgentNames = [...content.matchAll(/\.codex\/agents\/([A-Za-z0-9_-]+)\.toml/g)]
        .map((match) => match[1])
        .sort();

    assert(
        content.split(/\r?\n/).length <= 112,
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
        path.join(".codex", "config.toml"),
        path.join(".github", "agents"),
    ]) {
        assert(
            !fs.existsSync(path.join(ROOT, relativePath)),
            `Artifact operacional não deve existir no repo Sentinel: ${relativePath}`
        );
    }
}

function assertNoLegacyDirectoryInSentinelRoot() {
    assert(
        !fs.existsSync(path.join(ROOT, "LEGACY")),
        "LEGACY/ não deve existir na raiz do repo Sentinel"
    );
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
        assertProtocolHardeningInTemplateAgents();
        assertProtocolHardeningInReferenceAgents(agentSkillRoot);
        assertHeaderAwareReadingInAgentSet(
            path.join(agentSkillRoot, "reference", "agents"),
            "reference/agents instalado"
        );
        assertRound1AntiInferenceHardeningInAgentSet(
            path.join(agentSkillRoot, "reference", "agents"),
            "reference/agents instalado"
        );
        assertRound2OperationalAxesInAgentSet(
            path.join(agentSkillRoot, "reference", "agents"),
            "reference/agents instalado"
        );
        assertRound3OrchestratorLadderInAgentSet(
            path.join(agentSkillRoot, "reference", "agents"),
            "reference/agents instalado"
        );
        assertProtocolHardeningInCanonicalRefs(agentSkillRoot);
        assertQualityGuardrailsInDocs(path.join(agentSkillRoot, "reference", "docs"), "reference/docs instalado");
        assertCanonicalDesignerRoleClassInDocs(path.join(agentSkillRoot, "reference", "docs"), "reference/docs instalado");
        assertControlledAgentMaterialization(agentSkillRoot, vscodeRepoRoot, controlledAgentFiles);
        assertExecutionPackageFlowCoherence(agentSkillRoot, vscodeRepoRoot, controlledAgentFiles);
        assertProtocolHardeningInMaterializedAgents(vscodeRepoRoot, controlledAgentFiles);
        assertVscodeStatusContracts(vscodeRepoRoot, controlledAgentFiles);
        assertHeaderAwareReadingInAgentSet(
            path.join(vscodeRepoRoot, ".github", "agents"),
            "vscode materializado"
        );
        assertRound1AntiInferenceHardeningInAgentSet(
            path.join(vscodeRepoRoot, ".github", "agents"),
            "vscode materializado"
        );
        assertRound2OperationalAxesInAgentSet(
            path.join(vscodeRepoRoot, ".github", "agents"),
            "vscode materializado"
        );
        assertRound3OrchestratorLadderInAgentSet(
            path.join(vscodeRepoRoot, ".github", "agents"),
            "vscode materializado"
        );
        assertQualityGuardrailPropagationInAgentSet(path.join(vscodeRepoRoot, ".github", "agents"), "vscode materializado");
        assertConsistencyPolicyPropagationToVscodeAgents(agentSkillRoot, vscodeRepoRoot, controlledAgentFiles);

        createControlledFixtureRepo(backendOnlyRepoRoot);
        materializeControlledContextDocs(contextSkillRoot, backendOnlyRepoRoot);
        materializeBackendOnlySpecializedAgents(agentSkillRoot, backendOnlyRepoRoot);
        assertBackendOnlySpecializedMaterialization(backendOnlyRepoRoot);
        assertProtocolHardeningRejectsCompactedBackendOnlyMaterialization(agentSkillRoot);
        assertConsistencyPolicyRejectsVscodeMaterializationDrift(agentSkillRoot, controlledAgentFiles);
        assertConsistencyPolicyRepairsLegacyVscodeMaterialization(agentSkillRoot, controlledAgentFiles);
        assertManagedVscodeUpdateRebuildsLegacyReviewer(agentSkillRoot, controlledAgentFiles);

        createControlledFixtureRepo(codexRepoRoot);
        materializeControlledCodexAgents(agentSkillRoot, codexRepoRoot, controlledAgentFiles);

        assertControlledCodexAgentMaterialization(codexRepoRoot, controlledAgentFiles);
        assertControlledCodexRuntimeConfig(codexRepoRoot);
        assertControlledCodexAgentsIndex(codexRepoRoot, controlledAgentFiles);
        assertProtocolHardeningInCodexAgents(codexRepoRoot, controlledAgentFiles);
        assertCodexStatusContracts(codexRepoRoot, controlledAgentFiles);
        assertHeaderAwareReadingInCodexAgents(codexRepoRoot, controlledAgentFiles);
        assertRound1AntiInferenceHardeningInCodexAgents(codexRepoRoot, controlledAgentFiles);
        assertRound2OperationalAxesInCodexAgents(codexRepoRoot, controlledAgentFiles);
        assertRound3OrchestratorLadderInCodexAgents(codexRepoRoot);
        assertQualityGuardrailPropagationInCodexAgentSet(codexRepoRoot, controlledAgentFiles);
        assertConsistencyPolicyPropagationToCodexAgents(agentSkillRoot, codexRepoRoot, controlledAgentFiles);
        assertConsistencyPolicyRejectsCodexMaterializationDrift(agentSkillRoot, controlledAgentFiles);
        assertConsistencyPolicyRepairsLegacyCodexMaterialization(agentSkillRoot, controlledAgentFiles);
        assertManagedCodexUpdateRebuildsLegacyReviewer(agentSkillRoot, controlledAgentFiles);
    } finally {
        fs.rmSync(vscodeRepoRoot, { recursive: true, force: true });
        fs.rmSync(backendOnlyRepoRoot, { recursive: true, force: true });
        fs.rmSync(codexRepoRoot, { recursive: true, force: true });
    }
}

async function runSentinelSmoke() {
    console.log("Smoke Sentinel: manifests canônicos");
    assertInstallManifests();
    assertReferenceManifests();
    assertSpecManagerContract();
    assertRequiredBundleCoverage();
    assertOwnedRootsAreFullyBundled();
    assertExplicitRootEntries();
    assertQualityGuardrailSourceDefinitions();
    assertDocumentationTemplateHeaders(path.join(ROOT, "templates", "docs"), "templates/docs");
    assertDocumentationTemplateCriticalSnippets(path.join(ROOT, "templates", "docs"), "templates/docs");
    assertQualityGuardrailsInDocs(path.join(ROOT, "templates", "docs"), "templates/docs");
    assertCanonicalDesignerRoleClassInDocs(path.join(ROOT, "templates", "docs"), "templates/docs");
    assertCorrectionLoopPolicyInTemplateDocs();
    assertBaseAgentTemplateSizeLimit();
    assertHeaderAwareReadingInAgentSet(path.join(ROOT, "templates", "agents"), "templates/agents");
    assertQualityGuardrailPropagationInAgentSet(path.join(ROOT, "templates", "agents"), "templates/agents");
    assertRound1AntiInferenceHardeningInAgentSet(path.join(ROOT, "templates", "agents"), "templates/agents");
    assertRound2OperationalAxesInAgentSet(path.join(ROOT, "templates", "agents"), "templates/agents");
    assertRound3OrchestratorLadderInAgentSet(path.join(ROOT, "templates", "agents"), "templates/agents");
    assertCodexSourceTemplates();
    assertAgentFrontmatterNamesMatchBasenames(
        path.join(ROOT, "templates", "agents"),
        "templates/agents"
    );
    assertNoExternalMemoryTermsInTree(
        path.join(ROOT, "templates", "agents"),
        "templates/agents"
    );
    assertNoExternalMemoryTermsInTree(
        path.join(ROOT, "skills", "stnl_project_agent_specializer", "reference", "templates"),
        "stnl_project_agent_specializer/reference/templates"
    );
    assertNoOperationalArtifactsInSentinelRoot();
    assertNoLegacyDirectoryInSentinelRoot();
    assert(isIgnoredEntry(".DS_Store"), ".DS_Store deve continuar ignorado pelo smoke/materialização");
    assert(isIgnoredEntry("__MACOSX"), "__MACOSX deve continuar ignorado pelo smoke/materialização");

    console.log("Smoke Sentinel: install/doctor em HOME temporário");
    const tempHome = fs.mkdtempSync(path.join(os.tmpdir(), "sentinel-smoke-"));

    try {
        const env = { ...process.env, HOME: tempHome };
        const emptyDoctor = runSentinelExpectFailure("doctor", env);
        assert(
            emptyDoctor.stdout.includes("Nenhuma instalação real encontrada"),
            "doctor sem instalação real deveria falhar explicitamente"
        );
        runSentinel("doctor", env, ["--source-only"]);
        assertSourceOnlyDoctorFailsForMissingSourceFile();
        runSentinel("install", env);

        const staleSkill = path.join(getTargets(tempHome)[0], "stnl_removed_quality");
        fs.mkdirSync(staleSkill, { recursive: true });
        assert.deepEqual(
            listInstalledStaleSkills(getTargets(tempHome)[0], listSkillFolders(SOURCE_DIR)),
            ["stnl_removed_quality"],
            "detecção de skill stnl_* stale falhou"
        );
        const staleDoctor = runSentinelExpectFailure("doctor", env);
        assert(
            staleDoctor.stdout.includes("stale managed skills: stnl_removed_quality"),
            "doctor não reportou skill stnl_* stale"
        );
        runSentinel("install", env, ["--prune"]);
        assert(!fs.existsSync(staleSkill), "install --prune não removeu skill stnl_* stale");
        runSentinel("init", env);
        runSentinel("update", env);
        const doctor = runSentinel("doctor", env);

        assertInstalledArtifactsMatchSources(tempHome);
        assertInstalledQualityGuardrailSkills(tempHome);
        assertDoctorOutput(doctor.stdout);
        console.log("Smoke Sentinel: materialização controlada");
        runControlledMaterializationSmoke(tempHome);
        assertNoOperationalArtifactsInSentinelRoot();
        assertNoLegacyDirectoryInSentinelRoot();
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
