const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  try {

    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(image.replace('data:image/png;base64,', ''), 'base64'));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;