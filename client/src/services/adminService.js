const API = `${import.meta.env.VITE_API_URL}/admin`;

function getAdminId() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.id;
}

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-user-id": getAdminId(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Admin request failed");
  }

  return data;
}

export const getAdminStats = () => request("/stats");

export const getAllUsers = () => request("/users");

export const getAllProducts = () => request("/products");

export const setUserAdminRole = (id, is_admin) =>
  request(`/users/${id}/role`, {
    method: "PUT",
    body: JSON.stringify({ is_admin }),
  });

export const deleteUserApi = (id) =>
  request(`/users/${id}`, { method: "DELETE" });

export const deleteAnyProductApi = (id) =>
  request(`/products/${id}`, { method: "DELETE" });
