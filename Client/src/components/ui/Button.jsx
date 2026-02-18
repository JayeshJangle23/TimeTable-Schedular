import React from "react";
import Spinner from "./Spinner";
import { cn } from "../../utils/cn";

export default function Button({
  className,
  variant = "primary",
  loading,
  disabled,
  children,
  ...p
}) {
  // const base =
  //   "ring-focus inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";
  // // const variants = {
  // //   primary:
  // //     "text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 hover:brightness-110 shadow-md",
  // //   ghost:
  // //     "text-slate-700 bg-orange-500 hover:bg-orange-700 active:bg-orange-800 text-white transition-all duration-200 dark:text-white bg-white/70 dark:bg-white/10 border border-slate-200/70 dark:border-white/15 hover:bg-white/80 dark:hover:bg-white/15",
  // //   danger:
  // //     "text-white bg-orange-500 hover:bg-orange-700 active:bg-orange-800 text-white transition-all duration-200 bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 hover:brightness-110 shadow-soft",
  // // };
  // const variants = {
  //   primary:
  //     "text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 hover:brightness-110 shadow-md",
  //   ghost:
  //     "bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-color))] text-[rgb(var(--text-main))] hover:bg-slate-100 dark:hover:bg-slate-800",
  //   danger:
  //     "text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:brightness-110 shadow-md",
  // };
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-95 disabled:opacity-60";

  const variants = {
    primary:
      "text-white bg-[rgb(var(--accent))] hover:brightness-110 shadow-md hover:shadow-[0_8px_24px_rgba(255,115,0,0.35)]",

    ghost:
      "bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-color))] text-[rgb(var(--text-main))] hover:bg-[rgb(var(--bg-hover))]",

    outline:
      "border border-[rgb(var(--accent))] text-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--text-main))]",

    danger: "bg-black text-white hover:bg-red-600",
  };
  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      {...p}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}
