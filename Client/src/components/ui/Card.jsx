// import React from "react";
// import { cn } from "../../utils/cn";

// export default function Card({ className, children }) {
//   // return <div className={cn("glass p-5 md:p-6", className)}>{children}</div>;
//   return (
//     <div
//       className={cn(
//         "rounded-2xl p-6 border transition-all duration-300",
//         "bg-[rgb(var(--bg-card))]",
//         "border-[rgb(var(--border-color))]",
//         "shadow-[0_8px_24px_rgba(0,0,0,0.05)]",
//         "dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
//         "hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,115,0,0.15)]",
//         className,
//       )}
//     >
//       {children}
//     </div>
//   );
// }

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
