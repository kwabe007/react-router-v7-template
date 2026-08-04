import { useSyncExternalStore } from "react";
import { useRouteLoaderData } from "react-router";

import type { ClientEnv } from "~/env.server";
import { type loader } from "~/root";

/**
 * Joins a base URL with one or more path segments.
 *
 * @param base - The base URL (e.g., "https://api.example.com/")
 * @param paths - One or more path segments (e.g., "users", "123")
 * @returns The combined URL (e.g., "https://api.example.com/users/123")
 */
export function buildUrl(base: string, ...paths: string[]): string {
  // Remove trailing slash from base
  const normalizedBase = base.replace(/\/+$/, "");

  // Clean up each path segment
  const normalizedPaths = paths.map((path) => path.replace(/^\/+|\/+$/g, ""));

  return [normalizedBase, ...normalizedPaths].join("/");
}

/**
 * Return a boolean indicating if the JS has been hydrated already.
 * When doing Server-Side Rendering, the result will always be false.
 * When doing Client-Side Rendering, the result will always be false on the
 * first render and true from then on. Even if a new component renders it will
 * always start with true.
 */
// TODO: Check if the () => () => {} can replace the previous subscribe function
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * A custom hook that retrieves the `clientEnv` object from the root loader data.
 * This hook ensures that the required environment data is available and throws an error
 * if it is not found.
 *
 * @return {ClientEnv} The client environment configuration, as retrieved from the root loader data.
 */
export function useClientEnv(): ClientEnv {
  const data = useRouteLoaderData<typeof loader>("root");
  if (!data) {
    throw new Error(
      "No data found in root loader, but clientEnv is required by useClientEnv.",
    );
  }
  return data.clientEnv;
}
