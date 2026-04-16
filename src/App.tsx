import { useRef, useState } from "react";
import { SplineSceneBasic } from "@/components/ui/demo";
import { AIChat } from "@/components/AIChat";
import { HandWrittenTitle } from "@/components/ui/hand-written-title";
import { Balloons } from "@/components/ui/balloons";
import { DottedSurface } from "@/components/ui/dotted-surface"; // IL TUO COMPONENTE
import { Shield, MessageSquare, Download, Briefcase, Music, PartyPopper, ExternalLink } from "lucide-react";
import confetti from 'canvas-confetti';

export default function App() {
  const balloonsRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => { });
      setIsPlaying(!isPlaying);
    }
  };

  const handleLaunchBalloons = () => {
    if (balloonsRef.current) balloonsRef.current.launchAnimation();
  };

  const handleVCardClick = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.7 }, colors: ['#00f2ff', '#7000ff', '#ffffff'] });
  };

  const menuItems = [
    { title: 'Omnia', icon: <Shield size={18} />, color: '#a955ff', url: 'https://omniastudio-pro.vercel.app/' },
    { title: 'Concierge', icon: <MessageSquare size={18} />, color: '#56CCF2', url: 'https://concierge24.vercel.app/' },
    { title: 'HomeTour', icon: <Briefcase size={18} />, color: '#80FF72', url: 'https://hometour-studio.vercel.app/' },
    { title: 'vCard', icon: <Download size={18} />, color: '#FF9966', url: '/contact.vcf' },
    { title: 'Music', icon: <Music size={18} />, color: '#ffa9c6', url: 'https://ff-edizioni.vercel.app/' },
    { title: 'Palloncini', icon: <PartyPopper size={18} />, color: '#FFD700', action: handleLaunchBalloons },
  ];

  return (
    <div className="dark min-h-screen bg-[#020205] text-white selection:bg-cyan-500 overflow-x-hidden relative z-0">

      {/* IL TUO SFONDO AD ONDA 3D */}
      <DottedSurface />

      {/* Audio Locale */}
      <audio ref={audioRef} src="https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Fausto CD/Controtempo.mp3" loop />

      <section className="relative z-10 w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
        <SplineSceneBasic />
      </section>

      <main className="relative z-10 max-w-[1126px] mx-auto px-6 py-20 space-y-24 pb-60">
        <HandWrittenTitle title="Riccardo M." subtitle="AI & Sound Solutions" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="glow-border-wrapper">
            <div className="glow-border-inner"></div>
            <a href="/contact.vcf" download onClick={handleVCardClick} className="btn-content text-xl font-black no-underline text-white">
              💾 SALVA CONTATTO
            </a>
          </div>

          <div className="glow-border-wrapper">
            <div className="glow-border-inner"></div>
            <button onClick={toggleAudio} className={`btn-content text-xl font-black transition-colors ${isPlaying ? 'text-cyan-400' : 'text-white'}`}>
              {isPlaying ? "⏸ PAUSA AUDIO" : "🎵 ASCOLTA MUSICA"}
            </button>
          </div>
        </div>

        <section className="max-w-3xl mx-auto">
          <AIChat />
        </section>

        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProjectCard title="OmniaStudio" tag="Privacy AI" url="https://omniastudio-pro.vercel.app/" />
          <ProjectCard title="Concierge24" tag="Horeca AI" url="https://concierge24.vercel.app/" />
          <ProjectCard title="HomeTour" tag="Real Estate" url="https://hometour-studio.vercel.app/" />
        </footer>
      </main>

      <Balloons ref={balloonsRef} type="default" />

      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4">
        <ul className="flex gap-3 bg-black/60 backdrop-blur-3xl p-3 rounded-full border border-white/10 shadow-2xl">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                if (item.url) window.open(item.url, item.url.startsWith('http') ? '_blank' : '_self');
                if (item.action) item.action();
              }}
              className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer group hover:w-36 transition-all duration-500 overflow-hidden border border-white/5"
              style={{ backgroundColor: `${item.color}22` }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: item.color }}></span>
              <span className="relative z-10 transition-all duration-500 group-hover:translate-x-[-45px] group-hover:text-white" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span className="absolute left-16 text-white text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function ProjectCard({ title, tag, url }: any) {
  return (
    <a href={url} target="_blank" className="p-8 bg-zinc-900/60 border border-white/10 rounded-3xl hover:border-cyan-500/50 hover:bg-zinc-900/90 transition-all group no-underline text-white relative">
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase tracking-[3px] text-cyan-500 font-bold">{tag}</span>
        <ExternalLink size={14} className="text-zinc-600 group-hover:text-cyan-500 transition-colors" />
      </div>
      <h4 className="text-2xl font-bold mt-2 group-hover:text-cyan-400 transition-colors">{title}</h4>
    </a>
  );
}