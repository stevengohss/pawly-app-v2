---
name: pawly-figma-review
description: Audit an implemented Pawly React Native/Expo screen or component against its approved live Figma source using source, runtime, responsive, token, typography, accessibility, and product-behaviour evidence. Use when asked to review a screen, compare against Figma, audit a component, identify differences, check whether an implementation matches Figma, QA the runtime, inspect an implementation, or review UI before commit.
---

# Pawly Figma Review

## Purpose

Perform an independent QA audit of an implemented Pawly screen or component.

Default to:

`Inspect -> Compare -> Report`

Do not edit, redesign, refactor, or fix the implementation unless the user explicitly requests implementation after reading the audit.

## Sources of truth

Inspect all four evidence sources:

1. The exact live Pawly Figma node and applicable component source.
2. Applicable Pawly documentation under `/docs`, `/ai`, `/reference/figma/FIGMA_SOURCE.md`, and `/V2_BUILD_RULES.md`.
3. The current source implementation, including shared components, tokens, typography, assets, routes, and behaviour.
4. The running implementation at the reference viewport and relevant states.

Apply this authority order:

1. Live Figma governs visual output.
2. Pawly documentation governs product behaviour, architecture, terminology, and scope.
3. Existing implementation is evidence, not independent design authority.

Report source conflicts or missing evidence. Never silently resolve them through personal aesthetic judgment.

## Review workflow

1. Inspect Git status without changing it.
2. Identify the exact Figma file, node ID, component source, variants, and reference dimensions.
3. Read the applicable Pawly documentation and implementation.
4. Inspect the runtime at the exact reference size and all relevant states.
5. Complete [the review checklist](references/review-checklist.md).
6. Capture a runtime screenshot outside the repository.
7. Produce a Figma overlay or image difference; side-by-side inspection alone is insufficient.
8. Check at least one narrower supported width and applicable safe-area, content, keyboard, motion, and device conditions.
9. Audit semantic tokens, typography reuse, shared-component reuse, and hard-coded values.
10. Classify and report every material finding using [the comparison report](references/comparison-report.md).

Use live measurements, node properties, source locations, screenshots, runtime observations, and validation output as evidence. Distinguish confirmed facts from limitations or untested conditions.

## Finding classifications

- **PASS**: The implementation matches the approved source and required behaviour within verified rendering tolerance.
- **MINOR DIFFERENCE**: A visible or structural mismatch has limited impact and does not change core hierarchy, behaviour, accessibility, or responsive integrity.
- **MAJOR DIFFERENCE**: A meaningful visual, structural, responsive, behavioural, reuse, token, or accessibility mismatch requires correction before approval.
- **BLOCKER**: Missing authority, inaccessible runtime/source, broken core behaviour, severe accessibility failure, or another condition prevents a trustworthy review or release.

Every finding must identify:

- Figma source.
- Runtime implementation.
- Why it differs.
- Recommended correction.

Recommend only corrections supported by live Figma or Pawly documentation. Do not invent aesthetic enhancements or new product behaviour.

## Review integrity

Never, during the audit:

- Modify, rename, move, create, or delete files.
- Rewrite layouts or components.
- Change tokens, typography, assets, routes, or behaviour.
- Create runtime components.
- Apply automatic formatting or fixes.
- Stage, commit, or push implementation changes.
- Describe an unverified condition as passing.

If the user later requests corrections, treat that as a separate implementation task and use the applicable implementation workflow.

## Required report

Use [the comparison report](references/comparison-report.md). Include measured evidence, finding totals, source conflicts, device limitations, and outstanding uncertainty.

End the report with these exact sections:

- Overall Result
- Ready for implementation
- Ready for commit
- Ready for App Store quality
- Known limitations
- Outstanding blockers
