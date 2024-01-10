const fetch = require('node-fetch');
const codes = require('../middleware/functions').CountryCode
const express = require('express');
const router = express.Router();

// Define the base URL for the Open Exchange Rates API (free access, no API key required)
const API_BASE_URL = 'https://open.er-api.com/v6/latest';

router.get('/', async (req, res) => {
    try {
        // Extract query parameters for currency conversion
        const { from, to, amount } = req.query;

        // Make a request to get the latest exchange rates using node-fetch
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        const rates = data.rates;

        // Check if the requested currencies are valid
        if (!rates[from] || !rates[to]) {
            return res.status(400).json({ error: 'Invalid currency codes',currencyCodes: codes });
        }
        if(!amount){
          return res.status(400).json({error: "Invalid amount"})
        }
        console.log(amount, from, to)

        // Perform the currency conversion
        const convertedAmount = (amount * rates[to]) / rates[from];

        // Return the result
        res.status(200).json({
            data: {
                from,
                to,
                originalAmount: amount,
                convertedAmount,
                exchangeRates: rates,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
