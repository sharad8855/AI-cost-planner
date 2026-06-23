import React, { useState } from 'react';
import { Wallet, Briefcase, Sliders, ArrowUpRight, TrendingUp, HelpCircle, AlertCircle, Sparkles, CheckCircle, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AI_MODELS, USE_CASES } from '../data/models';
import { formatCurrency, formatNumber, EXCHANGE_RATE_USD_TO_INR, getModelReleaseTime } from '../utils';
import { ProviderLogo } from './ProviderLogo';
import { UseCaseType, AIModel } from '../types';

interface BudgetPlannerProps {
  models?: AIModel[];
}

export function BudgetPlanner({ models }: BudgetPlannerProps) {
  const modelsList = models || AI_MODELS;
  const [budgetAmount, setBudgetAmount] = useState<number>(5000); // Defaults to ₹5,000 as requested in example
  const [budgetCurrency, setBudgetCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<UseCaseType>('chatbot');

  // Search and Pagination States
  const [searchDraft, setSearchDraft] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'cheapest' | 'expensive'>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Allow custom tokens sizes under selected use-case
  const activeUseCase = USE_CASES.find(u => u.id === selectedUseCaseId) || USE_CASES[0];
  const [customInputTokens, setCustomInputTokens] = useState<number>(activeUseCase.avgInputTokens);
  const [customOutputTokens, setCustomOutputTokens] = useState<number>(activeUseCase.avgOutputTokens);
  const [customizing, setCustomizing] = useState<boolean>(false);

  // When use-case changes, load default templates
  const handleUseCaseChange = (id: UseCaseType) => {
    setSelectedUseCaseId(id);
    const selected = USE_CASES.find(u => u.id === id);
    if (selected) {
      setCustomInputTokens(selected.avgInputTokens);
      setCustomOutputTokens(selected.avgOutputTokens);
    }
  };

  // Convert budget to USD for generic model comparison inside calculation
  const budgetInUSD = budgetCurrency === 'INR' 
    ? budgetAmount / EXCHANGE_RATE_USD_TO_INR 
    : budgetAmount;

  const currentInputTokens = customizing ? customInputTokens : activeUseCase.avgInputTokens;
  const currentOutputTokens = customizing ? customOutputTokens : activeUseCase.avgOutputTokens;

  // Let's compute estimated requests supportable for ALL models
  const modelRecommendations = modelsList.map(m => {
    const singleRequestCostUSD = 
      ((currentInputTokens / 1000000) * m.inputCostPerMillion) + 
      ((currentOutputTokens / 1000000) * m.outputCostPerMillion);

    const estimatedRequests = singleRequestCostUSD > 0 
      ? Math.floor(budgetInUSD / singleRequestCostUSD) 
      : 0;

    return {
      model: m,
      singleCostUSD: singleRequestCostUSD,
      estimatedRequests,
    };
  }).sort((a, b) => b.estimatedRequests - a.estimatedRequests); // Highest allowance first

  // Apply filters in BudgetPlanner
  const filteredRecommendations = modelRecommendations.filter(rec => {
    // Provider match
    const matchesProvider = selectedProvider === 'All' || 
      rec.model.provider.toLowerCase() === selectedProvider.toLowerCase() ||
      (selectedProvider === 'Mistral' && rec.model.provider.toLowerCase().includes('mistral'));
    
    // Text search query match
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' ||
      rec.model.name.toLowerCase().includes(query) ||
      rec.model.provider.toLowerCase().includes(query) ||
      rec.model.bestFor.toLowerCase().includes(query) ||
      rec.model.strength.toLowerCase().includes(query);

    return matchesProvider && matchesSearch;
  });

  // Apply sorting
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    if (sortBy === 'latest') {
      return getModelReleaseTime(b.model) - getModelReleaseTime(a.model);
    } else if (sortBy === 'cheapest') {
      return b.estimatedRequests - a.estimatedRequests;
    } else if (sortBy === 'expensive') {
      return a.estimatedRequests - b.estimatedRequests;
    }
    return 0;
  });

  // Paginated calculations
  const totalItems = sortedRecommendations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const activePage = Math.min(currentPage, totalPages);
  const paginatedRecommendations = sortedRecommendations.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Categorize standard badges based on capabilities and cost
  // Cheapest Option: Highest amount of estimated requests
  // Best Value Model: GPT-4o Mini or Gemini Flash depending on rank
  // Most Powerful Model Within Budget: GPT-4o or Claude Sonnet if they support at least 2,000 requests
  const cheapestModelId = modelRecommendations[0]?.model.id;
  
  // Find Best Value (We can flag Gemini Flash / GPT-4o Mini / DeepSeek)
  const bestValueModelId = 'gemini-1.5-flash';

  // Most powerful within budget (highest cost model that still supports at least 2,000 requests)
  const powerModels = modelRecommendations
    .filter(rec => rec.estimatedRequests >= 2000 && (rec.model.id === 'gpt-4o' || rec.model.id === 'claude-3.5-sonnet' || rec.model.id === 'gemini-1.5-pro'))
    .sort((a, b) => b.singleCostUSD - a.singleCostUSD); // Most expensive first

  const mostPowerfulId = powerModels[0]?.model.id || 'gpt-4o';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="budget-planner-section">
      
      {/* Title Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
          <Wallet className="h-4 w-4" />
          <span>Intelligent Allocation</span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Budget Planner
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
          Find which AI models fit safely inside your budget. Input your available funds to reveal how many API requests each model can serve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Input Configuration block */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-5 flex items-center space-x-2">
              <Sliders className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Planner Inputs</span>
            </h3>

            <div className="space-y-5">
              {/* Currency + Budget Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Monthly Budget
                  </label>
                  
                  {/* Currency selector toggle */}
                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
                    <button 
                      onClick={() => {
                        setBudgetAmount(budgetCurrency === 'USD' ? Math.round(budgetAmount * EXCHANGE_RATE_USD_TO_INR) : budgetAmount);
                        setBudgetCurrency('INR');
                      }}
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md transition ${budgetCurrency === 'INR' ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}
                    >
                      INR (₹)
                    </button>
                    <button 
                      onClick={() => {
                        setBudgetAmount(budgetCurrency === 'INR' ? Math.round(budgetAmount / EXCHANGE_RATE_USD_TO_INR) : budgetAmount);
                        setBudgetCurrency('USD');
                      }}
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md transition ${budgetCurrency === 'USD' ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                <div className="relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden dark:border-slate-800 dark:bg-slate-950">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-extrabold text-base">
                    {budgetCurrency === 'INR' ? '₹' : '$'}
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent py-3 pl-10 pr-4 text-lg font-bold text-slate-900 focus:outline-none dark:text-white"
                  />
                </div>
              </div>

              {/* Use Case Selection Checklist */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select Use Case Use template
                </label>
                <div className="space-y-2">
                  {USE_CASES.map((uc) => (
                    <button
                      key={uc.id}
                      onClick={() => handleUseCaseChange(uc.id as UseCaseType)}
                      className={`w-full flex items-center justify-between rounded-xl p-3 border text-left transition ${
                        selectedUseCaseId === uc.id
                          ? 'border-indigo-600 bg-indigo-50/10 dark:border-indigo-400 dark:bg-indigo-950/20'
                          : 'border-slate-100 hover:bg-slate-50/50 dark:border-slate-850 dark:bg-slate-850/20'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">{uc.name}</span>
                        <span className="block text-[10px] text-slate-400 truncate mt-0.5">{uc.description}</span>
                      </div>
                      <Briefcase className={`h-4 w-4 shrink-0 ${selectedUseCaseId === uc.id ? 'text-indigo-605' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle custom token bounds */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCustomizing(!customizing)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center space-x-1"
                >
                  <span>{customizing ? '✓ Lock custom configurations' : '✎ Customize use-case token bounds'}</span>
                </button>

                {customizing && (
                  <div className="mt-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 dark:bg-slate-850/40 dark:border-slate-800 space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
                        Average Input Tokens
                      </label>
                      <input 
                        type="number" 
                        value={customInputTokens}
                        onChange={(e) => setCustomInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-xs font-semibold p-2 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
                        Average Output Tokens
                      </label>
                      <input 
                        type="number" 
                        value={customOutputTokens}
                        onChange={(e) => setCustomOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-xs font-semibold p-2 rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Right Output Recommendations List block */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Key Insights banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Cheapest Banner */}
            <div className="rounded-2xl border border-teal-100 bg-teal-50/30 p-4 dark:border-teal-900/30 dark:bg-teal-950/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-widest">Cheapest Option</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 text-[10px]">✓</span>
              </div>
              <div className="mt-2.5 font-display text-lg font-extrabold text-slate-900 dark:text-white">
                {modelsList.find(m => m.id === cheapestModelId)?.name || 'DeepSeek Chat'}
              </div>
              <p className="text-[10px] text-slate-450 mt-1">Serves the absolute maximum quantity of requests.</p>
            </div>

            {/* Best Value Banner */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-widest">Best Value Model</span>
                <TrendingUp className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="mt-2.5 font-display text-lg font-extrabold text-slate-900 dark:text-white">
                Gemini 1.5 Flash
              </div>
              <p className="text-[10px] text-slate-450 mt-1">Stellar speed, 1M+ context, and premium reliability.</p>
            </div>

            {/* Most Powerful Banner */}
            <div className="rounded-2xl border border-purple-100 bg-purple-50/30 p-4 dark:border-purple-900/30 dark:bg-purple-950/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-800 dark:text-purple-400 uppercase tracking-widest">Most Powerful within budget</span>
                <Sparkles className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="mt-2.5 font-display text-lg font-extrabold text-slate-900 dark:text-white">
                {modelsList.find(m => m.id === mostPowerfulId)?.name || 'GPT-4o'}
              </div>
              <p className="text-[10px] text-slate-450 mt-1">Highest reasoning caliber achievable within budget.</p>
            </div>

          </div>

          {/* Core Table listing estimating request quantities */}
          <div className="rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/30 dark:border-slate-850 dark:bg-slate-900 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                  Estimated Requests supported by budget: {budgetCurrency === 'INR' ? '₹' : '$'}{formatNumber(budgetAmount)} / month
                </h4>
                <p className="text-[10px] text-slate-405 mt-0.5">Calculated using template bounds</p>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 self-start md:self-center">
                Template: {activeUseCase.name}
              </span>
            </div>

            {/* Search Input, Clear details & Interactive Search Button + Quick Brand Filter */}
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row gap-2.5">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search model name, provider, strength, capabilities..."
                    value={searchDraft}
                    onChange={(e) => setSearchDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearchQuery(searchDraft);
                        setCurrentPage(1);
                      }
                    }}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-950 dark:text-white font-medium shadow-2xs"
                  />
                  {searchDraft && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchDraft('');
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort Option Control */}
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as any);
                      setCurrentPage(1);
                    }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-950 dark:text-white font-bold cursor-pointer shadow-3xs"
                    style={{ minWidth: '170px' }}
                  >
                    <option value="latest">Latest Released (Newest First)</option>
                    <option value="cheapest">Max Requests (Cheapest first)</option>
                    <option value="expensive">Reasoning Power (Premium first)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery(searchDraft);
                    setCurrentPage(1);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold px-4 py-2 text-xs rounded-xl transition duration-150 shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center space-x-1.5"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Search</span>
                </button>
              </div>

              {/* Provider Quick Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-450 font-extrabold mr-1">Brand:</span>
                {['All', 'Google', 'OpenAI', 'Anthropic', 'Meta', 'Mistral'].map((prov) => {
                  const isSelected = selectedProvider === prov;
                  return (
                    <button
                      key={prov}
                      onClick={() => {
                        setSelectedProvider(prov);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all duration-150 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs dark:bg-indigo-500'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {prov}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List Table with Pagination subset */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedRecommendations.length > 0 ? (
                paginatedRecommendations.map(({ model, singleCostUSD, estimatedRequests }) => {
                  const isCheapest = model.id === cheapestModelId;
                  const isBestValue = model.id === bestValueModelId;
                  const isMostPowerful = model.id === mostPowerfulId;

                  const singleRequestCostLocal = budgetCurrency === 'INR' 
                    ? singleCostUSD * EXCHANGE_RATE_USD_TO_INR
                    : singleCostUSD;

                  return (
                    <div 
                      key={model.id}
                      className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/55 dark:hover:bg-slate-850/15 transition duration-150"
                    >
                      {/* Model Details */}
                      <div className="flex items-start space-x-3.5">
                        <ProviderLogo provider={model.provider} size="md" className="mt-1" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-slate-900 dark:text-white text-base">{model.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 capitalize px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                              {model.provider}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Single Request Cost: <strong className="text-slate-700 dark:text-slate-300 font-bold">{formatCurrency(singleRequestCostLocal / EXCHANGE_RATE_USD_TO_INR, 'USD')}</strong>
                          </div>
                          <div className="text-[10px] text-slate-450 mt-1 max-w-sm md:max-w-md">
                            Best suited for {model.bestFor.toLowerCase()}.
                          </div>
                          <div className="mt-1 flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                            <span>Context: {model.contextWindow}</span>
                            <span>•</span>
                            <span>Speed: {model.speed}</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculated Requests budget volume and progress pill */}
                      <div className="md:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-none border-slate-100 pt-3 md:pt-0 gap-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-400">Supported Requests</div>
                          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5" id={`rec-est-${model.id}`}>
                            {estimatedRequests > 0 ? `${formatNumber(estimatedRequests)}+` : '0 requests'}
                          </div>
                        </div>

                        {/* Display Badges */}
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {isCheapest && (
                            <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-800 dark:bg-teal-950/45 dark:text-teal-400">
                              Cheapest Option
                            </span>
                          )}
                          {isBestValue && (
                            <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950/45 dark:text-indigo-400">
                              Best Value
                            </span>
                          )}
                          {isMostPowerful && (
                            <span className="rounded-lg bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-800 dark:bg-purple-950/45 dark:text-purple-400">
                              Most Powerful
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 mb-3">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">No Models Match Your Filter</h5>
                  <p className="text-slate-450 mt-1 text-xs">
                    Try adjusting your search query "{searchQuery}" or choose "All" brands.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchDraft('');
                      setSearchQuery('');
                      setSelectedProvider('All');
                      setCurrentPage(1);
                    }}
                    className="mt-4 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 font-bold text-xs rounded-lg transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls Footer */}
            {totalPages > 1 && (
              <div className="px-6 py-4.5 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Showing <strong className="font-bold text-slate-800 dark:text-slate-200">{Math.min(totalItems, (activePage - 1) * itemsPerPage + 1)}-{Math.min(totalItems, activePage * itemsPerPage)}</strong> of <strong className="font-bold text-slate-800 dark:text-slate-200">{totalItems}</strong> matching models
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={activePage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition ${
                      activePage === 1 ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === activePage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          isCurrent
                            ? 'bg-indigo-600 text-white shadow-xs dark:bg-indigo-500'
                            : 'bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={activePage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition ${
                      activePage === totalPages ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Safe Alert warnings */}
          <div className="rounded-2xl bg-amber-50/40 border border-amber-100 p-4 dark:bg-amber-950/15 dark:border-amber-900/30 flex items-start space-x-3 text-xs leading-relaxed text-amber-900 dark:text-amber-300">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <strong>Calculated on averages:</strong> Actual production context windows and prompt cache rates differ depending on implementation libraries (e.g. LangChain, Semantic Kernel). Use these figures primarily as directional runrates. Only use precise prompts to optimize caching.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
