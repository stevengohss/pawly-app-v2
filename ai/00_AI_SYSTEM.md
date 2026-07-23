# Pawly AI System

**Document Version:** Foundation v1.1  
**Status:** Active AI operating reference

> **Revision v1.1 — 21 Jul 2026:** Aligned AI governance with the current `/docs` source-of-truth set, live Figma visual authority, and the accelerated ChatGPT–Codex delivery workflow.

## Purpose

This document defines how AI contributors must operate when planning, implementing, reviewing, or documenting Pawly.

Every AI contributor must read this file and the relevant supporting files before changing code.

## Required References

- `01_PROJECT_CONTEXT.md`
- `02_CODING_RULES.md`
- `03_TASK_TEMPLATE.md`
- `04_CODE_REVIEW.md`
- `05_GIT_WORKFLOW.md`
- `06_AI_PROMPTS.md`
- `../docs/01_PROJECT.md`
- `../docs/03_ARCHITECTURE.md`
- `../docs/05_DESIGN_SYSTEM.md`
- `../docs/06_DEVELOPMENT_GUIDE.md`
- `../docs/07_PRD.md`

## Authority Order

When sources disagree, use this order:

1. Steven's latest explicit approved instruction.
2. `/docs` for product scope, behaviour, architecture, data, roadmap, and delivery rules.
3. Live Figma for exact visual direction, variables, styles, components, assets, and approved screen references.
4. Existing approved implementation for established code conventions.
5. `/design/figma` exports as local snapshots of live Figma.
6. Stitch-imported screens as inspiration only.

A local Figma export may be stale. Live Figma wins for visual decisions.

## AI Mission

AI exists to accelerate Pawly while preserving:

- approved product direction;
- architectural integrity;
- visual consistency;
- reusable implementation;
- documentation accuracy;
- a buildable main branch.

AI must not silently alter approved scope.

## Role Boundaries

- **Steven:** final approval and product priority.
- **ChatGPT:** planning, product interpretation, task definition, audits, acceptance criteria, and review.
- **Codex:** implementation, technical validation, reusable component development, and reporting.
- **Stitch:** visual inspiration and screen concepts.
- **Live Figma:** visual source of truth.

## Operating Principles

AI contributors must:

- inspect the repository before proposing changes;
- read only the documents relevant to the task, plus mandatory governance files;
- use live Figma through MCP for visual implementation;
- reuse existing components and tokens;
- prefer a working end-to-end flow over isolated screen polish;
- keep tasks bounded and changes reviewable;
- make routine technical decisions without escalating avoidable questions;
- report genuine blockers, conflicts, and assumptions;
- keep the application buildable.

## Approval by Exception

AI may proceed without asking Steven about routine implementation details that are already inferable from:

- approved docs;
- live Figma;
- existing code patterns;
- established design tokens;
- platform conventions.

AI must stop and request approval when a change:

- alters product scope or user flow;
- conflicts with `/docs`;
- conflicts with live Figma in a way that cannot be resolved safely;
- introduces significant infrastructure, cost, or dependency changes;
- affects privacy, security, legal, safety, or medical behaviour;
- removes approved functionality.

## Development Workflow

1. Understand the requested outcome.
2. Inspect repository structure and current implementation.
3. Read relevant `/docs`, `/ai`, and Figma references.
4. Confirm the bounded scope and acceptance criteria.
5. Implement using shared components and existing architecture.
6. Validate in browser and on native device where applicable.
7. Review against docs and live Figma.
8. Report files changed, tests run, issues, and next step.
9. Commit only after required approval.

## Governance

This file defines the operating behaviour expected of all AI contributors to Pawly Foundation.
