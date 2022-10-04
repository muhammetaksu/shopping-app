const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1800,
    },
});

const TokenModel = mongoose.model("tokens", TokenSchema);

module.exports = TokenModel;
