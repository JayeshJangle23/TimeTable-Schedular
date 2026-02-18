import React from "react";

export default function Progress({ value = 0 }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div
      className="h-2 w-full rounded-full 
  bg-white dark:bg-slate-700 
  border border-black dark:border-white/20 
  overflow-hidden"
    >
      <div
        className="h-full bg-orange-500 transition-[width] duration-500 dark:shadow-[0_0_10px_rgba(255,115,0,0.7)]"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
