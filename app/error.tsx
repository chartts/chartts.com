"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-bg)' }}>
      <div className="text-center">
        <p className="text-8xl font-extrabold tracking-tight faint-text">
          500
        </p>
        <h1 className="mt-4 text-2xl font-bold heading">
          Something went wrong
        </h1>
        <p className="mt-2 body-text">
          An unexpected error occurred.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-semibold rounded-lg card heading hover:border-cyan-500/20 transition-all cursor-pointer"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
