const express = require("express");
const router = express.Router();
let dare = require("../../endpoints/tod/dares.json");

router.get("/", (req, res) => {
  res.status(200).json({ data: dare[Math.floor(Math.random() * dare.length)] });
});

module.exports = router;
