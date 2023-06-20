require('dotenv').config();
const express = require("express");
const router = express.Router();
const pussy = require("../../endpoints/image/hentai/pussy.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${pussy[~~(Math.random() * pussy.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;