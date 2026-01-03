import { useRef } from "react";
import novels from "../data/novels";
import NovelCard from "./NovelCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function NovelSlider({ search }) {
  const sliderRef = useRef(null);

  const filteredNovels = novels.filter((novel) =>
    novel.title.toLowerCase().includes(search.toLowerCase())
  );

  const scroll = (direction) => {
    const container = sliderRef.current;
    const cardWidth = 360 + 32; // card + gap

    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                   bg-black/70 text-white p-3 rounded-full hover:bg-black"
      >
        <FaChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                   bg-black/70 text-white p-3 rounded-full hover:bg-black"
      >
        <FaChevronRight />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scroll-smooth
                   snap-x snap-mandatory
                   px-12 hide-scrollbar"
      >
        {filteredNovels.map((novel) => (
          <div key={novel.id} className="snap-start">
            <NovelCard novel={novel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NovelSlider;
