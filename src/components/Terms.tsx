import React from 'react';
import { BookOpen, FileText, AlertTriangle, ShieldAlert } from 'lucide-react';

export function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn text-slate-700 dark:text-slate-355">
      
      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
          <BookOpen className="h-4 w-4" />
          <span>Usage Guidelines</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-slate-450 dark:text-slate-400 text-xs font-semibold">
          Last Updated: June 23, 2026 • AI Cost Planner
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        
        {/* Intro */}
        <section className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 dark:bg-slate-900/10 dark:border-slate-850">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Welcome to AI Cost Planner</h3>
          <p>
            These terms and conditions outline the rules and regulations for the use of AI Cost Planner's Website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use AI Cost Planner if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </section>

        {/* License */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-indigo-650" />
            <span>1. Intellectual Property & Open-Source License</span>
          </h3>
          <p>
            Unless otherwise stated, AI Cost Planner and/or its licensors own the intellectual property rights for all material on AI Cost Planner. All intellectual property rights are reserved. You may access this from AI Cost Planner for your own personal use, subject to restrictions set in these terms and conditions.
          </p>
          <p>
            However, our core logic, calculation algorithms, and styling templates are released under the MIT Open Source license. You are welcome to fork, modify, redistribute, or self-host copies of the platform for internal commercial purposes, provided you maintain copyright credits.
          </p>
        </section>

        {/* Calculations Disclaimer */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <AlertTriangle className="h-4.5 w-4.5 text-amber-600" />
            <span>2. Cost Estimates Disclaimer (100% Directional Runrates)</span>
          </h3>
          <p className="font-semibold text-slate-850 dark:text-slate-200">
            IMPORTANT DISCLAIMER FOR DEVELOPERS:
          </p>
          <p>
            The pricing figures, request counts, and cost-saving suggestions provided by the Cost Calculator and Budget Planner are estimates. Although we make every effort to synchronize rates with official API endpoints and cache OpenRouter rates hourly, actual API billing is subject to:
          </p>
          <ul className="list-disc pl-6 space-y-1 bg-slate-50/50 p-4 rounded-xl dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 text-xs">
            <li>Provider pricing updates that occur between our synchronization intervals.</li>
            <li>Custom middleware routing markups or API keys configured through proxy platforms.</li>
            <li>Prompt caching behaviors, system prompt token injects, or dynamic agent loop amplification.</li>
            <li>Vector database embedding fees or data storage overhead not tracked by this tool.</li>
          </ul>
          <p>
            Therefore, all calculations should be treated as directional guidance. AI Cost Planner does not guarantee absolute financial alignment with your final invoices.
          </p>
        </section>

        {/* Hyperlinks */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">3. Hyperlinking to our Content</h3>
          <p>
            The following organizations may link to our Website without prior written approval:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors; and</li>
            <li>System-wide Accredited Businesses.</li>
          </ul>
        </section>

        {/* Liability */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <ShieldAlert className="h-4.5 w-4.5 text-rose-600" />
            <span>4. Limitations of Liability</span>
          </h3>
          <p>
            In no event shall AI Cost Planner, nor any of its contributors or maintainers, be liable for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract. AI Cost Planner, including its contributors, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website or reliance on its calculated outputs.
          </p>
        </section>

        {/* Governing Law */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">5. Governing Law</h3>
          <p>
            These Terms will be governed by and interpreted in accordance with local internet regulations, and you submit to the non-exclusive jurisdiction of the state and federal courts for the resolution of any disputes.
          </p>
        </section>

      </div>

    </div>
  );
}
