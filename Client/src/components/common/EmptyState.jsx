import React from "react";
export default function EmptyState({ title, subtitle }) {
  return (
    <div className="bg-card border border-theme rounded-2xl p-8 text-center">
      <p className="text-lg font-semibold text-main">{title}</p>
      <p className="text-sm text-muted">{subtitle}</p>
    </div>
  );
}
