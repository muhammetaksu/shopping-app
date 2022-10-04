const jwt = require("jsonwebtoken");
const { accessTokenOptions } = require("../config/environments");
accessTokenOptions;

// const generateToken = function (email) {
//     const refreshToken = jwt.sign({ email }, refreshTokenOptions.jwtKey, {
//         algorithm: "HS256",
//         expiresIn: refreshTokenOptions.jwtExpirySeconds,
//     });
//     return refreshToken;
// };

const generateAccessToken = (email) => {
    const accessToken = jwt.sign({ email }, accessTokenOptions.jwtKey, {
        algorithm: "HS256",
        expiresIn: accessTokenOptions.jwtExpiry,
    });
    return accessToken;
};

module.exports = {
    // generateRefreshToken: generateToken,
    generateAccessToken: generateAccessToken,
};
