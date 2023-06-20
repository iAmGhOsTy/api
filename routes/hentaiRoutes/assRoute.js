require('dotenv').config();
const express = require("express");
const router = express.Router();
const ass = require("../../endpoints/image/hentai/ass.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${ass[~~(Math.random() * ass.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;