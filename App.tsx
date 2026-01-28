
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession, Message } from './types';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import ProfileSettings from './components/ProfileSettings';
import { gemini } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string; avatarSize: number } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, scrollToBottom]);

  const handleLogin = (name: string, email: string) => {
    setUser({ name, email, avatarSize: 40 });
    setShowAuth(false);
  };

  const handleGoogleLogin = () => {
    setUser({ name: "Google User", email: "user@google.com", avatarSize: 40 });
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowSettings(false);
    setSessions([]);
    setCurrentSessionId(null);
  };

  const handleNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'STRATEGIC BRIEF',
      messages: [],
      createdAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    let targetSessionId = currentSessionId;
    if (!targetSessionId) {
      const newSession: ChatSession = {
        id: uuidv4(),
        title: inputText.slice(0, 20).toUpperCase(),
        messages: [],
        createdAt: Date.now(),
      };
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      targetSessionId = newSession.id;
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: inputText,
      timestamp: Date.now(),
    };

    const assistantPlaceholder: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: '',
      timestamp: Date.now() + 1,
    };

    setSessions(prev => prev.map(s => 
      s.id === targetSessionId 
        ? { 
            ...s, 
            messages: [...s.messages, userMessage, assistantPlaceholder],
            title: s.messages.length === 0 ? inputText.slice(0, 20).toUpperCase() : s.title 
          } 
        : s
    ));

    const prompt = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const history = currentSession?.messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: m.content
      })) || [];

      const stream = gemini.streamChat(history, prompt);
      let fullContent = '';

      for await (const chunk of stream) {
        fullContent += chunk;
        setSessions(prev => prev.map(s => 
          s.id === targetSessionId 
            ? {
                ...s,
                messages: s.messages.map(m => 
                  m.id === assistantPlaceholder.id 
                    ? { ...m, content: fullContent } 
                    : m
                )
              }
            : s
        ));
      }
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <>
        <LandingPage onLogin={() => setShowAuth(true)} onGoogleLogin={handleGoogleLogin} />
        {showAuth && <AuthModal onSuccess={handleLogin} onGoogleLogin={handleGoogleLogin} onClose={() => setShowAuth(false)} />}
      </>
    );
  }

  return (
    <div className="flex h-screen w-full bg-white text-black overflow-hidden font-jakarta">
      {showSettings && (
        <ProfileSettings 
          user={user} 
          onClose={() => setShowSettings(false)} 
          onUpdate={(data) => setUser({ ...user, ...data })} 
          onLogout={handleLogout} 
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          sessions={sessions} 
          currentSessionId={currentSessionId} 
          onNewChat={handleNewChat}
          onSelectSession={setCurrentSessionId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative h-full bg-white">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-black/5 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <div className="md:hidden w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-[8px] text-white font-black">AR</span>
             </div>
             <span className="text-xs font-bold tracking-[0.2em] text-black uppercase">
               {currentSession ? currentSession.title : 'DASHBOARD'}
             </span>
          </div>
          <div className="flex items-center gap-6">
             <span className="hidden sm:inline text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">{user.name}</span>
             <button 
                onClick={() => setShowSettings(true)}
                style={{ width: user.avatarSize, height: user.avatarSize }}
                className="rounded-full bg-[#f0f0f0] border border-black/5 flex items-center justify-center text-black font-extrabold text-[10px] shadow-sm hover:border-[#D4AF37] transition-all"
             >
                {user.name[0].toUpperCase()}
             </button>
             <button onClick={handleNewChat} className="md:hidden p-3 rounded-2xl bg-[#fafafa] hover:bg-black hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
             </button>
          </div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto pb-48 scroll-smooth">
          {!currentSession || currentSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="max-w-xl space-y-8">
                 <div className="w-20 h-20 bg-black rounded-[30px] flex items-center justify-center mx-auto shadow-2xl rotate-3">
                   <span className="text-2xl text-white font-black tracking-tighter">AR</span>
                 </div>
                 <div className="space-y-4">
                   <h2 className="text-5xl font-extrabold text-black tracking-tighter leading-tight">
                      Awaiting your <br/><span className="gold-text">Strategic Directives.</span>
                   </h2>
                   <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
                      Systems Nominal • Trial Protocol Active
                   </p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 text-left">
                    {[
                      { t: "MARKET ALPHA", p: "Analyze competitor GTM strategy for 2025." },
                      { t: "VENTURE BRIDGE", p: "Structure a Series A pitch deck framework." },
                    ].map((btn, i) => (
                      <button 
                        key={i}
                        onClick={() => setInputText(btn.p)}
                        className="p-8 rounded-[32px] bg-[#fafafa] hover:bg-white hover:shadow-2xl hover:border-[#D4AF37] transition-all border border-black/5 group"
                      >
                        <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#D4AF37] mb-3">{btn.t}</span>
                        <span className="block text-[13px] text-gray-600 font-bold leading-snug">{btn.p}</span>
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          ) : (
            currentSession.messages.map(m => (
              <ChatMessage key={m.id} message={m} userInitial={user.name[0]} />
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-20 pb-10 px-6">
          <div className="max-w-3xl mx-auto">
            <form 
              onSubmit={handleSendMessage}
              className="relative flex items-end gap-3 bg-[#fafafa] border border-black/5 rounded-[32px] p-3 pr-5 shadow-sm focus-within:shadow-2xl focus-within:border-black/10 transition-all group"
            >
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Issue strategic request..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-40 py-4 px-6 text-black text-sm md:text-base font-medium placeholder-gray-400"
                rows={1}
              />
              <div className="flex items-center pb-2">
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className={`p-4 rounded-2xl transition-all ${
                    inputText.trim() && !isLoading
                      ? 'bg-black text-white shadow-xl hover:scale-105'
                      : 'bg-[#f0f0f0] text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="flex justify-center items-center gap-4 mt-4">
               <span className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.3em]">Encrypted Session</span>
               <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
