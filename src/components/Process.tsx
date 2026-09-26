function Process() {
  const steps = [
    {
      number: "01",
      title: "Idea",
      description: "The problem, business or concept.",
    },
    {
      number: "02",
      title: "Concept",
      description: "Turn the idea into a clear experience.",
    },
    {
      number: "03",
      title: "Design",
      description: "Shape hierarchy, visuals and interaction.",
    },
    {
      number: "04",
      title: "Code",
      description: "Build the interface with modern tools.",
    },
    {
      number: "05",
      title: "Live",
      description: "Test, refine and put it online.",
    },
  ];

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0866ff]">
            The workflow
          </p>

          <h2 className="mt-6 text-5xl font-black tracking-tight sm:text-7xl">
            From idea
            <span className="text-slate-300"> → interface.</span>
          </h2>

          <p className="mt-7 max-w-2xl leading-8 text-slate-500">
            A website isn't created in one giant leap. It moves through
            decisions — each one getting the idea closer to something people can
            actually use.
          </p>
        </div>

        <div className="relative mt-24">
          {/* Desktop line */}
          <div className="absolute left-[7%] right-[7%] top-7 hidden h-px bg-slate-200 lg:block" />

          {/* Moving particle */}
          <div className="process-particle hidden lg:block" />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div key={step.number} className="group relative">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#0866ff] text-xs font-black text-white shadow-xl shadow-blue-500/20 transition duration-500 group-hover:scale-125 group-hover:bg-cyan-400">
                  {step.number}
                </div>

                <h3 className="mt-7 text-2xl font-black">{step.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 overflow-hidden rounded-[2.5rem] bg-[#071426] p-8 text-white sm:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
                The goal
              </p>

              <h3 className="mt-4 text-3xl font-black sm:text-5xl">
                Make the technology
                <span className="text-blue-400"> disappear.</span>
              </h3>
            </div>

            <p className="max-w-md leading-8 text-slate-400">
              People shouldn't notice the code. They should notice how easy the
              experience feels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
