export interface Question {
  QuestionControl: string;
  title: string;
  type: string;
  ConrolsToReset?: string[];
  answersLabel?: string[];
  answersValue?: string[];
  options?: string[];
  RelativeToControlName?: string;
  ParentAns?: string;
}
