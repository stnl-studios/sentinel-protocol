# Orchestrator Kernel Static Checks

Status: experimental static-check contract with a local read-only static-check harness.

This document defines the minimum static checks for the experimental
`orchestrator kernel` inside `stnl_project_agent_specializer_dev`.

It is contract text and a structural-check contract. The local read-only static-check harness
`reference/orchestrator_kernel/check-static.mjs` implements CH-001 through
CH-010 as read-only checks over the dev skill contracts and local experiment files.

It does not implement a runtime loader, real materialization path, golden tests,
full validation suite, installer behavior, smoke behavior, or final artifact
writes.

## Purpose

The minimum static checks are cheap, focused checks intended to catch structural
regressions before any later experimental materialization can be considered.

They are cheap because they inspect a small, explicit set of dev-skill contract
files, required references, module ids, gate mappings, and forbidden-output
rules. They do not require broad repository discovery, runtime execution,
semantic review, target installation, agent generation, or snapshot comparison.

They are not a full suite. They do not prove that the future kernel behaves
correctly, that generated agents are acceptable, that all owner contracts are
preserved, or that every workflow path is valid.

They do not replace golden tests. The critical golden-test contract in
`reference/orchestrator_kernel/GOLDEN_TESTS.md` is still needed to prove the
specific high-risk behavior expected from the experimental path in a future
executable harness.

They are not a `reviewer`, `validation-runner`, or smoke replacement. Static
checks can report structural pass/fail signals only; they cannot perform
semantic acceptance or closure.

They do not authorize real materialization by themselves. A static-check pass is
only one later precondition. The local harness exists, but does not authorize
materialization. Materialization remains blocked without critical
golden tests, explicit authorization, an isolated execution/materialization
path, and authorized adoption.

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
its conservative gate and keeps `checks.static` in Gate 3 for runtime module
activation and materialization authority even after the local read-only
static-check harness exists. The local materializer is checked structurally but is not executed by static checks.

`reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md` defines the
future isolated materialization boundary and prohibited outputs that static
checks must protect before any later materialization attempt.

`reference/orchestrator_kernel/GOLDEN_TESTS.md` defines the exactly two
critical golden tests that complement static checks. The local read-only golden-test harness checks those contracts structurally, but it is not runtime
execution, fixture proof, or materialization authority.

This document references those contracts conceptually. It does not duplicate or
replace them.

## Check Result Shape

Each static check result should be compact and include:

- check id
- status: `PASS` or `FAIL`
- checked input
- concrete failing file or missing item when failed
- blocker code when failed
- statement that the result is structural only and not materialization authority

A missing, incomplete, or unavailable static-check harness must not be treated
as pass.

## Local Read-Only Static-Check Harness

`reference/orchestrator_kernel/check-static.mjs` is a Node.js ESM harness that
implements CH-001 through CH-010 only.

The harness is read-only, uses only native Node.js modules, and inspects only
files under `skills/stnl_project_agent_specializer_dev/**`. These checks are
documental and structural. They do not require production skill edits, final
artifact writes, runtime loader changes, installer changes, smoke changes,
golden-test harnesses, materialization, generated artifacts, or broad
repository scans.

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
  - `reference/orchestrator_kernel/GOLDEN_TESTS.md`
  - `reference/agents/orchestrator.agent.md`
  - `reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs`
  - `reference/orchestrator_kernel/check-materialized.mjs`
- PASS condition: Every listed file exists under
  `skills/stnl_project_agent_specializer_dev/**`.
- FAIL condition: Any listed file is absent, renamed, outside the dev skill, or
  only available from a prohibited fallback path.
- Blocker produced: `BLOCKED_STATIC_REQUIRED_FILE_MISSING`.
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

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
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

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
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

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
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

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
  - `tests.golden_critical` is not described as a full suite, as proof that
    already executes, or as materialization authority by itself.
- FAIL condition: Any checked document implies that experimental materialization
  can auto-activate, that static checks alone authorize materialization, or that
  critical golden tests are already a full/existing executable proof suite or
  can authorize materialization by themselves.
- Blocker produced: `BLOCKED_STATIC_BLOCKED_MODULE_WEAKENED`.
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

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
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

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
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.

### CH-008 - Static Checks Require Nothing Outside The Dev Skill

- Objective: Verify that the static checks defined in this contract are
  documental, scoped, and based only on files inside
  `skills/stnl_project_agent_specializer_dev/**`.
- Input:
  - `reference/orchestrator_kernel/STATIC_CHECKS.md`
- local static-check target list
- PASS condition: The static checks are defined as structural checks
  over dev-skill contract files and do not require production skill edits,
  final artifact writes, runtime loader changes, installer changes, smoke
  changes, or broad repository scans.
- FAIL condition: The static-check contract requires or authorizes edits,
  outputs, harness dependencies, or validation inputs outside
  `skills/stnl_project_agent_specializer_dev/**` for this contract.
- Blocker produced: `BLOCKED_STATIC_SCOPE_ESCAPED_DEV_SKILL`.
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check; no runtime-integrated execution.
- Authority status: Local harness exists, but does not authorize
  materialization.

### CH-009 - Experimental Materializer Has Explicit Guards

- Objective: Verify that the local materializer and generated-artifact checker
  are present and visibly constrained to the isolated experiment.
- Input:
  - `reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs`
  - `reference/orchestrator_kernel/check-materialized.mjs`
- PASS condition:
  - both files exist inside `skills/stnl_project_agent_specializer_dev/**`;
  - the materializer requires `--allow-experimental-materialization`;
  - the materializer names `reference/orchestrator_kernel/generated` as the only
    generated output root;
  - the materializer names the forbidden production outputs protected by CH-006.
- FAIL condition: The materializer or checker is absent, escapes the dev skill,
  lacks the explicit authorization flag, lacks the generated output boundary, or
  omits forbidden-output guards.
- Blocker produced: `BLOCKED_STATIC_EXPERIMENTAL_MATERIALIZER_GUARD_MISSING`.
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check only; the materializer is not run by CH-009.

### CH-010 - Dev Manifest Does Not Encode Absent Glob Paths As Required Inputs

- Objective: Verify that the dev manifest lists real bundled files and does not
  encode absent `reference/agents/**` or `reference/docs/**` globs as parseable
  required entries.
- Input:
  - `reference/MANIFEST.md`
- PASS condition:
  - manifest includes the copied base orchestrator, materializer, and checker;
  - manifest does not contain backticked absent glob entries for
    `reference/agents/**` or `reference/docs/**`.
- FAIL condition: The manifest omits required local experiment files or presents
  absent glob paths as parseable required references.
- Blocker produced: `BLOCKED_STATIC_DEV_MANIFEST_AMBIGUOUS`.
- Requirement status: Contract text; implemented by local read-only
  static-check harness.
- Execution status: Structural check only.

## Checks Explicitly Out Of Scope

The static-check contract and local read-only harness do not define:

- smoke execution
- full suite
- deep semantic validation
- validation of all agents
- massive snapshot comparison
- materializer execution by static checks
- final artifact writes
- installation in `~/.agents`
- changes to `sentinel.mjs`
- changes to `scripts/sentinel-smoke.mjs`

## Relationship To Experimental Materialization

Static checks are a precondition for experimental materialization, not a
materialization grant.

If static checks are absent, incomplete, unavailable, or failing,
`materialization.experimental` must remain blocked.

Even when static checks pass, they are insufficient by themselves. Critical
golden tests are complementary and also insufficient by themselves. Explicit
authorization, isolated allowed paths, the local materializer, and generated
artifact checks are still required before experimental materialization can run.

The checks protect the future experiment by catching structural regressions
early: missing kernel files, broken dev-skill references, missing module-index
entries, missing gate coverage, weakened blocked-module rules, weakened
forbidden-output rules, weakened safe-bundle rules, missing materializer guards,
ambiguous manifest entries, and accidental scope escape outside the dev skill.

## Acceptance Criteria

This static-checks contract answers the static-check questions as follows:

- Which minimum checks exist? CH-001 through CH-010 define the minimum required
  structural checks.
- What does each check validate? Each check defines its objective and input.
- What is PASS or FAIL? Each check defines explicit PASS and FAIL conditions.
- Why are these checks cheap? They inspect a small, explicit set of dev-skill
  Markdown contracts and references without runtime execution, broad discovery,
  generated artifact execution, or semantic review.
- Why are they not a full suite? They do not execute the workflow, validate all
  agents, compare broad snapshots, prove generated behavior, or replace
  reviewer/validation-runner/smoke responsibilities.
- Why do they not authorize materialization by themselves? They only detect
  structural readiness; materialization still requires golden tests, explicit
  authorization, isolated execution/materialization path, and later adoption.
- What remains missing before real materialization? Runtime/fixture golden-test
  harness, explicit write authorization, isolated allowed outputs for any future
  target path, runtime-integrated adoption, and explicit authorization for any
  path beyond the local generated experiment.
- How do they protect against structural regression? They fail closed when core
  files disappear, references break, module/gate coverage drifts, blocked
  modules weaken, forbidden outputs are removed, the safe bundle becomes
  optional, materializer guards disappear, manifest entries become ambiguous, or
  this contract starts depending on files outside the dev skill.

## Explicitly Out Of Scope

This contract and the read-only harness do not implement:

- runtime-integrated check execution
- runtime loader
- production or target-project materialization
- golden tests
- full suite
- kernelization of the other agents
- complete Project Senior Profile
- changes to the main flow
- production template changes
- smoke changes
- installer changes

This document only defines the formal contract for the minimum static checks of
the experimental orchestrator kernel.
