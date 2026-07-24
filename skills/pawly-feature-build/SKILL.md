---
name: pawly-feature-build
description: Implement the functional behaviour of an approved Pawly feature around its Figma-defined screens and shared components by defining feature boundaries, state, navigation, persistence, services, Supabase integration, permissions, error handling, accessibility and validation without redesigning approved UI or embedding business logic into shared primitives.
---

# Pawly Feature Build

## Purpose

Implement the functional behaviour around approved Pawly screens and shared components. Make the requested feature work while preserving Figma-defined UI, Pawly product rules, route contracts, accessibility, localization, and existing data compatibility.

Keep the feature boundary narrow. Do not begin adjacent roadmap work merely because the architecture could support it.

## Sources of truth

Inspect, as applicable:

- `/docs`
- `/ai`
- `/reference/figma/FIGMA_SOURCE.md`
- `/V2_BUILD_RULES.md`
- Exact approved live Figma screens and states.
- Current routes, feature folders, shared components, tokens, and typography.
- Current Supabase schema, client, RLS assumptions, services, and environment configuration.
- Existing persistence contracts, storage keys, hooks, types, tests, and validation commands.

Apply this authority order:

1. Pawly documentation governs feature behaviour, terminology, architecture, and scope.
2. Live Figma governs approved visual output and visible states.
3. Existing database schema and service contracts govern current data compatibility.
4. Existing implementation is reference material, not independent product authority.
5. Old drafted screens and abandoned flows are not authoritative unless explicitly approved.

Report conflicts instead of silently resolving them.

## Feature scope and discovery

Limit work to the requested small feature, end-to-end flow, approved screen or related screen batch, persistence integration, permission flow, state model, or visible state set.

Before editing, identify:

- Feature name, user goal, entry points, and exit points.
- Exact approved screens, visible states, and route contracts.
- Data inputs, outputs, product models, and persistence requirements.
- Supabase tables, functions, storage, authentication, and RLS involved.
- Offline, interruption, and recovery expectations.
- Required permissions and the approved request moment.
- Loading, empty, success, error, and validation states.
- Existing feature code, shared infrastructure, and unrelated working-tree changes.
- Defined analytics or telemetry requirements.
- Accessibility, localization, device, and validation requirements.

Do not implement behaviour from screen appearance alone.

## Feature architecture

Keep feature implementation under `src/features/<feature>/`. Create only folders genuinely required:

```text
src/features/<feature>/
  components/
  screens/
  hooks/
  services/
  state/
  validation/
  types/
  constants/
  utils/
```

Use product-purpose names, not milestone names. Avoid vague files such as `helpers.ts`, `common.ts`, `utils.ts`, `service.ts`, `types.ts`, or `state.ts` unless their enclosing context makes the purpose unmistakable.

Maintain these responsibilities:

- **Screens:** Compose approved UI, invoke feature hooks, and render feature states. Keep direct Supabase calls, storage parsing, complex validation, long transitions, duplicated formatting, and shared primitive definitions out.
- **Feature components:** Compose shared primitives and own feature-specific visual behaviour. Promote them only through `pawly-component-system` classification.
- **Hooks:** Coordinate lifecycle, async work, screen behaviour, and feature state. Avoid one oversized hook that owns unrelated concerns.
- **Services:** Own Supabase, storage, uploads, notifications, location, calendar, and external APIs. Expose typed product-purpose operations instead of raw infrastructure details.
- **State:** Define meaningful feature states, transitions, persisted shape, and recovery behaviour.
- **Validation:** Centralize reused rules and product validation.
- **Types:** Model Pawly concepts and service contracts. Map database rows to product models when appropriate.

Keep route files under `src/app` as thin adapters that parse and normalize parameters, configure the route when needed, and render the feature screen. Feature code must not import route files.

## Shared components and visual preservation

Search `src/components/`, relevant feature components, and approved screens before creating UI.

Use `pawly-component-system` for a new shared primitive, approved variant, consolidation, or ownership decision. Do not duplicate Button, InputField, PageHeader, FooterCTA, ProgressIndicator, BottomNavigation, PawlyDrawer, UserAvatar, PetProfileSelector, or another existing primitive.

Keep business rules outside shared components. Shared primitives may receive callbacks, values, and state props but must not own feature rules.

Use `pawly-figma-implement` when visual implementation or correction is required. Preserve approved layout, typography, spacing, colours, copy, assets, interaction states, animation intent, safe areas, and responsive behaviour. Do not redesign while wiring behaviour or introduce generic placeholders where approved states exist.

## State model

Define explicit states when the flow has meaningful transitions, such as `idle`, `loading`, `loaded`, `empty`, `submitting`, `success`, `error`, `offline`, `permission-required`, `unauthenticated`, `interrupted`, or `recovering`.

Prefer a clear state model or discriminated union over unrelated booleans that permit impossible combinations. Prevent conditions such as loading and success, authenticated and signed-out, empty and populated, or permission-granted and permission-denied simultaneously.

Do not over-engineer a state machine for a simple local interaction.

## Persistence and recovery

When persistence is required:

- Preserve existing keys and schema compatibility unless migration is authorized.
- Version persisted schemas when the architecture requires it.
- Handle missing, stale, and corrupt data.
- Separate serialization from screens.
- Define interruption recovery and non-blocking fallback behaviour.
- Preserve user progress where required.
- Keep sensitive data out of insecure local storage.
- Document migration and fallback behaviour.

Do not reset existing user state merely because internal implementation changed.

## Supabase and data

Before changing Supabase behaviour, inspect the schema, RLS assumptions, service patterns, environment configuration, session behaviour, and compatible request and response shapes.

- Put Supabase calls in typed services, never screens.
- Map database rows to stable product models where appropriate.
- Map backend failures to user-safe feature errors.
- Never expose secrets or raw infrastructure messages.
- Avoid schema changes unless explicitly requested.

If a schema change is required, report material data impact before implementation, provide the exact migration, preserve backward compatibility where practical, and never apply destructive changes silently.

## Async and failure behaviour

For async actions:

- Expose loading state and prevent accidental duplicate submission.
- Handle cancellation, stale responses, unmounting, and navigation races where relevant.
- Preserve user-entered data after recoverable failure.
- Define retry and timeout behaviour where appropriate.
- Avoid unhandled promises and indefinite spinners.
- Preserve idempotency where actions can repeat.
- Use optimistic updates only with clear rollback behaviour.

Handle applicable no-network, timeout, retry, cached, stale, permission-denied, Supabase-rejected, invalid-session, corrupt-state, and unavailable-service paths. Do not invent elaborate offline behaviour when the product does not require it.

## Permissions

For camera, photo library, notifications, location, calendar, or health permissions:

- Request only at the product-approved moment.
- Explain the reason using approved copy.
- Handle granted, denied, and blocked states.
- Avoid premature or repeated prompts.
- Provide a settings path where appropriate.
- Preserve platform-specific behaviour.
- Test on a physical device when available.

Do not request unrelated permissions.

## Navigation and authentication

Preserve Expo Router conventions, route URLs, back behaviour, deep links, query parameters, guards, completion routing, and interruption recovery.

Do not turn global Add into a normal navigation destination. Do not rename Home to Today.

When authentication is required:

- Preserve session restoration and current auth-service usage.
- Define unauthenticated behaviour.
- Distinguish authentication from authorization.
- Do not trust client-only role checks for protected backend operations.
- Preserve feature state through auth redirects where appropriate.
- Do not add bypasses outside existing explicit development-only controls.

## Accessibility and localization

Implement applicable roles, labels, hints, state semantics, focus order, focus restoration, minimum touch targets, async announcements, web keyboard access, Android back, Escape handling, reduced motion, and modal background blocking.

Preserve visible Figma geometry while using invisible interaction areas where necessary.

Use existing localization infrastructure and approved copy. Keep user-facing strings out of screens when localization keys are expected. Test English and Chinese only when approved translations and locale infrastructure exist. Never invent localized product copy; report missing translations as a dependency. Test realistic variable-length content and wrapping.

## Workflow

Follow this order:

1. Read applicable Pawly documentation and installed skills.
2. Inspect Git status and protect unrelated work.
3. Define the exact feature boundary and user goal.
4. Identify approved Figma screens and visible states.
5. Inspect route, data, service, persistence, auth, and permission contracts.
6. Audit existing components, feature code, and shared infrastructure.
7. Produce a concise implementation map.
8. Define types and the state model.
9. Implement or extend services.
10. Implement persistence and recovery where required.
11. Implement hooks and feature state.
12. Compose approved screens using shared primitives.
13. Wire navigation, authentication, and permissions.
14. Implement loading, empty, success, and error states.
15. Preserve accessibility and localization.
16. Run static validation.
17. Test the full feature flow and failure paths.
18. Use `pawly-figma-review` when visual output changed.
19. Test a physical device when native behaviour is involved.
20. Commit only when requested and after approval-quality validation.

Complete [the feature checklist](references/feature-checklist.md) throughout implementation. Use [the feature report](references/feature-report.md) for the final handoff.

Pause when Pawly documentation and Figma conflict, a product or schema decision is missing, a destructive migration is required, a permission decision is unresolved, approved copy or translations are unavailable, or the scope would materially affect another feature.

## Validation

Run, when available:

```text
npm run typecheck
npm run lint
npx expo install --check
npx expo-doctor
git diff --check
```

Test applicable happy, loading, empty, validation-failure, backend-error, offline, retry, duplicate-submission, interruption, recovery, unauthenticated, expired-session, permission, back-navigation, deep-link, keyboard, screen-reader, focus, reduced-motion, Metro-resolution, and physical-iPhone paths.

Use realistic data. Do not declare completion after testing only the happy path.

## Skill responsibility boundaries

- Use `pawly-figma-implement` for visual implementation or correction.
- Use `pawly-figma-review` for independent visual and implementation QA without automatic fixes.
- Use `pawly-component-system` for shared component creation, extension, consolidation, or classification.

Do not repeat those complete workflows or invoke them when their responsibility is not needed.

## Scope and Git

Change only the requested feature and necessary dependencies. Preserve unrelated tracked and untracked work. Inspect the staged diff before committing. Do not push unless explicitly requested.

## Prohibited shortcuts

Never:

- Implement behaviour from appearance alone.
- Place direct Supabase calls in screens.
- Embed feature logic in shared primitives or duplicate shared components.
- Use booleans that allow impossible states.
- Ignore loading, error, empty, interruption, or recovery states that apply.
- Reset persisted progress without authorization.
- Invent backend schema or apply destructive migrations silently.
- Expose raw backend errors, swallow errors, or block indefinitely.
- Request permissions outside the approved moment.
- Invent translations or alter approved copy without authority.
- Change approved UI while wiring behaviour.
- Broaden scope into adjacent roadmap features.
- Mark completion after only the happy path.
- Commit unrelated work.
- Push without explicit instruction.
