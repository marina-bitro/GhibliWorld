import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const questions = [

    {
        id: 1,
        question: "Choose your ideal companion for a long journey:",
        options: [
            { text: "A massive, fluffy magical creature", tag: "cozy" },
            { text: "A witty talking black cat", tag: "cozy" },
            { text: "A mysterious boy who can turn into a dragon", tag: "fantasy" },
            { text: "A fierce wolf-god of the forest", tag: "fantasy" }
        ]
    },
    {
        id: 2,
        question: "What is your favorite way to relax after a stressful day?",
        options: [
            { text: "Walking through an ancient, quiet forest", tag: "nature" },
            { text: "Listening to old records or writing in my room", tag: "slice-of-life" },
            { text: "Stargazing and thinking about the universe", tag: "sky" },
            { text: "Cooking a warm, delicious meal for friends", tag: "cozy" }
        ]
    },
    {
        id: 3,
        question: "Pick a magical setting you want to explore right now:",
        options: [
            { text: "A moving steampunk castle made of scraps", tag: "fantasy" },
            { text: "A hidden bathhouse filled with unique spirits", tag: "fantasy" },
            { text: "A secret tiny house hidden beneath the floorboards", tag: "cozy" },
            { text: "An absolute kingdom of cats where humans can't enter", tag: "fantasy" }
        ]
    },
    {
        id: 4,
        question: "How do you usually handle difficult challenges in your life?",
        options: [
            { text: "I work hard, adapt, and rely on my independence", tag: "coming-of-age" },
            { text: "I fight fiercely for what is right, no matter the cost", tag: "warrior" },
            { text: "I look back at the past and learn from my memories", tag: "slice-of-life" },
            { text: "I embrace the sadness but keep moving forward with hope", tag: "drama" }
        ]
    },
    {
        id: 5,
        question: "Which of these visual colors appeals to you the most?",
        options: [
            { text: "Deep ocean blues and glowing aqua tones", tag: "sea" },
            { text: "Vibrant moss greens and earthy forest brown", tag: "nature" },
            { text: "Bright sunset oranges and endless sky blues", tag: "sky" },
            { text: "Soft sepia, warm lights, and nostalgic vintage tones", tag: "classic" }
        ]
    },
    {
        id: 6,
        question: "What kind of core theme moves your heart the most?",
        options: [
            { text: "The balance between human civilization and nature", tag: "nature" },
            { text: "The bittersweet pain of growing up and leaving childhood", tag: "coming-of-age" },
            { text: "A powerful, tragic historical drama about survival", tag: "drama" },
            { text: "The pure, simple joy of family, love, and friendship", tag: "cozy" }
        ]
    },
    {
        id: 7,
        question: "If you could fly, what vehicle or method would you use?",
        options: [
            { text: "A simple wooden witch's broomstick", tag: "sky" },
            { text: "A custom-built vintage propeller airplane", tag: "sky" },
            { text: "Riding on the back of a massive flying spirit totem", tag: "fantasy" },
            { text: "A floating crystal island or an airship", tag: "sky" }
        ]
    },
    {
        id: 8,
        question: "What is your relationship with nostalgia and your past?",
        options: [
            { text: "I miss my childhood deeply and love visiting old places", tag: "slice-of-life" },
            { text: "I am focused entirely on the future and what I can build", tag: "modern" },
            { text: "I find beauty in traditional folklore, old tales, and myths", tag: "classic" },
            { text: "I feel connected to quiet, melancholic artistic expressions", tag: "drama" }
        ]
    },
    {
        id: 9,
        question: "Pick an emotional tone that best describes your life story:",
        options: [
            { text: "Whimsical, innocent, and full of childlike wonder", tag: "cozy" },
            { text: "Epic, intense, grand, and mythologically profound", tag: "fantasy" },
            { text: "Quiet, realistic, poetic, and highly introspective", tag: "slice-of-life" },
            { text: "Heart-wrenching, emotionally raw, yet beautiful", tag: "drama" }
        ]
    },
    {
        id: 10,
        question: "Finally, choose an item that holds powerful meaning to you:",
        options: [
            { text: "A glowing blue crystal pendant", tag: "fantasy" },
            { text: "A vintage sketchpad filled with personal drawings", tag: "slice-of-life" },
            { text: "A basket of fresh vegetables from a local garden", tag: "nature" },
            { text: "A paper airplane template waiting to take off", tag: "sky" }
        ]
    }

];



const GhibliQuiz = () => {


    const [movies, setMovies] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [quizResult, setQuizResult] = useState(null);



    useEffect(() => {
        fetch("https://ghibliapi.vercel.app/films")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching movies for global quiz:", err));
    }, []);


    const handleAnswer = (tag) => {

        const updatedTags = [...selectedTags, tag];

        setSelectedTags(updatedTags);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateAdvancedResult(updatedTags);
        }

    };

    // 2. ALGORITHM FOR ALL 22+ MOVIES
    const calculateAdvancedResult = (finalTags) => {

        const movieProfiles = [
            { id: "spirited", title: "Spirited Away", tags: ["fantasy", "magic-user", "coming-of-age", "modern"] },
            { id: "howl", title: "Howl's Moving Castle", tags: ["fantasy", "magic-user", "sky", "modern"] },
            { id: "totoro", title: "My Neighbor Totoro", tags: ["cozy", "nature", "classic", "family"] },
            { id: "mononoke", title: "Princess Mononoke", tags: ["fantasy", "nature", "warrior", "classic"] },
            { id: "kiki", title: "Kiki's Delivery Service", tags: ["cozy", "sky", "coming-of-age", "classic"] },
            { id: "ponyo", title: "Ponyo", tags: ["cozy", "sea", "nature", "modern"] },
            { id: "laputa", title: "Castle in the Sky", tags: ["fantasy", "sky", "warrior", "classic"] },
            { id: "nausicaa", title: "Nausicaä of the Valley of the Wind", tags: ["drama", "nature", "warrior", "classic"] },
            { id: "grave", title: "Grave of the Fireflies", tags: ["drama", "classic", "family"] },
            { id: "whisper", title: "Whisper of the Heart", tags: ["slice-of-life", "coming-of-age", "classic"] },
            { id: "arrietty", title: "The Secret World of Arrietty", tags: ["cozy", "nature", "modern"] },
            { id: "wind", title: "The Wind Rises", tags: ["slice-of-life", "sky", "drama", "modern"] },
            { id: "poppy", title: "From Up on Poppy Hill", tags: ["slice-of-life", "sea", "coming-of-age", "modern"] },
            { id: "marnie", title: "When Marnie Was There", tags: ["drama", "sea", "coming-of-age", "modern"] },
            { id: "kaguya", title: "The Tale of the Princess Kaguya", tags: ["drama", "classic", "nature"] },
            { id: "porco", title: "Porco Rosso", tags: ["cozy", "sky", "classic"] },
            { id: "yesterday", title: "Only Yesterday", tags: ["slice-of-life", "nature", "classic"] },
            { id: "returns", title: "The Cat Returns", tags: ["fantasy", "cozy", "modern"] },
            { id: "earthsea", title: "Tales from Earthsea", tags: ["fantasy", "warrior", "modern"] },
            { id: "poko", title: "Pom Poko", tags: ["fantasy", "nature", "classic"] },
            { id: "yamadas", title: "My Neighbors the Yamadas", tags: ["slice-of-life", "cozy", "classic", "family"] },
            { id: "waves", title: "Ocean Waves", tags: ["slice-of-life", "sea", "coming-of-age", "classic"] },
            { id: "heron", title: "The Boy and the Heron", tags: ["fantasy", "drama", "modern"] } // Added recent 2023 masterpiece
        ];

        let scoredMovies = movieProfiles.map((profile) => {
            let score = 0;

            // Count how many chosen tags match this specific movie profile
            finalTags.forEach(userTag => {
                if (profile.tags.includes(userTag)) {
                    score += 1;
                }
            });

            // Find the API movie object that matches this profile title
            const apiMovie = movies.find(m => m.title.toLowerCase().includes(profile.title.toLowerCase()) || profile.title.toLowerCase().includes(m.title.toLowerCase()));

            return {
                movie: apiMovie || movies[Math.floor(Math.random() * movies.length)], // fallback safety
                score: score
            };
        });

        // Sort by highest score
        scoredMovies.sort((a, b) => b.score - a.score);

        // All movies sharing the highest score and pick one randomly
        const highestScore = scoredMovies[0].score;
        const bestMatches = scoredMovies.filter(item => item.score === highestScore);
        const ultimateMatch = bestMatches[Math.floor(Math.random() * bestMatches.length)];

        setQuizResult(ultimateMatch.movie);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedTags([]);
        setQuizResult(null);
    };

    if (movies.length === 0) {
        return (
            <div className="bg-zinc-900 min-h-screen">
                <Navbar />
                <div className="mt-20 text-center text-white font-sans text-xl tracking-widest uppercase">
                    Loading Quiz...
                </div>
            </div>
        );
    }


    return (


        <div className="bg-zinc-900 min-h-screen flex flex-col">

            <Navbar />

            <div className="mt-20 flex flex-col items-center justify-center text-white font-sans px-4 flex-1">
                <h1 className="text-4xl font-light tracking-widest mb-10 text-purple-200 uppercase text-center">
                    Ghibli Destiny Quiz
                </h1>

                {!quizResult ? (
                    <div className="w-full max-w-xl bg-zinc-800/40 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-xl">
                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-700 h-1.5 rounded-full mb-6 overflow-hidden">
                            <div
                                className="bg-purple-500 h-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <p className="text-purple-400 text-xs uppercase tracking-widest mb-2">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>

                        <h2 className="text-xl font-medium mb-6 leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>

                        <div className="flex flex-col space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option.tag)}
                                    className="w-full text-left bg-zinc-800 hover:bg-purple-900/45 border border-zinc-700 hover:border-purple-500/50 p-4 rounded-xl transition text-sm font-light tracking-wide active:scale-[0.99]"
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (

                    <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-12 px-6 py-10 animate-fade-in">

                        {quizResult.image && (
                            <div className="relative shrink-0 transition-transform duration-500 hover:scale-102">
                                <div className="absolute inset-2 bg-purple-900/30 rounded-2xl blur-2xl -z-10"></div>
                                <img
                                    src={quizResult.image}
                                    alt={quizResult.title}
                                    className="w-48 h-72 md:w-56 md:h-80 object-cover rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-zinc-800"
                                />
                            </div>
                        )}

                        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 mt-2">

                            <p className="text-purple-400 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
                                // Your Destiny Match
                            </p>

                            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2 font-medium">
                                Your personality and lifestyle perfectly align with:
                            </p>

                            <h2 className="text-white font-black text-4xl md:text-6xl uppercase tracking-wide mb-4 leading-tight">
                                {quizResult.title}
                            </h2>

                            <div className="w-12 h-[1px] bg-purple-500/50 mb-6"></div>

                            {/* Movie Description */}
                            {quizResult.description && (
                                <p className="text-zinc-400 text-base font-light max-w-2xl leading-relaxed mb-8">
                                    {quizResult.description}
                                </p>
                            )}

                            {/* Retake Button */}
                            <button
                                onClick={restartQuiz}
                                className="bg-transparent hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 hover:border-transparent tracking-widest px-8 py-3 rounded-full text-xs font-semibold uppercase transition-all duration-300 active:scale-95 shadow-md"
                            >
                                Retake the Quiz
                            </button>
                        </div>

                    </div>
                )}
            </div>

            <Footer />

        </div>
    );
};

export default GhibliQuiz;
