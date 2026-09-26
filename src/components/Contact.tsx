import { useState, type FormEvent } from "react";

import Reveal from "./Reveal";

import { submitContact } from "../api/contacts";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");

      return;
    }

    if (form.message.trim().length < 10) {
      setError("Please write a little more about your project.");

      return;
    }

    try {
      setSending(true);

      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setSuccess("Message sent successfully. I'll get back to you soon.");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#061326] px-6 py-28 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
              Let's work together
            </p>

            <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Have an idea?
              <span className="block text-slate-400">Let's build it.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              Whether you need a business website, landing page, personal brand
              or custom frontend experience, tell me what you're building.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="space-y-5">
              <a
                href="mailto:YOUR_EMAIL_HERE"
                className="group block rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-blue-400/40 hover:bg-white/10"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Email
                </p>

                <p className="mt-3 break-all text-lg font-bold text-white transition group-hover:text-blue-400">
                  Adamolamilekan1440@gmail.com
                </p>
              </a>

              <a
                href="https://wa.me/2349035065094"
                target="_blank"
                rel="noreferrer"
                className="group block rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-blue-400/40 hover:bg-white/10"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  WhatsApp
                </p>

                <p className="mt-3 text-lg font-bold text-white transition group-hover:text-blue-400">
                  Let's chat →
                </p>
              </a>

              <a
                href="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="group block rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-blue-400/40 hover:bg-white/10"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  LinkedIn
                </p>

                <p className="mt-3 text-lg font-bold text-white transition group-hover:text-blue-400">
                  Connect with me →
                </p>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-white p-7 text-[#071426] shadow-2xl sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-bold">Lilkay</label>

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold">Email</label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="john@email.com"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm font-bold">
                  Tell me about your project
                </label>

                <textarea
                  required
                  rows={7}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  placeholder="I need a website for my business..."
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {success && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="mt-6 w-full rounded-full bg-[#0866ff] px-7 py-4 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send message →"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
