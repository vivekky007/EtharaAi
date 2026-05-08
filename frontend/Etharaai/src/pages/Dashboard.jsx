import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://etharaai-production-a3f3.up.railway.app";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <style>{`
        .dashboard {
          padding: 40px;
          color: white;
        }

        .dashboard h1 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .dashboard p {
          color: #94a3b8;
          margin-bottom: 35px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 22px;
        }

        .stat-card {
          background: rgba(255,255,255,0.05);

          border: 1px solid rgba(255,255,255,0.08);

          padding: 28px;

          border-radius: 24px;

          backdrop-filter: blur(10px);

          transition: 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);

          border-color: rgba(59,130,246,0.4);
        }

        .stat-card h2 {
          font-size: 38px;
          margin: 10px 0;
        }

        .stat-card span {
          color: #94a3b8;
          font-size: 14px;
        }
      `}</style>

      <div className="dashboard">
        <h1>Dashboard 👋</h1>

        <p>Welcome back to TaskFlow</p>

        <div className="stats-grid">

          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{stats.total}</h2>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h2>{stats.completed}</h2>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <h2>{stats.pending}</h2>
          </div>

          <div className="stat-card">
            <span>Overdue</span>
            <h2>{stats.overdue}</h2>
          </div>

        </div>
      </div>
    </>
  );
}
