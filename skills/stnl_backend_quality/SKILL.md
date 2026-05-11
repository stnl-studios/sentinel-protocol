---
name: stnl_backend_quality
description: Stack-neutral backend quality guardrail for implementation and review, focused on preserving project architecture, responsibilities, persistence patterns, contracts, transaction boundaries, testability, and basic backend safety.
---

# STNL Backend Quality

## Mission
Prevent a backend change from being accepted only because it works when it degrades responsibilities, contracts, persistence, consistency, testability, or basic backend safety.

This skill is an operational guardrail for implementation, technical planning, and review. It does not impose a new architecture, Clean Architecture, Repository Pattern, UseCase, DTO, interface, factory, mapper, service, or dependency injection when the target project does not use it.

## Authority
Apply this order without inversion:

1. Authorized task scope: issue, ticket, prompt, PR, slice, or SPEC.
2. Existing conventions of the target project.
3. `stnl_backend_quality`.
4. Agent judgment.

Rules:
- the authorized task scope defines what may change
- when a Sentinel Slice SPEC exists, it is the strongest scope source
- the target project defines names, paths, boundaries, and local shape
- this skill rejects structural backend degradation inside the authorized scope
- agent judgment only fills small gaps; it does not replace scope, SPEC, or local convention

## Stack-Neutral Mapping
Names change by stack; responsibilities do not.

Treat these as conceptual equivalents:
- `entrypoint`: controller, route, handler, callable, resolver, or job
- `application flow`: service, use case, application service, command handler, or facade
- `persistence abstraction`: repository, DAO, ORM context, query builder, or equivalent project layer
- `contract`: DTO, request object, response object, schema, type, interface, record, class, or equivalent contract
- `mapping`: mapper, presenter, assembler, adapter, or equivalent transformation

Use the target project's real terms when writing, editing, or reviewing.

## Required Discovery
Before implementing or reviewing backend code, identify the target project's real pattern for:
- entrypoints
- application flow
- persistence
- validation
- authorization
- contracts
- mapping
- error handling
- logging
- audit
- transactions

Rules:
- use existing names, paths, and patterns
- do not invent architecture
- do not blindly copy bad code when the target project has a better, newer, or more dominant pattern
- when competing patterns exist, follow the dominant, newer, or area-local pattern evidenced by the authorized task scope
- if the divergence would change the target project's architecture or the authorized task scope does not allow the choice, record a blocker instead of improvising

## Hard Rules
- Keep entrypoints thin.
- Do not put business rules, persistence, side effects, or heavy mapping in a controller, handler, route, callable, resolver, or job.
- Do not turn a service, use case, application service, or command handler into a giant procedural script.
- Separate responsibilities as complexity grows, following the target project's existing structure.
- Preserve the repository, DAO, ORM context, query abstraction, or equivalent pattern when it exists.
- Do not access the database from the wrong layer.
- Follow existing error, logging, audit, and transaction patterns.
- Do not create a new error, logging, or audit style without an explicit reason in the authorized task scope or local context.
- Preserve explicit input and output contracts.
- Do not return a domain entity directly when the target project separates response DTOs, presenters, or mappers.
- Do not mix an external vendor contract with domain or internal API contracts without an adapter, mapper, or equivalent boundary when the target project separates contracts.
- Do not introduce a broad refactor outside the authorized task scope.

## Anti-overengineering
Do not create layers, abstractions, interfaces, factories, mappers, or services only to satisfy a generic pattern.

Add structure only when:
- the target project already uses that structure
- the authorized task scope requires it
- complexity would remain mixed without the separation
- testability or maintainability would clearly be worse without the separation

Any new structure must be the smallest sufficient structure and compatible with its surroundings.

## Complexity Trigger
Separate responsibilities when a method, handler, or backend flow accumulates three or more responsibilities:
- input parsing
- input validation
- authorization
- domain decision
- persistence query/write
- transaction handling
- external API call
- audit, log, or notification
- response mapping

The separation must follow the target project's existing structure, not a new architecture.

## Validation and Authorization
Differentiate explicitly between:
- format, shape, or type validation
- business rule validation
- state validation
- authorization or permission
- external contract validation

Rules:
- authentication is not authorization
- IDs sent by the client, such as actor, user, tenant, organization, or company, are not trusted by themselves
- compare critical client data with the authenticated context and the target project's patterns
- do not mix input validation with domain decisions when the target project already separates those responsibilities

## Persistence and Data Access
- Avoid N+1 queries.
- Preserve pagination, filters, ordering, and limits.
- Do not load more data than the authorized task scope requires.
- Do not move filtering from the database to memory without justification.
- Follow existing patterns for include, join, predicate, specification, query object, or equivalent.
- Do not bypass a repository, DAO, or query abstraction without an explicit reason.
- Keep query and write paths in testable locations according to the local pattern.

## Transactions and Consistency
Require an intentional transaction boundary when there are multiple dependent writes or a write associated with a persistent side effect.

Evaluate and make clear:
- what must be atomic
- where the transaction starts and ends
- whether persistent audit or logging is inside the transaction
- whether an external call is inside or outside the transaction
- duplicate, retry, race, or partial inconsistency risk
- whether idempotency is required or already exists in the target project

An external call inside a transaction requires strong justification and alignment with the local pattern.

## External Integrations
- Protect the domain and internal API from external contract leakage.
- Use an adapter, mapper, or equivalent boundary when the target project separates contracts.
- Do not save a raw external payload as an internal model without justification.
- Do not return a vendor error or payload directly to the client.
- Preserve sanitization and safe logging.
- Handle external failures according to the target project's pattern.

## Schema, Migration, and Contracts
Changes to database schema, response shape, request shape, events, jobs, or integration contracts require explicit care.

Rules:
- check whether migration, versioning, or rollout is required
- preserve backward compatibility unless the authorized task scope allows a breaking change
- do not change response shape silently
- update contracts, mappers, tests, or docs expected by the target project
- record the risk when the change is material and not anticipated by the authorized task scope

## Basic Backend Safety
Cover only basic safety concerns tied to backend quality.

Rules:
- do not expose stack traces, secrets, tokens, or internal errors
- do not log sensitive payloads without sanitization
- preserve tenant, organization, or company isolation
- validate authorization from the authenticated context
- do not trust critical data from the client without server-side verification
- do not weaken existing error handling, masking, or audit

## Testability
Use testability as a signal of structural quality.

Rules:
- relevant business rules should be testable without starting the whole application when the target project allows it
- keep validation, mapping, domain, external integration, and persistence in testable points according to the existing pattern
- avoid coupling that forces an end-to-end test for every small rule
- if a separation would be artificial in the target project, do not create it; if mixing responsibilities prevents reasonable testing, separate them

## Conceptual Violation Examples
- Fat entrypoint: an entrypoint parses input, authorizes access, performs domain decisions, writes data, calls an external service, and shapes the response. Better direction: keep the entrypoint thin and move flow, persistence, side effects, and mapping to the target project's existing backend boundaries.
- Procedural application flow: a service, use case, application service, or command handler becomes a long sequential script with unrelated validation, persistence, integration, and response concerns. Better direction: separate responsibilities only where the target project's structure already supports or clearly needs separation.
- Bypassed persistence pattern: a change directly queries or writes through a lower-level database API while the surrounding area uses a persistence abstraction. Better direction: preserve the local persistence abstraction unless the authorized task scope explicitly justifies a different path.
- Leaked external vendor contract: a vendor payload or error shape becomes part of the domain model, stored data, or public API response. Better direction: keep an adapter, mapping, or equivalent boundary between external contracts and internal contracts when the target project separates them.
- Unclear transaction boundary: multiple dependent writes and persistent side effects are added without making atomicity, retries, and partial failure behavior explicit. Better direction: define the transaction boundary according to the local pattern and keep external calls inside it only with strong justification.
- Weakened authorization: a change trusts a client-provided user, tenant, organization, company, or actor ID without checking it against the authenticated context. Better direction: derive or verify authority server-side using the target project's authorization pattern.
- Silent contract change: request shape, response shape, schema, events, jobs, or integration contracts change without versioning, migration, docs, tests, or explicit scope approval. Better direction: preserve compatibility or record and implement the required contract rollout work.
- Overengineered abstraction: a new interface, factory, mapper, service, or layer is added only because a generic architecture would use it, not because the target project uses it or the complexity requires it. Better direction: keep the smallest structure that matches the local conventions and preserves testability.

## Completion Gate
Backend work is not complete if:
- an entrypoint became fat
- a service, use case, application service, or command handler became a long procedural script
- validation, authorization, persistence, side effects, and response mapping were mixed without need
- the persistence pattern was bypassed
- the transaction boundary is unclear
- an external contract leaked into the domain or API
- response, request, or schema changed outside the authorized task scope
- error, logging, or audit ignored the existing pattern
- basic backend safety was weakened
- the code works functionally but became harder to test or change than the surrounding pattern

## Review Gate
A reviewer or validation runner must reject an implementation that works but violates backend structural quality.

Expected result:
- `FAIL` when the implementation violates the authorized task scope, the target project's pattern, or this backend quality gate
- `PASS` only when it respects the authorized task scope, the target project's patterns, and backend responsibilities

When failing, identify the mixed responsibility, violated boundary, affected contract, or persistence, transaction, safety, or testability risk.
