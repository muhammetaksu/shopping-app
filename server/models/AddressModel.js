const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
    {
        title: { type: String, require },
        country: { type: String, require },
        state: { type: String, require },
        city: { type: String, require },
        district: { type: String, require },
        address: { type: String, require },
        postalCode: { type: String, require },
        userId: { type: String, require },
    },

    {
        timestamps: true,
    }
);

const AddressModel = mongoose.model("addresses", AddressSchema);

module.exports = AddressModel;
