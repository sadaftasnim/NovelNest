import {
  FaSearch,
  FaBook,
  FaSignInAlt,
  FaHome,
  FaUserPlus,
  FaUserShield,
  FaSignOutAlt,
  FaUserCircle,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-8 py-9 flex items-center justify-between shadow-2xl">
      {/* Logo */}
          <Link to="/" className="text-4xl  text-slate-200 font-bold flex items-center">
            NovelNest 📚✍️
          </Link>

      {/* Search */}
      <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-5 py-2 w-1/3 group focus-within:bg-white/20 transition-all">
        <input
          type="text"
          placeholder="Search novels..."
          className="bg-transparent outline-none w-full text-white placeholder-slate-400 font-medium"
        />
        <FaSearch className="text-blue-500" />
      </div>

      {/* Menu */}
      <div className="flex gap-8 items-center text-slate-200 font-bold">

        <Link to="/" className="flex items-center gap-1 hover:text-blue-600">
          <FaHome /> Home
        </Link>

        <Link to="/library" className="flex items-center gap-1 hover:text-blue-600">
          <FaBook /> Library
        </Link>

        {/* NOT LOGGED IN */}
        {!role && (
          <>
            <Link to="/login" className="flex items-center gap-1 hover:text-blue-600">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/signup" className="flex items-center gap-1 hover:text-blue-600">
              <FaUserPlus /> Sign Up
            </Link>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaUserShield /> AdminDashboard
          </Link>
        )}

        {/* USER */}
        {role === "user" && (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <FaUserCircle /> UserDashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-1 hover:text-blue-600 ml-2"
            >
              <FaUserAlt />   
              Profile
            </Link>
          </>
        )}

        {/* LOGOUT (ADMIN + USER) */}
        {role && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
