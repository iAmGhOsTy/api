require('dotenv').config();
const express = require("express");
const router = express.Router();
const cum = require("../../endpoints/image/hentai/cum.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${cum[~~(Math.random() * cum.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;