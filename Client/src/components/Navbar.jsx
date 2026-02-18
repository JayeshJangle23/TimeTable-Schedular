import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import API from "../api/axios";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await API.post("/user/logout");
    setUser(null);
  };

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md p-4 flex justify-between"
    >
      <Link to="/" className="font-bold text-xl text-indigo-600">
        TimeTable App
      </Link>

      {user && (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </motion.nav>
  );
}
