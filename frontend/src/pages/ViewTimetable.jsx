import { useEffect, useState } from "react";
import API from "../api/axios";

function ViewTimetable() {
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await API.get("/api/timetable");
        setTimetable(res.data);
      } catch (error) {
        console.log("No timetable found");
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div className="page">
      <h2>Your Weekly Timetable</h2>
      {timetable ? (
        <div>
          <p>Notification Time: {timetable.notificationTime}</p>
        </div>
      ) : (
        <p>No timetable found</p>
      )}
    </div>
  );
}

export default ViewTimetable;
