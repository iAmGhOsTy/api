const express = require('express');
const router = express.Router();
const catarray = require('../../endpoints/image/animal/cats.json')


router.get('/', (req, res) => {
    res.status(200).json({
        image: `${catarray[~~(Math.random() * catarray.length)]}`
      })
});

module.exports = router;
