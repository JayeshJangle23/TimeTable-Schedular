// // import { useContext } from "react";
// // import { ThemeContext } from "../context/ThemeContext";
// // export default function useTheme() {
// //   return useContext(ThemeContext);
// // }
// import { useEffect, useState } from "react";

// export default function useTheme() {
//   const getInitialTheme = () => {
//     const saved = localStorage.getItem("theme");

//     if (saved) return saved;

//     // detect system theme
//     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//       return "dark";
//     }

//     return "light";
//   };

//   const [theme, setTheme] = useState(getInitialTheme);

//   useEffect(() => {
//     const root = document.documentElement;

//     root.classList.remove("light", "dark");
//     root.classList.add(theme);

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return { theme, toggleTheme };
// }

// import { useEffect, useState } from "react";

// export default function useTheme() {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem("theme") || "light";
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;

//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return { theme, toggleTheme };
// }
// import { useEffect, useState } from "react";

// export default function useTheme() {
//   const getInitialTheme = () => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) return savedTheme;

//     // optional: system preference
//     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//       return "dark";
//     }

//     return "light";
//   };

//   const [theme, setTheme] = useState(getInitialTheme);

//   useEffect(() => {
//     const html = document.documentElement;

//     if (theme === "dark") {
//       html.classList.add("dark");
//     } else {
//       html.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return { theme, toggleTheme };
// }

import { useEffect, useState } from "react";

export default function useTheme() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("light", "dark");
    html.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
