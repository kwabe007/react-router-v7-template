import type { ClientEnv } from "~/env.server";

export {};

declare global {
  interface Window {
    __clientEnv: ClientEnv;
    __plausibleInitialized: true | undefined;
  }
}
