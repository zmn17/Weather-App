const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Env vars
const WEATHER_BASE_URL = process.env.WEATHER_BASE_URL
const WEATHER_KEY_NAME = process.env.WEATHER_KEY_NAME
const WEATHER_API_VALUE = process.env.WEATHER_API_VALUE

// Initialize cache
let cache = apicache.middleware;

router.get('/', cache('1 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [WEATHER_KEY_NAME]: WEATHER_API_VALUE,
            ...url.parse(req.url, true).query,
        });
        const apiRes = await needle('get', `${WEATHER_BASE_URL}?${params}`);
        const data = apiRes.body;

        // Log the request to public API    
        if(process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${WEATHER_BASE_URL}?${params}`)
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

