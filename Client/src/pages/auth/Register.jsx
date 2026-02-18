import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PageTransition from "../../components/common/PageTransition";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const { register, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    emailId: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    nav("/", { replace: true });
  };

  return (
    <PageTransition>
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-[rgb(var(--text-main))]">
          Register
        </h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-main))]">
          Create your account
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-[rgb(var(--text-main))] mt-2">
              First name
            </label>
            <Input
              value={form.firstName}
              onChange={(e) =>
                setForm((s) => ({ ...s, firstName: e.target.value }))
              }
              required
            />
          </div>
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
            className="w-full text-sm font-semibold text-[rgb(var(--text-main))]"
            type="submit"
            loading={loading}
          >
            Create account
          </Button>
        </form>

        <p className="mt-5 text-sm font-semibold text-[rgb(var(--text-main))]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-500 dark:text-indigo-300 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </PageTransition>
  );
}
