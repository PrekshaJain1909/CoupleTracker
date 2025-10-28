import { NavLink } from "react-router-dom";
import { Home, BarChart2, User, LogOut, Heart, Calendar, Image, Shield } from "lucide-react";

export default function Sidebar({ onLogout }) {
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={18} /> },
    { name: "Love Notes", path: "/love-notes", icon: <Heart size={18} /> },
    { name: "Timelines", path: "/timelines", icon: <Calendar size={18} /> },
    { name: "Photos", path: "/photos", icon: <Image size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Privacy", path: "/privacy", icon: <Shield size={18} /> },
  ];

  return (
    <div style={styles.sidebar}>
      <h1 style={styles.heading}>💞 Couple Traker</h1>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navItem,
              backgroundColor: isActive ? "#800020" : "transparent",
              color: isActive ? "#fff" : "#fff0f2",
            })}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <button style={styles.logoutBtn} onClick={onLogout}>
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    height: "100vh",
    width: "250px",
    backgroundColor: "#b2224f",
    color: "#fff0f2",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    padding: "20px",
    borderBottom: "1px solid #800020",
    color: "#fff",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "8px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "10px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontWeight: 500,
    cursor: "pointer",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    margin: "16px",
    padding: "10px 0",
    borderRadius: "10px",
    backgroundColor: "#800020",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
};
