export enum Difficulty {
  Junior = 'Junior',
  MidLevel = 'Mid-Level',
  Senior = 'Senior',
  Expert = 'Expert'
}

export enum AppStatus {
  Idle = 'idle',
  GeneratingQuestions = 'generating_questions',
  Interviewing = 'interviewing', // Re-used for "Studying" state
  Results = 'results',
  Error = 'error'
}

export enum QuestionType {
  Text = 'text',
  Code = 'code'
}

export interface Question {
  id: string;
  text: string;
  hint: string;
  topic: string;
  type?: QuestionType;
  modelAnswer?: string; // For curated questions
  answer?: string; // For AI generated questions (merged in UI)
  example?: string; // Simple code example
}

export interface InterviewSessionData {
  topic: string;
  jobRole: string;
  difficulty: Difficulty;
  questions: Question[];
  currentQuestionIndex: number;
}