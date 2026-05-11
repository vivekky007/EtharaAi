import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function Login() {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ ROLE STATE
  const [role, setRole] = useState("MEMBER");

  // ✅ LOGIN
  const login = async () => {
    try {

      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.msg ||
        "Login failed"
      );
    }
  };

  // ✅ REGISTER
  const register = async () => {
    try {

      const res = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        }
      );

      console.log(res.data);

      alert("Account created successfully!");

      // ✅ Switch back to login
      setIsLogin(true);

      // ✅ Clear fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("MEMBER");

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.msg ||
        "Registration failed"
      );
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

        .auth-container {
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

        .auth-card {
          position: relative;

          width: 100%;
          max-width: 430px;

          padding: 45px 35px;

          border-radius: 28px;

          background: rgba(255,255,255,0.05);

          backdrop-filter: blur(14px);

          border: 1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 20px 50px rgba(0,0,0,0.35);

          overflow: hidden;
        }

        .auth-card::before {
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

        .auth-title {
          color: white;

          font-size: 52px;
          font-weight: 800;

          line-height: 0.95;

          margin-bottom: 14px;

          text-align: center;
        }

        .auth-subtitle {
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

        /* ✅ ROLE BUTTONS */

        .role-selector {
          display: flex;

          gap: 12px;

          margin-bottom: 20px;
        }

        .role-btn {
          flex: 1;

          padding: 14px;

          border-radius: 14px;

          border: 1px solid rgba(255,255,255,0.08);

          background: rgba(255,255,255,0.05);

          color: white;

          font-size: 15px;
          font-weight: bold;

          cursor: pointer;

          transition: all 0.3s ease;
        }

        .role-btn:hover {
          transform: translateY(-2px);
        }

        .role-btn.active {
          background: linear-gradient(
            135deg,
            #3b82f6,
            #8b5cf6
          );

          border: none;

          box-shadow:
            0 10px 20px rgba(59,130,246,0.25);
        }

        .auth-btn {
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

        .auth-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 15px 25px rgba(59,130,246,0.35);
        }

        .bottom-text {
          margin-top: 24px;

          text-align: center;

          color: #94a3b8;

          font-size: 14px;
        }

        .switch-btn {
          color: #60a5fa;

          cursor: pointer;

          font-weight: bold;
        }

        @media (max-width: 500px) {

          .auth-card {
            padding: 35px 25px;
          }

          .auth-title {
            font-size: 42px;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">

          <div className="auth-title">
            {isLogin ? (
              <>
                Welcome <br />
                Back 👋
              </>
            ) : (
              <>
                Create <br />
                Account 🚀
              </>
            )}
          </div>

          <div className="auth-subtitle">
            {isLogin
              ? "Login to continue to TaskFlow"
              : "Create your TaskFlow account"}
          </div>

          {/* ✅ NAME FIELD */}
          {!isLogin && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* ✅ ROLE SELECTOR */}
              <div className="role-selector">

                <button
                  type="button"
                  className={`role-btn ${
                    role === "ADMIN" ? "active" : ""
                  }`}
                  onClick={() => setRole("ADMIN")}
                >
                  Admin
                </button>

                <button
                  type="button"
                  className={`role-btn ${
                    role === "MEMBER" ? "active" : ""
                  }`}
                  onClick={() => setRole("MEMBER")}
                >
                  Member
                </button>

              </div>
            </>
          )}

          {/* ✅ EMAIL */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* ✅ PASSWORD */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ✅ MAIN BUTTON */}
          <button
            className="auth-btn"
            onClick={isLogin ? login : register}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* ✅ TOGGLE */}
          <div className="bottom-text">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}

            <span
              className="switch-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </span>

          </div>

        </div>
      </div>
    </>
  );
}
