const { SECRET } = require('../server.config');
const jwt = require('jsonwebtoken');

const decodeToken  = (req, res, next) => {  
  try{
    const token = req.header('Authorization');
    console.info(`user token: ${token}`)
    const decoded = jwt.verify(token, SECRET);
    req.decoded = decoded
    next();

  } catch(err){
    console.error(`Error : ${err.message}`, err);
    res.status(401).json({ err });
  }
};
module.exports = { decodeToken };