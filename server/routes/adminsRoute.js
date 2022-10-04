const express = require("express");
const AdminModel = require("../models/AdminModel");
const router = express.Router();

// GET ALL ADMINS

router.get("/", (req, res) => {
    try {
        AdminModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/AdminModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        AdminModel.findById(id, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/AdminModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD ADMIN

router.post("/", async (req, res) => {
    const admin = req.body;
    try {
        const newAdmin = new AdminModel(admin);
        await newAdmin.save();

        return res.status(201).json(newAdmin);
    } catch (error) {
        console.log("models/AdminModel.js: post: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE ADMIN

router.delete("/:id", async (req, res) => {
    try {
        await AdminModel.findByIdAndRemove(req.params.id).exec();
        res.send("ADMIN DELETED");
    } catch (error) {
        console.log("models/AdminModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE ADMIN

router.put("/:id", async (req, res) => {
    try {
        const admin = req.body;
        await AdminModel.findByIdAndUpdate(req.params.id, admin, { returnDocument: "after" });

        res.status(201).send("ADMIN UPDATED");
    } catch (error) {
        console.log("models/AdminModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
