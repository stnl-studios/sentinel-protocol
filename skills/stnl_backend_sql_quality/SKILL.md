---
name: stnl_backend_sql_quality
description: Backend data persistence quality guardrail for implementation and review, focused on SQL, ORM, NoSQL, cache, migrations, transactions, indexes, query safety, bounded access, and consistency.
---

# Backend Data Persistence Quality Guardrail

## Intent
Prevent backend data access code from being accepted only because it works when it is unsafe, slow, inconsistent, unbounded, expensive, or hard to maintain.

This skill reinforces the target project's existing persistence conventions. It does not replace local repository, ORM, query builder, migration, transaction, cache, or data modeling standards, and it does not turn a task into a database redesign unless the approved scope requires that work.

## Scope / Applies when
Apply this guardrail when the task touches:
- SQL queries
- ORM queries
- repositories
- query builders
- migrations
- indexes
- transactions
- joins, includes, navigation objects, or relation loading
- filters, predicates, sorting, or dynamic query fragments
- pagination, cursors, limits, or bounded access
- bulk operations
- reporting queries
- data integrity constraints
- document databases
- distributed key-value or wide-column databases
- cache usage
- database performance fixes

## Authority
Apply this order without inversion:

1. Explicit user/developer instruction.
2. Approved task, specification, or authorized scope.
3. Existing target project conventions.
4. This backend data persistence quality guardrail.
5. Agent judgment.

Rules:
- explicit user/developer instructions and the approved task, specification, or scope define what may change
- the target project defines names, paths, abstractions, query style, transaction style, migration practice, cache practice, data modeling practice, and operational limits
- this guardrail rejects data persistence degradation inside the approved scope
- agent judgment only fills small gaps; it does not replace explicit instructions, approved scope, project conventions, or missing product decisions

## Universal data access rules
- Prefer the project's existing repository, DAO, ORM context, query object, query builder, specification, predicate, include, or equivalent abstraction.
- Do not bypass the established data access pattern without a clear reason.
- Do not use raw SQL when the project standard is ORM or query builder unless there is a clear reason.
- If raw SQL is necessary, keep it parameterized, isolated, and minimal.
- Never concatenate untrusted user input into SQL, query strings, filter fragments, sort fragments, field names, or operators.
- For cache keys, only use user-controlled values after normalization, scoping, and safe key construction according to the project pattern.
- Validate and allowlist dynamic filters, sorts, field names, operators, and query fragments.
- Avoid N+1 queries.
- Avoid database reads or writes inside loops when batch queries or bulk operations are possible.
- Select only the columns or data needed when the project style allows it.
- Avoid loading large object graphs accidentally.
- Use pagination, cursors, limits, or bounded access for potentially large result sets.
- Push filtering, sorting, grouping, and aggregation to the database when appropriate.
- Use transactions for multiple dependent writes when atomicity is required.
- When strong transactionality is unavailable or not appropriate, require idempotency, compensation, or explicit consistency handling.
- Consider indexes for new or changed high-volume filters, joins, lookups, ordering, uniqueness, or partition and access patterns.
- Prefer database constraints for integrity that must always hold.
- Keep migrations reversible or safe when the project expects that.
- Do not introduce broad schema or data model refactors outside the approved scope.
- Treat cache as a consistency and invalidation problem, not only as a performance optimization.

## Family-specific rules
### Relational SQL databases
Applies to PostgreSQL, SQL Server, Oracle, MariaDB, MySQL, and similar relational systems.

- Avoid `SELECT *` in raw SQL when only a subset of columns is needed.
- Use deterministic ordering for pagination.
- Avoid joins that explode cardinality without a clear need.
- Consider indexes for `WHERE`, `JOIN`, `ORDER BY`, uniqueness, and high-volume lookup paths.
- Use constraints for mandatory integrity rules.
- Be careful with long transactions, lock scope, isolation, and concurrency.
- Migrations must consider existing data, rollback or safety, and production impact when relevant.

### ORM / Query Builder
Applies to Entity Framework, Dapper, Prisma, TypeORM, Sequelize, Hibernate/JPA, Spring Data, Knex, and similar tools.

- Avoid hidden N+1 from lazy loading or relation access.
- Avoid excessive eager loading or includes.
- Use projections or DTO selection when only partial data is needed.
- Do not materialize data before applying filters unless the dataset is known to be small.
- Follow project predicate, filter, include, relation loading, and query object conventions when they exist.
- Dynamic query building must allowlist user-controlled fields and operators.

### Document databases
Applies to MongoDB, Cloud Firestore, Cosmos DB document mode, and similar stores.

- Model around access patterns, not automatic relational normalization.
- Avoid collection scans in production paths.
- Ensure indexes exist for frequent filters and ordering.
- Prefer cursor-style pagination where applicable.
- Avoid unbounded document growth.
- Be explicit about denormalization and consistency or update strategy.
- Do not assume multi-document transactions are the default.
- Consider eventual consistency when it affects business behavior.

### Distributed key-value / wide-column databases
Applies to Cassandra, DynamoDB, Cosmos DB key-value or wide-column usage, and similar systems.

- Query shape must match partition and access patterns.
- Do not introduce global scans for critical runtime flows.
- Avoid relational-style modeling when the database requires access-pattern modeling.
- Watch for hot partitions.
- Denormalization is acceptable only with clear update and consistency rules.
- Bulk operations must consider throttling, retry, backoff, batching, and idempotency.
- A new query may require a new table, index, materialized view, or access model; do not hide that as a small code-only change.

### Cache / Redis
- Cache is not the source of truth unless the project explicitly treats it that way.
- Cache keys must define namespace, tenant or user scope when relevant, and versioning when needed.
- Cached data should have TTL or an explicit reason not to.
- Invalidation must be handled with the writes that change the underlying data.
- Avoid caching sensitive data without explicit project precedent.
- Avoid unbounded Redis structures and large payloads.
- Avoid expensive key scans in runtime paths.
- Consider cache stampede protection for high-traffic keys.
- Define safe fallback behavior for cache miss or cache failure.

## Stack-specific smells
### .NET / C#
- `ToList()`, `AsEnumerable()`, or materialization before filters.
- Lazy loading causing N+1.
- Excessive `Include`.
- Repository, Unit of Work, or DbContext pattern bypass.
- Multiple dependent writes without a transaction or clear unit of work.

### Node / JavaScript / TypeScript
- `await` inside loops for database operations.
- Unbounded `Promise.all` for large bulk operations.
- Query strings assembled with user input.
- Prisma, TypeORM, or Sequelize relation loading without need.
- Filtering large results in memory.

### Java
- Hibernate/JPA lazy loading outside the intended transaction boundary.
- N+1 through entity navigation.
- Repository methods that imply filters or orders without index consideration.
- Batch jobs without transaction size, retry, or memory control.
- Business rules hidden inside persistence adapters.

## Common anti-patterns
- SQL string concatenation with user input.
- Query in loop causing N+1.
- Loading all rows and filtering in memory.
- Missing pagination on large lists.
- `SELECT *` in raw SQL when only a few columns are needed.
- Multiple dependent writes without transaction or consistency strategy.
- ORM include or eager loading that loads a huge object graph unnecessarily.
- New query style that bypasses established repository, predicate, include, or query object patterns.
- Migration that changes data or schema without rollback or safety consideration.
- New filter or order-by path with no index or access-pattern consideration.
- Data integrity rules enforced only in application code when a database constraint is required.
- Cache with no TTL, no invalidation, or unclear key scope.

## Stop conditions
Stop or ask for clarification when:
- the database, ORM, query builder, cache, or client technology is unclear and the rule choice would materially change implementation
- the project has competing data access patterns and no canonical convention is evident
- a feature requires choosing between strong consistency, eventual consistency, compensation, or idempotency
- a new query appears to require an index, partition strategy, migration, or data model change but the approved scope does not authorize it
- a NoSQL model requires access patterns that were not provided
- cache is requested but TTL, invalidation, key scope, or source-of-truth behavior is unclear
- the change affects multi-tenant isolation, authorization-by-data, or user/customer data boundaries
- a bulk operation may create high cost, throttling, locking, or production performance risk and no limit is defined

## Completion gate
Backend data persistence work is not complete if it only works but introduces:
- SQL or query injection risk
- N+1 queries
- excessive data loading
- filtering or sorting large datasets in memory
- unbounded queries
- dependent writes without transaction, idempotency, or consistency strategy
- established repository or query convention bypass
- unsafe migration
- ignored index, partition, access-pattern, or constraint implications
- cache without TTL, invalidation, and key-scope clarity
- data model changes outside the approved scope

A reviewer, validation runner, or implementing agent must reject data persistence work that violates the approved scope, the target project's persistence conventions, or this guardrail.
