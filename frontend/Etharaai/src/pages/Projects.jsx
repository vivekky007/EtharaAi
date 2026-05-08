import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

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

  const createProject = async () => {
    if (!name.trim()) return;

    try {
      await axios.post(
        `${BASE_URL}/api/projects`,
        {
          name,
          description: "Test project",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
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

        .projects-container {
          min-height: 100vh;

          padding: 40px;

          background:
            radial-gradient(circle at top left, #2563eb22, transparent 25%),
            radial-gradient(circle at bottom right, #7c3aed22, transparent 25%),
            #0f172a;
        }

        .projects-header {
          margin-bottom: 35px;
        }

        .projects-header h1 {
          font-size: 42px;
          margin-bottom: 8px;
        }

        .projects-header p {
          color: #94a3b8;
          font-size: 15px;
        }

        .create-box {
          display: flex;
          gap: 15px;

          margin-bottom: 40px;

          flex-wrap: wrap;
        }

        .create-box input {
          flex: 1;

          min-width: 250px;

          padding: 16px;

          border-radius: 14px;

          border: 1px solid rgba(255,255,255,0.08);

          background: rgba(255,255,255,0.05);

          color: white;

          outline: none;

          font-size: 15px;

          transition: 0.3s;
        }

        .create-box input:focus {
          border-color: #3b82f6;

          box-shadow:
            0 0 0 4px rgba(59,130,246,0.15);
        }

        .create-box input::placeholder {
          color: #94a3b8;
        }

        .create-btn {
          padding: 16px 24px;

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
            0 12px 20px rgba(59,130,246,0.3);
        }

        .projects-grid {
          display: grid;

          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

          gap: 22px;
        }

        .project-card {
          position: relative;

          padding: 25px;

          border-radius: 24px;

          background: rgba(255,255,255,0.05);

          border: 1px solid rgba(255,255,255,0.08);

          backdrop-filter: blur(10px);

          transition: 0.3s;

          overflow: hidden;
        }

        .project-card:hover {
          transform: translateY(-5px);

          border-color: rgba(59,130,246,0.4);

          box-shadow:
            0 15px 30px rgba(0,0,0,0.25);
        }

        .project-card::before {
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

        .project-card h3 {
          margin: 0 0 14px;

          font-size: 22px;
        }

        .project-id {
          color: #94a3b8;

          font-size: 13px;

          word-break: break-all;
        }

        .empty-state {
          color: #94a3b8;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .projects-container {
            padding: 25px;
          }

          .projects-header h1 {
            font-size: 34px;
          }

          .create-box {
            flex-direction: column;
          }

          .create-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="projects-container">
        <div className="projects-header">
          <h1>Projects 🚀</h1>
          <p>Manage and organize all your projects</p>
        </div>

        <div className="create-box">
          <input
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="create-btn" onClick={createProject}>
            Create Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            No projects found.
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((p) => (
              <div className="project-card" key={p._id}>
                <h3>{p.name}</h3>

                <div className="project-id">
                  {p._id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
