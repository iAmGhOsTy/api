const sent = require("../endpoints/sentences.json");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   try {
        res.status(200).json({ sentence: sent[Math.floor(Math.random() * sent.length)] })
    } catch (e) { console.log(e) }
});
module.exports = router;