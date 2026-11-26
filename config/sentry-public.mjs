export const publicDsn = "https://a845f79cd85427cb5dd148e346c60429@o4510546774327296.ingest.de.sentry.io/4511971818274896";

// The browser and its fixed-destination relay share the same public project ID.
const url = new URL(publicDsn);
const match = url.hostname.match(/^o(\d+)\.ingest(?:\.([a-z]{2}))?\.sentry\.io$/);
if (!match || !/^\/\d+$/.test(url.pathname)) throw new Error("Unexpected Sentry client DSN");
const [, organisation, region = ""] = match;
const project = url.pathname.slice(1);
export const sentry = { organisation, region, project };
const params = new URLSearchParams({ o: organisation, p: project });
if (region) params.set("r", region);
export const workerTunnel = "/monitoring?" + params;
