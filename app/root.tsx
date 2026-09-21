import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import { serverSideClientEnv } from "~/env.server";
import { RootErrorBoundary } from "~/root-components/RootErrorBoundary";
import { initPlausible } from "~/services/plausible.client/init-plausible";

import type { Route } from "./+types/root";
export { type Route as RootRoute };

import "./app.css";

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

export async function loader() {
  return { clientEnv: serverSideClientEnv };
}

export default function App() {
  const { clientEnv } = useLoaderData<typeof loader>();

  useEffect(() => {
    initPlausible();
  });

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
