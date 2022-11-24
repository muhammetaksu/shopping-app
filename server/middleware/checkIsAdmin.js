const jwt = require("jsonwebtoken");
const { accessTokenOptions } = require("../config/environments");
const AdminModel = require("../models/AdminModel");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, accessTokenOptions.jwtKey);
        const { email, _id } = decodedToken;

        AdminModel.find({ email: email, _id: _id }, (error, result) => {
            if (result.length > 0) {
                next();
            } else {
                return res.status(401).send({
                    message: "You must be an admin to do this!",
                });
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: "Auth failed",
        });
    }
};
