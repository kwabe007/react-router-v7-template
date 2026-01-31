import type { ClientEnv } from "~/env.server";

export {};

declare global {
  interface Window {
    __clientEnv: ClientEnv;
    // Used for capturing errors triggered by SPA navigation
    __spaNavigation: true | undefined;
    __plausibleInitialized: true | undefined;
  }
}
