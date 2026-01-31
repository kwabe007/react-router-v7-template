import * as Sentry from "@sentry/react-router";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { serverSideClientEnv } from "~/env.server";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  return { clientEnv: serverSideClientEnv };
}

export default function App() {
  const { clientEnv } = useLoaderData<typeof loader>();

  useEffect(() => {
    const domain = clientEnv.PUBLIC_PLAUSIBLE_DOMAIN;
    const endpoint = clientEnv.PUBLIC_PLAUSIBLE_ENDPOINT;

    if (domain && endpoint && !window.__plausibleInitialized) {
      import("@plausible-analytics/tracker/plausible.js").then(({ init }) => {
        init({
          domain,
          // Use an app route which proxies an external plausible instance to prevent adblockers from blocking the request.
          endpoint,
          captureOnLocalhost: clientEnv.PUBLIC_PLAUSIBLE_CAPTURE_ON_LOCALHOST,
        });
      });
      window.__plausibleInitialized = true;
    }
  }, []);

  useEffect(() => {
    // Setting this to `true` allows us to know that all following requests are SPA requests.
    window.__spaNavigation = true;
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__clientEnv = ${JSON.stringify(clientEnv)}`,
        }}
      />
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  Sentry.captureException(error);

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
