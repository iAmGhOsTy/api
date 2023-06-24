const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    const { username, avatar, background,text_color } = req.query;

    if (!username) {
      return res.status(400).send('Missing username query param');
    }
    if (!avatar) {
      return res.status(400).send('Missing avatar query param');
    }

    
    let defaultBackground = background || 'https://cdn.discordapp.com/attachments/941744653231882270/1121506017201631232/bg.png';
    const imageURL = `https://api.discorddevtools.xyz/welcome-image-generator/generate.png?username=${username}&image=${avatar}&usernameColor=00ffff&title=Welcome+to+the+server!&titleColor=${text_color||"#000000"}&textColor=${text_color||"#000000"}&borderColor=${text_color||"#000000"}&background=${defaultBackground}`;

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
