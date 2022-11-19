const express = require("express");
const AddressModel = require("../models/AddressModel");
const router = express.Router();

// GET ALL ADDRESS

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        AddressModel.findById(id, (error, result) => {
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

router.get("/userId/:id", (req, res) => {
    const id = req.params.id;
    try {
        AddressModel.find({ userId: id }, (error, result) => {
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

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    try {
        await AddressModel.findByIdAndRemove(req.params.id).exec();
        res.send("ADDRESS DELETED");
    } catch (error) {
        console.log("models/AddressModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE ADDRESS

router.put("/:id", async (req, res) => {
    try {
        const newAddress = req.body;
        await AddressModel.findByIdAndUpdate(req.params.id, newAddress, {
            returnDocument: "after",
        });

        res.status(201).send("ADDRESS UPDATED");
    } catch (error) {
        console.log("models/AddressModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
