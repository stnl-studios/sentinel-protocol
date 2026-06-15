# Resync Kernel

Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.

This is a documentary/dev-only kernel pass for the base `resync` agent. It is
not runtime, not production, and has no materialization path, no runtime loader,
no materializer, no target artifact, no generated report, no fixture, no
productive skill activation, no GitHub write, no target repo write, no template
mutation, and no snapshot mutation beyond the literal dev snapshot authorized
for this kernel lab round. The validation scripts in `validation/` are dev-only
documentation checks, not runtime or production entry points.

This directory records the clean semantic kernel shape for the `sync` role. It
preserves `resync` as the owner of narrow factual synchronization outside the
feature after `finalizer.agent.md` explicitly requests it with an already
identified factual delta. It does not decide closure, does not decide
`DONE`, does not decide whether resync is needed, does not implement, does not
validate, does not review, does not plan, and does not create a materialization
or production path.

## Source Alignment

- productive/base copy origin:
  `templates/agents/resync.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/resync.agent.md`;
- documentary resync kernel bundle:
  `reference/kernel_lab/resync_kernel/**`.

The local snapshot must remain byte-for-byte equal to the productive template
until a later explicitly authorized phase changes that relationship. The
productive template is only the copy origin and is not a fallback when the
snapshot is missing.

## Included Files

The current 9-file resync-kernel allowlist is read in this order:

1. `README.md` - status, source alignment, bundle, role, and scope limits.
2. `contracts/CONTRACT.md` - identity, mission, entry, input, evidence, output,
   status, durable-doc, handoff, boundary, reading, and escalation contracts.
3. `contracts/BEHAVIOR_PARITY_SPINE.md` - irreducible behavior preserved from
   the base `resync`.
4. `contracts/MINIMUM_SAFE_BUNDLE.md` - smallest non-optional documentary
   bundle for the role.
5. `contracts/RESYNC_GATES.md` - factual-sync gates for honest resync.
6. `validation/STATIC_CHECKS.md` - static validation contract for the dev-only
   harness.
7. `validation/GOLDEN_TESTS.md` - golden validation contract for the dev-only
   harness.
8. `validation/check-static.mjs` - executable static documentation checks and
   reusable forbidden-claim scanners.
9. `validation/check-golden.mjs` - executable golden documentation checks that
   run the static harness as preflight.

No fixture, generated report, runtime loader, materializer, materialization
path, target artifact, productive-skill activation path, GitHub write path, or
target-repository write path is part of this dev-only phase.

## Scope Limits

This kernel is specific to `resync`, role class `sync`, reading scope class
`targeted-local`. It is not a finalizer, validation-runner, reviewer, planner,
proof designer, execution-package designer, coder, runtime loader,
materializer, target writer, or productive skill path.

The finalizer decides `resync: yes/no`. The resync agent enters only when
`finalizer.agent.md` requests it and supplies an already-identified factual
delta, an impacted shared target or bounded shared surface, and enough evidence
to prove what is stale outside the feature. Resync executes or coordinates only
the minimum factual sync allowed by that request and then returns `READY` with
applied target plus sync notes, or `BLOCKED` with the exact reason.

The allowed durable documentation targets are limited to
`docs/core/{CONTEXT,RULES,STATE,CONTRACTS,TESTING}.md`, `docs/TBDS.md`,
`docs/INDEX.md`, and `Feature CONTEXT` only when explicitly authorized by the
finalizer request or project flow. `Feature CONTEXT` is otherwise read-only
origin context. ADR and normative `RULES` changes are not default resync
ownership; when the factual update implies normative, structural,
architectural, or policy-setting change, resync blocks or escalates instead of
absorbing the decision silently.

Runtime temporary paths such as `workspaceStorage`,
`chat-session-resources`, `content.txt`, scratchpads, and runtime temporary
files are not Sentinel source of truth. `PLAN.md`, legacy phase artifacts,
temporary docs, runtime logs, and generated reports do not become durable
documentation for resync.

This directory does not authorize runtime, materialization, production,
repo-target writes, GitHub writes, generated reports, fixtures, target
artifacts, active runtime adoption, productive-skill changes, productive
template changes, snapshot mutation, automatic future promotion beyond this
kernel-lab result, status extension outside this dev-only kernel-lab result, a
materializer, a shared production path, or any runtime or production harness.
