# Front-End Execution Gates

Status: initial draft, not promoted, not a clean pass.

These gates define initial documentary checks for the `coder-frontend` kernel.
They are not a runtime implementation, not a validation harness, not a
materialization path, not a production path, and not productive-skill behavior.

## Package Authority Gate

Pass only when the current round provides an `EXECUTION PACKAGE` with the
assigned `WORK_PACKAGE_ID`, plus `EXECUTION BRIEF` and `VALIDATION PACK`.

The package must define enough executable boundary to apply the front-end cut,
including owned paths or equivalent edit authority, change rules, checks, and
block conditions when relevant.

Fail when the package, brief, or pack is missing, contradictory, stale,
insufficient, not current-round authorized, or would require reconstruction from
temporary runtime files.

## UX Direction Consumption Gate

Pass when real UX impact is either resolved by package/brief context or covered
by available `designer` direction.

If UX direction exists, the kernel consumes it as execution input without
becoming the design owner.

Fail when the implementation would require inventing user flow, product intent,
interaction behavior, visual hierarchy, accessibility behavior, responsive
behavior, or a new shared pattern.

## Local Front-End Convention Gate

Pass when the implementation follows the repository's actual front-end
framework, design system, component, styling, routing, state, data-fetching,
form, package-manager, script, and testing conventions for the touched path.

Fail when safe execution would require a new architecture, new dependency,
parallel pattern, broad refactor, stack change, or modernization outside the
authorized package.

## Accessibility, Focus, And Keyboard Gate

Pass when the touched interaction preserves or improves semantic structure,
accessible names, labels, focus visibility, keyboard access, focus management,
disabled and pending states, and assistive-technology-friendly state changes.

Fail when required accessibility, focus, or keyboard behavior is ambiguous and
cannot be resolved from the package, designer input, existing local patterns, or
bounded local reading.

## Responsive And Visual Surface Gate

Pass when the touched surface preserves relevant layout, spacing, overflow,
component states, visual consistency, and responsive behavior across the
breakpoints or container contexts used by the local surface.

Fail when the change needs a broader visual system decision, responsive redesign,
or product-level tradeoff beyond executor autonomy.

## Client-Side State Gate

Pass when loading, empty, error, success, disabled, pending, partial,
long-running, optimistic, and failure states relevant to the touched flow remain
coherent.

Fail when the state model, async lifecycle, cache behavior, form behavior,
optimistic behavior, or error recovery would require unsafe inference or a
structural decision outside the package.

## Routing And Navigation Gate

Pass when routes, links, navigation state, redirects, browser history, route
params, and route guards touched by the cut are understood enough to preserve
current behavior and satisfy the package.

Fail when routing impact is unclear and could affect permissions, feature
visibility, localization, analytics, back/forward behavior, deep links, or
shared navigation contracts.

## API And Backend Contract Consumption Gate

Pass when request and response shapes, derived UI states, shared types, schemas,
API clients, service/facade/store boundaries, and integration-sensitive UI
behavior are understood enough to preserve stabilized contracts.

Fail when the implementation would require inventing payloads, schemas,
business fallback, backend behavior, authorization behavior, or public contract
changes.

## Permission, Feature-Flag, Localization, And Analytics Caution Gate

Pass only when permission checks, auth gating, feature flags, localization keys,
language behavior, analytics events, error reporting, and telemetry touched by
the cut are explicitly authorized or clearly preserved by existing local
patterns.

Fail when any of these surfaces may change behavior and the package does not
provide a safe basis for the change.

## Evidence And Checks Handoff Gate

Pass when the final handoff includes:

- terminal status `READY` or `BLOCKED`;
- changed paths or equivalent implementation evidence;
- concise semantic delta;
- checks run;
- checks not run and why;
- residual risk;
- user-visible behavior covered;
- inspection-only confidence clearly labeled;
- exact blocker when `BLOCKED`;
- notes for validation-runner about contract, UX, accessibility, state, routing,
  permission, feature-flag, localization, analytics, or proof-sensitive risks.

Fail when the response is only progress narration, command logs, an implicit
status, a partial diff without safe completion, or a completion claim without
implementation evidence.

## Drift Gates

Reject any kernel behavior that attempts to:

- become planner;
- become designer;
- become validation-eval-designer;
- become execution-package-designer;
- become validation-runner;
- become reviewer;
- become finalizer;
- become resync;
- perform durable documentation ownership;
- alter canonical templates;
- write target repository artifacts from this documentary draft;
- introduce runtime loading;
- introduce materialization;
- claim production use.
