const express = require("express");
const router = express.Router();
const Jimp = require('jimp');
const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');
const clownCostumeURL  = "C:\\Users\\DRDA KHORDHA\\Desktop\\Private\\Projects\\APIS\\Data API\\assets\\image\\clown.png"
// Clown endpoint
router.get('/', async (req, res) => {
  const { user } = req.query; // Get the 'user' query parameter from the request

  // Check if the 'user' parameter is provided
  if (!user) {
    return res.status(400).json({ error: 'User parameter is missing, provide the user ID' });
  }

  try {

    const response = await fetch(`https://discord.com/api/users/${user}`, {
      headers: {
        Authorization: `Bot ${process.env.bot_token}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch the user' });
    }

    const userData = await response.json();
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
    const avatarImage = await loadImage(avatarUrl);
    const clownCostumeImage = await loadImage(clownCostumeURL);
    const canvas = createCanvas(avatarImage.width, avatarImage.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(avatarImage, 0, 0);
    ctx.drawImage(clownCostumeImage, 0, 0, canvas.width, canvas.height);
    const clownifiedAvatarBuffer = canvas.toBuffer(imageType = 'image/png');
    res.set('Content-Type', 'image/png');
    res.send(clownifiedAvatarBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the image' });
  }
});

module.exports = router;