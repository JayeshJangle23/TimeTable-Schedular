import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTimetable from "./pages/CreateTimetable";
import ViewTimetable from "./pages/ViewTimetable";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-timetable"
          element={
            <PrivateRoute>
              <CreateTimetable />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-timetable"
          element={
            <PrivateRoute>
              <ViewTimetable />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <ViewTimetable />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <ViewTimetable />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
