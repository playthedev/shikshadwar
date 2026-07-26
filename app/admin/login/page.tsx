"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch("/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Login failed.");
        return;
      }
      router.replace("/admin/donations");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-ink px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-(--radius) border border-paper/10 bg-paper/5 p-8"
      >
        <p className="font-heading text-xl text-paper">Admin sign in</p>
        <div className="mt-6">
          <Label htmlFor="password" className="text-paper/80">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            className="mt-1.5 border-paper/20 bg-paper/10 text-paper"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        <Button
          type="submit"
          disabled={isPending || !password}
          className="mt-6 h-11 w-full rounded-(--radius) bg-rust text-sm font-semibold text-primary-foreground hover:bg-[var(--rust-strong)]"
        >
          {isPending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
