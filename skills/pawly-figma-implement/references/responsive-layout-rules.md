# Pawly Responsive-Layout Rules

Use this reference when translating Figma Auto Layout, constraints, sizing modes, safe areas, or content behaviour into React Native.

## Translate behaviour

Map:

- Figma Auto Layout → `flexDirection`, alignment, justification, wrapping, and structural nesting.
- Hug Contents → intrinsic child sizing plus padding.
- Fill Container → `flex`, stretch, or available parent width.
- Fixed → deliberate fixed or token-bound geometry.
- Min/Max → `minWidth`, `maxWidth`, `minHeight`, or `maxHeight` where supported.
- Auto Layout gap → token-backed `gap` or equivalent sibling spacing.
- Absolute positioning → only Figma layers marked absolute or intentionally overlaid.

Do not copy the reference-frame x/y values of normal Auto Layout children.

## Default container behaviour

- Let cards derive height from content and padding.
- Let page sections fill the available parent width.
- Let fields accommodate labels, hints, errors, and translated content.
- Size ordinary buttons from their parent or contents according to the Figma component property.
- Let list items accommodate realistic variable text.
- Let text wrap where Figma permits wrapping.
- Use scrolling when supported content can exceed the viewport.
- Keep fixed footers and navigation above content while making obscured content reachable.
- Avoid arbitrary top, left, width, and height values for ordinary flow layout.

## Valid constrained geometry

Fixed or constrained dimensions remain valid when Figma deliberately defines them, including:

- Icons.
- Avatars.
- Checkboxes and radio controls.
- Navigation bars.
- Accessible touch targets.
- Centre Add buttons.
- Progress elements.
- Image frames and aspect ratios.
- Exact decorative artwork.
- Approved minimum button and field heights.

Name component-specific metrics by purpose. Do not promote every measurement to a global token.

## Text behaviour

- Inspect Figma wrapping, truncation, maximum lines, and text-box sizing.
- Do not insert manual newlines to imitate one reference frame unless the copy itself contains them.
- Test longer realistic copy.
- Test available English and Chinese translations.
- Keep labels single-line only where Figma explicitly requires it.
- Prevent clipping at supported platform font metrics.
- Do not locally change an approved typography style to solve a layout problem; fix the layout constraint.

## Safe areas and overlays

- Inspect whether Figma models the visible surface, safe-area extension, and screen background as separate layers.
- Use runtime safe-area insets where product behaviour requires them.
- Keep visible surfaces flush or floating according to the approved instance.
- Do not add unexplained blank safe-area spacers.
- Confirm that overlaid content neither leaks through opaque regions nor becomes unreachable.

## Forms and keyboards

- Use keyboard-aware scrolling or avoidance according to the existing Pawly pattern.
- Keep the focused field, inline message, and primary action reachable.
- Measure fixed footers when their height changes with content.
- Test at a short supported viewport with the keyboard open.
- Do not allow a keyboard-driven footer to cover the complete form.

## Responsive test matrix

Test:

1. The exact Figma reference width and height.
2. At least one narrower supported width.
3. A taller or safe-area-varied iPhone viewport when relevant.
4. Longer realistic copy.
5. English and Chinese when translations exist.
6. Keyboard appearance for forms.
7. Every relevant state and variant.

For each test, inspect:

- Overflow and clipping.
- Wrapping and truncation.
- Parent fill and child intrinsic sizing.
- Fixed overlays.
- Safe-area positioning.
- Touch-target placement.
- Image crop and aspect ratio.

Do not scale the whole design to fit a different viewport. Preserve approved geometry and adapt the surrounding layout behaviour.
