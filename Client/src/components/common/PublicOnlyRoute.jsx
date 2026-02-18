import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicOnlyRoute() {
  const { isAuthed, booting } = useAuth();
  if (booting) return <Outlet />;
  return isAuthed ? <Navigate to="/" replace /> : <Outlet />;
}
