import React from 'react';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textelements.css';
import './stylesheets/form-elements.css';
import './stylesheets/custom-components.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
