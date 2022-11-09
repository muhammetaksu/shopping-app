const express = require("express");
const OrdersModel = require("../models/OrdersModel");
const router = express.Router();

// GET ALL ADDRESS

router.get("/", (req, res) => {
    try {
        OrdersModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/OrdersModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        OrdersModel.findById(id, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/OrdersModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD ORDER

router.post("/", async (req, res) => {
    const order = {
        productsId: req.body.productsId,
        userId: req.body.userId,
        totalPrice: req.body.totalPrice,
        deliveryAddress: req.body.deliveryAddress,
    };
    // const order = req.body;
    try {
        const newOrder = new OrdersModel(order);
        await newOrder.save();

        return res.status(201).json(newOrder);
    } catch (error) {
        console.log("models/OrdersModel.js: post: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE ORDER

router.delete("/:id", async (req, res) => {
    try {
        await OrdersModel.findByIdAndRemove(req.params.id).exec();
        res.send("ORDER DELETED");
    } catch (error) {
        console.log("models/OrdersModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE ORDER

router.put("/:id", async (req, res) => {
    try {
        const newOrder = req.body;
        await OrdersModel.findByIdAndUpdate(req.params.id, newOrder, {
            returnDocument: "after",
        });

        res.status(201).send("ORDER UPDATED");
    } catch (error) {
        console.log("models/OrdersModel.js: update: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

module.exports = router;
