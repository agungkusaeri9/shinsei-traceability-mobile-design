import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Plus, Camera, Calendar, QrCode, X, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MaterialFeedingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/menu')}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Material Feeding</h1>
            <p className="text-blue-100 text-sm">Production Line Supply</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm sticky top-[88px] z-10">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <History className="w-5 h-5" />
              <span>History</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'form'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Feeding</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 content-container">
        {activeTab === 'history' ? (
          <HistoryTab navigate={navigate} />
        ) : (
          <FormTab />
        )}
      </div>
    </div>
  );
}

function HistoryTab({ navigate }) {
  const dummyData = [
    {
      id: 'MF-001',
      partCode: 'PC-8821',
      partName: 'Connector Assembly',
      partModel: 'MODEL-X-55',
      orderNo: 'ORD-1737427200',
      quantity: 150,
      inspectionDate: '2026-01-19',
      status: 'Completed'
    },
    {
      id: 'MF-002',
      partCode: 'PC-9932',
      partName: 'PCB Board Main',
      partModel: 'MODEL-Y-12',
      orderNo: 'ORD-1737340800',
      quantity: 80,
      inspectionDate: '2026-01-19',
      status: 'In Progress'
    },
    {
      id: 'MF-003',
      partCode: 'PC-7743',
      partName: 'Cable Harness',
      partModel: 'MODEL-Z-88',
      orderNo: 'ORD-1737254400',
      quantity: 120,
      inspectionDate: '2026-01-18',
      status: 'Completed'
    }
  ];

  return (
    <div className="space-y-3 pb-20">
      {dummyData.map((item) => (
        <button
          key={item.id}
          onClick={() => navigate(`/material-feeding/detail/${item.id}`)}
          className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 text-left border border-gray-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{item.partName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono font-medium border border-blue-100">
                  {item.partCode}
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-xs text-gray-500">{item.partModel}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.status === 'Completed' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {item.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Quantity</p>
              <p className="font-bold text-gray-800 text-base">{item.quantity} <span className="text-xs font-normal text-gray-500">pcs</span></p>
            </div>
            <div className="text-right border-l border-gray-200 pl-4">
              <p className="text-gray-400 text-xs mb-0.5">Order No</p>
              <p className="font-semibold text-gray-700 font-mono text-xs">{item.orderNo}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>ID: {item.id}</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{item.inspectionDate}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function FormTab() {
  const scanInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    partName: '',         // Auto-focus scan
    partCode: '',         // Read-only
    partModelName: '',    // Read-only
    orderNo: '',          // Read-only
    productionDate: '',   // Read-only
    expireDate: '',       // Read-only
    inspectionDate: new Date().toISOString().split('T')[0], // Manual Input (Default today)
    quantity: '',         // Manual Input
    evidencePhoto: '',    // Read-only (fetched from stock in)
  });

  // Auto-focus on mount
  useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, []);

  const handleScan = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, partName: value }));

    // Simulation: If length > 5, populate dummy data
    if (value.length > 5) {
      // In real app, this would be an API call
      setFormData(prev => ({
        ...prev,
        partName: value,
        partCode: 'PC-' + Math.floor(Math.random() * 10000),
        partModelName: 'MODEL-X-' + Math.floor(Math.random() * 100),
        orderNo: 'ORD-' + Date.now(),
        productionDate: '2025-12-01',
        expireDate: '2026-12-01',
        evidencePhoto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' // Dummy Image
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    alert('Material Feeding saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4 pb-20">
      
      {/* SCAN INPUT - Focused */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <label className="flex items-center space-x-2 text-sm font-bold text-blue-800 mb-2">
          <QrCode className="w-4 h-4" />
          <span>Scan Part Name / QR</span>
        </label>
        <input
          ref={scanInputRef}
          type="text"
          value={formData.partName}
          onChange={handleScan}
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-mono text-lg"
          placeholder="Scan here..."
          autoComplete="off"
        />
        <p className="text-xs text-blue-600 mt-2 animate-pulse">
          Ready to scan...
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* READ ONLY FIELDS */}
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Part Code</label>
              <input
                type="text"
                value={formData.partCode}
                readOnly
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Model Name</label>
              <input
                type="text"
                value={formData.partModelName}
                readOnly
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Order No</label>
            <input
              type="text"
              value={formData.orderNo}
              readOnly
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Production Date</label>
              <input
                type="date"
                value={formData.productionDate}
                readOnly
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Expire Date</label>
              <input
                type="date"
                value={formData.expireDate}
                readOnly
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-dashed border-gray-200" />

      {/* MANUAL INPUTS */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Inspection Date</span>
          </label>
          <input
            type="date"
            value={formData.inspectionDate}
            onChange={(e) => setFormData({...formData, inspectionDate: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg font-bold"
            placeholder="0"
            required
          />
        </div>

        {/* PHOTO SECTION - Read Only from Stock In */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Evidence Photo (From Stock In)
          </label>
          
          <div className="relative">
            {formData.evidencePhoto ? (
              <div className="group relative rounded-xl overflow-hidden border-2 border-gray-200">
                <img 
                  src={formData.evidencePhoto} 
                  alt="Stock In Evidence" 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-medium">
                    Captured on: {formData.productionDate}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-sm">No photo available</span>
                <span className="text-xs mt-1">(Scan item to load photo)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Save Feeding Record
      </button>
    </form>
  );
}
