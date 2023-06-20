require('dotenv').config();
const express = require("express");
const router = express.Router();
const manga = require("../../endpoints/image/hentai/manga.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${manga[~~(Math.random() * manga.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;