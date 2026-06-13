import { Link } from "react-router-dom";

const Footer = () => {

  return (

    <footer className="w-full bg-zinc-950/60 backdrop-blur-sm text-white py-8 mt-20 border-t border-t-white/5 flex flex-col items-center gap-4 select-none px-4 ">

      <div className="flex items-center gap-6 text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-400">
        
        <Link to="/" className="hover:text-purple-200 transition-colors">Home</Link>
        <span className="text-zinc-700 font-normal select-none">•</span>
        <Link to="/movie-wheel" className="hover:text-purple-200 transition-colors">Movie Wheel</Link>
        <span className="text-zinc-700 font-normal select-none">•</span>
        <Link to="/quiz" className="hover:text-purple-200 transition-colors">Game Quiz</Link>

      </div>

      <p className="text-center text-[10px] text-zinc-500 font-light tracking-wide opacity-80 max-w-xl">
        © Studio Ghibli. Audio via Internet Archive. Purely a fan-made educational project.
      </p>

    </footer>
  );
};

export default Footer;
