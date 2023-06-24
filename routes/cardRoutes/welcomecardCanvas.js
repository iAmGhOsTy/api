const express = require("express");
const router = express.Router();
const { createCanvas, loadImage, loadAvatar } = require("canvas");

router.get("/", async (req, res) => {
  try {
    let {
      username,
      pfp,
      guild_name,
      guild_avatar,
      guild_id,
      member_count,
      background,
      status,
      greet_user,
      custom_text,
      shadow,
      font,
    } = req.query;

    if(!username) return res.status(400).send("Missing user_tag query");
    if(!pfp) return res.status(400).send("Missing user_avatar query");
    if(!guild_name) return res.status(400).send("Missing guild_name query");
    if(!guild_avatar) return res.status(400).send("Missing guild_avatar query");
    if(!guild_id) return res.status(400).send("Missing guild_id query");
    if(!member_count) return res.status(400).send("Missing member_count query");
    if(!custom_text) return res.status(400).send("Missing custom_text query");

    
    if (!background) background = "default";
    if (!font) font = "Whitney Medium";
	if (!shadow) shadow = 0;
	if (!status) status = "none";
	if (!greet_user) greet_user = true;
	else greet_user = greet_user.toLowerCase() === "true";
	if (member_count && isNaN(parseInt(member_count))) throw "member count must be a number";

    const canvas = createCanvas(1000, 500);
	const ctx = canvas.getContext("2d");
	let { width, height } = canvas;
	ctx.textAlign = "center";
	ctx.fillStyle = "white";

	//await ctx.loadImage("https://cdn.discordapp.com/attachments/941744653231882270/1121506017201631232/bg.png");

	ctx.shadowColor = "black";
	ctx.shadowBlur = shadow;
	ctx.shadowOffsetX = shadow;
	ctx.shadowOffsetY = shadow;

	let avatar = await ctx.loadAvatar(username,pfp);
	var x = width / 2;
	var y = height / 2;

	ctx.drawCircleImage(avatar, x, y, 150);
	ctx.drawStatusIndicator(x + 57, y + 69, status, background);

	ctx.fillStyle = "white";
	ctx.font = `50px "${font}"`;


	if (custom_text) {
		text = custom_text;
	} else if (greet_user) {
		text = `Welcome ${user_tag}`;
	} else {
		text = `Welcome to ${guild_name}`;
	}

	ctx.fillText(text, width / 2, 100);

	if (member_count) {
		ctx.fillText(`Member #${member_count}`, width / 2, 425);
	}

    let image = canvas.toBuffer("image/png");

    res.set("Content-Type", "image/png");
    res.send(
      Buffer.from(image.replace("data:image/png;base64,", ""), "base64")
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
