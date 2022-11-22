const connectionString =
    "mongodb+srv://muhammetaksu:1234567890@cluster0.vrwbu6p.mongodb.net/amazon-clone-db?retryWrites=true&w=majority";

const refreshTokenOptions = {
    jwtKey: "f6a94ee2-b8f4-4e1b-a8ee-6fafe4f0c6e3",
    jwtExpiry: "1m",
};

const accessTokenOptions = {
    jwtKey: "7bfc1d64-397e-11ed-a261-0242ac120002",
    jwtExpiry: "10s",
};

const HOST = "smtp@gmail.com";
const USER = "00.onlineprovider@gmail.com";
const PASS = "uqbtxsfroyghpoya";
const SERVICE = "Gmail";
const BASE_URL = "http://localhost:5000/";
const SITE_URL = "http://localhost:3000/";

module.exports = {
    HOST,
    USER,
    PASS,
    SERVICE,
    BASE_URL,
    SITE_URL,
    connectionString,
    refreshTokenOptions,
    accessTokenOptions,
};
