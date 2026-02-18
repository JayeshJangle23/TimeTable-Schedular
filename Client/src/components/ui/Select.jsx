import React from "react";
import { cn } from "../../utils/cn";

export default function Select({ className, children, ...p }) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-theme bg-card px-3 py-2 text-sm text-main shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className,
      )}
      {...p}
    >
      {children}
    </select>
  );
}
