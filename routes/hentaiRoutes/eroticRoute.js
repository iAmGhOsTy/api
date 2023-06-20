require('dotenv').config();
const express = require("express");
const router = express.Router();
const ero = require("../../endpoints/image/hentai/ero.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${ero[~~(Math.random() * ero.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;