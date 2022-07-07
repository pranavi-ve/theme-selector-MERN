const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.s7vgp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1, 
});

module.exports = {
  connectToDb: function (callback) {
    client.connect((err, db) => {
      if (err || !db) return callback(err);
      dbObj = client.db(`${process.env.DB_NAME}`);
      console.log("successfully connected to db");
      return callback();
    });
  },
  getDb() {
    return dbObj;
  }
};
