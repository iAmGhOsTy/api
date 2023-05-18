const express = require("express");
const router = express.Router();
let nhie = require('../../endpoints/tod/nhie.json');

router.get("/", (req, res) => {
    type = req.query.type || "normal";  // settings type (NSFW, NORMAL, pg13) else normal
    let nhie1 = nhie.filter(o => o.type == type.toLowerCase())[0];
    if (!nhie1) return res.status(500).json({ data: "Can't find that type of data." });
    res.status(200).json({ data: nhie1.item[Math.floor(Math.random() * nhie1.item.length)], type: nhie1.type })
  });

module.exports = router;
