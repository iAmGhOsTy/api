require('dotenv').config();
const express = require("express");
const router = express.Router();
const masturbation = require("../../endpoints/image/hentai/masturbation.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${masturbation[~~(Math.random() * masturbation.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;