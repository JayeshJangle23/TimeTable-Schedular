import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthed, booting } = useAuth();
  if (booting)
    return (
      <div className="min-h-screen grid place-items-center text-slate-700 dark:text-white/80">
        Loading…
      </div>
    );
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}
