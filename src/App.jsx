import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { BlogProvider } from './context/BlogContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BlogEditor from './pages/BlogEditor.jsx';
import PreviewPage from './pages/PreviewPage.jsx';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <BlogEditor />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/preview" 
                element={
                  <ProtectedRoute>
                    <PreviewPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;