const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const database = require("./database");
const productsRoute = require("./routes/productsRoute");
const suppliersRoute = require("./routes/suppliersRoute");
const categoriesRoute = require("./routes/categoriesRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("SERVER IS WORKING ON PORT 5000");
});

app.use("/api/products", productsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/suppliers", suppliersRoute);
