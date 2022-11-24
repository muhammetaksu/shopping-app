const jwt = require("jsonwebtoken");
const { accessTokenOptions, refreshTokenOptions } = require("../config/environments");

const generateRefreshToken = (email, _id) => {
    const refreshToken = jwt.sign({ email, _id }, refreshTokenOptions.jwtKey, {
        algorithm: "HS256",
        expiresIn: refreshTokenOptions.jwtExpiry,
    });
    return refreshToken;
};

const generateAccessToken = (email, _id) => {
    const accessToken = jwt.sign({ email, _id }, accessTokenOptions.jwtKey, {
        algorithm: "HS256",
        expiresIn: accessTokenOptions.jwtExpiry,
    });
    return accessToken;
};
module.exports = {
    generateRefreshToken: generateRefreshToken,
    generateAccessToken: generateAccessToken,
};
