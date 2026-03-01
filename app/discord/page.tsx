import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord Community",
  description:
    "Join the Chart.ts Discord community. Get help, share projects, and connect with other developers.",
};

export default function DiscordPage() {
  return (
    <>
<section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
            Community
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Join our Discord
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            Get help from the community, share what you are building, report
            bugs, request features, and stay up to date with Chart.ts
            development.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold heading mb-3">
              Chart.ts Community
            </h2>
            <p className="body-text mb-8">
              Our Discord server is opening soon. Star the repo on GitHub to
              get notified when it launches.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://github.com/chartts/chartts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer text-center"
              >
                Star on GitHub
              </a>
              <Link
                href="/blog"
                className="w-full px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer text-center"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
</>
  );
}
