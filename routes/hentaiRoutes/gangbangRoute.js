require('dotenv').config();
const express = require("express");
const router = express.Router();
const gangbang = require("../../endpoints/image/hentai/gangbang.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${gangbang[~~(Math.random() * gangbang.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;