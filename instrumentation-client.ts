// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { publicDsn, workerTunnel } from "./config/sentry-public.mjs";

Sentry.init({
  dsn: publicDsn,
  ...(process.env.NEXT_PUBLIC_FONCIABLE_WORKER === "1" ? { tunnel: workerTunnel } : {}),
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
