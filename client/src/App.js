import React from 'react';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textelements.css';
import './stylesheets/form-elements.css';
import './stylesheets/custom-components.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/common/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={
          <ProtectedRoute>
          <Home />
        </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
