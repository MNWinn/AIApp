const express = require('express');
const { getDb } = require('./db');

const router = express.Router();

// An example endpoint to save data to the database
router.post('/save-data', async (req, res) => {
  const { key, data } = req.body;
  const db = await getDb();
  const collection = db.collection('your-collection-name');

  try {
    await collection.updateOne({ key }, { $set: { data } }, { upsert: true });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data');
  }
});

module.exports = router;
