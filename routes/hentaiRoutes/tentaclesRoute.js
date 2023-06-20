require('dotenv').config();
const express = require("express");
const router = express.Router();
const tentacles = require("../../endpoints/image/hentai/tentacles.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${tentacles[~~(Math.random() * tentacles.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;