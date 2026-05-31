# Validation Eval Designer Minimum Safe Bundle

Status: `VALIDATION_EVAL_DESIGNER_KERNEL: UNDER_CONSTRUCTION`.

The kernel is safe only while all items below remain together.

## Mandatory Bundle

1. Identity remains `validation-eval-designer`, role class `proof-design`, and
   reading scope class `targeted-local`.
2. Main input remains the ephemeral current-round `EXECUTION BRIEF`.
3. Main output remains the ephemeral current-round `VALIDATION PACK`.
4. `READY` remains difficult and requires sufficient, proportional, observable
   proof design.
5. `NEEDS_DEV_DECISION_HARNESS` remains mandatory for DEV-owned harness,
   partial-evidence, cost, environment, or risk-tolerance choices.
6. `HANDOFF_MISSING`, `HANDOFF_INVALID`,
   `REQUEST_REPLAY_FROM_ORCHESTRATOR`, and `REQUEST_REGEN_FROM_OWNER` remain
   available for honest handoff recovery.
7. `HARNESS_DECISION_GATES.md` remains separate and mandatory.
8. Anti-theater validation remains explicit.
9. The kernel must not become planner, validation-runner, or
   execution-package-designer.
10. `VALIDATION PACK` remains ephemeral, never durable documentation or a
    persisted stand-in.

## Blocking Rule

If any mandatory item is missing, weakened, merged away, or made optional, the
kernel is not review-ready. Harness success is blocking support only and never
automatic promotion, runtime adoption, materialization authorization, or final
status.
