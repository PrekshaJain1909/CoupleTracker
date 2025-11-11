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
      maxWidth: "450px",
      margin: "80px auto 40px",
      padding: "28px",
      background: "linear-gradient(135deg, #fff5fa, #ffe6f0)",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(255, 182, 193, 0.3)",
      transition: "all 0.3s ease-in-out",
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      textAlign: "center",
      color: "#c2185b",
      marginBottom: "20px",
    },
    message: {
      color: "#28a745",
      marginBottom: "12px",
      textAlign: "center",
      fontWeight: "500",
    },
    fieldContainer: {
      marginBottom: "16px",
    },
    label: {
      fontWeight: "600",
      marginBottom: "6px",
      display: "block",
      color: "#a33d5c",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1.5px solid #ffb6c1",
      borderRadius: "10px",
      outline: "none",
      fontSize: "1rem",
      transition: "0.3s",
    },
    readonly: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#fafafa",
      color: "#555",
      wordBreak: "break-word",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "20px",
    },
    button: {
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "0.3s",
    },
    editButton: {
      background: "linear-gradient(90deg, #36a2eb, #5bc0de)",
      color: "#fff",
    },
    saveButton: {
      background: "linear-gradient(90deg, #28a745, #6fdc7a)",
      color: "#fff",
    },
    cancelButton: {
      background: "linear-gradient(90deg, #ccc, #e0e0e0)",
      color: "#333",
    },
    logoutButton: {
      background: "linear-gradient(90deg, #ff4b5c, #ff758c)",
      color: "#fff",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },
    responsive: `
      @media (max-width: 600px) {
        .profile-container {
          padding: 18px;
          margin: 50px 16px;
        }
        .profile-title {
          font-size: 22px;
        }
        .profile-input, .profile-readonly {
          font-size: 0.95rem;
        }
        .profile-button {
          font-size: 0.9rem;
          padding: 8px 12px;
        }
        .profile-button-container {
          flex-direction: column;
        }
      }

      @media (max-width: 400px) {
        .profile-title {
          font-size: 20px;
        }
      }
    `,
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading profile...</p>;
  }

  return (
    <div style={styles.container} className="profile-container">
      <style>{styles.responsive}</style>
      <h1 style={styles.title} className="profile-title">Profile</h1>

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
            className="profile-input"
          />
        ) : (
          <p style={styles.readonly} className="profile-readonly">{profile.email}</p>
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
            className="profile-input"
          />
        ) : (
          <p style={styles.readonly} className="profile-readonly">{profile.name || "N/A"}</p>
        )}
      </div>

      {/* Buttons */}
      <div style={styles.buttonContainer} className="profile-button-container">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              style={{ ...styles.button, ...styles.saveButton }}
              className="profile-button"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              style={{ ...styles.button, ...styles.cancelButton }}
              className="profile-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              style={{ ...styles.button, ...styles.editButton }}
              className="profile-button"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              style={{ ...styles.button, ...styles.logoutButton }}
              className="profile-button"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
