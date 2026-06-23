import React, { useState } from 'react';
import { Mail, Github, Twitter, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Simple validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    // Simulate API Submission
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      topic: 'general',
      message: ''
    });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn">
      
      {/* Visual Title Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
          <MessageSquare className="h-4 w-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Contact Our Team
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Have questions about calculations? Found a pricing discrepancy? Want to suggest new models? Reach out directly, and we will get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
          
          {/* Card 1: Email Support */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-650 dark:bg-indigo-950 dark:text-indigo-400">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <h4 className="mt-4 font-bold text-slate-950 dark:text-white text-base">Direct Email</h4>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              For security, partnership integrations, or business enquiries:
            </p>
            <a 
              href="mailto:support@aicostplanner.com" 
              className="mt-3 block text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
            >
              support@aicostplanner.com
            </a>
          </div>

          {/* Card 2: Github Issues */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              <Github className="h-4.5 w-4.5" />
            </div>
            <h4 className="mt-4 font-bold text-slate-950 dark:text-white text-base">Open-Source Issues</h4>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Found a bug or incorrect static model rate? Open a ticket on GitHub:
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-3 block text-sm font-bold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:underline"
            >
              github.com/issues →
            </a>
          </div>

          {/* Card 3: Social Feed */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
              <Twitter className="h-4.5 w-4.5" />
            </div>
            <h4 className="mt-4 font-bold text-slate-950 dark:text-white text-base">Twitter / X</h4>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Follow us or slide into our DMs for community announcements:
            </p>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-3 block text-sm font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 hover:underline"
            >
              @AICostPlanner
            </a>
          </div>

        </div>

        {/* Right Column: Contact Form Segment */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-850 dark:bg-slate-900 h-full flex flex-col justify-center min-h-[420px]">
            
            {isSubmitted ? (
              // Success presentation layout
              <div className="text-center py-10 px-4 animate-scaleUp space-y-5">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 shadow-inner">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-slate-950 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been received. Our developer support team will review it and follow up within 24-48 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl bg-indigo-650 hover:bg-indigo-700 hover:scale-[1.01] active:scale-100 text-white font-bold text-xs px-6 py-3 transition duration-150 shadow-md cursor-pointer inline-flex items-center"
                >
                  Send another message
                </button>
              </div>
            ) : (
              // Interactive Form layout
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display font-bold text-lg text-slate-905 dark:text-white flex items-center gap-2">
                  <span>Send a Secured message</span>
                </h3>

                {errorMessage && (
                  <div className="rounded-xl bg-rose-50 border border-rose-100 p-3.5 flex items-start space-x-2.5 text-xs text-rose-800 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-300">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-600 dark:text-rose-455" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharad Waje"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-205 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sharad@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-205 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                {/* Topic select */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 mb-1.5">
                    Topic of inquiry
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-slate-205 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white cursor-pointer"
                  >
                    <option value="general">General Question</option>
                    <option value="discrepancy">Pricing Discrepancy Alert</option>
                    <option value="feature">Model / Feature Suggestion</option>
                    <option value="commercial">Enterprise Consulting / API Support</option>
                  </select>
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 mb-1.5">
                    Message Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your query here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-205 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-705 text-white font-bold text-xs py-3.5 transition duration-150 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
