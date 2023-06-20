require('dotenv').config();
const express = require("express");
const router = express.Router();
const thighs = require("../../endpoints/image/hentai/thighs.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${thighs[~~(Math.random() * thighs.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;