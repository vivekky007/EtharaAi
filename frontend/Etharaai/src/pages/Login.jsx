import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;

          background:
            radial-gradient(circle at top left, #2563eb33, transparent 30%),
            radial-gradient(circle at bottom right, #7c3aed33, transparent 30%),
            #0f172a;
        }

        .login-card {
          width: 100%;
          max-width: 420px;

          padding: 40px;

          border-radius: 24px;

          background: rgba(255,255,255,0.05);

          backdrop-filter: blur(12px);

          border: 1px solid rgba(255,255,255,0.08);

          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .login-card h1 {
          color: white;
          margin-bottom: 10px;
        }

        .login-card p {
          color: #94a3b8;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group input {
          width: 100%;

          padding: 14px;

          border-radius: 12px;

          border: 1px solid rgba(255,255,255,0.08);

          background: rgba(255,255,255,0.05);

          color: white;

          outline: none;

          font-size: 15px;
        }

        .input-group input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }

        .input-group input::placeholder {
          color: #94a3b8;
        }

        .login-btn {
          width: 100%;

          padding: 14px;

          border: none;

          border-radius: 12px;

          background: linear-gradient(135deg, #3b82f6, #8b5cf6);

          color: white;

          font-size: 16px;
          font-weight: bold;

          cursor: pointer;

          transition: 0.3s;
        }

        .login-btn:hover {
          transform: translateY(-2px);

          box-shadow: 0 10px 20px rgba(59,130,246,0.3);
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue to TaskFlow</p>

          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
