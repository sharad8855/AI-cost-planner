import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
}

export function Footer({ setView }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-12 border-b border-slate-200/65 dark:border-slate-800">
          
          {/* Logo Brand Segment */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                AI Cost Planner
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Plan Smarter. Choose Better. Spend Wisely. Free & open-source cost intelligence platforms for startups, engineers, and companies.
            </p>
            <div className="text-[11px] text-slate-400">
              © 2026 AI Cost Planner. All rights reserved.
            </div>
          </div>

          {/* Tools Info */}
          <div className="col-span-2 space-y-3">
            <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Tools
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-350">
              <li>
                <button onClick={() => setView('calculator')} className="hover:text-indigo-600">
                  Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setView('budget')} className="hover:text-indigo-600">
                  Budget Planner
                </button>
              </li>
              <li>
                <button onClick={() => setView('comparison')} className="hover:text-indigo-600">
                  Model Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Info */}
          <div className="col-span-2 space-y-3">
            <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Resources
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-350">
              <li>
                <button onClick={() => setView('about')} className="hover:text-indigo-600 cursor-pointer">
                  About Planner
                </button>
              </li>
              <li>
                <button onClick={() => setView('blog')} className="hover:text-indigo-600 cursor-pointer">
                  Blog & Insights
                </button>
              </li>
              <li>
                <button onClick={() => setView('contact')} className="hover:text-indigo-600 cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li><a href="#how-it-works" onClick={() => setView('home')} className="hover:text-indigo-600">How It Works</a></li>
            </ul>
          </div>

          {/* Community Info */}
          <div className="col-span-2 space-y-3">
            <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Community
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-350">
              <li><a href="https://github.com" target="_blank" rel="noopener" className="hover:text-indigo-600">GitHub Star</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener" className="hover:text-indigo-600">Discord Chat</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener" className="hover:text-indigo-600">Twitter / X</a></li>
            </ul>
          </div>

          {/* Made With Badge */}
          <div className="md:col-span-2 flex items-center md:justify-end">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[10px] text-slate-500 flex items-center justify-center space-x-1 font-medium">
                <span>Made made with</span>
                <Heart className="h-3 w-3 fill-rose-500 text-rose-500 shrink-0" />
                <span>for the</span>
              </span>
              <span className="block text-[11px] font-bold text-slate-900 dark:text-white mt-1">
                developer community
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 text-center text-[10px] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            Free • Open Source • Built for Developers • No tracking cookies
          </div>
          <div className="flex gap-4">
            <button onClick={() => setView('privacy')} className="hover:underline cursor-pointer">Privacy Policy</button>
            <button onClick={() => setView('terms')} className="hover:underline cursor-pointer">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
