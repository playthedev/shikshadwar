"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { primaryNav, headerCtas, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isNavItemActive(pathname: string, item: NavItem) {
  if (item.children) {
    return item.children.some((child) => pathname === child.href);
  }
  return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur-sm">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center" aria-label="Shikshadwar Foundation, home">
          <Image
            src="/logo-nav.png"
            alt=""
            width={291}
            height={116}
            preload
            quality={100}
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const isActive = isNavItemActive(pathname, item);

            return item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  className={cn(
                    "group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink",
                    isActive && "text-ink",
                  )}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-rust transition-transform duration-300 ease-out group-hover:scale-x-100",
                        isActive && "scale-x-100",
                      )}
                    />
                  </span>
                  <ChevronDown aria-hidden="true" className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} render={<Link href={child.href} />}>
                      {child.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink",
                  isActive && "text-ink",
                )}
              >
                <span className="relative">
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-rust transition-transform duration-300 ease-out group-hover:scale-x-100",
                      isActive && "scale-x-100",
                    )}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href={headerCtas[0].href} />}
            nativeButton={false}
            variant="outline"
            className="hidden h-10 rounded-(--radius) border-rust px-5 text-sm font-semibold text-rust hover:bg-rust/5 active:translate-y-0 lg:inline-flex"
          >
            {headerCtas[0].label}
          </Button>
          <Button
            render={<Link href={headerCtas[1].href} />}
            nativeButton={false}
            className="hidden h-10 rounded-(--radius) bg-rust px-5 text-sm font-semibold text-primary-foreground hover:bg-[var(--rust-strong)] active:translate-y-0 sm:inline-flex"
          >
            {headerCtas[1].label}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu aria-hidden="true" className="size-5" />
            </Button>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 overflow-y-auto px-4 pb-6"
              >
                {primaryNav.map((item) => {
                  const isActive = isNavItemActive(pathname, item);

                  return (
                    <div key={item.label} className="border-b border-border py-2">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block py-2 text-base font-medium text-ink",
                          isActive && "text-rust",
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
                        <div className="flex flex-col gap-1 pb-2 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "py-1.5 text-sm text-muted-foreground hover:text-ink",
                                pathname === child.href && "font-medium text-rust",
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <Button
                  render={
                    <Link href={headerCtas[0].href} onClick={() => setMobileOpen(false)} />
                  }
                  nativeButton={false}
                  variant="outline"
                  className="mt-4 h-11 rounded-(--radius) border-rust text-sm font-semibold text-rust hover:bg-rust/5 active:translate-y-0"
                >
                  {headerCtas[0].label}
                </Button>
                <Button
                  render={
                    <Link href={headerCtas[1].href} onClick={() => setMobileOpen(false)} />
                  }
                  nativeButton={false}
                  className="mt-2 h-11 rounded-(--radius) bg-rust text-sm font-semibold text-primary-foreground hover:bg-[var(--rust-strong)] active:translate-y-0"
                >
                  {headerCtas[1].label}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
