export type Project = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectInput = {
  title: string;
  category: string;
  description: string;
  image?: File | null;
  liveUrl: string;
  githubUrl: string;
};

export const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getProjectImageUrl(image: string) {
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

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/api/projects`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Failed to fetch projects. Status: ${response.status}`,
    );
  }

  return data.projects;
}

function createFormData(project: ProjectInput) {
  const formData = new FormData();

  formData.append("title", project.title.trim());

  formData.append("category", project.category.trim());

  formData.append("description", project.description.trim());

  formData.append("liveUrl", project.liveUrl.trim());

  formData.append("githubUrl", project.githubUrl.trim());

  if (project.image) {
    formData.append("image", project.image);
  }

  return formData;
}

export async function createProject(project: ProjectInput): Promise<Project> {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: createFormData(project),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create project.");
  }

  return data.project;
}

export async function updateProject(
  id: string,
  project: ProjectInput,
): Promise<Project> {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: createFormData(project),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update project.");
  }

  return data.project;
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete project.");
  }

  return data;
}
