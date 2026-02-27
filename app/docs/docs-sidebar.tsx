"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarSection {
  title: string;
  links: { label: string; href: string }[];
}

export function DocsSidebar({ sections }: { sections: SidebarSection[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open]);

  const sidebarContent = (
    <nav className="space-y-8">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="text-xs font-mono muted-text uppercase tracking-wider mb-3">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm py-1 transition-colors cursor-pointer ${
                    pathname === link.href
                      ? "text-cyan-400 font-medium"
                      : "body-text hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile sidebar toggle button - fixed at bottom */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all backdrop-blur-xl shadow-lg cursor-pointer"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        aria-expanded={open}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M3 12h18M3 6h18M3 18h18" />
            </>
          )}
        </svg>
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      {/* Desktop sidebar - always visible */}
      <aside className="hidden lg:block w-64 shrink-0 border-r adaptive-border sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-6">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel - slides from left */}
          <div className="absolute top-16 left-0 bottom-0 w-72 border-r adaptive-border overflow-y-auto">
            <div className="absolute inset-0 nav-bg backdrop-blur-xl" />
            <div className="relative py-8 px-6">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
