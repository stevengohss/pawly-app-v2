# Pawly Coding Rules

**Document Version:** Foundation v1.1  
**Status:** Active coding reference

> **Revision v1.1 — 21 Jul 2026:** Added live-Figma implementation rules, Expo-specific boundaries, translation requirements, testing expectations, and AI decision discipline.

## Purpose

This document defines coding rules for human developers and AI coding agents working on Pawly.

## Required References

- `../docs/03_ARCHITECTURE.md`
- `../docs/04_DATABASE.md`
- `../docs/05_DESIGN_SYSTEM.md`
- `../docs/06_DEVELOPMENT_GUIDE.md`
- `../design/figma/FIGMA_REFERENCE.md`

## General Principles

- Follow the approved architecture.
- Prefer simple, readable, maintainable code.
- Keep changes focused on the approved task.
- Do not introduce unnecessary dependencies.
- Preserve a buildable application.
- Reuse before creating.
- Complete vertical behaviour, not only appearance.

## Repository Inspection

Before editing:

- inspect existing routes, components, hooks, services, styles, and tests;
- identify existing patterns before introducing new ones;
- check package scripts and available validation commands;
- confirm whether a shared component already exists.

Do not assume paths or architecture from a prompt when the repository shows otherwise.

## Figma Implementation

For visual work:

- inspect the exact Figma node through MCP;
- use live variables and styles where accessible;
- map Figma concepts into the project’s React Native and Expo patterns;
- do not copy Stitch or generated Tailwind output literally;
- do not install Tailwind unless explicitly approved;
- reuse Pawly shared components and tokens;
- treat `/design/figma` exports as supporting snapshots;
- report any mismatch between live Figma and local exports.

Exact visual values should come from live Figma rather than stale written values.

## Component Rules

- Build repeated UI once as a shared component.
- Keep one clear responsibility per component.
- Separate presentation, feature logic, and data access.
- Prefer composition over large monolithic screens.
- Expose variants through typed props.
- Include empty, loading, disabled, error, and accessibility states where relevant.
- Do not label production UI as placeholder or temporary.

## TypeScript

- Use TypeScript throughout.
- Prefer explicit domain types.
- Avoid `any`; justify any unavoidable use.
- Keep shared interfaces centralized where appropriate.
- Use discriminated unions for meaningful UI states.
- Avoid unsafe type assertions.

## State and Data

- Use React hooks for local UI state.
- Use Zustand only for genuinely shared client state.
- Use TanStack Query where remote state benefits from caching and lifecycle handling.
- Keep feature services between screens and database access.
- Screens must not communicate directly with database tables.
- Do not duplicate sources of truth.
- Use local sample data only when the task explicitly permits it.

## Supabase and Security

- Respect Row Level Security requirements.
- Never expose service-role credentials in client code.
- Do not expose raw user IDs in public links or QR payloads.
- Keep sensitive validation in trusted backend paths.
- Treat private data as private by default.
- Report any security uncertainty before implementation.

## Internationalisation

- Do not hard-code production user-facing strings.
- Use shared translation keys.
- Support English and Chinese layouts.
- Keep critical wording deterministic.
- Use controlled copy variants only for approved non-critical warm text.
- Verify labels do not cause navigation-width changes.

## Error Handling

- Validate inputs.
- Handle expected failures visibly and gracefully.
- Use plain language for critical, privacy, safety, Lost & Found, and medical-related errors.
- Never silently swallow errors.
- Log enough diagnostic context without exposing sensitive user data.

## Accessibility

- Use accessible labels and roles.
- Preserve usable touch targets.
- Do not rely on icon alone for primary destinations.
- Support scalable text-friendly layouts.
- Preserve focus and keyboard behaviour on web.
- Test screen-reader meaning for shared controls where applicable.

## File Changes

- Name exact files created, modified, and removed.
- Avoid unrelated edits and speculative refactors.
- Do not remove routes, screens, or legacy code unless approved.
- Keep shared changes backward-compatible where practical.
- Update docs only when the accepted behaviour, architecture, or system changes.

## Validation

Use the repository’s actual scripts. At minimum, where available:

- type check;
- lint;
- relevant tests;
- Expo Web visual review;
- English and Chinese UI checks;
- empty/loading/error states;
- native validation for camera, date pickers, keyboard, notifications, share sheet, deep links, safe areas, and native scrolling.

## AI Behaviour

AI contributors must:

- make routine technical decisions from docs, Figma, and existing code;
- avoid asking unnecessary implementation questions;
- clearly state assumptions;
- stop for genuine product, scope, security, or architecture conflicts;
- provide a concise final report;
- never claim a validation passed when it was not run.

## Governance

These rules apply to all Pawly implementation work.
