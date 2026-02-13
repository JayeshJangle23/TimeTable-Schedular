import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h3>📅 TimeTable Scheduler</h3>
      <div>
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-timetable">Create</Link>
        <Link to="/view-timetable">View</Link>
      </div>
    </nav>
  );
}

export default Navbar;
