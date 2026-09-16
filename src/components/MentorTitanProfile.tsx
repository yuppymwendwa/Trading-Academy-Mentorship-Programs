import {
  Award,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ExternalLink,
  Flame,
  ArrowRight,
  BookOpen,
  Smartphone,
  Car,
  UserCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/knowledge';

import mentorImg from '../assets/images/mentor_dominic_musyoka_1789586898311.jpg';
import carImg from '../assets/images/trader_freedom_car_1789586916317.jpg';
import phoneImg from '../assets/images/risk_mindset_phone_1789586932562.jpg';

interface MentorTitanProfileProps {
  onNavigateToPrograms?: () => void;
  onNavigateToCrtSchool?: () => void;
  onNavigateToRisk?: () => void;
}

export default function MentorTitanProfile({
  onNavigateToPrograms,
  onNavigateToCrtSchool,
  onNavigateToRisk
}: MentorTitanProfileProps) {
  return (
    <div id="mentor-titan-profile-section" className="space-y-8">
      {/* Primary Mentor Identity Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mentor Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-2xl shadow-emerald-950/60 ring-4 ring-emerald-500/20">
              <div className="aspect-[3/4] w-full overflow-hidden bg-slate-950">
                <img
                  src={mentorImg}
                  alt="Dominic Musyoka - Mentor Titan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-black text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Verified Lead Mentor</span>
              </div>

              {/* Bottom Identity Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <div className="text-xl font-black text-white tracking-tight">
                  Dominic Musyoka
                </div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>"Mentor Titan" • Founder & Head Trader</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-4 w-full max-w-sm">
              <a
                id="link-mentor-whatsapp"
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Mentor</span>
              </a>

              {BUSINESS_INFO.tiktokUrl && (
                <a
                  id="link-mentor-tiktok"
                  href={BUSINESS_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
                >
                  <span className="text-[11px] font-mono text-cyan-400">TikTok: @yuppydel999</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Mentor Bio & Philosophy Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>Founder's Directive & Trading Philosophy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                "I Don't Teach Retail Hope. I Teach Institutional Precision & Capital Discipline."
              </h1>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Hi, I'm <strong>Dominic Musyoka</strong>, known in the trading community as <strong>Mentor Titan</strong>. 
                I created <strong>Trading Knowledge Academy</strong> to break retail traders out of the cycle of blown accounts, emotional revenge trading, and indicator noise.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ICT & CRT Specialization</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Master institutional liquidity pools (BSL/SSL), fair value gaps, and candle-range delivery without lagging indicators.
                </p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The 1% Risk Golden Rule</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Zero gambling. Max 1% risk per trade and minimum 1:2 R:R so you pass prop firm challenges and protect your equity.
                </p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>$32 FundedNext Mentorship</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  I trade directly for students during mentorship to pass challenges, build capital, and demonstrate real-market execution.
                </p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Dedicated Mentorship Support</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Direct WhatsApp access (0710339554) Monday to Friday, 8:00 AM - 4:00 PM for chart review and trade feedback.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onNavigateToPrograms && (
                <button
                  id="btn-mentor-enroll-programs"
                  onClick={onNavigateToPrograms}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <span>Join Mentorship With Dominic ($32 Promo)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onNavigateToCrtSchool && (
                <button
                  id="btn-mentor-open-crt-school"
                  onClick={onNavigateToCrtSchool}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Study CRT School (71 Pages)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Core Tenets: Mentor Identity, Risk Discipline & Milestones */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              The Mentor Titan Triad: Identity, Risk Discipline & Milestones
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How Dominic Musyoka structures professional trading from mindset to real-world capital growth.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Nairobi, Kenya • Global Markets
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mentor Identity (Portrait) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-200">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={mentorImg}
                  alt="Dominic Musyoka - Mentor Titan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-500 text-slate-950 shadow-md">
                  1. The Mentor Identity
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold text-white">
                  Dominic Musyoka (Mentor Titan)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct guidance from a funded trader who has mastered the institutional mechanics of ICT liquidity and Candle Range Theory. No generic courses—only personal execution support.
                </p>
                <div className="pt-2 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>WhatsApp: 0710339554</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Email: yuppymwendwa45@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={onNavigateToPrograms}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
              >
                View Mentorship Options
              </button>
            </div>
          </div>

          {/* Card 2: Risk & Mindset (Phone Image) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-200">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={phoneImg}
                  alt="Trading Psychology and Risk Discipline"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-cyan-500 text-slate-950 shadow-md flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  <span>2. Risk & Chart Discipline</span>
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold text-white">
                  Unplug & Guard Capital ("No Internet")
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "Throw your phone away, find a spot in nature, enjoy." Trading is 80% psychology. When your setup is taken or your 1% risk limit is touched, close your screens. Overtrading is the trader's greatest risk.
                </p>
                <div className="pt-2 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Strict 1% Maximum Risk Rule</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Mindset & Emotional Control</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={onNavigateToRisk}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
              >
                Open Risk Calculator
              </button>
            </div>
          </div>

          {/* Card 3: Milestone & Freedom (Car Image) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-200">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={carImg}
                  alt="Trader Milestone and Freedom"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                  <Car className="w-3 h-3" />
                  <span>3. Tangible Milestones</span>
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold text-white">
                  The Fruits of Consistency
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real milestones achieved through patient, methodical execution. Passing prop firm challenges and managing accounts with 50/50 profit splits builds real independence on your own terms.
                </p>
                <div className="pt-2 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>FundedNext Challenge Passing</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>50/50 Daily Account Management</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={onNavigateToPrograms}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
              >
                Explore Programs ($32 / $100)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
