# stnl_mobile_ios_swift_quality

Global utility skill for applying a portable, structural iOS Swift quality guardrail during implementation, technical planning, and review.

The operational contract lives in `SKILL.md`. This README exists only for repository maintenance.

## Maintenance Notes
- keep `SKILL.md` repo-agnostic and centered on structural iOS Swift quality
- keep the skill portable while strict about SwiftUI, UIKit, state ownership, concurrency, lifecycle, navigation, contract, design system, and platform responsibilities
- do not turn the skill into an iOS tutorial, accessibility checklist, design system guide, or prescriptive architecture guide
- do not impose MVVM, Coordinator, Repository, Combine, SwiftData, CoreData, Alamofire, URLSession, a folder structure, a design system, or a testing strategy when the target project does not use it
- preserve the portable authority order: task specification, approved scope, or implementation brief; target project conventions; this iOS Swift quality guardrail; agent judgment
- keep the Sentinel-specific rule limited to treating the Slice SPEC as the approved scope source when the skill is used inside Sentinel
- keep the focus on gates usable by iOS Swift coders, reviewers, validators, or equivalent agents
- keep project-specific rules in the target project's rules, contracts, docs, task specifications, approved scopes, and project-specific contracts
- treat the repository location and physical skill name as maintenance details, not as part of the operational contract
- avoid making this README or internal repository details part of the final operational contract of the skill
