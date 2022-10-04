const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
    {
        name: { type: String, require },
        surname: { type: String, require },
        email: { type: String, require },
        password: { type: String, require },
        isAdmin: { type: String, default: true },
    },
    {
        timestamps: true,
    }
);

const AdminModel = mongoose.model("admins", AdminSchema);

module.exports = AdminModel;
