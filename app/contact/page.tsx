import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Chart.ts team. Questions, feedback, partnership inquiries, and support.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Get in touch
          </h1>
          <p className="mt-4 text-lg body-text">
            Questions, feedback, partnerships, or just want to say hi.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-xl mx-auto">
          <form
            action="https://formspree.io/f/xpwzgkvl"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium heading mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg card body-text placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium heading mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg card body-text placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium heading mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 rounded-lg card body-text focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all cursor-pointer"
              >
                <option value="general">General question</option>
                <option value="bug">Bug report</option>
                <option value="feature">Feature request</option>
                <option value="partnership">Partnership</option>
                <option value="enterprise">Enterprise inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium heading mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg card body-text placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
                placeholder="What can we help with?"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <a
              href="https://github.com/chartts/chartts/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer text-center"
            >
              <p className="text-sm font-semibold heading">Bug reports</p>
              <p className="text-xs muted-text mt-1">GitHub Issues</p>
            </a>
            <a
              href="https://github.com/chartts/chartts/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer text-center"
            >
              <p className="text-sm font-semibold heading">Discussions</p>
              <p className="text-xs muted-text mt-1">GitHub Discussions</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
