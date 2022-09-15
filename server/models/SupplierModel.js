const mongoose = require("mongoose");

const SupplierSchema = mongoose.Schema(
    {
        name: { type: String, require },
        contactName: { type: String, require },
        contactTitle: { type: String, require },
        address: {
            address1: { type: String },
            postalCode: { type: Number },
            district: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            phone: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

const SupplierModel = mongoose.model("suppliers", SupplierSchema);

module.exports = SupplierModel;
