import React, { useState } from 'react';
import { Target, Users, ShieldCheck, Sparkles, HelpCircle, ChevronDown, ChevronUp, Cpu, BarChart2 } from 'lucide-react';

export function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI Cost Planner calculate its prices?",
      answer: "All rates are calculated based on the standard industry unit of 'Cost per 1 Million Tokens'. We synchronize with official provider pricing and OpenRouter's API in real-time, matching input rates (for prompt tokens) and output rates (for completion/generated tokens) dynamically."
    },
    {
      question: "Is the OpenRouter rate sync truly in real-time?",
      answer: "Yes, when you click the 'Sync Live Rates' button, the app requests the latest JSON schema directly from the OpenRouter API. To minimize latency and avoid exceeding API limits, these rates are cached on our server for 1 hour by default, satisfying request requirements in a high-efficiency manner."
    },
    {
      question: "How does the Budget Planner estimate requests?",
      answer: "The Budget Planner takes your target monthly budget (in USD or INR) and divides it by the calculated cost of a single API request for each model. The cost of a request is determined by: (Input Tokens / 1,000,000 * Input Rate) + (Output Tokens / 1,000,000 * Output Rate). This shows you exactly how many requests you can afford per month."
    },
    {
      question: "Are there any hidden costs included in these plans?",
      answer: "No. This tool calculates base raw token costs based on public provider rates. It does not account for intermediate middleware, custom prompt routing fees, network transfer costs, or database vector indexing overhead, which can vary depending on your host infrastructure."
    },
    {
      question: "Can I use this tool for free?",
      answer: "Absolutely! AI Cost Planner is 100% free and open-source. We do not place paywalls or run annoying tracking scripts. Our goal is to help developers, startups, and enterprise architects build cost-effective AI solutions with confidence."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn">
      
      {/* 1. Hero Block */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
          <Sparkles className="h-4 w-4" />
          <span>About Our Platform</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Making AI Costs Transparent
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
          AI Cost Planner is an open-source intelligence platform designed to help developers, teams, and finance directors estimate, optimize, and audit their LLM expenditure before deploying code.
        </p>
      </div>

      {/* 2. Mission & Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-650 dark:text-indigo-400" />
            <span>Our Mission</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-350">
            In the rapidly evolving world of artificial intelligence, building complex agentic systems can lead to unpredictable API bills. A single bad loop, massive retrieved documents, or unoptimized prompts can result in thousands of dollars in unexpected charges.
          </p>
          <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-350">
            We built **AI Cost Planner** to bring clarity and control back to developers. By providing interactive calculators, visual budget planning constraints, and side-by-side model matrix comparisons, we ensure that you build with your eyes wide open.
          </p>
        </div>
        
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-800 p-8 text-white shadow-xl dark:from-slate-800 dark:via-blue-950 dark:to-slate-900 dark:shadow-none">
          <h3 className="text-xl font-extrabold">Open-Source & Community First</h3>
          <p className="mt-3 text-xs text-indigo-100 leading-relaxed">
            We believe cost calculators should be transparent, verified, and free. You can view our source code on GitHub, add custom models, suggest formulas, or deploy it privately inside your secure network.
          </p>
          
          <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
            <div>
              <span className="block text-2xl font-black">20+</span>
              <span className="text-[10px] uppercase text-indigo-200 tracking-wider font-semibold">Static Models</span>
            </div>
            <div>
              <span className="block text-2xl font-black">260+</span>
              <span className="text-[10px] uppercase text-indigo-200 tracking-wider font-semibold">Live APIs</span>
            </div>
            <div>
              <span className="block text-2xl font-black">100%</span>
              <span className="text-[10px] uppercase text-indigo-200 tracking-wider font-semibold">Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Three Core Pillars */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-10">
          Why Choose AI Cost Planner?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-650 dark:bg-indigo-950 dark:text-indigo-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-bold text-slate-950 dark:text-white text-base">Unbiased Calculations</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-450 font-medium">
              We are not sponsored by any model providers. Our pricing rates are direct mirrors of their official documentation and API rate feeds.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
              <BarChart2 className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-bold text-slate-950 dark:text-white text-base">Multi-Currency Scaling</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-450 font-medium">
              Easily toggle between **USD ($)** and **INR (₹)** across calculators and planning grids to match your corporate banking or regional expenses.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-100 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-bold text-slate-950 dark:text-white text-base">Privacy Compliant</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-450 font-medium">
              No registration required. We do not save your keys or record your custom inputs. All calculations run strictly in your client browser.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Interactive FAQs */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-10 flex items-center justify-center space-x-2">
          <HelpCircle className="h-6 w-6 text-indigo-505" />
          <span>Frequently Asked Questions</span>
        </h2>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-150/70 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white text-sm hover:bg-slate-50/50 dark:hover:bg-slate-850/20 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-850/50 animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
