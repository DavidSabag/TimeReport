require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { decodeToken } = require('./middleware/decodeToken');
const { Validation } = require('./middleware/validation');
const { loginSchema, managerResponseSchema, updateReportSchema } = require('./schema');
const { mongoConnection, handleExit } = require('./database');
const { COLLECTION, DB_NAME, PORT, ORIGIN_URL, SECRET, EXPIRE_TOKEN_TIME } = process.env;
const { updateManagerReport } = require('./services/updateManagerReport');

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
        const result = await employeesCollection.findOne({ userName: username, password }, { projection: { _id: 0, password: 0 } });
        await client.close();
        console.info(`Mongo connection closed`);
        if (!result) {
            return res.status(404).json({ success: false, data: result, err: 'Employee not found' });
        }
        const isManager = result.premissionGroups.some(p => p === 'manager')

        const token = jwt.sign({ username, isManager }, SECRET, { expiresIn: EXPIRE_TOKEN_TIME });

        res.cookie("session-token", token, { httpOnly: false, secure: false, sameSite: "Lax" });
        return res.status(200).json({ success: true, data: result, err: null });

    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, date: [], err: err.message })

    }
});

app.put('/managerResponse', Validation(managerResponseSchema), decodeToken, async (req, res) => {
    try {
        const { employeeId, response } = req.body;
        const { username, isManager } = req.decoded
        console.info(`Starting managerResponse from: ${username} to ${employeeId}. manager response: ${response}`);
        if (!isManager) {
            return res.status(401).json({ success: false, data: null, err: 'Unauthorized user' });
        }
        const client = await mongoConnection();
        const db = client.db(DB_NAME);
        const employeesCollection = db.collection(COLLECTION);
        const { reports } = await employeesCollection.findOneAndUpdate(
            {
                userName: username,
                "reports.employeeId": employeeId
            },
            {
                $set: {
                    "reports.$.status": response
                }
            },
            {
                returnDocument: "after",
                projection: {
                    reports: {
                        $elemMatch: { employeeId }
                    }
                }
            }
        )
        await client.close();
        console.info(`Mongo connection closed`);
        if (reports.length === 0) {
            return res.status(404).json({ success: false, data: null, err: 'Employee not found' });
        }
        console.info('report -')
        console.table(reports);

        return res.status(200).json({ success: true, data: reports, err: null });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, data: null, err });

    }
})


app.put('/updateReport', Validation(updateReportSchema), decodeToken, async (req, res) => { //Validation(updateReportSchema), decodeToken
    try {
        const { empManagerId, clock, note } = req.body;
        const { username } = req.decoded
        console.info(`Starting updateReport from: ${username} to manager ${empManagerId}`);

        const client = await mongoConnection();
        const db = client.db(DB_NAME);
        const employeesCollection = db.collection(COLLECTION);

        // Get employee data
        const employeeData = await employeesCollection.findOne({ userName: username }, { projection: { _id: 0, employeeId: 1, firstName: 1, lastName: 1 } });
        if (!employeeData) {
            return res.status(404).json({ success: false, err: 'Employee not found' });
        }

        // Get manager reports
        const managerData = reports = await employeesCollection.findOne({ employeeId: empManagerId }, { projection: { _id: 0, reports: 1 } });

        if (!managerData) {
            return res.status(404).json({ success: false, err: 'No manager found' });
        }

        const newReports = updateManagerReport(managerData.reports, employeeData, note, clock)

        await employeesCollection.updateOne(
            { employeeId: empManagerId },
            { $set: { reports: newReports } },
        )

        await client.close();
        console.info(`Mongo connection closed`);
        console.info(`Success updating reports`);
        return res.status(200).json({ success: true, err: null });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, data: null, err });

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

