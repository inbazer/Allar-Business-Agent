
import React, { useState } from 'react';

interface AuthModalProps {
  onSuccess: (name: string, email: string) => void;
  onGoogleLogin: () => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onSuccess, onGoogleLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onSuccess(name, email);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 backdrop-blur-2xl">
      <div className="w-full max-w-sm bg-white p-12 rounded-[48px] border border-black/5 text-center shadow-2xl">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-3">
          <span className="text-xl text-white font-black tracking-tighter">AR</span>
        </div>
        
        <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Access Portal</h2>
        <p className="text-gray-400 text-[10px] mb-10 font-bold uppercase tracking-[0.2em]">Secure Enterprise Verification</p>

        <div className="space-y-4">
          <button 
            onClick={onGoogleLogin}
            className="w-full py-5 border border-black/5 bg-[#fafafa] hover:bg-white hover:shadow-lg transition-all rounded-2xl flex items-center justify-center gap-3 text-[10px] font-extrabold tracking-widest"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083L43.611,20.083L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C40.483,35.58,44,30.357,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
            CONTINUE WITH GOOGLE
          </button>

          <div className="flex items-center gap-4 py-4">
            <div className="h-[1px] flex-1 bg-black/5"></div>
            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">OR</span>
            <div className="h-[1px] flex-1 bg-black/5"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#fafafa] border border-black/5 rounded-2xl px-6 py-5 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold"
            />
            <input 
              type="email" 
              placeholder="Work Email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#fafafa] border border-black/5 rounded-2xl px-6 py-5 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold"
            />
            <button 
              type="submit"
              className="w-full py-5 bg-black text-white font-extrabold rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#D4AF37] transition-all"
            >
              LAUNCH INTERFACE
            </button>
          </form>
        </div>
        
        <button onClick={onClose} className="mt-8 text-[9px] text-gray-400 uppercase tracking-widest hover:text-black font-bold transition-colors">
          DISMISS ACCESS
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
