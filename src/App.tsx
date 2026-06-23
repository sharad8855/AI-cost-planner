import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CostCalculator } from './components/CostCalculator';
import { BudgetPlanner } from './components/BudgetPlanner';
import { ModelComparison } from './components/ModelComparison';
import { PopularModels } from './components/PopularModels';
import { Footer } from './components/Footer';
import { ProviderLogo } from './components/ProviderLogo';
import { AI_MODELS } from './data/models';
import { formatCurrency } from './utils';
import { AIModel } from './types';
import { 
  Calculator, 
  Wallet, 
  Columns, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  CheckCircle, 
  Flame, 
  TrendingUp, 
  Award,
  DollarSign, 
  Grid,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<string>('home'); // 'home' | 'calculator' | 'budget' | 'comparison' | 'pricing'
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeModelIdForCalculator, setActiveModelIdForCalculator] = useState<string>('gpt-4o');
  
  const [models, setModels] = useState<AIModel[]>(AI_MODELS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<number>(0);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Trigger sync function
  const triggerSync = async (force = false) => {
    try {
      setIsSyncing(true);
      setSyncError(null);
      const url = force ? '/api/models?force=true' : '/api/models';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.models)) {
        setModels(data.models);
        if (data.lastSyncTime) {
          setLastSyncTime(data.lastSyncTime);
        }
        if (data.error) {
          setSyncError(data.error);
        }
      }
    } catch (err: any) {
      console.error('[OpenRouter Sync Client Error]', err);
      setSyncError(err.message || String(err));
    } finally {
      setIsSyncing(false);
    }
  };

  // Initial load
  useEffect(() => {
    triggerSync(false);
  }, []);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigateToModelInCalculator = (modelId: string) => {
    setActiveModelIdForCalculator(modelId);
    setView('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToHow = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-200 overflow-x-hidden">
      
      {/* Universal Sticky Header */}
      <Header 
        currentView={currentView} 
        setView={(view) => {
          setView(view);
          window.scrollTo(0, 0);
        }} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* Sub navigation workspace bar for quick switching between tools */}
      {currentView !== 'home' && (
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/50 dark:border-slate-850/60 py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              <button
                onClick={() => setView('home')}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-white dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition"
              >
                ← Back Home
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              
              {/* Tool Option 1 */}
              <button
                onClick={() => setView('calculator')}
                className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  currentView === 'calculator'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                    : 'text-slate-650 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Calculator className="h-3.5 w-3.5" />
                <span>Cost Calculator</span>
              </button>

              {/* Tool Option 2 */}
              <button
                onClick={() => setView('budget')}
                className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  currentView === 'budget'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                    : 'text-slate-650 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Wallet className="h-3.5 w-3.5" />
                <span>Budget Planner</span>
              </button>

              {/* Tool Option 3 */}
              <button
                onClick={() => setView('comparison')}
                className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  currentView === 'comparison'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                    : 'text-slate-650 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Columns className="h-3.5 w-3.5" />
                <span>Model Comparison</span>
              </button>
            </div>

            <div className="flex items-center space-x-2.5">
              {syncError && (
                <span className="text-[10px] text-rose-600 font-extrabold max-w-xs truncate cursor-help" title={syncError}>
                  ⚠️ Sync Err
                </span>
              )}
              <div className="text-[10px] text-indigo-700 font-extrabold dark:text-indigo-300 flex items-center bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1.5 rounded-xl shrink-0">
                <span className={`h-2 w-2 rounded-full mr-1.5 ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span>OpenRouter: {models.length} Models {lastSyncTime > 0 ? "Live" : "Static"}</span>
              </div>
              <button
                disabled={isSyncing}
                onClick={() => triggerSync(true)}
                title="Force refresh dynamic models and prices from OpenRouter API"
                className={`flex items-center space-x-1 p-1.5 rounded-xl border border-slate-205 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800 transition ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-[10px] font-bold pr-0.5">Sync Live Rates</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE (Matches the rich mockup) */}
        {currentView === 'home' && (
          <div className="animate-fadeIn">
            
            {/* 1. Hero Area */}
            <Hero 
              onNavigateToCalculator={() => setView('calculator')}
              onNavigateToBudget={() => setView('budget')}
              onNavigateToComparison={() => setView('comparison')}
              onExploreAllTools={() => {
                const el = document.getElementById('feature-promotional-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              isDarkMode={isDarkMode}
            />

            {/* 2. Trusted By Brands Ribbon */}
            <section className="border-t border-b border-slate-100 bg-white/50 py-8 dark:border-slate-800 dark:bg-slate-900/10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Trusted by developers building with the best AI models
                </p>
                
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60 hover:opacity-85 transition-opacity">
                  {/* OpenAI */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <ProviderLogo provider="openai" size="xs" />
                    <span>OpenAI</span>
                  </div>
                  {/* Google */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <ProviderLogo provider="google" size="xs" />
                    <span>Google</span>
                  </div>
                  {/* Anthropic */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <ProviderLogo provider="anthropic" size="xs" />
                    <span>Anthropic</span>
                  </div>
                  {/* DeepSeek */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <ProviderLogo provider="deepseek" size="xs" />
                    <span>DeepSeek</span>
                  </div>
                  {/* Meta */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <ProviderLogo provider="meta" size="xs" />
                    <span>Meta</span>
                  </div>
                  {/* Mistral AI */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <ProviderLogo provider="mistral" size="xs" />
                    <span>Mistral AI</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">• & More</span>
                </div>
              </div>
            </section>

            {/* 3. Three Promotional Feature Cards */}
            <section className="py-16 sm:py-20" id="feature-promotional-section">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  
                  {/* Card 1: AI Cost Calculator */}
                  <div 
                    onClick={() => setView('calculator')}
                    className="group relative flex flex-col justify-between cursor-pointer rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-indigo-150 transition-all dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                    id="promo-calculator"
                  >
                    <div>
                      {/* Micro Illustration Icon badge */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <Calculator className="h-5 w-5" />
                      </div>
                      
                      <h4 className="mt-5 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                        AI Cost Calculator
                      </h4>
                      <p className="mt-2.5 text-xs. leading-relaxed text-slate-500 dark:text-slate-400">
                        Calculate exact API costs based on your token usage and requests.
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="mt-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">✓</span>
                          <span>Input & output token calculation</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">✓</span>
                          <span>Cost per request, daily, monthly, yearly</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">✓</span>
                          <span>Support for all major AI models</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">✓</span>
                          <span>Real-time pricing updates</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={(e) => { e.stopPropagation(); setView('calculator'); }}
                        className="inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 dark:shadow-none transition"
                      >
                        <span>Calculate Costs</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Budget Planner */}
                  <div 
                    onClick={() => setView('budget')}
                    className="group relative flex flex-col justify-between cursor-pointer rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-indigo-150 transition-all dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                    id="promo-budget"
                  >
                    <div>
                      {/* Micro Illustration Icon badge */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        <Wallet className="h-5 w-5" />
                      </div>
                      
                      <h4 className="mt-5 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                        Budget Planner
                      </h4>
                      <p className="mt-2.5 text-xs. leading-relaxed text-slate-500 dark:text-slate-400">
                        Find the best AI models that fit within your monthly budget.
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="mt-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">✓</span>
                          <span>Enter your monthly budget</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">✓</span>
                          <span>Get usage estimates for each model</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">✓</span>
                          <span>Find cheapest & best value options</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">✓</span>
                          <span>Perfect for startups & developers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={(e) => { e.stopPropagation(); setView('budget'); }}
                        className="inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-105 hover:bg-indigo-700 dark:shadow-none transition"
                      >
                        <span>Plan My Budget</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Model Comparison */}
                  <div 
                    onClick={() => setView('comparison')}
                    className="group relative flex flex-col justify-between cursor-pointer rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-indigo-150 transition-all dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                    id="promo-comparison"
                  >
                    <div>
                      {/* Micro Illustration Icon badge */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                        <Columns className="h-5 w-5" />
                      </div>
                      
                      <h4 className="mt-5 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                        Model Comparison
                      </h4>
                      <p className="mt-2.5 text-xs. leading-relaxed text-slate-500 dark:text-slate-400">
                        Compare AI models side by side across key performance metrics.
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="mt-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-[9px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-400">✓</span>
                          <span>Cost, speed, context window</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-[9px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-400">✓</span>
                          <span>Coding & reasoning performance</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-[9px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-400">✓</span>
                          <span>Best use cases for each model</span>
                        </li>
                        <li className="flex items-center space-x-2.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-[9px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-400">✓</span>
                          <span>Make data-driven decisions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={(e) => { e.stopPropagation(); setView('comparison'); }}
                        className="inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-purple-600 py-3 text-xs font-bold text-white shadow-md shadow-purple-100 hover:bg-purple-700 dark:shadow-none transition"
                      >
                        <span>Compare Models</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 4. How It Works Timeline Matrix */}
            <section className="py-16 bg-slate-50/20 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-850" id="how-it-works">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Centered title */}
                <div className="text-center mb-14">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Clear Workflow</span>
                  <h3 className="mt-2 text-2.5xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center space-x-2">
                    <span>✨ How It Works ✨</span>
                  </h3>
                </div>

                {/* 4 elements timeline columns */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 relative">
                  {/* Decorative dashed link line connecting columns on desktop */}
                  <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-0.5 border-t border-dashed border-slate-205 -z-10 dark:border-slate-800" />
                  
                  {/* Step 1 */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 font-display text-sm font-bold text-indigo-605 dark:bg-indigo-950 dark:text-indigo-400">
                      1
                    </div>
                    <h5 className="mt-4 font-display font-bold text-sm text-slate-900 dark:text-white">Choose a Tool</h5>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      Pick from Cost Calculator, Budget Planner, or Model Comparison.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-display text-sm font-bold text-blue-605 dark:bg-blue-950 dark:text-blue-400">
                      2
                    </div>
                    <h5 className="mt-4 font-display font-bold text-sm text-slate-900 dark:text-white">Enter Your Details</h5>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      Add token usage, budget, or select models to compare.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 font-display text-sm font-bold text-emerald-605 dark:bg-emerald-950 dark:text-emerald-400">
                      3
                    </div>
                    <h5 className="mt-4 font-display font-bold text-sm text-slate-900 dark:text-white">Get Instant Insights</h5>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      Our smart engine crunches the numbers in seconds.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 font-display text-sm font-bold text-pink-605 dark:bg-pink-950 dark:text-pink-400">
                      4
                    </div>
                    <h5 className="mt-4 font-display font-bold text-sm text-slate-900 dark:text-white">Make Smarter Decisions</h5>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      Choose the best model for your usecase and budget with confidence.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* 5. Popular Models Deck */}
            <PopularModels onSelectModel={handleNavigateToModelInCalculator} isDarkMode={isDarkMode} models={models} />

            {/* 6. Footer Call-to-action Blue Gradient Banner */}
            <section className="py-12 md:py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3.5xl bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-805 px-8 py-12 text-center text-white shadow-2xl dark:from-slate-850 dark:via-blue-950 dark:to-slate-850 dark:shadow-none">
                  
                  {/* Rocket mock outline or subtle stars floating */}
                  <div className="absolute top-1/2 left-8 -z-10 -translate-y-1/2 select-none opacity-25 text-8xl shrink-0">🚀</div>
                  <div className="absolute bottom-4 right-10 -z-10 select-none opacity-25 text-8xl shrink-0">⭐</div>

                  <h3 className="font-display text-2.5xl sm:text-3.5xl font-black shrink-0">
                    Ready to build smarter AI products?
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
                    Join thousands of developers who are saving money and making better AI decisions every day. Take control of your recurring AI API expenditure.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button
                      onClick={() => { setView('calculator'); window.scrollTo(0,0); }}
                      className="rounded-xl bg-white px-7 py-3 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-50 hover:scale-[1.01] active:scale-100 transition shrink-0"
                    >
                      Get Started Now →
                    </button>
                    
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 rounded-xl border border-white/33 bg-white/10 px-7 py-3 text-xs font-bold text-white hover:bg-white/20 transition shrink-0"
                    >
                      <span>★ Star on GitHub</span>
                    </a>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: FULL DETAILED COST CALCULATOR */}
        {currentView === 'calculator' && (
          <div className="animate-fadeIn">
            <CostCalculator models={models} />
          </div>
        )}

        {/* VIEW 3: BUDGET PLANNER */}
        {currentView === 'budget' && (
          <div className="animate-fadeIn">
            <BudgetPlanner models={models} />
          </div>
        )}

        {/* VIEW 4: MODEL COMPARISON */}
        {currentView === 'comparison' && (
          <div className="animate-fadeIn">
            <ModelComparison models={models} />
          </div>
        )}

        {/* VIEW 5: MODEL PRICING LIST TABLE SHEETS */}
        {currentView === 'pricing' && (
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fadeIn">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Grid className="h-4 w-4" />
                <span>Reference Pricing Database</span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Detailed AI Model Rates
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl text-sm">
                A complete database of current official token pricing rates per 1,000,000 tokens for leading LLMs, updated dynamically.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-850 dark:bg-slate-900 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-150 dark:divide-slate-800 text-left text-sm">
                <thead className="bg-slate-50/50 dark:bg-slate-850/40 text-slate-400 dark:text-slate-550 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4">AI Model</th>
                    <th scope="col" className="px-6 py-4">Provider</th>
                    <th scope="col" className="px-6 py-4">Input Rate (/1M)</th>
                    <th scope="col" className="px-6 py-4">Output Rate (/1M)</th>
                    <th scope="col" className="px-6 py-4">Context Window</th>
                    <th scope="col" className="px-6 py-4">Velocity</th>
                    <th scope="col" className="px-6 py-4">Strengths Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {models.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/45 dark:hover:bg-slate-850/10">
                      <td className="px-6 py-4 font-bold text-slate-950 dark:text-white flex items-center space-x-2.5">
                        <ProviderLogo provider={m.provider} size="xs" />
                        <span>{m.name}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{m.provider}</td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-slate-100">{formatCurrency(m.inputCostPerMillion, 'USD')}</td>
                      <td className="px-6 py-4 font-mono font-bold text-indigo-650 dark:text-indigo-400">{formatCurrency(m.outputCostPerMillion, 'USD')}</td>
                      <td className="px-6 py-4 font-mono">{m.contextWindow}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {m.speed}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                          {m.strength}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Universal Sticky Footer */}
      <Footer setView={(view) => {
        setView(view);
        window.scrollTo(0, 0);
      }} />

    </div>
  );
}
