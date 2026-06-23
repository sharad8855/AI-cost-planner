// Currency formatting & formatting numbers
export const EXCHANGE_RATE_USD_TO_INR = 83.5;

export function formatCurrency(value: number, currency: 'USD' | 'INR' = 'USD'): string {
  if (value === 0) return currency === 'USD' ? '$0.00' : '₹0.00';
  
  if (currency === 'INR') {
    const inrValue = value * EXCHANGE_RATE_USD_TO_INR;
    if (inrValue < 0.1) {
      return `₹${inrValue.toFixed(4)}`;
    } else if (inrValue < 1) {
      return `₹${inrValue.toFixed(3)}`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(inrValue);
  } else {
    if (value < 0.001) {
      return `$${value.toFixed(6)}`;
    } else if (value < 0.1) {
      return `$${value.toFixed(4)}`;
    } else if (value < 1) {
      return `$${value.toFixed(3)}`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatBriefNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

export function getModelReleaseTime(model: any): number {
  if (model.created) return model.created;

  const id = model.id.toLowerCase();
  
  // 2024-2026 top tier releases
  if (id.includes('o3-mini') || id.includes('o1') || id.includes('grok-2') || id.includes('deepseek-r1') || id.includes('gemini-2.0') || id.includes('llama-3.3')) {
    return 1735689600; // Late 2024 / 2025
  }
  if (id.includes('gpt-4o') || id.includes('gemini-1.5') || id.includes('claude-3-5') || id.includes('llama-3.1')) {
    return 1715644800; // Mid 2024
  }
  if (id.includes('gpt-4-turbo') || id.includes('claude-3-opus') || id.includes('claude-2.1') || id.includes('grok-1.5')) {
    return 1708819200; // Early 2024
  }
  if (id.includes('gpt-4') || id.includes('llama-3-8b')) {
    return 1699401600; // Late 2023
  }
  if (id.includes('gpt-3.5') || id.includes('mythomax') || id.includes('weaver')) {
    return 1685232000; // Mid 2023
  }
  return 1672531200; // Legacy 2023
}
