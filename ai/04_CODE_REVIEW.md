# Pawly Code Review Guide

**Document Version:** Foundation v1.1  
**Status:** Active review reference

> **Revision v1.1 — 21 Jul 2026:** Expanded review coverage for live Figma fidelity, product flow, bilingual UI, native behaviour, security, and evidence-based validation.

## Purpose

This document defines how Pawly implementation work is reviewed before approval and commit.

## Review Sources

Review against:

1. the approved task and acceptance criteria;
2. relevant `/docs`;
3. live Figma;
4. existing architecture and component conventions;
5. actual test and validation evidence.

## Review Checklist

### Scope

- Only approved work was implemented.
- No silent product-flow changes were introduced.
- No later-roadmap features were added.
- Unrelated refactors are absent or explicitly justified.

### Architecture

- Expo, TypeScript, Expo Router, and existing project conventions are followed.
- Screens do not access database tables directly.
- Shared UI remains outside feature domains.
- Feature logic and presentation are separated.
- No unnecessary dependency or parallel source of truth was introduced.

### Reusability

- Existing shared components are reused.
- Repeated UI is not duplicated.
- Variants are typed and maintainable.
- Component contracts support required states.

### Figma and Visual Quality

- Relevant live Figma nodes were inspected.
- Layout, hierarchy, typography, spacing, colour, radius, and component states follow live Figma.
- Stitch-generated structures were translated into project conventions rather than copied blindly.
- Local Figma exports were not treated as newer than live Figma.
- Optical exceptions are not incorrectly reported as token failures.

### Product Experience

- Behaviour matches the PRD and product vision.
- Pawly feels warm, personal, calm, and non-clinical.
- Care supports the pet story rather than overwhelming it.
- User-facing terminology uses Moment, Pet Story, Today, Care, and Explore consistently.
- Empty states guide users rather than expose dead ends.

### Internationalisation

- User-facing strings use translation keys.
- English and Chinese layouts were checked where relevant.
- Critical wording is deterministic.
- Navigation labels do not change slot widths.

### Accessibility

- Touch targets are usable.
- Controls have accessible names and roles.
- Primary navigation does not rely on icons alone.
- Text scaling and focus behaviour remain usable.

### Security and Privacy

- RLS and trusted-server boundaries are respected.
- Sensitive credentials and raw identifiers are not exposed.
- Private data defaults private.
- Logs and errors do not leak sensitive information.

### Code Quality

- Types are meaningful.
- `any` and unsafe assertions are avoided.
- Logic is readable and not duplicated.
- Errors are handled explicitly.
- Naming matches project conventions.

### Validation

- Reported commands were actually run.
- Type check and lint pass where available.
- Relevant tests pass.
- Expo Web was reviewed.
- Native-only checks were completed when required.
- Empty/loading/error states were exercised.
- No unverified claim is presented as passing.

### Documentation and Git

- Relevant docs were updated only when accepted behaviour or architecture changed.
- File changes are fully reported.
- The proposed commit is one logical milestone.
- Main remains buildable.

## Review Outcome

Classify findings as:

- **Blocker:** cannot approve or merge.
- **Required:** must fix before completion.
- **Follow-up:** valid improvement that does not block current scope.
- **Accepted exception:** intentional and documented.

A task is ready for Steven’s review only when blockers and required issues are resolved.

## Governance

This guide applies to human and AI reviews of Pawly implementation work.
