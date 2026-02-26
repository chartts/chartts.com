import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/lib/mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Chart.ts Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
<div className="pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/blog"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors cursor-pointer"
              >
                Blog
              </Link>
              <span className="faint-text">/</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {post.tag}
              </span>
              <span className="text-xs faint-text">{post.date}</span>
              <span className="text-xs faint-text">{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight heading">
              {post.title}
            </h1>
            <p className="mt-4 text-lg body-text leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Content */}
          <div className="prose-chartts">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: {
                          dark: "github-dark-dimmed",
                          light: "github-light",
                        },
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {/* Back */}
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>
            <Link
              href="/blog"
              className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors cursor-pointer"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
