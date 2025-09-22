import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Cloud, TrendingUp, Zap, Lock } from 'lucide-react';

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-12 flex-col justify-center">
          <div className="text-white">
            <div className="flex items-center mb-8">
              <Cloud className="h-12 w-12 mr-4" />
              <h1 className="text-4xl font-bold">ML FinOps</h1>
            </div>
            <h2 className="text-3xl font-light mb-6">Deploy. Monitor. Optimize.</h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              The intelligent platform for ML model deployment with real-time cost analytics and predictive insights.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 mr-4 text-blue-300" />
                <span className="text-lg">Predictive Cost Analytics</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-6 w-6 mr-4 text-blue-300" />
                <span className="text-lg">One-Click SageMaker Deployment</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-6 w-6 mr-4 text-blue-300" />
                <span className="text-lg">Enterprise Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center mb-6">
                <Cloud className="h-10 w-10 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">ML FinOps</h1>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center mb-2">Demo credentials:</p>
              <p className="text-xs text-gray-500 text-center">
                Email: demo@mlfinops.com | Password: demo123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}