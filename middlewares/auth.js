const jwt = require("jsonwebtoken");

const { Login } = require("../models/login");
async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send({message:"Token Not Provided"});
  try {
    let user = jwt.verify(token, "jwtPrivateKey");
    req.user = await Login.findById(user._id);
  } catch (err) {
    return res.status(401).send({message:"Login to get access"});
  }
  next();
}

module.exports = auth;
