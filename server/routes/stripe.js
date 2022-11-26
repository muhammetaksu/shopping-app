const express = require("express");
const Stripe = require("stripe");
const { SITE_URL } = require("../config/environments");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const checkTrueUser = require("../middleware/checkTrueUser");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", checkAuth, async (req, res) => {
    if (checkTrueUser(req.headers.userId, req.body.userId) === false) {
        return res.status(401).send("You are not authorized to perform this action!");
    }

    const line_items = req.body.cart.map((product) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    images: [product.image.imageLink1],
                    name: `${product.brand} - ${product.model}`,
                    // description: product.description,
                    metadata: {
                        id: product._id,
                    },
                },
                unit_amount: product.unitPrice * 100,
            },
            quantity: product.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // shipping_address_collection: { allowed_countries: ["US", "CA", "TR"] },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: { amount: 0, currency: "usd" },
                    display_name: "Free shipping",
                    delivery_estimate: {
                        minimum: { unit: "business_day", value: 5 },
                        maximum: { unit: "business_day", value: 7 },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: { amount: 1500, currency: "usd" },
                    display_name: "Next day air",
                    delivery_estimate: {
                        minimum: { unit: "business_day", value: 1 },
                        maximum: { unit: "business_day", value: 3 },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        metadata: {
            userId: req.body.userId,
        },
        line_items,
        mode: "payment",
        success_url: `${SITE_URL}/checkout-success`,
        cancel_url: `${SITE_URL}/cart`,
    });

    res.json({
        // url: session.url,
        session,
    });
});

module.exports = router;
