import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, User, CheckCircle, Printer, Camera } from 'lucide-react';

export default function AcceptanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data - in real app, fetch based on id
  const detailData = {
    id: id,
    partNumber: 'PN-12345',
    partName: 'Connector Assembly',
    quantity: 500,
    supplier: 'ABC Supplier',
    lotNumber: 'LOT-2026-001',
    date: '2026-01-19',
    time: '14:30',
    inspector: 'John Doe',
    status: 'Approved',
    inspectionResult: 'Pass',
    remarks: 'All items inspected and verified. Quality meets standards.',
    receivedBy: 'Jane Smith',
    location: 'Warehouse A - Rack 12'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 shadow-lg">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/acceptance-inspection')}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Inspection Details</h1>
            <p className="text-emerald-100 text-sm">{detailData.id}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Status Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Status</p>
              <h2 className="text-2xl font-bold">{detailData.status}</h2>
            </div>
            <CheckCircle className="w-12 h-12 text-white/80" />
          </div>
        </div>

        {/* Evidence Photo */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-bold text-gray-800 text-sm mb-3 px-2">Evidence Photo</h3>
          <div className="relative rounded-lg overflow-hidden border border-gray-100 shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
              alt="Evidence" 
              className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div className="flex items-center text-white space-x-2">
                <Camera className="w-4 h-4" />
                <span className="text-xs font-medium">Captured on {detailData.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-emerald-600" />
            Part Information
          </h3>
          <div className="space-y-3">
            <DetailRow label="Part Number" value={detailData.partNumber} />
            <DetailRow label="Part Name" value={detailData.partName} />
            <DetailRow label="Quantity" value={`${detailData.quantity} pcs`} />
            <DetailRow label="Lot Number" value={detailData.lotNumber} />
            <DetailRow label="Supplier" value={detailData.supplier} />
          </div>
        </div>

        {/* Inspection Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
            Inspection Details
          </h3>
          <div className="space-y-3">
            <DetailRow label="Inspection Result" value={detailData.inspectionResult} highlight />
            <DetailRow label="Inspector" value={detailData.inspector} />
            <DetailRow label="Received By" value={detailData.receivedBy} />
            <DetailRow label="Location" value={detailData.location} />
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
            Date & Time
          </h3>
          <div className="space-y-3">
            <DetailRow label="Date" value={detailData.date} />
            <DetailRow label="Time" value={detailData.time} />
          </div>
        </div>

        {/* Remarks */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-3">Remarks</h3>
          <p className="text-gray-600 leading-relaxed">{detailData.remarks}</p>
        </div>
      </div>

      {/* Print Button (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => window.print()}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Printer className="w-5 h-5" />
            <span>Print Label / Report</span>
          </button>
        </div>
      </div>
      
      {/* Spacer for fixed bottom button */}
      <div className="h-24"></div>
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-emerald-600' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
