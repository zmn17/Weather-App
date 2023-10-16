const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Env vars
const TIMEZONE_API_KEY = process.env.TIMEZONE_API_VALUE; // Your timezone API key
const TIMEZONE_BASE_URL = process.env.TIMEZONE_BASE_URL;

// Initialize cache
let cache = apicache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;

  // Check if latitude and longitude are provided
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  try {
      const params = new URLSearchParams({
        key: TIMEZONE_API_KEY,
        format: 'json',
        by: 'position',
        lat: lat,
        lng: lng,
      });
    
      const apiUrl = await needle('get', `${TIMEZONE_BASE_URL}?${params}`);
      const data = apiUrl.body;
    
        res.status(200).json(data);
    } catch (error) {
    res.status(500).json({ error: 'Error fetching time zone data: ' + error.message });
  }
});

module.exports = router;
