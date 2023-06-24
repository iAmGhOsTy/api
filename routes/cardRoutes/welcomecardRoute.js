const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    const { username, avatar, background } = req.query;

    if (!username) {
      return res.status(400).send('Missing username query param');
    }
    if (!avatar) {
      return res.status(400).send('Missing avatar query param');
    }
    
    const defaultBackground = 'https://cdn.discordapp.com/attachments/941744653231882270/1122194873081151558/circuit.png';
    const imageURL = `https://api.discorddevtools.xyz/welcome-image-generator/generate.png?username=${username}&image=${avatar}&usernameColor=fff&title=Welcome+to+the+server!&titleColor=a9a9a9&textColor=a9a9a9&borderColor=a9a9a9&background=${background || defaultBackground}`;

    const response = await fetch(imageURL);
    if (!response.ok) {
      throw new Error('Failed to fetch the image');
    }

    const image = await response.buffer();
    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
