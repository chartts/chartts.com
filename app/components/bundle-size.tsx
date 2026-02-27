export function BundleSize() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="section-label text-cyan-400 mb-4">Bundle size</p>

        <div className="flex items-baseline justify-center gap-2">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-gradient">
            15kb
          </span>
          <span className="text-2xl sm:text-3xl font-semibold faint-text">
            gzipped
          </span>
        </div>

        <p className="mt-6 text-xl sm:text-2xl font-semibold heading">
          The entire library. Not per chart. Total.
        </p>

        <p className="mt-4 text-base body-text max-w-xl mx-auto">
          48 chart types, every renderer, full TypeScript, tree-shakeable.
          Smaller than most hero images.
        </p>
      </div>
    </section>
  );
}
