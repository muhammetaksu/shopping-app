const express = require("express");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const CategoryModel = require("../models/CategoryModel");
const router = express.Router();

// GET ALL CATEGORIES

router.get("/", (req, res) => {
    try {
        CategoryModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/CategoryModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        CategoryModel.findById(id, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/CategoryModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD CATEGORY

router.post("/", checkIsAdmin, async (req, res) => {
    const category = req.body;
    try {
        const newCategory = new CategoryModel(category);
        await newCategory.save();

        return res.status(201).json(newCategory);
    } catch (error) {
        console.log("models/CategoryModel.js: post: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE CATEGORY

router.delete("/:id", checkIsAdmin, async (req, res) => {
    try {
        await CategoryModel.findByIdAndRemove(req.params.id).exec();
        return res.send("PRODUCT DELETED");
    } catch (error) {
        console.log("models/CategoryModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE CATEGORY

router.put("/:id", checkIsAdmin, async (req, res) => {
    try {
        const { name } = req.body;
        await CategoryModel.findByIdAndUpdate(req.params.id, { name }, { returnDocument: "after" });

        return res.status(201).send("CATEGORY UPDATED");
    } catch (error) {
        console.log("models/CategoryModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
