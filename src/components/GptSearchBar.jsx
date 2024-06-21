import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import axios from "axios";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  //Search Movie in TMDB

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    console.log(json);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    setLoading(true);
    setError(null);

    const query = searchText.current.value;

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/chat",
      headers: {
        authorization:
          "Bearer " + process.env.REACT_APP_EDENAI_KEY,
      },
      data: {
        providers: "openai",
        text: `Act as a Movie Recommendation System and suggest some movies for the query '${query}'. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Golmaal, Koi Mil Gaya, Don`,
        chatbot_global_action: "Act as an assistant",
        previous_history: [],
        temperature: 0.0,
        max_tokens: 150,
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);

      // console.log(response.data.openai.generated_text);
      const gptMovies = response.data.openai.generated_text.split(", ");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);


      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );

      setMovies(gptMovies);
    } catch (error) {
      setError(
        "An error occurred while fetching recommendations. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex flex-col items-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
