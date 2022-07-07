const bcrypt = require("bcryptjs");
const { UnAuthorizedError } = require("../errors/userfacing.error");
const { findOne,insertOne } = require("./db.service");

async function loginUser({ username, password }) {
  try {
    return findOne("users",{ username })
      .then((result) => {
        if (result) {
          const isMatch = bcrypt.compareSync(password, result.password);
          if (isMatch) return { message: "User Authenticated", user: result };
        }
        throw new UnAuthorizedError("Username or password is incorrect");
      })
      .catch((err) => {
        if (err.statusCode === 401) throw err;
        throw new Error("Error Finding User");
      });
  } catch (error) {
    throw error;
  }
}

async function register(user) {
  try {
    const hash = bcrypt.hashSync(user.password);
    const usrObj = { ...user, password: hash, "theme":'' };
    return insertOne("users",usrObj)
      .then((data) => ({ message: "User created successfully" }))
      .catch((err) => {
        if (err.code === 11000 && err.keyValue.username) {
          throw new Error("Username already taken");
        }
        throw new Error("Error inserting User");
      });
  } catch (error) {
    throw error;
  }
}

module.exports = { register, loginUser };
