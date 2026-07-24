---
name: pawly-component-system
description: Create, extend, consolidate, or audit reusable Pawly React Native components from the approved Figma component library by inspecting live Figma variants, mapping variables and typography to Pawly tokens, defining clear component APIs, preserving responsive behaviour, preventing duplication, and validating every state without redesigning approved UI.
---

# Pawly Component System

## Purpose

Create, extend, consolidate, or audit Pawly components that correspond to the approved live Figma component library. Preserve approved visuals, product behaviour, responsive layout, accessibility, and dependency direction.

Classify before editing. Do not make an element shared merely because it repeats, and do not leave an approved reusable Figma primitive feature-specific merely because it first appeared in one feature.

For implementation fidelity, use `pawly-figma-implement` where applicable. For an independent comparison after implementation, use `pawly-figma-review`. Keep this workflow focused on component ownership, API design, variants, reuse, and consolidation.

If the request is audit-only, inspect and report without modifying files. Edit only when the user requests creation, extension, consolidation, correction, or implementation.

## Sources of truth

Inspect, as applicable:

- The exact live Figma component set, main component, every approved variant, and approved screen instances.
- `/docs`
- `/ai`
- `/reference/figma/FIGMA_SOURCE.md`
- `/V2_BUILD_RULES.md`
- The current source tree.
- Shared and feature-specific components.
- Pawly tokens and typography.
- Existing assets and SVG exports.

Apply this authority order:

1. Live Figma governs visual output and approved variants.
2. Pawly documentation governs behaviour, architecture, terminology, and scope.
3. Existing shared components show current implementation patterns.
4. Existing feature code is implementation reference only.
5. Old screenshots and drafted components are not visual truth unless explicitly approved.

Report conflicts instead of guessing.

## Mandatory classification

Before creating, extending, or moving a component, classify it as exactly one of:

1. Existing shared primitive.
2. New shared primitive.
3. Approved variant of an existing shared primitive.
4. Feature-specific composition.
5. Screen-only structure.
6. Asset-only artwork.
7. Behavioural wrapper around a shared primitive.

Base the decision on Figma component identity, approved cross-screen reuse, behaviour ownership, API stability, semantic consistency, approved variants, and whether reuse simplifies or distorts the design.

Record the classification and reason in the component report. Do not infer shared ownership from occurrence count alone.

## Component taxonomy

Place reusable primitives only in the appropriate existing category:

```text
src/components/
  actions/
  forms/
  navigation/
  content/
  pet/
  user/
  brand/
```

Create a category folder only when it contains a real component.

- `actions`: Button, IconButton, link actions.
- `forms`: InputField, Checkbox, Radio, Selector.
- `navigation`: PageHeader, FooterCTA, ProgressIndicator, BottomNavigation, PawlyDrawer.
- `content`: Card, Badge, ListItem, EmptyState, Snackbar.
- `pet`: PetAvatar, PetProfileSelector, PetIdentityCard.
- `user`: UserAvatar, UserProfileSummary.
- `brand`: PawlyWordmark and approved brand marks.

Treat these as taxonomy examples, not permission to create unused components. Keep feature compositions under `src/features/<feature>/components/`. Keep one-off screen structures in their screen or owning feature.

## Figma inspection

Before coding, identify and inspect:

- Exact component-set and main-component node IDs.
- Every approved variant and property name.
- Component, boolean, text, and instance-swap properties.
- Valid state combinations and approved instances in real Pawly screens.
- Layer hierarchy, Auto Layout, Hug Contents, Fill Container, fixed sizing, constraints, wrapping, clipping, and intentional absolute layers.
- Padding, gaps, fills, strokes, radii, shadows, variables, typography styles, icons, images, and interaction states.

Do not derive a component from one screenshot or one instance when a component set exists.

## Component API

Define the intended API before editing. Map approved Figma properties to product-meaningful React Native props such as:

- `size`
- `state`
- `variant`
- `selected`
- `disabled`
- `loading`
- `label`
- `supportingText`
- `leadingIcon`
- `trailingIcon`
- `onPress`

Prefer named variants over vague boolean combinations. Use discriminated unions or equivalent typing when they prevent impossible or unapproved states. Keep events and callbacks explicit.

Do not expose arbitrary style overrides to reproduce unrelated screen differences. Reject implementation-detail props such as `paddingLeftOverride`, `useBigFont`, `makeOrange`, `isSpecial`, `customHeight`, or `moveIconUp`.

## Tokens, typography, and layout

Use this mapping:

`Figma UI usage -> Pawly semantic code token -> Pawly base value`

- Consume the matching Pawly token for every bound Figma variable.
- Add a missing approved token centrally.
- Preserve semantic naming.
- Separate global semantic tokens from component-specific metrics.
- Map every approved Figma text style to central Pawly typography.
- Do not duplicate complete typography declarations inside a shared component.
- Do not embed feature-specific colours, labels, or behaviour in a general primitive.

Preserve Figma sizing behaviour:

- Auto Layout -> React Native flex layout.
- Hug Contents -> intrinsic content sizing.
- Fill Container -> flex or stretch behaviour.
- Fixed -> deliberate fixed or token-bound geometry.
- Min/Max -> explicit supported constraints.
- Absolute -> intentional overlays only.

Derive size from content and padding where Figma uses Hug Contents. Support translated and variable-length content. Avoid general-purpose fixed widths unless the approved variant requires one. Preserve deliberate icon, avatar, control, and touch-target geometry. Ensure the component works outside its first screen instance.

## Variants, states, accessibility, and assets

Implement every approved variant required by the task and every required state, including applicable default, selected, unselected, pressed, focused, disabled, loading, error, success, empty, content-presence, size, and platform interaction states.

Do not invent states that Figma or Pawly behaviour does not define. Do not omit a required approved state merely because the first caller does not use it.

For interactive components, define or support:

- Appropriate accessibility role and label.
- Disabled, selected, expanded, or collapsed state semantics when relevant.
- Minimum touch targets.
- Keyboard and web focus behaviour when relevant.
- Reduced-motion behaviour when relevant.

Preserve visible geometry while using invisible hit areas when necessary.

Use exact approved SVG or image exports. Preserve SVG viewBox and proportions. Keep assets in stable product-purpose folders. Do not substitute emoji, Unicode, generic library icons, or visually similar assets when approved exports exist.

## Duplication and consolidation

Search `src/components/`, relevant feature components, current screens, tokens, and assets before creating anything.

When duplicates may exist:

1. Compare their live Figma sources.
2. Confirm whether they are the same semantic primitive.
3. Identify behavioural differences.
4. Keep feature behaviour in feature compositions or wrappers.
5. Create or extend one shared implementation.
6. Migrate callers without changing approved behaviour.
7. Remove obsolete duplicates after all imports are updated.
8. Keep compatibility forwarding files only when technically required.

Do not consolidate visually similar elements with different product meaning or behaviour.

Maintain dependency direction:

- App code may import features.
- Features may import shared components.
- Shared components must not import features or routes.
- Shared components may import tokens, typography, utilities, and approved assets.
- Feature wrappers may compose shared primitives.
- Route files remain thin.

Confirm that no circular dependency is introduced.

## Workflow

Follow this order:

1. Read applicable Pawly documentation and skills.
2. Inspect Git status and protect unrelated work.
3. Identify the exact Figma component set and approved instances.
4. Complete the mandatory classification.
5. Audit existing shared and feature components.
6. Inspect tokens, typography, and assets.
7. Define the component API before editing.
8. Add missing approved tokens or typography centrally.
9. Implement or extend the shared component.
10. Keep feature behaviour in feature compositions.
11. Migrate affected callers.
12. Remove confirmed duplicates.
13. Validate every required variant and state.
14. Validate reference and responsive contexts.
15. Test inside at least one approved real screen instance.
16. Run static and runtime validation.
17. Compare output directly against Figma.
18. Commit only when requested and after validation.

Complete [the component checklist](references/component-checklist.md) throughout the task. Use [the component report](references/component-report.md) for the final handoff.

## Validation

Run, when available:

```text
npm run typecheck
npm run lint
npx expo install --check
npx expo-doctor
git diff --check
```

Validate all requested variants and states, exact Figma dimensions, Hug and Fill behaviour, a narrower supported width, longer realistic content, available English and Chinese translations, safe areas, applicable keyboard behaviour, accessibility semantics, touch targets, web and native rendering, Metro resolution, dependency cycles, and obsolete imports.

Test through Expo Go on a physical iPhone when available. Use an overlay or image difference where visual fidelity is involved. Keep screenshots, overlays, exports, logs, and temporary files outside the repository.

## Pause conditions

Pause and report when:

- Figma and Pawly documentation conflict.
- The component source cannot be identified.
- The proposed API would materially affect multiple approved screens.
- An approved asset, variable, or style is unavailable.
- Consolidation would change behaviour.
- A product decision is required.

## Scope and completion

Change only the requested component system scope and necessary callers. Preserve unrelated work, routes, product behaviour, and approved UI. Inspect the staged diff before committing. Do not push unless explicitly requested.

Declare completion only when the checklist is satisfied, the component works independently and in an approved real context, all required variants are verified, dependencies remain valid, visual evidence matches Figma, and limitations are disclosed.

## Prohibited shortcuts

Never:

- Create a shared component without checking existing implementations.
- Build from one screenshot when a Figma component set exists.
- Copy raw Figma values where tokens exist.
- Duplicate complete typography declarations.
- Use arbitrary style overrides instead of approved variants.
- Expose vague props or permit invalid prop combinations.
- Embed feature behaviour in shared primitives.
- Move feature-specific compositions into the shared library.
- Force unrelated Figma components into one abstraction.
- Ignore approved states or substitute approved assets.
- Hard-code dimensions solely to match one instance.
- Leave confirmed duplicate implementations or obsolete imports.
- Change unrelated screens during migration.
- Redesign approved UI.
- Declare completion without testing in a real approved context.
