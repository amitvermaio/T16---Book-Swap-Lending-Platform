import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const StatusBadge = ({ isOverdue, daysLeft, status }) => {
  if (status === 'collected') {
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
        <CheckCircle size={10} /> Collected
      </span>
    );
  }
  if (isOverdue && status === 'approved') {
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-100">
        <AlertTriangle size={10} /> Overdue by {Math.abs(daysLeft)} days
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-green-100">
      <Clock size={10} /> Active
    </span>
  );
};

export default StatusBadge;