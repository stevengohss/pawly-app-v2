# Pawly AI Task Template

**Document Version:** Foundation v1.1  
**Status:** Active task-execution template

> **Revision v1.1 — 21 Jul 2026:** Replaced the generic workflow with a bounded implementation-bundle template suitable for ChatGPT and Codex.

## Purpose

This document defines the standard structure and execution workflow for Pawly implementation tasks.

## Task Definition

Every task should include:

### 1. Objective

State the concrete user-visible or technical outcome.

### 2. Source of Truth

List the relevant:

- `/docs` files;
- `/ai` files;
- live Figma file/page/node links;
- local `/design/figma` exports;
- existing code areas.

### 3. Scope

List exactly what must be implemented.

### 4. Out of Scope

List features, redesigns, refactors, and later-phase work that must not be included.

### 5. Repository Boundaries

Specify:

- expected files or directories;
- areas that may be inspected;
- areas that must not be changed without reporting first.

Do not force incorrect paths when repository inspection reveals a different established structure.

### 6. Behaviour and Interaction

Describe:

- routes;
- state changes;
- navigation;
- persistence;
- form behaviour;
- animations;
- empty/loading/error states;
- accessibility;
- bilingual requirements.

### 7. Visual References

State:

- live Figma node IDs;
- approved components and variables;
- whether a Stitch screen is inspiration only;
- any known visual decisions.

### 8. Acceptance Criteria

Write observable completion conditions.

### 9. Validation

Specify repository scripts and manual checks.

### 10. Final Report

Require:

- summary;
- files created/modified/removed;
- decisions made;
- tests and commands run;
- browser/native checks completed;
- known issues;
- screenshots or routes for review where applicable;
- recommended commit message.

## Standard Execution Workflow

### Step 1 — Inspect

- Inspect the repository.
- Read mandatory governance files.
- Read only the task-relevant product documents.
- Inspect the relevant live Figma nodes.
- Identify reusable components and existing patterns.

### Step 2 — Plan

Before editing, produce a concise internal plan covering:

- architecture;
- files;
- shared components;
- data/state ownership;
- validation.

Do not return a large planning essay unless the user asks for it.

### Step 3 — Implement

- Implement the complete bounded scope.
- Reuse shared components.
- Keep the project buildable.
- Avoid unrelated refactors.
- Do not silently change approved flow or visuals.

### Step 4 — Validate

- Run available automated checks.
- Review affected screens in Expo Web.
- Validate native-only behaviour where required.
- Test important UI states.
- Compare against live Figma and relevant docs.

### Step 5 — Deliver

Report only what was actually completed and validated.

## Parallel Work Rule

Parallel agents may work only when:

- responsibilities are clearly separated;
- they do not edit the same shared files;
- branches or worktrees prevent collisions;
- one track owns integration.

Shared navigation, tokens, and core component files must have one owner at a time.

## Blocker Rule

Continue with reasonable defaults unless a blocker affects:

- product scope;
- architecture;
- privacy or security;
- cost or infrastructure;
- destructive changes;
- an irreconcilable Figma/docs conflict.

## Governance

This template should be used for all significant Codex implementation bundles.
