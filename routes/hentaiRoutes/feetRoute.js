require('dotenv').config();
const express = require("express");
const router = express.Router();
const foot = require("../../endpoints/image/hentai/foot.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${foot[~~(Math.random() * foot.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;