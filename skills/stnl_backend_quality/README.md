# stnl_backend_quality

Global utility skill for applying a structural backend quality guardrail during implementation, technical planning, and review.

The operational contract lives in `SKILL.md`. This README exists only for repository maintenance.

## Maintenance Notes
- keep `SKILL.md` repo-agnostic and centered on structural backend quality
- keep the skill stack-neutral while strict about responsibilities
- do not turn the skill into a backend tutorial, full security checklist, or prescriptive architecture guide
- do not impose Clean Architecture, Repository Pattern, UseCase, DTO, interface, factory, mapper, service, or dependency injection when the target project does not use it
- preserve the portable authority order: authorized scope, target project conventions, `stnl_backend_quality`, agent judgment
- keep the focus on gates usable by backend coders, reviewers, validation runners, or equivalent agents
- avoid making this README or internal repository details part of the final operational contract of the skill
