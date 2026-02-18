import React from "react";
import { cn } from "../../utils/cn";

export default function Input({ className, ...p }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl px-3 py-2 text-sm transition-all duration-300",
        "bg-[rgb(var(--bg-card))]",
        "border border-[rgb(var(--border-color))]",
        "text-[rgb(var(--text-main))]",
        "placeholder:text-[rgb(var(--text-muted))]",
        "focus:outline-none",
        "focus:ring-2 focus:ring-[rgb(var(--accent))]",
        "focus:border-[rgb(var(--accent))]",
        className,
      )}
      {...p}
    />
  );
}
