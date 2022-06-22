export const CURRENT_QUESTION = "CURRENT_QUESTION";

export function setCurrentQuestion(question) {
  return {
    type: CURRENT_QUESTION,
    question,
  };
}
