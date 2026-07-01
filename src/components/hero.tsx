export default function Hero() {
  return (
    <main className="flex h-screen w-full overflow-hidden">
      <div className="relative flex w-1/2 items-center justify-end pr-8">
        <div className="halftone-light absolute inset-0" />
        <div className="relative z-10 max-w-lg text-right">
          <span className="font-mono text-xs tracking-widest text-on-surface-variant uppercase">
            Creative Technologist
          </span>
          <h1 className="mt-4 font-display text-7xl font-bold leading-none tracking-tighter text-primary">
            Engineering
            <br />
            the Digital
            <br />
            Future
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
            Creating high-performance web experiences with precision
            and minimalist aesthetics.
          </p>
          <div className="mt-10 flex justify-end gap-4">
            <a
              href="#work"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-surface transition-opacity hover:opacity-90"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-block rounded-lg border border-primary px-8 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-surface"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      <div className="relative flex w-1/2 items-center justify-start pl-8 bg-primary">
        <div className="halftone-dark absolute inset-0" />
        <div className="relative z-10 max-w-lg">
          <p className="font-mono text-xs tracking-widest text-inverse-on-surface/60 uppercase">
            Featured Work
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-inverse-on-surface">
            Every pixel tells a story. Every interaction is intentional.
          </h2>
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-inverse-primary">
                5+
              </span>
              <div className="font-mono text-xs text-inverse-on-surface/60">
                Years
                <br />
                Experience
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-inverse-primary">
                50+
              </span>
              <div className="font-mono text-xs text-inverse-on-surface/60">
                Projects
                <br />
                Delivered
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
