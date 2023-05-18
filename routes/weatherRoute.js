const express = require("express");
const router = express.Router();
const { default: fetch } = require("node-fetch");
require("dotenv").config()



router.get("/", async (req, res) => {
    try {
        querry = req.query.location
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.weather_api_key}&q=${querry}`)
            .catch(err => console.error(err))

        const weather = await data.json()


        const weatherdata = {
            location: weather.location.name,
            country: weather.location.country,
            temprature_c: weather.current.temp_c,
            temprature_f: weather.current.temp_f,
            image: weather.current.condition.icon,
            wind_kmph: weather.current.wind_kph,
            wind_mph: weather.current.wind_mph,
            wind_degree: weather.current.wind_degree,
            pressure_mb: weather.current.pressure_mb,
            pressure_in: weather.current.pressure_in,
            precip_mm: weather.current.precip_mm,
            precip_in: weather.current.precip_in,
            humidity: weather.current.humidity,
            feelslike_c: weather.current.feelslike_c,
            feelslike_f: weather.current.feelslike_f,
        };

        console.log(weatherdata)
        res.status(200).json({ data: weatherdata })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching weather');
    }
});
module.exports = router;