require('dotenv').config();
const express = require("express");
const router = express.Router();
const { default: fetch } = require("node-fetch");
router.get('/', (req, res) => {
  try{
    query = req.query.query || "boobs"
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.XRapidAPIKey,
        'X-RapidAPI-Host': process.env.XRapidAPIHost_IMAGES
      }
    };
    
    fetch(`https://porn-gallery.p.rapidapi.com/pornos/${query}`, options)
      .then(response => response.json())
      .then(response => res.status(200).json(response.results[~~(Math.random() * response.results.length)]))
      
      .catch(err => console.error(err))
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching nsfw images');
  }
});

module.exports = router;