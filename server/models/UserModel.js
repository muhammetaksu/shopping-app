const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = mongoose.Schema(
    {
        name: { type: String, require },
        surname: { type: String, require },
        email: { type: String, require },
        password: { type: String },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("users", UserSchema);

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = { UserModel, validate };
