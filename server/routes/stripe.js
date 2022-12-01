const express = require("express");
const Stripe = require("stripe");
const { SITE_URL } = require("../config/environments");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const checkTrueUser = require("../middleware/checkTrueUser");
const url = require("url");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", checkAuth, async (req, res) => {
    if (checkTrueUser(req.headers.userId, req.body.userId) === false) {
        return res.status(401).send("You are not authorized to perform this action!");
    }

    const reqData = req.body;

    const line_items = req.body.cart.map((product) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    images: [product.image.imageLink1],
                    name: `${product.brand} - ${product.model}`,
                    // description: product.description,
                    metadata: {
                        productId: product._id,
                    },
                },

                unit_amount: product.unitPrice * 100,
            },
            quantity: product.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,

        payment_method_types: ["card"],

        metadata: {
            userId: req.body.userId,
            fullName: req.body.fullName,
            shipping_address: req.body.deliveryAddress,
            productsId: req.body.productsId,
        },

        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount:
                            reqData.cartTotalPrice <= reqData.shippingOptions.freeShippingLimit
                                ? reqData.shippingOptions.shippingCost * 100
                                : 0,
                        currency: "usd",
                    },
                    display_name:
                        reqData.cartTotalPrice <= reqData.shippingOptions.freeShippingLimit
                            ? "Shipping Cost"
                            : "Free Shipping",
                },
            },
        ],

        line_items,
        mode: "payment",
        success_url: `${SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_URL}/cart`,
    });

    res.json({
        url: session.url,
    });
});

router.get("/order-info/:id", checkAuth, async (req, res) => {
    if (checkTrueUser(req.headers.userId, req.params.id) === false) {
        return res.status(401).send("You are not authorized to perform this action!");
    }

    try {
        let queryStrings = url.parse(req.url, true).query;

        let newSession = await stripe.checkout.sessions.retrieve(queryStrings.session_id);

        let listLineItems = await stripe.checkout.sessions.listLineItems(queryStrings.session_id);

        return res.status(200).json({ listLineItems, newSession });
    } catch (error) {
        return res.status(204).send("Order not found!");
    }
});

router.post("/product-info", checkAuth, async (req, res) => {
    let queryStrings = url.parse(req.url, true).query;
    const productId = req.body.productId;

    if (checkTrueUser(req.headers.userId, queryStrings.userId) === false) {
        return res.status(401).send("You are not authorized to perform this action!");
    }

    try {
        let result = await stripe.products.retrieve(productId);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(204).send("Product not found!");
    }
});

module.exports = router;
