import React from 'react';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textelements.css';
import './stylesheets/form-elements.css';
import './stylesheets/custom-components.css';
import './stylesheets/layout.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/common/Home';
import Exams from './pages/admin/Exams';
import Reports from './pages/admin/Reports';
import AddEditExam from './pages/admin/Exams/AddEditExam';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';

function App() {
  const {loading} = useSelector(state => state.loader);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
      <Routes>
        {/* Common Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* User Routes */}
        <Route path='/' element={
          <ProtectedRoute>
          <Home />
        </ProtectedRoute>}
        />
        
        {/* Admin Routes */}
        <Route path='/admin/exams' element={
          <ProtectedRoute>
          <Exams />
        </ProtectedRoute>}
        />
        <Route path='/admin/reports' element={
          <ProtectedRoute>
          <Reports />
        </ProtectedRoute>}
        />
        <Route path='/admin/exams/add' element={
          <ProtectedRoute>
          <AddEditExam />
        </ProtectedRoute>}
        />
        <Route path='/admin/exams/edit/:id' element={
          <ProtectedRoute>
          <AddEditExam />
        </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
