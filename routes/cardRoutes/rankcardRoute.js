const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require("canvas");


router.get('/', async (req, res) => {
  try {
    const { username, level, experience, pfpUrl } = req.query;

    
    const levelInfo = level
    const nextXP = levelInfo * 2 * 250 + 250
    const xpInfo = experience;
    // const totalXP = 1000
    // let rank = top10.sort((a, b) => {
    //   return b.totalXP - a.totalXP
    // });
    // let ranking = rank.map(x => x.totalXP).indexOf(totalXP) + 1
    const rankCard = {
        backgroundColor: "#00ffff",
        textColor: "#00ffff",
        barColor: "#00ffff",
    }

    const canvas = createCanvas(1000, 333)
    const ctx = canvas.getContext("2d");
    const background = await loadImage('https://cdn.discordapp.com/attachments/941744653231882270/1121506017201631232/bg.png');
    ctx.fillStyle = rankCard.backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#A3A3A3"
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000"
    ctx.fillRect(180, 216, 775, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    //ctx.strokeRect(180, 216, 775, 65);
    ctx.stroke();

    ctx.fillStyle = rankCard.barColor;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(200, 216, ((100 / (69 * 2 * 250 + 250)) * 1000) * 7.5, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = '30px lucida sans';
    ctx.textAlign = "center";
    ctx.fillStyle = rankCard.textColor;
    ctx.fillText(`${xpInfo} / ${nextXP} XP`, 600, 260);

    ctx.font = '35px sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(username, 325, 125);

    ctx.font = '40px sans-serif';
    ctx.fillText("Level: ", 350, 170);
    ctx.fillText(levelInfo, 500, 170);

    ctx.font = '40px sans-serif';
    ctx.fillText("Rank: ", 700, 170);
    ctx.fillText("001", 830, 170);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "WHITE"
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(pfpUrl);
    ctx.drawImage(avatar, 40, 40, 250, 250);

    const image = canvas.toDataURL("image/png");


    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(image.replace('data:image/png;base64,', ''), 'base64'));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;