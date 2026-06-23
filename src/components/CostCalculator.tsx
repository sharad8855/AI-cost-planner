import React, { useState } from 'react';
import { Sliders, Calculator, Calendar, Info, Layers, RefreshCw, HelpCircle, ArrowRight, DollarSign, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AI_MODELS } from '../data/models';
import { formatCurrency, formatNumber, formatBriefNumber, getModelReleaseTime } from '../utils';
import { ProviderLogo } from './ProviderLogo';
import { AIModel } from '../types';

interface CostCalculatorProps {
  models?: AIModel[];
}

export function CostCalculator({ models }: CostCalculatorProps) {
  const modelsList = models || AI_MODELS;
  const [providerFilter, setProviderFilter] = useState<string>('All');
  const [selectedModelId, setSelectedModelId] = useState<string>('gpt-4o');
  const [inputTokens, setInputTokens] = useState<number>(100000);
  const [outputTokens, setOutputTokens] = useState<number>(50000);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(2000);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  // Alternative comparisons listing search, filter, sorting and pagination states
  const [tableSearchDraft, setTableSearchDraft] = useState<string>('');
  const [tableSearchQuery, setTableSearchQuery] = useState<string>('');
  const [tableProvider, setTableProvider] = useState<string>('All');
  const [tableSortBy, setTableSortBy] = useState<'latest' | 'cheapest' | 'expensive'>('latest');
  const [tablePage, setTablePage] = useState<number>(1);
  const itemsPerPage = 8;

  // Model Picker search, sorting, and pagination states
  const [pickerSearch, setPickerSearch] = useState<string>('');
  const [pickerPage, setPickerPage] = useState<number>(1);
  const pickerItemsPerPage = 6;

  // Filter models based on selection
  const filteredModels = modelsList.filter(m => {
    // Provider match
    const matchesProvider = providerFilter === 'All' || m.provider === providerFilter;
    
    // Search query match
    const query = pickerSearch.trim().toLowerCase();
    const matchesSearch = query === '' ||
      m.name.toLowerCase().includes(query) ||
      m.provider.toLowerCase().includes(query) ||
      m.bestFor.toLowerCase().includes(query) ||
      m.strength.toLowerCase().includes(query);

    return matchesProvider && matchesSearch;
  });

  // Always keep the latest models on top of picker list
  const sortedPickerModels = [...filteredModels].sort((a, b) => {
    return getModelReleaseTime(b) - getModelReleaseTime(a);
  });

  // Guard: if current selected model is not in filtered list, auto-select first of filtered
  const activeModel = modelsList.find(m => m.id === selectedModelId) || modelsList[0];

  const handleProviderChange = (p: string) => {
    setProviderFilter(p);
    setPickerPage(1);
    setPickerSearch(''); // clear search filter on brand change
    const modelsOfProvider = p === 'All' ? modelsList : modelsList.filter(m => m.provider === p);
    if (modelsOfProvider.length > 0) {
      setSelectedModelId(modelsOfProvider[0].id);
    }
  };

  // Paginated calculations for selection picker
  const totalPickerItems = sortedPickerModels.length;
  const totalPickerPages = Math.ceil(totalPickerItems / pickerItemsPerPage) || 1;
  const activePickerPage = Math.min(pickerPage, totalPickerPages);
  
  const paginatedPickerModels = sortedPickerModels.slice(
    (activePickerPage - 1) * pickerItemsPerPage,
    activePickerPage * pickerItemsPerPage
  );

  // Perform core mathematics
  const inputCost = (inputTokens / 1000000) * activeModel.inputCostPerMillion;
  const outputCost = (outputTokens / 1000000) * activeModel.outputCostPerMillion;
  const totalCostPerRequest = inputCost + outputCost;
  const dailyCost = totalCostPerRequest * requestsPerDay;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  const inputWords = Math.round(inputTokens * 0.75);
  const outputWords = Math.round(outputTokens * 0.75);

  // Providers list
  const providers = ['All', ...Array.from(new Set(modelsList.map(m => m.provider)))];

  // Alternative comparisons listing
  const comparisonList = modelsList.map(m => {
    const mInputCost = (inputTokens / 1000000) * m.inputCostPerMillion;
    const mOutputCost = (outputTokens / 1000000) * m.outputCostPerMillion;
    const mSingleCost = mInputCost + mOutputCost;
    const mMonthly = mSingleCost * requestsPerDay * 30;
    const pctDiff = ((mMonthly - monthlyCost) / (monthlyCost || 1)) * 100;
    
    return {
      model: m,
      singleCost: mSingleCost,
      monthlyCost: mMonthly,
      pctDiff
    };
  });

  // Filter comparison options
  const filteredComparisons = comparisonList.filter(item => {
    // Brand category filter
    const matchesProvider = tableProvider === 'All' || 
      item.model.provider.toLowerCase() === tableProvider.toLowerCase() ||
      (tableProvider === 'Mistral' && item.model.provider.toLowerCase().includes('mistral'));

    // Text query search selection
    const query = tableSearchQuery.trim().toLowerCase();
    const matchesSearch = query === '' ||
      item.model.name.toLowerCase().includes(query) ||
      item.model.provider.toLowerCase().includes(query) ||
      item.model.bestFor.toLowerCase().includes(query) ||
      item.model.strength.toLowerCase().includes(query);

    return matchesProvider && matchesSearch;
  });

  // Apply sorting based on user's preference
  const sortedComparisons = [...filteredComparisons].sort((a, b) => {
    if (tableSortBy === 'latest') {
      return getModelReleaseTime(b.model) - getModelReleaseTime(a.model);
    } else if (tableSortBy === 'cheapest') {
      return a.monthlyCost - b.monthlyCost;
    } else if (tableSortBy === 'expensive') {
      return b.monthlyCost - a.monthlyCost;
    }
    return 0;
  });

  // Paginated calculations
  const totalTableItems = sortedComparisons.length;
  const totalTablePages = Math.ceil(totalTableItems / itemsPerPage) || 1;
  const activeTablePage = Math.min(tablePage, totalTablePages);
  const paginatedComparisons = sortedComparisons.slice(
    (activeTablePage - 1) * itemsPerPage,
    activeTablePage * itemsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="cost-calculator-section">
      {/* Visual Title Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
          <Calculator className="h-4 w-4" />
          <span>Interactive Calculator</span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          AI Cost Calculator
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
          Estimate production AI API expenditures dynamically. Fill in your token sizes and daily load requests to compute real-time financial runrates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            
            {/* Header / Currency and Controls */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
              <span className="font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Configure Usage Parameters
              </span>
              
              {/* Currency Toggle Buttons */}
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800" id="currency-toggle">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                    currency === 'USD' 
                      ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                    currency === 'INR'
                      ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            {/* Step 1: Provider Filter Select */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select Provider
                </label>
                <div className="flex flex-wrap gap-2">
                  {providers.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleProviderChange(p)}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                        providerFilter === p
                          ? 'bg-indigo-600 text-white dark:bg-indigo-500 shadow-md'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Model Picker */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Select Model Name
                  </label>
                  <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 shrink-0 self-start sm:self-center">
                    <span className="text-[9px] text-indigo-500 dark:text-indigo-400 font-bold uppercase">Active:</span>
                    <span className="font-bold text-indigo-800 dark:text-indigo-300 text-[9px] truncate max-w-[150px] sm:max-w-xs">{activeModel.name}</span>
                  </div>
                </div>

                {/* Inline responsive search filter */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search model names..."
                    value={pickerSearch}
                    onChange={(e) => {
                      setPickerSearch(e.target.value);
                      setPickerPage(1);
                    }}
                    className="w-full bg-slate-50/75 dark:bg-slate-850/40 border border-slate-100 dark:border-slate-800/80 rounded-xl pl-8.5 pr-8 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-950 dark:text-white font-medium"
                  />
                  {pickerSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setPickerSearch('');
                        setPickerPage(1);
                      }}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {paginatedPickerModels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {paginatedPickerModels.map((m) => {
                      const isSelected = selectedModelId === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedModelId(m.id)}
                          className={`flex items-center space-x-2.5 rounded-xl p-2.5 border text-left transition ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/25 ring-1 ring-indigo-600 dark:border-indigo-400 dark:bg-indigo-950/20'
                              : 'border-slate-100 bg-slate-50/45 hover:bg-slate-50 hover:border-slate-200 dark:border-slate-850 dark:bg-slate-850/30 dark:hover:bg-slate-800'
                          }`}
                        >
                          <ProviderLogo provider={m.provider} size="sm" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {m.name}
                            </div>
                            <div className="text-[9px] text-slate-450 dark:text-slate-400 truncate mt-0.5">
                              In: {formatCurrency(m.inputCostPerMillion, 'USD')}/M • Out: {formatCurrency(m.outputCostPerMillion, 'USD')}/M
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center border border-dashed border-slate-250 dark:border-slate-800 rounded-xl bg-slate-50/20">
                    <p className="text-xs text-slate-450 font-medium">No models found matching "{pickerSearch}"</p>
                    <button
                      type="button"
                      onClick={() => {
                        setPickerSearch('');
                        setPickerPage(1);
                      }}
                      className="mt-2 text-[10px] font-bold text-indigo-600 hover:underline"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}

                {/* Compact Pagination for Model Selection */}
                {totalPickerPages > 1 && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 dark:border-slate-800/40 mt-1">
                    <span className="text-[10px] text-slate-400 font-medium font-mono">
                      Page {activePickerPage} of {totalPickerPages} ({totalPickerItems} models found)
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        disabled={activePickerPage === 1}
                        onClick={() => setPickerPage(p => Math.max(1, p - 1))}
                        className={`p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                          activePickerPage === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        disabled={activePickerPage === totalPickerPages}
                        onClick={() => setPickerPage(p => Math.min(totalPickerPages, p + 1))}
                        className={`p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                          activePickerPage === totalPickerPages ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Token Inputs and Slider presets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Input Tokens Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Input Tokens (Context)
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ~{formatBriefNumber(inputWords)} words
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-850 dark:bg-slate-850 dark:text-white"
                  />
                  
                  {/* Preset tokens tags */}
                  <div className="flex gap-1.5 mt-2">
                    {[1000, 10000, 100000, 1000000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInputTokens(val)}
                        className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md px-2 py-0.5 dark:bg-indigo-950/40 dark:text-indigo-400"
                      >
                        {formatBriefNumber(val)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Tokens Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Output Tokens (Generation)
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ~{formatBriefNumber(outputWords)} words
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-850 dark:bg-slate-850 dark:text-white"
                  />

                  {/* Preset output tags */}
                  <div className="flex gap-1.5 mt-2">
                    {[500, 2000, 10000, 100000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setOutputTokens(val)}
                        className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md px-2 py-0.5 dark:bg-indigo-950/40 dark:text-indigo-400"
                      >
                        {formatBriefNumber(val)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4: Requests Limit per Day Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  <span>Volume: Requests Per Day</span>
                  <div className="flex items-center space-x-1 capitalize text-slate-800 dark:text-slate-200">
                    <input 
                      type="number" 
                      value={requestsPerDay} 
                      onChange={(e) => setRequestsPerDay(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-right bg-transparent border-b border-indigo-200 focus:border-indigo-500 font-extrabold outline-none"
                    />
                    <span>/ day</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100000"
                  step="100"
                  value={requestsPerDay}
                  onChange={(e) => setRequestsPerDay(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-100 accent-indigo-600 cursor-pointer dark:bg-slate-800"
                />
                
                {/* Volume Presets */}
                <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
                  <button onClick={() => setRequestsPerDay(100)} className="hover:text-indigo-600">100 (Testing)</button>
                  <button onClick={() => setRequestsPerDay(5000)} className="hover:text-indigo-600">5,000 (Chatbot)</button>
                  <button onClick={() => setRequestsPerDay(20000)} className="hover:text-indigo-600">20,000 (Product)</button>
                  <button onClick={() => setRequestsPerDay(100000)} className="hover:text-indigo-600">100K (Enterprise)</button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Calculated Outputs Summary */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main cost readout card */}
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-indigo-900 to-slate-900 p-6 text-white shadow-xl dark:border-slate-850 dark:from-slate-900 dark:to-slate-950">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block">Cost Projections ({currency})</span>
            
            {/* Main monthly readout */}
            <div className="mt-4 pb-6 border-b border-white/10">
              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Estimated Monthly Billing</div>
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {formatCurrency(monthlyCost, currency)}
                </span>
                <span className="text-sm font-medium text-slate-400">/mo</span>
              </div>
            </div>

            {/* Detailed metric columns */}
            <div className="grid grid-cols-2 gap-4 py-6 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Input Cost</span>
                <span className="text-base font-bold text-slate-100 mt-0.5 block">
                  {formatCurrency(inputCost, currency)}
                </span>
                <span className="text-[10px] text-slate-400 block leading-tight">per request</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Output Cost</span>
                <span className="text-base font-bold text-slate-100 mt-0.5 block">
                  {formatCurrency(outputCost, currency)}
                </span>
                <span className="text-[10px] text-slate-400 block leading-tight">per request</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Cost Per Request</span>
                <span className="text-base font-extrabold text-emerald-400 mt-0.5 block">
                  {formatCurrency(totalCostPerRequest, currency)}
                </span>
                <span className="text-[10px] text-slate-450 block leading-tight">combined tokens</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Daily Cost</span>
                <span className="text-base font-bold text-slate-100 mt-0.5 block">
                  {formatCurrency(dailyCost, currency)}
                </span>
                <span className="text-[10px] text-slate-400 block leading-tight">at current load</span>
              </div>
            </div>

            {/* Annual cost block */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-indigo-300 font-bold block">Annualized Runrate</span>
                <span className="text-xl font-black text-white mt-1 block">
                  {formatCurrency(yearlyCost, currency)}
                </span>
              </div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                <Calendar className="h-5 w-5" />
              </div>
            </div>

          </div>

          {/* Tips inside Calculator */}
          <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 text-amber-900 dark:text-amber-300 flex items-start space-x-3 text-xs leading-relaxed">
            <Info className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <strong>Pro optimization tip:</strong> Under the selected specifications, transitioning to <strong>Gemini 1.5 Flash</strong> or <strong>DeepSeek Chat</strong> could slash your calculated bill by over <strong>80%</strong> without sacrificing rapid response speeds!
            </div>
          </div>

        </div>

      </div>

      {/* Alternative Options / Comparison Grid below */}
      <div className="mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-3">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Cost Breakdown Across Models For This Specification
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">Explore comparative AI price runrates for {formatNumber(inputTokens)} input / {formatNumber(outputTokens)} output tokens</p>
          </div>
        </div>

        {/* Math & Calculation Transparency Block */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex items-start space-x-3">
            <Info className="mt-0.5 h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="space-y-2.5 w-full">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>Calculation Methodology (100% Verified Math)</span>
                <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase">Dynamic Metric</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-4xl leading-relaxed">
                Standard AI API billing occurs purely in blocks of <strong>1 Million Tokens</strong>. Below is the precise mathematical system our calculator runs in real-time to convert these rates into your target daily frequency:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="rounded-xl bg-white p-3.5 border border-slate-150/60 dark:bg-slate-900 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5 font-sans">
                    1. Price Per Request Formula
                  </span>
                  <div className="font-mono text-[11px] text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 px-2.5 py-2.5 rounded-lg border border-slate-100 dark:border-slate-850/80 block overflow-x-auto whitespace-nowrap">
                    (<span className="text-indigo-600 dark:text-indigo-400 font-bold">{formatNumber(inputTokens)}</span> / 1M × Input Rate) + (<span className="text-indigo-600 dark:text-indigo-400 font-bold">{formatNumber(outputTokens)}</span> / 1M × Output Rate)
                  </div>
                </div>

                <div className="rounded-xl bg-white p-3.5 border border-slate-150/60 dark:bg-slate-900 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5 font-sans">
                    2. Monthly Runrate Formula
                  </span>
                  <div className="font-mono text-[11px] text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 px-2.5 py-2.5 rounded-lg border border-slate-100 dark:border-slate-850/80 block overflow-x-auto whitespace-nowrap">
                    Cost per Request × <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formatNumber(requestsPerDay)}</span> (daily) × 30 days = <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatNumber(requestsPerDay * 30)}</span> reqs/mo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/30 dark:border-slate-850 dark:bg-slate-900 overflow-hidden">
          
          {/* Header Action Strip: Search and Sorting controls */}
          <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex flex-col md:flex-row gap-2.5">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search model name, provider, best suitability, strength..."
                  value={tableSearchDraft}
                  onChange={(e) => setTableSearchDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setTableSearchQuery(tableSearchDraft);
                      setTablePage(1);
                    }
                  }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-950 dark:text-white font-medium shadow-2xs"
                />
                {tableSearchDraft && (
                  <button
                     type="button"
                     onClick={() => {
                       setTableSearchDraft('');
                       setTableSearchQuery('');
                       setTablePage(1);
                     }}
                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Sorting options */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Sort:</span>
                <select
                  value={tableSortBy}
                  onChange={(e) => {
                    setTableSortBy(e.target.value as any);
                    setTablePage(1);
                  }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-950 dark:text-white font-bold cursor-pointer shadow-3xs hover:border-slate-300 dark:hover:border-slate-700"
                  style={{ minWidth: '170px' }}
                >
                  <option value="latest">Latest Released (Newest First)</option>
                  <option value="cheapest">Cheapest Volume (Cheapest first)</option>
                  <option value="expensive">Reasoning Power (Premium first)</option>
                </select>
              </div>

              {/* Interactive Search Tool Trigger Action Button */}
              <button
                type="button"
                onClick={() => {
                  setTableSearchQuery(tableSearchDraft);
                  setTablePage(1);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold px-4 py-2 text-xs rounded-xl transition duration-150 shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center space-x-1.5"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Brand filter selection chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-450 font-extrabold mr-1">Brand:</span>
              {['All', 'Google', 'OpenAI', 'Anthropic', 'Meta', 'Mistral'].map((brand) => {
                const isSelected = tableProvider === brand;
                return (
                  <button
                    key={brand}
                    onClick={() => {
                      setTableProvider(brand);
                      setTablePage(1);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all duration-150 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs dark:bg-indigo-500'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            {paginatedComparisons.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-left text-sm">
                <thead className="bg-slate-50/75 dark:bg-slate-850/30 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Model Name</th>
                    <th scope="col" className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">
                      Cost Per Request
                      <span className="block text-[9px] font-medium text-slate-400 normal-case mt-0.5">Based on token sizes</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">
                      Monthly Cost ({currency})
                      <span className="block text-[9px] font-medium text-slate-450 dark:text-slate-400 normal-case mt-0.5">At {formatNumber(requestsPerDay * 30)} reqs/mo</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">
                      Yearly Cost ({currency})
                      <span className="block text-[9px] font-medium text-slate-450 dark:text-slate-400 normal-case mt-0.5">At {formatNumber(requestsPerDay * 365)} reqs/yr</span>
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Price Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {paginatedComparisons.map(({ model, singleCost, monthlyCost: mMonthly, pctDiff }) => {
                    const isActive = model.id === activeModel.id;
                    return (
                      <tr 
                        key={model.id}
                        className={`transition duration-150 ${
                          isActive 
                            ? 'bg-indigo-50/35 font-semibold dark:bg-indigo-950/10' 
                            : 'hover:bg-slate-50/50 dark:hover:bg-slate-850/30'
                        }`}
                      >
                        {/* Model name / Provider info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <ProviderLogo provider={model.provider} size="sm" />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{model.name}</span>
                                {model.created && (
                                  <span className="text-[8px] bg-red-50 text-red-600 font-extrabold px-1.5 py-0.5 rounded uppercase dark:bg-red-950/40 dark:text-red-400 shrink-0">
                                    New
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 uppercase tracking-widest">{model.provider}</div>
                            </div>
                          </div>
                        </td>

                        {/* Cost per single request */}
                        <td className="px-6 py-4 font-mono text-xs">
                          {formatCurrency(singleCost, currency)}
                        </td>

                        {/* Monthly Projecting */}
                        <td className="px-6 py-4 font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                          {formatCurrency(mMonthly, currency)}
                        </td>

                        {/* Yearly Projecting */}
                        <td className="px-6 py-4 font-mono text-xs">
                          {formatCurrency(mMonthly * 12, currency)}
                        </td>

                        {/* Price Difference compared to selected */}
                        <td className="px-6 py-4">
                          {isActive ? (
                            <span className="rounded-full bg-indigo-150 px-2.5 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 leading-none">
                              Active Selection
                            </span>
                          ) : pctDiff < 0 ? (
                            <span className="rounded-full bg-emerald-150 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-400 leading-none">
                              {pctDiff.toFixed(0)}% Cheaper
                            </span>
                          ) : (
                            <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-455 leading-none">
                              +{pctDiff.toFixed(0)}% Costlier
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center bg-white dark:bg-slate-900">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 mb-3">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">No Models Match Your Filter</h5>
                <p className="text-slate-450 mt-1 text-xs">
                  Try adjusting your search query "{tableSearchQuery}" or choose "All" brands.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTableSearchDraft('');
                    setTableSearchQuery('');
                    setTableProvider('All');
                    setTablePage(1);
                  }}
                  className="mt-4 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 font-bold text-xs rounded-lg transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls Footer block */}
          {totalTablePages > 1 && (
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Showing <strong className="font-bold text-slate-800 dark:text-slate-200">{Math.min(totalTableItems, (activeTablePage - 1) * itemsPerPage + 1)}-{Math.min(totalTableItems, activeTablePage * itemsPerPage)}</strong> of <strong className="font-bold text-slate-800 dark:text-slate-200">{totalTableItems}</strong> matching comparison metrics
              </div>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  disabled={activeTablePage === 1}
                  onClick={() => setTablePage(p => Math.max(1, p - 1))}
                  className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition ${
                    activeTablePage === 1 ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalTablePages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = pageNum === activeTablePage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setTablePage(pageNum)}
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
                  disabled={activeTablePage === totalTablePages}
                  onClick={() => setTablePage(p => Math.min(totalTablePages, p + 1))}
                  className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition ${
                    activeTablePage === totalTablePages ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
