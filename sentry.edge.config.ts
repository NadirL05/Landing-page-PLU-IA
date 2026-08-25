import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a845f79cd85427cb5dd148e346c60429@o4510546774327296.ingest.de.sentry.io/4511971818274896",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
