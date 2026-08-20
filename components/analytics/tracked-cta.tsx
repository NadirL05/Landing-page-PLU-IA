"use client";

import type { ReactNode } from "react";
import { trackEvent, withCurrentQuery } from "@/lib/analytics";

type TrackedCtaProps = {
  href: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  preserveQuery?: boolean;
  target?: string;
  rel?: string;
};

/**
 * Wraps the funnel-critical CTAs (start analysis, book demo, upgrade) so
 * every click fires a GA4/Google Ads event before navigating away — the
 * only place in the landing where user interaction needs to be measured.
 * `preserveQuery` forwards gclid/utm_* to app-plu-ia.agentimpact.fr so a
 * campaign click doesn't lose attribution the moment it crosses domains.
 */
export function TrackedCta({
  href,
  eventName,
  eventParams,
  className,
  style,
  children,
  preserveQuery = false,
  target,
  rel,
}: TrackedCtaProps) {
  const resolvedHref = preserveQuery ? withCurrentQuery(href) : href;

  function handleClick() {
    trackEvent(eventName, eventParams);
  }

  return (
    <a href={resolvedHref} className={className} style={style} target={target} rel={rel} onClick={handleClick}>
      {children}
    </a>
  );
}
