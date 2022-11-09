const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const database = require("./config/database");
const checkAuth = require("./middleware/checkAuth");

const productsRoute = require("./routes/productsRoute");
const suppliersRoute = require("./routes/suppliersRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const usersRoute = require("./routes/usersRoute");
const adminsRoute = require("./routes/adminsRoute");
const authRoute = require("./routes/authRoute");
const addressRoute = require("./routes/addressRoute");
const ordersRoute = require("./routes/ordersRoute");
const passwordResetRoute = require("./routes/passwordResetRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("SERVER IS WORKING ON PORT 5000");
});

app.use("/api/products", productsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/suppliers", suppliersRoute);
app.use("/api/admins", adminsRoute);
app.use("/api/login", authRoute);
app.use("/api/reset-password", passwordResetRoute);
app.use("/api/users", usersRoute);
app.use("/api/address", checkAuth, addressRoute);
app.use("/api/orders", ordersRoute);
app.use("*", (req, res) => {
    res.send("There are no route!");
});

// Catch all routes
// app.all("*", (req, res) => {
//     res.json({ message: "Route not found" });
// });
