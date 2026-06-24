# Full-Flow Dev-Skill Dry-Run In-Memory Project-Local Agent Micro-Pack Contract Plan

Status: READY

Phase:
MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_CONTRACT_PLAN

Verdict:
MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_CONTRACT_PLAN: PASS

This is a documentary, dev-only, planning-only contract plan for future
project-local support packs under `.sentinel/agents/**`. It does not implement
the architecture, create templates, create scripts, create fixtures, create a
renderer, create a writer, create a loader, create a Target Adapter, create a
Write Approval implementation, create a runtime, create a CLI, create an
official schema, create a stdout contract, create a persistent report, alter
checks, alter the Validation Harness Aggregator, access a real Target, access
GitHub, access the productive skill, create a branch, create a commit, or open
a pull request.

## 1. Title

Full-flow dev-skill dry-run in-memory project-local agent micro-pack contract
plan.

## 2. Verdict

The approved architectural direction remains:

`PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`

The contract plan is approved for documentation purposes only. It defines the
conceptual contracts and shapes that a later, separately authorized phase may
use when designing future support packs under:

- `.sentinel/agents/_shared/**`
- `.sentinel/agents/<agent>/**`

This plan is not a template, not a generated artifact, not an implementation
specification, not a runtime protocol, and not a validation checker.

## 3. Executive Summary

The previous matrix decision established that future materialization must keep
platform entrypoints small and move project-local support behavior into a
support layer under `.sentinel/agents/**`.

This plan converts that decision into a conceptual contract map. It defines how
future entrypoints, `_shared`, per-agent micro-packs, `START.md`,
`MANIFEST.md`, shards, temperature directories, trace files, kernel mapping,
Senior Agent Profile mapping, `/docs` consumption, activation, anti-bloat,
anti-duplication, missing-shard behavior, broad-reading refusal, support-pack
counting, future template gaps, and future audit boundaries should work.

The plan preserves the canonical 12-agent matrix, the 24 agent-level artifacts,
the 2 target-level artifacts, and the closed 9-check Validation Harness
Aggregator. It does not authorize generating `.sentinel/agents/**`.

## 4. Scope

This phase is limited to one documentation-only planning artifact inside:

`skills/stnl_project_agent_specializer_dev/reference/materialization_lab/`

The artifact may define future conceptual contracts for:

- small platform entrypoints;
- project-local shared support pack shape;
- per-agent micro-pack shape;
- shard activation and temperature rules;
- traceability from kernels, Senior Agent Profiles, and project docs;
- controlled consumption of `/docs`;
- anti-bloat and anti-duplication rules;
- future read-only validation or audit planning.

This artifact may mention future target-project paths only as conceptual
shapes. It must not create, render, or materialize those paths.

## 5. Non-Goals

This phase does not:

- implement support packs;
- implement materialization;
- create or alter templates;
- create or alter scripts;
- create or alter fixtures;
- create or alter schemas;
- create or alter checkers;
- create a tenth check;
- alter official child checks;
- alter the Validation Harness Aggregator;
- register anything in the Aggregator;
- alter `README.md`;
- alter `reference/MANIFEST.md`;
- access a real Target;
- access GitHub;
- access, compare, use as source, or mutate the productive
  `skills/stnl_project_agent_specializer/` skill;
- create renderer, writer, loader, Target Adapter, Write Approval, runtime,
  CLI, stdout contract, or persistent report;
- generate `.sentinel/agents/**`;
- generate `.github/agents/**`;
- generate `.codex/agents/**`;
- generate `AGENTS.md`;
- generate `.codex/config.toml`.

## 6. Prior Decision Baseline

The canonical prior context is:

- gap assessment:
  `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX_DECISION_AND_GAP_ASSESSMENT: READY_FOR_DECISION_DOCUMENTATION`;
- architectural decision:
  `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX_DECISION: PASS`;
- decision audit:
  `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX_DECISION_AUDIT: EXCELLENT_PASS`.

The approved decision states that:

- `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX` is canonical;
- `.sentinel/agents/**` is a project-local support layer;
- support packs do not count as agents;
- support packs do not replace `.github/agents/**`;
- support packs do not replace `.codex/agents/**`;
- kernels and Senior Agent Profiles remain strong sources;
- kernels, profiles, and `/docs` must not be copied wholesale;
- future behavior must come from traceable, activated shards.

This plan starts from that baseline and does not reopen the decision.

## 7. Canonical Matrix Preservation

The canonical agent matrix remains exactly 12 agents:

1. `orchestrator`
2. `planner`
3. `validation-eval-designer`
4. `execution-package-designer`
5. `designer`
6. `coder-frontend`
7. `coder-backend`
8. `coder-ios`
9. `validation-runner`
10. `reviewer`
11. `finalizer`
12. `resync`

Agent-level artifacts remain exactly:

- 12 x `.github/agents/<agent>.agent.md`
- 12 x `.codex/agents/<agent>.toml`

Total:

- 24 agent artifacts.

Target-level artifacts remain exactly:

- `.codex/config.toml`
- `AGENTS.md`

Total:

- 2 target-level artifacts.

Counting rules:

- `.codex/config.toml` does not count as an agent;
- `AGENTS.md` does not count as an agent;
- `_shared` does not count as an agent;
- per-agent micro-packs do not count as agents;
- support packs do not count as agents;
- `.sentinel/agents/**` is not a third agent matrix;
- `.sentinel/agents/**` does not replace `.github/agents/**`;
- `.sentinel/agents/**` does not replace `.codex/agents/**`.

## 8. Aggregator Preservation

The official Validation Harness Aggregator remains closed with exactly these 9
child checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

The Aggregator wrapper is not a tenth child check. This plan creates no new
checker, registers no new child, alters no child check, and does not change the
Aggregator contract.

Any future official validation of support packs requires a separate,
explicitly authorized phase.

## 9. Contract Plan Overview

The future conceptual target-project shape is:

```text
target-project/
  AGENTS.md
  .github/
    agents/
      <12 files .agent.md>
  .codex/
    config.toml
    agents/
      <12 files .toml>
  .sentinel/
    agents/
      _shared/
        00_RUNTIME_CONTRACT.md
        01_GLOBAL_READING_CONTRACT.md
        02_PROJECT_DOCS_MAP.md
        03_PROJECT_SURFACES.md
        04_MODEL_POLICY.md
        05_ROUTING_MATRIX.md
        06_SUPPORT_PACK_RULES.md
      <agent>/
        START.md
        MANIFEST.md
        always/
          ROLE_AND_AUTHORITY.md
          OUTPUT_CONTRACT.md
        hot/
          <frequent_project_specific_shards>.md
        warm/
          <trigger_based_common_shards>.md
        cold/
          <rare_high_risk_or_escalation_shards>.md
        trace/
          SOURCE_TRACE.md
          SHARD_INDEX.md
```

This shape is conceptual only. This phase does not create these files.

The core contract chain is:

1. Entry points identify the canonical agent and point to the local micro-pack.
2. `START.md` defines the minimum local reading sequence.
3. `MANIFEST.md` inventories shards and controls activation.
4. `always/` gives the minimum role, authority, and output behavior.
5. `hot/`, `warm/`, and `cold/` are loaded only by trigger.
6. `trace/` supports audit and is not normal operational reading.
7. `_shared` owns common rules and project maps.
8. `/docs` is referenced narrowly and only through activated shards.

## 10. EntryPoint Contract

Future platform entrypoints are:

- `.github/agents/<agent>.agent.md`
- `.codex/agents/<agent>.toml`

Each entrypoint must remain small and must contain only:

- canonical agent id;
- target platform;
- reference to `.sentinel/agents/<agent>/`;
- rule to read `.sentinel/agents/<agent>/START.md`;
- rule to read `.sentinel/agents/<agent>/MANIFEST.md`;
- rule to load only activated shards;
- rule to avoid whole-repo reading;
- rule to avoid reading all of `/docs`;
- rule to avoid loading all shards;
- rule to stop when required expansion exceeds the reading budget or authority;
- expected output or status shape for that platform.

An entrypoint must not contain:

- the whole kernel;
- the whole Senior Agent Profile;
- the whole `/docs` tree;
- all shards;
- global rules repeated from `_shared`;
- broad repo discovery instructions;
- a monolithic agent body;
- project-local support content that belongs in `.sentinel/agents/**`.

Entry points point to support packs. They do not become support packs.

## 11. Shared Support Pack Contract

The future shared support pack is:

`.sentinel/agents/_shared/`

It centralizes common rules used by multiple agents. A common rule must have
one authoritative home and must not be repeated across all 12 micro-packs.

Required conceptual responsibilities:

`00_RUNTIME_CONTRACT.md`:

- declares activation assumptions;
- defines the no-load-all rule;
- defines the no-broad-reading rule;
- defines the stop-and-request-scope behavior;
- records that support packs are not agents and not a third platform.

`01_GLOBAL_READING_CONTRACT.md`:

- defines shared reading discipline;
- forbids whole-repo default discovery;
- forbids reading all of `/docs`;
- requires narrow reads tied to activated shards;
- defines when expansion requires a pause, scope request, or human decision.

`02_PROJECT_DOCS_MAP.md`:

- maps existing `/docs` areas;
- names project documentation sources without copying them;
- connects doc paths to surfaces, owners, or contract topics;
- marks references that require hot, warm, or cold triggers;
- records unknown or unmapped areas without forcing broad reading.

`03_PROJECT_SURFACES.md`:

- maps known project surfaces;
- records ownership hints and surface boundaries;
- identifies agent-relevant surfaces without turning the file into a repo dump;
- supports routing and shard activation.

`04_MODEL_POLICY.md`:

- records model or capability policy only when a future phase authorizes it;
- must not invent routing based on unavailable model facts;
- must not override platform policy;
- must remain a policy map, not an agent behavior body.

`05_ROUTING_MATRIX.md`:

- records cross-agent routing and handoff hints;
- preserves role boundaries;
- helps detect cross-owner escalation triggers;
- must not recreate every agent prompt.

`06_SUPPORT_PACK_RULES.md`:

- owns shared support-pack rules;
- defines temperature, trace, anti-bloat, and anti-duplication principles;
- defines support-pack counting rules;
- must not become a dump of kernels, profiles, or `/docs`.

`_shared` must not become:

- a substitute for kernels;
- a substitute for Senior Agent Profiles;
- a substitute for `/docs`;
- a third matrix of agents;
- a monolithic behavior store.

Each shared file must have one primary responsibility.

## 12. Per-Agent Micro-Pack Contract

Each canonical agent receives exactly one future local micro-pack:

`.sentinel/agents/<agent>/`

The micro-pack contains the project-local support behavior for that canonical
agent. It does not count as an agent.

Minimum conceptual structure:

- `START.md`;
- `MANIFEST.md`;
- `always/ROLE_AND_AUTHORITY.md`;
- `always/OUTPUT_CONTRACT.md`;
- `hot/*.md` for frequent project-specific shards;
- `warm/*.md` for trigger-based common shards;
- `cold/*.md` for rare, high-risk, escalation, failure, ambiguity, or
  cross-owner shards;
- `trace/SOURCE_TRACE.md`;
- `trace/SHARD_INDEX.md`.

Relationship rules:

- entrypoints point to the micro-pack;
- `START.md` orients local reading;
- `MANIFEST.md` controls shard activation;
- `_shared` owns common rules and maps;
- kernels provide canonical role behavior and gates;
- Senior Agent Profiles provide senior judgment overlays;
- `/docs` provides external project documentation through narrow references;
- trace files prove provenance and coverage without copying source text.

The micro-pack must not become a monolithic prompt or a local clone of the
kernel, profile, or docs tree.

## 13. START.md Contract

`START.md` is the first local support file read after the platform entrypoint.

It must:

- identify the canonical agent id;
- state that the file belongs to `.sentinel/agents/<agent>/`;
- point to relevant `_shared` files when needed;
- point to `MANIFEST.md`;
- define the minimal reading sequence;
- require loading only activated shards;
- state that `always/` is the only default operational load;
- state that `hot/`, `warm/`, and `cold/` require manifest activation;
- forbid whole-repo reading;
- forbid reading all of `/docs`;
- forbid loading all shards;
- require stopping when expansion exceeds scope, budget, trigger, or
  authority.

Conceptual required sections:

- `Agent Identity`
- `Support Pack Location`
- `Required First Reads`
- `Default Load`
- `Activation Rule`
- `Reading Limits`
- `Stop Conditions`
- `Expected Output`

`START.md` must not:

- explain all behavior;
- duplicate `MANIFEST.md`;
- duplicate `_shared`;
- copy the kernel;
- copy the Senior Agent Profile;
- copy `/docs`;
- list every shard body;
- authorize broad discovery.

## 14. MANIFEST.md Contract

`MANIFEST.md` is the activation controller and anti-load-all mechanism for a
micro-pack.

It must:

- inventory every shard in the micro-pack;
- classify each shard by temperature;
- declare activation triggers;
- declare non-triggers and do-not-load conditions;
- declare dependencies;
- declare missing-shard behavior;
- declare relationship to `_shared`;
- declare allowed references to `/docs`;
- declare when to stop and request scope;
- prevent loading by completeness;
- prevent cold reads without strong triggers.

Conceptual required sections:

- `Manifest Identity`
- `Shard Inventory`
- `Temperature Classification`
- `Activation Triggers`
- `Do-Not-Load Conditions`
- `Dependencies`
- `Allowed Docs References`
- `Missing-Shard Behavior`
- `Stop And Scope Conditions`
- `Trace Requirements`

The manifest must stay functional rather than narrative. It should decide what
can be loaded, why it can be loaded, what must not be loaded, and what happens
when required support is absent.

## 15. Shard Contract

A shard is a single-responsibility support file activated by the manifest.

Every future shard must conceptually declare:

- shard id;
- owning canonical agent;
- temperature;
- purpose;
- canonical source;
- project-local source, if any;
- triggers;
- non-triggers;
- dependencies;
- allowed reads;
- forbidden reads;
- output impact;
- risk level;
- trace requirement;
- split rule when the shard grows beyond one responsibility.

Shard rules:

- one shard owns one behavior concern;
- a shard must not import unrelated behavior for convenience;
- a shard must not silently expand its read scope;
- a shard must not copy whole kernel/profile/docs content;
- a shard must not activate another shard unless the manifest declares that
  dependency;
- a shard that needs unmapped project context must stop instead of doing broad
  discovery.

This phase does not create shards.

## 16. Temperature Contract

Temperature controls operational loading.

Temperature is not importance. It is a safety and activation classification.

General rules:

- `always/` loads at the start or nearly always, and must remain minimal;
- `hot/` loads for frequent project-specific work for that agent;
- `warm/` loads for common trigger-based work;
- `cold/` loads only for strong triggers involving high risk, escalation,
  serious ambiguity, failure, or cross-owner concerns;
- `trace/` is audit-only and is not default operational reading.

Promotion or demotion criteria:

- promote a shard toward `always/` only when the agent cannot safely perform
  normal work without it;
- promote a shard toward `hot/` only when it is frequently needed and narrowly
  scoped;
- keep a shard in `warm/` when it is common but clearly trigger-based;
- keep or move a shard to `cold/` when it is rare, high-risk, escalation-heavy,
  or cross-owner;
- move a shard out of `always/` when it is conditional, surface-specific,
  high-risk, or verbose;
- move a shard out of `hot/` when it depends on explicit risk, schema,
  authorization, ownership, or validation triggers.

No numeric file-size or token-size limit is active in this phase. If future
limits are desired, they must be proposed and authorized in a later contract.

## 17. Always Contract

`always/` is the minimum operational support set.

Required conceptual files:

- `always/ROLE_AND_AUTHORITY.md`
- `always/OUTPUT_CONTRACT.md`

`ROLE_AND_AUTHORITY.md` owns:

- identity;
- mission;
- authority;
- non-authority;
- role boundary;
- minimum safe behavior boundary.

`OUTPUT_CONTRACT.md` owns:

- status vocabulary;
- output expectations;
- handoff shape;
- evidence expectations;
- completion and blocked-output discipline.

`always/` must:

- be small;
- load before task classification;
- preserve kernel and profile anchors;
- avoid project-doc dumps;
- avoid conditional gates that belong in `warm/` or `cold/`.

`always/` must not become the agent body.

## 18. Hot Contract

`hot/` contains frequent project-specific shards for a given agent.

Hot shards may cover:

- common project surfaces for the agent;
- routine project conventions;
- frequent baseline reading paths;
- common implementation or review lanes;
- common output refinements;
- standard project-local constraints.

Hot shards require manifest activation. They must not load merely because they
are useful in many cases.

Hot shards must remain narrower than `_shared` and more frequent than `warm/`.
If a hot shard becomes broad, cross-agent, or globally normative, it should move
to `_shared` or split.

## 19. Warm Contract

`warm/` contains trigger-based common shards.

Warm shards may cover:

- contract interpretation;
- validation expectations;
- schema or shape reasoning;
- authentication or authorization reasoning;
- feature-specific common behavior;
- moderate risk gates;
- decision and reading heuristics;
- package or handoff logic.

Warm shards load only when the current demand matches their declared triggers.

Warm shards must declare:

- why the trigger is sufficient;
- which dependencies are required;
- which reads are allowed;
- when the agent must stop instead of escalating to cold.

## 20. Cold Contract

`cold/` contains rare, high-risk, escalation, failure, ambiguity, authority, or
cross-owner shards.

Cold shards may cover:

- `CROSS_OWNER_ESCALATION.md`;
- serious ambiguity;
- missing authority;
- blocked or failed handoff;
- high-risk validation conflict;
- unsafe broad-reading pressure;
- cross-surface ownership conflict;
- exceptional correction or rollback reasoning.

Cold shards must not load without a strong trigger. A weak desire for more
context is not a cold trigger.

If a cold shard is needed but not present, the correct behavior is to stop,
request scope or decision, and record a future gap. The agent must not
improvise equivalent high-risk behavior from memory.

## 21. Trace Contract

`trace/` is audit-only support.

Required conceptual files:

- `trace/SOURCE_TRACE.md`;
- `trace/SHARD_INDEX.md`.

Trace files support:

- source provenance;
- behavior parity audit;
- shard inventory audit;
- activation audit;
- anti-duplication audit;
- anti-bloat audit;
- docs-consumption audit;
- cold-trigger audit.

Trace files are not normal operational reading. They may be consulted for a
read-only audit, gap review, or future validation phase, but loading trace by
default would violate the activation model.

## 22. Source Trace Contract

`trace/SOURCE_TRACE.md` records source-to-shard provenance.

It must conceptually record, for each shard:

- shard id;
- owning agent;
- source kernel file or section anchor;
- Senior Agent Profile module anchor;
- project docs map reference, if any;
- project surface reference, if any;
- template or target-shape relationship, if any;
- transformation note;
- non-copying evidence;
- behavior parity risk;
- audit note.

`SOURCE_TRACE.md` references sources. It does not copy full source text.

The trace must make it possible for a later read-only audit to verify that
strong sources stayed strong without becoming raw pasted monoliths.

## 23. Shard Index Contract

`trace/SHARD_INDEX.md` records the micro-pack shard inventory.

It must conceptually record:

- shard id;
- path;
- temperature;
- owner agent;
- purpose;
- activation triggers;
- do-not-load conditions;
- dependencies;
- allowed reads;
- forbidden reads;
- risk level;
- source trace pointer;
- current audit status.

`SHARD_INDEX.md` is not an alternate manifest. The manifest controls activation;
the shard index supports audit.

## 24. Kernel-to-Shard Contract

Kernels are strong canonical behavior sources.

They must not be copied literally into project agents or support packs. Future
materialization must preserve semantic force by transforming kernel anchors
into focused, traceable, activatable shards.

Mandatory conceptual mapping:

| Kernel concept | Future shard home |
| --- | --- |
| identity | `always/ROLE_AND_AUTHORITY.md` |
| mission | `always/ROLE_AND_AUTHORITY.md` |
| authority | `always/ROLE_AND_AUTHORITY.md` |
| non-authority | `always/ROLE_AND_AUTHORITY.md` |
| output canonicity | `always/OUTPUT_CONTRACT.md` |
| status/handoff | `always/OUTPUT_CONTRACT.md` or `cold/CROSS_OWNER_ESCALATION.md` |
| gates of the role | `warm/*` or `cold/*` |
| minimum safe bundle | `always/*` plus `MANIFEST.md` |
| behavior parity | `trace/SOURCE_TRACE.md` plus specific shards |

Semantic preservation rules:

- preserve the kernel's role boundary;
- preserve authority and non-authority with equal or greater clarity;
- preserve gates as activated shards, not as buried prose;
- preserve output expectations in the output contract;
- preserve handoff/status behavior in output or escalation shards;
- preserve minimum safe bundle behavior without loading everything;
- require source trace for each material kernel anchor;
- block future implementation or audit if a material kernel anchor has no
  planned shard home.

This plan defines mapping only. It does not transform kernels.

## 25. Senior-Profile-to-Shard Contract

Senior Agent Profiles are strong canonical seniorization sources.

They must not be copied literally into project agents or support packs. Future
materialization must preserve senior judgment by transforming profile modules
into targeted shards.

Mandatory conceptual mapping:

| Senior profile module | Future shard home |
| --- | --- |
| `01_IDENTITY_AND_BOUNDARY` | `always/ROLE_AND_AUTHORITY.md` |
| `02_DECISION_AND_READING` | `hot/*` and `warm/*` |
| `03_RISK_AND_GATES` | `warm/*` and `cold/*` |
| `04_HANDOFF_EVIDENCE_AND_OUTPUT` | `always/OUTPUT_CONTRACT.md` and `cold/CROSS_OWNER_ESCALATION.md` |

Preservation rules:

- preserve judgment heuristics without producing a profile monolith;
- preserve reading discipline as activated hot or warm shards;
- preserve risk taxonomy and gates as warm or cold shards;
- preserve evidence and handoff rules in output or escalation shards;
- preserve stop/block patterns;
- preserve anti-overreach and anti-bloat rules;
- require trace for each material senior-profile anchor.

This plan defines mapping only. It does not transform profiles.

## 26. /docs Consumption Contract

`stnl_project_agent_specializer` does not create `/docs`.

It consumes `/docs` already created by:

- `stnl_project_context`;
- `stnl_project_foundation`.

Rules:

- `/docs` is not read entirely by default;
- `/docs` is not copied entirely;
- `/docs` is not dumped into `_shared`;
- `/docs` is not dumped into micro-packs;
- `/docs` enters through a docs map;
- `/docs` enters through project surfaces;
- `/docs` enters by narrow references in activated shards;
- cold docs references require a strong trigger;
- broad docs reading requires stopping and requesting scope or decision.

`_shared/02_PROJECT_DOCS_MAP.md` must work as a map:

- identify available doc regions;
- connect doc regions to project concepts, surfaces, or ownership;
- record narrow allowed paths;
- identify unmapped or uncertain docs;
- avoid copying doc bodies.

`_shared/03_PROJECT_SURFACES.md` must work as a surface map:

- identify known code, product, platform, data, infra, iOS, frontend,
  backend, validation, and docs surfaces as applicable;
- connect surfaces to likely owning agents;
- identify cross-owner boundaries;
- identify surface-specific docs references;
- avoid repo-wide discovery.

If the agent needs to understand a project area not mapped by these files or an
activated shard, it must stop and request scope instead of reading broadly.

## 27. Activation Contract

Future activation must follow this flow:

1. Read target platform entrypoint.
2. Read `.sentinel/agents/<agent>/START.md`.
3. Read `.sentinel/agents/<agent>/MANIFEST.md`.
4. Load only `always/`.
5. Classify the demand.
6. Load `hot/`, `warm/`, or `cold/` only when `MANIFEST.md` activates them.
7. Consult `/docs` only through paths indicated by an activated shard.
8. If broad reading is required, stop and request scope or decision.

Hard rules:

- do not load all shards;
- do not read the whole repo;
- do not read all of `/docs`;
- do not load cold without a strong trigger;
- do not use extra reading to avoid a decision that should be explicit;
- do not substitute one shard for another without a declared manifest
  dependency or trigger.

Activation is a safety contract, not an optimization.

## 28. Anti-Bloat Contract

Anti-bloat rules:

- entrypoints must stay small;
- `START.md` must stay small and directional;
- `MANIFEST.md` must be functional, not narrative;
- `always/` must remain minimal;
- `hot/`, `warm/`, and `cold/` must be trigger-governed;
- `trace/` must remain audit-only;
- `_shared` must not become a dump;
- no file may copy a full kernel;
- no file may copy a full Senior Agent Profile;
- no file may dump `/docs`;
- no file may become a recombined monolith.

Split rules:

- split by responsibility when a shard has more than one behavior concern;
- split by trigger when only part of a shard applies to a demand;
- split by risk when high-risk behavior is mixed with routine behavior;
- split by source when kernel, profile, and docs provenance become unclear;
- split by ownership when cross-agent or cross-surface behavior appears.

No rigid size number is active in this phase. A future size budget may be
proposed later, but it is not a rule here.

## 29. Anti-Duplication Contract

Anti-duplication rules:

- every rule must have one authoritative home;
- common rules live in `_shared`;
- agent-specific rules live in the agent micro-pack;
- entrypoints point to rules and do not duplicate them;
- `START.md` points and does not duplicate `MANIFEST.md`;
- `MANIFEST.md` indexes and activates but does not duplicate shard bodies;
- trace references source and does not copy source;
- `/docs` is mapped, not duplicated;
- templates are not inferred or copied into support packs;
- duplicated text is allowed only with explicit justification and declared
  source of truth.

If a rule appears in more than one place, future audit must be able to identify
which location is authoritative and why duplication is necessary.

## 30. Missing-Shard Behavior Contract

When an expected shard is absent, the agent must not improvise the missing
rule.

Allowed behaviors:

- continue with `always/` only when the task remains trivial, low-risk, and
  inside already loaded authority;
- stop and request scope when the missing shard is needed to identify the
  correct project surface, docs path, or trigger;
- block execution when the missing shard is required for safety, authority,
  validation, risk, gate, output, or handoff;
- request a decision when ambiguity requires human choice;
- record a future gap when the absence indicates incomplete support-pack
  planning;
- avoid loading an alternate shard unless `MANIFEST.md` declares the alternate
  as a valid dependency or fallback under the same trigger.

Missing cold shards are especially strict. If cold behavior is triggered and
the shard is missing, the agent should stop and request decision or scope.

## 31. Broad-Reading Refusal Contract

The agent must stop and request scope or decision when it would need to:

- read the whole repo;
- read all of `/docs`;
- load all shards;
- inspect unmapped project surfaces;
- cross ownership boundaries;
- resolve ambiguity that depends on human decision;
- access cold behavior without a strong trigger;
- use broad reading to avoid a required explicit decision.

The refusal should be specific. It should state what additional scope, mapped
surface, docs path, shard, or decision is needed. It should not turn into a
general refusal of the user's task when narrow scope can unblock safe progress.

## 32. Support-Pack Counting Contract

The future support layer must preserve these counts:

- 12 canonical agents;
- 24 agent artifacts;
- 2 target-level artifacts.

Support-pack counting rules:

- `_shared` is not an agent;
- each per-agent micro-pack is not an agent;
- support packs do not count as agent artifacts;
- `.sentinel/agents/**` is not a third matrix of agents;
- `.sentinel/agents/**` does not replace `.github/agents/**`;
- `.sentinel/agents/**` does not replace `.codex/agents/**`;
- support layer files do not change the canonical agent list;
- support layer files do not change the official target-level artifact count.

Any future report or validation that counts support packs as agents is wrong
under this contract.

## 33. Future Template Gap Contract

Templates for `.sentinel/agents/**` support packs are not authorized by this
phase.

Contract rules:

- do not assume support-pack templates exist;
- do not infer support-pack templates from the conceptual shape;
- do not generate final template content;
- do not alter existing `reference/templates/**`;
- do not use the productive skill as a template source;
- treat `.sentinel/agents/**` templates as a future gap until a separate phase
  explicitly authorizes them;
- require any future template to be auditable against this contract plan.

The existing `reference/templates/**` contract covers the currently authorized
platform output shapes. It does not authorize support-pack templates.

## 34. Future Validation/Audit Contract

This plan does not create validation.

Future validation may be planned only in a separate phase. That phase may
propose a read-only audit plan for:

- entrypoint smallness;
- `_shared` responsibility boundaries;
- one micro-pack per canonical agent;
- `START.md` and `MANIFEST.md` shape;
- shard temperature and activation rules;
- kernel-to-shard trace;
- Senior-Profile-to-shard trace;
- `/docs` map discipline;
- anti-bloat and anti-duplication;
- broad-reading refusal;
- support-pack counting.

Future validation rules:

- do not create a checker in this phase;
- do not create a tenth check in this phase;
- do not alter official child checks in this phase;
- do not alter the Aggregator in this phase;
- do not register support-pack validation in the Aggregator without a separate
  explicit decision;
- preserve the 9 current child checks.

## 35. Risks And Open Questions

Risks:

- support-pack templates could be proposed too early and drift into
  implementation;
- `_shared` could become a dump if responsibility boundaries are weak;
- `MANIFEST.md` could become narrative instead of activation logic;
- trace could be loaded operationally instead of remaining audit-only;
- cold shards could be loaded as a substitute for making a decision;
- `/docs` maps could drift into copied docs content;
- future validation pressure could attempt to expand the Aggregator.

Open questions for future phases:

- What exact support-pack template syntax, if any, should be authorized later?
- What future audit shape should verify this plan without becoming a checker?
- Should future support-pack contracts use explicit block codes, and if so in
  which separately authorized contract?
- What project-specific fields belong in `02_PROJECT_DOCS_MAP.md` and
  `03_PROJECT_SURFACES.md` once real target access is authorized?
- What source should authorize `04_MODEL_POLICY.md` content in a target
  project?
- Should future size limits be numeric, heuristic, or purely responsibility
  based?

None of these questions block this documentation-only plan.

## 36. Future Work

Recommended future work:

1. Run a read-only audit of this contract plan.
2. If approved, decide whether a separate support-pack template planning phase
   is authorized.
3. If separately authorized, plan read-only fixture or example scenarios
   without touching the official Aggregator.
4. If separately authorized later, define a dry-run-only support-pack planning
   boundary.
5. Keep implementation, templates, validation, scripts, fixtures, Target access,
   GitHub access, and productive-skill access in separate explicit phases.

Future work must restate:

- allowed read paths;
- allowed write paths;
- productive-skill boundary;
- Target real boundary;
- GitHub boundary;
- Aggregator boundary;
- checker boundary;
- no-tenth-check policy;
- template authorization status;
- non-authorization summary.

## 37. Explicit Non-Authorization

This contract plan explicitly does not authorize:

- implementation;
- templates;
- scripts;
- fixtures;
- materialization;
- Target real access;
- GitHub access;
- productive skill access;
- Aggregator change;
- checker creation;
- tenth check creation;
- renderer creation;
- writer creation;
- loader creation;
- Target Adapter creation;
- Write Approval creation;
- runtime creation;
- CLI creation;
- official schema creation;
- stdout contract creation;
- persistent report creation;
- branch creation;
- commit creation;
- pull request creation;
- target-project mutation;
- productive-template mutation;
- official child-check mutation;
- support-pack generation;
- `.sentinel/agents/**` generation;
- `.github/agents/**` generation;
- `.codex/agents/**` generation;
- `AGENTS.md` generation;
- `.codex/config.toml` generation.

The only output of this phase is this single contract plan document.
