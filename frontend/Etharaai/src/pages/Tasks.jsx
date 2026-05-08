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
      console.log(err);
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

      setTasks(res.data);
    } catch (err) {
      console.log(err);
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

      setTitle("");

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Update Status
  const updateStatus = async (id) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/tasks/${id}`,
        {
          status: "DONE",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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
          color: white;
        }

        .tasks-container {
          min-height: 100vh;

          padding: 40px;

          background:
            radial-gradient(circle at top left, #2563eb22, transparent 25%),
            radial-gradient(circle at bottom right, #7c3aed22, transparent 25%),
            #0f172a;
        }

        .tasks-header {
          margin-bottom: 35px;
        }

        .tasks-header h1 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .tasks-header p {
          color: #94a3b8;
        }

        .create-task-box {
          display: flex;
          gap: 15px;

          margin-bottom: 40px;

          flex-wrap: wrap;
        }

        .create-task-box select,
        .create-task-box input {
          flex: 1;

          min-width: 220px;

          padding: 15px;

          border-radius: 14px;

          border: 1px solid rgba(255,255,255,0.08);

          background: rgba(255,255,255,0.05);

          color: white;

          outline: none;

          font-size: 15px;

          transition: 0.3s;
        }

        .create-task-box select:focus,
        .create-task-box input:focus {
          border-color: #3b82f6;

          box-shadow:
            0 0 0 4px rgba(59,130,246,0.15);
        }

        .create-task-box option {
          background: #0f172a;
        }

        .create-btn {
          padding: 15px 24px;

          border: none;

          border-radius: 14px;

          background: linear-gradient(
            135deg,
            #3b82f6,
            #8b5cf6
          );

          color: white;

          font-size: 15px;
          font-weight: bold;

          cursor: pointer;

          transition: 0.3s;
        }

        .create-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 22px rgba(59,130,246,0.3);
        }

        .tasks-grid {
          display: grid;

          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

          gap: 24px;
        }

        .task-card {
          position: relative;

          background: rgba(255,255,255,0.05);

          border: 1px solid rgba(255,255,255,0.08);

          border-radius: 24px;

          padding: 25px;

          backdrop-filter: blur(10px);

          transition: 0.3s;

          overflow: hidden;
        }

        .task-card:hover {
          transform: translateY(-5px);

          border-color: rgba(59,130,246,0.4);

          box-shadow:
            0 15px 30px rgba(0,0,0,0.25);
        }

        .task-card::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 4px;

          background: linear-gradient(
            90deg,
            #3b82f6,
            #8b5cf6
          );
        }

        .task-title {
          font-size: 22px;
          font-weight: bold;

          margin-bottom: 15px;
        }

        .task-status {
          display: inline-block;

          padding: 8px 14px;

          border-radius: 999px;

          font-size: 13px;
          font-weight: bold;

          margin-bottom: 15px;

          background: rgba(59,130,246,0.15);

          color: #60a5fa;
        }

        .done {
          background: rgba(34,197,94,0.15);
          color: #4ade80;
        }

        .task-project {
          color: #94a3b8;

          font-size: 13px;

          margin-bottom: 20px;

          word-break: break-all;
        }

        .done-btn {
          width: 100%;

          padding: 13px;

          border: none;

          border-radius: 14px;

          background: rgba(255,255,255,0.08);

          color: white;

          cursor: pointer;

          transition: 0.3s;
        }

        .done-btn:hover {
          background: rgba(34,197,94,0.2);
        }

        .empty-state {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .tasks-container {
            padding: 25px;
          }

          .tasks-header h1 {
            font-size: 34px;
          }

          .create-task-box {
            flex-direction: column;
          }

          .create-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="tasks-container">
        <div className="tasks-header">
          <h1>Tasks 📋</h1>

          <p>Manage and track your project tasks</p>
        </div>

        <div className="create-task-box">
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>

            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className="create-btn" onClick={createTask}>
            Create Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            No tasks found.
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((t) => (
              <div className="task-card" key={t._id}>
                <div className="task-title">
                  {t.title}
                </div>

                <div
                  className={
                    t.status === "DONE"
                      ? "task-status done"
                      : "task-status"
                  }
                >
                  {t.status}
                </div>

                <div className="task-project">
                  Project ID: {t.projectId}
                </div>

                <button
                  className="done-btn"
                  onClick={() => updateStatus(t._id)}
                >
                  Mark as Done
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
