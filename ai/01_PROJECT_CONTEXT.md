# Pawly Project Context

**Document Version:** Foundation v1.1  
**Status:** Active AI project-context reference

> **Revision v1.1 — 21 Jul 2026:** Updated product positioning, launch modules, terminology, navigation, AI scope, and Figma authority to match the current Pawly source of truth.

## Purpose

This document gives AI coding contributors the essential context needed to make correct implementation decisions.

It complements `/docs`; it does not replace it.

## Required Product References

- `../docs/01_PROJECT.md`
- `../docs/02_PRODUCT_VISION.md`
- `../docs/03_ARCHITECTURE.md`
- `../docs/04_DATABASE.md`
- `../docs/05_DESIGN_SYSTEM.md`
- `../docs/06_DEVELOPMENT_GUIDE.md`
- `../docs/07_PRD.md`
- `../docs/08_ROADMAP.md`
- `../docs/09_BRAND_ASSETS.md`
- `../design/figma/FIGMA_REFERENCE.md`

## Project Summary

Pawly is a warm, story-led pet-parent companion that helps people:

- preserve meaningful pet moments;
- manage everyday care;
- reconnect with memories;
- share joy;
- find belonging in a positive pet community.

Pawly is not primarily a medical record, generic checklist, pet database, or generic social network.

## Core Product Loop

```text
Capture → Keep → Share → Return
```

Meaningful product decisions should help users:

1. create a moment;
2. preserve a moment;
3. bring back a moment;
4. connect people through a moment;
5. meaningfully improve pet care or safety.

## Launch Modules

- Emotional onboarding and identity.
- Home / Today.
- Moments and Pet Story.
- Daily Check-ins.
- Reminders and Today’s Agenda.
- Community Feed.
- Friends & Connections.
- Lost & Found.
- Profile and Settings.
- Shared navigation and UI foundations.
- English and Chinese foundations.
- Pawly Notices recognition layer.

Full AI advisory is not a launch-core module.

## Approved Navigation

```text
Today | Moments | Add | Care | Explore
```

- Add is a raised centre action.
- Add opens Pawly Quick Actions.
- Profile is accessed through the drawer.
- The drawer contains pets, agenda, notifications, profile, and settings.

## Technology Context

- React Native with Expo.
- TypeScript.
- Expo Router.
- Expo Web for rapid browser review.
- Supabase for backend, authentication, storage, and PostgreSQL.
- React hooks for local state.
- Zustand only where shared client state is needed.
- TanStack Query where remote state benefits from it.

## Visual Context

Live Figma is the visual source of truth for:

- variables;
- styles;
- shared components;
- approved assets;
- screen direction;
- spacing, sizing, radius, colour, and typography usage.

Local JSON and PDF exports in `/design/figma` are snapshots for Codex access and auditing. They do not override newer live Figma values.

Stitch-imported screens are inspiration and are not automatically implementation-ready.

## Terminology

Use these product terms consistently:

- **User:** authenticated account holder.
- **Pet:** an individual dog or cat profile.
- **Moment:** a manual or system-generated item in a pet’s story.
- **Pet Story:** chronological collection of Moments.
- **Daily Check-in:** daily wellbeing entry for a pet.
- **Reminder:** scheduled care activity.
- **Today’s Agenda:** relevant due and upcoming reminders.
- **Community Post:** content shared in the Pawly community.
- **Connection:** accepted relationship between Pawly users.
- **Lost & Found Report:** Lost, Found, or Seen pet report.
- **Care Circle:** shared pet access or collaboration, when implemented.
- **Pawly Notice:** quiet acknowledgement or recognition, not public gamification.

Do not use “Timeline Event” or “Pet Diary” as the primary user-facing name where “Moment” or “Pet Story” is intended.

## Delivery Priorities

AI contributors should prioritize:

- reusable shared components;
- complete vertical slices;
- visible working progress;
- browser-first visual review;
- native validation for native behaviours;
- minimal duplication;
- no unnecessary scope expansion;
- a buildable repository.

## Current Acceleration Principle

Do not wait for every inspiration screen to be redesigned before implementation.

Use:

- `/docs` for intent and behaviour;
- live Figma for visual truth;
- existing code for implementation conventions;
- Codex for implementation;
- ChatGPT for task definition and review.

## Governance

This document provides baseline context only. Detailed requirements remain in `/docs`.
