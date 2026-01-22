import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AlertTriangle, Send, X, Image as ImageIcon, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { asynccreatedispute } from '../../store/actions/trackingActions';

const DisputeSection = ({ requestId, status, updatedAt }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (formData.images.length + files.length > 4) {
      return toast.error("You can only upload up to 4 images");
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
    
    e.target.value = '';
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!isVisible()) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reason) return toast.error("Please select a reason");

    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      submissionData.append('requestId', requestId);
      submissionData.append('reason', formData.reason);
      submissionData.append('message', formData.message);
      formData.images.forEach((file) => {
        submissionData.append('images', file);
      });

      console.log(submissionData);
      
      await dispatch(asynccreatedispute(submissionData));
      
      setIsOpen(false);
      setFormData({ reason: '', message: '', images: [] });
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

        {/* Image Upload Setion */}
        <div className="w-1/2">
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
            Attachments ({formData.images.length}/4)
          </label>
          
          <div className="grid grid-cols-4 gap-2">
            {formData.images.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {formData.images.length < 4 && (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-gray-400"
              >
                <Plus size={18} />
                <span className="text-[8px] font-bold mt-1">ADD</span>
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : (
            <>
              <Send size={14} /> 
              Submit Dispute
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DisputeSection;