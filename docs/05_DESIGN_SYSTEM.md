# Pawly Design System

**Document Version:** Foundation v1.3  
**Status:** Active visual and interaction reference

> **Revision v1.3 — 21 Jul 2026:** Aligned documented colour, spacing, shape, and typography references with the current approved Figma variables and styles. Added explicit Figma visual-precedence rules.
>
> **Revision v1.2 — 25 Jun 2026:** Removed dependency on a separate `PAWLY_APP` master file. This document forms part of the `/docs` product and implementation source-of-truth set.

## Purpose

This document defines the visual, interaction, component, and brand standards for Pawly.

The live Pawly Figma file is authoritative for exact visual values, variable aliases, styles, reusable components, and approved screen direction. This document explains the intended system and must be updated whenever approved Figma decisions materially change it.

## Experience Principles

Pawly should feel:

- Warm.
- Personal.
- Calm.
- Gently reliable.
- Modern but tactile.
- Emotionally meaningful, never clinical or gamified.

Do not make Pawly look like a medical dashboard, task tracker, generic social network, or shopping app.

## Brand Colours

Use the semantic Figma variables in implementation. Do not hard-code primitive palette values when an approved UI or Brand token exists.

| Figma semantic reference | Resolved value | Use |
|---|---:|---|
| `Brand/Color/Primary/default` | `#D97757` | Primary action and core brand expression |
| `Brand/Color/Primary/700` | `#9B543E` | Strong terracotta emphasis |
| `Brand/Color/Secondary/default` | `#FDECE8` | Gentle secondary and active surfaces |
| `Brand/Color/Success/default` | `#6B8F6B` | Care and supportive accent |
| `Brand/Color/Success/700` | `#4C664C` | Strong sage text and action |
| `Brand/Color/Text Primary/default` | `#55433D` | Warm primary body text |
| `Brand/Color/Text Secondary/default` | `#1A1C1A` | Strong alternate text |
| `Brand/Color/Neutral/default` | `#FAF9F6` | Main page background |
| `UI/Color/Surface/default` | `#FFFFFF` | Standard cards and raised content |
| `UI/Color/Surface/alternate` | `#FCFBF8` | Subtle alternate surfaces |
| `UI/Color/Border/divider` | `#E4E3DF` | Dividers and quiet separation |

The Base → Brand → UI alias chain must be preserved. Components should consume UI tokens wherever an applicable token exists.

Use flat production brand fills for logo assets. Do not use accidental PNG texture, white fringe, or presentation shadows in final assets.

## Typography

- **Display and headings:** Quicksand.
- **Body, labels, UI text:** Plus Jakarta Sans.
- The exported Base variable may use the shorthand value `Jakarta`; implementation must map this to the full font family `Plus Jakarta Sans`.
- **Brand wordmark:** custom Pawly logo artwork only; do not substitute UI font for the logo.

Suggested hierarchy:

- Display / large showcase title: 28/34 maximum, 700.
- Screen title: 24/30, 700.
- Section title: 20-22px, 600.
- Card title: 17-18px, 600.
- Body: 15-16px.
- Secondary text: 13-14px.
- Navigation label: 11-12px.
- Button label: 15-16px.

Avoid oversized headings in normal product UI. Reserve generous display scale for intentional emotional or empty-state moments.

## Spacing and Shape

Exact values follow the current approved Figma UI variables.

- Base spacing system: 4px.
- Standard screen horizontal padding: 16px.
- Standard screen vertical padding: 16px.
- Standard card padding: 24px horizontal and vertical.
- Standard card corner radius: 24px.
- Standard chip corner radius: 24px.
- Standard input radius: 8px; large input radius: 12px.
- Standard button and icon-button radius: circular/pill (`999px` design token).
- Bottom sheet radius: 32px.
- Component-specific padding, gap, radius, size, and border values must use the applicable UI variables rather than inferred literals.

Directional padding tokens and optical adjustments are valid where intentionally defined in Figma. For locked-aspect icons and avatars, one token-bound dimension plus a derived matching dimension is acceptable.

## Depth

Use subtle ambient depth only.

- Level 1: warm low-opacity shadow / blur.
- Level 2: modest stronger shadow for floating layers.
- Avoid dark heavy card borders and excessive drop shadows.

## Reusable Components

### PawlyTopBar

Configurable:

- show/hide
- title
- subtitle
- left action
- right actions
- transparent/solid
- floating/fixed
- scroll behaviour

Typical actions: menu/profile, search, and notifications.

Standard top bars should remain compact and content-led. Search and notifications may open reusable top panels directly below the bar. Ask Pawly / AI is not part of the standard top bar.

### PawlyBottomNav

Approved visual direction:

```text
Today | Moments | Add | Care | Explore
```

Rules:

- Five equal layout zones.
- Icon above label for Today, Moments, Care, Explore.
- Active state uses colour and compact icon treatment only.
- Active state never changes zone width or pushes other controls.
- Centre Add is a raised Terracotta Clay action, fixed at horizontal centre.
- Add has no label.
- Labels remain visible for discoverability and bilingual use.

### PawlyDrawerMenu

Warm Linen White panel with:

- User Profile.
- My Pets.
- Add Pet.
- Today’s Agenda.
- Notifications.
- My Profile.
- Settings.
- Sign Out with app version.

Human profile imagery uses rounded-square treatment. Pet profile imagery remains circular.

### PawlyQuickActions

Warm bottom sheet with:

- Add a Moment.
- Daily Check-in.
- Create Reminder.
- Share a Post.
- Report Lost / Found Pet.

Make Add a Moment the strongest visual action.

### PawlyNoticeOverlay

A small, gentle acknowledgement overlay. It is not a gamified modal, wallet, or public score.

### Other Shared Components

- PawlyCard
- PawlySectionHeader
- PawlyButton
- PawlyIconButton
- PawlyEmptyState
- Inputs
- Text areas
- Bottom sheets
- Confirmation states
- Loading states

## Navigation Behaviour

Content-led screens may hide top/bottom navigation while scrolling down and restore them on upward scroll.

Do not hide critical controls on:

- onboarding
- authentication
- forms
- settings
- chat
- reminder detail
- critical task flows

## Pawly Language

User-facing content must feel personal and purposeful.

Prefer:

- “Who’s this lovely one?”
- “What should we call them?”
- “When do we celebrate Bella?”
- “What happened today that you would like to keep?”
- “What would you like Pawly to help you remember?”

Avoid raw system language unless precision is required.

Critical actions, medical wording, privacy controls, Lost & Found details, and errors must be plain and unambiguous.

## Internationalisation

- English and Chinese from Day 1.
- Translation foundations live in `lib/i18n` with array-based values and helpers such as `t()` and `tRandom()`.
- All user-facing strings use translation keys.
- Only warm non-critical copy may have controlled variants.
- One-item arrays are valid for fixed strings.
- No variation for critical labels, actions, errors, legal/privacy text, or safety language.

## Brand Assets

Primary app icon:

- Terracotta rounded-square.
- White paw.
- White dog + cat + heart inside main paw pad.

Secondary light icon:

- Linen White rounded-square.
- Terracotta version of same mark.

Wordmarks:

- Full wordmark: heart in `a`, pet detail in `w`.
- Simplified wordmark: heart in `a` only for compact use.

Use asset masters from the brand folder; never recreate logo geometry in UI code.

## Accessibility

- Maintain strong contrast.
- Keep touch targets usable.
- Do not rely on icon alone for primary destinations.
- Support screen readers with labels.
- Use scalable text-friendly layouts.
- Preserve hierarchy across English and Chinese.
