# Finalizer Kernel Minimum Safe Bundle

Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.

This minimum bundle is documentary/dev-only. It does not authorize runtime,
production, materialization, materializer, runtime loader, GitHub write, target
repo write, generated reports, fixtures, target artifacts, productive skill
activation, template mutation, snapshot mutation, or automatic future
promotion.

## Mandatory Source Chain

The mandatory source chain is:

1. productive template: `templates/agents/finalizer.agent.md`;
2. local dev snapshot: `reference/agents/finalizer.agent.md`;
3. documentary kernel: `reference/finalizer_kernel/**`.

The snapshot must be byte-for-byte equal to the productive template. The kernel
must derive from the base finalizer role and must not invent a new role.

## Mandatory Files

The finalizer kernel bundle contains exactly these 9 files:

1. `README.md`
2. `contracts/CONTRACT.md`
3. `contracts/BEHAVIOR_PARITY_SPINE.md`
4. `contracts/MINIMUM_SAFE_BUNDLE.md`
5. `contracts/CLOSURE_GATES.md`
6. `validation/STATIC_CHECKS.md`
7. `validation/GOLDEN_TESTS.md`
8. `validation/check-static.mjs`
9. `validation/check-golden.mjs`

No other file, symlink, fixture, generated report, target artifact, runtime
loader, materializer, materialization path, or productive skill path is part of
the safe bundle.

## Mandatory Semantic Floor

The semantic floor is:

- `name: finalizer`;
- role class `closure`;
- reading scope `minimal-verification`;
- entry after runner, after reviewer when routed, or after execution-stage
  blockage before validation;
- preservation of runner verdict when present;
- preservation of execution-stage blockage when validation never ran;
- preservation of reviewer signal when present;
- preservation of residual correction pack when present;
- minimum honest `Feature CONTEXT` update;
- explicit `DONE: yes/no`;
- explicit `resync: yes/no`;
- closure ledger;
- runner-backed QA checklist reconciliation or process gap;
- slice closure record when slice-scoped;
- statuses limited to `READY` and `BLOCKED`.

## Mandatory Negative Space

The bundle must preserve negative space:

- no implementation or correction ownership;
- no validation execution ownership;
- no reviewer substitution;
- no planning, re-cutting, execution-package reinterpretation, or proof
  redesign;
- no resync execution;
- no shared canonical docs direct write when resync is required;
- no invented closure, milestone, DONE, QA success, or slice status;
- no `PLAN.md` or legacy phase artifact as durable documentation;
- no broad runtime/temp handoff search;
- no runtime, production, materialization, materializer, runtime loader,
  GitHub write, target repo write, generated reports, fixtures, target
  artifacts, productive skill activation, template mutation, or snapshot
  mutation.

## Minimum Validation Story

The static harness validates filesystem shape, snapshot parity, frontmatter,
status declarations, semantic anchors, local-polarity forbidden claims, and
import guard behavior. The golden harness runs static preflight, validates
scenario structure, checks required closure scenarios, exercises negative
mutation cases, verifies incomplete scenario failures, blocks runtime and
promotion drift, and confirms that
`FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS` is not itself a forbidden claim.
