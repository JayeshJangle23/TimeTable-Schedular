// import React from "react";
// import { Outlet } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function AuthLayout() {
//   return (
//     <div className="min-h-screen bg-main">
//       <div className="min-h-screen grid place-items-center px-4 py-10">
//         <motion.div
//           initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
//           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           transition={{ duration: 0.45, ease: "easeOut" }}
//           className="w-full max-w-md"
//         >
//           <div className="rounded-3xl border border-theme bg-glass backdrop-blur-xl shadow-soft overflow-hidden">
//             <div className="p-6">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 shadow-soft" />
//                 <div>
//                   <p className="text-sm font-semibold text-slate-900 dark:text-white">
//                     Auth
//                   </p>
//                   <p className="text-xs text-slate-600 dark:text-white/70">
//                     Cookie session
//                   </p>
//                 </div>
//               </div>
//               <Outlet />
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-main))] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-[rgb(var(--border-color))] bg-[rgb(var(--bg-card))] p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(255,115,0,0.15)] transition-all duration-500">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-[rgb(var(--accent))]" />
            <h2 className="text-5xl font-bold text-[rgb(var(--text-main))]">
              <span className="text-orange-500 text-6xl">W</span>elcome{" "}
              <span className="text-orange-500 text-6xl">B</span>ack
            </h2>
            <p className="text-md text-[rgb(var(--text-muted))]">
              Access your dashboard
            </p>
          </div>

          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}
