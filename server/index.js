const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");
const checkAuth = require("./middleware/checkAuth");

const productsRoute = require("./routes/productsRoute");
const suppliersRoute = require("./routes/suppliersRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const usersRoute = require("./routes/usersRoute");
const adminsRoute = require("./routes/adminsRoute");
const authRoute = require("./routes/authRoute");
const addressRoute = require("./routes/addressRoute");
const ordersRoute = require("./routes/ordersRoute");
const contactRoute = require("./routes/contactRoute");
const passwordResetRoute = require("./routes/passwordResetRoute");
const stripe = require("./routes/stripe");
const checkIsAdmin = require("./middleware/checkIsAdmin");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("SERVER IS WORKING ON PORT 5000");
});

app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);
app.use("/suppliers", suppliersRoute);
app.use("/admins", adminsRoute);
app.use("/login", authRoute);
app.use("/reset-password", passwordResetRoute);
app.use("/users", usersRoute);
app.use("/contact", contactRoute);
app.use("/address", addressRoute);
app.use("/orders", ordersRoute);
app.use("/stripe", stripe);
app.use("*", (req, res) => {
    res.send("There is no route!");
});

// Catch all routes
// app.all("*", (req, res) => {
//     res.json({ message: "Route not found" });
// });
