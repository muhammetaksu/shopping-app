const express = require("express");
const AdminModel = require("../../models/AdminModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { accessTokenOptions } = require("../../config/environments");
const { generateAccessToken, generateRefreshToken } = require("../../helpers/generateToken");
const { UserModel } = require("../../models/UserModel");
const { comparePassword } = require("../../utils/hashPassword");

const auth = {
    login: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(404).send({
                message: "Email and password can not be empty!",
            });
        } else {
            const email = req.body.email;
            const password = req.body.password;
            UserModel.findOne({ email: email }, async (err, result) => {
                try {
                    if (!result) {
                        return res.status(404).send({
                            message: "User not found.",
                        });
                    } else {
                        const passResult = await comparePassword(password, result.password);
                        if (!passResult) {
                            return res.status(403).send("Invalid password!");
                        }

                        const token = generateAccessToken(email);
                        const refreshToken = generateRefreshToken(email);
                        return res.status(200).json({
                            user: {
                                _id: result._id,
                                name: result.name,
                                surname: result.surname,
                                email: result.email,
                            },
                            token: token,
                            refreshToken: refreshToken,
                            message: "Login successfully!",
                        });
                    }
                } catch (err) {
                    res.status(400).send(err);
                }
            });
        }
    },

    adminLogin: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(404).send({
                message: "Email and password can not be empty!",
            });
        } else {
            const email = req.body.email;
            const password = req.body.password;
            AdminModel.findOne({ email: email }, async (err, result) => {
                try {
                    if (!result) {
                        return res.status(404).send({
                            message: "User not found..",
                        });
                    } else {
                        const passResult = await comparePassword(password, result.password);
                        if (!passResult) {
                            return res.status(403).send("Invalid password!");
                        }

                        const token = generateAccessToken(email);
                        const refreshToken = generateRefreshToken(email);
                        return res.status(200).json({
                            user: {
                                _id: result._id,
                                name: result.name,
                                surname: result.surname,
                                email: result.email,
                                isAdmin: result.isAdmin,
                            },
                            token: token,
                            refreshToken: refreshToken,
                            message: "Login successfully!",
                        });
                    }
                } catch (err) {
                    res.status(400).send(err);
                    console.log(err);
                }
            });
        }
    },
};

module.exports = auth;
