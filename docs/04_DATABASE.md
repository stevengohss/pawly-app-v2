# Pawly Database Design

**Document Version:** Foundation v1.2  
**Status:** Active conceptual data-model reference

> **Revision v1.2 — 25 Jun 2026:** Removed dependency on a separate `PAWLY_APP` master file. This document now forms part of the sole `/docs` source-of-truth set.

## Purpose

This document defines the conceptual data model for Pawly’s approved launch direction. Exact SQL schema, migrations, indexes, and policies must follow this model and be reviewed before implementation.

## Platform

- PostgreSQL via Supabase.
- Supabase Auth for identity.
- Supabase Storage for media.

## Design Principles

- UUID primary keys.
- `created_at` and `updated_at` on mutable records.
- Server-side enforcement for sensitive workflows.
- Clear ownership and visibility boundaries.
- Private records default private.
- Public identifiers/tokens must not expose raw account IDs.
- Event and recognition history should be auditable.

## Core Identity

### profiles

Represents a Pawly user profile.

Suggested fields:

- `id` (references authenticated user)
- `display_name`
- `avatar_url`
- `locale`
- `is_admin`
- `is_contact_discoverable`
- timestamps

### pets

Represents a pet profile.

Suggested fields:

- `id`
- `owner_id`
- `name`
- `species`
- `breed`
- `gender`
- `birth_date`
- `age_text`
- `personality_tags`
- `about`
- `photo_url`
- timestamps

A user can own multiple pets.

## Moments and Story

### moments

Represents a manually created or system-generated story item.

Suggested fields:

- `id`
- `pet_id`
- `author_id`
- `type` (`manual`, `check_in`, `reminder_completed`, `milestone`, `system`)
- `caption`
- `occurred_at`
- `location_text`
- `visibility` (`private`, `community`, `external_share`)
- `source_reference`
- timestamps

### moment_media

Media attached to a moment.

### share_links

Optional secure links or records for externally shared moment cards.

Do not assume external platform engagement can be imported into Pawly.

## Care

### daily_check_ins

Suggested fields:

- `id`
- `pet_id`
- `author_id`
- `check_in_date`
- `mood`
- `energy`
- `appetite`
- `activity`
- `note`
- `photo_url`
- timestamps

Enforce one intended daily check-in per pet/date according to approved product rules.

### reminders

Suggested fields:

- `id`
- `pet_id`
- `owner_id`
- `title`
- `description`
- `schedule_type`
- `schedule_data`
- `next_due_at`
- `is_paused`
- timestamps

### reminder_completions

Stores completion history. Completion may generate a related moment.

## Community

### community_posts

- `id`
- `author_id`
- `pet_id` (optional)
- `caption`
- `visibility`
- timestamps

### community_post_media

### comments

### reactions

Keep community moderation/reporting implementation scoped separately before launch.

## Lost & Found

### lost_found_reports

Suggested fields:

- `id`
- `author_id`
- `report_type` (`lost`, `found`, `seen`)
- `status` (`active`, `resolved`)
- `pet_description`
- `image_url`
- `location_text`
- `contact_preference`
- timestamps

## Friends and Connections

### connection_requests

Suggested fields:

- `id`
- `sender_id`
- `receiver_id`
- `source` (`invite_link`, `qr_scan`, `contact_match`, `search`)
- `status` (`pending`, `accepted`, `declined`, `blocked`, `cancelled`)
- timestamps

A connection becomes active only after recipient approval.

### connections

A stable accepted relationship. Store one canonical relationship record with deterministic user ordering or a clear unique constraint.

### invite_links

Suggested fields:

- `id`
- `inviter_id`
- `token_hash`
- `purpose`
- `expires_at`
- `revoked_at`
- timestamps

Never store or expose raw token values beyond the intended creation/validation path.

### qr_connect_tokens

Regenerable, secure, non-guessable connection tokens for QR use.

### contact_discovery_consents

Stores permission state and consent timestamps. Do not persist more contact data than required for approved matching logic.

### blocked_users

Blocks future requests and hides discoverability according to product rules.

## Pawly Notices and Recognition

### recognition_events

Records evaluated recognition outcomes.

Suggested fields:

- `id`
- `user_id`
- `pet_id` (optional)
- `recognition_type`
- `reason`
- `source_type`
- `source_id`
- `points_value` (internal; not necessarily public)
- `status` (`pending`, `granted`, `reversed`, `expired`)
- `granted_at`
- timestamps

### badges

Defines recognition badges and trust roles.

### user_badges

### reward_offers

Private surprise/voucher/goodie offers.

### reward_redemptions

Tracks redemption form submissions and fulfilment status.

Recognition logic must be server-side and auditable. No client-side direct granting.

## Notifications

### notifications

Supports reminders, connection requests, community interactions, Lost & Found updates, and private Pawly Notices.

## Storage

Use separate storage policies/buckets or prefix boundaries for:

- user avatars
- pet photos
- moments
- community media
- Lost & Found media
- brand assets (non-user generated)

## Security and RLS

At minimum:

- Users can manage their own private profile, pets, moments, reminders, and check-ins.
- Community visibility is explicitly controlled.
- Connection request recipients can view and act on requests sent to them.
- Invite and QR token validation occurs via trusted server-side logic.
- Recognition, badge, reward, admin, and moderation changes require privileged paths.
- Blocked relationships are enforced in discovery and request creation.

## Migration Rule

Every schema change must:

1. Update this document.
2. Add a migration.
3. Add or update RLS policies.
4. Validate existing data.
5. Be reviewed before merge.
