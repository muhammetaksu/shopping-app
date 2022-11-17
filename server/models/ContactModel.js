const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
    {
        name: { type: String, require },
        surname: { type: String, require },
        title: { type: String, require },
        email: { type: String, require },
        message: { type: String, require },
    },
    {
        timestamps: true,
    }
);

const ContactModel = mongoose.model("contacts", ContactSchema);

module.exports = ContactModel;
