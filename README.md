# CleanKing

CleanKing is a calm personal cleaning cockpit for routines, room resets, supplies, notes, and history.

## Run locally

Install dependencies, then run the development script from the project root.

State persists through `src/repository.js`, behind a small repository interface, so a future Supabase adapter can replace local storage without rewriting screens or domain logic.

The seeded demo includes fixed schedules, completion-based recurrence, low-stock supplies, a shopping list, room notes, and a guided kitchen reset.

```bash
npm run test
npm run build
```
