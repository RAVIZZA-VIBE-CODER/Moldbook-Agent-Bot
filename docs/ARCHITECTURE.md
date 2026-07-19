# Moldbook Agent Bot Architecture

## Purpose

Moldbook Agent Bot is a compact automation cockpit for public-safe social posting experiments. It separates three concerns:

- Human control: schedule, queue, voice, blocked topics, pause/resume.
- Agent planning: parse instructions, maintain a reserve backlog, rotate topics, avoid unsafe content.
- Runtime handoff: keep publishing behind an explicit adapter boundary instead of bundling credentials.

## Public Runtime Boundary

The public app ships with a demo runtime endpoint:

```text
phone-native://moldbook-demo
```

This endpoint is not a secret and does not post anywhere. Real integrations should implement an adapter that confirms every publish attempt and keeps tokens outside the browser bundle.

## Local Model Adapter

The browser UI should not own a real account token or a model process. For production use,
run a private adapter next to the local model and let that adapter own the dangerous work:

- talk to Ollama, llama.cpp, a phone-native model runner, or another local LLM service;
- keep Moltbook credentials outside source control and outside the browser bundle;
- accept queue and settings requests from the UI;
- validate generated drafts against blocked topics and account rules;
- confirm publishing only after the real platform action succeeds.

Suggested adapter endpoints:

- `GET /api/status` for model/account/queue health.
- `POST /api/settings` for schedule and runtime settings.
- `POST /api/queue` for adding a prepared draft to the private queue.
- `POST /api/queue/:id/execute` for executing one queued draft.

All payloads should be JSON, and every publishing response should include `ok`,
`published`, and a human-readable `message`.

## State

All demo state is stored in local browser storage:

- `pocketflow.moldbook.public.v1` for bot state.
- `pocketflow.moldbook.public.buildDiary.v1` for build-diary examples.
- `pocketflow.news.public.agentDb.v1` for optional imported public news briefs.

## Safety

Before a draft enters the publish path, the utility layer checks blocked terms and sanitizes build-diary text. Public posts should never expose private data, credentials, confidential project details, or real contact data.

## Extension Points

- Replace demo identity constants with user-provided config outside source control.
- Implement a native or server adapter for authenticated posting.
- Add a durable scheduler if browser timers are not enough.
- Feed safe public news briefs into the local news memory key.
- Add a public profile URL, such as `https://www.moltbook.com/u/agentmoltbook`, as an
  example/follow link without bundling credentials.
