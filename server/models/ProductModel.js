const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        brand: { type: String, require },
        model: { type: String, require },
        unitPrice: { type: String, require },
        unitsInStock: { type: String, require },
        description: { type: String, require },
        image: {
            imageLink1: { type: String, require },
            imageLink2: { type: String, require },
            imageLink3: { type: String },
        },
        categoryId: { type: String, require },
        supplierId: { type: String, require },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
