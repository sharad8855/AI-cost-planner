import React, { useState } from 'react';
import { Star, Sun, Moon, ArrowDown, ChevronDown, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ currentView, setView, isDarkMode, toggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navItems = [
    { id: 'calculator', name: 'Calculator' },
    { id: 'budget', name: 'Budget Planner' },
    { id: 'comparison', name: 'Model Comparison' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'blog', name: 'Blog' }
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setView('home')} 
          className="flex cursor-pointer items-center space-x-3 transition hover:opacity-90"
          id="brand-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            AI Cost Planner
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:ml-10 md:flex md:space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out ${
                currentView === item.id
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {item.name}
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </button>
          ))}

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
              className="inline-flex items-center space-x-1 px-1 pt-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
            >
              <span>Resources</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-800">
                <button 
                  onClick={() => { setView('about'); }} 
                  className="w-full text-left block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50 cursor-pointer"
                >
                  About Planner
                </button>
                <button 
                  onClick={() => { setView('contact'); }} 
                  className="w-full text-left block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50 cursor-pointer"
                >
                  Contact Us
                </button>
                <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
                <a 
                  href="#how-it-works" 
                  onClick={() => { setView('home'); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                  className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                >
                  How It Works
                </a>
                <a 
                  href="#popular-models" 
                  onClick={() => { setView('home'); setTimeout(() => document.getElementById('popular-models')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                  className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                >
                  Supported Models
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Global Action items */}
        <div className="hidden md:flex items-center space-x-4">
          {/* GitHub Star Button */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Star className="mr-1.5 h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>Star</span>
            <span className="mx-1.5 h-3 w-px bg-slate-300 dark:bg-slate-600" />
            <span className="text-slate-500 dark:text-slate-400">2.1k</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white shadow-sm transition"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu and tools indicators */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Theme Toggle Button Mobile */}
          <button
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-amber-400 shadow-sm transition"
          >
            {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 shadow-sm focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-2 pt-2 pb-4 shadow-inner dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                  currentView === item.id
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
            >
              <span>GitHub Repository</span>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                ★ 2.1k
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
