const API_URL = import.meta.env.VITE_API_URL;

export type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function submitContact(values: {
  name: string;
  email: string;
  message: string;
}) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message.");
  }

  return data;
}

export async function getContacts(): Promise<Contact[]> {
  const response = await fetch(`${API_URL}/api/contact`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch messages.");
  }

  return data.contacts;
}

export async function deleteContact(id: string) {
  const response = await fetch(`${API_URL}/api/contact/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete message.");
  }

  return data;
}
