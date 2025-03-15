const { MongoClient } = require('mongodb');
const { MONGO_URI, DB_NAME } = process.env;

const client = new MongoClient(MONGO_URI);

async function mongoConnection() {
  try {
    if (!client.topology?.isConnected()) {
      await client.connect();
      console.info('Connected to MongoDB');
    }
    return client;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}


const handleExit = async (signal) => {
  console.info(`Received signal: ${signal}`);
  const client = await mongoConnection();
  try {
    const db = client.db(DB_NAME);
    await db.dropDatabase();
    console.info(`Droped DB: ${DB_NAME}`);
    process.exit(1)
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  } finally {
    await client.close();
    console.info('MongoDB connection closed');
  }
};


module.exports = {
  mongoConnection,
  handleExit
};