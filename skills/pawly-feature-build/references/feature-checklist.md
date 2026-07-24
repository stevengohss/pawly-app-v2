# Pawly Feature Checklist

Complete applicable checks and record evidence. Mark unavailable evidence as a limitation rather than inferring a pass.

## 1. Feature identity and scope

- [ ] Record the feature name and exact requested boundary.
- [ ] List included and excluded behaviour.
- [ ] Confirm no adjacent roadmap work entered scope.

## 2. User goal

- [ ] State the user goal and completion outcome.
- [ ] Identify primary users and authentication assumptions.
- [ ] Confirm terminology against Pawly documentation.

## 3. Sources of truth

- [ ] Inspect applicable `/docs`, `/ai`, Figma source guidance, and build rules.
- [ ] Inspect approved live Figma screens and states.
- [ ] Inspect current database, service, persistence, and implementation contracts.
- [ ] Record conflicts instead of guessing.

## 4. Entry and exit points

- [ ] Identify every entry point.
- [ ] Identify success, cancellation, failure, and interruption exits.
- [ ] Define recovery and resume behaviour.

## 5. Approved screens and states

- [ ] Record exact Figma nodes.
- [ ] Identify loading, empty, success, error, permission, offline, and interrupted states that apply.
- [ ] Confirm approved copy, assets, animation, and responsive behaviour.

## 6. Route contracts

- [ ] Record routes, parameters, query values, guards, and deep-link expectations.
- [ ] Verify back and completion behaviour.
- [ ] Keep route files thin and prevent feature imports of route files.

## 7. Data model

- [ ] Identify inputs, outputs, product models, and API shapes.
- [ ] Inspect Supabase schema and RLS assumptions.
- [ ] Map raw database rows when a product model is appropriate.
- [ ] Confirm sensitive data handling.

## 8. State model

- [ ] Define meaningful states and transitions.
- [ ] Prevent impossible combinations.
- [ ] Avoid unnecessary state-machine complexity.
- [ ] Define authentication, permission, offline, interruption, and recovery states where relevant.

## 9. Services and Supabase

- [ ] Keep external interactions in typed services.
- [ ] Confirm screens contain no direct Supabase calls.
- [ ] Preserve compatible request, response, auth, and session contracts.
- [ ] Map infrastructure errors to user-safe feature errors.
- [ ] Record any schema or migration dependency.

## 10. Persistence and recovery

- [ ] Preserve existing keys and schema compatibility.
- [ ] Handle missing, stale, corrupt, and versioned data.
- [ ] Separate serialization from screens.
- [ ] Verify interruption recovery and non-blocking fallback.
- [ ] Confirm existing user progress is not reset without authority.

## 11. Async and failure handling

- [ ] Expose loading state and prevent duplicate submissions.
- [ ] Handle stale responses, cancellation, unmounting, and navigation races where relevant.
- [ ] Define timeout, retry, rollback, and idempotency behaviour.
- [ ] Preserve user input after recoverable failure.
- [ ] Verify no unhandled promises or indefinite spinners.

## 12. Permissions

- [ ] Request only required permissions at the approved moment.
- [ ] Use approved rationale copy.
- [ ] Handle granted, denied, and blocked states.
- [ ] Prevent repeated prompts and provide settings guidance where appropriate.
- [ ] Test native permission behaviour when available.

## 13. Shared components

- [ ] Search existing shared and feature components.
- [ ] Reuse approved primitives.
- [ ] Keep business logic outside shared primitives.
- [ ] Use `pawly-component-system` when classification or a new variant is required.

## 14. Accessibility

- [ ] Verify roles, labels, hints, and state semantics.
- [ ] Verify focus order, focus restoration, and keyboard access.
- [ ] Measure touch targets without changing approved visual geometry.
- [ ] Verify announcements, Android back, Escape, modal blocking, and reduced motion where applicable.

## 15. Localization

- [ ] Use current localization infrastructure and approved copy.
- [ ] Keep expected user-facing strings out of screens.
- [ ] Test realistic variable-length content.
- [ ] Test approved English and Chinese resources when available.
- [ ] Record missing translations; do not invent them.

## 16. Testing matrix

- [ ] Run typecheck, lint, Expo dependency check, Expo Doctor, and `git diff --check`.
- [ ] Test happy, loading, empty, validation, backend, offline, retry, duplicate, interruption, recovery, auth, and permission paths that apply.
- [ ] Test routes, back behaviour, deep links, keyboard, screen reader, focus, and reduced motion.
- [ ] Verify Metro module and asset resolution.
- [ ] Test physical iPhone behaviour when native functionality is involved and available.
- [ ] Run Figma review when visual output changed.

## 17. Git scope

- [ ] Inspect the initial worktree and preserve unrelated changes.
- [ ] Confirm only requested feature files and necessary dependencies changed.
- [ ] Exclude secrets, logs, screenshots, caches, and temporary files.
- [ ] Inspect staged content before committing.

## 18. Completion gate

- [ ] Verify the complete user goal, not only the happy path.
- [ ] Confirm feature, component, and visual responsibilities remain separated.
- [ ] Confirm no unrelated redesign or scope expansion.
- [ ] Record limitations, unavailable device tests, and external dependencies.
- [ ] Complete the feature report before declaring completion.
