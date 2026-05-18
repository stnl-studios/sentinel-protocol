# Reference Bundle Manifest

Skill: `stnl_spec_manager`

Required reference template files:
- `reference/templates/assumptions.md`
- `reference/templates/decision_log.md`
- `reference/templates/feature_spec.md`
- `reference/templates/open_questions.md`
- `reference/templates/qa_checklist.md`
- `reference/templates/readiness_report.md`
- `reference/templates/session_summary.md`
- `reference/templates/spec_slices.md`

These files are required in the installed reference bundle so the skill can render every supported artifact shape without searching outside its own bundle.

Generated artifact contract:
- New SPEC creation or legitimate fork must materialize the canonical bundle artifacts required by `SKILL.md`: feature spec, open questions, assumptions, decision log, readiness report, and session summary.
- `qa_checklist.md` and `spec_slices.md` are required reference templates, but they remain conditional generated artifacts.
- Do not infer from this manifest that every new SPEC must generate a QA checklist or slice file. Generate them only when the SPEC contract rules make them applicable.
