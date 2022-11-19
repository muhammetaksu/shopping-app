const jwt = require("jsonwebtoken");
const { accessTokenOptions, refreshTokenOptions } = require("../config/environments");

const generateRefreshToken = (email) => {
    const refreshToken = jwt.sign({ email }, refreshTokenOptions.jwtKey, {
        algorithm: "HS256",
        expiresIn: refreshTokenOptions.jwtExpiry,
    });
    return refreshToken;
};

const generateAccessToken = (email) => {
    const accessToken = jwt.sign({ email }, accessTokenOptions.jwtKey, {
        algorithm: "HS256",
        expiresIn: accessTokenOptions.jwtExpiry,
    });
    return accessToken;
};

module.exports = {
    generateRefreshToken: generateRefreshToken,
    generateAccessToken: generateAccessToken,
};
