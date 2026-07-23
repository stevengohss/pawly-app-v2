# Pawly Project Definition

**Document Version:** Foundation v1.3  
**Status:** Active project reference

> **Revision v1.3 — 21 Jul 2026:** Clarified source-of-truth ownership: `/docs` governs approved product and implementation direction; the live Pawly Figma file governs visual design, variables, styles, components, and approved screen direction. Removed the obsolete `PAWLY_APP_v1_3.md` alignment reference.
>
> **Revision v1.2 — 25 Jun 2026:** Removed dependency on a separate `PAWLY_APP` master file.

## Purpose

This document defines the purpose, operating boundaries, governance, and delivery standards for Pawly.

The `/docs` folder is the complete product and implementation reference for Pawly. Together, these documents define approved app sections, functions, launch priorities, interaction language, architecture, and delivery rules.

The live Pawly Figma file is the visual source of truth for design variables, styles, reusable components, visual assets, and approved screen direction. When a visual value in written documentation conflicts with the current approved Figma system, Figma takes precedence and the affected document must be updated.

## Brand Promise

> Every pet has a story. A different one.

Pawly is a pet-parent memory and social-life app. It helps people keep meaningful moments, care for pets, share joy, and connect with people who care about their pets.

## Mission

Create a warm, trusted daily companion where pet parents can preserve their pet’s life story, stay on top of everyday care, and belong to a positive pet community.

## Vision

> To become the place every pet family turns to throughout their journey.

## Product Principle

> Daily care becomes memories. Memories become a life story. Pet parents find belonging in their community.

Every meaningful action should support at least one of these outcomes:

1. Create a moment.
2. Preserve a moment.
3. Bring back a moment.
4. Connect people through a moment.

## Launch Scope

Launch includes:

- Emotional onboarding.
- Basic user and pet identity.
- Today/Home experience.
- Pet Story and Moments.
- External sharing through device share sheet.
- Daily Check-ins.
- Reminders.
- Community Feed.
- Friends & Connections.
- Lost & Found.
- User Profile and Settings.
- Day 1 multilingual and personalised-copy foundations.
- Day 1 reusable navigation and UI-shell foundations.
- Pawly Notices recognition layer.

Launch does not include:

- Full health records.
- Veterinary booking or clinical integrations.
- Marketplace, payments, or partner-commerce.
- Public rewards wallet or points leaderboard.
- Social-account friend matching.
- Full AI advisory experience.

## Product Positioning

Pawly is not a generic tracker, task app, or pet database.

Care tools are important, but they support the wider pet-life story. The emotional centre is:

```text
Capture → Keep → Share → Return
```

## Audience

Primary:

- Dog owners.
- Cat owners.
- Singapore launch market, designed for later global expansion.

Secondary later:

- Multi-pet households.
- Family members and contributors.
- Pet-community organisers.
- Trusted moderators.
- Pet services and partner businesses.

## Operating Roles

- **Steven / Product Manager:** final product priorities and approvals.
- **ChatGPT / Strategic Analyst & Operations Manager:** planning, review, acceptance criteria, documentation alignment, and focused task definition.
- **Stitch / UI-UX Designer:** screen concepts and interaction visuals.
- **Nano Banana / Media Designer:** logos, illustrations, assets, and media.
- **Codex / Programmer:** implementation, testing, component systems, and technical reporting.

No role may silently change approved product scope.

## Delivery Rules

- One approved feature cluster at a time.
- Reusable components before repeated screen duplication.
- No partial feature presented as complete.
- Source-of-truth changes require Steven approval.
- Every significant approved change updates the relevant documentation.
- Main branch stays buildable.
- New implementation work must name exact file paths, scope, validation, and outcome.

## Definition of Done

A feature or component is complete only when:

- Approved scope is implemented.
- Shared components are used where required.
- Browser and relevant native checks pass.
- Documentation is synchronized.
- Acceptance criteria are met.
- Steven approves the result.
- Work is committed in a logical milestone.

## Related Documents

- `02_PRODUCT_VISION.md`
- `03_ARCHITECTURE.md`
- `04_DATABASE.md`
- `05_DESIGN_SYSTEM.md`
- `06_DEVELOPMENT_GUIDE.md`
- `07_PRD.md`
- `08_ROADMAP.md`
- `09_BRAND_ASSETS.md`
