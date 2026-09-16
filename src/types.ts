export interface BusinessInfo {
  name: string;
  founderName: string;
  mentorMoniker: string;
  title: string;
  description: string;
  email: string;
  whatsapp: string;
  whatsappUrl: string;
  tiktokHandle?: string;
  tiktokUrl?: string;
  hours: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface OnboardingStep {
  step: number;
  title: string;
  instruction: string;
  actionText?: string;
}

export interface StrategyConcept {
  id: string;
  title: string;
  subtitle: string;
  tag: 'ICT' | 'CRT' | 'RISK';
  summary: string;
  details: string[];
  formulaOrRule?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isFallback?: boolean;
  isEscalated?: boolean;
}
