import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../utils/api";

export default function Profile({ user, token, onLogout }) {
  const [profile, setProfile] = useState({ email: "", name: "" });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id || !token) return;
      setLoading(true);
      try {
        const data = await getProfile(user.id, token);
        setProfile({ email: data.email, name: data.name || "" });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, token]);

  const handleSave = async () => {
    if (!profile.email.trim()) {
      setMessage("Email cannot be empty");
      return;
    }

    try {
      const updated = await updateProfile(user.id, profile, token);
      setProfile({ email: updated.email, name: updated.name || "" });
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "80px auto 0",
      padding: "24px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "16px",
    },
    message: {
      color: "green",
      marginBottom: "12px",
      textAlign: "center",
    },
    fieldContainer: {
      marginBottom: "16px",
    },
    label: {
      fontWeight: "600",
      marginBottom: "4px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      outline: "none",
    },
    readonly: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      backgroundColor: "#f3f3f3",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      marginTop: "16px",
    },
    button: {
      flex: 1,
      padding: "10px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
    },
    editButton: { backgroundColor: "#3b82f6" },
    saveButton: { backgroundColor: "#16a34a" },
    cancelButton: { backgroundColor: "#9ca3af", color: "#111" },
    logoutButton: { backgroundColor: "#ef4444" },
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Profile</h1>

      {message && <p style={styles.message}>{message}</p>}

      {/* Email */}
      <div style={styles.fieldContainer}>
        <label style={styles.label}>Email:</label>
        {editMode ? (
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            style={styles.input}
          />
        ) : (
          <p style={styles.readonly}>{profile.email}</p>
        )}
      </div>

      {/* Name */}
      <div style={styles.fieldContainer}>
        <label style={styles.label}>Name:</label>
        {editMode ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            style={styles.input}
          />
        ) : (
          <p style={styles.readonly}>{profile.name || "N/A"}</p>
        )}
      </div>

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              style={{ ...styles.button, ...styles.saveButton }}
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              style={{ ...styles.button, ...styles.editButton }}
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              style={{ ...styles.button, ...styles.logoutButton }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
