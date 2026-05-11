# stnl_backend_sql_quality

Global utility skill for applying a backend data persistence quality guardrail during implementation, technical planning, and review.

The operational contract lives in `SKILL.md`. This README exists only for repository maintenance.

## Maintenance Notes
- keep `SKILL.md` repo-agnostic and centered on data persistence quality
- keep the skill stack-neutral while covering relational SQL, ORM/query builder usage, document databases, distributed key-value or wide-column databases, and cache usage
- do not turn the skill into a database manual, database-specific syntax guide, or broad performance encyclopedia
- do not replace the target project's repository, ORM, query builder, migration, transaction, cache, or data modeling conventions
- preserve the portable authority order: explicit user/developer instruction, approved task/specification/scope, target project conventions, this guardrail, agent judgment
- keep the focus on gates usable by backend coders, reviewers, validation runners, or equivalent agents
- keep project-specific persistence rules in the target project's docs, conventions, specifications, and approved scopes
- treat the repository location and physical skill name as maintenance details, not as part of the operational contract of the skill
- avoid making this README or internal repository details part of the final operational contract of the skill
