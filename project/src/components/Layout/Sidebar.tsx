import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Cloud, 
  LayoutDashboard, 
  Rocket, 
  TrendingUp, 
  Settings, 
  LogOut,
  Crown
} from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Deploy Models', href: '/deploy', icon: Rocket },
    { name: 'Cost Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Cloud className="h-8 w-8 text-blue-600" />
        <span className="ml-3 text-xl font-bold text-gray-900">ML FinOps</span>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.email}</p>
            <div className="flex items-center mt-1">
              {user?.plan === 'premium' && <Crown className="h-3 w-3 text-yellow-500 mr-1" />}
              <p className="text-xs text-gray-500 capitalize">{user?.plan} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
}