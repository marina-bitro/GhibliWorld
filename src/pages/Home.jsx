import { useEffect, useState, useRef, useMemo } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import NoFace from "../assets/NoFace-Ghibli.png";
import Footer from "../components/Footer";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(6);
    const [bubbles, setBubbles] = useState([]);

    const timeoutRef = useRef([]);

    // Fetch movies με το σωστό Ghibli API endpoint
    useEffect(() => {
        fetch(`https://ghibliapi.vercel.app/films`)
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error("Error fetching movies:", err));
    }, []);

    // Optimized filtering
    const filteredMovies = useMemo(() => {
        return movies.filter(movie =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [movies, search]);

    const visibleMovies = useMemo(() => {
        return filteredMovies.slice(0, visibleCount);
    }, [filteredMovies, visibleCount]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {
                if (
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 120
                ) {
                    setVisibleCount(prev => prev + 6);
                }
                ticking = false;
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Balloon animation
    const handleGhostTap = () => {
        const newBubble = {
            id: Date.now() + Math.random(),
            position: Math.floor(Math.random() * 60) - 30,
        };

        setBubbles(prev => [...prev, newBubble]);

        const timeout = setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
        }, 3000);

        timeoutRef.current.push(timeout);
    };

    useEffect(() => {
        return () => {
            timeoutRef.current.forEach(clearTimeout);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="relative flex flex-col items-center justify-center gap-6 md:gap-10 px-4 md:px-8 select-none">

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 w-full max-w-7xl">

                <Navbar />

                {/* Header Container: Σταθερή row διάταξη που δεν σπάει και δεν μικραίνει στα κινητά */}
                <div className="relative flex flex-row flex-nowrap items-center justify-center gap-6 mt-20 select-none w-full max-w-xl mx-auto">

                    <div className="relative inline-block shrink-0">

                        <div className="absolute left-full top-2 -translate-y-4 bg-zinc-800/40 backdrop-blur-sm border border-zinc-700/50 px-1 py-1 rounded-xl text-[10px] text-purple-200 uppercase tracking-widest opacity-70">
                            Tap me
                        </div>

                        {bubbles.map(bubble => (
                            <span
                                key={bubble.id}
                                style={{ left: `calc(50% + ${bubble.position}px)` }}
                                className="absolute bottom-full text-2xl animate-float-up pointer-events-none"
                            >
                                🎈
                            </span>
                        ))}

                        <img
                            src={NoFace}
                            alt="No Face"
                            onClick={handleGhostTap}
                            className="
                                w-24 h-24
                                md:w-32 md:h-32
                                object-contain
                                cursor-pointer
                                transition-all duration-500
                                hover:scale-105
                                active:scale-95
                                drop-shadow-lg
                            "
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl text-left text-purple-200 font-extrabold tracking-wide shrink-0">
                        Ghibli{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-purple-200 to-purple-400 animate-pulse">
                            Movies
                        </span>
                    </h1>

                </div>

                {/* SEARCH */}
                <SearchBar search={search} setSearch={setSearch} />

                {/* EMPTY STATE */}
                {filteredMovies.length === 0 && (
                    <div className="flex-1 flex text-center justify-center text-zinc-400 mt-40 animate-pulse">
                        No spirits found in the forest 🍃
                    </div>
                )}

                {/* GRID CARD */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* SCROLL TO TOP */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-11 h-11 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-xl flex items-center justify-center text-purple-300 shadow-lg transition-all hover:text-white hover:-translate-y-1 active:translate-y-0.5 z-50"
                >
                    ▲
                </button>

                <div className="mt-auto w-full md:mb-50">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Home;
