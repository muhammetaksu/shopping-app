const jwt = require("jsonwebtoken");
const { accessTokenOptions } = require("../config/environments");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, accessTokenOptions.jwtKey);
        const { _id } = decodedToken;
        req.headers.userId = _id;
        next();
    } catch (error) {
        console.log("Auth failed");
        return res.status(401).send({
            message: "Auth failed",
        });
    }
};
