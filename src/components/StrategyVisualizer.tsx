import { useState } from 'react';
import {
  TrendingUp,
  Crosshair,
  BarChart3,
  Sliders,
  ChevronRight,
  CheckCircle2,
  ArrowDownUp,
  AlertTriangle,
  Maximize2,
  X,
  Eye,
  BookOpen,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { STRATEGY_CONCEPTS } from '../data/knowledge';

// High-resolution generated strategy chart assets
import ictSetupImg from '../assets/images/ict_setup_chart_1789585991012.jpg';
import crtModelImg from '../assets/images/crt_model_chart_1789586002460.jpg';
import oteFvgImg from '../assets/images/ote_fvg_chart_1789586013037.jpg';
import smtDivergenceImg from '../assets/images/smt_divergence_chart_1789586040349.jpg';

interface LightboxData {
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  breakdown: { label: string; text: string; color: string }[];
}

interface StrategyVisualizerProps {
  onNavigateToCrtSchool?: () => void;
}

export default function StrategyVisualizer({ onNavigateToCrtSchool }: StrategyVisualizerProps) {
  const [activeStrategy, setActiveStrategy] = useState<string>('ict-entry-model');
  const [viewMode, setViewMode] = useState<'chart-image' | 'interactive-schematic'>('chart-image');
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  // OTE Interactive Fibonacci State
  const [swingHigh, setSwingHigh] = useState<number>(1.0950);
  const [swingLow, setSwingLow] = useState<number>(1.0800);
  const [isBullishOte, setIsBullishOte] = useState<boolean>(true);

  // Calculate OTE Fibonacci Levels
  const range = Math.abs(swingHigh - swingLow);
  const high = Math.max(swingHigh, swingLow);
  const low = Math.min(swingHigh, swingLow);

  const eq50 = isBullishOte ? high - 0.5 * range : low + 0.5 * range;
  const fib62 = isBullishOte ? high - 0.62 * range : low + 0.62 * range;
  const sweetSpot705 = isBullishOte ? high - 0.705 * range : low + 0.705 * range;
  const fib79 = isBullishOte ? high - 0.79 * range : low + 0.79 * range;

  // ICT 5-Step Model active step highlight for schematic
  const [activeIctStep, setActiveIctStep] = useState<number>(1);

  const ictSteps = [
    {
      step: 1,
      title: 'Liquidity Sweep',
      abbr: 'BSL / SSL',
      desc: 'Smart money drives price beyond key swing highs or swing lows to trigger retail buy/sell stops and take liquidity.',
      badge: 'Step 1: The Trap',
    },
    {
      step: 2,
      title: 'Order Block (OB)',
      abbr: 'OB Formation',
      desc: 'The last opposing candle prior to aggressive impulse where institutions heavily loaded their real directional orders.',
      badge: 'Step 2: Footprint',
    },
    {
      step: 3,
      title: 'Fair Value Gap (FVG)',
      abbr: 'Imbalance',
      desc: 'A distinct 3-candle imbalance showing price void where liquidity was not offered evenly, guaranteeing institutional re-pricing.',
      badge: 'Step 3: Imbalance',
    },
    {
      step: 4,
      title: 'Displacement',
      abbr: 'BOS / MSS',
      desc: 'Rapid, energetic candle expansion creating a Market Structure Shift (MSS) that breaks previous structure with body closes.',
      badge: 'Step 4: Conviction',
    },
    {
      step: 5,
      title: 'Retest & Execution',
      abbr: 'OTE Entry',
      desc: 'Patient pullback into the FVG and Order Block inside the 62%-79% OTE bracket (70.5% sweet spot) for high-probability entry.',
      badge: 'Step 5: Execution',
    },
  ];

  // Visual chart cards metadata for the gallery and breakdowns
  const chartLibrary = [
    {
      id: 'ict-entry-model',
      title: 'ICT Institutional 5-Step Model',
      tag: 'ICT Core',
      tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      image: ictSetupImg,
      summary: 'Complete sequence: Liquidity Sweep → Order Block → Fair Value Gap Imbalance → Displacement (MSS) → 70.5% OTE Retest.',
      breakdown: [
        { label: '1. Liquidity Sweep (BSL)', text: 'Institutional sweep takes out Buy-Side Liquidity above previous equal highs or swing highs.', color: 'text-rose-400' },
        { label: '2. Bearish Order Block (OB)', text: 'The last up-close candle before violent downward momentum reveals institutional footprint.', color: 'text-blue-400' },
        { label: '3. Fair Value Gap (FVG)', text: 'The 3-candle imbalance left behind by displacement; price is drawn back to fill this liquidity void.', color: 'text-emerald-400' },
        { label: '4. Market Structure Shift (MSS)', text: 'Aggressive displacement breaking previous swing low structure with full candle body closes.', color: 'text-amber-400' },
        { label: '5. Retest & Execution', text: 'Enter on retracement back into the FVG/OB alignment at the 70.5% OTE Sweet Spot.', color: 'text-emerald-300' }
      ]
    },
    {
      id: 'crt-theory',
      title: 'Candle Range Theory (CRT) Model',
      tag: 'CRT Core',
      tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      image: crtModelImg,
      summary: 'Every candle establishes its own parent range. Child candles sweep boundaries and close back inside to target the opposite extreme.',
      breakdown: [
        { label: '1. Parent Candle Range Definition', text: 'Mark the high and low of the higher timeframe parent candle (e.g., Daily, 4-Hour, or 1-Hour).', color: 'text-cyan-400' },
        { label: '2. Liquidity Sweep Wick', text: 'The child candle expands outside the parent range high or low, piercing stops with an extended wick.', color: 'text-rose-400' },
        { label: '3. Close Inside Reclaim (Entry)', text: 'Crucial confirmation: child candle body must close back INSIDE the parent candle range.', color: 'text-emerald-400' },
        { label: '4. Target Opposite Boundary', text: 'Once reclaimed, smart money targets the opposite parent candle range boundary as primary take profit.', color: 'text-emerald-300' },
        { label: '5. Invalidation Level', text: 'Stop loss sits just beyond the extreme of the child sweep wick.', color: 'text-slate-400' }
      ]
    },
    {
      id: 'ote-fibonacci',
      title: 'Optimal Trade Entry (OTE) & 70.5% Sweet Spot',
      tag: 'ICT Fibonacci',
      tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      image: oteFvgImg,
      summary: 'Precision Fibonacci measurement of the displacement leg. The 70.5% level is the institutional sweet spot aligning with FVG imbalances.',
      breakdown: [
        { label: '0.50 Equilibrium Line', text: 'Divides market into Premium (above 50% = look for shorts) and Discount (below 50% = look for longs).', color: 'text-amber-400' },
        { label: '0.618 (62%) OTE Threshold', text: 'The entry gateway where institutional algorithmic pricing starts actively absorbing orders.', color: 'text-slate-300' },
        { label: '0.705 (70.5%) SWEET SPOT', text: 'ICT mathematical sweet spot offering optimal reward-to-risk (often 1:3 to 1:5) with minimal drawdown.', color: 'text-emerald-400' },
        { label: '0.786 (79%) Deep OTE Limit', text: 'The deepest valid retracement level before market structure invalidation occurs.', color: 'text-slate-400' },
        { label: 'FVG Confluence', text: 'Look for an existing Fair Value Gap resting directly at the 70.5% level for maximum confirmation.', color: 'text-cyan-300' }
      ]
    },
    {
      id: 'smt-divergence',
      title: 'SMT Intermarket Divergence Model',
      tag: 'ICT Advanced',
      tagColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      image: smtDivergenceImg,
      summary: 'Intermarket divergence between correlated pairs (EUR/USD vs. GBP/USD) revealing institutional accumulation vs. distribution.',
      breakdown: [
        { label: 'Pair 1 Makes New Extreme', text: 'EUR/USD drives down and makes a Lower Low (LL), sweeping retail sell stops.', color: 'text-rose-400' },
        { label: 'Pair 2 Fails New Extreme', text: 'At the exact same timestamp, GBP/USD refuses to break its low, making a Higher Low (HL).', color: 'text-emerald-400' },
        { label: 'The Institutional Footprint', text: 'The failure of GBP/USD to create a lower low proves smart money has already absorbed all sell orders.', color: 'text-amber-300' },
        { label: 'Trade Execution', text: 'Trade the stronger asset (GBP/USD for buys, or EUR/USD for sells) in the direction of the institutional shift.', color: 'text-emerald-300' }
      ]
    }
  ];

  const currentChart = chartLibrary.find((c) => c.id === activeStrategy) || chartLibrary[0];

  const openLightbox = (chart: typeof chartLibrary[0]) => {
    setLightboxData({
      src: chart.image,
      title: chart.title,
      subtitle: chart.summary,
      tag: chart.tag,
      breakdown: chart.breakdown
    });
  };

  return (
    <div id="strategy-visualizer-section" className="space-y-8">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Institutional Strategy Playbook</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ICT & Candle Range Theory (CRT) Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              High-clarity annotated chart diagrams, candlestick mechanics, and step-by-step rules so you can master institutional liquidity and execution.
            </p>
          </div>

          {/* Strategy Navigation Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ict-entry-model', label: 'ICT 5-Step Model' },
              { id: 'crt-theory', label: 'CRT (Candle Range Theory)' },
              { id: 'ote-fibonacci', label: 'OTE 70.5% Sweet Spot' },
              { id: 'smt-divergence', label: 'SMT Divergence' },
              { id: 'turtle-soup', label: 'Turtle Soup' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`btn-tab-${tab.id}`}
                onClick={() => setActiveStrategy(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeStrategy === tab.id
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm shadow-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Chart Cheatsheet Gallery Banner */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Visual Strategy Charts & Cheatsheets (Click to Inspect)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            4 Ultra-Clear High-Resolution Models
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {chartLibrary.map((chart) => {
            const isCurrent = activeStrategy === chart.id;
            return (
              <div
                key={chart.id}
                id={`gallery-card-${chart.id}`}
                onClick={() => setActiveStrategy(chart.id)}
                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 ${
                  isCurrent
                    ? 'border-emerald-500 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                }`}
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={chart.image}
                    alt={chart.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
                  <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${chart.tagColor}`}>
                    {chart.tag}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(chart);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-md bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Enlarge Chart"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-2.5">
                  <h4 className="text-xs font-bold text-white truncate">{chart.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{chart.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Visualizer Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Chart / Interactive Graphic */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          {/* Top Control Bar: Mode Toggle & Enlarge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {currentChart.title}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentChart.tagColor}`}>
                  {currentChart.tag}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentChart.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              {/* Toggle View Mode */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  id="btn-toggle-view-chart"
                  onClick={() => setViewMode('chart-image')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    viewMode === 'chart-image'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Chart Diagram</span>
                </button>
                <button
                  id="btn-toggle-view-schematic"
                  onClick={() => setViewMode('interactive-schematic')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    viewMode === 'interactive-schematic'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Calculator & Schematic</span>
                </button>
              </div>

              {viewMode === 'chart-image' && (
                <button
                  id="btn-enlarge-current-chart"
                  onClick={() => openLightbox(currentChart)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                  title="Enlarge to Full Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* VIEW MODE 1: High-Clarity Annotated Chart Image */}
          {viewMode === 'chart-image' && (
            <div className="space-y-5">
              <div
                onClick={() => openLightbox(currentChart)}
                className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer shadow-lg"
              >
                <img
                  src={currentChart.image}
                  alt={currentChart.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors pointer-events-none" />
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <Maximize2 className="w-3 h-3 text-emerald-400" />
                  <span>Click to Enlarge & Read Annotations</span>
                </div>
              </div>

              {/* Step-by-Step Educational Breakdown for the active chart */}
              <div className="bg-slate-950 rounded-xl p-4 sm:p-5 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    How To Read & Execute This Setup
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentChart.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5"
                    >
                      <span className={`text-xs font-bold ${item.color} shrink-0 mt-0.5`}>
                        {item.label}:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: Interactive SVG Schematics & Calculators */}
          {viewMode === 'interactive-schematic' && (
            <div className="space-y-4">
              {/* ICT 5-Step Model Schematic */}
              {activeStrategy === 'ict-entry-model' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">ICT 5-Step Sequence Schematic</h4>
                      <p className="text-xs text-slate-400">Click a stage below to inspect execution mechanics</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Step {activeIctStep} of 5
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
                    <svg viewBox="0 0 600 300" className="w-full h-auto select-none">
                      <line x1="20" y1="50" x2="580" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
                      <line x1="20" y1="150" x2="580" y2="150" stroke="#1e293b" strokeDasharray="3 3" />
                      <line x1="20" y1="250" x2="580" y2="250" stroke="#1e293b" strokeDasharray="3 3" />

                      <line x1="40" y1="60" x2="220" y2="60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="50" y="52" fill="#ef4444" fontSize="11" fontWeight="bold">Buy-Side Liquidity (BSL Old High)</text>

                      <path
                        d="M 60 170 Q 110 110 160 80 T 200 45"
                        fill="none"
                        stroke={activeIctStep === 1 ? '#10b981' : '#64748b'}
                        strokeWidth={activeIctStep === 1 ? '3' : '1.5'}
                      />
                      <circle cx="200" cy="45" r="5" fill="#ef4444" />
                      <text x="180" y="32" fill="#f87171" fontSize="10" fontWeight="bold">1. Sweep</text>

                      <rect
                        x="215"
                        y="55"
                        width="18"
                        height="35"
                        fill={activeIctStep === 2 ? '#3b82f6' : '#1e3a8a'}
                        stroke="#60a5fa"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <line x1="224" y1="45" x2="224" y2="105" stroke="#60a5fa" strokeWidth="1" />
                      <text x="210" y="125" fill="#60a5fa" fontSize="10" fontWeight="bold">2. OB</text>

                      <rect
                        x="250"
                        y="75"
                        width="22"
                        height="85"
                        fill={activeIctStep === 4 ? '#ef4444' : '#991b1b'}
                        stroke="#f87171"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <rect
                        x="245"
                        y="110"
                        width="70"
                        height="35"
                        fill="#10b981"
                        fillOpacity={activeIctStep === 3 ? '0.35' : '0.12'}
                        stroke="#10b981"
                        strokeDasharray="2 2"
                      />
                      <text x="250" y="132" fill="#34d399" fontSize="10" fontWeight="bold">3. FVG Imbalance</text>

                      <line x1="160" y1="180" x2="330" y2="180" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="170" y="195" fill="#fbbf24" fontSize="10" fontWeight="bold">4. Displacement / MSS</text>

                      <path
                        d="M 272 170 Q 300 210 320 230 T 360 135"
                        fill="none"
                        stroke={activeIctStep === 5 ? '#10b981' : '#64748b'}
                        strokeWidth={activeIctStep === 5 ? '3' : '1.5'}
                      />
                      <circle cx="360" cy="135" r="6" fill="#10b981" />
                      <text x="350" y="118" fill="#10b981" fontSize="11" fontWeight="bold">5. OTE Entry (70.5%)</text>

                      <path
                        d="M 360 135 L 430 220 L 520 270"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                      />
                      <text x="470" y="285" fill="#34d399" fontSize="11" fontWeight="bold">Target: Sell-Side Liquidity (SSL)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {ictSteps.map((s) => (
                      <button
                        key={s.step}
                        id={`btn-step-${s.step}`}
                        onClick={() => setActiveIctStep(s.step)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          activeIctStep === s.step
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold">{s.abbr}</div>
                        <div className="text-xs">Step {s.step}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CRT Schematic */}
              {activeStrategy === 'crt-theory' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 450 240" className="w-full h-auto select-none">
                      <line x1="80" y1="40" x2="380" y2="40" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="80" y="32" fill="#60a5fa" fontSize="10" fontWeight="bold">Parent Candle Range High</text>

                      <line x1="80" y1="180" x2="380" y2="180" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="80" y="195" fill="#60a5fa" fontSize="10" fontWeight="bold">Parent Candle Range Low</text>

                      <line x1="160" y1="40" x2="160" y2="180" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="145" y="70" width="30" height="80" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
                      <text x="140" y="215" fill="#94a3b8" fontSize="10" fontWeight="bold">Parent Candle</text>

                      <line x1="280" y1="20" x2="280" y2="170" stroke="#ef4444" strokeWidth="2" />
                      <circle cx="280" cy="20" r="4" fill="#ef4444" />
                      <text x="290" y="24" fill="#f87171" fontSize="10" fontWeight="bold">Liquidity Sweep Wick</text>

                      <rect x="265" y="60" width="30" height="90" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" rx="2" />
                      <text x="250" y="215" fill="#f87171" fontSize="10" fontWeight="bold">Child Reclaim (Entry)</text>

                      <path d="M 280 150 L 280 180" stroke="#10b981" strokeWidth="3" />
                      <text x="320" y="165" fill="#10b981" fontSize="10" fontWeight="bold">Run to Parent Low</text>
                    </svg>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs text-slate-300">
                    <span className="font-bold text-blue-400">CRT Core Rule:</span> When the child candle sweeps parent high/low and its body closes BACK inside the range, institutional order absorption is confirmed. Target the opposite range extreme.
                  </div>
                </div>
              )}

              {/* OTE Interactive Calculator */}
              {activeStrategy === 'ote-fibonacci' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Optimal Trade Entry (OTE) Calculator</h4>
                      <p className="text-xs text-slate-400">Institutional Fibonacci measurement (62% - 79% with 70.5% Sweet Spot)</p>
                    </div>
                    <button
                      id="btn-toggle-bull-bear"
                      onClick={() => setIsBullishOte(!isBullishOte)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5"
                    >
                      <ArrowDownUp className="w-3 h-3 text-emerald-400" />
                      <span>{isBullishOte ? 'Bullish (Buy in Discount)' : 'Bearish (Sell in Premium)'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
                      <span className="font-mono text-slate-400">100.0% ({isBullishOte ? 'Swing Low' : 'Swing High'})</span>
                      <span className="font-mono font-bold text-white">{isBullishOte ? low.toFixed(4) : high.toFixed(4)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1 text-slate-400">
                      <span className="font-mono">79.0% Deep OTE Limit</span>
                      <span className="font-mono">{fib79.toFixed(4)}</span>
                    </div>

                    <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg p-2.5 flex items-center justify-between text-xs shadow-md shadow-emerald-950/40">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-emerald-500 text-slate-950 font-black rounded text-[10px]">
                          SWEET SPOT
                        </span>
                        <span className="font-bold text-emerald-300">70.5% Institutional Entry</span>
                      </div>
                      <span className="font-mono font-black text-emerald-400 text-sm">
                        {sweetSpot705.toFixed(4)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1 text-slate-400">
                      <span className="font-mono">62.0% OTE Gate</span>
                      <span className="font-mono">{fib62.toFixed(4)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1.5 border-y border-amber-500/40 bg-amber-500/5 px-2 rounded">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <span className="font-bold text-amber-300">50.0% Equilibrium</span>
                      </div>
                      <span className="font-mono font-bold text-amber-400">{eq50.toFixed(4)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1 border-t border-slate-800">
                      <span className="font-mono text-slate-400">0.0% ({isBullishOte ? 'Swing High' : 'Swing Low'})</span>
                      <span className="font-mono font-bold text-white">{isBullishOte ? high.toFixed(4) : low.toFixed(4)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Swing High Price</label>
                      <input
                        id="input-swing-high"
                        type="number"
                        step="0.0001"
                        value={swingHigh}
                        onChange={(e) => setSwingHigh(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Swing Low Price</label>
                      <input
                        id="input-swing-low"
                        type="number"
                        step="0.0001"
                        value={swingLow}
                        onChange={(e) => setSwingLow(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SMT Divergence Schematic */}
              {activeStrategy === 'smt-divergence' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
                    <svg viewBox="0 0 500 220" className="w-full h-auto select-none">
                      <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="bold">EUR / USD (Makes Lower Low)</text>
                      <path d="M 30 70 L 90 50 L 150 100 L 200 65 L 250 120" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                      <circle cx="150" cy="100" r="4" fill="#60a5fa" />
                      <circle cx="250" cy="120" r="4" fill="#ef4444" />
                      <text x="135" y="115" fill="#94a3b8" fontSize="9">Low 1</text>
                      <text x="235" y="138" fill="#f87171" fontSize="9" fontWeight="bold">Lower Low (LL)</text>

                      <text x="300" y="25" fill="#34d399" fontSize="12" fontWeight="bold">GBP / USD (Makes Higher Low)</text>
                      <path d="M 300 70 L 360 50 L 410 115 L 450 75 L 485 95" fill="none" stroke="#34d399" strokeWidth="2.5" />
                      <circle cx="410" cy="115" r="4" fill="#34d399" />
                      <circle cx="485" cy="95" r="4" fill="#34d399" />
                      <text x="395" y="130" fill="#94a3b8" fontSize="9">Low 1</text>
                      <text x="465" y="115" fill="#34d399" fontSize="9" fontWeight="bold">Higher Low (HL)</text>

                      <line x1="250" y1="120" x2="485" y2="95" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="310" y="170" fill="#fbbf24" fontSize="11" fontWeight="bold">
                        SMT Divergence: Smart Money Accumulation!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Turtle Soup Schematic */}
              {activeStrategy === 'turtle-soup' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
                    <svg viewBox="0 0 500 200" className="w-full h-auto select-none">
                      <line x1="40" y1="70" x2="460" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                      <text x="40" y="60" fill="#fbbf24" fontSize="11" fontWeight="bold">Previous Session High (Retail Breakout Trigger Level)</text>
                      <path
                        d="M 60 150 Q 140 100 220 70 T 260 35 T 290 85 T 380 160"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                      <circle cx="260" cy="35" r="5" fill="#ef4444" />
                      <text x="240" y="24" fill="#f87171" fontSize="10" fontWeight="bold">Trap 5-15 pips above</text>
                      <circle cx="280" cy="70" r="5" fill="#10b981" />
                      <text x="295" y="75" fill="#10b981" fontSize="10" fontWeight="bold">Turtle Soup Short Entry</text>
                    </svg>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/20 text-xs text-slate-300">
                    <span className="font-bold text-amber-400">Execution Rule:</span> Price sweeps previous session key high by 5 to 15 pips, triggers retail stop runs, then aggressively falls back below the level.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Strategy Principles & Rules */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curriculum Modules & Rules
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Live Mentorship Content
            </span>
          </div>

          {STRATEGY_CONCEPTS.map((concept) => {
            const isSelected = activeStrategy === concept.id;
            return (
              <div
                key={concept.id}
                onClick={() => setActiveStrategy(concept.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      concept.tag === 'ICT'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : concept.tag === 'CRT'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {concept.tag} Strategy
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                </div>

                <h4 className="text-sm font-bold text-white">{concept.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{concept.subtitle}</p>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                    {concept.details.map((d, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                    {concept.formulaOrRule && (
                      <div className="mt-2 bg-slate-950 p-2.5 rounded-lg text-emerald-300 font-mono text-[11px] font-semibold border border-slate-800 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Rule: {concept.formulaOrRule}</span>
                      </div>
                    )}

                    {concept.id === 'crt-strategy' && onNavigateToCrtSchool && (
                      <button
                        id="btn-open-crt-school-from-concept"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToCrtSchool();
                        }}
                        className="mt-3 w-full py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Open Solomon King's CRT School (71 Pages) →</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxData && (
        <div
          id="chart-lightbox-modal"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setLightboxData(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{lightboxData.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {lightboxData.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{lightboxData.subtitle}</p>
              </div>

              <button
                id="btn-close-lightbox"
                onClick={() => setLightboxData(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Chart Image */}
            <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center">
              <div className="w-full rounded-xl overflow-hidden border border-slate-800 shadow-xl max-h-[60vh] flex items-center justify-center bg-black">
                <img
                  src={lightboxData.src}
                  alt={lightboxData.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>
            </div>

            {/* Modal Explanations */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Institutional Execution & Mechanics Guide</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {lightboxData.breakdown.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                    <span className={`font-bold ${item.color}`}>{item.label}</span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
