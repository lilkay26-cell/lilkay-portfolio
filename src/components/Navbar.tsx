import { useEffect, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Work", "#work"],
    ["Process", "#process"],
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full px-4 pt-4 transition-all duration-500 sm:px-6 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border px-5 py-4 transition-all duration-500 ${
          scrolled
            ? "border-blue-200/70 bg-white/90 py-3 shadow-[0_15px_50px_rgba(15,23,42,0.12)]"
            : "border-slate-200/80 bg-white/80 shadow-[0_15px_50px_rgba(15,23,42,0.06)]"
        } backdrop-blur-xl`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[#071426] text-sm font-black text-white transition duration-300 group-hover:rotate-6 group-hover:bg-[#0866ff]">
              L
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
            </div>

            <span className="text-lg font-black tracking-tight">
              lilkay
              <span className="text-[#0866ff]">_tech</span>
            </span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="group relative text-sm font-medium text-slate-500 transition duration-300 hover:text-[#0866ff]"
              >
                {label}

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#0866ff] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <a
            href="#contact"
            className="hidden rounded-full bg-[#071426] px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#0866ff] hover:shadow-lg hover:shadow-blue-500/20 md:block"
          >
            Let's talk →
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:border-blue-300 hover:bg-blue-50 md:hidden"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-slate-800" />
              <span className="block h-0.5 w-5 bg-slate-800" />
              <span className="block h-0.5 w-3 bg-slate-800" />
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-5 border-t border-slate-100 pt-5 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0866ff]"
                >
                  {label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-[#071426] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0866ff]"
              >
                Let's talk
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
