
import React, { useEffect, useState } from 'react';

interface LandingPageProps {
  onLogin: () => void;
  onGoogleLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onGoogleLogin }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white selection:bg-gold-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full h-20 flex items-center justify-between px-8 md:px-20 z-[60] glass-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-lg rotate-3 shadow-lg">
            <span className="text-[10px] text-white font-bold tracking-tighter">AR</span>
          </div>
          <span className="text-sm font-extrabold tracking-[0.2em] text-black">ALLAR AI</span>
        </div>
        <div className="flex items-center gap-10">
          <button onClick={onLogin} className="text-xs font-bold tracking-widest hover:text-[#D4AF37] transition-colors">LOGIN</button>
          <button onClick={onGoogleLogin} className="px-8 py-3 bg-black text-white text-[10px] font-bold rounded-full hover:bg-[#D4AF37] transition-all uppercase tracking-[0.2em]">
            GET STARTED
          </button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Globe Background (SVG) */}
        <div className="globe-container flex items-center justify-center">
           <svg width="800" height="800" viewBox="0 0 100 100" className="animate-[spin_60s_linear_infinite]" 
                style={{ transform: `translate(${(mousePos.x - window.innerWidth/2)/50}px, ${(mousePos.y - window.innerHeight/2)/50}px)` }}>
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.2" />
              {[...Array(12)].map((_, i) => (
                <ellipse key={i} cx="50" cy="50" rx="48" ry={i * 8} fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="0.1" />
              ))}
              {[...Array(12)].map((_, i) => (
                <ellipse key={i} cx="50" cy="50" rx={i * 8} ry="48" fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="0.1" />
              ))}
           </svg>
        </div>

        <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto">
          <div className="inline-block px-5 py-2 rounded-full bg-[#f9f9f9] border border-black/5 text-[10px] font-bold tracking-[0.3em] text-black uppercase animate-fade-in">
            Architecting the Future of Enterprise
          </div>

          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.85] text-black">
            Intelligence <br/>
            <span className="gold-text">Redefined.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            The world's most elegant AI consultant for high-stakes business strategy. 
            Calm, calculated, and uncompromisingly effective.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5 pt-8">
            <button 
              onClick={onGoogleLogin}
              className="flex items-center gap-3 px-10 py-5 bg-black text-white font-bold rounded-2xl hover:scale-105 transition-all w-full md:w-auto shadow-2xl"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083L43.611,20.083L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C40.483,35.58,44,30.357,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
              CONTINUE WITH GOOGLE
            </button>
            <button className="px-10 py-5 border border-black/10 rounded-2xl font-bold text-black hover:bg-black hover:text-white transition-all w-full md:w-auto">
              EXPLORE PLATFORM
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Section 2: AI Business Core */}
      <section className="py-32 px-8 md:px-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">01 / Strategic Core</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-black leading-tight">Beyond a Chatbot. <br/>A Boardroom Ally.</h2>
            </div>
            <p className="max-w-md text-gray-500 font-light text-lg">
              We specialize in complex decision matrices, fundraising architectures, and disruptive market positioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Venture Velocity", desc: "Automated analysis of investment terms and pitch resonance." },
              { title: "Market Sentinel", desc: "Live tracking of global trends across 50+ business sectors." },
              { title: "Cognitive Alpha", desc: "AI models trained on decades of successful enterprise pivots." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm border border-black/5 hover:border-[#D4AF37] transition-all group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] transition-colors">
                  <span className="text-xl font-bold">{i+1}</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Global Reach */}
      <section className="py-40 px-8 md:px-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
             <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">02 / Ecosystem</span>
             <h2 className="text-5xl md:text-7xl font-extrabold text-black">Global <br/><span className="gold-text">Context</span></h2>
             <p className="text-xl text-gray-600 font-light leading-relaxed">
               Our models operate with real-time global connectivity, ensuring your business decisions aren't made in a vacuum. 
               We integrate economic indicators, news sentiment, and supply chain data.
             </p>
             <div className="pt-4 grid grid-cols-2 gap-8">
               <div>
                 <div className="text-3xl font-extrabold mb-1">99.8%</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Data Fidelity</div>
               </div>
               <div>
                 <div className="text-3xl font-extrabold mb-1">2.4s</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Inference Speed</div>
               </div>
             </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full aspect-square rounded-[100px] bg-[#fafafa] border-black/5 border relative flex items-center justify-center overflow-hidden">
               <div className="w-3/4 h-3/4 bg-white rounded-full shadow-2xl flex items-center justify-center animate-float">
                  <div className="w-1/2 h-1/2 bg-black rounded-full rotate-12 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">AR</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black text-white px-8 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#D4AF37] rounded-sm rotate-45"></div>
            <span className="text-sm font-bold tracking-[0.3em]">ALLAR AI</span>
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">
            Crafted for Excellence. © 2024 Strategic Ops.
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-[#D4AF37]">Privacy</a>
            <a href="#" className="hover:text-[#D4AF37]">Terms</a>
            <a href="#" className="hover:text-[#D4AF37]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
