export interface QuestionsChildItems {
  parentAnswer: string;
  QuestionControl: string;
  title: string;
  type: string;
  options?: string[];
  ConrolsToReset?: string[];
  answersLabel?: string[];
  answersValue?: string[];
  childItems ?: QuestionsChildItems[];
}
