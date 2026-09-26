import Reveal from "./Reveal";

function About() {
  const principles = [
    {
      number: "01",
      title: "Make it clear.",
      text: "Visitors should understand the value of a business without having to search for it.",
    },
    {
      number: "02",
      title: "Make it credible.",
      text: "Strong visual decisions can change the way people perceive the quality of the business behind the screen.",
    },
    {
      number: "03",
      title: "Make it memorable.",
      text: "Small interactions, motion and thoughtful details can turn an ordinary visit into an experience.",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden px-6 py-32">
      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none absolute right-[-180px] top-20 h-[350px] w-[350px] rounded-full bg-blue-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute left-[-120px] bottom-20 h-[280px] w-[280px] rounded-full bg-cyan-300/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* MAIN INTRO */}

        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            {/* LEFT */}

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0866ff]">
                Why the work matters
              </p>

              <h2 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">
                Attention is
                <span className="block text-slate-300">expensive.</span>
              </h2>

              <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#0866ff] to-cyan-400" />
            </div>

            {/* RIGHT */}

            <div>
              <p className="text-2xl font-medium leading-10 text-slate-700">
                When someone lands on your website, you have a very short window
                to answer three questions:
                <span className="text-[#0866ff]">
                  {" "}
                  What is this? Why should I care? What should I do next?
                </span>
              </p>

              <p className="mt-8 max-w-2xl leading-8 text-slate-500">
                That's why I don't approach a website as a collection of pretty
                sections. I think about hierarchy, messaging, interaction and
                responsiveness together — because a beautiful website that
                confuses visitors isn't doing its job.
              </p>
            </div>
          </div>
        </Reveal>

        {/* PRINCIPLES */}

        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 120}>
              <div
                className={`group relative h-full overflow-hidden rounded-[2rem] p-8 transition duration-500 hover:-translate-y-2 ${
                  index === 1
                    ? "bg-[#071426] text-white hover:shadow-xl hover:shadow-blue-900/20"
                    : index === 2
                      ? "border border-blue-100 bg-blue-50 hover:border-cyan-300"
                      : "border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
                }`}
              >
                {/* TOP LIGHT */}

                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 group-hover:w-full" />

                <span
                  className={`text-sm font-bold ${
                    index === 1 ? "text-blue-400" : "text-blue-500"
                  }`}
                >
                  {principle.number}
                </span>

                <h3 className="mt-16 text-2xl font-black">{principle.title}</h3>

                <p
                  className={`mt-4 leading-7 ${
                    index === 1 ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {principle.text}
                </p>

                <div className="mt-8 h-px w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />

                <span
                  className={`absolute bottom-7 right-7 text-5xl font-black opacity-5 ${
                    index === 1 ? "text-white" : "text-[#0866ff]"
                  }`}
                >
                  {principle.number}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ABOUT BOTTOM STATEMENT */}

        <Reveal delay={200}>
          <div className="mt-20 overflow-hidden rounded-[2.5rem] bg-[#071426] p-8 text-white sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                  My approach
                </p>

                <h3 className="mt-4 text-3xl font-black sm:text-4xl">
                  Design with purpose.
                </h3>
              </div>

              <p className="max-w-xl leading-8 text-slate-400">
                Every color, section, interaction and line of code should
                contribute to the experience — not simply take up space.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
