require('dotenv').config();
const express = require("express");
const router = express.Router();
const bj = require("../../endpoints/image/hentai/blowjob.json")
router.get('/', (req, res) => {
  try{
    res.status(200).json({
      data: `${bj[~~(Math.random() * bj.length)]}`
  })
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching hentai');
  }
});

module.exports = router;