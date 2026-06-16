# Expected Output Fixtures

Status: documentary/dev-only category.

Expected-output snapshot fixtures are fixture-only. They are not real outputs,
must not be written to a real target, and must not authorize materialization.

Rules for snapshot fixtures:

- Snapshots must derive from explicit `template_source` values.
- Templates must not be inferred.
- `.github/**`, `.codex/**`, and `AGENTS.md` may appear only under this fixture
  root as fixture-local examples or snapshots.
- Real `.github/**`, `.codex/**`, and `AGENTS.md` paths outside this root
  remain prohibited.
- Minimal documentary snapshot fixtures are authorized in this phase, but full
  rendered outputs are not created.
