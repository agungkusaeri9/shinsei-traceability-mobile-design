import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Plus, Camera, X, Image as ImageIcon, QrCode, ScanLine } from 'lucide-react';

export default function AcceptanceInspectionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/menu')}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Acceptance Inspection</h1>
            <p className="text-emerald-100 text-sm">Stock In Management</p>
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
                ? 'text-emerald-600 border-b-2 border-emerald-600'
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
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        {activeTab === 'history' ? (
          <HistoryTab navigate={navigate} module="acceptance" />
        ) : (
          <FormTab />
        )}
      </div>
    </div>
  );
}

function HistoryTab({ navigate, module }) {
  const dummyData = [
    {
      id: 'AI-001',
      partNumber: 'PN-12345',
      partName: 'Connector Assembly',
      quantity: 500,
      supplier: 'ABC Supplier',
      date: '2026-01-19',
      status: 'Approved'
    },
    {
      id: 'AI-002',
      partNumber: 'PN-67890',
      partName: 'PCB Board',
      quantity: 200,
      supplier: 'XYZ Electronics',
      date: '2026-01-18',
      status: 'Pending'
    },
    {
      id: 'AI-003',
      partNumber: 'PN-11223',
      partName: 'Cable Harness',
      quantity: 300,
      supplier: 'DEF Components',
      date: '2026-01-17',
      status: 'Approved'
    }
  ];

  return (
    <div className="space-y-3 pb-20">
      {dummyData.map((item) => (
        <button
          key={item.id}
          onClick={() => navigate(`/${module}-inspection/detail/${item.id}`)}
          className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 text-left"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{item.partName}</h3>
              <p className="text-sm text-gray-500">{item.partNumber}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.status === 'Approved' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {item.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Quantity</p>
              <p className="font-semibold text-gray-800">{item.quantity} pcs</p>
            </div>
            <div>
              <p className="text-gray-500">Supplier</p>
              <p className="font-semibold text-gray-800">{item.supplier}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">ID: {item.id} • {item.date}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function FormTab() {
  const [formData, setFormData] = useState({
    customerCode: '',
    customerName: '',
    nameCode: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    qrData: ''
  });

  const handleQrScan = () => {
    setShowQrModal(true);
  };

  const [activeSelect, setActiveSelect] = useState(null);
  
  // Camera State
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);

  // QR Modal State
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCapturePhoto = () => {
    // Simulation of photo capture using a placeholder image
    setPhoto('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop');
    setShowCamera(false);
  };

  const customers = [
    { code: 'CUST-001', name: 'PT. Astra Honda Motor' },
    { code: 'CUST-002', name: 'PT. Yamaha Indonesia' },
    { code: 'CUST-003', name: 'PT. Suzuki Indomobil' }
  ];

  const names = [
    { code: 'SUP-001', name: 'Supplier Jaya Abadi' },
    { code: 'SUP-002', name: 'Mitra Komponen Tech' },
    { code: 'SUP-003', name: 'Global Part Solutions' }
  ];

  const parts = [
    { code: 'PART-A1', name: 'Connector Housing 2P' },
    { code: 'PART-B2', name: 'Terminal Male Gold' },
    { code: 'PART-C3', name: 'Seal Waterproof' }
  ];

  const handleSelect = (field, item) => {
    if (field === 'customer') {
      setFormData(prev => ({ ...prev, customerCode: item.code, customerName: item.name }));
    } else if (field === 'name') {
      setFormData(prev => ({ ...prev, nameCode: item.code, name: item.name }));
    } else if (field === 'part') {
      setFormData(prev => ({ ...prev, partCode: item.code, partName: item.name }));
    }
    setActiveSelect(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Stock In recorded successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5 relative pb-24">
      
      {/* Customer Selection */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Customer</label>
        <div 
          onClick={() => setActiveSelect(activeSelect === 'customer' ? null : 'customer')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <span className={formData.customerName ? 'text-gray-800 font-medium' : 'text-gray-400'}>
            {formData.customerName ? `${formData.customerCode} - ${formData.customerName}` : 'Select Customer'}
          </span>
          <span className="text-gray-400">▼</span>
        </div>
        
        {activeSelect === 'customer' && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto">
            {customers.map((item) => (
              <div 
                key={item.code}
                onClick={() => handleSelect('customer', item)}
                className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="font-bold text-gray-800">{item.code}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Name Selection (Supplier/Vendor) */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Name / Supplier</label>
        <div 
          onClick={() => setActiveSelect(activeSelect === 'name' ? null : 'name')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <span className={formData.name ? 'text-gray-800 font-medium' : 'text-gray-400'}>
            {formData.name ? `${formData.nameCode} - ${formData.name}` : 'Select Name'}
          </span>
          <span className="text-gray-400">▼</span>
        </div>

        {activeSelect === 'name' && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto">
            {names.map((item) => (
              <div 
                key={item.code}
                onClick={() => handleSelect('name', item)}
                className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="font-bold text-gray-800">{item.code}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional QR Scan */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <QrCode className="w-4 h-4 mr-2 text-slate-500" />
          Product QR <span className="text-slate-400 font-normal ml-1">(From Supplier)</span>
        </label>
        
        {!formData.qrData ? (
          <button
            type="button"
            onClick={handleQrScan}
            className="w-full py-3 bg-white border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center space-x-2"
          >
            <ScanLine className="w-5 h-5" />
            <span>Scan QR Code</span>
          </button>
        ) : (
          <div className="bg-white border border-emerald-200 rounded-xl p-3 shadow-sm">
             <div className="flex items-start justify-between">
                <div>
                   <p className="text-xs text-emerald-600 font-bold mb-1">Scanned Successfully</p>
                   <p className="font-mono text-xs text-gray-700 break-all bg-gray-50 p-2 rounded border border-gray-100 mt-1">{formData.qrData}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, qrData: '' }))}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Part Selection */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Part Name</label>
        <div 
          onClick={() => setActiveSelect(activeSelect === 'part' ? null : 'part')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <span className={formData.partName ? 'text-gray-800 font-medium' : 'text-gray-400'}>
            {formData.partName ? `${formData.partCode} - ${formData.partName}` : 'Select Part'}
          </span>
          <span className="text-gray-400">▼</span>
        </div>

        {activeSelect === 'part' && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto">
            {parts.map((item) => (
              <div 
                key={item.code}
                onClick={() => handleSelect('part', item)}
                className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="font-bold text-gray-800">{item.code}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
          required
        />
      </div>

      {/* Quantity Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (Today)</label>
        <div className="relative">
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-lg font-bold"
            placeholder="0"
            required
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">pcs</span>
        </div>
      </div>

      {/* PHOTO SECTION */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Evidence Photo
        </label>
        
        {!photo ? (
          <button
            type="button"
            onClick={() => setShowCamera(true)}
            className="w-full py-6 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
          >
            <Camera className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Tap to take photo</span>
          </button>
        ) : (
          <div className="relative">
            <img 
              src={photo} 
              alt="Evidence" 
              className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => setPhoto(null)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 mt-4"
      >
        Submit Stock In
      </button>

      {/* CAMERA MODAL */}
      {showCamera && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
            {/* Fake Camera Viewfinder */}
            <div className="w-full h-full absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center text-gray-600">
              <Camera className="w-20 h-20 opacity-20" />
            </div>
            
            <div className="relative z-10 w-full px-4">
              <div className="aspect-[3/4] border-2 border-white/50 rounded-lg mx-auto max-w-sm"></div>
              <p className="text-white text-center mt-4 text-sm">Align part in frame</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowCamera(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Camera Controls */}
          <div className="bg-black p-6 pb-12">
            <div className="flex items-center justify-between max-w-sm mx-auto">
              <button type="button" className="p-4 rounded-full bg-gray-800 text-white">
                <ImageIcon className="w-6 h-6" />
              </button>
              
              <button
                type="button"
                onClick={handleCapturePhoto}
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Capture Photo"
              >
                <div className="w-12 h-12 bg-white rounded-full"></div>
              </button>

              <div className="w-14"></div> {/* Spacer */}
            </div>
          </div>
        </div>
      )}
      {/* QR SCAN MODAL */}
      {showQrModal && (
        <QrScanModal 
          onClose={() => setShowQrModal(false)}
          onScan={(data) => {
            setFormData(prev => ({ 
              ...prev, 
              qrData: data,
              // Auto-fill simulation
              partCode: 'PART-A1', 
              partName: 'Connector Housing 2P'
            }));
            setShowQrModal(false);
          }}
        />
      )}
    </form>
  );
}

function QrScanModal({ onClose, onScan }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        onScan(inputValue);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-emerald-600" />
            Scan Product QR
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
              <ScanLine className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Point your scanner or type manually.<br/>Press <kbd className="font-mono bg-gray-100 px-1 rounded">Enter</kbd> to confirm.
            </p>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 border-2 border-emerald-500 rounded-xl focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-mono text-center text-lg"
            placeholder="Scanning..."
          />

          {inputValue && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
              <p className="text-xs text-gray-400 mb-1">Result Preview:</p>
              <p className="text-sm font-mono text-gray-800 break-all">{inputValue}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
