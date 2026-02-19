import React from "react";
import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import ThemeToggle from "../ui/ThemeToggle";

export default function Topbar() {
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <div className="mx-4 mt-4 rounded-2xl border border-[rgb(var(--border-color))] bg-[rgb(var(--bg-card))] shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-lg font-bold text-[rgb(var(--text-main))]">
              <span className="text-orange-500">W</span>elcome{" "}
              {user?.firstName || user?.emailId || "User"}
            </p>
            <p className="text-base font-semibold text-[rgb(var(--text-main))]"></p>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" onClick={toggleTheme}>
              {theme === "dark" ? "Light" : "Dark"}
            </Button> */}
            <ThemeToggle />

            <Button variant="ghost" onClick={logout} loading={loading}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
