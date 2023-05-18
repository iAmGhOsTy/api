const express = require("express");
const router = express.Router();
let truth = require("../../endpoints/tod/truths.json");

router.get("/", (req, res) => {
  res.status(200).json({ data: truth[Math.floor(Math.random() * truth.length)] });
});

module.exports = router;
