require('dotenv').config();
const express = require("express");
const router = express.Router();
const hentai = require("../../endpoints/image/hentai/hentai.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${hentai[~~(Math.random() * hentai.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;