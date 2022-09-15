const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        name: { type: String, require },
    },
    {
        timestamps: true,
    }
);

const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;
