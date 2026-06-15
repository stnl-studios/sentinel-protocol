# Resync Kernel Static Checks

Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.

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
- symlinks and non-file entries inside `resync_kernel` are blocked;
- the kernel file allowlist is exactly the 9 files in this bundle;
- the dev snapshot exists;
- the dev snapshot matches `templates/agents/resync.agent.md` byte-for-byte;
- snapshot frontmatter preserves `name: resync`,
  `agent_version: 2026.5.1`, and
  `reading_scope_class: targeted-local`;
- every kernel Markdown document declares the expected local status:
  `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS` in construction mode or
  `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS` after promotion;
- docs preserve identity, role class `sync`, and reading scope
  `targeted-local`;
- docs preserve entry only after finalizer request;
- docs preserve the finalizer relationship: finalizer decides
  `resync: yes/no`, and resync executes or coordinates only the requested
  factual sync;
- statuses are limited to `READY` and `BLOCKED`;
- docs preserve required input, optional input, evidence, output, durable docs,
  valid handoffs, invalid handoffs, stop conditions, and escalation conditions;
- docs preserve allowed durable targets and the default read-only treatment of
  `Feature CONTEXT`;
- docs block ADR and normative `RULES` edit ownership by default;
- docs reject implementation, planning, coding, proof redesign, validation
  running, validation-runner substitution, reviewer substitution, finalizer
  substitution, `DONE`, QA success invention, runtime, production,
  materialization, generated report, fixture, target artifact, and runtime/temp
  handoff search drift;
- `PLAN.md`, `execution_brief.md`, `validation_pack.md`,
  `execution_package.md`, scratchpads, runtime temp files, and generated
  reports cannot become durable documentation for resync;
- code fences are scanned by default because the scanner reads Markdown text as
  text and does not skip fenced blocks;
- forbidden claims are detected by semantic families with local polarity, so
  prohibitive statements such as "does not authorize runtime", "no
  materialization", "must not implement", "does not decide DONE", "does not
  substitute validation-runner", and "READY is not PASS" remain valid while
  positive authority claims are blocked;
- when global docs have been updated for `resync_kernel`, stale current-count
  claims for seven, eight, nine, or ten prepared kernels are blocked.

## Forbidden Claim Families

The scanner blocks these positive claim families:

- blocked positive claim family runtime, production, materialization,
  materializer, runtime loader, GitHub
  write, target repo write, generated report, fixture, target artifact,
  productive skill, template mutation, or snapshot mutation authority;
- blocked positive claim family resync deciding `resync: yes/no` or replacing
  finalizer closure;
- blocked positive claim family resync touching `DONE` or claiming round
  closure;
- blocked positive claim family resync substituting validation-runner,
  reviewer, planner, coders, proof
  design, or execution-package design;
- blocked positive claim family resync implementing, fixing code, running
  validation, judging validation, replanning, redesigning proof, or reviewing
  architecture;
- blocked positive claim family `READY` meaning validation `PASS`, `DONE`,
  complete docs, or QA success;
- blocked positive claim family invented QA success or validation `PASS`;
- blocked positive claim family `PLAN.md`, legacy phase artifacts, temporary
  handoff files, scratchpads, or runtime temporary files as durable
  documentation or source of truth;
- blocked positive claim family broad documentation campaign from a narrow
  finalizer request;
- blocked positive claim family ADR or normative `RULES` rewrite by default;
- blocked positive claim family automatic future promotion.

The exported helpers include `findForbiddenClaims` and
`findForbiddenClaimsInGoldenTestsDoc`.
