const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
   try {
    const data = await fetch(`https://opentdb.com/api.php?amount=1&category=0`)
    const triviaD = await data.json()

    const trivia = {
        question: triviaD.results[0].question,
        correct_answer: triviaD.results[0].correct_answer,
        incorrect_answers: triviaD.results[0].incorrect_answers,
        type: triviaD.type,
    }

        res.status(200).json( trivia )
    } catch (e) { console.log(e) }
});
module.exports = router;