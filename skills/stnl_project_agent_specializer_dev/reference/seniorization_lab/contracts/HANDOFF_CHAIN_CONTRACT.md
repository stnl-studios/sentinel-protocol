# Seniorization Lab Handoff Chain Contract

Status: `DOCUMENTARY_DEV_ONLY`.

This contract defines the integrated handoff chain expected across the 12 modular Senior Agent Profiles. It is a validation and alignment contract only. It does not execute the chain, load modules, create runtime routing, or materialize agents.

## Chain Principle

Every handoff must preserve source owner, next owner, objective, scope boundary, artifact or signal being transferred, evidence available, blockers and open questions, explicit out-of-scope statement, and the modules required to support any material output.

A downstream profile may use only the handoff it actually received and the sources it is authorized to inspect. It must not infer missing upstream content from desired workflow shape.

## Integrated Sequence

```text
orchestrator
-> planner
-> validation-eval-designer
-> execution-package-designer
-> designer when real UX is present
-> coder-frontend / coder-backend / coder-ios as package requires
-> validation-runner
-> reviewer
-> finalizer
-> resync when authorized
```

This sequence is a canonical integrated dry-run spine, not a runtime router and not load-all authorization. Actual owner activation remains controlled by canonical workflow authority, valid handoff, minimum context, and explicit task context.

## Required Handoff Edges

| edge | required incoming state | allowed outgoing state | block when missing |
|---|---|---|---|
| `orchestrator -> planner` | accepted demand, safe route, scope/authority boundary | planner handoff with objective, constraints, blockers | owner ambiguity, missing authority, unsafe route |
| `planner -> validation-eval-designer` | bounded planning cut / `EXECUTION BRIEF` | proof-design request with scope and acceptance intent | no bounded cut, unclear acceptance, broad discovery required |
| `validation-eval-designer -> execution-package-designer` | `VALIDATION PACK` or proof obligations tied to the cut | package-design input with validation obligations | proof obligations absent, generic QA, harness ambiguity |
| `execution-package-designer -> designer` | package need for UX/product/design judgment | bounded design request and constraints | no design surface, unclear user/product source, package mismatch |
| `execution-package-designer -> coder-frontend` | frontend-owned work package | frontend execution boundary | missing `OWNED_PATHS`, `DO_NOT_TOUCH`, `DEPENDS_ON`, `BLOCK_IF`, acceptance checks |
| `execution-package-designer -> coder-backend` | backend-owned work package | backend execution boundary | missing API/schema/data/auth scope, package gates, acceptance checks |
| `execution-package-designer -> coder-ios` | iOS-owned work package | native iOS execution boundary | missing iOS target, owned files, platform constraints, package gates |
| `designer -> execution/coder context` | design guidance tied to package scope | required/advisory design constraints | design source absent, preference-only advice, implementation takeover |
| `coders -> validation-runner` | executor handoff with changed scope and evidence | validation input tied to executed package | no executor evidence, stale commands, changed scope not represented |
| `validation-runner -> reviewer` | proof result against validation obligations | validation verdict and evidence summary | generic confidence, no proof mapping, partial evidence hidden |
| `reviewer -> finalizer` | semantic review verdict and material risks | closure recommendation or correction pack | unresolved blocker, review without evidence, unclear materiality |
| `finalizer -> resync` | terminal ledger and explicit resync need/authorization | resync request with final facts only | no closure, non-terminal state, no resync authorization |

## Artifact Vocabulary

The following artifact names are allowed as documentary vocabulary in profile validation and handoff discussion. Their presence here does not materialize files or templates:

- `EXECUTION BRIEF`
- `VALIDATION PACK`
- `EXECUTION PACKAGE`
- `WORK_PACKAGE_ID`
- `OWNED_PATHS`
- `DO_NOT_TOUCH`
- `DEPENDS_ON`
- `BLOCK_IF`
- `RUN_COMMANDS`
- `ACCEPTANCE_CHECKS`
- `READY`
- `BLOCKED`
- `PASS`
- `PARTIAL`
- `FAIL`
- `CORRECTION PACK`
- `REVIEW_CLEAR`
- `REVIEW_RISK`
- `DONE`
- `resync: yes/no`

## Modular Blocking Rules

A profile must block instead of continuing when the incoming handoff is absent, lacks scope, lacks owner identity, lacks required artifact or evidence, requires a module that was not loaded, would skip proof design/package design/validation/review/closure/resync authorization, asks for another profile's duty, or asks for runtime/materialization behavior.

## Dry-Run Use

For integrated validation, this chain may be simulated with a synthetic demand that exercises all 12 profiles. A successful dry-run proves documentary coherence only. It does not prove that runtime agents exist, generated targets are valid, or production materialization is authorized.
