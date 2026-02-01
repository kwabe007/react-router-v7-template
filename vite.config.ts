import { sentryReactRouter } from "@sentry/react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "");

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      sentryReactRouter(
        {
          sentryUrl: env.SENTRY_URL,
          org: env.SENTRY_ORG,
          project: env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
          sourcemaps: {
            filesToDeleteAfterUpload: "./build/**/*.map",
            // Only upload sourcemaps if PUBLIC_SENTRY_DSN is set
            disable: !env.PUBLIC_SENTRY_DSN,
          },
        },
        config,
      ),
    ],
  };
});
