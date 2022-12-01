const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const OrdersModel = require("../models/OrdersModel");
const router = express.Router();

// GET ALL ORDERS

router.get("/", checkIsAdmin, (req, res) => {
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

router.get("/:id", checkAuth, (req, res) => {
    const id = req.params.id;
    try {
        OrdersModel.findById(id, (error, result) => {
            if (result) {
                if (checkTrueUser(req.headers.userId, result.userId) === false) {
                    return res.status(401).send("You are not authorized to perform this action!");
                }
            } else {
                return res.send("Order not found!");
            }

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

router.post("/", checkAuth, async (req, res) => {
    const order = {
        productsId: req.body.productsId,
        products: req.body.products,
        userId: req.body.userId,
        totalPrice: req.body.totalPrice,
        deliveryAddress: req.body.deliveryAddress,
    };
    // const order = req.body;
    try {
        if (checkTrueUser(req.headers.userId, req.body.userId) === false) {
            return res.status(401).send("You are not authorized to perform this action!");
        }
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

router.delete("/:id", checkIsAdmin, async (req, res) => {
    try {
        await OrdersModel.findByIdAndRemove(req.params.id).exec();
        return res.send("ORDER DELETED");
    } catch (error) {
        console.log("models/OrdersModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

// UPDATE ORDER

// router.put("/:id", async (req, res) => {
//     try {
//         const newOrder = req.body;
//         await OrdersModel.findByIdAndUpdate(req.params.id, newOrder, {
//             returnDocument: "after",
//         });

//         res.status(201).send("ORDER UPDATED");
//     } catch (error) {
//         console.log("models/OrdersModel.js: update: Error");
//         console.log(error);
//         return res.status(500).json({ message: "Error" });
//     }
// });

module.exports = router;
