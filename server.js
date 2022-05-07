const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json());


//tnd data
let wyr = require('./endpoints/tnd/wyr.json')
let truth = require('./endpoints/tnd/truths.json');
let dare = require('./endpoints/tnd/dares.json');
let nhie = require('./endpoints/tnd/nhie.json');
//image data
let catarray = require('./endpoints/image/animal/cats.json')
let dogarray = require('./endpoints/image/animal/dogs.json')
let foxarray = require('./endpoints/image/animal/foxs.json')


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

// IMAGE ENDPOINTS

app.get('/cat', (req, res) => {
  res.json({
    image: `${catarray[~~(Math.random() * catarray.length)]}`
  })
});
app.get('/dog', (req, res) => {
  res.json({
    image: `${dogarray[~~(Math.random() * dogarray.length)]}`
  })
});
app.get('/fox', (req, res) => {
  res.json({
    image: `${foxarray[~~(Math.random() * dogarray.length)]}`
  })
});

// TRUTH AND DARE ENDPOINTS

app.get("/wyr", (req, res) => {
  res.json({ data: wyr[Math.floor(Math.random() * wyr.length)] })
});
app.get("/dare", (req, res) => {
  res.json({ data: dare[Math.floor(Math.random() * dare.length)] })
});
app.get("/truth", (req, res) => {
  res.json({ data: truth[Math.floor(Math.random() * truth.length)] })
  // res.status(400).json(`NOT FOUND🤏☠`)
});
app.get("/nhie", (req, res) => {
  type = req.query.type || "normal";                               // settings type (NSFW, NORMAL, SLIGHT_NSFW) else normal
  let nhie1 = nhie.filter(o => o.type == type.toLowerCase())[0];
  if (!nhie1) return res.json({ data: "Can't find that type of data." });
  res.json({ data: nhie1.item[Math.floor(Math.random() * nhie1.item.length)], type: nhie1.type })
});


//DISCORD BOT STATUS

const { Client, Intents } = require("discord.js");
const client = new Client({
  shards: "auto",
 
  allowedMentions: {
    parse: [ ],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
 intents: [Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS],
});

app.get('/status', (req, res) => {
  res.render('stats.ejs', {
          
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
  });
});
client.on('ready', client => {
	console.log(`Status Synced as: ${client.user.tag}!`);
});

client.login(process.env.token)


app.listen(3000, () => console.log('Listening in 3000'));