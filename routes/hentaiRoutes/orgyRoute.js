require('dotenv').config();
const express = require("express");
const router = express.Router();
const orgy = require("../../endpoints/image/hentai/orgy.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${orgy[~~(Math.random() * orgy.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;