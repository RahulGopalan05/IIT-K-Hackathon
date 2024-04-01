const express = require('express');
const axios = require('axios');
const router = express.Router();
const { newsAPIKey } = require('../../config/keys'); 

router.get('/', async (req, res) => {
  try {
    const url = 'https://newsapi.org/v2/top-headlines';
    const params = {
      apiKey: newsAPIKey,
      category: 'business',
      q: 'real estate',
    };
    const response = await axios.get(url, { params });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
});

module.exports = router;