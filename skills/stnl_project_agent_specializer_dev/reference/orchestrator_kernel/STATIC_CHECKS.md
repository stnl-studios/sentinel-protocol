# Orchestrator Kernel Static Checks

Status: experimental contract for Phase 6.

This document defines the minimum static checks for the future experimental
`orchestrator kernel` inside `stnl_project_agent_specializer_dev`.

It is a documentation contract only. It does not implement an executable
script, runtime loader, real materialization path, golden tests, full validation
suite, installer behavior, smoke behavior, or final artifact writes.

## Purpose

The minimum static checks are cheap, focused checks intended to catch structural
regressions before any future experimental materialization can be considered.

They are cheap because they inspect a small, explicit set of dev-skill contract
files, required references, module ids, gate mappings, and forbidden-output
rules. They do not require broad repository discovery, runtime execution,
semantic review, target installation, agent generation, or snapshot comparison.

They are not a full suite. They do not prove that the future kernel behaves
correctly, that generated agents are acceptable, that all owner contracts are
preserved, or that every workflow path is valid.

They do not replace golden tests. Future critical golden tests are still needed
to prove the specific high-risk behavior expected from the experimental path.

They do not replace `reviewer`, `validation-runner`, smoke checks, or any
authorized validation owner. Static checks can report structural pass/fail
signals only; they cannot perform semantic acceptance or closure.

They do not authorize real materialization by themselves. A static-check pass is
only one future precondition. Materialization remains blocked without critical
golden tests, explicit authorization, an isolated execution/materialization
path, and later-phase adoption.

## Relationship To Existing Documents

`reference/orchestrator_kernel/CONTRACT.md` defines the kernel boundary,
non-delegable responsibilities, and the requirement to stop instead of
inventing missing modules, paths, or authority.

`reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md` defines the mandatory
protection bundle that cannot become optional or be weakened by checks,
modules, or gates.

`reference/orchestrator_kernel/MODULE_INDEX.md` catalogs the initial modules,
including `checks.static`, `materialization.experimental`, and
`tests.golden_critical`.

`reference/orchestrator_kernel/ACTIVATION_GATES.md` maps every initial module to
its conservative gate and keeps `checks.static` in Gate 3 until executable
implementation and authorized harness rules exist.

`reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md` defines the
future isolated materialization boundary and prohibited outputs that static
checks must protect before any later materialization attempt.

This document references those contracts conceptually. It does not duplicate or
replace them.

## Check Result Shape

Each future static check should produce a compact result with:

- check id
- status: `PASS` or `FAIL`
- checked input
- concrete failing file or missing item when failed
- blocker code when failed
- statement that the result is structural only and not materialization authority

A missing, incomplete, or unavailable static-check harness must not be treated
as pass.

## Minimum Required Checks

### CH-001 - Required Files Exist

- Objective: Verify that the minimum orchestrator-kernel contract files exist in
  the experimental dev skill.
- Input:
  - `reference/orchestrator_kernel/CONTRACT.md`
  - `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
  - `reference/orchestrator_kernel/MODULE_INDEX.md`
  - `reference/orchestrator_kernel/ACTIVATION_GATES.md`
  - `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
  - `reference/orchestrator_kernel/STATIC_CHECKS.md`
- PASS condition: Every listed file exists under
  `skills/stnl_project_agent_specializer_dev/**`.
- FAIL condition: Any listed file is absent, renamed, outside the dev skill, or
  only available from a prohibited fallback path.
- Blocker produced: `BLOCKED_STATIC_REQUIRED_FILE_MISSING`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-002 - Dev `SKILL.md` References Exist

- Objective: Verify that every short orchestrator-kernel reference added to the
  dev `SKILL.md` points to an existing file.
- Input:
  - `skills/stnl_project_agent_specializer_dev/SKILL.md`
  - short references in that file to `reference/orchestrator_kernel/*.md`
- PASS condition: Every referenced orchestrator-kernel file exists inside
  `skills/stnl_project_agent_specializer_dev/**`.
- FAIL condition: Any such reference is missing, misspelled, points outside the
  dev skill, or depends on production skill paths.
- Blocker produced: `BLOCKED_STATIC_SKILL_REFERENCE_BROKEN`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-003 - Module Index Contains All Initial Modules

- Objective: Verify that the module index still catalogs every initial module
  required by the experimental kernel contracts.
- Input:
  - `reference/orchestrator_kernel/MODULE_INDEX.md`
- Required modules:
  - `routing.basic`
  - `context.missing_info`
  - `routing.execution_package`
  - `validation.boundary`
  - `materialization.experimental`
  - `checks.static`
  - `tests.golden_critical`
- PASS condition: Every required module id appears as a module entry in the
  module index.
- FAIL condition: Any required module id is absent, renamed, duplicated in a way
  that makes the entry ambiguous, or present only outside the module index.
- Blocker produced: `BLOCKED_STATIC_MODULE_INDEX_INCOMPLETE`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-004 - Activation Gates Cover All Module-Index Modules

- Objective: Verify that every initial module has an initial gate mapping.
- Input:
  - `reference/orchestrator_kernel/MODULE_INDEX.md`
  - `reference/orchestrator_kernel/ACTIVATION_GATES.md`
- PASS condition: Every initial module from CH-003 appears in the activation
  gates initial mapping with a conservative gate classification.
- FAIL condition: Any initial module is missing from the gate mapping, mapped
  ambiguously, or mapped in a way that cannot be matched to the module index.
- Blocker produced: `BLOCKED_STATIC_GATE_MAPPING_INCOMPLETE`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-005 - Blocked Modules Stay Blocked

- Objective: Verify that high-risk future modules remain blocked until later
  phases provide the missing contracts, implementation, harnesses, tests, and
  authorization.
- Input:
  - `reference/orchestrator_kernel/MODULE_INDEX.md`
  - `reference/orchestrator_kernel/ACTIVATION_GATES.md`
  - `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- PASS condition:
  - `materialization.experimental` is not auto-activatable.
  - `checks.static` is not described as materialization authority.
  - `tests.golden_critical` is not described as a full suite or as proof that
    already exists.
- FAIL condition: Any checked document implies that experimental materialization
  can auto-activate, that static checks alone authorize materialization, or that
  critical golden tests are already a full/existing proof suite.
- Blocker produced: `BLOCKED_STATIC_BLOCKED_MODULE_WEAKENED`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-006 - Experimental Materialization Prohibits Forbidden Outputs

- Objective: Verify that the experimental materialization contract continues to
  prohibit writes to final artifacts, production templates, installer entry
  points, smoke checks, and root workspace instructions.
- Input:
  - `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- Forbidden outputs:
  - `.github/agents/orchestrator.agent.md`
  - `.codex/agents/orchestrator.toml`
  - `.codex/config.toml`
  - `AGENTS.md`
  - `templates/agents/orchestrator.agent.md`
  - `sentinel.mjs`
  - `scripts/sentinel-smoke.mjs`
- PASS condition: Every forbidden output is explicitly listed as prohibited by
  the experimental materialization contract.
- FAIL condition: Any forbidden output is absent from the prohibited-output
  list, described as permitted, or made conditional on static checks alone.
- Blocker produced: `BLOCKED_STATIC_FORBIDDEN_OUTPUT_WEAKENED`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-007 - Safe Bundle Is Not Optional

- Objective: Verify that the minimum safe bundle remains mandatory and cannot
  be weakened by modules, activation gates, static checks, or materialization.
- Input:
  - `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
  - `reference/orchestrator_kernel/MODULE_INDEX.md`
  - `reference/orchestrator_kernel/ACTIVATION_GATES.md`
  - `reference/orchestrator_kernel/STATIC_CHECKS.md`
- PASS condition: The checked documents preserve the rule that the minimum safe
  bundle is mandatory and cannot be removed, overridden, weakened, made
  conditional, or bypassed by optional modules, gates, checks, or materializers.
- FAIL condition: Any checked document treats the safe bundle as optional,
  replaceable, weaker than optional modules, or unnecessary after a static-check
  pass.
- Blocker produced: `BLOCKED_STATIC_SAFE_BUNDLE_WEAKENED`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

### CH-008 - Phase 6 Requires Nothing Outside The Dev Skill

- Objective: Verify that the static checks defined in this phase are
  documental, scoped, and based only on files inside
  `skills/stnl_project_agent_specializer_dev/**`.
- Input:
  - `reference/orchestrator_kernel/STATIC_CHECKS.md`
  - future static-check target list when a harness exists
- PASS condition: The Phase 6 checks are defined as documentation-only checks
  over dev-skill contract files and do not require production skill edits,
  final artifact writes, runtime loader changes, installer changes, smoke
  changes, or broad repository scans.
- FAIL condition: The static-check contract requires or authorizes edits,
  outputs, harness dependencies, or validation inputs outside
  `skills/stnl_project_agent_specializer_dev/**` for this phase.
- Blocker produced: `BLOCKED_STATIC_SCOPE_ESCAPED_DEV_SKILL`.
- Requirement status: Mandatory check for the future static-check harness;
  Phase 6 only documents the contract.

## Checks Explicitly Out Of Scope

Phase 6 does not define:

- smoke execution
- full suite
- deep semantic validation
- validation of all agents
- massive snapshot comparison
- materialization execution
- final artifact writes
- installation in `~/.agents`
- changes to `sentinel.mjs`
- changes to `scripts/sentinel-smoke.mjs`

## Relationship To Experimental Materialization

Static checks are a future precondition for experimental materialization, not a
materialization grant.

If static checks are absent, incomplete, unavailable, or failing,
`materialization.experimental` must remain blocked.

Even when static checks pass in a future harness, they are insufficient by
themselves. Critical golden tests, explicit authorization, isolated allowed
paths, a real implementation/harness, and later-phase adoption are still
required before real experimental materialization can be considered.

The checks protect the future experiment by catching structural regressions
early: missing kernel files, broken dev-skill references, missing module-index
entries, missing gate coverage, weakened blocked-module rules, weakened
forbidden-output rules, weakened safe-bundle rules, and accidental scope escape
outside the dev skill.

## Phase 6 Acceptance Criteria

This static-checks contract answers the Phase 6 questions as follows:

- Which minimum checks exist? CH-001 through CH-008 define the minimum required
  structural checks.
- What does each check validate? Each check defines its objective and input.
- What is PASS or FAIL? Each check defines explicit PASS and FAIL conditions.
- Why are these checks cheap? They inspect a small, explicit set of dev-skill
  Markdown contracts and references without runtime execution, broad discovery,
  generated artifacts, or semantic review.
- Why are they not a full suite? They do not execute the workflow, validate all
  agents, compare broad snapshots, prove generated behavior, or replace
  reviewer/validation-runner/smoke responsibilities.
- Why do they not authorize materialization by themselves? They only detect
  structural readiness; materialization still requires golden tests, explicit
  authorization, isolated execution/materialization path, and later adoption.
- What remains missing before real materialization? Executable checks, a
  harness, critical golden tests, explicit write authorization, isolated allowed
  outputs, and a later phase that authorizes the experimental path.
- How do they protect against structural regression? They fail closed when core
  files disappear, references break, module/gate coverage drifts, blocked
  modules weaken, forbidden outputs are removed, the safe bundle becomes
  optional, or this phase starts depending on files outside the dev skill.

## Explicitly Out Of Scope For Phase 6

This phase does not implement:

- executable script
- runtime loader
- real materialization
- golden tests
- full suite
- kernelization of the other agents
- complete Project Senior Profile
- changes to the main flow
- production template changes
- smoke changes
- installer changes

Phase 6 only defines the formal contract for the minimum static checks of the
future experimental orchestrator kernel.
