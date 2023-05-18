const express = require('express');
const router = express.Router();
let gta5arr = require('../../endpoints/image/game/gta5/gta5.json')

router.get('/', (req, res) => {
    res.status(200).json({
        image: `${gta5arr[~~(Math.random() * gta5arr.length)]}`
      })
});

module.exports = router;
