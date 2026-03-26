import { useSyncExternalStore } from "react";

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
