# Murza development batches

## Product direction

Murza connects people sending parcels with people already travelling along the route. The Siamese cat is the established mascot. Keep the English interface consistent until a deliberate localization pass.

## Batch 1 — messages (2026-10-09)

Goal: people can open a conversation, read its history, and send a message with a visible server confirmation. Failed sends retain their text.

Design tokens: seal brown `#62442e`, fur white `#fffaf4`, ink `#332720`, Siamese eye blue `#336b8a`, pale blue `#eaf3f8`, outline `#e8d9c9`. Use the existing sans serif for readable conversations; the cat illustration is the memorable element in the empty inbox. Align names, messages, and controls to the left; outgoing bubbles sit to the right.

Desktop layout:

```
Messages / Find a parcel
| Conversations       | Person / View profile        |
| Name + last message | Older messages               |
| Unread count        | Incoming       Outgoing      |
|                     | Message field / Send message |
```

Mobile: one panel at a time, with a Messages link from the conversation header. No ornamental card grid or repeating entrance animations. The blue belongs to the cat's eyes and message state; brown remains the main action color. Existing cream stays because it belongs to the requested brand. Remove extra chrome instead of redesigning the landing page in this batch.

Scope: inbox, conversation loading/errors, draft retention, pagination, read receipts, transport reconnection, server validation, per-account sending limits, and WebSocket destination authorization.

Completed and deployed to the current server. Backend commit is recorded in the backend repository; frontend changes are tracked on the existing stabilization branch.

Validation: 16 backend regression tests and 10 frontend tests pass. Both production Docker images build. Live Firefox checks cover confirmed sending, an incoming reply from a second demo account, a real read receipt, draft retention after a failed request, desktop/mobile inbox and conversation layouts, no horizontal overflow, and keeping the latest message visible when the viewport shrinks. Live API/SockJS checks reject invalid content/recipients/history sizes, direct broker queue subscriptions, and use of an already-open connection after token revocation. A third account cannot read the test conversation. Stored content remains encrypted, and existing message timestamps read as UTC instants. Production static assets omit source maps.

Corrections found during review: use UTC instants for message time; preserve the bottom scroll position on mobile viewport changes; keep incoming and outgoing read states separate. Consolidated four obsolete chat CSS files into one stylesheet.

Follow-ups: message request IDs for safe retry after uncertain delivery, a unique conversation per user pair, MongoDB history/count indexes, and context linking a conversation to the parcel/trip being discussed. The composer currently keeps a failed draft in the open conversation; restoring drafts across navigation belongs to a later batch.

Next concrete task: profile and my listings. Known starting points: duplicate profile fetches, parcel refresh using the trip page, missing recoverable loading/error states, and request management dialog consistency.

## Next batches

1. Profile and my listings: correct pagination, request management, confirmation before removal, honest profile states, upload validation.
2. Search and publishing: saved draft, date/capacity validation, route filters and clearer matching.
3. Account lifecycle: registration/verification/reset delivery, session handling, abuse limits, HTTPS once a domain is available.
4. Operational foundation: reviewed database migrations, backups, list query costs, dependency/build modernization.

Update this file after each batch with results, limitations, and the next concrete task. Do not claim a feature is complete until its user flow is checked.
