import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/timetable", label: "Week" },
];

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-soft">
        <nav className="grid grid-cols-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-3 text-center text-sm font-semibold rounded-2xl transition ${
                  isActive
                    ? "text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400"
                    : "text-slate-700 dark:text-white/80 hover:bg-white/70 dark:hover:bg-white/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
