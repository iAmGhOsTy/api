require('dotenv').config();
const express = require("express");
const router = express.Router();
const co = require("../../endpoints/image/hentai/cuckold.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${co[~~(Math.random() * co.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;