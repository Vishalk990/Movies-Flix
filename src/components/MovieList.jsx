import { useState, useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const slide = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = slider.clientWidth;
      slider.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (slider) {
      setShowLeftArrow(slider.scrollLeft > 0);
      setShowRightArrow(
        slider.scrollLeft < (slider.scrollWidth - slider.clientWidth)
      );
    }
  };

  return (
    <div className="px-6 relative">
      <h1 className="text-lg md:text-3xl font-bold py-4 text-white">{title}</h1>
      <div className="relative group">
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => slide('left')}
          >
            &#10094;
          </button>
        )}
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex" style={{ marginBottom: '-20px', paddingBottom: '20px' }}>
            {movies?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 pr-4">
                <MovieCard poster_path={movie.poster_path} />
              </div>
            ))}
          </div>
        </div>
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => slide('right')}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;