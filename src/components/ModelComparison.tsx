import React, { useState } from 'react';
import { Sliders, Award, Layers, Sparkles, Zap, Code, Shield, Check, HelpCircle, Columns, Search, X, Filter, Brain } from 'lucide-react';
import { AI_MODELS } from '../data/models';
import { formatCurrency, formatNumber } from '../utils';
import { ProviderLogo } from './ProviderLogo';
import { AIModel } from '../types';

interface ModelComparisonProps {
  models?: AIModel[];
}

export function ModelComparison({ models }: ModelComparisonProps) {
  const modelsList = models || AI_MODELS;
  const [modelAId, setModelAId] = useState<string>('gpt-4o');
  const [modelBId, setModelBId] = useState<string>('gemini-2.0-flash');
  const [modelCId, setModelCId] = useState<string>('claude-3-5-sonnet');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedCapability, setSelectedCapability] = useState('All');

  // Providers list
  const providers = ['All', ...Array.from(new Set(modelsList.map(m => m.provider)))];

  // Apply filters
  const filteredModels = modelsList.filter(m => {
    // 1. Search Query Match (checks name, provider, bestFor, strength)
    const matchesSearch = searchQuery.trim() === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.strength.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Provider Match
    const matchesProvider = selectedProvider === 'All' || m.provider === selectedProvider;

    // 3. Capability Match
    let matchesCapability = true;
    if (selectedCapability === 'coding') {
      matchesCapability = m.coding === 'Exceptional';
    } else if (selectedCapability === 'reasoning') {
      matchesCapability = m.reasoning === 'Exceptional';
    } else if (selectedCapability === 'speed') {
      matchesCapability = m.speed === 'Extremely Fast';
    } else if (selectedCapability === 'context') {
      matchesCapability = m.contextWindow.includes('M') || m.contextWindow.includes('2M');
    } else if (selectedCapability === 'budget') {
      matchesCapability = m.inputCostPerMillion <= 1.00 && m.outputCostPerMillion <= 3.05;
    }

    return matchesSearch && matchesProvider && matchesCapability;
  });

  const hasActiveFilters = searchQuery !== '' || selectedProvider !== 'All' || selectedCapability !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProvider('All');
    setSelectedCapability('All');
  };

  const modelA = modelsList.find(m => m.id === modelAId) || modelsList[0];
  const modelB = modelsList.find(m => m.id === modelBId) || modelsList[2] || modelsList[0];
  const modelC = modelsList.find(m => m.id === modelCId) || modelsList[4] || modelsList[0];

  const compareSlots = [
    { label: 'Model A (Left)', id: modelAId, setId: setModelAId, model: modelA },
    { label: 'Model B (Middle)', id: modelBId, setId: setModelBId, model: modelB },
    { label: 'Model C (Right)', id: modelCId, setId: setModelCId, model: modelC }
  ];

  // Map ranking labels into numeric percentages for indicator progress bars
  const rankWeights = {
    'Exceptional': 100,
    'Very High': 85,
    'High': 70,
    'Medium': 55,
    'Basic': 35,
  };

  const getRankColor = (rank: string) => {
    if (rank === 'Exceptional') return 'bg-purple-600 dark:bg-purple-500';
    if (rank === 'Very High') return 'bg-indigo-600 dark:bg-indigo-500';
    if (rank === 'High') return 'bg-blue-600 dark:bg-blue-500';
    if (rank === 'Medium') return 'bg-amber-500 dark:bg-amber-500';
    return 'bg-slate-400';
  };

  const getSpeedColor = (speed: string) => {
    if (speed.includes('Extremely')) return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400';
    if (speed.includes('Very Fast')) return 'text-teal-700 bg-teal-50 dark:bg-teal-950/40 dark:text-teal-400';
    if (speed.includes('Fast')) return 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400';
    return 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="model-comparison-section">
      
      {/* Visual Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-400">
          <Columns className="h-4 w-4" />
          <span>Metric Comparisons</span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Side-by-Side Comparison
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
          Conduct direct side-by-side matrices across 3 selected models. Judge cost structures, speed benchmarks, context allowances, coding levels, and task strengths.
        </p>
      </div>

      {/* Model Finder & Interactive Filters Control Panel */}
      <div className="mb-8 rounded-3xl border border-slate-150/80 bg-white p-6 shadow-xl shadow-slate-100/40 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none" id="comparison-search-filter">
        <div className="flex flex-col gap-6">
          {/* Top Info + Search Input */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                <span>Model Finder & Filters</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quickly locate a model by keywords or constraints to comparison columns below.
              </p>
            </div>
            
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, provider, best for, strength..."
                className="w-full text-xs font-semibold text-slate-900 rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-3.5 outline-none hover:bg-slate-100 focus:ring-1 focus:ring-indigo-500 focus:bg-white dark:text-white dark:bg-slate-850 dark:border-slate-800 dark:focus:bg-slate-850"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Provider Filter Chips Row */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-2">
              Filter by Provider
            </span>
            <div className="flex flex-wrap gap-1.5">
              {providers.map((prov) => {
                const count = prov === 'All' 
                  ? modelsList.length 
                  : modelsList.filter(m => m.provider === prov).length;
                const isSelected = selectedProvider === prov;
                return (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvider(prov)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 border border-transparent ${
                      isSelected
                        ? 'bg-indigo-650 text-white shadow-sm border-indigo-700'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{prov}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isSelected 
                        ? 'bg-indigo-500 text-indigo-100' 
                        : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capability Filters Row */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-2">
              Filter by Core Capability
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'All', label: 'All Capabilities', icon: Sparkles },
                { id: 'coding', label: 'Exceptional Coding', icon: Code },
                { id: 'reasoning', label: 'Exceptional Reasoning', icon: Brain },
                { id: 'speed', label: 'Extremely Fast Speed', icon: Zap },
                { id: 'context', label: 'Large Context (1M+)', icon: Layers },
                { id: 'budget', label: 'Low Cost (Under $1)', icon: Shield }
              ].map((cap) => {
                const isSelected = selectedCapability === cap.id;
                const IconComponent = cap.icon;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setSelectedCapability(cap.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 border border-transparent ${
                      isSelected
                        ? 'bg-purple-650 text-white shadow-sm border-purple-700'
                        : 'bg-slate-50 text-slate-705 hover:bg-slate-100 border-slate-100 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-805'
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    <span>{cap.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Matched Quick-Assign Panel */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-dashed border-slate-150 dark:border-slate-800 animate-fadeIn bg-slate-50/30 p-2.5 rounded-2xl dark:bg-slate-950/10">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Filter className="h-4 w-4 text-indigo-500" />
                  <span>Found {filteredModels.length} matching {filteredModels.length === 1 ? 'model' : 'models'}</span>
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-indigo-650 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Clear filters
                </button>
              </div>
              
              {filteredModels.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-450 dark:text-slate-400">No models match your current selection parameters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-1">
                  {filteredModels.map((m) => {
                    const isSelectedA = modelAId === m.id;
                    const isSelectedB = modelBId === m.id;
                    const isSelectedC = modelCId === m.id;
                    return (
                      <div 
                        key={m.id}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between transition-shadow hover:shadow-md"
                      >
                        <div className="min-w-0 mb-2">
                          <div className="flex items-center space-x-1.5 mb-1">
                            <ProviderLogo provider={m.provider} size="sm" />
                            <span className="font-extrabold text-slate-900 dark:text-white truncate text-xs">{m.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-1">
                            {m.bestFor}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                            Set column:
                          </span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setModelAId(m.id)}
                              title="Compare in Column A (Left)"
                              className={`px-2 py-0.5 rounded text-[10px] font-black transition-all ${
                                isSelectedA
                                  ? 'bg-indigo-650 text-white border border-indigo-700'
                                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-700 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-350 dark:hover:bg-slate-700'
                              }`}
                            >
                              Col A
                            </button>
                            <button
                              onClick={() => setModelBId(m.id)}
                              title="Compare in Column B (Middle)"
                              className={`px-2 py-0.5 rounded text-[10px] font-black transition-all ${
                                isSelectedB
                                  ? 'bg-indigo-650 text-white border border-indigo-700'
                                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-700 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-350 dark:hover:bg-slate-700'
                              }`}
                            >
                              Col B
                            </button>
                            <button
                              onClick={() => setModelCId(m.id)}
                              title="Compare in Column C (Right)"
                              className={`px-2 py-0.5 rounded text-[10px] font-black transition-all ${
                                isSelectedC
                                  ? 'bg-indigo-650 text-white border border-indigo-700'
                                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-700 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-350 dark:hover:bg-slate-700'
                              }`}
                            >
                              Col C
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Model Selection Dropdown Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {compareSlots.map((slot, index) => (
          <div 
            key={index}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-100/50 dark:border-slate-850 dark:bg-slate-900 dark:shadow-none"
          >
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              Select {slot.label}
            </label>
            <div className="relative">
              <select
                value={slot.id}
                onChange={(e) => slot.setId(e.target.value)}
                className="w-full text-sm font-bold text-slate-900 rounded-2xl border border-slate-250 bg-slate-50 p-3.5 pr-10 outline-none hover:bg-slate-100 focus:ring-1 focus:ring-indigo-500 dark:text-white dark:bg-slate-850 dark:border-slate-800"
              >
                {(() => {
                  const options = [...filteredModels];
                  if (!options.some(m => m.id === slot.id)) {
                    const currentModel = modelsList.find(m => m.id === slot.id);
                    if (currentModel) {
                      options.push(currentModel);
                    }
                  }
                  return options.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider}) {m.id === slot.id ? ' (Selected)' : ''}
                    </option>
                  ));
                })()}
              </select>
            </div>

            {/* Micro Details info */}
            <div className="flex items-center space-x-3.5 mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800">
              <ProviderLogo provider={slot.model.provider} size="sm" />
              <div>
                <span className="block text-xs font-semibold text-slate-500">{slot.model.provider} API Rate</span>
                <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(slot.model.inputCostPerMillion, 'USD')} In • {formatCurrency(slot.model.outputCostPerMillion, 'USD')} Out
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Feature Matrix Board */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-850 dark:bg-slate-900 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800">
          
          {/* LEFT LABELS LABEL COLUMN - Visible primarily on desktop */}
          <div className="hidden lg:flex flex-col bg-slate-50/50 dark:bg-slate-850/10">
            <div className="p-6 h-28 flex items-center border-b border-slate-100 dark:border-slate-800 font-display font-black text-slate-850 dark:text-slate-300">
              Key Metrics Matrix
            </div>
            {/* Cost row label */}
            <div className="p-6 h-[105px] flex flex-col justify-center border-b border-slate-150 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">API Token Rates</span>
              <span className="text-[10px] text-slate-400 mt-1">Cost per million prompt tokens.</span>
            </div>
            {/* Speed row label */}
            <div className="p-6 h-24 flex flex-col justify-center border-b border-slate-150 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">Execution Speed</span>
              <span className="text-[10px] text-slate-400 mt-1">Relative latency to first token.</span>
            </div>
            {/* Context row label */}
            <div className="p-6 h-24 flex flex-col justify-center border-b border-slate-150 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">Context Window</span>
              <span className="text-[10px] text-slate-400 mt-1">Maximum token capacity limit.</span>
            </div>
            {/* Coding Level label */}
            <div className="p-6 h-[85px] flex flex-col justify-center border-b border-slate-150 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">Coding Capability</span>
              <span className="text-[10px] text-slate-400 mt-1">Software generation strength.</span>
            </div>
            {/* Reasoning Capability label */}
            <div className="p-6 h-[85px] flex flex-col justify-center border-b border-slate-150 dark:border-slate-800">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">Reasoning Capability</span>
              <span className="text-[10px] text-slate-400 mt-1">Logical, math and planning depth.</span>
            </div>
            {/* Best use-case label */}
            <div className="p-6/ h-[105px]/ p-6 flex flex-col justify-center">
              <span className="font-extrabold text-slate-900 dark:text-slate-200">Best Use Cases</span>
              <span className="text-[10px] text-slate-400 mt-1">Ideal architectural targets.</span>
            </div>
          </div>

          {/* Model Columns */}
          {compareSlots.map((slot, idx) => (
            <div key={idx} className="flex flex-col">
              
              {/* Header Box */}
              <div className="p-6 h-28 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3 bg-slate-50/20 dark:bg-slate-850/5">
                <ProviderLogo provider={slot.model.provider} size="md" />
                <div>
                  <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none">
                    {slot.label}
                  </div>
                  <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-base mt-1 leading-tight">
                    {slot.model.name}
                  </h4>
                </div>
              </div>

              {/* API Token Rates */}
              <div className="p-6 h-[105px] border-b border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                <div className="lg:hidden text-[9px] font-bold text-slate-400 uppercase mb-1">API Token Rates</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400">Input</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{formatCurrency(slot.model.inputCostPerMillion, 'USD')}</strong>
                    <span className="text-[9px] text-slate-400 block mt-0.5">/1M tokens</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400">Output</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{formatCurrency(slot.model.outputCostPerMillion, 'USD')}</strong>
                    <span className="text-[9px] text-slate-400 block mt-0.5">/1M tokens</span>
                  </div>
                </div>
              </div>

              {/* Execution Speed */}
              <div className="p-6 h-24 border-b border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                <div className="lg:hidden text-[9px] font-bold text-slate-400 uppercase mb-1">Execution Speed</div>
                <div>
                  <span className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-bold ${getSpeedColor(slot.model.speed)}`}>
                    <Zap className="mr-1.5 h-3.5 w-3.5 fill-current" />
                    {slot.model.speed}
                  </span>
                </div>
              </div>

              {/* Context Limit */}
              <div className="p-6 h-24 border-b border-slate-100 dark:border-slate-800 flex flex-col justify-center font-mono">
                <div className="lg:hidden text-[9px] font-bold text-slate-400 uppercase mb-1">Context Limit</div>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  {slot.model.contextWindow}
                </div>
                <span className="text-[10px] text-slate-450">Tokens supported</span>
              </div>

              {/* Coding Capability */}
              <div className="p-6 h-[85px] border-b border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                <div className="lg:hidden text-[9px] font-bold text-slate-400 uppercase mb-1">Coding level</div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-705 mb-1 dark:text-slate-350">
                  <span>{slot.model.coding}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${getRankColor(slot.model.coding)}`}
                    style={{ width: `${rankWeights[slot.model.coding]}%` }}
                  />
                </div>
              </div>

              {/* Reasoning Capability */}
              <div className="p-6 h-[85px] border-b border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                <div className="lg:hidden text-[9px] font-bold text-slate-400 uppercase mb-1">Reasoning level</div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-705 mb-1 dark:text-slate-350">
                  <span>{slot.model.reasoning}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${getRankColor(slot.model.reasoning)}`}
                    style={{ width: `${rankWeights[slot.model.reasoning]}%` }}
                  />
                </div>
              </div>

              {/* Use Case details */}
              <div className="p-6 h-[105px] flex flex-col justify-center">
                <div className="lg:hidden text-[9px] font-bold text-slate-400 uppercase mb-10">Best Use Case</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {slot.model.bestFor}
                </p>
                <div className="mt-2">
                  <span className="rounded-lg bg-indigo-50/50 px-2 py-0.5 text-[9px] font-bold tracking-wider text-indigo-700 uppercase dark:bg-indigo-950/40 dark:text-indigo-400">
                    ★ {slot.model.strength}
                  </span>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
