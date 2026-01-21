import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Calendar, User, CheckCircle } from 'lucide-react';

export default function MaterialFeedingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data - in real app, fetch based on id
  const detailData = {
    id: id,
    partNumber: 'PN-12345',
    partName: 'Connector Assembly',
    quantity: 150,
    line: 'Line A',
    operator: 'Mike Johnson',
    workOrder: 'WO-2026-001',
    date: '2026-01-19',
    time: '10:15',
    status: 'Completed',
    lotNumber: 'LOT-2026-001',
    remarks: 'Material fed to production line successfully. All quality checks passed.',
    supervisor: 'David Lee',
    startTime: '10:00',
    endTime: '10:15'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/material-feeding')}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Feeding Details</h1>
            <p className="text-blue-100 text-sm">{detailData.id}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Status Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Status</p>
              <h2 className="text-2xl font-bold">{detailData.status}</h2>
            </div>
            <CheckCircle className="w-12 h-12 text-white/80" />
          </div>
        </div>

        {/* Material Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-blue-600" />
            Material Information
          </h3>
          <div className="space-y-3">
            <DetailRow label="Part Number" value={detailData.partNumber} />
            <DetailRow label="Part Name" value={detailData.partName} />
            <DetailRow label="Quantity" value={`${detailData.quantity} pcs`} />
            <DetailRow label="Lot Number" value={detailData.lotNumber} />
            <DetailRow label="Work Order" value={detailData.workOrder} />
          </div>
        </div>

        {/* Production Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            Production Details
          </h3>
          <div className="space-y-3">
            <DetailRow label="Production Line" value={detailData.line} highlight />
            <DetailRow label="Operator" value={detailData.operator} />
            <DetailRow label="Supervisor" value={detailData.supervisor} />
            <DetailRow label="Start Time" value={detailData.startTime} />
            <DetailRow label="End Time" value={detailData.endTime} />
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
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
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-blue-600' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
