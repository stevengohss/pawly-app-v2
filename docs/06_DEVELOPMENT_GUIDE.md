# Pawly Development Guide

**Document Version:** Foundation v1.3  
**Status:** Active development workflow reference

> **Revision v1.3 — 21 Jul 2026:** Clarified the split source-of-truth model: `/docs` governs product and implementation direction; live Figma governs visual variables, styles, components, assets, and approved screen direction.
>
> **Revision v1.2 — 25 Jun 2026:** Removed dependency on a separate `PAWLY_APP` master file.

## Purpose

This guide defines how Pawly work is planned, implemented, tested, reviewed, and committed.

## Working Model

```text
Approved source-of-truth decision
↓
Relevant docs updated
↓
Stitch / asset reference prepared where needed
↓
Codex task prompt with exact scope
↓
Implementation in shared components / feature module
↓
Browser review
↓
Native device validation where needed
↓
Review, approval, documentation, commit
```

## Source-of-Truth Rule

The `/docs` folder is the source of truth for approved product scope, behaviour, architecture, database direction, delivery rules, and launch priorities.

The live Pawly Figma file is the source of truth for exact visual values, variables, styles, reusable components, assets, and approved screen direction. Stitch imports remain inspiration unless explicitly approved.

When written visual guidance conflicts with the current approved Figma system, follow Figma for implementation and report the documentation mismatch so the affected document can be updated.

When a product decision is approved:

1. Update every affected document in `/docs`.
2. Increment the document version for every file materially changed.
3. Add a concise dated revision note at the top of each changed file.
4. Update Figma when the approved change affects visual variables, styles, components, assets, or screen direction.
5. Give Stitch or Codex the latest relevant files and Figma references for the task.
6. Do not silently add unapproved scope.

Do not create a separate master feature file outside `/docs`.

## Task Boundaries

Every Codex task should state:

- source documents to read
- exact feature/component scope
- existing visual references
- allowed files/directories
- prohibited scope changes
- acceptance criteria
- validation commands
- required final report

Codex should use engineering judgement for reliability/accessibility, but must not change approved product flow or visual direction without reporting the issue and waiting for approval.

## Shared Component First

When a visual element repeats across screens, build it once as a shared component.

Examples:

- top bar
- bottom nav
- drawer
- quick actions
- buttons
- cards
- notices
- empty states

Do not attempt to manually align duplicated versions screen by screen.

## Browser-First Visual Review

Use Expo Web for:

- spacing
- alignment
- typography
- cards
- navigation
- drawer
- quick actions
- copy
- layout structure
- component states

Use browser DevTools mobile viewport to inspect phone-sized layouts.

Normal TypeScript, JSX, layout, and styling changes should use Fast Refresh and should not require a native rebuild.

## Native Validation

Use iPhone / Expo development workflow for:

- keyboard and text input
- date pickers
- camera
- QR scanning
- contact permission
- notifications
- share sheet
- deep links
- safe area
- actual mobile scrolling/performance

A native rebuild is normally required only for native configuration, native dependency, or native-code changes.

## UI Lab

Maintain a private development-only route such as:

```text
/dev/ui-lab
```

Use it to review isolated shared components before applying them to screens.

It should include:

- top bar states
- bottom-nav active states
- centre Add button
- drawer
- quick actions
- buttons
- cards
- notices
- empty states

The UI Lab must not become public production functionality.

## Admin Tools

Development/admin tools may support:

- route/page selection
- onboarding reset
- test data
- state preview
- environment information

They must be protected by development/admin conditions and excluded from normal production user experience.

## Internationalisation Rules

- Never hard-code user-facing strings in components.
- Use shared translation keys.
- Use controlled array variants only for non-critical warm copy.
- Use deterministic session/day selection.
- Test English and Chinese layouts for all shared components.

## File and Change Discipline

- Name exact file paths.
- Keep changes focused.
- Prefer complete replacements when appropriate.
- Avoid unrelated refactors.
- Do not remove old routes/screens unless approved.
- Report all modified/created files.

## Testing Before Commit

At minimum:

- Type check / lint according to repository scripts.
- Run browser preview.
- Review affected UI in browser.
- Run applicable native validation.
- Test empty/loading/error states.
- Test English and Chinese where UI copy changed.
- Verify no accidental production admin tooling exposure.

## Documentation Before Commit

Update relevant docs when changes affect:

- product scope
- architecture
- database
- UI system
- workflow
- accepted visual components
- launch roadmap

## Git

Each commit should:

- represent one logical unit.
- be reviewable.
- keep main stable.
- include meaningful message.
- occur after Steven approval for major UI/product changes.
