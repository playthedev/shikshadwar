import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-heading text-6xl text-rust">404</p>
      <h1 className="mt-4 font-heading text-2xl text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-md text-muted-foreground">
        The page you&apos;re looking for may have moved or no longer exists.
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        className="mt-6 rounded-(--radius) bg-rust text-primary-foreground hover:bg-[var(--rust-strong)]"
      >
        Back to Home
      </Button>
    </Container>
  );
}
