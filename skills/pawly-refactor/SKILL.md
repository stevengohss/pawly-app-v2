---
name: pawly-refactor
description: Safely refactor Pawly React Native/Expo code by auditing dependencies, defining a clear target structure, moving or splitting code in small verified steps, preserving approved UI and behaviour, protecting routes, persistence and Supabase contracts, removing obsolete duplication, and validating before-and-after equivalence.
---

# Pawly Refactor

## Purpose

Restructure existing Pawly code without changing approved output or product behaviour. Establish the current baseline, audit dependencies, define the exact destination tree, migrate in small verified steps, and prove equivalence.

Treat redesign, feature implementation, schema changes, dependency upgrades, and roadmap work as separate tasks unless explicitly authorized.

## Sources of truth

Inspect, as applicable:

- `/docs`
- `/ai`
- `/reference/figma/FIGMA_SOURCE.md`
- `/V2_BUILD_RULES.md`
- Current source tree, routes, feature folders, and shared component taxonomy.
- Theme, tokens, types, assets, services, persistence contracts, and Supabase client.
- Git history and current tracked and untracked work.
- Existing tests, runtime baselines, and validation commands.

Apply this authority order:

1. Pawly documentation governs architecture, behaviour, terminology, and scope.
2. Live Figma governs approved visual output.
3. Existing persistence, route, service, and data contracts govern compatibility.
4. Existing code is implementation reference only.
5. Temporary architecture and milestone folders are not authority.

Report conflicts instead of guessing.

## Preservation guarantee

Unless the user explicitly authorizes a change, preserve:

- Layout geometry, typography, colours, spacing, copy, assets, and asset bytes.
- Route URLs, parameters, query values, navigation, back behaviour, and deep links.
- Loading, empty, success, error, validation, and interruption behaviour.
- Authentication, authorization assumptions, session restoration, and development controls.
- Supabase requests, responses, mappings, RLS assumptions, and error behaviour.
- Persistence keys, schemas, stored fields, fallback, recovery, locale data, and user progress.
- Permissions and their request timing.
- Localization keys and approved translations.
- Accessibility semantics, touch targets, focus, keyboard, and modal behaviour.
- Animation, reduced motion, safe areas, scrolling, and runtime results.

Do not declare completion without before-and-after evidence.

## Scope and pre-refactor audit

Limit work to the requested file, component, feature, related folder group, shared-component migration, duplicate consolidation, route-thinning task, or source-tree reorganization. Do not refactor the whole application unless explicitly requested.

Before moving or changing code, identify:

- Exact scope and excluded scope.
- Current files, folders, public exports, and ownership.
- Every importer, caller, route, feature, shared-component, service, persistence, asset, type, and environment dependency.
- Circular dependencies, duplicate implementations, and stale aliases.
- Unrelated worktree changes and current branch.
- Static validation and runtime behaviour baseline.
- Approved Figma reference when rendering may be affected.

Search the whole repository before declaring a file unused. Do not move code before understanding its dependency graph.

## Exact target structure

State a concise exact destination tree before moving files. Ensure it:

- Uses permanent product-purpose names.
- Follows current Pawly architecture.
- Avoids milestone names, vague names, empty future folders, and speculative abstractions.
- Preserves feature boundaries and the shared-component taxonomy.
- Keeps route files thin, infrastructure out of screens, and feature logic out of shared primitives.

Continue into implementation after stating the tree unless a real conflict requires user direction.

## Architecture and dependency direction

Maintain these responsibilities:

- `src/app`: Thin Expo Router adapters that parse and normalize route input, import and render feature screens, and hold route-level configuration only.
- `src/features/<feature>`: Feature screens, components, hooks, services, state, validation, types, constants, and product-purpose utilities. Create only required folders.
- `src/components`: Reusable Figma-backed primitives under `actions`, `forms`, `navigation`, `content`, `pet`, `user`, and `brand`.
- `src/lib`: Cross-feature clients, platform adapters, low-level utilities, and stable infrastructure; never feature-domain logic or screen UI.
- `src/theme`: Central tokens, typography, effects, and approved mappings.
- `src/types`: Genuinely cross-feature types; keep feature-specific types with their feature.

Preserve dependency direction:

- App routes may import features.
- Features may import shared components, theme, lib, and shared types.
- Shared components must not import features or routes.
- Lib must not import screens or feature UI.
- Features and components must not import route files.
- Feature services may import infrastructure clients.
- Feature components may compose shared primitives.
- Theme must not depend on feature screens.

Detect and report cycles. Do not hide cycles behind barrel files.

## Naming, imports, and barrels

Use stable product terminology. Never rename Home to Today without explicit authority.

- Use PascalCase for React component files.
- Use camelCase for non-component implementation files.
- Use `.types.ts` only when a separate type file is justified.
- Use clear product-purpose names for services, storage, state, and utilities.
- Avoid milestone names such as `stage-one`, `phase-three`, `temporary`, `new`, `old`, or `v2-component`.
- Avoid vague names such as `helpers.ts`, `common.ts`, `utils.ts`, `service.ts`, `types.ts`, `state.ts`, `component.tsx`, or `screen.tsx` unless folder context makes ownership unmistakable.

Use public feature barrels only when they improve route-facing imports. Avoid barrels that create cycles, hide ownership, expose internals, or make tracing harder.

Prefer semantic aliases and avoid deeply nested relative imports. Do not change alias configuration unless required and Expo-compatible.

## File splitting

Split only at genuine responsibility boundaries such as screen composition, feature state, async coordination, service calls, validation, persistence, shared primitives, feature compositions, types, or constants.

Do not split solely to reduce line count. Do not create many tiny files that make ownership harder to trace. Require every split to improve ownership, testing, reuse, or reasoning.

## Duplication and consolidation

When consolidating:

1. Identify every implementation and caller.
2. Compare Figma sources, semantics, and behaviour.
3. Confirm the implementations are truly the same primitive.
4. Separate shared visuals from feature-specific behaviour.
5. Define the shared API.
6. Migrate callers in small steps.
7. Preserve every approved variant and behaviour.
8. Remove obsolete implementations only after imports are updated.
9. Search for stale paths and duplicate assets.
10. Retain forwarding files only when technically required.

Do not merge components merely because they look similar. Use `pawly-component-system` when classification, variants, or shared API design are central.

## Persistence and Supabase compatibility

Preserve AsyncStorage keys, persisted schema versions, stored fields, corruption fallback, recovery, sessions, locale data, feature progress, and user-entered data.

Do not rename or reshape persisted data without an explicit migration. Do not reset storage to simplify a refactor.

For Supabase, preserve table and column assumptions, request shapes, response mapping, RLS assumptions, authentication, and session behaviour. Keep direct access out of screens. Do not apply schema changes unless explicitly requested.

## Visual and behavioural equivalence

When rendering may change:

- Capture a before-state runtime baseline.
- Inspect approved live Figma where applicable.
- Preserve component props, styles, animation timing, and asset bytes.
- Compare before and after at identical dimensions and states.
- Inspect geometry, typography, colour, spacing, assets, and animated state.
- Use an overlay or image difference where practical.

Record applicable routes, callbacks, transitions, loading, validation, persistence, recovery, errors, keyboard, scrolling, focus, reduced motion, back, Escape, backdrop, authentication, permissions, deep links, and development overrides before editing.

Retest after each logical move instead of waiting until the end.

## Small-step workflow

Follow this order:

1. Read applicable Pawly documentation and skills.
2. Inspect branch and protect unrelated tracked and untracked work.
3. Run baseline validation.
4. Audit dependencies, importers, callers, and duplicates.
5. Record routes, behaviour, persistence, services, and visual baseline.
6. State the exact target tree.
7. Create a checkpoint commit only when requested or required for safety.
8. Refactor one logical group at a time.
9. Update imports atomically using Git-aware moves where practical.
10. Run typecheck and lint after each group.
11. Smoke-test affected routes after each group.
12. Remove obsolete files only after searches confirm zero callers.
13. Search for old paths, names, barrels, assets, and duplicates.
14. Run final static validation.
15. Compare before and after.
16. Test a physical device when native behaviour is affected.
17. Inspect the staged diff and removed files.
18. Commit only when requested and equivalence is established.

Complete [the refactor checklist](references/refactor-checklist.md) throughout the work. Use [the refactor report](references/refactor-report.md) for the final handoff.

Do not perform one large blind migration.

## Validation

Run, when available:

```text
npm run typecheck
npm run lint
npx expo install --check
npx expo-doctor
git diff --check
```

Also validate affected routes, runtime output, navigation, persistence, Supabase, authentication, errors, loading, keyboard, safe areas, accessibility, animations, reduced motion, Metro resolution, assets, physical iPhone behaviour when relevant, dependency cycles, stale imports, duplicates, route URLs, storage schemas, and visual differences.

A passing typecheck alone does not establish equivalence.

## Git safety

Inspect the branch and worktree before editing. Protect secrets and local files. Do not stage unrelated work, amend existing commits without instruction, or push unless explicitly requested.

Before committing, inspect staged files, confirm removals are intentional, run `git diff --check`, preserve unrelated work, and verify the final tracked scope.

## Responsibility boundaries

- Use `pawly-figma-implement` for authorized visual implementation or correction.
- Use `pawly-figma-review` for independent visual and implementation QA.
- Use `pawly-component-system` when reusable-component classification, consolidation, variants, or APIs are central.
- Use `pawly-feature-build` when new feature behaviour is being implemented rather than preserved.

Do not duplicate those workflows. Never let a refactor quietly become feature work.

## Prohibited shortcuts

Never:

- Move files before auditing importers or assume a file is unused.
- Refactor by line count alone or create empty future folders.
- Use milestone names or change stable product terminology.
- Redesign, alter approved copy, or change routes while refactoring.
- Change persistence keys or schemas without a migration.
- Change Supabase contracts or embed feature logic in shared primitives.
- Consolidate components only because they look similar.
- Leave forwarding files, stale imports, obsolete assets, or duplicates without justification.
- Hide circular dependencies behind barrels.
- Perform one large blind migration.
- Validate only with typecheck.
- Include unrelated work in a commit or push without explicit instruction.
- Claim equivalence without evidence.
