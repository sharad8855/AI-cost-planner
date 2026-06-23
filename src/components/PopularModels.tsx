import React from 'react';
import { ProviderLogo } from './ProviderLogo';
import { AI_MODELS } from '../data/models';
import { formatCurrency } from '../utils';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AIModel } from '../types';

interface PopularModelsProps {
  onSelectModel: (modelId: string) => void;
  isDarkMode: boolean;
  models?: AIModel[];
}

export function PopularModels({ onSelectModel, isDarkMode, models }: PopularModelsProps) {
  const modelsList = models || AI_MODELS;
  // We select specific representative models for the glance list
  const showcaseModels = modelsList.filter(m => 
    m.id === 'gpt-4o' || 
    m.id === 'gemini-2.0-flash' || 
    m.id === 'claude-3-5-sonnet' || 
    m.id === 'deepseek-reasoner' || 
    m.id === 'o3-mini'
  );

  const getTagColor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('flagship') || t.includes('gold standard')) {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300';
    }
    if (t.includes('speed & value') || t.includes('context value') || t.includes('best value') || t.includes('1m context')) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300';
    }
    if (t.includes('coding') || t.includes('premier')) {
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300';
    }
    if (t.includes('low cost') || t.includes('budget')) {
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300';
    }
    if (t.includes('open')) {
      return 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300';
    }
    if (t.includes('reasoning')) {
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300';
    }
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  };

  return (
    <section className="py-16 bg-slate-50/45 dark:bg-slate-900/40 border-t border-b border-slate-100 dark:border-slate-850" id="popular-models">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Supported Models Matrix</span>
          <h3 className="mt-2.5 font-display text-2.5xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Models at a Glance
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Direct pricing snapshots for leading models. Click any model to load it straight into the Interactive Cost Calculator!
          </p>
        </div>

        {/* Carousel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {showcaseModels.map((m) => (
            <div 
              key={m.id}
              onClick={() => onSelectModel(m.id)}
              className="group cursor-pointer rounded-2xl border border-slate-150/70 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-200 hover:ring-1 hover:ring-indigo-200 transition duration-150 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-400/20 text-left"
            >
              {/* Header inside card - Logo + Brand info */}
              <div className="flex items-start justify-between">
                <ProviderLogo provider={m.provider} size="md" className="group-hover:scale-105 transition" />
                <span className={`rounded-md px-2 py-0.5 text-[9px] font-bold ${getTagColor(m.strength)} uppercase tracking-wide`}>
                  {m.strength}
                </span>
              </div>

              {/* Title Names */}
              <div className="mt-5">
                <h4 className="font-display font-extrabold text-slate-950 dark:text-white text-base truncate">
                  {m.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                  {m.provider}
                </p>
              </div>

              {/* Price snapshot */}
              <div className="mt-5 border-t border-slate-100 pt-3.5 space-y-1 text-xs">
                <div>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight mr-1">
                    {formatCurrency(m.inputCostPerMillion, 'USD')}
                  </span>
                  <span className="text-slate-404 text-[10px] font-medium">/ 1M input tokens</span>
                </div>
                <div>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight mr-1">
                    {formatCurrency(m.outputCostPerMillion, 'USD')}
                  </span>
                  <span className="text-slate-404 text-[10px] font-medium">/ 1M output tokens</span>
                </div>
              </div>

              {/* Action indicator on hover */}
              <div className="mt-4 pt-2.5 flex items-center text-[10px] font-bold text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                <span>Load in Calculator</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
