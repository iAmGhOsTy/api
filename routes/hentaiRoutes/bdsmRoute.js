require('dotenv').config();
const express = require("express");
const router = express.Router();
const bdsm = require("../../endpoints/image/hentai/bdsm.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${bdsm[~~(Math.random() * bdsm.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;