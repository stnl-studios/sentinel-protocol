---
name: stnl_frontend_quality
description: Stack-neutral frontend quality guardrail for implementation and review, focused on preserving UI boundaries, service/facade/store usage, component responsibility, form flows, mapping, async lifecycle safety, design system reuse, UI states, contract safety, performance, and testability.
---

# Frontend Quality Guardrail

## Mission
Prevent a frontend change from being accepted only because it works when it degrades UI boundaries, component responsibility, data flow, lifecycle safety, design system consistency, contract safety, performance, or testability.

This guardrail is an operational quality capsule for implementation, technical planning, and review. It does not impose a framework, library, folder structure, store, form library, query library, design system, service pattern, hook pattern, testing strategy, or architectural style when the target project does not use it.

## Authority
Apply this order without inversion:

1. Task, feature specification, implementation brief, or approved scope.
2. Existing project conventions, rules, and contracts.
3. This frontend quality guardrail.
4. Agent judgment.

Rules:
- the approved scope defines the strongest implementation boundary when it exists
- the target project defines real paths, names, boundaries, libraries, contracts, and local shape
- this guardrail rejects structural frontend degradation inside the approved scope
- agent judgment only fills small gaps; it does not replace the approved scope, project rules, or local convention

## Explicit Non-Goals
This guardrail does not define:
- frontend framework
- component library
- folder structure
- store, state library, query library, or facade pattern
- service, client, hook, action, repository, or API abstraction style
- form library
- design system
- testing strategy

Infer these from the target project.

If an existing convention exists, follow it. If no convention exists, use the smallest local solution that preserves the quality rules in this guardrail. If the missing convention materially affects the task or approved scope, report it as a risk or blocker instead of inventing a global pattern.

## Stack-Neutral Mapping
Names change by stack; responsibilities do not.

Treat these as conceptual equivalents:
- `screen boundary`: page, screen, route component, container, smart component, or view controller
- `visual component`: presentational component, dumb component, UI component, template partial, or reusable view
- `data boundary`: service, client, facade, store, hook, action, repository, resource, query function, or equivalent project abstraction
- `contract`: DTO, schema, type, interface, model, form value, view model, props contract, event contract, or equivalent shape
- `mapping`: adapter, mapper, presenter, normalizer, transformer, formatter, or equivalent transformation
- `side effect`: effect, subscription, listener, observer, timer, async task, navigation, remote call, storage write, analytics event, or notification

Use the target project's real terms when writing, editing, or reviewing.

## Required Discovery
Before implementing or reviewing frontend code, identify the target project's real pattern for:
- page, screen, route, or container responsibilities
- component boundaries and composition
- remote data access
- service, client, facade, store, hook, action, or equivalent abstraction
- forms and validation
- DTO, view model, and mapping conventions
- async lifecycle cleanup
- design system components and tokens
- UI state handling
- type, schema, and contract safety
- frontend testing

Rules:
- use existing names, paths, and patterns
- do not invent architecture
- do not blindly copy weak legacy code when the target project has a better, newer, or more dominant pattern
- when competing patterns exist, follow the dominant, newer, or area-local pattern evidenced by the task scope or area being changed
- if the choice would change project architecture or the approved scope does not allow it, report a blocker instead of improvising

## UI Boundary and Page Responsibility
Pages, screens, routes, and containers should orchestrate flow, state, and composition.

They should not concentrate all of these in one place:
- rendering
- business rules
- remote calls
- payload mapping
- validation
- navigation
- user feedback
- local state transitions

Visual components should render UI and receive data and actions through a clear contract.

Reject a change when a page becomes the place where the feature's UI, modal, form, list, preview, actions, validation, remote flow, and mapping all accumulate without a project-approved reason.

## API, Service, Facade, Store, and Hook Boundary
A page or screen should not call a raw API directly when the project already has a service, client, facade, store, hook, action, repository, resource, or equivalent abstraction.

Avoid raw calls from UI code when an abstraction exists, including:
- `fetch`
- `axios`
- Angular `HttpClient`
- direct SDK usage
- raw HTTP clients
- generated clients bypassed from the wrong layer

Required direction:
- search for the existing project abstraction and use it
- preserve area-local data flow
- keep request construction, response interpretation, and error normalization out of render code
- when no convention exists, choose the smallest coherent local structure without creating a broad architecture inside the task scope

## Componentization by Responsibility
Large screens should be componentized when responsibilities become nameable.

Componentize for:
- responsibility separation
- real reuse
- state isolation
- testability
- clear complexity reduction

Avoid both monolithic screens and useless microcomponents.

Bad signals:
- one file owns page, modal, form, table or list, preview, actions, validation, mapping, and API flow
- a component exists only to move three lines without clarifying responsibility
- component boundaries hide state flow instead of clarifying it

## Forms, Validation, and Submit Flow
Forms should not depend on one giant submit handler.

Do not mix all of these in one handler without separation:
- UI validation
- form value normalization
- payload mapping
- remote call
- navigation
- backend error handling
- success feedback
- state updates

Handle relevant states for the flow:
- loading
- disabled
- validation error
- backend error
- success
- double-submit prevention when applicable

Complex mapping between form values and API payloads should be isolated in a mapper, helper, presenter, schema transform, or equivalent local convention.

## DTO, ViewModel, and Mapping
When the API contract does not match the UI shape directly, require explicit mapping or adaptation.

Avoid converting these inside render code or templates:
- backend fields
- raw enums
- dates
- permissions
- statuses
- labels
- nested payloads
- external contract details

Avoid duplicate mapping across multiple components. Prefer a single local mapping point that matches the target project's pattern.

## Async State and Lifecycle Cleanup
Side effects should live in predictable places according to the target project.

Subscriptions, listeners, observers, timers, effects, and async tasks require cleanup or cancellation when lifecycle leaks, stale updates, or races are possible.

Stack-specific caution:
- React: avoid giant effects, stale state, missing dependency reasoning, and async races
- Angular: avoid subscriptions without cleanup when the project pattern requires cleanup
- JavaScript and TypeScript: remove listeners, timers, observers, and pending async work when lifecycle risk exists

Do not suppress lifecycle warnings or dependency checks without a clear project-approved reason.

## Design System Reuse
Before creating new UI, check for existing:
- components
- tokens
- modal patterns
- buttons
- inputs
- cards
- tables
- toasts
- loading states
- empty states
- error states

Do not duplicate standardized visual or behavioral UI. Do not create local CSS or styling that bypasses the design system without justification in the approved scope or project context.

## Relevant UI States
Frontend work is not complete when it only covers the happy path.

For the modified flow, handle or explicitly justify these states as not applicable:
- loading
- empty
- error
- disabled
- success
- validation
- unauthorized or permission denied when applicable
- retry when applicable

State handling should follow the target project's UI and feedback patterns.

## Type and Contract Safety
In TypeScript:
- avoid `any` as an escape hatch
- do not duplicate existing types
- handle `null` and `undefined`
- avoid magic strings for statuses, types, permissions, and modes when an enum, constant, schema, or contract exists
- keep component props, events, form values, DTOs, and view models explicit enough to protect the boundary

In JavaScript:
- name structures clearly
- validate external data shape when needed
- avoid implicit contracts hidden in render code
- keep conversion and normalization testable

## Basic UI Performance
Do not optimize prematurely, but do not introduce clearly expensive patterns into frequent rendering paths.

Watch for:
- heavy filtering, sorting, mapping, parsing, or formatting during render
- large lists without the project-approved rendering pattern
- complex objects or functions recreated without need in hot paths
- excessive watchers, effects, subscriptions, or observers
- repeated remote calls caused by render or lifecycle mistakes

Prefer the project's established performance pattern before adding new mechanisms.

## Testability
Use testability as a signal of structural quality.

Well-structured frontend code should allow relevant testing of:
- mapping
- validation
- submit success and error paths
- async states
- permissions or disabled states when applicable
- visual components without a real API

Bad signal: the only practical way to test a small rule is to render the entire page and mock half of the application.

Do not add artificial layers only for tests. Separate responsibilities when mixing them prevents reasonable testing according to the target project's testing pattern.

## Anti-overengineering
Do not create services, facades, stores, hooks, mappers, schemas, wrappers, or component hierarchies only to satisfy a generic pattern.

Add structure only when:
- the target project already uses that structure
- the task specification or approved scope requires it
- complexity would remain mixed without the separation
- testability or maintainability would clearly be worse without the separation

Any new structure must be the smallest sufficient structure and compatible with its surroundings.

## Conceptual Violation Examples
- Fat page: a page renders the full feature, performs validation, maps payloads, calls the API, handles errors, navigates, and shows feedback. Better direction: keep the page focused on orchestration and split UI, mapping, remote flow, and feedback according to the target project's boundaries.
- Bypassed API abstraction: a screen calls `fetch`, `axios`, `HttpClient`, an SDK, or a raw client while the surrounding area uses a service, facade, store, hook, action, or repository. Better direction: preserve the existing data boundary.
- Hidden mapping in render: backend status, dates, permissions, labels, and nested fields are converted inside JSX, templates, or inline render helpers. Better direction: create or reuse an explicit mapping point that produces a UI-friendly shape.
- Giant submit handler: validation, payload conversion, remote call, navigation, success state, and backend error normalization live in one handler. Better direction: separate mapping and side-effect flow enough that success and error paths are testable.
- Design system bypass: a local button, modal, table, toast, input, loading, empty, or error pattern duplicates a standardized project component. Better direction: reuse the project UI system unless the approved scope justifies an exception.
- Lifecycle leak risk: a listener, timer, observer, subscription, or async task is created without cleanup or cancellation where stale updates or leaks are possible. Better direction: follow the project's cleanup pattern.
- Fragile contract: `any`, duplicated types, unchecked external data, magic permission strings, or unhandled `null` and `undefined` cross a UI boundary. Better direction: use existing contracts or define the smallest local contract needed.
- Useless microcomponents: a screen is split into tiny components that do not clarify responsibility, reuse, state isolation, or tests. Better direction: componentize by meaningful responsibility.

## Completion Gate
Frontend work is not complete if it introduces:
- a monolithic screen or component
- direct API calls from UI against an existing project pattern
- duplicated reusable UI
- ignored design system components or tokens
- a giant handler, effect, or submit flow
- API mapping hidden in render code or templates
- missing relevant UI states
- lifecycle leak risk
- fragile types or contracts
- a bypass of an existing project convention only because this generic guardrail did not name the project-specific rule

## Review Gate
A reviewer, validator, or equivalent agent must reject an implementation that works but violates frontend structural quality.

Expected result:
- `FAIL` when the implementation violates the task specification, approved scope, project-specific contract, target project's pattern, or this frontend quality gate
- `PASS` only when it respects the task specification, approved scope, project-specific contract, project conventions, UI boundaries, data boundaries, state handling, lifecycle safety, design system reuse, contract safety, performance basics, and testability

When failing, identify the mixed responsibility, bypassed boundary, duplicated UI, missing state, lifecycle risk, fragile contract, hidden mapping, or testability problem.
