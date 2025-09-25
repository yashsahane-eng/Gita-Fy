// src/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL; 
// In local dev, you’ll use proxy (/api)
// In production, it will use your Render backend (from .env)

// Example: GET users
export const fetchUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return await res.json();
};

// Example: POST new user (Register)
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw new Error("Failed to register user");
  }
  return await res.json();
};
