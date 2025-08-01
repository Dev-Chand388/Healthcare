import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DoctorProfile from './pages/DoctorProfile';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;