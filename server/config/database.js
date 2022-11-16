const mongoose = require("mongoose");
const { connectionString } = require("./environments");

mongoose.connect(connectionString);

mongoose.connection.on("connected", () => {
    console.log("MONGODB IS CONNECTED");
});

mongoose.connection.on("error", () => {
    console.log("MONGODB CONNECT ERROR");
});

module.exports = mongoose;
