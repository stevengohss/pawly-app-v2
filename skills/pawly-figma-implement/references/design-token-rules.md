# Pawly Design-Token Rules

Use this reference whenever inspecting Figma bindings, mapping visual properties, or adding Pawly tokens.

## Required mapping

Map every design-system decision through:

`Figma UI usage → Pawly semantic code token → Pawly base value`

Do not make a screen depend directly on a resolved Figma value when the property is variable-backed or an equivalent Pawly token already exists.

## Variable-backed property procedure

For each bound property:

1. Record the Figma variable name, collection, mode, and UI purpose.
2. Search the Pawly theme and token files for the semantic equivalent.
3. Reuse the semantic code token.
4. If none exists, confirm that the variable is approved and add a central semantic token.
5. Reference the new token from the component or screen.
6. Validate its resolved value against the active Figma mode.

Apply this procedure to:

- Colours.
- Spacing and gaps.
- Radius.
- Border width.
- Icon and avatar size.
- Opacity.
- Motion duration and easing.
- Overlays.
- Blur.
- Z-index or elevation.
- Shadows represented by the Pawly token system.

Do not silently duplicate decisions such as:

```tsx
backgroundColor: '#99462A'
borderRadius: 16
paddingHorizontal: 20
```

when Figma variables or Pawly semantic tokens already represent them.

## Semantic naming

Name tokens by role and intent, not appearance:

- Prefer `color.actionPrimary` over `color.orange`.
- Prefer `spacing.screenHorizontal` over `spacing20`.
- Prefer `radius.card` over `radius16`.

Do not create a new token solely to avoid writing a measured component-specific value.

## Classify every value

Distinguish:

### Design-system value

A repeated, governed decision represented by a Figma variable, style, or established Pawly semantic token. Use or add a central token.

### Component-specific measured geometry

A deliberate dimension local to one audited component, such as a centre Add button diameter or an SVG artwork offset. Keep it in a clearly named component metric unless a central token already governs it.

### Content-derived dimension

A value determined by text, children, intrinsic assets, padding, or parent constraints. Let layout calculate it; do not replace it with a fixed screenshot measurement.

### Calculated runtime value

A value derived from viewport width, safe-area insets, keyboard height, measured footer height, or another runtime input. Calculate it explicitly and name the calculation.

## Base values and aliases

- Preserve the existing Pawly token layering and naming conventions.
- Do not bypass semantic aliases by importing a base palette directly into screens.
- Do not duplicate identical base values under multiple feature names without a semantic reason.
- Keep feature-specific tokens inside the established theme structure only when their meaning is genuinely feature-specific.
- Preserve Figma variable modes when Pawly later supports themes or modes; do not collapse mode-dependent values prematurely.

## Shadows and platform translation

Map the approved shadow semantically, then translate it to platform-specific React Native/web properties. Keep one Pawly semantic shadow decision even when iOS, Android, and web require different implementation fields.

Validate the rendered result; raw Figma blur or radius numbers do not always translate one-to-one across rendering engines.

## Audit before completion

Search the changed files for new raw colours, spacing, radii, typography, opacity, and shadow values. For each result, confirm that it is:

- A necessary component metric.
- A content or runtime calculation.
- Or a token gap that must be corrected centrally.

Disclose any intentional component-specific geometry in the completion report.
