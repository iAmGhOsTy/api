const facts = require("../endpoints/fact/facts.json");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   try {
        res.status(200).json({ fact: facts[Math.floor(Math.random() * facts.length)] })
    } catch (e) { console.log(e) }
});
module.exports = router;