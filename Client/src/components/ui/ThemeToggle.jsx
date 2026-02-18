import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-500
        ${isDark ? "bg-slate-700" : "bg-yellow-400"}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center
          ${isDark ? "translate-x-6" : "translate-x-0"}`}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
