const { MongoClient } = require('mongodb');
require('dotenv').config()

// Database integration
const client = new MongoClient(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware function to check API key
async function checkApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const database = client.db('apikeys');
  const authorizedKeys = await database.collection('keys').find().toArray();
  const keys = authorizedKeys.map((keyObj) => keyObj.key);

  if (!apiKey || !keys.includes(apiKey)) {
    return res.status(401).json({
      error: 'Unauthorized. Please provide a valid API key. Please get a key from https://discord.gg/sb2TMUsJQH',
    });
  }

  next();
}

module.exports = checkApiKey;
