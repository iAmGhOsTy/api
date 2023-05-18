require('dotenv').config();
const morgan = require("morgan");
const express = require('express');
const app = express();
const authMiddleware = require('./authMiddleware')


//app.use)
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'));
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
const weatherRoutes = require("./routes/weatherRoute.js");

app.get('/', (req, res) => {
   res.status(400).render("home.ejs"
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

app.use("/tod", (req, res) => {
  res.status(400).json({ data: "use tod/truth or tod/dare or tod/wyr or tod/nhie?types=msfw/normal/pg13" })
});
app.use("/tod/wyr", wyrRoutes);
app.use("/tod/dare", dareRoutes);
app.use("/tod/truth", truthRoutes);
app.use("/tod/nhie", nhieRoutes);

// MEME ENDPOINTS

app.use('/memes', memeRoutes);

// FACT ENDPOINT

app.use('/fact', factRoutes);


// NSFW ENDPOINTS


// IMAGES
app.use('/nsfw/images', authMiddleware, nsfwImagesRoutes)

// VIDEOS
app.use("/nsfw/videos",authMiddleware,nsfwVideosRoutes)


// WEATHER ENDPOINT
app.use("/weather",authMiddleware, weatherRoutes);


// app.get('/test', (req,res)=>{
//   res.status(200).render("hh.ejs")
// })



app.listen(process.env.port, () => console.log(`Listening in ${process.env.port}`));