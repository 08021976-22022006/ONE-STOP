import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AWSProvider } from './contexts/AWSContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ModelDeployment from './components/Models/ModelDeployment';
import CostAnalytics from './components/Cost/CostAnalytics';
import Layout from './components/Layout/Layout';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <AWSProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/deploy" element={
                <ProtectedRoute>
                  <Layout>
                    <ModelDeployment />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Layout>
                    <CostAnalytics />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AWSProvider>
    </AuthProvider>
  );
}

export default App;