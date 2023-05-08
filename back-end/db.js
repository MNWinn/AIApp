require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

const connectDb = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db(process.env.MONGODB_NAME);
    console.log(`Connected to MongoDB: ${process.env.MONGODB_NAME}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = {
  connectDb,
  getDb,
};
