import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MovieWheel from "./pages/MovieWheel";
import Quiz from "./pages/GhibliQuizz";
import MoviePage from "./pages/MoviePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-wheel" element={<MovieWheel />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/movie-page/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;