# AdminDashboard.jsx

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/users`,
        { headers }
      );

      setUsers(res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/projects`,
        { headers }
      );

      setProjects(res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/tasks`,
        { headers }
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Create Project
  const createProject = async () => {
    if (!projectName) {
      return alert("Project name required");
    }

    try {
      await axios.post(
        `${BASE_URL}/api/projects`,
        {
          name: projectName,
          description: projectDescription,
        },
        { headers }
      );

      setProjectName("");
      setProjectDescription("");

      fetchProjects();

      alert("Project created successfully");

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Add Member To Project
  const addMemberToProject = async () => {
    if (!selectedProject || !selectedUser) {
      return alert("Select project and member");
    }

    try {
      await axios.post(
        `${BASE_URL}/api/projects/${selectedProject}/add-member`,
        {
          userId: selectedUser,
        },
        { headers }
      );

      fetchProjects();

      alert("Member added successfully");

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Create Task
  const createTask = async () => {
    if (
      !taskTitle ||
      !selectedUser ||
      !selectedProject
    ) {
      return alert("Fill all fields");
    }

    try {
      await axios.post(
        `${BASE_URL}/api/tasks`,
        {
          title: taskTitle,
          description: taskDescription,
          assignedTo: selectedUser,
          projectId: selectedProject,
        },
        { headers }
      );

      setTaskTitle("");
      setTaskDescription("");

      fetchTasks();

      alert("Task assigned successfully");

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProjects();
    fetchTasks();
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0f172a;
        }

        .admin-container {
          padding: 40px;
          color: white;
        }

        .admin-title {
          font-size: 42px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .admin-subtitle {
          color: #94a3b8;
          margin-bottom: 40px;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 28px;
          backdrop-filter: blur(10px);
        }

        .card h2 {
          margin-top: 0;
          margin-bottom: 20px;
        }

        .input,
        .select {
          width: 100%;
          padding: 14px;
          margin-bottom: 15px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.05);
          color: white;
          outline: none;
        }

        .select option {
          background: #0f172a;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            #3b82f6,
            #8b5cf6
          );
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .list-item {
          background: rgba(255,255,255,0.04);
          padding: 14px;
          border-radius: 14px;
          margin-bottom: 12px;
        }

        .list-item strong {
          display: block;
          margin-bottom: 6px;
        }

        .small-text {
          color: #94a3b8;
          font-size: 14px;
        }
      `}</style>

      <div className="admin-container">

        <div className="admin-title">
          Admin Dashboard 👑
        </div>

        <div className="admin-subtitle">
          Manage members, projects and tasks
        </div>

        <div className="admin-grid">

          {/* CREATE PROJECT */}
          <div className="card">
            <h2>Create Project</h2>

            <input
              className="input"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <input
              className="input"
              placeholder="Project description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />

            <button
              className="btn"
              onClick={createProject}
            >
              Create Project
            </button>
          </div>

          {/* ASSIGN MEMBER */}
          <div className="card">
            <h2>Add Member To Project</h2>

            <select
              className="select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>

              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select Member</option>

              {users
                .filter((u) => u.role === "MEMBER")
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
              ))}
            </select>

            <button
              className="btn"
              onClick={addMemberToProject}
            >
              Add Member
            </button>
          </div>

          {/* CREATE TASK */}
          <div className="card">
            <h2>Assign Task</h2>

            <input
              className="input"
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <input
              className="input"
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />

            <select
              className="select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>

              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Assign To</option>

              {users
                .filter((u) => u.role === "MEMBER")
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
              ))}
            </select>

            <button
              className="btn"
              onClick={createTask}
            >
              Assign Task
            </button>
          </div>

          {/* MEMBERS */}
          <div className="card">
            <h2>Members</h2>

            {users
              .filter((u) => u.role === "MEMBER")
              .map((u) => (
                <div className="list-item" key={u._id}>
                  <strong>{u.name}</strong>

                  <div className="small-text">
                    {u.email}
                  </div>
                </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div className="card">
            <h2>Projects</h2>

            {projects.map((p) => (
              <div className="list-item" key={p._id}>
                <strong>{p.name}</strong>

                <div className="small-text">
                  Members: {p.members?.length || 0}
                </div>
              </div>
            ))}
          </div>

          {/* TASKS */}
          <div className="card">
            <h2>Assigned Tasks</h2>

            {tasks.map((t) => (
              <div className="list-item" key={t._id}>
                <strong>{t.title}</strong>

                <div className="small-text">
                  {t.assignedTo?.name}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
```

# Also Required Backend Route

Create:

```txt
routes/userRoutes.js
```

```js
const router = require("express").Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const User = require("../models/User");

router.get(
  "/",
  auth,
  role("ADMIN"),
  async (req, res) => {
    try {
      const users = await User.find(
        {},
        "name email role"
      );

      res.json(users);

    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

module.exports = router;
```

# Add In server.js

```js
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
```
