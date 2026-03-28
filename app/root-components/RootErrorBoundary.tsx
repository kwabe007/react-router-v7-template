import * as Sentry from "@sentry/react-router";
import { isRouteErrorResponse, Link } from "react-router";

import { Button } from "~/components/ui/button";

import type { Route } from "../../.react-router/types/app/+types/root";

export function RootErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "500";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status.toString();
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  } else {
    Sentry.captureException(error);
  }

  return (
    <main
      className={
        "flex flex-col items-center text-center min-h-dvh gap-8 px-4 py-8" +
        (stack ? " justify-center" : "")
      }
    >
      <div className="space-y-4">
        <h1 className={"text-h1 xl:mt-[25vh]" + (stack ? "" : " mt-[25vh]")}>
          {message}
        </h1>
        <p>{details}</p>
      </div>
      <Button className={stack ? "" : "mt-16"} asChild>
        <Link to="/">Back to home</Link>
      </Button>
      {stack && (
        <div className="w-full max-w-270 mx-auto">
          <pre className="text-left text-destructive text-sm p-4 overflow-x-scroll bg-slate-900">
            <code>{stack}</code>
          </pre>
        </div>
      )}
    </main>
  );
}
