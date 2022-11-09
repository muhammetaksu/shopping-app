const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema(
    {
        productsId: { type: String, require },
        userId: { type: String, require },
        totalPrice: { type: String, require },
        deliveryAddress: { type: String, require },
    },

    {
        timestamps: true,
    }
);

const OrdersModel = mongoose.model("orders", OrdersSchema);

module.exports = OrdersModel;
