const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  const { word } = req.query;
  try {
    const data = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`);
    if (!data.ok) {
      throw new Error("Request failed");
    }
    const urban = await data.json();
    const urbanData = {
      word: urban.list[0].word,
      definition: urban.list[0].definition,
      example: urban.list[0].example,
    };
    res.status(200).json({ data: urbanData });
  } catch (error) {
    res.status(400).json({ error: "An error occurred" });
    console.error(error);
  }
});

module.exports = router;
