export interface QuizQuestion {
  question: string;
  questionAm?: string;
  options: string[];
  optionsAm?: string[];
  correctAnswer: number;
  explanation: string;
  explanationAm?: string;
}

export interface SectionContent {
  id: string;
  title: string;
  titleAm?: string;
  content: string; // Markdown or rich text
  contentAm?: string;
  diagrams?: string[];
  examples?: { title: string; titleAm?: string; logic: string; description: string; descriptionAm?: string }[];
  quiz?: QuizQuestion[];
}

export interface Exercise {
  id: number;
  title: string;
  titleAm?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  descriptionAm?: string;
  hint?: string;
  hintAm?: string;
  solution?: string;
  solutionAm?: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  audio?: string;
}
