import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";
import Image from "../assets/Image.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">Irises</h1>
        <div className="login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
      </div>

       <div className="promo-wrapper">
      <img src={Image} alt="Promo" className="promo-image" />
      <div className="promo-overlay">
        <h1>Welcome Back</h1>
        <p>
          Modern banking includes services like digital payments, online banking, loans,
          credit facilities, and wealth management!
        </p>
      </div>
    </div>

    </div>
  );
}
