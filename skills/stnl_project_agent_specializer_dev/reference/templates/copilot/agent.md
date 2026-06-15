---
name: {{AGENT_ID}}
description: "{{AGENT_DESCRIPTION}}"
target: "{{TARGET_ID}}"
tools:
{{AGENT_TOOLS}}
{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}
model: "{{AGENT_MODEL}}"
base_agent_version: "{{SOURCE_VERSION}}"
specialization_revision: {{SPECIALIZATION_REVISION}}
managed_artifact: true
{{READING_SCOPE_CLASS_BLOCK}}
---

<!--
source_template: stnl_project_agent_specializer_dev/reference/templates/copilot/agent.md
template_status: documentary/dev-only explicit source template
output_shape: .github/agents/*.agent.md
runtime_materialization_authorized: false

Required placeholders:
- {{AGENT_ID}}: canonical kebab-case agent ID; also the generated file basename.
- {{AGENT_NAME}}: human-readable heading for the agent body.
- {{AGENT_DESCRIPTION}}: target-ready one-line role description.
- {{AGENT_BODY}}: fully specialized Markdown body preserving mission, boundaries,
  handoff, role class, status, protocol-fixed invariants, and operating rules.
- {{TARGET_ID}}: must resolve to the canonical target `copilot`.
- {{GENERATED_NOTICE}}: managed generated-artifact notice for the target file.
- {{SOURCE_VERSION}}: source base-agent version or equivalent explicit version.
- {{AGENT_TOOLS}}: rendered YAML sequence items for the agent tools.
- {{AGENT_MODEL}}: resolved model string allowed by the active model policy.
- {{SPECIALIZATION_REVISION}}: managed integer revision for the target repo.
- {{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}: rendered `agents:` block for
  `orchestrator` only; empty for non-orchestrator agents.
- {{READING_SCOPE_CLASS_BLOCK}}: rendered optional `reading_scope_class:` line
  when compatible with the target contract.

String placeholders must be rendered with YAML-safe escaping. Block
placeholders must render valid YAML or Markdown for their target location.

This source template is not a materializer. Its presence does not authorize
runtime scripts, target-project writes, GitHub writes, or writes to `.github/**`.
-->

{{GENERATED_NOTICE}}

# {{AGENT_NAME}}

{{AGENT_BODY}}
