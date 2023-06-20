require('dotenv').config();
const express = require("express");
const router = express.Router();
const ahegao = require("../../endpoints/image/hentai/ahegao.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${ahegao[~~(Math.random() * ahegao.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;