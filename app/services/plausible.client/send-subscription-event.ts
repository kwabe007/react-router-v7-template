import { track } from "@plausible-analytics/tracker";

const EVENT_NAME = "Email Subscription";

export async function sendSubscriptionEvent(clickedButtonId?: string) {
  track(EVENT_NAME, {
    props: { buttonId: clickedButtonId || "unknown" },
  });
}
