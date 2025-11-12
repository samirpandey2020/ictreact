import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KioskSimilarityGame from "./SimilarityGame";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KioskSimilarityGame />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/test" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;