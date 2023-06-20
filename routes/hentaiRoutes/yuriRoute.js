require('dotenv').config();
const express = require("express");
const router = express.Router();
const yuri = require("../../endpoints/image/hentai/yuri.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${yuri[~~(Math.random() * yuri.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;