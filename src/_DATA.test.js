import { _saveQuestion } from "./_DATA";

let saveQuestion = _saveQuestion

describe("_saveQuestion", () => {
    it("returns a question", async () => {
        const question = {
            id: "test-id",
            timestamp: Date.now(),
            author: "test-author",
            optionOneText: "test-optionOneText",
            optionTwoText: "test-optionTwoText",
        }
        const result = await saveQuestion(question)
        console.log(result)
        expect(result).toEqual(expect.objectContaining({
            id: expect.any(String),
            timestamp: expect.any(Number),
            author: expect.any(String),
           optionOne : expect.objectContaining({
                text: expect.any(String),
                votes: expect.arrayContaining([])
            }),
            optionTwo : expect.objectContaining({
                text: expect.any(String),
                votes: expect.arrayContaining([])
            }),
        }))
    })

})