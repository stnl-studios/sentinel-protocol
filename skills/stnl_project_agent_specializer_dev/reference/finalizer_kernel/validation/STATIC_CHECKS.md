# Finalizer Kernel Static Checks

Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.

`validation/check-static.mjs` is a dev-only textual/documentary harness. It
does not authorize runtime, production, materialization, materializer, runtime
loader, GitHub write, target repo write, generated reports, fixtures, target
artifacts, productive skill activation, template mutation, snapshot mutation,
or automatic future promotion.

## Executable Checks

The harness validates:

- direct execution prints clear `PASS` or `FAIL`;
- import guard prevents automatic suite execution on import;
- paths resolve relative to the repository root;
- `__MACOSX` and `.DS_Store` are ignored;
- symlinks and non-file entries inside `finalizer_kernel` are blocked;
- the kernel file allowlist is exactly the 9 files in this bundle;
- the dev snapshot exists;
- the dev snapshot matches `templates/agents/finalizer.agent.md`
  byte-for-byte;
- snapshot frontmatter preserves `name: finalizer`,
  `agent_version: 2026.5.1`, and
  `reading_scope_class: minimal-verification`;
- every kernel Markdown document declares
  `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`;
- docs preserve identity, role class `closure`, and reading scope
  `minimal-verification`;
- docs preserve entry after validation-runner, reviewer when routed, and
  execution-stage blockage before validation;
- statuses are limited to `READY` and `BLOCKED`;
- runner verdicts `PASS`, `PARTIAL`, `FAIL`, and validation-owned `BLOCKED` are
  preserved inputs, not finalizer statuses;
- docs preserve `DONE: yes/no` and `resync: yes/no`;
- docs preserve closure ledger, `Feature CONTEXT` update, residual correction
  pack, QA checklist reconciliation or process gap, and slice closure record;
- docs reject broad runtime/temp handoff search;
- docs reject implementation, planning, proof, review, validation, and resync
  ownership drift;
- code fences are scanned by default because the scanner reads Markdown text as
  text and does not skip fenced blocks;
- forbidden claims are detected by semantic families with local polarity, so
  prohibitive statements such as "does not authorize runtime", "no
  materialization", "must not execute resync", "does not implement", "does not
  reissue runner verdict", and "READY is not PASS" remain valid while positive
  authority claims are blocked.

## Forbidden Claim Families

The scanner blocks these positive claim families:

- blocked positive claim family runtime, production, materialization,
  materializer, runtime loader, GitHub
  write, target repo write, generated reports, fixtures, target artifacts,
  productive skill, template mutation, or snapshot mutation authority;
- blocked positive claim family finalizer execution of resync;
- blocked positive claim family finalizer substitution of validation-runner or
  reviewer;
- blocked positive claim family finalizer implementation, fixing, validation
  running, replanning, cut
  redefinition, proof redesign, or execution-package reinterpretation;
- blocked positive claim family finalizer reissuing runner `PASS`, `PARTIAL`,
  `FAIL`, or validation-owned `BLOCKED` as its own status;
- blocked positive claim family `READY` meaning validation `PASS`;
- blocked positive claim family automatic `DONE` from effort, green checks, or
  runner `PASS`;
- blocked positive claim family invented QA checklist success;
- blocked positive claim family `PLAN.md` or legacy phase artifact as durable
  documentation;
- blocked positive claim family broad runtime/temp handoff search;
- blocked positive claim family automatic future promotion.

The exported helpers include `findForbiddenClaims` and
`findForbiddenClaimsInGoldenTestsDoc`.
