# Feature Spec Template v2

## 1. Document Purpose

### Feature Name
[Short, clear feature name]

### Objective
[Describe in 2 to 5 lines what will be built and what outcome is expected.]

### Problem Statement
[What pain, risk, bottleneck, or opportunity motivates this feature?]

### Expected Outcome
[What concretely changes in the product, operation, or user flow after release?]

### Audience
This document is intended for:
- Product, design, engineering, QA, operations, and stakeholders impacted by the feature

### Source of Truth Rule
This document is the primary implementation reference for this feature.
If tickets, chats, or informal notes conflict with this spec, this spec wins unless an explicit decision updates it.

---

## 2. Context

### Product Context
[Explain where this feature fits in the product, user journey, or business process.]

### Technical / Architectural Context
[Summarize only the system context, constraints, patterns, and conventions that materially affect this feature. Reference stable project docs instead of restating project-wide context, rules, contracts, or testing policy.]

### Motivation
[Why now? Bug, customer request, growth opportunity, operational issue, compliance need, technical debt, etc.]

### Related Existing Behavior
[Describe the current behavior or adjacent flows that this feature must preserve, extend, or replace.]

---

## 3. Scope

### In Scope
- [Item 1]
- [Item 2]
- [Item 3]

### Out of Scope
- [Item 1]
- [Item 2]
- [Item 3]

### Assumptions
- [Assumption 1]
- [Assumption 2]

### Constraints
- [Technical, legal, operational, UX, performance, time, or legacy constraints.]

---

## 4. Actors and Impact

### Affected Actors
- [Authenticated user]
- [Admin]
- [Support / Operations]
- [External system]
- [Internal team]

### Value by Actor
- **[Actor 1]**: [Value delivered]
- **[Actor 2]**: [Value delivered]

### Permissions and Access
[Who can view, trigger, edit, approve, export, or administer this feature?]

---

## 5. Functional Flow

### Primary Flow
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]

### Alternate Flows
#### Alternate Flow A
1. [Step]
2. [Step]

#### Alternate Flow B
1. [Step]
2. [Step]

### Error / Exception Flows
- [Error case 1]: [Expected behavior]
- [Error case 2]: [Expected behavior]
- [Error case 3]: [Expected behavior]

### Edge Cases
- [Edge case 1]
- [Edge case 2]
- [Edge case 3]

---

## 6. Output Shape

### User-Facing Output
[Describe what the user actually sees or receives: page, table, modal, feed item, file, notification, API consumer output, etc.]

### System Output
[Describe backend or integration outputs such as events, jobs, records, webhooks, exports, emails, or downstream messages.]

### Rendering Rules
- [How information should be displayed]
- [What is grouped, summarized, paginated, sorted, or hidden]
- [How empty / partial / loading / error states should behave]

### Consistency Requirements
[State any consistency guarantees required between UI, API, exports, analytics, logs, or downstream consumers.]

---

## 7. Functional Requirements

### FR01. [Requirement Name]
**Description**  
[Describe the expected behavior in a precise, testable way.]

**Rules**
- [Rule 1]
- [Rule 2]

**Inputs**
- [Input 1]
- [Input 2]

**Outputs**
- [Output 1]
- [Output 2]

---

### FR02. [Requirement Name]
**Description**  
[Describe the expected behavior.]

**Rules**
- [Rule 1]
- [Rule 2]

**Inputs**
- [Input]

**Outputs**
- [Output]

---

### FR03. [Requirement Name]
**Description**  
[Describe the expected behavior.]

**Rules**
- [Rule 1]
- [Rule 2]

---

## 8. Business Rules

### BR01. [Short Name]
[Business rule written as a clear, verifiable statement.]

### BR02. [Short Name]
[Business rule.]

### BR03. [Short Name]
[Business rule.]

> Business rules should be objective and testable.
> Avoid vague wording such as "should be intuitive" or "should work well".

---

## 9. Data Semantics

### Source of Data
[Where does the feature data come from? Database, cache, API, event stream, external service, computed view, etc.]

### Semantic Definitions
Define critical business meanings explicitly:
- **[Field / Metric / State 1]**: [Definition]
- **[Field / Metric / State 2]**: [Definition]
- **[Field / Metric / State 3]**: [Definition]

### Counting Rules
[Explain what counts, what does not count, and under what conditions.]

### Deduplication Rules
[Explain how duplicates are identified and resolved.]

### State Resolution Rules
[Explain whether current state, historical state, snapshot state, or event-time state is used.]

### Time Semantics
[Explain timezone, date boundaries, ordering rules, and any temporal caveats.]

---

## 10. Mapping / Join Rules

### Entity Mapping
[Describe how data from different entities, domains, or services must be linked.]

### Join Priority
[If multiple possible matches exist, define precedence.]

### Missing Data Rules
[What happens when linked data is absent, stale, partial, or inconsistent?]

### Fallback Rules
[Define explicit fallback behavior instead of leaving it to implementation guesswork.]

---

## 11. Interfaces and Contracts Impacted

### Front-End
- [Route / screen / component impacted]
- [UI state changes]
- [Validation rules]
- [Messages / labels]
- [Design system components or patterns to follow]

### Back-End
- [Endpoint added or changed]
- [Domain service added or changed]
- [Worker / queue / cron / webhook]
- [Authorization or validation changes]

### Database
- [New table]
- [New column]
- [Migration]
- [Index]
- [Relationship change]

### External Integrations
- [Service]
- [Dependency]
- [Retry / timeout / fallback expectations]

### API / Contract Expectations

#### Request Shape
```json
{
  "[field]": "[type / description]"
}
```

#### Response Shape
```json
{
  "[field]": "[type / description]"
}
```

#### Error Responses
- `400`: [When it occurs]
- `401`: [When it occurs]
- `403`: [When it occurs]
- `404`: [When it occurs]
- `409`: [When it occurs]
- `422`: [When it occurs]
- `500`: [When it occurs]

### Contract Rules
- [Required vs optional fields]
- [Pagination rules]
- [Sorting rules]
- [Backward compatibility requirements]
- [Versioning requirements, if any]

---

## 12. Validation Rules

### Input Validation
- [Validation rule 1]
- [Validation rule 2]

### Domain Validation
- [Business/domain validation 1]
- [Business/domain validation 2]

### Authorization Validation
- [Permission check 1]
- [Permission check 2]

### Integrity Validation
- [Data integrity guard 1]
- [Data integrity guard 2]

### Failure Behavior
[What should happen when validation fails? Include user-facing behavior and system behavior.]

---

## 13. Security, Privacy, and Compliance

### Data Classification
- [Personal data?]
- [Sensitive data?]
- [Financial data?]
- [Operationally sensitive data?]

### Authentication
[Authentication requirements.]

### Authorization
[Role, tenant, ownership, or scope rules.]

### Auditability
[What actions must be logged?]

### Privacy / Retention
[Masking, retention, deletion, export control, legal requirements, etc.]

### Risks
- [Risk 1]
- [Risk 2]

### Mitigations
- [Mitigation 1]
- [Mitigation 2]

---

## 14. Non-Functional Requirements

### Performance
- [Example: p95 response under 300ms]
- [Example: export generation under 60s for X records]
- [Example: pagination must remain server-side]

### Reliability
- [Idempotency requirements]
- [Retry behavior]
- [Timeout behavior]
- [Partial failure behavior]

### Observability
- [Required logs]
- [Required metrics]
- [Required tracing]
- [Required alerts]

### Scalability
[Expected volume, throughput, cardinality, future growth, operational limits.]

### Accessibility
[Keyboard navigation, screen reader, contrast, focus states, etc.]

### Localization / Internationalization
[Language, timezone, number/date/currency formatting, translations, locale behavior.]

---

## 15. UX / UI Notes

### Experience Goals
[How the interaction should feel from the user's perspective.]

### Required UI States
- loading
- success
- empty
- partial
- error
- retry
- disabled

### Critical Messages
- **Success**: "[message]"
- **Error**: "[message]"
- **Validation**: "[message]"
- **Confirmation**: "[message]"

### Design References
- [Figma link]
- [Design system link]
- [Reusable pattern or component]

---

## 16. Dependencies and Sequencing

### Technical Dependencies
- [Dependency 1]
- [Dependency 2]

### Cross-Team / Cross-Function Dependencies
- [Example: backend must expose contract before frontend integration]
- [Example: design must define empty and error states]
- [Example: QA depends on staging fixtures or mocks]

### Known Blockers
- [Blocker 1]
- [Blocker 2]

### Sequencing Guidance
[What should happen first, what can happen in parallel, and what must wait on another piece.]

---

## 17. Acceptance Criteria

### AC01
[Given / when / then]

### AC02
[Given / when / then]

### AC03
[Given / when / then]

### AC04
[Given / when / then]

### AC05
[Given / when / then]

> Every acceptance criterion should be directly testable.
> If it is not testable, it is not specified well enough.

---

## 18. Expected Test Coverage

### Happy Path
- [Scenario 1]
- [Scenario 2]

### Validation
- [Scenario 1]
- [Scenario 2]

### Permissions / Security
- [Scenario 1]
- [Scenario 2]

### Error / Resilience
- [Scenario 1]
- [Scenario 2]

### Regression
- [Existing flows that must not break]

---

## 19. Rollout and Operations

### Release Strategy
- [Big bang / feature flag / gradual rollout / internal-only / tenant-based]

### Feature Flag
- [Flag name]
- [Behavior when on]
- [Behavior when off]

### Migration / Operational Changes
- [Schema migration]
- [Backfill]
- [Cache invalidation]
- [Reindexing]
- [Runbook update]

### Rollback Plan
[How to revert safely if the feature causes problems.]

### Operational Checklist
- [ ] Migration applied
- [ ] Flag configured
- [ ] Monitoring configured
- [ ] Dashboards updated
- [ ] Runbook updated
- [ ] Stakeholders notified

---

## 20. Success Metrics

### Primary Metrics
- [Metric 1]
- [Metric 2]
- [Metric 3]

### Failure Signals
- [Signal 1]
- [Signal 2]

### Evaluation Window
[When and how the feature should be evaluated after release.]

---

## 21. Open Questions

### Q1
[Unresolved point]

### Q2
[Unresolved point]

### Q3
[Unresolved point]

> Do not hide ambiguity inside the document body.
> Anything still undefined should be explicitly listed here.

---

## 22. Decisions Taken

### D1
[Decision]
**Reason:** [Why this decision was made]

### D2
[Decision]
**Reason:** [Why this decision was made]

---

## 23. Artifacts and References

- [PRD]
- [Epic / ticket]
- [Figma]
- [ADR / RFC]
- [Technical documentation]
- [Monitoring dashboard]
- [Runbook]
- [Related context documents]

---

## 24. Definition of Done

This feature is considered done when:

- [ ] Functional requirements implemented
- [ ] Business rules respected
- [ ] Data semantics preserved
- [ ] Contracts implemented and validated
- [ ] Acceptance criteria passed
- [ ] Essential tests added
- [ ] Observability implemented
- [ ] Security / permission checks verified
- [ ] Documentation updated
- [ ] Rollout and rollback defined
- [ ] Open questions resolved or explicitly accepted
- [ ] Required review completed

---

## 25. Usage Notes for This Template

### What belongs here
Use this document for information that is specific to a single feature:
- intent
- scope
- behavior
- rules
- contracts
- acceptance
- rollout

### What does not belong here
Do not duplicate stable project-wide documentation such as:
- project overview
- global architecture
- engineering standards
- permanent domain glossary
- repo state maps and structural inventories
- stable contract conventions and contract location guides
- project-wide testing strategy or minimum validation policy
- design system rules
- repo onboarding
- general runbooks

Reference those documents instead.

### Relationship With Context Docs
Use the project docs as follows instead of absorbing their role into the feature spec:
- `CONTEXT`: factual project or unit backdrop
- `RULES`: invariants, prohibitions, and mandatory boundaries
- `STATE`: where things live and what exists today
- `CONTRACTS`: stable contract patterns, conventions, and locations
- `TESTING`: validation strategy and minimum proof expectations

### Filling Guidance
When writing a real feature spec:
- prefer concrete behavior over vague intent
- define semantics, not just screens
- define data rules, not just UI expectations
- make ambiguity explicit
- make acceptance criteria testable
- minimize room for implementation guesswork
