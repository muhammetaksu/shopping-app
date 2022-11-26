const { UserModel } = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");
const express = require("express");
const app = express();
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { SITE_URL, accessTokenOptions } = require("../config/environments");
const sendEmail = require("../utils/sendEmail");
const checkAuth = require("../middleware/checkAuth");
const { encodePassword } = require("../utils/hashPassword");
const { emailBody } = require("../utils/sendEmailBody");

router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // console.log("VALIDATED");

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ message: "User with given does not exist" });

        // console.log("USER FOUND");

        let token = await TokenModel.findOne({ userId: user._id });
        // console.log("TOKEN FOUND", token);
        if (!token) {
            token = await new TokenModel({
                userId: user._id,
                token: jwt.sign({ email: req.body.email }, accessTokenOptions.jwtKey, {
                    algorithm: "HS256",
                    expiresIn: 600,
                }),
            }).save();
        } else {
            // console.log("ELSE FIRST");
            await token.delete();
            token = await new TokenModel({
                userId: user._id,
                token: jwt.sign({ email: req.body.email }, accessTokenOptions.jwtKey, {
                    algorithm: "HS256",
                    expiresIn: 600,
                }),
            }).save();

            // console.log("UPDATED TOKEN", token);
        }

        const link = `${SITE_URL}/reset-password/${user._id}/${token.token}`;
        const html = emailBody(link);
        await sendEmail(user.email, "Reset Password", html);

        res.status(200).send({ message: "Password reset link sent to your email account." });
    } catch (error) {
        res.status(400).send("An error occured");
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // console.log("VALIDATED");

        const user = await UserModel.findById(req.params.userId);
        if (!user) return res.status(400).send({ message: "User not found!" });

        // console.log("USER FOUND");

        const token = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token,
        });
        // console.log("TOKEN FOUND");

        if (!token) {
            return res.status(400).send({ message: "Token not found!" });
        } else {
            try {
                const decodedToken = jwt.verify(token.token, accessTokenOptions.jwtKey);
            } catch (error) {
                return res.status(400).send(error);
            }
        }

        // console.log("TOKEN DECODED");

        user.password = await encodePassword(req.body.password);
        await user.save();
        await token.delete();

        res.status(200).send({ message: "Password reset succesfully!" });
    } catch (error) {
        res.status(400).send({ message: "An error occured!" });
    }
});

router;

module.exports = router;
