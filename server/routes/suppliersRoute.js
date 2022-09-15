const express = require("express");
const SupplierModel = require("../models/SupplierModel");
const router = express.Router();

// GET ALL SUPPLIERS

router.get("/", (req, res) => {
    try {
        SupplierModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/SupplierModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", (req, res) => {
    try {
        SupplierModel.findById(req.params.id, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/SupplierModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD SUPPLIER

router.post("/", async (req, res) => {
    const supplier = {
        name: req.body.name,
        contactName: req.body.contactName,
        contactTitle: req.body.contactTitle,
        address: {
            address1: req.body.address1,
            postalCode: req.body.postalCode,
            district: req.body.district,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
        },
    };
    try {
        const newSupplier = new SupplierModel(supplier);
        await newSupplier.save();
        res.send(newSupplier);
    } catch (error) {
        console.log("models/SupplierModel.js: post: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE SUPPLIER

router.delete("/:id", async (req, res) => {
    try {
        const deletedSupplier = await SupplierModel.findByIdAndRemove(req.params.id).exec();
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier Not found" });
        }
        return res.status(200).json({ message: "Deleted" });
    } catch (error) {
        console.log("models/SupplierModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// UPDATE SUPPLIER

router.put("/:id", async (req, res) => {
    const supplier = {
        name: req.body.name,
        contactName: req.body.contactName,
        contactTitle: req.body.contactTitle,
        address: {
            address1: req.body.address1,
            postalCode: req.body.postalCode,
            district: req.body.district,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
        },
    };
    try {
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(req.params.id, supplier, {
            returnDocument: "after",
        });
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier Not found" });
        }
        return res.status(201).json(updatedSupplier);
    } catch (error) {
        console.log("models/SupplierModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
