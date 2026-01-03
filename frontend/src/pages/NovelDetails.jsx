import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const NovelDetails = () => {
    const { id } = useParams();
    const [novel, setNovel] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNovelDetails = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/stories/${id}`);
                const data = await res.json();
                setNovel(data);

                // Fetch chapters for this story
                const chaperRes = await fetch(`http://localhost:5000/api/chapters/story/${id}`);
                const chapterData = await chaperRes.json();
                setChapters(Array.isArray(chapterData) ? chapterData : []);
            } catch (error) {
                console.error("Error fetching novel details:", error);
            }
            setLoading(false);
        };

        if (!id.startsWith("sample-")) {
            fetchNovelDetails();
        } else {
            // Handle sample novels if needed, for now just loading state
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!novel && !id.startsWith("sample-")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 uppercase tracking-widest text-slate-400 font-bold">
                Story Not Found
            </div>
        );
    }

    // Fallback for sample novels
    const displayNovel = novel || {
        title: id.replace("sample-", "").split("-").join(" "),
        author: "Sample Author",
        description: "This is a sample story description for demonstration purposes.",
        genre: "Sample",
        image: "https://via.placeholder.com/300x450?text=Sample+Cover",
        views: 0,
        status: "Completed"
    };

    const imagePath = displayNovel.image || displayNovel.coverImage || "https://via.placeholder.com/300x450?text=No+Cover";
    const finalImage = (imagePath && !imagePath.startsWith("http") && !imagePath.startsWith("/")) ? `/images/${imagePath}` : imagePath;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section with Blur Background */}
            <div className="relative h-[450px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-30"
                    style={{ backgroundImage: `url(${finalImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>

                <div className="relative max-w-6xl mx-auto px-6 pt-28 flex flex-col md:flex-row gap-10 items-end">
                    <div className="w-56 md:w-64 lg:w-72 aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform hover:rotate-2 transition-transform duration-500 flex-shrink-0">
                        <img src={finalImage} alt={displayNovel.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 pb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full">{displayNovel.genre}</span>
                            <span className="px-4 py-1.5 bg-white/80 backdrop-blur-sm text-slate-700 text-xs font-black uppercase tracking-widest rounded-full border border-white">{displayNovel.status}</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-4">{displayNovel.title}</h1>
                        <p className="text-xl font-medium text-slate-500">by <span className="text-blue-600 font-bold cursor-pointer hover:underline">{displayNovel.author}</span></p>

                        <div className="mt-8 flex gap-4">
                            {chapters.length > 0 ? (
                                <Link
                                    to={`/novel/${id}/chapter/1`}
                                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1"
                                >
                                    Start Reading
                                </Link>
                            ) : (
                                <button className="px-10 py-4 bg-slate-300 text-slate-500 rounded-2xl font-black cursor-not-allowed">
                                    Coming Soon
                                </button>
                            )}
                            <button className="p-4 bg-white hover:bg-gray-50 text-slate-600 rounded-2xl font-black shadow-lg border border-gray-100 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left: Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                            Synopsis
                        </h2>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 italic text-slate-600 leading-relaxed text-lg font-medium">
                            {displayNovel.description}
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                                Chapters
                            </h2>
                            <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">{chapters.length} Total</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {chapters.length > 0 ? (
                                chapters.sort((a, b) => a.chapterNumber - b.chapterNumber).map((chapter) => (
                                    <Link
                                        key={chapter._id}
                                        to={`/novel/${id}/chapter/${chapter.chapterNumber}`}
                                        className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-500 font-black rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">{chapter.chapterNumber}</span>
                                            <span className="font-bold text-slate-700 group-hover:text-slate-900">{chapter.title}</span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full p-12 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
                                    <p className="text-slate-400 font-bold">No chapters released yet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right: Sidebar Stats */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl">
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-blue-400">Statistics</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                                <span className="text-slate-400 font-medium tracking-wide">Readers</span>
                                <span className="text-xl font-black">{displayNovel.views}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                                <span className="text-slate-400 font-medium tracking-wide">Rating</span>
                                <span className="text-xl font-black text-yellow-400">★ {displayNovel.rating || "4.5"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 font-medium tracking-wide">Updated</span>
                                <span className="text-sm font-bold bg-slate-800 px-3 py-1 rounded-lg">Recently</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-100 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 rotate-12 transition-transform group-hover:rotate-45">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-black mb-2 relative z-10">Join Group</h4>
                        <p className="text-blue-100 text-sm font-medium mb-6 relative z-10 opacity-80">Discuss this novel with thousands of other fans in our community!</p>
                        <button className="w-full py-3 bg-white text-blue-600 rounded-2xl font-black shadow-lg hover:bg-blue-50 transition-colors relative z-10">
                            Join Discord
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NovelDetails;
