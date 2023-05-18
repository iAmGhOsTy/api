require('dotenv').config();
const express = require('express')
const router = express.Router()
const { default: fetch } = require("node-fetch");
router.get('/', (req, res) => {
    try{
        querry = req.query.query
        const options2 = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.XRapidAPIKey,
            'X-RapidAPI-Host': process.env.XRapidAPIHost_VIDEOS
          }
        };
        fetch(`https://quality-porn.p.rapidapi.com/search?query=${querry}&page=1&timeout=5000`, options2)
        .then(response => response.json())
        .then(response=>res.status(200).json({data: response.data}))
        .catch(err => console.error(err))
      }catch(e){
        res.status(500).json("Error Finding")
        console.log(e)}
});

module.exports = router;