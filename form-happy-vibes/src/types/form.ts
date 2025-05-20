
export type QuestionType = 'text' | 'checkbox' | 'rating' | 'multipleChoice';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
}

export interface FeedbackForm {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

type AnswerType = string | number | boolean | string[];

interface QuestionAnswer {
  [key: string]: AnswerType; // Key is question ID, value is the answer
}
export interface FormResponse {
  formId: string;
  clientName: string;
  clientEmail: string;
  answers: QuestionAnswer;
}
