import {
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
import { RootErrorBoundary } from "~/root-components/RootErrorBoundary";

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

export const ErrorBoundary = RootErrorBoundary;
