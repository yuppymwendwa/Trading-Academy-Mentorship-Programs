import { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  Eye,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { PRICING_PLANS, ONBOARDING_STEPS, BUSINESS_INFO } from '../data/knowledge';

import ictSetupImg from '../assets/images/ict_setup_chart_1789585991012.jpg';
import crtModelImg from '../assets/images/crt_model_chart_1789586002460.jpg';
import oteFvgImg from '../assets/images/ote_fvg_chart_1789586013037.jpg';

interface ProgramsSectionProps {
  onSelectProgramForOnboarding?: (programName: string) => void;
  onNavigateToStrategies?: () => void;
  onNavigateToCrtSchool?: () => void;
}

export default function ProgramsSection({
  onSelectProgramForOnboarding,
  onNavigateToStrategies,
  onNavigateToCrtSchool
}: ProgramsSectionProps) {
  const [copiedMpesa, setCopiedMpesa] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Full Classic Course ($100)');
  const [studentName, setStudentName] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'binance'>('mpesa');
  const [showChecklistDetails, setShowChecklistDetails] = useState(false);

  const mpesaNumber = '01 41 47-35 81';

  const copyMpesa = () => {
    navigator.clipboard.writeText('0141473581');
    setCopiedMpesa(true);
    setTimeout(() => setCopiedMpesa(false), 2500);
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Trading Knowledge Academy, I would like to onboard for: ${selectedPlan}.\nName: ${studentName || '[My Name]'}\nPayment Method: ${paymentMethod === 'mpesa' ? 'M-Pesa (01 41 47-35 81)' : 'Binance'}\nHere is my payment confirmation screenshot and document verification.`
    );
    return `https://wa.me/254710339554?text=${text}`;
  };

  return (
    <div id="programs-section" className="space-y-10">
      {/* Academy Question & Coverage Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Knowledge Base & System Integration Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Trading Academy & Mentorship Programs
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Every detail from your knowledge base—including your ICT/CRT strategy rules, $100 course, $32 FundedNext promotion, 50/50 account management split, M-Pesa details, and 40% reset policy—is fully configured.
            </p>
          </div>

          <button
            id="btn-toggle-coverage-checklist"
            onClick={() => setShowChecklistDetails(!showChecklistDetails)}
            className="self-start lg:self-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>{showChecklistDetails ? 'Hide Knowledge Analysis' : 'Does This Cover Everything? (Review)'}</span>
          </button>
        </div>

        {/* Expandable Knowledge Base Review */}
        {showChecklistDetails && (
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs space-y-4 text-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-500/20">
                <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Fully Implemented from Your Knowledge:
                </h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li><strong>Business Identity:</strong> Forex & Crypto focus, ICT & CRT specializations.</li>
                  <li><strong>Support & Contacts:</strong> WhatsApp 0710339554, Email yuppymwendwa45@gmail.com, Desk Hours Mon-Fri 8am-4pm.</li>
                  <li><strong>Pricing:</strong> $100 Full Course (2-3 months), 50/50 profit split account management.</li>
                  <li><strong>Payment Rails:</strong> M-Pesa (01 41 47-35 81) and Binance crypto.</li>
                  <li><strong>Promotion & Policy:</strong> $32 FundedNext account challenge pass promotion, 40% class reset fee.</li>
                  <li><strong>Institutional Models:</strong> ICT 5-step model, OTE 70.5% sweet spot, CRT, SMT divergence, Turtle Soup, 1% risk rule.</li>
                  <li><strong>AI Behavior:</strong> Polite, brief, respectful, and automatic escalation for difficult inquiries.</li>
                </ul>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-amber-500/20">
                <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Optional Specific Details You May Add Later:
                </h4>
                <p className="text-slate-400 mb-2">
                  Your current data provides everything required to run the academy, onboarding, and advisor. If you ever wish to expand, here are 4 optional operational details:
                </p>
                <ol className="space-y-1.5 text-slate-300 list-decimal list-inside">
                  <li><strong>Binance Wallet Address:</strong> Specific USDT TRC-20 or BEP-20 address for crypto direct transfer.</li>
                  <li><strong>Document Requirements:</strong> Clarifying whether onboarding documents mean National ID, Passport, or trading experience questionnaire.</li>
                  <li><strong>FundedNext Account Size:</strong> Specifying whether the $32 promotion applies to the $5,000 or $10,000 evaluation tier.</li>
                  <li><strong>Session Timetable:</strong> Weekly live stream days/hours (e.g. Tuesday/Thursday London Open or New York Open sessions).</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => {
          const isPopular = plan.popular;
          return (
            <div
              key={plan.name}
              id={`card-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`rounded-2xl flex flex-col justify-between transition-all duration-200 p-6 relative ${
                isPopular
                  ? 'bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-950/40'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-slate-950 font-black text-[11px] rounded-full uppercase tracking-wider shadow-md">
                  Most Comprehensive
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
                  {plan.name.includes('Mentorship') && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md">
                      Special Promo
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/ {plan.duration}</span>
                </div>

                <p className="text-xs text-slate-400 mt-2 mb-5 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Program Deliverables:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  id={`btn-enroll-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    setSelectedPlan(`${plan.name} (${plan.price})`);
                    if (onSelectProgramForOnboarding) {
                      onSelectProgramForOnboarding(plan.name);
                    }
                    const el = document.getElementById('onboarding-wizard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isPopular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Select & Onboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Curriculum Showcase: ICT & CRT Chart Models */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Chart Mastery Included</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Master Clear ICT & Candle Range Theory (CRT) Setups
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Every class breaks down professional candlestick anatomy, liquidity sweeps, and 70.5% sweet spot entries so institutional mechanics are crystal clear.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigateToCrtSchool && (
              <button
                id="btn-open-crt-school-from-programs"
                onClick={onNavigateToCrtSchool}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 transition-all shrink-0 shadow-lg shadow-emerald-950/40"
              >
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>Read CRT School (71 Pages)</span>
              </button>
            )}

            {onNavigateToStrategies && (
              <button
                id="btn-open-playbook-from-programs"
                onClick={onNavigateToStrategies}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all shrink-0"
              >
                <span>Interactive Playbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Visual Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: ICT 5-Step Model */}
          <div
            onClick={onNavigateToStrategies}
            className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all duration-200"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <img
                src={ictSetupImg}
                alt="ICT 5-Step Model Chart"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                ICT Core Setup
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                ICT 5-Step Sequence Model
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Liquidity sweep → Bearish/Bullish Order Block → Fair Value Gap Imbalance → MSS displacement → 70.5% OTE retest.
              </p>
            </div>
          </div>

          {/* Card 2: CRT Theory (Opens CRT School) */}
          <div
            onClick={() => {
              if (onNavigateToCrtSchool) onNavigateToCrtSchool();
              else if (onNavigateToStrategies) onNavigateToStrategies();
            }}
            className="group bg-slate-950 rounded-xl overflow-hidden border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all duration-200 shadow-lg shadow-emerald-950/20"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <img
                src={crtModelImg}
                alt="Candle Range Theory CRT Chart"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 backdrop-blur-md flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-emerald-400" />
                <span>CRT School (71 Pages)</span>
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Candle Range Theory (CRT)
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Read Textbook →
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solomon King's complete curriculum: H.P vs L.B CRT, the 3rd candle entry rule, Unicorn model, and multi-timeframe CISD execution.
              </p>
            </div>
          </div>

          {/* Card 3: 70.5% OTE Sweet Spot */}
          <div
            onClick={onNavigateToStrategies}
            className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all duration-200"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <img
                src={oteFvgImg}
                alt="ICT 70.5% OTE Sweet Spot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 backdrop-blur-md">
                70.5% Sweet Spot
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Optimal Trade Entry (OTE)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculate precise discount vs. premium Fibonacci zones with FVG confluence for 1:3+ minimum Reward-to-Risk ratios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Management & Reset Policy Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">50/50 Daily Profit Account Management</h3>
              <p className="text-xs text-slate-400">Professional algorithmic & institutional execution</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            For investors and capitalized traders who prefer hands-off execution, the academy provides institutional management. Trades are taken strictly under ICT and CRT models with max 1% risk per trade.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-amber-300 font-medium">
            Daily settlement: Profits generated during each trading day are split 50/50 between the account owner and the management team.
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Class Reset & Resumption Policy</h3>
              <p className="text-xs text-slate-400">Student protection & flexibility guarantee</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            We understand personal schedules, work, or family circumstances can disrupt studies. If a student is unable to complete a class in session, you do not have to forfeit your education.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-blue-300 font-medium">
            Official Policy: A student can reset and restart their class for a fair fee of <strong>40% of the total amount</strong>, rather than paying the full course fee again.
          </div>
        </div>
      </div>

      {/* Interactive 3-Step Onboarding Wizard */}
      <div id="onboarding-wizard" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Official Onboarding Process</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How to Enroll in 3 Simple Steps
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Follow our streamlined onboarding sequence to start your mentorship or account setup today.
          </p>
        </div>

        {/* Steps Visual Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ONBOARDING_STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                    {s.step}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Step {s.step}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.instruction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Enrollment Assistant / Action Panel */}
        <div className="bg-slate-950/80 rounded-xl p-5 sm:p-6 border border-emerald-500/20">
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Onboarding Registration Assistant</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Selected Program</label>
              <select
                id="select-onboarding-plan"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Full Classic Course ($100)">Full Classic Course ($100 - 2 to 3 mos)</option>
                <option value="Mentorship Promotion ($32 FundedNext)">Mentorship Promotion ($32 FundedNext Account)</option>
                <option value="Account Management (50/50 Split)">Account Management (50/50 Split)</option>
                <option value="Class Reset (40% Fee)">Class Reset (40% Fee)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
              <input
                id="input-student-name"
                type="text"
                placeholder="e.g. John Doe"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Payment Method</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="btn-method-mpesa"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    paymentMethod === 'mpesa'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  M-Pesa
                </button>
                <button
                  type="button"
                  id="btn-method-binance"
                  onClick={() => setPaymentMethod('binance')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    paymentMethod === 'binance'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  Binance
                </button>
              </div>
            </div>
          </div>

          {/* Payment Detail Box */}
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                {paymentMethod === 'mpesa' ? 'Official M-Pesa Send Money / Till:' : 'Binance Crypto Option:'}
              </span>
              <div className="text-base font-black text-white mt-0.5 flex items-center gap-2">
                <span>{paymentMethod === 'mpesa' ? mpesaNumber : 'Binance Direct Transfer'}</span>
                {paymentMethod === 'mpesa' && (
                  <span className="text-xs font-normal text-slate-400">(Recipient: Trading Knowledge Academy)</span>
                )}
              </div>
            </div>

            {paymentMethod === 'mpesa' && (
              <button
                id="btn-copy-mpesa"
                onClick={copyMpesa}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedMpesa ? 'Copied Number!' : 'Copy 01 41 47-35 81'}</span>
              </button>
            )}
          </div>

          {/* Direct WhatsApp Step 3 Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              After payment, forward your transaction screenshot and document details to WhatsApp for immediate onboarding confirmation.
            </p>

            <a
              id="btn-forward-whatsapp-confirmation"
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0"
            >
              <span>Forward to WhatsApp (0710339554)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
