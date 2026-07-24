# Pawly Component Checklist

Complete the applicable checks and record evidence. Mark unavailable evidence as a limitation; do not infer a pass.

## 1. Component identity

- [ ] Record the component name and intended category.
- [ ] Record the exact live Figma file and node IDs.
- [ ] Identify the main component and approved screen instances.
- [ ] Confirm terminology against Pawly documentation.

## 2. Figma component set and variants

- [ ] Inspect the component set and every approved variant required by the task.
- [ ] Record variant, component, boolean, text, and instance-swap properties.
- [ ] Record valid state combinations.
- [ ] Confirm the task is not based on one screenshot or instance alone.

## 3. Classification

- [ ] Select one mandatory classification.
- [ ] Justify it using identity, reuse, behaviour ownership, API stability, and semantics.
- [ ] Confirm repetition alone did not determine ownership.
- [ ] Confirm sharing will not distort the approved design.

## 4. Existing-component search

- [ ] Search `src/components/`.
- [ ] Search relevant feature component folders and screens.
- [ ] Search tokens, typography, assets, and imports.
- [ ] Identify existing primitives, variants, wrappers, and possible duplicates.

## 5. Proposed API

- [ ] Define props, events, defaults, and approved variants before editing.
- [ ] Use product-meaningful names.
- [ ] Prevent impossible or unapproved combinations.
- [ ] Avoid arbitrary style overrides and implementation-detail props.

## 6. Tokens

- [ ] Map Figma variables to Pawly semantic tokens and base values.
- [ ] Reuse existing tokens.
- [ ] Add missing approved tokens centrally.
- [ ] Separate global tokens from component-specific metrics.
- [ ] Confirm no avoidable raw design values remain.

## 7. Typography

- [ ] Identify every approved Figma text style.
- [ ] Map each role to central Pawly typography.
- [ ] Confirm shared components do not duplicate complete typography declarations.
- [ ] Test wrapping, truncation, and variable-length content.

## 8. Auto Layout and sizing

- [ ] Map Auto Layout, Hug, Fill, Fixed, Min/Max, and intentional absolute layers.
- [ ] Preserve padding, gaps, wrapping, clipping, and alignment.
- [ ] Avoid fixed widths unless the approved variant requires them.
- [ ] Confirm the component works outside its first caller.

## 9. States

- [ ] Implement every required approved variant and state.
- [ ] Verify valid combinations.
- [ ] Confirm no unapproved state was invented.
- [ ] Verify pressed, focused, disabled, loading, selection, and content-presence states where applicable.

## 10. Assets

- [ ] Use exact approved SVG or image exports.
- [ ] Preserve SVG viewBox and proportions.
- [ ] Keep assets in stable product-purpose folders.
- [ ] Verify all approved asset states.
- [ ] Confirm no emoji, Unicode, generic icon, or approximate asset substitution.

## 11. Accessibility

- [ ] Verify role, accessible label, and relevant state semantics.
- [ ] Verify disabled, selected, expanded, or collapsed semantics where applicable.
- [ ] Measure minimum touch targets without changing visible geometry.
- [ ] Verify keyboard and web focus behaviour where applicable.
- [ ] Verify reduced-motion behaviour where applicable.

## 12. Dependency direction

- [ ] Confirm shared components do not import features or routes.
- [ ] Keep feature behaviour in feature wrappers or compositions.
- [ ] Keep route files thin.
- [ ] Check for circular dependencies.

## 13. Caller migration

- [ ] Identify every affected caller.
- [ ] Migrate only callers within scope.
- [ ] Preserve copy, route contracts, callbacks, and feature behaviour.
- [ ] Verify approved screen instances after migration.

## 14. Duplicate removal

- [ ] Confirm duplicates share the same Figma and semantic identity.
- [ ] Remove obsolete implementations after imports are migrated.
- [ ] Remove obsolete imports.
- [ ] Retain forwarding files only when technically required.

## 15. Runtime validation

- [ ] Run typecheck, lint, Expo dependency check, Expo Doctor, and `git diff --check`.
- [ ] Test every requested variant and state.
- [ ] Test exact reference dimensions and a narrower supported width.
- [ ] Test Hug, Fill, long content, translations when available, safe areas, and keyboard behaviour as applicable.
- [ ] Verify web, native, Metro resolution, and physical iPhone behaviour when available.
- [ ] Compare runtime directly with Figma using an overlay or image difference.

## 16. Completion gate

- [ ] Test the component independently.
- [ ] Test it in at least one approved real screen context.
- [ ] Confirm no unrelated redesign or application change.
- [ ] Inspect Git scope and preserve unrelated work.
- [ ] Record limitations and untested conditions.
- [ ] Complete the component report before declaring completion.
