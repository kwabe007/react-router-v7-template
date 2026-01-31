import * as Sentry from "@sentry/react-router";
import { serverEnv } from "~/env.server";
import type { Route } from "./+types/api.sentry-example-api";
import { notFound } from "~/utils/utils.server";

class SentryExampleBackendError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleBackendError";
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  if (!serverEnv.ENABLE_SENTRY_EXAMPLE_PAGE) {
    throw notFound(request);
  }

  await Sentry.startSpan(
    {
      name: "Example Backend Span",
      op: "test",
    },
    async () => {
      // Simulate some backend work
      await new Promise((resolve) => setTimeout(resolve, 100));
    },
  );

  throw new SentryExampleBackendError(
    "This error is raised on the backend API route.",
  );
}
