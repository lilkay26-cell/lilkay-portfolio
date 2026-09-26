function Services() {
  const services = [
    {
      number: "01",
      title: "Business websites",
      description:
        "A digital storefront that communicates what you offer, establishes credibility and gives potential customers a clear path forward.",
    },
    {
      number: "02",
      title: "Landing pages",
      description:
        "Focused pages built around a specific product, service or campaign — with the design keeping attention on the goal.",
    },
    {
      number: "03",
      title: "Personal brands",
      description:
        "A distinctive online presence for people who need more than a résumé — a website that actually represents who they are and what they do.",
    },
    {
      number: "04",
      title: "Frontend experiences",
      description:
        "Responsive interfaces built with modern frontend technologies, reusable components and interactions that make the experience feel polished.",
    },
  ];

  return (
    <section id="services" className="bg-[#071426] px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
            What I can build
          </p>

          <h2 className="mt-6 text-5xl font-black tracking-tight sm:text-7xl">
            Your idea has a<span className="text-blue-400"> place online.</span>
          </h2>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.number}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 p-8 transition duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.04]"
            >
              <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 group-hover:w-full" />

              <div className="flex items-start justify-between">
                <span className="text-sm font-bold text-blue-400">
                  {service.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-500 transition duration-300 group-hover:rotate-45 group-hover:border-blue-400 group-hover:text-blue-400">
                  ↗
                </span>
              </div>

              <h3 className="mt-16 text-3xl font-black">{service.title}</h3>

              <p className="mt-5 max-w-lg leading-8 text-slate-400">
                {service.description}
              </p>

              <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-blue-400">
                Explore service
                <span className="transition duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
