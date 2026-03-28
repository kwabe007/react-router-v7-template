import type { ElementType, ReactNode } from "react";

import { cn } from "~/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export default function Container({
  as: Component = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full max-w-150 px-4 mx-auto",
        "md:px-6",
        "lg:px-8",
        "xl:max-w-280",
        className,
      )}
    >
      {children}
    </Component>
  );
}
