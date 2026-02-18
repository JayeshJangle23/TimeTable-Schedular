import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PageTransition from "../../components/common/PageTransition";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ emailId: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    nav("/", { replace: true });
  };

  return (
    <PageTransition>
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-[rgb(var(--text-main))]">
          Login
        </h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-main))]">
          Enter your credentials
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-[rgb(var(--text-main))]">
              Email
            </label>
            <Input
              value={form.emailId}
              onChange={(e) =>
                setForm((s) => ({ ...s, emailId: e.target.value }))
              }
              type="email"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[rgb(var(--text-main))]">
              Password
            </label>
            <Input
              value={form.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
              type="password"
              required
            />
          </div>

          <Button
            className="w-full text-[rgb(var(--text-main))]"
            type="submit"
            loading={loading}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-5 text-sm text-[rgb(var(--text-main))]">
          No account?{"      "}
          <Link
            to="/register"
            className="font-semibold text-indigo-500 dark:text-indigo-300 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </PageTransition>
  );
}
