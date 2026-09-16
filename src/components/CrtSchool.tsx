import { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  Search,
  Crosshair,
  AlertCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Target,
  Zap,
  Bookmark,
  Check,
  Copy,
  Eye,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Image as ImageIcon,
  Lightbulb,
  UserCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/knowledge';

// Official course PDF charts and visual lesson assets
import crtModelImg from '../assets/images/crt_model_chart_1789586002460.jpg';
import ictSetupImg from '../assets/images/ict_setup_chart_1789585991012.jpg';
import oteFvgImg from '../assets/images/ote_fvg_chart_1789586013037.jpg';
import smtDivergenceImg from '../assets/images/smt_divergence_chart_1789586040349.jpg';
import mentorImg from '../assets/images/mentor_dominic_musyoka_1789586898311.jpg';
import riskMindsetImg from '../assets/images/risk_mindset_phone_1789586932562.jpg';
import traderFreedomImg from '../assets/images/trader_freedom_car_1789586916317.jpg';

export interface ChartFigure {
  id: string;
  figureNumber: string;
  title: string;
  subtitle: string;
  category: 'CRT' | 'ICT' | 'OTE' | 'SMT' | 'MINDSET' | 'MENTOR';
  image: string;
  pageRef: string;
  caption: string;
  keyPoints: string[];
  relevantChapters: number[];
}

export interface ChartModalData {
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  pageRef: string;
  notes: string[];
}

export default function CrtSchool() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [searchGlossary, setSearchGlossary] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');
  const [crtDirection, setCrtDirection] = useState<'bullish' | 'bearish'>('bullish');
  const [crtProbability, setCrtProbability] = useState<'hp' | 'lb'>('hp');
  const [fvgType, setFvgType] = useState<'big' | 'small'>('big');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  // PDF Chart Figures Gallery State & Lightbox
  const [selectedFigureId, setSelectedFigureId] = useState<string>('fig-crt-model');
  const [galleryFilter, setGalleryFilter] = useState<'ALL' | 'CRT' | 'ICT' | 'OTE' | 'SMT' | 'MENTOR'>('ALL');
  const [inspectChart, setInspectChart] = useState<ChartModalData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // All 7 Official Course & Curriculum Visual Figures
  const chartFigures: ChartFigure[] = [
    {
      id: 'fig-crt-model',
      figureNumber: 'Figure 1',
      title: 'Candle Range Theory (CRT) Range Mechanics',
      subtitle: 'Parent Candle Range, Child Sweep Wick & Range Reclaim',
      category: 'CRT',
      image: crtModelImg,
      pageRef: 'Pages 5–15',
      caption: 'Defines the core anatomy of CRT: The parent candle benchmarks the highs and lows. The child candle pierces the range boundary to grab retail stop loss orders. The immediate close back inside confirms the trap and initiates delivery toward the opposite extreme.',
      keyPoints: [
        'Parent Candle establishes the reference benchmark range (Range High & Range Low).',
        'Child Candle sweeps liquidity with an extended wick beyond the parent boundary.',
        'Mandatory Close: Child candle body MUST close back inside the parent range.',
        'Target Delivery: Smart money delivers price directly toward the opposite range boundary.',
        'Execution Trigger: The 3rd candle provides the high-probability trade entry.'
      ],
      relevantChapters: [1, 2, 3, 4, 6]
    },
    {
      id: 'fig-ict-setup',
      figureNumber: 'Figure 2',
      title: 'ICT 5-Step Institutional Entry Model',
      subtitle: 'Sweep → Order Block → Fair Value Gap → Displacement → Retest',
      category: 'ICT',
      image: ictSetupImg,
      pageRef: 'Pages 16–17 & 53–58',
      caption: 'The complete 5-step algorithmic cycle used by institutional market makers to engineer reversals and ride high-conviction order flow.',
      keyPoints: [
        '1. Liquidity Sweep: Price purges resting Buy-Side or Sell-Side Liquidity.',
        '2. Order Block: Institutional footprint marked by the last opposing candle before displacement.',
        '3. Fair Value Gap (FVG): 3-candle imbalance creating an urgent price vacuum.',
        '4. Displacement: Forceful expansion breaking structure (MSS/BOS) with candle body closes.',
        '5. Retest & Execution: Pullback into the FVG inside the OTE sweet spot for low-risk entry.'
      ],
      relevantChapters: [7, 8, 11]
    },
    {
      id: 'fig-ote-fvg',
      figureNumber: 'Figure 3',
      title: 'Optimal Trade Entry (OTE) & 70.5% Sweet Spot',
      subtitle: 'Discount vs Premium Equilibrium & 3-Candle FVG Confluence',
      category: 'OTE',
      image: oteFvgImg,
      pageRef: 'Pages 33–49',
      caption: 'The institutional Fibonacci measurement tool. Divides the market into Premium (>50%) and Discount (<50%), highlighting the 62%-79% retracement bracket with the 70.5% sweet spot.',
      keyPoints: [
        '50.0% Equilibrium: The boundary separating Premium (expensive) from Discount (cheap).',
        'Buy Rule: Only execute longs in Discount (<50%).',
        'Sell Rule: Only execute shorts in Premium (>50%).',
        'OTE Golden Bracket: Retracement between 62.0% and 79.0%.',
        '70.5% Sweet Spot: High-frequency institutional algorithmic re-pricing level.'
      ],
      relevantChapters: [9, 10]
    },
    {
      id: 'fig-smt-divergence',
      figureNumber: 'Figure 4',
      title: 'SMT Divergence (Smart Money Intermarket Tool)',
      subtitle: 'Correlated Asset Decoupling at Key Liquidity Levels',
      category: 'SMT',
      image: smtDivergenceImg,
      pageRef: 'Pages 10 & 59–63',
      caption: 'The institutional smoking gun: when correlated assets like EURUSD and GBPUSD fail to make matching swings at key highs or lows, revealing smart money accumulation or distribution.',
      keyPoints: [
        'Asset Correlation: EURUSD and GBPUSD should mirror each others directional swings.',
        'Bullish SMT: Asset A makes a lower low while Asset B makes a higher low (refuses to confirm).',
        'Bearish SMT: Asset A makes a higher high while Asset B makes a lower high.',
        'Execution Edge: Trade the weaker asset for shorts or the stronger asset for longs.',
        'Confirmation Confluence: SMT at a CRT key level produces near-zero drawdown entries.'
      ],
      relevantChapters: [5, 12]
    },
    {
      id: 'fig-risk-mindset',
      figureNumber: 'Figure 5',
      title: 'The 1% Risk Protocol & Unplugging Psychology',
      subtitle: 'Protecting Capital & Stepping Away After Trade Execution',
      category: 'MINDSET',
      image: riskMindsetImg,
      pageRef: 'Academy Core Discipline',
      caption: 'Discipline is the master key to profitability. Once your daily 1% setup is executed or target hit, turn off the screens, unplug from the noise, and let algorithmic probability play out.',
      keyPoints: [
        'Maximum 1% Risk per Trade: Never compromise account equity.',
        'Overtrading Danger: The greatest trap is taking unconfirmed random trades after winning or losing.',
        'The Unplugging Rule: Once orders are placed with predefined TP & SL, close TradingView.',
        'Emotional Neutrality: Smart money treats trading as statistical risk management, not gambling.'
      ],
      relevantChapters: [7]
    },
    {
      id: 'fig-trader-freedom',
      figureNumber: 'Figure 6',
      title: 'Prop Firm Challenge & Capital Independence',
      subtitle: 'Passing FundedNext Challenges & 50/50 Profit Growth',
      category: 'MENTOR',
      image: traderFreedomImg,
      pageRef: 'Mentorship Outcomes',
      caption: 'The tangible fruits of consistent institutional execution: passing prop firm challenges ($32 FundedNext promotion) and building steady, scalable capital through disciplined rule-following.',
      keyPoints: [
        'Prop Firm Growth: Scaling from $5k to $100k+ funded accounts without risking life savings.',
        'Master Trader Execution: Learning side-by-side with Dominic Musyoka (Mentor Titan).',
        '50/50 Daily Account Management: Consistent compounding without emotional interference.',
        'Long-term Freedom: Trading as a sustainable, sovereign professional career.'
      ],
      relevantChapters: [13]
    },
    {
      id: 'fig-mentor-dominic',
      figureNumber: 'Figure 7',
      title: 'Mentor Titan (Dominic Musyoka) Master Guidance',
      subtitle: 'Founder & Lead Institutional Mentor at Trading Knowledge Academy',
      category: 'MENTOR',
      image: mentorImg,
      pageRef: 'Instructors Desk',
      caption: 'Dominic Musyoka (Mentor Titan) provides direct 1-on-1 mentorship, personal WhatsApp guidance (0710339554), and daily analysis on TikTok (@yuppydel999).',
      keyPoints: [
        '1-on-1 Personalized Coaching across Forex, Crypto, and major asset networks.',
        'Direct WhatsApp desk access for trade review and chart validation.',
        'Live execution during the $32 FundedNext promotion challenge phases.',
        'Emphasis on psychological fortitude and strict risk mitigation.'
      ],
      relevantChapters: [1, 7, 14]
    }
  ];

  const activeFigure = chartFigures.find((f) => f.id === selectedFigureId) || chartFigures[0];

  const filteredFigures = useMemo(() => {
    if (galleryFilter === 'ALL') return chartFigures;
    if (galleryFilter === 'MENTOR') return chartFigures.filter((f) => f.category === 'MENTOR' || f.category === 'MINDSET');
    return chartFigures.filter((f) => f.category === galleryFilter);
  }, [galleryFilter]);

  const chapters = [
    { id: 1, title: '1. What is Candle Range Theory (CRT)?', badge: 'Core Foundation', pages: 'Pages 5–6' },
    { id: 2, title: '2. Types of CRT (Bullish vs Bearish)', badge: 'Directional Rule', pages: 'Page 7' },
    { id: 3, title: '3. High vs Low Probability CRT (H.P vs L.B)', badge: 'Candle Close Secret', pages: 'Page 8' },
    { id: 4, title: '4. The 3 Forms of CRT (Classic, 2-Candle, Multiple)', badge: 'Formations', pages: 'Page 9' },
    { id: 5, title: '5. Trading With CRT at Key Levels', badge: 'Confluence (H.B CRT)', pages: 'Page 10' },
    { id: 6, title: '6. CRT Entry: The 3rd Candle Rule & Multi-Timeframe', badge: 'Execution Trigger', pages: 'Pages 11–15' },
    { id: 7, title: '7. How to Trade CRT: The 4 Pillars', badge: 'Strategy Rules', pages: 'Pages 16–17' },
    { id: 8, title: '8. 3-Candles Retracement Rule & Valid BOS', badge: 'Market Structure', pages: 'Pages 19–32' },
    { id: 9, title: '9. 7 Institutional Reference Points (MB, BB, FVG, OB)', badge: 'Footprints', pages: 'Pages 33–39' },
    { id: 10, title: '10. PD-Array & Mastering Liquidity (BSL, SSL, Dealing Range)', badge: 'Algorithmic Pricing', pages: 'Pages 40–49' },
    { id: 11, title: '11. Signature Entry Models (Unicorn, BPR, OB+FVG)', badge: 'Elite Setups', pages: 'Pages 53–58' },
    { id: 12, title: '12. Trade Entry Confirmation (3-Candle Swing & LTF MSS)', badge: 'Greenlight Rules', pages: 'Pages 59–63' },
    { id: 13, title: '13. ICT Power of 3 (PO3) & Killzones Strategy', badge: 'Session Mastery', pages: 'Pages 64–67' },
    { id: 14, title: '14. Complete SMC / ICT Dictionary & Abbreviations', badge: '70+ Terms Reference', pages: 'Pages 69–71' }
  ];

  // 70+ Abbreviations from Solomon King's CRT School PDF (pages 69-71)
  const abbreviations = [
    { term: 'SMC', meaning: 'Smart Money Concepts', category: 'General' },
    { term: 'ICT', meaning: 'Inner Circle Trader (Algorithmic market theory)', category: 'General' },
    { term: 'CRT', meaning: 'Candle Range Theory (Using one candle range to predict next delivery)', category: 'CRT' },
    { term: 'CISD', meaning: 'Change In State of Delivery (Algorithmic momentum shift on lower timeframe)', category: 'Structure' },
    { term: 'OTE', meaning: 'Optimal Trade Entry (62% - 79% Fibonacci retracement bracket)', category: 'Strategy' },
    { term: 'HTF', meaning: 'Higher Time Frame (Provides institutional bias & benchmark)', category: 'General' },
    { term: 'LTF', meaning: 'Lower Time Frame (Used for sniper execution & CISD/MSS confirmation)', category: 'General' },
    { term: 'POI', meaning: 'Point of Interest (Key level where smart money orders rest)', category: 'Levels' },
    { term: 'BOS', meaning: 'Break of Structure (Requires candle body to close beyond extreme wick)', category: 'Structure' },
    { term: 'CHoCH', meaning: 'Change of Character (First structural shift against prevailing trend)', category: 'Structure' },
    { term: 'MSS', meaning: 'Market Structure Shift (Displacement breaking prior swing high/low)', category: 'Structure' },
    { term: 'LQ', meaning: 'Liquidity (Retail stop losses, buy stops, and sell stops)', category: 'Liquidity' },
    { term: 'BSL / BSQ', meaning: 'Buy Side Liquidity (Resting buy stops above old swing highs)', category: 'Liquidity' },
    { term: 'SSL / SSQ', meaning: 'Sell Side Liquidity (Resting sell stops below old swing lows)', category: 'Liquidity' },
    { term: 'EQH', meaning: 'Equal Highs (Major pool of retail buy stop liquidity)', category: 'Liquidity' },
    { term: 'EQL', meaning: 'Equal Lows (Major pool of retail sell stop liquidity)', category: 'Liquidity' },
    { term: 'IMB', meaning: 'Imbalance (Price inefficiency where liquidity was offered one-sidedly)', category: 'Levels' },
    { term: 'FVG', meaning: 'Fair Value Gap (3-candle imbalance void drawn back to be filled)', category: 'Levels' },
    { term: 'IFVG', meaning: 'Inverse Fair Value Gap (Failed FVG flipped into support/resistance)', category: 'Levels' },
    { term: 'OB', meaning: 'Order Block (Last opposing candle before institutional displacement)', category: 'Levels' },
    { term: 'BB', meaning: 'Breaker Block (Failed orderblock that swept liquidity before breaking structure)', category: 'Levels' },
    { term: 'MB', meaning: 'Mitigation Block (Orderblock that did NOT break previous swing extreme before MSS)', category: 'Levels' },
    { term: 'BPR', meaning: 'Balance Price Range (Two overlapping FVGs from opposite sides of price)', category: 'Strategy' },
    { term: 'CB / CE', meaning: 'Consequent Encroachment (The exact 50% midpoint of a Fair Value Gap or wick)', category: 'Levels' },
    { term: 'PDH', meaning: 'Previous Day High', category: 'Levels' },
    { term: 'PDL', meaning: 'Previous Day Low', category: 'Levels' },
    { term: 'PWH', meaning: 'Previous Week High', category: 'Levels' },
    { term: 'PWL', meaning: 'Previous Week Low', category: 'Levels' },
    { term: 'PYH', meaning: 'Previous Year High', category: 'Levels' },
    { term: 'PYL', meaning: 'Previous Year Low', category: 'Levels' },
    { term: 'IPDA', meaning: 'Interbank Price Delivery Algorithm', category: 'General' },
    { term: 'RTO', meaning: 'Return to Origin (Price retracing back to initial impulse origin)', category: 'Structure' },
    { term: 'SSB', meaning: 'Sell Side Balance', category: 'Liquidity' },
    { term: 'BSB', meaning: 'Buy Side Balance', category: 'Liquidity' },
    { term: 'BISI', meaning: 'Buy Side Imbalance, Sell Side Inefficiency (Bullish FVG)', category: 'Levels' },
    { term: 'SIBI', meaning: 'Sell Side Imbalance, Buy Side Inefficiency (Bearish FVG)', category: 'Levels' },
    { term: 'TTL', meaning: 'Time to Live', category: 'General' },
    { term: 'TP', meaning: 'Take Profit', category: 'General' },
    { term: 'SL', meaning: 'Stop Loss', category: 'General' },
    { term: 'BE', meaning: 'Break Even', category: 'General' },
    { term: 'ADR', meaning: 'Average Daily Range', category: 'General' },
    { term: 'ARR', meaning: 'Average Risk Reward', category: 'General' },
    { term: 'R/R', meaning: 'Risk to Reward Ratio (Minimum 1:2 required)', category: 'General' },
    { term: 'PO3', meaning: 'Power of 3 (Accumulation, Manipulation, Distribution)', category: 'Strategy' },
    { term: 'M1', meaning: '1-Minute Time Frame', category: 'Timeframe' },
    { term: 'M5', meaning: '5-Minute Time Frame', category: 'Timeframe' },
    { term: 'M15', meaning: '15-Minute Time Frame', category: 'Timeframe' },
    { term: 'H1', meaning: '1-Hour Time Frame', category: 'Timeframe' },
    { term: 'H4', meaning: '4-Hour Time Frame', category: 'Timeframe' },
    { term: 'D1', meaning: 'Daily Time Frame', category: 'Timeframe' },
    { term: 'W1', meaning: 'Weekly Time Frame', category: 'Timeframe' },
    { term: 'LO', meaning: 'London Open (3:00 AM – 5:00 AM EST Killzone)', category: 'Session' },
    { term: 'LC', meaning: 'London Close', category: 'Session' },
    { term: 'NYO', meaning: 'New York Open (7:00 AM – 10:00 AM EST Killzone)', category: 'Session' },
    { term: 'NYC', meaning: 'New York Close', category: 'Session' },
    { term: 'ASO', meaning: 'Asian Open (7:00 PM – 10:00 PM EST Killzone)', category: 'Session' },
    { term: 'ASC', meaning: 'Asian Close', category: 'Session' },
    { term: 'CPI', meaning: 'Consumer Price Index (Major news volatility driver)', category: 'Macro' },
    { term: 'NFP', meaning: 'Non-Farm Payroll (First Friday high-impact news event)', category: 'Macro' },
    { term: 'FOMC', meaning: 'Federal Open Market Committee', category: 'Macro' },
    { term: 'FED', meaning: 'Federal Reserve Bank', category: 'Macro' },
    { term: 'BOE', meaning: 'Bank of England', category: 'Macro' },
    { term: 'ECB', meaning: 'European Central Bank', category: 'Macro' },
    { term: 'BOJ', meaning: 'Bank of Japan', category: 'Macro' },
    { term: 'PP', meaning: 'Pivot Point', category: 'Levels' },
    { term: 'DR', meaning: 'Daily Range', category: 'Structure' },
    { term: 'WR', meaning: 'Weekly Range', category: 'Structure' }
  ];

  const filteredAbbreviations = useMemo(() => {
    return abbreviations.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchGlossary.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchGlossary.toLowerCase());
      const matchesCategory =
        glossaryCategory === 'all' || item.category.toLowerCase() === glossaryCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchGlossary, glossaryCategory]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(text);
    setTimeout(() => setCopiedTerm(null), 1800);
  };

  return (
    <div id="crt-school-root" className="space-y-8">
      {/* Book Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Solomon King’s Official Curriculum</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] text-emerald-300">71-Page Complete Digital Edition</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              CRT SCHOOL: Candle Range Theory
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Master the exact institutional logic of <strong className="text-emerald-400">Candle Range Theory (CRT)</strong>.
              Learn how smart money uses a single candle’s high and low to engineer liquidity, sweep retail stop orders,
              and target the opposite extreme with pinpoint execution.
            </p>

            {/* Quick Principles Pill Row */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
                🎯 Clear the Low → Go Higher
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
                🎯 Clear the High → Go Lower
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
                ⏳ The 3rd Candle Entry Rule
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
                📏 3-Candle Retracement Rule
              </span>
            </div>
          </div>

          {/* Book Mockup / Visual Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 w-full lg:w-72 shrink-0 shadow-xl flex flex-col items-center text-center space-y-3">
            <div className="w-20 h-28 bg-gradient-to-br from-emerald-500 via-teal-700 to-slate-900 rounded-lg shadow-lg border border-emerald-400/40 flex flex-col items-center justify-between p-2 text-slate-950 font-black">
              <span className="text-[9px] uppercase tracking-widest text-white/90">CRT SCHOOL</span>
              <div className="flex items-center gap-1 my-auto">
                <div className="w-2 h-9 bg-slate-950 rounded-sm"></div>
                <div className="w-2 h-14 bg-emerald-400 rounded-sm"></div>
              </div>
              <span className="text-[8px] text-white/80 font-mono">SOLOMON KING</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">CRT School Textbook</div>
              <p className="text-[11px] text-slate-400 mt-0.5">14 Chapters & 70+ SMC Terms</p>
            </div>
            <button
              id="btn-jump-chapter-1"
              onClick={() => setActiveChapter(1)}
              className="w-full py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Begin Study Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Official Course PDF Illustrated Figures: Visual Study Desk */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider mb-1">
              <ImageIcon className="w-3 h-3" />
              <span>PDF Visual Reference Archive</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Official Course Illustrated Charts & Visual Guide
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              All 7 figures extracted from the 71-page CRT & institutional mentorship manual for rapid, easy learning.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            {(['ALL', 'CRT', 'ICT', 'OTE', 'SMT', 'MENTOR'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  galleryFilter === filter
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {filter === 'ALL'
                  ? 'All Figures (7)'
                  : filter === 'CRT'
                  ? 'CRT Model'
                  : filter === 'ICT'
                  ? 'ICT 5-Step'
                  : filter === 'OTE'
                  ? 'OTE & FVG'
                  : filter === 'SMT'
                  ? 'SMT Divergence'
                  : 'Mindset & Mentor'}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {filteredFigures.map((fig) => {
            const isSelected = selectedFigureId === fig.id;
            return (
              <button
                key={fig.id}
                onClick={() => setSelectedFigureId(fig.id)}
                className={`text-left rounded-xl p-2 transition-all border group relative overflow-hidden flex flex-col ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden relative mb-2 bg-slate-900">
                  <img
                    src={fig.image}
                    alt={fig.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-xs">
                    {fig.figureNumber}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-white truncate w-full group-hover:text-emerald-300">
                  {fig.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                  <span>{fig.pageRef}</span>
                  <span className="text-emerald-400 font-bold">{fig.category}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Figure Expanded Study Showcase */}
        {activeFigure && (
          <div className="bg-slate-950 rounded-2xl border border-emerald-500/30 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Image Preview with Zoom Trigger */}
            <div className="lg:col-span-7 relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src={activeFigure.image}
                alt={activeFigure.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[360px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  setInspectChart({
                    src: activeFigure.image,
                    title: activeFigure.title,
                    subtitle: activeFigure.subtitle,
                    badge: `${activeFigure.figureNumber} • ${activeFigure.category}`,
                    pageRef: activeFigure.pageRef,
                    notes: activeFigure.keyPoints
                  });
                  setZoomLevel(1);
                }}
              />
              <div
                onClick={() => {
                  setInspectChart({
                    src: activeFigure.image,
                    title: activeFigure.title,
                    subtitle: activeFigure.subtitle,
                    badge: `${activeFigure.figureNumber} • ${activeFigure.category}`,
                    pageRef: activeFigure.pageRef,
                    notes: activeFigure.keyPoints
                  });
                  setZoomLevel(1);
                }}
                className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <span className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-2 shadow-2xl">
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Inspect Full Screen</span>
                </span>
              </div>
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 backdrop-blur-md">
                🔍 High-Resolution Course Asset • {activeFigure.pageRef}
              </div>
            </div>

            {/* Technical Explanations & Action */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {activeFigure.figureNumber}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{activeFigure.pageRef}</span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{activeFigure.title}</h4>
                <p className="text-xs text-emerald-400 font-medium mt-0.5">{activeFigure.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-2.5">{activeFigure.caption}</p>
              </div>

              {/* Key Institutional Points */}
              <div className="space-y-1.5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Execution Takeaways:</span>
                </div>
                {activeFigure.keyPoints.slice(0, 3).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Jump to Relevant Chapter CTA */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    if (activeFigure.relevantChapters.length > 0) {
                      setActiveChapter(activeFigure.relevantChapters[0]);
                      const desk = document.getElementById('crt-chapters-desk');
                      if (desk) desk.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Study in Chapter {activeFigure.relevantChapters[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setInspectChart({
                      src: activeFigure.image,
                      title: activeFigure.title,
                      subtitle: activeFigure.subtitle,
                      badge: `${activeFigure.figureNumber} • ${activeFigure.category}`,
                      pageRef: activeFigure.pageRef,
                      notes: activeFigure.keyPoints
                    });
                    setZoomLevel(1);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                  title="Enlarge Figure"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Study Desk: Left Navigation & Right Dynamic Content */}
      <div id="crt-chapters-desk" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapters Table of Contents */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curriculum Chapters
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold font-mono">
              Ch. {activeChapter} of {chapters.length}
            </span>
          </div>

          <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  id={`btn-crt-chapter-${ch.id}`}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs ${
                    isActive
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-sm shadow-emerald-950/40'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="truncate font-medium">{ch.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{ch.pages}</div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold shrink-0 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ch.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chapter Detailed Content & Interactive Models */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chapter 1: Foundations of CRT */}
          {activeChapter === 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 1 (Pages 5–6)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  What is Candle Range Theory (CRT)?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Candle Range Theory is a simple yet revolutionary way of using <strong>one candle</strong> to predict where price will go next.
                </p>
              </div>

              {/* Core Concept Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">The Candle Range</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every candlestick on any timeframe has:
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc marker:text-emerald-400">
                    <li><strong className="text-white">Candle High:</strong> The highest price reached during the period.</li>
                    <li><strong className="text-white">Candle Low:</strong> The lowest price reached during the period.</li>
                  </ul>
                  <p className="text-xs text-slate-400 pt-1">
                    These two points define the boundary of the candle’s range.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">The Simple Principle</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Price takes <strong>one side</strong> of the candle’s range and then delivers toward the <strong>other side</strong>.
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs text-emerald-300 font-medium">
                    💡 If price takes the high of a candle, smart money watches to see if it reverses and expands toward the low!
                  </div>
                </div>
              </div>

              {/* Interactive Candlestick SVG Diagram */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
                <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                  The Anatomical CRT Range Model
                </div>
                <svg viewBox="0 0 450 260" className="w-full max-w-md h-auto select-none">
                  {/* Candle Range Lines */}
                  <line x1="80" y1="40" x2="360" y2="40" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="365" y="44" fill="#34d399" fontSize="10" fontWeight="bold">Candle High (Range High)</text>

                  <line x1="80" y1="210" x2="360" y2="210" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="365" y="214" fill="#34d399" fontSize="10" fontWeight="bold">Candle Low (Range Low)</text>

                  {/* Range Bracket */}
                  <line x1="120" y1="40" x2="120" y2="210" stroke="#64748b" strokeWidth="1" />
                  <line x1="115" y1="40" x2="125" y2="40" stroke="#64748b" strokeWidth="1" />
                  <line x1="115" y1="210" x2="125" y2="210" stroke="#64748b" strokeWidth="1" />
                  <text x="70" y="130" fill="#94a3b8" fontSize="10" fontWeight="bold" transform="rotate(-90 70 130)">
                    CANDLE RANGE
                  </text>

                  {/* The Green Parent Candle */}
                  <line x1="240" y1="20" x2="240" y2="230" stroke="#10b981" strokeWidth="2" />
                  <rect x="220" y="55" width="40" height="135" fill="#10b981" rx="2" />

                  <circle cx="240" cy="20" r="4" fill="#10b981" />
                  <circle cx="240" cy="230" r="4" fill="#10b981" />
                </svg>
              </div>

              {/* Official Course PDF Chart Figure 1 */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-emerald-500/40 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Figure 1 • PDF Pages 5–15
                    </span>
                    <span className="text-xs font-bold text-white">Candle Range Theory (CRT) Blueprint Chart</span>
                  </div>
                  <button
                    onClick={() => {
                      setInspectChart({
                        src: crtModelImg,
                        title: 'Candle Range Theory (CRT) Model',
                        subtitle: 'From Solomon King CRT School PDF (Pages 5-15)',
                        badge: 'Figure 1 • CRT Blueprint',
                        pageRef: 'CRT School PDF Pages 5–15',
                        notes: [
                          'Parent Candle High & Low define the target delivery range benchmark.',
                          'Child Candle sweeps either the high or low to purge liquidity.',
                          'Candle body closes back INSIDE the parent range, confirming institutional reclaim.',
                          'The 3rd Candle provides the high-probability trade entry toward the opposite extreme.'
                        ]
                      });
                      setZoomLevel(1);
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Enlarge</span>
                  </button>
                </div>

                <div
                  onClick={() => {
                    setInspectChart({
                      src: crtModelImg,
                      title: 'Candle Range Theory (CRT) Model',
                      subtitle: 'From Solomon King CRT School PDF (Pages 5-15)',
                      badge: 'Figure 1 • CRT Blueprint',
                      pageRef: 'CRT School PDF Pages 5–15',
                      notes: [
                        'Parent Candle High & Low define the target delivery range benchmark.',
                        'Child Candle sweeps either the high or low to purge liquidity.',
                        'Candle body closes back INSIDE the parent range, confirming institutional reclaim.',
                        'The 3rd Candle provides the high-probability trade entry toward the opposite extreme.'
                      ]
                    });
                    setZoomLevel(1);
                  }}
                  className="relative rounded-xl overflow-hidden border border-slate-800 cursor-pointer group bg-slate-900"
                >
                  <img
                    src={crtModelImg}
                    alt="Candle Range Theory CRT Official PDF Chart"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                      <span>Inspect High-Resolution Chart</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Mentor Dominic Musyoka Note:</strong> Notice how the child candle pierces the range boundary to grab retail stop loss orders. The moment price re-enters and closes inside the parent range, institutional order flow reverses with precision toward the opposite liquidity boundary.
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  id="btn-next-chapter-2"
                  onClick={() => setActiveChapter(2)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 2 (Types of CRT)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 2: Types of CRT (Bullish vs Bearish) */}
          {activeChapter === 2 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 2 (Page 7)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Types of CRT: Bullish vs. Bearish
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Memorize the core rules: <strong>Clear the Low → Go Higher</strong> and <strong>Clear the High → Go Lower</strong>.
                </p>
              </div>

              {/* Bullish vs Bearish Toggle Controls */}
              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-fit">
                <button
                  id="btn-crt-bullish"
                  onClick={() => setCrtDirection('bullish')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    crtDirection === 'bullish'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>🟢 Bullish CRT</span>
                </button>
                <button
                  id="btn-crt-bearish"
                  onClick={() => setCrtDirection('bearish')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    crtDirection === 'bearish'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>🔴 Bearish CRT</span>
                </button>
              </div>

              {/* Dynamic Rule Box */}
              {crtDirection === 'bullish' ? (
                <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Bullish CRT Mechanics</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Price goes below the candle → clears the low → reverses → moves up.</strong>
                  </p>
                  <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/30 text-xs font-mono text-emerald-300">
                    Easy to remember: <strong>Clear the Low → Go Higher 📈</strong>
                  </div>

                  {/* SVG Illustration Bullish CRT */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-sm h-auto select-none">
                      {/* Parent Range High line */}
                      <line x1="40" y1="50" x2="350" y2="50" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="40" y="42" fill="#94a3b8" fontSize="10">Candle High</text>

                      {/* Parent Candle (Black / Red) */}
                      <line x1="120" y1="50" x2="120" y2="200" stroke="#ef4444" strokeWidth="2" />
                      <rect x="105" y="70" width="30" height="110" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" rx="2" />

                      {/* Child Candle (Sweeps low, reverses up) */}
                      <line x1="220" y1="130" x2="220" y2="230" stroke="#10b981" strokeWidth="2" />
                      <circle cx="220" cy="230" r="4" fill="#38bdf8" />
                      <text x="230" y="235" fill="#38bdf8" fontSize="9" fontWeight="bold">Clears Low</text>
                      <rect x="205" y="140" width="30" height="60" fill="#10b981" rx="2" />

                      {/* Green Delivery Arrow Upward */}
                      <path d="M 250 160 Q 280 120 310 70" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x="280" y="60" fill="#10b981" fontSize="11" fontWeight="bold">Target Candle High 📈</text>
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-950/20 border border-rose-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Bearish CRT Mechanics</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Price goes above the candle → clears the high → reverses → moves down.</strong>
                  </p>
                  <div className="bg-slate-950 p-3 rounded-lg border border-rose-500/30 text-xs font-mono text-rose-300">
                    Easy to remember: <strong>Clear the High → Go Lower 📉</strong>
                  </div>

                  {/* SVG Illustration Bearish CRT */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-sm h-auto select-none">
                      {/* Parent Range Low line */}
                      <line x1="40" y1="200" x2="350" y2="200" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="40" y="215" fill="#94a3b8" fontSize="10">Candle Low</text>

                      {/* Parent Candle (Green) */}
                      <line x1="120" y1="50" x2="120" y2="200" stroke="#10b981" strokeWidth="2" />
                      <rect x="105" y="70" width="30" height="110" fill="#10b981" rx="2" />

                      {/* Child Candle (Sweeps high, reverses down) */}
                      <line x1="220" y1="20" x2="220" y2="140" stroke="#ef4444" strokeWidth="2" />
                      <circle cx="220" cy="20" r="4" fill="#38bdf8" />
                      <text x="230" y="25" fill="#38bdf8" fontSize="9" fontWeight="bold">Clears High</text>
                      <rect x="205" y="60" width="30" height="50" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" rx="2" />

                      {/* Red Delivery Arrow Downward */}
                      <path d="M 250 110 Q 280 150 310 190" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <text x="280" y="195" fill="#f87171" fontSize="11" fontWeight="bold">Target Candle Low 📉</text>
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-1"
                  onClick={() => setActiveChapter(1)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-3"
                  onClick={() => setActiveChapter(3)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 3 (H.P vs L.B CRT)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 3: High vs Low Probability CRT */}
          {activeChapter === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 3 (Page 8)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  High Probability CRT (H.P) vs. Low Probability CRT (L.B)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  How the child candle closes after sweeping liquidity makes all the difference between a high-win-rate trade and a low-probability trap.
                </p>
              </div>

              {/* H.P vs L.B Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bullish Comparison */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Bullish CRT Scenarios</span>
                  </div>

                  {/* Bullish H.P */}
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300">🟢 H.P CRT (High Probability)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">TAKE</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      The liquidity is swept, and the child candle <strong>closes bullish (green)</strong>, proving buyers have seized full control.
                    </p>
                  </div>

                  {/* Bullish L.B */}
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300">🔴 L.B CRT (Low Probability)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500 text-white font-black">AVOID</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      The liquidity is swept, but the candle <strong>closes bearish (red)</strong>, showing sellers are still dominating.
                    </p>
                  </div>
                </div>

                {/* Bearish Comparison */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Bearish CRT Scenarios</span>
                  </div>

                  {/* Bearish H.P */}
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300">🟢 H.P CRT (High Probability)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">TAKE</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      The liquidity is swept, and the child candle <strong>closes bearish (red)</strong>, confirming institutional selling power.
                    </p>
                  </div>

                  {/* Bearish L.B */}
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300">🔴 L.B CRT (Low Probability)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500 text-white font-black">AVOID</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      The liquidity is swept, but the candle <strong>closes bullish (green)</strong>, showing buyers are still resisting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-xs text-slate-300">
                <span className="font-bold text-amber-400">Solomon King’s Rule:</span> Always demand the confirmation of the close. Never anticipate the close while the candle is still ticking!
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-2"
                  onClick={() => setActiveChapter(2)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-4"
                  onClick={() => setActiveChapter(4)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 4 (Forms of CRT)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 4: Forms of CRT */}
          {activeChapter === 4 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 4 (Page 9)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  The Three Forms of CRT
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  CRT manifests on charts in three distinct structural forms: Classic, Two-Candles, and Multiple Candles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Form 1: Classic CRT */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold w-fit">
                    Form 1
                  </div>
                  <h4 className="text-sm font-bold text-white">Classic CRT</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Parent candle establishes the high and low. Child candle pierces the range boundary with a wick, sweeps liquidity, and instantly closes back inside the parent range.
                  </p>
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    ✓ Cleanest, highest conviction setup
                  </div>
                </div>

                {/* Form 2: Two Candles CRT */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold w-fit">
                    Form 2
                  </div>
                  <h4 className="text-sm font-bold text-white">Two Candles CRT</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The sweep occurs on candle 2, but the reclaim and structural confirmation is delivered by candle 3 closing firmly back inside the parent boundaries.
                  </p>
                  <div className="text-[11px] text-cyan-400 font-semibold">
                    ✓ Extended manipulation absorption
                  </div>
                </div>

                {/* Form 3: Multiple Candles CRT */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold w-fit">
                    Form 3
                  </div>
                  <h4 className="text-sm font-bold text-white">Multiple Candles CRT</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A cluster of small candles consolidates near the boundary before an aggressive sweep and subsequent impulsive expansion back toward the opposite parent extreme.
                  </p>
                  <div className="text-[11px] text-amber-400 font-semibold">
                    ✓ Ideal for multi-session build-ups
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-3"
                  onClick={() => setActiveChapter(3)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-5"
                  onClick={() => setActiveChapter(5)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 5 (Key Level Confluence)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 5: Trading with CRT at Key Levels */}
          {activeChapter === 5 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 5 (Page 10)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Trading with CRT at Key Levels
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  CRT has a significantly higher probability of working when it forms at a <strong>Key Level</strong>, providing institutional confluence.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  What is a Key Level? (5 Pillars of Confirmation)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">1. Old Highs / Old Lows (OL)</span>
                    <span className="text-emerald-400 font-mono font-bold">CRT + OL = H.B CRT</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">2. Fair Value Gap (FVG)</span>
                    <span className="text-emerald-400 font-mono font-bold">CRT + FVG = H.B CRT</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">3. Order Block (OB)</span>
                    <span className="text-emerald-400 font-mono font-bold">CRT + OB = H.B CRT</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">4. Mitigation Block (MB)</span>
                    <span className="text-emerald-400 font-mono font-bold">CRT + MB = H.B CRT</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between sm:col-span-2">
                    <span className="text-slate-300">5. Breaker Block (BB)</span>
                    <span className="text-emerald-400 font-mono font-bold">CRT + BB = Top Tier Execution</span>
                  </div>
                </div>
              </div>

              {/* Official Course PDF Chart Figure 4: SMT Confluence at Key Levels */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/40 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Figure 4 • PDF Page 10 & 59–63
                    </span>
                    <span className="text-xs font-bold text-white">Smart Money Tool (SMT) Divergence Confluence</span>
                  </div>
                  <button
                    onClick={() => {
                      setInspectChart({
                        src: smtDivergenceImg,
                        title: 'SMT Divergence Intermarket Analysis',
                        subtitle: 'Solomon King CRT School PDF Page 10 & 59–63',
                        badge: 'Figure 4 • SMT Divergence',
                        pageRef: 'Pages 10 & 59–63',
                        notes: [
                          'Correlated assets (e.g. EURUSD and GBPUSD) must mirror each other at true institutional turns.',
                          'When one pair takes out liquidity but the other pair refuses to break the level, SMT is confirmed.',
                          'SMT occurring exactly at a CRT Parent Candle boundary provides 90%+ win rate confluence.',
                          'Enter on the non-manipulated asset for cleaner momentum and tighter stops.'
                        ]
                      });
                      setZoomLevel(1);
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Enlarge</span>
                  </button>
                </div>

                <div
                  onClick={() => {
                    setInspectChart({
                      src: smtDivergenceImg,
                      title: 'SMT Divergence Intermarket Analysis',
                      subtitle: 'Solomon King CRT School PDF Page 10 & 59–63',
                      badge: 'Figure 4 • SMT Divergence',
                      pageRef: 'Pages 10 & 59–63',
                      notes: [
                        'Correlated assets (e.g. EURUSD and GBPUSD) must mirror each other at true institutional turns.',
                        'When one pair takes out liquidity but the other pair refuses to break the level, SMT is confirmed.',
                        'SMT occurring exactly at a CRT Parent Candle boundary provides 90%+ win rate confluence.',
                        'Enter on the non-manipulated asset for cleaner momentum and tighter stops.'
                      ]
                    });
                    setZoomLevel(1);
                  }}
                  className="relative rounded-xl overflow-hidden border border-slate-800 cursor-pointer group bg-slate-900"
                >
                  <img
                    src={smtDivergenceImg}
                    alt="SMT Divergence Official PDF Chart"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                      <span>Inspect High-Resolution Chart</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">Institutional Intermarket Secret:</strong> When price hits a CRT key level, never execute blindly. Check your correlated pair! If one pair sweeps liquidity while the second pair stays inside the range, smart money has trapped retail liquidity and the reversal is locked in.
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-4"
                  onClick={() => setActiveChapter(4)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-6"
                  onClick={() => setActiveChapter(6)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 6 (The 3rd Candle Rule)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 6: The 3rd Candle Entry Rule & Multi-Timeframe */}
          {activeChapter === 6 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 6 (Pages 11–15)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  CRT Entry: The 3rd Candle Rule & Multi-Timeframe Execution
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Where do you actually enter? Solomon King’s rule: <strong>The Third Candle is where we look for our execution.</strong>
                </p>
              </div>

              {/* The 3rd Candle Spotlight */}
              <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>The Third Candle Execution Rule</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When you see the third candle, pay close attention. 👀 This is usually the candle that gives you the entry
                  after the CRT setup has been confirmed.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="font-bold text-slate-400">Candle 1</div>
                    <div className="text-[11px] text-slate-300">Parent Range Benchmark</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="font-bold text-slate-400">Candle 2</div>
                    <div className="text-[11px] text-slate-300">Liquidity Sweep Wick</div>
                  </div>
                  <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/50">
                    <div className="font-bold text-emerald-400">Candle 3</div>
                    <div className="text-[11px] text-emerald-300 font-bold">🎯 TRADE EXECUTION</div>
                  </div>
                </div>
              </div>

              {/* Multi-Timeframe Framework */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Multi-Timeframe Fractal Principle
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>NOTE: CRT SETUP IS BEST ON THE HIGHER TIMEFRAME</strong>. Identify the CRT on the Higher Timeframe (e.g., 4-Hour),
                  then drop down to the Lower Timeframe (e.g., 5-Minute or 15-Minute) to find a <strong>CISD (Change In State of Delivery)</strong> or MSS with an FVG!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-emerald-400 font-bold">XAUUSD Example</div>
                    <div className="text-slate-400 mt-0.5">D1 Setup → 15M Entry</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-emerald-400 font-bold">NASDAQ Example</div>
                    <div className="text-slate-400 mt-0.5">H4 Setup → 5M Entry</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-emerald-400 font-bold">AUDUSD Example</div>
                    <div className="text-slate-400 mt-0.5">Weekly Setup → H4 Entry</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-5"
                  onClick={() => setActiveChapter(5)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-8"
                  onClick={() => setActiveChapter(8)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 8 (3-Candles Retracement & BOS)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 7: How to Trade CRT (The 4 Pillars) */}
          {activeChapter === 7 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 7 (Pages 16–17)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  How to Trade CRT: The 4 Pillars
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  CRT becomes infinitely more powerful when combined with market analysis elements rather than traded in isolation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400">1. CRT + Market Structure</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Always trade in the direction of the higher-timeframe structure. Significant after a Break of Structure (BOS) or Change of Character (CHoCH).
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-400">2. CRT + Liquidity</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Look for the manipulation candle to raid existing liquidity (BSL, SSL, old highs/lows) before the distribution move starts.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400">3. CRT + Points of Interest (POIs)</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Formations occurring around Order Blocks, Fair Value Gaps, Breaker Blocks, or Quasimodo Levels (QML) produce highest quality results.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-300">4. CRT + Confirmation</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Rather than entering blindly on the sweep, confirm that manipulation has ended using Lower Timeframe Market Structure Shift (MSS) or CISD.
                  </p>
                </div>
              </div>

              {/* Official Course PDF Chart Figure 2: The ICT 5-Step Model */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-emerald-500/40 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Figure 2 • PDF Pages 16–17 & 53–58
                    </span>
                    <span className="text-xs font-bold text-white">ICT 5-Step Execution Model: Footprint & Displacement</span>
                  </div>
                  <button
                    onClick={() => {
                      setInspectChart({
                        src: ictSetupImg,
                        title: 'ICT 5-Step Institutional Entry Model',
                        subtitle: 'Solomon King CRT School PDF Pages 16-17 & 53-58',
                        badge: 'Figure 2 • ICT Execution Sequence',
                        pageRef: 'Pages 16–17 & 53–58',
                        notes: [
                          'Step 1: Liquidity Sweep (BSL/SSL) takes out retail stops beyond range boundaries.',
                          'Step 2: Order Block (OB) forms as the institutional footprint before momentum.',
                          'Step 3: Fair Value Gap (FVG) creates a 3-candle algorithmic liquidity void.',
                          'Step 4: Displacement breaks previous market structure (MSS/BOS) with conviction body closes.',
                          'Step 5: Retest & Execution occurs inside the 62%-79% OTE bracket for high R:R.'
                        ]
                      });
                      setZoomLevel(1);
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Enlarge</span>
                  </button>
                </div>

                <div
                  onClick={() => {
                    setInspectChart({
                      src: ictSetupImg,
                      title: 'ICT 5-Step Institutional Entry Model',
                      subtitle: 'Solomon King CRT School PDF Pages 16-17 & 53-58',
                      badge: 'Figure 2 • ICT Execution Sequence',
                      pageRef: 'Pages 16–17 & 53–58',
                      notes: [
                        'Step 1: Liquidity Sweep (BSL/SSL) takes out retail stops beyond range boundaries.',
                        'Step 2: Order Block (OB) forms as the institutional footprint before momentum.',
                        'Step 3: Fair Value Gap (FVG) creates a 3-candle algorithmic liquidity void.',
                        'Step 4: Displacement breaks previous market structure (MSS/BOS) with conviction body closes.',
                        'Step 5: Retest & Execution occurs inside the 62%-79% OTE bracket for high R:R.'
                      ]
                    });
                    setZoomLevel(1);
                  }}
                  className="relative rounded-xl overflow-hidden border border-slate-800 cursor-pointer group bg-slate-900"
                >
                  <img
                    src={ictSetupImg}
                    alt="ICT 5-Step Execution Chart"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                      <span>Inspect High-Resolution Chart</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Execution Rule:</strong> Do not enter on the sweep itself. Wait for displacement to form an FVG and break structure. Then place your limit order inside the FVG at the 70.5% sweet spot with invalidation right above the sweep wick.
                </div>
              </div>

              {/* Official Course Image Figure 5: The 1% Risk Protocol & Psychology */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-amber-500/40 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Figure 5 • Mentorship Discipline
                    </span>
                    <span className="text-xs font-bold text-white">The 1% Risk Protocol & Unplugging Psychology</span>
                  </div>
                  <button
                    onClick={() => {
                      setInspectChart({
                        src: riskMindsetImg,
                        title: '1% Risk Protocol & Mindset Discipline',
                        subtitle: 'Trading Knowledge Academy Core Rule',
                        badge: 'Figure 5 • Trading Psychology',
                        pageRef: 'Discipline Masterclass',
                        notes: [
                          'Never risk more than 1% of total account capital per execution.',
                          'Once orders are positioned with predetermined TP & SL, unplug from screens.',
                          'Over-monitoring charts induces emotional sabotage and early exits.',
                          'Treat trading as statistical risk management, not emotional gambling.'
                        ]
                      });
                      setZoomLevel(1);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Enlarge</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div
                    onClick={() => {
                      setInspectChart({
                        src: riskMindsetImg,
                        title: '1% Risk Protocol & Mindset Discipline',
                        subtitle: 'Trading Knowledge Academy Core Rule',
                        badge: 'Figure 5 • Trading Psychology',
                        pageRef: 'Discipline Masterclass',
                        notes: [
                          'Never risk more than 1% of total account capital per execution.',
                          'Once orders are positioned with predetermined TP & SL, unplug from screens.',
                          'Over-monitoring charts induces emotional sabotage and early exits.',
                          'Treat trading as statistical risk management, not emotional gambling.'
                        ]
                      });
                      setZoomLevel(1);
                    }}
                    className="md:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 cursor-pointer group bg-slate-900"
                  >
                    <img
                      src={riskMindsetImg}
                      alt="Risk Management Protocol and Mindset"
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-2 text-xs text-slate-300">
                    <div className="font-bold text-white text-sm">
                      Mentor Titan’s Golden Rule: Execute, Set Alerts, Step Away
                    </div>
                    <p className="leading-relaxed text-slate-400">
                      The biggest enemy to CRT mastery is not the market; it is staring at the screen after entry. When you enter a CRT setup according to the rules, your risk is mathematically defined at 1%.
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[11px]">
                      ✓ 1% Max Risk • ✓ Predefined Take Profit • ✓ Unplug & Let Edge Deliver
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-6"
                  onClick={() => setActiveChapter(6)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-8b"
                  onClick={() => setActiveChapter(8)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 8</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 8: 3-Candles Retracement Rule & Valid BOS */}
          {activeChapter === 8 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 8 (Pages 19–32)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  The Three Candles Retracement Rule & Valid BOS
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Two of the most critical structural rules taught in Solomon King’s CRT School textbook.
                </p>
              </div>

              {/* Rule 1: Three Candles Retracement */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Rule 1: Three Candles Retracement Rule (Pages 20–21)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A retracement or pullback occurs when the price returns to the newly created trading range.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-amber-500/40 text-xs text-amber-300 font-semibold">
                  ⚡ CRITICAL NOTE: For a Retracement to be valid, it MUST have at least THREE candles closing above each other (for a bullish pullback) or below each other (for a bearish pullback)!
                </div>
                <p className="text-[11px] text-slate-400">
                  If price only pulls back with 1 or 2 candles, it is merely noise or an inside bar, NOT a true structural retracement leg.
                </p>
              </div>

              {/* Rule 2: Proper BOS (Body vs Wick) */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Rule 2: Proper Break of Structure (BOS) (Page 29)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In identifying structure, we use the <strong>highest wick in an uptrend</strong> or the <strong>lowest wick in a downtrend</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-emerald-500/10 border border-emerald-500/40 p-3 rounded-lg">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>✓ PROPER BOS</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      The <strong>BODY</strong> of the candlestick closes completely above the highest wick. Trend continuation confirmed!
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/40 p-3 rounded-lg">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>✗ NOT A BOS (Liquidity Sweep)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Only the <strong>WICK</strong> pierces above the level and the body closes below. This is a trap, NOT a BOS!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-7"
                  onClick={() => setActiveChapter(7)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-9"
                  onClick={() => setActiveChapter(9)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 9 (7 Institutional Reference Points)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 9: 7 Institutional Reference Points */}
          {activeChapter === 9 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 9 (Pages 33–39)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  7 Institutional Reference Points
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Institutional Reference Points are footprints that point out specific areas on the charts that smart money has interest in moving future price to.
                </p>
              </div>

              {/* Breaker vs Mitigation Block Comparison */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Mitigation Block vs. Breaker Block: The Decisive Difference (Pages 34–35)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="font-bold text-blue-400">Mitigation Block (MB)</span>
                    <p className="text-slate-300">
                      There is <strong>NO BREAK</strong> of the previous high/low. The swing failed to take liquidity before breaking structure.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30 space-y-1.5">
                    <span className="font-bold text-emerald-400">Breaker Block (BB)</span>
                    <p className="text-slate-300">
                      There <strong>IS A BREAK</strong> above the high (or below low) taking liquidity BEFORE the aggressive displacement breaks structure.
                    </p>
                  </div>
                </div>
              </div>

              {/* FVG Entry Rule: Big vs Small */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Fair Value Gap (FVG) Execution Rules (Page 37)
                  </h4>
                  <div className="flex gap-1.5">
                    <button
                      id="btn-fvg-big"
                      onClick={() => setFvgType('big')}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        fvgType === 'big' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Big FVGs
                    </button>
                    <button
                      id="btn-fvg-small"
                      onClick={() => setFvgType('small')}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        fvgType === 'small' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Small FVGs
                    </button>
                  </div>
                </div>

                {fvgType === 'big' ? (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-emerald-300">Rule for Big Fair Value Gaps:</span>
                    <p className="text-slate-300">
                      For Big FVGs, we wait for price to come to the <strong>50% level (Consequent Encroachment)</strong> of the FVG before activating our trade entry.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-cyan-300">Rule for Small Fair Value Gaps:</span>
                    <p className="text-slate-300">
                      For Small FVGs, we activate our trade immediately from the <strong>tip (first boundary)</strong> of the FVG without waiting for deep retracement.
                    </p>
                  </div>
                )}
              </div>

              {/* Orderblock Validation Checklist */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider">
                  The 3 Requirements for a Valid Orderblock (Pages 38–39)
                </h4>
                <div className="space-y-1.5 text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>1. Create a BOS or MSS:</strong> Must result in energetic displacement breaking structure.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>2. Have an Imbalance:</strong> An adjacent Fair Value Gap must be created by the displacement.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>3. Be Unmitigated:</strong> Price must not have returned and tested the candle yet.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-8"
                  onClick={() => setActiveChapter(8)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-10"
                  onClick={() => setActiveChapter(10)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 10 (PD-Array & Liquidity)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 10: PD-Array & Mastering Liquidity */}
          {activeChapter === 10 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 10 (Pages 40–49)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  PD-Array & Mastering Liquidity
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  PD-Array (Premium / Discount Array) explains how smart money moves price between 50% equilibrium to deliver liquidity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Premium Zone (Above 50%)</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Price is expensive. Smart money seeks to distribute (sell) to retail traders buying high.
                  </p>
                  <div className="text-[11px] font-bold text-rose-300">Rule: Look ONLY for Short Trades here.</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Discount Zone (Below 50%)</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Price is cheap. Smart money seeks to accumulate (buy) from retail traders selling low.
                  </p>
                  <div className="text-[11px] font-bold text-emerald-300">Rule: Look ONLY for Long Trades here.</div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  External vs. Internal Range Liquidity (Pages 48–49)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-amber-400">External-Range Liquidity:</span>
                    <p className="text-slate-300 mt-1">
                      The absolute swing highs and swing lows of the active dealing range where stop runs occur.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-cyan-400">Internal-Range Liquidity:</span>
                    <p className="text-slate-300 mt-1">
                      The Fair Value Gaps and Order Blocks found <em>between</em> the dealing range boundaries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-9"
                  onClick={() => setActiveChapter(9)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-11"
                  onClick={() => setActiveChapter(11)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 11 (Signature Entry Models)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 11: Signature Entry Models (Unicorn, BPR, OB+FVG) */}
          {activeChapter === 11 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 11 (Pages 53–58)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Signature Trade Entry Models
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Solomon King’s favorite high-precision setups: Unicorn Setup, Balance Price Range (BPR), and Orderblock + FVG.
                </p>
              </div>

              <div className="space-y-4">
                {/* Unicorn Model */}
                <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>1. The Unicorn Entry Setup (Page 54)</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Highest Win-Rate
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When price trades into a POI and leaves you with either a <strong>breaker block</strong> or a <strong>mitigation block</strong> in confluence with a <strong>Fair Value Gap (FVG)</strong>.
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800">
                    ⚡ Stop Loss Rule: Place stop loss directly below the recent swing low!
                  </div>
                </div>

                {/* Balance Price Range (BPR) */}
                <div className="bg-slate-950 p-5 rounded-xl border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>2. Balance Price Range (BPR) Setup (Page 55)</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      Overlapping FVGs
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You need to see <strong>two FVGs overlapping or facing each other</strong> from opposite sides of price (usually one big and one small FVG).
                    <strong> The middle of the two is our entry location!</strong>
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                    ⚡ Entry: Exact center overlap | Stop Loss: Below the swing low.
                  </div>
                </div>

                {/* OB + FVG Combo */}
                <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-400" />
                      <span>3. Orderblock + FVG Combo (Page 56)</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Institutional Confluence
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The most powerful combo in institutional trading is a confluence of an Orderblock that has a Fair Value Gap backing it.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-10"
                  onClick={() => setActiveChapter(10)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-12"
                  onClick={() => setActiveChapter(12)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 12 (Trade Entry Confirmation)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 12: Trade Entry Confirmation */}
          {activeChapter === 12 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 12 (Pages 59–63)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Trade Entry Confirmation: 3-Candle Swing Formation
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Waiting for final confirmation inside your POI before putting real capital at risk.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Swing High Entry */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Swing High Confirmation (Short Entry)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You need a <strong>three-candle price action</strong> inside your designated POI:
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc marker:text-rose-400">
                    <li>Candle 1: Approaches the POI.</li>
                    <li>Candle 2: Has the <strong>highest high</strong> of the cluster.</li>
                    <li>Candle 3: <strong>Closes BELOW</strong> the middle candle (Candle 2)!</li>
                  </ul>
                  <div className="bg-rose-500/10 p-2 rounded text-[11px] text-rose-300 font-bold">
                    → Immediate Short Activation
                  </div>
                </div>

                {/* Swing Low Entry */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Swing Low Confirmation (Long Entry)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You need a <strong>three-candle price action</strong> inside your designated POI:
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc marker:text-emerald-400">
                    <li>Candle 1: Approaches the discount POI.</li>
                    <li>Candle 2: Has the <strong>lowest low</strong> of the cluster.</li>
                    <li>Candle 3: <strong>Closes ABOVE</strong> the middle candle (Candle 2)!</li>
                  </ul>
                  <div className="bg-emerald-500/10 p-2 rounded text-[11px] text-emerald-300 font-bold">
                    → Immediate Long Activation
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-11"
                  onClick={() => setActiveChapter(11)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-13"
                  onClick={() => setActiveChapter(13)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 13 (PO3 & Killzones)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 13: PO3 & Killzones */}
          {activeChapter === 13 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 13 (Pages 64–67)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  ICT Power of 3 (PO3) & Killzones Strategy
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  How algorithmic price delivery structures the 24-hour trading day across market sessions.
                </p>
              </div>

              {/* Power of 3 (PO3) */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  The 3 Phases of Market Delivery (PO3)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-cyan-400">1. Accumulation</span>
                    <p className="text-slate-300 mt-1">Asian session creates a tight range, building liquidity pools above and below.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-amber-500/30">
                    <span className="font-bold text-amber-400">2. Manipulation</span>
                    <p className="text-slate-300 mt-1">London Open generates a false breakout (Judas swing) to clear Asian range extremes.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30">
                    <span className="font-bold text-emerald-400">3. Distribution</span>
                    <p className="text-slate-300 mt-1">Price reverses aggressively into the true directional expansion of the daily candle.</p>
                  </div>
                </div>
              </div>

              {/* Key Killzones */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Official ICT Killzone Times (EST)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">Asian Killzone</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">7:00 PM – 10:00 PM EST</div>
                    <p className="text-[11px] text-slate-400 mt-1">Establishes the reference benchmark range.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">London Killzone</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">3:00 AM – 5:00 AM EST</div>
                    <p className="text-[11px] text-slate-400 mt-1">Clears Asian high/low and creates the high/low of the day.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">New York Killzone</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">7:00 AM – 10:00 AM EST</div>
                    <p className="text-[11px] text-slate-400 mt-1">High volume reversal or continuation of London move.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  id="btn-back-chapter-12"
                  onClick={() => setActiveChapter(12)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <button
                  id="btn-next-chapter-14"
                  onClick={() => setActiveChapter(14)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Next: Chapter 14 (Complete 70+ Terms Glossary)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Chapter 14: Complete SMC / ICT Dictionary & Abbreviations (Pages 69–71) */}
          {activeChapter === 14 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Chapter 14 (Pages 69–71)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Complete SMC & ICT Dictionary (70+ Terms)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Official vocabulary reference from Solomon King’s CRT School. Search or filter below.
                </p>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-glossary-search"
                    type="text"
                    placeholder="Search acronym or definition (e.g., FVG, CISD, BOS, Killzone)..."
                    value={searchGlossary}
                    onChange={(e) => setSearchGlossary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['all', 'CRT', 'Structure', 'Levels', 'Liquidity', 'Strategy', 'Session', 'Macro'].map((cat) => (
                    <button
                      key={cat}
                      id={`btn-glossary-filter-${cat}`}
                      onClick={() => setGlossaryCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        glossaryCategory === cat
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {filteredAbbreviations.map((item) => (
                  <div
                    key={item.term}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-slate-700 flex items-start justify-between gap-3 group transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-xs tracking-wider bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {item.term}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase">{item.category}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug pt-0.5">{item.meaning}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(`${item.term} - ${item.meaning}`)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900 transition-colors"
                      title="Copy Term"
                    >
                      {copiedTerm === `${item.term} - ${item.meaning}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  id="btn-back-chapter-13"
                  onClick={() => setActiveChapter(13)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Previous
                </button>
                <div className="text-xs text-slate-400">
                  Showing {filteredAbbreviations.length} of {abbreviations.length} Terms
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
