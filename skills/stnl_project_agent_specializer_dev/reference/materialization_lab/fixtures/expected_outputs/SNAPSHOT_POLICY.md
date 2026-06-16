# Snapshot Policy

Status: documentary/dev-only policy.

Expected output snapshots in this fixture root are minimal policy fixtures. They record explicit template source, simulated target surface, expected managed notice policy, placeholder policy, and forbidden real paths.

They are not full rendered outputs, generated artifacts, target artifacts, materialization results, or permission to write .github/**, .codex/**, AGENTS.md, GitHub, or a real target project.

Authorized snapshot fixtures in this phase:

- minimal_copilot_agent_snapshot
- minimal_codex_agent_snapshot
- minimal_codex_config_snapshot
- minimal_agents_md_snapshot

Each snapshot fixture must keep snapshot paths as documentary strings under reference/materialization_lab/fixtures/expected_outputs/. No corresponding .github/**, .codex/**, or AGENTS.md file may be created.
