const express = require("express");
const { USER } = require("../config/environments");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const ContactModel = require("../models/ContactModel");
const sendEmail = require("../utils/sendEmail");
const { contactEmailBody, contactCustomerEmailBody } = require("../utils/sendEmailBody");
const router = express.Router();

// GET ALL CONTACT

router.get("/", checkIsAdmin, (req, res) => {
    try {
        ContactModel.find({}, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/ContactModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// GET SINGLE

router.get("/:id", checkIsAdmin, (req, res) => {
    const id = req.params.id;
    try {
        ContactModel.findById(id, (error, result) => {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("models/ContactModel.js: get: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// ADD CONTACT

router.post("/", async (req, res) => {
    const contact = req.body;
    try {
        const newContact = new ContactModel(contact);
        await newContact.save();

        const consumerHtml = contactCustomerEmailBody(contact);
        const html = contactEmailBody(contact);

        await sendEmail(req.body.email, "Contact Information", consumerHtml);
        await sendEmail(USER, "New Contact", html);

        return res.status(201).json(newContact);
    } catch (error) {
        console.log("models/ContactModel.js: post: Error");
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
});

// DELETE CONTACT

router.delete("/:id", checkIsAdmin, async (req, res) => {
    try {
        await ContactModel.findByIdAndRemove(req.params.id).exec();
        return res.send("CONTACT DELETED");
    } catch (error) {
        console.log("models/ContactModel.js: delete: Error");
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

module.exports = router;
