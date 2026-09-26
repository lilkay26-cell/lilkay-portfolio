function Stats() {
  const stats = [
    ["03+", "Projects shipped"],
    ["06", "Core technologies"],
    ["100%", "Responsive"],
    ["∞", "Room to grow"],
  ];

  return (
    <section className="border-y border-slate-100 bg-white px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map(([number, label]) => (
          <div key={label} className="group text-center">
            <p className="text-3xl font-black text-[#0866ff] transition duration-300 group-hover:-translate-y-1 group-hover:text-cyan-500 sm:text-4xl">
              {number}
            </p>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
