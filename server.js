const express = require("express");
const app = express();
const morgan = require("morgan");
require('dotenv').config();

app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'));

//tnd data
let wyr = require('./endpoints/tnd/wyr.json')
let truth = require('./endpoints/tnd/truths.json');
let dare = require('./endpoints/tnd/dares.json');
let nhie = require('./endpoints/tnd/nhie.json');
//image data
let catarray = require('./endpoints/image/animal/cats.json')
let dogarray = require('./endpoints/image/animal/dogs.json')
let foxarray = require('./endpoints/image/animal/foxs.json')
// GTA5 DATA  
let gta5 = require("./endpoints/image/game/gta5/gta5.json")


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

// IMAGE ENDPOINTS

// CAT, DOG, FOX ENDPOINTS

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

//GTA 5 ENDPOINTS

app.get("/gta5", (req,res) =>{
  res.json({ data: gta5[Math.floor(Math.random()* gta5.length)]})
})

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
  type = req.query.type || "normal";  // settings type (NSFW, NORMAL, SLIGHT_NSFW) else normal
  let nhie1 = nhie.filter(o => o.type == type.toLowerCase())[0];
  if (!nhie1) return res.json({ data: "Can't find that type of data." });
  res.json({ data: nhie1.item[Math.floor(Math.random() * nhie1.item.length)], type: nhie1.type })
});




//DISCORD BOT STATUS

const { Client } = require("discord.js");
const client = new Client({
   shards: "auto",
 
  allowedMentions: {
    parse: [ ],
    repliedUser: false,
  },
  
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
 intents: 1,
 // presence: {status: "dnd", activity: {name: "UNDER MAINTAINANCE", type: "WATCHING"}},
});

// app.get('/status', (req, res) => {
//   res.render('stats.ejs', {
          
//     guilds: client.guilds.cache.size,
//     users: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
//     channels: client.channels.cache.size,
//   });
// });
app.get("/botinfo",(req,res)=>{
  res.json({
    name: client.user.username,
    servers: client.guilds.cache.size,
    users: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    channels: client.channels.cache.size,
  })
})
client.on('ready', client => {
 // client.user.setPresence({ activities: [{ name: 'UNDER MAINTAINANCE', type: "WATCHING" }] })
	console.log(`Status Synced as: ${client.user.tag}!`);
});
//client.on('debug', console.log)
client.on('rateLimit', console.log)

client.login(process.env._token)


app.listen(process.env.port, () => console.log(`Listening in ${process.env.port}`));