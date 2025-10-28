// api.js
import axios from "axios";

// Base URL of your backend
const API_BASE = "http://localhost:5000/api"; // change as per your backend

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// AUTH
// =======================

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// =======================
// USER PROFILE
// =======================
export const getProfile = async (userId, token) => {
  const response = await api.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (userId, updatedData, token) => {
  const response = await api.put(`/users/${userId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// =======================
// ENTRIES (mistakes, punishments, drinks, smoke, moods, notes)
// =======================
export const getEntries = async (userId, token) => {
  const response = await api.get(`/entries/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addEntry = async (userId, entryData, token) => {
  const response = await api.post(`/entries/${userId}`, entryData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteEntry = async (entryId, token) => {
  const response = await api.delete(`/entries/${entryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// =======================
// OPTIONAL: Google OAuth
// =======================
export const googleLogin = async (tokenId) => {
  const response = await api.post("/auth/google", { tokenId });
  return response.data;
};

export default api;
