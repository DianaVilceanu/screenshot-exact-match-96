import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Link to an already-localized path string (built with hrefFor/pathFor). */
export function L({
  to,
  children,
  className,
  tabIndex,
  onClick,
  ...aria
}: {
  to: string;
  children?: ReactNode;
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
  hrefLang?: string;
  lang?: string;
}) {
  return (
    <Link to={to as "/"} className={className} tabIndex={tabIndex} onClick={onClick} {...aria}>
      {children}
    </Link>
  );
}
