import { AIModel, UseCaseData } from '../types';

export const AI_MODELS: AIModel[] = [
  // --- OPENAI ---
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputCostPerMillion: 2.50,
    outputCostPerMillion: 10.00,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Very High',
    reasoning: 'Very High',
    bestFor: 'Multimodal applications, complex logic pipelines, real-time structured vision inputs',
    strength: 'Flagship Balanced Omnimodal',
    iconType: 'openai'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 0.60,
    contextWindow: '128K',
    speed: 'Very Fast',
    coding: 'High',
    reasoning: 'High',
    bestFor: 'High-frequency messaging, lightweight agent pipelines, formatting unstructured data',
    strength: 'Best Value Generalist',
    iconType: 'openai'
  },
  {
    id: 'o1',
    name: 'OpenAI o1',
    provider: 'OpenAI',
    inputCostPerMillion: 15.00,
    outputCostPerMillion: 60.00,
    contextWindow: '200K',
    speed: 'Medium-Slow',
    coding: 'Exceptional',
    reasoning: 'Exceptional',
    bestFor: 'Scientific exploration, intricate mathematical proof calculation, expert level codebases',
    strength: 'Maximum Thinking SOTA',
    iconType: 'openai'
  },
  {
    id: 'o1-mini',
    name: 'OpenAI o1-mini',
    provider: 'OpenAI',
    inputCostPerMillion: 3.00,
    outputCostPerMillion: 12.00,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Exceptional',
    reasoning: 'Exceptional',
    bestFor: 'Intense programming reasoning, complex logic trees, schema validation',
    strength: 'High Efficiency Reasoning',
    iconType: 'openai'
  },
  {
    id: 'o3-mini',
    name: 'OpenAI o3-mini',
    provider: 'OpenAI',
    inputCostPerMillion: 1.10,
    outputCostPerMillion: 4.40,
    contextWindow: '200K',
    speed: 'Very Fast',
    coding: 'Exceptional',
    reasoning: 'Exceptional',
    bestFor: 'High-speed automated coding, multi-agent orchestrations, immediate complex logic execution',
    strength: 'SOTA Speed Reasoning',
    iconType: 'openai'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    inputCostPerMillion: 10.00,
    outputCostPerMillion: 30.00,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Very High',
    reasoning: 'Very High',
    bestFor: 'Legacy system integrations, long-running agent workflows, structured historical outputs',
    strength: 'Classic Premium Developer Standard',
    iconType: 'openai'
  },

  // --- GOOGLE GEMINI ---
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    inputCostPerMillion: 1.25,
    outputCostPerMillion: 5.00,
    contextWindow: '2M+',
    speed: 'Fast',
    coding: 'Very High',
    reasoning: 'Very High',
    bestFor: 'Extremely long legal/academic documents, deep multi-modal audio and video analysis',
    strength: 'Unrivaled 2 Million Context',
    iconType: 'google'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputCostPerMillion: 0.075,
    outputCostPerMillion: 0.30,
    contextWindow: '1M+',
    speed: 'Extremely Fast',
    coding: 'High',
    reasoning: 'High',
    bestFor: 'High-throughput text summarization, live multi-modal streaming analysis, high parallel calls',
    strength: 'Extreme Value & Versatility',
    iconType: 'google'
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    inputCostPerMillion: 0.075,
    outputCostPerMillion: 0.30,
    contextWindow: '1M+',
    speed: 'Extremely Fast',
    coding: 'Very High',
    reasoning: 'Very High',
    bestFor: 'Ultra-low latency conversational agents, native real-time video/audio processing, rapid search grounding',
    strength: 'Instant Real-time Multi-modal',
    iconType: 'google'
  },
  {
    id: 'gemini-2.0-flash-lite',
    name: 'Gemini 2.0 Flash-Lite',
    provider: 'Google',
    inputCostPerMillion: 0.0375,
    outputCostPerMillion: 0.15,
    contextWindow: '1M+',
    speed: 'Extremely Fast',
    coding: 'High',
    reasoning: 'High',
    bestFor: 'Frictionless millisecond summaries, massive scale bulk classifications, micro-chats',
    strength: 'Absolute Best Budget Context',
    iconType: 'google'
  },

  // --- ANTHROPIC ---
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputCostPerMillion: 3.00,
    outputCostPerMillion: 15.00,
    contextWindow: '200K',
    speed: 'Fast',
    coding: 'Exceptional',
    reasoning: 'Exceptional',
    bestFor: 'Advanced software development, deep academic analysis, complex multi-step reasoning agents',
    strength: 'Gold Standard Intelligence',
    iconType: 'anthropic'
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputCostPerMillion: 0.80,
    outputCostPerMillion: 4.00,
    contextWindow: '200K',
    speed: 'Very Fast',
    coding: 'Very High',
    reasoning: 'High',
    bestFor: 'High-density business logic processing, tool execution, swift automated response routing',
    strength: 'Fast Developer Workload Value',
    iconType: 'anthropic'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    inputCostPerMillion: 15.00,
    outputCostPerMillion: 75.00,
    contextWindow: '200K',
    speed: 'Medium-Slow',
    coding: 'Very High',
    reasoning: 'Exceptional',
    bestFor: 'Long-term corporate strategic planning, academic research hypotheses, intricate prose framing',
    strength: 'Premium Complex Reasoning',
    iconType: 'anthropic'
  },

  // --- DEEPSEEK ---
  {
    id: 'deepseek-chat-v3',
    name: 'DeepSeek Chat V3',
    provider: 'DeepSeek',
    inputCostPerMillion: 0.14,
    outputCostPerMillion: 0.28,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Very High',
    reasoning: 'High',
    bestFor: 'Unmatched scale-to-zero budget chat solutions, casual conversations, high-throughput text parsing',
    strength: 'Unrivaled Global Economy',
    iconType: 'deepseek'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    inputCostPerMillion: 0.55,
    outputCostPerMillion: 2.19,
    contextWindow: '128K',
    speed: 'Medium-Slow',
    coding: 'Exceptional',
    reasoning: 'Exceptional',
    bestFor: 'Mathematical validation, deep logic tree derivation, advanced cryptographic exploration',
    strength: 'Disruptive High-end Reasoning Value',
    iconType: 'deepseek'
  },

  // --- META LLAMA ---
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    inputCostPerMillion: 0.40,
    outputCostPerMillion: 0.40,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Very High',
    reasoning: 'Very High',
    bestFor: 'High-concurrency open systems, private/corporate API deployments, intelligent server routing',
    strength: 'State-of-the-Art Open Value',
    iconType: 'meta'
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    inputCostPerMillion: 0.52,
    outputCostPerMillion: 0.75,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'High',
    reasoning: 'High',
    bestFor: 'Stable open enterprise tasks, multi-lingual translations, baseline agent logic execution',
    strength: 'Robust Mature Open Weight',
    iconType: 'meta'
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    inputCostPerMillion: 0.055,
    outputCostPerMillion: 0.055,
    contextWindow: '128K',
    speed: 'Extremely Fast',
    coding: 'High',
    reasoning: 'Medium',
    bestFor: 'High-density micro-pipelines, sentiment classification, lightweight parsing, testing environment baseline',
    strength: 'Ultra Cost-effective Open-base',
    iconType: 'meta'
  },

  // --- MISTRAL ---
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'Mistral',
    inputCostPerMillion: 2.00,
    outputCostPerMillion: 6.00,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Exceptional',
    reasoning: 'Very High',
    bestFor: 'European multilingual requirements, high-precision function calling, specific tool-use agents',
    strength: 'Flagship European Specialist',
    iconType: 'mistral'
  },
  {
    id: 'codestral',
    name: 'Codestral',
    provider: 'Mistral',
    inputCostPerMillion: 1.00,
    outputCostPerMillion: 3.00,
    contextWindow: '32K',
    speed: 'Very Fast',
    coding: 'Very High',
    reasoning: 'High',
    bestFor: 'Dedicated developer autocompletions, real-time code documentation writing',
    strength: 'Dedicated Open-Weight Developer Companion',
    iconType: 'mistral'
  },

  // --- XAI ---
  {
    id: 'grok-2',
    name: 'Grok 2',
    provider: 'xAI',
    inputCostPerMillion: 2.00,
    outputCostPerMillion: 10.00,
    contextWindow: '128K',
    speed: 'Fast',
    coding: 'Very High',
    reasoning: 'Very High',
    bestFor: 'Grounded web search, real-time social/historical trend tracking, direct contextual summary',
    strength: 'SOTA Grounded Explorer',
    iconType: 'xai'
  },
  {
    id: 'grok-2-mini',
    name: 'Grok 2 Mini',
    provider: 'xAI',
    inputCostPerMillion: 0.20,
    outputCostPerMillion: 1.00,
    contextWindow: '128K',
    speed: 'Very Fast',
    coding: 'High',
    reasoning: 'High',
    bestFor: 'Instant grounded assistance, low-cost internet-aware chatbot channels',
    strength: 'Swift Web-grounded Mini',
    iconType: 'xai'
  }
];

export const USE_CASES: UseCaseData[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    avgInputTokens: 500,
    avgOutputTokens: 250,
    avgRequestsPerDay: 5000,
    description: 'General-purpose conversational agent with short system prompt and multi-turn context.'
  },
  {
    id: 'assistant',
    name: 'AI Assistant',
    avgInputTokens: 1200,
    avgOutputTokens: 600,
    avgRequestsPerDay: 3000,
    description: 'Personal productivity assistant context-rich inputs and thorough output guidance.'
  },
  {
    id: 'coding',
    name: 'Coding Assistant',
    avgInputTokens: 4000,
    avgOutputTokens: 1000,
    avgRequestsPerDay: 1500,
    description: 'Heavy code injection, terminal context, and detailed, well-structured snippet generation.'
  },
  {
    id: 'rag',
    name: 'RAG Application',
    avgInputTokens: 8000,
    avgOutputTokens: 400,
    avgRequestsPerDay: 2000,
    description: 'Information retrieval. Massive injected corpus context and concise output summaries.'
  },
  {
    id: 'support',
    name: 'Customer Support Bot',
    avgInputTokens: 2000,
    avgOutputTokens: 300,
    avgRequestsPerDay: 10000,
    description: 'High-frequency operations, standard policy documentation context, and short replies.'
  }
];
