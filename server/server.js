const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
// const { decodeToken } = require('./middleware/decodeToken');
// const { Validation } = require('./middleware/validation');
// const { loginSchema, getSuggestionsSchema } = require('./schema');

const PORT = 8080;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());


app.get('/login',  async (req, res) => {   
    try{ 



      res.cookie("session-token", "123456", { httpOnly: false,  secure: false, sameSite: "Lax" });                
      return res.status(200).json({success: true, token: 'here', err: null });

    } catch(err) {
        console.error(err)
        res.status(500).json({success: false, token:null, err: err.message })
        
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

