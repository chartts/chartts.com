import Link from "next/link";

export default function NotFound() {
  return (
    <>
<div className="pt-32 px-6 max-w-2xl mx-auto text-center">
        <p className="text-8xl font-extrabold tracking-tight text-gradient">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold heading">Page not found</h1>
        <p className="mt-2 body-text">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </>
  );
}
