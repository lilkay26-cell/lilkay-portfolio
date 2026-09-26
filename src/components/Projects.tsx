import { useEffect, useState } from "react";

import Reveal from "./Reveal";

import { getProjects, getProjectImageUrl, type Project } from "../api/projects";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();

        setProjects(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load projects right now.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section id="work" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute left-[-180px] top-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0866ff]">
                Selected work
              </p>

              <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
                Built to
                <span className="block text-slate-300">be remembered.</span>
              </h2>
            </div>

            <p className="max-w-md leading-8 text-slate-500">
              A collection of responsive interfaces and frontend experiences
              built with modern web technologies.
            </p>
          </div>
        </Reveal>

        {loading && (
          <div className="mt-20 grid gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-[2rem] bg-slate-200"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-20 rounded-[2rem] border border-red-200 bg-red-50 p-8 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-20 rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500">
            No projects available yet.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-20 grid gap-10">
            {projects.map((project, index) => {
              const imageUrl = getProjectImageUrl(project.image);

              return (
                <Reveal key={project._id} delay={index * 120}>
                  <article className="group overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="relative overflow-hidden bg-slate-100">
                      <div className="absolute left-6 top-6 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#0866ff] backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <img
                        src={imageUrl}
                        alt={`${project.title} screenshot`}
                        className="block h-auto max-h-[700px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>

                    <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:p-10">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#0866ff]">
                          {project.category}
                        </p>

                        <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                          {project.title}
                        </h3>

                        <p className="mt-5 max-w-2xl leading-8 text-slate-500">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 lg:self-end">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-[#0866ff] px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          Live site →
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-[#0866ff]"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
