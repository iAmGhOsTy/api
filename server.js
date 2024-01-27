require('dotenv').config();
const morgan = require("morgan");
const express = require('express');
const app = express();
const authMiddleware = require('./middleware/authMiddleware')

//app.use)
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent" ":req[x-api-key]"'));
app.set('view engine', 'ejs');


// Import route files
const catRoutes = require('./routes/imageRoutes/catRoute.js');
const dogRoutes = require('./routes/imageRoutes/dogRoute.js');
const foxRoutes = require('./routes/imageRoutes/foxRoute.js');

const gta5Routes = require('./routes/imageRoutes/gta5Route.js');

const truthRoutes = require('./routes/todRoutes/truthRoute.js');
const dareRoutes = require('./routes/todRoutes/dareRoute.js');
const wyrRoutes = require('./routes/todRoutes/wyrRoute.js');
const nhieRoutes = require('./routes/todRoutes/nhieRoute.js');

const memeRoutes = require('./routes/memeRoute.js');

const factRoutes = require('./routes/factRoute.js');

const nsfwImagesRoutes = require('./routes/nsfwRoutes/imageRoute.js');
const nsfwVideosRoutes = require('./routes/nsfwRoutes/videoRoute.js');

const ahegaoRoute = require("./routes/hentaiRoutes/ahegaoRoute.js");
const assRoute = require("./routes/hentaiRoutes/assRoute.js");
const bdsmRoute = require("./routes/hentaiRoutes/bdsmRoute.js");
const blowjobRoute = require("./routes/hentaiRoutes/blowjobRoute.js");
const cumRoute = require("./routes/hentaiRoutes/cumRoute.js");
const cuckoldRoute = require("./routes/hentaiRoutes/cuckoldRoute.js");
const eroticRoute = require("./routes/hentaiRoutes/eroticRoute.js");
const feetRoute = require("./routes/hentaiRoutes/feetRoute.js");
const femdomRoute = require("./routes/hentaiRoutes/femdomRoute.js");
const gangbangRoute = require("./routes/hentaiRoutes/gangbangRoute.js");
const hentaiRoute = require("./routes/hentaiRoutes/hentaiRoute.js");
const mangaRoute = require("./routes/hentaiRoutes/mangaRoute.js");
const masturbationRoute = require("./routes/hentaiRoutes/masturbationRoute.js");
const nekoRoute = require("./routes/hentaiRoutes/nekoRoute.js");
const nerdyRoute = require("./routes/hentaiRoutes/nerdyRoute.js");
const orgyRoute = require("./routes/hentaiRoutes/orgyRoute.js"); 
const pantiesRoute = require("./routes/hentaiRoutes/pantiesRoute.js");
const pussyRoute = require("./routes/hentaiRoutes/pussyRoute.js");
const tentaclesRoute = require("./routes/hentaiRoutes/tentaclesRoute.js");
const thighsRoute = require("./routes/hentaiRoutes/thighsRoute.js");
const yuriRoute = require("./routes/hentaiRoutes/yuriRoute.js");

const weatherRoutes = require("./routes/weatherRoute.js");

const translationRoutes = require("./routes/translationRoute.js");

const urbandictionaryRoutes = require("./routes/urbandictionaryRoute.js")
;
const randomsentenceRoutes = require("./routes/rancomsentenceRoute.js");

const colorRoutes = require("./routes/colorRoute.js");

const rankcardRoutes = require("./routes/cardRoutes/rankcardRoute.js");
const welcomecardRoutes = require("./routes/cardRoutes/welcomecardRoute")

const triviaRoutes = require("./routes/triviaRoute.js");
//const clownRoutes = require("./routes/clownRoute.js");

const convertRoutes = require("./routes/convertRoute.js");

const quoteRoutes = require("./routes/quoteRoute.js");


// HOME PAGE
app.get('/', (req, res) => {
   res.status(202).render("index.ejs",
    //"index.html",{root:__dirname+"/views"}
  //   data: "Welcome to my api join the discord server to use your api key."
  )
});


// CAT, DOG, FOX ENDPOINTS

app.use('/image/cat',catRoutes)
app.use('/image/dog', dogRoutes);
app.use('/image/fox', foxRoutes);

//GTA 5 ENDPOINTS

app.use("/image/gta5", gta5Routes);

// TRUTH AND DARE ENDPOINTS

app.get("/tod", (req, res) => {
  res.status(400).json({ data: "use tod/truth or tod/dare or tod/wyr or tod/nhie?types=nsfw/normal/pg13" })
});
app.use("/tod/wyr", wyrRoutes);
app.use("/tod/dare", dareRoutes);
app.use("/tod/truth", truthRoutes);
app.use("/tod/nhie", nhieRoutes);


// MEME ENDPOINTS
app.use('/memes', memeRoutes);

// FACT ENDPOINT
app.use('/facts', factRoutes);


// NSFW ENDPOINTS
app.get("/nsfw", (req, res) => {
  res.status(400).json({
    data:"refer to the documentation for the endpoints"
  })
})
// IMAGES
app.use('/nsfw/images', authMiddleware, nsfwImagesRoutes)

// VIDEOS
app.use("/nsfw/videos",authMiddleware,nsfwVideosRoutes)


// WEATHER ENDPOINT
app.use("/weather",authMiddleware, weatherRoutes);


// TRANSLATION ENDPOINT
app.use("/translate", translationRoutes)


// URBAN DICTIONARY ENDPOINT
app.use("/urbandictionary", urbandictionaryRoutes);

// RANDOM SENTENCE ENDPOINT
app.use("/randomsentence", randomsentenceRoutes);

// COLOR ENDPOINT
app.use("/color", colorRoutes);

// RANKCARD ENDPOINT
app.use("/rankcard", rankcardRoutes);

//CARDS ENDPOINTS
app.use("/welcomecard",authMiddleware,welcomecardRoutes)

//QUOTE ENDPOINT
app.use("/quote", quoteRoutes);

// HENTAI ENDPOINTS
app.get("/hentai", (req, res) => {
  res.status(400).json({
    data:"refer to the documentation for the endpoints"
  })
})
app.use("/hentai/ahegao",authMiddleware, ahegaoRoute);
app.use("/hentai/ass", authMiddleware,assRoute)
app.use("/hentai/bdsm",authMiddleware,bdsmRoute)
app.use("/hentai/blowjob",authMiddleware,blowjobRoute)
app.use("/hentai/cuckold",authMiddleware,cuckoldRoute)
app.use("/hentai/cum",authMiddleware,cumRoute)
app.use("/hentai/erotic",authMiddleware,eroticRoute)
app.use("/hentai/feet",authMiddleware,feetRoute)
app.use("/hentai/femdom",authMiddleware,femdomRoute)
app.use("/hentai/gangbang",authMiddleware,gangbangRoute)
app.use("/hentai/hentai",authMiddleware,hentaiRoute)
app.use("/hentai/manga",authMiddleware,mangaRoute)
app.use("/hentai/masturbation",authMiddleware,masturbationRoute)
app.use("/hentai/neko",authMiddleware,nekoRoute)
app.use("/hentai/nerdy",authMiddleware,nerdyRoute)
app.use("/hentai/orgy",authMiddleware,orgyRoute)
app.use("/hentai/panties",authMiddleware,pantiesRoute)
app.use("/hentai/pussy",authMiddleware,pussyRoute)
app.use("/hentai/tentacles",authMiddleware,tentaclesRoute)
app.use("/hentai/thighs",authMiddleware,thighsRoute)
app.use("/hentai/yuri",authMiddleware,yuriRoute)

app.use("/trivia",triviaRoutes)

app.use("/convert",convertRoutes)


// CLOWN ENDPOINT
//app.use("/clown", clownRoutes);



// app.get('/test', (req,res)=>{
//   res.status(200).render("hh.ejs")
// })



app.listen(process.env.port, () => console.log(`Listening in ${process.env.port}`));