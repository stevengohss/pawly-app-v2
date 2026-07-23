# Pawly System Architecture

**Document Version:** Foundation v1.3  
**Status:** Active technical architecture reference

> **Revision v1.3 — 21 Jul 2026:** Aligned the standard top-bar actions with the approved Figma/design-system direction; Ask Pawly is not a standard top-bar action.
>
> **Revision v1.2 — 25 Jun 2026:** Removed dependency on a separate `PAWLY_APP` master file. This document forms part of the `/docs` product and implementation source-of-truth set.

## Purpose

This document defines the technical architecture and implementation boundaries for Pawly.

## Architecture Principles

- One universal Expo codebase for iOS, Android, and browser preview.
- Shared UI components instead of repeated copied screen structures.
- Feature logic separated from presentation.
- Supabase as backend platform.
- Type-safe interfaces and explicit state ownership.
- Development-only tools isolated from production users.
- Privacy and consent by default.

## Technology Direction

| Layer | Current Direction |
|---|---|
| Mobile + Web | React Native with Expo |
| Language | TypeScript |
| Routing | Expo Router |
| Browser preview | Expo Web |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Notifications | Expo Notifications |
| Local UI state | React hooks / existing app conventions |
| Shared client state | Zustand where needed |
| Remote data | TanStack Query where needed |

Keep existing project choices unless an approved technical change is made.

## Universal Development Model

```text
One Pawly codebase
├── Browser preview for rapid visual review
├── iPhone / Expo development workflow for native checks
└── Shared components used across platforms
```

Do not create a separate web-only Pawly app that later needs recreation as a mobile app.

## Application Layers

```text
Routes / Screens
↓
Feature Components
↓
Shared UI Components
↓
Feature Services
↓
Supabase Client / Server Functions
↓
PostgreSQL + Storage
```

Screens should not communicate directly with database tables.

## Shared UI Shell

The following reusable components are core architecture, not optional screen decoration:

- `PawlyTopBar`
- `PawlyBottomNav`
- `PawlyDrawer`
- `PawlyQuickActions`
- `PawlyCard`
- `PawlySectionHeader`
- `PawlyButton`
- `PawlyIconButton`
- `PawlyEmptyState`
- `PawlyNoticeOverlay`

A private development-only UI Lab may expose isolated examples of these components for browser review.

## Navigation Architecture

### Top Bar

Supports configurable screen-level options:

- show/hide
- title/subtitle
- left action
- right actions
- transparent/solid surface
- floating/fixed mode
- scroll-hide enabled/disabled

Typical standard actions include menu/profile, search, and notifications. Ask Pawly / AI is not part of the standard top bar and must use an explicitly approved feature entry point when introduced.

### Bottom Navigation

Visual implementation direction:

```text
Today | Moments | Add | Care | Explore
```

Rules:

- Five equal fixed-width zones.
- Icon above label for non-centre destinations.
- Active state changes colour/background only, never layout width.
- Centre Add button is visually raised and anchored at screen centre.
- Add opens `PawlyQuickActions`.
- Profile is accessed through the drawer, not a primary tab.

### Drawer

Contains pets, agenda, notifications, profile, and settings.

Development-only admin tools may be visible only to authorised development users and must never ship for standard production users.

## Scroll Behaviour

On content-led feeds such as Today, Moments, and Explore:

- Top bar and bottom nav can hide gently on downward scroll.
- They return on upward scroll.
- The raised Add button moves with bottom navigation.

On task, form, onboarding, authentication, settings, chat, and critical flows:

- Keep relevant controls stable and visible.

## Internationalisation and Personalised Copy

All user-facing content must use translation keys.

Supported launch languages:

- English
- Chinese

Translation values are arrays:

- One value = fixed wording.
- Multiple values = approved warm variants.

Variation rules:

- Use only for non-critical copy.
- Stabilise variation by session or day.
- Do not randomise labels, destructive actions, errors, legal/privacy text, medical text, Lost & Found text, or navigation labels.
- Support context-driven choice based on state such as pet count.
- Reuse user name and pet name variables consistently.

## Feature Domains

Recommended boundaries:

```text
features/
  auth/
  onboarding/
  pets/
  home/
  moments/
  care/
  reminders/
  explore/
  community/
  lost-found/
  connections/
  notices/
  profile/
```

Shared UI remains outside feature domains.

## Security Boundaries

- Supabase Row Level Security is mandatory.
- Private pet data is visible only to permitted users.
- Connections, invites, contact matching, QR codes, and blocked-user status must be server-validated.
- No raw user IDs in public URLs or QR payloads.
- Reward/recognition eligibility must be evaluated in trusted backend logic, not client-only code.

## Native-Only Validation Areas

Browser preview is useful for layout and interaction review. iPhone testing remains required for:

- Camera and QR scanning.
- Contact permission and contact matching.
- Notifications.
- Native share sheet.
- Deep links.
- Keyboard and text input behaviour.
- Date pickers.
- Safe areas.
- Native scrolling/performance.
