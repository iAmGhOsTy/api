const express = require("express");
const router = express.Router();
let wyr = require("../../endpoints/tod/wyr.json");

router.get("/", (req, res) => {
  res.status(200).json({ data: wyr[Math.floor(Math.random() * wyr.length)] });
});

module.exports = router;
