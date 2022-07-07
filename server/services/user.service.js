const { UnAuthorizedError } = require("../errors/userfacing.error");
const {
  findOne,
  findOneAndUpdate,
  insertOne,
  updateOne,
} = require("./db.service");

async function savePreferences(query, data) {
  try {
    const queryObj = {username:query.username};
    return updateOne("users",{queryObj, updateObj:{ "theme": data } })
      .then((result) => {
        if (result) {
          return {
            message: "User preferences updated successfully",
            user: result,
          };
        }
      })
      .catch((e) => {
        throw new Error("Error Updating User");
      });
  } catch (error) {
    throw error;
  }
}

async function getPreferences(query) {
  try {
    return findOne("users",query)
      .then((result) => result)
      .catch(() => {
        throw new Error("Error Fetching preferences");
      });
  } catch (error) {
    throw error;
  }
}
module.exports = { savePreferences, getPreferences };
