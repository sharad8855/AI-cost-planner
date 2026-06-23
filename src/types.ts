export interface AIModel {
  id: string;
  name: string;
  provider: string; // 'OpenAI' | 'Google' | 'Anthropic' | 'DeepSeek' | 'Meta' | 'Mistral AI'
  inputCostPerMillion: number; // in USD
  outputCostPerMillion: number; // in USD
  contextWindow: string;
  speed: 'Extremely Fast' | 'Very Fast' | 'Fast' | 'Medium' | 'Medium-Slow' | 'Slow';
  coding: 'Exceptional' | 'Very High' | 'High' | 'Medium' | 'Basic';
  reasoning: 'Exceptional' | 'Very High' | 'High' | 'Medium' | 'Basic';
  bestFor: string;
  strength: string; // e.g. "Most Powerful", "Best Value", "Great for Coding", "Budget Friendly", "Open Source"
  iconType: 'openai' | 'google' | 'anthropic' | 'deepseek' | 'meta' | 'mistral' | 'glm' | 'qwen' | 'cohere' | 'xai' | 'kimi';
  created?: number; // Unix timestamp in seconds from OpenRouter
}

export type UseCaseType = 'chatbot' | 'assistant' | 'coding' | 'rag' | 'support';

export interface UseCaseData {
  id: UseCaseType;
  name: string;
  avgInputTokens: number;
  avgOutputTokens: number;
  avgRequestsPerDay: number;
  description: string;
}

export interface CalculationResult {
  inputCost: number;
  outputCost: number;
  totalCostPerRequest: number;
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
}

export interface BudgetRecommendation {
  model: AIModel;
  estimatedRequests: number;
  costImpact: 'Cheapest Option' | 'Best Value Model' | 'Most Powerful' | 'Balanced Choice';
  strengthText: string;
}
