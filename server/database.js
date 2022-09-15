const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://muhammetaksu:1234567890@cluster0.vrwbu6p.mongodb.net/amazon-clone-db?retryWrites=true&w=majority"
);

var db = mongoose.connection;

db.on("connected", () => {
    console.log("MONGODB IS CONNECTED");
});

db.on("error", () => {
    console.log("MONGODB CONNECT ERROR");
});

module.exports = mongoose;
