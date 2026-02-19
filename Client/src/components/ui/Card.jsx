import React from "react";
import { cn } from "../../utils/cn";

export default function Card({ className, children }) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        p-6 md:p-7
        border
        backdrop-blur-sm
        transition-all duration-300 ease-out

        bg-[rgb(var(--bg-card))]
        border-[rgb(var(--border-color))]

        shadow-sm
        hover:shadow-xl

        hover:-translate-y-1
        hover:border-orange-400/40

        dark:shadow-black/40
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
