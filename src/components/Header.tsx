import { useState, useEffect } from 'react';
import { Phone, Mail, Clock, ShieldAlert, Award, MessageCircle, BookOpen, UserCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/knowledge';

interface HeaderProps {
  onOpenAdvisor: () => void;
  onSelectTab: (tab: 'mentor' | 'programs' | 'strategies' | 'calculator' | 'advisor' | 'crt-school') => void;
}

export default function Header({ onOpenAdvisor, onSelectTab }: HeaderProps) {
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

  useEffect(() => {
    // Check if current Nairobi/Local time is Mon-Fri 8:00 AM - 4:00 PM
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = now.getHours();
    const isWeekday = day >= 1 && day <= 5;
    const isDuringHours = hours >= 8 && hours < 16;
    setIsOpenNow(isWeekday && isDuringHours);
  }, []);

  return (
    <header id="main-header" className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-40">
      {/* Top Notification / Hours Bar */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="text-slate-400 font-medium">
            Support Status: <span className={isOpenNow ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {isOpenNow ? 'Open Now (Mon-Fri 8am-4pm)' : 'Desk Hours: Mon-Fri 8:00 AM – 4:00 PM'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            title="Official Email"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{BUSINESS_INFO.email}</span>
          </a>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            title="Direct WhatsApp Support"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: {BUSINESS_INFO.whatsapp}</span>
          </a>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <span className="text-lg tracking-tighter">TK</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                TRADING KNOWLEDGE
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                ICT & CRT Academy
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Led by <strong className="text-slate-200">Dominic Musyoka ("Mentor Titan")</strong> • Institutional Liquidity, CRT & Strict 1% Risk
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            id="header-btn-mentor-titan"
            onClick={() => onSelectTab('mentor')}
            className="px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mentor Titan</span>
          </button>

          <button
            id="header-btn-crt-school"
            onClick={() => onSelectTab('crt-school')}
            className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>CRT School Book</span>
          </button>

          <button
            id="header-btn-mentorship-promo"
            onClick={() => onSelectTab('programs')}
            className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>FundedNext Promo ($32)</span>
          </button>

          <button
            id="header-btn-ai-advisor"
            onClick={onOpenAdvisor}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-900/30 flex items-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask AI Trading Advisor</span>
          </button>

          <a
            id="header-btn-whatsapp"
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Contact Desk</span>
          </a>
        </div>
      </div>
    </header>
  );
}
