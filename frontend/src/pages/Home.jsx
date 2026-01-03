import { useNavigate } from "react-router-dom";
import novels from "../data/novels";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-12 py-16 flex items-center gap-10">

        {/* LEFT TEXT */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-red-700 mb-4">
            Dive Into Endless Worlds ✨
          </h1>

          <p className="text-lg mb-4 font-bold text-gray-700">
            Discover thousands of novels across fantasy, action, romance,
            and adventure. Read anytime — only on{" "}
            <span className="font-semibold text-blue-600">NovelNest</span>.
          </p>

          <p className="text-base mb-4 font-bold text-gray-600">
            From thrilling adventures to emotional stories,
            explore worlds created by talented writers.
          </p>

          <p className="text-base mb-6 font-bold text-gray-600">
            Start reading for free, save your favorite novels,
            and continue your journey anytime, anywhere.
          </p>

          <button
            onClick={() => navigate("/library")}
            className="bg-blue-500 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
          >
            Explore Novels →
          </button>
        </div>

        {/* RIGHT VIDEO */}
        <div className="w-1/2 flex justify-center">
          <video
            className="rounded-2xl shadow-xl w-[100%]"
            autoPlay
            muted
            loop
          >
            <source src="/videos/novel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* TOP TRENDING */}
      <div className="px-12 py-10 bg-gray-300">
        <h2 className="text-3xl font-bold mb-6">Top Trending</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
          {novels.map((novel) => (
            <div
              key={novel.id}
              className="min-w-[275px] rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <img
                src={novel.image}
                alt={novel.title}
                className="h-72 w-full object-cover rounded-t-xl"
              />

              <div className="p-3">
                <h3 className="font-semibold text-xl">
                  {novel.title}
                </h3>
                <p className="text-md text-gray-700">{novel.genre}</p>
                <p className="text-md text-gray-700">{novel.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
