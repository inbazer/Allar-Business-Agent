
import React, { useState } from 'react';

interface ProfileSettingsProps {
  user: { name: string; email: string; avatarSize?: number };
  onClose: () => void;
  onUpdate: (data: { name: string; email: string; avatarSize: number }) => void;
  onLogout: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onClose, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatarSize: user.avatarSize || 40
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl">
      <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-black/5 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-black tracking-tight">Profile</h2>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 block font-bold">Identity</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#fafafa] border border-black/5 rounded-2xl px-5 py-4 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 block font-bold">Interface (Avatar Size)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="32" 
                max="64"
                value={formData.avatarSize}
                onChange={e => setFormData({ ...formData, avatarSize: parseInt(e.target.value) })}
                className="flex-1 accent-black"
              />
              <span className="text-xs font-bold w-10">{formData.avatarSize}px</span>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <button 
            onClick={() => onUpdate(formData)}
            className="w-full py-5 bg-black text-white font-extrabold rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all"
          >
            UPDATE PROFILE
          </button>
          <button 
            onClick={onLogout}
            className="w-full py-5 text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-red-50 transition-all rounded-2xl"
          >
            TERMINATE SESSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
