const { findOne } = require("../services/db.service");
const jwt = require("jsonwebtoken");
var ObjectId = require('mongodb').ObjectId;
function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnAuthorizedError("Token is required");
    const token = authHeader.replace("Bearer ", "");
    const secret = process.env.SECRET;
    const user = jwt.verify(token, secret);
    findOne("users", { username: user.name, _id: new ObjectId(user.id) })
      .then((data) => {
        req.user = {};
        req.user.username = user.name;
        req.user.id = user.id;
        next();
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    next(error)
  }
}

function createToken(data) {
  const secret = process.env.SECRET;
  let tokenValues= { name: data.username, id:data._id.toString()};
  if(data.theme) tokenValues={...tokenValues,theme:data.theme}
  return jwt.sign(tokenValues, secret);
}

module.exports = { authenticate,createToken };
