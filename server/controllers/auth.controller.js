const express = require("express");
const Joi = require("joi");
const { validateSchema } = require("../middlewares/schema-validation");
const {createToken} = require("../middlewares/auth");
const authService = require("../services/auth.service");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

function login(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().required(),
  });
  validateSchema(schema, req.body)
    .then((data) => authService.loginUser(data))
    .then(({ message, user }) => {
      const token = createToken(user);
      res.append("Authorization", "Bearer "+token);
      res.json({message});
    })
    .catch((err) => next(err));
}

async function register(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().min(3).required(),
    password: Joi.string().required(),
    cfpassword: Joi.ref("password"),
  });
  validateSchema(schema, req.body)
    .then((data) =>
      authService.register({
        username: data.username,
        password: data.password,
        email: data.email,
      })
    )
    .then((data) => res.json(data ))
    .catch((err) => next(err));
}

module.exports = router;
