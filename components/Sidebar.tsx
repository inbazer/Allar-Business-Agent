
import React from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sessions, currentSessionId, onNewChat, onSelectSession }) => {
  return (
    <div className="w-64 md:w-80 bg-white h-full flex flex-col border-r border-black/5 shadow-xl z-50">
      {/* Sidebar Header with Logo */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded-xl shadow-lg">
            <span className="text-xs text-white font-black tracking-tighter">AR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-widest text-black uppercase">ALLAR AI</span>
            <span className="text-[8px] font-bold text-gray-400 tracking-[0.2em] uppercase">Intelligence Console</span>
          </div>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#fcfcfc] border border-black/5 hover:border-[#D4AF37] hover:bg-white transition-all rounded-2xl text-[10px] font-bold uppercase tracking-widest text-black shadow-sm group"
        >
          <svg className="w-3 h-3 text-gray-400 group-hover:text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          New Strategy
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1">
        <div className="px-2 mb-4">
          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">Archives</span>
        </div>
        {sessions.length === 0 ? (
          <div className="px-4 py-8 text-center bg-[#fafafa] rounded-3xl border border-dashed border-black/5">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Awaiting Consultation</div>
          </div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] transition-all flex items-center gap-4 group ${
                currentSessionId === session.id 
                  ? 'bg-black text-white shadow-lg shadow-black/10' 
                  : 'text-gray-500 hover:bg-[#fafafa]'
              }`}
            >
              <div className={`w-1 h-1 rounded-full ${currentSessionId === session.id ? 'bg-[#D4AF37]' : 'bg-gray-200'}`}></div>
              <span className="truncate font-bold uppercase tracking-wider">{session.title}</span>
            </button>
          ))
        )}
      </div>

      {/* Trial Status Footer */}
      <div className="p-8 border-t border-black/5 bg-[#fafafa]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl border border-black/5 flex items-center justify-center text-[10px] font-black text-black bg-white shadow-sm">
            TRIAL
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-black">Free Trial</span>
            <span className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-bold italic">Upgrade for full API</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
