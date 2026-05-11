import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import AdminDashboard from "./pages/AdminDashboard";

// ✅ Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

// ✅ Layout
function Layout({ children }) {
  const token = localStorage.getItem("token");

  // ✅ Decode User
  const user = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="app">

      {/* ✅ Navbar only after login */}
      {token && (
        <nav className="navbar">

          <div className="logo">
            TaskFlow
          </div>

          <div className="nav-links">

            {/* ✅ ADMIN NAVBAR */}
            {user?.role === "ADMIN" ? (
              <>
                <Link to="/admin">
                  Admin Panel
                </Link>

                <Link to="/projects">
                  Projects
                </Link>
              </>
            ) : (
              <>
                {/* ✅ MEMBER NAVBAR */}
                <Link to="/dashboard">
                  Dashboard
                </Link>

                <Link to="/projects">
                  Projects
                </Link>

                <Link to="/tasks">
                  Tasks
                </Link>
              </>
            )}

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        </nav>
      )}

      <div className="page-container">
        {children}
      </div>

    </div>
  );
}

// ✅ App
function App() {

  const token = localStorage.getItem("token");

  const user = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  return (
    <BrowserRouter>

      <Routes>

        {/* ✅ LOGIN PAGE */}
        <Route
          path="/"
          element={
            token ? (
              user?.role === "ADMIN" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Login />
            )
          }
        />

        {/* ✅ DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                {user?.role === "ADMIN" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Dashboard />
                )}
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ✅ PROJECTS */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Layout>
                <Projects />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ✅ TASKS */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Layout>
                {user?.role === "ADMIN" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Tasks />
                )}
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ✅ ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ✅ UNKNOWN ROUTE */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
