import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const hoverGradientClass = `
    relative transition-all duration-500 ease-in-out
    bg-gradient-to-r from-zinc-400 via-purple-200 to-purple-400 bg-clip-text 
    text-zinc-300 hover:text-transparent
  `;

  return (
    /* ΔΙΟΡΘΩΣΗ 1: Όταν το μενού είναι ανοιχτό, το Navbar παίρνει σταθερό bg-zinc-950 
       και border-transparent, ώστε να γίνεται ΕΝΑ σώμα με το drop-down χωρίς χρωματικές διαφορές */
    <nav
      ref={menuRef}
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 font-sans border-b ${menuOpen ? "bg-zinc-950 border-transparent" : "bg-zinc-950/60 border-white/5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-5 relative">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-serif font-bold tracking-wide text-purple-200"
          onClick={() => setMenuOpen(false)}
        >
          GhibliWorld
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-xl text-zinc-300 font-medium text-center">
          <Link className={hoverGradientClass} to="/">Home</Link>
          <Link className={hoverGradientClass} to="/movie-wheel">Movie Wheel</Link>
          <Link className={hoverGradientClass} to="/quiz">Quiz</Link>
        </div>

        {/* Mobile Button Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/50 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <span className={`h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Full-Width Expandable Top Menu */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`
                        absolute top-full left-0 w-full md:hidden
                        bg-zinc-950 border-b border-white/5 backdrop-blur-2xl
                        flex flex-col items-center justify-center px-8 py-8 shadow-2xl
                        transition-all duration-300 ease-in-out origin-top 
                        ${menuOpen
              ? "opacity-100 scale-y-100 visible"
              : "opacity-0 scale-y-0 invisible pointer-events-none"}
                    `}
        >

          
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className={`text-2xl font-sans font-medium text-zinc-300 py-3 text-center w-max ${hoverGradientClass}`}
          >
            Home
          </Link>

          <div className="w-full max-w-[500px] border-t border-purple-500/20" />

          <Link
            to="/movie-wheel"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className={`text-2xl font-sans font-medium text-zinc-300 py-3 text-center w-max ${hoverGradientClass}`}
          >
            Movie Wheel
          </Link>

          <div className="w-full max-w-[500px] border-t border-purple-500/20" />

          <Link
            to="/quiz"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className={`text-2xl font-sans font-medium text-zinc-300 py-3 text-center w-max ${hoverGradientClass}`}
          >
            Quiz
          </Link>

          <div className="w-full max-w-[500px] border-t border-purple-500/20" />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
