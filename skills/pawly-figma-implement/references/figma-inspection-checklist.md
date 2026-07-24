# Pawly Figma Inspection Checklist

Complete this checklist before coding. Record findings in concise implementation notes.

## Source identity

- [ ] Exact file key.
- [ ] Exact source node ID.
- [ ] Node name and node type.
- [ ] Component-set and main-component IDs, when applicable.
- [ ] Variant properties and options.
- [ ] Exact approved screen-instance ID, when applicable.
- [ ] Reference-frame width and height.
- [ ] Applicable interaction or state frames.

## Hierarchy and semantics

- [ ] Complete relevant layer hierarchy.
- [ ] Layer names and intended product roles.
- [ ] Repeated layers or nested instances.
- [ ] Hidden layers and variant-dependent visibility.
- [ ] Component properties and instance overrides.
- [ ] Interaction states and prototype behaviour.

## Auto Layout and sizing

- [ ] Auto Layout direction.
- [ ] Primary-axis alignment.
- [ ] Counter-axis alignment.
- [ ] Primary- and counter-axis sizing modes.
- [ ] Hug Contents layers.
- [ ] Fill Container layers.
- [ ] Deliberately fixed dimensions.
- [ ] Minimum and maximum constraints.
- [ ] Horizontal and vertical constraints.
- [ ] Padding on every relevant container.
- [ ] Item spacing or gap.
- [ ] Wrapping behaviour.
- [ ] Clipping and overflow.
- [ ] Absolute-positioned or overlaid layers.
- [ ] Responsive relationship to the parent.

## Variables and tokens

- [ ] Every bound variable.
- [ ] Variable collection and active mode.
- [ ] Bound property and semantic UI usage.
- [ ] Existing Pawly semantic token equivalent.
- [ ] Missing central token, if any.
- [ ] Unbound component-specific geometry distinguished from token values.
- [ ] Runtime-calculated values distinguished from design values.

## Typography

- [ ] Exact applied Figma text-style name.
- [ ] Font family.
- [ ] Font size.
- [ ] Font weight/style.
- [ ] Line height.
- [ ] Letter spacing.
- [ ] Text transform.
- [ ] Text alignment.
- [ ] Text box sizing.
- [ ] Wrapping, truncation, and maximum lines.
- [ ] Semantic text-colour variable.
- [ ] Existing Pawly typography-style equivalent.

## Visual properties

- [ ] Fills and their variables.
- [ ] Image fills, crop mode, focal point, and aspect ratio.
- [ ] Strokes, position, and width.
- [ ] Corner radius and individual corners.
- [ ] Opacity and blend mode.
- [ ] Effects, shadows, blur, and spread.
- [ ] Overlay or background relationship.
- [ ] Z-order.

## Assets

- [ ] SVG/vector layer IDs.
- [ ] Export format and dimensions.
- [ ] SVG viewBox and proportions.
- [ ] Existing approved local asset match.
- [ ] Raster source resolution and crop behaviour.
- [ ] Active, inactive, pressed, disabled, loading, and error assets where applicable.

## Device and screen relationship

- [ ] Status-bar treatment.
- [ ] Top and bottom safe-area relationship.
- [ ] Keyboard relationship.
- [ ] Fixed or scrolling regions.
- [ ] Header and footer behaviour.
- [ ] Overlay interaction with scrollable content.
- [ ] Reference device/frame dimensions.

## Existing-code audit

- [ ] Relevant route and behaviour contracts.
- [ ] Existing shared primitive search.
- [ ] Relevant feature-component search.
- [ ] Existing token and typography search.
- [ ] Existing asset search.
- [ ] Dependency direction and naming conventions.
- [ ] Unrelated working-tree changes protected.

## Inspection gate

Do not implement until:

- The exact source node is confirmed.
- The applicable approved instance is inspected.
- Variable and typography mappings are known.
- Auto Layout behaviour is understood.
- Asset sources are available.
- Any conflict or material product uncertainty is resolved.
