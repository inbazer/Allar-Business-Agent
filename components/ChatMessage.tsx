
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  userInitial?: string;
}

const ChatMessage: React.FC<ChatMessageProps & { userInitial?: string }> = ({ message, userInitial = 'U' }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`py-12 w-full border-b border-black/[0.02] ${isAssistant ? 'bg-[#fafafa]/50' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto px-8 md:px-0 flex gap-8 md:gap-12 items-start">
        <div className="flex-shrink-0 pt-1">
          {isAssistant ? (
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
               <span className="text-[10px] text-white font-black tracking-tighter">AR</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-[#f0f0f0] border border-black/5 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm uppercase">
               {userInitial}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isAssistant ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
              {isAssistant ? 'ALLAR ENGINE V3' : 'QUERY'}
            </span>
            {isAssistant && (
              <span className="px-2 py-0.5 rounded-full bg-black text-[8px] text-white font-bold tracking-widest">LIVE</span>
            )}
          </div>
          <div className={`text-black text-[15px] leading-[1.8] font-medium selection:bg-gold-light whitespace-pre-wrap break-words`}>
            {message.content || (
              <div className="flex gap-2 items-center py-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
