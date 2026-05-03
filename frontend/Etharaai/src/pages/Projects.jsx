import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get(`${BASE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post(
      `${BASE_URL}/api/projects`,
      { name, description: "Test project" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createProject}>Create Project</button>

      <h3>All Projects</h3>
      {projects.map((p) => (
        <div key={p._id} style={{ marginBottom: 10 }}>
          <strong>{p.name}</strong><br />
          ID: {p._id}
        </div>
      ))}
    </div>
  );
}