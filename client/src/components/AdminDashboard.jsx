import React, { useEffect, useState } from "react";
import API from "../services/api";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/get");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users. Check your token or role.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <UserTable users={users} refresh={fetchUsers} />
    </div>
  );
}
