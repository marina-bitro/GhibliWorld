
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { trailers } from "../data/trailers";
import { getEmbedUrl } from "../utils/youtubeUrl";
import { GHIBLI_MUSIC } from "../data/GhibliMusic";


const MoviePage = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const audioRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {

        const fetchMovie = async () => {

            try {

                const res = await fetch(
                    `https://ghibliapi.vercel.app/films/${id}`
                );

                if (!res.ok) {
                    throw new Error("Movie not found!");
                }

                const data = await res.json();

                setMovie(data);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            };

        };

        fetchMovie();

    }, [id]);

    const stopMusic = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    useEffect(() => {
        return () => {
            stopMusic();
        }
    }, []);

    useEffect(() => {
        stopMusic();
    }, [id]);



    if (loading) {
        return (
            <div className="bg-zinc-900 min-h-screen flex flex-col text-white">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl animate-pulse text-purple-300 tracking-widest">
                        LOADING MAGIC... ✨
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="bg-zinc-900 min-h-screen flex flex-col text-white">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl text-zinc-500">Movie not found! 🎬</p>
                </div>
                <Footer />
            </div>
        );
    }


    const movieTrailer = trailers.find(
        (t) => t.title.toLowerCase().trim() === movie.title.toLowerCase().trim()
    );



    //play music
    const handleMusic = (title) => {

        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        const trackUrl = GHIBLI_MUSIC[title];
        if (!trackUrl) return;

        audio.src = trackUrl;
        audio.loop = true;
        audio.volume = 0.4;

        audio.play()
            .then(() => setIsPlaying(true))
            .catch(console.log);

    }




    return (

        <div className="relative min-h-screen flex flex-col text-white bg-zinc-950">

            {/* Image Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

                {movie.image && (
                    <img
                        src={movie.image}
                        className="w-full h-full object-cover opacity-30 blur-sm scale-100"
                    />
                )}
            </div>

            <Navbar />

            {/* Content */}
            <div className="relative z-10 mt-20 flex flex-col items-center px-4 flex-1">

                <div className="w-full max-w-5xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-12 ">

                    {/* NOW PLAYING */}
                    {isPlaying && (
                        <div className="mb-6 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs animate-pulse">
                            🎵 Now Playing: {movie.title}
                        </div>
                    )}

                    {/* TITLE */}
                    <h1 className="text-4xl md:text-6xl font-black text-center mb-10">
                        {movie.title}
                    </h1>

                    {/* MOVIE CONTENT */}
                    <div className="flex flex-col md:flex-row gap-10">

                        {/* IMAGE */}
                        {movie.image && (
                            <img
                                src={movie.image}
                                className="w-64 h-96 object-cover rounded-2xl shadow-xl border border-white/10 mx-auto md:mx-0 "
                            />
                        )}

                        <div className="flex-1 flex flex-col m-auto">

                            <p className="text-zinc-400 text-sm tracking-widest uppercase text-center md:text-left">
                                {movie.original_title} • {movie.release_date}
                            </p>

                            <p className="text-zinc-300 leading-relaxed mt-4 text-justify mb-3">
                                {movie.description}
                            </p>

                            {/* Bottom row */}
                            <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">

                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-400 text-sm">Rating</span>
                                    <span className="text-purple-300 px-3 py-1 border border-white/10 rounded">
                                        {movie.rt_score}%
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleMusic(movie.title)}
                                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transition"
                                >
                                    {isPlaying ? "Pause ⏸" : "Play Music ▶"}
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* TRAILER */}
                    <div className="hover:shadow-purple-500/20 transition mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                        {movieTrailer ? (
                            <iframe
                                className="w-full aspect-video"
                                src={getEmbedUrl(movieTrailer.url)}
                                allowFullScreen
                            />
                        ) : (
                            <p className="p-6 text-zinc-400">Trailer not available</p>
                        )}
                    </div>

                </div>
            </div>

            <div className="mt-auto w-full">
                <Footer />
            </div>

        </div>



    );
};

export default MoviePage;
