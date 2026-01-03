import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./utils/Footer";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NovelDetails from "./pages/NovelDetails";
import ChapterReader from "./pages/ChapterReader";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  // Hide footer on these pages
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/library" ||
    location.pathname.startsWith("/admin") ||
    location.pathname === "/dashboard";

  return (
    <>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* USER PROFILE (Still exists but redirects to dashboard if empty) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Story Reading Routes */}
        <Route path="/novel/:id" element={<NovelDetails />} />
        <Route path="/novel/:storyId/chapter/:chapterNumber" element={<ChapterReader />} />
      </Routes>

      {/* Footer hidden only on login/signup/library */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
