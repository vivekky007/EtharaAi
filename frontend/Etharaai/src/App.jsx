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

// ✅ Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

// ✅ Main Layout
function Layout({ children }) {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="app">
      {/* ✅ Show navbar only after login */}
      {token && (
        <nav className="navbar">
          <div className="logo">TaskFlow</div>

          <div className="nav-links">
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/projects">Projects</Link>

            <Link to="/tasks">Tasks</Link>

            <button className="logout-btn" onClick={logout}>
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
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* ✅ Login Route */}
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />

          {/* ✅ Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Projects */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          {/* ✅ Tasks */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />

          {/* ✅ Unknown Routes */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
