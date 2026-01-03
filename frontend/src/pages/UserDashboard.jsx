import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
    const { role } = useAuth();
    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/stories");
                const data = await res.json();
                const storiesData = Array.isArray(data) ? data : data.stories || [];
                setNovels(storiesData);
            } catch (error) {
                console.error("Error fetching novels:", error);
                setNovels([]);
            }
            setLoading(false);
        };

        fetchNovels();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className=" w-64 bg-white shadow-md flex flex-col sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-blue-600">User Dashboard</h2>
                </div>
                <nav className="flex-1 p-4 space-y-6">
                    <Link to="/dashboard" className="block px-4 py-2 text-blue-700 bg-blue-100 rounded-lg font-medium">
                        Dashboard
                    </Link>
                    <Link to="/library" className="block px-4 py-2 text-blue-700  bg-blue-100 font-medium hover:bg-gray-100 rounded-lg">
                        Explore Library
                    </Link>
                 
                </nav>
               
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back! ✨</h1>
                        <p className="text-gray-500 mt-1">Discover new stories and manage your reading list.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold capitalize">
                            {role}
                        </span>
                    </div>
                </header>

                <section className="mb-12">
                 

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="animate-pulse bg-gray-200 rounded-xl aspect-[2/3]" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {novels.map((novel) => {
                                let imgSource = novel.image || novel.coverImage || "";
                                let imagePath = imgSource || "https://via.placeholder.com/300x450";
                                if (imagePath && !imagePath.startsWith("http") && !imagePath.startsWith("/")) {
                                    imagePath = `/images/${imagePath}`;
                                }
                                return (
                                    <Link to={`/novel/${novel._id}`} key={novel._id} className="group">
                                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300">
                                            <img
                                                src={imagePath}
                                                alt={novel.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                                <p className="text-xs font-bold uppercase tracking-wider text-blue-400">{novel.genre}</p>
                                                <h3 className="font-bold line-clamp-1">{novel.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
