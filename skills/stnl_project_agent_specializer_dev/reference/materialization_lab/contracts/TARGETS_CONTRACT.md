# Materialization Targets Contract

Status: documentary/dev-only contract.

This contract starts the target rewrite for future senior-agent
materialization. It defines names, normalization, expected future output paths,
and blocking rules. It does not authorize a runtime materializer.

## Canonical Target IDs

The only canonical target IDs for the new version are:

- `copilot`
- `codex`

Any future materialization request, scenario, validation, or target-specific
contract must resolve to one of these IDs or block before writing.

## Legacy Runtime Terms

When used in the context of a target runtime, the following legacy terms must
normalize to `copilot`:

- `vscode`
- `VS Code`
- `VS Code/GitHub`
- `GitHub Agents`

`copilot` semantically inherits the old VS Code/GitHub materialization track.
The new public and canonical target name is `copilot`.

Historical references in emitted audits, seniorization profiles, old contracts,
or other frozen historical documents must not be automatically rewritten. They
may remain as historical language unless a separately authorized migration
explicitly scopes the file and justifies the edit.

## Expected Future Output Paths

The expected future output paths are:

- `copilot`: `.github/agents/*.agent.md`
- `codex`: `.codex/agents/*.toml`
- `codex`: `.codex/config.toml`
- `codex`: `AGENTS.md`

These paths describe future output shapes only. They do not grant permission to
write target repositories during this contract phase.

## Explicit Non-Authorization

This stage does not authorize:

- real materialization;
- writes to any target project;
- changes to `.github/**`, `.codex/**`, or `AGENTS.md` in a target project;
- changes to the productive `skills/stnl_project_agent_specializer/` skill;
- changes to productive templates;
- GitHub writes;
- broad or blind replacement of `vscode`, `VS Code`, or `VS Code/GitHub`;
- edits to historical audits unless separately and narrowly justified.

## Template Requirement

Templates must not be inferred.

Any target, target-agent pair, or output path without an explicit template must
block with:

`BLOCKED_TEMPLATE_MISSING`

The future materializer must fail closed before writing when a template is
missing, ambiguous, or only implied by legacy naming.
