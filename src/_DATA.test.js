import {
  _saveQuestion,
  _saveQuestionAnswer,
  generateUID,
  _getQuestions,
  _getUsers,
} from "./_DATA.js";

let saveQuestion = _saveQuestion;
let saveQuestionAnswer = _saveQuestionAnswer;

describe("_saveQuestion", () => {
  it("returns a question", async () => {
    const question = {
      id: "test-id",
      timestamp: Date.now(),
      author: "test-author",
      optionOneText: "test-optionOneText",
      optionTwoText: "test-optionTwoText",
    };
    const result = await saveQuestion(question);
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        author: expect.any(String),
        optionOne: expect.objectContaining({
          text: expect.any(String),
          votes: expect.arrayContaining([]),
        }),
        optionTwo: expect.objectContaining({
          text: expect.any(String),
          votes: expect.arrayContaining([]),
        }),
      })
    );
  });

  it("throws an error if invalid question", async () => {
    const question = {
      id: "test-id",
      timestamp: Date.now(),
    };
    const error = await saveQuestion(question).catch((e) => e);
    expect(error).toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("returns true if correctly formatted data is passed", async () => {
    const authedUser = "sarahedo";
    const qid = "6ni6ok3ym7mf1p33lnez";
    const answer = "optionTwo";
    const result = await saveQuestionAnswer({ authedUser, qid, answer });
    expect(result).toEqual(true);
  });
  it("throws an error if invalid data is passed", async () => {
    const authedUser = "sarahedo";
    const qid = "6ni6ok3ym7mf1p33lnez";
    const error = await saveQuestionAnswer({ authedUser, qid }).catch((e) => e);
    expect(error).toEqual("Please provide authedUser, qid, and answer");
  });
});

describe("generateUID", () => {
  it("returns a random string", () => {
    const resultOne = generateUID();
    const resultTwo = generateUID();
    expect(resultOne).not.toEqual(resultTwo);
  });
});
