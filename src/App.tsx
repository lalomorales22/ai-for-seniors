import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import NameEntry from './pages/NameEntry';
import Dashboard from './pages/Dashboard';
import FeatureChat from './pages/FeatureChat';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/name" element={<NameEntry />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feature/:featureId" element={<FeatureChat />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;