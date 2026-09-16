import { useState } from 'react';
import Header from './components/Header';
import MentorTitanProfile from './components/MentorTitanProfile';
import ProgramsSection from './components/ProgramsSection';
import StrategyVisualizer from './components/StrategyVisualizer';
import CrtSchool from './components/CrtSchool';
import RiskCalculator from './components/RiskCalculator';
import AiAdvisor from './components/AiAdvisor';
import {
  GraduationCap,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  Bot,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Award,
  CheckCircle2,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { BUSINESS_INFO } from './data/knowledge';

import mentorImg from './assets/images/mentor_dominic_musyoka_1789586898311.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'mentor' | 'programs' | 'strategies' | 'crt-school' | 'calculator' | 'advisor'>('programs');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Main Header */}
      <Header
        onOpenAdvisor={() => setActiveTab('advisor')}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Navigation Sub-Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-[69px] sm:top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar">
            <button
              id="tab-btn-mentor"
              onClick={() => setActiveTab('mentor')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'mentor'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Mentor Titan</span>
            </button>

            <button
              id="tab-btn-programs"
              onClick={() => setActiveTab('programs')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'programs'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academy & Mentorship</span>
            </button>

            <button
              id="tab-btn-crt-school"
              onClick={() => setActiveTab('crt-school')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'crt-school'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400 group-hover:text-white" />
              <span>CRT School (Book)</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                activeTab === 'crt-school' ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                71p
              </span>
            </button>

            <button
              id="tab-btn-strategies"
              onClick={() => setActiveTab('strategies')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'strategies'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>ICT & CRT Playbook</span>
            </button>

            <button
              id="tab-btn-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'calculator'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1% Risk Calculator</span>
            </button>

            <button
              id="tab-btn-advisor"
              onClick={() => setActiveTab('advisor')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'advisor'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Trading Advisor</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'mentor' && (
          <MentorTitanProfile
            onNavigateToPrograms={() => setActiveTab('programs')}
            onNavigateToCrtSchool={() => setActiveTab('crt-school')}
            onNavigateToRisk={() => setActiveTab('calculator')}
          />
        )}

        {activeTab === 'programs' && (
          <div className="space-y-8">
            {/* Top Mentor Quick Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-950/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0 shadow-md">
                  <img
                    src={mentorImg}
                    alt="Dominic Musyoka - Mentor Titan"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Founder & Head Trader
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">@yuppydel999</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    Mentorship Led by Dominic Musyoka ("Mentor Titan")
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl">
                    1-on-1 institutional mentorship, live FundedNext challenge execution, and strict 1% risk management.
                  </p>
                </div>
              </div>
              <button
                id="btn-view-mentor-bio"
                onClick={() => setActiveTab('mentor')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shrink-0 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Meet Dominic (Mentor Titan) →</span>
              </button>
            </div>

            <ProgramsSection
              onSelectProgramForOnboarding={() => {
                // Smooth scroll to onboarding
                const el = document.getElementById('onboarding-wizard');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToStrategies={() => setActiveTab('strategies')}
              onNavigateToCrtSchool={() => setActiveTab('crt-school')}
            />
          </div>
        )}

        {activeTab === 'crt-school' && <CrtSchool />}

        {activeTab === 'strategies' && (
          <StrategyVisualizer onNavigateToCrtSchool={() => setActiveTab('crt-school')} />
        )}

        {activeTab === 'calculator' && <RiskCalculator />}

        {activeTab === 'advisor' && <AiAdvisor />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                TK
              </div>
              <span className="text-base font-black text-white tracking-tight">TRADING KNOWLEDGE</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Founded by <strong>Dominic Musyoka (Mentor Titan)</strong>. Full classic classes on forex trading, crypto, and other networks, specializing in ICT and CRT strategies. Focus on risk management, trade confirmation, and institutional liquidity.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span>TikTok: @yuppydel999</span>
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm tracking-tight mb-2">Verified Business Info</h4>
            <p className="text-slate-300">
              <strong className="text-slate-100">Mentor:</strong> Dominic Musyoka (Mentor Titan)
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">Email:</strong> {BUSINESS_INFO.email}
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">WhatsApp:</strong> {BUSINESS_INFO.whatsapp}
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">M-Pesa:</strong> 01 41 47-35 81
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">Crypto:</strong> Binance Direct
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm tracking-tight mb-2">Policies & Terms</h4>
            <p className="text-slate-300">
              <strong className="text-slate-100">Full Course:</strong> $100 (2 to 3 months)
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">FundedNext Promo:</strong> $32 Mentorship Account
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">Account Mgmt:</strong> 50/50 Daily Profit Split
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-100">Reset Policy:</strong> 40% fee to restart uncompleted classes
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <span>© {new Date().getFullYear()} Trading Knowledge Academy. All institutional rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Direct WhatsApp (0710339554)
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="hover:text-slate-300"
            >
              Contact Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
