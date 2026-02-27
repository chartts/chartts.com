import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

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
          <ContactForm />

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
