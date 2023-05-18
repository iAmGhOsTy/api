const express = require('express');
const router = express.Router();
let dogarray = require('../../endpoints/image/animal/dogs.json')

router.get('/', (req, res) => {
    res.status(200).json({
        image: `${dogarray[~~(Math.random() * dogarray.length)]}`
      })
});

module.exports = router;
