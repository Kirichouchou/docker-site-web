export type AnalyticsEvent = {
  name: string;
  value?: string;
  ts?: number;
};

export async function track(event: AnalyticsEvent) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    });
  } catch {}
}

