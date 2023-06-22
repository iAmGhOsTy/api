const express = require("express");
const router = express.Router();
const {default: fetch} = require('node-fetch');
// const Snoowrap = require('snoowrap');

// const reddit = new Snoowrap({
//     userAgent: 'MyMemeAPI/1.0.0',
//     clientId: process.env.reddit_client_id,
//     clientSecret: process.env.reddit_client_secret,
//     username: process.env.reddit_username,
//     password: process.env.reddit_password
//   });


router.get("/", async (req, res) => { 
    try {
      const data = await fetch(`https://meme-api.com/gimme`)
      const memes = await data.json()
      //console.log(memes)
        // Fetch the memes from the 'memes' subreddit
        //const memes = await reddit.getSubreddit('memes').getRandomSubmission();
    
        // Extract the relevant information from each meme
        const memeData = {
         // id: memes.,
          title: memes.title,//API endpoint is under maintenance",
          url: memes.url,//"https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp",

          // subreddit: memes.subreddit.display_name,
           upvotes: memes.ups
        };
    
        // Return the meme data as a JSON response
    
        res.status(200).json({ memes: memeData })
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching memes');
      }
});
module.exports = router;