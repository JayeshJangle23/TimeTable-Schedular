// import React from "react";
// import { NavLink } from "react-router-dom";

// const links = [
//   { to: "/", label: "Dashboard" },
//   { to: "/tasks", label: "Tasks" },
//   { to: "/timetable", label: "Timetable" },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="hidden md:flex md:w-64 md:flex-col border-r border-[rgb(var(--border-color))] bg-[rgb(var(--bg-main))]">
//       <div className="m-4 rounded-2xl border border-[rgb(var(--border-color))] bg-[rgb(var(--bg-card))] p-4 shadow-lg">
//         <div className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 shadow-soft" />
//             <div>
//               <p className="text-sm font-semibold text-main">Timetable</p>
//               <p className="text-xs text-muted">Reminder Dashboard</p>
//             </div>
//           </div>

//           <nav className="mt-6 grid gap-1">
//             {links.map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 end={l.to === "/"}
//                 className={({ isActive }) =>
//                   `rounded-xl px-3 py-2 text-sm font-medium transition ${
//                     isActive
//                       ? "text-white bg-gradient-to-r from-indigo-500/90 via-fuchsia-500/90 to-emerald-400/90 shadow-soft"
//                       : "text-slate-700 dark:text-white/80 hover:bg-white/70 dark:hover:bg-white/10"
//                   }`
//                 }
//               >
//                 {l.label}
//               </NavLink>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/tasks", label: "Tasks" },
  { to: "/timetable", label: "Timetable" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r border-[rgb(var(--border-color))] bg-[rgb(var(--bg-main))]">
      <div className="px-6 py-6">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-xl font-bold text-[rgb(var(--text-main))]">
            <span className="text-orange-500 text-3xl">R</span>emindrrr
          </h1>
          <p className="text-xs text-[rgb(var(--text-main))]">
            Smart Task Planner
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-[rgb(var(--accent))] text-white"
                        : "text-[rgb(var(--text-main))] hover:bg-orange-200 hover:text-black dark:hover:bg-orange-900/20"
                    }`}
                >
                  {link.label}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 h-full w-1 bg-black dark:bg-white rounded-r"
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
