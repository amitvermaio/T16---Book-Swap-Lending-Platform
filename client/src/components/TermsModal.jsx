import React, { useEffect } from 'react';
import { X, ShieldAlert, Scale, FileText, Ban, AlertTriangle } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white shadow-2xl border border-neutral-200 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-orange-600" />
            <div>
              <h2 className="text-lg font-bold tracking-tight text-neutral-900">Terms of Service Protocol</h2>
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Legal Document REF-2025-TC</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-neutral-200 text-neutral-500 hover:text-orange-600 transition-colors rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar text-neutral-700">
          
          {/* Intro */}
          <div className="border-l-4 border-orange-600 pl-6 py-1">
            <p className="text-sm font-mono text-neutral-500 mb-2">LAST UPDATED: DECEMBER 2025</p>
            <p className="leading-relaxed">
              By accessing the ReaderHaven platform ("Protocol"), you agree to be bound by these terms. 
              This is a binding legal agreement governing the peer-to-peer exchange of physical assets.
            </p>
          </div>

          {/* Section 1: Asset Integrity */}
          <section>
            <h3 className="flex items-center gap-2 text-neutral-900 font-bold mb-4">
              <span className="font-mono text-orange-600">01.</span> ASSET INTEGRITY & LENDING
            </h3>
            <p className="text-sm leading-7 mb-4">
              The Protocol acts as an intermediary interface. We do not own the inventory. By listing an item, you certify ownership. By borrowing, you accept full liability for the asset's condition during the <span className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-black text-xs">LEASE_DURATION</span>.
            </p>
          </section>

          {/* Section 2: NON-RETURN POLICY (Specific Request) */}
          <section className="bg-orange-50/50 p-6 border border-orange-100 rounded-lg">
            <h3 className="flex items-center gap-2 text-red-600 font-bold mb-4">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-mono text-black">02.</span> NON-RETURN & THEFT PROTOCOLS
            </h3>
            <div className="space-y-4 text-sm text-neutral-800">
              <p>
                <strong>2.1 Late Returns:</strong> Failure to return an asset by the agreed timestamp results in an immediate <span className="font-bold">Reputation Score penalty (-50 pts)</span>. Accounts with a score below threshold are restricted from borrowing.
              </p>
              <p>
                <strong>2.2 Permanent Loss / Theft:</strong> If an asset is not returned within 14 days of the due date, the transaction is flagged as <span className="font-mono text-red-600">STATUS_THEFT</span>.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>The Borrower's account is <strong>permanently frozen</strong>.</li>
                <li>ReaderHaven reserves the right to release transaction logs (IP, Chat History, Geo-data) to local authorities upon submission of a formal police report by the Lender.</li>
                <li>The Borrower is liable for the replacement cost of the asset at current market value.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: DEACTIVATION (Specific Request) */}
          <section>
            <h3 className="flex items-center gap-2 text-neutral-900 font-bold mb-4">
              <Ban className="w-5 h-5 text-neutral-400" />
              <span className="font-mono text-orange-600">03.</span> TERMINATION & DEACTIVATION
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 p-4">
                <h4 className="font-bold text-sm mb-2">Voluntary Deactivation</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Users may deactivate their account at any time provided there are no active <span className="font-mono">OPEN_TRANSACTIONS</span>. All active listings will be delisted. Lending history is retained for audit purposes for 12 months.
                </p>
              </div>
              <div className="border border-neutral-200 p-4">
                <h4 className="font-bold text-sm mb-2">Involuntary Termination</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  ReaderHaven reserves the right to terminate access immediately without notice for:
                  <br/>1. Violation of Non-Return Policy.
                  <br/>2. Harassment via Async Messaging.
                  <br/>3. Uploading prohibited content to ImageKit.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Disputes */}
          <section>
             <h3 className="flex items-center gap-2 text-neutral-900 font-bold mb-4">
              <AlertTriangle className="w-5 h-5 text-neutral-400" />
              <span className="font-mono text-orange-600">04.</span> DISPUTE RESOLUTION
            </h3>
            <p className="text-sm leading-7">
              In the event of a condition dispute (e.g., Book returned damaged), users must submit photo evidence within 24 hours of exchange. The "Trust Verification" algorithm acts as the initial arbitrator. Persistent disputes are subject to manual administrative review.
            </p>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-neutral-200 p-6 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-xs text-neutral-400 font-mono">
             By clicking "I Acknowledge", you digitally sign this hash.
           </p>
           <div className="flex gap-4 w-full sm:w-auto">
             <button 
               onClick={onClose}
               className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold border border-neutral-300 hover:bg-neutral-50 transition-colors"
             >
               DECLINE
             </button>
             <button 
               onClick={onClose}
               className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold bg-neutral-900 text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
             >
               <FileText className="w-4 h-4" />
               I ACKNOWLEDGE
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TermsModal;