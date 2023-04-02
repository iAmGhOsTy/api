const express = require("express");
const Snoowrap = require('snoowrap');
const app = express();
const morgan = require("morgan");
require('dotenv').config();

app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'));

//tnd data
let wyr = require('./endpoints/tod/wyr.json')
let truth = require('./endpoints/tod/truths.json');
let dare = require('./endpoints/tod/dares.json');
let nhie = require('./endpoints/tod/nhie.json');
//image data
let catarray = require('./endpoints/image/animal/cats.json')
let dogarray = require('./endpoints/image/animal/dogs.json')
let foxarray = require('./endpoints/image/animal/foxs.json')
// GTA5 DATA  
let gta5 = require("./endpoints/image/game/gta5/gta5.json")
// MEME SCRAPER
const reddit = new Snoowrap({
  userAgent: 'MyMemeAPI/1.0.0',
  clientId: 'Qk8YNKvreyLdRvOBL2O6Zw',
  clientSecret: 'h4Ijl7xZ7YIUSSSEPa_j5d0smJxQuw',
  username: 'AnonymousFerceLegend',
  password: 'om1sabitagb'
});


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

// IMAGE ENDPOINTS

// CAT, DOG, FOX ENDPOINTS

app.get('/image/cat', (req, res) => {
  res.json({
    image: `${catarray[~~(Math.random() * catarray.length)]}`
  })
});
app.get('/image/dog', (req, res) => {
  res.json({
    image: `${dogarray[~~(Math.random() * dogarray.length)]}`
  })
});
app.get('/image/fox', (req, res) => {
  res.json({
    image: `${foxarray[~~(Math.random() * dogarray.length)]}`
  })
});

//GTA 5 ENDPOINTS

app.get("/image/gta5", (req,res) =>{
  res.json({ data: gta5[Math.floor(Math.random()* gta5.length)]})
})

// TRUTH AND DARE ENDPOINTS

app.get("/tod", (req, res) => {
  res.json({ data: "use tod/truth or tod/dare or tod/wyr or tod/nhie?types=msfw/normal/slight_nsfw" })
});
app.get("/tod/wyr", (req, res) => {
  res.json({ data: wyr[Math.floor(Math.random() * wyr.length)] })
});
app.get("/tod/dare", (req, res) => {
  res.json({ data: dare[Math.floor(Math.random() * dare.length)] })
});
app.get("/tod/truth", (req, res) => {
  res.json({ data: truth[Math.floor(Math.random() * truth.length)] })
  // res.status(400).json(`NOT FOUND🤏☠`)
});
app.get("/tod/nhie", (req, res) => {
  type = req.query.type || "normal";  // settings type (NSFW, NORMAL, SLIGHT_NSFW) else normal
  let nhie1 = nhie.filter(o => o.type == type.toLowerCase())[0];
  if (!nhie1) return res.json({ data: "Can't find that type of data." });
  res.json({ data: nhie1.item[Math.floor(Math.random() * nhie1.item.length)], type: nhie1.type })
});

// MEME ENDPOINTS

app.get('/memes', async (req, res) => {
  try {
    // Fetch the top 10 memes from the 'memes' subreddit
    const memes = await reddit.getSubreddit('memes').getRandomSubmission();

    // Extract the relevant information from each meme
    const memeData = {
      id: memes.id,
      title: memes.title,
      url: memes.url,
      subreddit: memes.subreddit.display_name,
      upvotes: memes.ups
    };

    // Return the meme data as a JSON response
    //console.log(memeData)
    res.json({ memes: memeData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching memes');
  }
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

//client.login(process.env._token)


app.listen(process.env.port, () => console.log(`Listening in ${process.env.port}`));