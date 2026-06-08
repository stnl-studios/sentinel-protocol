# Reviewer Kernel Static Checks

Status: dev-only executable static-check contract for
`REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS`.

This file documents the current dev-only static validation harness for the
reviewer clean pass. `validation/check-static.mjs` is part of the reviewer-kernel
allowlist and executes these documentary checks. Passing the harness does not
authorize runtime, materialization, production, global docs updates,
productive-skill changes, template changes, generated reports, fixtures,
GitHub writes, target-repository writes, automatic future promotion beyond this
clean pass, or runtime harness authority.

The static checks inspect only:

- local reviewer snapshot:
  `skills/stnl_project_agent_specializer_dev/reference/agents/reviewer.agent.md`;
- productive template for literal-copy comparison only:
  `templates/agents/reviewer.agent.md`;
- reviewer-kernel documentation:
  `skills/stnl_project_agent_specializer_dev/reference/reviewer_kernel/**`.

The productive template is only a copy origin for the snapshot comparison. It
is not a fallback source for missing reviewer-kernel documentation.

## Harness File Allowlist

The current reviewer-kernel allowlist contains exactly nine files:

1. `README.md`
2. `contracts/CONTRACT.md`
3. `contracts/BEHAVIOR_PARITY_SPINE.md`
4. `contracts/MINIMUM_SAFE_BUNDLE.md`
5. `contracts/SEMANTIC_REVIEW_GATES.md`
6. `validation/STATIC_CHECKS.md`
7. `validation/GOLDEN_TESTS.md`
8. `validation/check-static.mjs`
9. `validation/check-golden.mjs`

The two `.mjs` files are validation scripts only. They are not runtime loaders,
materializers, fixtures, generated reports, target artifacts, productive-skill
activation paths, GitHub write paths, or target-repository write paths.

## Static Harness Behavior

`validation/check-static.mjs` validates path safety, the nine-file allowlist,
snapshot parity, document status, section anchors, output contracts, boundary
contracts, reading contracts, and identifier coverage for `RV-CH-001` through
`RV-CH-016`.

The script is safe to import as a module. Its top-level exports include:

- `findForbiddenClaims(text)`;
- `findForbiddenClaimsInGoldenTestsDoc(text)`.

Both exports return structured match objects with:

- `blocker`;
- `family`;
- `claimName`;
- `excerpt`.

The import guard prevents the main check routine from running when the module
is imported for scanner reuse.

## Forbidden-Claim Engine

The forbidden-claim scanner is semantic and heuristic. It is not a full NLP
engine and is not limited to phrase-by-phrase regex checks.

It detects prohibited affirmative claims through:

- semantic families of subjects, actions, and objects;
- paired-source claims such as untrusted sources treated as trusted;
- explicit pattern claims for output shape and status promotion;
- local negation handling, so prohibited examples remain accepted when they are
  clearly denied in the same local context;
- semantic blockers that name the violated reviewer boundary.

The engine preserves the status `REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS` and
rejects non-negated claims that would imply automatic future promotion beyond
this pass, runtime, materialization, production, materializer authority,
productive-skill activation, GitHub writes, target-repository writes, target
artifacts, fixtures, generated reports, validation-runner replacement,
finalizer replacement, resync replacement, coder/fixer replacement, cut
redesign, or generic opinion-review drift.

## GOLDEN_TESTS.md Scanner

`findForbiddenClaimsInGoldenTestsDoc(text)` applies a scoped scanner for
`GOLDEN_TESTS.md`.

Code fences are scanned by default. A fenced block is not automatically ignored
just because it is inside Markdown.

Negative examples are protected only in narrow contexts:

- `Fail condition` and `Expected blocker` protect only the associated inline
  example, paragraph, or fenced block;
- the line or paragraph after a protected negative example is scanned again;
- `Input shape` is allowed as a negative example only inside a complete,
  compatible Golden Test scenario.

For `Input shape` to be accepted as a negative example, the surrounding
scenario must use heading `## Golden Test RV-GT-xxx`, include the critical
sections in order, avoid duplicate critical sections, keep normative
`Expected blocker` text outside fenced code, and cover every forbidden match in
`Input shape` with an expected blocker.

## Static Checks

### RV-CH-001 - Required reviewer-kernel files exist

Validate that the current nine-file reviewer-kernel allowlist exists exactly,
including `validation/check-static.mjs` and `validation/check-golden.mjs`, with
no extra files.

### RV-CH-002 - Snapshot local exists

Validate that `reference/agents/reviewer.agent.md` exists as the local dev
snapshot and audit point.

### RV-CH-003 - Snapshot is literal copy of productive template

Compare `templates/agents/reviewer.agent.md` and
`reference/agents/reviewer.agent.md` byte-for-byte.

### RV-CH-004 - Status remains clean excellent pass

Validate all reviewer-kernel docs use `REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS`
and do not claim automatic future promotion beyond this pass, runtime,
production, materializer, materialization path, runtime harness, target
artifact, productive-skill activation, template mutation, GitHub write, or
target-repo write authority.

### RV-CH-005 - Identity and role preserved

Validate the docs preserve `reviewer`, `semantic-review`, `review-minimal`,
agent version `2026.5.1`, and post-implementation pre-finalizer placement.

### RV-CH-006 - Review target preserved

Validate the docs require review of implemented artifact and resulting diff
inside the authorized cut.

### RV-CH-007 - Material semantic review axes preserved

Validate the docs preserve semantic risk, architectural risk, boundary drift,
maintainability, complexity, improper coupling, unauthorized inference,
contract drift, product-decision leakage, active guardrail drift, and scope
expansion.

### RV-CH-008 - Proof ownership prohibited

Validate the docs keep proof, check execution, evidence gathering, and runner
verdicts with `validation-runner`, not reviewer.

### RV-CH-009 - Implementation ownership prohibited

Validate the docs prohibit implementation, code editing, patching, correction
execution, broad refactor, and cut redesign by reviewer.

### RV-CH-010 - Closure and resync ownership prohibited

Validate the docs prohibit reviewer from deciding `DONE`, closing the round,
performing resync, deciding factual sync, or writing shared canon.

### RV-CH-011 - Output shape preserved

Validate the docs allow only `PASS`, `FAIL`, or exactly one formal
`CORRECTION PACK` block, and require `CORRECTION PACK` to be mutually exclusive
with terminal verdicts.

### RV-CH-012 - PASS and FAIL semantics preserved

Validate `PASS` requires sufficient structural adherence and no unresolved
material structural risk, while `FAIL` requires unresolved material structural
risk or honest inability to judge.

### RV-CH-013 - Correction pack gate preserved

Validate `CORRECTION PACK` is allowed only for minimal, in-scope, surgical,
corrigible issues while budget remains and is routeable by orchestrator rather
than executed by reviewer.

### RV-CH-014 - Reading remains review-minimal

Validate the docs preserve bounded reading order, nearest-reference expansion
only for one concrete structural question, File Purpose Header awareness, and
prohibition on scratchpads, `workspaceStorage`, `chat-session-resources`,
`content.txt`, and runtime temp paths as Sentinel source of truth.

### RV-CH-015 - Generic opinion review prohibited

Validate the docs reject repo-wide review, broad rediscovery, aesthetic
preference as blocker, generic modernization review, and non-material findings
inflated into structural risk.

### RV-CH-016 - Unexpected files remain absent

Validate `reviewer_kernel` contains only the nine allowlisted files for this
phase and no unexpected `.js`, `.cjs`, fixture, generated output, report,
runtime, loader, materializer, materialization path, target artifact, or other
integration path.
