const quotes = require("../endpoints/quotes.json");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        res.status(200).json({ quote: randomQuote.quote, author: randomQuote.author });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
