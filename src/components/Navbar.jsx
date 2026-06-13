import { Link } from "react-router-dom";

const Navbar = () => {

  return (

    <nav className="bg-zinc-950/70 backdrop-blur-lg text-white flex justify-between items-center px-10 py-6 shadow-xl">

      <Link to="/" className="text-2xl font-bold tracking-wide text-gradient"> GhibliWorld</Link>

      <ul className="flex gap-10 text-xl font-medium">

        <Link
          to="/"
          className="hover:text-gradient hover:scale-105 transition cursor-pointer"
        >
          Home
        </Link>

        <Link
          to="/movie-wheel"
          className="hover:text-gradient hover:scale-105 transition cursor-pointer"
        >
          Ghibli Wheel
        </Link>

        <Link
          to="/quiz"
          className="hover:text-gradient hover:scale-105 transition cursor-pointer"
        >
          Quiz
        </Link>

      </ul>
    </nav>

  );
  
};

export default Navbar;