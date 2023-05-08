const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// Add a new property
router.post('/add', async (req, res) => {
  const property = req.body;

  try {
    const db = getDb();
    const result = await db.collection('properties').insertOne(property);
    res.status(201).json({ message: 'Property added successfully', property: result.ops[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add property' });
  }
});

module.exports = router;
