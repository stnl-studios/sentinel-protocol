# coder_ios_kernel Minimum Safe Bundle

Status: `CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS`.

## Required Bundle

The only valid `coder_ios_kernel` bundle is:

1. `README.md`
2. `contracts/CONTRACT.md`
3. `contracts/BEHAVIOR_PARITY_SPINE.md`
4. `contracts/MINIMUM_SAFE_BUNDLE.md`
5. `contracts/CODER_IOS_GATES.md`
6. `validation/STATIC_CHECKS.md`
7. `validation/GOLDEN_TESTS.md`
8. `validation/check-static.mjs`
9. `validation/check-golden.mjs`

No additional files, symlinks, non-regular entries, fixtures, generated
reports, runtime loaders, materializers, materialization paths, target
artifacts, generated target output, productive skill paths, or real
materialization paths belong to this bundle.

## Required Snapshot

The dev snapshot must exist at:

`skills/stnl_project_agent_specializer_dev/reference/agents/coder-ios.agent.md`

It must remain byte-for-byte equal to:

`templates/agents/coder-ios.agent.md`

The snapshot is the comparison source. The kernel bundle is not allowed to edit
the snapshot after the literal copy.

## Safe Validation Surface

The validation surface is textual and local:

- `validation/check-static.mjs` validates structure, snapshot parity,
  frontmatter, semantic anchors, status mode, local-polarity forbidden claims,
  code-fence scanning, runtime/temp path bans, global docs after promotion, and
  future-kernel promotion bans.
- `validation/check-golden.mjs` validates scenario structure, static preflight,
  positive and negative semantic cases, mutation blocking, incomplete scenario
  rejection, local polarity, and code-fence detection.

These scripts do not execute an agent runtime, generate reports, create
fixtures, write target artifacts, materialize agents, mutate templates, touch a
repo target, call GitHub, or authorize productive skill behavior.

## Promotion Safety

`CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS` is valid only when:

- the snapshot matches the canonical template byte-for-byte;
- local static and golden harnesses pass;
- global docs state twelve/doze current promoted kernels after promotion;
- global harnesses recognize all twelve promoted kernels and block stale
  eleven/onze, ten/dez, nine/nove, eight/oito, and seven/sete current-count
  claims;
- no future kernel is promoted;
- the bundle still contains exactly the required nine files.
