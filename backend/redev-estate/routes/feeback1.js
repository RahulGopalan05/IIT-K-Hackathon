const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Review schema
const ReviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the Review model
const Review = mongoose.model('Review', ReviewSchema);

// POST route for creating a new review
router.post('/feedback', (req, res) => {
  const { author, rating, comment } = req.body;
  
  // Create a new review object
  const newReview = new Review({
    author,
    rating,
    comment
  });

  router.get('/feedback', (req, res) => {
    Review.find()
      .then(reviews => {
        res.json(reviews);
      })
      .catch(err => {
        console.error('Error retrieving reviews:', err);
        res.status(500).json({ error: 'Error retrieving reviews' });
      });
  });
  
  // Save the review to the database
  newReview.save()
    .then(savedReview => {
      res.status(201).json(savedReview);
    })
    .catch(err => {
      console.error('Error saving review:', err);
      res.status(500).json({ error: 'Error saving review' });
    });
});

module.exports = router;