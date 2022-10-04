const mongoose = require("mongoose");
const { connectionString } = require("./environments");

mongoose.connect(connectionString);

var db = mongoose.connection;

db.on("connected", () => {
    console.log("MONGODB IS CONNECTED");
});

db.on("error", () => {
    console.log("MONGODB CONNECT ERROR");
});

module.exports = mongoose;
