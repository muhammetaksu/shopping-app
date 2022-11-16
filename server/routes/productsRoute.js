const express = require("express");
const ProductModel = require("../models/ProductModel");
const router = express.Router();

// GET ALL PRODUCTS

router.get("/", (req, res) => {
    ProductModel.find({})
        .populate("category")
        .exec((err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

// GET SINGLE

router.get("/:id", (req, res) => {
    const id = req.params.id;

    ProductModel.findById(id)
        .populate("category")
        .exec((err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

// ADD PRODUCT

router.post("/", async (req, res) => {
    const product = {
        brand: req.body.brand,
        model: req.body.model,
        unitPrice: req.body.unitPrice,
        unitsInStock: req.body.unitsInStock,
        category: req.body.category,
        supplier: req.body.supplier,
        description: req.body.description,
        image: {
            imageLink1: req.body.imageLink1,
            imageLink2: req.body.imageLink2,
            imageLink3: req.body.imageLink3,
        },
    };

    try {
        const newProduct = new ProductModel(product);
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: x });
    }
});

// UPDATE PRODUCT

router.put("/:id", async (req, res) => {
    try {
        const {
            brand,
            model,
            unitPrice,
            unitsInStock,
            description,
            imageLink1,
            imageLink2,
            imageLink3,
            category,
            supplier,
        } = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                brand,
                model,
                unitPrice,
                unitsInStock,
                description,
                image: {
                    imageLink1,
                    imageLink2,
                    imageLink3,
                },
                category,
                supplier,
            },
            { returnDocument: "after" }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product Not found" });
        }
        return res.status(201).json(updatedProduct);
    } catch (x) {
        console.log("models/ProductModel.js: update: Error");
        console.log(x);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE PRODUCT

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await ProductModel.findByIdAndRemove(id).exec();

    res.send("PRODUCT DELETED");
});

module.exports = router;
