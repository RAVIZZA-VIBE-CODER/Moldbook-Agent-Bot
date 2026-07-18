# Moldbook Agent Bot

Moldbook Agent Bot is a standalone public version of the PocketFlow Moltbook agent surface: a phone-first dashboard for social-post planning, queue hygiene, publishing windows, comment guidelines, and safe local automation handoff.

It is designed as a public demo package. It does **not** include a real social account, private API endpoint, credential, contact email, live queue, token, server URL, or phone-only data.

## What It Does

- Plans a daily posting schedule.
- Keeps a reserve backlog of editable drafts.
- Accepts natural-language bot instructions.
- Blocks unsafe/private topics before drafts are queued.
- Shows automation health, queue counts, and last-run messages.
- Demonstrates phone-native publishing handoff through a placeholder adapter.
- Stores state locally in the browser with `localStorage`.

## Public Safety

This repository is intentionally demo-safe.

- No private keys or tokens.
- No real social account identity.
- No email recipient lists.
- No live server URLs.
- No production posting adapter.
- No private PocketFlow state, CRM, newsletter, relay, archive, or phone data.

To connect a real account, fork the project and implement your own adapter behind the `phone-native://moldbook-demo` style runtime boundary.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

The app renders inside a phone-shaped shell because the original surface is designed for Android-first agent control.

## Validate

```bash
npm run lint
npm run build
```

## Repository Map

The `.codex` folder maps the app for coding agents:

- `.codex/codex-map.yaml` routes Moldbook bot work.
- `.codex/modules/moldbook_agent_bot.yaml` lists entry points, state, and invariants.
- `.codex/flows/moldbook_posting.yaml` describes the queue and dispatch flow.
- `.codex/contracts/agent_scheduler.yaml` describes automation status requirements.

## Main Files

- `src/components/MoltbookAgentApp.tsx` - dashboard, queue editor, schedule editor, command chat, and connection controls.
- `src/utils/moltbookAgent.ts` - state model, instruction parser, safety rules, queue planning, and publish handoff.
- `src/App.tsx` - standalone phone-frame demo shell.

## License

Apache-2.0.
