const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema(
    {
        // productsId: { type: String, require },
        products: { type: Array, default: [] },
        userId: { type: String, require },
        price: { type: Object, default: {}, require },
        stripeSessionId: { type: String, default: {}, require },
        deliveryAddress: { type: String, require },
        isShipped: { type: String, default: false, require },
        isDeliver: { type: String, default: false, require },
    },

    {
        timestamps: true,
    }
);

const OrdersModel = mongoose.model("orders", OrdersSchema);

module.exports = OrdersModel;
