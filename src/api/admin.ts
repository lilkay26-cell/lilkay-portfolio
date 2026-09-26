const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: "admin";
};

export async function getAdminProfile(): Promise<AdminProfile> {
  const response = await fetch(`${API_URL}/api/admin/profile`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load admin profile.");
  }

  return data.user;
}

export async function updateAdminProfile(values: {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<AdminProfile> {
  const response = await fetch(`${API_URL}/api/admin/profile`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update admin profile.");
  }

  return data.user;
}
