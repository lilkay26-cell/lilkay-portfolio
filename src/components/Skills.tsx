import Reveal from "./Reveal";

function Skills() {
  const categories = [
    {
      title: "Frontend",
      skills: [
        "HTML",
        "CSS",
        "Tailwind CSS",
        "JavaScript",
        "React",
        "TypeScript",
      ],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "REST APIs", "MongoDB"],
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "VS Code", "Vercel", "Figma"],
    },
  ];

  const coreStack = [
    "HTML",
    "Tailwind CSS",
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-blue-50 px-6 py-32"
    >
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute right-[-180px] top-20 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-10 left-[-150px] h-[350px] w-[350px] rounded-full bg-cyan-300/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}

        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0866ff]">
                Technology & tools
              </p>

              <h2 className="mt-6 text-5xl font-black tracking-tight sm:text-7xl">
                The stack behind
                <span className="block text-slate-400">the interface.</span>
              </h2>

              <p className="mt-8 max-w-xl leading-8 text-slate-500">
                I use modern web technologies to turn ideas into responsive,
                interactive and maintainable digital experiences.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Always learning. Always building.
                </span>
              </div>
            </div>

            {/* TECHNOLOGY NETWORK */}

            <div className="relative min-h-[440px]">
              <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/70" />

              <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/70" />

              <div className="network-line network-line-1" />
              <div className="network-line network-line-2" />
              <div className="network-line network-line-3" />
              <div className="network-line network-line-4" />
              <div className="network-line network-line-5" />
              <div className="network-line network-line-6" />

              {/* CENTER */}

              <div className="network-center">
                <span className="text-[9px] uppercase tracking-[0.2em] text-blue-300">
                  lilkay
                </span>

                <strong className="mt-1 text-xl font-black text-white">
                  TECH
                </strong>
              </div>

              {/* TECHNOLOGY NODES */}

              {coreStack.map((skill, index) => (
                <div key={skill} className={`tech-node tech-node-${index + 1}`}>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CATEGORY CARDS */}

        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 120}>
              <div className="group relative h-full overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-[0_25px_70px_rgba(37,99,235,0.12)]">
                {/* TOP ANIMATED LINE */}

                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 group-hover:w-full" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black tracking-[0.2em] text-blue-300">
                      0{index + 1}
                    </span>

                    <h3 className="mt-2 text-2xl font-black">
                      {category.title}
                    </h3>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition duration-500 group-hover:rotate-45 group-hover:bg-[#0866ff] group-hover:text-white">
                    ↗
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CORE STACK */}

        <Reveal delay={100}>
          <div className="mt-16 overflow-hidden rounded-[2.5rem] bg-[#071426] p-8 text-white sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
                  Core stack
                </p>

                <h3 className="mt-3 text-3xl font-black">What I build with.</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {coreStack.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CURRENTLY LEARNING */}

        <Reveal delay={150}>
          <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0866ff]">
                  Current focus
                </p>

                <h3 className="mt-3 text-3xl font-black">Always building.</h3>

                <p className="mt-4 max-w-lg leading-7 text-slate-500">
                  I'm continuously expanding my skills by turning what I learn
                  into real projects instead of only studying theory.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-blue-50 px-5 py-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-blue-600">
                    Currently learning
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    Full-stack development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* BOTTOM STATEMENT */}

        <Reveal delay={200}>
          <div className="mt-20 border-t border-blue-200 pt-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-2xl font-bold leading-relaxed tracking-tight text-slate-700 sm:text-3xl">
                Technology changes quickly.
                <span className="text-[#0866ff]">
                  {" "}
                  The ability to keep learning matters more.
                </span>
              </p>

              <span className="text-6xl font-black tracking-[-0.08em] text-blue-100 sm:text-8xl">
                STACK
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
