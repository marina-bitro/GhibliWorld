
import { Link } from "react-router-dom";


const MovieCard = ({ movie }) => {

  return (

    <Link
      to={`/movie-page/${movie.id}`}
      className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition block cursor-pointer"
    >

      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">

        <h2 className="text-white text-lg font-bold">
          {movie.title}
        </h2>

        <p className="text-zinc-400 text-sm mt-2 line-clamp-4">
          {movie.description}
        </p>

      </div>

    </Link>

  );
};

export default MovieCard;