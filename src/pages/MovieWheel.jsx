

import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import confetti from "canvas-confetti";
import { GHIBLI_MUSIC } from "../data/GhibliMusic";

const MovieWheel = () => {

    const [allMovies, setAllMovies] = useState([]); // Όλες οι ταινίες από το API
    const [selectedMovies, setSelectedMovies] = useState([]); // Οι ταινίες που επέλεξε ο χρήστης
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState(null); // Κρατάμε όλο το αντικείμενο του νικητή
    const [isSpinning, setIsSpinning] = useState(false);


    //For the audio 
    const audioRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {

        if (winner && winner.title) {

            const trackUrl = GHIBLI_MUSIC[winner.title] || " https://jetta.vgmtreasurechest.com/soundtracks/my-neighbor-totoro-original-soundtrack/tqyvjhjw/02.%20The%20Village%20in%20May.mp3";

            //stop previous song if it was playing
            audioRef.current.pause();

            audioRef.current.src = trackUrl;
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4;

            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Autoplay blocked or audio error: ", err));

        }

        return () => {
            audioRef.current.pause();
        };

    }, [winner]);



    // 1. Fetch Data
    useEffect(() => {
        fetch("https://ghibliapi.vercel.app/films")
            .then((res) => res.json())
            .then((data) => {
                setAllMovies(data);
                setSelectedMovies(data.slice(0, 6));
            })
            .catch((err) => console.error("Error fetching movies for wheel:", err));
    }, []);

    if (allMovies.length === 0) {
        return (
            <div className="bg-zinc-900 min-h-screen">
                <Navbar />
                <div className="mt-20 text-center text-white font-sans text-xl tracking-widest uppercase">
                    Loading Wheel Data...
                </div>
            </div>
        );
    }

    const sliceSize = 360 / selectedMovies.length;

    const handleMovieToggle = (movie) => {
        if (isSpinning) return;

        const isAlreadySelected = selectedMovies.some((m) => m.id === movie.id);

        if (isAlreadySelected) {

            if (selectedMovies.length <= 2) {
                alert("You need at least 2 movies to spin the wheel!");
                return;
            }
            setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
        } else {

            if (selectedMovies.length >= 12) {
                alert("Maximum 12 movies allowed for a clean wheel layout!");
                return;
            }
            setSelectedMovies([...selectedMovies, movie]);
        }
        setWinner(null);
    };

    //winner glitter
    const triggerGlitter = () => {
        const duration = 1500;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 180, ticks: 60, zIndex: 40 };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 5 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0.5, y: 0.45 },
                colors: ["#a855f7", "#e9d5ff", "#fef08a", "#ffffff"],
                scalar: 0.7,
                drift: Math.random() - 0.5
            });
        }, 50);
    };

    const spinWheel = () => {
        if (isSpinning || selectedMovies.length === 0) return;
        setIsSpinning(true);
        setWinner(null);

        const randomIndex = Math.floor(Math.random() * selectedMovies.length);
        const extraSpins = 5 * 360;

        const targetAngle = 270 - (randomIndex * sliceSize + sliceSize / 2);
        const finalRotation = rotation + extraSpins + (targetAngle - (rotation % 360));

        setRotation(finalRotation);

        setTimeout(() => {
            setWinner(selectedMovies[randomIndex]);
            setIsSpinning(false);
            triggerGlitter();
        }, 3000);
    };



    return (

        <div className="bg-zinc-900 min-h-screen flex flex-col">

            <Navbar />

            <div
                className={`mt-20 md:mt-30 flex flex-col flex-1 items-center justify-center text-white font-sans px-3 transition-all duration-700 ease-out ${winner ? "-translate-y-24 md:-translate-y-32" : "translate-y-0"
                    }`}
            >
                {winner && (

                    <div className="w-full flex flex-col items-center">

                        <div className="text-center mt-12 mb-6 select-none animate-fade-in">
                            <h2 className="text-3xl md:text-4xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                                Next to Watch 🎬
                            </h2>
                        </div>

                        <div className="w-full bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent py-10 md:py-14 px-4 mb-24 mt-2 flex justify-center backdrop-blur-sm shadow-[0_30px_60px_-30px_rgba(120,60,193,0.8)] select-none animate-fade-in transition-all duration-700 ease-out hover:bg-zinc-800/50">


                            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-6 md:gap-10 px-4 md:px-7">

                                {winner.image && (
                                    <div className="shrink-0 transform transition-all duration-700 ease-out md:translate-y-1 hover:-translate-y-1 hover:scale-[1.02]">
                                        <img
                                            src={winner.image}
                                            alt={winner.title}
                                            className="w-44 h-64 sm:w-52 sm:h-80 md:w-72 md:h-108 object-cover rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">

                                    <div className="flex items-center space-x-2 mb-4 bg-white/5 border border-white/10 px-4 py-1 rounded-full backdrop-blur-md shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
                                        <p className="text-purple-200 text-[10px] font-bold tracking-[0.25em] uppercase">
                                            Your Next Magic
                                        </p>
                                    </div>

                                    <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-2 font-semibold">
                                        Studio Ghibli Presents:
                                    </p>

                                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-200 font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 leading-tight">
                                        {winner.title}
                                    </h2>

                                    {winner.description && (
                                        <p className="text-zinc-400 text-sm md:text-base font-light max-w-2xl leading-relaxed opacity-90 border-t border-zinc-700/40 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
                                            {winner.description}
                                        </p>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (isPlaying) {
                                                audioRef.current.pause();
                                            } else {
                                                audioRef.current.play();
                                            }
                                            setIsPlaying(!isPlaying);
                                        }}
                                        className="mt-6 flex items-center gap-2 bg-zinc-950 border border-zinc-700 border-b-4 border-b-zinc-900 rounded-xl px-4 py-2 text-sm font-bold text-purple-300 transition-all active:translate-y-0.5 active:border-b-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:text-white"
                                    >
                                        {isPlaying ? "🎵 Mute Music" : "🔇 Play Music"}
                                    </button>


                                </div>



                            </div>
                        </div>

                    </div>
                )}



                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 mb-10 md:mb-15 uppercase drop-shadow-sm text-center">
                    Movie Wheel
                </h1>

                <div className="text-2xl mb-2 text-purple-400">▼</div>

                {/* SVG Wheel */}
                <div
                    className={`w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] rounded-full transition-all duration-700 ${winner
                        ? "shadow-[0_0_80px_rgba(182,127,219,0.8)] scale-102"
                        : "shadow-[0_0_80px_rgba(182,127,219,0.8)]"
                        }`}
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isSpinning
                            ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)"
                            : "all 0.7s ease-out, transform 0s",
                    }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                        <g>
                            {selectedMovies.map((movie, index) => {
                                const startAngle = index * sliceSize;
                                const endAngle = startAngle + sliceSize;

                                const rad1 = (Math.PI * startAngle) / 180;
                                const rad2 = (Math.PI * endAngle) / 180;
                                const x1 = 100 + 100 * Math.cos(rad1);
                                const y1 = 100 + 100 * Math.sin(rad1);
                                const x2 = 100 + 100 * Math.cos(rad2);
                                const y2 = 100 + 100 * Math.sin(rad2);

                                const textAngle = startAngle + sliceSize / 2;

                                return (
                                    <g key={movie.id}>

                                        <path
                                            d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                                            fill={index % 2 === 0 ? "#a855f7" : "#7e22ce"}
                                            stroke="#6b21a8"
                                            strokeWidth="0.5"
                                        />

                                        <g transform={`rotate(${textAngle}, 100, 100)`}>
                                            <text
                                                x="115"
                                                y="102"
                                                textAnchor="start"
                                                fill="white"
                                                className="font-bold uppercase tracking-wider opacity-90"
                                                style={{
                                                    fontSize: selectedMovies.length > 8 ? "3.2px" : "4.5px"
                                                }}
                                            >
                                                {movie.title.length > 15 ? `${movie.title.substring(0, 15)}...` : movie.title}
                                            </text>
                                        </g>
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>

                {/* Spin Button */}
                <button
                    onClick={spinWheel}
                    disabled={isSpinning || selectedMovies.length < 2}
                    className="mt-10 md:mt-12 bg-purple-600 hover:bg-purple-500 tracking-widest px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-light uppercase transition disabled:opacity-30"
                >
                    {isSpinning ? "Spinning..." : "SPIN"}
                </button>

                <div className="w-full max-w-4xl px-6 mb-10 mt-15">

                    <p className="text-zinc-400 text-xl uppercase tracking-wider text-center mb-6">
                        Choose your movies ({selectedMovies.length} selected):
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto bg-zinc-800/50 p-3 sm:p-4 rounded-xl border border-zinc-800 scrollbar-thin">                        {allMovies.map((movie) => {
                        const isChecked = selectedMovies.some((m) => m.id === movie.id);
                        return (
                            <label
                                key={movie.id}
                                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition select-none text-xs border ${isChecked
                                    ? "bg-purple-900/40 border-purple-500 text-purple-200"
                                    : "bg-zinc-800 border-transparent text-zinc-400 hover:bg-zinc-750"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    disabled={isSpinning}
                                    onChange={() => handleMovieToggle(movie)}
                                    className="accent-purple-500 w-4 h-4 cursor-pointer"
                                />
                                <span className="truncate">{movie.title}</span>
                            </label>
                        );
                    })}
                    </div>
                </div>
            </div>


            <Footer />

        </div>
    );
};

export default MovieWheel;


