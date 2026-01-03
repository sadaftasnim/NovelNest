import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginVideo from "../assets/Login.mp4";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      // ✅ UPDATE CONTEXT (NO REFRESH)
      login(data.role);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-0 flex bg-gray-100">
      <div className="w-1/2">
        <video src={LoginVideo} autoPlay loop muted className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="bg-gray-300 p-10 rounded-xl shadow-xl w-[460px]">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            name="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border rounded-lg"
            onChange={handleChange}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
