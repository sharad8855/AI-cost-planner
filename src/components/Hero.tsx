import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Check, Sliders, Shield, Award, Users } from 'lucide-react';
import { AI_MODELS } from '../data/models';
import { formatCurrency, formatNumber } from '../utils';

interface HeroProps {
  onNavigateToCalculator: () => void;
  onNavigateToBudget: () => void;
  onNavigateToComparison: () => void;
  onExploreAllTools: () => void;
  isDarkMode: boolean;
}

export function Hero({ onNavigateToCalculator, onNavigateToBudget, onNavigateToComparison, onExploreAllTools, isDarkMode }: HeroProps) {
  // Mini interactive state of the preview card
  const [selectedModelId, setSelectedModelId] = useState('gpt-4o');
  const [inputTokens, setInputTokens] = useState(1000000);
  const [outputTokens, setOutputTokens] = useState(500000);
  const [requestsPerDay, setRequestsPerDay] = useState(30); // Default to demonstrate requested calculations

  const selectedModel = AI_MODELS.find(m => m.id === selectedModelId) || AI_MODELS[0];

  // Calculations
  const calculatedInputCost = (inputTokens / 1000000) * selectedModel.inputCostPerMillion;
  const calculatedOutputCost = (outputTokens / 1000000) * selectedModel.outputCostPerMillion;
  const totalSingleRequestCost = calculatedInputCost + calculatedOutputCost;

  const dailyCost = totalSingleRequestCost * requestsPerDay;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  // Words helper labels
  const inputWords = Math.round(inputTokens * 0.75);
  const outputWords = Math.round(outputTokens * 0.75);

  // Generate SVG chart path dynamically based on monthly cost
  const chartPoints = [60, 110, 80, 140, 120, 175, monthlyCost > 0 ? Math.min(220, 60 + monthlyCost * 0.5) : 30];
  const maxVal = Math.max(...chartPoints, 200);
  // generate nice curved path
  const svgW = 400;
  const svgH = 120;
  const stepX = svgW / (chartPoints.length - 1);
  const mappedPoints = chartPoints.map((pt, i) => {
    const x = i * stepX;
    // Map pt nicely (invert y)
    const y = svgH - 20 - (pt / maxVal) * (svgH - 40);
    return { x, y };
  });

  let curvedPath = `M ${mappedPoints[0].x} ${mappedPoints[0].y}`;
  for (let i = 0; i < mappedPoints.length - 1; i++) {
    const p0 = mappedPoints[i];
    const p1 = mappedPoints[i+1];
    const cpX1 = p0.x + stepX / 2;
    const cpY1 = p0.y;
    const cpX2 = p1.x - stepX / 2;
    const cpY2 = p1.y;
    curvedPath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-white py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 lg:py-24">
      {/* Background neon glows in the margins, mirroring the mockup */}
      <div className="absolute top-10 right-0 -z-10 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-950/20" />
      <div className="absolute top-40 left-0 -z-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-950/15" />

      {/* Hero Wrapper */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-7 space-y-8" id="hero-marketing-panel">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/15 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-400/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% Free · Open Source · No Login · No API Key</span>
            </div>

            {/* Heavy Elegant Headlines */}
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6.5xl">
              Plan Smarter.
              <br />
              Choose Better.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-300">
                Spend Wisely.
              </span>
            </h1>

            {/* Core Subtitle Paragraph */}
            <p className="max-w-xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Calculate, compare, and optimize AI API costs before you build. Find the best model for your budget in seconds, not hours.
            </p>

            {/* 3 Pill Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center space-x-2 rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 ring-1 ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px]">
                  ✓
                </div>
                <span>No API Key Needed</span>
              </span>
              <span className="inline-flex items-center space-x-2 rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 ring-1 ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px]">
                  ✓
                </div>
                <span>No Account Login</span>
              </span>
              <span className="inline-flex items-center space-x-2 rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 ring-1 ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 text-[10px]">
                  ★
                </div>
                <span>Completely Free Engine</span>
              </span>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onNavigateToCalculator}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl dark:shadow-none transition-all duration-155"
              >
                <span>Try Cost Calculator</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <button
                onClick={onExploreAllTools}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
              >
                <span>Explore All Tools</span>
              </button>
            </div>

            {/* Social Proof Line */}
            <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Dev" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Dev" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Dev" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="Dev" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div className="flex text-amber-400 space-x-0.5">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span><strong>2,000+ developers</strong> are making smarter AI decisions</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Card Block */}
          <div className="mt-12 lg:mt-0 lg:col-span-5" id="hero-quick-calculator-wrapper">
            <div className="relative rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 dark:text-white">Cost Calculator</h3>
                </div>
                
                {/* Model Inline Selector */}
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none hover:bg-slate-100 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <option value="gpt-4o">GPT-4o (OpenAI)</option>
                  <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  <option value="deepseek-chat">DeepSeek Chat</option>
                  <option value="llama-3.1-70b">Llama 3.1 70B</option>
                </select>
              </div>

              {/* Token Inputs side by side */}
              <div className="grid grid-cols-2 gap-4 py-4">
                {/* Input Tokens */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Input Tokens
                  </label>
                  <input
                    type="number"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1 block w-full bg-transparent text-lg font-bold text-slate-900 outline-none focus:text-indigo-600 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                    ~{formatNumber(inputWords)} words
                  </span>
                </div>

                {/* Output Tokens */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Output Tokens
                  </label>
                  <input
                    type="number"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1 block w-full bg-transparent text-lg font-bold text-slate-900 outline-none focus:text-indigo-600 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                    ~{formatNumber(outputWords)} words
                  </span>
                </div>
              </div>

              {/* Visual Breakdown blocks */}
              <div className="grid grid-cols-3 gap-2.5. pb-4.">
                {/* Input Cost block */}
                <div className="rounded-2xl bg-emerald-50/60 p-3 text-left dark:bg-emerald-950/20">
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400">Input Cost</span>
                  <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {formatCurrency(calculatedInputCost)}
                  </div>
                </div>

                {/* Output Cost block */}
                <div className="rounded-2xl bg-blue-50/60 p-3 text-left dark:bg-blue-950/20">
                  <span className="text-[10px] font-semibold text-blue-800 dark:text-blue-400">Output Cost</span>
                  <div className="text-base font-extrabold text-blue-700 dark:text-blue-400 mt-0.5">
                    {formatCurrency(calculatedOutputCost)}
                  </div>
                </div>

                {/* Total Cost block */}
                <div className="rounded-2xl bg-indigo-50/60 p-3 text-left dark:bg-indigo-950/20">
                  <span className="text-[10px] font-semibold text-indigo-800 dark:text-indigo-400">Total Cost</span>
                  <div className="text-base font-extrabold text-indigo-700 dark:text-indigo-400 mt-0.5">
                    {formatCurrency(totalSingleRequestCost)}
                  </div>
                </div>
              </div>

              {/* Sliders for number of daily requests to make it interactive */}
              <div className="my-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Requests Per Day</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{requestsPerDay}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={requestsPerDay}
                  onChange={(e) => setRequestsPerDay(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Extra calculations row */}
              <div className="grid grid-cols-4 gap-2 text-center py-4 bg-slate-50/30 rounded-2xl dark:bg-slate-800/20">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Cost/Req</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(totalSingleRequestCost)}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Daily Cost</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(dailyCost)}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Monthly</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(monthlyCost)}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Yearly</span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(yearlyCost)}
                  </span>
                </div>
              </div>

              {/* SVG sparkline chart preview, matching mockup layout */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Estimated Monthly Cost Sparkline</span>
                  <span className="text-slate-400">Jan - Jun trends</span>
                </div>

                <div className="relative h-20 w-full">
                  <svg className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    <line x1="0" y1="20" x2="100%" y2="20" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                    <line x1="0" y1="50" x2="100%" y2="50" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                    <line x1="0" y1="80" x2="100%" y2="80" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                    
                    {/* Curved sparkline */}
                    <path
                      d={curvedPath}
                      fill="none"
                      stroke="url(#sparkline-gradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Gradient definers */}
                    <defs>
                      <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="50%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#312e81" />
                      </linearGradient>
                    </defs>

                    {/* Dot points */}
                    {mappedPoints.map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r={i === mappedPoints.length - 1 ? "5" : "3.5"}
                        className={i === mappedPoints.length - 1 ? "fill-indigo-600 stroke-white stroke-2" : "fill-indigo-400 stroke-white"}
                      />
                    ))}
                  </svg>

                  {/* Tooltip floating bubble exactly like screenshot mockup */}
                  <div 
                    className="absolute rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-lg dark:bg-slate-800"
                    style={{
                      left: `${mappedPoints[mappedPoints.length - 1].x - 110}px`,
                      top: `${mappedPoints[mappedPoints.length - 1].y - 30}px`,
                    }}
                  >
                    <span className="whitespace-nowrap">{formatCurrency(monthlyCost)} monthly</span>
                  </div>
                </div>

                {/* Month labels footer */}
                <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-2.5">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
