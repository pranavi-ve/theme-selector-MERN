const db = require("../db");
async function insertOne(table, obj) {
  const dbo = db.getDb();
  return new Promise(function (resolve, reject) {
    dbo.collection(table).insertOne(obj, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

async function findOne(table, obj) {
  const dbo = db.getDb();
  return new Promise(function (resolve, reject) {
    dbo.collection(table).findOne(obj, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

async function findOneAndUpdate(table, { findObj = {}, updateObj = {} }) {
  const dbo = db.getDb();
  return new Promise(function (resolve, reject) {
    dbo
      .collection(table)
      .findOneAndUpdate(findObj, { $set: updateObj }, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
}
async function updateOne(table, { queryObj, updateObj }) {
  const dbo = db.getDb();
  return new Promise(function (resolve, reject) {
    dbo
      .collection(table)
      .updateOne(queryObj, { $set: updateObj }, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
}
module.exports = { findOne, insertOne, findOneAndUpdate, updateOne };
