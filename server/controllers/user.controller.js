const express = require("express");
const userService = require("../services/user.service");
const {createToken} = require("../middlewares/auth");
const router = express.Router();

router.post("/pref", savePreferences);
router.get("/pref", getPreferences);

function savePreferences(req, res, next) {
  try {
    userService
      .savePreferences(req.user, req.body.theme)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } catch (error) {
    next(err);
  }
}
function getPreferences(req, res, next) {
  try { 
    const query = {
      username: req.user.username
    }
    userService
      .getPreferences(query)
      .then((data) => {
        //append token to hader
        const token = createToken(data);
        res.append('Authorization' ,"Bearer "+token);
        res.json({theme:data.theme})
      })
      .catch((err) => next(err));
  } catch (error) {
    next(err);
  }
}
module.exports = router;
