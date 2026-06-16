# Rendering And Composition Contract

Status: documentary/dev-only contract.

This contract defines the future rendering and composition boundary for turning
explicit kernel source bundles, Senior Agent Profiles, and explicit target
templates into a render-context plan. It is not a runtime materializer and does
not authorize writing generated artifacts.

## Non-Runtime Boundary

This contract is a planning contract only. It defines source requirements,
placeholder requirements, escaping requirements, composition blockers, and the
expected shape of a future render context per agent and target.

This phase must not write `.github/**`, `.codex/**`, `AGENTS.md`, generated
agent files, generated config files, reports, runtime fixtures outside the
authorized documentary matrix, or target-project artifacts.

## Composition Sources

Every future render context must be deterministically derived from explicit
sources only:

- source model contract:
  `reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md`
- kernel source: `reference/kernel_lab/<agent>_kernel/`
- senior profile:
  `reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md`
- template: `reference/templates/<target>/...`
- target contract:
  `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- template contract:
  `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- rendering contract:
  `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`

No source may be inferred from output path, legacy runtime naming, generated
artifact shape, nearby file naming, productive skill files, or historical audit
text.

`reference/kernel_lab/` is the primary behavior source. `reference/agents/` is
only a temporary development parity baseline.
Deprecated field `base_agent_source` must not appear in a final render context.
Optional `base_agent_parity_source`, if used by a separate dev-only parity
validator, must not be used for rendering.

## Canonical Agent IDs

The expected agent IDs are exactly:

- `orchestrator`
- `planner`
- `validation-eval-designer`
- `execution-package-designer`
- `designer`
- `coder-frontend`
- `coder-backend`
- `coder-ios`
- `validation-runner`
- `reviewer`
- `finalizer`
- `resync`

The physical kernel module directory uses underscore kernel names, while the
logical agent ID remains the kebab-case ID. A future renderer must resolve
those mappings explicitly; it must not invent kernel modules, senior profiles,
or templates.

## Render Context

A future renderer must build one render context for each requested
`agent+target` pair before any output decision. This documentary phase only
defines the render context requirement; it does not write artifacts.

The render context must include at least:

- canonical `agent_id`;
- target `target_id`;
- resolved `kernel_source`;
- resolved Senior Agent Profile source path;
- resolved explicit template source path;
- target contract source path;
- template contract source path;
- rendering contract source path;
- required placeholder values;
- target-specific placeholder values;
- escaping mode and safety verdict;
- source version input;
- generated notice representation;
- composition conflict verdict.

The context must be reproducible from the explicit inputs above. If two runs
receive the same explicit inputs and policy, they must derive the same render
context.

Future fixture expected outputs may document fixture-only snapshots derived
from a render context. Those snapshots are documentary fixture data only. They
are not generated artifacts, target artifacts, runtime materialization output,
or permission to write `.github/**`, `.codex/**`, `AGENTS.md`, or any other
real target path.

A future render-context validator may compare an abstract render context
against fixture expected outputs, but the comparison must remain inside
`reference/materialization_lab/fixtures/`. This phase authorizes only minimal
documentary snapshot fixtures, not full rendered snapshots or generated
outputs.

## Common Required Placeholders

Every explicit agent template used by this composition contract must provide
and consume these common placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`

If a required common placeholder is absent from the explicit template or cannot
be populated from explicit sources, the future renderer must block with
`BLOCKED_PLACEHOLDER_MISSING`.

## Target-Specific Placeholders

For `copilot`, the explicit agent template must provide and consume:

- `{{AGENT_TOOLS}}`
- `{{AGENT_MODEL}}`
- `{{SPECIALIZATION_REVISION}}`
- `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- `{{READING_SCOPE_CLASS_BLOCK}}`

For `codex`, the explicit agent template must provide and consume:

- `{{AGENT_MODEL}}`
- `{{MODEL_REASONING_EFFORT}}`
- `{{SANDBOX_MODE}}`

Any target-specific placeholder required by the target contract, template
contract, or explicit template must be populated from explicit inputs. Missing
target-specific placeholders block with `BLOCKED_PLACEHOLDER_MISSING`.

## Escaping And Render Safety

Copilot frontmatter must be YAML-safe. String placeholders in the Copilot
frontmatter must be escaped so the result remains valid YAML. Copilot block
placeholders, including `{{AGENT_TOOLS}}`,
`{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`, and
`{{READING_SCOPE_CLASS_BLOCK}}`, must render either valid YAML for their target
location or a valid empty string for that location.

Codex output must be TOML-safe. All string placeholders in Codex TOML must be
escaped so the result remains valid TOML. `{{AGENT_BODY}}` in Codex must be
emitted by a TOML-aware renderer as a valid TOML string value; ad hoc quoting,
raw interpolation, or unsafe multiline construction is not acceptable.

If any rendered value cannot be represented safely in the target format, the
future renderer must block with `BLOCKED_UNSAFE_RENDER`.

## Generated Notice

`{{GENERATED_NOTICE}}` must be represented safely for the target template:

- in `reference/templates/copilot/agent.md`, it must render as a Markdown
  comment or Markdown-safe text;
- in `reference/templates/codex/agent.toml`, it must render as TOML comment
  text without breaking the `#` comment prefix;
- if the notice cannot be represented in the target format, rendering must
  block with `BLOCKED_UNSAFE_RENDER`.

The notice must not authorize runtime materialization, target writes, GitHub
writes, productive skill changes, or inferred templates.

## Agent Body Composition

`{{AGENT_BODY}}` must preserve the kernel source bundle's mission, boundaries,
handoff, role class, status semantics, invariants, and operating rules.

The composed body must incorporate the Senior Agent Profile without deleting,
weakening, or silently replacing the kernel contracts. Seniorization may sharpen
judgment, explicitness, and operational quality, but it must remain compatible
with the kernel's canonical role and protocol obligations.

If the kernel source and Senior Agent Profile conflict on mission, ownership,
role class, status semantics, handoff validity, target safety, or other
protocol-significant behavior, the future renderer must block with
`BLOCKED_COMPOSITION_CONFLICT`. It must not choose one source by preference or
merge conflicting instructions silently.

Lazy-load trace fixtures are trace documentation for future validation. They
are not a runtime loader and must not be used to implement module loading.

## Blocking Rules

The future renderer must fail closed before any target write or generated
artifact write when a required source, template, placeholder, escaping rule, or
composition invariant is missing or unsafe.

Use these block codes exactly:

- `BLOCKED_SOURCE_MISSING`: a required kernel source, Senior Agent Profile,
  target contract, template contract, or other declared source is absent.
- `BLOCKED_SOURCE_MODEL_INVALID`: the source model contradicts
  `SOURCE_MODEL_CONTRACT.md`.
- `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`: final render depends on
  `reference/agents/`.
- `BLOCKED_KERNEL_SOURCE_MISSING`: a required kernel module or its real minimum
  documentation/contract bundle is absent.
- `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`: the 12 canonical agent to kernel module
  mappings are incomplete.
- `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`: a temporary parity
  baseline is required as a final source.
- `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`: deprecated field `base_agent_source`
  appears in final render context shape.
- `BLOCKED_TEMPLATE_MISSING`: an explicit template is absent for the requested
  target, target-agent pair, or output shape.
- `BLOCKED_PLACEHOLDER_MISSING`: a common or target-specific required
  placeholder is absent from the template or cannot be populated from explicit
  sources.
- `BLOCKED_UNSAFE_RENDER`: a placeholder value, generated notice, YAML render,
  TOML render, or block render cannot be represented safely for the target.
- `BLOCKED_COMPOSITION_CONFLICT`: explicit composition sources conflict in a
  way that would weaken, contradict, or ambiguate the kernel contract or senior
  profile.

## Explicit Non-Authorization

This contract does not authorize:

- target writes;
- runtime scripts;
- generated outputs;
- fixture expected outputs as real target artifacts;
- productive skill changes;
- GitHub writes;
- inferred templates;
- inferred senior profiles;
- dependency on `reference/agents/` as a final source;
- changes to `skills/stnl_project_agent_specializer/`;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in this
  repo root or any target project;
- materialization in any project target.
