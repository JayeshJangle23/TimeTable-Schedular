import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            404
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
            Page not found
          </p>
          <div className="mt-5">
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
