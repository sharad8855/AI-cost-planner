import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowLeft, BookOpen, Heart, Share2, Sparkles, MessageSquare } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  author: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
}

export function Blog() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const articles: Article[] = [
    {
      id: "prompt-caching-llm-costs",
      title: "How to Reduce Your LLM API Bills by 80% with Prompt Caching",
      excerpt: "Learn how modern model providers allow you to cache large inputs (system instructions, retrieved docs) to radically reduce your API costs.",
      category: "Cost Optimization",
      publishDate: "June 15, 2026",
      author: "Alex Rivers (Lead Architect)",
      readTime: "6 min read",
      tags: ["Prompt Caching", "Anthropic", "Gemini", "OpenAI"],
      content: (
        <div className="space-y-5 text-slate-700 dark:text-slate-300">
          <p className="text-base leading-relaxed">
            In modern AI application development, input context windows are growing larger. Developers routinely inject massive developer handbooks, corporate guidelines, legal directories, or vector database (RAG) snippets into the context of every single user prompt. 
          </p>
          <p>
            However, this comes with a severe cost penalty: if your system instructions or RAG contexts span 50,000 tokens, you pay the input token rate on those 50,000 tokens for **every query**. For flagship models, this runs up bills extremely quickly.
          </p>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">The Solution: Prompt Caching</h3>
          <p>
            Prompt Caching allows the API server to temporarily store the compiled prefix of a prompt (e.g. system instructions, files, document snippets). When a subsequent request is received that shares the same prefix, the model provider reads it from the cache, charging you a significantly reduced **Prompt Cache Write/Read Rate**.
          </p>

          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl dark:bg-slate-950/40 dark:border-slate-850 my-6">
            <h4 className="font-bold text-xs text-indigo-700 dark:text-indigo-400 uppercase tracking-widest block mb-2">Cost Breakdown Comparison</h4>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-2">Model Provider</th>
                  <th className="py-2">Standard Input / 1M</th>
                  <th className="py-2">Cached Input / 1M</th>
                  <th className="py-2">Savings Delta</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-slate-850">
                  <td className="py-2 font-bold">Anthropic Claude 3.5 Sonnet</td>
                  <td className="py-2">$3.00</td>
                  <td className="py-2">$0.30</td>
                  <td className="py-2 text-emerald-600 font-bold">90% off</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-850">
                  <td className="py-2 font-bold">Google Gemini 1.5 Pro</td>
                  <td className="py-2">$1.25</td>
                  <td className="py-2">$0.3125</td>
                  <td className="py-2 text-emerald-600 font-bold">75% off</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">How to Implement Prompt Caching</h3>
          <p>
            Implementing prompt caching usually requires structured ordering. The cache matches from the absolute beginning of the prompt sequence, so you must place all **static elements first** and user queries last.
          </p>

          <div className="rounded-xl bg-slate-950 p-4 font-mono text-[11px] text-slate-300 leading-normal block overflow-x-auto">
            <span className="text-slate-500">// Example structuring for Claude 3.5 Sonnet</span><br />
            {`import Anthropic from "@anthropic-ai/sdk";`} <br />
            {`const client = new Anthropic();`} <br /><br />
            {`const response = await client.messages.create({`} <br />
            {`  model: "claude-3-5-sonnet-20241022",`} <br />
            {`  max_tokens: 1024,`} <br />
            {`  system: [`} <br />
            {`    {`} <br />
            {`      type: "text",`} <br />
            {`      text: "You are an expert system analyst... [Very Large Static Text Here]",`} <br />
            {`      cache_control: {"type": "ephemeral"} // Triggers caching of this prefix`} <br />
            {`    }`} <br />
            {`  ],`} <br />
            {`  messages: [{ role: "user", content: "Analyze our budget plan." }]`} <br />
            {`});`}
          </div>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">Key Constraints to Remember</h3>
          <ul className="list-disc pl-6 space-y-1.5 text-xs. leading-relaxed">
            <li>**Minimum Sizes**: Anthropic requires prompts to be at least 1,024 tokens to cache. Gemini requires 32,768 tokens. Smaller prompts will not be cached.</li>
            <li>**TTL (Time-to-Live)**: Cache states are ephemeral. They usually persist for 5 to 10 minutes from the last query. High-frequency traffic benefits most.</li>
          </ul>
        </div>
      )
    },
    {
      id: "deepseek-r1-vs-gpt4o-costs",
      title: "DeepSeek-R1 vs. GPT-4o: A Detailed Cost & Performance Comparison",
      excerpt: "DeepSeek shook up the market with ultra-low pricing. We break down the mathematics of how R1 costs compare directly against GPT-4o.",
      category: "Model Comparison",
      publishDate: "June 08, 2026",
      author: "Miriam Chen (Data Scientist)",
      readTime: "8 min read",
      tags: ["DeepSeek R1", "GPT-4o", "OpenRouter", "Reasoning Models"],
      content: (
        <div className="space-y-5 text-slate-700 dark:text-slate-300">
          <p className="text-base leading-relaxed">
            The release of DeepSeek R1 disrupted the AI pricing landscape. Traditionally, advanced reasoning models (like OpenAI's o1 series) carried premium tags of up to $15 per million input tokens and $60 per million output tokens.
          </p>
          <p>
            DeepSeek R1 offers comparable coding and logical reasoning capabilities for a fraction of the cost, raising questions about whether standard developers should migrate their core logic flows.
          </p>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">The Mathematics of Token Costs</h3>
          <p>
            Let's evaluate a standard workload of **1,000,000 input tokens** and **1,000,000 output tokens** on both platforms:
          </p>

          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl dark:bg-slate-950/40 dark:border-slate-850 my-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-150/65 dark:bg-slate-900 dark:border-slate-800">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">1. GPT-4o Runrate</span>
                <span className="block text-sm font-extrabold text-slate-905 dark:text-slate-100">$2.50 In / $10.00 Out</span>
                <span className="block text-xs text-rose-600 font-bold mt-1">Total: $12.50 per 1M roundtrip</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-150/65 dark:bg-slate-900 dark:border-slate-800">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">2. DeepSeek R1 Runrate</span>
                <span className="block text-sm font-extrabold text-slate-905 dark:text-slate-100">$0.55 In / $2.19 Out</span>
                <span className="block text-xs text-emerald-600 font-bold mt-1">Total: $2.74 per 1M roundtrip</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              DeepSeek R1 is approximately **78% cheaper** per million tokens compared to GPT-4o, while carrying expert-level mathematical reasoning scores.
            </p>
          </div>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">The Reasoning Overhead Catch</h3>
          <p>
            However, there is a technical details catch to R1: **Thinking Tokens**. 
            DeepSeek R1 generates internal reasoning tokens (e.g. `&lt;think&gt; ... &lt;/think&gt;`) before outputting its final response. You are billed for these thinking tokens at the standard output rate!
          </p>
          <p>
            If a query is complex, R1 might generate 2,000 thinking tokens to write a 200-token answer. In this case, your billed output tokens scale to 2,200. In contrast, GPT-4o writes a 200-token answer directly.
          </p>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">Which Model to Select?</h3>
          <ul className="list-disc pl-6 space-y-1 text-xs.">
            <li>**Select DeepSeek R1 for**: Complex logical proofs, difficult programming abstractions, and code auditing.</li>
            <li>**Select GPT-4o for**: Low-latency structured vision output, swift conversational agents, and short RAG summaries.</li>
          </ul>
        </div>
      )
    },
    {
      id: "context-window-cost-tradeoffs",
      title: "Choosing the Right Context Window: Cost vs. Performance Tradeoffs",
      excerpt: "Does your app really need 1 Million context tokens? We discuss how large contexts impact query latency and monthly expenditures.",
      category: "Architecture",
      publishDate: "May 29, 2026",
      author: "Vikram Sen (Cloud Architect)",
      readTime: "5 min read",
      tags: ["Context Window", "Gemini 1.5 Pro", "RAG", "LLM Latency"],
      content: (
        <div className="space-y-5 text-slate-700 dark:text-slate-300">
          <p className="text-base leading-relaxed">
            With Google Gemini supporting up to 2 Million context tokens, developers are starting to upload entire codebases, audio files, and complete PDF libraries directly into single prompt calls.
          </p>
          <p>
            While this is incredibly convenient, it presents key challenges in both financial expenditures and execution speed.
          </p>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">The True Cost of a 1M Context Query</h3>
          <p>
            Let's evaluate sending a full 1,000,000 tokens of context to **Gemini 1.5 Pro**:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs.">
            <li>**Standard rate (under 128K context)**: $1.25 per 1M input tokens.</li>
            <li>**Long context rate (over 128K context)**: $2.50 per 1M input tokens (Google charges double for long-context prompts!).</li>
            <li>**Single prompt cost**: $2.50. If you make 1,000 of these requests per day, your monthly bill is **$75,000**.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">Impact on Time-to-First-Token (TTFT)</h3>
          <p>
            Large context inputs significantly slow down model response times. Every input token must be processed by the model's attention layers. For a 1M token input, TTFT can swell from 1 second up to 15-20 seconds depending on the model's load.
          </p>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">Optimization Strategies</h3>
          <p>
            To keep your application fast and affordable, implement these patterns:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-xs. font-semibold">
            <li>
              <strong className="text-slate-900 dark:text-white">Implement Chunked RAG</strong>: Use vector search to retrieve only the 5-10 most relevant chunks (e.g. 5,000 tokens) rather than passing the entire document library.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Active Prompt Caching</strong>: If you must use massive system prompts or legal manuals, use prompt caching to receive 75% to 90% discount on input rates.
            </li>
          </ol>
        </div>
      )
    },
    {
      id: "openrouter-dynamic-rates",
      title: "A Guide to OpenRouter API Rates and Dynamic Price Synchronization",
      excerpt: "How OpenRouter coordinates model pricing feeds dynamically, and how you can leverage it to dynamically route requests based on cost.",
      category: "API Integration",
      publishDate: "May 20, 2026",
      author: "Sara Jenkins (Lead Developer)",
      readTime: "7 min read",
      tags: ["OpenRouter", "Dynamic Pricing", "API Integration", "Routing"],
      content: (
        <div className="space-y-5 text-slate-700 dark:text-slate-300">
          <p className="text-base leading-relaxed">
            OpenRouter acts as a unified gateway for LLMs. Instead of integrating individual API clients for OpenAI, Anthropic, Mistral, Google, DeepSeek, and Meta, developers link to OpenRouter with a single API key and structure.
          </p>
          <p>
            One of OpenRouter's most powerful features is its **Dynamic Model Pricing**. Rates for hosting providers can fluctuate based on supply, server demand, or host migrations.
          </p>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">How OpenRouter Exposes Model Rates</h3>
          <p>
            OpenRouter provides a public endpoint (`https://openrouter.ai/api/v1/models`) that lists all available models, their context limits, and their input/output token pricing. Here is how you can query it:
          </p>

          <div className="rounded-xl bg-slate-950 p-4 font-mono text-[11px] text-slate-300 leading-normal block overflow-x-auto">
            <span className="text-slate-500">// Dynamic rates fetch helper in Node/TS</span><br />
            {`async function getModelPrices() {`} <br />
            {`  const response = await fetch("https://openrouter.ai/api/v1/models");`} <br />
            {`  const json = await response.json();`} <br />
            {`  return json.data.map(model => ({`} <br />
            {`    id: model.id,`} <br />
            {`    name: model.name,`} <br />
            {`    inputCost: model.pricing.prompt, // Price per token`} <br />
            {`    outputCost: model.pricing.completion`} <br />
            {`  }));`} <br />
            {`}`}
          </div>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-3">Dynamic Routing Based on Cost</h3>
          <p>
            By fetching rates programmatically, you can write fallback routing mechanisms. For example, if your primary model (e.g. Claude 3.5 Sonnet) is running high latency or has reached rate thresholds, you can route queries dynamically to a matched budget generalist like Gemini 1.5 Flash.
          </p>
        </div>
      )
    }
  ];

  const handleBack = () => {
    setSelectedArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeArticle = articles.find(a => a.id === selectedArticleId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn">
      
      {activeArticle ? (
        // 1. FULL ARTICLE VIEW
        <article className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition mb-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all articles</span>
          </button>

          {/* Meta Info */}
          <div className="space-y-4">
            <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold tracking-wide text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-405 uppercase">
              {activeArticle.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-905 dark:text-white leading-tight">
              {activeArticle.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-2 border-b border-slate-100 dark:border-slate-800 pb-6">
              <span className="flex items-center">
                <User className="mr-1.5 h-3.5 w-3.5" />
                {activeArticle.author}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                {activeArticle.publishDate}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                {activeArticle.readTime}
              </span>
            </div>
          </div>

          {/* Content block */}
          <div className="mt-8">
            {activeArticle.content}
          </div>

          {/* Article Footer details */}
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 font-bold uppercase mr-1">Tags:</span>
              {activeArticle.tags.map(t => (
                <span key={t} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <button 
                title="Like article"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50/20 transition cursor-pointer"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button 
                title="Share article"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/20 transition cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
      ) : (
        // 2. BLOG INDEX GRID LISTING
        <div>
          {/* Header titles */}
          <div className="mb-12 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
              <BookOpen className="h-4 w-4" />
              <span>Developer Knowledge Base</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              AI Cost & Architecture Blog
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
              Practical strategies, algorithms, and breakdowns to help engineers choose model layers, plan token budgets, and implement caching systems.
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id}
                onClick={() => handleSelectArticle(article.id)}
                className="group cursor-pointer rounded-3xl border border-slate-150/70 bg-white p-6 shadow-md hover:shadow-xl hover:border-indigo-150 transition flex flex-col justify-between dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white group-hover:text-indigo-605 group-hover:dark:text-indigo-400 transition leading-snug">
                    {article.title}
                  </h3>
                  
                  <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[10px] text-slate-450 font-semibold">
                    By {article.author.split(" (")[0]}
                  </div>
                  <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                    <span>Read Article</span>
                    <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Segment */}
          <div className="mt-16 rounded-3.5xl bg-slate-50 border border-slate-150/70 p-8 sm:p-10 dark:bg-slate-950/20 dark:border-slate-850/80 text-center max-w-4xl mx-auto">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Cost Optimization Feed</span>
            <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Get weekly cost-efficiency insights
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              We write architectural logs on prompt design, token scaling, caching updates, and OpenRouter rate structures. No spam.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row items-stretch justify-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-950 dark:text-white font-medium"
              />
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 text-xs rounded-xl transition duration-150 shadow-sm cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
