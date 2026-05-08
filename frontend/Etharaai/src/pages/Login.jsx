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
    
    window.location.href = "/dashboard";
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

          padding: 20px;
        }

        .login-card {
          position: relative;

          width: 100%;
          max-width: 420px;

          padding: 45px 35px;

          border-radius: 28px;

          background: rgba(255,255,255,0.05);

          backdrop-filter: blur(14px);

          border: 1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 20px 50px rgba(0,0,0,0.35);

          transform: translateY(-25px);

          overflow: hidden;
        }

        .login-card::before {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: 28px;

          padding: 1px;

          background: linear-gradient(
            135deg,
            rgba(59,130,246,0.5),
            rgba(139,92,246,0.5)
          );

          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);

          -webkit-mask-composite: xor;

          pointer-events: none;
        }

        .login-card h1 {
          color: white;

          font-size: 58px;
          font-weight: 800;

          line-height: 0.9;

          margin-bottom: 14px;

          text-align: center;
        }

        .login-card p {
          color: #94a3b8;

          text-align: center;

          margin-bottom: 35px;

          font-size: 15px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group input {
          width: 100%;

          padding: 16px 18px;

          border-radius: 14px;

          border: 1px solid rgba(255,255,255,0.08);

          background: rgba(255,255,255,0.05);

          color: white;

          outline: none;

          font-size: 15px;

          transition: 0.3s;
        }

        .input-group input::placeholder {
          color: #94a3b8;
        }

        .input-group input:focus {
          border-color: #3b82f6;

          box-shadow:
            0 0 0 4px rgba(59,130,246,0.18);
        }

        .login-btn {
          width: 100%;

          padding: 15px;

          border: none;

          border-radius: 14px;

          background: linear-gradient(
            135deg,
            #3b82f6,
            #8b5cf6
          );

          color: white;

          font-size: 16px;
          font-weight: bold;

          cursor: pointer;

          transition: all 0.3s ease;

          margin-top: 10px;
        }

        .login-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 15px 25px rgba(59,130,246,0.35);
        }

        .bottom-text {
          margin-top: 22px;

          text-align: center;

          color: #94a3b8;

          font-size: 14px;
        }

        .bottom-text span {
          color: #60a5fa;
          cursor: pointer;
        }

        @media (max-width: 500px) {
          .login-card {
            padding: 35px 25px;
          }

          .login-card h1 {
            font-size: 46px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <h1>
            Welcome <br />
            Back 👋
          </h1>

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

          <div className="bottom-text">
            Don't have an account? <span>Register</span>
          </div>
        </div>
      </div>
    </>
  );
}
