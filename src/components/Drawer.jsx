import { useState } from 'react';
import { X, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Drawer({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const handleSettings = () => {
    onClose();
    navigate('/settings');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold">{user?.username}</p>
              <p className="text-xs text-blue-100 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {/* Settings Button */}
          <button
            onClick={handleSettings}
            className="w-full flex items-center space-x-3 p-4 hover:bg-gray-100 rounded-xl transition-colors group"
          >
            <div className="p-2 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-700">Pengaturan</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-4 hover:bg-red-50 rounded-xl transition-colors group"
          >
            <div className="p-2 bg-red-100 group-hover:bg-red-200 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-medium text-red-600">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
