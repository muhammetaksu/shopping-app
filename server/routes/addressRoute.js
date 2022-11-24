const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const checkTrueUser = require("../middleware/checkTrueUser");
const AddressModel = require("../models/AddressModel");
const router = express.Router();

// GET ALL ADDRESS

router.get("/", checkIsAdmin, (req, res) => {
    try {
        AddressModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/AddressModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", checkAuth, (req, res) => {
    const id = req.params.id;
    try {
        AddressModel.findById(id, (error, result) => {
            if (checkTrueUser(req.headers.userId, result.userId) === false) {
                return res.status(401).send("You are not authorized to perform this action!");
            }

            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/AddressModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET ADDRESS BY USERID

router.get("/userId/:id", checkAuth, (req, res) => {
    const id = req.params.id;
    try {
        AddressModel.find({ userId: id }, (error, result) => {
            if (checkTrueUser(req.headers.userId, id) === false) {
                return res.status(401).send("You are not authorized to perform this action!");
            }

            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/AddressModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD ADDRESS

router.post("/", checkAuth, async (req, res) => {
    const address = req.body;
    try {
        const newAddress = new AddressModel(address);
        await newAddress.save();

        return res.status(201).json(newAddress);
    } catch (error) {
        console.log("models/AddressModel.js: post: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE ADDRESS

router.delete("/:id", checkAuth, (req, res) => {
    try {
        AddressModel.findById(req.params.id, async (error, result) => {
            if (checkTrueUser(req.headers.userId, result.userId) === false) {
                return res.status(401).send("You are not authorized to perform this action!");
            }
            await result.delete();
            return res.status(200).send("Address deleted!");
        });
    } catch (error) {
        console.log("models/AddressModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE ADDRESS

router.put("/:id", checkAuth, (req, res) => {
    try {
        const newAddress = req.body;
        AddressModel.findById({ _id: req.params.id }, async (error, result) => {
            if (checkTrueUser(req.headers.userId, result.userId) === false) {
                return res.status(401).send("You are not authorized to perform this action!");
            }

            await AddressModel.findByIdAndUpdate(req.params.id, newAddress);
            return res.status(200).send("Address updated!");
        });
    } catch (error) {
        console.log("models/AddressModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
