require('dotenv').config();
const express = require("express");
const Snoowrap = require('snoowrap');
const app = express();
const {MongoClient} = require('mongodb');
const morgan = require("morgan");
const { default: fetch } = require("node-fetch");


app.use(checkApiKey)
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'));


// IMPORTANT FUNCTIONS

async function checkApiKey (req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const database = client.db("apikeys")
  const authorizedKeys = await database.collection('keys').find().toArray();
  const keys = authorizedKeys.map(keyObj => keyObj.key);
  if (!apiKey|| !keys.includes(req.headers['x-api-key'])) {
    return res.status(401).json({ error: 'Unauthorized, Please get a key from https://discord.gg/sb2TMUsJQH' });
  }
  next();
};

// DATABASE INTEGRATION

const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true })



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
  clientId: process.env.reddit_client_id,
  clientSecret: process.env.reddit_client_secret,
  username: process.env.reddit_username,
  password: process.env.reddit_password
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
    // Fetch the memes from the 'memes' subreddit
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

    res.json({ memes: memeData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching memes');
  }
});

// NSFW ENDPOINTS


// IMAGES
app.get('/nsfw/images',(req,res)=>{
  try{
    query = req.query.query || "boobs"
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.XRapidAPIKey,
        'X-RapidAPI-Host': process.env.XRapidAPIHost
      }
    };
    
    fetch(`https://porn-gallery.p.rapidapi.com/pornos/${query}`, options)
      .then(response => response.json())
      .then(response => res.json(response.results[~~(Math.random() * response.results.length)]))
      
      .catch(err => console.error(err))
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching nsfw images');
  }
})

// VIDEOS
app.get("/nsfw/videos",(req,res)=>{
  try{
    querry = req.query.query
    const options2 = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.XRapidAPIKey,
        'X-RapidAPI-Host': process.env.XRapidAPIHost_VIDEOS
      }
    };
    fetch(`https://quality-porn.p.rapidapi.com/search?query=${querry}&page=1&timeout=5000`, options2)
    .then(response => response.json())
    .then(response=>res.json({data: response.data}))
    .catch(err => console.error(err))
  }catch(e){console.log(e)}
})



app.listen(process.env.port, () => console.log(`Listening in ${process.env.port}`));