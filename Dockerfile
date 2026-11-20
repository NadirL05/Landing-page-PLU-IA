ARG NODE_IMAGE=node:24-bookworm-slim@sha256:0e2646ab57e77b7a384a0cb59b6815b182c77e1f9c3ba36bd8435bd9c4e6680e
FROM ${NODE_IMAGE} AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 SENTRY_DISABLE_TELEMETRY=1
ARG BUILD_NODE_OPTIONS=--max-old-space-size=1536
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_GOOGLE_ADS_ID
ARG NEXT_PUBLIC_META_PIXEL_ID
ENV NODE_OPTIONS=${BUILD_NODE_OPTIONS}
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . .
# Report and enforce the requested cgroup bounds before the only heavy step.
RUN node -e 'const fs=require("fs"),assert=require("assert/strict");const m=fs.readFileSync("/sys/fs/cgroup/memory.max","utf8").trim();const c=fs.readFileSync("/sys/fs/cgroup/cpu.max","utf8").trim().split(/\s+/);console.log("BUILD_CGROUP",JSON.stringify({memoryMax:m,cpuMax:c}));assert(m!=="max"&&Number(m)<=3221225472);assert(c[0]!=="max"&&Number(c[0])/Number(c[1])<=2)'
RUN npm run build

FROM ${NODE_IMAGE}
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/next.config.* ./
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "node_modules/next/dist/bin/next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
