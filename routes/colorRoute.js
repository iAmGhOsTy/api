const express = require("express");
const router = express.Router();
const Jimp = require('jimp');
const fetch = require("node-fetch");


router.get('/', async (req, res) => {
  try {
    const  targetColor  = req.query.color
    console.log(targetColor)

    const response = await fetch('https://cdn.discordapp.com/avatars/1109759607657725983/a6cafd1945bf0bb352b9d8cfb49bd5b0.png');
    const buffer = await response.buffer();

    // Load the image buffer with Jimp
    const image = await Jimp.read(buffer);
    // Parse the target color
    const { r, g, b } = Jimp.intToRGBA(Jimp.cssColorToHex(targetColor));
    // Manipulate the image pixels to change the color
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      // Update the pixel color
      image.bitmap.data[idx] = r;
      image.bitmap.data[idx + 1] = g;
      image.bitmap.data[idx + 2] = b;
    });

    // Get the modified image as a buffer
    const modifiedImageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // Set the response content type and send the modified image buffer
    res.contentType('image/png');
    res.status(200).send(modifiedImageBuffer);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while converting the image.' });
  }
});

module.exports = router;