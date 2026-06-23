import React from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn text-slate-700 dark:text-slate-355">
      
      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center space-x-2 rounded-lg bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
          <Shield className="h-4 w-4" />
          <span>Security & Compliance</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-450 dark:text-slate-400 text-xs font-semibold">
          Last Updated: June 23, 2026 • AI Cost Planner
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        
        {/* Intro */}
        <section className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 dark:bg-slate-900/10 dark:border-slate-850">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Introduction</h3>
          <p>
            At **AI Cost Planner**, accessible from our domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AI Cost Planner and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
        </section>

        {/* General Policy */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Lock className="h-4.5 w-4.5 text-indigo-650" />
            <span>1. Client-Side Operations & Calculations</span>
          </h3>
          <p>
            AI Cost Planner operates as a client-side calculation utility. All token values, custom budgets, slider inputs, and request values that you input are processed directly inside your web browser. 
          </p>
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">
            ✓ We do not collect, transmit, store, or share your custom pricing formulas or private system parameters on our databases.
          </p>
        </section>

        {/* Log Files */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Eye className="h-4.5 w-4.5 text-indigo-650" />
            <span>2. Log Files</span>
          </h3>
          <p>
            AI Cost Planner follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </section>

        {/* Google AdSense / Third-party cookies */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <CheckCircle className="h-4.5 w-4.5 text-indigo-650" />
            <span>3. Cookies and Web Beacons (Google AdSense Disclosure)</span>
          </h3>
          <p>
            Like any other website, AI Cost Planner may use 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
          <p className="bg-amber-50/30 border border-amber-100 p-4 rounded-xl dark:bg-amber-950/10 dark:border-amber-900/30 text-xs">
            <strong>Google DoubleClick DART Cookie:</strong> Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to AI Cost Planner and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" className="text-indigo-600 dark:text-indigo-400 hover:underline">https://policies.google.com/technologies/ads</a>
          </p>
        </section>

        {/* Third Party Policies */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">4. Third-Party Privacy Policies</h3>
          <p>
            AI Cost Planner's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </section>

        {/* Children Info */}
        <section className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">5. Children's Information</h3>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. AI Cost Planner does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>
        </section>

        {/* Consent */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">6. Consent</h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </section>

      </div>

    </div>
  );
}
