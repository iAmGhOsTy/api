require('dotenv').config();
const express = require("express");
const router = express.Router();
const femdom = require("../../endpoints/image/hentai/femdom.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${femdom[~~(Math.random() * femdom.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;