import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signupVideo from "../assets/signup-video.mp4";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Disable scroll when this page is active
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll when leaving
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      alert(data.message);

      // ✅ Redirect after signup
      navigate("/login");
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-0 flex bg-gray-100">

      {/* LEFT VIDEO */}
      <div className="w-1/2">
        <video
          src={signupVideo}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="bg-gray-300 p-10 rounded-xl shadow-xl w-[460px]">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}

          <input
            name="username"
            placeholder="Username"
            className="w-full mb-4 px-4 py-3 border rounded-lg"
            onChange={handleChange}
          />

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
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Signup;
