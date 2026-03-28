import { type ReactNode } from "react";

import { useHydrated } from "~/utils/utils";

type ClientOnlyProps = {
  children(): ReactNode;
  // Use a fallback that is the same dimensions as the client rendered children to prevent layout shift.
  fallback?: ReactNode;
};

/**
 * Render the children only after the JS has loaded client-side. Use an optional
 * fallback component if the JS is not yet loaded.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}
