import { Send, User } from 'lucide-react';

const EmailCompose = ({ recipientEmail }) => {
  return (
    <div className="w-[16rem] h-[18rem] bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden">
      {/* Header: Showing who the email is for */}
      <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
        <div className="bg-indigo-100 p-1.5 rounded-md">
          <User size={14} className="text-indigo-600" />
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Recipient</p>
          <p className="text-xs text-gray-700 font-semibold truncate">{recipientEmail || 'no-email@selected.com'}</p>
        </div>
      </div>

      {/* Body: Writing Area */}
      <div className="flex-1 p-3">
        <textarea 
          placeholder="Type your message here..."
          className="w-full h-full text-sm text-gray-600 resize-none outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Footer: Send Action */}
      <footer className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button 
          type="button"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm active:scale-95"
          onClick={() => {
            // You can handle your sending logic here
            console.log("Request to send email to:", recipientEmail);
          }}
        >
          <span>Send</span>
          <Send size={14} />
        </button>
      </footer>
    </div>
  );
};

export default EmailCompose;