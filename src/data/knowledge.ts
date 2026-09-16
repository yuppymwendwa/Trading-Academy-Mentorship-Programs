import { BusinessInfo, PricingPlan, OnboardingStep, StrategyConcept } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'TRADING KNOWLEDGE',
  founderName: 'Dominic Musyoka',
  mentorMoniker: 'Mentor Titan',
  title: 'Founder & Lead Institutional Mentor',
  description:
    'Full classic classes on forex trading, crypto, and other networks, specializing in ICT and CRT strategies. Founded and taught by Dominic Musyoka (Mentor Titan), focusing on strict risk management, trade confirmation, and institutional liquidity.',
  email: 'yuppymwendwa45@gmail.com',
  whatsapp: '0710339554',
  whatsappUrl: 'https://wa.me/254710339554',
  tiktokHandle: '@yuppydel999',
  tiktokUrl: 'https://www.tiktok.com/@yuppydel999',
  hours: 'Monday - Friday, 8:00 AM - 4:00 PM',
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Full Classic Course',
    price: '$100',
    duration: '2 to 3 months',
    description: 'Comprehensive institutional mastery in ICT & CRT methodologies across Forex, Crypto, and major networks.',
    features: [
      'Complete ICT Institutional Liquidity Framework',
      'Candle Range Theory (CRT) Blueprint',
      'Market Structure: HH, HL, BOS & MSS',
      'Optimal Trade Entry (OTE) 70.5% Sweet Spot',
      'SMT Divergence & Turtle Soup Models',
      'Strict 1% Institutional Risk Management',
      'Direct WhatsApp Mentor Access',
    ],
    popular: true,
  },
  {
    name: 'Mentorship Promotion',
    price: '$32',
    duration: 'Mentorship Duration',
    description: 'Students receive an active FundedNext account. Our master traders execute for you to pass challenges and build initial capital.',
    features: [
      'Active FundedNext Prop Firm Account included',
      'Trading performed for the student during mentorship',
      'Prop firm challenge phase passing guidance',
      'Live execution demonstration',
      'Zero-risk transition into funded trading',
    ],
  },
  {
    name: 'Account Management',
    price: '50/50 Split',
    duration: 'Daily Payouts',
    description: 'Professional high-precision execution on your personal or prop trading account with daily profit distribution.',
    features: [
      '50/50 daily profit sharing',
      'ICT & CRT institutional algorithmic execution',
      'Strict maximum 1% draw risk guardrail',
      'Daily performance transparency',
    ],
  },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    step: 1,
    title: 'Submit Required Documents',
    instruction: 'Prepare your identification details or student profile to verify your enrollment record.',
  },
  {
    step: 2,
    title: 'Complete Payment',
    instruction: 'Send course payment via M-Pesa (01 41 47-35 81) or Binance transfer.',
  },
  {
    step: 3,
    title: 'Forward WhatsApp Confirmation',
    instruction: 'Forward your M-Pesa / Binance transaction confirmation screenshot directly to WhatsApp (0710339554).',
  },
];

export const STRATEGY_CONCEPTS: StrategyConcept[] = [
  {
    id: 'ict-entry-model',
    title: 'ICT 5-Step Entry Model',
    subtitle: 'Institutional Precision Execution',
    tag: 'ICT',
    summary: 'The cornerstone institutional framework for catching high-probability reversals and continuations.',
    details: [
      '1. Liquidity Sweep: Price takes out Buy-Side Liquidity (BSL) or Sell-Side Liquidity (SSL).',
      '2. Order Block (OB): Identification of the last opposing institutional candle before the impulse.',
      '3. Fair Value Gap (FVG): Recognition of the 3-candle imbalance zone created by aggressive repricing.',
      '4. Displacement: Energetic price expansion confirming institutional order flow direction.',
      '5. Retest: Patient wait for price to return into the FVG or Order Block inside OTE.',
    ],
    formulaOrRule: 'Sweep → OB → FVG → Displacement → Retest',
  },
  {
    id: 'ote-fibonacci',
    title: 'Optimal Trade Entry (OTE)',
    subtitle: 'Fibonacci Discount & Premium Zones',
    tag: 'ICT',
    summary: 'Fibonacci measurement defining high-conviction entry zones relative to institutional equilibrium.',
    details: [
      'Equilibrium: The 50.0% level separating Premium (expensive) from Discount (cheap).',
      'Sell Rule: Only sell above 50% in Premium.',
      'Buy Rule: Only buy below 50% in Discount.',
      'OTE Bracket: Retracements between 62.0% and 79.0%.',
      'Institutional Sweet Spot: 70.5% Fibonacci retracement level.',
    ],
    formulaOrRule: '62% - 79% Zone | 70.5% Sweet Spot',
  },
  {
    id: 'crt-theory',
    title: 'Candle Range Theory (CRT)',
    subtitle: 'Micro & Macro Range Mechanics',
    tag: 'CRT',
    summary: 'Treats every candlestick on any timeframe as a self-contained range with defined highs and lows.',
    details: [
      'Parent Candle: Defines the reference range benchmark (High and Low).',
      'Child Candle: The subsequent candle that initiates the setup.',
      'Setup Trigger: Child candle sweeps either the parent high or low to purge liquidity.',
      'Execution Reclaim: Immediate reclaim back inside the parent candle range confirms the trap and entry.',
    ],
    formulaOrRule: 'Child Sweeps Parent Extreme → Reclaims Inside Range',
  },
  {
    id: 'smt-divergence',
    title: 'SMT Divergence',
    subtitle: 'Smart Money Intermarket Tool',
    tag: 'ICT',
    summary: 'Spotting institutional footprint divergence between highly correlated pairs such as EURUSD and GBPUSD.',
    details: [
      'Correlated Pair Divergence: When EURUSD and GBPUSD decouple at structural swing points.',
      'Bullish SMT: EURUSD creates a lower low while GBPUSD fails to confirm and makes a higher low.',
      'Bearish SMT: EURUSD creates a higher high while GBPUSD makes a lower high.',
      'Significance: Proves smart money is quietly accumulating one asset while distributing the other.',
    ],
    formulaOrRule: 'Correlated Asset Non-Confirmation at Key Liquidity Levels',
  },
  {
    id: 'turtle-soup',
    title: 'Turtle Soup Reversal Model',
    subtitle: 'False Sweep Stop-Hunt Exploitation',
    tag: 'ICT',
    summary: 'A signature reversal setup designed to enter right as breakout traders get trapped at major liquidity pools.',
    details: [
      'Target: Previous 20-period, daily, or session highs and lows.',
      'False Breakout: Price pierces the level by 5-15 pips to trigger retail breakout orders and stop losses.',
      'Reversal Candle: Sharp rejection leaving a wick and closing firmly back inside the previous range.',
    ],
    formulaOrRule: 'Pierce Key Level → Immediate Rejection → Invalidation of Breakout',
  },
  {
    id: 'risk-management',
    title: 'Institutional Risk Protocols',
    subtitle: 'Capital Preservation Non-Negotiable Rules',
    tag: 'RISK',
    summary: 'Professional account survival and longevity discipline practiced by institutional proprietary desks.',
    details: [
      'Maximum 1% Risk per Trade: Never risk more than 1% of total account equity on any single position.',
      'Minimum 1:2 Reward-to-Risk (R:R): Only take trades offering at least double your risk.',
      'Trade Confirmation: Never trade before all 5 model criteria align.',
      'Reset Policy: 40% reset fee for students needing to restart uncompleted classes.',
    ],
    formulaOrRule: 'Max 1% Risk | Min 1:2 R:R Ratio',
  },
];
