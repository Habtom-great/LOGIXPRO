export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SectionContent {
  id: string;
  title: string;
  content: string; // Markdown or rich text
  diagrams?: string[];
  examples?: { title: string; logic: string; description: string }[];
  quiz?: QuizQuestion[];
}

export interface Exercise {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  hint?: string;
  solution?: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  audio?: string;
}
