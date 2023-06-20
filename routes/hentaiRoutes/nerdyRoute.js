require('dotenv').config();
const express = require("express");
const router = express.Router();
const nerdy = require("../../endpoints/image/hentai/glasses.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${nerdy[~~(Math.random() * nerdy.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;