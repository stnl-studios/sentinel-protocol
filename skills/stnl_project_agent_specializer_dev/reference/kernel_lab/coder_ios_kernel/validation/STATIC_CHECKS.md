# coder_ios_kernel Static Checks

Status: `CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS`.

`validation/check-static.mjs` is a textual executable harness for this dev-only
kernel bundle. It validates the local documentation and the dev snapshot; it
does not run an agent runtime and does not authorize materialization.

## Checks

- `CIOS-ST-001`: repository containment, no symlink, no non-file, and exact
  nine-file allowlist.
- `CIOS-ST-002`: canonical template and dev snapshot exist.
- `CIOS-ST-003`: snapshot matches `templates/agents/coder-ios.agent.md`
  byte-for-byte.
- `CIOS-ST-004`: snapshot frontmatter preserves `name`, `agent_version`, and
  `reading_scope_class`.
- `CIOS-ST-005`: markdown docs declare the expected status for the selected
  mode and do not mix `BUILDING` and `CLEAN_EXCELLENT_PASS` status lines.
- `CIOS-ST-006`: required identity, mission, entry, input, output, status,
  handoff, reading, iOS, and guardrail anchors are present.
- `CIOS-ST-007`: boundaries reject planner, designer, execution-package
  designer, validation-runner, reviewer, finalizer, resync, frontend, backend,
  durable docs, `DONE`, resync decision, QA success, runtime, production, and
  materialization drift.
- `CIOS-ST-008`: runtime/temp paths, `PLAN.md` as durable documentation,
  target artifacts, fixtures, generated reports, GitHub writes, target-repo
  writes, productive-skill activation, and template mutation remain prohibited.
- `CIOS-ST-009`: forbidden-claim engine uses semantic families with local
  polarity and scans code fences by default.
- `CIOS-ST-010`: harness source contains import guard and no fixture/report
  runtime artifact path.
- `CIOS-ST-011`: after promotion, global docs must state twelve/doze promoted
  kernels, list `coder_ios_kernel`, and reject stale eleven/onze, ten/dez,
  nine/nove, eight/oito, and seven/sete current-count claims.
- `CIOS-ST-012`: no future kernel is promoted implicitly.

The scanner preserves fenced blocks. A forbidden positive claim inside a code
fence must still be detected unless the local scenario language explicitly marks
it as a rejected negative fixture.
