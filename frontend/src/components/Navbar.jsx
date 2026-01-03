import {
  FaSearch,
  FaBook,
  FaSignInAlt,
  FaHome,
  FaUserPlus,
  FaUserShield,
  FaSignOutAlt,
  FaUserCircle,
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
    <nav className="bg-gray-400 px-6 py-10 flex items-center justify-between">

      {/* Logo */}
      <h1 className="text-4xl font-bold text-black">
        NovelNest 📚✍️
      </h1>

      {/* Search */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-1/3">
        <input
          type="text"
          placeholder="Search novels..."
          className="outline-none w-full text-lg font-medium"
        />
        <FaSearch className="text-blue-500" />
      </div>

      {/* Menu */}
      <div className="flex gap-6 items-center text-black text-lg">

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
            <FaUserShield /> Admin Dashboard
          </Link>
        )}

        {/* USER */}
        {role === "user" && (
          <Link
            to="/profile"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaUserCircle /> Profile
          </Link>
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
