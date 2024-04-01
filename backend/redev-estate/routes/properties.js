const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const verifyToken = require('../middleware/auth');

// @route  POST api/properties
// @desc   Add property
// @access Private
router.post('/', verifyToken, (req, res) => {
  const newProperty = new Property({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    images: req.body.images,
    arImages: req.body.arImages,
    user: req.user.id
  });

  newProperty.save()
    .then(property => res.json(property))
    .catch(err => console.log(err));
});

// @route  GET api/properties
// @desc   Get all properties
// @access Public
router.get('/', (req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => console.log(err));
});

// @route  GET api/properties/:id
// @desc   Get property by ID
// @access Public
router.get('/:id', (req, res) => {
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(404).json({ nopropertyfound: 'No property found with that ID' }));
});

// @route  DELETE api/properties/:id
// @desc   Delete property
// @access Private
router.delete('/:id', verifyToken, (req, res) => {
  Property.findById(req.params.id)
    .then(property => {
      // Check for property owner
      if (property.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }

      // Delete
      property.remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ nopropertyfound: 'No property found with that ID' }));
    })
    .catch(err => res.status(404).json({ nopropertyfound: 'No property found with that ID' }));
});

module.exports = router;