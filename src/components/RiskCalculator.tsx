import { useState } from 'react';
import { ShieldCheck, AlertTriangle, Calculator, CheckCircle2, TrendingUp, Smartphone, HeartHandshake, EyeOff } from 'lucide-react';

import phoneImg from '../assets/images/risk_mindset_phone_1789586932562.jpg';
import mentorImg from '../assets/images/mentor_dominic_musyoka_1789586898311.jpg';

export default function RiskCalculator() {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [entryPrice, setEntryPrice] = useState<number>(1.0850);
  const [stopLossPrice, setStopLossPrice] = useState<number>(1.0825);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(1.0925);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  // Math
  const dollarRisk = (accountBalance * riskPercent) / 100;
  const stopLossDistance = Math.abs(entryPrice - stopLossPrice);
  const takeProfitDistance = Math.abs(takeProfitPrice - entryPrice);

  // R:R
  const riskRewardRatio = stopLossDistance > 0 ? takeProfitDistance / stopLossDistance : 0;
  const dollarReward = dollarRisk * riskRewardRatio;

  // Assuming EUR/USD standard 1 pip = 0.0001; 1 standard lot = $10 per pip
  const pipDistance = stopLossDistance * 10000;
  const calculatedLotSize = pipDistance > 0 ? (dollarRisk / (pipDistance * 10)) : 0;

  const passesMinRR = riskRewardRatio >= 2.0;
  const isRiskOverLimit = riskPercent > 1.0;

  return (
    <div id="risk-calculator-section" className="space-y-6">
      {/* Title Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Capital Preservation Guardrails</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Institutional Risk & Position Size Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Strictly enforces our core rules: <strong>Maximum 1% risk per trade</strong> and <strong>Minimum 1:2 Reward-to-Risk ratio</strong> for prop firm evaluations and live accounts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-preset-fundednext-10k"
              onClick={() => {
                setAccountBalance(10000);
                setRiskPercent(1.0);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
            >
              $10k FundedNext Preset
            </button>
            <button
              id="btn-preset-fundednext-50k"
              onClick={() => {
                setAccountBalance(50000);
                setRiskPercent(1.0);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
            >
              $50k Preset
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Trade Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Account Balance ($)</label>
              <input
                id="input-account-balance"
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">Risk Percentage (%)</label>
                <span className={`text-[11px] font-bold ${isRiskOverLimit ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {riskPercent}% (Max: 1%)
                </span>
              </div>
              <input
                id="input-risk-percent"
                type="number"
                step="0.1"
                min="0.1"
                max="5"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
                className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none ${
                  isRiskOverLimit ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-500'
                }`}
              />
            </div>
          </div>

          {isRiskOverLimit && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Violation of Academy Rule:</strong> Maximum allowed risk is 1.0% per trade. Over-risking invalidates institutional trade qualification and FundedNext prop firm rules.
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Order Direction</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="btn-direction-buy"
                  onClick={() => {
                    setTradeType('buy');
                    if (entryPrice < stopLossPrice) {
                      setStopLossPrice(entryPrice - 0.0025);
                      setTakeProfitPrice(entryPrice + 0.0060);
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    tradeType === 'buy'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Buy (Long)
                </button>
                <button
                  type="button"
                  id="btn-direction-sell"
                  onClick={() => {
                    setTradeType('sell');
                    if (entryPrice > stopLossPrice) {
                      setStopLossPrice(entryPrice + 0.0025);
                      setTakeProfitPrice(entryPrice - 0.0060);
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    tradeType === 'sell'
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Sell (Short)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Entry Price</label>
                <input
                  id="input-calc-entry"
                  type="number"
                  step="0.0001"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Stop Loss (Invalidation)</label>
                <input
                  id="input-calc-sl"
                  type="number"
                  step="0.0001"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Take Profit (Target)</label>
                <input
                  id="input-calc-tp"
                  type="number"
                  step="0.0001"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Risk & Reward Output</span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  passesMinRR
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {passesMinRR ? '✓ R:R Valid (≥ 1:2)' : '⚠ Insufficient R:R (< 1:2)'}
              </span>
            </h3>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Max Capital Risk</span>
                <div className="text-2xl font-black text-rose-400 mt-1">
                  ${dollarRisk.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-[10px] text-slate-500">{riskPercent}% of ${accountBalance.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Projected Profit</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  ${dollarReward.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-[10px] text-slate-500">{(riskPercent * riskRewardRatio).toFixed(1)}% gain target</span>
              </div>
            </div>

            {/* Reward to Risk Ratio Banner */}
            <div className={`p-4 rounded-xl border mb-4 ${
              passesMinRR
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider">Reward-to-Risk (R:R)</span>
                  <div className="text-2xl font-black mt-0.5">
                    1 : {riskRewardRatio.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold tracking-wider">Stop Invalidation</span>
                  <div className="text-lg font-mono font-bold mt-0.5">
                    {pipDistance.toFixed(1)} pips
                  </div>
                </div>
              </div>
            </div>

            {/* Lot Size Recommendation */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400">Position Size Execution</span>
                  <div className="text-xl font-black text-white mt-0.5">
                    {calculatedLotSize.toFixed(2)} <span className="text-xs font-normal text-slate-400">Standard Lots</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-slate-400">Micro Lots</span>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                    {(calculatedLotSize * 100).toFixed(0)} micros
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span>Trading Knowledge Academy Rules: Max 1% Risk • Min 1:2 R:R</span>
            <span className="text-emerald-400 font-semibold">Prop Firm Protected</span>
          </div>
        </div>
      </div>

      {/* Mentor Titan: Risk Psychology & The "No Internet" Unplugging Rule */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-48 shrink-0">
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-xl shadow-cyan-950/40">
              <img
                src={phoneImg}
                alt="Risk Psychology - Step Away From The Charts"
                referrerPolicy="no-referrer"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">
                Mindset Discipline
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={mentorImg}
                alt="Dominic Musyoka"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-emerald-500"
              />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Dominic Musyoka (Mentor Titan) • Psychology Principle
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              "The Greatest Risk in Trading Isn't the Market — It's Overtrading."
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Why do 90% of retail traders blow funded accounts? Because they stare at charts all day and force trades when no edge exists. 
              Our academy teaches you the <strong>"Unplugging Protocol"</strong>: execute your predetermined ICT/CRT setup inside your killzone, respect your 1% maximum risk limit, and then <em>step away from the screen</em>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-emerald-400 block mb-0.5">1. Pre-Defined Risk</span>
                Never enter without an exact dollar stop loss calculated on your account size.
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-cyan-400 block mb-0.5">2. Walk Away Rule</span>
                1 trade taken = Close TradingView. Enjoy nature, study, and let the trade play out.
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-400 block mb-0.5">3. 40% Class Reset</span>
                Fairness policy: if life interrupts your study, reset for 40% rather than losing progress.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
