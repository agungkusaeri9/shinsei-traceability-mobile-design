import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Server, Shield, Lock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // PIN Verification State
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    // Load current settings
    setIpAddress(localStorage.getItem('serverIp') || '192.168.1.1');
    setPort(localStorage.getItem('serverPort') || '8080');
  }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();
    setPin('');
    setPinError('');
    setShowPinModal(true);
  };

  const handleVerifyAndSave = (e) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_SETTINGS_PIN;

    if (pin === correctPin) {
      // Save settings
      localStorage.setItem('serverIp', ipAddress);
      localStorage.setItem('serverPort', port);
      
      // Close modal and show success
      setShowPinModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setPinError('Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-blue-100 text-sm">Application Configuration</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-6 space-y-6">
        
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Session</p>
            <p className="font-bold text-gray-800">{user?.username || 'Guest'}</p>
            <p className="text-xs text-blue-600 capitalize bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
              {user?.role || 'User'}
            </p>
          </div>
        </div>

        {/* Server Configuration Form */}
        <form onSubmit={handleSaveClick} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <Server className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-800">Server Configuration</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                IP Address
              </label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-mono"
                placeholder="192.168.1.1"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Example: 192.168.1.100</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Port
              </label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-mono"
                placeholder="8080"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Default: 8080</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </form>

        {/* Success Message Toast */}
        <div 
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 transition-all duration-300 ${
            showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-medium">Settings saved successfully!</span>
        </div>
      </div>

      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs transform transition-all scale-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Security Check</h3>
                </div>
                <button 
                  onClick={() => setShowPinModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Please enter the 6-digit PIN to save changes.
              </p>

              <form onSubmit={handleVerifyAndSave} className="space-y-4">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full text-center text-2xl tracking-[0.5em] font-bold py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                  maxLength={6}
                  placeholder="••••••"
                  autoFocus
                />
                
                {pinError && (
                  <p className="text-xs text-red-500 text-center font-medium animate-pulse">
                    {pinError}
                  </p>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="flex-1 py-2.5 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-200"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
