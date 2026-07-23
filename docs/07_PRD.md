# Pawly Product Requirements Document

**Document Version:** Foundation v1.3  
**Status:** Active launch functional requirements reference

> **Revision v1.3 — 21 Jul 2026:** Clarified launch multi-pet behaviour: onboarding establishes the first pet, while additional pets can be added and managed later through the profile/drawer flow within launch scope.
>
> **Revision v1.2 — 25 Jun 2026:** Removed dependency on a separate `PAWLY_APP` master file. This document forms part of the `/docs` product and implementation source-of-truth set.

## Purpose

This document defines approved functional requirements for the Pawly launch scope. Screen and function references are organized by product module within this documentation set.

## Launch Product Modules

1. Emotional onboarding and identity.
2. Home / Today.
3. Moments and Pet Story.
4. Daily Check-ins.
5. Reminders.
6. Community Feed.
7. Friends & Connections.
8. Lost & Found.
9. Profile and Settings.
10. Shared navigation/UI foundations.
11. Internationalisation and personalised copy foundations.
12. Pawly Notices recognition layer.

AI remains Launch Later / controlled rollout.

## 1. Onboarding and Identity

### Requirements

- Brief splash and emotional intro.
- Explain Capture & Share, Bring Back Moments, and Belong.
- Create basic pet profile conversationally.
- Create minimal user profile.
- Allow non-essential profile completion later.
- Establish the first pet during onboarding.
- Allow additional pets to be added and managed after onboarding through the profile/drawer flow.

### Acceptance Criteria

- User can enter Pawly without completing a long administrative form.
- The first pet identity is established before heavy account data collection.
- Users can add another pet after onboarding without repeating the full first-time user onboarding flow.
- Onboarding copy uses Pawly interaction language.
- Required native input and date controls work correctly on device.

## 2. Home / Today

### Requirements

- Current pet context.
- Warm personalised greeting.
- Daily check-in prompt.
- Upcoming tasks.
- Recent moment or memory preview.
- Community preview.
- Lost & Found shortcut.
- Notifications entry.
- Empty states when no data exists.

### Acceptance Criteria

- Home feels like a living pet-life feed, not a health-statistics dashboard.
- Navigation shell is shared/reusable.
- Home remains usable with zero, one, or multiple pets.

## 3. Moments and Pet Story

### Create a Moment

Users can:

- add media
- add caption
- choose date
- optionally add location text
- choose intended visibility
- save to pet story

### Pet Story

Users can:

- view moments chronologically
- see manual moments
- see relevant check-in and reminder-completion moments
- view milestones and photos

### External Sharing

Users can:

- generate a shareable Pawly memory card
- use device share sheet
- choose whether a moment stays private, appears in Pawly community, or is shared outside Pawly

### Acceptance Criteria

- Moment creation produces a pet-story item.
- External sharing remains optional.
- Pawly maintains the original story; external interaction syncing is not assumed.
- Story language never calls the experience an activity log.

## 4. Daily Check-ins

Users can record:

- mood
- energy
- appetite
- activity
- optional note
- optional photo

### Acceptance Criteria

- One intended check-in per pet per day.
- Check-in is stored chronologically.
- Check-in may create a gentle story item.
- UI does not frame it as repetitive point farming.

## 5. Reminders

Users can:

- create reminders
- edit
- pause
- complete
- view history
- use daily/weekly/monthly/yearly repeat rules

### Acceptance Criteria

- Today’s Agenda clearly shows relevant reminders.
- Completion history is preserved.
- Completion can generate a story/care moment where appropriate.
- Native notifications are tested separately from browser preview.

## 6. Community Feed

Users can:

- create photo-led posts
- optionally attach a pet
- view posts
- react
- comment
- view community profiles
- share posts externally where supported

### Acceptance Criteria

- Community supports pet-parent belonging rather than generic engagement farming.
- Visibility rules are enforced.
- Empty and moderation-sensitive states are handled clearly.

## 7. Friends & Connections

### Launch Methods

- Native-share invitation.
- QR friend connect.
- Optional contact-book matching.

### Requirements

- All connections require recipient approval.
- Invite links use secure tokens and may be revoked/expired.
- QR scan identifies intended connection before a request is sent.
- Contact matching is opt-in.
- No bulk invite-all action.
- Request recipient can accept, decline, block.
- Sender can cancel outgoing request.
- Repeated requests are limited.

### Acceptance Criteria

- No connection is active without recipient acceptance.
- No raw user identifiers are exposed in invite/QR flow.
- Blocked users cannot repeatedly contact/discover the blocker.
- Contact access can be disconnected.

## 8. Lost & Found

Users can:

- create Lost, Found, or Seen reports
- add image and location text
- choose contact preference
- view active reports
- mark report resolved/reunited

### Acceptance Criteria

- Details are clear enough to aid reunification.
- Safety, privacy, and contact wording are precise.
- Report status updates are reflected in the app.

## 9. Profile and Settings

Users can:

- view/edit basic profile
- manage pets
- open pet story
- access settings
- sign out

Launch Later:

- fuller privacy/security centre
- expanded discoverability controls
- blocked user list management

## 10. Shared Navigation and UI

### Requirements

- `PawlyTopBar`, `PawlyBottomNav`, drawer, and quick-actions are reusable.
- Bottom nav uses five fixed slots: Today, Moments, Add, Care, Explore.
- Add opens quick actions.
- Drawer includes pets, agenda, notifications, profile, settings.
- Scroll-hide applies only to appropriate content-led screens.

### Acceptance Criteria

- Active state never changes navigation slot widths.
- Centre Add remains visually centred.
- English and Chinese labels fit without layout shifts.
- Admin tools are hidden from normal users/production.

## 11. Languages and Personalised Copy

### Requirements

- English and Chinese launch foundation.
- Translation-key based copy.
- Array values supported for approved warm variants.
- Variants stable by session/day.
- Context-based copy support using user/pet/pet-count state.

### Acceptance Criteria

- Critical text is deterministic.
- No hard-coded UI strings in production components.
- Copy falls back predictably.

## 12. Pawly Notices

### Requirements

- Quiet recognition rather than public gamification.
- May show acknowledgement overlay, badge, or private reward offer.
- Eligibility based on meaningful/verified outcomes.
- No public wallet, leaderboard, task list, or guaranteed action-to-points promise.

### Eligible examples

- genuine care rhythm
- first meaningful milestones
- approved helpful contribution
- verified completed community event
- appointed trust role
- selected birthday/gotcha-day surprise

### Acceptance Criteria

- Recognition cannot be client-granted.
- Suspicious/spammy activity can be delayed, declined, or reversed.
- Reward offers are private and may be limited by campaign/stock/location.
- Rewards are non-transferable and no-cash-value at launch.

## Out of Scope at Launch

- Full health record suite.
- Vet booking and integrations.
- Marketplace and payments.
- Partner spend rewards.
- Social-account friend matching.
- Public reward wallet.
- Full AI advisor.
