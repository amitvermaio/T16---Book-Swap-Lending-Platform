export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const getDaysRemaining = (dueDateString) => {
  if (!dueDateString) return null;
  const today = new Date();
  const due = new Date(dueDateString);
  const diffTime = due - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getStatusStyle = (status) => {
  switch (status) {
    case 'OPEN': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'RESOLVED': return 'bg-green-100 text-green-700 border-green-200';
    case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};