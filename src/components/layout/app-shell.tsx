"use client";
 
import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Upload,
  Database,
  User,
  LogOut,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
 
const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/submission", label: "Data Submission", icon: Upload },
  { href: "/tower-records", label: "Tower Records", icon: Database },
  { href: "/account", label: "Account", icon: User },
];
 
function NavItems({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string | null;
}) {
  return (
    <>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname !== null && pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            title={collapsed ? label : undefined}
            className={cn(
              "flex h-10 items-center gap-3 rounded-card px-3 text-base transition-colors duration-150",
              active
                ? "bg-nav-active-bg font-semibold text-primary"
                : "text-heading hover:bg-canvas"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
            {!collapsed && <span>{label}</span>}
          </Link>
        );
      })}
    </>
  );
}
 
function ActiveNavItems({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  return <NavItems collapsed={collapsed} pathname={pathname} />;
}
 
export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
 
      <header className="sticky top-0 z-[100] flex h-[var(--header-height)] w-full items-center justify-between bg-primary px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-input bg-white" aria-hidden />
          <span className="text-xl font-bold text-on-primary">
            Infrastruktur Pasif
          </span>
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 text-on-primary"
          aria-label="User menu"
        >
          <User className="h-4 w-4" strokeWidth={2} />
          <span className="text-sm font-semibold">Normal User</span>
          <ChevronDown className="h-4 w-4" strokeWidth={2} />
        </button>
      </header>
 
      <div className="flex flex-1">
        <aside
          className={cn(
            "sticky top-[var(--header-height)] z-50 flex h-[calc(100vh-var(--header-height))] shrink-0 flex-col border-r border-border-soft bg-surface transition-all duration-200",
            collapsed ? "w-16" : "w-[var(--sidebar-width)]"
          )}
        >
          <nav
            aria-label="Main"
            className="flex flex-1 flex-col gap-1 px-2 py-4"
          >
            <Suspense
              fallback={<NavItems collapsed={collapsed} pathname={null} />}
            >
              <ActiveNavItems collapsed={collapsed} />
            </Suspense>
            <button
              type="button"
              onClick={() => router.push("/")}
              title={collapsed ? "Log out" : undefined}
              className={cn(
                "mt-1 flex h-10 items-center gap-3 rounded-card px-3 text-base text-logout transition-colors duration-150 hover:bg-danger-bg",
                collapsed && "justify-center"
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
              {!collapsed && <span>Log out</span>}
            </button>
          </nav>
 
          <div className="border-t border-border-soft px-3 py-3">
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-2 text-sm text-muted hover:text-heading"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  collapsed && "rotate-180"
                )}
                strokeWidth={2}
              />
              {!collapsed && <span>Collapse menu</span>}
            </button>
            {!collapsed && (
              <div className="mt-2 text-2xs text-faint">
                <p>App version 0.1</p>
                <p>Copyright</p>
              </div>
            )}
          </div>
        </aside>
 
        <main id="main-content" className="min-w-0 flex-1 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
