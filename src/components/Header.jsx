import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { LogOut, User, FileText } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  if (!user?.isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">Blog CMS</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User size={18} />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            
            <button
              onClick={logout}
              className="inline-flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-150 ease-in-out"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;