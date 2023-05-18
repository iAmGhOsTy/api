const express = require('express');
const router = express.Router();
let foxarray = require('../../endpoints/image/animal/foxs.json')

router.get('/', (req, res) => {
    res.status(200).json({
        image: `${foxarray[~~(Math.random() * foxarray.length)]}`
      })
});

module.exports = router;
