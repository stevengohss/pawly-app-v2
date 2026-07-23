# Pawly AI Prompt Guide

**Document Version:** Foundation v1.1  
**Status:** Active prompting reference

> **Revision v1.1 — 21 Jul 2026:** Updated prompts for live Figma access, repository-first inspection, implementation bundles, vertical slices, and evidence-based Codex delivery.

## Purpose

This document defines how to prompt AI coding agents so they can work independently without changing Pawly’s approved direction.

## Prompt Principles

A strong Pawly prompt should:

- define one concrete outcome;
- identify relevant sources of truth;
- provide live Figma links or node IDs;
- state scope and out-of-scope items;
- require repository inspection before edits;
- allow engineering judgement for routine details;
- define acceptance criteria;
- require actual validation;
- require a concise final report.

Avoid prompts that dictate guessed file paths or duplicate implementation details that Codex can discover from the repository.

## Master Implementation Prompt Structure

```text
You are implementing an approved Pawly bundle.

1. Read:
   - /ai/00_AI_SYSTEM.md
   - /ai/01_PROJECT_CONTEXT.md
   - /ai/02_CODING_RULES.md
   - /ai/03_TASK_TEMPLATE.md
   - the task-relevant /docs files
   - /design/figma/FIGMA_REFERENCE.md

2. Inspect the repository before editing.
   Identify the current stack, routes, components, styling, state, tests,
   and validation scripts.

3. Inspect the supplied live Figma page and nodes through MCP.
   Live Figma is authoritative for exact visual implementation.
   Stitch imports are inspiration only unless explicitly approved.

4. Implement only the stated scope.
   Reuse existing components and variables.
   Do not redesign Pawly or expand launch scope.
   Do not copy generated Tailwind output literally.
   Do not install new dependencies without approval.

5. Use engineering judgement for routine implementation details.
   Stop only for genuine product, scope, architecture, privacy, security,
   destructive-change, or infrastructure blockers.

6. Validate with repository scripts, Expo Web, relevant UI states,
   bilingual checks, and native checks where applicable.

7. Return:
   - outcome;
   - files created/modified/removed;
   - decisions made;
   - commands and results;
   - routes/screens to review;
   - known issues;
   - recommended commit message.
```

## Audit Prompt

```text
Perform a read-only audit.

Compare:
- live Figma;
- local /design/figma exports;
- relevant /docs;
- existing implementation.

Report only action-required findings:
- broken aliases;
- missing or stale exports;
- incorrect bindings;
- contradictory requirements;
- implementation mismatches;
- genuine blockers.

Ignore intentional optical adjustments and valid derived dimensions.
Do not redesign the system and do not modify files.
```

## Figma Access Verification Prompt

```text
Verify Figma MCP access without changing the file.

Demonstrate that you can:
- list pages;
- inspect page sections and frames;
- inspect one selected screen deeply;
- inspect component and variable bindings;
- retrieve a screenshot or design context.

Explain that large files are traversed systematically rather than loaded
entirely into one context.
Report any access limitation.
```

## Vertical Slice Prompt

```text
Build the complete approved user journey, not isolated static screens.

The slice must include:
- navigation entry;
- interaction;
- state/data update;
- persistence permitted by the task;
- completion feedback;
- downstream result;
- empty/loading/error states;
- browser validation;
- native validation where required.

Prefer a working end-to-end experience over pixel-polishing unrelated screens.
```

## Code Review Prompt

```text
Review the implementation against:
- approved task acceptance criteria;
- relevant /docs;
- live Figma;
- existing architecture;
- actual test evidence.

Classify findings as Blocker, Required, Follow-up, or Accepted exception.
Report only supported findings.
Do not change approved scope.
```

## Prompting Boundaries

Do not ask Codex to:

- implement every Stitch inspiration screen;
- redesign the product;
- expand later roadmap features;
- refactor unrelated systems;
- rebuild the design system in code before a feature needs it;
- claim full Figma-file loading in one context;
- mark incomplete work as complete.

## Governance

This guide defines the standard prompting approach for Pawly AI contributors.
