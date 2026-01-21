import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AlertTriangle, Send, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { asynccreatedispute } from '../../store/actions/trackingActions';

const DisputeSection = ({ requestId, status, updatedAt }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    message: '',
    images: [] 
  });

  const isVisible = () => {
    if (status === 'collected') return true;
    if (status === 'completed' && updatedAt) {
      const completionTime = new Date(updatedAt).getTime();
      const fortyEightHoursInMs = 48 * 60 * 60 * 1000;
      return Date.now() - completionTime < fortyEightHoursInMs;
    }
    return false;
  };

  if (!isVisible()) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reason) return toast.error("Please select a reason");

    setIsSubmitting(true);
    try {
      const disputeData = {
        requestId,
        reason: formData.reason,
        message: formData.message,
        // images: formData.images
      };

      await dispatch(asynccreatedispute(disputeData));
      toast.success("Dispute raised successfully");
      setIsOpen(false);
    } catch {
      toast.error("Failed to raise dispute");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 border border-red-200 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
      >
        <AlertTriangle size={14} />
        Raise an Issue / Dispute
      </button>
    );
  }

  return (
    <div className="mt-3 p-4 border border-red-100 bg-white rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-500" />
          Create Dispute
        </h4>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Reason</label>
          <select
            required
            className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-red-500 outline-none"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          >
            <option value="">Select a reason</option>
            <option value="DAMAGED_BOOK">Damaged Book</option>
            <option value="WRONG_BOOK">Wrong Book</option>
            <option value="NOT_DELIVERED">Not Delivered</option>
            <option value="FAKE_CONDITION">Fake Condition</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Message (Optional)</label>
          <textarea
            className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-red-500 outline-none h-20 resize-none"
            placeholder="Describe your issue in detail..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : (
            <><Send size={14} /> Submit Dispute</>
          )}
        </button>
      </form>
    </div>
  );
};

export default DisputeSection;