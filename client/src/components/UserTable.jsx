import React from "react";
import API from "../services/api";

export default function UserTable({ users, refresh }) {
  const toggleBlock = async (id, blocked) => {
    try {
      await API.put(`/admin/users/${id}/block?blocked=${!blocked}`);
      refresh();
    } catch {
      alert("Failed to update block status");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await API.put(`/admin/users/${id}/roles`, [role]);
      refresh();
    } catch {
      alert("Failed to update role");
    }
  };

  return (   
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Blocked</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.firstName +' '+ u.lastName}</td>
            <td>{u.email}</td>
            <td>{u.roles.join(", ")}</td>
            <td>{u.blocked ? "Blocked" : "Not blocked"}</td>
            <td>
              <button onClick={() => toggleBlock(u.id, u.blocked)}>
                {u.blocked ? "Unblock" : "Block"}
              </button>
              <button onClick={() => changeRole(u.id, "ADMIN")}>Make Admin</button>
              <button onClick={() => changeRole(u.id, "USER")}>Make User</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
