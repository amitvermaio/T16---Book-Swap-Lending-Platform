import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import { 
  Server, 
  Database, 
  ShieldAlert, 
  Cpu, 
  GitCommit, 
  Terminal, 
  ArrowUpRight,
  Layers,
  Box
} from 'lucide-react';

import TermsModal from "../components/TermsModal";

const About = () => {

  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto py-10 bg-white text-neutral-900 font-sans selection:bg-orange-100 selection:text-orange-900">        
        <section className="mb-24 border-b border-neutral-200 pb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                  System Architecture v1.0.2
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-poppins tracking-tighter text-black mb-6">
                Reader<span className="text-orange-600">Haven</span><span className="text-lg align-top text-neutral-400 font-normal ml-2">©</span>
              </h1>
            </div>
            <div className="mb-2">
               <p className="font-mono text-xs text-neutral-400 text-right">
                 /src/documentation/about.md
               </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-xl md:text-2xl text-neutral-800 leading-relaxed font-light">
                ReaderHaven is a <span className="font-medium underline decoration-orange-500 underline-offset-4">decentralized inventory sharing protocol</span> designed to optimize the circulation of physical literary assets. 
              </p>
              <p className="mt-6 text-neutral-600 leading-relaxed max-w-2xl">
                Traditional models of book ownership create static silos of knowledge. We engineer a dynamic, peer-to-peer lending infrastructure that reduces economic friction and maximizes the utility of existing physical copies within a hyper-local network.
              </p>
            </div>

            {/* SIDEBAR: UPDATED TECH STACK */}
            <div className="font-mono text-xs text-neutral-500 border-l border-orange-500 pl-6 h-fit">
              <p className="mb-4">
                <span className="text-orange-600 font-bold">&gt;</span> Current Status: <span className="text-black">Operational</span>
              </p>
              
              <div className="mb-4">
                <p className="mb-2">
                  <span className="text-orange-600 font-bold">&gt;</span> Technical Stack:
                </p>
                <ul className="space-y-2 pl-2 border-l border-neutral-200 ml-1">
                  <li>
                    <span className="text-black font-bold">Frontend:</span> <br/>
                    React, TailwindCSS, Redux-Toolkit
                  </li>
                  <li>
                    <span className="text-black font-bold">Backend:</span> <br/>
                    Node.js, Express.js, Socket.io, JWT
                  </li>
                  <li>
                    <span className="text-black font-bold">Infrastructure:</span> <br/>
                    MongoDB, ImageKit
                  </li>
                </ul>
              </div>

              <p>
                <span className="text-orange-600 font-bold">&gt;</span> License: <span className="text-black">MIT Open Source</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <Layers className="w-6 h-6 text-orange-600" />
              Core Modules & Capabilities
            </h2>
            <div className="h-px bg-neutral-200 flex-grow ml-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Module 1 */}
            <div className="group border border-neutral-200 hover:border-orange-600 transition-colors duration-300 p-8 bg-white">
              <Database className="w-8 h-8 text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors" />
              <h3 className="text-lg font-bold mb-3 font-mono">01. Inventory Indexing</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Utilizes a non-relational database structure to catalog user assets with metadata granularity (ISBN, edition, condition metrics).
              </p>
            </div>

            {/* Module 2 */}
            <div className="group border border-neutral-200 hover:border-orange-600 transition-colors duration-300 p-8 bg-white">
              <GitCommit className="w-8 h-8 text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors" />
              <h3 className="text-lg font-bold mb-3 font-mono">02. P2P Handshake</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                A secure negotiation protocol that facilitates the exchange agreement. Includes state management for lifecycle hooks.
              </p>
            </div>

            {/* Module 3 */}
            <div className="group border border-neutral-200 hover:border-orange-600 transition-colors duration-300 p-8 bg-white">
              <ShieldAlert className="w-8 h-8 text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors" />
              <h3 className="text-lg font-bold mb-3 font-mono">03. Trust Verification</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Implements a reputation scoring algorithm based on transaction history and user feedback to ensure accountability.
              </p>
            </div>

            {/* Module 4 */}
            <div className="group border border-neutral-200 hover:border-orange-600 transition-colors duration-300 p-8 bg-white">
              <Cpu className="w-8 h-8 text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors" />
              <h3 className="text-lg font-bold mb-3 font-mono">04. Algorithmic Discovery</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Uses geospatial querying to prioritize results within a walkable radius, reducing carbon footprint and logistical complexity.
              </p>
            </div>

             {/* Module 5 */}
             <div className="group border border-neutral-200 hover:border-orange-600 transition-colors duration-300 p-8 bg-white">
              <Server className="w-8 h-8 text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors" />
              <h3 className="text-lg font-bold mb-3 font-mono">05. Async Messaging</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Built-in low-latency chat infrastructure powered by Socket.io, allowing users to coordinate meetups privately.
              </p>
            </div>

             {/* Module 6 */}
             <div className="group border border-neutral-200 hover:border-orange-600 transition-colors duration-300 p-8 bg-white">
              <Box className="w-8 h-8 text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors" />
              <h3 className="text-lg font-bold mb-3 font-mono">06. Asset Recovery</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Automated notification pipelines trigger reminders for due dates, ensuring high turnover rates.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 py-16 border-t border-b border-neutral-100 bg-neutral-50 -mx-6 lg:-mx-12 px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row gap-16 max-w-7xl mx-auto">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Operational Logic
              </h2>
              <p className="text-neutral-600 mb-8">
                The platform follows a strict state-machine logic to ensure transaction integrity. From initialization to closure, every step is logged and verified.
              </p>
              <Link to={'#'} className="group flex items-center gap-2 text-sm font-mono font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700">
                View Source Code <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="md:w-2/3">
              <div className="border-l-2 border-neutral-300 pl-8 space-y-12">
                
                {/* Step 1 */}
                <div className="relative">
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-black"></span>
                  <h4 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <span className="text-orange-600 font-mono">01.</span> INIT_REQUEST
                  </h4>
                  {/* Fixed Error Here: Replaced > with &gt; */}
                  <p className="text-neutral-600 text-sm">
                    Borrower initiates a `GET` request for a specific asset. The system validates borrower eligibility (reputation score &gt; threshold).
                  </p>
                </div>


                <div className="relative">
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-neutral-400"></span>
                  <h4 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <span className="text-orange-600 font-mono">02.</span> HANDSHAKE_PENDING
                  </h4>
                  <p className="text-neutral-600 text-sm">
                    Owner receives payload. Communication channel opens. Logistics are negotiated off-chain (physical meetup) but confirmed on-chain.
                  </p>
                </div>


                <div className="relative">
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-neutral-400"></span>
                  <h4 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <span className="text-orange-600 font-mono">03.</span> EXECUTE_TRANSFER
                  </h4>
                  <p className="text-neutral-600 text-sm">
                    QR code or manual confirmation triggers state change to `LENT`. Inventory is locked from other users. Countdown timer begins.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        <footer className="pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-neutral-900 pt-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Terminal className="w-5 h-5 text-orange-600" />
              <span className="font-mono text-sm font-bold tracking-tight text-black">
                READERHAVEN_SYSTEMS
              </span>
            </div>
            
            <div className="flex gap-8 text-xs font-mono text-neutral-500 uppercase">
              <button 
                onClick={() => setIsTermsOpen(true)} 
                className="hover:text-orange-600 transition-colors focus:outline-none"
              >
                Terms & Protocols
              </button>
              <a href="#" className="hover:text-orange-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-orange-600 transition-colors">API Status</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Privacy Protocol</a>
            </div>
          </div>
          <p className="mt-8 text-neutral-400 text-[10px] font-mono">
            COPYRIGHT © 2025 VERMA INC. ALL RIGHTS RESERVED. DEPLOYED ON MAINNET.
          </p>
        </footer>

      </main>
      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
    </div>
  );
};

export default About;