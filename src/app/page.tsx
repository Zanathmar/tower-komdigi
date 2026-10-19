"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Demo auth — replaced by NextAuth.js in Phase 2
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === "demo" && password === "demo") {
      router.push("/dashboard");
    } else {
      setError("Error: invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4">
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      {/* Groupbox card — 420px, exact per Figma */}
      <main
        id="main-content"
        className="flex w-full max-w-105 flex-col items-center gap-4 rounded-card border border-border bg-surface p-8"
      >
        {/* Logo tile — 72px, exact per Figma */}
        <div className="h-18 w-18 rounded-card bg-primary" aria-hidden />

        <p className="text-xl font-semibold text-primary"></p>

        <p className="text-xs text-muted">Sign in to continue</p>

        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-4">
          {/* Username */}
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="username" className="text-field-label">
              Username <span className="text-danger">*</span>
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={isLoading}
              required
              className="h-9 w-full rounded-input border border-border bg-surface px-2.5 text-sm placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="password" className="text-field-label">
              Password <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLoading}
                required
                className="h-9 w-full rounded-input border border-border bg-surface px-2.5 text-sm placeholder:text-muted focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <Eye className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* Error banner — exact per Figma: #f6e8e8 bg, #8f181b border/text */}
          {error && (
            <div
              className="flex w-full items-center gap-2 rounded-card border border-danger bg-danger-bg px-3 py-2.5"
              role="alert"
            >
              <AlertCircle
                className="h-4 w-4 shrink-0 text-danger"
                strokeWidth={2}
              />
              <p className="flex-1 text-sm font-semibold text-danger">
                {error}
              </p>
            </div>
          )}

          {/* Login button — exact per Figma: radius 10, h-36, icon + label */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-card bg-primary px-3 text-sm font-semibold text-on-primary transition-colors duration-fast hover:bg-primary-hover disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" strokeWidth={2} />
            )}
            Login
          </button>
        </form>

        <p className="text-2xs text-muted">
          Accounts are created by Super Admin
        </p>
      </main>
    </div>
  );
}