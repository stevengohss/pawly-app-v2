# Pawly Figma Review Checklist

Record evidence for each applicable item. Mark an item not applicable or unverified rather than assuming it passes.

## Source and structure

- Confirm Figma file, exact node ID, component source, reference dimensions, states, and source identity.
- Compare component hierarchy, variants, variable bindings, text styles, Auto Layout, fixed or fill sizing, and intentional absolute layers.
- Identify conflicts between live Figma, Pawly documentation, and implementation.

## Visual comparison

- Compare padding, spacing, alignment, corner radius, borders, shadows, colours, opacity, icons, SVG usage, images, and asset fidelity.
- Compare typography family, size, weight, line height, letter spacing, wrapping, truncation, and reuse.
- Capture the runtime at the reference dimensions.
- Generate and inspect a Figma overlay or image difference.
- Quantify material differences where tooling permits; separate anti-aliasing noise from geometry or colour mismatch.

## Responsive and interaction behaviour

- Test at least one narrower supported width.
- Check content growth, long text, scrolling, safe areas, keyboard behaviour, and footer or action reachability where applicable.
- Check animations, reduced motion, interaction states, route behaviour, and documented product behaviour.
- Validate on a physical device when available and disclose platform-only differences.

## Engineering and accessibility

- Audit touch targets, labels, roles, focus, modal semantics, background interaction, and screen-reader order.
- Audit shared-component reuse and unjustified duplication.
- Audit semantic token usage and raw or hard-coded design values.
- Audit central typography reuse and local full-style duplication.
- Confirm approved icons, SVGs, and images are used without unsupported substitution.

## Required evidence

- Live Figma inspection.
- Applicable Pawly documentation.
- Relevant source locations.
- Runtime screenshot.
- Figma overlay or image difference.
- Responsive check.
- Token audit.
- Typography audit.
- Shared-component audit.
- Hard-coded value audit.
- Device validation when available.
