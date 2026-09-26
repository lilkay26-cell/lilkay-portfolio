import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from "../api/projects";

import { getContacts, deleteContact, type Contact } from "../api/contacts";

import {
  getAdminProfile,
  updateAdminProfile,
  type AdminProfile,
} from "../api/admin";

import { logoutAdmin } from "../api/auth";

const API_URL = import.meta.env.VITE_API_URL;

type ProjectForm = {
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  image: File | null;
};

const emptyProjectForm: ProjectForm = {
  title: "",
  category: "",
  description: "",
  liveUrl: "",
  githubUrl: "",
  image: null,
};

function getImageUrl(image: string) {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/api/")) {
    return `${API_URL}${image}`;
  }

  return image;
}

function AdminDashboard() {
  const navigate = useNavigate();

  /* =========================
     DASHBOARD STATE
  ========================= */

  const [projects, setProjects] = useState<Project[]>([]);

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [admin, setAdmin] = useState<AdminProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [dashboardMessage, setDashboardMessage] = useState("");

  /* =========================
     PROJECT STATE
  ========================= */

  const [showProjectModal, setShowProjectModal] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProjectForm);

  const [projectPreview, setProjectPreview] = useState("");

  const [savingProject, setSavingProject] = useState(false);

  const [projectMessage, setProjectMessage] = useState("");

  /* =========================
     PROFILE STATE
  ========================= */

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);

  const [adminMessage, setAdminMessage] = useState("");

  const [adminError, setAdminError] = useState("");

  /* =========================
     LOAD DASHBOARD
  ========================= */

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [projectsData, contactsData, profileData] = await Promise.all([
        getProjects(),
        getContacts(),
        getAdminProfile(),
      ]);

      setProjects(projectsData);
      setContacts(contactsData);
      setAdmin(profileData);

      setProfileForm({
        name: profileData.name,
        email: profileData.email,
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to load dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  /* =========================
     PROJECT MODAL
  ========================= */

  function openCreateProject() {
    setEditingProject(null);

    setProjectForm({
      ...emptyProjectForm,
    });

    setProjectPreview("");
    setProjectMessage("");
    setDashboardMessage("");

    setShowProjectModal(true);
  }

  function openEditProject(project: Project) {
    setEditingProject(project);

    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      image: null,
    });

    setProjectPreview(getImageUrl(project.image));

    setProjectMessage("");
    setDashboardMessage("");

    setShowProjectModal(true);
  }

  function closeProjectModal() {
    if (savingProject) {
      return;
    }

    setShowProjectModal(false);
    setEditingProject(null);

    setProjectForm({
      ...emptyProjectForm,
    });

    setProjectPreview("");
    setProjectMessage("");
  }

  /* =========================
     IMAGE PICKER
  ========================= */

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setProjectMessage("Please select a JPG, PNG or WebP image.");

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProjectMessage("Image must be 5MB or smaller.");

      event.target.value = "";
      return;
    }

    setProjectForm((current) => ({
      ...current,
      image: file,
    }));

    setProjectPreview(URL.createObjectURL(file));

    setProjectMessage("");
  }

  /* =========================
     CREATE / UPDATE PROJECT
  ========================= */

  async function handleProjectSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingProject) {
      return;
    }

    setProjectMessage("");

    const title = projectForm.title.trim();

    const category = projectForm.category.trim();

    const description = projectForm.description.trim();

    const liveUrl = projectForm.liveUrl.trim();

    const githubUrl = projectForm.githubUrl.trim();

    if (!title || !category || !description || !liveUrl || !githubUrl) {
      setProjectMessage("Please fill in all project fields.");

      return;
    }

    if (!editingProject && !projectForm.image) {
      setProjectMessage("Please choose a project image.");

      return;
    }

    try {
      setSavingProject(true);

      const projectData = {
        title,
        category,
        description,
        liveUrl,
        githubUrl,
        image: projectForm.image,
      };

      if (editingProject) {
        await updateProject(editingProject._id, projectData);

        setDashboardMessage("Project updated successfully.");
      } else {
        await createProject(projectData);

        setDashboardMessage("Project created successfully.");
      }

      await loadDashboard();

      setShowProjectModal(false);

      setEditingProject(null);

      setProjectForm({
        ...emptyProjectForm,
      });

      setProjectPreview("");
    } catch (error) {
      console.error("PROJECT SAVE ERROR:", error);

      setProjectMessage(
        error instanceof Error ? error.message : "Failed to save project.",
      );
    } finally {
      setSavingProject(false);
    }
  }

  /* =========================
     DELETE PROJECT
  ========================= */

  async function handleDeleteProject(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(id);

      setProjects((current) => current.filter((project) => project._id !== id));

      setDashboardMessage("Project deleted successfully.");
    } catch (error) {
      console.error(error);

      setDashboardMessage(
        error instanceof Error ? error.message : "Failed to delete project.",
      );
    }
  }

  /* =========================
     DELETE CONTACT
  ========================= */

  async function handleDeleteContact(id: string) {
    const confirmed = window.confirm("Delete this message?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteContact(id);

      setContacts((current) => current.filter((contact) => contact._id !== id));

      setDashboardMessage("Message deleted successfully.");
    } catch (error) {
      console.error(error);

      setDashboardMessage(
        error instanceof Error ? error.message : "Failed to delete message.",
      );
    }
  }

  /* =========================
     PROFILE SETTINGS
  ========================= */

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingProfile) {
      return;
    }

    setAdminMessage("");
    setAdminError("");

    try {
      setSavingProfile(true);

      const updated = await updateAdminProfile({
        name: profileForm.name.trim(),
        email: profileForm.email.trim(),
        currentPassword: profileForm.currentPassword || undefined,
        newPassword: profileForm.newPassword || undefined,
      });

      setAdmin(updated);

      localStorage.setItem("adminUser", JSON.stringify(updated));

      setProfileForm({
        name: updated.name,
        email: updated.email,
        currentPassword: "",
        newPassword: "",
      });

      setAdminMessage("Account settings updated successfully.");
    } catch (error) {
      console.error(error);

      setAdminError(
        error instanceof Error ? error.message : "Failed to update account.",
      );
    } finally {
      setSavingProfile(false);
    }
  }

  /* =========================
     LOGOUT
  ========================= */

  function handleLogout() {
    logoutAdmin();

    navigate("/admin/login");
  }

  /* =========================
     LOADING SCREEN
  ========================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#061326] text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-blue-400" />

          <p className="mt-6 text-sm font-semibold text-slate-400">
            Loading admin dashboard...
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     DASHBOARD
  ========================= */

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-[#071426]">
      {/* =====================
          HEADER
      ===================== */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061326]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-blue-400">
              lilkay_tech
            </p>

            <h1 className="mt-1 text-xl font-black sm:text-2xl">
              Admin Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* =====================
            GLOBAL MESSAGES
        ===================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 font-semibold text-red-600">
            {error}
          </div>
        )}

        {dashboardMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 p-5 font-semibold text-green-700">
            <span>{dashboardMessage}</span>

            <button
              type="button"
              onClick={() => setDashboardMessage("")}
              className="ml-4 text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}

        {/* =====================
            WELCOME
        ===================== */}

        <section className="mb-10 overflow-hidden rounded-[2rem] bg-[#061326] p-7 text-white shadow-xl shadow-blue-900/10 sm:p-10">
          <div className="relative">
            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                Control center
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Welcome back
                {admin?.name ? `, ${admin.name}` : ""}.
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                Manage your portfolio projects, contact messages and admin
                account from one place.
              </p>
            </div>
          </div>
        </section>

        {/* =====================
            STATS
        ===================== */}

        <section className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Projects
              </p>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
                Work
              </span>
            </div>

            <p className="mt-4 text-4xl font-black">{projects.length}</p>

            <p className="mt-2 text-sm text-slate-500">
              Published portfolio projects
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Messages
              </p>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
                Inbox
              </span>
            </div>

            <p className="mt-4 text-4xl font-black">{contacts.length}</p>

            <p className="mt-2 text-sm text-slate-500">
              Contact messages received
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Admin
              </p>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600">
                Active
              </span>
            </div>

            <p className="mt-4 truncate text-lg font-black">{admin?.email}</p>

            <p className="mt-2 text-sm text-slate-500">Current administrator</p>
          </div>
        </section>

        {/* =====================
            PROJECTS
        ===================== */}

        <section className="mt-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                Portfolio content
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Projects
              </h2>

              <p className="mt-2 max-w-xl text-slate-500">
                Add and manage the projects that appear on your public
                portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateProject}
              className="rounded-full bg-[#0866ff] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              + Add project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="mt-7 rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                +
              </div>

              <h3 className="mt-5 text-xl font-black">No projects yet</h3>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                Add your first project and it will appear on your public
                portfolio.
              </p>

              <button
                type="button"
                onClick={openCreateProject}
                className="mt-6 rounded-full bg-[#0866ff] px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const imageUrl = getImageUrl(project.image);

                return (
                  <article
                    key={project._id}
                    className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                        {project.category}
                      </p>

                      <h3 className="mt-2 text-xl font-black">
                        {project.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openEditProject(project)}
                          className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project._id)}
                          className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                        >
                          Delete
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                          >
                            Live ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* =====================
            MESSAGES
        ===================== */}

        <section className="mt-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
              Contact form
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Messages
            </h2>

            <p className="mt-2 text-slate-500">
              Messages submitted through your public portfolio.
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {contacts.length === 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500">
                No messages yet.
              </div>
            ) : (
              contacts.map((contact) => (
                <article
                  key={contact._id}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7"
                >
                  <div className="flex flex-col justify-between gap-6 sm:flex-row">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-black">{contact.name}</h3>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                          New message
                        </span>
                      </div>

                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-2 block text-sm font-semibold text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>

                      <p className="mt-5 max-w-3xl whitespace-pre-wrap leading-7 text-slate-600">
                        {contact.message}
                      </p>

                      <p className="mt-4 text-xs font-semibold text-slate-400">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteContact(contact._id)}
                      className="h-fit rounded-full bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* =====================
            ACCOUNT SETTINGS
        ===================== */}

        <section className="mt-16 pb-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
              Account
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Admin settings
            </h2>

            <p className="mt-2 text-slate-500">
              Change the account details used to access this dashboard.
            </p>
          </div>

          <form
            onSubmit={handleProfileSubmit}
            className="mt-7 max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
          >
            {adminMessage && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                {adminMessage}
              </div>
            )}

            {adminError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {adminError}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold">Name</label>

                <input
                  value={profileForm.name}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label className="text-sm font-bold">Email</label>

                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="border-t border-slate-100 pt-5">
                <p className="text-sm font-black">Change password</p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Leave these fields empty if you only want to change your name
                  or email.
                </p>
              </div>

              <div>
                <label className="text-sm font-bold">Current password</label>

                <input
                  type="password"
                  value={profileForm.currentPassword}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      currentPassword: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label className="text-sm font-bold">New password</label>

                <input
                  type="password"
                  value={profileForm.newPassword}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      newPassword: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="rounded-full bg-[#0866ff] px-7 py-3.5 font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingProfile ? "Saving..." : "Save account settings"}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* =========================
          PROJECT MODAL
      ========================= */}

      {showProjectModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#061326]/80 px-4 py-8 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProjectModal();
            }
          }}
        >
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="border-b border-slate-100 bg-[#061326] p-7 text-white sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                    {editingProject ? "Edit project" : "New project"}
                  </p>

                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    {editingProject ? "Update project" : "Add project"}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Add the information that should appear on your portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeProjectModal}
                  disabled={savingProject}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </div>

            {/* MODAL FORM */}

            <form
              onSubmit={handleProjectSubmit}
              className="space-y-5 p-7 sm:p-8"
            >
              {projectMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                  {projectMessage}
                </div>
              )}

              {/* TITLE */}

              <div>
                <label className="text-sm font-bold">Project title</label>

                <input
                  type="text"
                  required
                  placeholder="Frontend Mentor Project 1"
                  value={projectForm.title}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="text-sm font-bold">Category</label>

                <input
                  type="text"
                  required
                  placeholder="Frontend Development"
                  value={projectForm.category}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="text-sm font-bold">Description</label>

                <textarea
                  required
                  rows={4}
                  placeholder="Describe what you built..."
                  value={projectForm.description}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* IMAGE */}

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-bold">
                    Project screenshot
                  </label>

                  <span className="text-xs font-semibold text-slate-400">
                    Max 5MB
                  </span>
                </div>

                <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
                    ↑
                  </div>

                  <p className="mt-3 text-sm font-bold text-slate-700">
                    Choose project image
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    JPG, PNG or WebP
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {projectPreview && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <img
                      src={projectPreview}
                      alt="Project preview"
                      className="max-h-80 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* LIVE URL */}

              <div>
                <label className="text-sm font-bold">Live URL</label>

                <input
                  type="url"
                  required
                  placeholder="https://your-project.vercel.app"
                  value={projectForm.liveUrl}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      liveUrl: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* GITHUB URL */}

              <div>
                <label className="text-sm font-bold">GitHub URL</label>

                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project"
                  value={projectForm.githubUrl}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      githubUrl: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* ACTIONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeProjectModal}
                  disabled={savingProject}
                  className="rounded-full border border-slate-200 px-7 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingProject}
                  className="rounded-full bg-[#0866ff] px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProject
                    ? "Saving..."
                    : editingProject
                      ? "Update project"
                      : "Create project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
