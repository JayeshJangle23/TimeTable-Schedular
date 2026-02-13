import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="page">
      <h2>Welcome to Dashboard 👋</h2>
      <div className="card-container">
        <Link to="/create-timetable" className="card">
          ➕ Create Timetable
        </Link>
        <Link to="/view-timetable" className="card">
          📖 View Timetable
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
