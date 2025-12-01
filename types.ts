export enum Difficulty {
  Junior = 'Junior',
  MidLevel = 'Mid-Level',
  Senior = 'Senior',
  Expert = 'Expert'
}

export enum AppStatus {
  Idle = 'idle',
  GeneratingQuestions = 'generating_questions',
  Interviewing = 'interviewing',
  Evaluating = 'evaluating', // Evaluating a single answer
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
  type?: QuestionType; // Defaults to Text if undefined
  modelAnswer?: string; // Pre-defined answer or code solution
}

export interface Evaluation {
  questionId: string;
  score: number; // 1-10
  feedback: string;
  idealAnswer: string;
  userAnswer: string;
}

export interface InterviewSessionData {
  topic: string;
  jobRole: string;
  difficulty: Difficulty;
  questions: Question[];
  evaluations: Record<string, Evaluation>;
  currentQuestionIndex: number;
}