const express = require("express");

const app = express();

app.use(express.json());

let wyr = require('./tnd/wyr.json')
let truth = require('./tnd/truths.json');
let dare = require('./tnd/dares.json');
let nhie = require('./tnd/nhie.json');

let catarray = require('./image/cats.json')
let dogarray = require('./image/dogs.json')
let foxarray = require('./image/foxs.json')


app.get('/', (req, res) => {
  res.json({ data: "Parameter required " });
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
});
app.get("/nhie", (req, res) => {
  type = req.query.type || "normal";                               // settings type (NSFW, NORMAL, SLIGHT_NSFW) else normal
  let nhie1 = nhie.filter(o => o.type == type.toLowerCase())[0];
  if (!nhie1) return res.json({ data: "Can't find that type of data." });
  res.json({ data: nhie1.item[Math.floor(Math.random() * nhie1.item.length)], type: nhie1.type })
});


app.listen(3000, () => console.log('Listening in 3000'));