import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLetters } from "./features/alphabetSlice";
import { arabicLetters } from "./data/arabicLetters";
import AlphabetList from "./components/AlphabetList";
import LetterDetail from "./components/LetterDetail";
import Quiz from "./components/Quiz";
import DragDropQuiz from "./components/DragDropQuiz";
import FormQuiz from "./components/FormQuiz";
import LetterFormsPage from "./components/LetterFormsPage";
import "./index.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLetters(arabicLetters));
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AlphabetList />} />
        <Route path="/letter/:id" element={<LetterDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/drag-quiz" element={<DragDropQuiz />} />
        <Route path="/form-quiz" element={<FormQuiz />} />
        <Route path="/forms" element={<LetterFormsPage />} />
      </Routes>
    </div>
  );
}

export default App;
