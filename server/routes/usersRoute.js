const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const checkTrueUser = require("../middleware/checkTrueUser");
const { UserModel } = require("../models/UserModel");
const { encodePassword } = require("../utils/hashPassword");
const router = express.Router();

// GET ALL USER

router.get("/", checkIsAdmin, (req, res) => {
    try {
        UserModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/UserModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", checkAuth, (req, res) => {
    const id = req.params.id;
    try {
        UserModel.findById(id)
            .select("name surname email createdAt updatedAt")
            .exec((error, result) => {
                if (checkTrueUser(req.headers.userId, result._id) === false) {
                    return res.status(401).send("You are not authorized to perform this action!");
                }

                if (error) {
                    return res.json(error);
                } else {
                    return res.json(result);
                }
            });
    } catch (error) {
        console.log("models/UserModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD USER

router.post("/", async (req, res) => {
    const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: await encodePassword(req.body.password),
    };
    UserModel.findOne({ email: user.email }, async (error, result) => {
        try {
            if (!result) {
                const newUser = await new UserModel(user).save();
                return res.status(201).send({ user: newUser, message: "Registration Successful!" });
            } else {
                return res.status(400).send({ message: "This email is already registered!" });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    });
});

// DELETE USER

router.delete("/:id", checkAuth, (req, res) => {
    try {
        UserModel.findById(req.params.id, async (error, result) => {
            if (checkTrueUser(req.headers.userId, result._id) === false) {
                return res.status(401).send("You are not authorized to perform this action!");
            }

            await result.delete();
            return res.send("User deleted!");
        });
    } catch (error) {
        console.log("models/UserModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE USER

router.put("/:id", checkAuth, (req, res) => {
    const updatedUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        updatedAt: new Date(),
    };
    try {
        UserModel.findById(req.params.id, async (error, result) => {
            if (checkTrueUser(req.headers.userId, result._id) === false) {
                return res.status(401).send("You are not authorized to perform this action!");
            }

            await UserModel.findByIdAndUpdate(result._id, updatedUser).exec();
            return res.status(200).send("Update successfully!");
        });
    } catch (error) {
        console.log("models/UserModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
