import { init } from "@plausible-analytics/tracker";

export function initPlausible() {
  if (
    window.__clientEnv.PUBLIC_PLAUSIBLE_ENDPOINT &&
    !window.__plausibleInitialized
  ) {
    init({
      domain: window.__clientEnv.PUBLIC_PLAUSIBLE_DOMAIN || "",
      endpoint: window.__clientEnv.PUBLIC_PLAUSIBLE_ENDPOINT,
      captureOnLocalhost:
        window.__clientEnv.PUBLIC_PLAUSIBLE_CAPTURE_ON_LOCALHOST,
    });
    window.__plausibleInitialized = true;
  }
}
