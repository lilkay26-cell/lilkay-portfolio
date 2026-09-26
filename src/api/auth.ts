const API_URL = import.meta.env.VITE_API_URL;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin";
};

type LoginResponse = {
  success: boolean;
  message: string;
  token: string;
  user: AdminUser;
};

export async function loginAdmin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
}

export function getToken() {
  return localStorage.getItem("adminToken");
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
}

export function saveAdminSession(token: string, user: AdminUser) {
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminUser", JSON.stringify(user));
}

export function getAdminUser(): AdminUser | null {
  const user = localStorage.getItem("adminUser");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}
