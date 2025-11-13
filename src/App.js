import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimilarityGame from "./components/similarity-game/SimilarityGame";
import AdminAuth from "./AdminAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimilarityGame />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/test" element={<AdminAuth />} />
      </Routes>
    </Router>
  );
}

export default App;