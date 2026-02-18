import React from "react";

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <span className="text-sm text-slate-700 dark:text-white/80">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full border transition ${
          checked
            ? "bg-emerald-500/70 border-emerald-400/40"
            : "bg-slate-300/70 dark:bg-white/10 border-slate-300/60 dark:border-white/15"
        }`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </label>
  );
}
