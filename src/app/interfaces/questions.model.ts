import { QuestionsChildItems } from './questions-child-items.model';

export interface Questions {
  patientQuestions: [{
    QuestionControl: string;
    title: string;
    type: string;
    options?:  string[];
    ConrolsToReset?:  string[];
    answersLabel?: string[];
    answersValue?: string[];
    childItems?: QuestionsChildItems[];
  }];
}
