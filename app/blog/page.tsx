import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Chart.ts",
  description:
    "Updates, tutorials, and deep dives from the Chart.ts team. Learn about data visualization best practices.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
<div className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="section-label text-cyan-400 mb-4">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
              Updates & Tutorials
            </h1>
            <p className="mt-4 text-lg body-text">
              Deep dives, release notes, and data visualization best practices.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {post.tag}
                  </span>
                  <span className="text-xs faint-text">{post.date}</span>
                  <span className="text-xs faint-text">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold heading group-hover:text-cyan-400 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm muted-text leading-relaxed">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
