import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Drawer from '../components/Drawer';

export default function MenuPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    {
      title: 'Acceptance Inspection / Stock In',
      icon: Package,
      color: 'from-emerald-500 to-teal-600',
      path: '/acceptance-inspection'
    },
    {
      title: 'Material Feeding',
      icon: Truck,
      color: 'from-blue-500 to-indigo-600',
      path: '/material-feeding'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold">Shinsei Traceability</h1>
            <p className="text-blue-100 text-sm mt-1">
              {user?.username || 'Main Menu'} • {user?.role || 'User'}
            </p>
          </div>
          <div className="w-11"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Menu Cards */}
      <div className="max-w-md mx-auto p-6 space-y-4 mt-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full group"
            >
              <div className={`bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-4 ${
                    index === 0 ? 'bg-emerald-100' : 'bg-blue-100'
                  } rounded-xl`}>
                    <Icon className={`w-8 h-8 ${
                      index === 0 ? 'text-emerald-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h2 className="text-xl font-bold text-slate-800">{item.title}</h2>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
