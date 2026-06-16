# Fixture Schema

Status: documentary/dev-only schema.

This schema defines the expected metadata shape for future materialization lab
fixtures. It is not executable, is not a runtime schema, and does not authorize
real target read/write, GitHub writes, a runtime materializer, generated
outputs, or productive-skill mutation.

Every future complete fixture must declare metadata equivalent to the shape
below. Missing or contradictory metadata must block before any fixture is used.

```yaml
fixture_id:
fixture_type:
status:
scenario:
purpose:
dev_only:
no_real_write:
source_model:
  kernel_source:
  senior_profile_source:
  template_source:
  materialization_contract_source:
  forbidden_sources:
selected_agents:
target_surface:
template_sources:
lazy_load_expectation:
  demand_type:
  activated_modules:
  loaded_modules:
  forbidden_modules:
  depends_on_verified:
  decision_trace_required:
  output_trace_required:
expected_outputs:
  mode:
  snapshots:
  forbidden_real_paths:
blocked_expectation:
  should_block:
  block_codes:
target_safety:
  fixture_root:
  simulated_target_paths:
  forbidden_real_target_paths:
validation:
  responsible_checks:
  expected_verdict:
```

## Field Rules

- `fixture_id` must be stable, unique inside this fixture root, and relative to
  the category where the future fixture lives.
- `fixture_type` must identify a positive project scenario, expected-output
  snapshot, lazy-load trace, or blocked case.
- `status` must distinguish skeleton, planned, complete, deprecated, and
  blocked fixture states.
- `dev_only` must be true.
- `no_real_write` must be true.
- `source_model.kernel_source` must point to explicit `reference/kernel_lab/`
  inputs when a future fixture needs behavior source evidence.
- `source_model.senior_profile_source` must point to explicit
  `reference/seniorization_lab/` profile inputs.
- `source_model.template_source` must point to explicit `reference/templates/`
  files. Template inference is invalid.
- `source_model.materialization_contract_source` must point to explicit
  materialization lab contracts.
- `source_model.forbidden_sources` must include `reference/agents/` whenever a
  future fixture can distinguish temporary parity baseline from final source.
- `selected_agents` must list only canonical agent IDs needed by the scenario.
- `target_surface` must identify the simulated target surface, never a real
  target project path.
- `template_sources` must be explicit and must not be inferred.
- `lazy_load_expectation.activated_modules` must list modules required by
  demand.
- `lazy_load_expectation.loaded_modules` must not include modules loaded only
  for completeness.
- `lazy_load_expectation.forbidden_modules` must identify inactive modules that
  must remain unloaded.
- `lazy_load_expectation.depends_on_verified` must be true when module
  dependency order matters.
- `lazy_load_expectation.decision_trace_required` must be true for material
  decisions.
- `lazy_load_expectation.output_trace_required` must be true for handoff,
  evidence, or material output scenarios.
- `expected_outputs.mode` must be fixture-only and must never describe real
  target writes.
- `expected_outputs.snapshots` must live under this fixture root when future
  snapshots are authorized.
- `expected_outputs.forbidden_real_paths` must include real `.github/**`,
  `.codex/**`, and `AGENTS.md` paths when applicable.
- `blocked_expectation.should_block` must be true for negative fixtures.
- `blocked_expectation.block_codes` must use only block codes already declared
  by materialization lab contracts.
- `target_safety.fixture_root` must equal this fixture root.
- `target_safety.simulated_target_paths` must be relative fixture paths.
- `target_safety.forbidden_real_target_paths` must include any real target path
  that the fixture is designed to reject.
- `validation.responsible_checks` must name future or existing materialization
  lab checks without implying that new checkers exist in this phase.
- `validation.expected_verdict` must be explicit and fail-closed.

## Block Code Guidance

Use existing block codes when they match the violation. Do not invent a new
name when an existing materialization lab block code is equivalent.

Fixture-boundary blocks include:

- `BLOCKED_FIXTURE_ROOT_MISSING`
- `BLOCKED_FIXTURE_SCHEMA_MISSING`
- `BLOCKED_FIXTURE_SCOPE_INVALID`
- `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`
- `BLOCKED_FIXTURE_PATH_TRAVERSAL`
- `BLOCKED_FIXTURE_ABSOLUTE_PATH`
- `BLOCKED_FIXTURE_TARGET_REAL`
- `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`
- `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`
- `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`

Other future fixture cases should use already-declared materialization,
source-model, template, lazy-load, target-safety, implementation, validation,
and productive-skill block codes.

## Non-Authorization

This schema is documentation only. It does not permit writing `.github/**`,
`.codex/**`, `AGENTS.md`, generated outputs, target project files, GitHub,
productive skill files, productive templates, or runtime materializer files.
