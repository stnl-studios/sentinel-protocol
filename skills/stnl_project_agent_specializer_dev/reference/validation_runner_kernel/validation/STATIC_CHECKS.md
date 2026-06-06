# Validation Runner Kernel Static Checks

Status: current textual static harness for
`VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, is
`dev kernel lab only`, is `non-runtime`, is `non-production`, and has
`no materialization path`.

The textual executable harness now exists at `validation/check-static.mjs`.
Harness pass does not promote the kernel, does not authorize
`CLEAN_EXCELLENT_PASS`, and does not authorize runtime, materialization,
production, global docs updates, productive-skill changes, or template changes.

## Blocking Checks

The harness performs checks bloqueantes and fails closed on drift:

- path safety with `fileURLToPath(import.meta.url)`, `realpathSync.native`,
  path escape rejection, symlink rejection, and regular-file enforcement;
- snapshot parity between `templates/agents/validation-runner.agent.md` and
  `skills/stnl_project_agent_specializer_dev/reference/agents/validation-runner.agent.md`;
- exact allowlist validation for the 9-file post-harness bundle;
- bundle by section using only `README.md` `## Included Files` or `## Bundle`;
- anchors by file and section with an explicit matrix;
- negação local conservadora for prohibited claims;
- stale-claim scan for assertions that the harness is absent;
- promotion/runtime/materialization/production drift scan;
- docs globais proibidos checked read-only through `git status --short`.

## Exact Allowlist

The allowlist exata is:

1. `README.md`
2. `contracts/CONTRACT.md`
3. `contracts/BEHAVIOR_PARITY_SPINE.md`
4. `contracts/MINIMUM_SAFE_BUNDLE.md`
5. `contracts/PROOF_EXECUTION_GATES.md`
6. `validation/STATIC_CHECKS.md`
7. `validation/GOLDEN_TESTS.md`
8. `validation/check-static.mjs`
9. `validation/check-golden.mjs`

No other `.js` or `.mjs` file is allowed. `__MACOSX` and `.DS_Store` are the
only ignored names.

## Section Anchors

The anchor matrix validates required positive anchors in their owner
file/section. It does not satisfy an anchor by searching every path, and it
does not use a `paths.some(...)` substitute for mandatory anchors.

Positive anchors must be local affirmative claims. Prohibitive anchors must be
local prohibitive claims. A distant negation in the same block does not protect
a positive drift claim. Contradiction local fails the harness.

Required status anchors include `initial draft`, `not promoted`,
`not CLEAN_EXCELLENT_PASS`, `dev kernel lab only`, `non-runtime`,
`non-production`, `no materialization path`, harness textual exists, and
harness pass does not promote the kernel.

## Negative Mutations

The harness rejects mutações negativas and direct drift:

- Reject stale claims that no harness exists;
- Reject docs that say `STATIC_CHECKS.md` or `GOLDEN_TESTS.md` are only design
  placeholders;
- Reject claims that harness pass promotes the kernel or accepts
  `CLEAN_EXCELLENT_PASS`;
- Reject runtime loader, materialization path, materializer, production path,
  fixture artifact, generated report, target artifact, productive-skill update,
  productive-template update, or global docs update authorization;
- Reject extra files, missing files, duplicate bundle entries, bundle extras, bundle
  omissions, and invalid bundle order.

Example enforced by the harness: `PASS requires direct proof` passes, while
`PASS does not require direct proof` fails.

## Out Of Scope

These static checks do not execute a real agent, materialize artifacts, inspect
a target repo, authorize the productive skill, update global docs, promote the
kernel, authorize a materializer, create fixtures, create generated reports, or
create target artifacts.
