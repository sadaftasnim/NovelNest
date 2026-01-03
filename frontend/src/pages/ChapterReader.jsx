import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ChapterReader = () => {
    const { storyId, chapterNumber } = useParams();
    const navigate = useNavigate();
    const [chapter, setChapter] = useState(null);
    const [story, setStory] = useState(null);
    const [allChapters, setAllChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(18);
    const [theme, setTheme] = useState("light"); // light, dark, sepia

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch story
                const sRes = await fetch(`http://localhost:5000/api/stories/${storyId}`);
                const sData = await sRes.json();
                setStory(sData);

                // Fetch all chapters to know total and navigation
                const cRes = await fetch(`http://localhost:5000/api/chapters/story/${storyId}`);
                const cData = await cRes.json();
                const sortedChapters = Array.isArray(cData) ? cData.sort((a, b) => a.chapterNumber - b.chapterNumber) : [];
                setAllChapters(sortedChapters);

                // Find current chapter
                const current = sortedChapters.find(c => c.chapterNumber === parseInt(chapterNumber));
                setChapter(current);

                // Scroll to top on chapter change
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching chapter data:", error);
            }
            setLoading(false);
        };

        if (storyId && !storyId.startsWith("sample-")) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [storyId, chapterNumber]);

    const handleNavigate = (num) => {
        navigate(`/novel/${storyId}/chapter/${num}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!chapter) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <h2 className="text-3xl font-black text-slate-800 mb-4">Chapter Not Found</h2>
                <p className="text-slate-500 mb-8">This chapter hasn't been released yet or does not exist.</p>
                <Link to={`/novel/${storyId}`} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold">Return to Details</Link>
            </div>
        );
    }

    const themeClasses = {
        light: "bg-white text-slate-800",
        dark: "bg-slate-900 text-slate-100",
        sepia: "bg-[#f4ecd8] text-[#5b4636]"
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
            {/* Header / Navigation Bar */}
            <header className={`sticky top-0 z-50 backdrop-blur-md border-b flex items-center justify-between px-6 py-4 ${theme === 'light' ? 'bg-white/80 border-gray-100' : theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-[#f4ecd8]/80 border-[#e3d5b2]'}`}>
                <div className="flex items-center gap-4">
                    <Link to={`/novel/${storyId}`} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Chapter {chapter.chapterNumber}</h4>
                        <h2 className="text-sm font-bold truncate max-w-[200px] md:max-w-md">{chapter.title}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setFontSize(Math.min(fontSize + 2, 32))} className="p-2 hover:bg-black/5 rounded-lg text-lg font-black italic">A+</button>
                    <button onClick={() => setFontSize(Math.max(fontSize - 2, 12))} className="p-2 hover:bg-black/5 rounded-lg text-sm font-black italic">A-</button>
                    <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
                    <button onClick={() => setTheme("light")} className={`w-6 h-6 rounded-full border border-gray-200 bg-white ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`}></button>
                    <button onClick={() => setTheme("sepia")} className={`w-6 h-6 rounded-full border border-gray-200 bg-[#f4ecd8] ${theme === 'sepia' ? 'ring-2 ring-blue-500' : ''}`}></button>
                    <button onClick={() => setTheme("dark")} className={`w-6 h-6 rounded-full border border-gray-200 bg-slate-900 ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`}></button>
                </div>
            </header>

            {/* Reading Context */}
            <main className="max-w-3xl mx-auto px-6 py-20 pb-40">
                <div style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }} className="font-serif whitespace-pre-wrap">
                    {chapter.content}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-32 flex flex-col items-center gap-8">
                    <div className="flex gap-4 w-full justify-between items-center">
                        <button
                            onClick={() => handleNavigate(parseInt(chapterNumber) - 1)}
                            disabled={parseInt(chapterNumber) <= 1}
                            className="flex-1 px-6 py-4 rounded-2xl bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>

                        <Link to={`/novel/${storyId}`} className="p-4 rounded-2xl bg-black/5 hover:bg-black/10 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </Link>

                        <button
                            onClick={() => handleNavigate(parseInt(chapterNumber) + 1)}
                            disabled={parseInt(chapterNumber) >= allChapters.length}
                            className="flex-1 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:cursor-not-allowed transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-100"
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="text-center opacity-40 text-[10px] font-bold uppercase tracking-widest">
                        End of Chapter {chapterNumber}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChapterReader;
