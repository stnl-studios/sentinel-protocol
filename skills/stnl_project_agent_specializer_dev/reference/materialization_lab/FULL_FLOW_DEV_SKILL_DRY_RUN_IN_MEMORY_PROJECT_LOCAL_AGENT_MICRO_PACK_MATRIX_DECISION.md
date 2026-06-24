# Full-Flow Dev-Skill Dry-Run In-Memory Project-Local Agent Micro-Pack Matrix Decision

Status: READY

Phase:
MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX_DECISION

Verdict:
PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX is the canonical architectural direction
for future agent materialization planning.

This is a documentary, dev-only, decision-only artifact. It does not implement
the architecture, create a renderer, create a writer, create a loader, create a
Target Adapter, create a Write Approval implementation, create a runtime, create
a CLI, create an official schema, create a stdout contract, create a persistent
report, create templates, create fixtures, create scripts, alter checks, alter
the Validation Harness Aggregator, access a real Target, access GitHub, access
the productive skill, create a branch, create a commit, or open a pull request.

## 1. Title

Full-flow dev-skill dry-run in-memory project-local agent micro-pack matrix
decision.

## 2. Verdict

The approved architecture is:

`PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`

Future materialization must keep canonical agent entrypoints small and must add
a project-local support layer under `.sentinel/agents/**`. The support layer is
not an agent matrix, does not count as agents, and does not replace either
`.github/agents/**` or `.codex/agents/**`.

The architecture must not generate heavy agents. It must not copy kernels,
Senior Agent Profiles, or `/docs` wholesale into target-project agent
entrypoints or micro-packs. Strong behavior parity must come from prepared,
traceable, project-adapted shards loaded by activation rules.

This verdict is documentation-only and does not authorize implementation.

## 3. Executive Summary

The current full-flow Materialization Lab direction is ready to document the
next architectural step after the audited in-memory package orchestration and
consumer work:

- package orchestrator consumer is implemented;
- consumer audit is `EXCELLENT PASS`;
- there are no blockers, warnings, or pending correction packs in the provided
  decision context;
- the official Aggregator remains preserved;
- the current canonical direction is
  `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`;
- this phase only formalizes the decision.

The decision preserves the existing 12-agent matrix and the existing target
artifacts while defining `.sentinel/agents/**` as a project-local support layer
containing small micro-packs. Kernels and Senior Agent Profiles remain strong
canonical sources, but they must be redistributed into precise shards rather
than copied literally. `/docs` remains an external project documentation source
created by other Sentinel skills and consumed on demand, not dumped into agents.

## 4. Scope

This decision is limited to documenting the architecture inside the dev skill:

`skills/stnl_project_agent_specializer_dev/reference/materialization_lab/`

It may describe future target-project shape, future activation flow, future
support-pack structure, and future source-to-shard mapping. It does not create
those target-project files.

This decision uses only the dev-skill architectural context and the approved
gap assessment state supplied for this phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX_DECISION_AND_GAP_ASSESSMENT: READY_FOR_DECISION_DOCUMENTATION`

## 5. Non-Goals

This phase does not:

- implement materialization;
- create or alter scripts;
- create or alter templates;
- create or alter fixtures;
- create or alter schemas;
- create or alter checkers;
- create a tenth check;
- alter official child checks;
- register anything in the Validation Harness Aggregator;
- alter the Aggregator wrapper;
- alter `README.md`;
- alter `reference/MANIFEST.md`;
- create generated output;
- create materialized output;
- access a real Target;
- read or write target-project `.github/**`, `.codex/**`, `.sentinel/**`, or
  `AGENTS.md`;
- access GitHub;
- create a branch, commit, pull request, issue, or remote artifact;
- access, compare, use as source, or mutate the productive
  `skills/stnl_project_agent_specializer/` skill;
- create a renderer, writer, loader, runtime, CLI, Target Adapter, Write
  Approval implementation, approval token, approval registry, signer,
  persistent report, stdout contract, or official schema.

## 6. Canonical Matrix Preservation

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

Agent-level artifacts remain:

- 12 x `.github/agents/<agent>.agent.md`
- 12 x `.codex/agents/<agent>.toml`

Total agent-level artifacts:

- 24 agent artifacts.

Target-level artifacts remain:

- `.codex/config.toml`
- `AGENTS.md`

Total target-level artifacts:

- 2 target-level artifacts.

Counting rules:

- `.codex/config.toml` does not count as an agent;
- `AGENTS.md` does not count as an agent;
- support packs do not count as agents;
- `.sentinel/agents/**` does not replace `.github/agents/**`;
- `.sentinel/agents/**` does not replace `.codex/agents/**`;
- the canonical matrix remains 12 agents, 24 agent artifacts, and 2
  target-level artifacts.

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

The Aggregator wrapper is not a tenth child check. This decision registers no
new check and authorizes no checker creation.

## 7. Decision

The architecture is formally decided as
`PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`.

The decision is binding for future architecture planning:

1. `.sentinel/agents/**` is a project-local support layer.
2. The support layer does not count as an agent.
3. The support layer does not replace `.github/agents/**`.
4. The support layer does not replace `.codex/agents/**`.
5. Entrypoints must remain small.
6. Entrypoints must point to micro-packs instead of carrying the whole
   behavior.
7. Each canonical agent receives one local micro-pack.
8. `_shared` centralizes common rules.
9. `START.md` defines the minimal entry and reading sequence.
10. `MANIFEST.md` decides shard activation.
11. `always/` contains only role, authority, non-authority, and output
    contract.
12. `hot/` contains frequent project-specific baseline rules.
13. `warm/` contains rules activated by common triggers.
14. `cold/` contains escalations, high-risk rules, and rare cases.
15. `trace/` is audit material and not normal operation.
16. Kernels are strong canonical sources, but they are not copied literally.
17. Senior Agent Profiles are strong canonical sources, but they are not
    copied literally.
18. `/docs` is consumed on demand without dumps and without broad default
    reading.
19. Behavior parity comes from traceability and prepared shards.
20. The skill remains immutable per project.
21. The architecture preserves the dev-only, in-memory-only, no-write, and
    non-authorizing boundaries of the current track.
22. This decision does not authorize implementation.

## 8. Target Project Shape

The expected future target-project shape is:

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

This shape is an architectural target only. It is not created by this decision.

## 9. Entrypoint Strategy

Entrypoints are the agent files visible to the target platforms:

- `.github/agents/<agent>.agent.md`
- `.codex/agents/<agent>.toml`

Entrypoints must remain small. They should identify the canonical agent, declare
the relevant platform entry behavior, and point to the local micro-pack under
`.sentinel/agents/<agent>/`. They must not reprint full kernels, full Senior
Agent Profiles, full `/docs`, or all support shards.

The target-level files `.codex/config.toml` and `AGENTS.md` remain
target-level artifacts. They may route or describe the project-level agent
surface, but they do not count as agents and must not inflate the canonical
matrix.

## 10. Project-Local Support Layer

`.sentinel/agents/**` is the project-local support layer for future
materialized agents.

The support layer exists to hold prepared, project-adapted shards that would be
too large, too specific, or too conditional for small platform entrypoints. It
is local to the target project because it captures that project's surfaces,
docs map, routing expectations, support-pack rules, and shard activation
choices.

The support layer is not a third target platform. It is not a replacement for
GitHub agent files. It is not a replacement for Codex agent files. It is not a
hidden agent matrix. It is the project-local support memory used by the
canonical 12 agents.

## 11. Shared Support Pack

`.sentinel/agents/_shared/` centralizes rules that are common across agents.

The shared support pack owns:

- `00_RUNTIME_CONTRACT.md`: future runtime/activation assumptions and hard
  boundaries;
- `01_GLOBAL_READING_CONTRACT.md`: shared reading discipline and limits;
- `02_PROJECT_DOCS_MAP.md`: map of project docs, not a dump of project docs;
- `03_PROJECT_SURFACES.md`: known project surfaces and ownership hints;
- `04_MODEL_POLICY.md`: model-routing or capability policy when authorized by a
  later phase;
- `05_ROUTING_MATRIX.md`: cross-agent routing and handoff hints;
- `06_SUPPORT_PACK_RULES.md`: global rules for support-pack loading,
  duplication, temperature, trace, and anti-bloat.

Common rules must have one authoritative home. They must not be copied into all
12 agent micro-packs unless a future phase explicitly decides a narrow,
agent-specific repetition is necessary.

## 12. Per-Agent Micro-Pack

Each canonical agent receives exactly one project-local micro-pack:

`.sentinel/agents/<agent>/`

The micro-pack contains:

- `START.md`
- `MANIFEST.md`
- `always/`
- `hot/`
- `warm/`
- `cold/`
- `trace/`

The micro-pack is not a monolithic prompt. It is a set of single-responsibility
shards selected by a manifest. It must keep agent identity, authority,
non-authority, output expectations, common triggers, rare escalation paths, and
source traceability separable.

## 13. START.md Role

`START.md` is the minimal entry point inside each micro-pack.

It defines:

- the canonical agent id;
- the minimal local reading sequence;
- required first files;
- when to consult `_shared`;
- when to consult `MANIFEST.md`;
- the rule that only activated shards are loaded;
- the rule that broad repo or `/docs` reading requires scope or a decision.

`START.md` points and orients. It must not explain all behavior, duplicate all
rules, or become a large agent body.

## 14. MANIFEST.md Role

`MANIFEST.md` decides shard activation.

It defines:

- shard inventory;
- shard purpose;
- activation triggers;
- dependencies;
- do-not-load conditions;
- required trace entries;
- blocking behavior when a required shard is missing;
- relationship to `_shared`;
- paths to `/docs` that a shard may consult when triggered.

`MANIFEST.md` is the anti-load-all mechanism. It must block or refuse broad
loading when a demand lacks the trigger needed for hot, warm, cold, or docs
access.

## 15. Temperature Model

The support layer uses a temperature model for shard placement.

`always/`:

- contains mandatory minimal behavior;
- includes only `ROLE_AND_AUTHORITY.md` and `OUTPUT_CONTRACT.md`;
- owns role, mission, authority, non-authority, status vocabulary, and output
  contract;
- must stay small enough to load for normal work.

`hot/`:

- contains frequent project-specific baseline rules;
- captures common surface facts, project conventions, ownership defaults, and
  routine constraints;
- should be loaded only when the manifest says the current task touches that
  agent's frequent baseline.

`warm/`:

- contains trigger-based common shards;
- captures decision, reading, risk, gate, package, validation, implementation,
  or handoff patterns that are common but not universal;
- loads only when a concrete trigger is present.

`cold/`:

- contains rare, high-risk, escalation, cross-owner, failure, ambiguity,
  authority, or exceptional-case shards;
- must not be loaded without a strong trigger;
- is the correct home for cross-owner escalation such as
  `CROSS_OWNER_ESCALATION.md`.

`trace/`:

- contains audit-only files;
- includes `SOURCE_TRACE.md` and `SHARD_INDEX.md`;
- is not normal operational reading;
- supports parity audits, source mapping, and shard provenance.

## 16. Kernel-to-Shard Mapping

The canonical kernels remain strong behavior sources.

They must not be copied literally into project agents or support packs. Future
materialization must transform kernel behavior into prepared, smaller,
activatable, project-adapted shards while preserving source traceability and
behavior parity.

Conceptual mapping:

| Kernel concept | Future shard home |
| --- | --- |
| identity | `always/ROLE_AND_AUTHORITY.md` |
| mission | `always/ROLE_AND_AUTHORITY.md` |
| authority | `always/ROLE_AND_AUTHORITY.md` |
| non-authority | `always/ROLE_AND_AUTHORITY.md` |
| canonical output | `always/OUTPUT_CONTRACT.md` |
| status/handoff | `always/OUTPUT_CONTRACT.md` or `cold/CROSS_OWNER_ESCALATION.md` |
| role gates | `warm/*` or `cold/*` |
| minimum safe bundle | `always/*` plus `MANIFEST.md` |
| behavior parity | `trace/SOURCE_TRACE.md` plus specific shards |

The kernel remains strong because its behavior is redistributed into precise
shards, not reduced to a weak summary. Required kernel anchors must remain
traceable, and loss of material anchors must block future implementation or
audit.

## 17. Senior-Profile-to-Shard Mapping

The canonical Senior Agent Profiles remain strong behavior sources.

They must not be copied literally into project agents or support packs. Future
materialization must transform profile heuristics into prepared shards for
judgment, reading, risk, gates, evidence, output, and handoff.

Conceptual mapping:

| Senior profile module | Future shard home |
| --- | --- |
| `01_IDENTITY_AND_BOUNDARY` | `always/ROLE_AND_AUTHORITY.md` |
| `02_DECISION_AND_READING` | `hot/*` and `warm/*` |
| `03_RISK_AND_GATES` | `warm/*` and `cold/*` |
| `04_HANDOFF_EVIDENCE_AND_OUTPUT` | `always/OUTPUT_CONTRACT.md` and `cold/CROSS_OWNER_ESCALATION.md` |

The profile remains strong because its heuristics become targeted shards:

- judgment shards;
- reading-priority shards;
- risk shards;
- gate shards;
- handoff shards;
- evidence shards;
- output shards.

This preserves seniority without rebuilding a monolith.

## 18. /docs Consumption Model

`stnl_project_agent_specializer` does not create `/docs`.

It consumes `/docs` that was already created by:

- `stnl_project_context`;
- `stnl_project_foundation`.

`/docs` must not be copied wholesale into agent entrypoints or micro-packs.
It must not be dumped into `.sentinel/agents/**`. It must orient future shards
through maps, surfaces, and narrow triggered references.

Future `/docs` influence is limited to:

- `.sentinel/agents/_shared/02_PROJECT_DOCS_MAP.md`;
- `.sentinel/agents/_shared/03_PROJECT_SURFACES.md`;
- `.sentinel/agents/<agent>/hot/*PROJECT_BASELINE*.md`;
- `.sentinel/agents/<agent>/warm/*TRIGGER*.md`.

Mandatory rules:

- do not read `/docs` entirely by default;
- do not dump `/docs`;
- consult docs on demand;
- cold references require a strong trigger;
- if broad reading appears necessary, stop and request scope or a decision;
- extra reading must not be used to avoid a decision that should be made
  explicitly.

## 19. Anti-Bloat Rules

The architecture requires:

- entrypoints stay small;
- `START.md` points and orients, but does not explain everything;
- `MANIFEST.md` decides activation;
- `_shared` centralizes common rules;
- `always/` stays minimal;
- `hot/` covers frequent usage;
- `warm/` covers common triggers;
- `cold/` covers rare cases;
- `trace/` audits;
- kernels are not copied literally;
- Senior Agent Profiles are not copied literally;
- `/docs` is not dumped;
- all shards are not loaded by default;
- heavy agent files are rejected as the wrong architecture.

If a shard becomes too large, it must be split by responsibility, trigger, or
risk class.

## 20. Anti-Duplication Rules

The architecture requires every rule to have one authoritative home.

Rules:

- common rules live in `_shared`;
- agent-specific rules live in that agent's micro-pack;
- platform entrypoints point to support packs rather than duplicating them;
- target-level artifacts do not reprint all agent behavior;
- the same global rule must not be repeated across 12 agents;
- shards must have single responsibility;
- trace records provenance instead of duplicating source text;
- behavior parity is proven by source trace and targeted shard coverage, not by
  copying complete source documents.

Duplication is allowed only when a future explicitly authorized phase proves a
specific agent requires a local copy for platform constraints, and the source of
truth remains declared.

## 21. Activation Flow

Future activation must follow this canonical flow:

1. Read the target entrypoint.
2. Read `.sentinel/agents/<agent>/START.md`.
3. Read `.sentinel/agents/<agent>/MANIFEST.md`.
4. Load only `always/` shards.
5. Classify the demand.
6. Load `hot/`, `warm/`, or `cold/` only if the manifest activates them.
7. Consult `/docs` only through paths indicated by an activated shard.
8. If broad reading is required, stop and request scope or a decision.

Hard rules:

- do not load all shards;
- do not read the whole repo;
- do not read all of `/docs`;
- do not load a cold shard without a strong trigger;
- do not use extra reading to avoid a required decision.

## 22. Traceability Model

Traceability is mandatory for behavior parity.

`trace/SOURCE_TRACE.md` records which kernel, Senior Agent Profile module,
template, project docs map, and project surface source influenced each shard.

`trace/SHARD_INDEX.md` records shard inventory, activation class, owner,
dependencies, source anchors, and audit notes.

Trace is audit-only. It is not part of normal operational reading. It exists so
a future read-only audit can prove that:

- kernel anchors were preserved without raw copy;
- Senior Profile heuristics were preserved without raw copy;
- `/docs` was mapped rather than dumped;
- common rules were centralized;
- agent-specific shards remained single-purpose;
- cold shards were not silently promoted into default reading;
- entrypoints remained small;
- the 12-agent matrix was preserved.

## 23. Boundaries

This decision preserves the current track boundaries:

- dev-only;
- documentation-only;
- decision-only;
- in-memory-only;
- no-write;
- non-authorizing;
- no real Target;
- no GitHub;
- no productive skill access;
- no Aggregator change;
- no checker creation;
- no tenth check;
- no runtime;
- no materializer;
- no renderer;
- no writer;
- no loader;
- no Target Adapter;
- no Write Approval implementation;
- no schema;
- no CLI;
- no stdout contract;
- no persistent report.

Future work must treat these boundaries as active unless a later phase
explicitly authorizes a narrow change.

## 24. Future Work

Recommended future work, only after a read-only audit of this decision:

- audit this decision for completeness against the approved gap assessment;
- if approved, plan a separate documentation-only micro-pack contract phase;
- if separately authorized, plan fixture or validation updates without changing
  the official Aggregator;
- if separately authorized much later, design a dry-run-only planner for the
  project-local support layer;
- keep every implementation step separate from this decision.

Any future implementation phase must restate scope, write authorization,
Target access policy, productive-skill boundary, GitHub boundary, Aggregator
boundary, and no-tenth-check policy.

## 25. Explicit Non-Authorization

This decision explicitly does not authorize:

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
- support-pack generation.

The only result of this phase is this single architectural decision document.
