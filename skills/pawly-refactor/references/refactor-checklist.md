# Pawly Refactor Checklist

Complete applicable checks and record evidence. Treat missing evidence as a limitation, not a pass.

## Contents

1. Refactor identity and scope
2. Sources of truth
3. Git baseline
4. Current tree
5. Dependency graph
6. Importers and callers
7. Routes
8. Persistence and Supabase contracts
9. Visual baseline
10. Behaviour baseline
11. Exact target tree
12. Naming and taxonomy
13. Small-step migration
14. Obsolete-file removal
15. Static validation
16. Runtime equivalence
17. Device validation
18. Git completion gate

## 1. Refactor identity and scope

- [ ] Record the exact requested scope and purpose.
- [ ] List excluded redesign, feature, schema, dependency, and roadmap work.
- [ ] Confirm the task is not application-wide unless explicitly requested.

## 2. Sources of truth

- [ ] Inspect applicable Pawly documentation and build rules.
- [ ] Identify approved Figma references when rendering may be affected.
- [ ] Inspect current route, persistence, service, data, and runtime contracts.
- [ ] Record conflicts instead of guessing.

## 3. Git baseline

- [ ] Record branch, baseline commit, tracked changes, and untracked files.
- [ ] Identify unrelated work and secrets.
- [ ] Record whether a checkpoint commit is required or requested.

## 4. Current tree

- [ ] Record the exact source tree in scope.
- [ ] Identify current ownership and public exports.
- [ ] Identify vague, milestone-based, obsolete, and misplaced files.

## 5. Dependency graph

- [ ] Trace routes, features, shared components, theme, lib, services, persistence, types, assets, and environment dependencies.
- [ ] Detect circular dependencies.
- [ ] Identify barrels that hide ownership or cycles.

## 6. Importers and callers

- [ ] Search the whole repository for every importer and caller.
- [ ] Record dynamic, alias, test, asset, and configuration references.
- [ ] Do not classify a file as unused without repository-wide evidence.

## 7. Routes

- [ ] Record route URLs, parameters, query values, guards, deep links, and back behaviour.
- [ ] Confirm route files remain thin.
- [ ] Confirm features and components do not import route files.

## 8. Persistence and Supabase contracts

- [ ] Record storage keys, schema versions, stored fields, fallback, and recovery.
- [ ] Record Supabase tables, columns, request shapes, response mapping, RLS, auth, and session assumptions.
- [ ] Confirm no migration, reset, or schema change is introduced without authority.

## 9. Visual baseline

- [ ] Capture relevant runtime states at controlled dimensions.
- [ ] Record applicable Figma sources.
- [ ] Record layout, typography, colour, spacing, animation, safe-area, and asset expectations.
- [ ] Preserve asset bytes during path-only moves.

## 10. Behaviour baseline

- [ ] Record routes, callbacks, transitions, validation, loading, errors, and recovery.
- [ ] Record keyboard, scrolling, focus, accessibility, reduced motion, back, Escape, and modal behaviour.
- [ ] Record authentication, permissions, persistence, deep links, and development overrides.

## 11. Exact target tree

- [ ] State the complete destination tree before moving files.
- [ ] Use product-purpose names and only required folders.
- [ ] Preserve feature and shared-component boundaries.
- [ ] Keep infrastructure out of screens and feature logic out of shared primitives.

## 12. Naming and taxonomy

- [ ] Apply PascalCase and camelCase conventions appropriately.
- [ ] Remove vague or milestone names only within scope.
- [ ] Preserve stable product terminology.
- [ ] Confirm shared primitives use the Pawly component taxonomy.

## 13. Small-step migration

- [ ] Move one logical group at a time.
- [ ] Update imports atomically.
- [ ] Run typecheck, lint, and route smoke tests after each group.
- [ ] Record any temporary compatibility layer and its removal condition.

## 14. Obsolete-file removal

- [ ] Confirm zero callers before removal.
- [ ] Search for stale imports, old paths, barrels, aliases, and assets.
- [ ] Remove forwarding files and duplicates unless technically justified.
- [ ] Confirm each deletion is intentional.

## 15. Static validation

- [ ] Run typecheck, lint, Expo dependency check, Expo Doctor, and `git diff --check`.
- [ ] Check Metro resolution, aliases, assets, dependency direction, and cycles.
- [ ] Confirm no obsolete imports or duplicate implementations remain.

## 16. Runtime equivalence

- [ ] Compare before and after at identical routes, dimensions, data, and states.
- [ ] Verify navigation, persistence, Supabase, auth, errors, loading, keyboard, safe areas, accessibility, and motion.
- [ ] Use overlay or image difference when visual output may change.
- [ ] Confirm route URLs and storage schemas are unchanged.

## 17. Device validation

- [ ] Test physical iPhone through Expo Go when native behaviour is affected and available.
- [ ] Record unavailable device coverage.
- [ ] Verify platform-specific permissions, keyboard, assets, and navigation where relevant.

## 18. Git completion gate

- [ ] Inspect staged files and removals.
- [ ] Preserve unrelated tracked and untracked work.
- [ ] Confirm equivalence evidence is complete.
- [ ] Record limitations and unresolved risks.
- [ ] Complete the refactor report before committing or declaring completion.
