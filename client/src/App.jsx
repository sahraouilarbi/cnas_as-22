import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import FormulairePage from './pages/FormulairePage';
import Historique from './pages/Historique';
import Parametres from './pages/Parametres';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<FormulairePage />} />
            <Route path="/edit/:id" element={<FormulairePage />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/parametres" element={<Parametres />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
