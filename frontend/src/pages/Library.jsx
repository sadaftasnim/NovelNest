import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Genres
const genres = [
  "Action",
  "Comedy",
  "Adventure",
  "Mystery",
  "Romance",
  "Horror",
  "Fantasy",
  "Sci_Fi",
  "Drama",
  "Thriller",
  "Historical",
  "General Fiction",
];

// Sample novels removal - purely dynamic now
const novelsData = {};

const Library = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [realStories, setRealStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch real stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/stories");
        const data = await res.json();
        const storiesData = Array.isArray(data) ? data : data.stories || [];
        setRealStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
      setLoading(false);
    };
    fetchStories();
  }, []);

  // Filtering Logic
  const getNovelsForGenre = (genre) => {
    return realStories
      .filter((s) => s.genre === genre)
      .map((s) => {
        // Fallback between 'image' and 'coverImage', ignoring empty strings
        let imgSource = (s.image && s.image.trim() !== "") ? s.image :
          (s.coverImage && s.coverImage.trim() !== "") ? s.coverImage : "";

        let imagePath = imgSource || "https://via.placeholder.com/300x450?text=No+Cover";

        // If it's a simple filename (no http and doesn't start with /), assume it's in /images/
        if (imagePath && !imagePath.startsWith("http") && !imagePath.startsWith("/")) {
          imagePath = `/images/${imagePath}`;
        }

        return {
          id: s._id,
          name: s.title,
          description: s.description,
          views: `${s.views || 0} Views`,
          image: imagePath,
          isReal: true,
          author: s.author,
          chaptersCount: s.chapters?.length || s.chaptersCount || 0,
        };
      });
  };

  // Disable scroll when showing genres, enable scroll when showing novels
  useEffect(() => {
    if (!selectedGenre) {
      document.body.style.overflow = "hidden"; // unscrollable for genre list
    } else {
      document.body.style.overflow = "auto"; // scrollable for novels
    }

    return () => {
      document.body.style.overflow = "auto"; // restore on unmount
    };
  }, [selectedGenre]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10">
      <h1 className="text-4xl font-black text-center mb-12 text-slate-800 tracking-tight">
        Explore Library
      </h1>

      {!selectedGenre ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center"
              onClick={() => setSelectedGenre(genre)}
            >
              <h2 className="text-xl font-bold text-center text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                {genre}
              </h2>
              <div className="mt-4 flex justify-center">
                <div className="w-10 h-1 bg-blue-100 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <button
                className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                onClick={() => setSelectedGenre(null)}
              >
                ← Back to Genres
              </button>
              <h2 className="text-4xl font-black mt-4 text-slate-800">
                {selectedGenre} Collection
              </h2>
            </div>
            {loading && (
              <span className="text-blue-600 font-bold animate-pulse">
                Syncing Library...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {getNovelsForGenre(selectedGenre).length > 0 ? (
              getNovelsForGenre(selectedGenre).map((novel) => (
                <div
                  key={novel.id}
                  className="bg-white p-0 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Part */}
                  <div className="w-full md:w-56 lg:w-64 h-72 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0 border-r border-gray-50 flex items-center justify-center">
                    <img
                      src={novel.image}
                      alt={novel.name}
                      className="w-full h-full object-cover min-h-[250px]"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=No+Cover" }}
                    />
                  </div>

                  {/* Content Part */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {selectedGenre}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-2">
                        {novel.name}
                      </h3>
                      {novel.author && (
                        <p className="text-slate-500 font-medium mb-4 italic">
                          by {novel.author}
                        </p>
                      )}
                      <p className="text-slate-600 leading-relaxed font-medium line-clamp-3 md:line-clamp-4">
                        {novel.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Popularity
                          </span>
                          <span className="text-lg font-black text-slate-700">
                            {novel.views}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/novel/${novel.id}`)}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all">
                        Read Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-slate-400 text-xl font-medium">
                  No stories found in this genre yet.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
