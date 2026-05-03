import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.log("Project fetch error:", err.response?.data || err.message);
    }
  };

  // ✅ Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("TASKS:", res.data); // debug

      setTasks(res.data);
    } catch (err) {
      console.log("Task fetch error:", err.response?.data || err.message);
    }
  };

  // ✅ Create Task
  const createTask = async () => {
    if (!projectId || !title) {
      alert("Please select project and enter title");
      return;
    }

    try {
        const user = JSON.parse(atob(token.split(".")[1]));

        await axios.post(
        `${BASE_URL}/api/tasks`,
        {
            title,
            description: "Task",
            projectId,
            assignedTo: user.id,
        },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
      alert("Task created");
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log("Create error:", err.response?.data || err.message);
      alert("Error creating task");
    }
  };

  // ✅ Update Task Status
  const updateStatus = async (id) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/tasks/${id}`,
        { status: "DONE" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
    }
  };

  // ✅ Load on page
  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>

      {/* 🔽 Select Project */}
      <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* ✏️ Input Task */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Create Task</button>

      <h3>All Tasks</h3>

      {/* 📋 Show Tasks */}
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => (
          <div key={t._id} style={{ marginBottom: 10 }}>
            <strong>{t.title}</strong> - {t.status}
            <br />
            Project: {t.projectId}
            <br />
            <button onClick={() => updateStatus(t._id)}>
              Mark Done
            </button>
          </div>
        ))
      )}
    </div>
  );
}