# Expected Output Fixtures

Status: documentary/dev-only category skeleton.

Future expected-output snapshots are fixture-only. They are not real outputs,
must not be written to a real target, and must not authorize materialization.

Rules for future snapshots:

- Snapshots must derive from explicit `template_source` values.
- Templates must not be inferred.
- `.github/**`, `.codex/**`, and `AGENTS.md` may appear only under this fixture
  root as fixture-local examples or snapshots.
- Real `.github/**`, `.codex/**`, and `AGENTS.md` paths outside this root
  remain prohibited.
- Complete snapshots are not created in this phase.
