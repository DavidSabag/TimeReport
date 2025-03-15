require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { decodeToken } = require('./middleware/decodeToken');
const { Validation } = require('./middleware/validation');
const { loginSchema, managerResponseSchema } = require('./schema');
const { mongoConnection, handleExit } = require('./database');
const { date } = require('joi');
const { COLLECTION, DB_NAME, PORT, ORIGIN_URL, SECRET, EXPIRE_TOKEN_TIME } = process.env;

app.use(cors({ origin: ORIGIN_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());


app.post('/login', Validation(loginSchema), async (req, res) => {
    try {
        const { username, password } = req.body
        console.info(`Starting login for: ${username}`);
        const client = await mongoConnection();
        const db = client.db(DB_NAME);
        const employeesCollection = db.collection(COLLECTION);
        const result = await employeesCollection.find({ userName: username, password }, { projection: { _id: 0 } }).toArray();
        if (result.length === 0) {
            return res.status(404).json({ success: false, data: result, err: 'Employee not found' });
        }
        const token = jwt.sign({ username }, SECRET, { expiresIn: EXPIRE_TOKEN_TIME });

        res.cookie("session-token", token, { httpOnly: false, secure: false, sameSite: "Lax" });
        return res.status(200).json({ success: true, data: result, err: null });

    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, date: [], err: err.message })

    }
});

app.put('/managerResponse', Validation(managerResponseSchema), decodeToken, async (req, res) => {
    try {
        const { name } = req.body;
        const username = req.decoded.username
        console.info(`Starting managerResponse for: ${username} manager response: ${name}`);
        const client = await mongoConnection();
        const db = client.db(DB_NAME);
        const employeesCollection = db.collection(COLLECTION);
        const result = await employeesCollection.find({ userName: username }, { projection: { _id: 0 } }).toArray();
        if (result.length === 0) {
            return res.status(404).json({ success: false, data: result, err: 'Employee not found' });
        }


        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false });

    }



})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await handleExit(err)
});

