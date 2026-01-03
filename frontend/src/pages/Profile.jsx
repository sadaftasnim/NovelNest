import React, { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  const inProgress = profile?.readingProgress?.filter(p => p.status === "In Progress") || [];
  const completed = profile?.readingProgress?.filter(p => p.status === "Completed") || [];
  const bookmarks = profile?.bookmarks || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* User Info Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-blue-200">
            {profile?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-slate-800">{profile?.username}</h1>
            <p className="text-slate-500 font-medium">{profile?.email}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {profile?.role}
              </span>
              <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/dashboard" className="px-6 py-2 border border-gray-200 rounded-xl font-bold text-slate-600 hover:bg-gray-50 transition-colors">
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* In Progress */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                In Progress ({inProgress.length})
              </h2>
            </div>
            <div className="space-y-4">
              {inProgress.map(p => (
                <div key={p.storyId?._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                  <img src={p.storyId?.image} className="w-16 h-20 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 truncate">{p.storyId?.title}</h3>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">{p.progress}% Read</p>
                  </div>
                </div>
              ))}
              {inProgress.length === 0 && <p className="text-sm text-gray-400 italic">No novels in progress.</p>}
            </div>
          </div>

          {/* Bookmarks */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                Saved to Read ({bookmarks.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {bookmarks.map(b => (
                <div key={b._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  <img src={b.image} className="w-12 h-16 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <h3 className="font-bold text-slate-800 line-clamp-1">{b.title}</h3>
                    <p className="text-xs text-slate-400">{b.genre}</p>
                  </div>
                </div>
              ))}
              {bookmarks.length === 0 && <p className="text-sm text-gray-400 italic">No bookmarks yet.</p>}
            </div>
          </div>

          {/* Completed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                Completed ({completed.length})
              </h2>
            </div>
            <div className="space-y-4">
              {completed.map(p => (
                <div key={p.storyId?._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center opacity-75">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{p.storyId?.title}</h3>
                    <p className="text-xs text-slate-400">Finished on {new Date(p.lastRead).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {completed.length === 0 && <p className="text-sm text-gray-400 italic">No completed novels yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
