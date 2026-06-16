# Lazy-Load Fixtures

Status: documentary/dev-only category skeleton.

Future lazy-load fixtures will simulate lazy-load behavior by documented trace
fixtures. They will not create a runtime loader and will not authorize runtime
materialization.

Lazy-load safety rules for future fixtures:

- Module 01 is required for non-trivial work.
- Module 02 is required for non-trivial decisions.
- Module 03 is required for risk, gate, or blocker scenarios.
- Module 04 is required for handoff, evidence, or material output scenarios.
- A module that is not activated must not load for completeness.
- Load-all by default blocks.
- An activated module that is not loaded blocks.
- `depends_on` must be respected.
- A material decision must leave a decision trace.
- Material output or handoff must leave an output trace.
- Missing trace blocks.

This phase creates no lazy-load trace fixture.
