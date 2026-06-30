# Project-Local Agent Micro-Pack Template Layout, Naming, and Source-Selection Specification

## 1. Verdict

`TEMPLATE_LAYOUT_NAMING_AND_SOURCE_SELECTION_SPECIFICATION_DOCUMENTATION_ONLY_TEMPLATE_WRITE_BLOCKED`

This specification phase is `PASS`. It establishes documentation-level conventions and derivation rules only. Template writing, template mutation, exact-allowlist approval, materialization, and rendered output remain blocked.

## 2. Executive Summary

This document is the canonical documentation basis for a future retry of the path, filename, and body-basis decision for `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX` templates. It defines a fail-closed taxonomy, symbolic layout convention, deterministic naming inputs, source-selection constraints, transformation constraints, placeholder categories, collision handling, and traceability expectations.

It does not create a template, define a final template body, select final placeholder syntax or values, establish an exact template write allowlist, or authorize any write phase. A future decision must convert these conventions into explicit path, filename, and body-basis records without consulting existing templates. Only a later exact-allowlist `PASS` may allow consideration of a create-only template write phase.

## 3. Scope

This document specifies, at documentation level only:

- dev-template layout conventions;
- template family taxonomy and family keys;
- deterministic naming inputs and normalization rules;
- source-selection rules per future template family;
- transformation rules per future template family;
- derivation methods for body, path, and filename bases;
- placeholder namespace categories in principle;
- no-copy, anti-bloat, traceability, collision, and preexistence policies;
- fail-closed criteria for future decision and write phases; and
- the permitted sequence for future retries.

The convention is symbolic until a future authorized decision enumerates exact template paths and filenames. All conceptual target paths in this document describe architecture only and are not materialized by this phase.

## 4. Non-Goals

This phase does not:

- create, alter, compare, render, validate, or inspect templates;
- define final template bodies, final sections, final prose, placeholder syntax, or placeholder values;
- create an implementation-ready template through embedded examples;
- authorize template creation, mutation, replacement, or materialization;
- establish an exact write allowlist;
- access a real Target, GitHub, or the productive skill;
- create fixtures, snapshots, parsers, renderers, schemas, validators, checkers, materializers, or generated output;
- change the Aggregator or its nine-child-check boundary; or
- resolve missing canonical input by invention.

## 5. Canonical Architecture Basis

The architectural direction is `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`. Its conceptual target surfaces are:

- `.github/agents/<agent>.agent.md`
- `.codex/agents/<agent>.toml`
- `.sentinel/agents/_shared/**`
- `.sentinel/agents/<agent>/**`

The matrix contains exactly these 12 canonical agents, with these stable role identifiers and order:

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

The conceptual target has exactly 24 agent artifacts: 12 GitHub agent entrypoints and 12 Codex agent entrypoints. It also has exactly two target-level artifacts, `.codex/config.toml` and `AGENTS.md`.

The following never count as agents: `.codex/config.toml`, `AGENTS.md`, support packs, `_shared`, per-agent micro-packs, trace artifacts, placeholders, and template families. `.sentinel/agents/**` is a support architecture, not a third agent matrix, and neither replaces `.github/agents/**` nor `.codex/agents/**`.

The intended architecture keeps target entrypoints small, centralizes shared behavior under `_shared`, derives project-prepared shards instead of copying full sources, organizes loading by activation temperature, preserves behavior through traceability, keeps the skill immutable per project, and consumes `/docs` on demand rather than by default.

The official Aggregator remains closed at exactly these nine child checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

Documentation, smoke checks, mappers, consumers, auxiliary audits, and tests must not be registered as a tenth official check.

## 6. Historical Blocker Handling

A previous phase accidentally read limited lines from these existing templates:

- `skills/stnl_project_agent_specializer_dev/reference/templates/codex/AGENTS.md`
- `skills/stnl_project_agent_specializer_dev/reference/templates/copilot/agent.md`

That content is invalid evidence for this phase and all derivations governed by this specification. It must not be cited, reused, summarized, compared, or used to infer layout, naming, body basis, placeholders, conventions, or candidate content.

The accidental read is retained solely as a contamination record. If any future phase cannot demonstrate that its result is independent of that content, the phase must return `BLOCKED`. This specification does not reverse or weaken that rule.

## 7. Prohibited Evidence And Prohibited Sources

Existing templates are non-sources. No path under `skills/stnl_project_agent_specializer_dev/reference/templates/**` may be read, inspected, searched, compared, or used as evidence under this specification unless a separate future decision explicitly reverses that prohibition. This phase makes no such reversal.

The productive skill, a real Target, GitHub state, rendered outputs, fixtures, snapshots, and undocumented recollections are also prohibited sources. Filename existence, directory shape, body structure, placeholder names, or conventions observed in a prohibited source cannot become a derivation basis.

Absence of an allowed canonical basis is not permission to consult a prohibited source or invent a replacement. It is a mandatory `BLOCKED` result.

## 8. Template Family Taxonomy

The future template system may contain only families that have a documented architectural purpose. The initial family taxonomy is:

| Family key | Scope | Conceptual output purpose | Agent-count treatment |
| --- | --- | --- | --- |
| `copilot-agent-entrypoint` | Per canonical agent | Small `.github/agents/<agent>.agent.md` entrypoint | One of the 12 GitHub agent artifacts |
| `codex-agent-entrypoint` | Per canonical agent | Small `.codex/agents/<agent>.toml` entrypoint | One of the 12 Codex agent artifacts |
| `codex-target-config` | Target level | `.codex/config.toml` configuration | Not an agent |
| `target-agents-guide` | Target level | `AGENTS.md` routing and operating guidance | Not an agent |
| `shared-micro-pack-start` | Shared support | `_shared` activation entrypoint | Not an agent |
| `shared-micro-pack-manifest` | Shared support | `_shared` shard inventory and routing metadata | Not an agent |
| `agent-micro-pack-start` | Per canonical agent | Per-agent activation entrypoint | Not an extra agent |
| `agent-micro-pack-manifest` | Per canonical agent | Per-agent shard inventory and routing metadata | Not an extra agent |
| `trace-shard` | Shared or per-agent support | Source-to-behavior traceability | Not an agent |

`START` and `MANIFEST` describe artifact purposes, not approved exact dev-template filenames or final body shapes. A future decision may split a family only when an allowed canonical contract requires the split and the split does not change the 12-agent/24-agent-artifact matrix. New families cannot be inferred from existing templates.

## 9. Dev-Template Layout Convention

The dev-template layout is defined as a symbolic hierarchy, not an approved filesystem allowlist:

`<AUTHORIZED_DEV_TEMPLATE_ROOT>/<TARGET_SURFACE>/<SCOPE>/<FAMILY>/<ROLE_OR_SHARED>/<PURPOSE_TEMPLATE_FILE>`

The segments have these meanings:

- `<AUTHORIZED_DEV_TEMPLATE_ROOT>` is a dev-only root that a future decision must explicitly authorize. This document does not select or create it.
- `<TARGET_SURFACE>` identifies the consumer surface, such as GitHub entrypoint, Codex entrypoint/config, target-level guidance, or Sentinel micro-pack support.
- `<SCOPE>` is exactly one of target-level, shared, or per-agent.
- `<FAMILY>` is a stable family key from the taxonomy.
- `<ROLE_OR_SHARED>` is a canonical matrix role only for per-agent scope, a single shared marker for shared scope, and omitted or a single target marker for target scope according to the future mapping decision.
- `<PURPOSE_TEMPLATE_FILE>` is derived from artifact purpose and required format; its exact spelling and template marker remain undecided until the path/filename/body-basis retry.

The hierarchy must separate target surface from semantic source. Kernels, profiles, and project docs are input categories, not layout directories that imply literal payload copying. Shared content must have one shared basis rather than role-by-role duplication. Per-agent content must be isolated by canonical role identifier. Trace support must remain visibly support material and must not appear to be another entrypoint or agent.

A future family-to-path mapping must resolve every symbolic segment, show the conceptual output surface it supports, and prove that two family instances cannot resolve to the same dev-template path. Until that mapping passes, no dev-template directory or file may be created.

## 10. Naming Convention

Future names must be deterministic functions of documented facts. The allowed naming inputs are:

1. canonical family key;
2. canonical target surface;
3. scope: target-level, shared, or per-agent;
4. canonical matrix role, when per-agent;
5. canonical artifact purpose;
6. required target format or extension; and
7. an explicitly decided template marker or suffix.

Canonical role identifiers must be used exactly as listed in the matrix; aliases, display labels, pluralizations, and inferred abbreviations are prohibited. Names for support artifacts must not imply that support packs, shared shards, trace, or manifests are agents. Target-level names must not carry a matrix role.

The future retry must decide and document normalization for separators, case, extensions, compound extensions, and template markers. It must then apply one rule consistently per family and enumerate the result. It may not obtain any of those choices from existing template filenames.

For entrypoint families, the conceptual output basename and extension are architectural inputs: `<agent>.agent.md` for GitHub and `<agent>.toml` for Codex. That does not determine the dev-template filename by itself. For `.codex/config.toml` and `AGENTS.md`, the conceptual target basenames are fixed architectural inputs, but their dev-template filenames still require an explicit future mapping. For micro-pack and trace families, exact target shard filenames remain undefined until an allowed contract supplies their artifact purposes and naming basis.

Any ambiguity, collision, lossy normalization, or need to invent a token causes `BLOCKED`.

## 11. Source-Selection Rules

Sources may be used only when a future phase explicitly authorizes and reads them. Allowed source categories at the specification level are:

- current materialization-lab decision documents;
- canonical matrix decisions;
- source-inventory documents;
- contracts already documented in the dev skill;
- kernels and Senior Agent Profiles as canonical semantic sources, never literal payloads;
- project context or foundation documents only when explicitly scoped by a future authorized phase;
- activation policy for `always`, `hot`, `warm`, `cold`, and `trace`;
- anti-bloat decisions; and
- traceability decisions.

Source selection is family-specific:

| Family | Required source basis | Selection constraint |
| --- | --- | --- |
| Copilot agent entrypoint | Matrix role, GitHub surface contract, activation/routing policy, applicable shared behavior | Select only the minimum behavior needed to enter and route; do not source a full profile or kernel as payload |
| Codex agent entrypoint | Matrix role, Codex surface/config contract, activation/routing policy, applicable shared behavior | Select only the minimum behavior needed to configure, enter, and route |
| Codex target config | Codex target-level configuration contract and matrix registration decision | Include no role behavior unless the contract requires a reference; never treat config as an agent |
| Target-level AGENTS guide | Target-level operating/routing contract, on-demand docs policy, shared activation policy | Select cross-cutting guidance only; avoid duplicating every role or shard |
| Shared START/MANIFEST | Shared-rule contracts, source inventory, activation policy, shard taxonomy | Select behavior genuinely common to multiple roles and routing metadata needed to find it |
| Per-agent START/MANIFEST | Canonical role contract, relevant profile/kernel semantics, activation policy, source inventory | Select role-specific routing and shard inventory without copying the complete role sources |
| Trace shard | Traceability decisions, selected source references, behavior obligations, family mapping | Select references and obligation mappings; do not turn trace into an agent body |

Every selected source must have an allowed category, explicit future read authorization, relevance to the family, and a traceable obligation. Unselected sources must not leak into the basis. Conflicting sources require an explicit precedence decision; silent precedence is prohibited.

## 12. Transformation Rules

All future source-to-template transformation must be:

- non-literal and summarizing rather than copying;
- project-prepared rather than generic source dumping;
- behavior-preserving through traceability;
- anti-bloat aware and bounded to the family purpose;
- shard-aware and activation-temperature aware;
- target-surface aware and agent-role aware;
- shared-rule aware, with reusable behavior centralized; and
- fail-closed when any required body basis is missing.

Family transformations must obey these additional constraints:

| Family | Transformation obligation |
| --- | --- |
| Copilot agent entrypoint | Adapt the minimum role activation and routing obligations to the GitHub surface; route to support shards instead of embedding them |
| Codex agent entrypoint | Adapt the minimum role activation, configuration, and routing obligations to the Codex surface; route to support shards instead of embedding them |
| Codex target config | Transform only documented target configuration obligations into the required format; do not absorb agent behavior |
| Target-level AGENTS guide | Summarize cross-cutting target operation and on-demand routing; do not concatenate role bodies or project docs |
| Shared START/MANIFEST | Partition shared obligations into discoverable activation and inventory concerns; prevent per-agent duplication |
| Per-agent START/MANIFEST | Partition role obligations into concise activation and shard-routing concerns according to temperature |
| Trace shard | Map generated obligations to allowed source references and transformations without reproducing the sources |

The following are prohibited: copying full kernels, full Senior Agent Profiles, or entire docs; generating monolithic agents; using an existing template as a body example; filling final placeholder values; producing rendered output; and inventing missing source basis.

## 13. Placeholder Policy

This specification permits placeholder namespace categories, not syntax, names, values, or placement. A future body-basis decision may define placeholders only within these categories:

- matrix role identity;
- target surface;
- activation temperature;
- source reference;
- shard role;
- traceability reference; and
- project context hook.

Every future placeholder must have one category, one documented producer, one documented consumer, a defined validation expectation, and a fail-closed missing-value policy. Placeholder expansion must not alter agent counts or create undeclared artifact families.

Prohibited placeholders include those that:

- require reading existing templates;
- embed copied kernel or Senior Agent Profile text;
- embed full documents;
- imply real Target state;
- imply GitHub state;
- authorize writes or mutations;
- count support packs, `_shared`, trace, or template families as agents;
- conceal an unresolved architectural decision; or
- accept arbitrary untraceable body content.

## 14. Body Basis Derivation Rules

A body basis is a decision record, not a template body. Each future template instance or provably uniform family group must derive its body basis in this order:

1. Identify the family, target surface, scope, and canonical role where applicable.
2. State the artifact purpose and the behavior obligations it must satisfy.
3. Enumerate only explicitly authorized canonical sources and assign each source an allowed category.
4. Select the minimum relevant semantic obligations from those sources.
5. Assign each obligation to `always`, `hot`, `warm`, `cold`, or `trace` when activation temperature applies.
6. Separate shared obligations from role-specific obligations.
7. Define the family-specific, non-literal transformation for each selected obligation.
8. Record traceability from source reference to transformed obligation and intended artifact family.
9. Record exclusions that prevent source dumping, duplication, and unsupported content.
10. Demonstrate that the result is sufficient to draft later without using prohibited evidence, while stopping short of final prose or body structure.

A valid body basis describes required semantic inputs, transformation constraints, and trace obligations. It must not contain final template prose, filled placeholders, copy-ready body fragments, or a disguised full template. If the future drafting phase would still need to invent a behavior obligation, the body basis is incomplete and the decision must be `BLOCKED`.

## 15. Path And Filename Basis Derivation Rules

A future path/filename/body-basis retry must create a documented family-to-path mapping before any exact allowlist retry. For each proposed template instance, the mapping must record:

- family key and artifact purpose;
- conceptual target output surface;
- dev-only template root authorized for that future phase;
- target-surface, scope, family, and role/shared path segments;
- exact dev-template basename, extension, and template marker;
- canonical role identifier when applicable;
- cardinality and whether it contributes to the 24 agent artifacts;
- body-basis record identifier; and
- collision proof against all other proposed instances.

Exact path basis must come from the symbolic layout convention plus an explicit family-to-path decision. Exact filename basis must come from canonical artifact purpose, target surface, scope, matrix role where applicable, required format, and an explicitly selected template marker. Body basis must come from the process in Section 14.

No exact path, filename, or body basis may be derived from filesystem observation of existing templates. Known conceptual target paths are not automatic approval of matching dev-template paths. The retry must enumerate all proposed exact paths; patterns alone are insufficient for an exact allowlist.

If shard purpose, shard count, target location, extension, or template marker lacks canonical support, the affected mapping and the whole fail-closed decision remain `BLOCKED` rather than being completed by convention or guesswork.

## 16. Collision And Preexistence Policy

Create-only is the default posture for every future write phase. A future template write phase must operate from an exact allowlist that has independently passed.

Before any allowed write, each exact target must be proven absent using a narrow check. If a target file already exists, the phase must return `BLOCKED`. Silent overwrite, replacement, merge, append, repair, normalization, rename, and delete-and-recreate are prohibited.

Mutation and replacement remain blocked unless a separate future decision explicitly authorizes a mutation basis. Comparison against existing templates also remains blocked unless separately authorized. Preexistence is not evidence for naming or body basis and must not be resolved by inspecting the existing file.

Two proposed instances resolving to the same path, case-folded equivalent, normalized equivalent, or conflicting target purpose are a collision and cause `BLOCKED`.

## 17. No-Copy And Anti-Bloat Policy

Kernels and Senior Agent Profiles are strong canonical semantic sources, not literal payloads. Full kernels, full profiles, full docs, and large contiguous source extracts must not be copied into entrypoints or micro-packs.

Anti-bloat is qualitative and must be justified by responsibility:

- entrypoints contain only the minimum activation, identity, and routing behavior required by their target surface;
- shared behavior is represented once under shared support;
- per-agent packs contain only role-specific prepared shards and references to shared behavior;
- activation temperature keeps nonessential material out of default loading;
- `/docs` is consumed on demand, not embedded or loaded by default;
- manifests route to shards and do not duplicate shard bodies; and
- trace records prove coverage without reproducing source content.

Line-count or byte-count thresholds may be introduced only by a separate canonical decision. In their absence, reviewers must still reject obvious duplication, source dumping, monolithic bodies, and content unrelated to the family purpose.

## 18. Traceability Policy

Behavior parity is established by traceability, not textual identity. Every future transformed obligation must trace to:

1. an allowed canonical source reference;
2. a semantic obligation selected from that source;
3. a documented transformation rule;
4. a destination family and scope;
5. an activation temperature when applicable; and
6. any shared-versus-role-specific allocation decision.

Trace records are support artifacts and do not count as agents. Traceability must expose omissions, conflicts, duplication, and unsupported additions. A source reference alone is insufficient: the record must identify the behavior obligation and its transformation disposition.

Missing, prohibited, ambiguous, or circular trace basis causes `BLOCKED`. Trace may reference project docs only when a future phase explicitly authorizes those docs as sources.

## 19. Future Retry Rules

If this specification is `PASS`, the next valid phase is a retry of:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_PATH_FILENAME_AND_BODY_BASIS_DECISION`

That retry may use this document as canonical input. It may:

- read only sources explicitly allowed for that retry;
- resolve the symbolic layout into a proposed exact family-to-path mapping;
- derive deterministic exact filename candidates;
- produce body-basis decision records without final bodies;
- enumerate candidate cardinalities and prove matrix invariants; and
- return `PASS` or `BLOCKED` for the decision only.

It may not read existing templates, create or mutate templates, fill placeholders, render output, access a real Target or GitHub, invent missing sources, or authorize writing by implication.

Only if that retry passes may the following retry occur:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_WRITE_EXACT_ALLOWLIST_DECISION`

The exact-allowlist retry must enumerate every exact create-only path and bind it to an approved family and body-basis record. It may not create files. Only after an exact-allowlist `PASS` may a separately authorized, create-only template write phase be considered.

## 20. Abort Criteria

Any governed future phase must abort with `BLOCKED` if:

- it needs to read or infer from `reference/templates/**`;
- it uses the historical accidental template read as evidence;
- it needs the productive skill, a real Target, or GitHub;
- it needs to edit an existing file;
- an intended create-only target already exists;
- a required directory is absent and directory creation is not explicitly authorized;
- its allowed file count or path boundary cannot be preserved;
- exact path, filename, shard purpose, or body basis would require invention;
- it would write a final template body or fill final placeholders prematurely;
- it would copy full kernels, profiles, or docs;
- it would create a fixture, snapshot, rendered output, parser, renderer, schema, validator, checker, materializer, Aggregator change, or tenth check;
- source precedence, transformation, activation temperature, or traceability is missing or ambiguous;
- agent cardinality deviates from 12 roles and 24 agent artifacts; or
- support material is represented as an additional agent matrix.

## 21. PASS Criteria

This documentation phase passes only when:

- exactly this one allowed specification document is newly created;
- no existing file is edited and no other file is created, deleted, moved, renamed, generated, rendered, or snapshotted;
- no prohibited path or external state is accessed;
- existing templates and the historical accidental read are not used as evidence;
- the document defines layout, naming, source-selection, transformation, placeholder, derivation, collision, anti-bloat, traceability, retry, and abort conventions;
- the exact 12-agent matrix, 24 agent artifacts, two target-level artifacts, and nine-check Aggregator boundary are preserved;
- no final template body, exact write allowlist, or template write authorization is produced; and
- the posture remains `TEMPLATE_LAYOUT_NAMING_AND_SOURCE_SELECTION_SPECIFICATION_DOCUMENTATION_ONLY_TEMPLATE_WRITE_BLOCKED`.

If any criterion is not met, the phase posture is:

`TEMPLATE_LAYOUT_NAMING_AND_SOURCE_SELECTION_SPECIFICATION_BLOCKED_PENDING_CANONICAL_INPUTS`

## 22. Preserved Documentary State

The documentary chain remains:

- Template Readiness Decision: `PASS`
- Template Creation Authorization Decision: `PASS`
- Template Creation Implementation Plan: `PASS`
- Template Write Authorization Decision: `PASS`
- Template Write Exact Allowlist Decision: `BLOCKED`
- Template Path Filename And Body Basis Decision: `BLOCKED`

`TEMPLATE_WRITE_IMPLEMENTATION`, exact-allowlist retry, template write, template creation, template mutation, and reading existing templates by implication remain blocked. No candidate exact dev-template filename, exact dev-template path, or final body basis is approved by this document. No template, rendered output, fixture, snapshot, parser, renderer, schema, validator, checker, or materializer is created or altered.

## 23. Final Status

`TEMPLATE_LAYOUT_NAMING_AND_SOURCE_SELECTION_SPECIFICATION_DOCUMENTATION_ONLY_TEMPLATE_WRITE_BLOCKED`

This specification is complete as a documentation-only convention layer. It enables only the future path/filename/body-basis decision retry described in Section 19. It does not authorize that retry's successors, template writing, or any automatic progression.
