require('dotenv').config();
const express = require("express");
const router = express.Router();
const panties = require("../../endpoints/image/hentai/panties.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${panties[~~(Math.random() * panties.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;