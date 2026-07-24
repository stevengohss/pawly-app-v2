---
name: pawly-figma-implement
description: Implement an approved Pawly Figma screen or component in React Native/Expo by inspecting the live Figma source, mapping variables and text styles to Pawly tokens, preserving Auto Layout behaviour, reusing audited components and validating the runtime result against Figma. Use when asked to implement a Figma screen, code a Figma component, reproduce a Pawly frame, correct an existing screen to match Figma, integrate an approved Figma design, or build a screen pixel accurately.
---

# Pawly Figma Implementation

## 1. Purpose

Translate an approved live Pawly Figma frame, component, variant, or instance into accurate, responsive React Native/Expo code. Preserve the design system, product behaviour, architecture, accessibility, and supported-device behaviour.

Execute the workflow below. Do not treat it as optional design guidance.

## 2. When to use this skill

Use this skill for every Pawly design-to-code task involving a live Figma screen, component, variant, or instance, including visual corrections to an existing implementation.

Use the Figma design-to-code tooling required by the active environment before reading live nodes. Combine that tooling with this Pawly-specific workflow.

## 3. Required inputs

Obtain or locate:

- The exact Figma node URL or node ID.
- The requested implementation scope and approved interaction behaviour.
- The target route, feature, or shared-component location.
- The reference frame dimensions and required states.
- Any approved copy, assets, or translations referenced by the design.

Do not guess a missing node, asset, variable, product decision, or interaction. Continue without approval only when the source and intended mapping are unambiguous.

## 4. Pawly sources of truth

Read the applicable material before editing:

- `/docs`
- `/ai`
- `/reference/figma/FIGMA_SOURCE.md`
- `V2_BUILD_RULES.md`
- The current source tree.
- The current shared component library.
- The live Pawly Figma file:
  `https://www.figma.com/design/ucqEyI5O3EYC04IBdeDvjO/Pawly-App---Foundation`
- Figma file key: `ucqEyI5O3EYC04IBdeDvjO`

Apply this authority order:

1. Live Figma governs visual output.
2. Pawly documentation governs product behaviour, architecture, terminology, and scope.
3. Existing code is an implementation reference, not independent visual authority.
4. Old screenshots, exports, and drafted screens are not visual truth unless explicitly approved.

Report a conflict instead of silently choosing one source.

## 5. Mandatory pre-implementation inspection

Inspect the exact source node with live Figma tooling before writing code. Inspect the approved screen instance too when the source is a reusable component.

Read and complete [the Figma inspection checklist](references/figma-inspection-checklist.md). Record the node IDs, variables, text styles, layout behaviour, reference dimensions, variants, assets, and intentional absolute layers.

Do not begin from a screenshot alone. Screenshots support visual validation but do not replace node properties, variable bindings, or layer structure.

Pause and request direction only when:

- Figma conflicts with Pawly documentation.
- The exact source node cannot be identified.
- A decision would materially affect other approved screens.
- A required asset, variable, or approved text style is unavailable.
- Proceeding requires a product decision.

## 6. Figma variable and code-token mapping

Use this mapping chain:

`Figma UI usage → Pawly semantic code token → Pawly base value`

For every bound Figma variable:

1. Identify its exact name and collection.
2. Find its semantic Pawly code-token equivalent.
3. Use that code token, not the resolved raw value.
4. Add a missing approved token centrally before consuming it.
5. Preserve semantic naming; do not name tokens after raw colours or numbers.

Read [the design-token rules](references/design-token-rules.md) before mapping or adding tokens.

## 7. Typography-style mapping

Inspect the exact applied Figma text style for every approved text role.

Map it to a central Pawly typography style covering, as applicable:

- Font family.
- Font size.
- Font weight.
- Line height.
- Letter spacing.
- Text transform.

Reuse an existing style. Add a missing approved style centrally when necessary. Do not repeat a complete typography declaration in a screen or alter an approved style locally to force alignment.

Keep text colour as a semantic colour token unless Pawly already uses an intentionally combined typography-and-colour style. Preserve intentional wrapping, truncation, and font-scaling behaviour.

## 8. Auto Layout and responsive sizing

Translate layout behaviour, not reference-frame coordinates:

- Auto Layout → React Native flex layout.
- Hug Contents → intrinsic content sizing.
- Fill Container → flex, stretch, or available parent width.
- Fixed → deliberate fixed or token-bound geometry.
- Min/Max → supported React Native minimum or maximum constraints.
- Auto Layout gap → semantic token-backed gap or equivalent structural spacing.
- Absolute → only an intentionally absolute or overlaid Figma layer.

Read [the responsive-layout rules](references/responsive-layout-rules.md) before implementing containers or responsive behaviour.

## 9. Shared-component discovery and reuse

Before creating a component, search:

- `src/components/`
- `src/features/<relevant-feature>/components/`

Classify the requested element as:

- An existing shared Figma primitive.
- A new shared Figma primitive.
- A feature-specific composition.
- Screen-only markup.
- An approved variant of an existing component.

Place reusable Figma primitives under the audited taxonomy:

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

Create a category only when it contains a real component. Keep feature compositions in their owning feature.

Do not duplicate Button, InputField, PageHeader, FooterCTA, ProgressIndicator, or another existing primitive. Do not create an auth-specific copy of a general primitive, force feature content into the shared library, over-abstract a one-off structure, or use vague names.

## 10. Asset and SVG handling

- Use approved Figma exports.
- Prefer vectors for vector artwork.
- Preserve SVG viewBox, proportions, and asset bytes.
- Do not substitute emoji, Unicode, generic icons, or visually similar third-party icons.
- Do not manually redraw an approved vector unless a documented technical constraint requires it.
- Store assets by stable product purpose, never by project milestone.
- During path-only refactors, preserve bytes.
- Verify asset rendering on web and native.

## 11. Implementation procedure

Follow this order:

1. Read applicable Pawly project rules.
2. Inspect Git status and protect unrelated work.
3. Locate and inspect the exact live Figma node.
4. Inspect the approved screen instance when applicable.
5. Record variables, text styles, variants, and layout behaviour.
6. Audit existing components, tokens, typography, and assets.
7. State a brief implementation mapping before editing.
8. Add missing central tokens or typography styles first.
9. Create or update shared primitives.
10. Compose the requested screen or component.
11. Preserve product behaviour, accessibility, and route contracts.
12. Run static validation.
13. Render at the exact Figma reference dimensions.
14. Compare runtime against Figma with an overlay or image difference.
15. Correct geometry, colour, typography, spacing, and state differences.
16. Test responsive and content-driven behaviour.
17. Test on a physical iPhone through Expo Go when available.
18. Commit only after approval-quality validation when implementation and committing are requested.

Do not stop after the mapping unless a listed pause condition applies.

## 12. Runtime comparison and validation

Run, when available:

```text
npm run typecheck
npm run lint
npx expo install --check
npx expo-doctor
git diff --check
```

Validate:

- Exact reference-frame output.
- At least one narrower supported width.
- Safe-area variations.
- Text wrapping and longer realistic content.
- Available English and Chinese translations.
- Relevant component variants and interaction states.
- Keyboard behaviour for forms.
- Affected routes.
- Metro module and asset resolution.
- Physical iPhone behaviour through Expo Go.

Use an overlay or image-difference inspection. A side-by-side screenshot alone is insufficient. Accept anti-aliasing-only differences only after confirming geometry, colour regions, typography placement, and spacing.

Keep screenshots, overlays, logs, and temporary exports outside the repository or in a confirmed ignored temporary location.

## 13. Scope and Git rules

- Change only the requested screen or component and necessary dependencies.
- Do not redesign unrelated UI, alter approved copy, change routes, or add product features unless explicitly requested.
- Preserve unrelated tracked and untracked work.
- Exclude secrets, environment values, caches, logs, screenshots, overlays, and temporary exports.
- Inspect the staged diff before committing.
- Do not push unless explicitly asked.
- Report the commit hash and message when a commit is created.

## 14. Required final report

Use [the completion-report template](references/completion-report.md). Report measured evidence, unresolved uncertainty, and any physical-device limitation honestly.

## 15. Completion criteria

Declare completion only when:

- The exact Figma source and applicable instance were inspected.
- Variables and typography styles map through central Pawly tokens/styles.
- Responsive behaviour preserves the source Auto Layout intent.
- Existing shared primitives are reused where appropriate.
- Approved assets render correctly.
- Static validation passes.
- Runtime output is compared directly with Figma.
- Responsive, content, safe-area, state, and applicable keyboard tests pass.
- Known differences and untested conditions are disclosed.
- Git scope is clean and intentional.

## 16. Prohibited shortcuts

Never:

- Code from screenshots when live Figma is available.
- Guess measurements or silently infer missing product decisions.
- Copy raw values where approved variables or tokens exist.
- Duplicate complete typography definitions inline.
- Add arbitrary fixed dimensions solely to match one screenshot.
- Flatten responsive Auto Layout into absolute coordinates.
- Use absolute positioning for ordinary flow layout.
- Duplicate an existing shared component.
- Substitute an unapproved icon or asset.
- Match only one device while leaving a brittle layout.
- Mark work complete without runtime validation.
- Hide known differences, uncertainty, or untested conditions.
