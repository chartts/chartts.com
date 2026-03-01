import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Chart.ts",
  description:
    "Updates, tutorials, and deep dives from the Chart.ts team. Learn about data visualization best practices.",
};

const POSTS_PER_PAGE = 6;

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const posts = getAllPosts();

  // Pinned = top 3 most recent
  const pinned = posts.slice(0, 3);
  const remaining = posts.slice(3);

  // Pagination
  // Note: searchParams is a Promise in Next 15 but for static export we read synchronously
  // For static export, pagination uses client-side filtering
  const totalPages = Math.max(1, Math.ceil(remaining.length / POSTS_PER_PAGE));

  // Collect all tags with counts
  const tagCounts: Record<string, number> = {};
  for (const post of posts) {
    if (post.tag) {
      tagCounts[post.tag] = (tagCounts[post.tag] || 0) + 1;
    }
  }
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="section-label text-cyan-400 mb-4">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
              Updates & Tutorials
            </h1>
            <p className="mt-4 text-lg body-text">
              Deep dives, release notes, and data visualization best practices.
            </p>
          </div>

          {/* Featured / Pinned Posts */}
          {pinned.length > 0 && (
            <section className="mb-16">
              <p className="text-xs font-mono muted-text uppercase tracking-wider mb-4">
                Featured
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pinned.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group block rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer overflow-hidden ${
                      i === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <div className={`p-6 ${i === 0 ? "md:p-8" : ""}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {post.tag}
                        </span>
                        <span className="text-xs faint-text">{post.date}</span>
                      </div>
                      <h2
                        className={`font-semibold heading group-hover:text-cyan-400 transition-colors mb-2 ${
                          i === 0 ? "text-xl md:text-2xl" : "text-lg"
                        }`}
                      >
                        {post.title}
                      </h2>
                      <p
                        className={`muted-text leading-relaxed ${
                          i === 0 ? "text-sm md:text-base" : "text-sm"
                        }`}
                      >
                        {post.description}
                      </p>
                      <span className="inline-block mt-4 text-xs text-cyan-400 font-medium group-hover:underline">
                        Read more
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All Other Posts */}
          {remaining.length > 0 && (
            <section className="mb-16">
              <p className="text-xs font-mono muted-text uppercase tracking-wider mb-4">
                All Posts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {remaining.map((post) => (
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
            </section>
          )}

          {/* Keywords Cloud */}
          {sortedTags.length > 0 && (
            <section className="pt-8" style={{ borderTop: "1px solid var(--c-border)" }}>
              <p className="text-xs font-mono muted-text uppercase tracking-wider mb-4">
                Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {sortedTags.map(([tag, count]) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm card body-text"
                  >
                    {tag}
                    <span className="text-[10px] font-mono muted-text">
                      {count}
                    </span>
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
