function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-6 pb-20 pt-40 sm:pt-44"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-15%] top-[15%] h-[500px] w-[500px] rounded-full bg-blue-400/15 blur-[130px]" />

      <div className="pointer-events-none absolute right-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-300/15 blur-[130px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#0866ff_1px,transparent_1px),linear-gradient(90deg,#0866ff_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-12 bg-[#0866ff]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0866ff]">
            Digital experiences / Frontend development
          </span>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          {/* LEFT */}
          <div>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl lg:text-[94px]">
              Your business
              <span className="block text-slate-300">deserves more</span>
              <span className="relative inline-block text-[#0866ff]">
                than a website.
                <span className="absolute -bottom-4 left-0 h-1.5 w-24 bg-cyan-400" />
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">
              I design and build digital experiences that make businesses easier
              to understand, easier to trust, and harder to forget. From the
              first visual impression to the final interaction, every detail has
              a job.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="group relative overflow-hidden rounded-full bg-[#0866ff] px-7 py-4 font-semibold text-white shadow-xl shadow-blue-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                <span className="relative z-10">See what I've built</span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transition duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href="#contact"
                className="group rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-[#0866ff]"
              >
                Start a conversation
                <span className="ml-2 inline-block transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <span>Responsive</span>
              <span>Interactive</span>
              <span>Modern</span>
              <span>Built with React</span>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto h-[480px] w-full max-w-[540px]">
            {/* Orbit 1 */}
            <div className="orbit absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/70">
              <div className="orbit-light" />
            </div>

            {/* Orbit 2 */}
            <div className="orbit-reverse absolute left-1/2 top-1/2 h-[315px] w-[315px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/60">
              <div className="orbit-light cyan" />
            </div>

            {/* Center browser */}
            <div className="absolute left-1/2 top-1/2 w-[290px] -translate-x-1/2 -translate-y-1/2">
              <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-5 shadow-[0_35px_100px_rgba(15,23,42,0.16)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_40px_120px_rgba(37,99,235,0.2)]">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-50/80 to-transparent transition duration-1000 group-hover:translate-x-full" />

                <div className="relative">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
                      live preview
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#071426] p-5">
                    <div className="flex justify-between">
                      <div className="h-2 w-12 rounded-full bg-blue-400" />
                      <div className="h-2 w-16 rounded-full bg-white/10" />
                    </div>

                    <div className="mt-8">
                      <div className="h-4 w-32 rounded bg-white" />
                      <div className="mt-2 h-2 w-44 rounded bg-white/20" />
                      <div className="mt-6 h-9 w-24 rounded-full bg-blue-500" />
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-2">
                      <div className="h-14 rounded-lg bg-blue-400/20" />
                      <div className="h-14 rounded-lg bg-cyan-400/20" />
                      <div className="h-14 rounded-lg bg-white/10" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400">
                        Experience
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        Designed to connect.
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition group-hover:rotate-45">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="float-one absolute left-0 top-20 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Design
              </p>

              <p className="mt-1 font-bold text-[#0866ff]">Clear</p>
            </div>

            <div className="float-two absolute bottom-16 right-0 rounded-2xl border border-cyan-100 bg-white px-5 py-4 shadow-xl">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Motion
              </p>

              <p className="mt-1 font-bold text-cyan-500">Intentional</p>
            </div>

            <span className="float-three absolute right-20 top-5 h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.8)]" />

            <span className="float-four absolute bottom-24 left-16 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]" />
          </div>
        </div>

        {/* Scroll line */}
        <div className="mt-20 flex items-center gap-5">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Scroll to explore
          </span>

          <div className="h-px flex-1 overflow-hidden bg-slate-200">
            <div className="line-travel h-full w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
