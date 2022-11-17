const express = require("express");
const AdminModel = require("../../models/AdminModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { accessTokenOptions } = require("../../config/environments");
const { generateAccessToken } = require("../../helpers/generateToken");
const { UserModel } = require("../../models/UserModel");

const auth = {
    login: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(404).send({
                message: "Email and password can not be empty!",
            });
        } else {
            const email = req.body.email;
            const password = req.body.password;
            UserModel.findOne({ email: email, password: password }, (err, result) => {
                try {
                    if (!result) {
                        return res.status(404).send({
                            message: "User not found. Authentication failed.",
                        });
                    } else {
                        const token = generateAccessToken(email);
                        return res
                            .status(200)
                            .json({ user: result, token: token, message: "Login successfully!" });
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
            AdminModel.findOne({ email: email, password: password }, (err, result) => {
                try {
                    if (!result) {
                        return res.status(404).send({
                            message: "User not found. Authentication failed.",
                        });
                    } else {
                        const token = generateAccessToken(email);
                        return res
                            .status(200)
                            .json({ user: result, token: token, message: "Login successfully!" });
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
