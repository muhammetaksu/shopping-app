const express = require("express");
const { UserModel } = require("../models/UserModel");
const router = express.Router();

// GET ALL CATEGORIES

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        UserModel.findById(id, (error, result) => {
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

// ADD USER

router.post("/", async (req, res) => {
    const user = req.body;
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

router.delete("/:id", async (req, res) => {
    try {
        await UserModel.findByIdAndRemove(req.params.id).exec();
        res.send("USER DELETED");
    } catch (error) {
        console.log("models/UserModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE USER

router.put("/:id", async (req, res) => {
    const updatedUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        updatedAt: new Date(),
    };
    try {
        await UserModel.findByIdAndUpdate(req.params.id, updatedUser, {
            returnDocument: "after",
        });

        res.status(201).send("USER UPDATED");
    } catch (error) {
        console.log("models/UserModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
