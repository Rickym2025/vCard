import { Shield, MessageSquare, Download, Briefcase, Music } from "lucide-react";

const menuItems = [
    { title: 'Omnia', icon: <Shield size={20} />, gFrom: '#a955ff', gTo: '#ea51ff', url: 'https://omniastudio-pro.vercel.app/' },
    { title: 'Concierge', icon: <MessageSquare size={20} />, gFrom: '#56CCF2', gTo: '#2F80ED', url: 'https://concierge24.vercel.app/' },
    { title: 'vCard', icon: <Download size={20} />, gFrom: '#FF9966', gTo: '#FF5E62', url: '/contact.vcf' },
    { title: 'HomeTour', icon: <Briefcase size={20} />, gFrom: '#80FF72', gTo: '#7EE8FA', url: 'https://hometour-studio.vercel.app/' },
    { title: 'Music', icon: <Music size={20} />, gFrom: '#ffa9c6', gTo: '#f434e2', url: '#music' }
];

export default function GradientMenu() {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-fit">
            <ul className="flex gap-3 bg-black/40 backdrop-blur-xl p-3 rounded-full border border-white/10 shadow-2xl">
                {menuItems.map((item, idx) => (
                    <li
                        key={idx}
                        onClick={() => window.open(item.url, item.url.startsWith('http') ? '_blank' : '_self')}
                        className="relative w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center transition-all duration-500 hover:w-36 group cursor-pointer overflow-hidden border border-white/5"
                        style={{
                            // @ts-ignore
                            '--g-from': item.gFrom, '--g-to': item.gTo
                        }}
                    >
                        <span className="absolute inset-0 bg-[linear-gradient(45deg,var(--g-from),var(--g-to))] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        <span className="relative z-10 text-zinc-400 group-hover:text-white group-hover:translate-x-[-40px] transition-all duration-500">
                            {item.icon}
                        </span>
                        <span className="absolute left-14 text-white uppercase font-black text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
                            {item.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}