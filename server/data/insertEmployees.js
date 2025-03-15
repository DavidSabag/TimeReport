require('dotenv').config();
const employees = require('./employees.json')
const { mongoConnection } = require('../database')
const { COLLECTION, DB_NAME } = process.env;


async function run() {
    const client = await mongoConnection();
    try {
        console.info(`Inserting documents into ${COLLECTION}`)
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);
        const result = await collection.insertMany(employees);
        console.info(`${result.insertedCount} documents inserted`);

    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
        await client.close();
        console.info('MongoDB connection closed');
    }
}

run();
